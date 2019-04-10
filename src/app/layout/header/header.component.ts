import { Component, Input, OnInit, NgModule } from '@angular/core';
import {Router} from '@angular/router';
@NgModule()
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    constructor(private router: Router) {
    }

    ngOnInit(): void {
    }

    logout() {
        sessionStorage.removeItem('isLogin');
        this.router.navigate(['login']);
    }

}
