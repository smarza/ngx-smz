import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { DemoRoutingModule } from './demo-routing.module';
import { FeaturedCardComponent } from './featured-card/featured-card.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    declarations: [HomeComponent, FeaturedCardComponent],
    imports: [
        CommonModule,
        RouterModule,
        DemoRoutingModule,
        SharedModule
    ]
})
export class DemoModule { }
