import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MonitorRoutingModule} from './monitor-routing.module';
import {NgxEchartsModule } from 'ngx-echarts';

import {OverviewComponent} from './overview/overview.component';
import {AuthGuard} from '../../shared/AuthGuard';
import {NgZorroAntdModule} from 'ng-zorro-antd';

@NgModule({
    imports: [
        CommonModule,
        NgZorroAntdModule,
        NgxEchartsModule,
        MonitorRoutingModule
    ],
    declarations: [
        OverviewComponent
    ],
    providers: [
        AuthGuard
    ]
})
export class MonitorModule {
}
