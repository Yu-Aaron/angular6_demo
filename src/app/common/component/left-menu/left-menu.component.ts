import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {AuthorizationService} from '../../service/authorization.service';
import {trigger, state, style, animate, transition} from '@angular/animations';
import * as moment from 'moment';
import {ConfigService} from '../../service/config.service';
import { RouteService } from '../../service/route.service';


@Component({
    selector: 'app-left-menu',
    templateUrl: './left-menu.component.html',
    styleUrls: ['./left-menu.component.scss'],
    animations: [
        trigger('showHide', [
            state('show', style({
                left: '0px'
            })),
            state('hide', style({
                left: '-160px'
            })),
            transition('show => hide', [
                animate('0.2s')
            ]),
            transition('hide => show', [
                animate('0.2s')
            ])
        ])
    ]
})
export class LeftMenuComponent implements OnInit {
    firstLevelMenus = [];      // 一级菜单
    secondarySubmenu = [];   // 二级子菜单
    state: string;       // 当前菜单一级路由
    stateSub: string;  // 当前菜单二级路由
    menuList: {};
    @Output() public currentState = new EventEmitter();
    @Output() public currentSubState = new EventEmitter();
    @Output() public isShowTitle = new EventEmitter();

    sss;


    constructor(private configService: ConfigService,
                private authorizationService: AuthorizationService,
                private router: Router,
                private routeService: RouteService) {
    }

    ngOnInit() {
        const routerUrl = location.hash.split('/');
        this.state = routerUrl[2];
        this.stateSub = routerUrl[3];
        this.authorizationService.getMenu().subscribe(data => {
            this.firstLevelMenus = data['dashboard'];
            this.menuList = data;
            this.secondarySubmenu = data[this.state];
            this.changeRouter();
            this.currentState.emit(this.state);
            this.currentSubState.emit(this.stateSub);
            this.isShowTitle.emit(true);
        });
        this.getCurrentTime();
        this.routeService.valueUpdated.subscribe(   // 右侧不显示title 刷新页面的时候 也不显示
            (val) => {
                this.sss = this.routeService.getVal();
                setTimeout(() => {
                    this.isShowTitle.emit(false);
                });
            }
        );
    }

    changeRouter() {
        this.router.events.subscribe((event: NavigationEnd) => {
            const routerUrl = location.hash.split('/');
            this.state = routerUrl[2];
            this.stateSub = routerUrl[3];
            if (event.url !== '/login' && event instanceof NavigationEnd) { // 当导航成功结束时执行
                const url = event.url.split('/');
                this.changeState(this.state);
                if (url[4] && url[4] === 'management') {   // 不显示右侧title
                    this.isShowTitle.emit(false);
                } else {
                    this.isShowTitle.emit(true);
                    this.currentState.emit(this.state);
                    this.currentSubState.emit(this.stateSub);
                }
            }
        });
    }

    changeState(state: string) {
        this.secondarySubmenu = this.menuList[state];
        this.state = state;
    }

    getCurrentTime() {
        this.configService.getCurrentTime().subscribe((data: any) => {
            const date = new Date(moment(data).format('YYYY-MM-DD HH:mm:ss'));
            sessionStorage.setItem('currentTime', String(date));
        }, error => {
            if (error.status !== 200) {
                // localStorage.removeItem('isLogin');
                // this.router.navigate(['login']);
            }
        });

        setTimeout(() => {
            this.getCurrentTime();
        }, 15000);
    }


}
