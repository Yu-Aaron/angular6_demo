import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ThreatRoutingModule} from './threat-routing.module';

import {FeaturelibComponent} from './featurelib/featurelib.component';
import {AuthGuard} from '../../shared/AuthGuard';

@NgModule({
    imports: [
        CommonModule,
        ThreatRoutingModule
    ],
    declarations: [
        FeaturelibComponent
    ],
    providers: [
        AuthGuard
    ]
})
export class ThreatModule {
}
