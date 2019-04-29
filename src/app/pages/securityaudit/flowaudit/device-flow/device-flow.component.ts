import {Component, OnInit} from '@angular/core';
import {ChartService} from '../../../../common/service/chart.service';
import {ConfigService} from '../../../../common/service/config.service';
import {TrafficDataService} from '../../../../common/service/trafficData.service';
import {SecurityAuditService} from '../../../../common/service/securityAudit.service';

@Component({
    selector: 'app-device-flow',
    templateUrl: './device-flow.component.html',
    styleUrls: ['../flowaudit.component.scss']
})
export class DeviceFlowComponent implements OnInit {
    deviceType = [
        {label: '全部设备', value: 'all', active: true},
        {label: '未知设备', value: 'unkown', active: false},
        {label: '已知设备', value: 'kown', active: false}
    ];  // 切换设备类型
    flowOption = {};  // 流量图参数
    deviceTrafficList = [];  // 设备流量列表
    filterParameter = null; // 过滤条件 参数
    filterConditionData = {
        timeValueData: [],
        controlArray: [
            {label: 'IP', type: 'input', name: 'sourceIp', placeholder: '输入IP'},
            {label: 'MAC地址', type: 'input', name: 'targetIp', placeholder: '输入MAC地址'},
            {label: '设备名称', type: 'input', name: 'serviceApp', placeholder: '输入设备名称'},
        ]
    }; // 过滤条件 可选项
    pageIndex = 1;
    pageSize = 10;
    pageTotalNumber = 0;
    tableCount = 0;
    loading: boolean;
    payload = {};  // 过滤参数拼接

    constructor(private chartService: ChartService,
                private configService: ConfigService,
                private trafficDataService: TrafficDataService,
                private securityAuditService: SecurityAuditService) {
    }

    ngOnInit() {
        this.getFlowChartData();
        this.getDeviceTrafficList({});
    }

    getFlowChartData() {
        const data = [
            {name: 'PC1', value: [10, 13, 41, 20, 30, 20, 12], color: '#1A9BFC'},
            {name: 'AREA1', value: [22, 18, 11, 23, 20, 30, 10], color: '#99DA69'},
            {name: 'UX工控设备', value: [15, 23, 20, 15, 10, 30, 10], color: '#E32F46'},
            {name: 'PC2', value: [20, 32, 21, 33, 16, 23, 12], color: '#FA704D'},
            {name: 'AREA1', value: [12, 32, 21, 14, 30, 20, 12], color: '#01BABC'},
        ];
        this.flowOption = this.chartService.drawFlowChart(data);
    }

    checkDeviceType(i) {
        this.deviceType[i].active = true;
        this.deviceType.forEach((item, index) => {
            if (i !== index) {
                item.active = false;
            }
        });
    }

    // 设备流量列表
    getDeviceTrafficList(params) {
        this.loading = true;
        this.payload = {
            '$skip': (this.pageIndex - 1) * this.pageSize,
            '$limit': this.pageSize
        };
        if (this.filterParameter) {
            this.payload['$filter'] = this.filterParameter;
        }
        this.configService.getCurrentTime().subscribe((data: any) => {
            let currTime = new Date(data || '');
            let endSecond = currTime.getTime() - 24000;
            let endTime = new Date(endSecond);
            let startSecond = endTime.getTime() - 3600000;
            let startTime = new Date(startSecond);
            this.securityAuditService.getDeviceTrafficList(startTime, endTime, this.payload).subscribe((data: any) => {
                data.map((item) => {
                    item.deviceId = item.iCDeviceMac || item.iCDeviceIp;
                    item.macAddr = item.iCDeviceMac;
                    item.ipAddr = item.iCDeviceIp;
                    item.totalBytes = item.sendBytes + item.recvBytes;
                    item.deviceInfo = encodeURI((item.iCDeviceMac || ' ') + '|' + (item.iCDeviceIp || ' ') + '|' + (item.deviceName || ' '));

                    item.avgRecvSpeed = this.trafficDataService.formatTrafficDataWithUnit(item.avgRecvSpeed);
                    item.avgSendSpeed = this.trafficDataService.formatTrafficDataWithUnit(item.avgSendSpeed);
                    item.timestamp = new Date(item.timestamp).getTime();
                });
                this.deviceTrafficList = data;
                this.loading = false;
            }, () => {
                this.loading = false;
            });
            this.getDeviceTrafficCount(startTime, endTime);
        });
    }

    getDeviceTrafficCount(startTime, endTime) {
        let params = this.payload['$filter'] || {};
        this.securityAuditService.getDeviceTrafficCount(startTime, endTime, params).subscribe((data: any) => {
            this.tableCount = data;
            this.pageTotalNumber = Math.ceil(this.tableCount / this.pageSize);
        });
    }

    // 页数改变时
    pageIndexChange() {
        this.getDeviceTrafficList({});
    }

    // 点击查询按钮 传过来的事件
    searchFilterTable(params) {
        this.pageIndex = params.pageIndex;
        this.filterParameter = params.params;
        this.getDeviceTrafficList({});
    }

}
