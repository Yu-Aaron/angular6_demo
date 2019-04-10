import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxEchartsModule} from 'ngx-echarts';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [
      NgZorroAntdModule,
      NgxEchartsModule,
      CommonModule,
      FormsModule,
      ReactiveFormsModule
  ]
})
export class ShareModule { }
