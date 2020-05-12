import { AbstractControl, Validators, AsyncValidator } from '@angular/forms';
import { InjectableContentEntity } from '../../../common/modules/inject-content/models/inject-content.model';
import { ComponentData } from '../../../common/modules/inject-content/models/injectable.model';
import { ValidationMessage } from './forms.model';

export interface FormGroupConfig
{
    inputs: FormGroupInputData[];
    components: ComponentData[];
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
    'colorpicker' |
    'currency' |
    'dropdown' |
    'file' |
    'hidden' |
    'multiselect' |
    'number' |
    'radio' |
    'text-area' |
    'text' |
    'password';
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
