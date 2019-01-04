import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';

import {FeaturelibComponent} from './featurelib/featurelib.component';
import {AuthGuard} from '../../shared/AuthGuard';

const routes: Routes = [
    {path: 'featurelib', component: FeaturelibComponent, canActivate: [AuthGuard]},
    {path: '', redirectTo: '/pages/threat/featurelib'}
];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)],
    declarations: []
})

export class ThreatRoutingModule {
}