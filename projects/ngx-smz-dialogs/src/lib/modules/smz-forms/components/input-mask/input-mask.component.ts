import { Component, ViewEncapsulation, Input } from '@angular/core';
import { BaseFormControlComponent } from '../../models/base-form.component';
import { SmzMaskControl } from '../../models/control-types';

@Component({
    selector: 'smz-input-mask',
    templateUrl: './input-mask.component.html',
    encapsulation: ViewEncapsulation.None
})
export class InputMaskComponent extends BaseFormControlComponent
{
    @Input() public input: SmzMaskControl;
    constructor() { super(); }

}
