import { Component, OnInit, OnDestroy } from '@angular/core';
import { FeaturedCard, SimpleCard } from '../models/featured-card.model';
import { Location } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { takeUntil, filter } from 'rxjs/operators';
import { componentDestroyed } from 'src/app/utils/component-destroyed';
import { CardRouterListenerService } from '../services/card-router-listener.service';
import { ConfirmationDialogComponent } from 'src/app/dialogs/features/confirmation-dialog/confirmation-dialog.component';
import { SampleAComponent } from 'src/app/forms/sample-a/sample-a.component';
import { SampleBComponent } from 'src/app/forms/sample-b/sample-b.component';
import { Linked1Component } from 'src/app/forms/linked-1/linked-1.component';
import { CalendarDemoComponent } from 'src/app/forms/components/calendar/calendar-demo.component';
import { PasswordDemoComponent } from 'src/app/forms/components/password/password-demo.component';
import { SwitchDemoComponent } from 'src/app/forms/components/switch/switch-demo.component';
import { NumberDemoComponent } from 'src/app/forms/components/number/number-demo.component';
import { TextAreaDemoComponent } from 'src/app/forms/components/text-area/text-area-demo.component';
import { ColorPickerDemoComponent } from 'src/app/forms/components/color-picker/color-picker-demo.component';
import { TextMaskDemoComponent } from 'src/app/forms/components/text-mask/text-mask-demo.component';
import { FileDemoComponent } from 'src/app/forms/components/file/file-demo.component';
import { SmzForms, SmzFileControl, SmzControlType } from 'ngx-smz-dialogs';
import { RadioDemoComponent } from 'src/app/forms/components/radio/radio-demo.component';
import { CheckBoxDemoComponent } from 'src/app/forms/components/check-box/check-box-demo.component';
import { CheckBoxGroupDemoComponent } from 'src/app/forms/components/check-box-group/check-box-group-demo.component';


@Component({
    selector: 'demo-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy
{
    public cards: SimpleCard[] = [];
    constructor(private router: Router, private location: Location, private cardRouterListener: CardRouterListenerService)
    {
        this.setupFormCards();
        this.setupRouterListeners();
    }

    ngOnInit(): void
    {

    }

    public setupRouterListeners(): void
    {
        this.router.events
            .pipe(
                filter(event => event instanceof NavigationEnd),
                takeUntil(componentDestroyed(this))
            )
            .subscribe(events =>
            {

                if (this.location.path() !== '')
                {
                    const url = this.location.path();
                    this.cardRouterListener.update(url);
                } else
                {
                    this.cardRouterListener.update('');
                }
            });

    }

    public setupFormCards(): void
    {

        this.cards.push(
            { module: 'Forms: Calendar Demo', data: { component: CalendarDemoComponent, code: `` } },
            { module: 'Forms: Password Demo', data: { component: PasswordDemoComponent, code: `` } },
            { module: 'Forms: Switch Demo', data: { component: SwitchDemoComponent, code: `` } },
            { module: 'Forms: Number Demo', data: { component: NumberDemoComponent, code: `` } },
            { module: 'Forms: TextArea Demo', data: { component: TextAreaDemoComponent, code: `` } },
            { module: 'Forms: ColorPicker Demo', data: { component: ColorPickerDemoComponent, code: `` } },
            { module: 'Forms: Text Mask Demo', data: { component: TextMaskDemoComponent, code: `` } },
            { module: 'Forms: File Demo', data: { component: FileDemoComponent, code: `` } },
            { module: 'Forms: Radio Demo', data: { component: RadioDemoComponent, code: `` } },
            { module: 'Forms: Checkbox Demo', data: { component: CheckBoxDemoComponent, code: `` } },
            { module: 'Forms: Checkbox Group Demo', data: { component: CheckBoxGroupDemoComponent, code: `` } },
        );
    }

    ngOnDestroy(): void
    {
        this.cardRouterListener.update('');
    }

    reset(): void
    {
        this.cardRouterListener.update('');
    }

}
