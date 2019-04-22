import {NgModule} from '@angular/core';
import {SettingRoutingModule} from './setting-routing.module';
import {AuthGuard} from 'src/app/shared/AuthGuard';
import {SharedModule} from '../../shared/shared.module';

import {BasicComponent} from './basic/basic.component';
import {ProtocolComponent} from './protocol/protocol.component';
import {InterfaceComponent} from './interface/interface.component';
import {DebugComponent} from './debug/debug.component';
import {BackupComponent} from './backup/backup.component';
import {LoginComponent} from './login/login.component';
import {BasicPipe} from '../../common/pipe/filter.pipe';

@NgModule({
    declarations: [
        BasicComponent,
        ProtocolComponent,
        InterfaceComponent,
        DebugComponent,
        BackupComponent,
        LoginComponent,
        BasicPipe
    ],
    imports: [
        SharedModule,
        SettingRoutingModule
    ],
    providers: [AuthGuard]
})
export class SettingModule {
}
