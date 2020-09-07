import { Component, OnInit } from '@angular/core';
import { FormGroupComponent, SmzForms, SmzControlType, SmzDropDownControl, SmzCalendarControl, SmzPasswordControl, SmzMaskControl } from 'ngx-smz-dialogs';
import { STATES } from '../../data/linked-data';

interface Response
{
    textMask: number;
}

@Component({
    selector: 'app-text-mask-demo',
    templateUrl: './text-mask-demo.component.html',
})
export class TextMaskDemoComponent implements OnInit
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

        const input: SmzMaskControl = {
            propertyName: 'textMask', type: SmzControlType.TEXT_MASK, name: 'Text Mask',
            defaultValue: '', mask: '999.999.999-99', unmask: true, characterPattern: null,
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
