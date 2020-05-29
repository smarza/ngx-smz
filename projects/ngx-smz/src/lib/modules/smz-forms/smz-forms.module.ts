import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { FormGroupComponent } from './features/form-group/form-group.component';

import { InputPasswordComponent } from './components/input-password/input-password.component';
import { InputTextComponent } from './components/input-text/input-text.component';
import { RadioButtonComponent } from './components/radio-button/radio-button.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { InputCurrencyComponent } from './components/input-currency/input-currency.component';
import { MultiSelectComponent } from './components/multi-select/multi-select.component';
import { ColorPickerComponent } from './components/color-picker/color-picker.component';
import { InputTextAreaComponent } from './components/input-text-area/input-text-area.component';

import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextModule } from 'primeng/inputtext';
import { RadioButtonModule } from 'primeng/radiobutton';
import { MultiSelectModule } from 'primeng/multiselect';
import { ColorPickerModule } from 'primeng/colorpicker';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { NgGroupByPipeModule } from '../../common/pipes/group-by.pipe';
import { FormFocusFirstInputDirective } from './directives/form-focus-first-input.directive';
import { InjectContentAppModule } from '../../common/modules/inject-content/inject-content.module';
import { PasswordModule } from 'primeng/password';
import { CheckboxModule } from 'primeng/checkbox';
import { CheckBoxComponent } from './components/checkbox/checkbox.component';
import { CheckBoxGroupComponent } from './components/checkbox-group/checkbox-group.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        NgGroupByPipeModule,
        FormsModule,
        CalendarModule,
        DropdownModule,
        FileUploadModule,
        InputTextModule,
        RadioButtonModule,
        MultiSelectModule,
        ColorPickerModule,
        InputTextareaModule,
        FlexLayoutModule,
        InjectContentAppModule,
        PasswordModule,
        CheckboxModule
    ],
    // tslint:disable-next-line:max-line-length
    declarations: [FormGroupComponent, InputTextComponent, InputPasswordComponent, CheckBoxComponent, CheckBoxGroupComponent, RadioButtonComponent, CalendarComponent, DropdownComponent, FileUploadComponent, InputCurrencyComponent, MultiSelectComponent, ColorPickerComponent, InputTextAreaComponent, FormFocusFirstInputDirective],
    exports: [
        CalendarComponent,
        CheckBoxComponent,
        CheckBoxGroupComponent,
        ColorPickerComponent,
        DropdownComponent,
        FileUploadComponent,
        FormGroupComponent,
        InputCurrencyComponent,
        InputPasswordComponent,
        InputTextAreaComponent,
        InputTextComponent,
        MultiSelectComponent,
        RadioButtonComponent,
    ],

})
export class SmzFormsModule { }
