import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from '../../../../common/service/authorization.service';
import { RouteService } from '../../../../common/service/route.service';

@Component({
  selector: 'app-management-group',
  templateUrl: './management-group.component.html',
  styleUrls: ['./management-group.component.scss']
})
export class ManagementGroupComponent implements OnInit {

  menus: {};  // 一级菜单
  submenu;    // 二级菜单
  checkOptionsOne: [];
  global;
  allChecked = false;
  indeterminate = false;
  stepActive = [true, false, false];  // 下一步标题高亮显示
  oneStep = true;  // 菜单可视显示
  menuIndex = 0;
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
  // 点击二级菜单的复选框
  updateSingleChecked(checkOptionsOne, menuData, index): void {
    if (checkOptionsOne.every(item => item.checkOptionsOne[0].checked === false)) {
      this.menus[index].allChecked = false;
    } else if (checkOptionsOne.every(item => item.checkOptionsOne[0].checked === true)) {
      this.menus[index].allChecked = true;
    } else {
      this.menus[index].allChecked = false;
    }
  }
  //  点击全选
  updateAllChecked(menu): void {
    if (menu.allChecked) {
      this.submenu[menu.state] = this.submenu[menu.state].map(item => {
        item.checkOptionsOne = item.checkOptionsOne.map(data => {
          return {
            ...data,
            checked: true
          };
        });
        return {
          ...item
        };
      });
    } else {
      this.submenu[menu.state] = this.submenu[menu.state].map(item => {
        item.checkOptionsOne = item.checkOptionsOne.map(data => {
          return {
            ...data,
            checked: false
          };
        });
        return {
          ...item
        };
      });
    }
  }

  // 下一步
  nextStep() {
    if (this.menuIndex < 2) {
      this.menuIndex += 1;
      this.commonStep();
    }
  }
  //  上一步
  previousStep() {
    if (this.menuIndex > 0) {
      this.menuIndex -= 1;
      this.commonStep();
    }
  }
  commonStep() {
    this.stepActive.forEach((data, index) => {
      if (index <= this.menuIndex) {
        this.stepActive[index] = true;
      } else {
        this.stepActive[index] = false;
      }
    });
  }
}
