import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { SmzDialogsConfig, SmzDialogsModule } from 'ngx-smz';

const smzDialogsConfig: SmzDialogsConfig = {
    requiredByDefault: true,
    requiredMessage: '* Required.',
    blockScroll: false
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
