import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MonitorRoutingModule} from './monitor-routing.module';

import {OverviewComponent} from './overview/overview.component';
import {AuthGuard} from '../../shared/AuthGuard';

@NgModule({
    imports: [
        CommonModule,
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
