import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';

import {SecincidentComponent} from './secincident/secincident.component';
import {FlowComponent} from './flow/flow.component';
import {NetworksessionComponent} from './networksession/networksession.component';
import {ProtocolComponent} from './protocol/protocol.component';
import {SecincidentDetailsComponent} from './secincident/secincident-details/secincident-details.component';
import {AuthGuard} from '../../shared/AuthGuard';

const routes: Routes = [
    {path: 'secincident', component: SecincidentComponent, canActivate: [AuthGuard]},
    {path: 'flow', component: FlowComponent, canActivate: [AuthGuard]},
    {path: 'networksession', component: NetworksessionComponent, canActivate: [AuthGuard]},
    {path: 'protocol', component: ProtocolComponent, canActivate: [AuthGuard]},
    {path: 'secincident/:eventId', component: SecincidentDetailsComponent, canActivate: [AuthGuard]},
    {path: '', redirectTo: '/pages/security/secincident'}
];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)],
    declarations: []
})

export class SecurityRoutingModule {
}