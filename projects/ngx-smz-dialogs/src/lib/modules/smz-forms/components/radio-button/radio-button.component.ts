import { Component, Input } from '@angular/core';
import { BaseFormControlComponent } from '../../models/base-form.component';
import { SmzRadioControl } from '../../models/control-types';

@Component({
    selector: 'smz-radio-button',
    templateUrl: './radio-button.component.html'
})
export class RadioButtonComponent extends BaseFormControlComponent
{
    @Input() public input: SmzRadioControl<any>;
    constructor() { super(); }

}
