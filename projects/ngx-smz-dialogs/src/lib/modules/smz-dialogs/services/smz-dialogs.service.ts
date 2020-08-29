import { Injectable } from '@angular/core';

import { ConfigService } from './config.service';
import { FormGroupComponent } from '../../smz-forms/features/form-group/form-group.component';
import { IDialogActionButton, IDialogData, dialogKeys, IDialogKey } from '../models/dialogs.models';
import { Observable } from 'rxjs';
import { Validators } from '@angular/forms';
import { SmzDialogsConfig } from '../smz-dialogs.config';

const FORMGROUP_BASE = 2;
const CONFIRMATION_BASE = 4;
const COMPONENT_BASE = 3;
const MESSAGE_BASE = 6;

@Injectable({
    providedIn: 'root'
})
export class DynamicDialogsService
{


    constructor(private configService: ConfigService, private configuration: SmzDialogsConfig) { }

    public showConfirmation(message: string, confirmCallback: () => void): Observable<any>
    {
        const confirm: IDialogActionButton = {
            validationRequired: false,
            closeDialogAfterClicked: true,
            confirmOnEnter: true,
            isOverlayAction: false,
            icon: '',
            iconPos: '',
            label: 'SIM',
            onClick: () =>
            {
                confirmCallback();
            },
            style: 'primary',
            styleClass: '',
            visible: true
        };

        const other: IDialogActionButton = {
            validationRequired: false,
            closeDialogAfterClicked: true,
            confirmOnEnter: false,
            isOverlayAction: false,
            icon: '',
            iconPos: '',
            onClick: () => { },
            label: 'NÃO',
            style: 'info',
            styleClass: '',
            visible: true
        };

        const config: IDialogData = {
            icon: null,
            messages: [message],
            title: 'CONFIRMAÇÃO',
            buttons: [confirm, other],
            maximizable: false,
            closable: true,
            showLoader: false,
            forceLevel: this.configuration.baseZIndex + CONFIRMATION_BASE,
            style: { width: '40%', overflow: 'auto' },
            componentConfig: {
                behaviors: null,
                entryComponents: null,
                functions: null,
                groups: null
            }
        };

        return this.showDialog(config, dialogKeys.CONFIRMATION_DIALOG);
    }


    private showDialog(config: Partial<IDialogData>, key: IDialogKey): Observable<any>
    {

        const baseConfig: IDialogData = {
            title: '',
            messages: [],
            icon: null,
            buttons: [],
            maximizable: false,
            closable: true,
            showLoader: false,
            forceLevel: this.configuration.baseZIndex + FORMGROUP_BASE,
            style: { width: 'auto', height: 'auto' },
            component: null,
            componentConfig: {
                behaviors: null,
                entryComponents: null,
                functions: null,
                groups: null
            }
        };

        // const baseInput: FormGroupInputData =
        // {
        //     placeholder: '',
        //     data: null,
        //     type: 'text',
        //     name: '',
        //     defaultValue: '',
        //     validators: Validators.compose(this.configuration.requiredByDefault ? [Validators.required] : []),
        //     validationMessages: this.configuration.requiredByDefault ?
        //         [{ type: 'required', message: this.configuration.requiredMessage }] :
        //         [],
        //     isPropagating: false,
        //     propagationCallback: null,
        //     inputFormControl: null,
        //     section: '',
        //     forceHalfWidth: false,
        // };

        // config.buttons.forEach(b =>
        // {
        //     if (b.isOverlayAction)
        //     {
        //         b.overlayData.ref = { componentRef: null };
        //     }
        // });

        // // console.log(config);

        // const configData: FormGroupConfig = {
        //     ...config.componentConfig,
        //     inputs: config.componentConfig.inputs.map(i => ({ ...baseInput, ...i }))
        // };

        // // console.log(configData);

        return this.configService.show(key, {
            ...baseConfig, ...config, component: {
                component: FormGroupComponent,
                inputs: [
                    // {
                    //     input: 'config',
                    //     data: configData
                    // }
                ],
                outputs: []
            }
        });
    }


    public showFormGroup(config: Partial<IDialogData>): Observable<any>
    {
        return this.showDialog(config, dialogKeys.CONTENT_DIALOG);
    }

    public showComponent(config: Partial<IDialogData>): Observable<any>
    {

        const baseConfig: IDialogData = {
            title: '',
            messages: [],
            icon: null,
            buttons: [],
            maximizable: false,
            closable: true,
            showLoader: false,
            forceLevel: this.configuration.baseZIndex + COMPONENT_BASE,
            style: { width: 'auto', height: 'auto' },
            componentConfig: {
                behaviors: null,
                entryComponents: null,
                functions: null,
                groups: null
            }
        };

        return this.configService.show(dialogKeys.CONTENT_DIALOG, { ...baseConfig, ...config });

    }

    public showMessage(config: Partial<IDialogData>): Observable<any>
    {

        const baseConfig: IDialogData = {
            title: '',
            messages: [],
            icon: null,
            buttons: [],
            maximizable: false,
            closable: true,
            showLoader: false,
            forceLevel: this.configuration.baseZIndex + MESSAGE_BASE,
            style: { width: 'auto', height: 'auto' },
            componentConfig: null
        };

        return this.configService.show(dialogKeys.MESSAGE_DIALOG, { ...baseConfig, ...config });
    }
}
