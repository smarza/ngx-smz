import { AbstractControl, FormGroup } from '@angular/forms';
import { SmzControlType, SmzControlTypes, SmzCalendarControl, SmzCurrencyControl, SmzPasswordControl, SmzSwitchControl, SmzTextControl, SmzCheckBoxControl, SmzCheckBoxGroupControl, SmzColorPickerControl, SmzDropDownControl, SmzFileControl, SmzLinkedDropDownControl, SmzMultiSelectControl, SmzNumberControl, SmzRadioControl, SmzTextAreaControl, SmzMaskControl } from './control-types';
import { SmzDialogsConfig } from '../../smz-dialogs/smz-dialogs.config';
import { isArray } from '../../../common/utils/utils';

export interface SmzControlTypeFunctionsDefinitions
{
    initialize: (input: SmzControlTypes, config: SmzDialogsConfig) => void;
    clear: (control: AbstractControl) => void;
    updateValue: (control: AbstractControl, input: SmzControlTypes) => void;
    getValue: (form: FormGroup, input: SmzControlTypes, flattenResponse: boolean) => any;

}

export const CONTROL_FUNCTIONS: { [key: string]: SmzControlTypeFunctionsDefinitions } =
{
    [SmzControlType.CALENDAR]: {
        initialize: (input: SmzCalendarControl, config: SmzDialogsConfig) => { },
        clear: (control: AbstractControl) => { control.patchValue(''); },
        updateValue: (control: AbstractControl, input: SmzCalendarControl) => { control.patchValue(input.defaultValue); },
        getValue: (form: FormGroup, input: SmzCalendarControl, flattenResponse: boolean) =>
        {
            const value = form.get(input.propertyName).value;
            // console.log('getValue CALENDAR', value);
            return mapResponseValue(input, value, false);
        },
    },
    [SmzControlType.CHECKBOX]: {
        initialize: (input: SmzCheckBoxControl, config: SmzDialogsConfig) => { },
        clear: (control: AbstractControl) => { control.patchValue(''); },
        updateValue: (control: AbstractControl, input: SmzCheckBoxControl) => { control.patchValue(input.defaultValue); },
        getValue: (form: FormGroup, input: SmzCheckBoxControl, flattenResponse: boolean) =>
        {
            const value = form.get(input.propertyName).value;
            // console.log('getValue CHECKBOX', value);
            return mapResponseValue(input, value, false);
        },
    },
    [SmzControlType.CHECKBOX_GROUP]: {
        initialize: (input: SmzCheckBoxGroupControl<any>, config: SmzDialogsConfig) => { },
        clear: (control: AbstractControl) => { control.patchValue(''); },
        updateValue: (control: AbstractControl, input: SmzCheckBoxGroupControl<any>) => { control.patchValue(input.defaultValue); },
        getValue: (form: FormGroup, input: SmzCheckBoxGroupControl<any>, flattenResponse: boolean) =>
        {
            const values = form.get(input.propertyName).value ?? [];
            const options = input.options.filter(x => values.includes(x.id));
            // console.log('getValue CHECKBOX_GROUP', values, options);
            return mapResponseValue(input, options, flattenResponse);
        },
    },
    [SmzControlType.COLOR_PICKER]: {
        initialize: (input: SmzColorPickerControl, config: SmzDialogsConfig) => { },
        clear: (control: AbstractControl) => { control.patchValue(''); },
        updateValue: (control: AbstractControl, input: SmzColorPickerControl) => { control.patchValue(input.defaultValue); },
        getValue: (form: FormGroup, input: SmzColorPickerControl, flattenResponse: boolean) =>
        {
            const value = form.get(input.propertyName).value;
            // console.log('getValue COLOR_PICKER', value);
            const response = value == null ? '' : (value.includes('#') ? value : `#${value}`);
            return mapResponseValue(input, value, false);
        },
    },
    [SmzControlType.CURRENCY]: {
        initialize: (input: SmzCurrencyControl, config: SmzDialogsConfig) => { },
        clear: (control: AbstractControl) => { control.patchValue(''); },
        updateValue: (control: AbstractControl, input: SmzCurrencyControl) => { control.patchValue(input.defaultValue); },
        getValue: (form: FormGroup, input: SmzCurrencyControl, flattenResponse: boolean) =>
        {
            const value = form.get(input.propertyName).value;
            // console.log('getValue CURRENCY', value);
            return mapResponseValue(input, value, false);
        },
    },
    [SmzControlType.DROPDOWN]: {
        initialize: (input: SmzDropDownControl<any>, config: SmzDialogsConfig) => { },
        clear: (control: AbstractControl) => { control.patchValue(''); },
        updateValue: (control: AbstractControl, input: SmzDropDownControl<any>) =>
        {
            const value = input.options.find(x => x.id === input.defaultValue);
            control.patchValue(value ?? '');
        },
        getValue: (form: FormGroup, input: SmzDropDownControl<any>, flattenResponse: boolean) =>
        {
            const value = form.get(input.propertyName).value;
            // console.log('getValue DROPDOWN', value);
            return mapResponseValue(input, value, flattenResponse);
        },
    },
    [SmzControlType.FILE]: {
        initialize: (input: SmzFileControl, config: SmzDialogsConfig) => { },
        clear: (control: AbstractControl) => { control.patchValue(''); },
        updateValue: (control: AbstractControl, input: SmzFileControl) =>
        {
            control.patchValue(input.defaultValue);
        },
        getValue: (form: FormGroup, input: SmzFileControl, flattenResponse: boolean) =>
        {
            const value = input._file; // form.get(input.propertyName).value;
            // console.log('getValue FILE form value', form.get(input.propertyName).value);
            // console.log('getValue _file', input._file);
            return mapResponseValue(input, value, false);
        },
    },
    [SmzControlType.LINKED_DROPDOWN]: {
        initialize: (input: SmzLinkedDropDownControl<any>, config: SmzDialogsConfig) => { },
        clear: (control: AbstractControl) => { control.patchValue(''); },
        updateValue: (control: AbstractControl, input: SmzLinkedDropDownControl<any>) =>
        {
            if (input.defaultValue != null && input.defaultValue != '')
            {

                const parent = input.options.find(x => x.data.find(d => d.id === input.defaultValue));
                const option = parent.data.find(d => d.id === input.defaultValue);
                control.patchValue(option ?? '');
            }
            else
            {
                control.patchValue(input.defaultValue);
            }
        },
        getValue: (form: FormGroup, input: SmzLinkedDropDownControl<any>, flattenResponse: boolean) =>
        {
            const value = form.get(input.propertyName).value;
            // console.log('getValue DROPLINKED_DROPDOWNDOWN', value);
            return mapResponseValue(input, value, flattenResponse);
        },
    },
    [SmzControlType.MULTI_SELECT]: {
        initialize: (input: SmzMultiSelectControl<any>, config: SmzDialogsConfig) =>
        {
            // console.log('config', config);
            const preset = config.forms.controlTypes[SmzControlType.MULTI_SELECT] as SmzMultiSelectControl<any>;

            input.defaultLabel = input.defaultLabel ?? preset?.defaultLabel;
        },
        clear: (control: AbstractControl) => { control.patchValue(''); },
        updateValue: (control: AbstractControl, input: SmzMultiSelectControl<any>) =>
        {
            const value = input.defaultValue?.filter(x => input.options.findIndex(o => o.id === x) > -1);
            control.patchValue(value ?? '');
        },
        getValue: (form: FormGroup, input: SmzMultiSelectControl<any>, flattenResponse: boolean) =>
        {
            const value = form.get(input.propertyName).value;
            // console.log('getValue MULTI_SELECT', value);
            return mapResponseValue(input, value ?? [], flattenResponse);
        },
    },
    [SmzControlType.NUMBER]: {
        initialize: (input: SmzNumberControl, config: SmzDialogsConfig) => { },
        clear: (control: AbstractControl) => { control.patchValue(''); },
        updateValue: (control: AbstractControl, input: SmzNumberControl) => { control.patchValue(input.defaultValue); },
        getValue: (form: FormGroup, input: SmzNumberControl, flattenResponse: boolean) =>
        {
            const value = Number(form.get(input.propertyName).value);
            // console.log('getValue NUMBER', value);
            return mapResponseValue(input, value, false);
        },
    },
    [SmzControlType.PASSWORD]: {
        initialize: (input: SmzPasswordControl, config: SmzDialogsConfig) => { },
        clear: (control: AbstractControl) => { control.patchValue(''); },
        updateValue: (control: AbstractControl, input: SmzPasswordControl) => { control.patchValue(input.defaultValue); },
        getValue: (form: FormGroup, input: SmzPasswordControl, flattenResponse: boolean) =>
        {
            const value = form.get(input.propertyName).value;
            // console.log('getValue PASSWORD', value);
            return mapResponseValue(input, value, false);
        },
    },
    [SmzControlType.RADIO]: {
        initialize: (input: SmzRadioControl<any>, config: SmzDialogsConfig) => { },
        clear: (control: AbstractControl) => { control.patchValue(''); },
        updateValue: (control: AbstractControl, input: SmzRadioControl<any>) => { control.patchValue(input.defaultValue); },
        getValue: (form: FormGroup, input: SmzRadioControl<any>, flattenResponse: boolean) =>
        {
            const value = form.get(input.propertyName).value;
            // console.log('getValue RADIO', value);
            const response = input.options.find(d => d.id === value);
            return mapResponseValue(input, response, flattenResponse);
        },
    },
    [SmzControlType.SWITCH]: {
        initialize: (input: SmzSwitchControl, config: SmzDialogsConfig) => { },
        clear: (control: AbstractControl) => { control.patchValue(''); },
        updateValue: (control: AbstractControl, input: SmzSwitchControl) => { control.patchValue(input.defaultValue); },
        getValue: (form: FormGroup, input: SmzSwitchControl, flattenResponse: boolean) =>
        {
            const value = form.get(input.propertyName).value;
            // console.log('getValue SWITCH', value);
            return mapResponseValue(input, value, false);
        },
    },
    [SmzControlType.TEXT]: {
        initialize: (input: SmzTextControl, config: SmzDialogsConfig) => { },
        clear: (control: AbstractControl) => { control.patchValue(''); },
        updateValue: (control: AbstractControl, input: SmzTextControl) => { control.patchValue(input.defaultValue); },
        getValue: (form: FormGroup, input: SmzTextControl, flattenResponse: boolean) =>
        {
            const value = form.get(input.propertyName).value;
            // console.log('getValue TEXT', value);
            return mapResponseValue(input, value, false);
        },
    },
    [SmzControlType.TEXT_AREA]: {
        initialize: (input: SmzTextAreaControl, config: SmzDialogsConfig) => { },
        clear: (control: AbstractControl) => { control.patchValue(''); },
        updateValue: (control: AbstractControl, input: SmzTextAreaControl) => { control.patchValue(input.defaultValue); },
        getValue: (form: FormGroup, input: SmzTextAreaControl, flattenResponse: boolean) =>
        {
            const value = form.get(input.propertyName).value;
            // console.log('getValue TEXT_AREA', value);
            return mapResponseValue(input, value, false);
        },
    },
    [SmzControlType.TEXT_MASK]: {
        initialize: (input: SmzMaskControl, config: SmzDialogsConfig) => { },
        clear: (control: AbstractControl) => { control.patchValue(''); },
        updateValue: (control: AbstractControl, input: SmzMaskControl) => { control.patchValue(input.defaultValue); },
        getValue: (form: FormGroup, input: SmzMaskControl, flattenResponse: boolean) =>
        {
            const value = form.get(input.propertyName).value;
            // console.log('getValue TEXT_MASK', value);
            return mapResponseValue(input, value, false);
        },
    },
}

function mapResponseValue(input: SmzControlTypes, value: any, flattenResponse: boolean): { [key: string]: any }
{
    if (flattenResponse)
    {

        if (isArray(value))
        {
            return { [flatPropertyName(input.propertyName, true)]: value.map(x => x.id) };
        }
        else
        {
            return { [flatPropertyName(input.propertyName, false)]: value?.id };
        }
    }
    else
    {
        if (isArray(value))
        {
            return { [input.propertyName]: value };
        }
        else
        {
            return { [input.propertyName]: value };
        }
    }

}

function flatPropertyName(propertyName: string, isArray: boolean): string
{
    return `${propertyName}${isArray ? 'Ids' : 'Id'}`;
}
