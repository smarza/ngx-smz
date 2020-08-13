import { Component, OnInit } from '@angular/core';
import { DynamicDialogsService, FormGroupInputData, IDialogActionButton, FormGroupDialogResponse, IDialogData, FormGroupConfig, FormGroupComponent } from 'ngx-smz';
import { InjectableTesterComponent } from '../../components/injectable-tester/injectable-tester.component';
import { FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'demo-form-group-dialog',
    templateUrl: './form-group-dialog.component.html',
    styleUrls: ['./form-group-dialog.component.scss']
})
export class FormGroupDialogComponent implements OnInit
{
    public formConfig: FormGroupConfig;
    public hasUnsaved = false;
    constructor(private dialogs: DynamicDialogsService) { }

    ngOnInit(): void
    {
        this.createForm();
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

    public onFormChange(event: FormGroupDialogResponse): void
    {
        if (event.isValid)
        {
            const data = event.data as any;
            this.hasUnsaved = true;
        }
        else
        {
            this.hasUnsaved = false;
        }
    }


    public update(formComponent: FormGroupComponent): void
    {
        const data = formComponent.form.value;
        console.log('data', data);

        this.createForm();

        // this.resetForm();
        // setTimeout(() => {
        //     this.createForm();
        // }, 0);
    }

    public clear(formComponent: FormGroupComponent): void
    {
        formComponent.clearFormValues();
    }

    public test(formComponent: FormGroupComponent): void
    {
        console.log(formComponent);
        formComponent.form.markAllAsTouched();

    }

    public update2(data: FormGroupDialogResponse): void
    {
        // console.log('update2', data);

        // this.createForm();

        // this.resetForm();
        // setTimeout(() => {
        //     this.createForm();
        // }, 0);
    }

    public resetForm(): void
    {
        this.formConfig = null
        this.hasUnsaved = false;
    }

    public createForm(): void
    {

        const inputs: FormGroupInputData[] = [];
        // const isDisabled = Boolean(Math.round(Math.random() * 2));
        // console.log('isDisabled', isDisabled);

        inputs.push({
            section: '', type: 'text-area', placeholder: 'Escreva seu comentário', name: 'comment', defaultValue: '', textAreaRows: 7,
            validators: Validators.compose([Validators.required, Validators.minLength(5)]), validationMessages: [{ type: 'required', message: 'Campo obrigatório.' }, { type: 'minLength', message: 'O comentário precisa ter ao menos 5 caracteres.'}],
        });

        inputs.push({
            type: 'mask', placeholder: 'Telefone Principal', mask: '(99) 99999-999?9', unmask: false, name: 'mobile', forceHalfWidth: true,
            validators: Validators.compose([Validators.required]), validationMessages: [{ type: 'required', message: 'Campo obrigatório.' }],
        });

        inputs.push(
            {
                type: 'text', isDisabled: false, placeholder: 'Texto 1', name: 'test', defaultValue: Math.round(Math.random() * 100),
                validators: Validators.compose([Validators.required, Validators.minLength(5)]), validationMessages: [{ type: 'required', message: 'Campo obrigatório.' }, { type: 'minLength', message: 'O comentário precisa ter ao menos 5 caracteres.'}],
        });

        inputs.push(
            {
                type: 'text', isDisabled: false, placeholder: 'OFF', name: 'date',
                validators: Validators.compose([Validators.required]), validationMessages: [{ type: 'required', message: 'Campo obrigatório.' }],
            });

        inputs.push({ type: 'calendar', isDisabled: false, placeholder: 'ON', name: 'date2', defaultValue: new Date() });

        this.formConfig = {
            components: [],
            inputs,
            avoidFocusOnLoad: true
        };

        this.hasUnsaved = false;

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
            debounceTime: 5000,
            components: [
                {
                    component: InjectableTesterComponent,
                    inputs: [{ input: 'color', data: 'yellow' }],
                    outputs: ['clicked']
                },
            ],
            customBehavior: (data: FormGroupDialogResponse, config: FormGroupConfig, form: FormGroup, outputs: any) =>
            {
                console.log('-----------------');
                console.log('customBehavior');
                console.log('data', data);
                console.log('config', config);
                console.log('form', form);
                console.log('outputs', outputs);
            }
        },
    };


}

function getInputs(): FormGroupInputData[]
{
    const inputs = [];

    inputs.push({ type: 'text', placeholder: 'Texto 1', name: 'test', });
    inputs.push({ type: 'mask', placeholder: 'Mask 2', name: 'test2', mask: '99-99' });
    inputs.push({ type: 'mask', placeholder: 'Mask 3', name: 'test3', mask: '99-99', unmask: true, defaultValue: '1234' });
    inputs.push({ type: 'mask', placeholder: 'Mask 4', name: 'test4', mask: '99-99', unmask: true, defaultValue: '12-34' });

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