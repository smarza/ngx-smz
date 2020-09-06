import { Injectable } from '@angular/core';
import { SmzDialogsConfig } from '../../smz-dialogs/smz-dialogs.config';
import { SmzDropDownControl, SmzLinkedDropDownControl } from '../models/control-types';
import { BehaviorSubject } from 'rxjs';
import { SimpleParentEntity } from '../../../common/models/simple-named-entity';

@Injectable({
    providedIn: 'root'
})
export class SmzFormsDropdownService
{

    public dependsOn: { [ key: string ]: { observers: string[], value: any } };
    public observers: { [ key: string ]: { input: SmzLinkedDropDownControl<any>; options: BehaviorSubject<any> } };

    constructor(public configService: SmzDialogsConfig)
    {
        this.clear();
    }

    public registryObserver(input: SmzLinkedDropDownControl<any>): void
    {
        this.observers[input.propertyName] = { input, options: new BehaviorSubject<any[]>([]) };

        const data = this.dependsOn[input.dependsOn];

        if (data == null)
        {
            this.dependsOn[input.dependsOn] = { observers: [input.propertyName], value: [] };
        }
        else
        {
            this.dependsOn[input.dependsOn].observers.push(input.propertyName);
        }
    }


    public registryDependsOnData(input: SmzDropDownControl<any>): void
    {
        const data = this.dependsOn[input.propertyName];

        if (data == null)
        {
            this.dependsOn[input.propertyName] = { observers: [], value: [] };
        }
    }

    public setValue(input: SmzDropDownControl<any>, onChangeDropdownEvent: { originalEvent: any, value: any }): void
    {
        const data = this.dependsOn[input.propertyName];

        if (data == null)
        {
            this.dependsOn[input.propertyName] = { observers: [], value: onChangeDropdownEvent.value };
        }
        else
        {
            this.dependsOn[input.propertyName].value = onChangeDropdownEvent.value;
        }

        this.emitToObservers(this.dependsOn[input.propertyName].observers, onChangeDropdownEvent.value);
    }

    public emitToObservers(observers: string[], value: any): void
    {
        for (let observer of observers)
        {
            const match = this.observers[observer];

            if (match == null)
            {
                console.log('Observer não encontrado.');
            }
            else
            {
                const options = match.input.options;
                const newOptionsIndex = options.findIndex(x => x.parentId === value.id);

                if (newOptionsIndex > -1)
                {
                    this.observers[observer].options.next(options[newOptionsIndex].data);
                }
                else
                {
                    this.observers[observer].options.next([]);
                    console.log('Lista de opções não encontrada.');
                }

                match.input._inputFormControl.setValue('');
            }
        }
    }

    public clear(): void
    {
        this.dependsOn = {};
        this.observers = {};
    }

}
