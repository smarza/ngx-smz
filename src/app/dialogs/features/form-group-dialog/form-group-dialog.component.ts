import { Component, OnInit } from '@angular/core';
import { DynamicDialogsService, FormGroupInputData, IDialogActionButton, FormGroupDialogResponse, IDialogData } from 'ngx-smz';

@Component({
  selector: 'demo-form-group-dialog',
  templateUrl: './form-group-dialog.component.html',
  styleUrls: ['./form-group-dialog.component.scss']
})
export class FormGroupDialogComponent implements OnInit {

  constructor(private dialogs: DynamicDialogsService) { }

  ngOnInit(): void {
  }

  public show(): void
  {
    this.dialogs.showFormGroup(getFormDialog(
        (response) =>
        {
            console.log(response);
            const data = response.data as any;

        }));
  }

}


function getFormDialog(callback: (data: FormGroupDialogResponse) => void): Partial<IDialogData>
{

    const inputs: FormGroupInputData[] = [];

    inputs.push(...getInputs());

    return {
        title: 'Adicionar Produto Especial ao Estoque',
        buttons: [getCancel(), getConfirm(callback)],
        maximizable: true,
        maximizeOnOpen: true,
        style: { width: '60%' },
        componentConfig: {
            inputs,
            components: [],
        }
    };
}

function getInputs(): FormGroupInputData[]
{
    const inputs = [];

    inputs.push({ type: 'text', placeholder: 'Texto 1', name: 'test', });
    inputs.push({ type: 'mask', placeholder: 'Mask 2', name: 'test2', mask: '99-99' });
    inputs.push({ type: 'mask', placeholder: 'Mask 3', name: 'test3', mask: '99-99', defaultValue: '1234' });
    inputs.push({ type: 'mask', placeholder: 'Mask 4', name: 'test4', mask: '99-99', defaultValue: '12-34' });

    // const cities: SimpleNamedEntity[] = [
    //     { id: 'new-york', name: 'New York' },
    //     { id: 'san-francisco', name: 'San Francisco' },
    //     { id: 'los-angeles', name: 'Los Angeles' },
    // ];

    // inputs.push({
    //     section: 'Checkbox Group Example 1', type: 'checkbox-group', placeholder: 'Cities', name: 'checkboxGroup', data: cities,
    //     validators: Validators.compose([Validators.required]), validationMessages: [{ type: 'required', message: 'Required' }],
    // });

    // const worlds: SimpleNamedEntity[] = [
    //     { id: 'earth', name: 'Earth' },
    //     { id: 'mars', name: 'Mars' },
    //     { id: 'saturn', name: 'Saturn' },
    // ];

    // inputs.push({
    //     section: 'Checkbox Group Example 2', type: 'checkbox-group', placeholder: 'Worlds', name: 'checkboxGroupWorlds', data: worlds,
    //     defaultValue: ['earth', 'saturn'],
    //     validators: Validators.compose([Validators.required]), validationMessages: [{ type: 'required', message: 'Required' }],
    // });

    // inputs.push({
    //     section: 'Checkbox Example', type: 'checkbox', placeholder: 'Are you a nerd? ', name: 'checkbox',
    //     validators: Validators.compose([Validators.required]), validationMessages: [{ type: 'required', message: 'Required' }],
    // });

    return inputs;
}

function getCancel(): IDialogActionButton
{
    return {
        validationRequired: false, closeDialogAfterClicked: true, icon: '', iconPos: '', label: 'CANCELAR', style: 'secondary', styleClass: '', visible: true,
        onClick: (response: FormGroupDialogResponse) => { },
    };
}

function getConfirm(callback: (response: FormGroupDialogResponse) => void): IDialogActionButton
{
    return {
        validationRequired: true, confirmOnEnter: true, closeDialogAfterClicked: true, icon: '', iconPos: '', label: 'CONFIRMAR', style: 'primary', styleClass: '', visible: true,
        onClick: (response: FormGroupDialogResponse) => callback(response),
    };
}