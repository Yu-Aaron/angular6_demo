import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SecurityRoutingModule} from './security-routing.module';

import {SecincidentComponent} from './secincident/secincident.component';
import {FlowComponent} from './flow/flow.component';
import {NetworksessionComponent} from './networksession/networksession.component';
import {ProtocolComponent} from './protocol/protocol.component';
import {AuthGuard} from '../../shared/AuthGuard';
import {SharedModule} from '../../shared/shared.module';
import {SecincidentDetailsComponent} from './secincident/secincident-details/secincident-details.component';
import {EventLevelPipe, EventRiskLevelPipe, ToHexPipe, ProtocolDetailPipe} from '../../common/pipe/event-level.pipe';

@NgModule({
    imports: [
        CommonModule,
        SecurityRoutingModule,
        SharedModule
    ],
    declarations: [
        SecincidentComponent,
        FlowComponent,
        NetworksessionComponent,
        ProtocolComponent,
        SecincidentDetailsComponent,
        EventLevelPipe,
        EventRiskLevelPipe,
        ToHexPipe,
        ProtocolDetailPipe,
    ],
    providers: [
        AuthGuard
    ],
})
export class SecurityModule {
}
