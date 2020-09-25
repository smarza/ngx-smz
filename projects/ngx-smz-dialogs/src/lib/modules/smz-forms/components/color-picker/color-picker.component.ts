import { Component, OnInit } from '@angular/core';
import { BaseFormControlComponent } from '../../models/base-form.component';

@Component({
  selector: 'smz-color-picker',
  templateUrl: './color-picker.component.html',
})
export class ColorPickerComponent extends BaseFormControlComponent implements OnInit
{
    public color: string;
    constructor() { super(); }

    public ngOnInit(): void
    {
        this.color = this.control.value;
    }

    public onPickerChange(event: any): void
    {
        // console.log('onPickerChange', event);
        this.color = event.value;
    }

    public onInputChange(event: any): void
    {
        console.log('onInputChange', event);
        this.control.setValue(event);
    }

    public markAsTouched(): void
    {
        this.control.markAsTouched();
    }

}
