import { AbstractControl, Validators, AsyncValidator, FormGroup } from '@angular/forms';
import { ComponentData } from '../../../common/modules/inject-content/models/injectable.model';
import { SmzFormsBehaviorsConfig, SmzFormsBehaviorsFunctions } from './behaviors';
import { SmzFormsTemplate } from './templates';
import { SmzControlTypes } from './control-types';

export interface SmzForms<T>
{
    formId?: string;
    behaviors?: SmzFormsBehaviorsConfig;
    functions?: SmzFormsBehaviorsFunctions<T>;
    groups: SmzFormsGroup[];
    entryComponents?: ComponentData[];
    template?: SmzFormsTemplate;

}

export interface SmzFormsGroup
{
    readonly name: string;
    showName: Boolean;
    template?: SmzFormsTemplate;
    children: SmzControlTypes[];
}

export interface SmzFormsResponse<T>
{
    data: T;
    isValid: Boolean;
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
