import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'basicPipe'
})
export class BasicPipe implements PipeTransform {
    transform(value: any): string {
        let Obj = {
            cpu: 'CPU',
            ems: '内存',
            disc: '磁盘',
            temp: '温度',
            centralized: '集中管理配置',
            syslog: 'syslog',
            ruleCycle: '域名规则检测周期',
            ssh: 'SSH服务器',
            trafficAlarm: '无流量告警'
        };
        return Obj[value] || value;
    }
}
