import { SmzDialogsConfig, SmzControlType, SmzFormsPresets } from 'ngx-smz-dialogs';

const compactPreset: SmzFormsPresets = {
    formTemplates: {
        extraSmall: { horizontalAlignment: 'justify-content-between', verticalAlignment: 'align-items-start' },
        small: { horizontalAlignment: 'justify-content-between', verticalAlignment: 'align-items-start' },
    },
    groupTemplates: {
        extraSmall: { row: 'col-12' },
        medium: { row: 'col-6' },
    },
    inputTemplates: {
        extraSmall: { row: 'col-12', },
        medium: { row: 'col-6', }
    },
    globalStyleScale: 0.9,
    spacer: '0.2em'
};

const linearPreset: SmzFormsPresets = {
    formTemplates: { extraSmall: { horizontalAlignment: 'justify-content-start', verticalAlignment: 'align-items-start' } },
    groupTemplates: { extraSmall: { row: 'col-12' } },
    inputTemplates: { extraSmall: { row: 'col-12', } },
    globalStyleScale: 1,
    spacer: '0.4em'
};

export const smzDialogsConfig: SmzDialogsConfig = {
    dialogs: {
        behaviors: {
            showCancelButton: true,
            showConfirmButton: true,
            showCloseButton: true,
            useAdvancedResponse: false,
            closeOnEscape: false,
            showHeader: true,
            showFooter: true,
            dismissableMask: false,
            contentPadding: '1em',
        },
        builtInButtons: {
            confirmName: 'CONFIRMAR',
            cancelName: 'CANCELAR',
        },
        featureTemplate: {
            extraSmall: { row: 'col-12' }
        },
        dialogTemplate: {
            extraSmall: { row: 'col-12' },
            large: { row: 'col-6' },
        }
    },
    forms: {
        behaviors: {
            avoidFocusOnLoad: true,
            debounceTime: 400,
            flattenResponse: true,
            runCustomFunctionsOnLoad: false,
            skipFunctionAfterNextEmit: false,
            showErrorsMethod: 'touched'
        },
        validators: {
            isRequired: true,
        },
        validationMessages: [
            { type: 'required', message: 'Campo obrigatório.' },
            { type: 'minlength', message: 'Número mínimo de caracteres não atingido.' },
            { type: 'maxlength', message: 'Número máximo de caracteres ultrapassado.' },
            { type: 'min', message: 'Valor mínimo atingido' },
            { type: 'max', message: 'Valor máximo atingido' },
        ],
        controlTypes: {
            [SmzControlType.MULTI_SELECT]: {
                defaultLabel: 'Escolha uma ou mais opções'
            }
        },
        ...compactPreset
    }
};
