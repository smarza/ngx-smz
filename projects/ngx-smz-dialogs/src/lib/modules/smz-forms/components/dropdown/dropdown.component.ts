import { Component, Input } from '@angular/core';
import { BaseFormControlComponent } from '../../models/base-form.component';
import { SmzDropDownControl } from '../../models/control-types';

@Component({
    selector: 'smz-dropdown',
    templateUrl: './dropdown.component.html',
})
export class DropdownComponent extends BaseFormControlComponent
{
    @Input() public input: SmzDropDownControl<any>;
    constructor() { super(); }

}
