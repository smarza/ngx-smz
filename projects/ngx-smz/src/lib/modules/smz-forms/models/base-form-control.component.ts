import { Input, OnInit } from '@angular/core';
import { FormGroupInputData } from './form-group.models';

export abstract class BaseFormControlComponent implements OnInit
{

    @Input() public input: FormGroupInputData;
    @Input() public control: any;

    constructor() { }

    public ngOnInit(): void
    {
    }
}
