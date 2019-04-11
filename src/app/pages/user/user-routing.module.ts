import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IsActive } from '../../share/IsActive';
import {ListComponent} from './list/list.component';
import {GroupComponent} from './group/group.component';

const routes: Routes = [
    {path: 'list', component: ListComponent, canActivate: [IsActive]},
    {path: 'group', component: GroupComponent, canActivate: [IsActive]},
    {path: '', redirectTo: 'list'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
