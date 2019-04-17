import {Component, OnInit} from '@angular/core';

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
    flowData = [];
    option = {};

    tableData = [];  // 表格数据
    filterParameter = null; // 过滤条件 参数
    filterConditionData = {}; // 过滤条件 可选项
    pageIndex = 1;
    pageSize = 10;
    pageTotalNumber = 0;
    tableCount = 0;
    loading: boolean;

    constructor() {
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
        this.flowData = [];
        const data = [
            {name: 'PC1', value: [10, 13, 41, 20, 30, 20, 12], color: '#1A9BFC'},
            {name: 'AREA1', value: [22, 18, 11, 23, 20, 30, 10], color: '#99DA69'},
            {name: 'UX工控设备', value: [15, 23, 20, 15, 10, 30, 10], color: '#E32F46'},
            {name: 'PC2', value: [20, 32, 21, 33, 16, 23, 12], color: '#FA704D'},
            {name: 'AREA1', value: [12, 32, 21, 14, 30, 20, 12], color: '#01BABC'},
        ];
        data.forEach((item) => {
            this.flowData.push({
                type: 'line',
                name: item.name,
                smooth: true,
                showSymbol: false,
                symbolSize: 2,
                lineStyle: {
                    width: 1,
                    color: item.color
                },
                areaStyle: {
                    color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [{offset: 0, color: item.color}, {offset: 1, color: '#1D2C45'}]
                    },
                    opacity: 0.2
                },
                data: item.value
            });
        });
        this.drawFlowChart();
    }

    drawFlowChart() {
        this.option = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    label: {
                        backgroundColor: '#6a7985'
                    }
                }
            },
            grid: {
                x: 20,
                y: 20,
                x2: 20,
                y2: 20,
                height: 220,
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    boundaryGap: false,
                    axisLabel: {
                        textStyle: {
                            color: '#BAC0C0',
                            fontSize: 12
                        }
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: '#32346C',
                            width: 1,
                            type: 'solid'
                        }
                    },
                    axisTick: {
                        show: false
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#32346C',
                        }
                    },
                    data: ['1h', '2h', '3h', '4h', '5h', '6h', '7h']
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    axisLabel: {
                        textStyle: {
                            color: '#BAC0C0',
                            fontSize: 12
                        }
                    },
                    splitLine: {
                        lineStyle: {
                            color: '#32346C',
                            width: 1,
                            type: 'solid'
                        }
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#32346C',
                        }
                    },
                    axisTick: {
                        show: false
                    }
                }
            ],
            series: this.flowData
        };
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
