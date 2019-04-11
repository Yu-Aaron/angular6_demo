import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SecurityauditRoutingModule } from './securityaudit-routing.module';
import { IncidentauditComponent } from './incidentaudit/incidentaudit.component';
import { ProtocolauditComponent } from './protocolaudit/protocolaudit.component';
import { FlowauditComponent } from './flowaudit/flowaudit.component';
import { LogauditComponent } from './logaudit/logaudit.component';
import { ReportauditComponent } from './reportaudit/reportaudit.component';
import { IsActive } from '../../share/IsActive';

@NgModule({
    declarations: [
        IncidentauditComponent,
        ProtocolauditComponent,
        FlowauditComponent,
        LogauditComponent,
        ReportauditComponent],
    imports: [
        CommonModule,
        SecurityauditRoutingModule
    ],
    providers: [
        IsActive
    ]
})
export class SecurityauditModule { }
