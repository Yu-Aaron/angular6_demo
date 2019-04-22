import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {SharedModule} from '../../shared/shared.module';

import { UserRoutingModule } from './user-routing.module';
import { AuthGuard } from 'src/app/shared/AuthGuard';
import { UserComponent } from './user/user.component';
import { UsergroupComponent } from './usergroup/usergroup.component';
import { AddUserComponent } from './user/add-user/add-user.component';

@NgModule({
  declarations: [UserComponent, UsergroupComponent, AddUserComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule
  ],
  providers: [AuthGuard]
})
export class UserModule { }
