import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AssetRoutingModule } from './asset-routing.module';
import { TopologyComponent } from './topology/topology.component';
import { FactorydeviceComponent } from './factorydevice/factorydevice.component';
import { NetworkdeviceComponent } from './networkdevice/networkdevice.component';
import { IsActive } from '../../share/IsActive';

@NgModule({
    declarations: [TopologyComponent, FactorydeviceComponent, NetworkdeviceComponent],
    imports: [
        CommonModule,
        AssetRoutingModule
    ],
    providers: [
        IsActive
    ]
})
export class AssetModule { }
