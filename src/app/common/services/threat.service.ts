import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ThreatService {
  policyurl = '/api/v2.0/policies/';
  topologyId = sessionStorage.getItem("topologyId");

  constructor(private http: HttpClient) { }
  // 特征列表及详情
  getFeature(pageIndex: number = 1, pageSize: number = 10, topologyId, policyId, status?, type?, category?, desc?, sid?, signame?) {
    var link = `${this.policyurl}topology/${topologyId}/policy/${policyId}/policytype/BLACKLIST/blocks`;
    link = this.getParams(link, status, type, category, desc, sid, signame);
    let params = new HttpParams()
      .append('$limit', `${pageSize}`)
      .append('$orderby', 'priority,name')
      .append('$skip', `${(pageIndex-1)*10}`);
    return this.http.get(link, {
      params
    });
  }

  // 特征列表数量
  getFeatureCount(topolgyId, policyId, status?, type?, category?, desc?, sid?, signame?) {
    var link = `${this.policyurl}topology/${topolgyId}/policy/${policyId}/policytype/BLACKLIST/blocks/count`;
    link = this.getParams(link, status, type, category, desc, sid, signame);
    return this.http.get(link);
  }

  // 特征详情中的特征项列表
  getFeaturebyBlockId(blockId) {
    let url = `${this.policyurl}block/${blockId}/signatures`;
    return this.http.get(url);
  }

  // 特征详情中特征性列表数量
  getFeatureCountByBlockId(blockId) {
    let url = `${this.policyurl}block/${blockId}/signatures/count`;
    return this.http.get(url);
  }

  getParams(link, status, type, category, desc, sid, signame) {
    if (status) {
      link = `${link}?lockstatus=${status}`;
    }
    if (type) {
      link = `${link}&type=${type}`;
    }
    if (category) {
      link = `${link}&category=${category}`;
    }
    if (desc) {
      link = `${link}&desc=${desc}`;
    }
    if (sid) {
      link = `${link}&sid=${sid}`;
    }
    if (signame) {
      link = `${link}&signame=${signame}`;
    }
    return link;
  }
}
