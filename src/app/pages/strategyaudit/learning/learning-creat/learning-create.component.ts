import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
    selector: 'app-learning-creat',
    templateUrl: './learning-creat.component.html',
    styleUrls: ['./learning-creat.component.scss']
})
export class LearningCreateComponent implements OnInit {
    // 新建学习任务
    learningNew = {
        timestring: {
            days: 0,
            hour: 0,
            minute: 0,
        },
        enableSecurityArea: [],
        timerange: null,
        securityAreaId: 0,
    };
    // 安全域
    enableSecurityArea = [
        {name: 'UXtest1', securityAreaId: 0},
        {name: 'UXtest2', securityAreaId: 1},
        {name: 'UXtest3', securityAreaId: 2},
    ];
    @Output() learningDetail = new EventEmitter();

    constructor() {
    }

    ngOnInit() {
        this.learningNew.enableSecurityArea = this.enableSecurityArea;
        this.learningNew.securityAreaId = this.enableSecurityArea[0]['securityAreaId'];
    }

    startLearning() {
        this.learningDetail.emit(this.learningNew);
        console.log(this.learningNew);
    }

}
