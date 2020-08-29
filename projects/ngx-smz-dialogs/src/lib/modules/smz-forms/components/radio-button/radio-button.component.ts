import { Component, Input } from '@angular/core';
import { BaseFormControlComponent } from '../../models/base-form.component';
import { SmzFormsControl } from '../../models/controls';
import { SmzRadioControl } from '../../models/control-types';

@Component({
    selector: 'smz-radio-button',
    templateUrl: './radio-button.component.html',
    styleUrls: ['./radio-button.component.css']
})
export class RadioButtonComponent extends BaseFormControlComponent
{
    @Input() public input: SmzFormsControl<SmzRadioControl<any>>;
    constructor() { super(); }

}
