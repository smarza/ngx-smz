import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ResponsiveService } from '../../services/responsive.service';

import { SmzDynamicDialogConfig } from '../../models/smz-dialogs';
import { DynamicDialogRef } from '../../dynamicdialog/dynamicdialog-ref';
import { SmzDialogsVisibilityService } from '../../services/smz-dialogs-visibility.service';

@Component({
    selector: 'smz-dialog-content-manager',
    templateUrl: './dialog-content-manager.component.html',
    styleUrls: ['./dialog-content-manager.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class DialogContentManagerComponent implements OnInit
{

    constructor(public responsive: ResponsiveService, public refService: DynamicDialogRef, public config: SmzDynamicDialogConfig, public visibility: SmzDialogsVisibilityService)
    { }

    public ngOnInit(): void
    {
    }

}
