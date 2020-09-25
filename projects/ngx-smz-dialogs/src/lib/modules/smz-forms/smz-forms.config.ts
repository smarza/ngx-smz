import { SmzFormsBehaviorsConfig } from './models/behaviors';
import { ValidationMessage } from './models/advanced';
import { SmzFormsValidatorsPreset } from './models/controls';
import { SmzControlTypes } from './models/control-types';
import { SmzTemplate } from '../../common/models/templates';


export class SmzFormsConfig
{
    public behaviors?: SmzFormsBehaviorsConfig;
    public validators?: SmzFormsValidatorsPreset;
    public validationMessages?: ValidationMessage[];
    public multipleErrorMessagesLabel?: string;
    public controlTypes?: { [key: number]: SmzControlTypes };

}
export class SmzFormsPresets
{
    public groupTemplates?: SmzTemplate;
    public formTemplates?: SmzTemplate;
    public inputTemplates?: SmzTemplate;
    public globalStyleScale?: number;

}
