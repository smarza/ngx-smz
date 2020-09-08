import { Injectable } from '@angular/core';
import { SmzDialogsConfig } from '../smz-dialogs.config';
import { SmzDialog, SmzDynamicDialogConfig } from '../models/smz-dialogs';
import { SmzForms } from '../../smz-forms/models/smz-forms';
import { ComponentData } from '../../../common/modules/inject-content/models/injectable.model';
import { FormGroupComponent } from '../../smz-forms/features/form-group/form-group.component';
import { MessageContentComponent } from '../features/message-content/message-content.component';
import { DialogService } from '../dynamicdialog/dialogservice';
import { DialogContentManagerComponent } from '../features/dialog-content-manager/dialog-content-manager.component';
import { mergeClone } from '../../../common/utils/deep-merge';

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
        behaviors: {},
        advancedResponse: {},
        simpleResponse: {},
        builtInButtons: {}
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

    public open(dialog: SmzDialog<any>): void
    {
        const data: SmzDialog<any> = {
            ...BASE_DIALOG,
            ...dialog,
        };

        this.safeTypeFunctions(data);
        this.createContext(data);
        this.createInjectables(data);

        const behaviors = data._context.behaviors;
        const paddingStyle = behaviors.noPadding ? { 'padding': 0 } : { };

        const config: SmzDynamicDialogConfig = {
            header: dialog.title,
            width: behaviors.defaultWidth,
            contentStyle: { 'overflow': 'auto', ...paddingStyle  },
            footer: behaviors.showFooter ? '-' : null,
            closable: behaviors.showCloseButton,
            closeOnEscape: behaviors.closeOnEscape,
            showHeader: behaviors.showHeader,
            dismissableMask: behaviors.dismissableMask,
            baseZIndex: behaviors.baseZIndex,
            data,
        };

        const ref = this.dialogService.open(DialogContentManagerComponent, config);

        ref.onDestroy.subscribe(() =>
        {
            data.functions.onClose();
        });

        // console.log('showFormGroup', config);
    }

    private safeTypeFunctions(data: SmzDialog<any>): void
    {
        if (data.functions.onConfirm == null) data.functions.onConfirm = (data: any) => { };
        if (data.functions.onCancel == null) data.functions.onCancel = () => { };
        if (data.functions.onClose == null) data.functions.onClose = () => { };
    }

    private createContext(data: SmzDialog<any>): void
    {
        data._context.injectables = [];
        data._context.advancedResponse = {};
        data._context.simpleResponse = {};
        data._context.behaviors = mergeClone(this.presets.dialogs.behaviors, data.behaviors);
        data._context.builtInButtons = mergeClone(this.presets.dialogs.builtInButtons, data.builtInButtons);
    }

    private createInjectables(data: SmzDialog<any>): void
    {

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