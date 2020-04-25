import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        children: [
            {
                path: 'dialogs',
                loadChildren: () => import('../dialogs/dialogs.module').then(m => m.DialogsModule),
            },
            {
                path: 'forms',
                loadChildren: () => import('../forms/forms.module').then(m => m.FormsModule),
            }
        ]
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DemoRoutingModule { }
