import { ComponentRef } from '@angular/core';
import { ComponentData } from '../../../common/modules/inject-content/models/injectable.model';
import { IActionButton } from './action.button.model';
import { InjectableDialogComponentInterface } from '../../../common/modules/inject-content/models/injectable-dialog-component.interface';
import { ILibraryIcon } from './icons.model';
import { BehaviorSubject } from 'rxjs';
import { FormGroupConfig } from '../../smz-forms/models/form-group.models';


export const dialogKeys = {
    CONTENT_DIALOG: { level: 1001, key: 'CONTENT_DIALOG' },
    MESSAGE_DIALOG: { level: 1002, key: 'MESSAGE_DIALOG' },
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
        inputs: [],
        components: []
    },
    isVisible: false,
    isDisabled: false
};

export interface IDialogKey
{
    level: number;
    key: string;
}

export interface IDialogData
{
    title: string;
    icon: ILibraryIcon;
    messages: string[];
    buttons: IDialogActionButton[];
    maximizable: boolean;
    closable: boolean;
    style: any;
    component?: ComponentData;
    componentConfig: FormGroupConfig;
    level?: number;
    forceLevel?: number;
    key?: string;
    isVisible?: boolean;
    isDisabled?: boolean;

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
