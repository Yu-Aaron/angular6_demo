import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {AuthorizationService} from '../../service/authorization.service';
import {trigger, state, style, animate, transition} from '@angular/animations';
import * as moment from 'moment';
import {ConfigService} from '../../service/config.service';

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
    state: string;       // 当前菜单的路由
    stateSub: string;
    secondarySubmenuTitle: string;    // 二级子菜单的第一个title
    menuList: {};
    @Output() public currentState = new EventEmitter();
    @Output() public currentSubState = new EventEmitter();


    constructor(private configService: ConfigService,
                private authorizationService: AuthorizationService,
                private router: Router) {
    }

    ngOnInit() {
        const routerUrl = location.hash.split('/');
        this.state = routerUrl[2];
        this.stateSub = routerUrl[3];
        this.authorizationService.getMenu().subscribe(data => {
            this.firstLevelMenus = data['dashboard'];
            this.menuList = data;
            this.secondarySubmenu = data[this.state];
            this.firstLevelMenus.forEach(element => {
                if (element['state'] === this.state) {
                    this.secondarySubmenuTitle = element['name'];
                }
            });
            this.changeRouter();
            this.currentState.emit(this.state);
            this.currentSubState.emit(this.stateSub);
        });
        this.getCurrentTime();
    }

    changeRouter() {
        this.router.events.subscribe((event: NavigationEnd) => {
            const routerUrl = location.hash.split('/');
            this.state = routerUrl[2];
            this.stateSub = routerUrl[3];
            if (event.url !== '/login' && event instanceof NavigationEnd) { // 当导航成功结束时执行
                this.firstLevelMenus.forEach(element => {
                    if (element['state'] === this.state) {
                        this.secondarySubmenuTitle = element['name'];
                    }
                });
                this.changeState(this.state);
                this.currentState.emit(this.state);
                this.currentSubState.emit(this.stateSub);
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
