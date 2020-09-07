import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { SmzDynamicDialogConfig } from '../../models/smz-dialogs';
import { DynamicDialogRef } from '../../dynamicdialog/dynamicdialog-ref';

@Component({
    selector: 'smz-dialog-footer',
    templateUrl: './dialog-footer.component.html',
    styleUrls: ['./dialog-footer.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class DialogFooterComponent implements OnInit
{

    constructor(public refService: DynamicDialogRef, public config: SmzDynamicDialogConfig)
    { }

    public ngOnInit(): void
    {
        // console.log('configService', this.config);
        // console.log('refService', this.refService);
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

    public isValid(): boolean
    {
        console.log(this.config.data._context.injectables);
        const isValid = this.config.data._context.injectables.every(x => x.ref.componentRef.isValid);
        console.log('isValid', isValid);
        return isValid;
    }

}
