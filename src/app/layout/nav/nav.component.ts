import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import * as moment from 'moment';
import { AuthorizationService } from '../../common/services/authorization.service';
import { ConfigService } from "../../common/services/config.service";

@Component({
    selector: 'app-aside',
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
    private menuList: Object = {};
    private state: string;
    firstLevelMenu: Array<any>;
    @Output() secondLevelMenu = new EventEmitter();
    @Output() currentState = new EventEmitter();
    @Output() currentTitle = new EventEmitter();

    constructor(private authorization: AuthorizationService, private router: Router, private configService: ConfigService) {
        this.changeRouter();
    }

    ngOnInit(): void {
        this.state = location.hash.split('/')[2];
        this.authorization.getMenu().subscribe((data) => {
            this.firstLevelMenu = data['dashboard'];
            this.menuList = data;
            this.secondLevelMenu.emit(data[this.state]);
            this.currentState.emit(this.state);
        });
        // this.getCurrentTime();
        this.whoAmI();
    }

    changeRouter() {
        this.router.events.subscribe((event: NavigationEnd) => {
            let stateAll = location.hash.split('/');
            this.state = stateAll[2];
            if (event.url !== '/login' && event instanceof NavigationEnd) { // 当导航成功结束时执行
                this.changeState(this.state);
                if (stateAll[stateAll.length - 2] === 'secincident') {
                    this.currentTitle.emit(stateAll[stateAll.length - 2]);
                } else {
                    this.currentTitle.emit(stateAll[stateAll.length - 1]);
                }
            }
        });
    }

    changeState(state: string) {
        this.secondLevelMenu.emit(this.menuList[state]);
        this.currentState.emit(state);
    }
    getCurrentTime() {
        this.configService.getCurrentTime().subscribe((data:any) => {
                let date = new Date(moment(data).format('YYYY-MM-DD HH:mm:ss'));
                sessionStorage.setItem('currentTime', String(date));
            },error => {
                if (error.status !== 200) {
                    this.router.navigate(['login']);
                }
            });

        setTimeout(() => {
            this.getCurrentTime();
        }, 15000);
    }
    
    whoAmI() {
        this.configService.whoAmI().subscribe((data: any)=>{
            console.log(data);
            localStorage.setItem('privilege', JSON.stringify(data['targetAndActionValueFormList']));
        })
    }

}
