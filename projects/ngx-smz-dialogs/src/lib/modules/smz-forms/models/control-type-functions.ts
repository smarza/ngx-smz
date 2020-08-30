import { AbstractControl, FormGroup } from '@angular/forms';
import { SmzControlType, SmzControlTypes, SmzCalendarControl, SmzCurrencyControl, SmzPasswordControl, SmzSwitchControl, SmzTextControl, SmzCheckBoxControl, SmzCheckBoxGroupControl, SmzColorPickerControl, SmzDropDownControl, SmzFileControl, SmzLinkedDropDownControl, SmzMultiSelectControl, SmzNumberControl, SmzRadioControl, SmzTextAreaControl, SmzMaskControl } from './control-types';
import { SmzFormsControl } from './controls';
import { SmzFormsConfig } from '../smz-forms.config';
import { SmzDialogsConfig } from '../../smz-dialogs/smz-dialogs.config';


export interface SmzControlTypeFunctionsDefinitions
{
    initialize: (input: SmzFormsControl<SmzControlTypes>, config: SmzDialogsConfig) => void;
    clear: (control: AbstractControl) => void;
    updateValue: (control: AbstractControl, input: SmzFormsControl<SmzControlTypes>) => void;
    getValue: (form: FormGroup, input: SmzFormsControl<SmzControlTypes>) => any;

}

