import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {Router} from '@angular/router';

@Injectable()
export class IsActive implements CanActivate {

    constructor(private router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        let path = state.url;    // 当前路由名称
        let isLogin = sessionStorage.getItem('isLogin');  // 是否登录
        if (path == '/login') {
            return true;
        } else {
            if (isLogin == 'true') {
                return true;    // 已登录，跳转到当前路由
            } else {
                // 未登录，跳转到login
                this.router.navigate(['login']);
                return false;
                // return true;
            }
        }
    }
}
