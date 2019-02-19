import { SystemService } from 'src/app/common/services/system.service';
import { Component, OnInit } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

var self;
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  params: {};
  dataSet;
  userBasicTable;
  tableTotalData: number;
  pageSize: number = 10;   // 每页展示10个数据
  pageTotalNumber: number;
  loading = true;
  isVisible: boolean = false;
  strategyArr;
  message: {};
  userRoles;
  defaultRole: string;
  userInfo = {
    role: { id: '2' }
  };
  passwordLevel;
  regex: string;
  pasword_text: string;
  p_password_text: string;
  modelTitle: string;
  fooletrTitle: string;
  editProperty: boolean = false;
  editData;
  userName: string;

  validateForm: FormGroup;

  constructor(
    private systemService: SystemService,
    private notification: NzNotificationService,
    private fb: FormBuilder
  ) {
    self = this;
    self.params = {
      $limit: 10,
      $skip: 0
    };
    self.message = {
      name: false,
      password: {
          value: 0
      },
      passwordValidate: {
          value: 1
      }
    };
  }

  ngOnInit() {
    self.validateForm = self.fb.group({
      userName: [ null, [ Validators.required, this.validatorName ] ],
      password: [ null, [ this.validatorPassword ] ],
      role: [ null, [ Validators.required ] ],
      locked: [null],
      validate_password: [ null, [ this.validatorP_Password ] ],
    })
    self.getUserData();
  }

  // 用户名验证
  validatorName() {
    if (self.validateForm && self.validateForm.controls.userName.value) {
      self.userName = self.validateForm.controls.userName.value;
      self.systemService.checkUser(self.userName).subscribe((data) => {
        self.message.name = data;
      })
    }
  }

  validatorP_Password() {
    if (self.validateForm) {
      self.validator();
      self.p_password_text = self.validateForm.controls.validate_password.value;
      if (self.p_password_text === null || self.p_password_text === '') {
        self.message.passwordValidate.value = 1;
      } else if (self.p_password_text !== '' && self.pasword_text !== self.p_password_text) {
          self.message.passwordValidate.value = 2;
      } else if (self.p_password_text !== '' && self.p_password_text !== null && self.pasword_text === self.p_password_text && self.regex.test(self.p_password_text)) {
          self.message.passwordValidate.value = 3;
      }
    }
  }

  validator() {
    self.regex = /^(?![a-zA-z]+$)(?!\d+$)(?![!@#$%^&*]+$)(?![a-zA-z\d]+$)(?![a-zA-z!@#$%^&*]+$)(?![\d!@#$%^&*]+$)[a-zA-Z\d!@#$%^&*]{8,25}$/;
    var regexHigh = /^(?![a-zA-z]+$)(?!\d+$)(?![!@#$%^&*]+$)(?![a-zA-z\d]+$)(?![a-zA-z!@#$%^&*]+$)(?![\d!@#$%^&*]+$)[a-zA-Z\d!@#$%^&*]{12,25}$/;
    var regexLow = /^[a-zA-Z\d!@#$%^&*]{8,25}$/;
    if (self.passwordLevel === 4) {
      self.regex = regexLow;
    } else if (self.passwordLevel === 5) {
      self.regex = regexHigh;
    }
  }

  // 验证密码
  validatorPassword() {
    if (self.validateForm) {
      self.validator();
      self.pasword_text = self.validateForm.controls.password.value;
      if (self.pasword_text === null || self.pasword_text === '') {
        self.message.password.value = self.passwordLevel === 4 ? 4 : (self.passwordLevel === 5 ? 5 : 1);
        //$scope.message.password.value = 1;
      } else if (self.pasword_text !== '' && !self.regex.test(self.pasword_text)) {
          self.message.password.value = 2;
      } else if (self.pasword_text!=='' && self.pasword_text!==null && self.regex.test(self.pasword_text)) {
          self.message.password.value = 3;
      }
    }
  }
  // 获取用户数据
  getUserData() {
    self.systemService.getUsers(self.params).subscribe((data) => {
      self.loading = false;
      console.log(data);
      self.dataSet = data['data'].sort(self.compare('createdAt'));
      self.tableTotalData = data['count'];
      self.pageTotalNumber = Math.ceil(self.tableTotalData / self.pageSize);
    }, (error) => {
      self.loading = false;
    })
  }

  //根据创建时间排序
  compare(property) {
    return function (a, b) {
        var value1 = new Date(a[property]);
        var value2 = new Date(b[property]);
        return Number(value2) - Number(value1);
    };
  }

  // 删除用户
  deleteUser(user) {
    self.systemService.deleteUser(user.userId).subscribe((data) => {
      self.notification.create('success', '删除成功','');
      self.getUserData();
    }, (error) => {
      self.notification.create('error', '删除失败','');
    })
  }

  // 新增用户
  addUser(title, foolter, data): void {
    self.editData = data;
    self.modelTitle = title + '用户';
    self.fooletrTitle = foolter;
    self.isVisible = true;
    if (data) {
      self.editProperty = true;
      self.userInfo = {
        name : data.name,
        role : {
          id : data._roles[0].roleId
        },
        locked: data.locked ? '是' : '否',
        password: data.passwordHash,
        passwordValidate: data.passwordHash
      };

    } else {
      self.editProperty = false;
      self.userInfo.password = '',
      self.userInfo.passwordValidate = '';
    }
    self.message = {
      name: false,
      password: {
          value: 0
      },
      passwordValidate: {
          value: 1
      }
    };
    // 密码强度获取
    self.systemService.getStrategyInfo().subscribe((data) => {
      self.strategyArr = data;
      self.strategyArr.forEach(function (el) {
        if (el.strategyInfo.strategyCode === "PASSWORD_COMPLEXITY_MANAGEMENT") {
            if (el.strategyRules[0].ruleData === '低') {
              self.message.password.value = 4;
              self.passwordLevel = self.message.password.value;
            } else if (el.strategyRules[0].ruleData === '中') {
              self.message.password.value = 1;
              self.passwordLevel = self.message.password.value;
            } else {
              self.message.password.value = 5;
              self.passwordLevel = self.message.password.value;
            }
        }
      });
    })
    // 角色获取
    self.systemService.getRoles().subscribe((data) => {
      self.userRoles = self.formatRoles(data);
      if (self.editData) {
        self.defaultRole = self.editData._roles[0].name;
      } else {
        self.defaultRole = self.userRoles[0].value;
      }
    })
  }
  //格式化角色数据
  formatRoles (data) {
    var formatData = [];
    for (var i = 0; i < data.length; i++) {
        var item = {
            id: data[i].roleId,
            label: data[i].name,
            value: data[i].name
        };
        formatData.push(item);
    }
    return formatData;
  };

  handleCancel(): void {
    self.isVisible = false;
  }

  // 角色切换
  selectRoleChange(event) {
    if (self.userRoles) {
      self.userRoles.forEach(function(e) {
        if (e.label === event) {
          self.userInfo.role.id = e.id;
        }
      })
    }
  }

  // 点击确定
  handleOk(): void {
    var conditions = {
      name: self.validateForm.controls.userName.value,
      passwordHash: self.pasword_text,
      _roles: [{ roleId: self.userInfo.role.id }]
    };
    self.systemService.createUser(conditions).subscribe((data) => {
      self.notification.create('success', '添加成功','');
      self.getUserData();
      self.isVisible = false;
    }, error => {
      self.notification.create('error', '添加失败','');
    })
  }

  // 编辑用户 点击确定
  handleOkEdit() {
    var conditions = {
      name: self.editData.name,
      passwordHash: self.pasword_text,
      _roles: [{ roleId: self.userInfo.role.id }],
      locked: self.userInfo.locked === '是' ? true : false,
      userId: self.editData.userId
    };
    self.systemService.editUser(conditions).subscribe((data) => {
      self.notification.create('success', '更新成功','');
      self.getUserData();
      self.isVisible = false;
    }, error => {
      self.notification.create('error', '更新失败','');
    })
  }

}
