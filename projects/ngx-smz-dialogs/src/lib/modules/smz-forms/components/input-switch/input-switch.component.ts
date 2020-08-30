import { Component } from '@angular/core';
import { BaseFormControlComponent } from '../../models/base-form.component';

@Component({
    selector: 'smz-input-switch',
    templateUrl: './input-switch.component.html',
})
export class InputSwitchComponent extends BaseFormControlComponent
{

    constructor() { super(); }

}
