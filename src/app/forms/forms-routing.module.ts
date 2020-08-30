import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SampleAComponent } from './sample-a/sample-a.component';
import { SampleBComponent } from './sample-b/sample-b.component';

const routes: Routes = [
    {
        path: 'sample-a',
        component: SampleAComponent,
    },
    {
        path: 'sample-b',
        component: SampleBComponent,
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormsRoutingModule { }
