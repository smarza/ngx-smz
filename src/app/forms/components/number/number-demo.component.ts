import { Component, OnInit } from '@angular/core';
import { FormGroupComponent, SmzForms, SmzControlType, SmzDropDownControl, SmzCalendarControl, SmzPasswordControl, SmzNumberControl } from 'ngx-smz-dialogs';
import { STATES } from '../../data/linked-data';

interface Response
{
    number: string;
}

@Component({
    selector: 'app-number-demo',
    templateUrl: './number-demo.component.html',
})
export class NumberDemoComponent implements OnInit
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

        const input: SmzNumberControl = {
            propertyName: 'number', type: SmzControlType.NUMBER, name: 'Number',
            defaultValue: 0,
            template: { extraSmall: { row: 'col-6' } }
        };


        this.formConfig = {
            behaviors: { flattenResponse: false, avoidFocusOnLoad: true },
            groups: [
                {
                    name: 'number', showName: false,
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
