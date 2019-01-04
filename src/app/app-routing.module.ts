import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './pages/login/login.component';

const routes: Routes = [
    {path: '', redirectTo: '/pages/monitor/overview', pathMatch: 'full'},
    {path: 'login', component: LoginComponent},
    {path: 'pages', loadChildren: './pages/pages.module#PagesModule'},
    {path: '**', redirectTo: '/pages/monitor/overview'}
];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forRoot(routes, {useHash:true})],
    declarations: []
})
export class AppRoutingModule {
}
