import { Component, OnInit } from '@angular/core';
import { DynamicDialogsService, FormGroupInputData, IDialogActionButton, FormGroupDialogResponse } from 'ngx-smz';

@Component({
    selector: 'demo-multiple-dialogs',
    templateUrl: './multiple-dialogs.component.html',
    styleUrls: ['./multiple-dialogs.component.scss']
})
export class MultipleDialogsComponent implements OnInit
{
    public code: string;

    constructor(private dialogs: DynamicDialogsService)
    {
        this.setupCode();
    }

    ngOnInit(): void
    {
    }
    public setupCode(): void
    {
        this.code =
            `
        const workInProgress;
        `;
    }

    public show(): void
    {
        const inputs: FormGroupInputData[] = [];

        inputs.push({ type: 'text', placeholder: 'Text', name: 'text' });

        const confirm: IDialogActionButton = {
            validationRequired: true, closeDialogAfterClicked: true, icon: '', iconPos: '', label: 'CONFIRMAR',
            style: 'primary', styleClass: '', visible: true,
            onClick: (dialogResponse: FormGroupDialogResponse) =>
            {
                const data = dialogResponse.data as any;
                console.log('data', data);

                this.dialogs.showConfirmation(`Você marcou alguns itens como não realizados. Deseja realmente concluir o documento ?`,
                    () =>
                    {

                    });

            },
        };

        this.dialogs.showFormGroup({
            title: `Title`, buttons: [confirm], maximizable: false, closable: true, style: { width: '40%' },
            componentConfig: {
                inputs,
                components: [],
            }
        });
    }

}
