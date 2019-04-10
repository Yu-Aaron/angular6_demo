import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ToolRoutingModule } from './tool-routing.module';
import { TerminalComponent } from './terminal/terminal.component';
import { CaptureComponent } from './capture/capture.component';

import { IsActive } from '../../share/IsActive';

@NgModule({
    declarations: [TerminalComponent, CaptureComponent],
    imports: [
        CommonModule,
        ToolRoutingModule
    ],
    providers: [
        IsActive
    ]
})
export class ToolModule { }
