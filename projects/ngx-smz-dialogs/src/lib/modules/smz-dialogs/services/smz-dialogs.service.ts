import { Injectable } from '@angular/core';
import { SmzDialogsConfig } from '../smz-dialogs.config';
import { SmzDialog, SmzDynamicDialogConfig } from '../models/smz-dialogs';

import { features } from 'process';
import { SmzForms } from '../../smz-forms/models/smz-forms';
import { ComponentData } from '../../../common/modules/inject-content/models/injectable.model';
import { isString } from 'util';
import { FormGroupComponent } from '../../smz-forms/features/form-group/form-group.component';
import { MessageContentComponent } from '../features/message-content/message-content.component';
import { DialogService } from '../dynamicdialog/dialogservice';
import { DialogContentManagerComponent } from '../features/dialog-content-manager/dialog-content-manager.component';
import { mergeDeep } from '../../../common/utils/deep-merge';

const FORMGROUP_BASE = 2;
const CONFIRMATION_BASE = 4;
const COMPONENT_BASE = 3;
const MESSAGE_BASE = 6;


const BASE_DIALOG: SmzDialog<any> = {
    title: '',
    features: [],
    behaviors: {},
    functions: {
        onConfirm: (data: any) => { },
        onCancel: () => { },
        onClose: () => { },
    },
    template: {},
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

    constructor(private presets: SmzDialogsConfig, public dialogService: DialogService)
    {
        BASE_DIALOG.behaviors = presets.dialogs.behaviors;
    }

    public showFormGroup(dialog: SmzDialog<any>): void
    {
        const presetBehaviors = this.presets.dialogs.behaviors;
        const usersBehaviors = dialog.behaviors;

        // const behaviors = mergeDeep(this.presets.dialogs.behaviors, dialog.behaviors);

        const data: SmzDialog<any> = {
            ...BASE_DIALOG,
            ...dialog,
            behaviors: {
                ...BASE_DIALOG.behaviors,
                ...dialog.behaviors,
            }
        };

        this.safeTypeFunctions(data);
        this.createInjectables(data);

        const paddingStyle = (usersBehaviors.noPadding ?? presetBehaviors.noPadding) ? { 'padding': 0 } : { };

        const config: SmzDynamicDialogConfig = {
            header: dialog.title,
            width: usersBehaviors.defaultWidth ?? presetBehaviors.defaultWidth,
            contentStyle: { 'overflow': 'auto', ...paddingStyle  },
            footer: (usersBehaviors.showFooter ?? presetBehaviors.showFooter) ? '-' : null,
            closable: usersBehaviors.showCloseButton ?? presetBehaviors.showCloseButton,
            closeOnEscape: usersBehaviors.closeOnEscape ?? presetBehaviors.closeOnEscape,
            showHeader: usersBehaviors.showHeader ?? presetBehaviors.showHeader,
            dismissableMask: usersBehaviors.dismissableMask ?? presetBehaviors.dismissableMask,
            data,
            baseZIndex: usersBehaviors.baseZIndex ?? presetBehaviors.baseZIndex,
        };

        const ref = this.dialogService.open(DialogContentManagerComponent, config);

        ref.onDestroy.subscribe(() =>
        {
            data.functions.onClose();
        });

        console.log('showFormGroup', config);
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