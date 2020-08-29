import { Input } from '@angular/core';
import { SmzFormsControl } from './controls';
import { SmzControlTypes } from './control-types';

export abstract class BaseFormControlComponent
{

    @Input() public input: SmzFormsControl<SmzControlTypes>;
    @Input() public control: any;

    constructor() { }

}
