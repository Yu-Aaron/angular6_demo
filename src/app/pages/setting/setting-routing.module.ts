import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from 'src/app/shared/AuthGuard';
import { BasicComponent } from './basic/basic.component';
import { ProtocolComponent } from './protocol/protocol.component';
import { InterfaceComponent } from './interface/interface.component';
import { DebugComponent } from './debug/debug.component';
import { BackupComponent } from './backup/backup.component';
import { LoginComponent } from './login/login.component';


const routes: Routes = [
  { path: 'basic', component: BasicComponent, canActivate: [AuthGuard] },
  { path: 'protocol', component: ProtocolComponent, canActivate: [AuthGuard] },
  { path: 'interface', component: InterfaceComponent, canActivate: [AuthGuard] },
  { path: 'debug', component: DebugComponent, canActivate: [AuthGuard] },
  { path: 'backup', component: BackupComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/pages/setting/basic' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingRoutingModule { }
