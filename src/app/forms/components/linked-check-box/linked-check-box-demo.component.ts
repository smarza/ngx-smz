import { Component, OnInit } from '@angular/core';
import { FormGroupComponent, SmzForm, SmzControlType, SmzRadioControl, SmzCheckBoxControl, SmzTextControl } from 'ngx-smz-dialogs';
import { OPTIONS_BOOLEAN, OPTIONS_STRING } from '../../data/options';

interface Response
{
    checkbox: boolean;
}

@Component({
    selector: 'app-linked-check-box-demo',
    templateUrl: './linked-check-box-demo.component.html',
})
export class LinkedCheckBoxDemoComponent implements OnInit
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


        const textInput1: SmzTextControl = {
            propertyName: 'text1', type: SmzControlType.TEXT, name: 'Texto 1',
            defaultValue: null,
            template: { extraSmall: { row: 'col-6' } }
        };

        const parentInput: SmzCheckBoxControl = {
            propertyName: 'parentCheckbox', type: SmzControlType.CHECKBOX, name: 'Informar Marca',
            defaultValue: null,
            template: { extraSmall: { row: 'col-6' } }
        };

        const textInput2: SmzTextControl = {
            propertyName: 'text2', type: SmzControlType.TEXT, name: 'Marca',
            defaultValue: null,
            template: { extraSmall: { row: 'col-6' } }
        };

        this.formConfig = {
            behaviors: { flattenResponse: false, avoidFocusOnLoad: true },
            groups: [
                {
                    name: '', showName: false,
                    children: [textInput1, parentInput, textInput2],
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
