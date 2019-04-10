import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IsActive } from '../../share/IsActive';
import { IpmacComponent } from './ipmac/ipmac.component';
import { MaliciousdomainComponent } from './maliciousdomain/maliciousdomain.component';
import { SecuritydomainComponent} from './securitydomain/securitydomain.component';
import { StrategyComponent} from './strategy/strategy.component';
import { VulComponent } from './vul/vul.component';
import { WhitelistComponent } from './whitelist/whitelist.component';

const routes: Routes = [
    {path: 'ipmac', component: IpmacComponent, canActivate: [IsActive]},
    {path: 'maliciousdomain', component: MaliciousdomainComponent, canActivate: [IsActive]},
    {path: 'securitydomain', component: SecuritydomainComponent, canActivate: [IsActive]},
    {path: 'strategy', component: StrategyComponent, canActivate: [IsActive]},
    {path: 'vul', component: VulComponent, canActivate: [IsActive]},
    {path: 'whitelist', component: WhitelistComponent, canActivate: [IsActive]},
    {path: '', redirectTo: '/page/strategyaudit/ipmac'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StrategyauditRoutingModule { }
