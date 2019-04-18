import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'transformTitle'
})
export class TransformTitlePipe implements PipeTransform {

    transform(value: string): string {
        const data = {
            securityaudit: '安全审计',
            incidentaudit: '事件审计',
            flowaudit: '流量审计',
            protocolaudit: '协议审计',
            logaudit: '审计日志',
            reportaudit: '审计报表',
            strategyaudit: '策略管理',
            securitydomain: '安全域',
            strategy: '审计策略',
            vul: '策略项',
            learning: '智能学习',
            asset: '资产管理',
            topology: '网络拓扑',
            factorydevice: '工控设备列表',
            networkdevice: '网络设备列表',
            setting: '配置管理',
            basic: '基础设置',
            protocol: '协议端口配置',
            interface: '接口设置',
            debug: '抓包',
            backup: '备份升级',
            login: '登录设置',
            usermanagement: '用户管理',
            user: '用户列表',
            usergroup: '用户组管理',
            log: '日志管理',
            runninglog: '运行日志',
            operatelog: '操作日志'
        };
        return data[value] ? data[value] : value;
    }
}
