import { Component, OnInit, Input } from '@angular/core';
import { FeaturedCard } from '../models/featured-card.model';
import { CardRouterListenerService } from '../services/card-router-listener.service';

@Component({
    selector: 'demo-featured-card',
    templateUrl: './featured-card.component.html',
    styleUrls: ['./featured-card.component.scss']
})
export class FeaturedCardComponent implements OnInit
{
    @Input() public data: FeaturedCard;
    public showRouter = false;
    public repositoryLogo = 'assets/img/GitHub_Logo.png';
    constructor(public routerListener: CardRouterListenerService) { }

    ngOnInit(): void
    {
    }

}
