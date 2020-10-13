import { Injectable } from '@angular/core';
import { SmzDialogsConfig } from '../../smz-dialogs/smz-dialogs.config';
import { BehaviorSubject } from 'rxjs';
import { SmzCheckBoxControl, SmzControlTypes } from '../../smz-forms/models/control-types';
import { ComponentData } from '../../../common/modules/inject-content/models/injectable.model';

@Injectable({
    providedIn: 'root'
})
export class SmzDialogsVisibilityService
{

    public dependsOn: { [ key: string ]: { observers: string[], value: any } };
    public observers: { [ key: string ]: { component: ComponentData; visibility$: BehaviorSubject<{ state: boolean }> } };

    constructor(public configService: SmzDialogsConfig)
    {
        this.clear();
    }

    public registryObserver(component: ComponentData): void
    {
        const componentId = `${component.componentId}${component.component.name}`;
        this.observers[componentId] = { component, visibility$: new BehaviorSubject<{ state: boolean }>({ state: false }) };
        const dependsOn = `${component.visibilityDependsOn.formId}${component.visibilityDependsOn.propertyName}`;

        const data = this.dependsOn[dependsOn];

        if (data == null)
        {
            this.dependsOn[dependsOn] = { observers: [componentId], value: [] };
        }
        else
        {
            this.dependsOn[dependsOn].observers.push(componentId);
        }
    }

    public registryDependsOnData(input: SmzCheckBoxControl, formId: string): void
    {
        // console.log('registryDependsOnData input', input);
        const dependsOn = formId + input.propertyName;
        const data = this.dependsOn[dependsOn];

        if (data == null)
        {
            this.dependsOn[dependsOn] = { observers: [], value: [] };
        }
    }

    public setValue(input: SmzCheckBoxControl, formId: string, onChangeDropdownEvent: { originalEvent: any, checked: any }): void
    {
        // console.log('setValue', onChangeDropdownEvent);
        const dependsOn = formId + input.propertyName;
        const data = this.dependsOn[dependsOn];

        if (data == null)
        {
            this.dependsOn[dependsOn] = { observers: [], value: onChangeDropdownEvent.checked };
        }
        else
        {
            this.dependsOn[dependsOn].value = onChangeDropdownEvent.checked;
        }

        this.emitToObservers(this.dependsOn[dependsOn].observers, onChangeDropdownEvent.checked);
    }

    private emitToObservers(observers: string[], value: any): void
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
                this.observers[observer].visibility$.next({ state: value === true });
            }
        }
    }

    public clear(): void
    {
        this.dependsOn = {};
        this.observers = {};
    }

}
