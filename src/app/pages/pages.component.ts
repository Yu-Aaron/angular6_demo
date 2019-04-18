import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-pages',
    template: `
    <nz-layout>
        <nz-header>
            <app-aside></app-aside>
        </nz-header>
        <nz-layout class="menu_ant-layout">
            <app-left-menu (currentState)="currentState=$event" (currentSubState)="currentSubState=$event" class="left_menu"></app-left-menu>
            <app-right-content [currentState]="currentState" [currentSubState]="currentSubState" class="right_content"></app-right-content>
        </nz-layout>
    </nz-layout>
    `,
})
export class PagesComponent implements OnInit {
    currentState: string; // 当前一级路由
    currentSubState: string; // 当前二级路由

    constructor() {
    }

    ngOnInit(): void {
    }
}
