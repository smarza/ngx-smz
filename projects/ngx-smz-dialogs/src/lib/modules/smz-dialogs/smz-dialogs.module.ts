import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { FlexLayoutModule } from '@angular/flex-layout';

import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ToolbarModule } from 'primeng/toolbar';

import { SmzFormsModule, defaultFormsModuleConfig } from '../smz-forms/smz-forms.module';
import { InjectContentAppModule } from '../../common/modules/inject-content/inject-content.module';
import { GeneralDialogComponent } from './features/general-dialog/general-dialog.component';
import { NgGroupByPipeModule } from '../../common/pipes/group-by.pipe';
import { SmzDialogsConfig } from './smz-dialogs.config';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { ConfirmOnEnterDirective } from './directives/confirm-on-enter.directive';
import { SmzDynamicDialogConfig } from './models/smz-dialogs';
import { MessageContentComponent } from './features/message-content/message-content.component';
import { DialogService } from './dynamicdialog/dialogservice';
import { DynamicDialogRef } from './dynamicdialog/dynamicdialog-ref';
import { DynamicDialogModule } from './dynamicdialog/dynamicdialog';
import { DynamicDialogConfig } from './dynamicdialog/dynamicdialog-config';
import { DialogFooterComponent } from './features/dialog-footer/dialog-footer.component';

const defaultDialogsModuleConfig: SmzDialogsConfig = {
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
    forms: defaultFormsModuleConfig
};

@NgModule({
    declarations: [
        GeneralDialogComponent,
        MessageContentComponent,
        DialogFooterComponent,
        ConfirmOnEnterDirective
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        DialogModule,
        OverlayPanelModule,
        ToastModule,
        TableModule,
        ButtonModule,
        MessageModule,
        ProgressSpinnerModule,
        FlexLayoutModule,
        SmzFormsModule,
        InjectContentAppModule,
        NgGroupByPipeModule,
        DynamicDialogModule,
        ToolbarModule
    ],
    providers: [DialogService, SmzDynamicDialogConfig, DynamicDialogConfig, DynamicDialogRef],
    exports: [GeneralDialogComponent]
})
export class SmzDialogsModule
{

    public static forRoot(configuration: SmzDialogsConfig): ModuleWithProviders<SmzDialogsModule>
    {
        // console.log('configuration...', configuration);

        return {
            ngModule: SmzDialogsModule,
            providers: [
                {
                    provide: SmzDialogsConfig,
                    useValue: { ...defaultDialogsModuleConfig, ...configuration }
                }
            ]
        };
    }
}
