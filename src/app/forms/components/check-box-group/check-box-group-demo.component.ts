import { Component, OnInit } from '@angular/core';
import { FormGroupComponent, SmzForms, SmzControlType, SmzRadioControl, SmzCheckBoxControl, SmzCheckBoxGroupControl } from 'ngx-smz-dialogs';
import { OPTIONS_BOOLEAN, OPTIONS_STRING } from '../../data/options';

interface Response
{
    checkboxGroup: boolean[];
}

@Component({
    selector: 'app-check-box-group-demo',
    templateUrl: './check-box-group-demo.component.html',
})
export class CheckBoxGroupDemoComponent implements OnInit
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


        const input: SmzCheckBoxGroupControl<string> = {
            propertyName: 'checkbox', type: SmzControlType.CHECKBOX_GROUP, name: 'Checkbox',
            defaultValue: null, options: OPTIONS_STRING,
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
