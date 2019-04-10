import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IsActive } from '../../share/IsActive';

import { FlowauditComponent } from './flowaudit/flowaudit.component';
import { IncidentauditComponent } from './incidentaudit/incidentaudit.component';
import { LogauditComponent } from './logaudit/logaudit.component';
import { ProtocolauditComponent } from './protocolaudit/protocolaudit.component';
import { ReportauditComponent } from './reportaudit/reportaudit.component';

const routes: Routes = [
    {path: 'flowaudit', component: FlowauditComponent, canActivate: [IsActive]},
    {path: 'incidentaudit', component: IncidentauditComponent, canActivate: [IsActive]},
    {path: 'logaudit', component: LogauditComponent, canActivate: [IsActive]},
    {path: 'protocolaudit', component: ProtocolauditComponent, canActivate: [IsActive]},
    {path: 'reportaudit', component: ReportauditComponent, canActivate: [IsActive]},
    {path: '', redirectTo: '/page/securityaudit/flowaudit'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SecurityauditRoutingModule { }
