import { SmzFormsBehaviorsConfig } from './models/behaviors';
import { ValidationMessage } from './models/advanced';
import { SmzFormsValidatorsPreset } from './models/controls';
import { SmzControlTypes } from './models/control-types';


export class SmzFormsConfig
{
    public behaviors?: SmzFormsBehaviorsConfig;
    public validators?: SmzFormsValidatorsPreset;
    public validationMessages?: ValidationMessage[];
    public controlTypes?: { [key: number]: SmzControlTypes };

}
