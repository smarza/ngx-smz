import { Component } from '@angular/core';
import { BaseFormControlComponent } from '../../models/base-form.component';

@Component({
    selector: 'smz-input-currency',
    templateUrl: './input-currency.component.html',
})
export class InputCurrencyComponent extends BaseFormControlComponent
{

    constructor() { super(); }


}
