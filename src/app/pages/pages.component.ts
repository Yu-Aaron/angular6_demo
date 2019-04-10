import { Component, OnInit, NgModule } from '@angular/core';
@NgModule()
@Component({
    selector: 'app-component',
    template: `
        <nz-layout>
            <app-header></app-header>
            <nz-layout>
                <nz-sider [ngStyle]="{'width': firstState === 'monitor' ? '60px' : '160px'}">
                    <app-slider (firstState)="firstState=$event" (secondState)="secondState=$event"></app-slider>
                </nz-sider>
                <nz-content>
                    <app-content [secondState]="secondState"></app-content>
                </nz-content>
            </nz-layout>
        </nz-layout>
    `,
})
export class PagesComponent implements OnInit {
    firstState: string;
    secondState: string;

    constructor() {

    }

    ngOnInit(): void {

    }
}