import { Injectable, ComponentRef, ComponentFactoryResolver, Type, ApplicationRef, Injector, EmbeddedViewRef } from '@angular/core';
import { DynamicDialogRef, DynamicDialogComponent, DynamicDialogInjector, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { SmzDynamicDialogConfig } from '../models/smz-dialogs';


@Injectable()
export class PrimeDialogService {

    dialogComponentRefMap: Map<DynamicDialogRef, ComponentRef<DynamicDialogComponent>> = new Map();

    constructor(private componentFactoryResolver: ComponentFactoryResolver, private appRef: ApplicationRef, private injector: Injector) {
    }

    public open(componentType: Type<any>, config: SmzDynamicDialogConfig) {
        const dialogRef = this.appendDialogComponentToBody(config);

        this.dialogComponentRefMap.get(dialogRef).instance.childComponentType = componentType;

        return dialogRef;
    }

    private appendDialogComponentToBody(config: SmzDynamicDialogConfig) {
        const map = new WeakMap();
        map.set(SmzDynamicDialogConfig, config);
        map.set(DynamicDialogConfig, config);

        const dialogRef = new DynamicDialogRef();
        map.set(DynamicDialogRef, dialogRef);

        const sub = dialogRef.onClose.subscribe(() => {
            this.dialogComponentRefMap.get(dialogRef).instance.close();
        });

        const destroySub = dialogRef.onDestroy.subscribe(() => {
            this.removeDialogComponentFromBody(dialogRef);
            destroySub.unsubscribe();
            sub.unsubscribe();
        });

        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(DynamicDialogComponent);
        const componentRef = componentFactory.create(new DynamicDialogInjector(this.injector, map));

        this.appRef.attachView(componentRef.hostView);

        const domElem = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
        document.body.appendChild(domElem);

        this.dialogComponentRefMap.set(dialogRef, componentRef);

        return dialogRef;
    }

    private removeDialogComponentFromBody(dialogRef: DynamicDialogRef) {
        if (!dialogRef || !this.dialogComponentRefMap.has(dialogRef)) {
            return;
        }

        const dialogComponentRef = this.dialogComponentRefMap.get(dialogRef);
        this.appRef.detachView(dialogComponentRef.hostView);
        dialogComponentRef.destroy();
        this.dialogComponentRefMap.delete(dialogRef);
    }
}

