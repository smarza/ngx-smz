import { ComponentRef } from '@angular/core';
import { ComponentData } from '../../../common/modules/inject-content/models/injectable.model';
import { IActionButton } from './action.button.model';
import { InjectableDialogComponentInterface } from '../../../common/modules/inject-content/models/injectable-dialog-component.interface';
import { ILibraryIcon } from './icons.model';
import { BehaviorSubject } from 'rxjs';
import { SmzForms } from '../../smz-forms/models/smz-forms';


export const dialogKeys = {
    CONTENT_DIALOG: { level: 1001, key: 'CONTENT_DIALOG' },
    MESSAGE_DIALOG: { level: 1002, key: 'MESSAGE_DIALOG' },
    CONFIRMATION_DIALOG: { level: 1003, key: 'CONFIRMATION_DIALOG' },
};

export class DialogData
{
    public isReseted = true;
    public config: IDialogData = emptyConfig;
    public ref: { componentRef: ComponentRef<InjectableDialogComponentInterface<unknown>> } = { componentRef: null };
    public listener$: BehaviorSubject<unknown> = new BehaviorSubject<unknown>({});
    public isDialogActive = false;

    constructor(private appDialogKey: IDialogKey)
    {
        this.config = { ...this.config, ...appDialogKey };
    }

    public show(config: IDialogData): void
    {
        this.isReseted = false;

        this.config = { ...this.config, ...config };

        setTimeout(() =>
        {
            this.config.isVisible = true;
        }, 100);
    }

    public hide(): void
    {
        // console.log('hide from DialogData');
        this.config.isVisible = false;
        this.isDialogActive = false;
    }

    public reset(): void
    {

        this.config = { ...this.config, ...emptyConfig };
        this.ref = {
            componentRef: null
        };

        this.isReseted = true;
        this.isDialogActive = false;

    }

}

const emptyConfig: IDialogData = {
    title: '',
    messages: [],
    icon: null,
    buttons: [],
    maximizable: false,
    closable: true,
    style: {},
    component: null,
    componentConfig: {
        behaviors: null,
        entryComponents: null,
        functions: null,
        groups: null
    },
    isVisible: false,
    isDisabled: false,
    responsive: true,
    showLoader: false
};

export interface IDialogKey
{
    level: number;
    key: string;
}

export interface IDialogData
{
    domElementId?: string;
    title: string;
    icon: ILibraryIcon;
    messages: string[];
    buttons: IDialogActionButton[];
    maximizable: boolean;
    closable: boolean;
    style: any;
    component?: ComponentData;
    componentConfig: SmzForms<any>;
    level?: number;
    forceLevel?: number;
    key?: string;
    isVisible?: boolean;
    isDisabled?: boolean;
    responsive?: boolean;
    maximizeOnOpen?: boolean;
    showLoader?: boolean;
    onClose?: (data: any) => void;

}

export interface IDialogActionButton extends IActionButton
{
    closeDialogAfterClicked: boolean;
    confirmOnEnter?: boolean;
    validationRequired: boolean;
    disabled?: boolean;
    visible: boolean;
    isOverlayAction?: boolean;
    overlayData?: IOverLayData;
}

export interface IOverLayData extends ComponentData
{
    id: string;
}

export interface OverLayResponseData
{
    component: any;
    event: any;
    data: any;
    isValid: boolean;
}
