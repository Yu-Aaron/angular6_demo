import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from 'src/app/shared/AuthGuard';
import { SecuritydomainComponent } from './securitydomain/securitydomain.component';
import { StrategyComponent } from './strategy/strategy.component';
import { VulComponent } from './vul/vul.component';
import { LearningComponent } from './learning/learning.component';


const routes: Routes = [
  { path: 'securitydomain', component: SecuritydomainComponent, canActivate: [AuthGuard] },
  { path: 'strategy', component: StrategyComponent, canActivate: [AuthGuard] },
  { path: 'vul', component: VulComponent, canActivate: [AuthGuard] },
  { path: 'learning', component: LearningComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/pages/strategyaudit/securitydomain' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StrategyauditRoutingModule { }
