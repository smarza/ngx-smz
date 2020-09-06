import { SimpleEntity, SimpleParentEntity } from '../../../common/models/simple-named-entity';
import { SmzFormsBaseControl } from './controls';

export type SmzControlTypes =
    SmzCalendarControl |
    SmzCheckBoxControl |
    SmzCheckBoxGroupControl |
    SmzColorPickerControl |
    SmzCurrencyControl |
    SmzDropDownControl<any> |
    SmzFileControl |
    SmzLinkedDropDownControl<any> |
    SmzMultiSelectControl<any> |
    SmzNumberControl |
    SmzPasswordControl |
    SmzRadioControl<any> |
    SmzSwitchControl |
    SmzTextControl |
    SmzTextAreaControl |
    SmzMaskControl;
export enum SmzControlType
{
    CALENDAR = 0,
    CHECKBOX = 1,
    CHECKBOX_GROUP = 2,
    COLOR_PICKER = 3,
    CURRENCY = 4,
    DROPDOWN = 5,
    FILE = 6,
    MULTI_SELECT = 7,
    NUMBER = 8,
    PASSWORD = 9,
    RADIO = 10,
    SWITCH = 11,
    TEXT = 12,
    TEXT_AREA = 13,
    TEXT_MASK = 14,
    LINKED_DROPDOWN = 15,

}

export interface SmzTextControl extends SmzFormsBaseControl
{
    defaultValue?: string;

}

export interface SmzCurrencyControl extends SmzFormsBaseControl
{
    defaultValue?: string;

}

export interface SmzCalendarControl extends SmzFormsBaseControl
{
    defaultValue?: string;

}

export interface SmzPasswordControl extends SmzFormsBaseControl
{
    defaultValue?: string;

}

export interface SmzSwitchControl extends SmzFormsBaseControl
{
    defaultValue?: string;

}

export interface SmzNumberControl extends SmzFormsBaseControl
{
    defaultValue?: number;

}

export interface SmzTextAreaControl extends SmzFormsBaseControl
{
    defaultValue?: string;
    textAreaRows?: number;

}

export interface SmzColorPickerControl extends SmzFormsBaseControl
{
    defaultValue?: string;
}

export interface SmzMaskControl extends SmzFormsBaseControl
{
    defaultValue?: string;
    mask?: string;
    unmask?: boolean;
    characterPattern?: string;
}

export interface SmzFileControl extends SmzFormsBaseControl
{
    defaultValue?: string;
    fileAccept?: string;
    _file?: File;
}

export interface SmzRadioControl<T> extends SmzFormsBaseControl
{
    options?: SimpleEntity<T>[];
    defaultValue?: T;

}

export interface SmzCheckBoxControl extends SmzFormsBaseControl
{
    defaultValue?: Boolean;

}

export interface SmzCheckBoxGroupControl extends SmzFormsBaseControl
{
    options?: SimpleEntity<Boolean>[];
    defaultValue?: Boolean;

}

export interface SmzDropDownControl<T> extends SmzFormsBaseControl
{
    options?: SimpleEntity<T>[];
    defaultValue?: T;
    showFilter?: Boolean;
    filterMatchMode?: 'contains' | string;

}

export interface SmzLinkedDropDownControl<T> extends SmzFormsBaseControl
{
    options?: SimpleParentEntity<T>[];
    defaultValue?: T;
    showFilter?: Boolean;
    filterMatchMode?: 'contains' | string;
    dependsOn?: string;

}

export interface SmzMultiSelectControl<T> extends SmzFormsBaseControl
{
    options?: SimpleEntity<T>[];
    defaultValue?: T[];
    showFilter?: Boolean;
    filterMatchMode?: 'contains' | string;
    defaultLabel?: string;

}