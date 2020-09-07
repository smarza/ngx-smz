import { Component, OnInit } from '@angular/core';
import { FormGroupComponent, SmzForms, SmzControlType, SmzDropDownControl, SmzCalendarControl, SmzPasswordControl } from 'ngx-smz-dialogs';
import { STATES } from '../../data/linked-data';
import { SmzSwitchControl } from 'ngx-smz-dialogs';
import { OPTIONS_STRING } from '../../data/options';

interface Response
{
    dropdown: boolean;
}

@Component({
    selector: 'app-dropdown-demo',
    templateUrl: './dropdown-demo.component.html',
})
export class DropdownDemoComponent implements OnInit
{
    public formConfig: SmzForms<Response>;
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

        const input: SmzDropDownControl<string> = {
            propertyName: 'dropdown', type: SmzControlType.DROPDOWN, name: 'Dropdown',
            defaultValue: '', showFilter: true, options: OPTIONS_STRING,
            template: { extraSmall: { row: 'col-6' } }
        };

        this.formConfig = {
            behaviors: { flattenResponse: false, avoidFocusOnLoad: true },
            groups: [
                {
                    name: '', showName: false,
                    children: [input],
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
