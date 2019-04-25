import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CommonService} from './common.service';

@Injectable({
    providedIn: 'root'
})
export class SecurityAuditService {

    constructor(private http: HttpClient, private commonService: CommonService ) {
    }

    baseUrl = 'api/v2.0';
    topologyId = sessionStorage.getItem('topologyId');

    getAll(params) {
        return this.http.get(this.baseUrl + '/incidents/topology/' + this.topologyId, {params: this.commonService.encodeURL(params)});
    }

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


}

