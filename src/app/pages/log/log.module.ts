import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LogRoutingModule } from './log-routing.module';
import { RunninglogComponent } from './runninglog/runninglog.component';
import { OperatelogComponent } from './operatelog/operatelog.component';
import { IsActive } from '../../share/IsActive';

@NgModule({
    declarations: [RunninglogComponent, OperatelogComponent],
    imports: [
        CommonModule,
        LogRoutingModule
    ],
    providers: [
        IsActive
    ]
})
export class LogModule { }
