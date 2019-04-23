import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { RouteService } from '../common/service/route.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private routeService: RouteService
        ) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const path = state.url;    // 当前路由名称
        const isLogin = localStorage.getItem('isLogin');
        const url = path.split('/');
        if (url[4] && url[4] === 'management') {
            this.routeService.setVal('false');
        }
        if (path === '/login') {
            return true;
        } else {
            if (isLogin === 'true') {
                return true;    // 已登录，跳转到当前路由
            } else {
                // 未登录，跳转到login
                // this.router.navigate(['login']);
                // return false;
                return true;
            }
        }
    }
}
