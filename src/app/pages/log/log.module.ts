import {NgModule} from '@angular/core';
import {LogRoutingModule} from './log-routing.module';
import {SharedModule} from '../../shared/shared.module';
import {AuthGuard} from 'src/app/shared/AuthGuard';

import {RunninglogComponent} from './runninglog/runninglog.component';
import {OperatelogComponent} from './operatelog/operatelog.component';
import {FilterTableComponent} from '../../common/component/filter-table/filter-table.component';

@NgModule({
    declarations: [
        RunninglogComponent,
        OperatelogComponent
    ],
    imports: [
        SharedModule,
        LogRoutingModule
    ],
    providers: [
        AuthGuard,
        FilterTableComponent
    ]
})
export class LogModule {
}
