import { ComponentData } from '../../../common/modules/inject-content/models/injectable.model';
import { SmzFormsBehaviorsConfig, SmzFormsBehaviorsFunctions } from './behaviors';
import { SmzControlTypes } from './control-types';
import { SmzTemplate } from '../../../common/models/templates';

export interface SmzForms<T>
{
    formId?: string;
    behaviors?: SmzFormsBehaviorsConfig;
    functions?: SmzFormsBehaviorsFunctions<T>;
    groups: SmzFormsGroup[];
    entryComponents?: ComponentData[];
    template?: SmzTemplate;

}

export interface SmzFormsGroup
{
    readonly name: string;
    showName: Boolean;
    template?: SmzTemplate;
    children: SmzControlTypes[];
}

export interface SmzFormsResponse<T>
{
    data: T;
    isValid: Boolean;
}