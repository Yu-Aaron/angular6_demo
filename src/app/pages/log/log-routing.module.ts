import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/shared/AuthGuard';
import { RunninglogComponent } from './runninglog/runninglog.component';
import { OperatelogComponent } from './operatelog/operatelog.component';

const routes: Routes = [
  { path: 'runninglog', component: RunninglogComponent, canActivate: [AuthGuard] },
  { path: 'operatelog', component: OperatelogComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/pages/log/runninglog' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LogRoutingModule { }
