import { Component, OnInit } from '@angular/core';
import { FormGroupComponent, SmzForms, SmzControlType, SmzDropDownControl, SmzCalendarControl } from 'ngx-smz-dialogs';
import { STATES } from '../../data/linked-data';

interface Response
{
    date: Date;
}

@Component({
    selector: 'app-calendar-demo',
    templateUrl: './calendar-demo.component.html',
})
export class CalendarDemoComponent implements OnInit
{
    public formConfig: SmzForms<Response>;
    constructor() { }

    ngOnInit(): void
    {
        this.createForm();
    }

    public show(): void
    {

    }

    public createForm(): void
    {

        const date: SmzCalendarControl = {
            propertyName: 'date', type: SmzControlType.CALENDAR, name: 'Data',
            defaultValue: null,
            template: { extraSmall: { row: 'col-6' } }
        };

        this.formConfig = {
            behaviors: { flattenResponse: false, avoidFocusOnLoad: true },
            groups: [
                {
                    name: 'Data', showName: false,
                    children: [date],
                    template: { extraSmall: { row: 'col-12' } }
                }
            ],
        };

    }

    public log(form: FormGroupComponent): void
    {
        console.log(form.getData());
    }

}
