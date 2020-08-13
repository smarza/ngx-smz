import { ViewEncapsulation, Component, OnInit, AfterViewInit, OnDestroy, Input, Output, EventEmitter, OnChanges, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { debounceTime, takeWhile } from 'rxjs/operators';
import { InjectableDialogComponentInterface } from '../../../../common/modules/inject-content/models/injectable-dialog-component.interface';
import { FormGroupDialogResponse, FormGroupConfig, SelectEntity, FormGroupInputData } from '../../models/form-group.models';
import { SimpleNamedEntity } from '../../../../common/models/simple-named-entity';
import { ResponsiveService } from '../../../smz-dialogs/services/responsive.service';

@Component({
    selector: 'smz-form-group',
    templateUrl: './form-group.component.html',
    styleUrls: ['./form-group.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class FormGroupComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy, InjectableDialogComponentInterface<FormGroupDialogResponse> {
    public isComponentActive = true;
    public form: FormGroup;
    public isValid = false;
    @Input() public config: FormGroupConfig;
    @Output() public statusChanges: EventEmitter<FormGroupDialogResponse> = new EventEmitter<FormGroupDialogResponse>();
    private _files: { name: string, file: File }[] = [];
    private isFirstUpdate = true;
    private emitChanges = true;

    constructor(public fb: FormBuilder, public responsive: ResponsiveService, private cdf: ChangeDetectorRef)
    {

    }
    ngOnInit(): void
    {

        // console.log('FormGroupComponent', this.config);
        const controlsConfig = {};

        this.config.inputs.forEach(i =>
        {
            controlsConfig[i.name] = [i.data ? i.data : '', i.validators, i.asyncValidators];

            if (i.type === 'file')
            {
                this._files.push({ name: i.name, file: null });
            }
        });

        // console.log('controlsConfig', controlsConfig);
        this.form = this.fb.group(controlsConfig);
    }

    ngOnChanges(changes: SimpleChanges): void
    {
        if (changes.config != null)
        {
            const config: FormGroupConfig = changes.config.currentValue;

            // console.log('ngOnChanges', config.inputs[0].defaultValue);

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
            }, 0);
        }
    }
    public clearFormValues(): void
    {
        this.config.inputs.forEach(i =>
        {
            i.defaultValue = '';
        });

        this.updateFormValues();
    }

    public updateFormValues(): void
    {
        this.config.inputs.forEach(i =>
        {
            if ((i.type === 'checkbox-group' || i.type === 'radio' || i.type === 'text' || i.type === 'number' || i.type === 'text-area') && i.defaultValue != null)
            {
                this.form.controls[i.name].patchValue(i.defaultValue);
            }
            else if (i.type === 'mask')
            {
                this.form.controls[i.name].patchValue(i.defaultValue);
            }
            else if ((i.type === 'checkbox'))
            {
                this.form.controls[i.name].patchValue(i.defaultValue != null && i.defaultValue === true ? true : false);
            }
            else if ((i.type === 'switch'))
            {
                this.form.controls[i.name].patchValue(i.defaultValue != null && i.defaultValue === true ? true : false);
            }
            else if ((i.type === 'hidden'))
            {
                this.form.controls[i.name].patchValue(i.defaultValue);
            }
            else if ((i.type === 'calendar'))
            {
                this.form.controls[i.name].patchValue(i.defaultValue);
            }
            else if ((i.type === 'colorpicker'))
            {
                this.form.controls[i.name].patchValue(i.defaultValue);
            }
            else if ((i.type === 'dropdown'))
            {
                this.form.controls[i.name].patchValue(i.defaultValue);
            }
            else if ((i.type === 'currency') && i.defaultValue != null)
            {
                this.form.controls[i.name].patchValue(Number(i.defaultValue));
            }
            else if ((i.type === 'multiselect') && i.defaultValue != null)
            {

                if (i.defaultValue == null || i.defaultValue.length === 0)
                {
                    this.form.controls[i.name].patchValue(null);
                }
                else
                {
                    const selectData = (i.data as SelectEntity[]);
                    const defaultValue = selectData.filter(d => (i.defaultValue as SelectEntity[]).findIndex(value => value.id === d.id) > -1);

                    this.form.controls[i.name].patchValue(defaultValue);
                }
            }

            i.inputFormControl = this.form.controls[i.name];

            if (i.isDisabled != null && i.isDisabled)
            {
                // console.log(`Disabling... ${i.name}`);
                i.inputFormControl.disable();
            }
            else
            {
                i.inputFormControl.enable();
            }

        });

        this.form.markAsPristine();

        this.cdf.markForCheck();
    }

    ngAfterViewInit(): void
    {
        setTimeout(() =>
        {
            this.updateFormValues();

            this.isValid = this.form.valid;

            const runCustomFunctionsOnLoad = this.config.runCustomFunctionsOnLoad ?? false;

            if (runCustomFunctionsOnLoad)
            {
                this.checkCustomFunctions();
            }

            this.form.statusChanges
                .pipe(
                    debounceTime(this.config.debounceTime ?? 400),
                    takeWhile(x => this.isComponentActive),
                )
                .subscribe((statusChanges) =>
                {
                    this.checkCustomFunctions();
                });

        }, 0);

    }

    private checkCustomFunctions(): void
    {
        const data = this.getData();

        if (this.config.customValidator != null)
        {
            this.isValid = this.config.customValidator(data, this.form);
        }
        else
        {
            this.isValid = this.form.valid;
        }

        if (this.config.skipFunctionAfterNextEmit)
        {
            // console.log('skipFunctionAfterNextEmit');
            this.config.skipFunctionAfterNextEmit = false;
        }
        else
        {
            if (this.config.customBehavior != null)
            {
                this.config.customBehavior(data, this.config, this.form, {});
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

        // console.log('isValid', this.isValid);
        // console.log('updateOn', this.form.updateOn);
        // if (!this.isValid)
        // {
        //     console.log('markAllAsTouched');
        //     this.form.markAllAsTouched();
        // }

    }

    public getData(): FormGroupDialogResponse
    {

        const response: FormGroupDialogResponse = { data: {}, isValid: this.form.valid };

        this.config.inputs.forEach(i =>
        {
            switch (i.type)
            {
                case 'hidden':
                    response.data[i.name] = i.defaultValue;
                    break;

                case 'number':
                    const newNumber = Number(this.form.get(i.name).value);
                    response.data[i.name] = newNumber;
                    break;

                case 'radio':
                    const choice = this.form.get(i.name).value;
                    const newChoice = (i.data as SimpleNamedEntity[]).find(d => d.id === choice);
                    response.data[i.name] = newChoice;
                    break;

                case 'checkbox':
                    const checkboxValue = this.form.get(i.name).value;
                    response.data[i.name] = checkboxValue;
                    break;

                case 'switch':
                    const switchValue = this.form.get(i.name).value;
                    response.data[i.name] = switchValue;
                    break;

                case 'checkbox-group':
                    const checkboxGroupValue = this.form.get(i.name).value as string[];

                    if (checkboxGroupValue != null && checkboxGroupValue.length > 0)
                    {
                        const selectedIds = checkboxGroupValue.join(' ');
                        const seletedOptions = (i.data as SimpleNamedEntity[]).filter(d => selectedIds.includes(d.id));
                        response.data[i.name] = seletedOptions;
                    }
                    else
                    {
                        response.data[i.name] = [];
                    }

                    break;

                case 'file':
                    const match = this._files.find(f => f.name === i.name);
                    response.data[i.name] = match.file;
                    break;

                case 'colorpicker':
                    const value: string = this.form.controls[i.name].value;
                    response.data[i.name] = value.includes('#') ? value : `#${value}`;
                    break;

                case 'multiselect':
                    const multiselectValue = this.form.controls[i.name].value;
                    response.data[i.name] = multiselectValue != null ? this.form.controls[i.name].value : [];
                    break;

                default:
                    response.data[i.name] = this.form.controls[i.name].value;
                    break;
            }


        });

        return response;

    }

    public onFileChange(event: File[], input: FormGroupInputData): void
    {
        const name = input.name;

        if (event.length > 0)
        {
            const match = this._files.find(f => f.name === name);
            const file = event[0];
            match.file = file;
            input['hasFile'] = match.file.name;
            this.form.controls[input.name].setValue(file);
        }
        else
        {
            input['hasFile'] = null;
            this.form.controls[input.name].setValue(null);
        }
    }

    ngOnDestroy(): void
    {
        this.isComponentActive = false;
    }

}

