import { Platform } from '@angular/cdk/platform';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ResponsiveService
{

    public isMobile = false;
    public isDesktop = true;
    constructor(public platform: Platform)
    {
        this.isMobile = Boolean(this.platform.ANDROID || this.platform.IOS);
        this.isDesktop = !this.isMobile;

        // console.log('isDesktop', this.isDesktop);
    }

}
