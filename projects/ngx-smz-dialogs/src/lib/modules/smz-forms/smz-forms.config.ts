import { SmzFormsBehaviorsConfig } from './models/behaviors';
import { ValidationMessage } from './models/advanced';
import { SmzFormsValidatorsPreset } from './models/controls';
import { SmzControlTypes } from './models/control-types';
import { SmzFormsTemplate } from './models/templates';


export class SmzFormsConfig
{
    public behaviors?: SmzFormsBehaviorsConfig;
    public validators?: SmzFormsValidatorsPreset;
    public validationMessages?: ValidationMessage[];
    public controlTypes?: { [key: number]: SmzControlTypes };

}
export class SmzFormsPresets
{
    public groupTemplates?: SmzFormsTemplate;
    public formTemplates?: SmzFormsTemplate;
    public inputTemplates?: SmzFormsTemplate;

}
