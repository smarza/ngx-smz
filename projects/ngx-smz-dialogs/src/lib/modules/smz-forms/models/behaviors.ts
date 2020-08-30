
import { FormGroup } from '@angular/forms';
import { SmzFormsResponse, SmzForms } from './smz-forms';

export interface SmzFormsBehaviorsConfig
{
    avoidFocusOnLoad?: boolean;
    debounceTime?: number;
    runCustomFunctionsOnLoad?: boolean;
    skipFunctionAfterNextEmit?: boolean;
    flattenResponse?: boolean;
}

export interface SmzFormsBehaviorsFunctions<T>
{
    customValidator?: (data: SmzFormsResponse<T>, form: FormGroup) => boolean
    customBehavior?: (data: SmzFormsResponse<T>, config: SmzForms<T>, form: FormGroup, outputEvents: {}) => void
}

