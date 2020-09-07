import { Component, OnInit } from '@angular/core';
import { DynamicDialogsService, SmzDialog } from 'ngx-smz-dialogs';
import { FormGroupDialogs } from './form-group.dialogs';


@Component({
    selector: 'demo-form-group-dialog',
    templateUrl: './form-group-dialog.component.html',
    styleUrls: ['./form-group-dialog.component.scss']
})
export class FormGroupDialogComponent implements OnInit
{

    constructor(private dialogs: DynamicDialogsService) { }

    ngOnInit(): void
    {

    }
    public showAll(): void
    {
        this.show1();
        this.show2();
    }

    public show1(): void
    {
        const dialog: SmzDialog = {
                title: 'DIALOGO 1',
                features: [
                    { type: 'form', data: FormGroupDialogs.getForm1() },
                ],
                behaviors: {

                },
                functions: {

                },
                template: {

                },
            };

        this.dialogs.showFormGroup(dialog);
    }

    public show2(): void
    {
        const dialog: SmzDialog = {
                title: 'DIALOGO 2',
                features: [
                    { type: 'form', data: FormGroupDialogs.getForm1() },
                    { type: 'message', data: 'Oi, mensagem aqui...' },
                    { type: 'form', data: FormGroupDialogs.getForm2() }
                ],
                behaviors: {
                    showConfirmButton: true,
                    showCancelButton: true,
                },
                functions: {
                    onConfirm: (data: any) => { console.log('onConfirm', data) },
                    onCancel: () => { console.log('onCancel') },
                    onClose: () => { console.log('onClose') },
                },
                template: {

                },
            };

        this.dialogs.showFormGroup(dialog);
    }


}
