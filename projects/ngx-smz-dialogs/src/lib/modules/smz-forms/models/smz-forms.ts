import { AbstractControl, Validators, AsyncValidator, FormGroup } from '@angular/forms';
import { ComponentData } from '../../../common/modules/inject-content/models/injectable.model';
import { SmzFormsBehaviorsConfig, SmzFormsBehaviorsFunctions } from './behaviors';
import { SmzFormsTemplate } from './templates';
import { SmzControlTypes } from './control-types';
import { SmzFormsControl } from './controls';
import { ValidationMessage } from './advanced';

export interface SmzForms<T>
{
    behaviors: SmzFormsBehaviorsConfig;
    functions: SmzFormsBehaviorsFunctions<T>;
    groups: SmzFormsGroup[];
    entryComponents: ComponentData[];

}

export interface SmzFormsGroup
{
    readonly name: string;
    showName: Boolean;
    template: SmzFormsTemplate;
    children: SmzFormsControl<SmzControlTypes>[];
}

export interface SmzFormsResponse<T>
{
    data: T;
    isValid: Boolean;
}

export interface SmzFormsAdvancedSettings
{
    validators?: Validators;
    validationMessages?: Array<ValidationMessage>;
    asyncValidators?: AsyncValidator[];
    inputFormControl?: AbstractControl;
    propagationCallback?: (value: any) => void;
    isPropagating?: boolean;
}


// export interface FormGroupButtonResponse
// {
//     title: string;
//     overlayComponent: any;
//     inputs: InjectableContentEntity[];
//     callback?: (self: FormGroupButtonResponse, event: any) => void;
//     isDisabled: boolean;
//     placeholder: string;
// }
