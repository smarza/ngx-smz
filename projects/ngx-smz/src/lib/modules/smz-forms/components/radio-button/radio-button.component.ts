import { Component } from '@angular/core';
import { BaseFormControlComponent } from '../../models/base-form-control.component';

@Component({
    selector: 'smz-radio-button',
    templateUrl: './radio-button.component.html',
    styleUrls: ['./radio-button.component.css']
})
export class RadioButtonComponent extends BaseFormControlComponent
{

    constructor() { super(); }

}
