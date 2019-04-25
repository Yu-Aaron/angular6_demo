import {NgModule} from '@angular/core';
import {SecurityauditRoutingModule} from './securityaudit-routing.module';
import {SharedModule} from '../../shared/shared.module';
import {AuthGuard} from '../../shared/AuthGuard';

import {IncidentauditComponent} from './incidentaudit/incidentaudit.component';
import {FlowauditComponent} from './flowaudit/flowaudit.component';
import {ProtocolauditComponent} from './protocolaudit/protocolaudit.component';
import {LogauditComponent} from './logaudit/logaudit.component';
import {ReportauditComponent} from './reportaudit/reportaudit.component';
import {FilterTableComponent} from '../../common/component/filter-table/filter-table.component';
import {ReportdetailComponent} from './reportaudit/reportdetail/reportdetail.component';
import {IncidentAnalysisComponent} from './incidentaudit/incident-analysis/incident-analysis.component';
import {IncidentDetailComponent} from './incidentaudit/incident-detail/incident-detail.component';
import {DetailPanelComponent} from './logaudit/detail-panel/detail-panel.component';
import {FlowDetailComponent} from './flowaudit/flow-detail/flow-detail.component';

@NgModule({
    declarations: [
        IncidentauditComponent,
        FlowauditComponent,
        ProtocolauditComponent,
        LogauditComponent,
        ReportauditComponent,
        ReportdetailComponent,
        IncidentAnalysisComponent,
        IncidentDetailComponent,
        DetailPanelComponent,
        FlowDetailComponent,
    ],
    imports: [
        SharedModule,
        SecurityauditRoutingModule,
    ],
    providers: [
        AuthGuard,
        FilterTableComponent
    ]
})
export class SecurityauditModule {
}
