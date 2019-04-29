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
    filterConditionData = {
        timeValueData: [],
        controlArray: [
            {label: '用户', type: 'input', name: 'user', placeholder: '输入用户'},
            {label: 'IP', type: 'input', name: 'user_ip', placeholder: '输入IP'},
        ]
    }; // 过滤条件 可选项
    pageIndex = 1;
    pageSize = 10;
    pageTotalNumber = 0;
    tableCount = 0;
    loading: boolean;
    payload = {};  // 过滤参数拼接
    outPutModal = {
        isVisible: false,
        type: 'operationlogs'
    };  // 导出模态框

    constructor(private logService: LogService) {
    }

    ngOnInit() {
        this.getOpetateLog({});
    }

    getOpetateLog(params) {
        this.loading = true;
        this.payload = {
            '$skip': (this.pageIndex - 1) * this.pageSize,
            '$limit': this.pageSize
        };
        if (!params['$orderby'] || params['$orderby'] === '') {
            this.payload['$orderby'] = 'timestamp desc';
        } else {
            this.payload['$orderby'] += ', timestamp desc';
        }
        if (this.filterParameter) {
            this.payload['$filter'] = this.filterParameter;
        }
        this.logService.getOpetateLog(this.payload).subscribe((data: any) => {
            this.tableData = data;
            this.loading = false;
        }, () => {
            this.loading = false;
        });
        this.getOpetateLogCount();
    }

    getOpetateLogCount() {
        const params = this.payload['filter'] || {};
        this.logService.getOpetateLogCount(params).subscribe((data: any) => {
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
