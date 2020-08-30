import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsRoutingModule } from './forms-routing.module';
import { SmzFormsModule } from 'ngx-smz-dialogs';
import { SampleAComponent } from './sample-a/sample-a.component';
import { SharedModule } from '../shared/shared.module';
import { SampleBComponent } from './sample-b/sample-b.component';
import { ButtonModule } from 'primeng/button';

@NgModule({
    declarations: [
        SampleAComponent,
        SampleBComponent
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
