import { Component, OnInit } from '@angular/core';
import { SmzDialogsService, SmzDialog, SmzControlType, SmzDropDownControl, SmzLinkedDropDownControl, SmzTextControl, SmzCalendarControl, SmzMultiSelectControl, SmzCheckBoxControl, SmzFileControl, SmzForm } from 'ngx-smz-dialogs';
import { getPreset, SmzPresets } from 'projects/ngx-smz-dialogs/src/public-api';
import { getAnalyseConfigurationFormGroup } from 'src/app/forms/components/linked-check-box/linked-check-box-demo.component';
import { STATES } from 'src/app/forms/data/linked-data';
import { allEmployees, definition, documentInstance } from '../../data/dialogs-data';
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
            domElementId: 'document-viewer-dialog',
            features: [
                {
                    type: 'form',
                    data: FormGroupDialogs.getForm1(),
                    template: {
                        extraSmall: { row: 'col-12' },
                        large: { row: 'col-6' },
                    }
                },
                {
                    type: 'form',
                    data: FormGroupDialogs.getForm2(),
                    template: {
                        extraSmall: { row: 'col-12' },
                        large: { row: 'col-6' },
                    }
                },
            ],
            behaviors: {
                showConfirmButton: true,
                showCancelButton: true,
                useAdvancedResponse: true,
            },
            callbacks: {
                onConfirm: (data) =>
                {
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
                // {
                //     type: 'form',
                //     data: FormGroupDialogs.getForm1(),
                //     template: {
                //         extraSmall: { row: 'col-12' }
                //     }
                // },
                // {
                //     type: 'message',
                //     data: 'Oi, mensagem aqui...',
                //     template: {
                //         extraSmall: { row: 'col-12' }
                //     }
                // },
                // {
                //     type: 'form',
                //     data: FormGroupDialogs.getForm2(),
                //     template: {
                //         extraSmall: { row: 'col-12' }
                //     }
                // },
                {
                    type: 'form',
                    data: {
                        formId: 'analyse-operator-form',
                        behaviors: { flattenResponse: false, avoidFocusOnLoad: true },
                        groups: [
                            // getAnalyseFileFormGroup(),
                            getAnalyseConfigurationFormGroup()
                        ],
                    },
                    template: {
                        extraSmall: { row: 'col-12' }
                    }
                }
            ],
            behaviors: {
                showCancelButton: true,
                showConfirmButton: true,
                useAdvancedResponse: false,
            },
            callbacks: {
                onConfirm: (data) =>
                {
                    console.log('onConfirm 2', data);
                },
                onCancel: () => { console.log('onCancel 2') },
            },
        };

        this.dialogs.open(dialog);
    }

    public showMessage(): void
    {
        const dialog: SmzDialog<Dialog2> = {
            title: 'DIALOGO DE MENSAGEM',
            features: [
                {
                    type: 'message',
                    data: 'Oi, mensagem aqui...',
                },
            ],
            presetId: SmzPresets.Message
        };

        this.dialogs.open(dialog);
    }

    public showConfirmation(): void
    {
        const dialog: SmzDialog<Dialog2> = {
            title: 'DIALOGO DE CONFIRMAÇÃO',
            features: [
                {
                    type: 'message',
                    data: 'Tem certeza ????',
                },
            ],
            presetId: SmzPresets.Confirmation
        };

        this.dialogs.open(dialog);
    }
    public show3(): void
    {
        const states = STATES.map(x => ({ id: x.id, name: x.name }));
        const parent: SmzDropDownControl<string> = {
            propertyName: 'parent1', type: SmzControlType.DROPDOWN, name: 'State',
            defaultValue: STATES[0].id, showFilter: true, options: states,
        };

        const linkedOptions1 = STATES.map(x => ({ parentId: x.id, data: x.cities.map(c => ({ id: c, name: c })) }));

        const linked1: SmzLinkedDropDownControl<string> = {
            propertyName: 'linked1', type: SmzControlType.LINKED_DROPDOWN, name: 'City',
            defaultValue: '', dependsOn: { propertyName: 'parent1' }, showFilter: true, options: linkedOptions1,
            validatorsPreset: { isRequired: true }
        };

        this.dialogs.open({
            title: 'Criar Frete',
            features: [{
                type: 'form', data:
                {
                    behaviors: { flattenResponse: true, avoidFocusOnLoad: true },
                    groups: [
                        {
                            name: 'Parent', showName: true, children: [parent],
                        },
                        {
                            name: 'Single Dependency', showName: true, children: [linked1],
                        }
                    ],
                }
            }],
            callbacks: {
                onConfirm: (data: any) =>
                {

                }
            }
        }, getPreset(SmzPresets.SimpleCrud));


    }

    public show4(): void
    {

        console.log(documentInstance);
        console.log(definition);
        console.log(allEmployees);

        const instanceId: SmzTextControl = { propertyName: 'instanceId', type: SmzControlType.TEXT, defaultValue: documentInstance.id, isVisible: false, validatorsPreset: { isRequired: true } };
        const finishDate: SmzCalendarControl = { propertyName: 'finishDate', type: SmzControlType.CALENDAR, defaultValue: null, validatorsPreset: { isRequired: true } };

        const employees = allEmployees.filter(x => definition.allowedPositions.findIndex(p => p === x.position.toString()) !== -1);
        const employeeIds: SmzMultiSelectControl<string> = { propertyName: 'employeeIds', type: SmzControlType.MULTI_SELECT, options: employees, defaultValue: [], isVisible: definition.needEmployees, validatorsPreset: { isRequired: definition.needEmployees } };

        const items = documentInstance.items.map(x => ({ id: x.id, name: x.product.name }));
        const itemIds = items.map(x => x.id);
        const doneItemIds: SmzMultiSelectControl<string> = { propertyName: 'doneItemIds', type: SmzControlType.MULTI_SELECT, options: items, defaultValue: itemIds, isVisible: true, validatorsPreset: { isRequired: false } };

        const hasUndoneItems: SmzCheckBoxControl = { propertyName: 'hasUndoneItems', type: SmzControlType.CHECKBOX, defaultValue: false, validatorsPreset: { isRequired: true } };

        // const undoneItemIds: SmzMultiSelectControl<string> = { propertyName: 'undoneItemIds', type: SmzControlType.MULTI_SELECT, options: items, defaultValue: [], isVisible: true, validatorsPreset: { isRequired: false } };

        const file: SmzFileControl = { propertyName: 'file', type: SmzControlType.FILE, isVisible: definition.needDigitalCopy, validatorsPreset: { isRequired: definition.needDigitalCopy } };

        const form: SmzForm<any> = {
            groups: [
                {
                    name: '', showName: false, children: [
                        instanceId, finishDate, employeeIds, doneItemIds, hasUndoneItems, file
                    ]
                }
            ]
        };

        this.dialogs.open({
            title: `Concluir ${documentInstance.definition.name}`,
            features: [
                { type: 'form', data: form }
            ],
            callbacks: {
                onConfirm: (data: any) =>
                {
                    console.log('DocumentClosureRequestBody', data);
                }
            }
        });
    }

}