import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { AsideComponent } from '../common/component/aside/aside.component';
import { LeftMenuComponent } from '../common/component/left-menu/left-menu.component';
import { RightContentComponent } from '../common/component/right-content/right-content.component';
import { HomepageComponent } from './home/homepage/homepage.component';

import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { InlineStylePipe } from '../common/pipe/inlineStyle.pipe';
import { TransformTitlePipe} from '../common/pipe/transformTitle.pipe';


@NgModule({
    imports: [
        PagesRoutingModule,
        SharedModule,
    ],
    declarations: [
        PagesComponent,
        AsideComponent,
        LeftMenuComponent,
        RightContentComponent,
        HomepageComponent,
        InlineStylePipe,
        TransformTitlePipe
    ],
    exports: [
        PagesComponent,
        AsideComponent,
        LeftMenuComponent,
        RightContentComponent,
        HomepageComponent
    ]
})
export class PagesModule {
}
