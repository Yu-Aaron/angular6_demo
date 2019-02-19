import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ConfigService} from "../../common/services/config.service";
import {SseService} from '../../common/services/sse.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    @Input() secondLevelMenu: Array<any>;
    @Input() currentState: string;

    constructor(private router: Router,
                private sseService: SseService,
                private configService: ConfigService) {
    }

    ngOnInit(): void {
    }

    logout() {
        this.configService.logout().subscribe(data => {
            console.log(data);
            sessionStorage.removeItem('isLogin');
            this.sseService.stopSse();
            this.router.navigate(['login']);
        });

    }
}
