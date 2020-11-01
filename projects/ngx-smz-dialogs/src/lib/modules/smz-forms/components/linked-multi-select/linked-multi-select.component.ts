import { Component, Input, OnInit } from '@angular/core';
import { BaseFormControlComponent } from '../../models/base-form.component';
import { SmzLinkedMultiSelectControl } from '../../models/control-types';
import { SmzFormsDropdownService } from '../../services/smz-forms-dropdown.service';

@Component({
    selector: 'smz-linked-multi-select',
    templateUrl: './linked-multi-select.component.html',
})
export class LinkedMultiSelectComponent extends BaseFormControlComponent implements OnInit
{
    @Input() public input: SmzLinkedMultiSelectControl<any>;
    @Input() public formId: string;
    constructor(public service: SmzFormsDropdownService)
    {
        super();
    }

    public ngOnInit(): void
    {
        this.service.registryDependsOnData(this.input, this.formId);
        this.service.registryObserver(this.input, this.formId);
    }

}
