import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from 'src/app/shared/AuthGuard';
import { UserComponent } from './user/user.component';
import { UsergroupComponent } from './usergroup/usergroup.component';

const routes: Routes = [
  { path: 'user', component: UserComponent, canActivate: [AuthGuard] },
  { path: 'usergroup', component: UsergroupComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/pages/usermanagement/user' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
