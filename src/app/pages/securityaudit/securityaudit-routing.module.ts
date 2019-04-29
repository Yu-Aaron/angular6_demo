import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/shared/AuthGuard';

import { IncidentauditComponent } from './incidentaudit/incidentaudit.component';
import { FlowauditComponent } from './flowaudit/flowaudit.component';
import { ProtocolauditComponent } from './protocolaudit/protocolaudit.component';
import { LogauditComponent } from './logaudit/logaudit.component';
import { ReportauditComponent } from './reportaudit/reportaudit.component';
import { ReportdetailComponent } from './reportaudit/reportdetail/reportdetail.component';
import { IncidentAnalysisComponent} from './incidentaudit/incident-analysis/incident-analysis.component';
import { IncidentDetailComponent} from './incidentaudit/incident-detail/incident-detail.component';
import { DeviceFlowDetailComponent} from './flowaudit/device-flow/device-flow-detail.component';

const routes: Routes = [
  { path: 'incidentaudit', component: IncidentauditComponent, canActivate: [AuthGuard] },
  { path: 'incidentaudit/analysis', component: IncidentAnalysisComponent, canActivate: [AuthGuard] },
  { path: 'incidentaudit/detail/:eventId', component: IncidentDetailComponent, canActivate: [AuthGuard] },
  { path: 'flowaudit', component: FlowauditComponent, canActivate: [AuthGuard] },
  { path: 'flowaudit/icdevicedetail/:deviceId/deviceInfo/:deviceInfo', component: DeviceFlowDetailComponent, canActivate: [AuthGuard] },
  { path: 'protocolaudit', component: ProtocolauditComponent, canActivate: [AuthGuard] },
  { path: 'logaudit', component: LogauditComponent, canActivate: [AuthGuard] },
  { path: 'reportaudit', component: ReportauditComponent, canActivate: [AuthGuard] },
  { path: 'reportaudit/:id', component: ReportdetailComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/pages/securityaudit/incidentaudit' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SecurityauditRoutingModule { }
