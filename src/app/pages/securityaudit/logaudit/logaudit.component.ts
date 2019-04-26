import {Component, OnInit} from '@angular/core';
import {SecurityAuditService} from '../../../common/service/securityAudit.service';

@Component({
    selector: 'app-logaudit',
    templateUrl: './logaudit.component.html',
    styleUrls: ['./logaudit.component.scss']
})

export class LogauditComponent implements OnInit {
    tableData = [];  // 表格数据
    pageIndex = 1;
    pageSize = 10;
    pageTotalNumber = 0;
    tableCount = 0;
    loading: boolean;

    auditDataDetail = {};
    filter = '';
    protocol = '';
    filterConditionData = {
        timeValueData: [
            { label: '不限', type: 'no_range', value: 'n' },
            { label: '最近1H', type: 'link', value: 'h' },
            { label: '最近24H', type: 'link', value: 'd' },
            { label: '最近1周', type: 'link', value: 'w' },
            { label: '最近30天', type: 'link', value: 'm' },
            { label: '最近3个月', type: 'link', value: 't' },
            { label: '最近6个月', type: 'link', value: 's' },
            { label: '自定义', type: 'ower_link', value: 'r' }
        ],
        controlArray: [],
    }; // 过滤条件 可选项
    filterParameter = null; // 过滤条件 参数
    fields = ['protocolSourceName', 'sourceIp', 'sourcePort', 'destinationIp', 'destinationPort', 'sourceMac', 'destinationMac'];
    protocolOptions = [
        { display: '所有协议', value: 'normal', type: 'normal' },
        { display: 'HTTP', value: 'http', type: 'normal' },
        { display: 'FTP', value: 'ftp', type: 'normal' },
        { display: 'POP3', value: 'pop3', type: 'normal' },
        { display: 'SMTP', value: 'smtp', type: 'normal' },
        { display: 'Telnet', value: 'telnet', type: 'normal' },
        { display: 'SNMP', value: 'snmp', type: 'normal' },
    ]; // 协议枚举值
    factoryProtocolOptions = [
        {display: 'Modbus', value: 'modbus', type: 'factory'},
        {display: 'OPCDA', value: 'opcda', type: 'factory'},
        {display: 'S7', value: 's7', type: 'factory'},
        {display: 'DNP3', value: 'dnp3', type: 'factory'},
        {display: 'IEC104', value: 'iec104', type: 'factory'},
        {display: 'MMS', value: 'mms', type: 'factory'},
        {display: 'Profinetio', value: 'profinetio', type: 'factory'},
        {display: 'Pnrtdcp', value: 'pnrtdcp', type: 'factory'},
        {display: 'Goose', value: 'goose', type: 'factory'},
        {display: 'SV', value: 'sv', type: 'factory'},
        {display: 'EnipTcp', value: 'eniptcp', type: 'factory'},
        {display: 'EnipUdp', value: 'enipudp', type: 'factory'},
        {display: 'EnipIo', value: 'enipio', type: 'factory'},
        {display: 'OPCUA', value: 'opcua', type: 'factory'}
    ];
    msOption: any = {
        modbus: {func: []},
        opcda: {opc: []},
        s7: {pdu: []},
        dnp3: {func: []},
        iec104: {causetx: [], asdu: []},
        mms: {pdu: [], serviceRequest: []},
        profinetio: {func: [], opp: [], dataType: []},
        pnrtdcp: {frameid: [], serviceid: [], servicetype: [], dcpoption: [], dcpsuboption: []},
        eniptcp: {command: [], serviceName: [], addressType: [], dataType: []},
        enipudp: {command: []},
        enipio: {addressType: [], dataType: []},
        goose: {datSet: [], goID: []},
        sv: {svID: [], smpSynch: []},
        opcua: {serviceId: []},
        snmp: {pduType: [], version: [], community: []},
        focas: {command: []},
        sip: {method: []}
    };

    constructor(private securityAuditService: SecurityAuditService) {
    }

