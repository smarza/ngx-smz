import { Component, OnInit } from '@angular/core';
import { FormGroupComponent, SmzDialogsService, SmzForm, SmzControlType, SmzDropDownControl, SmzCalendarControl, SmzPasswordControl, SmzLinkedDropDownControl } from 'ngx-smz-dialogs';
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
    selector: 'app-linked-dropdown-demo',
    templateUrl: './linked-dropdown-demo.component.html',
})
export class LinkedDropdownDemoComponent implements OnInit
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
        const states = STATES.map(x => ({ id: x.id, name: x.name }));
        const parent: SmzDropDownControl<string> = {
            propertyName: 'parent1', type: SmzControlType.DROPDOWN, name: 'State',
            defaultValue: STATES[0].id, showFilter: true, options: states,
            template: { extraSmall: { row: 'col-12' } }
        };

        const linkedOptions1 = STATES.map(x => ({ parentId: x.id, data: x.cities.map(c => ({ id: c, name: c })) }));
        const linked1: SmzLinkedDropDownControl<string> = {
            propertyName: 'linked1', type: SmzControlType.LINKED_DROPDOWN, name: 'City',
            defaultValue: null, dependsOn: { propertyName: 'parent1' }, showFilter: true, options: linkedOptions1,
            template: { extraSmall: { row: 'col-6' } }
        };

        const linkedOptions2 = DATA_BY_STATE.map(x => ({ parentId: x.id, data: x.data.map(c => ({ id: c, name: c })) }));
        const linked2: SmzLinkedDropDownControl<string> = {
            propertyName: 'linked2', type: SmzControlType.LINKED_DROPDOWN, name: 'State Dependency',
            defaultValue: '', dependsOn: { propertyName: 'parent1' }, showFilter: true, options: linkedOptions2,
            template: { extraSmall: { row: 'col-6' } }
        };

        const linkedOptions3 = CITY_DEPENDENCY.map(x => ({ parentId: x.id, data: x.data.map(c => ({ id: c, name: c })) }));
        const linked3: SmzLinkedDropDownControl<string> = {
            propertyName: 'linked3', type: SmzControlType.LINKED_DROPDOWN, name: 'City Dependency',
            defaultValue: '', dependsOn: { propertyName: 'linked1' }, showFilter: true, options: linkedOptions3,
            template: { extraSmall: { row: 'col-6' } }
        };

        const linkedOptions4 = OPTIONS_STRING_DEPENDENCY.map(x => ({ parentId: x.id, data: x.data.map(c => ({ id: c, name: c })) }));
        const linked4: SmzLinkedDropDownControl<string> = {
            propertyName: 'linked4', type: SmzControlType.LINKED_DROPDOWN, name: 'Color Dependency',
            defaultValue: '', dependsOn: { propertyName: 'dropdown', formId: 'dropdown-form-01' }, showFilter: true, options: linkedOptions4,
            template: { extraSmall: { row: 'col-6' } }
        };

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
