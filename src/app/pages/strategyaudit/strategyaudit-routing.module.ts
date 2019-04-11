import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IsActive } from '../../share/IsActive';
import { SecuritydomainComponent} from './securitydomain/securitydomain.component';
import { StrategyComponent} from './strategy/strategy.component';
import {LearningComponent} from './learning/learning.component';
import {PolicyitemComponent} from './policyitem/policyitem.component';

const routes: Routes = [
    {path: 'securitydomain', component: SecuritydomainComponent, canActivate: [IsActive]},
    {path: 'strategy', component: StrategyComponent, canActivate: [IsActive]},
    {path: 'policyitem', component: PolicyitemComponent, canActivate: [IsActive]},
    {path: 'learning', component: LearningComponent, canActivate: [IsActive]},
    {path: '', redirectTo: 'securitydomain'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StrategyauditRoutingModule { }
