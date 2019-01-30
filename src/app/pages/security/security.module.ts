import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SecurityRoutingModule} from './security-routing.module';

import {SecincidentComponent} from './secincident/secincident.component';
import {FlowComponent} from './flow/flow.component';
import {NetworksessionComponent} from './networksession/networksession.component';
import {ProtocolComponent} from './protocol/protocol.component';
import {AuthGuard} from '../../shared/AuthGuard';

import { SharedModule } from '../../shared/shared.module'

@NgModule({
    imports: [
        CommonModule,
        SecurityRoutingModule,SharedModule
    ],
    declarations: [
        SecincidentComponent,
        FlowComponent,
        NetworksessionComponent,
        ProtocolComponent
    ],
    providers: [
        AuthGuard
    ],
})
export class SecurityModule {
}
