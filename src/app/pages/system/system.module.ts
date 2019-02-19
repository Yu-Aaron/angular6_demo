import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SystemRoutingModule} from './system-routing.module';

import {BusinessComponent} from './business/business.component';
import {DeviceComponent} from './device/device.component';
import {ConfigComponent} from './config/config.component';
import {UserComponent} from './user/user.component';
import {AuthGuard} from '../../shared/AuthGuard';
import {SharedModule} from '../../shared/shared.module';
import {DeviceModalComponent} from './device/device-modal.component';
import {DevicePipe} from '../../common/pipe/device.pipe';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        SystemRoutingModule
    ],
    declarations: [
        BusinessComponent,
        DeviceComponent,
        ConfigComponent,
        UserComponent,
        DeviceModalComponent,
        DevicePipe,
    ],
    providers: [
        AuthGuard,
    ]
})
export class SystemModule {
}
