import { Component, OnInit } from '@angular/core';
import { FormGroupComponent, SmzForms, SmzControlType, SmzDropDownControl, SmzCalendarControl, SmzPasswordControl } from 'ngx-smz-dialogs';
import { STATES } from '../../data/linked-data';

interface Response
{
    password: string;
}

@Component({
    selector: 'app-password-demo',
    templateUrl: './password-demo.component.html',
})
export class PasswordDemoComponent implements OnInit
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

        const input: SmzPasswordControl = {
            propertyName: 'password', type: SmzControlType.PASSWORD, name: 'Password',
            defaultValue: '',
            template: { extraSmall: { row: 'col-6' } }
        };


        this.formConfig = {
            behaviors: { flattenResponse: false, avoidFocusOnLoad: true },
            groups: [
                {
                    name: 'Password', showName: false,
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
