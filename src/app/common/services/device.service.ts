import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CommonService} from './common.service';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class DeviceService {

    constructor(private http: HttpClient, private commonService: CommonService) {
    }

    baseUrl = 'api/v2.0';
    topologyId = sessionStorage.getItem("topologyId");

    getMockJs() {
        return this.http.get('assets/jsons/device.json');
    }

    getSystemStatus() {
        return this.http.get(this.baseUrl + '/systemsetting');
    }

    getNetworkInterfaces() {
        return this.http.get(this.baseUrl + '/systemsetting/networkInterface');
    }

    updateNetworkInterface(soltName, portName, params) {
        return this.http.post(this.baseUrl + '/systemsetting/networkInterface/slotNum/' + soltName + '/port/' + portName, {params: params});
    }

    getConfBackUpInfo(params) {
        return this.http.get(this.baseUrl + '/devices/backupinfos', {params: this.commonService.encodeURL(params)});
    }

    updateNtpSync(ip, flag) {
        let params = { "ntpIp": ip, "activateNtp": flag };
        return this.http.post(this.baseUrl + '/systemsetting/topology/' + this.topologyId + '/ntp', {params: params});
    }

    setSystemTime(time) {
        let params = { 'systemTime': time };
        return this.http.post( this.baseUrl + '/systemsetting/topology/' + this.topologyId  + '/systemtime', {params: params});
    }

    getJobStrategyInfo(data) {
        return this.http.get(this.baseUrl + '/jobscheduler/jobbuilder/category/' + data);
    }

    updateStradegyJobBuilder(params) {
        return this.http.put(this.baseUrl + '/jobscheduler/jobbuilder', {params: params});
    }

    getStrategyInfo() {
        return this.http.get(this.baseUrl + '/strategymanagement/strategybuilders');
    }

    updateStorageInfo(params) {
        return this.http.put( this.baseUrl + '/strategymanagement/strategyrule/ruledata', {params: params});
    }

    shutdownSystem(topoId) {
        return this.http.post(this.baseUrl + '/systemsetting/topology/' + topoId + '/shutdown/mw', {flag: true});
    }

    restartSystem(topoId) {
        return this.http.post(this.baseUrl + '/systemsetting/topology/' + topoId + '/restart/mw', {flag: true});
    }

    resetSystem(topoId) {
        return this.http.post(this.baseUrl + '/systemsetting/topology/' + topoId + '/factoryreset/mw', {flag: true});
    }

    getSerialNumber() {
        return this.http.get(this.baseUrl + '/sysbaseinfo/serialnumber');
    }

    getLastUpgrade(){
        return this.http.get(this.baseUrl + '/files/console/lastsuccessfulupgrade');
    }

    startUpgrade() {
        return this.http.post(this.baseUrl + '/files/console/upgrade?asynch=true', null);
    }

    getServerStatus() {
        return this.http.get(this.baseUrl + '/sysbaseinfo/curtime');
    }

    freshUpgradeStatus(asynchUrl) {
        return this.http.post(asynchUrl, null);
    }

    isDPIUpgrading(deviceId) {
        return this.http.get(this.baseUrl + '/devices/upgrade').subscribe((data:any) => {
            for (let i = 0; i < data.length; i++) {
                if (deviceId) {
                    if (deviceId === data[i].deviceId) {
                        return (data[i].state !== 'NONE' && !data[i].error);
                    }
                } else if (data[i].state !== 'NONE' && !data[i].error) {
                    return true;
                }
            }
            return false;
        }, () => {return true});
    }

}
