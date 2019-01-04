import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';

import {TopologyComponent} from './topology/topology.component';
import {SecuritydeviceComponent} from './securitydevice/securitydevice.component';
import {FactorydeviceComponent} from './factorydevice/factorydevice.component';
import {NetworkdeviceComponent} from './networkdevice/networkdevice.component';
import {AuthGuard} from '../../shared/AuthGuard';

const routes: Routes = [
    {path: 'topology', component: TopologyComponent, canActivate: [AuthGuard]},
    {path: 'securitydevice', component: SecuritydeviceComponent, canActivate: [AuthGuard]},
    {path: 'factorydevice', component: FactorydeviceComponent, canActivate: [AuthGuard]},
    {path: 'networkdevice', component: NetworkdeviceComponent, canActivate: [AuthGuard]},
    {path: '', redirectTo: '/pages/asset/topology'}
];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)],
    declarations: []
})

export class AssetRoutingModule {
}