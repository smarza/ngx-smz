import { Component, OnInit } from '@angular/core';
import { SmzDialogsService } from 'ngx-smz-dialogs';


@Component({
    selector: 'demo-multiple-dialogs',
    templateUrl: './multiple-dialogs.component.html',
    styleUrls: ['./multiple-dialogs.component.scss']
})
export class MultipleDialogsComponent implements OnInit
{
    public code: string;

    constructor(private dialogs: SmzDialogsService)
    {
        this.setupCode();
    }

    ngOnInit(): void
    {
    }
    public setupCode(): void
    {
        this.code =
            `
        const workInProgress;
        `;
    }

    public show(): void
    {
    }

}
