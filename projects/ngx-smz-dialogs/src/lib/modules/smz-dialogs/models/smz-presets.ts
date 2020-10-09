import { SmzDialogPreset } from './smz-dialogs';

export type SmzPresetTypes = keyof typeof SmzPresets

export const enum SmzPresets
{
    Message = 'Message',
    SimpleCrud = 'SimpleCrud',
    Confirmation = 'Confirmation'
}

export function getPreset(preset: SmzPresetTypes): SmzDialogPreset
{
    return SmzPreset[preset];
}

const SmzPreset: { [key in SmzPresets]: SmzDialogPreset } = {
    'Message': {
        dialog: {
            behaviors: {
                showCancelButton: false,
                showConfirmButton: false,
                showCloseButton: true,
                showOkButton: true,
                useAdvancedResponse: false,
                closeOnEscape: false,
                showHeader: true,
                showFooter: true,
                dismissableMask: false,
                contentPadding: '1em',
                includeComponentResponses: false,
            },
            builtInButtons: {
                confirmDependsOnValidation: false,
                okDependsOnValidation: false
            },
            dialogTemplate: {
                extraSmall: { row: 'col-12' },
                small: { row: 'col-10' },
                medium: { row: 'col-8' },
                large: { row: 'col-8' },
                extraLarge: { row: 'col-6' },
            }
        },
        features: {
            formBehaviors: {},
            featureTemplate: {
                extraSmall: { row: 'col-12' },
                small: { row: 'col-12' },
                medium: { row: 'col-12' },
                large: { row: 'col-12' },
                extraLarge: { row: 'col-12' },
            },
            formGroupTemplate: {},
            formControlTemplate: {}
        },
    },
    'SimpleCrud': {
        dialog: {
            behaviors: {
                showCancelButton: true,
                showConfirmButton: true,
                showCloseButton: true,
                showOkButton: false,
                useAdvancedResponse: false,
                closeOnEscape: false,
                showHeader: true,
                showFooter: true,
                dismissableMask: false,
                contentPadding: '1em',
                includeComponentResponses: false,
            },
            builtInButtons: {
                confirmDependsOnValidation: true,
                okDependsOnValidation: false
            },
            dialogTemplate: {
                extraSmall: { row: 'col-12' },
                small: { row: 'col-10' },
                medium: { row: 'col-8' },
                large: { row: 'col-8' },
                extraLarge: { row: 'col-6' },
            }
        },
        features: {
            formBehaviors: {
                avoidFocusOnLoad: false,
                debounceTime: 400,
                runCustomFunctionsOnLoad: false,
                skipFunctionAfterNextEmit: false,
                flattenResponse: false,
                showErrorsMethod: 'touched',
            },
            featureTemplate: {
                extraSmall: { row: 'col-12' },
                large: { row: 'col-12' },
                extraLarge: { row: 'col-12' },
            },
            formGroupTemplate: {
                extraSmall: { row: 'col-12' },
                large: { row: 'col-12' },
                extraLarge: { row: 'col-12' },
            },
            formControlTemplate: {
                extraSmall: { row: 'col-12' },
                large: { row: 'col-12' },
                extraLarge: { row: 'col-12' },
            }
        },
        globals: {
            globalStyleScale: 1,
            spacer: '0.3em'
        }
    },
    'Confirmation': {
        dialog: {
            behaviors: {
                showCancelButton: true,
                showConfirmButton: true,
                showCloseButton: true,
                showOkButton: false,
                useAdvancedResponse: false,
                closeOnEscape: false,
                showHeader: true,
                showFooter: true,
                dismissableMask: false,
                contentPadding: '1em',
                includeComponentResponses: false,
            },
            builtInButtons: {
                confirmDependsOnValidation: false,
                okDependsOnValidation: false,
                confirmName: 'Sim',
                cancelName: 'Não'
            },
            dialogTemplate: {
                extraSmall: { row: 'col-12' },
                small: { row: 'col-10' },
                medium: { row: 'col-8' },
                large: { row: 'col-8' },
                extraLarge: { row: 'col-6' },
            }
        },
        features: {
            formBehaviors: {},
            featureTemplate: {
                extraSmall: { row: 'col-12' },
                small: { row: 'col-12' },
                medium: { row: 'col-12' },
                large: { row: 'col-12' },
                extraLarge: { row: 'col-12' },
            },
            formGroupTemplate: {},
            formControlTemplate: {}
        },
    },
}