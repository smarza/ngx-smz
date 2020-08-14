import { Component } from '@angular/core';
import { BaseFormControlComponent } from '../../models/base-form-control.component';

@Component({
    selector: 'smz-dropdown',
    templateUrl: './dropdown.component.html',
    styleUrls: ['./dropdown.component.css']
})
export class DropdownComponent extends BaseFormControlComponent
{

    constructor() { super(); }

}
