import {Component, OnInit} from '@angular/core';
import {CommonService} from '../../../common/service/common.service';

@Component({
    selector: 'app-basic',
    templateUrl: './basic.component.html',
    styleUrls: ['./basic.component.scss']
})
export class BasicComponent implements OnInit {
    objectKeys = Object.keys;
    basicSetting = {
        resourceAlarm: {
            cpu: 70,
            ems: 60,
            disc: 70,
            temp: 40
        },
        ntp: {
            serverTime: '2017-01-32',
            localTime: '2012-01-23'
        },
        notification: [
            {text: '计数提示', value: 1},
            {text: '声音提示', value: 1},
            {text: '计数和声音提示', value: 1},
        ]
    };
    switchManagement = {
        centralized: true,
        syslog: true,
        ruleCycle: {
            state: true,
            time: 5
        },
        ssh: false,
        trafficAlarm: false
    };  // 开关管理
    edit = {};
    isEdit = {};

    constructor(private commonService: CommonService) {
    }

    ngOnInit() {
        this.edit = this.commonService.deepCopy(this.switchManagement);
    }

    ok(key, value) {
        this.switchManagement[key] = this.edit[key];
        this.isEdit[key] = false;
        console.log(this.edit[key], this.switchManagement[key]);
    }

    cancle(key, value) {
        this.edit[key] = this.switchManagement[key];
        this.isEdit[key] = false;
        console.log(this.edit[key], this.switchManagement[key]);
    }

}
