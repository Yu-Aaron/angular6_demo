import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { AuthGuard } from 'src/app/shared/AuthGuard';
import { UserComponent } from './user/user.component';
import { UsergroupComponent } from './usergroup/usergroup.component';

@NgModule({
  declarations: [UserComponent, UsergroupComponent],
  imports: [
    CommonModule,
    UserRoutingModule
  ],
  providers: [AuthGuard]
})
export class UserModule { }
