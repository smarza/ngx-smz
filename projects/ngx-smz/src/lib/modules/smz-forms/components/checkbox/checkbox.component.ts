import { Component } from '@angular/core';
import { BaseFormControlComponent } from '../../models/base-form-control.component';

@Component({
    selector: 'smz-checkbox',
    templateUrl: './checkbox.component.html',
    styleUrls: ['./checkbox.component.css']
})
export class CheckBoxComponent extends BaseFormControlComponent
{

    constructor() { super(); }


}
