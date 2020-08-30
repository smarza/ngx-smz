import { Component, OnInit } from '@angular/core';
import { DynamicDialogsService, FormGroupComponent, SmzForms, SmzFormsResponse, SmzFormsControl, SmzTextControl, SmzNumberControl, SmzControlType, SmzDropDownControl, SmzMultiSelectControl } from 'ngx-smz-dialogs';
import { SimpleNamedEntity } from 'projects/ngx-smz/src/public-api';
import { MOODS, COLORS } from 'src/app/demo/models/demo-data.model';

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
        setTimeout(() => {
            this.createForm();
        }, 0);
    }

    public show(): void
    {

    }

    public onFormChange(event: SmzFormsResponse<Animals>): void
    {
        if (event.isValid)
        {
            // console.log('isValid', event);
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
        const name1Control: SmzFormsControl<SmzTextControl> = {
            propertyName: 'name1', type: SmzControlType.TEXT, name: 'Nome 1', defaultValue: 'Leão',
            validatorsPreset: { isRequired: true }, isDisabled: false, isVisible: true,
        };

        const name2Control: SmzFormsControl<SmzTextControl> = {
            propertyName: 'name2', type: SmzControlType.TEXT, name: 'Nome 2', defaultValue: 'Leão',
            validatorsPreset: { isRequired: true }, isDisabled: false, isVisible: true,
        };

        const name3Control: SmzFormsControl<SmzTextControl> = {
            propertyName: 'name3', type: SmzControlType.TEXT, name: 'Nome 3', defaultValue: 'Leão',
            validatorsPreset: { isRequired: true }, isDisabled: false, isVisible: true,
        };

        const name4Control: SmzFormsControl<SmzTextControl> = {
            propertyName: 'name4', type: SmzControlType.TEXT, name: 'Nome 4', defaultValue: 'Leão',
            validatorsPreset: { isRequired: true }, isDisabled: false, isVisible: true,
        };
        const ageControl: SmzFormsControl<SmzNumberControl> = {
            propertyName: 'age', type: SmzControlType.NUMBER, name: 'Idade', defaultValue: 20,
            validatorsPreset: { isRequired: true, min: 5, max: 30 }, isDisabled: false, isVisible: true,
            template: { extraSmall: { row: 'col-12' } },
        };

        const moodControl: SmzFormsControl<SmzDropDownControl<string>> = {
            propertyName: 'mood',
            type: SmzControlType.DROPDOWN,
            name: 'Humor',
            options: MOODS,
            defaultValue: '2',
            isDisabled: false,
            isVisible: true,
        };

        const colorsControl: SmzFormsControl<SmzDropDownControl<string>> = {
            propertyName: 'colors',
            type: SmzControlType.DROPDOWN,
            name: 'Cores',
            options: COLORS,
            isDisabled: false, isVisible: true,
            validatorsPreset: { isRequired: false }
        };

        const multiColorsControl: SmzFormsControl<SmzMultiSelectControl<string>> = {
            propertyName: 'colors',
            type: SmzControlType.MULTI_SELECT,
            name: 'Cores',
            options: COLORS,
            defaultValue: [],
            isDisabled: false,
            isVisible: true,
            validatorsPreset: { isRequired: true }
        };

        this.formConfig = {
            behaviors: {
                avoidFocusOnLoad: true,
                debounceTime: 400,
                runCustomFunctionsOnLoad: false,
                skipFunctionAfterNextEmit: false,
                flattenResponse: true
            },
            functions: {
                customValidator: null,
                customBehavior: null
            },
            template: {
                extraSmall: { horizontalAlignment: 'justify-content-start', verticalAlignment: 'align-items-start' }
            },
            groups: [
                {
                    name: 'Básico',
                    showName: true,
                    children: [
                        name1Control, name2Control, name3Control, name4Control, ageControl
                    ],
                    template: { extraSmall: { row: 'col-12' } },
                },
                {
                    name: 'Humor',
                    showName: true,
                    children: [
                        moodControl, colorsControl, multiColorsControl
                    ],
                    template: { extraSmall: { row: 'col-12' } },
                }
            ],
            entryComponents: [],
        };

        this.hasUnsaved = false;

    }

}
