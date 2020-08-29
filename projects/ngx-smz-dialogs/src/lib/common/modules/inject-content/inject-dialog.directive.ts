import { Directive, ViewContainerRef, Input, ComponentFactoryResolver, AfterContentInit, EventEmitter } from '@angular/core';
import { InjectContentService } from './inject-content.service';
import { DialogData } from '../../../modules/smz-dialogs/models/dialogs.models';
import { takeWhile } from 'rxjs/operators';

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[appInjectDialog]'
})
export class InjectDialogDirective implements AfterContentInit
{
    @Input() public appInjectDialog: DialogData;

    constructor(public viewContainerRef: ViewContainerRef, private _componentFactoryResolver: ComponentFactoryResolver, private service: InjectContentService)
    {

    }


    public ngAfterContentInit(): void
    {

        if (this.appInjectDialog != null)
        {
            setTimeout(() =>
            {
                this.addComp();
            }, 0);
        }
    }

    public addComp(): void
    {

        const componentFactory = this._componentFactoryResolver.resolveComponentFactory(this.appInjectDialog.config.component.component);
        const componentRef = this.viewContainerRef.createComponent(componentFactory);

        this.appInjectDialog.config.component.inputs.forEach(i =>
        {
            (<any>componentRef.instance)[i.input] = i.data;
        });

        this.appInjectDialog.ref.componentRef = componentRef as any;

        // console.log('component', this.appInjectContent.ref.componentRef);

        const instance = componentRef.instance;
        this.appInjectDialog.listener$.next({ instance: instance });

        Object.entries(instance).forEach(([key, value]) =>
        {
            // console.log(key, value);
            if (value instanceof EventEmitter)
            {
                // console.log('instanceof EventEmitter', key);
                value
                    .pipe(takeWhile(x => this.appInjectDialog.isDialogActive))
                    .subscribe((event) =>
                    {
                        const response = [];
                        response[key] = event;

                        this.appInjectDialog.listener$.next({ ...response });
                    });
            }
        });
    }


    public removeComp(): void
    {
        this.viewContainerRef.remove();
    }
}
