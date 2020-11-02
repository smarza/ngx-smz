import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { SimpleNamedEntity } from 'projects/ngx-smz-dialogs/src/lib/common/models/simple-named-entity';
import { Dynamic } from './dynamic.decorator';

@Component({
    selector: 'demo-injectable-on-push',
    templateUrl: './injectable-on-push.component.html',
    styleUrls: ['./injectable-on-push.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class InjectableOnPush
{
    @Input() public color: string;
    @Output() public clicked: EventEmitter<string> = new EventEmitter<string>();

    // Nem precisaria mais usar o decorator dynamic, já que foi colocado dentro da bilbioteca o emarkDirty após troca do valor
    // Deixado aqui apenas como exemplo para outros cenários
    @Input() @Dynamic<InjectableOnPush>() colors: any;

    // Não precisa no Ivy do Angular 9 chamar um callback. Dentro do dynamic.decorator.ts é só usar o emarkDirty
    // @Input() @Dynamic<InjectableOnPush>('onValueChanged') source: SimpleNamedEntity[];
    
    @Input() source: SimpleNamedEntity[];
    @Input() target: SimpleNamedEntity[];

    public isValid: boolean = false;

    constructor(private cdr: ChangeDetectorRef) { }

    // Não precisa no Ivy do Angular 9 chamar um callback. Dentro do dynamic.decorator.ts é só usar o emarkDirty
    // onValueChanged() {
    //     // In order to update the value displayed in the component we still
    //     // need to manually request change detection. Ivy do Angular 9!
    //     console.log('changes');
    //     this.cdr.markForCheck();
    // }

    public test(): void {
        console.log('test' + this.source.map(x => x.name));
    }
}
