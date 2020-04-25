import { Component, OnInit, Input } from '@angular/core';
import { FeaturedCard } from '../models/featured-card.model';

@Component({
    selector: 'demo-featured-card',
    templateUrl: './featured-card.component.html',
    styleUrls: ['./featured-card.component.scss']
})
export class FeaturedCardComponent implements OnInit
{
    @Input() public data: FeaturedCard;

    public repositoryLogo = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/154571/Official.png';
    constructor() { }

    ngOnInit(): void
    {
    }

}
