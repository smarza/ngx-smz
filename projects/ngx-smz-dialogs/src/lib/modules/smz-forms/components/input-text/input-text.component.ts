import { Component, Input } from '@angular/core';
import { BaseFormControlComponent } from '../../models/base-form.component';
import { SmzFormsControl } from '../../models/controls';
import { SmzTextControl } from '../../models/control-types';

@Component({
    selector: 'smz-input-text',
    templateUrl: './input-text.component.html',
    styleUrls: ['./input-text.component.css']
})
export class InputTextComponent extends BaseFormControlComponent
{
    @Input() public input: SmzFormsControl<SmzTextControl>;
    constructor() { super(); }

}
