import { Component, OnInit } from '@angular/core';
import { SmzDialogsService, SmzDialog, ComponentData } from 'ngx-smz-dialogs';
import { InjectableTesterComponent } from '../../components/injectable-tester/injectable-tester.component';

interface DialogResponse {
    file: string;
}

@Component({
    selector: 'demo-component-dialog',
    templateUrl: './component-dialog.component.html',
    styleUrls: ['./component-dialog.component.scss']
})
export class ComponentDialogComponent implements OnInit
{

    constructor(private dialogs: SmzDialogsService) { }

    public ngOnInit(): void
    {
    }

    public show(): void
    {

        const componentData: ComponentData = {
            component: InjectableTesterComponent,
            inputs: [
                { input: 'color', data : 'red'},
            ],
            outputs: [
                {
                    output: 'clicked',
                    callback: (data) => { console.log('clicked red', data); } }
            ]
        };

        const componentData2: ComponentData = {
            component: InjectableTesterComponent,
            inputs: [
                { input: 'color', data : 'pink'},
            ],
            outputs: [
                {
                    output: 'clicked',
                    callback: (data) => { console.log('clicked pink', data); } }
            ]
        };

        const dialog: SmzDialog<DialogResponse> = {
            title: 'DIALOGO 1',
            features: [
                { type: 'component', data: componentData },
                { type: 'component', data: componentData2 }
            ],
            behaviors: {
                showConfirmButton: true,
                showCancelButton: true,
                useAdvancedResponse: false,
            },
            builtInButtons: {
                confirmDependsOnValidation: false
            },
            functions: {
                onConfirm: (data) =>
                {
                    console.log('onConfirm 1', data);
                },
            },
            customButtons: [
                {
                    name: 'ABRIR OUTRO DIALOGO',
                    dependsOnValidation: false,
                    closeDialog: false,
                    onClick: (x) => {
                        this.dialogs.open({
                            title: 'DIALOGO 2',
                            features: [{ type: 'message', data: 'Este é um novo dialogo.' }],
                            functions: {
                                onConfirm: () =>
                                {
                                    this.dialogs.refService.close();
                                }
                            }
                        });
                    },
                },
            ],
        };

        this.dialogs.open(dialog);
    }

}
