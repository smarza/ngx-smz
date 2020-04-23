import { Component, OnInit, Input } from '@angular/core';
import { BaseFormControlComponent } from '../../models/base-form-control.component';

@Component({
    selector: 'smz-calendar',
    templateUrl: './calendar.component.html',
    styleUrls: ['./calendar.component.css']
})
export class CalendarComponent extends BaseFormControlComponent implements OnInit
{

    constructor() { super(); }

    public ngOnInit(): void
    {

    }

}
