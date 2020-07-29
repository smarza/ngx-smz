import { AbstractControl, Validators, AsyncValidator, FormGroup } from '@angular/forms';
import { InjectableContentEntity } from '../../../common/modules/inject-content/models/inject-content.model';
import { ComponentData } from '../../../common/modules/inject-content/models/injectable.model';
import { ValidationMessage } from './forms.model';
import { EventEmitter } from 'protractor';

export interface FormGroupConfig
{
    avoidFocusOnLoad?: boolean;
    inputs: FormGroupInputData[];
    // outputs?: EventEmitter[];
    components: ComponentData[];
    debounceTime?: number;
    customValidator?: (data: FormGroupDialogResponse, form: FormGroup) => boolean
    customBehavior?: (data: FormGroupDialogResponse, config: FormGroupConfig, form: FormGroup, outputEvents: {}) => void
}


export interface FormGroupButtonResponse
{
    title: string;
    overlayComponent: any;
    inputs: InjectableContentEntity[];
    callback?: (self: FormGroupButtonResponse, event: any) => void;
    isDisabled: boolean;
    placeholder: string;
}

export interface FormGroupDialogResponse
{
    data: {};
    isValid: boolean;
}

export interface FormGroupInputData
{
    type:
    'calendar' |
    'checkbox-group' |
    'checkbox' |
    'colorpicker' |
    'currency' |
    'dropdown' |
    'file' |
    'hidden' |
    'mask' |
    'multiselect' |
    'number' |
    'password'|
    'radio' |
    'switch' |
    'text-area' |
    'text';
    name: string; /* This is going to be the property name of the response */
    placeholder?: null | string;
    data?: string | SelectEntity[];
    defaultValue?: any;
    validators?: Validators;
    validationMessages?: Array<ValidationMessage>;
    asyncValidators?: AsyncValidator[];
    isPropagating?: boolean;
    propagationCallback?: (value: any) => void;
    inputFormControl?: AbstractControl;
    section?: string;
    forceHalfWidth?: boolean;
    isDisabled?: boolean;
    mask?: string; // only input-mask
    characterPattern?: string; // only input-mask
    unmask?: boolean; // only input-mask
}

export interface FormGroupInputResponse
{
    name: string;
    newValue: string | number | File | SelectEntity;

}

export interface SelectEntity
{
    id: any;
    name: string;
}


export interface FormGroupChangeControl
{
    config: FormGroupConfig,
    changed: boolean
}