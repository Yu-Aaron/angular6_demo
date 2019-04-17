import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AssetRoutingModule } from './asset-routing.module';
import { TopologyComponent } from './topology/topology.component';
import { FactorydeviceComponent } from './factorydevice/factorydevice.component';
import { NetworkdeviceComponent } from './networkdevice/networkdevice.component';
import { AuthGuard } from 'src/app/shared/AuthGuard';

@NgModule({
  declarations: [TopologyComponent, FactorydeviceComponent, NetworkdeviceComponent],
  imports: [
    CommonModule,
    AssetRoutingModule
  ],
  providers: [AuthGuard]
})
export class AssetModule { }
