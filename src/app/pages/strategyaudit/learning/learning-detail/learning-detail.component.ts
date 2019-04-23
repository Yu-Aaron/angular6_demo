import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
    selector: 'app-learning-detail',
    templateUrl: './learning-detail.component.html',
    styleUrls: ['./learning-detail.component.scss']
})
export class LearningDetailComponent implements OnInit {
    tableData = [];  // 表格数据
    pageIndex = 1;
    pageSize = 10;
    pageTotalNumber = 0;
    tableCount = 0;
    loading: boolean;

    @Input() learningDetail;
    @Output() openDeviceModal = new EventEmitter;
    enableSecurityArea = [];

    constructor() {
    }

    ngOnInit() {
        this.enableSecurityArea = this.learningDetail['enableSecurityArea'];
    }

    showDeviceModal(type) {
        this.openDeviceModal.emit(type);
    }

}
