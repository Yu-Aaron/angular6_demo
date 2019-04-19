import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-operatelog',
    templateUrl: './operatelog.component.html',
    styleUrls: ['./operatelog.component.scss']
})
export class OperatelogComponent implements OnInit {
    tableData = [];  // 表格数据
    filterParameter = null; // 过滤条件 参数
    filterConditionData = {}; // 过滤条件 可选项
    pageIndex = 1;
    pageSize = 10;
    pageTotalNumber = 0;
    tableCount = 0;
    loading: boolean;

    constructor() {
    }

    ngOnInit() {
        this.filterConditionData = {
            timeValueData: [],
            controlArray: [
                {label: '源IP', type: 'input', name: 'sourceIp'},
                {label: '目标IP', type: 'input', name: 'targetIp'},
                {label: '应用名称', type: 'input', name: 'serviceApp'},
            ]
        };
        this.getAll();

    }

    getAll() {
        this.tableData = [{
            user: 'zkwuan',
            ip: '1.1.1.1',
            date: '2019-01-12',
            record: '标记事件为已读',
            result: '成功',
        }, {
            user: 'zkwuan',
            ip: '1.1.1.1',
            date: '2019-01-12',
            record: '标记事件为已读',
            result: '失败',
        }];
        this.pageTotalNumber = Math.ceil(this.tableCount / this.pageSize);
    }
}
