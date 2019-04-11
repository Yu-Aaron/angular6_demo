import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IsActive } from '../../share/IsActive';
import {BasicComponent} from './basic/basic.component';
import {ProtocolportComponent} from './protocolport/protocolport.component';
import {ToolComponent} from './tool/tool.component';
import {BackupupdateComponent} from './backupupdate/backupupdate.component';
import { LoginmanagementComponent } from './loginmanagement/loginmanagement.component';
import {InterfaceComponent} from './interface/interface.component';

const routes: Routes = [
    {path: 'basic', component: BasicComponent, canActivate: [IsActive]},
    {path: 'protocolport', component: ProtocolportComponent, canActivate: [IsActive]},
    {path: 'interface', component: InterfaceComponent, canActivate: [IsActive]},
    {path: 'tool', component: ToolComponent, canActivate: [IsActive]},
    {path: 'backupupdate', component: BackupupdateComponent, canActivate: [IsActive]},
    {path: 'loginmanagement', component: LoginmanagementComponent, canActivate: [IsActive]},
    {path: '', redirectTo: 'basic'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingRoutingModule { }
