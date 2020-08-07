import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SmzFaqsComponent } from './featured/faqs/smz-faqs.component';
import { FaqsContentComponent } from './components/faqs-content/faqs-content.component';
import { ButtonModule } from 'primeng/button';
import { AccordionModule } from 'primeng/accordion';
import { InputTextModule } from 'primeng/inputtext';
import { SearchFaqsPipe } from './pipes/search-faqs.pipe';
import { FormsModule } from '@angular/forms';
import { HighlightSearch } from './pipes/highlight.pipe';
import { NgxsModule } from '@ngxs/store';
import { FaqsDbState } from './state/faqs.state';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';
import { SmzFaqsConfig } from './smz-faqs.config';
import { SmzMessagesModule } from '../smz-messages/public-api';
import { SmzFormsModule } from '../smz-forms/public-api';

@NgModule({
    declarations: [
        SmzFaqsComponent,
        FaqsContentComponent,
        SearchFaqsPipe,
        HighlightSearch,
        SafeHtmlPipe
    ],
    imports: [
        CommonModule,
        SmzMessagesModule,
        SmzFormsModule,
        ButtonModule,
        AccordionModule,
        InputTextModule,
        FormsModule,
        NgxsModule.forFeature([FaqsDbState])
    ],
    exports: [
        SmzFaqsComponent
    ],
})
export class SmzFaqsModule {

    public static forRoot(configuration: SmzFaqsConfig): ModuleWithProviders<SmzFaqsModule>{
        // console.log('configuration...', configuration);
        return {
            ngModule: SmzFaqsModule,
            providers: [
                {
                    provide: SmzFaqsConfig,
                    useValue: {...configuration}
                }
            ]
        };
    }
}
