import { Input } from '@angular/core';
import { SmzControlTypes } from './control-types';

export abstract class BaseFormControlComponent
{

    @Input() public input: SmzControlTypes;
    @Input() public control: any;

    constructor() { }

}
