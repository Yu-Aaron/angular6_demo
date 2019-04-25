import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { AuthGuard } from 'src/app/shared/AuthGuard';
import { StrategyauditRoutingModule } from './strategyaudit-routing.module';

import { StrategyComponent } from './strategy/strategy.component';
import { SecuritydomainComponent } from './securitydomain/securitydomain.component';
import { LearningComponent } from './learning/learning.component';
import { VulComponent } from './vul/vul.component';
import { DeviceModelComponent } from './learning/device-model/device-model.component';
import { LearningDetailComponent } from './learning/learning-detail/learning-detail.component';
import { LearningCreateComponent } from './learning/learning-creat/learning-create.component';
import { StrategydetailComponent } from './strategy/strategydetail/strategydetail.component';
import { RiskLevelPipe } from 'src/app/common/pipe/risk-level.pipe';

@NgModule({
    declarations: [
        StrategyComponent,
        SecuritydomainComponent,
        LearningComponent,
        VulComponent,
        DeviceModelComponent,
        LearningDetailComponent,
        LearningCreateComponent,
        StrategydetailComponent,
        RiskLevelPipe
    ],
    imports: [
        SharedModule,
        StrategyauditRoutingModule,
    ],
    providers: [
        AuthGuard
    ]
})
export class StrategyauditModule {
}
