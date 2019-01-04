import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SystemRoutingModule} from './system-routing.module';

import {BusinessComponent} from './business/business.component';
import {DeviceComponent} from './device/device.component';
import {LoginConfigComponent} from './login-config/login-config.component';
import {UserComponent} from './user/user.component';
import {AuthGuard} from '../../shared/AuthGuard';

@NgModule({
    imports: [
        CommonModule,
        SystemRoutingModule
    ],
    declarations: [
        BusinessComponent,
        DeviceComponent,
        LoginConfigComponent,
        UserComponent
    ],
    providers: [
        AuthGuard
    ]
})
export class SystemModule {
}
