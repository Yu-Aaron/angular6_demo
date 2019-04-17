import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-protocolaudit',
    templateUrl: './protocolaudit.component.html',
    styleUrls: ['./protocolaudit.component.scss']
})
export class ProtocolauditComponent implements OnInit {
    filterParameter = null; // 过滤条件 参数
    filterConditionData = {}; // 过滤条件 可选项

    constructor() {
    }

    ngOnInit() {
        this.filterConditionData = {
            timeValueData: [],
            controlArray: [],
        };
    }

}
