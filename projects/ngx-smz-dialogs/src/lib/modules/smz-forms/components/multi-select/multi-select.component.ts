import { Component, Input } from '@angular/core';
import { BaseFormControlComponent } from '../../models/base-form.component';
import { SmzFormsControl } from '../../models/controls';
import { SmzMultiSelectControl } from '../../models/control-types';

@Component({
    selector: 'smz-multi-select',
    templateUrl: './multi-select.component.html',
    styleUrls: ['./multi-select.component.css']
})
export class MultiSelectComponent extends BaseFormControlComponent
{
    @Input() public input: SmzFormsControl<SmzMultiSelectControl<any>>;
    constructor() { super(); }

}
