import { Input } from '@angular/core';
import { FormGroupInputData } from './form-group.models';

export abstract class BaseFormControlComponent
{

    @Input() public input: FormGroupInputData;
    @Input() public control: any;

    constructor() { }

}
