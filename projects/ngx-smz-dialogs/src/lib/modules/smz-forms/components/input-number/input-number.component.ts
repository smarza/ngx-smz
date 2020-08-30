import { Component, Input } from '@angular/core';
import { BaseFormControlComponent } from '../../models/base-form.component';
import { SmzFormsControl } from '../../models/controls';
import { SmzNumberControl } from '../../models/control-types';

@Component({
    selector: 'smz-input-number',
    templateUrl: './input-number.component.html'
})
export class InputNumberComponent extends BaseFormControlComponent
{
    @Input() public input: SmzFormsControl<SmzNumberControl>;
    constructor() { super(); }

}
