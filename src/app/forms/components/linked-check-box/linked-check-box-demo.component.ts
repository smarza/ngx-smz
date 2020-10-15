import { Component, OnInit } from '@angular/core';
import { FormGroupComponent, SmzFormGroup, SmzForm, SmzControlType, SimpleNamedEntity, SmzCheckBoxControl, SmzTextControl, SmzDropDownControl } from 'ngx-smz-dialogs';

interface Response
{
    checkbox: boolean;
}

@Component({
    selector: 'app-linked-check-box-demo',
    templateUrl: './linked-check-box-demo.component.html',
})
export class LinkedCheckBoxDemoComponent implements OnInit
{
    public formConfig: SmzForm<Response>;
    constructor() { }

    ngOnInit(): void
    {
        this.createForm();
    }

    public show(): void
    {

    }

    public createForm(): void
    {

        const inputId: SmzTextControl = {
            propertyName: 'id', type: SmzControlType.TEXT, name: 'Texto 1',
            defaultValue: 'ididididd', isVisible: false,
            template: { extraSmall: { row: 'col-6' } },
            validatorsPreset: { isRequired: true }
        };


        const textInput1: SmzTextControl = {
            propertyName: 'text1', type: SmzControlType.TEXT, name: 'Texto 1',
            defaultValue: null,
            template: { extraSmall: { row: 'col-6' } },
            validatorsPreset: { isRequired: true }
        };

        const parentInput: SmzCheckBoxControl = {
            propertyName: 'parentCheckbox', type: SmzControlType.CHECKBOX, name: 'Informar Marca',
            defaultValue: null,
            template: { extraSmall: { row: 'col-6' } },
            validatorsPreset: { isRequired: false }
        };

        const textInput2: SmzTextControl = {
            propertyName: 'brand', type: SmzControlType.TEXT, name: 'Marca',
            defaultValue: null,
            template: { extraSmall: { row: 'col-6' } },
            visibilityDependsOn: { propertyName: 'parentCheckbox', reversed: false },
            validatorsPreset: { isRequired: true }
        };

        const textInput3: SmzTextControl = {
            propertyName: 'color', type: SmzControlType.TEXT, name: 'Cor',
            defaultValue: null,
            template: { extraSmall: { row: 'col-6' } },
            visibilityDependsOn: { propertyName: 'parentCheckbox', reversed: true },
            validatorsPreset: { isRequired: true }
        };

        // const states = STATES.map(x => ({ id: x.id, name: x.name }));
        // const parent: SmzDropDownControl<string> = {
        //     propertyName: 'parent1', type: SmzControlType.DROPDOWN, name: 'State',
        //     defaultValue: STATES[0].id, showFilter: true, options: states,
        //     template: { extraSmall: { row: 'col-12' } }
        // };

        // const linkedOptions1 = STATES.map(x => ({ parentId: x.id, data: x.cities.map(c => ({ id: c, name: c })) }));
        // const linked1: SmzLinkedDropDownControl<string> = {
        //     propertyName: 'linked1', type: SmzControlType.LINKED_DROPDOWN, name: 'City',
        //     defaultValue: null, dependsOn: { propertyName: 'parent1'}, showFilter: true, options: linkedOptions1,
        //     template: { extraSmall: { row: 'col-6' } }
        // };

        this.formConfig = {
            behaviors: { flattenResponse: false, avoidFocusOnLoad: true },
            groups: [
                {
                    name: '', showName: false,
                    children: [inputId, textInput1, parentInput, textInput2, textInput3],
                    template: { extraSmall: { row: 'col-12' } }
                },
                getAnalyseConfigurationFormGroup()
            ],
        };

    }

    public log(form: FormGroupComponent): void
    {
        console.log(form.getData());
    }

}


export function getAnalyseConfigurationFormGroup(): SmzFormGroup
{
    const useTemplate: SmzCheckBoxControl = {
        propertyName: 'useTemplate', name: 'Usar Modelo', type: SmzControlType.CHECKBOX,
        validatorsPreset: { isRequired: false }, template: { large: { row: 'col-12' } }
    };

    const preset: SmzDropDownControl<OperatorDefinitions> = {
        propertyName: 'template', name: 'Modelo', type: SmzControlType.DROPDOWN,
        options: Operators,
        visibilityDependsOn: { propertyName: 'useTemplate', reversed: false },
        validatorsPreset: { isRequired: true }, template: { large: { row: 'col-12' } }
    };

    const dateColumn: SmzDropDownControl<string> = {
        propertyName: 'dateColumn', name: 'Data', type: SmzControlType.DROPDOWN,
        options: ColumnIdentifiers,
        visibilityDependsOn: { propertyName: 'useTemplate', reversed: true },
        validatorsPreset: { isRequired: true }, template: { large: { row: 'col-12' } }
    };

    const valueColumn: SmzDropDownControl<string> = {
        propertyName: 'valueColumn', name: 'Valor Bruto', type: SmzControlType.DROPDOWN,
        options: ColumnIdentifiers,
        visibilityDependsOn: { propertyName: 'useTemplate', reversed: true },
        validatorsPreset: { isRequired: true }, template: { large: { row: 'col-12' } }
    };

    const netValueColumn: SmzDropDownControl<string> = {
        propertyName: 'netValueColumn', name: 'Valor Líquido', type: SmzControlType.DROPDOWN,
        options: ColumnIdentifiers,
        visibilityDependsOn: { propertyName: 'useTemplate', reversed: true },
        validatorsPreset: { isRequired: true }, template: { large: { row: 'col-12' } }
    };

    const confirmationColumn: SmzDropDownControl<string> = {
        propertyName: 'confirmationColumn', name: 'Identificação', type: SmzControlType.DROPDOWN,
        options: ColumnIdentifiers,
        visibilityDependsOn: { propertyName: 'useTemplate', reversed: true },
        validatorsPreset: { isRequired: true }, template: { large: { row: 'col-12' } }
    };

    const separator: SmzDropDownControl<string> = {
        propertyName: 'separator', name: 'Separador', type: SmzControlType.DROPDOWN,
        options: SeparatorIdentifiers,
        visibilityDependsOn: { propertyName: 'useTemplate', reversed: true },
        validatorsPreset: { isRequired: true }, template: { large: { row: 'col-12' } }
    };

    return {
        name: 'Configurações', showName: true,
        children: [useTemplate, preset, dateColumn, valueColumn, netValueColumn, confirmationColumn, separator],
        template: { extraSmall: { row: 'col-12' } }
    }
}

export const ColumnIdentifiers: SimpleNamedEntity[] = [
    { id: 'A', name: 'A' },
    { id: 'B', name: 'B' },
    { id: 'C', name: 'C' },
    { id: 'D', name: 'D' },
    { id: 'E', name: 'E' },
    { id: 'F', name: 'F' },
    { id: 'G', name: 'G' },
    { id: 'H', name: 'H' },
    { id: 'I', name: 'I' },
];

export const SeparatorIdentifiers: SimpleNamedEntity[] = [
    { id: ';', name: ';' },
    { id: ',', name: ',' },
];


export const enum OperatorDefinitions
{
    STONE,
    PAGSEGURO,
}

export const Operators = [
    {
        id: OperatorDefinitions.STONE,
        name: 'Stone'
    },
    {
        id: OperatorDefinitions.PAGSEGURO,
        name: 'PagSeguro'
    }
];