import { Component, OnInit } from '@angular/core';
import { FormGroupComponent, SmzForm, SmzControlType, SmzDropDownControl, SmzCalendarControl, SmzPasswordControl, SmzColorPickerControl } from 'ngx-smz-dialogs';
import { STATES } from '../../data/linked-data';

interface Response
{
    colorPicker: string;
}

@Component({
    selector: 'app-color-picker-demo',
    templateUrl: './color-picker-demo.component.html',
})
export class ColorPickerDemoComponent implements OnInit
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

        const input: SmzColorPickerControl = {
            propertyName: 'colorPicker', type: SmzControlType.COLOR_PICKER, name: 'Color Picker',
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
