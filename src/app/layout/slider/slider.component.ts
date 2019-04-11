import {Component, EventEmitter, OnInit, Output, NgModule, Input} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {AuthorizationService} from '../../common/service/authorization.service';

@NgModule()
@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {
    menuList: Object = {};
    firstLevelMenu: Array<any>;
    secondLevelMenu: Array<any>;
    state: string;
    isCollapse: boolean;
    @Output() secondState = new EventEmitter();
    @Output() firstState = new EventEmitter();
    constructor(private authorization: AuthorizationService, private router: Router) { }

    ngOnInit(): void {
        const stateAll = location.hash.split('/');
        this.state = stateAll[2];
        this.authorization.getMenu().subscribe((data) => {
            this.firstLevelMenu = data['dashboard'];
            this.menuList = data;
            this.secondLevelMenu = data[this.state];
            this.firstState.emit(this.state);
            this.secondState.emit(stateAll[3]);
            this.changeRouter();
        });
    }
    changeRouter() {
        this.router.events.subscribe((event: NavigationEnd) => {
            const stateAll = location.hash.split('/');
            this.state = stateAll[2];
            if (event.url !== '/login' && event instanceof NavigationEnd) { // 当导航成功结束时执行
                this.changeState(this.state);
                this.secondState.emit(stateAll[3]);
                this.firstState.emit(this.state);
            }
        });
    }

    changeState(state: string) {
        this.secondLevelMenu = this.menuList[state];
        this.state = state;
    }

}
