import { Component, OnInit } from '@angular/core';
import { FormGroupComponent, SmzDialogsService, SmzForm, SmzControlType, SmzDropDownControl, SmzMultiSelectControl, SmzLinkedMultiSelectControl, SmzLinkedDropDownControl } from 'ngx-smz-dialogs';
import { STATES, DATA_BY_STATE, CITY_DEPENDENCY } from '../../data/linked-data';
import { OPTIONS_STRING, OPTIONS_STRING_DEPENDENCY } from '../../data/options';
import { LocationResponseDialog, LocationsDropdownData } from 'src/app/models/data.model';
import { DataService } from 'src/app/services/data.service';

interface Response
{
    parent1: string;
    linked1: string;
    linked2: string;
    linked3: string;
    linked4: string;
}

@Component({
    selector: 'app-linked-multiselect-demo',
    templateUrl: './linked-multiselect-demo.component.html',
})
export class LinkedMultiSelectDemoComponent implements OnInit
{
    public formConfig: SmzForm<Response>;
    constructor(private dialogs2: SmzDialogsService, private dataService: DataService) { }

    ngOnInit(): void
    {
        this.createForm();
    }

    public show(): void
    {

    }

    public createForm(): void
    {

        // MODELO DO DROPDOWN PAI
        const states = STATES.map(x => ({ id: x.id, name: x.name }));

        const parent: SmzDropDownControl<string> = {
            propertyName: 'parent1', type: SmzControlType.DROPDOWN, name: 'State',
            defaultValue: null, showFilter: true, options: states,
            template: { extraSmall: { row: 'col-12' } }
        };

        // MODELO CONTENDO TODOS OS RESULTADOS AGRUPADOS POR PAI
        const linkedOptions = STATES.map(x => ({ parentId: x.id, data: x.cities.map(c => ({ id: c, name: c })) }));

        const linked1: SmzLinkedMultiSelectControl<string> = {
            propertyName: 'linked1', type: SmzControlType.LINKED_MULTISELECT, name: 'City multi 2',
            defaultValue: null, dependsOn: { propertyName: 'parent1' }, showFilter: true, options: linkedOptions,
            template: { extraSmall: { row: 'col-6' } }
        };

        // console.log('linkedOptions1', linkedOptions1);

        this.formConfig = {
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
            ],
        };

    }


    public open(): void
    {
        this.dataService.getLocationsDropdownData().subscribe(response =>
        {
            this.dialogs2.open({
                // presetId: 'SimpleCrud',
                features: [{ type: 'form', data: this.dialogForm(response) }],
                callbacks: {
                    onConfirm: (data: LocationResponseDialog) =>
                    {
                        console.log('confirmed', data);
                    }
                }
            });
        });
    }

    public dialogForm(dropdownData: LocationsDropdownData): SmzForm<unknown>
    {
        const region: SmzDropDownControl<string> = {
            propertyName: 'region',
            type: SmzControlType.DROPDOWN,
            name: 'Regiões',
            defaultValue: dropdownData.regions[0].id,
            showFilter: true,
            options: dropdownData.regions
        };

        const state: SmzLinkedDropDownControl<string> = {
            propertyName: 'state',
            type: SmzControlType.LINKED_DROPDOWN,
            name: 'Estado',
            dependsOn: { propertyName: 'region' },
            showFilter: true,
            options: dropdownData.states
        };

        const mesoregion: SmzLinkedDropDownControl<string> = {
            propertyName: 'mesoregion',
            type: SmzControlType.LINKED_DROPDOWN,
            name: 'Mesoregião',
            dependsOn: { propertyName: 'state' },
            showFilter: true,
            options: dropdownData.mesoregions
        };

        const microregion: SmzLinkedDropDownControl<string> = {
            propertyName: 'microregion',
            type: SmzControlType.LINKED_DROPDOWN,
            name: 'Microregion',
            dependsOn: { propertyName: 'mesoregion' },
            showFilter: true,
            options: dropdownData.microregions
        };

        const cities: SmzLinkedDropDownControl<string> = {
            propertyName: 'cities',
            type: SmzControlType.LINKED_DROPDOWN,
            name: 'Microregion',
            dependsOn: { propertyName: 'microregion' },
            showFilter: true,
            options: dropdownData.cities
        };

        return {
            behaviors: { flattenResponse: true, avoidFocusOnLoad: true },
            groups: [
                {
                    name: 'Localidades',
                    showName: true,
                    children: [region, state, mesoregion, microregion, cities]
                }
            ]
        };
    }

    public log(form: FormGroupComponent): void
    {
        console.log(form.getData());
    }

}
