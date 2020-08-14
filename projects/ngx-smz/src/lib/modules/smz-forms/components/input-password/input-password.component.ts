import { Component } from '@angular/core';
import { BaseFormControlComponent } from '../../models/base-form-control.component';

@Component({
    selector: 'smz-input-password',
    templateUrl: './input-password.component.html',
    styleUrls: ['./input-password.component.css']
})
export class InputPasswordComponent extends BaseFormControlComponent
{
    constructor() { super(); }

}
