import {NgModule} from '@angular/core';

import {SharedModule} from '../shared/shared.module';
import {PagesRoutingModule} from './pages-routing.module';
import {PagesComponent} from './pages.component';
import {HeaderComponent} from '../layout/header/header.component';
import {FooterComponent} from '../layout/footer/footer.component';
import {AsideComponent} from '../layout/aside/aside.component';
import {ContentComponent} from '../layout/content/content.component';

@NgModule({
    imports: [
        SharedModule,
        PagesRoutingModule
    ],
    declarations: [
        PagesComponent,
        AsideComponent,
        HeaderComponent,
        ContentComponent,
        FooterComponent
    ],
    exports: [
        PagesComponent,
        AsideComponent,
        HeaderComponent,
        ContentComponent,
        FooterComponent
    ]
})
export class PagesModule {
}
