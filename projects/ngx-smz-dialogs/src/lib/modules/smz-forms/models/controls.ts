import { SmzControlType } from './control-types';
import { SmzFormsAdvancedSettings } from './smz-forms';


export type SmzFormsControl<T> = SmzFormsBaseControl & T &
{
    readonly propertyName: string;
    readonly type: SmzControlType;
    advancedSettings?: SmzFormsAdvancedSettings;
    isVisible: Boolean;
    isDisabled: Boolean;
}

export type SmzFormsInput<T> = SmzFormsBaseControl & T;

interface SmzFormsBaseControl
{
    name: string;
    validators: SmzFormsValidators;

}

export interface SmzFormsValidators
{
    isRequired: Boolean;
    min?: number;
    max?: number;
    minLength?: number;
    maxLength?: number;
}