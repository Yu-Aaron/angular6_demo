import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DupeInfoService {

  constructor() { }

  dupInOtherDevice(key, deviceId, deviceArr, targetValue) {
    let count = 0;
    for (let i = 0; i < deviceArr.length; i++) {
      if (deviceArr[i].deviceId === deviceId) {
        continue;
      }
      let tmp = deviceArr[i].devicePorts;
      for (let j = 0; j < tmp.length; j++) {
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
  checkDupInDevice(portArr, port, index, key) {
    for (let i = 0; i < portArr.length; i++) {
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
