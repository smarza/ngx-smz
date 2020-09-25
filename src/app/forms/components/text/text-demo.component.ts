import { Component, OnInit } from '@angular/core';
import { FormControl, ValidatorFn } from '@angular/forms';
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
            propertyName: 'text', type: SmzControlType.TEXT, name: 'Text',
            defaultValue: '',
            validatorsPreset: { isRequired: false, minLength: 8 },
            advancedSettings: {
                validationMessages: [
                    { type: 'minlength', message: `Mensagem 1` },
                    { type: 'validatetest', message: `Validação Teste` },
                ],
                validators: [validateTest()]
            },
            template: { extraSmall: { row: 'col-6' } }
        };


        this.formConfig = {
            behaviors: { flattenResponse: false, avoidFocusOnLoad: true },
            groups: [
                {
                    name: 'text', showName: false,
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

function validateTest(): ValidatorFn
{
    return (control: FormControl): { [key: string]: any } =>
    {
        return { 'validatetest': true };
    };
}