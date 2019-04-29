import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class SettingService {

  constructor(
    private http: HttpClient,
    public commonService: CommonService
  ) { }

  baseUrl = '/api/v2.0';
  // 接口设置
  getManagementData() {
    return this.http.get(this.baseUrl + '/systemsetting/mgt/port');
  }
  // 接口设置编辑
  setManagementPort(obj) {
    return this.http.post(this.baseUrl + '/systemsetting/network', obj);
  }
  // 业务接口
  getBusinessData(params) {
    return this.http.get(this.baseUrl + '/systemsetting/business/port', {
      params: this.commonService.encodeURL(params)
    });
  }
  // 业务接口 清除
  clearPackets(portId) {
    return this.http.delete(this.baseUrl + '/systemsetting/packets/' + portId);
  }
  // 聚合接口
  getDeviceBondData(params) {
    return this.http.get(this.baseUrl + '/systemsetting/bond/port', {
      params: this.commonService.encodeURL(params)
    });
  }
  // 新增聚合接口
  getNewBondItems() {
    return this.http.get(this.baseUrl + '/devices/business/port');
  }

  addNewBond(params) {
    return this.http.post(this.baseUrl + '/systemsetting/bond', params);
  }
  // 聚合接口删除
  getDeleteSecurearea(portName) {
    return this.http.get(this.baseUrl + '/systemsetting/bond/enable/delete/' + portName);
  }
  deleteBondItem(portName, portId) {
    return this.http.delete( this.baseUrl + '/systemsetting/bond/' + portName + '/portId/' + portId);
  }
  getEditSecurearea(portName) {
    return this.http.get(this.baseUrl + '/systemsetting/bond/enable/edit/' + portName);
  }


  /*******协议端口开始********/
  // 获取协议映射列表 DEFAULT默认 CUSTOM私有
  getPrivateProtocols(type, params?) {
    return this.http.get(this.baseUrl + '/privateprotocols?$filter=dataType eq ' + type, {
      params: this.commonService.encodeURL(params)
    });
  }
  /*******协议端口结束********/
}
