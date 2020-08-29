import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class SmzFormsDataService
{

    public config: FormGroupConfig
    constructor() { }

    public getData<T>(): SmzFormsResponse<T>
    {
        const data: T = {} as T;
        const response: SmzFormsResponse<T> = { data, isValid: this.form.valid };

        this.config.inputs.forEach(i =>
        {
            switch (i.type)
            {
                case 'hidden':
                    response.data[i.name] = i.defaultValue;
                    break;

                case 'number':
                    const newNumber = Number(this.form.get(i.name).value);
                    response.data[i.name] = newNumber;
                    break;

                case 'radio':
                    const choice = this.form.get(i.name).value;
                    const newChoice = (i.data as SimpleNamedEntity[]).find(d => d.id === choice);
                    response.data[i.name] = newChoice;
                    break;

                case 'checkbox':
                    const checkboxValue = this.form.get(i.name).value;
                    response.data[i.name] = checkboxValue;
                    break;

                case 'switch':
                    const switchValue = this.form.get(i.name).value;
                    response.data[i.name] = switchValue;
                    break;

                case 'checkbox-group':
                    const checkboxGroupValue = this.form.get(i.name).value as string[];

                    if (checkboxGroupValue != null && checkboxGroupValue.length > 0)
                    {
                        const selectedIds = checkboxGroupValue.join(' ');
                        const seletedOptions = (i.data as SimpleNamedEntity[]).filter(d => selectedIds.includes(d.id));
                        response.data[i.name] = seletedOptions;
                    }
                    else
                    {
                        response.data[i.name] = [];
                    }

                    break;

                case 'file':
                    const match = this._files.find(f => f.name === i.name);
                    response.data[i.name] = match.file;
                    break;

                case 'colorpicker':
                    const value: string = this.form.controls[i.name].value;
                    response.data[i.name] = value == null ? '' : (value.includes('#') ? value : `#${value}`);
                    break;

                case 'multiselect':
                    const multiselectValue = this.form.controls[i.name].value;
                    response.data[i.name] = multiselectValue != null ? this.form.controls[i.name].value : [];
                    break;

                default:
                    response.data[i.name] = this.form.controls[i.name].value;
                    break;
            }


        });

        return response;

    }
}
