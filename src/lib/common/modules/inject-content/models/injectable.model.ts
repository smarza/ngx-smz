import { InjectableContentEntity } from './inject-content.model';

export interface ComponentData
{
    component: any;
    inputs: InjectableContentEntity[];
    ref?: { componentRef: any };
}
