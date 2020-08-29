import { Component } from '@angular/core';
import { BaseFormControlComponent } from '../../models/base-form.component';


@Component({
    selector: 'smz-input-currency',
    templateUrl: './input-currency.component.html',
    styleUrls: ['./input-currency.component.css']
})
export class InputCurrencyComponent extends BaseFormControlComponent
{

    constructor() { super(); }


}
