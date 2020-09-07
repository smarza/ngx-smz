import { Component, OnInit } from '@angular/core';
import { DemoData } from 'src/app/demo/models/demo-data.model';
import { DynamicDialogsService } from 'ngx-smz-dialogs';

@Component({
    selector: 'demo-message-dialog',
    templateUrl: './message-dialog.component.html',
    styleUrls: ['./message-dialog.component.scss']
})
export class MessageDialogComponent implements OnInit
{
    public code: string;
    public data: DemoData;

    constructor(public dialogs: DynamicDialogsService)
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
            this.dialogs.showMessage
                (
                    { title: 'Mensagem do Servidor', messages: ['teste'] }
                );
        `;
    }
}