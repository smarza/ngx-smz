import { Component, OnInit } from '@angular/core';
import { FormGroupComponent, SmzForm, SmzControlType, SmzMultiSelectControl } from 'ngx-smz-dialogs';
import { OPTIONS_STRING } from '../../data/options';

interface Response
{
    multiSelect: boolean[];
}

@Component({
    selector: 'app-multi-select-demo',
    templateUrl: './multi-select-demo.component.html',
})
export class MultiSelectDemoComponent implements OnInit
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

        const input: SmzMultiSelectControl<string> = {
            propertyName: 'multiSelect', type: SmzControlType.MULTI_SELECT, name: 'Multi Select',
            defaultValue: null, options: OPTIONS_STRING,
            template: { extraSmall: { row: 'col-6' } }
        };

        this.formConfig = {
            behaviors: { flattenResponse: true, avoidFocusOnLoad: true },
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
