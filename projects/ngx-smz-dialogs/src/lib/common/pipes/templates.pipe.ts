import { Pipe, PipeTransform, NgModule } from '@angular/core';
import { SmzTemplate, SmzBreakpoints } from '../models/templates';

@Pipe({
    name: 'setTemplateClasses',
})
export class SetTemplateClassesPipe implements PipeTransform
{

    public transform(template: SmzTemplate, properties: string[]): string
    {
        return SetTemplateClasses(template, properties);
    }
}

@NgModule({
  declarations: [SetTemplateClassesPipe],
  exports: [SetTemplateClassesPipe],
})
export class SmzTemplatesPipeModule {}


export function SetTemplateClasses(template: SmzTemplate, properties: string[]): string
{
    let response = '';

    for (let tag of Object.keys(template))
    {
        const prefix = `${SmzBreakpoints.Tags[tag]}`;

        for (let property of properties)
        {
            if (template[tag][property] != null)
            {
                const position = SmzBreakpoints.ReplacePositions[property];
                const value: string = template[tag][property];
                const newClass = [value.slice(0, position), prefix, value.slice(position)].join('');

                response += ` ${newClass}`
            };
        }

    }

    return response;
}