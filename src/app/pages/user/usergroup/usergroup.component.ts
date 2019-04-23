import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../common/service/user.service';

import { NzNotificationService } from 'ng-zorro-antd';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usergroup',
  templateUrl: './usergroup.component.html',
  styleUrls: ['./usergroup.component.scss']
})
export class UsergroupComponent implements OnInit {

  dataSet = [];   // 用户数据
  params: {};    // 参数
  total: number;  // 数据总条数
  pageSize = 10; // 每页展示多少条
  pages: number;   // 共多少页

  modelTitle: string;
  fooletrTitle: string;
  isVisible = false;    // modal 显示
  global: string;

  constructor(
    private userService: UserService,
    private notification: NzNotificationService,
    private route: Router,
  ) {
  }

  ngOnInit() {
    this.getUserTableData();
  }

  getUserTableData() {
    this.params = {
      $limit: 10,
      $skip: 0
    };
    this.userService.getUser(this.params).subscribe(data => {
      console.log(data);
      this.dataSet = data['data'];
      this.total = this.dataSet.length;
      this.pages = Math.ceil(this.total / this.pageSize);
    });
  }
  // 新建用户组
  addUserGroup(title, foolter, data): void {
    this.modelTitle = title + '用户';
    this.fooletrTitle = foolter;
    this.isVisible = true;
  }

  // 删除用户
  deleteUser(user) {
    this.userService.deleteUser(user.userId).subscribe((data) => {
      this.notification.create('success', '删除成功', '');
      this.getUserTableData();
    }, (error) => {
      this.notification.create('error', '删除失败', '');
    });
  }

  // 权限管理
  managementUserGroup() {
  }

  closeModal(event) {
    this.isVisible = event.isVisible;
    if (event.refresh) {
      this.getUserTableData();
    }
  }
}
