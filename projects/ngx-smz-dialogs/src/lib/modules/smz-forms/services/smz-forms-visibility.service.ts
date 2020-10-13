import { Injectable } from '@angular/core';
import { SmzDialogsConfig } from '../../smz-dialogs/smz-dialogs.config';
import { SmzCheckBoxControl, SmzControlTypes } from '../models/control-types';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SmzFormsVisibilityService
{

    public dependsOn: { [ key: string ]: { observers: string[], value: any } };
    public observers: { [ key: string ]: { input: SmzControlTypes; options: BehaviorSubject<any> } };

    constructor(public configService: SmzDialogsConfig)
    {
        this.clear();
    }

    public registryObserver(input: SmzControlTypes, formId: string): void
    {
        this.observers[formId + input.propertyName] = { input, options: new BehaviorSubject<any[]>([]) };
        const dependsOn = this.getDependsOnKey(input, formId);

        const data = this.dependsOn[dependsOn];

        if (data == null)
        {
            this.dependsOn[dependsOn] = { observers: [formId + input.propertyName], value: [] };
        }
        else
        {
            this.dependsOn[dependsOn].observers.push(formId + input.propertyName);
        }
    }

    private getDependsOnKey(input: SmzControlTypes, formId: string): string
    {
        // console.log('getDependsOnKey input', input);
        return input.visibilityDependsOn.formId != null ? `${input.visibilityDependsOn.formId}${input.visibilityDependsOn.propertyName}` : `${formId}${input.visibilityDependsOn.propertyName}`;
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
                match.input.isVisible = !match.input.visibilityDependsOn.reversed && value || match.input.visibilityDependsOn.reversed && !value;
            }
        }
    }

    public clear(): void
    {
        this.dependsOn = {};
        this.observers = {};
    }

}
