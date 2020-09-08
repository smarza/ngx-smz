import { Component, OnInit, Input } from '@angular/core';
import { SmzDialogsService } from 'ngx-smz-dialogs';
import { DemoData } from 'src/app/demo/models/demo-data.model';

@Component({
    selector: 'demo-confirmation-dialog',
    templateUrl: './confirmation-dialog.component.html',
    styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent implements OnInit
{
    public code: string;
    public data: DemoData;

    constructor(public dialogs: SmzDialogsService)
    {
        this.setupCode();
    }

    ngOnInit(): void
    {
    }


    public show(): void
    {

    }

    public setupCode(): void
    {
        this.code =
        `
        showConfirmation(
            'Are you sure ?',
            () => { console.log('OK'); }
        `;
    }

}
