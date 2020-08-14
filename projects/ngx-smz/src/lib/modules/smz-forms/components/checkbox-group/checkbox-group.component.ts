import { Component, OnInit, Input } from '@angular/core';
import { BaseFormControlComponent } from '../../models/base-form-control.component';

@Component({
    selector: 'smz-checkbox-group',
    templateUrl: './checkbox-group.component.html',
    styleUrls: ['./checkbox-group.component.css']
})
export class CheckBoxGroupComponent extends BaseFormControlComponent
{

    constructor() { super(); }


}
