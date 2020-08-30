import { Component } from '@angular/core';
import { BaseFormControlComponent } from '../../models/base-form.component';

@Component({
    selector: 'smz-input-password',
    templateUrl: './input-password.component.html',
})
export class InputPasswordComponent extends BaseFormControlComponent
{
    constructor() { super(); }

}
