import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LogRoutingModule } from './log-routing.module';
import { RunninglogComponent } from './runninglog/runninglog.component';
import { OperatelogComponent } from './operatelog/operatelog.component';
import { AuthGuard } from 'src/app/shared/AuthGuard';

@NgModule({
  declarations: [RunninglogComponent, OperatelogComponent],
  imports: [
    CommonModule,
    LogRoutingModule
  ],
  providers: [AuthGuard]
})
export class LogModule { }
