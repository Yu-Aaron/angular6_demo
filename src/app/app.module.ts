import { from } from 'rxjs';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';


import {AppRoutingModule} from './app-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgZorroAntdModule, NZ_I18N, zh_CN} from 'ng-zorro-antd';
import {registerLocaleData} from '@angular/common';
import zh from '@angular/common/locales/zh';

import { SharedModule } from './shared/shared.module';



import {AppComponent} from './app.component';
import {LoginComponent} from './pages/login/login.component';
import {SseService} from './common/services/sse.service';



registerLocaleData(zh);

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
    ],
    imports: [
        BrowserModule,
        SharedModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        NgZorroAntdModule,
    ],
    exports: [
        NgZorroAntdModule
    ],
    providers: [{provide: NZ_I18N, useValue: zh_CN}, SseService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
