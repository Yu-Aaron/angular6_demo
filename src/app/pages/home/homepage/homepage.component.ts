import {AfterViewInit, Component, OnInit} from '@angular/core';
import {CommonService} from '../../../common/service/common.service';
import {HomeService} from '../../../common/service/home.service';

@Component({
    selector: 'app-homepage',
    templateUrl: './homepage.component.html',
    styleUrls: ['./homepage.component.scss']
})

export class HomepageComponent implements OnInit, AfterViewInit {
    performanceData = {
        ems: 0,
        temp: 0,
        disc: 0,
        engine: 0,
        cpu: 0
    };
    drawOptions = [
        {text: 'CPU占用率', id: '#circle1', percent: 60, frontColor: '#D6CB00'},
        {text: '内存占用率', id: '#circle2', percent: 20, frontColor: '#54D174'},
        {text: '磁盘占用率', id: '#circle3', percent: 0, frontColor: '#D31C29'},
    ];

    constructor(private homeService: HomeService, private commonService: CommonService) {
    }

    ngOnInit() {
        this.getProgressData();

    }

    ngAfterViewInit(): void {
        this.drawOptions.forEach((item) => {
            this.commonService.drawProgress(item);
        });
        this.commonService.drawTemp(90, '#000000', 7, true);  // 温度背景色
        this.commonService.drawTemp(10, '#50D076', 7, false); // 温度进度条
    }

    // 设备概况
    getProgressData() {
        this.homeService.getProgress().subscribe((data: any) => {
            if (data) {
                this.performanceData.ems = this.drawOptions[1]['value'] = data.memoryUsage; // 内存占用率
                this.performanceData.temp = data.temperature; // 设备核心温度
                this.performanceData['currentTime'] = data.updatedAt;
                for (let i = 0; i < data.partitionUsage.length; i++) {
                    if (data.partitionUsage[i].partitionName === '/data') {
                        this.performanceData.disc = this.drawOptions[2]['value'] = data.partitionUsage[i].usage;  // 磁盘占用率
                        break;
                    }
                }
                for (let i = 0; i < data.cpuUsage.length; i++) {
                    if (data.cpuUsage[i].processName === 'avg') {
                        this.performanceData.cpu -= this.drawOptions[0]['value'] = data.cpuUsage[i].usage; // CPU占用率
                    } else if (data.cpuUsage[i].processName === 'dpi') {
                        this.performanceData.engine = data.cpuUsage[i].usage;
                    }
                }
                this.drawOptions.forEach((item) => {
                    this.commonService.drawProgress(item);
                });
                this.commonService.drawTemp(this.performanceData.temp, '#50D076', 7, false);
            }
            setTimeout(() => {
                this.getProgressData();
            }, 6000);
        });
    }

}
