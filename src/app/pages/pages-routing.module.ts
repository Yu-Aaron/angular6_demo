import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagesComponent} from './pages.component';
import { MonitorComponent} from './monitor/monitor.component';

const routes: Routes = [
    {path: '', component: PagesComponent, children: [
        {path: 'monitor', component: MonitorComponent},
        {path: 'securityaudit', loadChildren: './securityaudit/securityaudit.module#SecurityauditModule'},
        {path: 'strategyaudit', loadChildren: './strategyaudit/strategyaudit.module#StrategyauditModule'},
        {path: 'asset', loadChildren: './asset/asset.module#AssetModule'},
        {path: 'tool', loadChildren: './tool/tool.module#ToolModule'},
        {path: 'log', loadChildren: './log/log.module#LogModule'},
        {path: 'setting', loadChildren: './setting/setting.module#SettingModule'},
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
