import {AfterViewInit, Component, OnInit} from '@angular/core';
import {CommonService} from '../../../common/service/common.service';
import {HomeService} from '../../../common/service/home.service';

@Component({
    selector: 'app-homepage',
    templateUrl: './homepage.component.html',
    styleUrls: ['./homepage.component.scss']
})

export class HomepageComponent implements OnInit, AfterViewInit {
    // 设备概况
    performanceData = {
        ems: 0,
        temp: 0,
        disc: 0,
        engine: 0,
        cpu: 0
    };
    drawOptions = [
        {text: 'CPU占用率', id: '#circle1', percent: 60, frontColor: '#D6CB00'},
        {text: '内存占用率', id: '#circle2', percent: 20, frontColor: '#54D174'},
        {text: '磁盘占用率', id: '#circle3', percent: 0, frontColor: '#D31C29'},
    ];

    // 设备流程top5
    deviceType = [
        {label: '全部设备', value: 'all', active: true},
        {label: '未知设备', value: 'unkown', active: false},
        {label: '已知设备', value: 'kown', active: false}
    ];
    flowData = [];
    flowOption = {};
    tableData = [];  // 表格数据
    filterParameter = null; // 过滤条件 参数
    filterConditionData = {}; // 过滤条件 可选项
    pageIndex = 1;
    pageSize = 10;
    pageTotalNumber = 0;
    tableCount = 0;
    loading: boolean;

    constructor(private homeService: HomeService, private commonService: CommonService) {
    }

    ngOnInit() {
        this.getProgressData();
        this.getFlowChartData();
        this.getFlowTable();
    }

    ngAfterViewInit(): void {
        this.drawOptions.forEach((item) => {
            this.commonService.drawProgress(item);
        });
        this.commonService.drawTemp(90, '#000000', 7, true);  // 温度背景色
        this.commonService.drawTemp(10, '#50D076', 7, false); // 温度进度条
    }

    // 设备概况
    getProgressData() {
        this.homeService.getProgress().subscribe((data: any) => {
            if (data) {
                this.performanceData.ems = this.drawOptions[1]['value'] = data.memoryUsage; // 内存占用率
                this.performanceData.temp = data.temperature; // 设备核心温度
                this.performanceData['currentTime'] = data.updatedAt;
                for (let i = 0; i < data.partitionUsage.length; i++) {
                    if (data.partitionUsage[i].partitionName === '/data') {
                        this.performanceData.disc = this.drawOptions[2]['value'] = data.partitionUsage[i].usage;  // 磁盘占用率
                        break;
                    }
                }
                for (let i = 0; i < data.cpuUsage.length; i++) {
                    if (data.cpuUsage[i].processName === 'avg') {
                        this.performanceData.cpu -= this.drawOptions[0]['value'] = data.cpuUsage[i].usage; // CPU占用率
                    } else if (data.cpuUsage[i].processName === 'dpi') {
                        this.performanceData.engine = data.cpuUsage[i].usage;
                    }
                }
                this.drawOptions.forEach((item) => {
                    this.commonService.drawProgress(item);
                });
                this.commonService.drawTemp(this.performanceData.temp, '#50D076', 7, false);
            }
            setTimeout(() => {
                this.getProgressData();
            }, 6000);
        });
    }

    // 设备流量top5
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
        this.flowOption = {
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
    getFlowTable() {
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
