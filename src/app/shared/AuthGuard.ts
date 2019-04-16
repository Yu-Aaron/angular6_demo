import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const path = state.url;    // 当前路由名称
        const isLogin = localStorage.getItem('isLogin');
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
