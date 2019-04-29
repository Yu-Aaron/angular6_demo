import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {CommonService} from './common.service';

@Injectable({
    providedIn: 'root'
})

export class SecurityAuditService {

    constructor(private http: HttpClient, private commonService: CommonService ) {
    }

    baseUrl = 'api/v2.0';
    topologyId = sessionStorage.getItem('topologyId');
    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded'
        })
    };

    getAll(params) {
        return this.http.get(this.baseUrl + '/incidents/topology/' + this.topologyId, {params: this.commonService.encodeURL(params)});
    }

    /******** 流量审计-设备流量*******/
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

    // 实时流量趋势图-获取当前设备信息
    getSelectedProtocols(deviceId) {
        let params = {
            $filter: '(iCDeviceMac eq \'' + deviceId + '\')'
        };
        return this.http.get(this.baseUrl + '/auditlogs/traffic/devicetype/ic/protocoltypes', {params: this.commonService.encodeURL(params)});
    }

    getProtocolTraffic(deviceId, protocol, startTime, endTime, params) {
        if (protocol === 'TRAFFIC_网络通用协议') {
            protocol = 'TRAFFIC_TRADITION';
        }
        if (protocol === 'TRAFFIC_其他') {
            protocol = 'TRAFFIC_OTHER';
        }
        let endTimeStr = this.commonService.formatDate(endTime);
        let startTimeStr = this.commonService.formatDate(startTime);
        return this.http.get(this.baseUrl + '/auditlogs/traffic/devicetype/ic/devices/' + deviceId + '/protocoltype/' + protocol + '/starttime/' + startTimeStr + '/endtime/' + endTimeStr, {params: this.commonService.encodeURL(params)});
    }

    // 协议分布图
    getProtocolTrafficStatistics(deviceId, startTime, endTime) {
        let endTimeStr = this.commonService.formatDate(endTime);
        let startTimeStr = this.commonService.formatDate(startTime);
        return this.http.get(this.baseUrl + '/auditlogs/traffic/devicetype/ic/protocolstats/devices/' + deviceId + '/starttime/' + startTimeStr + '/endtime/' + endTimeStr);
    }


    /******** 流量审计-工控协议流量*******/
    /******** 流量审计-安全域流量*******/

    /******** 审计日志*******/
    // 审计日志列表
    getLogAudit(params, type, hasAdvanceSearch) {
        let factory = ['normal', 'http', 'ftp', 'pop3', 'smtp', 'telnet'].indexOf(type) <= -1;
        if (type && factory && hasAdvanceSearch) {
            return this.http.get(this.baseUrl + '/auditlogs/detailinfo/type/' + type, {params: this.commonService.encodeURL(params)});
        }
        return this.http.get(this.baseUrl + '/auditlogs/topology/' + this.topologyId + '/heads', {params: this.commonService.encodeURL(params)});
    }

    // 审计日志列表总数
    getLogAuditCount(params, type, hasAdvanceSearch) {
        let factory = ['normal', 'http', 'ftp', 'pop3', 'smtp', 'telnet'].indexOf(type) <= -1;
        if (type && factory && hasAdvanceSearch) {
            return this.http.get(this.baseUrl + '/auditlogs/detailinfo/type/' + type + '/count', {params: this.commonService.encodeURL(params)});
        }
        return this.http.get(this.baseUrl + '/auditlogs/topology/' + this.topologyId + '/heads/count', {params: this.commonService.encodeURL(params)});
    }

    // 切换协议
    getData(params) {
        return this.http.get(this.baseUrl + '/policies/prompt', {params});
    }

    // 导出
    getAllExport(params, psw, type) {
        let pdata = psw ? { password: psw, clienttime: new Date().getTimezoneOffset() / 60 } : null;
        let str = [];
        let strParams = [];
        let ppp;
        params = this.commonService.encodeURL(params);
        for (let p in params) {
            if (params.hasOwnProperty(p)) {
                strParams.push(p + '=' + params[p]);
            }
        }
        params = strParams.join('&');
        params = params.replace(/%20/g, '%2520');
        for (let p in pdata) {
            if (pdata.hasOwnProperty(p)) {
                str.push(encodeURIComponent(p) + '=' + encodeURIComponent(pdata[p]));
            }
        }
        ppp = str.join('&');
        return this.http.post(this.baseUrl + '/auditlogs/topology/' + this.topologyId + '/' + type.toLowerCase() + '/export?' + params, ppp, this.httpOptions);
    }
    get(id, type) {
        return this.http.get(this.baseUrl + '/head/' + id + '/type/' + type);
    }

    // 详情列表
    getDetails(params, id, type) {
        return this.http.get(this.baseUrl + '/auditlogs/head/' + id + '/type/' + type, {params: this.commonService.encodeURL(params)});
    }

    // 详情列表总数
    getDetailsCount(id, type) {
        return this.http.get(this.baseUrl + '/auditlogs/head/' + id + '/type/' + type + '/count');
    }


}

