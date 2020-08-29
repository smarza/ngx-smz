
import { FormGroup } from '@angular/forms';
import { SmzFormsConfig } from '../smz-forms.config';
import { SmzFormsResponse } from './smz-forms';

export interface SmzFormsBehaviorsConfig
{
    avoidFocusOnLoad?: boolean;
    debounceTime?: number;
    runCustomFunctionsOnLoad?: boolean;
    skipFunctionAfterNextEmit?: boolean;
}

export interface SmzFormsBehaviorsFunctions<T>
{
    customValidator?: (data: SmzFormsResponse<T>, form: FormGroup) => boolean
    customBehavior?: (data: SmzFormsResponse<T>, config: SmzFormsConfig, form: FormGroup, outputEvents: {}) => void
}

