import { Component } from '@angular/core';
import { BaseFormControlComponent } from '../../models/base-form-control.component';

@Component({
    selector: 'smz-multi-select',
    templateUrl: './multi-select.component.html',
    styleUrls: ['./multi-select.component.css']
})
export class MultiSelectComponent extends BaseFormControlComponent
{

    constructor() { super(); }

}
