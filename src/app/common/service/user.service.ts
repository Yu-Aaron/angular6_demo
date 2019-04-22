import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {CommonService} from './common.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
    private commonService: CommonService
    ) { }

  baseUrl = 'api/v2.0';

  getUser(params) {
    return this.http.get(this.baseUrl + '/users');
  }

  checkUser(userName) {
    return this.http.get(this.baseUrl + '/users/username/' + userName);
  }

  getStrategyInfo() {
    return this.http.get(this.baseUrl + '/strategymanagement/strategybuilders');
  }

  getRoles() {
    return this.http.get(this.baseUrl + '/users/roles/');
  }

  createUser(user) {
    return this.http.post(this.baseUrl + '/users', user);
  }

  editUser(user) {
    return this.http.put(this.baseUrl + '/users', user);
  }

  deleteUser(userId) {
    return this.http.delete(this.baseUrl + '/users/' + userId);
  }

}
