import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { SmzDynamicDialogConfig, SmzDialogCustomButton } from '../../models/smz-dialogs';
import { DynamicDialogRef } from '../../dynamicdialog/dynamicdialog-ref';
import { SmzDialogsConfig } from '../../smz-dialogs.config';

@Component({
    selector: 'smz-dialog-footer',
    templateUrl: './dialog-footer.component.html',
    styleUrls: ['./dialog-footer.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class DialogFooterComponent implements OnInit
{

    constructor(public refService: DynamicDialogRef, public dialogConfig: SmzDynamicDialogConfig, public presets: SmzDialogsConfig)
    { }

    public ngOnInit(): void
    {
    }

    public close(): void
    {
        this.dialogConfig.data.functions.onCancel();
        this.refService.close();
    }

    public confirm(): void
    {
        const config = this.dialogConfig.data;
        const response = config.behaviors.useAdvancedResponse ? config._context.advancedResponse : config._context.simpleResponse;

        this.dialogConfig.data.functions.onConfirm(response);
        this.refService.close();
    }

    public ok(): void
    {
        const config = this.dialogConfig.data;
        const response = config.behaviors.useAdvancedResponse ? config._context.advancedResponse : config._context.simpleResponse;

        this.dialogConfig.data.functions.onOk(response);
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
        const isValid = this.dialogConfig.data._context.injectables.every(x => x.ref?.componentRef?.instance?.isValid);
        return isValid;
    }

}