    ngOnInit() {
        this.tableData = [{
            packetTimestamp: '2019-01-13',
            flowTimestampLocal: '2019-01-12',
            sourceIp: '1.1.1.1',
            destinationIp: '1.1.1.1',
            sourceMac: '00:00:00:00:00:20',
            destinationMac: '00:00:00:00:00:20',
            sourcePort: 'SN54000',
            destinationPort: '161',
            protocolSourceName: 'telnet'
        }, {
            packetTimestamp: '2019-01-12',
            flowTimestampLocal: '2019-01-12',
            sourceIp: '1.1.1.1',
            destinationIp: '1.1.1.1',
            sourceMac: '00:00:00:00:00:20',
            destinationMac: '00:00:00:00:00:20',
            sourcePort: 10,
            destinationPort: 20,
            protocolSourceName: 'http'
        }];
        this.filterConditionData['protocolOptions'] = this.protocolOptions;
        this.protocol = this.protocolOptions[0]['value'];
    }

    // 审计日志列表
    getLogAudit(params) {
        // this.loading = true;
        let hasAdvanceSearch = this.filterParameter !== '';
        let payload = {
            '$skip': (this.pageIndex - 1) * this.pageSize,
            '$limit': this.pageSize,
        };
        if (!params['$orderby'] || params['$orderby'] === '') {
            payload['$orderby'] = 'packetTimestamp desc';
        }
        if (this.filterParameter) {
            payload['$filter'] = this.filterParameter;
            payload['$groupby'] = ['sourceMac', 'destinationMac', 'sourceIp', 'sourcePort', 'destinationIp', 'destinationPort', 'protocolType', 'protocolTypeName', 'protocolSourceName', 'dpiIp', 'dpiPort', 'boxId', 'deviceId'];
        }
        this.securityAuditService.getLogAudit(payload, this.protocol, hasAdvanceSearch).subscribe((listData: any) => {
            this.tableData = listData;
            this.tableData.map((item) => {
                if (item.protocolSourceName === 'goose' || item.protocolSourceName === 'sv') {
                    item.flowTimestamp = item.packetTimestamp;
                }
                let timestamp = item.flowTimestamp || item.packetTimestamp;
                item.flowTimestampLocal = new Date(timestamp);
                // item.getDetails = this.getDetails;
                return item;
            });

        });
        this.getLogAuditCount();
    }

    getLogAuditCount() {
        const payload = {};
        let hasAdvanceSearch = this.filterParameter !== '';
        if (this.filterParameter) {
            payload['$filter'] = this.filterParameter;
        }
        this.securityAuditService.getLogAuditCount(payload, this.protocol, hasAdvanceSearch).subscribe((data: any) => {
            this.tableCount = data;
            this.pageTotalNumber = Math.ceil(this.tableCount / this.pageSize);
        });
    }

    getDetails(audit) {
        if (audit.detail || this.factoryProtocolOptions && this.factoryProtocolOptions.filter((b) => {
            return this.protocol === b.value;
        })[0]) {
            return;
        }
        audit.flowTimestampLocal = new Date(audit.flowTimestampLocal);
        this.securityAuditService.get(audit.flowdataHeadId, audit.protocolSourceName).subscribe((detail) => {
            for (const index in detail) {
                if (index) {
                    detail[index].packetTimestampLocal = new Date(detail[index].packetTimestamp);
                }
            }
            audit.detail = detail || [];
        });
    }

    // 切换协议
    changeProtocol() {
        this.setConfig(this.protocol);
    }

