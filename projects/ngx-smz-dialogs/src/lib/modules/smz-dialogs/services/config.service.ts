import { Injectable, ApplicationRef } from '@angular/core';
import { DialogData, IDialogKey, IDialogData, IDialogActionButton, dialogKeys } from '../models/dialogs.models';
import { Observable } from 'rxjs';
import { InjectContentService } from '../../../common/modules/inject-content/inject-content.service';
import { SmzDialogsConfig } from '../smz-dialogs.config';

@Injectable({
    providedIn: 'root'
})
export class ConfigService
{
    public dialogs: Map<string, DialogData> = new Map<string, DialogData>();
    public backdrop: { visibility: boolean, level: number } = { visibility: false, level: 1000 };

    constructor(private injectService: InjectContentService, private config: SmzDialogsConfig, private appRef: ApplicationRef)
    {
        if (config.baseZIndex != null)
        {
            this.backdrop.level = config.baseZIndex;
        } else
        {
            config.baseZIndex = this.backdrop.level;
        }
    }

    public show(dialog: IDialogKey, config: IDialogData): Observable<any>
    {
        // console.log('show', dialog, config);

        this.disableLevels();

        this.dialogs.delete(dialog.key);

        this.dialogs.set(dialog.key, new DialogData(dialog));
        const dialogData = this.dialogs.get(dialog.key);
        dialogData.isDialogActive = true;

        if (dialog.key === dialogKeys.MESSAGE_DIALOG.key || dialog.key === dialogKeys.CONFIRMATION_DIALOG.key)
        {
            const content = this.dialogs.get(dialogKeys.CONTENT_DIALOG.key);
            if (content != null) content.config.isDisabled = true;
        }

        const timer = setTimeout(() =>
        {
            if (dialogData.isReseted)
            {

                dialogData.config.isDisabled = false;
                this.backdrop.visibility = true;

                dialogData.show(config);

                setTimeout(() =>
                {
                    this.appRef.tick();
                }, 200);

                clearInterval(timer);
            }
        }, 200);

        return dialogData.listener$.asObservable();
    }

    private hide(dialogKey: string): void
    {
        const dialogData = this.dialogs.get(dialogKey);

        // console.log('hide', dialogData);

        dialogData.hide();

        setTimeout(() =>
        {
            this.appRef.tick();
        }, 0);

    }

    public onHide(dialogKey: string): void
    {
        // console.log('onHide');

        const dialogData = this.dialogs.get(dialogKey);

        let data = {};

        if (dialogData.ref != null && dialogData.ref.componentRef != null && dialogData.ref.componentRef.instance != null)
        {
            try
            {
                data = dialogData.ref.componentRef.instance.getData();
            } catch (error)
            {

            }
        }

        if (dialogData.config.onClose != null) dialogData.config.onClose(data);

        this.injectService.deleteComponent();
        dialogData.reset();

        this.backdrop.visibility = this.isAnyDialogVisible() ? true : false;
        const higher = this.getHigherVisibleLevel();

        if (higher != null)
        {
            higher.config.isDisabled = false;
        }

        if (dialogKey === dialogKeys.MESSAGE_DIALOG.key || dialogKey === dialogKeys.CONFIRMATION_DIALOG.key)
        {
            const content = this.dialogs.get(dialogKeys.CONTENT_DIALOG.key);
            if (content != null) content.config.isDisabled = false;
        }

        setTimeout(() =>
        {
            this.injectService.deleteComponent();
        }, 100);

    }

    public getFormDataByDialog(dialogKey: string): any
    {
        const dialogData = this.dialogs.get(dialogKey);

        if (dialogData.ref != null && dialogData.ref.componentRef != null && dialogData.ref.componentRef.instance != null)
        {
            try
            {
                return dialogData.ref.componentRef.instance.getData();
            } catch (error)
            {
                return null;
            }
        }

        return null;
    }

    public emit(dialogKey: string, button: IDialogActionButton, overlayComponent: any): void
    {
        const dialogData = this.dialogs.get(dialogKey);

        if (button.isOverlayAction)
        {
            button.onClick(overlayComponent);
        }
        else
        {
            let data = {};

            if (dialogData.ref != null && dialogData.ref.componentRef != null && dialogData.ref.componentRef.instance != null)
            {
                try
                {
                    data = dialogData.ref.componentRef.instance.getData();
                } catch (error)
                {

                }
            }

            setTimeout(() =>
            {
                if (button.isOverlayAction)
                {
                    button.onClick({ ...data, overlayComponent: overlayComponent});
                }
                else
                {
                    button.onClick(data);
                }
            }, 100);
        }


        if (button.closeDialogAfterClicked)
        {
            this.hide(dialogKey);
        }
    }

    private isAnyDialogVisible(): boolean
    {

        let response = false;

        this.dialogs.forEach(d => { response = d.config.isVisible ? true : response; });

        return response;
    }

    private dialogExists(key: string): boolean
    {

        const keys = Array.from(this.dialogs.keys());
        return keys.findIndex(k => k === key) !== -1;
    }

    private getHigherVisibleLevel(): DialogData
    {

        let level = this.config.baseZIndex + 1;
        let dialog: DialogData;

        this.dialogs.forEach(d =>
        {
            if (d.config.isVisible && d.config.level > level)
            {
                dialog = d;
                level = d.config.level;
            }
        });

        return dialog;
    }

    private disableLevels(): void
    {
        this.dialogs.forEach(d => { d.config.isDisabled = true; });
    }

    public closeAll(): void
    {
        this.dialogs.forEach(d => { d.hide(); });
    }

}
