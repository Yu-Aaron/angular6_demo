import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class FormatValService {
    VALIDATE_IP = /^(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/;
    VALIDATE_NET_MASKS = [
        '0.0.0.0',
        '128.0.0.0',
        '192.0.0.0',
        '224.0.0.0',
        '240.0.0.0',
        '248.0.0.0',
        '252.0.0.0',
        '254.0.0.0',
        '255.0.0.0',
        '255.128.0.0',
        '255.192.0.0',
        '255.224.0.0',
        '255.240.0.0',
        '255.248.0.0',
        '255.252.0.0',
        '255.254.0.0',
        '255.255.0.0',
        '255.255.128.0',
        '255.255.192.0',
        '255.255.224.0',
        '255.255.240.0',
        '255.255.248.0',
        '255.255.252.0',
        '255.255.254.0',
        '255.255.255.0',
        '255.255.255.128',
        '255.255.255.192',
        '255.255.255.224',
        '255.255.255.240',
        '255.255.255.248',
        '255.255.255.252',
        '255.255.255.254',
        '255.255.255.255'
    ];
    VALIDATE_SUBNET_SIZE = /^[0-9]+$/;
    VALIDATE_MAC = /^(([A-Fa-f0-9]{2}[:]){5}[A-Fa-f0-9]{2}[,]?)+$/;

    constructor() {
    }

    // Returns true to ip format error
    validateIp(ip) {
        if (!ip.match(this.VALIDATE_IP)) {
            return true;
        } else {
            let lst = ip.split('.');
            lst = lst.map(function (n) {
                return parseInt(n);
            });
            //A类地址范围:   1.0.0.1—126.255.255.254
            //B类地址范围：128.0.0.1—191.255.255.254
            //C类地址范围：192.0.0.1—223.255.255.254
            // --暂不考虑 D类地址范围：224.0.0.1—239.255.255.254
            // --暂不考虑 E类地址范围：240.0.0.1—255.255.255.254
            if (lst[0] === 0 || lst[0] === 127 || lst[0] > 223) {
                return true;
            }
            if (ip === '126.255.255.255' || ip === '128.0.0.0' || ip === '191.255.255.255' || ip === '192.0.0.0' || ip === '223.255.255.255') {
                return true;
            }
        }
        return false;
    }

    // Returns true to netMask format error
    validateNetMask(netMask) {
        return !this.VALIDATE_NET_MASKS.includes(netMask);
    }

    getIPReg() {
        return this.VALIDATE_IP;
    }

    /*
    subnetParser (validator, object, ip, alldevice) {
        let netMask = '', maskNumerals = ip.split('/');
        object.ip = maskNumerals[0];
        if (maskNumerals.length === 2 && maskNumerals[0].match(this.VALIDATE_IP) && maskNumerals[1] && maskNumerals[1].match(this.VALIDATE_SUBNET_SIZE) && maskNumerals[1] <= 32 && maskNumerals[1] > 7) {
            let binaryRef = '';
            let shift = 32 - parseInt(maskNumerals[1]);
            maskNumerals[1] = parseInt(maskNumerals[1]);
            for (let nm = 0; nm < 4; nm++) {
                let maskBits = (maskNumerals[1] > 0) ? ((maskNumerals[1] = maskNumerals[1] - 8) > 0) ? Array(9).join("1") : Array(maskNumerals[1] + 9).join("1") + Array(1 - maskNumerals[1]).join("0") : "0";
                netMask = netMask + parseInt(maskBits, 2).toString();
                (nm !== 3) ? netMask = netMask + '.' : '';
            }
            let ipNumber = object.ip.split('.');
            for (let nm = 0, len = ipNumber.length; nm < len; nm++) {
                let inter = (ipNumber[nm] >>> 0).toString(2);
                binaryRef = binaryRef + Array(9 - inter.length).join("0") + inter;
            }
            validator.invalidRange = this.checkRanges(object.deviceId, binaryRef, shift, alldevice);
        } else {
            validator.invalidRange = false;
        }
        object.netMask = netMask;
    }

    checkRanges (deviceId, ip, shift, deviceList) {
        let inRange = false;
        for (let index = 0, len = deviceList.length; index < len; index++) {
            if (deviceList[index].category === 'FACTORY_DEVICE' && deviceList[index].ip && ((deviceId) ? deviceList[index].deviceId !== deviceId : true) && deviceList[index].iconType !== 'cloud') {
                let actualShift = shift;

                if (deviceList[index].iconType === "subnet" && (32 - deviceList[index].subnetIp.split('/')[1]) > shift) {
                    actualShift = (32 - deviceList[index].subnetIp.split('/')[1]);
                }

                let binaryIp = '', ipNumber = deviceList[index].ip.split('.');
                for (let nm = 0, len = ipNumber.length; nm < len; nm++) {
                    let inter = (ipNumber[nm] >>> 0).toString(2);
                    binaryIp = binaryIp + Array(9 - inter.length).join("0") + inter;
                }
                // Assume that checkranges called after duplication has passed without error
                if (ip === binaryIp) {
                    continue;
                }
                inRange = (parseInt(ip, 2) >>> actualShift) === (parseInt(binaryIp, 2) >>> actualShift);

                if (inRange) {
                    return inRange;
                }
            }
        }
        return inRange;
    }

    */
    // 检查给定的序列号在设备列表中是否有重复
    checkSerialNumberDup(deviceList, sn, deviceId) {
        for (let i = 0, len = deviceList.length; i < len; i++) {
            let tmp = deviceList[i];
            if (tmp.deviceId !== deviceId && tmp.serialNumber === sn) {
                return true;
            }
        }
        return false;
    }

    // 返回 false (如果有效)
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

    //检查子网 ip 是否与设备列表中的任何子网或 ip 重叠 (包括设备尚未保存)
    subnetOverlap(device, deviceList, subnetIp) {
        for (let i = 0,len = deviceList.length; i < len; i++) {
            let tmp = deviceList[i];
            if ((!device.deviceId || device.deviceId === '') && (!tmp.deviceId || tmp.deviceId === '')) {
                if (device.key === tmp.key) {
                    continue;
                }
            } else {
                if (device.deviceId === tmp.deviceId) {
                    continue;
                }
            }
            if (tmp.iconType === 'subnet') {
                if (this.checkOverLap(subnetIp, ((tmp.deviceId && tmp.deviceId !== '') ? tmp.devicePorts[0].portIp : tmp.subnetIp))) {
                    return true;
                }
            } else {
                if (tmp.category === 'FACTORY_DEVICE') {
                    for (let j = 0, len = tmp.devicePorts.length; j < len; j++) {
                        if (tmp.devicePorts[j].portIp && tmp.devicePorts[j].isMgmtPort && this.ipInSubnet(subnetIp, tmp.devicePorts[j].portIp)) {
                            return true;
                        }
                    }
                } else {
                    // ��Ҫ��ù���˿�
                    if (tmp.devicePorts.length) {
                        for (let k = 0, len = tmp.devicePorts.length; k < len; k++) {
                            let port = tmp.devicePorts[k];
                            if (port.isMgmtPort && port.portIp && this.ipInSubnet(subnetIp, port.portIp)) {
                                return true;
                            }
                        }
                    }
                }
            }
        }
        return false;
    }

    // 检查两个子网 ips 是否重叠
    checkOverLap (subnetIp1, subnetIp2) {
        if (!subnetIp1 || !subnetIp2) {
            return false;
        }
        let tmp = subnetIp1.split('/');
        let ip1 = tmp[0];
        let mask1 = tmp[1];
        tmp = subnetIp2.split('/');
        let ip2 = tmp[0];
        let mask2 = tmp[1];
        tmp = ip1.split('.');
        let intNotaion1 = ((parseInt(tmp[0]) & 0xFF) << 24) | ((parseInt(tmp[1]) & 0xFF) << 16) | ((parseInt(tmp[2]) & 0xFF) << 8) | ((parseInt(tmp[3]) & 0xFF) << 0);
        tmp = ip2.split('.');
        let intNotaion2 = ((parseInt(tmp[0]) & 0xFF) << 24) | ((parseInt(tmp[1]) & 0xFF) << 16) | ((parseInt(tmp[2]) & 0xFF) << 8) | ((parseInt(tmp[3]) & 0xFF) << 0);
        if ((intNotaion1 & (0xFFFFFFFF << (32 - mask1))) === (intNotaion2 & (0xFFFFFFFF << (32 - mask1)))) {
            return true;
        }
        if ((intNotaion1 & (0xFFFFFFFF << (32 - mask2))) === (intNotaion2 & (0xFFFFFFFF << (32 - mask2)))) {
            return true;
        }
        return false;
    }

    // 检查 ip 和子网是否重叠
    ipInSubnet (subnetIp, ip) {
        if (!subnetIp || !ip) {
            return false;
        }
        let tmp = subnetIp.split('/');
        let sub_ip = tmp[0];
        let mask = tmp[1];
        tmp = sub_ip.split('.');
        let intNotaion1 = ((parseInt(tmp[0]) & 0xFF) << 24) | ((parseInt(tmp[1]) & 0xFF) << 16) | ((parseInt(tmp[2]) & 0xFF) << 8) | ((parseInt(tmp[3]) & 0xFF) << 0);
        tmp = ip.split('.');
        let intNotaion2 = ((parseInt(tmp[0]) & 0xFF) << 24) | ((parseInt(tmp[1]) & 0xFF) << 16) | ((parseInt(tmp[2]) & 0xFF) << 8) | ((parseInt(tmp[3]) & 0xFF) << 0);
        if ((intNotaion1 & (0xFFFFFFFF << (32 - mask))) === (intNotaion2 & (0xFFFFFFFF << (32 - mask)))) {
            return true;
        }
        return false;
    }

    // 检查 ip 在任何子网中 (包括尚未保存的子网), 假定如果设备类型是子网, 则它只有一个端口
    checkIpInSubnet(ip, deviceList) {
        for (let i = 0,len = deviceList.length; i < len; i++) {
            let tmp = deviceList[i];
            if (tmp.iconType === 'subnet') {
                if (!tmp.deviceId || tmp.deviceId === '') {
                    if (tmp.subnetIp && this.ipInSubnet(tmp.subnetIp, ip)) {
                        return true;
                    }
                } else {
                    if (tmp.devicePorts.length && tmp.devicePorts[0].isMgmtPort && this.ipInSubnet(tmp.devicePorts[0].portIp, ip)) {
                        return true;
                    }
                }
            }
        }
        return false;
    }

    // 返回 true 为 mac 格式错误
    validateMac(mac) {
        if (mac.indexOf('01') === 0) {
            return true;
        } else if (mac.toUpperCase() === 'FF:FF:FF:FF:FF:FF') {
            return true;
        }
        return !mac.match(this.VALIDATE_MAC);
    }

    numToNetmask(n) {
        return this.VALIDATE_NET_MASKS[n];
    }

}
