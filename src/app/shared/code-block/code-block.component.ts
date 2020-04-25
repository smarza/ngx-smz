import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'demo-code-block',
    templateUrl: './code-block.component.html',
    styleUrls: ['./code-block.component.scss']
})
export class CodeBlockComponent implements OnInit
{

    @Input() public code: string;
    constructor() { }

    ngOnInit(): void
    {
    }

}
