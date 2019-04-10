import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [
    {path: '', redirectTo: '/page/monitor', pathMatch: 'full'},
    {path: 'login', component: LoginComponent},
    {path: 'page', loadChildren: './pages/pages.module#PagesModule'},
    {path: '**', redirectTo: '/page/monitor'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
