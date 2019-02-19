import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {CommonService} from './common.service';

@Injectable({
  providedIn: 'root'
})
export class SystemService {
  url = '/api/v2.0';
  topologyId = sessionStorage.getItem("topologyId");

  constructor(private http: HttpClient, private commonService: CommonService) { }

  /****************login-config START********************/
  getStrategyInfo() {
    return this.http.get(this.url + '/strategymanagement/strategybuilders');
  }

  updateTimeoutAndLock(data) {// 登出时间 锁定时长
    return this.http.put(this.url + '/strategymanagement/idletimestrategyrule/ruledata', data);
  }

  updateMaxLoginTry(data) {// 登录次数
    return this.http.put(this.url + '/strategymanagement/maxlogintrystrategyrule/ruledata', data);
  }
  
  updatePasswordComplexity(data) {// 密码强度
    return this.http.put(this.url + '/strategymanagement/passwordcomplexitystrategyrule/ruledata', data);
  }

  getRemoteIp() {
    return this.http.get(this.url + '/strategymanagement/strategybuilder/strategycode/IP_LOGIN_MANAGEMENT');
  }

  createRemoteIp(data) {
    return this.http.post(this.url+ '/strategymanagement/strategyrule/', data);
  }

  deleteRemoteIp(id) {
    return this.http.delete(this.url + '/strategymanagement/strategyrule/' + id);
  }
  /****************login-config END********************/

  // 用户管理
  getUsers(param) {
    return this.http.get(this.url + '/users', {
      params: this.commonService.encodeURL(param)
    })
  }
  deleteUser(userId) {
    return this.http.delete(this.url + '/users/' + userId);
  }

  getRoles() {
    return this.http.get(this.url + '/users/roles/');
  }

  checkUser(userName) {
    return this.http.get(this.url + '/users/username/' + userName);
  }

  createUser(user) {
    return this.http.post(this.url + '/users', user);
  }

  editUser(user) {
    return this.http.put(this.url + '/users', user);
  }


}
