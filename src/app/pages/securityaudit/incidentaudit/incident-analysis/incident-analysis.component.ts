import {Component, OnInit} from '@angular/core';
import {ChartService} from '../../../../common/service/chart.service';
import {forkJoin} from 'rxjs';
import {HomeService} from '../../../../common/service/home.service';

@Component({
    selector: 'app-incident-analysis',
    templateUrl: './incident-analysis.component.html',
    styleUrls: ['./incident-analysis.component.scss']
})

export class IncidentAnalysisComponent implements OnInit {
    // 安全类型分布
    monitorPieData = [
        {name: '威胁', value: 0},
        {name: '协议规则', value: 0},
        {name: 'IP/MAC', value: 0},
        {name: '域名规则', value: 0}
    ];
    monitorPieOption = {};
    lineProgress = [
        {name: '使用规则总数', value: 0},
        {name: '使用威胁总数', value: 0},
        {name: '使用自定义规则总数', value: 0}
    ];
    // 命中规则个数
    tabLabel = [
        {name: '全部', value: 'all'},
        {name: '威胁', value: '威胁'},
        {name: '协议规则', value: '协议规则'},
        {name: 'IP/MAC', value: 'IP/MAC'},
        {name: '域名规则', value: '域名规则'}
    ];
    tabLabelContent = [
        {text: '【发现威胁】111111111111111111111111', count: 1388},
        {text: '【发现威胁】111111111111111111111111', count: 1388},
        {text: '【发现威胁】111111111111111111111111', count: 1388},
        {text: '【发现威胁】111111111111111111111111', count: 1388},
        {text: '【发现威胁】111111111111111111111111', count: 1388},
    ];
    protocolTop = [];
    signatureTop = [];
    customTop = [];

    constructor(private chartService: ChartService, private homeService: HomeService) {
    }

    ngOnInit() {
        this.getActionTotal();
        this.getBaseTotal();
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

    // 点击查询按钮 传过来的事件
    searchFilterTable(params) {
        console.log(params);
    }
}
