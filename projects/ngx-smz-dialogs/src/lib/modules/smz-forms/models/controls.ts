import { SmzControlType } from './control-types';
import { AbstractControl } from '@angular/forms';
import { SmzFormsAdvancedSettings } from './advanced';
import { SmzFormsTemplate } from './templates';


export type SmzFormsControl<T> = SmzFormsBaseControl & T &
{
    readonly propertyName: string;
    readonly type: SmzControlType;
    advancedSettings?: SmzFormsAdvancedSettings;
    template?: SmzFormsTemplate;
    isVisible: Boolean;
    isDisabled: Boolean;
}

export type SmzFormsInput<T> = SmzFormsBaseControl & T;

interface SmzFormsBaseControl
{
    name: string;
    validatorsPreset?: SmzFormsValidatorsPreset;
    _inputFormControl?: AbstractControl;

}

export interface SmzFormsValidatorsPreset
{
    isRequired?: Boolean;
    min?: number;
    max?: number;
    minLength?: number;
    maxLength?: number;
}