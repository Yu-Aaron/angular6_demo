import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CommonService} from './common.service';
import {HttpHeaders} from '../../../../node_modules/@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class LogService {

    constructor(private http: HttpClient, private commonService: CommonService) {
    }

    baseUrl = 'api/v2.0';
    topologyId = sessionStorage.getItem('topologyId');
    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded'
        })
    };

    // 运行日志
    getRunningLog(params) {
        return this.http.get(this.baseUrl + '/events/topology/' + this.topologyId, {params: this.commonService.encodeURL(params)});
    }

    getRunningLogCount(params) {
        return this.http.get(this.baseUrl + '/events/topology/' + this.topologyId + '/count', {params: this.commonService.encodeURL(params)});
    }

    // 操作日志
    getOpetateLog(params) {
        return this.http.get(this.baseUrl + '/operationlogs/topology/' + this.topologyId  + '/all', {params: this.commonService.encodeURL(params)});
    }

    getOpetateLogCount(params) {
        return this.http.get(this.baseUrl + '/operationlogs/topology/' + this.topologyId  + '/all/count', {params: this.commonService.encodeURL(params)});
    }

    // 导出
    getAllExport(params, psw, type) {
        let pdata = psw ? { password: psw } : null;
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
        return this.http.post(this.baseUrl + '/' + type + '/topology/' + this.topologyId + '/all/export?' + params, ppp, this.httpOptions);
    }

}

