import { Component, Input, OnInit } from '@angular/core';
import { BaseFormControlComponent } from '../../models/base-form.component';
import { SmzLinkedDropDownControl } from '../../models/control-types';
import { SmzFormsDropdownService } from '../../services/smz-forms-dropdown.service';
import { tap } from 'rxjs/operators';

@Component({
    selector: 'smz-linked-dropdown',
    templateUrl: './linked-dropdown.component.html',
})
export class LinkedDropdownComponent extends BaseFormControlComponent implements OnInit
{
    @Input() public input: SmzLinkedDropDownControl<any>;
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
