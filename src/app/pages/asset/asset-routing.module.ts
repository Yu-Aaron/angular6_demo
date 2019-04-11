import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IsActive} from '../../share/IsActive';
import { FactorydeviceComponent } from './factorydevice/factorydevice.component';
import { NetworkdeviceComponent } from './networkdevice/networkdevice.component';
import { TopologyComponent } from './topology/topology.component'

const routes: Routes = [
    {path: 'topology', component: TopologyComponent, canActivate: [IsActive]},
    {path: 'factorydevice', component: FactorydeviceComponent, canActivate: [IsActive]},
    {path: 'networkdevice', component: NetworkdeviceComponent, canActivate: [IsActive]},
    {path: '', redirectTo: 'topology'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssetRoutingModule { }
