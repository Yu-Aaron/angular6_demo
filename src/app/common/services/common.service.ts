import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class CommonService {

    constructor(private http: HttpClient) {
    }
    baseUrl = 'api/v2.0/';
    topology = {};
    topologyId: string;
    getDomain() {
        if(sessionStorage.getItem("topologyId")){
            this.topologyId = sessionStorage.getItem("topologyId");
        }
        const url = `${this.baseUrl}domains/`;
        return this.http.get(url).subscribe((data)=> {
            this.topology = data[0].domainInfo;
            this.topologyId = data[0].domainInfo.currentTopologyId;
            console.log('0000', this.topology);
            sessionStorage.setItem("topologyId", this.topologyId);
        });
    }
}
