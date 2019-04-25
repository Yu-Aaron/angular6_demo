import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './pages/login/login.component';
import { LoginConfigComponent } from './pages/login/login-config/login-config.component';

const routes: Routes = [
  { path: '', redirectTo: '/pages/home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'config', component: LoginConfigComponent },
  { path: 'pages', loadChildren: './pages/pages.module#PagesModule' },
  { path: '**', redirectTo: '/pages/home' }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, { useHash: true })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
