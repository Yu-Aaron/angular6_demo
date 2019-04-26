import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class SettingService {
  baseUrl = 'api/v2.0/';

  constructor(
    public http: HttpClient,
    public commonService: CommonService
  ) { }

  /*******协议端口开始********/
  // 获取协议映射列表 DEFAULT默认 CUSTOM私有
  getPrivateProtocols(type, params?) {
    return this.http.get(this.baseUrl + '/privateprotocols?$filter=dataType eq ' + type, {
      params: this.commonService.encodeURL(params)
    });
  }
  /*******协议端口结束********/
}