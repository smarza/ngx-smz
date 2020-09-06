import { Component, Input } from '@angular/core';
import { BaseFormControlComponent } from '../../models/base-form.component';
import { SmzMultiSelectControl } from '../../models/control-types';

@Component({
    selector: 'smz-multi-select',
    templateUrl: './multi-select.component.html',
})
export class MultiSelectComponent extends BaseFormControlComponent
{
    @Input() public input: SmzMultiSelectControl<any>;
    constructor() { super(); }

}
