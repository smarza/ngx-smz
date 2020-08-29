import { Component, Input } from '@angular/core';
import { BaseFormControlComponent } from '../../models/base-form.component';
import { SmzFormsControl } from '../../models/controls';
import { SmzCheckBoxControl } from '../../models/control-types';

@Component({
    selector: 'smz-checkbox',
    templateUrl: './checkbox.component.html',
    styleUrls: ['./checkbox.component.css']
})
export class CheckBoxComponent extends BaseFormControlComponent
{
    @Input() public input: SmzFormsControl<SmzCheckBoxControl>;
    constructor() { super(); }


}
