import {NgModule} from '@angular/core';

import {SharedModule} from '../shared/shared.module';
import {PagesRoutingModule} from './pages-routing.module';
import {PagesComponent} from './pages.component';
import {HeaderComponent} from '../layout/header/header.component';
import {FooterComponent} from '../layout/footer/footer.component';
import {NavComponent} from '../layout/nav/nav.component';
import {ContentComponent} from '../layout/content/content.component';
import {TransformTitlePipe} from '../common/pipe/transformTitle.pipe';


@NgModule({
    imports: [
        SharedModule,
        PagesRoutingModule,
    ],
    declarations: [
        PagesComponent,
        NavComponent,
        HeaderComponent,
        ContentComponent,
        FooterComponent,
        TransformTitlePipe,
    ],
    exports: [
        PagesComponent,
        NavComponent,
        HeaderComponent,
        ContentComponent,
        FooterComponent
    ]
})
export class PagesModule {
}
