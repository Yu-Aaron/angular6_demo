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

    /******** 事件审计*******/
    // 设备流量列表
    getDeviceTrafficList(startTime, endTime, params) {
        const endTimeStr = this.commonService.formatDate(endTime);
        const startTimeStr = this.commonService.formatDate(startTime);
        params = params || {};

        return this.http.get(this.baseUrl + '/auditlogs/traffic/devicetype/ic/devices/starttime/' + startTimeStr + '/endtime/' + endTimeStr, {params: this.commonService.encodeURL(params)});
    }

    getDeviceTrafficCount(startTime, endTime, params) {
        const endTimeStr = this.commonService.formatDate(endTime);
        const startTimeStr = this.commonService.formatDate(startTime);
        return this.http.get(this.baseUrl + '/auditlogs/traffic/devicetype/ic/devices/count/starttime/' + startTimeStr + '/endtime/' + endTimeStr, {params: this.commonService.encodeURL(params)});
    }

    /******** 审计日志*******/
    getLogAudit(params, type, hasAdvanceSearch) {
        let factory = ['normal', 'http', 'ftp', 'pop3', 'smtp', 'telnet'].indexOf(type) <= -1;
        if (type && factory && hasAdvanceSearch) {
            return this.http.get(this.baseUrl + '/auditlogs/detailinfo/type/' + type, {params: this.commonService.encodeURL(params)});
        }
        return this.http.get(this.baseUrl + '/auditlogs/topology/' + this.topologyId + '/heads', {params: this.commonService.encodeURL(params)});
    }

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

    getDetailsCount(id, type) {
        return this.http.get(this.baseUrl + '/auditlogs/head/' + id + '/type/' + type + '/count');
    }


}

