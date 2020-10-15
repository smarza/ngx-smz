import { SmzForm } from '../../smz-forms/models/smz-forms';
import { ComponentData } from '../../../common/modules/inject-content/models/injectable.model';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { SmzDialogButtonsPreset } from '../smz-dialogs.config';
import { SmzTemplate } from '../../../common/models/templates';
import { SmzFormsBehaviorsConfig } from '../../smz-forms/models/behaviors';
import { SmzPresets, SmzPresetTypes } from './smz-presets';

export class SmzDynamicDialogConfig extends DynamicDialogConfig {
    data?: SmzDialog<any>;
}

export interface SmzDialog<T>
{
    /**
    * Uso privado da lib. Não mexer.
    */
    _context?: SmzDialogContext<T>;
    /**
    * Título do Dialogo
    */
    title?: string;
    /**
    * Callbacks
    */
    callbacks?: SmzDialogCallbacks<T>;
    /**
    * Comportamento referente as funcionalidades do dialogo
    */
    behaviors?: SmzDialogBehaviors;
    /**
    * Botões padrões
    */
    builtInButtons?: SmzDialogButtonsPreset;
    /**
    * As Features são blocos que compoem o conteúdo do dialogo.
    */
    features: SmzDialogFeature[];
    /**
    * Criar botões customizados extras.
    */
    customButtons?: SmzDialogCustomButton<T>[];
    /**
    * Responsividade e largura do Dialogo na tela.
    */
    dialogTemplate?: SmzTemplate;
    /**
    * Código do Preset que será utilizado para configurar o dialogo.
    */
    presetId?: SmzPresetTypes;
    /**
    * Id que será registrado no elemento html do dialogo.
    * Pode usar esse Id para criar styles de scss específicos
    */
    domElementId?: string;

}

export interface SmzDialogPreset
{
    dialog: {
        behaviors: SmzDialogBehaviors;
        builtInButtons: Partial<SmzDialogButtonsPreset>;
        dialogTemplate: SmzTemplate;
    };
    features: {
        formBehaviors: SmzFormsBehaviorsConfig;
        featureTemplate: SmzTemplate;
        formGroupTemplate: SmzTemplate;
        formControlTemplate: SmzTemplate;
    },
    globals?: {
        globalStyleScale: number;
        spacer: string;
    }
}

export type FeatureType = 'form' | 'message' | 'component';

export interface SmzDialogFeature
{
    type: FeatureType,
    data: SmzForm<any> | string | string[] | ComponentData;
    template?: SmzTemplate;
};

export interface SmzDialogContext<T>
{
    injectables: SmzInjectable[];
    behaviors: SmzDialogBehaviors;
    builtInButtons: SmzDialogButtonsPreset;
    customButtons: SmzDialogCustomButton<T>[];
    advancedResponse: { [key: string] : any }; // cada formulário armazena suas respostas separadamente pelo form id. Atenção: os components injetáveis sempre armazenam em objetos com o nome do component (case sensitive)
    simpleResponse: any; // todos os formulários armazenam as respostas na raiz. Atenção: os components injetáveis sempre armazenam em objetos com o nome do component (case sensitive)
    featureTemplate: SmzTemplate;
    dialogTemplate: SmzTemplate;
}

export interface SmzInjectable extends ComponentData
{
    template: SmzTemplate;
    type: FeatureType;
}

export interface SmzDialogCallbacks<T>
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
    /**
     * Cada Feature armazena suas respostas separadamente pelo form id.
     * Atenção: os components injetáveis sempre armazenam em objetos com o nome do component (case sensitive).
     */
    useAdvancedResponse?: boolean;
    closeOnEscape?: boolean;
    showHeader?: boolean;
    showFooter?: boolean;
    dismissableMask?: boolean;
    /**
     * Espaçamento do conteúdo do Dialogo.
     * Padrão 1em.
     * Entre com 0px caso precise que o conteúdo ocupe toda a região.
     */
    contentPadding?: string;
    baseZIndex?: number;
    /**
     * Se ligado, as Features do type component irão incluir seus outputs na resposta do dialogo.
     */
    includeComponentResponses?: boolean;

}

export interface SmzDialogCustomButton<T>
{
    name: string;
    class?: string;
    dependsOnValidation: boolean;
    closeDialog: boolean;
    onClick: (data: T) => void;

}