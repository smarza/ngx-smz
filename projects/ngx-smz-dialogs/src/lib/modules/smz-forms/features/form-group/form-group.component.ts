import { ViewEncapsulation, Component, OnInit, AfterViewInit, OnDestroy, Input, Output, EventEmitter, OnChanges, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { debounceTime, takeWhile } from 'rxjs/operators';
import { InjectableDialogComponentInterface } from '../../../../common/modules/inject-content/models/injectable-dialog-component.interface';

import { ResponsiveService } from '../../../smz-dialogs/services/responsive.service';
import { SmzControlType } from '../../models/control-types';
import { SmzFormsResponse, SmzForms } from '../../models/smz-forms';
import { CONTROL_FUNCTIONS } from '../../models/control-type-functions';
import { SmzFormsConfig } from '../../smz-forms.config';
import { SmzFormsManagerService } from '../../services/smz-forms-manager.service';
import { SmzDialogsConfig } from '../../../smz-dialogs/smz-dialogs.config';


@Component({
    selector: 'smz-form-group',
    templateUrl: './form-group.component.html',
    styleUrls: ['./form-group.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class FormGroupComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy, InjectableDialogComponentInterface<SmzFormsResponse<any>> {
    public isComponentActive = true;
    public form: FormGroup;
    //** isValid corresponde ao valid do formulário ou customValidator caso aja; Atualizada em toda mudança de status do formulário */
    public isValid = false;
    /** hasChanges ocorre quando os valores do formulário são diferentes do último state salvo. */
    public hasChanges = false;
    @Input() public config: SmzForms<any>;
    @Output() public statusChanges: EventEmitter<SmzFormsResponse<any>> = new EventEmitter<SmzFormsResponse<any>>();
    private isFirstUpdate = true;
    private emitChanges = true;
    private originalState: string = '';
    public controlTypes = SmzControlType;
    public isInitialized = false;

    constructor(public fb: FormBuilder, public responsive: ResponsiveService, private cdf: ChangeDetectorRef, public manager: SmzFormsManagerService, public configService: SmzDialogsConfig)
    {

    }

    public ngOnInit(): void
    {
    }

    public init(): void
    {
        this.isInitialized = true;

        setTimeout(() =>
        {
            const controlsConfig = {};

            // SETUP FORM TEMPLATES
            this.config.template = this.manager.setupTemplate(this.config.template, this.configService.forms.formTemplates);

            for (const group of this.config.groups)
            {
                // SETUP GROUP TEMPLATES
                group.template = this.manager.setupTemplate(group.template, this.configService.forms.groupTemplates);

                for (const input of group.children)
                {
                    // SETUP INPUT TEMPLATES
                    input.template = this.manager.setupTemplate(input.template, this.configService.forms.inputTemplates);

                    const validators = this.manager.getValidators(input);
                    const validationMessages = this.manager.getValidatorsMessages(input);

                    if (input.advancedSettings == null) input.advancedSettings = {};
                    input.advancedSettings.validationMessages = validationMessages;

                    CONTROL_FUNCTIONS[input.type].initialize(input, this.configService);

                    controlsConfig[input.name] = ['', validators, input.advancedSettings.asyncValidators];
                };
            };

            this.form = this.fb.group(controlsConfig);

            setTimeout(() =>
            {
                this.updateFormValues();

                this.isValid = this.form.valid;

                const runCustomFunctionsOnLoad = this.config.behaviors.runCustomFunctionsOnLoad ?? false;

                if (runCustomFunctionsOnLoad)
                {
                    this.checkCustomFunctions();
                }

                this.form.statusChanges
                    .pipe(
                        debounceTime(this.config.behaviors.debounceTime ?? 400),
                        takeWhile(() => this.isComponentActive),
                    )
                    .subscribe(() =>
                    {
                        this.checkCustomFunctions();
                    });

            }, 0);
        }, 0);
    }

    public ngOnChanges(changes: SimpleChanges): void
    {
        if (changes.config != null && !this.isInitialized)
        {
            // PRIMEIRA ALTERAÇÃO
            this.init();
        }
        else if (changes.config != null && this.form != null)
        {
            if (this.isFirstUpdate)
            {
                this.emitChanges = true;
                this.isFirstUpdate = false;
            }
            else
            {
                this.emitChanges = false;
            }

            setTimeout(() =>
            {
                this.updateFormValues();
                setTimeout(() => { this.resetState(); }, 0);
            }, 0);
        }
    }

    /** Limpa todos os valores default */
    public clearFormValues(): void
    {
        for (const group of this.config.groups)
        {
            for (const input of group.children)
            {
                CONTROL_FUNCTIONS[input.type].clear(this.form.controls[input.name]);
            };
        };
    }

    /** Atualiza o state do formulário com seus valores atuais */
    public resetState(): void
    {
        const data = this.form.value;
        this.originalState = JSON.stringify(data).replace(/['"]+/g, '');
        this.updateHasChanges();
    }

    /** Atualiza o hasChanges */
    public updateHasChanges(): void
    {
        const data = this.form.value;

        const original = this.originalState;
        const current = JSON.stringify(data).replace(/['"]+/g, '');

        this.hasChanges = original !== current;

        this.cdf.markForCheck();
    }

    /** Atualiza os valores dos inputs com seus dados default */
    public updateFormValues(): void
    {

        for (const group of this.config.groups)
        {
            for (const input of group.children)
            {
                CONTROL_FUNCTIONS[input.type].updateValue(this.form.controls[input.name], input);
            };
        };

        this.form.markAsPristine();
        this.cdf.markForCheck();
    }

    public ngAfterViewInit(): void
    {

    }

    private checkCustomFunctions(): void
    {
        const data = this.getData();

        if (this.config.functions.customValidator != null)
        {
            this.isValid = this.config.functions.customValidator(data, this.form);
        }
        else
        {
            this.isValid = this.form.valid;
        }

        if (this.config.behaviors.skipFunctionAfterNextEmit)
        {
            this.config.behaviors.skipFunctionAfterNextEmit = false;
        }
        else
        {
            if (this.config.functions.customBehavior != null)
            {
                this.config.functions.customBehavior(data, this.config, this.form, {});
            }

            if (this.emitChanges)
            {
                this.statusChanges.emit(data);
            }
            else
            {
                this.emitChanges = true;
            }
        }

        setTimeout(() =>
        {
            this.updateHasChanges();
        }, 0);

    }

    /** Retorna o objeto com os valores dos inputs; Esse objeto seguirá a nomemclatura do campo name de cada inputConfig */
    public getData<T>(): SmzFormsResponse<T>
    {
        const data: T = {} as T;
        const response: SmzFormsResponse<T> = { data, isValid: this.form.valid };

        for (const group of this.config.groups)
        {
            for (const input of group.children)
            {
                response.data[input.propertyName] = CONTROL_FUNCTIONS[input.type].getValue(this.form, input);
            };
        };

        return response;

    }

    ngOnDestroy(): void
    {
        this.isComponentActive = false;
    }

}

