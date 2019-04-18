import {Component, OnInit} from '@angular/core';
import {ChartService} from '../../../common/service/chart.service';

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

    tableData = [];  // 表格数据
    filterParameter = null; // 过滤条件 参数
    filterConditionData = {}; // 过滤条件 可选项
    pageIndex = 1;
    pageSize = 10;
    pageTotalNumber = 0;
    tableCount = 0;
    loading: boolean;

    constructor(private chartService: ChartService) {
    }

    ngOnInit() {
        this.filterConditionData = {
            timeValueData: [],
            controlArray: [
                {label: 'IP', type: 'input', name: 'sourceIp', placeholder: '请输入IP'},
                {label: 'MAC地址', type: 'input', name: 'targetIp', placeholder: '请输入MAC地址'},
                {label: '设备名称', type: 'input', name: 'serviceApp', placeholder: '请输入设备名称'},
            ]
        };
        this.getFlowChartData();
        this.getAll();
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

    getAll() {
        this.tableData = [{
            status: 'NEW',
            incidentName: 11,
            timestamp: new Date(),
            incidentRuleType: 1111,
            securityAreaName: 111
        }, {
            status: 'NEW',
            incidentName: 11,
            timestamp: new Date(),
            incidentRuleType: 1111,
            securityAreaName: 111
        }];
        this.pageTotalNumber = Math.ceil(this.tableCount / this.pageSize);
    }


}
