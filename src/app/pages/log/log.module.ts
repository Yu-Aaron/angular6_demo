import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LogRoutingModule} from './log-routing.module';

import {OperateComponent} from './operate/operate.component';
import {PolicyComponent} from './policy/policy.component';
import {RunninglogComponent} from './runninglog/runninglog.component';
import {AuthGuard} from '../../shared/AuthGuard';
import {NgZorroAntdModule} from 'ng-zorro-antd';

@NgModule({
    imports: [
        CommonModule,
        NgZorroAntdModule,
        LogRoutingModule
    ],
    declarations: [
        OperateComponent,
        PolicyComponent,
        RunninglogComponent
    ],
    providers: [
        AuthGuard
    ]
})
export class LogModule {
}
