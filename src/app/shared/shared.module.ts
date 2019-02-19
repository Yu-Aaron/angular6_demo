import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FilterTableComponent} from '../common/component/filter-table/filter-table.component';
import {ModalComponent} from '../common/component/modal/modal.component';
import {ValidatorDirective} from '../common/directive/validator.directive';
import {PrivilegeDirective} from '../common/directive/privilege.directive';
import {NgZorroAntdModule} from 'ng-zorro-antd';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgZorroAntdModule,
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgZorroAntdModule,
        FilterTableComponent,
        ModalComponent,
        ValidatorDirective,
        PrivilegeDirective
    ],
    declarations: [
        FilterTableComponent,
        ModalComponent,
        ValidatorDirective,
        PrivilegeDirective
    ]
})

export class SharedModule {
}