    setConfig(c) {
        if (c === 'modbus' && !this.msOption.modbus['init']) {
            this.securityAuditService.getData({'currentValue': '[{"name":"协议","value":"modbus"}]'}).subscribe(data => {
                this.setOptions(data['nodeTree'].nodes[1], this.msOption.modbus.func);
                this.msOption.modbus['init'] = true;
            });
        }
        if (c === 'opcda' && !this.msOption.opcda['init']) {
            this.securityAuditService.getData({'currentValue': '[{"name":"协议","value":"opcda"}]'}).subscribe(data => {
                this.setOptions(data['nodeTree'].nodes[1], this.msOption.opcda.opc);
                this.msOption.opcda['init'] = true;
            });
        }
        if (c === 's7' && !this.msOption.s7['init']) {
            this.securityAuditService.getData({'currentValue': '[{"name":"协议","value":"S7"}]'}).subscribe(data => {
                this.setOptions(data['nodeTree'].nodes[1], this.msOption.s7.pdu);
                this.msOption.s7['init'] = true;
            });
        }
        if (c === 'dnp3' && !this.msOption.dnp3['init']) {
            this.securityAuditService.getData({'currentValue': '[{"name":"协议","value":"dnp3"}]'}).subscribe(data => {
                this.setOptions(data['nodeTree'].nodes[1], this.msOption.dnp3.func);
                this.msOption.dnp3['init'] = true;
            });
        }
        if (c === 'iec104' && !this.msOption.iec104['init']) {
            this.securityAuditService.getData({'currentValue': '[{"name":"协议","value":"iec104"}]'}).subscribe(data => {
                this.setOptions(data['nodeTree'].nodes[1], this.msOption.iec104.causetx);
                this.setOptions(data['nodeTree'].nodes[2], this.msOption.iec104.asdu);
                this.msOption.iec104['init'] = true;
            });
        }
        if (c === 'mms' && !this.msOption.mms['init']) {
            this.securityAuditService.getData({'currentValue': '[{"name":"协议","value":"mms"}]'}).subscribe(data => {
                this.setOptions(data['nodeTree'].nodes[1], this.msOption.mms.pdu);
                this.setOptions(data['nodeTree'].nodes[2], this.msOption.mms.serviceRequest);
                this.msOption.mms['init'] = true;
            });
        }
        if (c === 'profinetio' && !this.msOption.profinetio['init']) {
            this.securityAuditService.getData({'currentValue': '[{"name":"协议","value":"profinetio"}]'}).subscribe(data => {
                this.setOptions(data['nodeTree'].nodes[1], this.msOption.profinetio.func);
                this.setOptions(data['nodeTree'].nodes[2], this.msOption.profinetio.opp);
                this.setOptions(data['nodeTree'].nodes[3], this.msOption.profinetio.dataType);
                this.msOption.profinetio['init'] = true;
            });
        }
        if (c === 'pnrtdcp' && !this.msOption.pnrtdcp['init']) {
            this.securityAuditService.getData({'currentValue': '[{"name":"协议","value":"PNRTDCP"}]'}).subscribe(data => {
                this.setOptions(data['nodeTree'].nodes[1], this.msOption.pnrtdcp.dcpoption);
                this.setOptions(data['nodeTree'].nodes[2], this.msOption.pnrtdcp.servicetype);
                this.setOptions(data['nodeTree'].nodes[3], this.msOption.pnrtdcp.serviceid);
                this.setOptions(data['nodeTree'].nodes[4], this.msOption.pnrtdcp.frameid);
                // setOptions(data.data.nodeTree.nodes[5], msOption.pnrtdcp.dcpsuboption);
                this.msOption.pnrtdcp['init'] = true;
            });
        }
        if (c === 'eniptcp' && !this.msOption.eniptcp['init']) {
            this.securityAuditService.getData({'currentValue': '[{"name":"协议","value":"ENIP-TCP"}]'}).subscribe(data => {
                this.setOptions(data['nodeTree'].nodes[1], this.msOption.eniptcp.command);
                this.setOptions(data['nodeTree'].nodes[2], this.msOption.eniptcp.serviceName);
                this.setOptions(data['nodeTree'].nodes[3], this.msOption.eniptcp.addressType);
                this.setOptions(data['nodeTree'].nodes[4], this.msOption.eniptcp.dataType);
                this.msOption.eniptcp.init = true;
            });
        }
        if (c === 'enipudp' && !this.msOption.enipudp['init']) {
            this.securityAuditService.getData({'currentValue': '[{"name":"协议","value":"ENIP-UDP"}]'}).subscribe(data => {
                this.setOptions(data['nodeTree'].nodes[1], this.msOption.enipudp.command);
                this.msOption.enipudp['init'] = true;
            });
        }
        if (c === 'enipio' && !this.msOption.enipio['init']) {
            this.securityAuditService.getData({'currentValue': '[{"name":"协议","value":"ENIP-IO"}]'}).subscribe(data => {
                this.setOptions(data['nodeTree'].nodes[1], this.msOption.enipio.addressType);
                this.setOptions(data['nodeTree'].nodes[2], this.msOption.enipio.dataType);
                this.msOption.enipio['init'] = true;
            });
        }
        if (c === 'goose' && !this.msOption.goose['init']) {
            this.securityAuditService.getData({'currentValue': '[{"name":"协议","value":"GOOSE"}]'}).subscribe(data => {
                // setOptions(data.data.nodeTree.nodes[1], msOption.goose.datSet);
                // setOptions(data.data.nodeTree.nodes[2], msOption.goose.goID);
                this.msOption.goose['init'] = true;
            });
        }
        if (c === 'sv' && !this.msOption.sv.init) {
            this.securityAuditService.getData({'currentValue': '[{"name":"协议","value":"SV"}]'}).subscribe(data => {
                // setOptions(data.data.nodeTree.nodes[1], msOption.sv.svID);
                this.setOptions(data['nodeTree'].nodes[2], this.msOption.sv.smpSynch);
                this.msOption.sv['init'] = true;
            });
        }
        if (c === 'opcua_tcp' && !this.msOption.opcua['init']) {
            this.securityAuditService.getData({'currentValue': '[{"name":"协议","value":"opcua_tcp"}]'}).subscribe(data => {
                this.setOptions(data['nodeTree'].nodes[1], this.msOption.opcua.serviceId);
                this.msOption.opcua['init'] = true;
            });
        }
        if (c === 'snmp' && !this.msOption.snmp['init']) {
            this.securityAuditService.getData({'currentValue': '[{"name":"协议","value":"snmp"}]'}).subscribe(data => {
                this.setOptions(data['nodeTree'].nodes[1], this.msOption.snmp.pduType);
                // setOptions(data.data.nodeTree.nodes[2], msOption.snmp.version);
                // setOptions(data.data.nodeTree.nodes[3], msOption.snmp.community);
                this.msOption.snmp['init'] = true;
            });
        }
        if (c === 'focas' && !this.msOption.focas['init']) {
            this.securityAuditService.getData({'currentValue': '[{"name":"协议","value":"focas"}]'}).subscribe(data => {
                this.setOptions(data['nodeTree'].nodes[1], this.msOption.focas.command);
                this.msOption.focas['init'] = true;
            });
        }
        if (c === 'sip' && !this.msOption.sip['init']) {
            this.securityAuditService.getData({'currentValue': '[{"name":"协议","value":"sip"}]'}).subscribe(data => {
                this.setOptions(data['nodeTree'].nodes[6], this.msOption.sip.method);
                this.msOption.sip['init'] = true;
            });
        }
        this.filterConditionData.controlArray = [
            {label: '源IP', type: 'input', name: 'sourceIp', placeholder: '输入源IP'},
            {label: '目标IP', type: 'input', name: 'targetIp', placeholder: '输入目标IP'},
            {label: '源Mac', type: 'input', name: 'sourceMac', placeholder: '输入源Mac'},
            {label: '目标MAC', type: 'input', name: 'destinationMac', placeholder: '输入目标Mac'},
            {label: '源端口', type: 'input', name: 'sourcePort', placeholder: '输入源端口'},
            {label: '目标端口', type: 'input', name: 'destinationPort', placeholder: '输入目标端口'}
        ];
        if (c === 'modbus') {
            this.fields = ['protocolSourceName', 'sourceIp', 'sourcePort', 'destinationIp', 'destinationPort', 'sourceMac', 'destinationMac', 'func', 'startAddr', 'endAddr'];
            this.filterConditionData.controlArray.push({'label': '功能码', 'type': 'list_checkbox', 'name': 'func', 'options': this.msOption.modbus.func, 'filter': c});
            this.filterConditionData.controlArray.push({'label': '起始地址', 'type': 'input','name': 'startAddr', });
            this.filterConditionData.controlArray.push({'label': '终止地址', 'type': 'input','name': 'endAddr', });
        }
        if (c === 'opcda') {
            this.fields = ['protocolSourceName', 'sourceIp', 'sourcePort', 'destinationIp', 'destinationPort', 'sourceMac', 'destinationMac', 'opInt', 'opCode'];
            this.filterConditionData.controlArray.push({'label': '操作接口', 'type': 'list_checkbox', 'name': 'opInt', 'options': this.msOption.opcda.opc, 'filter': c});
            this.filterConditionData.controlArray.push({'label': '操作码', 'type': 'input','name': 'opCode', });
        }
        if (c === 's7') {
            this.fields = ['protocolSourceName', 'sourceIp', 'sourcePort', 'destinationIp', 'destinationPort', 'sourceMac', 'destinationMac', 'pduType', 'opType', 'dataType'];
            this.filterConditionData.controlArray.push({'label': 'PDU类型', 'type': 'list_checkbox', 'name': 'pduType', 'options': this.msOption.s7.pdu, 'filter': c});
            this.filterConditionData.controlArray.push({'label': '操作类型', 'type': 'input','name': 'opType', });
            this.filterConditionData.controlArray.push({'label': '数据类型', 'type': 'input','name': 'dataType', });
        }
        if (c === 'dnp3') {
            this.fields = ['protocolSourceName', 'sourceIp', 'sourcePort', 'destinationIp', 'destinationPort', 'sourceMac', 'destinationMac', 'func'];
            this.filterConditionData.controlArray.push({'label': '功能码', 'type': 'list_checkbox', 'name': 'func', 'options': this.msOption.dnp3.func, 'filter': c});
        }
        if (c === 'iec104') {
            this.fields = ['protocolSourceName', 'sourceIp', 'sourcePort', 'destinationIp', 'destinationPort', 'sourceMac', 'destinationMac', 'causetxType', 'asduType'];
            this.filterConditionData.controlArray.push({'label': 'Causetx类型', 'type': 'list_checkbox', 'name': 'causetxType', 'options': this.msOption.iec104.causetx, 'filter': c});
            this.filterConditionData.controlArray.push({'label': 'Asdu类型', 'type': 'list_checkbox', 'name': 'asduType', 'options': this.msOption.iec104.asdu, 'filter': c});
        }
        if (c === 'mms') {
            this.filterConditionData.controlArray.push({'label': 'PDU类型', 'type': 'list_checkbox', 'name': 'pduType', 'options': this.msOption.mms.pdu, 'filter': c});
        }
        if (c === 'profinetio') {
            this.fields = ['protocolSourceName', 'sourceIp', 'sourcePort', 'destinationIp', 'destinationPort', 'sourceMac', 'destinationMac', 'func', 'opInt', 'dataType'];
            this.filterConditionData.controlArray.push({'label': '功能码', 'type': 'list_checkbox', 'name': 'func', 'options': this.msOption.profinetio.func, 'filter': c});
            this.filterConditionData.controlArray.push({'label': '操作接口', 'type': 'list_checkbox', 'name': 'opInt', 'options': this.msOption.profinetio.opp, 'filter': c});
            this.filterConditionData.controlArray.push({'label': '数据类型', 'type': 'list_checkbox', 'name': 'dataType', 'options': this.msOption.profinetio.dataType, 'filter': c});
        }
        if (c === 'pnrtdcp') {
            this.fields = ['protocolSourceName', 'sourceIp', 'sourcePort', 'destinationIp', 'destinationPort', 'sourceMac', 'destinationMac', 'frameid', 'serviceid', 'servicetype', 'dcpoption', 'dcpsuboption'];
            this.filterConditionData.controlArray.push({'label': 'frame标识号', 'type': 'list_checkbox', 'name': 'frameid', 'option': true, value: [], 'options': this.msOption.pnrtdcp.frameid, 'filter': c});
            this.filterConditionData.controlArray.push({'label': '服务标识号', 'type': 'list_checkbox', 'name': 'serviceid', 'option': true, value: [], 'options': this.msOption.pnrtdcp.serviceid, 'filter': c});
            this.filterConditionData.controlArray.push({'label': '服务类型', 'type': 'list_checkbox', 'name': 'servicetype', 'option': true, value: [], 'options': this.msOption.pnrtdcp.servicetype, 'filter': c});
        }
        if (c === 'eniptcp') {
            this.fields = ['protocolSourceName', 'sourceIp', 'sourcePort', 'destinationIp', 'destinationPort', 'sourceMac', 'destinationMac', 'command', 'serviceName', 'addressType', 'dataType'];
            this.filterConditionData.controlArray.push({'label': '命令', 'type': 'list_checkbox', 'name': 'command', 'options': this.msOption.eniptcp.command, 'filter': c});
        }
        if (c === 'enipudp') {
            this.fields = ['protocolSourceName', 'sourceIp', 'sourcePort', 'destinationIp', 'destinationPort', 'sourceMac', 'destinationMac', 'command'];
            this.filterConditionData.controlArray.push({'label': '命令', 'type': 'list_checkbox', 'name': 'command', 'options': this.msOption.enipudp.command, 'filter': c});
        }
        if (c === 'enipio') {
            this.fields = ['protocolSourceName', 'sourceIp', 'sourcePort', 'destinationIp', 'destinationPort', 'sourceMac', 'destinationMac', 'addressType', 'dataType'];
            this.filterConditionData.controlArray.push({'label': '地址类型', 'type': 'list_checkbox', 'name': 'addressType', 'options': this.msOption.enipio.addressType, 'filter': c});
            this.filterConditionData.controlArray.push({'label': '数据类型', 'type': 'list_checkbox', 'name': 'dataType', 'options': this.msOption.enipio.dataType, 'filter': c});
        }
        if (c === 'goose') {
            this.fields = ['protocolSourceName', 'sourceIp', 'sourcePort', 'destinationIp', 'destinationPort', 'sourceMac', 'destinationMac', 'datSet', 'goID'];
        }
        if (c === 'sv') {
            this.fields = ['protocolSourceName', 'sourceIp', 'sourcePort', 'destinationIp', 'destinationPort', 'sourceMac', 'destinationMac', 'svID', 'smpSynch'];
            this.filterConditionData.controlArray.push({'label': '采样同步', 'type': 'list_checkbox', 'name': 'smpSynch', 'options': this.msOption.sv.smpSynch, 'filter': c});
        }
        if (c === 'opcua_tcp') {
            this.fields = ['protocolSourceName', 'sourceIp', 'sourcePort', 'destinationIp', 'destinationPort', 'sourceMac', 'destinationMac', 'serviceid'];
            this.filterConditionData.controlArray.push({'label': '服务码', 'type': 'list_checkbox', 'name': 'serviceid', 'options': this.msOption.opcua.serviceId, 'filter': c});
        }
        if (c === 'snmp') {
            this.fields = ['protocolSourceName', 'sourceIp', 'sourcePort', 'destinationIp', 'destinationPort', 'sourceMac', 'destinationMac', 'pduType'];
            this.filterConditionData.controlArray.push({'label': 'PDU类型', 'type': 'list_checkbox', 'name': 'pduType', 'options': this.msOption.snmp.pduType, 'filter': c});
        }
        if (c === 'focas') {
            this.fields = ['protocolSourceName', 'sourceIp', 'sourcePort', 'destinationIp', 'destinationPort', 'sourceMac', 'destinationMac', 'command'];
            this.filterConditionData.controlArray.push({'label': '命令', 'type': 'list_checkbox', 'name': 'command', 'options': this.msOption.focas.command, 'filter': c});
        }
        if (c === 'sip') {
            this.fields = ['protocolSourceName', 'sourceIp', 'sourcePort', 'destinationIp', 'destinationPort', 'sourceMac', 'destinationMac', 'method'];
            this.filterConditionData.controlArray.push({'label': '方法名字', 'type': 'list_checkbox', 'name': 'method', 'options': this.msOption.sip.method, 'filter': c});
        }
        this.getLogAudit({});
    }

