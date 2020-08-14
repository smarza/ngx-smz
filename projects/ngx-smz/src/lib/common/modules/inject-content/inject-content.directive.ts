import { Directive, ViewContainerRef, Input, ComponentFactoryResolver, AfterContentInit } from '@angular/core';
import { InjectContentService } from './inject-content.service';
import { InjectableContentEntity } from './models/inject-content.model';
import { takeWhile } from 'rxjs/operators';
import { FormGroupDialogResponse, FormGroupConfig } from '../../../modules/smz-forms/public-api';
import { FormGroup } from '@angular/forms';

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[appInjectContent]'
})
export class InjectContentDirective implements AfterContentInit
{
    @Input() public appInjectContent: any;
    @Input() public config: FormGroupConfig;
    @Input() public inputs: InjectableContentEntity[];
    @Input() public outputs: string[];
    @Input() public form: FormGroup;
    @Input() public data: () => FormGroupDialogResponse;
    @Input() public componentRef: { componentRef: any };
    public isActive = true;

    constructor(public viewContainerRef: ViewContainerRef, private _componentFactoryResolver: ComponentFactoryResolver, private service: InjectContentService)
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

        if (this.outputs != null)
        {

            this.outputs.forEach(output =>
            {
                (<any>componentRef.instance)[output]
                    .pipe(takeWhile(x => this.isActive))
                    .subscribe(event =>
                    {
                        // console.log('catch event', event);
                        const emit = {};
                        emit[this.appInjectContent.name] = {};
                        emit[this.appInjectContent.name][output] = event;

                        this.config.customBehavior(this.data(), this.config, this.form, emit);
                    });
            });
        }


        if (this.componentRef != null)
        {
            this.componentRef.componentRef = componentRef;
        }

        // console.log('addComp', componentRef);

        this.service.setComponent(componentRef);
    }


    public removeComp(): void
    {
        console.log('.....removeComp');
        this.isActive = false;
        this.viewContainerRef.remove();
    }
}
