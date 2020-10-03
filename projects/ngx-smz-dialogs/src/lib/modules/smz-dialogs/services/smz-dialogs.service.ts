import { Injectable } from '@angular/core';
import { SmzDialogsConfig } from '../smz-dialogs.config';
import { SmzDialog, SmzDialogPreset, SmzDynamicDialogConfig } from '../models/smz-dialogs';
import { SmzForm, SmzFormGroup } from '../../smz-forms/models/smz-forms';
import { ComponentData } from '../../../common/modules/inject-content/models/injectable.model';
import { FormGroupComponent } from '../../smz-forms/features/form-group/form-group.component';
import { MessageContentComponent } from '../features/message-content/message-content.component';
import { DialogService } from '../dynamicdialog/dialogservice';
import { DialogContentManagerComponent } from '../features/dialog-content-manager/dialog-content-manager.component';
import { mergeClone } from '../../../common/utils/deep-merge';
import { SetTemplateClasses } from '../../../common/pipes/templates.pipe';
import { DynamicDialogRef } from '../dynamicdialog/dynamicdialog-ref';
import { isArray, uuidv4 } from '../../../common/utils/utils';
import { SmzDialogsVisibilityService } from './smz-dialogs-visibility.service';
import { SmzCheckBoxControl, SmzControlTypes } from '../../smz-forms/public-api';
import { getPreset } from '../models/smz-presets';

const FORMGROUP_BASE = 2;
const CONFIRMATION_BASE = 4;
const COMPONENT_BASE = 3;
const MESSAGE_BASE = 6;

