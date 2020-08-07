import { Selector, createSelector } from '@ngxs/store';
import { FaqsDbState } from './faqs.state';
import cloneDeep from 'lodash-es/cloneDeep';
import { DbData, FaqDetails } from '../models/faqs';

// @dynamic
export class FaqsDbSelector
{
    @Selector([FaqsDbState])
    public static all(id: string): any
    {
        return createSelector([FaqsDbState], (state: any) =>
        {
            const data = cloneDeep(state.faqs.data[id]);

            return data != null ? data : {
                items: [],
                lastUpdated: new Date()
            } as DbData<FaqDetails[]>;
        });
    }

}
