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
import { SetTemplateClasses } from '../../../common/pipes/templates.pipe';
import { DynamicDialogRef } from '../dynamicdialog/dynamicdialog-ref';

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
    dialogTemplate: {},
    _context: {
        injectables: [],
        behaviors: {},
        advancedResponse: {},
        simpleResponse: {},
        builtInButtons: {},
        customButtons: [],
        featureTemplate: {},
        dialogTemplate: {},
    }
}


@Injectable({
    providedIn: 'root'
})
export class SmzDialogsService
{
    constructor(private presets: SmzDialogsConfig, private dialogService: DialogService, public refService: DynamicDialogRef)
    {
        BASE_DIALOG.behaviors = presets.dialogs.behaviors;
        BASE_DIALOG.dialogTemplate = presets.dialogs.dialogTemplate;
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
        const paddingStyle = behaviors.contentPadding ? { 'padding': behaviors.contentPadding} : {};

        const config: SmzDynamicDialogConfig = {
            header: dialog.title,
            contentStyle: { 'overflow': 'auto', ...paddingStyle },
            styleClass: SetTemplateClasses(data._context.dialogTemplate, ['row']),
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
        data._context.customButtons = data.customButtons ?? [];
        data._context.featureTemplate = this.presets.dialogs.featureTemplate;
        data._context.dialogTemplate = mergeClone(this.presets.dialogs.dialogTemplate, data.dialogTemplate);
    }

    private createInjectables(data: SmzDialog<any>): void
    {

        for (let feature of data.features)
        {
            const featureTemplate = mergeClone(data._context.featureTemplate, feature.template);

            switch (feature.type)
            {
                case 'form':
                    // FORM GROUP DETECTED
                    const featureData = feature.data as SmzForms<any>;

                    data._context.injectables.push({
                        component: FormGroupComponent,
                        inputs: [{ data: feature.data, input: 'config' }],
                        outputs: [{
                            output: 'statusChanges', callback: (event: any) =>
                            {
                                data._context.advancedResponse[featureData.formId] = event.data;
                                data._context.simpleResponse = { ...data._context.simpleResponse, ...event.data };
                            }
                        }],
                        template: featureTemplate
                    });
                    break;

                case 'message':
                    // MESSAGE DETECTED
                    data._context.injectables.push({
                        component: MessageContentComponent,
                        inputs: [{ data: feature.data, input: 'data' }],
                        outputs: [],
                        template: featureTemplate
                    });
                    break;

                case 'component':
                    // INJECTABLE COMPONENT DETECTED
                    data._context.injectables.push({
                        ...feature.data as ComponentData,
                        template: featureTemplate
                    });
                    break;
                default:
                    break;
            }

        }

    }

}