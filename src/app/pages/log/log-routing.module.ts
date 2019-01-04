import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';

import {RunninglogComponent} from './runninglog/runninglog.component';
import {OperateComponent} from './operate/operate.component';
import {PolicyComponent} from './policy/policy.component';
import {AuthGuard} from '../../shared/AuthGuard';

const routes: Routes = [
    {path: 'runninglog', component: RunninglogComponent, canActivate: [AuthGuard]},
    {path: 'operate', component: OperateComponent, canActivate: [AuthGuard]},
    {path: 'policy', component: PolicyComponent, canActivate: [AuthGuard]},
    {path: '', redirectTo: '/pages/log/runninglog'}
];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)],
    declarations: []
})

export class LogRoutingModule {
}