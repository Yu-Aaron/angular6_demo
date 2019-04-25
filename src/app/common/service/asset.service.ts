import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class AssetService {
  baseUrl = 'api/v2.0';
  url = this.baseUrl + '/devices/topology/';

  constructor(
    public http: HttpClient,
    public commonService: CommonService
  ) { }

  /************网络设备开始*************/
  getModels(params) {// 网络设备型号
    return this.http.get(this.url + (this.commonService.topologyId ? this.commonService.topologyId : '0') + '/models',
      { params: this.commonService.encodeURL(params) });
  }
  /************网络设备结束*************/

}
