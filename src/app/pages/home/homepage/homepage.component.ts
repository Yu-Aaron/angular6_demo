import {AfterViewInit, Component, OnInit} from '@angular/core';
import {HomeService} from '../../../common/service/home.service';
import {ChartService} from '../../../common/service/chart.service';

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
    flowOption = {};
    tableData = [];  // 表格数据
    filterParameter = null; // 过滤条件 参数
    filterConditionData = {}; // 过滤条件 可选项
    pageIndex = 1;
    pageSize = 10;
    pageTotalNumber = 0;
    tableCount = 0;
    loading: boolean;

    constructor(private homeService: HomeService, private chartService: ChartService) {
    }

    ngOnInit() {
        this.getProgressData();
        this.getFlowChartData();
        this.getFlowTable();
    }

    ngAfterViewInit(): void {
        this.drawOptions.forEach((item) => {
            this.chartService.drawProgress(item);
        });
        this.chartService.drawTemp(90, '#000000', 7, true);  // 温度背景色
        this.chartService.drawTemp(10, '#50D076', 7, false); // 温度进度条
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
                    this.chartService.drawProgress(item);
                });
                this.chartService.drawTemp(this.performanceData.temp, '#50D076', 7, false);
            }
            setTimeout(() => {
                this.getProgressData();
            }, 6000);
        });
    }

    // 设备流量top5
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
