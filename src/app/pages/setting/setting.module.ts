import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingRoutingModule } from './setting-routing.module';
import { AuthGuard } from 'src/app/shared/AuthGuard';
import { BasicComponent } from './basic/basic.component';
import { ProtocolComponent } from './protocol/protocol.component';
import { InterfaceComponent } from './interface/interface.component';
import { DebugComponent } from './debug/debug.component';
import { BackupComponent } from './backup/backup.component';
import { LoginComponent } from './login/login.component';

@NgModule({
    declarations: [
        BasicComponent,
        ProtocolComponent,
        InterfaceComponent,
        DebugComponent,
        BackupComponent,
        LoginComponent
    ],
    imports: [
        CommonModule,
        SettingRoutingModule
    ],
    providers: [AuthGuard]
})
export class SettingModule { }
