import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ResponsiveService } from '../../services/responsive.service';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { SmzDynamicDialogConfig } from '../../models/smz-dialogs';

@Component({
    selector: 'smz-general-dialog',
    templateUrl: './general-dialog.component.html',
    styleUrls: ['./general-dialog.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class GeneralDialogComponent implements OnInit
{

    constructor(public responsive: ResponsiveService, public refService: DynamicDialogRef, public config: SmzDynamicDialogConfig)
    { }

    public ngOnInit(): void
    {
        console.log('configService', this.config);
        console.log('refService', this.refService);
    }

    public close(): void
    {
        this.config.data.functions.onCancel();
        this.refService.close();
    }

    public confirm(): void
    {
        this.config.data.functions.onConfirm(null);
        this.refService.close();
    }

}
