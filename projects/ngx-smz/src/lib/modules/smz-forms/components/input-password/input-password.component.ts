import { Component, OnInit } from '@angular/core';
import { BaseFormControlComponent } from '../../models/base-form-control.component';

@Component({
    selector: 'smz-input-password',
    templateUrl: './input-password.component.html',
    styleUrls: ['./input-password.component.css']
})
export class InputPasswordComponent extends BaseFormControlComponent implements OnInit
{
    constructor() { super(); }

    public ngOnInit(): void
    {

    }

}
