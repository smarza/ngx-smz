import { Component, Input } from '@angular/core';
import { BaseFormControlComponent } from '../../models/base-form.component';
import { SmzFormsControl } from '../../models/controls';
import { SmzLinkedDropDownControl } from '../../models/control-types';

@Component({
    selector: 'smz-linked-dropdown',
    templateUrl: './linked-dropdown.component.html',
})
export class LinkedDropdownComponent extends BaseFormControlComponent
{
    @Input() public input: SmzFormsControl<SmzLinkedDropDownControl<any>>;
    constructor() { super(); }

}
