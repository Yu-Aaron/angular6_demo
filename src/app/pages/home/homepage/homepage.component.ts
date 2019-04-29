import {AfterViewInit, Component, OnInit} from '@angular/core';
import {HomeService} from '../../../common/service/home.service';
import {ChartService} from '../../../common/service/chart.service';
import {forkJoin} from 'rxjs';
import {SecurityAuditService} from '../../../common/service/securityAudit.service';
import {ConfigService} from '../../../common/service/config.service';
import {TrafficDataService} from '../../../common/service/trafficData.service';

@Component({
    selector: 'app-homepage',
    templateUrl: './homepage.component.html',
    styleUrls: ['./homepage.component.scss']
})

export class HomepageComponent implements OnInit, AfterViewInit {
    performanceData = {
        ems: 0,
        temp: 0,
        disc: 0,
        engine: 0,
        cpu: 0
    }; // 设备概况
    drawOptions = [
        {text: 'CPU占用率', id: '#circle1', percent: 60, frontColor: '#D6CB00'},
        {text: '内存占用率', id: '#circle2', percent: 20, frontColor: '#54D174'},
        {text: '磁盘占用率', id: '#circle3', percent: 0, frontColor: '#D31C29'},
    ]; // 设备概况饼图参数
    allPorts = [];   // 接口状态
    securityarea = [];  // 安全域工作状态

    // 设备流量top5
    deviceType = [
        {label: '全部设备', value: 'all', active: true},
        {label: '未知设备', value: 'unkown', active: false},
        {label: '已知设备', value: 'kown', active: false}
    ]; // 切换设备类型
    flowOption = {}; // 流量图参数
    deviceTrafficList = [];  // 设备流量列表
    filterParameter = null; // 过滤条件 参数
    filterConditionData = {}; // 过滤条件 可选项
    pageIndex = 1;
    pageSize = 10;
    pageTotalNumber = 0;
    tableCount = 0;
    loading: boolean;
    payload = {};  // 过滤参数拼接

    // 今日事件监测
    monitorPieData = [
        {name: '威胁', value: 0},
        {name: '协议规则', value: 0},
        {name: 'IP/MAC', value: 0},
        {name: '域名规则', value: 0}
    ];  // 饼图数据
    monitorPieOption = {};  // 饼图参数
    lineProgress = [
        {name: '使用规则总数', value: 0},
        {name: '使用威胁总数', value: 0},
        {name: '使用自定义规则总数', value: 0}
    ];  // 使用规则总数
    tabLabel = [
        {name: '全部', value: 'all'},
        {name: '威胁', value: '威胁'},
        {name: '协议规则', value: '协议规则'},
        {name: 'IP/MAC', value: 'IP/MAC'},
        {name: '域名规则', value: '域名规则'}
    ];   // 标签页标题
    tabLabelContent = [
        {type: '【发现威胁】', text: '111111111111111111111111', count: 1388},
        {type: '【发现威胁】', text: '111111111111111111111111', count: 1388},
        {type: '【发现威胁】', text: '111111111111111111111111', count: 1388},
        {type: '【发现威胁】', text: '111111111111111111111111', count: 1388},
        {type: '【发现威胁】', text: '111111111111111111111111', count: 1388},
        {type: '【发现威胁】', text: '111111111111111111111111', count: 1388},
    ];   // 标签页内容
    protocolTop = [];
    signatureTop = [];
    customTop = [];


    constructor(private homeService: HomeService,
                private configService: ConfigService,
                private trafficDataService: TrafficDataService,
                private securityAuditService: SecurityAuditService,
                private chartService: ChartService) {
    }

    ngOnInit() {
        this.getProgressData();
        this.getAllPorts();
        this.getAllSecurityarea();
        this.getDeviceTrafficList({}); // 设备流量top5
        this.getFlowChartData();
        this.getBaseTotal();  // 今日事件监测
        this.getActionTotal();
    }
    ngAfterViewInit(): void {
        this.drawOptions.forEach((item) => {
            this.chartService.drawProgress(item);
        });
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

    // 接口状态
    getAllPorts() {
        const params = {
            '$skip': 0,
            '$limit': 10,
            '$orderby': 'portName'
        };
        this.homeService.getAllPorts(params).subscribe((data: any) => {
            this.allPorts = data;
        });
    }

    // 安全域工作状态
    getAllSecurityarea() {
        const params = {
            '$skip': 0,
            '$limit': 10,
        };
        this.homeService.getAllSecurityarea(params).subscribe((data: any) => {
            this.securityarea = data;
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
    // 设备流量列表
    getDeviceTrafficList(params) {
        this.loading = true;
        this.payload = {
            '$skip': (this.pageIndex - 1) * this.pageSize,
            '$limit': this.pageSize
        };
        // if (!params['$orderby'] || params['$orderby'] === '') {
        //     this.payload['$orderby'] = 'percent';
        // }
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
    // 切换设备类型
    checkDeviceType(i) {
        this.deviceType[i].active = true;
        this.deviceType.forEach((item, index) => {
            if (i !== index) {
                item.active = false;
            }
        });
    }
    // 页数改变时
    pageIndexChange() {
        this.getDeviceTrafficList({});
    }


    // 今日事件监测
    createParams() {
        const payload = {};
        const date1 = new Date();
        const date2 = new Date(date1);
        date2.setHours(0, 0, 0, 0);

        payload['endtime'] = date1.toISOString().slice(0, date1.toISOString().length - 5) + 'Z';
        payload['starttime'] = date2.toISOString().slice(0, date2.toISOString().length - 5) + 'Z';
        return payload;
    }
    getActionTotal() {
        const payload = this.createParams();
        this.homeService.getActionTotal(payload).subscribe((data: any) => {
            this.monitorPieData[0]['value'] = data.signatureCount; // 威胁
            this.monitorPieData[0]['value'] = data.protocolCount; // 协议规则
            this.monitorPieData[0]['value'] = data.ipMacCount; // IP/MAC
            this.monitorPieData[0]['value'] = data.domainCount; // 域名规则
            const totalCountAction = data.ipMacCount + data.domainCount + data.protocolCount + data.signatureCount;
            this.monitorPieOption = this.chartService.drawMonitorPie(this.monitorPieData, totalCountAction);
        }, () => {
            this.monitorPieOption = this.chartService.drawMonitorPie(this.monitorPieData, 0);
        });
    }
    getBaseTotal() {
        this.homeService.getBaseTotal().subscribe((data: any) => {
            this.lineProgress[0]['value'] = data.protocolCount;  // 使用规则总数
            this.lineProgress[1]['value'] = data.signatureCount;  // 使用威胁总数
            this.lineProgress[2]['value'] = data.totalCount;  // 使用自定义规则总数
        });
    }
    getRuleTop() {
        const payload = this.createParams();
        forkJoin([
            this.homeService.getProtocolFlow(payload),
            this.homeService.getSignatureCount(payload),
            this.homeService.getCustomTop(payload)]).subscribe((data: any) => {
            this.protocolTop = data[0];
            this.signatureTop = data[1];
            this.customTop = data[2];
        });
    }
    changeTab(event) {
        console.log(event);
    }

}
