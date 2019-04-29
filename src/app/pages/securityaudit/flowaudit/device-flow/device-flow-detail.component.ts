import {Component, OnDestroy, OnInit} from '@angular/core';
import {ChartService} from '../../../../common/service/chart.service';
import {RouteService} from '../../../../common/service/route.service';
import {ActivatedRoute} from '@angular/router';
import {CommonService} from '../../../../common/service/common.service';
import {SecurityAuditService} from '../../../../common/service/securityAudit.service';
import {TrafficDataService} from '../../../../common/service/trafficData.service';
import {forkJoin} from 'rxjs';
import * as moment from 'moment';

@Component({
    selector: 'app-flow-detail',
    templateUrl: './device-flow-detail.component.html',
    styleUrls: ['../flowaudit.component.scss']
})

export class DeviceFlowDetailComponent implements OnInit, OnDestroy {
    global;
    device = {};
    detailInfo = [];
    deviceId = '';
    protocolDeviceLineOptions = {};  // 实时流量趋势图参数
    protocolRealTimeData = []; // 实时流量 数据
    protocols = []; // 当前设备信息
    deviceLineTimer: any;  // 定时更新
    boxID: string;
    statisticsPieOption = {}; // 协议分布饼图参数
    trafficsStaticsData = [];  // 协议分布数据
    totalTraffics = '0 Byte';  // 协议流量总数
    totalRuleNum = 0;  // 协议总数
    protocolTimeRange = [
        {label: '最近1小时', value: '1h'},
        {label: '最近24小时', value: '24h'},
        {label: '最近一周内', value: '168h'}
    ];
    protocolTime = '1h';

    constructor(private activatedRoute: ActivatedRoute,
                private chartService: ChartService,
                private routeService: RouteService,
                private commonService: CommonService,
                private trafficDataService: TrafficDataService,
                private securityAuditService: SecurityAuditService) {
    }

    ngOnInit() {
        // const data = [{name: '', value: [10, 13, 41, 20, 30, 20, 12], color: '#1A9BFC'}];
        // this.protocolDeviceLineOptions = this.chartService.drawFlowChart(data);
        this.routeService.setVal(this.global);
        // 获取路由参数
        this.deviceId = this.activatedRoute.snapshot.params['deviceId'];
        this.detailInfo = decodeURI(this.activatedRoute.snapshot.params['deviceInfo']).split('|');
        this.device = {deviceName: this.detailInfo[2], ipAddr: this.detailInfo[1], macAddr: this.detailInfo[0]};
        // 实时流量趋势图 初始化
        this.getSelectedProtocols();
        // 协议分布图 初始化
        this.getProtocolTrafficStatistics();
        // 实时流量趋势图 定时更新
        this.deviceLineTimer = setInterval(() => {
            this.getSelectedProtocols();
        }, 24000);
    }

    ngOnDestroy() {
        clearInterval(this.deviceLineTimer);
    }

    // 获取当前设备信息
    getSelectedProtocols() {
        this.securityAuditService.getSelectedProtocols(this.deviceId).subscribe((data: any) => {
            this.protocols = [];
            data.forEach(function (item) {
                if (item.trafficName === 'TRADITION') {
                    item.trafficName = '网络通用协议';
                }
                if (item.trafficName === 'OTHER') {
                    item.trafficName = '其他';
                }
                this.protocols.push({
                    protocolName: item.trafficName,
                    trafficId: 'TRAFFIC_' + item.trafficName.toUpperCase()
                });
            });
            this.getProtocolRealTime();
        });
    }

