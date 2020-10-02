import { InjectableContentEntity, InjectableOutput } from './inject-content.model';

export interface ComponentData
{
    component: any;
    inputs: InjectableContentEntity[];
    outputs?: InjectableOutput[];
    ref?: { componentRef: any };
    visibilityDependsOn?: { propertyName: string, formId: string };
    componentId?: string;
}
