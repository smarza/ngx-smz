import { Component, OnInit } from '@angular/core';
import { SmzDialogsService, SmzDialog, ComponentData, InjectComponentService} from 'ngx-smz-dialogs';
import { InjectableOnPush } from '../../components/injectable-on-push/injectable-on-push.component';
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
    constructor(private dialogs: SmzDialogsService,
        public injectService: InjectComponentService) { }

    public ngOnInit(): void
    {
    }

    // Dialogo para testar mudar entradas de componente por fora usando componente com estratégia onPush
    public showOnPush(): void
    {

        const componentData: ComponentData = {
            component: InjectableOnPush,
            inputs: [
                { input: 'source', data : [{id: '1', name: 'red'}, {id: '2', name: 'green'}]},
                { input: 'target', data : []},
            ],
            outputs: [
                {
                    output: 'clicked',
                    callback: (data) => { console.log('clicked red', data); } }
            ],
        };

        const dialog: SmzDialog<DialogResponse> = {
            title: 'DIALOGO 1',
            features: [
                { type: 'component', data: componentData },
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
                    name: 'Mudar source list',
                    dependsOnValidation: false,
                    closeDialog: false,
                    onClick: (x) => {
                        setTimeout(() => {
                            console.log(componentData.componentId);
                            this.injectService.updateComponent(componentData.componentId, 'source', [{id: '3', name: 'yellow'}]);
                        }, 0);
                    },
                },
            ],
        };

        this.dialogs.open(dialog);
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
            visibilityDependsOn: { propertyName: 'parent', formId: 'form-teste', reversed: false }
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
            ],
            visibilityDependsOn: { propertyName: 'parent', formId: 'form-teste', reversed: true }
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
                { type: 'component', data: componentData2 }
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
