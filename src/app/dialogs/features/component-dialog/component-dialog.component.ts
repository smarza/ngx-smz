import { Component, OnInit } from '@angular/core';
import { SmzDialogsService, SmzDialog, ComponentData } from 'ngx-smz-dialogs';
import { InjectableTesterComponent } from '../../components/injectable-tester/injectable-tester.component';
import { FormGroupDialogs } from '../form-group-dialog/form-group.dialogs';

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
            ],
            visibilityDependsOn: { propertyName: 'parent', formId: 'form-teste' }
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
                {
                    type: 'form',
                    data: FormGroupDialogs.getFormCheck(),
                    template: {
                        extraSmall: { row: 'col-12' },
                        large: { row: 'col-6' },
                    }
                },
                { type: 'component', data: componentData },
                // { type: 'component', data: componentData2 }
            ],
            behaviors: {
                showConfirmButton: true,
                showCancelButton: true,
                showCloseButton: false,
                useAdvancedResponse: false,
                closeOnEscape: true,
                includeComponentResponses: true
            },
            builtInButtons: {
                confirmDependsOnValidation: true
            },
            callbacks: {
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
                            callbacks: {
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
