import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CommonService} from './common.service';

@Injectable({
    providedIn: 'root'
})
export class LogService {

    constructor(private http: HttpClient, private commonService: CommonService) {
    }

    baseUrl = 'api/v2.0';
    topologyId = sessionStorage.getItem('topologyId');


    getRunningLog(params) {
        return this.http.get(this.baseUrl + '/events/topology/' + this.topologyId, {params: this.commonService.encodeURL(params)});
    }

    getRunningLogCount(params) {
        return this.http.get(this.baseUrl + '/events/topology/' + this.topologyId + '/count', {params: this.commonService.encodeURL(params)});
    }

    getOpetateLog(params) {
        return this.http.get(this.baseUrl + '/operationlogs/topology/' + this.topologyId  + '/all', {params: this.commonService.encodeURL(params)});
    }

    getOpetateLogCount(params) {
        return this.http.get(this.baseUrl + '/operationlogs/topology/' + this.topologyId  + '/all/count', {params: this.commonService.encodeURL(params)});
    }

}

