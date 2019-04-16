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


}

