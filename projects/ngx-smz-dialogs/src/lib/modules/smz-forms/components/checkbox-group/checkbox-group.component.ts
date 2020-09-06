import { Component, OnInit, Input } from '@angular/core';
import { BaseFormControlComponent } from '../../models/base-form.component';
import { SmzCheckBoxGroupControl } from '../../models/control-types';

@Component({
    selector: 'smz-checkbox-group',
    templateUrl: './checkbox-group.component.html',
})
export class CheckBoxGroupComponent extends BaseFormControlComponent
{
    @Input() public input: SmzCheckBoxGroupControl;
    constructor() { super(); }


}
