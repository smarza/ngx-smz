import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BaseFormControlComponent } from '../../models/base-form-control.component';

@Component({
    selector: 'smz-input-mask',
    templateUrl: './input-mask.component.html',
    styleUrls: ['./input-mask.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class InputMaskComponent extends BaseFormControlComponent implements OnInit
{

    constructor() { super(); }

    public ngOnInit(): void
    {

    }

}