    setOptions(source, destinationArray) {
        if (source) {
            let temp = source.nodeDisplayValue.split(',');
            temp.sort((a, b) => {
                return a.toLowerCase().localeCompare(b.toLowerCase());
            });
            let hasNonStandard = false;
            temp.map((d) => {
                if (d === 'NONSTANDARD') {
                    hasNonStandard = true;
                    return;
                }
                d = {'name': d, 'value': d};
                destinationArray.push(d);
            });
        }
        return destinationArray;
    }

    // 显示详情
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

    supportIpAndPort(protocolType) {
        if (!protocolType) {
            return true;
        }
        switch (protocolType.toLowerCase()) {
            case 'goose':
            case 'sv':
            case 'pnrtdcp':
                return false;
            default:
                return true;
        }
    }

    // 页数改变时
    pageIndexChange() {
        this.getLogAudit({});
    }

    // 点击查询按钮 传过来的事件
    searchFilterTable(params) {
        this.pageIndex = params.pageIndex;
        this.filterParameter = params.params;
        this.protocol = params.protocol;
        if (this.protocol) {
            this.changeProtocol();
        } else {
            this.getLogAudit({});
        }
    }

    // 刷新
    refresh() {
        this.filterParameter = '';
        this.getLogAudit({});
    }
}
