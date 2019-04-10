import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IsActive } from '../../share/IsActive';
import { CaptureComponent } from './capture/capture.component';
import { TerminalComponent } from './terminal/terminal.component';

const routes: Routes = [
    {path: 'capture', component: CaptureComponent, canActivate: [IsActive]},
    {path: 'terminal', component: TerminalComponent, canActivate: [IsActive]},
    {path: '', redirectTo: '/page/tool/capture'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ToolRoutingModule { }
