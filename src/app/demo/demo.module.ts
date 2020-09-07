import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { DemoRoutingModule } from './demo-routing.module';
import { FeaturedCardComponent } from './featured-card/featured-card.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { SimpleCardComponent } from './simple-card/simple-card.component';
import { InjectContentAppModule, SmzFormsModule } from 'ngx-smz-dialogs';

@NgModule({
    declarations: [HomeComponent, FeaturedCardComponent, SimpleCardComponent],
    imports: [
        CommonModule,
        RouterModule,
        DemoRoutingModule,
        SharedModule,
        InjectContentAppModule,
    ]
})
export class DemoModule { }
