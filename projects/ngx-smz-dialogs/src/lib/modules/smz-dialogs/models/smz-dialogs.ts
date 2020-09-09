import { SmzForms } from '../../smz-forms/models/smz-forms';
import { ComponentData } from '../../../common/modules/inject-content/models/injectable.model';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { SmzDialogButtonsPreset } from '../smz-dialogs.config';
import { SmzTemplate } from '../../../common/models/templates';

export class SmzDynamicDialogConfig extends DynamicDialogConfig {
    data?: SmzDialog<any>;
}

export interface SmzDialog<T>
{
    _context?: SmzDialogContext;
    title?: string;
    functions?: SmzDialogFunctions<T>;
    behaviors?: SmzDialogBehaviors;
    builtInButtons?: SmzDialogButtonsPreset;
    features: SmzDialogFeatures[];
    buttons?: SmzDialogButton[];
    dialogTemplate?: SmzTemplate;

}

export interface SmzDialogFeatures
{
    type: 'form' | 'message' | 'component',
    data: SmzForms<any> | string | ComponentData;
    template?: SmzTemplate;
};

export interface SmzDialogContext
{
    injectables: SmzInjectable[];
    behaviors: SmzDialogBehaviors;
    builtInButtons: SmzDialogButtonsPreset;
    advancedResponse: { [key: string] : boolean };
    simpleResponse: any;
    featureTemplate: SmzTemplate;
    dialogTemplate: SmzTemplate;
}

export interface SmzInjectable extends ComponentData
{
    template: SmzTemplate;
}

export interface SmzDialogFunctions<T>
{
    onConfirm?: (data: T) => void;
    onCancel?: () => void;
    onClose?: () => void;

}


export interface SmzDialogBehaviors
{
    showCancelButton?: boolean;
    showConfirmButton?: boolean;
    showCloseButton?: boolean;
    useAdvancedResponse?: boolean;
    closeOnEscape?: boolean;
    showHeader?: boolean;
    showFooter?: boolean;
    dismissableMask?: boolean;
    noPadding?: boolean;
    baseZIndex?: number;

}

export interface SmzDialogButton extends SmzButton
{
    closeDialogAfterClicked: boolean;
    confirmOnEnter?: boolean;
    validationRequired: boolean;
    disabled?: boolean;
    visible: boolean;
    isOverlayAction?: boolean;
    overlayData?: SmzOverLayData;
}


export interface SmzButton
{
    icon: string;
    iconPos: string;
    label: string;
    onClick: (data: any) => void;
    style: 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger';
    styleClass: string;

}

export interface SmzOverLayData extends ComponentData
{
    id: string;
}