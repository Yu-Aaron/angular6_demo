import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'transformTitle'
})
export class TransformTitlePipe implements PipeTransform {

    transform(value: string): string {
        const data = {
            monitor: '首页',
            securityaudit: '安全审计',
            strategyaudit: '审计策略',
            asset: '资产管理',
            tool: '调试工具',
            log: '系统日志',
            setting: '系统设置',
            systemrunning: '系统运行实况',
            riskassessment: '今日风险评估',
            incidentaudit: '事件审计',
            protocolaudit: '协议审计',
            flowaudit: '流量审计',
            logaudit: '审计日志',
            reportaudit: '审计报表',
            securitydomain: '安全域',
            strategy: '策略管理',
            vul: '威胁特征库',
            whitelist: '协议规则管理',
            ipmac: 'IP/MAC规则管理',
            maliciousdomain: '域名规则管理',
            topology: '网络拓扑',
            factorydevice: '工控设备列表',
            networkdevice: '网络设备列表',
            terminal: '模拟终端',
            capture: '抓包',
            runninglog: '系统运行日志',
            operatelog: '系统操作日志',
            usermanagement: '用户管理',
            loginmanagement: '登录设置',
            businessmanagement: '业务设置',
            devicemanagement: '设备设置'
        };
        return data[value] ? data[value] : value;
    }
}
