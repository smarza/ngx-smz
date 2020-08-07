import { Injectable, Pipe, PipeTransform } from '@angular/core';
import { FaqDetails } from '../models/faqs';
import isEmpty from 'lodash-es';
import cloneDeep from 'lodash-es';

@Pipe({
    name: 'searchFaqs'
})

@Injectable()
export class SearchFaqsPipe implements PipeTransform
{
    constructor()
    {

    }
    public transform(items: FaqDetails[], keywords: string): any
    {
        if (isEmpty(keywords)) return cloneDeep(items);

        const words = keywords.split(' ').map(x => x.toLowerCase());

        let filtered = cloneDeep(items);

        for (let word of words.filter(x => !isEmpty(x) && x.length > 2))
        {
            filtered = filtered.filter(x =>
                x.question.toLowerCase().includes(word) ||
                x.answer.toLowerCase().includes(word)
            );
        }

        if (filtered.length === 1)
        {
            filtered[0] = { ...filtered[0], metadata: { selected: true } } as any;
        }

        return cloneDeep(filtered);
    }

}
