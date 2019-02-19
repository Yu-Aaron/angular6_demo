import {Injectable, } from '@angular/core';
import {HttpClient, HttpParams } from '../../../../node_modules/@angular/common/http';
import {CommonService} from "./common.service";
import {TopologyService} from './topology.service';

@Injectable({
    providedIn: 'root'
})

export class DupeInfo {
    constructor(){

    }

    dupeCheck(deviceId, infoType, targetValue, deviceList) {
        if (!targetValue) {
            return false;
        }
        for (let d = 0, i = deviceList.length; d < i; d++) {
            if (deviceId !== deviceList[d].deviceId) {
                if (deviceList[d][infoType].toLowerCase() === targetValue.toLowerCase()) {
                    return true;
                }
            }
        }
    }

    // check ip or mac dups in other existing devices
    dupInOtherDevice (key, deviceId, deviceArr, targetValue) {
        let count = 0;
        for (let i = 0, len = deviceArr.length; i < len; i++) {
            if (deviceArr[i].deviceId === deviceId) {
                continue;
            }
            let tmp = deviceArr[i].devicePorts;
            for (let j = 0, len = tmp.length; j < len; j++) {
                if (tmp[j][key] && tmp[j][key].toLowerCase() === targetValue.toLowerCase()) {
                    count++;
                }
            }
        }
        if (count < 1) {
            return false;
        }
        return true;
    }

    // check if ip or mac in the current device have duplicates
    checkDupInDevice (portArr, port, index, key) {
        for (let i = 0, len = portArr.length; i < len; i++) {
            if (i === index) {
                continue;
            }
            let tmp = portArr[i];
            if (port[key] && port[key].toLowerCase() === tmp[key].toLowerCase()) {
                return true;
            }
        }
        return false;
    }
}