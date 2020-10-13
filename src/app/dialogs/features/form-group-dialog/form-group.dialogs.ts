import { SmzDropDownControl, SmzControlType, SmzForm, SmzLinkedDropDownControl, SmzCheckBoxControl, SmzCalendarControl, SmzTextControl } from 'ngx-smz-dialogs';
import { OPTIONS_STRING, OPTIONS_STRING_DEPENDENCY } from 'src/app/forms/data/options';
import { STATES, DATA_BY_STATE, CITY_DEPENDENCY } from 'src/app/forms/data/linked-data';
import { SmzFileControl } from 'projects/ngx-smz-dialogs/src/public-api';

export interface Form1 {
    dropdownId: string;
}

export interface Form2 {
    parent1Id: string;
    linked1Id: string;
    linked2Id: string;
    linked3Id: string;
    linked4Id: string;
}

export interface Dialog2 {
    formStates: Form1;
    formChoices: Form2;
}

export namespace FormGroupDialogs
{
    export function getForm1(): SmzForm<any>
    {

        const input: SmzDropDownControl<string> = {
            propertyName: 'dropdown', type: SmzControlType.DROPDOWN, name: 'Dropdown',
            defaultValue: '1', showFilter: true, options: OPTIONS_STRING,
            template: { extraSmall: { row: 'col-12' } }
        };

        const input2: SmzTextControl = {
            propertyName: 'text', type: SmzControlType.TEXT, name: 'Dropdown',
            defaultValue: '155',
            template: { extraSmall: { row: 'col-12' } }
        };

        const input3: SmzFileControl = {
            propertyName: 'file',
            name: 'Arquivo Digitalizado',
            type: SmzControlType.FILE,
            outputFormat: 'base64'
        };

        return {
            formId: 'formStates',
            behaviors: { flattenResponse: true, avoidFocusOnLoad: true },
            groups: [
                {
                    name: '', showName: false,
                    children: [input, input2, input3],
                    template: { extraSmall: { row: 'col-12' } }
                }
            ],
        };

    }

    export function getForm2(): SmzForm<any>
    {

        const states = STATES.map(x => ({ id: x.id, name: x.name }));
        const parent: SmzDropDownControl<string> = {
            propertyName: 'parent1', type: SmzControlType.DROPDOWN, name: 'State',
            defaultValue: '', showFilter: true, options: states,
            template: { extraSmall: { row: 'col-12' } }
        };

        const linkedOptions1 = STATES.map(x => ({ parentId: x.id, data: x.cities.map(c => ({ id: c, name: c })) }));
        const linked1: SmzLinkedDropDownControl<string> = {
            propertyName: 'linked1', type: SmzControlType.LINKED_DROPDOWN, name: 'City',
            defaultValue: '', dependsOn: { propertyName: 'parent1'}, showFilter: true, options: linkedOptions1,
            template: { extraSmall: { row: 'col-6' } }
        };

        const linkedOptions2 = DATA_BY_STATE.map(x => ({ parentId: x.id, data: x.data.map(c => ({ id: c, name: c })) }));
        const linked2: SmzLinkedDropDownControl<string> = {
            propertyName: 'linked2', type: SmzControlType.LINKED_DROPDOWN, name: 'State Dependency',
            defaultValue: '', dependsOn: { propertyName: 'parent1'}, showFilter: true, options: linkedOptions2,
            template: { extraSmall: { row: 'col-6' } }
        };

        const linkedOptions3 = CITY_DEPENDENCY.map(x => ({ parentId: x.id, data: x.data.map(c => ({ id: c, name: c })) }));
        const linked3: SmzLinkedDropDownControl<string> = {
            propertyName: 'linked3', type: SmzControlType.LINKED_DROPDOWN, name: 'City Dependency',
            defaultValue: '', dependsOn: { propertyName: 'linked1'}, showFilter: true, options: linkedOptions3,
            template: { extraSmall: { row: 'col-6' } }
        };

        const linkedOptions4 = OPTIONS_STRING_DEPENDENCY.map(x => ({ parentId: x.id, data: x.data.map(c => ({ id: c, name: c })) }));
        const linked4: SmzLinkedDropDownControl<string> = {
            propertyName: 'linked4', type: SmzControlType.LINKED_DROPDOWN, name: 'Color Dependency',
            defaultValue: '', dependsOn: { propertyName: 'dropdown', formId: 'formStates' }, showFilter: true, options: linkedOptions4,
            template: { extraSmall: { row: 'col-6' } }
        };

        return {
            formId: 'formChoices',
            behaviors: { flattenResponse: true, avoidFocusOnLoad: true },
            groups: [
                {
                    name: 'Parent', showName: true,
                    children: [parent],
                    template: { extraSmall: { row: 'col-12' } }
                },
                {
                    name: 'Single Dependency', showName: true,
                    children: [linked1],
                    template: { extraSmall: { row: 'col-12' } }
                },
                {
                    name: 'Multiple Dependency', showName: true,
                    children: [linked2, linked3],
                    template: { extraSmall: { row: 'col-12' } }
                },
                {
                    name: 'ThirdParty Form Dependency', showName: true,
                    children: [linked4],
                    template: { extraSmall: { row: 'col-12' } }
                },
            ],
        };
    }

    export function getFormCheck(): SmzForm<any>
    {

        const finishDate: SmzCalendarControl = { name: 'Data de Execução', propertyName: 'finishDate', type: SmzControlType.CALENDAR, defaultValue: null, validatorsPreset: { isRequired: true } };

        const input: SmzCheckBoxControl = {
            propertyName: 'parent', type: SmzControlType.CHECKBOX, name: 'Mostrar',
            template: { extraSmall: { row: 'col-12' } },
            validatorsPreset: { isRequired: false }
        };

        return {
            formId: 'form-teste',
            behaviors: { flattenResponse: true, avoidFocusOnLoad: true },
            groups: [
                {
                    name: '', showName: false,
                    children: [finishDate, input],
                    template: { extraSmall: { row: 'col-12' } }
                }
            ],
        };

    }
}