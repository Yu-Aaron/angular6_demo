import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { FilterTableComponent } from '../common/component/filter-table/filter-table.component';
import {
    NgZorroAntdModule,
} from 'ng-zorro-antd';

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
        FilterTableComponent
    ],
    declarations: [FilterTableComponent]
})

export class SharedModule {
}
