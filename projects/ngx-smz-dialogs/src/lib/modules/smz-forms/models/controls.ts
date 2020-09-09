import { SmzControlType } from './control-types';
import { AbstractControl } from '@angular/forms';
import { SmzFormsAdvancedSettings } from './advanced';
import { SmzTemplate } from '../../../common/models/templates';

export interface SmzFormsBaseControl
{
    readonly propertyName?: string;
    readonly type?: SmzControlType;
    advancedSettings?: SmzFormsAdvancedSettings;
    template?: SmzTemplate;
    isVisible?: Boolean;
    isDisabled?: Boolean;
    name?: string;
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