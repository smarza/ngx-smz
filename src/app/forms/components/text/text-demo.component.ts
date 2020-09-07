import { Component, OnInit } from '@angular/core';
import { FormGroupComponent, SmzForms, SmzControlType, SmzDropDownControl, SmzCalendarControl, SmzPasswordControl, SmzNumberControl, SmzTextControl } from 'ngx-smz-dialogs';
import { STATES } from '../../data/linked-data';

interface Response
{
    text: string;
}

@Component({
    selector: 'app-text-demo',
    templateUrl: './text-demo.component.html',
})
export class TextDemoComponent implements OnInit
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

        const input: SmzTextControl = {
            propertyName: 'number', type: SmzControlType.TEXT, name: 'Text',
            defaultValue: '',
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
