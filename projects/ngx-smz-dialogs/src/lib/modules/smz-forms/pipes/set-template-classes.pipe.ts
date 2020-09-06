import { Pipe, PipeTransform } from '@angular/core';
import { SmzBreakpoints, SmzResponsive, SmzFormsTemplate } from '../models/templates';

@Pipe({
    name: 'setTemplateClasses',
})
export class SetTemplateClassesPipe implements PipeTransform
{

    public transform(template: SmzFormsTemplate, properties: string[]): string
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
}
