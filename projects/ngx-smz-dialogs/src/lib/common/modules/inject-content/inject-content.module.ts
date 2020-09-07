import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { InjectContentDirective } from './inject-content.directive';
import { InjectDialogDirective } from './inject-dialog.directive';
import { InjectComponentDirective } from './inject-component.directive';

@NgModule({
    imports: [CommonModule],
    declarations: [InjectContentDirective, InjectDialogDirective, InjectComponentDirective],
    exports: [InjectContentDirective, InjectDialogDirective, InjectComponentDirective],
    providers: []
})
export class InjectContentAppModule { }
