import { NgModule, ModuleWithProviders } from '@angular/core';
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
import { InputSwitchModule } from 'primeng/inputswitch';

import { NgGroupByPipeModule } from '../../common/pipes/group-by.pipe';
import { FormFocusFirstInputDirective } from './directives/form-focus-first-input.directive';
import { InjectContentAppModule } from '../../common/modules/inject-content/inject-content.module';
import { PasswordModule } from 'primeng/password';
import { CheckboxModule } from 'primeng/checkbox';
import { CheckBoxComponent } from './components/checkbox/checkbox.component';
import { CheckBoxGroupComponent } from './components/checkbox-group/checkbox-group.component';
import { InputSwitchComponent } from './components/input-switch/input-switch.component';
import { InputMaskModule } from 'primeng/inputmask';

import { InputMaskComponent } from './components/input-mask/input-mask.component';
import { SmzFormsConfig } from './smz-forms.config';

// import { FilterUtils } from 'primeng/utils';

const config: SmzFormsConfig = {
};

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
        CheckboxModule,
        InputSwitchModule,
        InputMaskModule,
    ],
    // tslint:disable-next-line:max-line-length
    declarations: [
        CalendarComponent,
        CheckBoxComponent,
        CheckBoxGroupComponent,
        ColorPickerComponent,
        DropdownComponent,
        FileUploadComponent,
        FormFocusFirstInputDirective,
        FormGroupComponent,
        InputCurrencyComponent,
        InputPasswordComponent,
        InputSwitchComponent,
        InputTextAreaComponent,
        InputTextComponent,
        InputMaskComponent,
        MultiSelectComponent,
        RadioButtonComponent,
    ],
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
        InputSwitchComponent,
        InputTextAreaComponent,
        InputTextComponent,
        InputMaskComponent,
        MultiSelectComponent,
        RadioButtonComponent,
    ],

})
export class SmzFormsModule
{

    public static forRoot(configuration: SmzFormsConfig): ModuleWithProviders<SmzFormsModule>
    {
        return {
            ngModule: SmzFormsModule,
            providers: [
                {
                    provide: SmzFormsConfig,
                    useValue: { ...config, ...configuration }
                }
            ]
        };
    }
}

