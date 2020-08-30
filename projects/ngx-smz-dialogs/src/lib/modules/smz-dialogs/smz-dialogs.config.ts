import { SmzFormsConfig, SmzFormsPresets } from '../smz-forms/smz-forms.config';

export class SmzDialogsConfig
{
    public requiredByDefault?: boolean;
    public requiredMessage?: string;
    public blockScroll?: boolean;
    public baseZIndex?: number;
    public forms?: SmzFormsConfig & SmzFormsPresets;
}
