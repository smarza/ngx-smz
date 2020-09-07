import { Component, OnInit } from '@angular/core';
import { FormGroupComponent, SmzForms, SmzControlType, SmzDropDownControl } from 'ngx-smz-dialogs';
import { SimpleNamedEntity } from 'projects/ngx-smz/src/public-api';
import { SmzLinkedDropDownControl } from 'projects/ngx-smz-dialogs/src/public-api';
import { STATES } from '../data/linked-data';

interface Animals
{
    name: string;
    age: number;
    mood: SimpleNamedEntity;
    isHungry: Boolean;
}

@Component({
    selector: 'demo-linked-1',
    templateUrl: './linked-1.component.html',
})
export class Linked1Component implements OnInit
{
    public formConfig: SmzForms<Animals>;
    public formConfig2: SmzForms<Animals>;
    constructor() { }

    ngOnInit(): void
    {
        setTimeout(() =>
        {
            this.createForm();
        }, 0);
    }

    public show(): void
    {

    }

    public createForm(): void
    {

        const estados: SmzDropDownControl<string> = {
            propertyName: 'estados', type: SmzControlType.DROPDOWN, name: 'Estado',
            options: STATES.map(x => ({ id: x.id, name: x.name })), defaultValue: '',
            validatorsPreset: { isRequired: true }, isDisabled: false, isVisible: true, showFilter: true,
            template: { extraSmall: { row: 'col-6' } }
        };

        const cidade: SmzLinkedDropDownControl<string> = {
            propertyName: 'city', type: SmzControlType.LINKED_DROPDOWN, name: 'Nascimento',
            options: STATES.map(x => ({ parentId: x.id, data: x.cities.map(c => ({ id: c, name: c })) })),
            defaultValue: '', dependsOn: { propertyName: 'estados' },
            validatorsPreset: { isRequired: true }, isDisabled: false, isVisible: true,
            template: { extraSmall: { row: 'col-6' } }
        };

        this.formConfig = {
            formId: 'form1',
            behaviors: { flattenResponse: true },
            groups: [
                {
                    name: 'Nascimento', showName: true,
                    children: [estados, cidade],
                    template: { extraSmall: { row: 'col-12' } }
                }
            ],
        };

        const cidade1: SmzLinkedDropDownControl<string> = {
            propertyName: 'city1', type: SmzControlType.LINKED_DROPDOWN, name: 'Cidade mais próxima da cidade onde nasceu',
            options: STATES.map(x => ({ parentId: x.id, data: x.cities.map(c => ({ id: c, name: c })) })),
            defaultValue: '', dependsOn: { propertyName: 'estados', formId: 'form1' },
            validatorsPreset: { isRequired: true }, isDisabled: false, isVisible: true,
            template: { extraSmall: { row: 'col-12' } }
        };

        const estados2: SmzDropDownControl<string> = {
            propertyName: 'estados2', type: SmzControlType.DROPDOWN, name: 'Estado',
            options: STATES.map(x => ({ id: x.id, name: x.name })), defaultValue: '',
            validatorsPreset: { isRequired: true }, isDisabled: false, isVisible: true,
            template: { extraSmall: { row: 'col-6' } }
        };

        const cidade2: SmzLinkedDropDownControl<string> = {
            propertyName: 'city2', type: SmzControlType.LINKED_DROPDOWN, name: 'Onde Gostaria de Morar ?',
            options: STATES.map(x => ({ parentId: x.id, data: x.cities.map(c => ({ id: c, name: c })) })),
            defaultValue: '', dependsOn: { propertyName: 'estados2' },
            validatorsPreset: { isRequired: true }, isDisabled: false, isVisible: true,
            template: { extraSmall: { row: 'col-6' } }
        };

        this.formConfig2 = {
            formId: 'form2',
            behaviors: { flattenResponse: false },
            groups: [
                {
                    name: 'Enquete', showName: true,
                    children: [cidade1],
                    template: { extraSmall: { row: 'col-12' } }
                },
                {
                    name: 'Preferências', showName: true,
                    children: [estados2, cidade2],
                    template: { extraSmall: { row: 'col-12' } }
                }
            ],
        };

    }

    public log(form: FormGroupComponent): void
    {
        console.log(form.getData());
    }

}
