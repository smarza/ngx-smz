import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroupDialogComponent } from './features/form-group-dialog/form-group-dialog.component';
import { ConfirmationDialogComponent } from './features/confirmation-dialog/confirmation-dialog.component';
import { ComponentDialogComponent } from './features/component-dialog/component-dialog.component';
import { MessageDialogComponent } from './features/message-dialog/message-dialog.component';
import { MultipleDialogsComponent } from './features/multiple-dialogs/multiple-dialogs.component';
import { DialogsRoutingModule } from './dialogs-routing.module';
import { SharedModule } from '../shared/shared.module';
import { InjectableTesterComponent } from './components/injectable-tester/injectable-tester.component';
import { NgxSmzFormsModule } from 'ngx-smz-dialogs';
import { InjectContentAppModule } from 'projects/ngx-smz-dialogs/src/lib/common/modules/inject-content/inject-content.module';
import { PickListModule } from 'primeng/picklist';
import { InjectableOnPush } from './components/injectable-on-push/injectable-on-push.component';

@NgModule({
    declarations: [
        FormGroupDialogComponent,
        ConfirmationDialogComponent,
        ComponentDialogComponent,
        MessageDialogComponent,
        MultipleDialogsComponent,
        InjectableTesterComponent,
        InjectableOnPush
    ],
    entryComponents: [
        InjectableTesterComponent
    ],
    imports: [
        CommonModule,
        DialogsRoutingModule,
        SharedModule,
        NgxSmzFormsModule,
        InjectContentAppModule,
        PickListModule
    ]
})
export class DialogsModule { }
