import { Component, OnInit, Input } from '@angular/core';
import { FeaturedCard, SimpleCard } from '../models/featured-card.model';
import { CardRouterListenerService } from '../services/card-router-listener.service';
import { ComponentData } from 'ngx-smz-dialogs';

@Component({
    selector: 'demo-simple-card',
    templateUrl: './simple-card.component.html',
    styleUrls: ['./simple-card.component.scss']
})
export class SimpleCardComponent implements OnInit
{
    @Input() public data: SimpleCard;

    constructor() { }

    ngOnInit(): void
    {
    }

}
