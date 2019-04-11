import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingRoutingModule } from './setting-routing.module';
import { IsActive } from '../../share/IsActive';
import { BasicComponent } from './basic/basic.component';
import { ProtocolportComponent } from './protocolport/protocolport.component';
import { InterfaceComponent } from './interface/interface.component';
import { ToolComponent } from './tool/tool.component';
import { BackupupdateComponent } from './backupupdate/backupupdate.component';
import { LoginmanagementComponent } from './loginmanagement/loginmanagement.component';

@NgModule({
    declarations: [
        BasicComponent,
        ProtocolportComponent,
        InterfaceComponent,
        ToolComponent,
        BackupupdateComponent,
        LoginmanagementComponent
    ],
    imports: [
        CommonModule,
        SettingRoutingModule
    ],
    providers: [
        IsActive
    ]
})
export class SettingModule { }
