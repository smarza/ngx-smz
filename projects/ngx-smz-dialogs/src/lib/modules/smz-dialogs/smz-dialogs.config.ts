import { SmzFormsConfig, SmzFormsPresets } from '../smz-forms/smz-forms.config';
import { SmzDialog, SmzDialogBehaviors } from './models/smz-dialogs';

export class SmzDialogsConfig
{
    public dialogs: SmzDialogsPresets;
    public forms?: SmzFormsConfig & SmzFormsPresets;
}

export class SmzDialogsPresets
{
    public behaviors?: SmzDialogBehaviors;
    public builtInButtons?: SmzDialogButtonsPreset;

}

export interface SmzDialogButtonsPreset
{
    confirmName?: string;
    confirmClass?: string;
    confirmDependsOnValidation?: boolean;
    cancelName?: string;
    cancelClass?: string;

}