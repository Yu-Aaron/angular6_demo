import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IsActive } from '../../share/IsActive';

import { OperatelogComponent } from './operatelog/operatelog.component';
import { RunninglogComponent } from './runninglog/runninglog.component';

const routes: Routes = [
    {path: 'runninglog', component: RunninglogComponent, canActivate: [IsActive]},
    {path: 'operatelog', component: OperatelogComponent, canActivate: [IsActive]},
    {path: '', redirectTo: 'runninglog'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LogRoutingModule { }
