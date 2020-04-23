import { Directive, ViewContainerRef, Input, ComponentFactoryResolver, OnInit, AfterContentInit } from '@angular/core';
import { InjectContentService } from './inject-content.service';
import { InjectableContentEntity } from './models/inject-content.model';

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[appInjectContent]'
})
export class InjectContentDirective implements OnInit, AfterContentInit
{
    @Input() public appInjectContent: any;
    @Input() public inputs: InjectableContentEntity[];
    @Input() public data: any;
    @Input() public componentRef: { componentRef: any };

    constructor(public viewContainerRef: ViewContainerRef, private _componentFactoryResolver: ComponentFactoryResolver, private service: InjectContentService)
    {

    }

    public ngOnInit(): void
    {

    }

    public ngAfterContentInit(): void
    {

        if (this.appInjectContent != null)
        {
            setTimeout(() =>
            {
                this.addComp();
            }, 0);
        }
    }

    public addComp(): void
    {

        const componentFactory = this._componentFactoryResolver.resolveComponentFactory(this.appInjectContent);
        const componentRef = this.viewContainerRef.createComponent(componentFactory);

        this.inputs.forEach(i =>
        {
            (<any>componentRef.instance)[i.input] = i.data;
        });

        if (this.componentRef != null)
        {
            this.componentRef.componentRef = componentRef;
        }

        // console.log('addComp', componentRef);

        this.service.setComponent(componentRef);
    }


    public removeComp(): void
    {
        this.viewContainerRef.remove();
    }
}
