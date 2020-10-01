import { Component, OnInit } from '@angular/core';
import { FormGroupComponent, SmzForm, SmzControlType, SmzRadioControl, SmzCheckBoxControl } from 'ngx-smz-dialogs';
import { OPTIONS_BOOLEAN, OPTIONS_STRING } from '../../data/options';

interface Response
{
    checkbox: boolean;
}

@Component({
    selector: 'app-check-box-demo',
    templateUrl: './check-box-demo.component.html',
})
export class CheckBoxDemoComponent implements OnInit
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


        const input: SmzCheckBoxControl = {
            propertyName: 'checkbox', type: SmzControlType.CHECKBOX, name: 'Checkbox',
            defaultValue: null,
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
