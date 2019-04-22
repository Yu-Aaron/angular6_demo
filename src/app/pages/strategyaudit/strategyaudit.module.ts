import {NgModule} from '@angular/core';
import {SharedModule} from '../../shared/shared.module';
import {StrategyauditRoutingModule} from './strategyaudit-routing.module';
import {AuthGuard} from 'src/app/shared/AuthGuard';

import {StrategyComponent} from './strategy/strategy.component';
import {SecuritydomainComponent} from './securitydomain/securitydomain.component';
import {LearningComponent} from './learning/learning.component';
import {VulComponent} from './vul/vul.component';

@NgModule({
    declarations: [
        StrategyComponent,
        SecuritydomainComponent,
        LearningComponent,
        VulComponent
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