    // 获取流量数据
    getProtocolRealTime() {
        let deviceId = this.deviceId;
        this.protocolRealTimeData = [];
        // 如果设备信息获取到
        if (this.protocols.length > 0) {
            this.commonService.sysbaseinfo().subscribe((data: any) => {
                let currTime = new Date(data || '');
                let endSecond = currTime.getTime() - 24000;
                let endTime = new Date(endSecond);
                let startSecond = endTime.getTime() - 3600000;
                let startTime = new Date(startSecond);

                let promises = [];
                for (let j = 0; j < this.protocols.length; j++) {
                    promises.push(this.securityAuditService.getProtocolTraffic(deviceId, this.protocols[j].trafficId, startTime, endTime, {}));
                }
                forkJoin(promises).subscribe((data: any) => {
                    for (let i = 0; i < data.length; i++) {
                        data[i].map((item: any) => {
                            item.sendSpeed = item.sendBytes;
                            item.recvSpeed = item.recvBytes;
                            item.totalBytes = item.sendBytes + item.recvBytes;
                        });
                    }
                    for (let i = 0; i < this.protocols.length; i++) {
                        if (data[i].length > 0) {
                            this.protocolRealTimeData.push(data[i]);
                        } else {
                            this.protocolRealTimeData.push({
                                'timestamp': endTime,
                                'totalBytes': 0
                            });
                        }
                    }
                    this.showProtocolLine();
                });
            });
        } else {
            this.showProtocolLine();
        }
    }

    // 解析流量数据
    showProtocolLine() {
        let config = {
            title: null,
            legendEnable: true,
            boxIds: this.boxID
        };
        let legend = [];
        let xAxis = [];
        let inputData = [];
        if (this.protocols.length > 0) {
            let colors = ['#91e8e1', '#2b908f', '#e4d354', '#f15c80', '#8085e9', '#f7a35c', '#90ed7d', '#f45b5b', '#7cb5ec'].reverse();
            let protocolIds = [];
            let inputProtocolDatas = [];
            if (this.protocolRealTimeData) {
                for (let j = 0; j < this.protocolRealTimeData.length; j++) {
                    let data = [];
                    for (let i = 0; i < this.protocolRealTimeData[j].length; i++) {
                        let totalBytes = Math.floor(this.protocolRealTimeData[j][i].totalBytes / 10.24) / 100;
                        data.push(totalBytes);
                        if (xAxis.length < this.protocolRealTimeData[j].length) {
                            xAxis.push(moment(this.protocolRealTimeData[j][i].timestamp).format('YYYY-MM-DD HH:mm:ss'));
                        }
                    }
                    inputProtocolDatas.push(data);
                }
            }
            for (let j = 0; j < this.protocols.length; j++) {
                protocolIds.push(this.protocols[j].trafficId);
                let inputItem = {
                    name: this.protocols[j].protocolName,
                    itemStyle: {lineStyle: {color: colors.pop()}},
                    type: 'line',
                    symbol: 'circle',
                    data: inputProtocolDatas[j]
                };
                legend.push(this.protocols[j].protocolName);
                inputData.push(inputItem);
            }
        }
        this.protocolLineChart(legend, xAxis, inputData, config);
    }

