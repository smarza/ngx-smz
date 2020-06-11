import { Directive, ElementRef, AfterViewInit, Input, Renderer2, HostBinding, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[maximizeOnOpen]'
})
export class MaximizeOnOpenDirective implements AfterViewInit, OnChanges
{
    @Input('maximizeOnOpen') public maximizeOnOpen: boolean = false;

    constructor(private el: ElementRef, private renderer: Renderer2)
    {
    }

    public ngOnChanges(changes: SimpleChanges)
    {
        if (changes.maximizeOnOpen && changes.maximizeOnOpen.currentValue)
        {
            console.log('input changed - maximize On', this.el);

            setTimeout(() => {
                // const widget = document.getElementsByClassName('ui-dialog-content');
                const content = document.querySelectorAll('.ui-dialog-content');
                console.log('content', content);

                setTimeout(() =>
                {
                    this.renderer.addClass(content, 'ui-dialog-maximized');
                    // this.renderer.addClass(content, 'ui-dialog-maximized');
                }, 0);
            }, 0);
        }
    }

    public ngAfterViewInit(): void
    {
        console.log('ngAfterViewInit');
        // if (this.maximizeOnOpen)
        // {
        //     const widget = this.el.nativeElement.querySelector('.ui-widget-content');
        //     // const content = this.el.nativeElement.querySelector('.ui-dialog-content');
        //     console.log('widget', widget);

        //     if (widget)
        //     {
        //         setTimeout(() => {
        //             this.renderer.addClass(widget, 'ui-dialog-maximized');
        //             // this.renderer.addClass(content, 'ui-dialog-maximized');
        //         }, 0);
        //     }
        // }
    }

}
