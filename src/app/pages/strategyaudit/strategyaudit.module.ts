import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { AuthGuard } from 'src/app/shared/AuthGuard';
import { StrategyauditRoutingModule } from './strategyaudit-routing.module';

import { StrategyComponent } from './strategy/strategy.component';
import { SecuritydomainComponent } from './securitydomain/securitydomain.component';
import { LearningComponent } from './learning/learning.component';
import { VulComponent } from './vul/vul.component';
import { DomaindetailComponent } from './securitydomain/domaindetail/domaindetail.component';

@NgModule({
    declarations: [
        StrategyComponent,
        SecuritydomainComponent,
        LearningComponent,
        VulComponent,
        DomaindetailComponent
    ],
    imports: [
        SharedModule,
        StrategyauditRoutingModule
    ],
    providers: [
        AuthGuard
    ]
})
export class StrategyauditModule {
}
