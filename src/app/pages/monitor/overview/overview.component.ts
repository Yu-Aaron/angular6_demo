import {Component, OnInit} from '@angular/core';
import {OverviewService} from '../../../common/services/overview.service';
import * as moment from 'moment';
import {CommonService} from '../../../common/services/common.service';
import {forkJoin} from 'rxjs';
import 'rxjs/observable/forkJoin';

@Component({
    selector: 'app-overview',
    templateUrl: './overview.component.html',
    styleUrls: ['./overview.component.scss']
})

export class OverviewComponent implements OnInit {
    eventOption: any;
    deviceOption: any;
    seriesData = [];
    totalData = [
        {'id': 0, name: 'totalCount', 'title': '今日安全事件', 'image': 'bookmark.png', 'todayCount': 0, 'totalCountRange': 0},
        {'id': 1, name: 'alertCount', 'title': '今日告警事件', 'image': 'alert.png', 'todayCount': 0, 'totalCountRange': 0},
        {'id': 2, name: 'rejectbothCount', 'title': '今日阻断事件', 'image': 'ban.png', 'todayCount': 0, 'totalCountRange': 0},
        {'id': 3, name: 'dropCount', 'title': '今日丢弃事件', 'image': 'remove.png', 'todayCount': 0, 'totalCountRange': 0}
    ];
    topListData = [
        {'id': 0, 'title': '最近一万条安全事件命中漏洞 TOP10', 'data': this.getSignatureTop()},
        {'id': 1, 'title': '最近一万条安全事件中存在攻击行为的设备 TOP10', 'data': this.getAttackSource()},
        {'id': 2, 'title': '最近一万条安全事件中遭遇攻击行为的设备 TOP10', 'data': this.getAttackTarget()}
    ];

    constructor(private mOverview: OverviewService, private commonService: CommonService) {
    }

    ngOnInit() {
        this.getTodayTotal();
        this.getDeviceTypeDistribution();
    }

    //今日安全、告警、阻断、丢弃事件
    getTodayTotal() {
        this.commonService.sysbaseinfo().subscribe((data: any) => {
            let currTime = new Date(data);
            let todayEndTime = this.commonService.formatDate(currTime);
            let todayStartTime = this.commonService.formatDate(new Date(moment(currTime).format('YYYY-MM-DD 00:00:00')));
            let yesterday = new Date(currTime.getTime() - 24 * 60 * 60 * 1000);
            yesterday = new Date(moment(yesterday).format('YYYY-MM-DD 23:59:59'));
            let yesterdayEndTime = this.commonService.formatDate(yesterday);
            let yesterdayStartTime = this.commonService.formatDate(new Date(moment(yesterday).format('YYYY-MM-DD 00:00:00')));
            forkJoin([this.mOverview.getTodayTotal(todayStartTime, todayEndTime), this.mOverview.getTodayTotal(yesterdayStartTime, yesterdayEndTime)])
                .subscribe(totalData => {
                    let id;
                    Object.keys(totalData[0]).forEach((key) => {
                        this.totalData.forEach((value, index) => {
                            if (value.name === key) {
                                id = index;
                            }
                        });
                        totalData[0][key] = parseInt(totalData[0][key]);
                        totalData[1][key] = parseInt(totalData[1][key]);
                        this.totalData[id]['todayCount'] = totalData[0][key];
                        this.totalData[id]['totalCountRange'] = totalData[1][key] === 0 ? (totalData[0][key] === 0 ? 0 : 100) : parseFloat(((totalData[0][key] - totalData[1][key]) / totalData[1][key] * 100).toFixed(1));
                    });
                });
            this.getEventTrend(currTime);
        });
    }

    //最近24小时安全事件趋势
    getEventTrend(currTime) {
        this.mOverview.getEventTrend(this.commonService.formatDate(currTime)).subscribe((trendData: any) => {
            let xAxisData = [], alertData = [], rejectbothData = [], dropData = [];
            for (let i = -23; i < 1; i++) {
                let xAxis = moment(new Date(currTime.getTime() + 60 * 60 * 1000 * i)).format('YYYY-MM-DD HH:mm:ss');
                xAxis = xAxis.substring(0, xAxis.indexOf(':')) + ':00:00';
                xAxisData.push(xAxis);
                alertData.push(0);
                rejectbothData.push(0);
                dropData.push(0);
            }
            JSON.parse(trendData).forEach((d: any) => {
                let xAxis = moment((new Date(d.TIMESTAMP).getTime() + 60 * 60 * 1000 * 8)).format('YYYY-MM-DD HH:mm:ss');
                let ix = xAxisData.indexOf(xAxis);
                if (ix > -1) {
                    alertData[ix] = parseInt(d.HOURLY_WARN) || 0;
                    rejectbothData[ix] = parseInt(d.HOURLY_REJECTBOTH) || 0;
                    dropData[ix] = parseInt(d.HOURLY_DROP) || 0;
                }
            });
            setTimeout(() => {
                this.getTrendChart(xAxisData, alertData, rejectbothData, dropData);
            }, 100);
        });
    }

