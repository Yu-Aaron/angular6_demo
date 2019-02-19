import {CommonService} from './common.service';
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class SecurityService {
    baseUrl = 'api/v2.0';
    topologyId = sessionStorage.getItem('topologyId');
    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded'
        })
    };

    constructor(private http: HttpClient, private commonService: CommonService) {
    }

    /****安全事件模块*****/
    getSecurityTableData(params): Observable<any> {
        // topolopy id 是mock 的，后续得修改
        return this.http.get(this.baseUrl + '/incidents/topology/' + 'd3c327c1-6915-44df-a29d-9b214a24d65f', {
            params: this.commonService.encodeURL(params)
        });
    }

    // 获取总数
    getSecurityTableTotalData() {
        return this.http.get(this.baseUrl + '/incidents/topology/' + 'd3c327c1-6915-44df-a29d-9b214a24d65f' + '/incidentcount');
    }

    // 点击搜索按钮时调取的接口
    getSearchData(params) {
        return this.http.get(this.baseUrl + '/datadictionaries/topology/' + 'd3c327c1-6915-44df-a29d-9b214a24d65f' + '/type/incidents/source/' + params);
    }

    // 获取点击搜索按钮时的总数
    getFilterData(params) {
        return this.http.get(this.baseUrl + '/incidents/topology/' + 'd3c327c1-6915-44df-a29d-9b214a24d65f' + '/count', {
            params: this.commonService.encodeURL(params)
        });
    }

    // 标记所有未读为已读
    getMarkRead() {
        return this.http.put(this.baseUrl + '/incidents/topology/' + 'd3c327c1-6915-44df-a29d-9b214a24d65f' + '/markallread', '');
    }

    // 清空所有事件
    markAllDeleted() {
        return this.http.put(this.baseUrl + '/incidents/topology/' + 'd3c327c1-6915-44df-a29d-9b214a24d65f' + '/markalldeleted', '');
    }

    // 导出全部文件
    getAllExport(params, psw) {
        var pdata = psw ? {password: psw} : null;
        let str = [];
        let strParams = [];
        let ppp;
        params = this.commonService.encodeURL(params);
        for (let p in params) {
            if (params.hasOwnProperty(p)) {
                str.push(p + '=' + params[p]);
            }
        }
        for (let p in pdata) {
            if (pdata.hasOwnProperty(p)) {
                strParams.push(encodeURIComponent(p) + '=' + encodeURIComponent(pdata[p]));
            }
        }
        params = str.join('&');
        params = params.replace(/%20/g, '%2520');
        ppp = strParams.join('&');
        return this.http.post(this.baseUrl + '/incidents/topology/' + 'd3c327c1-6915-44df-a29d-9b214a24d65f' + '/export?' + params, ppp, this.httpOptions);
    }

    // 安全事件详情信息获取
    getId(id) {
        return this.http.get(this.baseUrl + '/incidents/topology/' + 'd3c327c1-6915-44df-a29d-9b214a24d65f/' + id);
    }

    getDeviceByIpOrMac(deviceip, deviceMac) {
        return this.http.get(this.baseUrl + '/devices/topology/' + 'd3c327c1-6915-44df-a29d-9b214a24d65f' + '/deviceip/' + deviceip + '/devicemac/' + deviceMac);
    }

    getDeviceBySerialNumber(topologyid, serialNumber) {
        return this.http.get(this.baseUrl + '/devices/topology/' + 'd3c327c1-6915-44df-a29d-9b214a24d65f' + '/serialnumber/' + serialNumber);
    }

    getIconName(IconType, modelName) {
        var iconType = IconType ? IconType.toLowerCase() : 'unknown-device';
        if (iconType !== 'cnc' && iconType !== 'cloud' && iconType !== 'unknown-device' && iconType !== 'deltav' && iconType !== 'hmi' && iconType !== 'opc_client' && iconType !== 'opc_server' && iconType !== 'plc' && iconType !== 'router' && iconType !== 'switch' && iconType !== 'workstation' && iconType !== 'subnet' && iconType !== 'a1000-a' && iconType !== 'a1000-s' && iconType !== 'a1000-e' && iconType !== 'a1000-din' && iconType !== 'f1000' && iconType !== 'f1000-din') {
            iconType = 'unknown-device';
        }
        if (iconType === 'unknown-device' && modelName) {
            modelName = modelName.substring(modelName.lastIndexOf(' ') + 1);
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


    /****网络会话模块*****/
    getSecurityDevice(params) {
        return this.http.get(this.baseUrl + '/devices/topology/' + this.topologyId, {params: this.commonService.encodeURL(params)});
    }

    getSessionTable(params, boxId) {
        return this.http.get(this.baseUrl + '/sessionmanage/sessionstate/device/' + boxId + '/all', {params: this.commonService.encodeURL(params)});
    }
}
