import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-learning',
    templateUrl: './learning.component.html',
    styleUrls: ['./learning.component.scss']
})
export class LearningComponent implements OnInit {
    tableData = [];  // 表格数据
    pageIndex = 1;
    pageSize = 10;
    pageTotalNumber = 0;
    tableCount = 0;
    loading: boolean;

    showProtocol: boolean; // 是否显示协议端口
    showLearning: boolean; // 是否学习中
    learningDetail = {};


    deviceModal = {};  // 设备模态框
    deviceData = [{
        date: '2019/02/15 10:10:10',
        deviceName: '工控1',
        ip: '192.168.1.1',
        mac: '00:00:00:00:1C',
        assetMac: '00:00:00:00:1C'
    }, {
        date: '2019/02/15 10:10:10',
        deviceName: '工控1',
        ip: '192.168.1.1',
        mac: '00:00:00:00:1C',
        assetMac: '00:00:00:00:1C'
    }];

    constructor() {
    }

    ngOnInit() {
        this.getAll();
        this.deviceModal = {
            isVisible: false,
            title: '已知设备',
            type: 'kown',
            data: this.deviceData,
        };

    }

    getAll() {
        this.tableData = [{
            taskName: '2019/02/15 10:10:10',
            studyLength: 5,
            kownDevices: 88,
            unkownDevices: 8,
            macData: 8,
            validFlowdataCount: 237,
            securityAreaName: 'UXtest',
            learningprogress: 0,
            state: '已完成'
        }, {
            taskName: '2019/02/15 10:10:10',
            studyLength: 5,
            kownDevices: 88,
            unkownDevices: 8,
            macData: 8,
            validFlowdataCount: 237,
            securityAreaName: 'UXtest',
            learningprogress: 0,
            state: '已停止'
        }];
        this.pageTotalNumber = Math.ceil(this.tableCount / this.pageSize);
    }

    getlearningDetail($event) {
        this.learningDetail = $event;
        this.showLearning = true;
    }

    showDeviceModal(type) {
        this.deviceModal = {
            isVisible: true,
            title: type === 'kown' ? '已知设备' : type === 'unkown' ? '未知设备' : 'IP/MAC变更的设备列表',
            type: type,
            data: this.deviceData,
        };
    }

}
