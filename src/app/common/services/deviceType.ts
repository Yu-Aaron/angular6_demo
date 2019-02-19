import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class DeviceTypeService {
    obj = {
        'factoryTypes':{
            'workstation': '工作站',
            'subnet': '子网',
            'hmi': 'HMI',
            'opc_client': 'OPC 客户端',
            'opc_server': 'OPC 服务器',
            'plc': 'PLC',
            'unknown-device': '其它',
        },
        'networkTypes':{
            'switch': '网络交换机',
            'router': '路由器',
            'unknown-device': '其它',
        }
    };

    constructor() {
    }

    getFactoryType(type){
        return this.obj.factoryTypes[type];
    }

    getNetworkType = function (type) {
        return this.obj.networkTypes[type];
    };

    // simplifyModelName = function (name) {
    //     if (!$rootScope.simplifyModelName) {
    //         return name;
    //     }
    //     if (name && name.indexOf('/') !== -1) {
    //         var lst = name.split('/');
    //         var ret = lst[0] + '/' + lst[1].substring(0, 4);
    //         return ret;
    //     }
    //     return name;
    // };
}