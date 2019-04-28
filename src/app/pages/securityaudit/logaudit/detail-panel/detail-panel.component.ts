import {Component, Input, OnInit} from '@angular/core';
import {SecurityAuditService} from '../../../../common/service/securityAudit.service';
import * as moment from 'moment';

@Component({
    selector: 'app-detail-panel',
    templateUrl: './detail-panel.component.html',
    styleUrls: ['./detail-panel.component.scss']
})

export class DetailPanelComponent implements OnInit {
    @Input() auditDataDetail = {};
    listInfo = [];
    listInfoHead = [];
    fileZipPsw = '';
    protocolType = '';
    totalCount = 0;
    pageIndex = 1;
    pageSize = 8;
    pageTotalNumber = 0;
    loading = false;

    constructor(private securityAuditService: SecurityAuditService) {
    }

    ngOnInit() {
    }

    initData() {
        this.protocolType = this.auditDataDetail['protocolSourceName'] && this.auditDataDetail['protocolSourceName'].toLowerCase();
        this.getAll({});
        this.getCount();
        this.getTableHeads();
    }

    getAll(params) {
        // if (!params['$orderby'] || params['$orderby'] === '') {
        //     params['$orderby'] = 'packetTimestamp desc';
        // }
        this.loading = true;
        let payload = {
            '$skip': (this.pageIndex - 1) * this.pageSize,
            '$limit': this.pageSize,
        };
        console.log(this.protocolType);
        this.securityAuditService.getDetails(payload, this.auditDataDetail['flowdataHeadId'], this.protocolType).subscribe((data: any) => {
            this.loading = false;
            if (data.length) {
                this.auditDataDetail['listInfo'] = this.getTableDatas(data, this.protocolType);
            } else {
                this.auditDataDetail['listInfo'] = [];
            }
        }, () => {
            this.loading = false;
        });
    }

    getCount() {
        this.securityAuditService.getDetailsCount(this.auditDataDetail['flowdataHeadId'], this.protocolType).subscribe((count: any) => {
                this.totalCount = count;
            });
    }

    getTableHeads() {
        let heads = [];
        switch (this.protocolType) {
            case 'http':
                heads = ['记录时间', '目标URL'];
                break;
            case 'ftp':
                heads = ['记录时间', '使用账号', '输入命令'];
                break;
            case 'telnet':
                heads = ['记录时间', '使用账号', '输入内容'];
                break;
            case 'smtp':
                heads = ['记录时间', '源信箱地址', '目的信箱地址'];
                break;
            case 'pop3':
                heads = ['记录时间', '源信箱地址', '目的信箱地址'];
                break;
            case 'modbus':
                heads = ['记录时间', '功能码', '起始地址', '终止地址'];
                break;
            case 'opcda':
                heads = ['记录时间', '操作接口', '操作码'];
                break;
            case 's7':
                heads = ['记录时间', 'PDU类型', '操作类型', '数据类型'];
                break;
            case 'dnp3':
                heads = ['记录时间', '功能码'];
                break;
            case 'iec104':
                heads = ['记录时间', 'Causetx类型', 'Asdu类型'];
                break;
            case 'mms':
                heads = ['记录时间', 'PDU类型', '服务请求类型'];
                break;
            case 'profinetio':
                heads = ['记录时间', '功能码', '操作接口', '数据类型'];
                break;
            case 'pnrtdcp':
                heads = ['记录时间', 'frame标识号', '服务标识号', '服务类型', '选项', '子选项'];
                break;
            case 'enipio':
                heads = ['记录时间', '地址类型', '数据类型'];
                break;
            case 'eniptcp':
                heads = ['记录时间', '命令', '服务码', '地址类型', '数据类型'];
                break;
            case 'enipudp':
                heads = ['记录时间', '命令'];
                break;
            case 'goose':
                heads = ['记录时间', '数据集', '标识号'];
                break;
            case 'sv':
                heads = ['记录时间', 'SV编号', '采样同步'];
                break;
            case 'snmp':
                heads = ['记录时间', 'PDU类型', '版本', '团体名'];
                break;
            case 'opcua':
                heads = ['记录时间', '服务码'];
                break;
            default:
                break;
        }
        this.listInfoHead = heads;
    }

