import { Component, OnInit, Input } from '@angular/core';
import { BaseFormControlComponent } from '../../models/base-form-control.component';

@Component({
    selector: 'smz-input-text',
    templateUrl: './input-text.component.html',
    styleUrls: ['./input-text.component.css']
})
export class InputTextComponent extends BaseFormControlComponent implements OnInit
{
    constructor() { super(); }

    public ngOnInit(): void
    {

    }

}
