import {Component, OnInit} from '@angular/core';
import {OverviewService} from '../../../common/services/overview.service';
import {CommonService} from '../../../common/services/common.service';

@Component({
    selector: 'app-overview',
    templateUrl: './overview.component.html',
    styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {
    eventOption: any;
    deviceOption: any;
    totalData = [
        {'id': 0, 'title': '今日安全事件', 'image': 'bookmark.png', 'todayCount': 0, 'totalCountRange': '10'},
        {'id': 1, 'title': '今日告警事件', 'image': 'alert.png', 'todayCount': 0, 'totalCountRange': '10'},
        {'id': 2, 'title': '今日阻断事件', 'image': 'ban.png', 'todayCount': 0, 'totalCountRange': '10'},
        {'id': 3, 'title': '今日丢弃事件', 'image': 'remove.png', 'todayCount': 0, 'totalCountRange': '10'}
    ];
    topListData = [
        {'id': 0, 'title': '最近一万条安全事件命中漏洞 TOP10', 'data': this.getSignatureTop()},
        {'id': 1, 'title': '最近一万条安全事件中存在攻击行为的设备 TOP10', 'data': this.getAttackSource()},
        {'id': 2, 'title': '最近一万条安全事件中遭遇攻击行为的设备 TOP10', 'data': this.getAttackTarget()}
    ];

    constructor(private mOverview: OverviewService) {
    }

    ngOnInit() {
        this.eventOption = {
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: ['告警', '阻断', '丢弃']
            },
            xAxis: {
                type: 'category',
                name: '时间',
                nameLocation: 'center',
                nameGap: 40,
                data: ['00:00', '1:00', '2:00', '3:00', '4:00', '5:00', '6:00']
            },
            yAxis: {
                type: 'value',
                name: '事件总数',
                nameLocation: 'center',
                nameGap: 40,
            },
            series: [
                {
                    name: '告警',
                    type: 'line',
                    stack: '总量',
                    data: [150, 232, 201, 154, 190, 330, 410],
                    smooth: true
                },
                {
                    name: '阻断',
                    type: 'line',
                    stack: '总量',
                    data: [320, 332, 301, 334, 390, 330, 320],
                    smooth: true
                },
                {
                    name: '丢弃',
                    type: 'line',
                    stack: '总量',
                    data: [820, 932, 901, 934, 1290, 1330, 1320],
                    smooth: true
                }
            ]
        };

        this.deviceOption = {
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b}: {c} ({d}%)'
            },
            legend: {
                type: 'scroll',
                orient: 'vertical',
                right: 10,
                top: 20,
                bottom: 20,
                width: 100,
                height: 300,
                data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
            },
            series: [
                {
                    name: '访问来源',
                    type: 'pie',
                    radius: ['40%', '60%'],
                    center: ['40%', '50%'],
                    data: [
                        {value: 335, name: '直接访问'},
                        {value: 310, name: '邮件营销'},
                        {value: 234, name: '联盟广告'},
                        {value: 135, name: '视频广告'},
                        {value: 1548, name: '搜索引擎'}
                    ]
                }
            ]
        };
    }

    getSignatureTop() {
        this.mOverview.getSignatureTop(10).subscribe((data: any) => {
            this.topListData[0].data = data;
        }, () => {
        });
    }

    getAttackSource() {
        return this.mOverview.getAttackSource(10).subscribe((data: any) => {
            this.topListData[1].data = data;
        }, () => {
        });
    }

    getAttackTarget() {
        this.mOverview.getAttackTarget(10).subscribe((data: any) => {
            this.topListData[2].data = data;
        }, () => {
        });
    }
}