    getTrendChart(xAxisData, alertData, rejectbothData, dropData) {
        this.eventOption = {
            tooltip: {
                trigger: 'axis',
                textStyle: {
                    fontSize: 12,
                }
            },
            legend: {
                right: 0,
                itemWidth: 50,
                textStyle: {
                    color: '#5d627f',
                    fontWeight: 'bold'
                }
            },
            grid: {
                right: 0,
                left: 65
            },
            xAxis: {
                type: 'category',
                name: '时间',
                nameLocation: 'center',
                nameGap: 40,
                data: xAxisData,
                nameTextStyle: {
                    fontSize: 14,
                    color: '#5d627f'
                },
                axisLine: {
                    lineStyle: {
                        color: '#e1e3eb',
                    }
                },
                axisTick: {
                    inside: true,
                },
                axisLabel: {
                    color: '#5d627f',
                    fontSize: 11,
                    formatter: (val) => {
                        return val.substring(11, 16);
                    }
                },
                splitLine: {
                    lineStyle: {
                        color: '#e1e3eb',
                    }
                }
            },
            yAxis: {
                type: 'value',
                name: '事件总数',
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
                axisTick: {
                    inside: true,
                },
                axisLabel: {
                    color: '#5d627f',
                    fontSize: 11
                },
                splitLine: {
                    lineStyle: {
                        color: '#e1e3eb',
                    }
                }
            },
            color: ['#d3e667', '#e66767', '#b5b5b5'],
            series: [
                {
                    name: '告警',
                    type: 'line',
                    stack: '总量',
                    data: alertData,
                    smooth: true,
                    symbolSize: 6
                },
                {
                    name: '阻断',
                    type: 'line',
                    stack: '总量',
                    data: rejectbothData,
                    smooth: true,
                    symbolSize: 6
                },
                {
                    name: '丢弃',
                    type: 'line',
                    stack: '总量',
                    data: dropData,
                    smooth: true,
                    symbolSize: 6
                }
            ]
        };
    }

    //安全设备中设备类型分布
    getDeviceTypeDistribution() {
        this.mOverview.getDeviceTypeDistribution().subscribe((data: any) => {
            this.seriesData = [];
            let color = ['#e6679d', '#67bbe6'];
            data.forEach((d: any, index) => {
                this.seriesData.push({
                    'name': d.groupName,
                    'value': d.count,
                    'itemStyle': {'color': color[index]}
                });
            });
            this.getPieChart(this.seriesData);
        }, () => {
            // let data = [{
            //     'deviceGroupId': 'auditDevice',
            //     'groupName': '审计设备',
            //     'groupX': 0.0,
            //     'groupY': 0.0,
            //     'isExpaneded': false,
            //     'groupId': 0,
            //     'count': 2,
            // }, {
            //     'deviceGroupId': 'protectDevice',
            //     'groupName': '保护设备',
            //     'groupX': 0.0,
            //     'groupY': 0.0,
            //     'isExpaneded': false,
            //     'groupId': 0,
            //     'count': 1
            // }, {
            //     'deviceGroupId': 'protectDevice',
            //     'groupName': '保护设备2',
            //     'groupX': 0.0,
            //     'groupY': 0.0,
            //     'isExpaneded': false,
            //     'groupId': 0,
            //     'count': 1
            // }];
            // let color = ['#e6679d', '#67bbe6'];
            // this.seriesData = [];
            // data.forEach((d: any, index) => {
            //     this.seriesData.push({'name': d.groupName, 'value': d.count, 'itemStyle': {'color': color[index]}});
            // });
            // this.getPieChart(this.seriesData);
        });
    }

    getPieChart(data) {
        this.deviceOption = {
            legend: {
                type: 'scroll',
                orient: 'vertical',
                right: 10,
                top: 20,
                bottom: 20,
                width: 100,
                height: 300
            },
            series: [
                {
                    name: '访问来源',
                    type: 'pie',
                    radius: ['40%', '60%'],
                    center: ['40%', '50%'],
                    label: {
                        fontWeight: 'bold',
                        formatter: '{b}: {d}%',
                    },
                    data: data,
                }
            ]
        };
    }

    //最近一万条安全事件命中漏洞 TOP10
    getSignatureTop() {
        this.mOverview.getSignatureTop(10).subscribe((data: any) => {
            this.topListData[0].data = data;
        });
    }

    //最近一万条安全事件中存在攻击行为的设备 TOP10
    getAttackSource() {
        return this.mOverview.getAttackSource(10).subscribe((data: any) => {
            this.topListData[1].data = data;
        });
    }

    //最近一万条安全事件中遭遇攻击行为的设备 TOP10
    getAttackTarget() {
        this.mOverview.getAttackTarget(10).subscribe((data: any) => {
            this.topListData[2].data = data;
        });
    }
}
