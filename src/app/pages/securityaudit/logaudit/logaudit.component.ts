import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-logaudit',
    templateUrl: './logaudit.component.html',
    styleUrls: ['./logaudit.component.scss']
})
export class LogauditComponent implements OnInit {
    protocolOptions = [];

    tableData = [];  // 表格数据
    filterParameter = null; // 过滤条件 参数
    filterConditionData = {}; // 过滤条件 可选项
    pageIndex = 1;
    pageSize = 10;
    pageTotalNumber = 0;
    tableCount = 0;
    loading: boolean;

    auditDataDetail = {};

    constructor() {
    }

    ngOnInit() {
        this.protocolOptions = [
            {display: '所有协议', value: 'normal', type: 'normal'},
            {display: 'HTTP', value: 'http', type: 'normal'},
            {display: 'FTP', value: 'ftp', type: 'normal'},
            {display: 'POP3', value: 'pop3', type: 'normal'},
            {display: 'SMTP', value: 'smtp', type: 'normal'},
            {display: 'Telnet', value: 'telnet', type: 'normal'},
            {display: 'SNMP', value: 'snmp', type: 'normal'},
        ];
        this.filterConditionData = {
            timeValueData: [],
            controlArray: [
                {label: '源IP', type: 'input', name: 'sourceIp', placeholder: '输入IP'},
                {label: '目标IP', type: 'input', name: 'targetIp', placeholder: '输入IP'},
                {label: '应用名称', type: 'input', name: 'serviceApp', placeholder: '应用名称'}
            ],
            logProtocolArray: this.protocolOptions
        };
        this.getAll();
    }

    getAll() {
        this.tableData = [{
            flowTimestampLocal: '2019-01-12',
            sourceIp: '1.1.1.1',
            destinationIp: '1.1.1.1',
            sourceMac: '00:00:00:00:00:20',
            destinationMac: '00:00:00:00:00:20',
            sourcePort: 'SN54000',
            destinationPort: '161',
            protocolSourceName: 'telnet'
        }, {
            flowTimestampLocal: '2019-01-12',
            sourceIp: '1.1.1.1',
            destinationIp: '1.1.1.1',
            sourceMac: '00:00:00:00:00:20',
            destinationMac: '00:00:00:00:00:20',
            sourcePort: 10,
            destinationPort: 20,
            protocolSourceName: 'abc'
        }];
        this.pageTotalNumber = Math.ceil(this.tableCount / this.pageSize);
    }

    showDetailWindow(auditHeadInfo) {
        const detailData = auditHeadInfo;
        detailData.unitSize = 'B';
        if (detailData.packetLenth && detailData.packetLenth >= 1024) {
            detailData.packetLenth /= 1024;
            detailData.unitSize = 'KB';
        }
        if (detailData.packetLenth && detailData.packetLenth >= 1024) {
            detailData.packetLenth /= 1024;
            detailData.unitSize = 'MB';
        }
        this.auditDataDetail = detailData;
        this.auditDataDetail['isVisible'] = true;
    }
}
