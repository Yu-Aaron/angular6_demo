import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';

import {StatisticsComponent} from './statistics/statistics.component';
import {AuthGuard} from '../../shared/AuthGuard';

const routes: Routes = [
    {path: 'statistics', component: StatisticsComponent, canActivate: [AuthGuard]},
    {path: '', redirectTo: '/pages/report/statistics'}
];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)],
    declarations: []
})

export class ReportRoutingModule {
}