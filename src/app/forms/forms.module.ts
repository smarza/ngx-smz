import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsRoutingModule } from './forms-routing.module';
import { NgxSmzFormsModule } from 'ngx-smz-dialogs';
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
import { CheckBoxDemoComponent } from './components/check-box/check-box-demo.component';
import { CheckBoxGroupDemoComponent } from './components/check-box-group/check-box-group-demo.component';
import { DropdownDemoComponent } from './components/dropdown/dropdown-demo.component';
import { LinkedDropdownDemoComponent } from './components/linked-dropdown/linked-dropdown-demo.component';
import { MultiSelectDemoComponent } from './components/multi-select/multi-select-demo.component';
import { TextDemoComponent } from './components/text/text-demo.component';
import { LinkedCheckBoxDemoComponent } from './components/linked-check-box/linked-check-box-demo.component';
import { LinkedMultiSelectDemoComponent } from './components/linked-multiselect/linked-multiselect-demo.component';

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
        RadioDemoComponent,
        CheckBoxDemoComponent,
        CheckBoxGroupDemoComponent,
        LinkedCheckBoxDemoComponent,
        DropdownDemoComponent,
        LinkedDropdownDemoComponent,
        MultiSelectDemoComponent,
        LinkedMultiSelectDemoComponent,
        TextDemoComponent
    ],
    imports: [
        CommonModule,
        FormsRoutingModule,
        NgxSmzFormsModule,
        SharedModule,
        ButtonModule
    ]
})
export class FormsModule { }
