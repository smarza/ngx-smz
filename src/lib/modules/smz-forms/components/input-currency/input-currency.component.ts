import { Component, OnInit } from '@angular/core';
import { BaseFormControlComponent } from '../../models/base-form-control.component';

@Component({
    selector: 'smz-input-currency',
    templateUrl: './input-currency.component.html',
    styleUrls: ['./input-currency.component.css']
})
export class InputCurrencyComponent extends BaseFormControlComponent implements OnInit
{

    constructor() { super(); }

    public ngOnInit(): void
    {

    }

}
