import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'transform'
})
export class TransformTitlePipe implements PipeTransform {

    transform(value: string): string {
        const data = {
            monitor: '风险概况',
            security: '安全监控',
            asset: '资产管理',
            report: '统计报表',
            log: '日志分析',
            threat: '威胁特征库',
            system: '系统设置',
            overview: '风险概况',
            secincident: '安全事件',
            networksession: '网络会话',
            protocol: '协议审计',
            flow: '流量分析',
            topology: '网络拓扑',
            securitydevice: '安全设备',
            factorydevice: '工控设备',
            networkdevice: '网络设备',
            statistics: '统计报表',
            runninglog: '运行日志',
            operate: '操作日志',
            policy: '策略日志',
            featurelib: '威胁特征库',
            user: '用户管理',
            config: '登录设置',
            business: '业务设置',
            device: '设备设置'
        };
        return data[value] ? data[value] : value;
    }
}
