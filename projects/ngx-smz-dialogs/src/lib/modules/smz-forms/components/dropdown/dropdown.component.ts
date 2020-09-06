import { Component, Input, OnInit } from '@angular/core';
import { BaseFormControlComponent } from '../../models/base-form.component';
import { SmzDropDownControl } from '../../models/control-types';
import { SmzFormsDropdownService } from '../../services/smz-forms-dropdown.service';

@Component({
    selector: 'smz-dropdown',
    templateUrl: './dropdown.component.html',
})
export class DropdownComponent extends BaseFormControlComponent implements OnInit
{
    @Input() public input: SmzDropDownControl<any>;
    constructor(public service: SmzFormsDropdownService)
    {
        super();
    }

    public ngOnInit(): void
    {
        this.service.registryDependsOnData(this.input);
    }

}