export const CONTROL_FUNCTIONS: { [key: string]: SmzControlTypeFunctionsDefinitions } =
{
    [SmzControlType.CALENDAR]: {
        initialize: (input: SmzFormsControl<SmzCalendarControl>, config: SmzDialogsConfig) => { },
        clear: (control: AbstractControl) => { control.patchValue(''); },
        updateValue: (control: AbstractControl, input: SmzFormsControl<SmzCalendarControl>) => { control.patchValue(input.defaultValue); },
        getValue: (form: FormGroup, input: SmzFormsControl<SmzCalendarControl>) =>
        {
            const value = form.get(input.name).value;
            console.log('getValue CALENDAR', value);
            return value;
        },
    },
    [SmzControlType.CHECKBOX]: {
        initialize: (input: SmzFormsControl<SmzCheckBoxControl>, config: SmzDialogsConfig) => { },
        clear: (control: AbstractControl) => { control.patchValue(''); },
        updateValue: (control: AbstractControl, input: SmzFormsControl<SmzCheckBoxControl>) => { control.patchValue(input.defaultValue); },
        getValue: (form: FormGroup, input: SmzFormsControl<SmzCheckBoxControl>) =>
        {
            const value = form.get(input.name).value;
            console.log('getValue CHECKBOX', value);
            return value;
        },
    },
    [SmzControlType.CHECKBOX_GROUP]: {
        initialize: (input: SmzFormsControl<SmzCheckBoxGroupControl>, config: SmzDialogsConfig) => { },
        clear: (control: AbstractControl) => { control.patchValue(''); },
        updateValue: (control: AbstractControl, input: SmzFormsControl<SmzCheckBoxGroupControl>) => { control.patchValue(input.defaultValue); },
        getValue: (form: FormGroup, input: SmzFormsControl<SmzCheckBoxGroupControl>) =>
        {
            const value = form.get(input.name).value;
            console.log('getValue CHECKBOX_GROUP', value);
            return value;
        },
    },
    [SmzControlType.COLOR_PICKER]: {
        initialize: (input: SmzFormsControl<SmzColorPickerControl>, config: SmzDialogsConfig) => { },
        clear: (control: AbstractControl) => { control.patchValue(''); },
        updateValue: (control: AbstractControl, input: SmzFormsControl<SmzColorPickerControl>) => { control.patchValue(input.defaultValue); },
        getValue: (form: FormGroup, input: SmzFormsControl<SmzColorPickerControl>) =>
        {
            const value = form.get(input.name).value;
            console.log('getValue COLOR_PICKER', value);
            return value == null ? '' : (value.includes('#') ? value : `#${value}`);
        },
    },
    [SmzControlType.CURRENCY]: {
        initialize: (input: SmzFormsControl<SmzCurrencyControl>, config: SmzDialogsConfig) => { },
        clear: (control: AbstractControl) => { control.patchValue(''); },
        updateValue: (control: AbstractControl, input: SmzFormsControl<SmzCurrencyControl>) => { control.patchValue(input.defaultValue); },
        getValue: (form: FormGroup, input: SmzFormsControl<SmzCurrencyControl>) =>
        {
            const value = form.get(input.name).value;
            console.log('getValue CURRENCY', value);
            return value;
        },
    },
    [SmzControlType.DROPDOWN]: {
        initialize: (input: SmzFormsControl<SmzDropDownControl<any>>, config: SmzDialogsConfig) => { },
        clear: (control: AbstractControl) => { control.patchValue(''); },
        updateValue: (control: AbstractControl, input: SmzFormsControl<SmzDropDownControl<any>>) =>
        {
            const value = input.options.find(x => x.id === input.defaultValue);
            control.patchValue(value ?? '');
        },
        getValue: (form: FormGroup, input: SmzFormsControl<SmzDropDownControl<any>>) =>
        {
            const value = form.get(input.name).value;
            console.log('getValue DROPDOWN', value);
            return value;
        },
    },
    [SmzControlType.FILE]: {
        initialize: (input: SmzFormsControl<SmzFileControl>, config: SmzDialogsConfig) => { },
        clear: (control: AbstractControl) => { control.patchValue(''); },
        updateValue: (control: AbstractControl, input: SmzFormsControl<SmzFileControl>) =>
        {
            control.patchValue(input.defaultValue);
        },
        getValue: (form: FormGroup, input: SmzFormsControl<SmzFileControl>) =>
        {
            const value = form.get(input.name).value;
            console.log('getValue FILE', value);
            console.log('getValue _file', input._file);
            return input._file;
        },
    },
    [SmzControlType.LINKED_DROPDOWN]: {
        initialize: (input: SmzFormsControl<SmzLinkedDropDownControl<any>>, config: SmzDialogsConfig) => { },
        clear: (control: AbstractControl) => { control.patchValue(''); },
        updateValue: (control: AbstractControl, input: SmzFormsControl<SmzLinkedDropDownControl<any>>) => { control.patchValue(input.defaultValue); },
        getValue: (form: FormGroup, input: SmzFormsControl<SmzLinkedDropDownControl<any>>) =>
        {
            const value = form.get(input.name).value;
            console.log('getValue DROPLINKED_DROPDOWNDOWN', value);
            return value;
        },
    },
    [SmzControlType.MULTI_SELECT]: {
        initialize: (input: SmzFormsControl<SmzMultiSelectControl<any>>, config: SmzDialogsConfig) =>
        {
            console.log('config', config);
            const preset = config.forms.controlTypes[SmzControlType.MULTI_SELECT] as SmzMultiSelectControl<any>;

            input.defaultLabel = input.defaultLabel ?? preset?.defaultLabel;
        },
        clear: (control: AbstractControl) => { control.patchValue(''); },
        updateValue: (control: AbstractControl, input: SmzFormsControl<SmzMultiSelectControl<any>>) =>
        {
            const value = input.defaultValue?.filter(x => input.options.findIndex(o => o.id === x) > -1);
            control.patchValue(value ?? '');
        },
        getValue: (form: FormGroup, input: SmzFormsControl<SmzMultiSelectControl<any>>) =>
        {
            const value = form.get(input.name).value;
            console.log('getValue MULTI_SELECT', value);
            return value ?? [];
        },
    },
    [SmzControlType.NUMBER]: {
        initialize: (input: SmzFormsControl<SmzNumberControl>, config: SmzDialogsConfig) => { },
        clear: (control: AbstractControl) => { control.patchValue(''); },
        updateValue: (control: AbstractControl, input: SmzFormsControl<SmzNumberControl>) => { control.patchValue(input.defaultValue); },
        getValue: (form: FormGroup, input: SmzFormsControl<SmzNumberControl>) =>
        {
            const value = form.get(input.name).value;
            console.log('getValue NUMBER', value);
            return value;
        },
    },
    [SmzControlType.PASSWORD]: {
        initialize: (input: SmzFormsControl<SmzPasswordControl>, config: SmzDialogsConfig) => { },
        clear: (control: AbstractControl) => { control.patchValue(''); },
        updateValue: (control: AbstractControl, input: SmzFormsControl<SmzPasswordControl>) => { control.patchValue(input.defaultValue); },
        getValue: (form: FormGroup, input: SmzFormsControl<SmzPasswordControl>) =>
        {
            const value = form.get(input.name).value;
            console.log('getValue NUMBER', value);
            return value;
        },
    },
    [SmzControlType.RADIO]: {
        initialize: (input: SmzFormsControl<SmzRadioControl<any>>, config: SmzDialogsConfig) => { },
        clear: (control: AbstractControl) => { control.patchValue(''); },
        updateValue: (control: AbstractControl, input: SmzFormsControl<SmzRadioControl<any>>) => { control.patchValue(input.defaultValue); },
        getValue: (form: FormGroup, input: SmzFormsControl<SmzRadioControl<any>>) =>
        {
            const value = form.get(input.name).value;
            console.log('getValue RADIO', value);
            return input.options.find(d => d.id === value);
        },
    },
    [SmzControlType.SWITCH]: {
        initialize: (input: SmzFormsControl<SmzSwitchControl>, config: SmzDialogsConfig) => { },
        clear: (control: AbstractControl) => { control.patchValue(''); },
        updateValue: (control: AbstractControl, input: SmzFormsControl<SmzSwitchControl>) => { control.patchValue(input.defaultValue); },
        getValue: (form: FormGroup, input: SmzFormsControl<SmzSwitchControl>) =>
        {
            const value = form.get(input.name).value;
            console.log('getValue SWITCH', value);
            return value;
        },
    },
    [SmzControlType.TEXT]: {
        initialize: (input: SmzFormsControl<SmzTextControl>, config: SmzDialogsConfig) => { },
        clear: (control: AbstractControl) => { control.patchValue(''); },
        updateValue: (control: AbstractControl, input: SmzFormsControl<SmzTextControl>) => { control.patchValue(input.defaultValue); },
        getValue: (form: FormGroup, input: SmzFormsControl<SmzTextControl>) =>
        {
            const value = form.get(input.name).value;
            console.log('getValue TEXT', value);
            return value;
        },
    },
    [SmzControlType.TEXT_AREA]: {
        initialize: (input: SmzFormsControl<SmzTextAreaControl>, config: SmzDialogsConfig) => { },
        clear: (control: AbstractControl) => { control.patchValue(''); },
        updateValue: (control: AbstractControl, input: SmzFormsControl<SmzTextAreaControl>) => { control.patchValue(input.defaultValue); },
        getValue: (form: FormGroup, input: SmzFormsControl<SmzTextAreaControl>) =>
        {
            const value = form.get(input.name).value;
            console.log('getValue TEXT_AREA', value);
            return value;
        },
    },
    [SmzControlType.TEXT_MASK]: {
        initialize: (input: SmzFormsControl<SmzMaskControl>, config: SmzDialogsConfig) => { },
        clear: (control: AbstractControl) => { control.patchValue(''); },
        updateValue: (control: AbstractControl, input: SmzFormsControl<SmzMaskControl>) => { control.patchValue(input.defaultValue); },
        getValue: (form: FormGroup, input: SmzFormsControl<SmzMaskControl>) =>
        {
            const value = form.get(input.name).value;
            console.log('getValue TEXT_MASK', value);
            return value;
        },
    },
}
