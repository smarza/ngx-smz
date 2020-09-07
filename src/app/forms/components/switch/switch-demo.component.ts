import { Component, OnInit } from '@angular/core';
import { FormGroupComponent, SmzForms, SmzControlType, SmzDropDownControl, SmzCalendarControl, SmzPasswordControl } from 'ngx-smz-dialogs';
import { STATES } from '../../data/linked-data';
import { SmzSwitchControl } from 'ngx-smz-dialogs';

interface Response
{
    switch: boolean;
}

@Component({
    selector: 'app-switch-demo',
    templateUrl: './switch-demo.component.html',
})
export class SwitchDemoComponent implements OnInit
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

        const input: SmzSwitchControl = {
            propertyName: 'switch', type: SmzControlType.SWITCH, name: 'Switch',
            defaultValue: '',
            template: { extraSmall: { row: 'col-6' } }
        };


        this.formConfig = {
            behaviors: { flattenResponse: false, avoidFocusOnLoad: true },
            groups: [
                {
                    name: 'switch', showName: false,
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
