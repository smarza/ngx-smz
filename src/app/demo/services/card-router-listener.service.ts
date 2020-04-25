import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class CardRouterListenerService
{
    public currentRouter = '';

    constructor() { }

    public update(newRouter: string): void
    {
        this.currentRouter = newRouter;
    }
}
