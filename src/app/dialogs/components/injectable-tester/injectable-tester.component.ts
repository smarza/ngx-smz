import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'demo-injectable-tester',
    templateUrl: './injectable-tester.component.html',
    styleUrls: ['./injectable-tester.component.scss']
})
export class InjectableTesterComponent implements OnInit
{
    @Input() public color: string;
    @Output() public clicked: EventEmitter<string> = new EventEmitter<string>();

    public isValid: boolean = false;

    constructor() { }

    ngOnInit(): void
    {
    }

}
