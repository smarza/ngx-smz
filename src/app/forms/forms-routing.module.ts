import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SampleAComponent } from './sample-a/sample-a.component';
import { SampleBComponent } from './sample-b/sample-b.component';
import { Linked1Component } from './linked-1/linked-1.component';

const routes: Routes = [
    {
        path: 'sample-a',
        component: SampleAComponent,
    },
    {
        path: 'sample-b',
        component: SampleBComponent,
    },
    {
        path: 'linked-1',
        component: Linked1Component,
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormsRoutingModule { }
