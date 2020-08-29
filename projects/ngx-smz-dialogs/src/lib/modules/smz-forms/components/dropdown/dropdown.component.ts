import { Component, Input } from '@angular/core';
import { BaseFormControlComponent } from '../../models/base-form.component';
import { SmzFormsControl } from '../../models/controls';
import { SmzDropDownControl } from '../../models/control-types';

@Component({
    selector: 'smz-dropdown',
    templateUrl: './dropdown.component.html',
    styleUrls: ['./dropdown.component.css']
})
export class DropdownComponent extends BaseFormControlComponent
{
    @Input() public input: SmzFormsControl<SmzDropDownControl<any>>;
    constructor() { super(); }

}
