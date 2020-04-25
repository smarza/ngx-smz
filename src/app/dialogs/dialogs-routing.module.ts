import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ComponentDialogComponent } from './features/component-dialog/component-dialog.component';
import { ConfirmationDialogComponent } from './features/confirmation-dialog/confirmation-dialog.component';
import { FormGroupDialogComponent } from './features/form-group-dialog/form-group-dialog.component';
import { MessageDialogComponent } from './features/message-dialog/message-dialog.component';
import { MultipleDialogsComponent } from './features/multiple-dialogs/multiple-dialogs.component';

const routes: Routes = [
    {
        path: 'component',
        component: ComponentDialogComponent,
    },
    {
        path: 'confirmation',
        component: ConfirmationDialogComponent
    },
    {
        path: 'form-group',
        component: FormGroupDialogComponent,
    },
    {
        path: 'message',
        component: MessageDialogComponent,
    },
    {
        path: 'multiple',
        component: MultipleDialogsComponent,
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DialogsRoutingModule { }
