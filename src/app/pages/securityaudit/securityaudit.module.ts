import {NgModule} from '@angular/core';
import {SecurityauditRoutingModule} from './securityaudit-routing.module';
import {SharedModule} from '../../shared/shared.module';
import {AuthGuard} from '../../shared/AuthGuard';
import {NgxEchartsModule} from 'ngx-echarts';

import {IncidentauditComponent} from './incidentaudit/incidentaudit.component';
import {FlowauditComponent} from './flowaudit/flowaudit.component';
import {ProtocolauditComponent} from './protocolaudit/protocolaudit.component';
import {LogauditComponent} from './logaudit/logaudit.component';
import {ReportauditComponent} from './reportaudit/reportaudit.component';
import {FilterTableComponent} from '../../common/component/filter-table/filter-table.component';

@NgModule({
    declarations: [
        IncidentauditComponent,
        FlowauditComponent,
        ProtocolauditComponent,
        LogauditComponent,
        ReportauditComponent],
    imports: [
        SharedModule,
        SecurityauditRoutingModule,
        NgxEchartsModule
    ],
    providers: [
        AuthGuard,
        FilterTableComponent
    ]
})
export class SecurityauditModule {
}
