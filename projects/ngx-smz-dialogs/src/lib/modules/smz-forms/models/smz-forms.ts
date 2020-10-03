import { ComponentData } from '../../../common/modules/inject-content/models/injectable.model';
import { SmzFormsBehaviorsConfig, SmzFormsBehaviorsFunctions as SmzFormCustomFunctions } from './behaviors';
import { SmzControlTypes } from './control-types';
import { SmzTemplate } from '../../../common/models/templates';

export interface SmzForm<T>
{
    formId?: string;
    behaviors?: SmzFormsBehaviorsConfig;
    functions?: SmzFormCustomFunctions<T>;
    groups: SmzFormGroup[];
    entryComponents?: ComponentData[];
    template?: SmzTemplate;

}

export interface SmzFormGroup
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