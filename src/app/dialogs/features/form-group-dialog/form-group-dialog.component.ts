import { Component, OnInit } from '@angular/core';
import { DynamicDialogsService, SmzDialog } from 'ngx-smz-dialogs';
import { FormGroupDialogs, Form1, Dialog2 } from './form-group.dialogs';


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
        const dialog: SmzDialog<Form1> = {
                title: 'DIALOGO 1',
                features: [
                    { type: 'form', data: FormGroupDialogs.getForm1() },
                ],
                behaviors: {
                    showConfirmButton: true,
                    showCancelButton: true,
                    useAdvancedResponse: false,
                },
                functions: {
                    onConfirm: (data) => {
                        console.log('onConfirm 1', data);
                    },
                    onCancel: () => { console.log('onCancel 1') },
                    onClose: () => { console.log('onClose 1') },
                },
                template: {

                },
            };

        this.dialogs.showFormGroup(dialog);
    }

    public show2(): void
    {
        const dialog: SmzDialog<Dialog2> = {
                title: 'DIALOGO 2',
                features: [
                    { type: 'form', data: FormGroupDialogs.getForm1() },
                    { type: 'message', data: 'Oi, mensagem aqui...' },
                    { type: 'form', data: FormGroupDialogs.getForm2() }
                ],
                behaviors: {
                    showCancelButton: true,
                    showConfirmButton: true,
                    showMaximizeButton: false,
                    showCloseButton: true,
                    useAdvancedResponse: false,
                    closeOnEscape: false,
                    showHeader: true,
                    showFooter: true,
                    dismissableMask: true,
                    defaultWidth: '50%',
                    noPadding: false,
                },
                functions: {
                    onConfirm: (data) => {
                        console.log('onConfirm 2', data);
                    },
                    onCancel: () => { console.log('onCancel 2') },
                    onClose: () => { console.log('onClose 2') },
                },
                template: {

                },
            };

        this.dialogs.showFormGroup(dialog);
    }


}