    // 绘制实时流量趋势图
    protocolLineChart(legend, xAxis, inputData, config) {
        let data = {
            noDataLoadingOption: {text: '当前时间段内没有实时流量数据'},
            title: {
                text: config.title,
                textStyle: {
                    color: '#eeeeee'
                }
            },
            tooltip: {
                trigger: 'axis',
                formatter: (params) => {
                    params = params[0];
                    return '<b>' + params.seriesName + ':</b><br/>' + moment(params.axisValueLabel).format('YYYY-MM-DD HH:mm:ss') + '<br/>' + params.data + 'KB/s';
                },
                axisPointer: {
                    type: false
                },
            },
            xAxis: [{
                type: 'category',
                name: '时间',
                nameLocation: 'center',
                nameGap: 40,
                nameTextStyle: {
                    fontSize: 14,
                    color: '#5d627f'
                },
                axisLine: {
                    lineStyle: {
                        color: '#e1e3eb',
                    }
                },
                axisLabel: {
                    textStyle: {
                        color: '#5d627f',
                    }
                },
                splitLine: {
                    show: false
                },
                data: xAxis,
            }],
            yAxis: [{
                type: 'value',
                name: '速率 (KB/s)',
                nameLocation: 'center',
                nameGap: 45,
                nameTextStyle: {
                    color: '#5d627f',
                    fontSize: 14
                },
                axisLine: {
                    lineStyle: {
                        color: '#e1e3eb',
                    }
                },
                axisLabel: {
                    textStyle: {
                        color: '#5d627f',
                    }
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: '#e1e3eb',
                    }
                },
                splitArea: {
                    areaStyle: {
                        color: 'Transparent'
                    }
                }
            }],
            legend: {
                x: 'right',
                y: 'top',
                textStyle: {
                    color: '#5d627f',
                    fontWeight: 'bold',
                    fontSize: '14px'
                },
                data: legend
            },
            color: ['#91e8e1', '#2b908f', '#e4d354', '#f15c80', '#8085e9', '#f7a35c', '#90ed7d', '#f45b5b', '#7cb5ec'].reverse(),
            series: inputData,
        };
        this.protocolDeviceLineOptions = data;
    }

    // 获取协议分布图数据
    getProtocolTrafficStatistics() {
        let time = 1;
        this.protocolTime = this.protocolTime || '1h';
        if (this.protocolTime === '1h') {
            time = 3600 * 1000;
        } else if (this.protocolTime === '24h') {
            time = 24 * 3600 * 1000;
        } else if (this.protocolTime === '168h') {
            time = 168 * 3600 * 1000;
        }
        this.commonService.sysbaseinfo().subscribe((data: any) => {
            let currTime = new Date(data || '');
            let endSecond = currTime.getTime() - 24000;
            let endTime = new Date(endSecond);
            let startSecond = endTime.getTime() - time;
            let startTime = new Date(startSecond);
            this.securityAuditService.getProtocolTrafficStatistics(this.deviceId, startTime, endTime).subscribe((data: any) => {
                data.forEach(function (item) {
                    if (item.trafficName === 'TRADITION') {
                        item.trafficName = '网络通用协议';
                    }
                    if (item.trafficName === 'OTHER') {
                        item.trafficName = '其他';
                    }
                });
                this.trafficsStaticsData = data;
                this.showProtocolTrafficPieChart();
            });
        });
    }

    // 解析协议分布数据
    showProtocolTrafficPieChart() {
        let config = {title: null};
        let totalTraffics = 0;
        this.totalRuleNum = 0;
        this.trafficsStaticsData.forEach((item) => {
            totalTraffics += item.totalBytes;
            this.totalRuleNum += 1;
        });
        this.totalTraffics = this.trafficDataService.formatTrafficDataWithUnit(totalTraffics);
        let unit = this.totalTraffics.substring(this.totalTraffics.indexOf(' ') + 1);
        this.statisticsPieOption = this.protocolPieChar(this.trafficsStaticsData, config, unit);
    }

    // 绘制协议分布饼图
    protocolPieChar(dpiTrafficStats, config, unit) {
        let data = [];
        for (let i = 0; i < dpiTrafficStats.length; i++) {
            let item = dpiTrafficStats[i];
            data.push({
                name: item.deviceName,
                value: this.trafficDataService.formatTrafficDataWithoutUnit(item.totalBytes, unit),
                newY: this.trafficDataService.formatTrafficDataWithUnit(item.totalBytes),
            });
        }
        let pieChartObj = {
            noDataLoadingOption: {
                text: '当前时间段没有汇总流量数据'
            },
            tooltip: {
                trigger: 'item',
                formatter: (params) => {
                    return '<b>' + params.data.name + ':</b><br/>' + params.data.newY + '<br/>' + params.percent + '%';
                },
            },
            legend: {
                orient: 'vertical',
                x: 'left',
            },
            color: ['#91e8e1', '#2b908f', '#e4d354', '#f15c80', '#8085e9', '#f7a35c', '#90ed7d', '#f45b5b', '#7cb5ec'].reverse(),
            series: [
                {
                    name: '工控协议汇总流量',
                    type: 'pie',
                    radius: '55%',
                    center: ['50%', '60%'],
                    data: data
                }
            ]
        };
        return pieChartObj;
    }


}
