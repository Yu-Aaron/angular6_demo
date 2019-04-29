import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class TrafficDataService {

    constructor() { }

    formatTrafficDataWithUnit(data) {
        let unit = ' Byte';
        if (data > 0) {
            if (data > 1024) {
                data = Math.floor(data / 10.24) / 100;
                unit = ' KB';
            }
            if (data > 1024) {
                data = Math.floor(data / 10.24) / 100;
                unit = ' MB';
            }
            if (data > 1024) {
                data = Math.floor(data / 10.24) / 100;
                unit = ' GB';
            }
            if (data > 1024) {
                data = Math.floor(data / 10.24) / 100;
                unit = ' TB';
            }
        }
        data += unit;
        return data;
    }

    formatTrafficDataWithoutUnit(data, unit) {
        if (data > 0) {
            if (unit === 'Byte') {
                return data;
            }
            if (unit === 'KB') {
                data = Math.floor(data / 10.24) / 100;
                return data;
            }
            if (unit === 'MB') {
                data = Math.floor(data / (1024 * 10.24)) / 100;
                return data;
            }
            if (unit === 'GB') {
                data = Math.floor(data / (1024 * 1024 * 10.24)) / 100;
                return data;
            }
            if (unit === 'TB') {
                data = Math.floor(data / (1024 * 1024 * 1024 * 10.24)) / 100;
                return data;
            }
        }
        return data;
    }

}
