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
    selector: 'demo-sample-b',
    templateUrl: './sample-b.component.html',
})
export class SampleBComponent implements OnInit
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
            template: { extraSmall: { row: 'col-8' } }
        };

        const name2Control: SmzFormsControl<SmzTextControl> = {
            propertyName: 'name2', type: SmzControlType.TEXT, name: 'Nome 2', defaultValue: 'Leão',
            validatorsPreset: { isRequired: true }, isDisabled: false, isVisible: true,
            template: { extraSmall: { row: 'col-4' } }
        };

        const name3Control: SmzFormsControl<SmzTextControl> = {
            propertyName: 'name3', type: SmzControlType.TEXT, name: 'Nome 3', defaultValue: 'Leão',
            validatorsPreset: { isRequired: true }, isDisabled: false, isVisible: true,
            template: { extraSmall: { row: 'col-6' } }
        };

        const name4Control: SmzFormsControl<SmzTextControl> = {
            propertyName: 'name4', type: SmzControlType.TEXT, name: 'Nome 4', defaultValue: 'Leão',
            validatorsPreset: { isRequired: true }, isDisabled: false, isVisible: true,
            template: { extraSmall: { row: 'col-6' } }
        };

        const ageControl: SmzFormsControl<SmzNumberControl> = {
            propertyName: 'age', type: SmzControlType.NUMBER, name: 'Idade', defaultValue: 20,
            validatorsPreset: { isRequired: true, min: 5, max: 30 }, isDisabled: false, isVisible: true,
            template: { extraSmall: { row: 'col-12' } }
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
            ],
            entryComponents: [],
        };

    }

}
