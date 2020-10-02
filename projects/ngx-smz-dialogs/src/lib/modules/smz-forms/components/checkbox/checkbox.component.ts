import { Component, Input, OnInit } from '@angular/core';
import { SmzDialogsVisibilityService } from '../../../smz-dialogs/services/smz-dialogs-visibility.service';
import { BaseFormControlComponent } from '../../models/base-form.component';
import { SmzCheckBoxControl } from '../../models/control-types';
import { SmzFormsVisibilityService } from '../../services/smz-forms-visibility.service';

@Component({
    selector: 'smz-checkbox',
    templateUrl: './checkbox.component.html',
})
export class CheckBoxComponent extends BaseFormControlComponent implements OnInit
{
    @Input() public input: SmzCheckBoxControl;
    @Input() public formId: string;
    constructor(public service: SmzFormsVisibilityService, public dialogVisibility: SmzDialogsVisibilityService)
    {
        super();
    }

    public ngOnInit(): void
    {
        this.service.registryDependsOnData(this.input, this.formId);
    }

    public emitChange(input: SmzCheckBoxControl, formId: string, event: any): void
    {
        this.service.setValue(input, formId, event);
        this.dialogVisibility.setValue(input, formId, event);
    }
}
