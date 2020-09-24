import { Injectable } from '@angular/core';
import { Validators, ValidatorFn } from '@angular/forms';
import { ValidationMessage } from '../models/advanced';
import { SmzControlTypes } from '../models/control-types';
import { SmzDialogsConfig } from '../../smz-dialogs/smz-dialogs.config';
import { SmzTemplate } from '../../../common/models/templates';

@Injectable({
    providedIn: 'root'
})
export class SmzFormsManagerService
{

    constructor(public configService: SmzDialogsConfig) { }

    public getValidators(control: SmzControlTypes): Validators
    {
        const validators: ValidatorFn[] = [];
        const config = this.configService.forms?.validators;
        const input = control.validatorsPreset;

        const isRequired = this.checkValidatorPreset(config.isRequired, input?.isRequired);
        if (isRequired != null) validators.push(Validators.required);

        const min = this.checkValidatorPreset(config.min, input?.min);
        if (min != null) validators.push(Validators.min(min));

        const max = this.checkValidatorPreset(config.max, input?.max);
        if (max != null) validators.push(Validators.max(max));

        const minLength = this.checkValidatorPreset(config.minLength, input?.minLength);
        if (minLength != null) validators.push(Validators.minLength(minLength));

        const maxLength = this.checkValidatorPreset(config.maxLength, input?.maxLength);
        if (maxLength != null) validators.push(Validators.maxLength(maxLength));

        const response = [...validators, ...(control.advancedSettings?.validators ?? [])];

        return response.length > 0 ? Validators.compose(response) : [];
    }

    public getValidatorsMessages(control: SmzControlTypes): ValidationMessage[]
    {
        const response: ValidationMessage[] = [];

        response.push(...(this.configService?.forms?.validationMessages ?? []));

        if (control.advancedSettings?.validationMessages != null)
        {
            control.advancedSettings.validationMessages.forEach(v =>
            {
                const matchIndex = response.findIndex(r => r.type === v.type);

                if (matchIndex > -1)
                {
                    response[matchIndex].message = v.message;
                }
                else
                {
                    response.push(v);
                }
            })
        }
        return response;
    }


    private checkValidatorPreset(fromConfig: any, fromInput: any): any
    {
        if (fromInput == false) return null;
        else if (fromInput) return fromInput;
        else if (fromConfig) return fromConfig;
        else return null;
    }

    public setupTemplate(dataTemplate: SmzTemplate, configTemplate: SmzTemplate): SmzTemplate
    {

        // USING USER'S TEMPLATE
        if (dataTemplate != null) return dataTemplate;

        // USING CONFIG'S TEMPLATE
        if (configTemplate != null) return configTemplate;

        // USING BUILT-IN PRESET
        return {
            extraSmall: {
                row: 'col-12',
                horizontalAlignment: 'justify-content-start',
                verticalAlignment: 'align-items-start'
            }
        };

    }

    public setupGlobalStyles(): void
    {

        if (this.configService?.forms?.globalStyleScale != null)
        {
            // USING USER'S TEMPLATE
            document.documentElement.style.setProperty('--smz-form-global-scale', `${this.configService?.forms?.globalStyleScale}rem`);
        }
        else
        {
            // USING BUILT-IN PRESET
            document.documentElement.style.setProperty('--smz-form-global-scale', `1rem`);
        }

    }

}
