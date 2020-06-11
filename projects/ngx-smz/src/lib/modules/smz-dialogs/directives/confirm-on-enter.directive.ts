import { Directive, ElementRef, AfterViewInit, HostListener, Input } from '@angular/core';

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[confirmOnEnter]'
})
export class ConfirmOnEnterDirective
{
    @Input('confirmOnEnter') public confirmOnEnter: boolean = false;

    constructor(private el: ElementRef)
    {
    }

    @HostListener('window:keydown', ['$event'])
    public handleKeyboardEvent(event: KeyboardEvent)
    {
        if (this.confirmOnEnter)
        {
            if (!this.el.nativeElement.disabled && event.keyCode === 13)
            {
                this.el.nativeElement.dispatchEvent(new Event('click'));
            }
        }

    }

}
