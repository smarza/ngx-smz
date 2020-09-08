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
    public buttons?: SmzDialogButtonsPreset;

}

export interface SmzDialogButtonsPreset
{
    confirmName?: string;
    confirmClass?: string;
    cancelName?: string;
    cancelClass?: string;

}