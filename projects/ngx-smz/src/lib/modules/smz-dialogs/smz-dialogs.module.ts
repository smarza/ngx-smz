import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { FlexLayoutModule } from '@angular/flex-layout';

import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';

import { SmzFormsModule } from '../smz-forms/smz-forms.module';
import { InjectContentAppModule } from '../../common/modules/inject-content/inject-content.module';
import { GeneralDialogComponent } from './features/general-dialog/general-dialog.component';
import { NgGroupByPipeModule } from '../../common/pipes/group-by.pipe';
import { SmzDialogsConfig } from './smz-dialogs.config';
import { OverlayPanelModule } from 'primeng/overlaypanel';

const dynamicConfig: SmzDialogsConfig = {
    requiredByDefault: true,
    requiredMessage: 'Campo Obrigatório.',
    blockScroll: true
};

@NgModule({
    declarations: [GeneralDialogComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        DialogModule,
        OverlayPanelModule,
        ToastModule,
        TableModule,
        ButtonModule,
        MessageModule,
        FlexLayoutModule,
        SmzFormsModule,
        InjectContentAppModule,
        NgGroupByPipeModule
    ],
    exports: [GeneralDialogComponent]
})
export class SmzDialogsModule {
    public static forRoot(configuration: SmzDialogsConfig): ModuleWithProviders<SmzDialogsModule>{
        // console.log('configuration...', configuration);
        return {
            ngModule: SmzDialogsModule,
            providers: [
                {
                    provide: SmzDialogsConfig,
                    useValue: {...dynamicConfig, ...configuration}
                }
            ]
        };
    }
}