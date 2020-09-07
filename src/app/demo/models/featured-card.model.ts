import { DemoData } from './demo-data.model';

export interface FeaturedCard {
    image: string;
    module: string;
    title: string;
    description: string;
    moduleLink: string;
    demoLink: string;
    method: string;
    data: DemoData;
}

export interface SimpleCard {
    module: string;
    data: DemoData;
}
