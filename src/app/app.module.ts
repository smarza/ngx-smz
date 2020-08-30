import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { SmzDialogsConfig, SmzDialogsModule, SmzControlType } from 'ngx-smz-dialogs';

const smzDialogsConfig: SmzDialogsConfig = {
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
        }
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
