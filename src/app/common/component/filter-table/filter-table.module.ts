import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedModule,
  ],
  exports: [
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class FilterTableModule { }
