import { Component, OnInit, OnDestroy } from '@angular/core';
import { FeaturedCard } from '../models/featured-card.model';
import { Location } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { takeUntil, filter } from 'rxjs/operators';
import { componentDestroyed } from 'src/app/utils/component-destroyed';
import { CardRouterListenerService } from '../services/card-router-listener.service';
import { ConfirmationDialogComponent } from 'src/app/dialogs/features/confirmation-dialog/confirmation-dialog.component';

@Component({
    selector: 'demo-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy
{

    public cards: FeaturedCard[] = [];
    constructor(private router: Router, private location: Location, private cardRouterListener: CardRouterListenerService)
    {
        this.setupCards();
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

    public setupCards(): void
    {
        const confirmation: FeaturedCard = {
            image: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/154571/bla.jpg',
            module: 'Dialogs',
            title: 'Confirmation Dialog',
            moduleLink: '',
            demoLink: '/dialogs/confirmation',
            description: 'Create nice and easy Confirmation Dialogs.',
            method: `
            showConfirmation(
                '',
                () => { }
            );
            `,
            data: {
                component: ConfirmationDialogComponent,
                code: `.ui-table table {
                    border-collapse:collapse;
                    width: 100%;
                    table-layout: fixed;
                }`
            }
        };

        const component: FeaturedCard = {
            image: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/154571/bla.jpg',
            module: 'Dialogs',
            title: 'Injected Component Dialog',
            moduleLink: '#',
            demoLink: '/dialogs/component',
            description: 'Create nice and easy Confirmation Dialogs.',
            method: ``,
            data: {
                component: ConfirmationDialogComponent,
                code: `.ui-table table {
                    border-collapse:collapse;
                    width: 100%;
                    table-layout: fixed;
                }`
            }
        };

        const formGroup: FeaturedCard = {
            image: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/154571/bla.jpg',
            module: 'Dialogs',
            title: 'Form Group Dialog',
            moduleLink: '#',
            demoLink: '/dialogs/form-group',
            description: 'Create nice and easy Confirmation Dialogs.',
            method: ``,
            data: {
                component: ConfirmationDialogComponent,
                code: `.ui-table table {
                    border-collapse:collapse;
                    width: 100%;
                    table-layout: fixed;
                }`
            }
        };

        const message: FeaturedCard = {
            image: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/154571/bla.jpg',
            module: 'Dialogs',
            title: 'Message Dialog',
            moduleLink: '#',
            demoLink: '/dialogs/message',
            description: 'Create nice and easy Confirmation Dialogs.',
            method: ``,
            data: {
                component: ConfirmationDialogComponent,
                code: `.ui-table table {
                    border-collapse:collapse;
                    width: 100%;
                    table-layout: fixed;
                }`
            }
        };

        const multiple: FeaturedCard = {
            image: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/154571/bla.jpg',
            module: 'Dialogs',
            title: 'Multiple Dialog',
            moduleLink: '#',
            demoLink: '/dialogs/multiple',
            description: 'Create nice and easy Confirmation Dialogs.',
            method: ``,
            data: {
                component: ConfirmationDialogComponent,
                code: `.ui-table table {
                    border-collapse:collapse;
                    width: 100%;
                    table-layout: fixed;
                }`
            }
        };

        this.cards.push(confirmation, component, formGroup, message, multiple);
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
