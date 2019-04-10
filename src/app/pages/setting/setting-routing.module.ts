import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IsActive } from '../../share/IsActive';
import { BusinessmanagementComponent } from './businessmanagement/businessmanagement.component';
import { DevicemanagementComponent } from './devicemanagement/devicemanagement.component';
import { LoginmanagementComponent } from './loginmanagement/loginmanagement.component';
import { UsrmanagementComponent } from './usrmanagement/usrmanagement.component';

const routes: Routes = [
    {path: 'businessmanagement', component: BusinessmanagementComponent, canActivate: [IsActive]},
    {path: 'devicemanagement', component: DevicemanagementComponent, canActivate: [IsActive]},
    {path: 'loginmanagement', component: LoginmanagementComponent, canActivate: [IsActive]},
    {path: 'usrmanagement', component: UsrmanagementComponent, canActivate: [IsActive]},
    {path: '', redirectTo: '/page/setting/businessmanagement'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingRoutingModule { }
