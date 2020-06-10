import { Directive, ElementRef, AfterViewInit, HostListener, Input } from '@angular/core';

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[enterListener]'
})
export class EnterListenerDirective
{
    @Input('enterListener') public enterListener: boolean = false;

    constructor(private el: ElementRef)
    {
    }

    @HostListener('window:keydown', ['$event'])
    public handleKeyboardEvent(event: KeyboardEvent)
    {
        if (this.enterListener)
        {
            if (!this.el.nativeElement.disabled && event.keyCode === 13)
            {
                this.el.nativeElement.dispatchEvent(new Event('click'));
            }
        }

    }

}
