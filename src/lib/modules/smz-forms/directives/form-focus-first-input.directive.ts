import { Directive, HostListener, ElementRef, AfterViewInit } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormGroup } from '@angular/forms';

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[focusFirstInput]'
})
export class FormFocusFirstInputDirective implements AfterViewInit
{

    constructor(private el: ElementRef)
    {

    }

    public ngAfterViewInit(): void
    {
        const first = this.el.nativeElement.querySelector('input');
        // console.log('invalidControl', invalidControl);

        if (first)
        {
            setTimeout(() => {
                first.focus();
            }, 0);
        }
    }

}
