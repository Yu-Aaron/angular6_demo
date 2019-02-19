import {Component, OnInit} from '@angular/core';
import {SecurityService} from '../../../common/services/security.service';

@Component({
    selector: 'app-networksession',
    templateUrl: './networksession.component.html',
    styleUrls: ['./networksession.component.scss']
})
export class NetworksessionComponent implements OnInit {
    sessionTable = [];  //表格数据
    deviceList = [];  //设备名称
    connStateList = [];  //连接状态 可选项
    selectDevice: string;  //已选中设备
    selectDeviceNumber: string;
    filterFlag = false;  //过滤条件 是否显示
    filterParameter = null; //过滤条件 参数
    filterConditionData = {}; //过滤条件 可选项
    pageIndex = 1;
    pageSize = 10;
    pageTotalNumber = 0;
    tableTotalData = 0;
    loading: boolean;

    constructor(private securityService: SecurityService) {
    }

    ngOnInit() {
        this.connStateList = [
            {'value':'-1', 'label':'全部'},
            {'value':'NEW', 'label':'NEW'},
            {'value':'ESTABLISHED', 'label':'ESTABLISHED'},
            {'value':'CLOSED', 'label':'CLOSED'},
            {'value':'TCP_NONE', 'label':'TCP_NONE'},
            {'value':'TCP_LISTEN', 'label':'TCP_LISTEN'},
            {'value':'TCP_SYN_SENT', 'label':'TCP_SYN_SENT'},
            {'value':'TCP_SYN_RECV', 'label':'TCP_SYN_RECV'},
            {'value':'TCP_ESTABLISHED', 'label':'TCP_ESTABLISHED'},
            {'value':'TCP_FIN_WAIT1', 'label':'TCP_FIN_WAIT1'},
            {'value':'TCP_FIN_WAIT2', 'label':'TCP_FIN_WAIT2'},
            {'value':'TCP_TIME_WAIT', 'label':'TCP_TIME_WAIT'},
            {'value':'TCP_LAST_ACK', 'label':'TCP_LAST_ACK'},
            {'value':'TCP_CLOSE_WAIT', 'label':'TCP_CLOSE_WAIT'},
            {'value':'TCP_CLOSING', 'label':'TCP_CLOSING'},
            {'value':'TCP_CLOSED', 'label':'TCP_CLOSED'}];
        this.filterConditionData = {
            timeValueData: [],
            controlArray: [
                {label: '源IP', type: 'input', name: 'sourceIp'},
                {label: '目标IP', type: 'input', name: 'targetIp'},
                {label: '应用名称', type: 'input', name: 'serviceApp'},
                {label: '连接状态', type: 'select', value:'-1', name: 'level', selectValueData: this.connStateList},
            ]
        };
        this.getSecurityDevice();
    }

    getSecurityDevice() {
        let params = {
            $filter: '(deviceOnline eq 1)',
            subCategory: 3,
        };
        this.securityService.getSecurityDevice(params).subscribe((data: Array<any>) => {
            this.deviceList = data;
            if (this.deviceList.length > 0) {
                this.selectDevice = this.deviceList[0]['name'];
                this.selectDeviceNumber = this.deviceList[0]['serialNumber'];
                this.getSessionTable();
            }
        });
    }

    getSessionTable() {
        this.loading = true;
        let payload = {
            '$skip': (this.pageIndex - 1) * this.pageSize,
            '$limit': this.pageSize
        };
        if (this.filterParameter) {
            payload['$filter']= this.filterParameter;
        }
        this.securityService.getSessionTable(payload, this.selectDeviceNumber).subscribe((data: any) => {
            if (!data.error) {
                this.sessionTable = data['data']['pageData'];
                this.tableTotalData = data['data']['totalCount'];
                this.pageTotalNumber = Math.ceil(this.tableTotalData / this.pageSize);
            }
            this.loading = false;
        }, () => {
            this.loading = false;
        });
    }

    pageIndexChange() {
        this.getSessionTable();
    }

    changeDevice(type, index) {
        if (this.selectDevice === type) {
            return;
        }
        this.selectDevice = type;
        this.selectDeviceNumber = this.deviceList[index]['serialNumber'];
        this.getSessionTable();
    };

    // 接受子组件传过来的信息
    filterButton(msg) {
        this.filterFlag = msg.filterFlag;
        this.filterParameter = null;
        this.getSessionTable();
    }

    // 点击更新按钮 传过来的事件
    searchFilterTable(params) {
        this.pageIndex = params.pageIndex;
        this.filterParameter = params.params;
        this.getSessionTable();
    }

}
