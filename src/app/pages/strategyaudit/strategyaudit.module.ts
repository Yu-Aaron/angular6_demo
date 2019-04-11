import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StrategyauditRoutingModule } from './strategyaudit-routing.module';
import { StrategyComponent } from './strategy/strategy.component';
import { SecuritydomainComponent } from './securitydomain/securitydomain.component';
import { IsActive } from '../../share/IsActive';
import { LearningComponent} from './learning/learning.component';
import { PolicyitemComponent } from './policyitem/policyitem.component';

@NgModule({
    declarations: [
        StrategyComponent,
        SecuritydomainComponent,
        LearningComponent,
        PolicyitemComponent
    ],
    imports: [
        CommonModule,
        StrategyauditRoutingModule
    ],
    providers: [
        IsActive
    ]
})
export class StrategyauditModule { }
