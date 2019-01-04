import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    @Input() secondLevelMenu: Array<any>;
    @Input() currentState: string;

    constructor(private router: Router) {
    }

    ngOnInit(): void {
    }

    logout() {
        sessionStorage.removeItem('isLogin');
        this.router.navigate(['login']);
    }
}
