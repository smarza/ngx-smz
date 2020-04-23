import { Component, OnInit, Input } from '@angular/core';
import { BaseFormControlComponent } from '../../models/base-form-control.component';

@Component({
    selector: 'smz-dropdown',
    templateUrl: './dropdown.component.html',
    styleUrls: ['./dropdown.component.css']
})
export class DropdownComponent extends BaseFormControlComponent implements OnInit
{

    constructor() { super(); }

    public ngOnInit(): void
    {

    }

}
