import { Component, OnInit } from '@angular/core';
import { FormGroupComponent, SmzForms, SmzTextControl, SmzNumberControl, SmzControlType, SmzDropDownControl, SmzMultiSelectControl } from 'ngx-smz-dialogs';
import { SimpleNamedEntity } from './node_modules/projects/ngx-smz/src/public-api';
import { MOODS, COLORS, ZODIAC_PERIODS, ZODIAC_LINKED } from './node_modules/src/app/demo/models/demo-data.model';
import { SmzLinkedDropDownControl } from './node_modules/projects/ngx-smz-dialogs/src/public-api';

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
    public formConfig2: SmzForms<Animals>;
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
        const name1Control: SmzTextControl = {
            propertyName: 'name1', type: SmzControlType.TEXT, name: 'Nome 1', defaultValue: 'Leão',
            validatorsPreset: { isRequired: true }, isDisabled: false, isVisible: true,
            template: { extraSmall: { row: 'col-4' } }
        };

        const name2Control: SmzTextControl = {
            propertyName: 'name2', type: SmzControlType.TEXT, name: 'Nome 2', defaultValue: 'Leão',
            validatorsPreset: { isRequired: true }, isDisabled: false, isVisible: true,
            template: { extraSmall: { row: 'col-4' } }
        };

        const name3Control: SmzTextControl = {
            propertyName: 'name3', type: SmzControlType.TEXT, name: 'Nome 3', defaultValue: 'Leão',
            validatorsPreset: { isRequired: true }, isDisabled: false, isVisible: true,
            template: { extraSmall: { row: 'col-4' } }
        };

        const name4Control: SmzTextControl = {
            propertyName: 'name4', type: SmzControlType.TEXT, name: 'Nome 4', defaultValue: 'Leão',
            validatorsPreset: { isRequired: true }, isDisabled: false, isVisible: true,
            template: { extraSmall: { row: 'col-8' } }
        };

        const ageControl: SmzNumberControl = {
            propertyName: 'age', type: SmzControlType.NUMBER, name: 'Idade', defaultValue: 20,
            validatorsPreset: { isRequired: true, min: 5, max: 30 }, isDisabled: false, isVisible: true,
            template: { extraSmall: { row: 'col-4' } }
        };

        const moodControl: SmzDropDownControl<string> = {
            propertyName: 'mood', type: SmzControlType.DROPDOWN, name: 'Humor',
            options: MOODS, defaultValue: '1', isDisabled: false, isVisible: true,
        };

        const colorsControl: SmzDropDownControl<string> = {
            propertyName: 'color', type: SmzControlType.DROPDOWN, name: 'Cores',
            options: COLORS, isDisabled: false, isVisible: true,
            validatorsPreset: { isRequired: false },
        };

        const multiColorsControl: SmzMultiSelectControl<string> = {
            propertyName: 'colors', type: SmzControlType.MULTI_SELECT, name: 'Cores',
            options: COLORS, defaultValue: [], isDisabled: false, isVisible: true,
            validatorsPreset: { isRequired: true },
            template: { extraSmall: { row: 'col-12' } }
        };

        const periodsControl: SmzDropDownControl<string> = {
            propertyName: 'name5', type: SmzControlType.DROPDOWN, name: 'Período de Passagem',
            options: ZODIAC_PERIODS, defaultValue: '',
            validatorsPreset: { isRequired: true }, isDisabled: false, isVisible: true,
            template: { extraSmall: { row: 'col-12' } }
        };

        const periodsControl2: SmzDropDownControl<string> = {
            propertyName: 'name6', type: SmzControlType.DROPDOWN, name: 'Período de Passagem 2',
            options: ZODIAC_PERIODS, defaultValue: '',
            validatorsPreset: { isRequired: true }, isDisabled: false, isVisible: true,
            template: { extraSmall: { row: 'col-12' } }
        };

        const signControl: SmzLinkedDropDownControl<string> = {
            propertyName: 'zodiac', type: SmzControlType.LINKED_DROPDOWN, name: 'Signo do Zodiaco',
            options: ZODIAC_LINKED, defaultValue: '', dependsOn: { propertyName: 'name5' },
            validatorsPreset: { isRequired: true }, isDisabled: false, isVisible: true,
            template: { extraSmall: { row: 'col-6' } }
        };

        const signControl2: SmzLinkedDropDownControl<string> = {
            propertyName: 'zodiac2', type: SmzControlType.LINKED_DROPDOWN, name: 'Signo do Zodiaco 2',
            options: ZODIAC_LINKED, defaultValue: '', dependsOn: { propertyName: 'name5' },
            validatorsPreset: { isRequired: true }, isDisabled: false, isVisible: true,
            template: { extraSmall: { row: 'col-6' } }
        };

        const signControl3: SmzLinkedDropDownControl<string> = {
            propertyName: 'zodiac3', type: SmzControlType.LINKED_DROPDOWN, name: 'Signo do Zodiaco 3',
            options: ZODIAC_LINKED, defaultValue: '', dependsOn: { propertyName: 'name6' },
            validatorsPreset: { isRequired: true }, isDisabled: false, isVisible: true,
            template: { extraSmall: { row: 'col-6' } }
        };

        this.formConfig = {
            formId: 'form1',
            behaviors: {
                avoidFocusOnLoad: true,
                debounceTime: 400,
                runCustomFunctionsOnLoad: false,
                skipFunctionAfterNextEmit: false,
                flattenResponse: true
            },
            groups: [
                // {
                //     name: 'Básico', showName: true,
                //     children: [ name1Control, name2Control, name3Control, name4Control, ageControl ],
                // },
                // {
                //     name: 'Humor', showName: true,
                //     children: [ moodControl, colorsControl, multiColorsControl ],
                // },
                {
                    name: 'Astrologia', showName: true,
                    children: [ periodsControl, signControl, signControl2, periodsControl2, signControl3 ],
                    template: { extraSmall: { row: 'col-12' } }
                }
            ],
            entryComponents: [],
        };


        const signControl4: SmzLinkedDropDownControl<string> = {
            propertyName: 'zodiac4', type: SmzControlType.LINKED_DROPDOWN, name: 'Signo do Zodiaco 3',
            options: ZODIAC_LINKED, defaultValue: '', dependsOn: { propertyName: 'name6', formId: 'form1' },
            validatorsPreset: { isRequired: true }, isDisabled: false, isVisible: true,
            template: { extraSmall: { row: 'col-6' } }
        };

        this.formConfig2 = {
            behaviors: {
                avoidFocusOnLoad: true,
                debounceTime: 400,
                runCustomFunctionsOnLoad: false,
                skipFunctionAfterNextEmit: false,
                flattenResponse: true
            },
            groups: [
                // {
                //     name: 'Básico', showName: true,
                //     children: [ name1Control, name2Control, name3Control, name4Control, ageControl ],
                // },
                // {
                //     name: 'Humor', showName: true,
                //     children: [ moodControl, colorsControl, multiColorsControl ],
                // },
                {
                    name: 'Astrologia 2', showName: true,
                    children: [ periodsControl2, signControl3 ],
                    template: { extraSmall: { row: 'col-12' } }
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
