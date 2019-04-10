import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IsActive } from '../../share/IsActive';

import { OperatelogComponent } from './operatelog/operatelog.component';
import { RunninglogComponent } from './runninglog/runninglog.component';

const routes: Routes = [
    {path: 'operatelog', component: OperatelogComponent, canActivate: [IsActive]},
    {path: 'runninglog', component: RunninglogComponent, canActivate: [IsActive]},
    {path: '', redirectTo: '/page/log/operatelog'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LogRoutingModule { }
