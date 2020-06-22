import { InjectableContentEntity } from './inject-content.model';

export interface ComponentData
{
    component: any;
    inputs: InjectableContentEntity[];
    outputs?: string[];
    ref?: { componentRef: any };
}
