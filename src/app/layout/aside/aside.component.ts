import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {AuthorizationService} from '../../common/service/authorization.service';

@Component({
    selector: 'app-aside',
    templateUrl: './aside.component.html',
    styleUrls: ['./aside.component.scss']
})
export class AsideComponent implements OnInit {
    private menuList: Object = {};
    private firstLevelMenu: Array<any>;
    private state: string;
    @Output() secondLevelMenu = new EventEmitter();
    @Output() currentState = new EventEmitter();
    @Output() currentTitle = new EventEmitter();

    constructor(private authorization: AuthorizationService, private router: Router) {
    }

    ngOnInit(): void {
        this.state = location.hash.split('/')[2];
        this.authorization.getMenu().subscribe((data) => {
            this.firstLevelMenu = data['dashboard'];
            this.menuList = data;
            this.secondLevelMenu.emit(data[this.state]);
            this.currentState.emit(this.state);
            this.changeRouter();
        });
    }

    changeRouter() {
        this.router.events.subscribe((event: NavigationEnd) => {
            let stateAll = location.hash.split('/');
            this.state = stateAll[2];
            if (event.url !=='/login' && event instanceof NavigationEnd) { // 当导航成功结束时执行
                this.changeState(this.state);
                this.getCurrentTitle(this.menuList[this.state], stateAll[3]);
            }
        });
    }

    changeState(state: string) {
        this.secondLevelMenu.emit(this.menuList[state]);
        this.currentState.emit(state);
    }

    getCurrentTitle(secondLevelMenu, secondState) {
        for (let i = 0, len = secondLevelMenu.length; i < len; i++) {
            let item = secondLevelMenu[i];
            if (item.state == secondState) {
                sessionStorage.setItem('currentTitle',item.name );
                this.currentTitle.emit(item.name);
                break;
            }
        }
    }

}
