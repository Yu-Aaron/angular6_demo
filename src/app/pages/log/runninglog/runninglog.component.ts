import {Component, OnInit} from '@angular/core';
import {LogService} from '../../../common/service/log.service';

@Component({
    selector: 'app-runninglog',
    templateUrl: './runninglog.component.html',
    styleUrls: ['./runninglog.component.scss']
})

export class RunninglogComponent implements OnInit {
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
                {label: '事件等级', type: 'select', name: 'level', selectValueData: [{value: -1, label: '信息和警告'}, {value: 'WARN', label: '警告'}, {value: 'INFO', label: '信息'}]},
                {label: '内容', type: 'input', name: 'content'},
            ]
        };
        this.getRunningLog();
    }

    getRunningLog() {
        this.loading = true;
        const payload = {
            '$skip': (this.pageIndex - 1) * this.pageSize,
            '$limit': this.pageSize
        };
        if (this.filterParameter) {
            payload['$filter'] = this.filterParameter;
        }
        this.logService.getRunningLog(payload).subscribe((data: any) => {
            this.tableData = data;
            this.loading = false;
        }, () => {
            this.loading = false;
        });
        this.getRunningLogCount();
    }

    getRunningLogCount() {
        const payload = {};
        if (this.filterParameter) {
            payload['$filter'] = this.filterParameter;
        }
        this.logService.getRunningLogCount(payload).subscribe((data: any) => {
            this.tableCount = data;
            this.pageTotalNumber = Math.ceil(this.tableCount / this.pageSize);
        });
    }

    pageIndexChange() {
        this.getRunningLog();
    }

    // 点击查询按钮 传过来的事件
    searchFilterTable(params) {
        this.pageIndex = params.pageIndex;
        this.filterParameter = params.params;
        this.getRunningLog();
    }

}
