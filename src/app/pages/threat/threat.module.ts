import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThreatRoutingModule } from './threat-routing.module';
import { SharedModule } from '../../shared/shared.module';

import { FeaturelibComponent } from './featurelib/featurelib.component';
import { AuthGuard } from '../../shared/AuthGuard';

@NgModule({
    imports: [
        CommonModule,
        ThreatRoutingModule,
        SharedModule
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
