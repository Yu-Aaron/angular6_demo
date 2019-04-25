import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { FilterTableComponent} from '../common/component/filter-table/filter-table.component';
import { ModalComponent } from '../common/component/modal/modal.component';
import { NgxEchartsModule} from 'ngx-echarts';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgZorroAntdModule,
        NgxEchartsModule
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgZorroAntdModule,
        NgxEchartsModule,
        FilterTableComponent,
        ModalComponent,
    ],
    declarations: [
        FilterTableComponent,
        ModalComponent,
    ]
})

export class SharedModule {
}
