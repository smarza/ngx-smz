import { Component } from '@angular/core';
import { BaseFormControlComponent } from '../../models/base-form-control.component';

@Component({
    selector: 'smz-input-text-area',
    templateUrl: './input-text-area.component.html',
    styleUrls: ['./input-text-area.component.css']
})
export class InputTextAreaComponent extends BaseFormControlComponent
{

    constructor() { super(); }

}
