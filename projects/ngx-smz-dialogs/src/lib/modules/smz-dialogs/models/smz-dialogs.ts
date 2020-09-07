import { SmzForms } from '../../smz-forms/models/smz-forms';
import { ComponentData } from '../../../common/modules/inject-content/models/injectable.model';
import { SmzTemplate } from '../../smz-forms/models/templates';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';

export class SmzDynamicDialogConfig extends DynamicDialogConfig {
    data?: SmzDialog;
}

export interface SmzDialog
{
    _context?: SmzDialogContext;
    title?: string;
    functions?: SmzDialogFunctions;
    behaviors?: SmzDialogBehaviors;
    template?: SmzTemplate;
    features: SmzDialogFeatures[];
    buttons?: SmzDialogButton[];

}

export type SmzDialogFeatures = SmzForms<any> | string | ComponentData;

export interface SmzDialogContext
{
    injectables?: ComponentData[];
}

export interface SmzDialogFunctions
{
    onConfirm?: (data: any) => void;
    onCancel?: () => void;
    onClose?: () => void;

}

export interface SmzDialogBehaviors
{
    showCancelButton?: boolean;
    showConfirmButton?: boolean;
    showMaximizeButton?: boolean;
    showCloseButton?: boolean;
    showLoader?: boolean;

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