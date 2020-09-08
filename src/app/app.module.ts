import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { SmzDialogsConfig, SmzDialogsModule, SmzControlType, SmzFormsPresets } from 'ngx-smz-dialogs';

const compactPreset: SmzFormsPresets = {
    formTemplates: {
        extraSmall: { horizontalAlignment: 'justify-content-between', verticalAlignment: 'align-items-start' },
        small: { horizontalAlignment: 'justify-content-between', verticalAlignment: 'align-items-start' },
    },
    groupTemplates: {
        extraSmall: { row: 'col-12' },
        medium: { row: 'col-6' },
    },
    inputTemplates: {
        extraSmall: { row: 'col-12', },
        medium: { row: 'col-6', }
    },
    globalStyleScale: 0.9
};

const linearPreset: SmzFormsPresets = {
    formTemplates: { extraSmall: { horizontalAlignment: 'justify-content-start', verticalAlignment: 'align-items-start' } },
    groupTemplates: { extraSmall: { row: 'col-12' } },
    inputTemplates: { extraSmall: { row: 'col-12', } },
    globalStyleScale: 1
};

const smzDialogsConfig: SmzDialogsConfig = {
    dialogs: {
        behaviors: {
            showCancelButton: true,
            showConfirmButton: true,
            showMaximizeButton: true,
            showCloseButton: true,
            showLoader: false,
            useAdvancedResponse: false,
        },
        buttons: {
            confirmName: 'CONFIRMAR',
            confirmClass: 'smz-button-success',
            cancelName: 'CANCELAR',
            cancelClass: 'smz-button-info',
        }
    },
    forms: {
        behaviors: {
            avoidFocusOnLoad: true,
            debounceTime: 400,
            flattenResponse: true,
            runCustomFunctionsOnLoad: false,
            skipFunctionAfterNextEmit: false
        },
        validators: {
            isRequired: true,
        },
        validationMessages: [
            { type: 'required', message: 'Campo obrigatório.' },
            { type: 'minLength', message: 'Número mínimo de caracteres não atingido.' },
            { type: 'maxLength', message: 'Número máximo de caracteres ultrapassado.' },
            { type: 'min', message: 'Valor mínimo atingido' },
            { type: 'max', message: 'Valor máximo atingido' },
        ],
        controlTypes: {
            [SmzControlType.MULTI_SELECT]: {
                defaultLabel: 'Escolha uma ou mais opções'
            }
        },
        ...compactPreset
    }
};

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        RouterModule,
        AppRoutingModule,
        SmzDialogsModule.forRoot(smzDialogsConfig),
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
