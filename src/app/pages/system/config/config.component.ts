import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SystemService } from 'src/app/common/services/system.service';

@Component({
  selector: 'app-login-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss']
})
export class ConfigComponent implements OnInit {
  securityConfig = {
    isEdit: false
  };
  securitySetting = {
    timeoutManagement: {},
    maxLoginTryManagement: {},
    passwordComplexityManagement: {},
    loginLockingTime: {}
  };
  editedSecuritySetting = {
    timeoutManagement: { strategyRules: [{}] },
    maxLoginTryManagement: { strategyRules: [{}] },
    passwordComplexityManagement: { strategyRules: [{}] },
    loginLockingTime: { strategyRules: [{}] }
  };
  passwordStrength = {
    optionsList: [
      { id: 1, value: '低', tips: '任意字母、数字或字符，8位或以上，25位以下' },
      { id: 2, value: '中', tips: '必须是字母加数字和符号，8位或以上，25位以下' },
      { id: 3, value: '高', tips: '必须是字母加数字和符号，12位或以上，25位以下' },
    ],
    selectedValue: { id: 1, value: '低', tips: '任意字母、数字或字符，8位或以上，25位以下' }
  };
  remoteIpForm: FormGroup;
  remoteIpList = [];
  strategyRuleSetId = '';
  newIpVisible = false;
  ipIllegalFlag = false;

  constructor(private systemService: SystemService, private fb: FormBuilder) { }

  ngOnInit() {
    this.getStrategyInfo();
    this.getRemoteIp();
    this.remoteIpForm = this.fb.group({
      nickname: [null],
      ip: [null, [Validators.required]]
    })
  }

  getStrategyInfo() {
    this.systemService.getStrategyInfo().subscribe((data: Array<any>) => {
      if (data) {
        data.forEach((el) => {
          if (el.strategyInfo.strategyCode === "TIMEOUT_MANAGEMENT") { // 强制登出时间
            this.securitySetting.timeoutManagement = el;
            this.editedSecuritySetting.timeoutManagement.strategyRules[0] = el.strategyRules[0];
          } else if (el.strategyInfo.strategyCode === "MAX_LOGIN_TRY_MANAGEMENT") {  // 可尝试登录次数
            this.securitySetting.maxLoginTryManagement = el;
            this.editedSecuritySetting.maxLoginTryManagement.strategyRules[0] = el.strategyRules[0];
          } else if (el.strategyInfo.strategyCode === "PASSWORD_COMPLEXITY_MANAGEMENT") { // 密码强度
            this.securitySetting.passwordComplexityManagement = el;
            this.editedSecuritySetting.passwordComplexityManagement.strategyRules[0] = el.strategyRules[0];
            this.strengthChange(el.strategyRules[0].ruleData);
          } else if (el.strategyInfo.strategyCode === "LOGIN_LOCKING_TIME") { // 登陆失败锁定时长
            this.securitySetting.loginLockingTime = el;
            this.editedSecuritySetting.loginLockingTime.strategyRules[0] = el.strategyRules[0];
          }
        });
      }
    })
  }

  changeSecurityStatus(status) {
    if (status) {
      forkJoin([this.systemService.updateTimeoutAndLock(this.editedSecuritySetting.timeoutManagement.strategyRules[0]),
      this.systemService.updateMaxLoginTry(this.editedSecuritySetting.maxLoginTryManagement.strategyRules[0]),
      this.systemService.updatePasswordComplexity(this.editedSecuritySetting.passwordComplexityManagement.strategyRules[0]),
      this.systemService.updateTimeoutAndLock(this.editedSecuritySetting.loginLockingTime.strategyRules[0])]).subscribe(data => {
        if (data) {
          this.getStrategyInfo();
        }
      })
    }
    this.securityConfig.isEdit = false;
  }

  strengthChange(value) {
    this.passwordStrength.optionsList.forEach(data => {
      if (data.value == value) {
        this.passwordStrength.selectedValue = data;
      }
    });
  }

  getRemoteIp() {
    this.systemService.getRemoteIp().subscribe(data => {
      if (data) {
        for (var i = 0; i < data['strategyRules'].length; i++) {
          var tmp = data['strategyRules'][i];
          if (!tmp.strategyRuleName && tmp.ruleData === '0.0.0.0/0') {
            tmp.strategyRuleName = "允许所有IP地址访问";
          }
          tmp.errors = false;
        }
        this.remoteIpList = data['strategyRules'];
        this.strategyRuleSetId = data['strategyInfo'].strategyRuleSetId;
      }
    })
  }

  newIpOk() {
    let params = {
      strategyRuleSetId: this.strategyRuleSetId,
      strategyRuleCode: "EQ",
      ruleData: this.remoteIpForm.value.ip,
      strategyRuleName: this.remoteIpForm.value.nickname || '',
      rulePriority: 0,
      disabled: false,
      strategyRuleIdentifier: "VALID_IP"
    };
    if (!this.remoteIpForm.valid) { return; }
    this.systemService.createRemoteIp(params).subscribe(data => {
      if (data) {
        this.getRemoteIp();
        this.newIpVisible = false;
      }
    })
  }

  deleteRemoteIp(id) {
    this.systemService.deleteRemoteIp(id).subscribe(data => {
      if (data) {
        this.getRemoteIp();
      }
    })
  }

}
