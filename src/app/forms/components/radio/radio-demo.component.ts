import { Component, OnInit } from '@angular/core';
import { FormGroupComponent, SmzForms, SmzControlType, SmzRadioControl } from 'ngx-smz-dialogs';
import { RADIO_BOOLEAN, RADIO_STRING } from '../../data/options';

interface Response
{
    radioChoice: boolean;
    radioColor: boolean;
}

@Component({
    selector: 'app-radio-demo',
    templateUrl: './radio-demo.component.html',
})
export class RadioDemoComponent implements OnInit
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


        const input: SmzRadioControl<boolean> = {
            propertyName: 'radioChoice', type: SmzControlType.RADIO, name: 'Radio (Boolean)',
            options: RADIO_BOOLEAN,
            template: { extraSmall: { row: 'col-6' } }
        };

        const input2: SmzRadioControl<string> = {
            propertyName: 'radioColor', type: SmzControlType.RADIO, name: 'Radio (String)',
            defaultValue: '1', options: RADIO_STRING,
            template: { extraSmall: { row: 'col-6' } }
        };


        this.formConfig = {
            behaviors: { flattenResponse: false, avoidFocusOnLoad: true },
            groups: [
                {
                    name: '', showName: false,
                    children: [input, input2],
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
