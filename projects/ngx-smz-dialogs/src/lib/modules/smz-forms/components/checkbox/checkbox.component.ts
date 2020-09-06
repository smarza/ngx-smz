import { Component, Input } from '@angular/core';
import { BaseFormControlComponent } from '../../models/base-form.component';
import { SmzCheckBoxControl } from '../../models/control-types';

@Component({
    selector: 'smz-checkbox',
    templateUrl: './checkbox.component.html',
})
export class CheckBoxComponent extends BaseFormControlComponent
{
    @Input() public input: SmzCheckBoxControl;
    constructor() { super(); }


}
