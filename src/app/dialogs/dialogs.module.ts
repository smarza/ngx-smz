import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroupDialogComponent } from './features/form-group-dialog/form-group-dialog.component';
import { ConfirmationDialogComponent } from './features/confirmation-dialog/confirmation-dialog.component';
import { ComponentDialogComponent } from './features/component-dialog/component-dialog.component';
import { MessageDialogComponent } from './features/message-dialog/message-dialog.component';
import { MultipleDialogsComponent } from './features/multiple-dialogs/multiple-dialogs.component';
import { DialogsRoutingModule } from './dialogs-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    declarations: [
        FormGroupDialogComponent,
        ConfirmationDialogComponent,
        ComponentDialogComponent,
        MessageDialogComponent,
        MultipleDialogsComponent,
    ],
    imports: [
        CommonModule,
        DialogsRoutingModule,
        SharedModule
    ]
})
export class DialogsModule { }
