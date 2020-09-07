import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SampleAComponent } from './sample-a/sample-a.component';
import { SampleBComponent } from './sample-b/sample-b.component';
import { Linked1Component } from './linked-1/linked-1.component';
import { CalendarDemoComponent } from './components/calendar/calendar-demo.component';
import { PasswordDemoComponent } from './components/password/password-demo.component';
import { SwitchDemoComponent } from './components/switch/switch-demo.component';
import { NumberDemoComponent } from './components/number/number-demo.component';
import { FileDemoComponent } from './components/file/file-demo.component';

const routes: Routes = [
    { path: 'sample-a', component: SampleAComponent },
    { path: 'sample-b', component: SampleBComponent },
    { path: 'linked-1', component: Linked1Component },
    { path: 'components/calendar', component: CalendarDemoComponent },
    { path: 'components/password', component: PasswordDemoComponent },
    { path: 'components/switch', component: SwitchDemoComponent },
    { path: 'components/number', component: NumberDemoComponent },
    { path: 'components/file', component: FileDemoComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormsRoutingModule { }
