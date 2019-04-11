import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { IsActive } from '../../share/IsActive';
import { ListComponent } from './list/list.component';
import { GroupComponent } from './group/group.component';

@NgModule({
    declarations: [
        ListComponent,
        GroupComponent
    ],
    imports: [
        CommonModule,
        UserRoutingModule
    ],
    providers: [
        IsActive
    ]
})
export class UserModule { }
