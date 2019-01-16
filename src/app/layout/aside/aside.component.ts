import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {AuthorizationService} from '../../common/services/authorization.service';
import {ConfigService} from "../../common/services/config.service";
import {error} from "util";

@Component({
    selector: 'app-aside',
    templateUrl: './aside.component.html',
    styleUrls: ['./aside.component.scss']
})
export class AsideComponent implements OnInit {
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
        this.getCurrentTime();
    }

    changeRouter() {
        this.router.events.subscribe((event: NavigationEnd) => {
            let stateAll = location.hash.split('/');
            this.state = stateAll[2];
            if (event.url !== '/login' && event instanceof NavigationEnd) { // 当导航成功结束时执行
                this.changeState(this.state);
                this.currentTitle.emit(stateAll[stateAll.length - 1]);
            }
        });
    }

    changeState(state: string) {
        this.secondLevelMenu.emit(this.menuList[state]);
        this.currentState.emit(state);
    }

    getCurrentTime() {
        this.configService.getCurrentTime().subscribe((data) => {
                console.log(data);
            },
            error => {
                console.log(error);
                if (error.status !== 200) {
                    this.router.navigate(['login']);

                }
            });

        setTimeout(() => {
            this.getCurrentTime();
        }, 15000);
    }


}
