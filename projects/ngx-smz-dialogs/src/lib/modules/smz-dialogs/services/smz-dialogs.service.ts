import { Injectable } from '@angular/core';
import { SmzDialogsConfig } from '../smz-dialogs.config';
import { SmzDialog } from '../models/smz-dialogs';
import { GeneralDialogComponent } from '../features/general-dialog/general-dialog.component';
import { PrimeDialogService } from './prime-dialog.service';
import { features } from 'process';
import { SmzForms } from '../../smz-forms/models/smz-forms';
import { ComponentData } from '../../../common/modules/inject-content/models/injectable.model';
import { isString } from 'util';
import { FormGroupComponent } from '../../smz-forms/features/form-group/form-group.component';
import { MessageContentComponent } from '../features/message-content/message-content.component';

const FORMGROUP_BASE = 2;
const CONFIRMATION_BASE = 4;
const COMPONENT_BASE = 3;
const MESSAGE_BASE = 6;


const BASE_DIALOG: SmzDialog = {
    title: '',
    features: [],
    behaviors: {

    },
    functions: {
        onConfirm: (data: any) => { },
        onCancel: () => { },
        onClose: () => { },
    },
    template: {

    },
    _context: {}
}


@Injectable({
    providedIn: 'root'
})
export class DynamicDialogsService
{
    // public ref: DynamicDialogRef;

    constructor(private configuration: SmzDialogsConfig, public dialogService: PrimeDialogService) { }

    public showFormGroup(config: SmzDialog): void
    {
        const data: SmzDialog = {
            ...BASE_DIALOG,
            ...config
        };

        this.safeTypeFunctions(data);
        this.createInjectables(data);

        // console.log(data);

        const ref = this.dialogService.open(GeneralDialogComponent, {
            header: config.title,
            width: '70%',
            contentStyle: { 'overflow': 'auto' },
            footer: 'aaaaa<strong>sdasdasda</strong>',
            data,
            // baseZIndex: 10000
        });

        ref.onDestroy.subscribe(() =>
        {
            data.functions.onClose();
        });

    }

    private safeTypeFunctions(data: SmzDialog): void
    {
        if (data.functions.onConfirm == null) data.functions.onConfirm = (data: any) => { };
        if (data.functions.onCancel == null) data.functions.onCancel = () => { };
        if (data.functions.onClose == null) data.functions.onClose = () => { };
    }

    private createInjectables(data: SmzDialog): void
    {
        data._context.injectables = [];

        for (let feature of data.features)
        {
            if ((feature as SmzForms<any>).groups != null)
            {
                // FORM GROUP DETECTED
                data._context.injectables.push(
                    {
                        component: FormGroupComponent,
                        inputs: [{ data: feature, input: 'config' }],
                        outputs: [],
                    }
                );

            }
            else if ((feature as ComponentData).component != null)
            {
                // INJECTABLE COMPONENT DETECTED
                data._context.injectables.push(feature as ComponentData);
            }
            else if (isString((feature as string)))
            {
                // MESSAGE DETECTED
                data._context.injectables.push(
                    {
                        component: MessageContentComponent,
                        inputs: [{ data: feature, input: 'data' }],
                        outputs: [],
                    }
                );
            }
        }

    }

}