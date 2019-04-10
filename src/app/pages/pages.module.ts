import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { ShareModule } from '../share/share.module';
import { PagesComponent } from './pages.component';
import { HeaderComponent } from '../layout/header/header.component';
import { ContentComponent } from '../layout/content/content.component';
import { FooterComponent } from '../layout/footer/footer.component';
import { SliderComponent } from '../layout/slider/slider.component';
import { MonitorComponent} from './monitor/monitor.component';
import { TransformTitlePipe} from '../common/pipe/transformTitle.pipe';

@NgModule({
    declarations: [
        PagesComponent,
        HeaderComponent,
        ContentComponent,
        FooterComponent,
        SliderComponent,
        MonitorComponent,
        TransformTitlePipe
    ],
    imports: [
        ShareModule,
        CommonModule,
        PagesRoutingModule,
    ],
    exports: [
        PagesComponent,
        HeaderComponent,
        ContentComponent,
        FooterComponent,
        SliderComponent,
        MonitorComponent
    ]
})
export class PagesModule { }
