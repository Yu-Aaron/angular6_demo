import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-protocolaudit',
    templateUrl: './protocolaudit.component.html',
    styleUrls: ['./protocolaudit.component.scss']
})
export class ProtocolauditComponent implements OnInit {
    filterParameter = null; // 过滤条件 参数
    filterConditionData = {}; // 过滤条件 可选项

    barOptions: {};   // 柱状图配置参数

    constructor() {
    }

    ngOnInit() {
        this.filterConditionData = {
            timeValueData: [],
            controlArray: [],
        };
        this.getTimeBarData();  // 获取初始数据
    }

    getTimeBarData() {
        this.barOptions = {
            title : {
                text: '时间协议分布柱状图',
                textStyle: {
                    color: '#46C0FF'
                }
            },
            tooltip : {
                // trigger: 'axis',
            },
            legend: {
                textStyle: {
                    color: '#fff'
                },
                bottom: 0,
                data: ['TCP', 'UDP']
            },
            textStyle: {
                color: '#fff'
            },
            toolbox: {
            },
            xAxis : [
                {
                    type : 'category',
                    data : ['TCP', 'UDP', 'IP/MAC', '域名规则', 'OTHER']
                }
            ],
            yAxis : [
                {
                    type : 'value',
                    name: '各协议命中的事件数',
                    nameLocation: 'center',
                    nameTextStyle: {
                          verticalAlign: 'middle'
                    },
                    nameGap: 50,
                    splitLine: {
                        show: true,
                        lineStyle: {
                             color: ['#272727'],
                             width: 1
                        }
                    }
                }
            ],
            series : [
                {
                    name: 'TCP',
                    type: 'bar',
                    stack: '总量',
                    data: [2.0, '-', '-', '-', '-'],
                    itemStyle: {
                        normal: {
                            color: '#F97070',
                            label : {show: true, position: 'top'}
                        }
                    },
                    barWidth: 50,
                },
                {
                    name: 'UDP',
                    type: 'bar',
                    stack: '总量',
                    data: ['-', 4.9, '-', '-', '-'],
                    itemStyle: {
                        normal: {
                            color: '#7E89F8',
                            label : {show: true, position: 'top'}
                        }
                    },
                    barWidth: 50,
                }
            ]
        };
    }

}
