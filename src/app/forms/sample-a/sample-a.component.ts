import { Component, OnInit } from '@angular/core';
import { DynamicDialogsService, FormGroupComponent, SmzForms, SmzFormsResponse, SmzFormsControl, SmzTextControl, SmzNumberControl, SmzControlType, SmzDropDownControl, SmzMultiSelectControl } from 'ngx-smz-dialogs';
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
    selector: 'demo-sample-a',
    templateUrl: './sample-a.component.html',
})
export class SampleAComponent implements OnInit
{
    public formConfig: SmzForms<Animals>;
    constructor() { }

    ngOnInit(): void
    {
        setTimeout(() => {
            this.createForm();
        }, 0);
    }

    public show(): void
    {

    }

    public createForm(): void
    {
        const name1Control: SmzFormsControl<SmzTextControl> = {
            propertyName: 'name1', type: SmzControlType.TEXT, name: 'Nome 1', defaultValue: 'Leão',
            validatorsPreset: { isRequired: true }, isDisabled: false, isVisible: true,
            template: { extraSmall: { row: 'col-4' } }
        };

        const name2Control: SmzFormsControl<SmzTextControl> = {
            propertyName: 'name2', type: SmzControlType.TEXT, name: 'Nome 2', defaultValue: 'Leão',
            validatorsPreset: { isRequired: true }, isDisabled: false, isVisible: true,
            template: { extraSmall: { row: 'col-4' } }
        };

        const name3Control: SmzFormsControl<SmzTextControl> = {
            propertyName: 'name3', type: SmzControlType.TEXT, name: 'Nome 3', defaultValue: 'Leão',
            validatorsPreset: { isRequired: true }, isDisabled: false, isVisible: true,
            template: { extraSmall: { row: 'col-4' } }
        };

        const name4Control: SmzFormsControl<SmzTextControl> = {
            propertyName: 'name4', type: SmzControlType.TEXT, name: 'Nome 4', defaultValue: 'Leão',
            validatorsPreset: { isRequired: true }, isDisabled: false, isVisible: true,
            template: { extraSmall: { row: 'col-8' } }
        };

        const ageControl: SmzFormsControl<SmzNumberControl> = {
            propertyName: 'age', type: SmzControlType.NUMBER, name: 'Idade', defaultValue: 20,
            validatorsPreset: { isRequired: true, min: 5, max: 30 }, isDisabled: false, isVisible: true,
            template: { extraSmall: { row: 'col-4' } }
        };

        const moodControl: SmzFormsControl<SmzDropDownControl<string>> = {
            propertyName: 'mood', type: SmzControlType.DROPDOWN, name: 'Humor',
            options: MOODS, defaultValue: '1', isDisabled: false, isVisible: true,
        };

        const colorsControl: SmzFormsControl<SmzDropDownControl<string>> = {
            propertyName: 'colors', type: SmzControlType.DROPDOWN, name: 'Cores',
            options: COLORS, isDisabled: false, isVisible: true,
            validatorsPreset: { isRequired: false },
        };

        const multiColorsControl: SmzFormsControl<SmzMultiSelectControl<string>> = {
            propertyName: 'colors', type: SmzControlType.MULTI_SELECT, name: 'Cores',
            options: COLORS, defaultValue: [], isDisabled: false, isVisible: true,
            validatorsPreset: { isRequired: true },
            template: { extraSmall: { row: 'col-12' } }
        };

        const periodsControl: SmzFormsControl<SmzDropDownControl<string>> = {
            propertyName: 'name4', type: SmzControlType.DROPDOWN, name: 'Período de Passagem',
            options: ZODIAC_PERIODS, defaultValue: '',
            validatorsPreset: { isRequired: true }, isDisabled: false, isVisible: true,
        };

        const signControl: SmzFormsControl<SmzLinkedDropDownControl<string>> = {
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

    }

    public log(form: FormGroupComponent): void
    {
        console.log(form.getData());
    }

}
