import { Component, Input } from '@angular/core';
import { BaseFormControlComponent } from '../../models/base-form.component';
import { SmzTextAreaControl } from '../../models/control-types';

@Component({
    selector: 'smz-input-text-area',
    templateUrl: './input-text-area.component.html',
})
export class InputTextAreaComponent extends BaseFormControlComponent
{
    @Input() public input: SmzTextAreaControl;
    constructor() { super(); }

}
