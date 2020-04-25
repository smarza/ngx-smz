import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CodeBlockComponent } from './code-block/code-block.component';
import { CodeHighlighterModule } from 'primeng/codehighlighter';
import { ButtonModule } from 'primeng/button';

@NgModule({
    declarations: [CodeBlockComponent],
    imports: [
        CommonModule,
        CodeHighlighterModule,
        ButtonModule
    ],
    exports: [
        CodeBlockComponent,
        ButtonModule
    ],
})
export class SharedModule { }
