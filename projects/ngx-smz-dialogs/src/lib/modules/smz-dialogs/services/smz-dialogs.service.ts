import { Injectable } from '@angular/core';
import { SmzDialogsConfig } from '../smz-dialogs.config';
import { SmzDialog } from '../models/smz-dialogs';
import { GeneralDialogComponent } from '../features/general-dialog/general-dialog.component';

import { features } from 'process';
import { SmzForms } from '../../smz-forms/models/smz-forms';
import { ComponentData } from '../../../common/modules/inject-content/models/injectable.model';
import { isString } from 'util';
import { FormGroupComponent } from '../../smz-forms/features/form-group/form-group.component';
import { MessageContentComponent } from '../features/message-content/message-content.component';
import { DialogService } from '../dynamicdialog/dialogservice';

const FORMGROUP_BASE = 2;
const CONFIRMATION_BASE = 4;
const COMPONENT_BASE = 3;
const MESSAGE_BASE = 6;


const BASE_DIALOG: SmzDialog<any> = {
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
    _context: {
        injectables: [],
        advancedResponse: {},
        simpleResponse: {}
    }
}


@Injectable({
    providedIn: 'root'
})
export class DynamicDialogsService
{
    // public ref: DynamicDialogRef;

    constructor(private configuration: SmzDialogsConfig, public dialogService: DialogService) { }

    public showFormGroup(config: SmzDialog<any>): void
    {
        const data: SmzDialog<any> = {
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

    private safeTypeFunctions(data: SmzDialog<any>): void
    {
        if (data.functions.onConfirm == null) data.functions.onConfirm = (data: any) => { };
        if (data.functions.onCancel == null) data.functions.onCancel = () => { };
        if (data.functions.onClose == null) data.functions.onClose = () => { };
    }

    private createInjectables(data: SmzDialog<any>): void
    {
        data._context.injectables = [];
        data._context.advancedResponse = {};
        data._context.simpleResponse = {};

        for (let feature of data.features)
        {
            switch (feature.type)
            {
                case 'form':
                    // FORM GROUP DETECTED
                    const featureData = feature.data as SmzForms<any>;

                    data._context.injectables.push({
                        component: FormGroupComponent,
                        inputs: [{ data: feature.data, input: 'config' }],
                        outputs: [{ output: 'statusChanges', callback: (event: any) => {
                            data._context.advancedResponse[featureData.formId] = event.data;
                            data._context.simpleResponse = { ...data._context.simpleResponse, ...event.data };
                        } }],
                    });
                    break;

                case 'message':
                    // MESSAGE DETECTED
                    data._context.injectables.push({
                        component: MessageContentComponent,
                        inputs: [{ data: feature.data, input: 'data' }],
                        outputs: [],
                    });
                    break;

                case 'component':
                    // INJECTABLE COMPONENT DETECTED
                    data._context.injectables.push(feature.data as ComponentData);
                    break;
                default:
                    break;
            }

        }

    }

}