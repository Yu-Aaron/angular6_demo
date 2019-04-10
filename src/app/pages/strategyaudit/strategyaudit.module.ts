import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StrategyauditRoutingModule } from './strategyaudit-routing.module';
import { MaliciousdomainComponent } from './maliciousdomain/maliciousdomain.component';
import { IpmacComponent } from './ipmac/ipmac.component';
import { WhitelistComponent } from './whitelist/whitelist.component';
import { VulComponent } from './vul/vul.component';
import { StrategyComponent } from './strategy/strategy.component';
import { SecuritydomainComponent } from './securitydomain/securitydomain.component';
import { IsActive } from '../../share/IsActive';

@NgModule({
    declarations: [MaliciousdomainComponent, IpmacComponent, WhitelistComponent, VulComponent, StrategyComponent, SecuritydomainComponent],
    imports: [
        CommonModule,
        StrategyauditRoutingModule
    ],
    providers: [
        IsActive
    ]
})
export class StrategyauditModule { }
