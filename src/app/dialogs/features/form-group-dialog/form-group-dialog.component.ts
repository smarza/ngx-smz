import { Component, OnInit } from '@angular/core';
import { SmzDialogsService, SmzDialog } from 'ngx-smz-dialogs';
import { FormGroupDialogs, Form1, Dialog2 } from './form-group.dialogs';


@Component({
    selector: 'demo-form-group-dialog',
    templateUrl: './form-group-dialog.component.html',
    styleUrls: ['./form-group-dialog.component.scss']
})
export class FormGroupDialogComponent implements OnInit
{

    constructor(private dialogs: SmzDialogsService) { }

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
                    {
                        type: 'form',
                        data: FormGroupDialogs.getForm1(),
                        template: {
                            extraSmall: { row: 'col-12' },
                            large: { row: 'col-6' },
                        }
                    },
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
                },
            };

        this.dialogs.open(dialog);
    }

    public show2(): void
    {
        const dialog: SmzDialog<Dialog2> = {
                title: 'DIALOGO 2',
                features: [
                    {
                        type: 'form',
                        data: FormGroupDialogs.getForm1(),
                        template: {
                            extraSmall: { row: 'col-12' }
                        }
                    },
                    {
                        type: 'message',
                        data: 'Oi, mensagem aqui...',
                        template: {
                            extraSmall: { row: 'col-12' }
                        }
                    },
                    {
                        type: 'form',
                        data: FormGroupDialogs.getForm2(),
                        template: {
                            extraSmall: { row: 'col-12' }
                        }
                    }
                ],
                behaviors: {
                    showCancelButton: true,
                    showConfirmButton: true,
                    useAdvancedResponse: true,
                },
                functions: {
                    onConfirm: (data) => {
                        console.log('onConfirm 2', data);
                    },
                    onCancel: () => { console.log('onCancel 2') },
                },
            };

        this.dialogs.open(dialog);
    }


}