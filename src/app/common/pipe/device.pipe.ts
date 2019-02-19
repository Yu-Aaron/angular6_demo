import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'device'
})
export class DevicePipe implements PipeTransform {

    transform(arr: Array<any>): string {
        let key = arr[0];
        let value = arr[1];
        const data = {
            networkInterface: {
                'mainboard': '板载网卡',
                'slot1': '槽位1',
                'slot2': '槽位2'
            },
            networkInterfaceType: {
                'FIBRE': '光口',
                'TP': '电口'
            },
            convertBackType: {
                'mwbus': '业务备份',
                'mwsys': '系统备份',
                undefined: '无'
            }
        };
        return data[key][value] ? data[key][value] : value;
    }
}
