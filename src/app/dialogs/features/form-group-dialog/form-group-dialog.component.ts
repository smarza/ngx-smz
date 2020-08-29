import { Component, OnInit } from '@angular/core';
import { DynamicDialogsService, FormGroupComponent, SmzForms, SmzFormsResponse, SmzFormsControl, SmzTextControl, SmzNumberControl, SmzControlType } from 'ngx-smz-dialogs';
import { SimpleNamedEntity } from 'projects/ngx-smz/src/public-api';

interface Animals
{
    name: string;
    age: number;
    mood: SimpleNamedEntity;
    isHungry: Boolean;
}

@Component({
    selector: 'demo-form-group-dialog',
    templateUrl: './form-group-dialog.component.html',
    styleUrls: ['./form-group-dialog.component.scss']
})
export class FormGroupDialogComponent implements OnInit
{
    public formConfig: SmzForms<Animals>;
    public hasUnsaved = false;
    constructor(private dialogs: DynamicDialogsService) { }

    ngOnInit(): void
    {
        this.createForm();
    }

    public show(): void
    {

    }

    public onFormChange(event: SmzFormsResponse<Animals>): void
    {
        if (event.isValid)
        {
            console.log('isValid', event);
            this.hasUnsaved = true;
        }
        else
        {
            this.hasUnsaved = false;
        }
    }

    public clear(formComponent: FormGroupComponent): void
    {
        formComponent.clearFormValues();
    }

    public test(formComponent: FormGroupComponent): void
    {
        console.log(formComponent);
        formComponent.form.markAllAsTouched();
    }


    public resetForm(): void
    {
        this.formConfig = null
        this.hasUnsaved = false;
    }

    public createForm(): void
    {


        const nameControl: SmzFormsControl<SmzTextControl> = {
            propertyName: 'name',
            type: SmzControlType.TEXT,
            name: 'Nome',
            defaultValue: 'Leão',
            validators: {
                isRequired: true
            },
            isDisabled: false,
            isVisible: true,
            advancedSettings: {
                validators: [],
                validationMessages: []
            }
        };

        const ageControl: SmzFormsControl<SmzNumberControl> = {
            propertyName: 'age',
            type: SmzControlType.NUMBER,
            name: 'Idade',
            defaultValue: 20,
            validators: {
                isRequired: true
            },
            isDisabled: false,
            isVisible: true,
            advancedSettings: {
                validators: [],
                validationMessages: []
            }
        };


        this.formConfig = {
            behaviors: {
                avoidFocusOnLoad: true,
                debounceTime: 400,
                runCustomFunctionsOnLoad: false,
                skipFunctionAfterNextEmit: false,
            },
            functions: {
                customValidator: null,
                customBehavior: null
            },
            groups: [
                {
                    name: 'Básico',
                    showName: true,
                    children: [
                        nameControl, ageControl
                    ],
                    template: {
                        horizontalAlignment: 'justify-content-start',
                        verticalAlignment: 'align-items-center'
                    }
                }
            ],
            entryComponents: [],
        };

        this.hasUnsaved = false;

    }

}
