import { Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { SmzControlTypes } from './control-types';

export abstract class BaseFormControlComponent
{

    @Input() public input: SmzControlTypes;
    @Input() public control: AbstractControl;

    constructor() { }

}
