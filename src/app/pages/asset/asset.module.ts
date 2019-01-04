import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AssetRoutingModule} from './asset-routing.module';

import {FactorydeviceComponent} from './factorydevice/factorydevice.component';
import {NetworkdeviceComponent} from './networkdevice/networkdevice.component';
import {SecuritydeviceComponent} from './securitydevice/securitydevice.component';
import {TopologyComponent} from './topology/topology.component';
import {AuthGuard} from '../../shared/AuthGuard';

@NgModule({
    imports: [
        CommonModule,
        AssetRoutingModule
    ],
    declarations: [
        FactorydeviceComponent,
        NetworkdeviceComponent,
        SecuritydeviceComponent,
        TopologyComponent
    ],
    providers: [
        AuthGuard
    ]
})
export class AssetModule {
}
