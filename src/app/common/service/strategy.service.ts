import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonService } from './common.service';
import { UcdService } from './ucd.service';

@Injectable({
  providedIn: 'root'
})

export class StrategyService {
  baseUrl = 'api/v2.0';

  constructor(
    public http: HttpClient,
    public commonService: CommonService,
    public ucdService: UcdService
  ) { }

  /*********安全域开始**********/
  // 查询安全域列表
  getSecurityDomainAll(params) {
    return this.http.get(this.baseUrl + '/policies/topology/' + this.commonService.topologyId + '/securityarea', {
      params: this.commonService.encodeURL(params)
    });
  }

  // 获取安全域列表总数
  getSecurityDomainCount(params) {
    return this.http.get(this.baseUrl + '/policies/topology/' + this.commonService.topologyId + '/securityarea/count', {
      params: this.commonService.encodeURL(params)
    });
  }

  // 策略列表
  getAllStrategy(params) {
    return this.http.get(this.baseUrl + '/policies/auditpolicy/', {
      params: this.commonService.encodeURL(params)
    });
  }

  // 查询安全域最大ID
  getMaxId() {
    return this.http.get(this.baseUrl + '/policies/topology/' + this.commonService.topologyId + '/securityarea/id/max');
  }

  // 查询安全域当前所有ID
  getIds() {
    return this.http.get(this.baseUrl + '/policies/topology/' + this.commonService.topologyId + '/securityarea/id/all');
  }

  // 获取可用接口成员
  getUnrelatedPorts() {
    return this.http.get(this.baseUrl + '/policies/topology/' + this.commonService.topologyId + '/securityarea/port/unrelated');
  }

  // 新增安全域
  createSecurityArea(securityArea) {
    return this.http.post(this.baseUrl + '/policies/topology/' + this.commonService.topologyId + '/securityarea', securityArea);
  }

  // 修改安全域
  updateSecurityArea(securityArea) {
    return this.http.put(this.baseUrl + '/policies/topology/' + this.commonService.topologyId + '/securityarea', securityArea);
  }

  // 删除安全域
  deleteSecurityArea(securityAreaId) {
    return this.http.delete(this.baseUrl + '/policies/topology/' + this.commonService.topologyId + '/securityarea/' + securityAreaId);
  }

  // 启动安全域
  enableSecurityArea(securityAreaId) {
    return this.http.put(this.baseUrl + '/policies/topology/' + this.commonService.topologyId + '/securityarea/' + securityAreaId + '/operation/enable', null);
  }

  // 停止安全域
  disableSecurityArea(securityAreaId) {
    return this.http.put(this.baseUrl + '/policies/topology/' + this.commonService.topologyId + '/securityarea/' + securityAreaId + '/operation/disable', null);
  }

  /*********安全域结束**********/
  /*********审计策略开始**********/
  // 某一具体策略详情
  getStrategyDetail(auditPolicyId) {
    return this.http.get(this.baseUrl + '/policies/auditpolicy/' + auditPolicyId);
  }

  // 查询策略与规则的绑定关系
  getAllRuleLinkAll(auditPolicyId, auditPolicyRuleType, params) {
    return this.http.get(this.baseUrl + '/policies/auditpolicy/' + auditPolicyId + '/auditpolicyruletype/' + auditPolicyRuleType + '/rulelinks', {
      params: this.commonService.encodeURL(params)
    });
  }

  // 查询威胁特征库详情
  getSignatureContentbyBlockId(policyBlockId) {
    return this.http.get(this.baseUrl + '/policies/block/' + policyBlockId);
  }

  // 威胁特征详情特征项列表数据
  getSignaturesbyBlockId(blockId) {
    return this.http.get(this.ucdService.getUrl('') + this.baseUrl + '/policies/block/' + blockId + '/signatures');
  }
  /*********审计策略结束**********/
}
