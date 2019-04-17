import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-logaudit',
  templateUrl: './logaudit.component.html',
  styleUrls: ['./logaudit.component.scss']
})
export class LogauditComponent implements OnInit {
    filterParameter = null; // 过滤条件 参数
    filterConditionData = {}; // 过滤条件 可选项
    protocolOptions = [];

    constructor() { }

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
                {label: '源IP', type: 'input', name: 'sourceIp'},
                {label: '目标IP', type: 'input', name: 'targetIp'},
                {label: '应用名称', type: 'input', name: 'serviceApp'}
            ],
            topArray: this.protocolOptions
        };
    }

}
