import { Component } from '@angular/core';
import { BaseFormControlComponent } from '../../models/base-form-control.component';

@Component({
    selector: 'smz-input-switch',
    templateUrl: './input-switch.component.html',
    styleUrls: ['./input-switch.component.css']
})
export class InputSwitchComponent extends BaseFormControlComponent
{

    constructor() { super(); }

}
