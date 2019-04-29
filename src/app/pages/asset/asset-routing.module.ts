import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from 'src/app/shared/AuthGuard';
import { TopologyComponent } from './topology/topology.component';
import { FactorydeviceComponent } from './factorydevice/factorydevice.component';
import { NetworkdeviceComponent } from './networkdevice/networkdevice.component';
import { DevicedetailComponent } from './networkdevice/devicedetail/devicedetail.component';
import { NewdeviceComponent } from './factorydevice/newdevice/newdevice.component';

const routes: Routes = [
  { path: 'topology', component: TopologyComponent, canActivate: [AuthGuard] },
  { path: 'factorydevice', component: FactorydeviceComponent, canActivate: [AuthGuard] },
  { path: 'factorydevice/:id', component: NewdeviceComponent, canActivate: [AuthGuard] },
  { path: 'networkdevice', component: NetworkdeviceComponent, canActivate: [AuthGuard] },
  { path: 'networkdevice/:id', component: DevicedetailComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/pages/asset/topology' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssetRoutingModule { }
