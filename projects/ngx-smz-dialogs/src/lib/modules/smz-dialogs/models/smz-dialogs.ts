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
    _context?: SmzDialogContext<T>;
    title?: string;
    functions?: SmzDialogFunctions<T>;
    behaviors?: SmzDialogBehaviors;
    builtInButtons?: SmzDialogButtonsPreset;
    features: SmzDialogFeatures[];
    customButtons?: SmzDialogCustomButton<T>[];
    dialogTemplate?: SmzTemplate;

}

export interface SmzDialogFeatures
{
    type: 'form' | 'message' | 'component',
    data: SmzForms<any> | string | ComponentData;
    template?: SmzTemplate;
};

export interface SmzDialogContext<T>
{
    injectables: SmzInjectable[];
    behaviors: SmzDialogBehaviors;
    builtInButtons: SmzDialogButtonsPreset;
    customButtons: SmzDialogCustomButton<T>[];
    advancedResponse: { [key: string] : boolean }; // cada formulário armazena suas respostas separadamente pelo form id. Atenção: os components injetáveis sempre armazenam em objetos com o nome do component (case sensitive)
    simpleResponse: any; // todos os formulários armazenam as respostas na raiz. Atenção: os components injetáveis sempre armazenam em objetos com o nome do component (case sensitive)
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
    onOk?: (data: T) => void;
    onCancel?: () => void;
    onClose?: () => void;


}


export interface SmzDialogBehaviors
{
    showCancelButton?: boolean;
    showConfirmButton?: boolean;
    showCloseButton?: boolean;
    showOkButton?: boolean;
    useAdvancedResponse?: boolean;
    closeOnEscape?: boolean;
    showHeader?: boolean;
    showFooter?: boolean;
    dismissableMask?: boolean;
    contentPadding?: string;
    baseZIndex?: number;
    includeComponentResponses?: boolean; // Adicionar Objeto com Outputs dos Components na resposta do diálogo ?

}

export interface SmzDialogCustomButton<T>
{
    name: string;
    class?: string;
    dependsOnValidation: boolean;
    closeDialog: boolean;
    onClick: (data: T) => void;

}