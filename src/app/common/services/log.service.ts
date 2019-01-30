import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class LogService {

    constructor(private http: HttpClient) {
    }

    baseUrl = 'api/v2.0/';
    topologyId = sessionStorage.getItem("topologyId");

    getPolicyLogList(pageIndex: number = 1, pageSize: number = 10): Observable<{}>  {
        let params = new HttpParams()
            .append('$skip', `${pageIndex}`)
            .append('$limit', `${pageSize}`)
            .append('$orderby', 'fwFlowdataId desc');


        const url = `${this.baseUrl}operationlogs/topology/${this.topologyId}/type/DpifwPacketAccounting`;
        return this.http.get(url, {
            params
        });
    }
    getPolicyLogCount() {
        const url = `${this.baseUrl}operationlogs/topology/${this.topologyId}/type/DpifwPacketAccounting/count`;
        return this.http.get(url);
    }
}
