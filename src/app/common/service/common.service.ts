import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})

export class CommonService {

    constructor(private http: HttpClient) {
    }

    baseUrl = 'api/v2.0/';
    topology = {};
    topologyId: string;
    VALIDATE_IP = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

    getDomain() {
        if (sessionStorage.getItem('topologyId')) {
            this.topologyId = sessionStorage.getItem('topologyId');
        }
        const url = `${this.baseUrl}domains/`;
        return this.http.get(url).subscribe((data) => {
            this.topology = data[0].domainInfo;
            this.topologyId = data[0].domainInfo.currentTopologyId;
            sessionStorage.setItem('topologyId', this.topologyId);
        });
    }

    encodeURL(urlObj) {
        if (urlObj) {
            Object.keys(urlObj).forEach(function (key) {
                // urlObj[key] = encodeURI(urlObj[key]);
                if (typeof (urlObj[key]) === 'string') {
                    urlObj[key] = urlObj[key].replace(/\s/g, '%20');
                }
            });
        }
        return urlObj;
    }

    // contains 参数拼接
    filterFunc(q, fields) {
        return '((' + q.split(' ').map(function (qa) {
            return fields.map(function (field) {
                return 'contains(' + field + ',\'' + qa + '\')';
            }).join(' or ');
        }).join(') and (') + '))';
    }

    // 深度copy
    deepCopy(obj) {
        let o;
        switch (typeof obj) {
            case 'undefined': break;
            case 'string': o = obj + ''; break;
            case 'number': o = obj - 0; break;
            case 'boolean': o = obj; break;
            case 'object':
                if (obj === null) {
                    o = null;
                } else {
                    if (obj instanceof Array) {
                        o = [];
                        for (let i = 0, len = obj.length; i < len; i++) {
                            o.push(this.deepCopy(obj[i]));
                        }
                    } else {
                        o = {};
                        for (let k in obj) {
                            o[k] = this.deepCopy(obj[k]);
                        }
                    }
                }
                break;
            default:
                o = obj; break;
        }
        return o;
    }

    formatDate(date) {
        return (date.getUTCFullYear() + '-' + (((date.getUTCMonth() + 1) > 9) ? date.getUTCMonth() + 1 : ('0' + (date.getUTCMonth() + 1))) + '-' + ((date.getUTCDate() > 9) ? date.getUTCDate() : ('0' + date.getUTCDate())) + 'T' + ((date.getUTCHours() > 9) ? date.getUTCHours() : ('0' + date.getUTCHours())) + ':' + ((date.getUTCMinutes() > 9) ? date.getUTCMinutes() : ('0' + date.getUTCMinutes())) + ':' + ((date.getUTCSeconds() > 9) ? date.getUTCSeconds() : ('0' + date.getUTCSeconds())) + 'Z');
    }

    subnetValidation(subnetIp) {
        if (!subnetIp) {
            return false;
        }
        let maskNumerals = subnetIp.split('/');
        if (maskNumerals.length === 2 && maskNumerals[0].match(this.VALIDATE_IP) && maskNumerals[1] && maskNumerals[1] <= 32 && maskNumerals[1] >= 8) {
            return false;
        }
        return true;
    }

    // subnetOverlap(device, deviceList, subnetIp) {
    //     for (let i = 0; i < deviceList.length; i++) {
    //         let tmp = deviceList[i];
    //         if ((!device.deviceId || device.deviceId === '') && (!tmp.deviceId || tmp.deviceId === '')) {
    //             if (device.key === tmp.key) {
    //                 continue;
    //             }
    //         } else {
    //             if (device.deviceId === tmp.deviceId) {
    //                 continue;
    //             }
    //         }
    //         if (tmp.iconType === 'subnet') {
    //             if (this.checkOverLap(subnetIp, ((tmp.deviceId && tmp.deviceId !== '') ? tmp.devicePorts[0].portIp : tmp.subnetIp))) {
    //                 return true;
    //             }
    //         } else {
    //             if (tmp.category === 'FACTORY_DEVICE') {
    //                 for (let j = 0; j < tmp.devicePorts.length; j++) {
    //                     if (tmp.devicePorts[j].portIp && tmp.devicePorts[j].isMgmtPort && this.ipInSubnet(subnetIp, tmp.devicePorts[j].portIp)) {
    //                         return true;
    //                     }
    //                 }
    //             } else {
    //                 // need to get management port
    //                 if (tmp.devicePorts.length) {
    //                     for (let k = 0; k < tmp.devicePorts.length; k++) {
    //                         let port = tmp.devicePorts[k];
    //                         if (port.isMgmtPort && port.portIp && this.ipInSubnet(subnetIp, port.portIp)) {
    //                             return true;
    //                         }
    //                     }
    //                 }
    //             }
    //         }
    //     }
    //     return false;
    // }

