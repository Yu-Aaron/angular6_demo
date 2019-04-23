import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from '../../../../common/service/authorization.service';
import { RouteService } from '../../../../common/service/route.service';

@Component({
  selector: 'app-management-group',
  templateUrl: './management-group.component.html',
  styleUrls: ['./management-group.component.scss']
})
export class ManagementGroupComponent implements OnInit {

  menus: {};
  submenu;
  global;
  constructor(
    private authS: AuthorizationService,
    private routeService: RouteService
  ) { }

  ngOnInit() {
    this.getMenus();
    this.routeService.setVal(this.global);
  }

  getMenus() {
    this.authS.getMenu().subscribe(data => {
      this.submenu = data;
      this.menus = data['dashboard'];
    });
  }

}
