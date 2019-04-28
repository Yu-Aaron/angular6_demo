import {Component, OnInit} from '@angular/core';
import {LogService} from '../../../common/service/log.service';

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

    constructor(private logService: LogService) {
    }

    ngOnInit() {
        this.filterConditionData = {
            timeValueData: [],
            controlArray: [
                {label: '用户', type: 'input', name: 'user', placeholder: '输入用户'},
                {label: 'IP', type: 'input', name: 'user_ip', placeholder: '输入IP'},
            ]
        };
        this.getOpetateLog({});
    }

    getOpetateLog(params) {
        this.loading = true;
        const payload = {
            '$skip': (this.pageIndex - 1) * this.pageSize,
            '$limit': this.pageSize
        };
        if (!params['$orderby'] || params['$orderby'] === '') {
            payload['$orderby'] = 'timestamp desc';
        } else {
            payload['$orderby'] += ', timestamp desc';
        }
        if (this.filterParameter) {
            payload['$filter'] = this.filterParameter;
        }
        this.logService.getOpetateLog(payload).subscribe((data: any) => {
            this.tableData = data;
            this.loading = false;
        }, () => {
            this.loading = false;
        });
        this.getOpetateLogCount();
    }

    getOpetateLogCount() {
        let payload = {};
        if (this.filterParameter) {
            payload['$filter'] = this.filterParameter;
        }
        this.logService.getOpetateLogCount(payload).subscribe((data: any) => {
            this.tableCount = data;
            this.pageTotalNumber = Math.ceil(this.tableCount / this.pageSize);
        });
    }

    pageIndexChange() {
        this.getOpetateLog({});
    }

    // 点击查询按钮 传过来的事件
    searchFilterTable(params) {
        this.pageIndex = params.pageIndex;
        this.filterParameter = params.params;
        this.getOpetateLog({});
    }
}
