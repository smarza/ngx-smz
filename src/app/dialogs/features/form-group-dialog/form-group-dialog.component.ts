import { Component, OnInit } from '@angular/core';
import { SmzDialogsService, SmzDialog, SmzControlType, SmzDropDownControl, SmzLinkedDropDownControl } from 'ngx-smz-dialogs';
import { STATES } from 'src/app/forms/data/linked-data';
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
                onConfirm: (data) =>
                {
                    console.log('onConfirm 2', data);
                },
                onCancel: () => { console.log('onCancel 2') },
            },
        };

        this.dialogs.open(dialog);
    }

    public show3(): void
    {
        const states = STATES.map(x => ({ id: x.id, name: x.name }));
        const parent: SmzDropDownControl<string> = {
            propertyName: 'parent1', type: SmzControlType.DROPDOWN, name: 'State',
            defaultValue: STATES[0].id, showFilter: true, options: states,
            template: { extraSmall: { row: 'col-12' } }
        };

        const linkedOptions1 = STATES.map(x => ({ parentId: x.id, data: x.cities.map(c => ({ id: c, name: c })) }));
        const linked1: SmzLinkedDropDownControl<string> = {
            propertyName: 'linked1', type: SmzControlType.LINKED_DROPDOWN, name: 'City',
            defaultValue: '', dependsOn: { propertyName: 'parent1' }, showFilter: true, options: linkedOptions1,
            template: { extraSmall: { row: 'col-6' } }
        };

        this.dialogs.open({
            title: 'Criar Frete',
            features: [{
                type: 'form', data:
                {
                    behaviors: { flattenResponse: true, avoidFocusOnLoad: true },
                    groups: [
                        {
                            name: 'Parent', showName: true,
                            children: [parent],
                            template: { extraSmall: { row: 'col-12' } }
                        },
                        {
                            name: 'Single Dependency', showName: true,
                            children: [linked1],
                            template: { extraSmall: { row: 'col-12' } }
                        }
                    ],
                }
            }],
            functions: {
                onConfirm: (data: any) =>
                {

                }
            }
        });


    }


}