import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-learning',
  templateUrl: './learning.component.html',
  styleUrls: ['./learning.component.scss']
})
export class LearningComponent implements OnInit {
    tableData = [];  // 表格数据
    pageIndex = 1;
    pageSize = 10;
    pageTotalNumber = 0;
    tableCount = 0;
    loading: boolean;

    constructor() { }

    ngOnInit() {
        this.getAll();

    }
    getAll() {
        this.tableData = [{
            taskName: '2019/02/15 10:10:10',
            studyLength: 5,
            kownDevices: 88,
            unkownDevices: 8,
            macData: 8,
            validFlowdataCount: 237,
            securityAreaName: 'UXtest',
            learningprogress: 0,
            state: '已完成'
        }, {
            taskName: '2019/02/15 10:10:10',
            studyLength: 5,
            kownDevices: 88,
            unkownDevices: 8,
            macData: 8,
            validFlowdataCount: 237,
            securityAreaName: 'UXtest',
            learningprogress: 0,
            state: '已停止'
        }];
        this.pageTotalNumber = Math.ceil(this.tableCount / this.pageSize);
    }

}
