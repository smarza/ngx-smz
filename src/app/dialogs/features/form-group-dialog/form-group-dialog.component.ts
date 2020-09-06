import { Component, OnInit } from '@angular/core';
import { DynamicDialogsService, FormGroupComponent, SmzForms, SmzFormsResponse, SmzTextControl, SmzNumberControl, SmzControlType, SmzDropDownControl, SmzMultiSelectControl } from 'ngx-smz-dialogs';
import { SimpleNamedEntity } from 'projects/ngx-smz/src/public-api';
import { MOODS, COLORS, ZODIAC_PERIODS, ZODIAC, ZODIAC_LINKED } from 'src/app/demo/models/demo-data.model';
import { SmzLinkedDropDownControl } from 'projects/ngx-smz-dialogs/src/public-api';

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
        const name1Control: SmzTextControl = {
            propertyName: 'name1', type: SmzControlType.TEXT, name: 'Nome 1', defaultValue: 'Leão',
            validatorsPreset: { isRequired: true }, isDisabled: false, isVisible: true,
        };

        const name2Control: SmzTextControl = {
            propertyName: 'name2', type: SmzControlType.TEXT, name: 'Nome 2', defaultValue: 'Leão',
            validatorsPreset: { isRequired: true }, isDisabled: false, isVisible: true,
        };

        const name3Control: SmzTextControl = {
            propertyName: 'name3', type: SmzControlType.TEXT, name: 'Nome 3', defaultValue: 'Leão',
            validatorsPreset: { isRequired: true }, isDisabled: false, isVisible: true,
        };

        const name4Control: SmzTextControl = {
            propertyName: 'name4', type: SmzControlType.TEXT, name: 'Nome 4', defaultValue: 'Leão',
            validatorsPreset: { isRequired: true }, isDisabled: false, isVisible: true,
        };

        const ageControl: SmzNumberControl = {
            propertyName: 'age', type: SmzControlType.NUMBER, name: 'Idade', defaultValue: 20,
            validatorsPreset: { isRequired: true, min: 5, max: 30 }, isDisabled: false, isVisible: true,
        };

        const moodControl: SmzDropDownControl<string> = {
            propertyName: 'mood', type: SmzControlType.DROPDOWN, name: 'Humor',
            options: MOODS, defaultValue: '1', isDisabled: false, isVisible: true,
        };

        const colorsControl: SmzDropDownControl<string> = {
            propertyName: 'colors', type: SmzControlType.DROPDOWN, name: 'Cores',
            options: COLORS, isDisabled: false, isVisible: true,
            validatorsPreset: { isRequired: false }
        };

        const multiColorsControl: SmzMultiSelectControl<string> = {
            propertyName: 'colors', type: SmzControlType.MULTI_SELECT, name: 'Cores',
            options: COLORS, defaultValue: [], isDisabled: false, isVisible: true,
            validatorsPreset: { isRequired: true }
        };

        const periodsControl: SmzDropDownControl<string> = {
            propertyName: 'name4', type: SmzControlType.DROPDOWN, name: 'Período de Passagem',
            options: ZODIAC_PERIODS, defaultValue: '',
            validatorsPreset: { isRequired: true }, isDisabled: false, isVisible: true,
        };

        const signControl: SmzLinkedDropDownControl<string> = {
            propertyName: 'age', type: SmzControlType.LINKED_DROPDOWN, name: 'Signo do Zodiaco',
            options: ZODIAC_LINKED, defaultValue: '',
            validatorsPreset: { isRequired: true }, isDisabled: false, isVisible: true,
        };

        this.formConfig = {
            behaviors: {
                avoidFocusOnLoad: true,
                debounceTime: 400,
                runCustomFunctionsOnLoad: false,
                skipFunctionAfterNextEmit: false,
                flattenResponse: true
            },
            groups: [
                {
                    name: 'Básico', showName: true,
                    children: [ name1Control, name2Control, name3Control, name4Control, ageControl ],
                },
                {
                    name: 'Humor', showName: true,
                    children: [ moodControl, colorsControl, multiColorsControl ],
                },
                {
                    name: 'Astrologia', showName: true,
                    children: [ periodsControl, signControl ],
                }
            ],
            entryComponents: [],
        };

        this.hasUnsaved = false;

    }

}
