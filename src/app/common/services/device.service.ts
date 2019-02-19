import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {CommonService} from './common.service';

@Injectable({
    providedIn: 'root'
})

export class DeviceService {
    baseUrl = 'api/v2.0';
    topologyId = sessionStorage.getItem('topologyId');

    constructor(private http: HttpClient, private commonService: CommonService) {
    }

    //模拟数据
    getMockJs() {
        return this.http.get('assets/jsons/device.json');
    }

    /*****基本设置模块******/
    //网络端口配置
    getNetworkInterfaces() {
        return this.http.get(this.baseUrl + '/systemsetting/networkInterface');
    }

    //更新网络端口配置
    updateNetworkInterface(soltName, portName, params) {
        return this.http.post(this.baseUrl + '/systemsetting/networkInterface/slotNum/' + soltName + '/port/' + portName, params);
    }

    //时钟同步
    getSystemStatus() {
        return this.http.get(this.baseUrl + '/systemsetting');
    }

    //更新Ntp
    updateNtpSync(ip, flag) {
        let params = {'ntpIp': ip, 'activateNtp': flag};
        return this.http.post(this.baseUrl + '/systemsetting/topology/' + this.topologyId + '/ntp', params);
    }

    //设置系统时间
    setSystemTime(time) {
        let params = {'systemTime': time};
        return this.http.post(this.baseUrl + '/systemsetting/topology/' + this.topologyId + '/systemtime', params);
    }

    //定期删除信息、查询自动备份是否开启
    getJobStrategyInfo(data) {
        return this.http.get(this.baseUrl + '/jobscheduler/jobbuilder/category/' + data);
    }

    //存储管理配置
    getStrategyInfo() {
        return this.http.get(this.baseUrl + '/strategymanagement/strategybuilders');
    }

    //更新存储管理配置
    updateStorageInfo(params) {
        return this.http.put(this.baseUrl + '/strategymanagement/strategyrule/ruledata', params);
    }

    /*****系统设置模块******/
    //系统关机
    shutdownSystem(topoId) {
        return this.http.post(this.baseUrl + '/systemsetting/topology/' + topoId + '/shutdown/mw', {flag: true});
    }

    //系统重启
    restartSystem(topoId) {
        return this.http.post(this.baseUrl + '/systemsetting/topology/' + topoId + '/restart/mw', {flag: true});
    }

    //恢复出厂设置
    resetSystem(topoId) {
        return this.http.post(this.baseUrl + '/systemsetting/topology/' + topoId + '/factoryreset/mw', {flag: true});
    }

    /*****系统升级模块******/
    //系统版本号
    getSerialNumber() {
        return this.http.get(this.baseUrl + '/sysbaseinfo/serialnumber');
    }

    //上次更新时间
    getLastUpgrade() {
        return this.http.get(this.baseUrl + '/files/console/lastsuccessfulupgrade');
    }

    //开始升级
    startUpgrade() {
        return this.http.post(this.baseUrl + '/files/console/upgrade?asynch=true', null, {observe: 'response'});
    }

    getServerStatus() {
        return this.http.get(this.baseUrl + '/sysbaseinfo/curtime');
    }

    freshUpgradeStatus(asynchUrl) {
        return this.http.post(asynchUrl, null);
    }

    isDPIUpgrading() {
        return this.http.get(this.baseUrl + '/devices/upgrade');
    }

    /*****系统备份模块******/
    //开启或关闭自动备份
    updateStradegyJobBuilder(params) {
        return this.http.put(this.baseUrl + '/jobscheduler/jobbuilder', params);
    }

    //手动备份
    doConfBackUp(payload) {
        return this.http.post(this.baseUrl + '/devices/backup', payload);
    }

    getTask(taskId) {
        return this.http.get(this.baseUrl + '/tasks/' + taskId);
    }

    //备份文件列表
    getConfBackUpInfo(params) {
        return this.http.get(this.baseUrl + '/devices/backupinfos', {params: this.commonService.encodeURL(params)});
    }

    //备份文件数量
    getConfBackUpInfoCount(params) {
        return this.http.get(this.baseUrl + '/devices/backupinfos/count', {params: this.commonService.encodeURL(params)});
    }

    //删除备份文件
    deleteBackUpFiles(ids) {
        return this.http.request('delete', this.baseUrl + '/devices/backup', {body:ids});
    }

}
