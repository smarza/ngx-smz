import { Component, OnInit, Input } from '@angular/core';
import { BaseFormControlComponent } from '../../models/base-form.component';
import { SmzFormsControl } from '../../models/controls';
import { SmzCheckBoxGroupControl } from '../../models/control-types';

@Component({
    selector: 'smz-checkbox-group',
    templateUrl: './checkbox-group.component.html',
})
export class CheckBoxGroupComponent extends BaseFormControlComponent
{
    @Input() public input: SmzFormsControl<SmzCheckBoxGroupControl>;
    constructor() { super(); }


}
