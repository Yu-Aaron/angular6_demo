import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CommonService} from './common.service';

@Injectable({
    providedIn: 'root'
})
export class HomeService {

    constructor(private http: HttpClient, private commonService: CommonService) {
    }

    baseUrl = 'api/v2.0';
    topologyId = sessionStorage.getItem('topologyId');

    // 设备概况
    getProgress() {
        return this.http.get(this.baseUrl + '/systemsetting/mw/systemstat');
    }

    // 接口状态
    getAllPorts(params) {
        return this.http.get(this.baseUrl + '/devices/ports', {params: this.commonService.encodeURL(params)});
    }

    // 安全域工作状态
    getAllSecurityarea(params) {
        return this.http.get(this.baseUrl + '/policies/topology/' + this.topologyId + '/securityarea', {params: this.commonService.encodeURL(params)});
    }

    // 设备流量列表
    getDeviceTrafficList(startTime, endTime, params) {
        const endTimeStr = this.commonService.formatDate(endTime);
        const startTimeStr = this.commonService.formatDate(startTime);
        params = params || {};

        return this.http.get(this.baseUrl + '/auditlogs/traffic/devicetype/ic/devices/starttime/' + startTimeStr + '/endtime/' + endTimeStr, {params: this.commonService.encodeURL(params)});
    }

    // 设备流量列表总数
    getDeviceTrafficCount(startTime, endTime, params) {
        const endTimeStr = this.commonService.formatDate(endTime);
        const startTimeStr = this.commonService.formatDate(startTime);
        return this.http.get(this.baseUrl + '/auditlogs/traffic/devicetype/ic/devices/count/starttime/' + startTimeStr + '/endtime/' + endTimeStr, {params: this.commonService.encodeURL(params)});
    }

    // 使用规则、威胁、自定义总数
    getBaseTotal() {
        return this.http.get(this.baseUrl + '/incidents/deployrule/count');
    }

    // 命中规则总数统计
    getActionTotal(params) {
        return this.http.get(this.baseUrl + '/incidents/incidentrule/count/starttime/' + params.starttime + '/endtime/' + params.endtime);
    }

    // 威胁Top10
    getSignatureCount(params) {
        return this.http.get(this.baseUrl + '/incidents/incidentstat/signature/starttime/' + params.starttime + '/endtime/' + params.endtime);
    }

    // 协议规则Top10
    getProtocolFlow(params) {
        return this.http.get(this.baseUrl + '/auditlogs/traffic/protocol/starttime/' + params.starttime + '/endtime/' + params.endtime);
    }

    // 自定义规则Top10
    getCustomTop(params) {
        return this.http.get(this.baseUrl + '/incidents/incidentstat/protocol/starttime/' + params.starttime + '/endtime/' + params.endtime);
    }


}

