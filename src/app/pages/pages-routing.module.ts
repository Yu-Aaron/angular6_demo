import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';

import {PagesComponent} from './pages.component';

const routes: Routes = [
    {path: '', component: PagesComponent, children: [
        {path: 'monitor', loadChildren: './monitor/monitor.module#MonitorModule'},
        {path: 'security', loadChildren: './security/security.module#SecurityModule'},
        {path: 'asset', loadChildren: './asset/asset.module#AssetModule'},
        {path: 'report', loadChildren: './report/report.module#ReportModule'},
        {path: 'log', loadChildren: './log/log.module#LogModule'},
        {path: 'threat', loadChildren: './threat/threat.module#ThreatModule'},
        {path: 'system', loadChildren: './system/system.module#SystemModule'},
    ]},
];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)],
    declarations: []
})

export class PagesRoutingModule {
}