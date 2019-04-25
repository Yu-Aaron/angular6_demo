import {NgModule} from '@angular/core';
import {SettingRoutingModule} from './setting-routing.module';
import {AuthGuard} from 'src/app/shared/AuthGuard';
import {SharedModule} from '../../shared/shared.module';

import {BasicComponent} from './basic/basic.component';
import {InterfaceComponent} from './interface/interface.component';
import {DebugComponent} from './debug/debug.component';
import {BackupComponent} from './backup/backup.component';
import {LoginComponent} from './login/login.component';
import {BasicPipe} from '../../common/pipe/filter.pipe';
import {ProtocolComponent} from './protocol/protocol.component';

@NgModule({
    declarations: [
        BasicComponent,
        InterfaceComponent,
        DebugComponent,
        BackupComponent,
        LoginComponent,
        ProtocolComponent,
        BasicPipe
    ],
    imports: [
        SharedModule,
        SettingRoutingModule,
    ],
    providers: [AuthGuard]
})
export class SettingModule {
}