    // ipInSubnet(subnetIp, ip) {
    //     if (!subnetIp || !ip) {
    //         return false;
    //     }
    //     let tmp = subnetIp.split('/');
    //     let sub_ip = tmp[0];
    //     let mask = tmp[1];
    //     tmp = sub_ip.split('.');
    //     let intNotaion1 = ((parseInt(tmp[0]) & 0xFF) << 24) | ((parseInt(tmp[1]) & 0xFF) << 16) | ((parseInt(tmp[2]) & 0xFF) << 8) | ((parseInt(tmp[3]) & 0xFF) << 0);
    //     tmp = ip.split('.');
    //     let intNotaion2 = ((parseInt(tmp[0]) & 0xFF) << 24) | ((parseInt(tmp[1]) & 0xFF) << 16) | ((parseInt(tmp[2]) & 0xFF) << 8) | ((parseInt(tmp[3]) & 0xFF) << 0);
    //     if ((intNotaion1 & (0xFFFFFFFF << (32 - mask))) === (intNotaion2 & (0xFFFFFFFF << (32 - mask)))) {
    //         return true;
    //     }
    //     return false;
    // }

    // checkOverLap(subnetIp1, subnetIp2) {
    //     if (!subnetIp1 || !subnetIp2) {
    //         return false;
    //     }
    //     let tmp = subnetIp1.split('/');
    //     let ip1 = tmp[0];
    //     let mask1 = tmp[1];
    //     tmp = subnetIp2.split('/');
    //     let ip2 = tmp[0];
    //     let mask2 = tmp[1];
    //     tmp = ip1.split('.');
    //     let intNotaion1 = ((parseInt(tmp[0]) & 0xFF) << 24) | ((parseInt(tmp[1]) & 0xFF) << 16) | ((parseInt(tmp[2]) & 0xFF) << 8) | ((parseInt(tmp[3]) & 0xFF) << 0);
    //     tmp = ip2.split('.');
    //     let intNotaion2 = ((parseInt(tmp[0]) & 0xFF) << 24) | ((parseInt(tmp[1]) & 0xFF) << 16) | ((parseInt(tmp[2]) & 0xFF) << 8) | ((parseInt(tmp[3]) & 0xFF) << 0);
    //     if ((intNotaion1 & (0xFFFFFFFF << (32 - mask1))) === (intNotaion2 & (0xFFFFFFFF << (32 - mask1)))) {
    //         return true;
    //     }
    //     if ((intNotaion1 & (0xFFFFFFFF << (32 - mask2))) === (intNotaion2 & (0xFFFFFFFF << (32 - mask2)))) {
    //         return true;
    //     }
    //     return false;
    // }

    // checkIpInSubnet(ip, deviceList) {
    //     for (let i = 0; i < deviceList.length; i++) {
    //         let tmp = deviceList[i];
    //         if (tmp.iconType === 'subnet') {
    //             if (!tmp.deviceId || tmp.deviceId === '') {
    //                 if (tmp.subnetIp && this.ipInSubnet(tmp.subnetIp, ip)) {
    //                     return true;
    //                 }
    //             } else {
    //                 if (tmp.devicePorts.length && tmp.devicePorts[0].isMgmtPort && this.ipInSubnet(tmp.devicePorts[0].portIp, ip)) {
    //                     return true;
    //                 }
    //             }
    //         }
    //     }
    //     return false;
    // }

    // validateIp(ip) {
    //     if (!ip.match(this.VALIDATE_IP)) {
    //         return true;
    //     } else {
    //         let lst = ip.split('.');
    //         lst = lst.map(function (n: string) {
    //             return parseInt(n);
    //         });
    //         // A类地址范围:   1.0.0.1—126.255.255.254
    //         if (lst[0] === 0 || (lst[0] === 126 && lst[1] > 155) || lst[0] === 127 || (lst[0] === 126 && lst[1] === 155 && lst[3] === 255)) {
    //             return true;
    //         }
    //         // B类地址范围：128.0.0.1—191.255.255.254
    //         // C类地址范围：192.0.0.1—223.255.255.254
    //         // --暂不考虑 D类地址范围：224.0.0.1—239.255.255.254
    //         // --暂不考虑 E类地址范围：240.0.0.1—255.255.255.254
    //         if (lst[0] === 0 || lst[0] === 127 || lst[0] > 223) {
    //             return true;
    //         }
    //         if (ip === '1.0.0.0' || ip === '126.255.255.255' || ip === '128.0.0.0' || ip === '191.255.255.255' || ip === '192.0.0.0' || ip === '223.255.255.255') {
    //             return true;
    //         }
    //     }
    //     return false;
    // }

}
