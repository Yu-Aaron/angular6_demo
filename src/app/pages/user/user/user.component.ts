import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../common/service/user.service';
import { NzNotificationService } from 'ng-zorro-antd';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  listOfData = [];   // 用户数据
  params: {};    // 参数
  total: number;  // 数据总条数
  pageSize = 10; // 每页展示多少条
  pages: number;   // 共多少页
  pageIndex = 1;
  loading: boolean;
  isVisible = false;

  strategyArr;
  userRoles;
  userInfo = {
    name: '',
    role: { id: '2', name: '' },
    locked: '',
    password: '',
    passwordValidate: ''
  };

  regex: string;

  modelTitle: string;
  fooletrTitle: string;

  editProperty = false;
  editData;

  constructor(
    private userService: UserService,
    private notification: NzNotificationService,
  ) {
    this.params = {
      $limit: 10,
      $skip: 0
    };
  }

  ngOnInit() {
    this.getUserTableData();
  }

  getUserTableData() {
    this.userService.getUser(this.params).subscribe(data => {
      this.loading = false;
      this.listOfData = data['data'].sort(this.compare('createdAt'));
      this.total = data['count'];
      this.pages = Math.ceil(this.total / this.pageSize);
    }, (error) => {
      this.loading = false;
    });
  }

  // 根据创建时间排序
  compare(property) {
    return function (a, b) {
        const value1 = new Date(a[property]);
        const value2 = new Date(b[property]);
        return Number(value2) - Number(value1);
    };
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

  // 新建用户
  addUser(title, foolter, data): void {
    this.modelTitle = title + '用户';
    this.fooletrTitle = foolter;
    this.isVisible = true;
    if (data) {
      this.editProperty = true;
      this.userInfo = {
        name : data.name,
        role : {
          id : data._roles[0].roleId,
          name : data._roles[0].name
        },
        locked: data.locked ? '是' : '否',
        password: data.passwordHash,
        passwordValidate: data.passwordHash
      };

    } else {
      this.editProperty = false;
      this.userInfo['password'] = '',
      this.userInfo['passwordValidate'] = '';
      this.userInfo['name'] = '';
      this.userInfo.role.id = '2';
    }
  }

  closeModal(event) {
    this.isVisible = event.isVisible;
    if (event.refresh) {
      this.getUserTableData();
    }
  }
}
