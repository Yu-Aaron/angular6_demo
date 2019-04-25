import {Component, OnInit} from '@angular/core';
import {SecurityAuditService} from '../../../common/service/securityAudit.service';

@Component({
    selector: 'app-incidentaudit',
    templateUrl: './incidentaudit.component.html',
    styleUrls: ['./incidentaudit.component.scss']
})

export class IncidentauditComponent implements OnInit {
    tableData = [];  // 表格数据
    filterParameter = null; // 过滤条件 参数
    filterConditionData = {}; // 过滤条件 可选项
    pageIndex = 1;
    pageSize = 10;
    pageTotalNumber = 0;
    tableCount = 0;
    loading: boolean;
    selectedItems = [];
    allChecked: boolean;

    dataSummary = [
        {name: '事件总数', count: 2875, color: '#C27700'},
        {name: '发现威胁', count: 2875, color: '#26BAFB'},
        {name: '命中协议规则', count: 10, color: '#26BAFB'},
        {name: '发现未知设备数量', count: 10, color: '#26BAFB'},
        {name: 'IP欺骗', count: 10, color: '#26BAFB'},
        {name: '命中域名', count: 10, color: '#26BAFB'},
    ];

    isVisible = false;

    constructor(private securityAuditService: SecurityAuditService) {
    }

    ngOnInit() {
        this.filterConditionData = {
            timeValueData: [],
            controlArray: [
                {label: '源IP', type: 'input', name: 'sourceIp', placeholder: '输入IP'},
                {label: '目标IP', type: 'input', name: 'targetIp', placeholder: '输入IP'},
                {label: '应用名称', type: 'input', name: 'serviceApp', placeholder: '应用名称'}
            ]
        };
        // this.getAll();
        this.tableData = [{
            name: '【发现威胁】GPL NETBIOS SMB-DS IPC$ unicode 共享',
            protocol: 'modbus',
            securityAreaName: '默认安全域',
            typeDisplay: '威胁',
            sourceIP: '1.1.1.1',
            destinationIp: '1.1.1.1',
            date: '2019-01-12',
        }, {
            name: '【发现威胁】GPL NETBIOS SMB-DS IPC$ unicode 共享',
            protocol: 'modbus',
            securityAreaName: '默认安全域',
            typeDisplay: '威胁',
            sourceIP: '1.1.1.1',
            destinationIp: '1.1.1.1',
            date: '2019-01-12',
        }];
        this.pageTotalNumber = Math.ceil(this.tableCount / this.pageSize);
    }

    getAll() {
        this.loading = true;
        const payload = {
            '$skip': (this.pageIndex - 1) * this.pageSize,
            '$limit': this.pageSize
        };
        if (this.filterParameter) {
            payload['$filter'] = this.filterParameter;
        }
        this.securityAuditService.getAll(payload).subscribe((data: any) => {
            this.tableData = data;
            this.pageTotalNumber = Math.ceil(this.tableCount / this.pageSize);
            this.loading = false;
        }, () => {
            this.loading = false;
        });
    }

    pageIndexChange() {
        this.getAll();
    }

    // 点击查询按钮 传过来的事件
    searchFilterTable(params) {
        this.pageIndex = params.pageIndex;
        this.filterParameter = params.params;
        this.getAll();
    }

    clickIncRow() {

    }

    // 清空全部事件
    clearAllData() {
        this.isVisible = true;
    }

    // 关闭modal弹框
    closeModal(flag) {
        this.isVisible = flag.isVisible;
        // 如果点击了确定按钮，执行确定按钮的逻辑
        if (flag.ok) {
            alert('点击了确定按钮');
        }
    }

    checkAll(value: boolean): void {
        this.tableData.forEach(data => {
            data.checked = value;
        });
        this.refreshStatus();
    }

    refreshStatus(): void {
        if (this.tableData.length < 1) {
            return;
        }
        this.selectedItems = [];
        this.tableData.forEach(value => {
            if (value.checked) {
                // this.selectedItems.push();
            }
        });
        this.allChecked = this.tableData.every(value => value.checked === true);
    }
}
