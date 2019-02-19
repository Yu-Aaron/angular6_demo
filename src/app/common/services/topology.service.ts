import {Injectable, } from '@angular/core';
import {HttpClient, HttpParams } from '../../../../node_modules/@angular/common/http';
import {CommonService} from "./common.service";

@Injectable({
    providedIn: 'root'
})

export class TopologyService {

    constructor(private http: HttpClient,private commonService: CommonService) {
    }

    baseUrl = '/api/v2.0';
    url = '/topologies/';
    topologyId:any = {
        id: '',
        hasNode: false
    };
    getDevices(id) {
        return this.http.get(this.baseUrl + this.url + id + '/devices');
    }

    getNodes() {
        return this.http.get(this.baseUrl + this.url + this.commonService.topologyId + '/nodes');
    }

    getLinks(id) {
        return this.http.get(this.baseUrl + this.url + id + '/links');
    }

    deleteLink(deleteLinks, topoId) {
        return this.http.delete(this.baseUrl + this.url + topoId + '/links', deleteLinks);
    }

    getDeviceNodes(deviceId) {
        return this.http.get(this.baseUrl + this.url + 'device/' + deviceId + '/nodes');
    }
}