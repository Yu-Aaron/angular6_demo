import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';

import {OverviewComponent} from './overview/overview.component';
import {AuthGuard} from '../../shared/AuthGuard';

const routes: Routes = [
    {path: 'overview', component: OverviewComponent, canActivate: [AuthGuard]},
    {path: '', redirectTo: '/pages/monitor/overview'}
];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)],
    declarations: []
})

export class MonitorRoutingModule {
}