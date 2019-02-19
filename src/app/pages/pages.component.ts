import {Component, OnInit} from '@angular/core';
import {CommonService} from "../common/services/common.service";
import {SseService} from '../common/services/sse.service';

@Component({
    selector: 'app-pages',
    template: `
        <nz-layout>
            <nz-sider>
                <app-aside (secondLevelMenu)="secondLevelMenu=$event" (currentState)="currentState=$event" (currentTitle)="currentTitle=$event"></app-aside>
            </nz-sider>
            <nz-layout>
                <app-header [secondLevelMenu]="secondLevelMenu" [currentState]="currentState"></app-header>
                <app-content [currentTitle]="currentTitle"></app-content>
                <app-footer></app-footer>
            </nz-layout>
            <div *ngIf="timeoutPromise" class="mySpin">
                <nz-spin [nzSpinning]="timeoutPromise" nzTip='服务器设置部署中，请稍等...' [nzSize]="'large'"></nz-spin>
            </div>
        </nz-layout>
    `,
})
export class PagesComponent implements OnInit {
    secondLevelMenu: Array<any>;
    currentState: string;
    currentTitle: string;
    timeoutPromise = false;

    constructor(private commonService: CommonService, private sseService: SseService) {
    }

    ngOnInit(): void {
        this.commonService.getDomain();
        this.sseService.startSse();
    }
}
