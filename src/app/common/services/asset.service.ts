import {Injectable, } from '@angular/core';
import {HttpClient, HttpParams } from '../../../../node_modules/@angular/common/http';
import {CommonService} from "./common.service";
import {TopologyService} from './topology.service';
// import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/operator/map';

@Injectable({
    providedIn: 'root'
})

export class AssetService {

    constructor(private http: HttpClient, private commonService: CommonService, private topoloyService: TopologyService) {
    }

    baseUrl = '/api/v2.0';
    url = '/devices/topology/';

    getAll(params, topoId){
        if(topoId){
            return this.http.get(this.baseUrl + this.url + topoId, {params: this.commonService.encodeURL(params)});
        }
    }

    getCount(params, topoId){
        if (topoId) {
            return this.http.get(this.baseUrl + this.url + topoId + '/count', {
                params: this.commonService.encodeURL(params)
            });
        }
    }

    getModels(params){
        return this.http.get(this.baseUrl + this.url + (this.commonService.topologyId ? this.commonService.topologyId:'0') + '/models', {params: this.commonService.encodeURL(params)});
    }

    allDevice():any{
        return this.topoloyService.getDevices(this.commonService.topologyId);
    }

    createDevice(params) {
        return this.http.post(this.baseUrl + this.url + this.commonService.topologyId, params);
    }

    createModel(params) {
        return this.http.post(this.baseUrl + this.url + this.commonService.topologyId + '/models', params);
    }

    createNodes(params) {
        return this.http.post(this.baseUrl + '/topologies/' + this.commonService.topologyId + '/nodes', params);
    }

    deleteOneDevice(deviceId) {
        return this.http.delete(this.baseUrl + this.url + this.commonService.topologyId + '/' + deviceId);
    }

    get(id) {
        return this.http.get(this.baseUrl + this.url + this.commonService.topologyId + '/' + id);
    }

    getBlocksRef(link, params) {
        return this.http.get(this.baseUrl + link, {
            params: this.commonService.encodeURL(params)
        });
    }

    getAllNodeZone(params) {
        return this.http.get(this.baseUrl + '/topologies/' + this.commonService.topologyId + '/allzones', {
            params: this.commonService.encodeURL(params)
        });
    }

    updateAllDevicePorts (topologyId, deviceId, data) {
        return this.http.put(this.baseUrl + this.url + topologyId + '/device/' + deviceId + '/deviceports', data);
    }

    updateNode(node) {
        return this.http.put(this.baseUrl + this.url + 'topologies/node/' + node.id, node);
    }

    update(deviceId, data) {
        return this.http.put(this.baseUrl + this.url + this.commonService.topologyId + '/' + deviceId, data);
    }

    updateNodeAssociation(deviceId, nodeZoneId) {
        return this.http.put(this.baseUrl + this.url + 'topologies/Device/' + deviceId + '/NodeZone/' + nodeZoneId,{});
    }

    getIconName(IconType, modelName) {
        let iconType = IconType ? IconType.toLowerCase() : 'unknown-device';
        if (iconType !== 'cnc' && iconType !== 'cloud' && iconType !== 'unknown-device' && iconType !== 'deltav' && iconType !== 'hmi' && iconType !== 'opc_client' && iconType !== 'opc_server' && iconType !== 'plc' && iconType !== 'router' && iconType !== 'switch' && iconType !== 'workstation' && iconType !== 'subnet' && iconType !== 'a1000-a' && iconType !== 'a1000-s' && iconType !== 'a1000-e' && iconType !== 'a1000-din' && iconType !== 'f1000' && iconType !== 'f1000-din') {
            iconType = 'unknown-device';
        }
        if (iconType === 'unknown-device' && modelName) {
            modelName = modelName.substring(modelName.lastIndexOf(" ") + 1);
            iconType = modelName.toLowerCase();
            if (['a1000-a', 'a1000-s', 'a1000-e', 'a1000-din', 'f1000', 'f1000-din'].indexOf(iconType) === -1) {
                iconType = 'unknown-device';
            }
        }
        if (iconType === 'kev-r400-bx' || iconType === 'kev-c400r') {
            iconType = 'kev-c400';
        }
        return iconType;
    }


}
