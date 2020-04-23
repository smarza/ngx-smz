import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { InjectContentDirective } from './inject-content.directive';
import { InjectDialogDirective } from './inject-dialog.directive';

@NgModule({
    imports: [CommonModule],
    declarations: [InjectContentDirective, InjectDialogDirective],
    exports: [InjectContentDirective, InjectDialogDirective],
    providers: []
})
export class InjectContentAppModule { }
