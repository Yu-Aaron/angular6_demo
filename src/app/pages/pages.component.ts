import {Component, OnInit} from '@angular/core';

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
        </nz-layout>
    `,
})
export class PagesComponent implements OnInit {
    public secondLevelMenu: Array<any>;
    public currentState: string;
    public currentTitle: string;

    constructor() {
    }

    ngOnInit(): void {
    }

}
