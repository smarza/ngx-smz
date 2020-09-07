import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ResponsiveService } from '../../services/responsive.service';

import { SmzDynamicDialogConfig } from '../../models/smz-dialogs';
import { DynamicDialogRef } from '../../dynamicdialog/dynamicdialog-ref';

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
        // console.log('configService', this.config);
        // console.log('refService', this.refService);
    }

}