const BASE_DIALOG: SmzDialog<any> = {
    title: '',
    features: [],
    behaviors: {},
    callbacks: {
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
    constructor(private moduleConfig: SmzDialogsConfig, private dialogService: DialogService, public refService: DynamicDialogRef, private visibilityService: SmzDialogsVisibilityService)
    {
        BASE_DIALOG.behaviors = moduleConfig.dialogs.behaviors;
        BASE_DIALOG.dialogTemplate = moduleConfig.dialogs.dialogTemplate;
    }

    /**
    * Cria uma instancia de Dialogo.
    * Atenção: o preset irá subscrever o behaviors, builtInButtons e dialogTemplate existentes
    * O Preset tem prioridade sobre as configurações do app module e sobre o presetId do dialogo.
    */
    public open(dialog: SmzDialog<any>, preset?: SmzDialogPreset): DynamicDialogRef
    {
        const data: SmzDialog<any> = {
            ...BASE_DIALOG,
            ...dialog,
        };

        this.setupComponentVisibilities(dialog);
        this.setupVisibilityObservers(dialog);
        this.safeTypeFunctions(data);

        if (preset != null || dialog.presetId != null)
        {
            const currentPreset = preset != null ? preset : getPreset(dialog.presetId);
            this.createContextWithPreset(data, currentPreset);
            this.applyDialogPreset(dialog, currentPreset);
            this.applyFormsPreset(dialog, currentPreset);
        }
        else
        {
            this.createContext(data);
        }


        this.createInjectables(data);

        const behaviors = data._context.behaviors;
        const paddingStyle = behaviors.contentPadding ? { 'padding': behaviors.contentPadding } : {};

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
            data.callbacks.onClose();
        });

        return ref;
    }

    private applyDialogPreset(data: SmzDialog<any>, preset: SmzDialogPreset): void
    {
        data.behaviors = { ...data.behaviors, ...preset.dialog.behaviors };
        data.builtInButtons = { ...data.builtInButtons, ...preset.dialog.builtInButtons };
        data.dialogTemplate = { ...data.dialogTemplate, ...preset.dialog.dialogTemplate };
    }

    private applyFormsPreset(data: SmzDialog<any>, preset: SmzDialogPreset): void
    {
        for (const feature of data.features)
        {
            if (feature.type === 'form')
            {
                const form = feature.data as SmzForm<any>;
                form.behaviors = { ...form.behaviors, ...preset.features.formBehaviors };
                form.template = { ...form.template, ...preset.features.featureTemplate };

                for (const group of form.groups)
                {
                    this.applyFormGroupsPreset(group, preset);
                }
            }
        }
    }

    private applyFormGroupsPreset(data: SmzFormGroup, preset: SmzDialogPreset): void
    {
        data.template = { ...data.template, ...preset.features.formGroupTemplate };

        for (const control of data.children)
        {
            this.applyFormControlPreset(control, preset);
        }
    }

    private applyFormControlPreset(data: SmzControlTypes, preset: SmzDialogPreset): void
    {
        data.template = { ...data.template, ...preset.features.formControlTemplate };
    }

    private setupVisibilityObservers(data: SmzDialog<any>): void
    {
        for (const feature of data.features)
        {
            if (feature.type === 'component')
            {
                const componentData = feature.data as ComponentData;

                if (componentData.componentId == null)
                {
                    componentData.componentId = uuidv4();
                }

                if (componentData.visibilityDependsOn != null)
                {
                    this.visibilityService.registryObserver(componentData);
                }
            }
        }
    }

    private setupComponentVisibilities(data: SmzDialog<any>): void
    {
        for (const feature of data.features)
        {
            if (feature.type === 'component')
            {
                const componentData = feature.data as ComponentData;

                if (componentData.visibilityDependsOn != null)
                {
                    this.setupVisibilityEmitters(data, componentData);
                }
            }
        }
    }

    public setupVisibilityEmitters(data: SmzDialog<any>, component: ComponentData): void
    {
        for (const feature of data.features)
        {
            if (feature.type === 'form')
            {
                const form = feature.data as SmzForm<any>;

                for (const group of form.groups)
                {
                    for (const input of group.children)
                    {
                        if (component.visibilityDependsOn.formId === form.formId && component.visibilityDependsOn.propertyName === input.propertyName)
                        {
                            this.visibilityService.registryDependsOnData(input as SmzCheckBoxControl, form.formId);
                        }
                    }
                }
            }
        }
    }

    private safeTypeFunctions(data: SmzDialog<any>): void
    {
        if (data.callbacks.onConfirm == null) data.callbacks.onConfirm = (data: any) => { };
        if (data.callbacks.onCancel == null) data.callbacks.onCancel = () => { };
        if (data.callbacks.onClose == null) data.callbacks.onClose = () => { };
        if (data.callbacks.onOk == null) data.callbacks.onOk = () => { };
    }

    private createContextWithPreset(data: SmzDialog<any>, preset: SmzDialogPreset): void
    {
        const builtInButtons = mergeClone(this.moduleConfig.dialogs.builtInButtons, data.builtInButtons);

        data._context = {
            injectables: [],
            advancedResponse: {},
            simpleResponse: {},
            behaviors: mergeClone(data.behaviors, preset.dialog.behaviors),
            builtInButtons: mergeClone(builtInButtons, preset.dialog.builtInButtons),
            customButtons: data.customButtons ?? [],
            featureTemplate: preset.features.featureTemplate,
            dialogTemplate: mergeClone(data.dialogTemplate, preset.dialog.dialogTemplate),
        }

        if (preset.globals != null)
        {
            for (const feature of data.features)
            {
                if (feature.type === 'form')
                {
                    const form = feature.data as SmzForm<any>;

                    if (form._context == null)
                    {
                        form._context = {
                            applyGlobalStyles: false
                        };
                    }
                    else
                    {
                        form._context.applyGlobalStyles = true;
                    }

                }
            }

            document.documentElement.style.setProperty('--smz-spacer', preset.globals.spacer);
            document.documentElement.style.setProperty('--smz-form-global-scale', `${preset.globals.globalStyleScale}rem`);
        }
    }

    private createContext(data: SmzDialog<any>): void
    {
        data._context = {
            injectables: [],
            advancedResponse: {},
            simpleResponse: {},
            behaviors: mergeClone(this.moduleConfig.dialogs.behaviors, data.behaviors),
            builtInButtons: mergeClone(this.moduleConfig.dialogs.builtInButtons, data.builtInButtons),
            customButtons: data.customButtons ?? [],
            featureTemplate: this.moduleConfig.dialogs.featureTemplate,
            dialogTemplate: mergeClone(this.moduleConfig.dialogs.dialogTemplate, data.dialogTemplate),
        }
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
                    const featureData = feature.data as SmzForm<any>;

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

                    const message = isArray(feature.data) ? (feature.data as string[]).join('<br>') : feature.data;

                    data._context.injectables.push({
                        component: MessageContentComponent,
                        inputs: [{ data: message, input: 'data' }],
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