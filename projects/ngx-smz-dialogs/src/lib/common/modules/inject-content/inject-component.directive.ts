import { Directive, ViewContainerRef, Input, ComponentFactoryResolver, AfterContentInit } from '@angular/core';
import { InjectContentService } from './inject-content.service';
import { InjectableContentEntity } from './models/inject-content.model';
import { takeWhile } from 'rxjs/operators';
import { FormGroup } from '@angular/forms';

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[appInjectComponent]'
})
export class InjectComponentDirective implements AfterContentInit
{
    @Input() public appInjectComponent: any;
    @Input() public inputs: InjectableContentEntity[] = [];

    constructor(public viewContainerRef: ViewContainerRef, private _componentFactoryResolver: ComponentFactoryResolver)
    {

    }

    public ngAfterContentInit(): void
    {

        if (this.appInjectComponent != null)
        {
            setTimeout(() =>
            {
                this.addComp();
            }, 0);
        }
    }

    public addComp(): void
    {
        const componentFactory = this._componentFactoryResolver.resolveComponentFactory(this.appInjectComponent);
        const componentRef = this.viewContainerRef.createComponent(componentFactory);

        this.inputs.forEach(i =>
        {
            (<any>componentRef.instance)[i.input] = i.data;
        });

    }

}
