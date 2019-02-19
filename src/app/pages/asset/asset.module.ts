import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssetRoutingModule } from './asset-routing.module';
import { SharedModule } from '../../shared/shared.module';

import {FactorydeviceComponent} from './factorydevice/factorydevice.component';
import {NetworkdeviceComponent} from './networkdevice/networkdevice.component';
import {SecuritydeviceComponent} from './securitydevice/securitydevice.component';
import {TopologyComponent} from './topology/topology.component';
import {AuthGuard} from '../../shared/AuthGuard';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {DeviceModelPipe} from '../../common/pipe/deviceModel.pipe';
import {NewdeviceComponent} from './factorydevice/newdevice.component';
import {ViewdeviceComponent} from "./factorydevice/viewDeviceDetail.component";
import {FormsModule} from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        AssetRoutingModule,
        SharedModule,
        NgZorroAntdModule,
        FormsModule
    ],
    entryComponents: [
        NewdeviceComponent,
        ViewdeviceComponent,
    ],
    declarations: [
        FactorydeviceComponent,
        NetworkdeviceComponent,
        SecuritydeviceComponent,
        TopologyComponent,
        DeviceModelPipe,
        NewdeviceComponent,
        ViewdeviceComponent,
    ],
    providers: [
        AuthGuard,
        DeviceModelPipe,
    ]
})
export class AssetModule {
}
