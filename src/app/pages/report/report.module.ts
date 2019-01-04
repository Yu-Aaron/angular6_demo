import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReportRoutingModule} from './report-routing.module';

import {StatisticsComponent} from './statistics/statistics.component';
import {AuthGuard} from '../../shared/AuthGuard';

@NgModule({
    imports: [
        CommonModule,
        ReportRoutingModule
    ],
    declarations: [
        StatisticsComponent
    ],
    providers: [
        AuthGuard
    ]
})
export class ReportModule {
}
