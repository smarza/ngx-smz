import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsRoutingModule } from './forms-routing.module';
import { SmzFormsModule } from 'ngx-smz-dialogs';
import { SampleAComponent } from './sample-a/sample-a.component';
import { SharedModule } from '../shared/shared.module';
import { SampleBComponent } from './sample-b/sample-b.component';
import { ButtonModule } from 'primeng/button';
import { Linked1Component } from './linked-1/linked-1.component';
import { CalendarDemoComponent } from './components/calendar/calendar-demo.component';
import { PasswordDemoComponent } from './components/password/password-demo.component';
import { SwitchDemoComponent } from './components/switch/switch-demo.component';
import { NumberDemoComponent } from './components/number/number-demo.component';
import { TextAreaDemoComponent } from './components/text-area/text-area-demo.component';
import { ColorPickerDemoComponent } from './components/color-picker/color-picker-demo.component';
import { TextMaskDemoComponent } from './components/text-mask/text-mask-demo.component';
import { FileDemoComponent } from './components/file/file-demo.component';
import { RadioDemoComponent } from './components/radio/radio-demo.component';

@NgModule({
    declarations: [
        SampleAComponent,
        SampleBComponent,
        Linked1Component,
        CalendarDemoComponent,
        PasswordDemoComponent,
        SwitchDemoComponent,
        NumberDemoComponent,
        TextAreaDemoComponent,
        ColorPickerDemoComponent,
        TextMaskDemoComponent,
        FileDemoComponent,
        RadioDemoComponent
    ],
    imports: [
        CommonModule,
        FormsRoutingModule,
        SmzFormsModule,
        SharedModule,
        ButtonModule
    ]
})
export class FormsModule { }
