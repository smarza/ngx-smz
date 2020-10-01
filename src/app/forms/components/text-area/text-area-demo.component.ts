import { Component, OnInit } from '@angular/core';
import { FormGroupComponent, SmzForm, SmzControlType, SmzTextAreaControl } from 'ngx-smz-dialogs';

interface Response
{
    textArea: string;
}

@Component({
    selector: 'app-text-area-demo',
    templateUrl: './text-area-demo.component.html',
})
export class TextAreaDemoComponent implements OnInit
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

        const input: SmzTextAreaControl = {
            propertyName: 'textArea', type: SmzControlType.TEXT_AREA, name: 'Text Area',
            defaultValue: '', textAreaRows: 10,
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
