import { Validators, AsyncValidator, ValidatorFn } from '@angular/forms';

export interface ValidationMessage
{
    type: string;
    message: string;
}


export interface SmzFormsAdvancedSettings
{
    validators?: ValidatorFn[];
    validationMessages?: Array<ValidationMessage>;
    asyncValidators?: AsyncValidator[];
    propagationCallback?: (value: any) => void;
    isPropagating?: boolean;
}