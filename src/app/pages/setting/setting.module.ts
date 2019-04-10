import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingRoutingModule } from './setting-routing.module';
import { UsrmanagementComponent } from './usrmanagement/usrmanagement.component';
import { LoginmanagementComponent } from './loginmanagement/loginmanagement.component';
import { DevicemanagementComponent } from './devicemanagement/devicemanagement.component';
import { BusinessmanagementComponent } from './businessmanagement/businessmanagement.component';
import { IsActive } from '../../share/IsActive';

@NgModule({
    declarations: [UsrmanagementComponent, LoginmanagementComponent, DevicemanagementComponent, BusinessmanagementComponent],
    imports: [
        CommonModule,
        SettingRoutingModule
    ],
    providers: [
        IsActive
    ]
})
export class SettingModule { }