    getTableDatas(rawDatas, protocolType) {
        let datas = [];
        switch (protocolType) {
            case 'http':
                rawDatas.map(function (valObj) {
                    datas.push(
                        new Array(moment(valObj.packetTimestamp).format('YYYY-MM-DD HH:mm:ss'), valObj.url)
                    );
                });
                break;
            case 'ftp':
                rawDatas.map(function (valObj) {
                    datas.push(
                        new Array(moment(valObj.packetTimestamp).format('YYYY-MM-DD HH:mm:ss'), valObj.accountName, valObj.command));
                });
                break;
            case 'telnet':
                rawDatas.map(function (valObj) {
                    datas.push(
                        new Array(moment(valObj.packetTimestamp).format('YYYY-MM-DD HH:mm:ss'), valObj.accountName, valObj.command));
                });
                break;
            case 'smtp':
                rawDatas.map(function (valObj) {
                    datas.push(
                        new Array(moment(valObj.packetTimestamp).format('YYYY-MM-DD HH:mm:ss'), valObj.souceMailAddress, valObj.destMailAddress));
                });
                break;
            case 'pop3':
                rawDatas.map(function (valObj) {
                    datas.push(
                        new Array(moment(valObj.packetTimestamp).format('YYYY-MM-DD HH:mm:ss'), valObj.souceMailAddress, valObj.destMailAddress));
                });
                break;
            case 'modbus':
                rawDatas.map(function (valObj) {
                    datas.push(
                        new Array(moment(valObj.packetTimestamp).format('YYYY-MM-DD HH:mm:ss'), valObj.func, valObj.startAddr, valObj.endAddr)
                    );
                });
                break;
            case 'opcda':
                rawDatas.map(function (valObj) {
                    datas.push(
                        new Array(moment(valObj.packetTimestamp).format('YYYY-MM-DD HH:mm:ss'), valObj.opInt, valObj.opCode)
                    );
                });
                break;
            case 's7':
                rawDatas.map(function (valObj) {
                    datas.push(
                        new Array(moment(valObj.packetTimestamp).format('YYYY-MM-DD HH:mm:ss'), valObj.pduType, valObj.opType, valObj.dataType)
                    );
                });
                break;
            case 'dnp3':
                rawDatas.map(function (valObj) {
                    datas.push(
                        new Array(moment(valObj.packetTimestamp).format('YYYY-MM-DD HH:mm:ss'), valObj.func)
                    );
                });
                break;
            case 'iec104':
                rawDatas.map(function (valObj) {
                    datas.push(
                        new Array(moment(valObj.packetTimestamp).format('YYYY-MM-DD HH:mm:ss'), valObj.causetxType, valObj.asduType)
                    );
                });
                break;
            case 'mms':
                rawDatas.map(function (valObj) {
                    datas.push(
                        new Array(moment(valObj.packetTimestamp).format('YYYY-MM-DD HH:mm:ss'), valObj.pduType, valObj.serviceRequest)
                    );
                });
                break;
            case 'profinetio':
                rawDatas.map(function (valObj) {
                    datas.push(
                        new Array(moment(valObj.packetTimestamp).format('YYYY-MM-DD HH:mm:ss'), valObj.func, valObj.opInt, valObj.dataType)
                    );
                });
                break;
            case 'pnrtdcp':
                rawDatas.map(function (valObj) {
                    datas.push(
                        new Array(moment(valObj.packetTimestamp).format('YYYY-MM-DD HH:mm:ss'), valObj.frameid, valObj.serviceid, valObj.servicetype, valObj.dcpoption, valObj.dcpsuboption)
                    );
                });
                break;
            case 'enipio':
                rawDatas.map(function (valObj) {
                    datas.push(
                        new Array(moment(valObj.packetTimestamp).format('YYYY-MM-DD HH:mm:ss'), valObj.addressType, valObj.dataType)
                    );
                });
                break;
            case 'eniptcp':
                rawDatas.map(function (valObj) {
                    datas.push(
                        new Array(moment(valObj.packetTimestamp).format('YYYY-MM-DD HH:mm:ss'), valObj.command, valObj.serviceName, valObj.addressType, valObj.dataType)
                    );
                });
                break;
            case 'enipudp':
                rawDatas.map(function (valObj) {
                    datas.push(
                        new Array(moment(valObj.packetTimestamp).format('YYYY-MM-DD HH:mm:ss'), valObj.command)
                    );
                });
                break;
            case 'goose':
                rawDatas.map(function (valObj) {
                    datas.push(
                        new Array(moment(valObj.packetTimestamp).format('YYYY-MM-DD HH:mm:ss'), valObj.datSet, valObj.goID)
                    );
                });
                break;
            case 'sv':
                rawDatas.map(function (valObj) {
                    datas.push(
                        new Array(moment(valObj.packetTimestamp).format('YYYY-MM-DD HH:mm:ss'), valObj.svID, valObj.smpSynch)
                    );
                });
                break;
            case 'snmp':
                rawDatas.map(function (valObj) {
                    datas.push(
                        new Array(moment(valObj.packetTimestamp).format('YYYY-MM-DD HH:mm:ss'), valObj.pduType, valObj.version, valObj.community)
                    );
                });
                break;
            case 'opcua_tcp':
                rawDatas.map(function (valObj) {
                    datas.push(
                        new Array(moment(valObj.packetTimestamp).format('YYYY-MM-DD HH:mm:ss'), valObj.serviceId)
                    );
                });
                break;
            case 'focas':
                rawDatas.map(function (valObj) {
                    datas.push(
                        new Array(moment(valObj.packetTimestamp).format('YYYY-MM-DD HH:mm:ss'), valObj.command, valObj.type, valObj.function_key, valObj.func)
                    );
                });
                break;
            case 'sip':
                rawDatas.map(function (valObj) {
                    datas.push(
                        new Array(moment(valObj.packetTimestamp).format('YYYY-MM-DD HH:mm:ss'), valObj.method, valObj.command, valObj.type, valObj.cmdType, valObj.cmdMode, valObj.cmdId, valObj.cmdParam1, valObj.cmdParam2, valObj.storeType, valObj.actionType, valObj.duration)
                    );
                });
                break;
            default:
                break;
        }
        this.listInfo = datas;
    }

    exportFile(flag, headid) {
        const params = {
            $limit: 100000
        };
        if (headid > 0) {
            params['$filter'] = 'flowdataHeadId eq ' + headid;
        }
        this.securityAuditService.getAllExport(params, this.fileZipPsw, this.auditDataDetail['protocolSourceName']).subscribe(function (data) {
            window.open('./' + data, '_self');
        });
    }

    trim(input) {
        input = (input === null || input === undefined) ? '' : String(input);
        return input.replace(/(^\s*)|(\s*$)/g, '');
    }

    supportIpAndPort(protocolType) {
        if (!protocolType) {return true; }
        switch (protocolType.toLowerCase()) {
            case 'goose':
            case 'sv':
            case 'pnrtdcp':
                return false;
            default:
                return true;
        }
    }

    handleCancel(): void {
        this.auditDataDetail['isVisible'] = false;
    }


}
