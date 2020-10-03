import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { SmzDynamicDialogConfig, SmzDialogCustomButton } from '../../models/smz-dialogs';
import { DynamicDialogRef } from '../../dynamicdialog/dynamicdialog-ref';
import { SmzDialogsConfig } from '../../smz-dialogs.config';
import { SmzDialogsVisibilityService } from '../../services/smz-dialogs-visibility.service';

@Component({
    selector: 'smz-dialog-footer',
    templateUrl: './dialog-footer.component.html',
    styleUrls: ['./dialog-footer.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class DialogFooterComponent implements OnInit
{

    constructor(public refService: DynamicDialogRef, public dialogConfig: SmzDynamicDialogConfig, public presets: SmzDialogsConfig, private visibilityService: SmzDialogsVisibilityService)
    { }

    public ngOnInit(): void
    {
    }

    public close(): void
    {
        if (this.dialogConfig.data?.callbacks?.onCancel != null)
        {
            this.dialogConfig.data.callbacks.onCancel();
        }

        this.refService.close();
    }

    public confirm(): void
    {
        const config = this.dialogConfig.data;
        const response = config.behaviors.useAdvancedResponse ? config._context.advancedResponse : config._context.simpleResponse;

        if (this.dialogConfig.data?.callbacks?.onConfirm != null)
        {
            this.dialogConfig.data.callbacks.onConfirm(response);
        }

        this.refService.close();
    }

    public ok(): void
    {
        const config = this.dialogConfig.data;
        const response = config.behaviors.useAdvancedResponse ? config._context.advancedResponse : config._context.simpleResponse;

        if (this.dialogConfig.data?.callbacks?.onOk != null)
        {
            this.dialogConfig.data.callbacks.onOk(response);
        }

        this.refService.close();
    }

    public customClick(button: SmzDialogCustomButton<any>): void
    {
        const config = this.dialogConfig.data;
        const response = config.behaviors.useAdvancedResponse ? config._context.advancedResponse : config._context.simpleResponse;

        button.onClick(response);

        if (button.closeDialog)
        {
            this.refService.close();
        }
    }

    public isValid(): boolean
    {
        // const isValid = this.dialogConfig.data._context.injectables.every(x => x.ref?.componentRef?.instance?.isValid);
        // console.log('----------------------- isValid', this.visibilityService);
        let isValid = true;

        for (const injectable of this.dialogConfig.data._context.injectables)
        {

            if (injectable.visibilityDependsOn != null)
            {
                const observer = this.visibilityService.observers[injectable.componentId + injectable.component.name];
                const isVisible = observer?.visibility$.value;

                if (isVisible && !injectable.ref?.componentRef?.instance?.isValid)
                {
                    isValid = false;
                }
            }
            else
            {
                // console.log('   instance isValid', injectable.ref?.componentRef?.instance?.isValid);
                if (!injectable.ref?.componentRef?.instance?.isValid)
                {
                    isValid = false;
                }

            }
        }

        return isValid;
    }

}
