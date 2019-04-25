import {Component, OnInit} from '@angular/core';
import {ChartService} from '../../../../common/service/chart.service';

@Component({
    selector: 'app-flow-detail',
    templateUrl: './flow-detail.component.html',
    styleUrls: ['./flow-detail.component.scss']
})
export class FlowDetailComponent implements OnInit {
    timeRange = [
        {label: '最近1小时', value: '1h'},
        {label: '最近24小时', value: '24h'},
        {label: '最近一周内', value: '168h'}
    ];
    icdevicedetail = {};
    flowOption = {};

    constructor(private chartService: ChartService) {
    }

    ngOnInit() {
        this.icdevicedetail['timeSpan'] = '1h';
        const data = [
            {name: '', value: [10, 13, 41, 20, 30, 20, 12], color: '#1A9BFC'},
        ];
        this.flowOption = this.chartService.drawFlowChart(data);
    }

}
