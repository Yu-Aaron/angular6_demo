import {Component, OnInit} from '@angular/core';
import {ChartService} from '../../../common/service/chart.service';
import {ConfigService} from '../../../common/service/config.service';
import {SecurityAuditService} from '../../../common/service/securityAudit.service';
import {HomeService} from '../../../common/service/home.service';

@Component({
    selector: 'app-flowaudit',
    templateUrl: './flowaudit.component.html',
    styleUrls: ['./flowaudit.component.scss']
})

export class FlowauditComponent implements OnInit {
    deviceType = [
        {label: '全部设备', value: 'all', active: true},
        {label: '未知设备', value: 'unkown', active: false},
        {label: '已知设备', value: 'kown', active: false}
    ];
    flowOption = {};

    deviceTrafficList = [];  // 设备流量列表
    filterParameter = null; // 过滤条件 参数
    filterConditionData = {}; // 过滤条件 可选项
    pageIndex = 1;
    pageSize = 10;
    pageTotalNumber = 0;
    tableCount = 0;
    loading: boolean;

    constructor(private chartService: ChartService,
                private configService: ConfigService,
                private securityAuditService: SecurityAuditService,
                private homeService: HomeService) {
    }

    ngOnInit() {
        this.filterConditionData = {
            timeValueData: [],
            controlArray: [
                {label: 'IP', type: 'input', name: 'sourceIp', placeholder: '输入IP'},
                {label: 'MAC地址', type: 'input', name: 'targetIp', placeholder: '输入MAC地址'},
                {label: '设备名称', type: 'input', name: 'serviceApp', placeholder: '输入设备名称'},
            ]
        };
        this.getFlowChartData();
        this.getDeviceTrafficList();
        this.deviceTrafficList = [{
            deviceName: 'UX工控设备',
            ipAddr: '1.1.1.1',
            macAddr: '00:00:00:00:00:20',
            avgRecvSpeed: 2,
            avgSendSpeed: 3,
            percent: 2,
            timestamp: '2019-01-12',
        }, {
            deviceName: 'UX工控设备',
            ipAddr: '1.1.1.1',
            macAddr: '00:00:00:00:00:20',
            avgRecvSpeed: 2,
            avgSendSpeed: 3,
            percent: 2,
            timestamp: '2019-01-12',
        }];
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
    getDeviceTrafficList() {
        this.loading = true;
        const payload = {
            '$skip': (this.pageIndex - 1) * this.pageSize,
            '$limit': this.pageSize
        };
        if (this.filterParameter) {
            payload['$filter'] = this.filterParameter;
        }
        this.configService.getCurrentTime().subscribe((data: any) => {
            let currTime = new Date(data || '');
            let endSecond = currTime.getTime() - 24000;
            let endTime = new Date(endSecond);
            let startSecond = endTime.getTime() - 3600000;
            let startTime = new Date(startSecond);
            this.homeService.getDeviceTrafficList(startTime, endTime, payload).subscribe((data: any) => {
                this.deviceTrafficList = data;
                this.loading = false;
            }, () => {
                this.loading = false;
            });
            this.getDeviceTrafficCount(startTime, endTime);
        });
    }
    getDeviceTrafficCount(startTime, endTime) {
        const payload = {};
        if (this.filterParameter) {
            payload['$filter'] = this.filterParameter;
        }
        this.homeService.getDeviceTrafficCount(startTime, endTime, payload).subscribe((data: any) => {
            this.tableCount = data;
            this.pageTotalNumber = Math.ceil(this.tableCount / this.pageSize);
        });
    }
    // 页数改变时
    pageIndexChange() {
        this.getDeviceTrafficList();
    }
    // 点击查询按钮 传过来的事件
    searchFilterTable(params) {
        this.pageIndex = params.pageIndex;
        this.filterParameter = params.params;
        this.getDeviceTrafficList();
    }

}
