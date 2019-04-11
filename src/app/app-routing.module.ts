import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [
    {path: '', redirectTo: '/pages/monitor', pathMatch: 'full'},
    {path: 'login', component: LoginComponent},
    {path: 'pages', loadChildren: './pages/pages.module#PagesModule'},
    {path: '**', redirectTo: '/pages/monitor'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
