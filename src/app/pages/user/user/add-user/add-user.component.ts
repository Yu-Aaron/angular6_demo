import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { UserService } from '../../../../common/service/user.service';
import { NzNotificationService } from 'ng-zorro-antd';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

var self;

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  @Input()
  isVisible: boolean;      // modal 是否显示
  @Input()
  modelTitle: string;     // modal title
  @Input()
  fooletrTitle: string;   // footer 文字显示
  @Input()
  editProperty: boolean;    // name 是否可以编辑
  @Input()
  userInfo: {};              // 用户的详细信息
  @Input()
  editData: {};              //  点击编辑用户传的数据
  @Input()
  lockedShow: boolean;       // 锁定是否显示
  @Output() closeModal = new EventEmitter();

  message: {};
  pasword_text: string;
  p_password_text: string;
  passwordLevel;
  userName: string;
  defaultRole: string;
  strategyArr;
  userRoles;
  regex: RegExp;

  transformToParent: {};

  validateForm: FormGroup;

  isConfirmLoading = false;

  constructor(
    private notification: NzNotificationService,
    private fb: FormBuilder,
    private userService: UserService
  ) {
    self = this;
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
      userName: [ null, [ this.validatorName ] ],
      password: [ null, [ this.validatorPassword ] ],
      role: [ null, [ Validators.required ] ],
      locked: [null],
      validate_password: [ null, [ this.validatorP_Password ] ],
    })
    self.message = {
      name: false,
      password: {
          value: 0
      },
      passwordValidate: {
          value: 1
      }
    };
    self.p_password_text = self.userInfo.password;
    self.getInitData();
  }

  // 初始化
  getInitData() {
    // 密码强度获取
    self.userService.getStrategyInfo().subscribe((data: any) => {
      self.strategyArr = data;
      self.strategyArr.forEach(function (el) {
        if (el.strategyInfo.strategyCode === 'PASSWORD_COMPLEXITY_MANAGEMENT') {
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
    });
    // 角色获取
    self.userService.getRoles().subscribe((data) => {
      self.userRoles = self.formatRoles(data);
      if (self.editData) {
        self.defaultRole = self.editData._roles[0].name;
      } else {
        self.defaultRole = self.userRoles[0].value;
      }
    });
  }

  // 格式化角色数据
  formatRoles (data) {
    const formatData = [];
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

  validator() {
    self.regex = /^(?![a-zA-z]+$)(?!\d+$)(?![!@#$%^&*]+$)(?![a-zA-z\d]+$)(?![a-zA-z!@#$%^&*]+$)(?![\d!@#$%^&*]+$)[a-zA-Z\d!@#$%^&*]{8,25}$/;
    const regexHigh = /^(?![a-zA-z]+$)(?!\d+$)(?![!@#$%^&*]+$)(?![a-zA-z\d]+$)(?![a-zA-z!@#$%^&*]+$)(?![\d!@#$%^&*]+$)[a-zA-Z\d!@#$%^&*]{12,25}$/;
    const regexLow = /^[a-zA-Z\d!@#$%^&*]{8,25}$/;
    if (self.passwordLevel === 4) {
      self.regex = regexLow;
    } else if (self.passwordLevel === 5) {
      self.regex = regexHigh;
    }
  }

  // 用户名验证
  validatorName() {
    if (self.validateForm && self.validateForm.controls.userName.value && self.validateForm.get('userName').dirty) {
      self.userName = self.validateForm.controls.userName.value;
      self.userService.checkUser(self.userName).subscribe((data) => {
        setTimeout(() => {
          self.message.name = data;
        }, 0);
      });
    }
  }

  // 验证密码
  validatorPassword() {
    if (self.validateForm && self.validateForm.get('password').dirty) {
      self.validator();
      self.pasword_text = self.validateForm.controls.password.value;
      if (self.pasword_text === null || self.pasword_text === '') {
        self.message.password.value = self.passwordLevel === 4 ? 4 : (self.passwordLevel === 5 ? 5 : 1);
      } else if (self.pasword_text !== '' && !self.regex.test(self.pasword_text)) {
          self.message.password.value = 2;
      } else if (self.pasword_text !== '' && self.pasword_text !== null && self.regex.test(self.pasword_text)) {
          self.message.password.value = 3;
      }
    }
  }

  // 确认密码验证
  validatorP_Password() {
    if (self.validateForm && self.validateForm.get('validate_password').dirty) {
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

  // 角色切换
  selectRoleChange(event) {
    if (self.userRoles && self.validateForm.get('role').dirty) {
      self.userRoles.forEach(function(e) {
        if (e.label === event) {
          self.userInfo.role.id = e.id;
        }
      });
    }
  }
  // 点击确定
  handleOk(): void {
    var conditions = {
      name: self.validateForm.controls.userName.value,
      passwordHash: self.userInfo.password,
      _roles: [{ roleId: self.userInfo.role.id }]
    };
    self.isConfirmLoading = true;
    setTimeout(() => {
      self.isVisible = false;
      self.isConfirmLoading = false;
    }, 2000);
    self.userService.createUser(conditions).subscribe((data) => {
      self.notification.create('success', '添加成功', '');
      self.transformToParent = {
        isVisible: false,
        refresh: true
      };
      self.closeModal.emit(self.transformToParent);
    }, error => {
      self.notification.create('error', '添加失败', '');
      self.transformToParent = {
        isVisible: false,
        refresh: false
      };
      self.closeModal.emit(self.transformToParent);
    });
  }

  // 编辑用户 点击确定
  handleOkEdit() {
    var conditions = {
      name: self.editData.name,
      passwordHash: self.p_password_text,
      _roles: [{ roleId: self.userInfo.role.id }],
      locked: self.userInfo.locked === '是' ? true : false,
      userId: self.editData.userId
    };
    self.isConfirmLoading = true;
    setTimeout(() => {
      self.isVisible = false;
      self.isConfirmLoading = false;
    }, 2000);
    self.userService.editUser(conditions).subscribe((data) => {
      self.notification.create('success', '更新成功', '');
      self.transformToParent = {
        isVisible: false,
        refresh: true
      };
      self.closeModal.emit(self.transformToParent);
    }, error => {
      self.notification.create('error', '更新失败', '');
      self.transformToParent = {
        isVisible: false,
        refresh: false
      };
      self.closeModal.emit(self.transformToParent);
    })
  }


  handleCancel(): void {
    this.isVisible = false;
    this.transformToParent = {
      isVisible: false,
      refresh: false
    };
    this.closeModal.emit(this.transformToParent);
  }

}
