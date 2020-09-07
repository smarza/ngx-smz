import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { ResponsiveService } from '../../services/responsive.service';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { SmzDynamicDialogConfig } from '../../models/smz-dialogs';

@Component({
    selector: 'smz-message-content',
    templateUrl: './message-content.component.html',
    styleUrls: ['./message-content.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class MessageContentComponent implements OnInit
{
    @Input() public data: string;

    constructor()
    { }

    public ngOnInit(): void
    {
        console.log('MessageContentComponent ngOnInit', this.data);
    }

}
