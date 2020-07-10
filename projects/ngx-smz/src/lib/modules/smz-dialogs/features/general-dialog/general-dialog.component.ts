import { Component, OnInit, ViewChildren } from '@angular/core';
import { ConfigService } from '../../services/config.service';
import { SmzDialogsConfig } from '../../smz-dialogs.config';
import { InjectContentService } from '../../../../common/modules/inject-content/inject-content.service';
import { IDialogActionButton, OverLayResponseData } from '../../models/dialogs.models';
import { Dialog } from 'primeng/dialog';

@Component({
    selector: 'smz-general-dialog',
    templateUrl: './general-dialog.component.html',
    styleUrls: ['./general-dialog.component.scss'],
    // encapsulation: ViewEncapsulation.None,
})
export class GeneralDialogComponent implements OnInit
{
    @ViewChildren('dialogOverlays') public overlays: any; // QueryList<ElementRef>;

    constructor(public service: ConfigService, public config: SmzDialogsConfig, public injectService: InjectContentService) { }

    public ngOnInit(): void
    {
    }
    public showDialogMaximized(event, maximizeOnOpen: boolean, dialog: Dialog): void
    {
        if (maximizeOnOpen) dialog.maximize();
    }

    public getDialogOverlay(index: number): any
    {
        // console.log('------ getDialogOverlay', index);
        // const dom = document.querySelector(`#dialogOverlay${button.overlayData.id}`);
        // console.log('overlays', this.overlays);

        const match = this.overlays.find(o =>
        {
            // console.log('o---', o);
            return (o as any).el.nativeElement.id === `dialogOverlay${index}`;
        });
        // console.log('match', match);
        return match;
    }

    public emitOverlayAction(index: number, button: IDialogActionButton, event: any, dialogKey: string): void
    {
        // console.log('emitOverlayAction');
        const overlay = this.getDialogOverlay(index);
        overlay.show(event);

        const instance = button.overlayData.ref.componentRef.instance;

        const data = this.service.getFormDataByDialog(dialogKey);

        const response: OverLayResponseData = data != null ? { component: instance, event, ...data } : { component: instance, event, data: null, isValid: null };
        button.onClick(response);

    }
}
