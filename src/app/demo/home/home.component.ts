import { Component, OnInit } from '@angular/core';
import { FeaturedCard } from '../models/featured-card.model';

@Component({
    selector: 'demo-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit
{

    public cards: FeaturedCard[] = [];
    constructor()
    {
        this.setupCards();
    }

    ngOnInit(): void
    {
    }

    public setupCards(): void
    {
        const confirmation: FeaturedCard = {
            image: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/154571/bla.jpg',
            module: 'Dialogs',
            title: 'Confirmation Dialog',
            moduleLink: '#',
            demoLink: '#',
            description: 'Create nice and easy Confirmation Dialogs.',
            code: `.ui-table table {
                border-collapse:collapse;
                width: 100%;
                table-layout: fixed;
            }`
        };

        const component: FeaturedCard = {
            image: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/154571/bla.jpg',
            module: 'Dialogs',
            title: 'Injected Component Dialog',
            moduleLink: '#',
            demoLink: '#',
            description: 'Create nice and easy Confirmation Dialogs.',
            code: `.ui-table table {
                border-collapse:collapse;
                width: 100%;
                table-layout: fixed;
            }`
        };

        const formGroup: FeaturedCard = {
            image: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/154571/bla.jpg',
            module: 'Dialogs',
            title: 'Form Group Dialog',
            moduleLink: '#',
            demoLink: '#',
            description: 'Create nice and easy Confirmation Dialogs.',
            code: `.ui-table table {
                border-collapse:collapse;
                width: 100%;
                table-layout: fixed;
            }`
        };

        const message: FeaturedCard = {
            image: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/154571/bla.jpg',
            module: 'Dialogs',
            title: 'Message Dialog',
            moduleLink: '#',
            demoLink: '#',
            description: 'Create nice and easy Confirmation Dialogs.',
            code: `.ui-table table {
                border-collapse:collapse;
                width: 100%;
                table-layout: fixed;
            }`
        };

        const multiple: FeaturedCard = {
            image: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/154571/bla.jpg',
            module: 'Dialogs',
            title: 'Multiple Dialog',
            moduleLink: '#',
            demoLink: '#',
            description: 'Create nice and easy Confirmation Dialogs.',
            code: `.ui-table table {
                border-collapse:collapse;
                width: 100%;
                table-layout: fixed;
            }`
        };

        this.cards.push(confirmation, component, formGroup, message, multiple);
    }
}
