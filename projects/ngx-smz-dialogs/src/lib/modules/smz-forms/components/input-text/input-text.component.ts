import { Component, Input } from '@angular/core';
import { BaseFormControlComponent } from '../../models/base-form.component';
import { SmzTextControl } from '../../models/control-types';

@Component({
    selector: 'smz-input-text',
    templateUrl: './input-text.component.html'
})
export class InputTextComponent extends BaseFormControlComponent
{
    @Input() public input: SmzTextControl;
    constructor()
    {
        super();
    }

}
