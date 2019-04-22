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
}
