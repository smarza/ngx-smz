import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { DemoRoutingModule } from './demo-routing.module';
import { FeaturedCardComponent } from './featured-card/featured-card.component';
import { CodeHighlighterModule } from 'primeng/codehighlighter';
import { CodeBlockComponent } from './code-block/code-block.component';

@NgModule({
  declarations: [HomeComponent, FeaturedCardComponent, CodeBlockComponent],
  imports: [
    CommonModule,
    DemoRoutingModule,
    CodeHighlighterModule
  ]
})
export class DemoModule { }
