import { Component, OnInit } from '@angular/core';
import { FormGroupComponent, SmzForms, SmzControlType, SmzFileControl } from 'ngx-smz-dialogs';

interface Response
{
    file: File;
}

@Component({
    selector: 'app-file-demo',
    templateUrl: './file-demo.component.html',
})
export class FileDemoComponent implements OnInit
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

        const input: SmzFileControl = {
            propertyName: 'file', type: SmzControlType.FILE, name: 'File',
            defaultValue: '',
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
