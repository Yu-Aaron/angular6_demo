import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';

import {UserComponent} from './user/user.component';
import {LoginConfigComponent} from './login-config/login-config.component';
import {BusinessComponent} from './business/business.component';
import {DeviceComponent} from './device/device.component';
import {AuthGuard} from '../../shared/AuthGuard';

const routes: Routes = [
    {path: 'user', component: UserComponent, canActivate: [AuthGuard]},
    {path: 'login', component: LoginConfigComponent, canActivate: [AuthGuard]},
    {path: 'business', component: BusinessComponent, canActivate: [AuthGuard]},
    {path: 'device', component: DeviceComponent, canActivate: [AuthGuard]},
    {path: '', redirectTo: '/pages/system/user'}
];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)],
    declarations: []
})

export class SystemRoutingModule {
}