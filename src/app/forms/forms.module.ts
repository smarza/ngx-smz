import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsRoutingModule } from './forms-routing.module';
import { SmzFormsModule } from 'ngx-smz-dialogs';
import { SampleAComponent } from './sample-a/sample-a.component';
import { SharedModule } from '../shared/shared.module';
import { SampleBComponent } from './sample-b/sample-b.component';
import { ButtonModule } from 'primeng/button';
import { Linked1Component } from './linked-1/linked-1.component';

@NgModule({
    declarations: [
        SampleAComponent,
        SampleBComponent,
        Linked1Component
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
