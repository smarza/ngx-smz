import { Injectable } from '@angular/core';
import { DialogData, IDialogKey, IDialogData, IDialogActionButton } from '../models/dialogs.models';
import { Observable } from 'rxjs';
import { InjectContentService } from '../../../common/modules/inject-content/inject-content.service';


@Injectable({
    providedIn: 'root'
  })
export class ConfigService
{
    public dialogs: Map<string, DialogData> = new Map<string, DialogData>();
    public backdrop: { visibility: boolean, level: number } = { visibility: false, level: 1000 };

    constructor(private injectService: InjectContentService) { }

    public show(dialog: IDialogKey, config: IDialogData): Observable<any>
    {
        // console.log('show', dialog, config);

        this.disableLevels();

        this.dialogs.delete(dialog.key);

        this.dialogs.set(dialog.key, new DialogData(dialog));
        const dialogData = this.dialogs.get(dialog.key);
        dialogData.isDialogActive = true;

        const timer = setTimeout(() =>
        {
            if (dialogData.isReseted)
            {

                dialogData.config.isDisabled = false;
                this.backdrop.visibility = true;

                dialogData.show(config);
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

    }

    public onHide(dialogKey: string): void
    {
        // console.log('onHide');

        const dialogData = this.dialogs.get(dialogKey);
        this.injectService.deleteComponent();
        dialogData.reset();

        this.backdrop.visibility = this.isAnyDialogVisible() ? true : false;
        const higher = this.getHigherVisibleLevel();

        if (higher != null)
        {
            higher.config.isDisabled = false;
        }

        setTimeout(() => {
            this.injectService.deleteComponent();
            this.dialogs.delete(dialogKey);
        }, 0);

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
            const data = dialogData.ref.componentRef.instance.getData();
            button.onClick(data);
        }


        if (button.closeDialogAfterClicked)
        {
            this.hide(dialogKey);
        }
    }

    private isAnyDialogVisible(): Boolean
    {

        let response = false;

        this.dialogs.forEach(d => { response = d.config.isVisible ? true : response; });

        return response;
    }

    private dialogExists(key: string): Boolean
    {

        const keys = Array.from(this.dialogs.keys());
        return keys.findIndex(k => k === key) !== -1;
    }

    private getHigherVisibleLevel(): DialogData
    {

        let level = 2000;
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
