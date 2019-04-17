import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StrategyauditRoutingModule } from './strategyaudit-routing.module';
import { StrategyComponent } from './strategy/strategy.component';
import { SecuritydomainComponent } from './securitydomain/securitydomain.component';
import { LearningComponent } from './learning/learning.component';
import { AuthGuard } from 'src/app/shared/AuthGuard';
import { VulComponent } from './vul/vul.component';

@NgModule({
    declarations: [
        StrategyComponent,
        SecuritydomainComponent,
        LearningComponent,
        VulComponent
    ],
    imports: [
        CommonModule,
        StrategyauditRoutingModule
    ],
    providers: [
        AuthGuard
    ]
})
export class StrategyauditModule { }
