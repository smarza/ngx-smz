import { SimpleEntity, SimpleParentEntity } from '../../../common/models/simple-named-entity';

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
    CALENDAR = 16,
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

export interface SmzTextControl
{
    defaultValue?: string;

}

export interface SmzCurrencyControl
{
    defaultValue?: string;

}

export interface SmzCalendarControl
{
    defaultValue?: string;

}

export interface SmzPasswordControl
{
    defaultValue?: string;

}

export interface SmzSwitchControl
{
    defaultValue?: string;

}

export interface SmzNumberControl
{
    defaultValue?: number;

}

export interface SmzTextAreaControl
{
    defaultValue?: string;
    textAreaRows?: number;

}

export interface SmzColorPickerControl
{
    defaultValue?: string;
}

export interface SmzMaskControl
{
    defaultValue?: string;
    mask?: string;
    unmask?: boolean;
    characterPattern?: string;
}

export interface SmzFileControl
{
    defaultValue?: string;
    fileAccept?: string;
    _file?: File;
}

export interface SmzRadioControl<T>
{
    options?: SimpleEntity<T>[];
    defaultValue?: T;

}

export interface SmzCheckBoxControl
{
    defaultValue?: Boolean;

}

export interface SmzCheckBoxGroupControl
{
    options?: SimpleEntity<Boolean>[];
    defaultValue?: Boolean;

}

export interface SmzDropDownControl<T>
{
    options?: SimpleEntity<T>[];
    defaultValue?: T;
    showFilter?: Boolean;
    filterMatchMode?: 'contains' | string;

}

export interface SmzLinkedDropDownControl<T>
{
    options?: SimpleParentEntity<T>[];
    defaultValue?: T;
    showFilter?: Boolean;
    filterMatchMode?: 'contains' | string;
    dependsOn?: string;

}

export interface SmzMultiSelectControl<T>
{
    options?: SimpleEntity<T>[];
    defaultValue?: T[];
    showFilter?: Boolean;
    filterMatchMode?: 'contains' | string;
    defaultLabel?: string;

}