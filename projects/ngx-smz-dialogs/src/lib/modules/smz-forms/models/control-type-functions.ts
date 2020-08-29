import { AbstractControl, FormGroup } from '@angular/forms';
import { SmzControlType, SmzControlTypes, SmzCalendarControl, SmzCurrencyControl, SmzPasswordControl, SmzSwitchControl, SmzTextControl, SmzCheckBoxControl, SmzCheckBoxGroupControl, SmzColorPickerControl, SmzDropDownControl, SmzFileControl, SmzLinkedDropDownControl, SmzMultiSelectControl, SmzNumberControl, SmzRadioControl, SmzTextAreaControl, SmzMaskControl } from './control-types';
import { SmzFormsControl } from './controls';

export interface SmzControlTypeFunctionsDefinitions
{
    clear: (control: AbstractControl) => void;
    updateValue: (control: AbstractControl, input: SmzFormsControl<SmzControlTypes>) => void;
    getValue: (form: FormGroup, input: SmzFormsControl<SmzControlTypes>) => any;

}

export const CONTROL_FUNCTIONS: { [key: string]: SmzControlTypeFunctionsDefinitions } =
{
    [SmzControlType.CALENDAR]: {
        clear: (control: AbstractControl) => { control.patchValue(''); },
        updateValue: (control: AbstractControl, input: SmzFormsControl<SmzControlTypes>) => { control.patchValue(input.defaultValue); },
        getValue: (form: FormGroup, input: SmzFormsControl<SmzCalendarControl>) =>
        {
            const value = form.get(input.name).value;
            console.log('getValue CALENDAR', value);
            return value;
        },
    },
    [SmzControlType.CHECKBOX]: {
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
        clear: (control: AbstractControl) => { control.patchValue(''); },
        updateValue: (control: AbstractControl, input: SmzFormsControl<SmzDropDownControl<any>>) => { control.patchValue(input.defaultValue); },
        getValue: (form: FormGroup, input: SmzFormsControl<SmzDropDownControl<any>>) =>
        {
            const value = form.get(input.name).value;
            console.log('getValue DROPDOWN', value);
            return value;
        },
    },
    [SmzControlType.FILE]: {
        clear: (control: AbstractControl) => { control.patchValue(''); },
        updateValue: (control: AbstractControl, input: SmzFormsControl<SmzFileControl>) => { control.patchValue(input.defaultValue); },
        getValue: (form: FormGroup, input: SmzFormsControl<SmzFileControl>) =>
        {
            const value = form.get(input.name).value;
            console.log('getValue FILE', value);
            console.log('getValue _file', input._file);
            return input._file;
        },
    },
    [SmzControlType.LINKED_DROPDOWN]: {
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
        clear: (control: AbstractControl) => { control.patchValue(''); },
        updateValue: (control: AbstractControl, input: SmzFormsControl<SmzMultiSelectControl<any>>) => { control.patchValue(input.defaultValue); },
        getValue: (form: FormGroup, input: SmzFormsControl<SmzMultiSelectControl<any>>) =>
        {
            const value = form.get(input.name).value;
            console.log('getValue MULTI_SELECT', value);
            return value ?? [];
        },
    },
    [SmzControlType.NUMBER]: {
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
