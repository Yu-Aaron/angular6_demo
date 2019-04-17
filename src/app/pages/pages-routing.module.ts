import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { HomepageComponent } from './home/homepage/homepage.component';

const routes: Routes = [
    {
        path: '', component: PagesComponent, children: [
            { path: 'home', component: HomepageComponent },
            { path: 'securityaudit', loadChildren: './securityaudit/securityaudit.module#SecurityauditModule' },
            { path: 'strategyaudit', loadChildren: './strategyaudit/strategyaudit.module#StrategyauditModule' },
            { path: 'asset', loadChildren: './asset/asset.module#AssetModule' },
            { path: 'setting', loadChildren: './setting/setting.module#SettingModule' },
            { path: 'user', loadChildren: './user/user.module#UserModule' },
            { path: 'log', loadChildren: './log/log.module#LogModule' },
            { path: '', redirectTo: 'home' }
        ]
    },
];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)],
    declarations: []
})

export class PagesRoutingModule {
}
