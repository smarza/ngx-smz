import { SmzForms } from '../../smz-forms/models/smz-forms';
import { ComponentData } from '../../../common/modules/inject-content/models/injectable.model';
import { SmzTemplate } from '../../smz-forms/models/templates';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { SmzDialogButtonsPreset } from '../smz-dialogs.config';

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
    template?: SmzTemplate;
    features: SmzDialogFeatures[];
    buttons?: SmzDialogButton[];

}

export interface SmzDialogFeatures
{
    type: 'form' | 'message' | 'component',
    data: SmzForms<any> | string | ComponentData;
};

export interface SmzDialogContext
{
    injectables: ComponentData[];
    behaviors: SmzDialogBehaviors;
    builtInButtons: SmzDialogButtonsPreset;
    advancedResponse: { [key: string] : boolean };
    simpleResponse: any;
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
    defaultWidth?: string;
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