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
    treeOptions: {};  // 树形图参数

    constructor() {
    }

    ngOnInit() {
        this.filterConditionData = {
            timeValueData: [],
            controlArray: [
                {label: '源IP', type: 'input', name: 'sourceIp'},
                {label: '目标IP', type: 'input', name: 'targetIp'},
                {label: '应用名称', type: 'input', name: 'serviceApp'},
            ]
        };
        this.getTimeBarData();  // 获取初始数据
    }

    getTimeBarData() {
        // 柱状图
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
        // 树形图
        this.treeOptions = {
            title : {
                text: '协议审计树形统计图',
                textStyle: {
                    color: '#46C0FF'
                }
            },
            series : [
                {
                    name: '树图',
                    type: 'tree',
                    orient: 'vertical',  // vertical horizontal
                    rootLocation: {x: 'center', y: 30}, // 根节点位置  {x: 'center',y: 10}
                    nodePadding: 5,
                    symbol: 'rect',
                    symbolSize: [120, 25],
                    layerPadding: 20,
                    layout: 'orthogonal',
                    initialTreeDepth: 4,
                    left: '30%',
                    top: '20%',
                    right: '50%',
                    height: 200,
                    expandAndCollapse: false,
                    itemStyle: {
                        normal: {
                            label: {
                                show: true,
                                position: 'inside',
                                textStyle: {
                                    color: '#fff',
                                    fontSize: 12,
                                },
                                lineHeight: 10
                            },
                            lineStyle: {
                                color: '#CEF0FE',
                                width: 1,
                                type: 'solid',
                                height: 10,
                                curveness: 0
                            }
                        },
                        emphasis: {
                            label: {
                                show: true,
                            }
                        },
                    },
                    data: [
                        {
                            name: 'SNMP',
                            value: 6,
                            itemStyle: {
                                borderColor: 'none',
                                color: '#71A7FC',
                            },
                            children: [
                                {
                                    name: 'TCP',
                                    symbolSize: [50, 20],
                                    itemStyle: {
                                        // borderColor: '#CEF0FE',
                                        color: '#194E87',
                                        // borderType: 'solid',
                                        borderColor: 'none',
                                        normal: {
                                            label: {
                                                show: true,
                                                position: 'inside',
                                                textStyle: {
                                                    // color: '#CEF0FE',
                                                    fontSize: 10,
                                                }
                                            }
                                        }
                                    },
                                    lineStyle: {
                                        color: '#CEF0FE',
                                        width: 1,
                                        type: 'solid',
                                        height: 10,
                                        curveness: 0
                                    },
                                    children: [
                                        {
                                            name: '',
                                            symbolSize: 0,
                                            children: [
                                                {
                                                    name: '0 Byte',
                                                    symbolSize: [50, 20],
                                                    itemStyle: {
                                                        // borderColor: '#CEF0FE',
                                                        color: '#194E87',
                                                        // borderType: 'solid',
                                                        borderColor: 'none',
                                                        normal: {
                                                            label: {
                                                                show: true,
                                                                position: 'inside',
                                                                textStyle: {
                                                                    // color: '#CEF0FE',
                                                                    fontSize: 10,
                                                                }
                                                            }
                                                        }
                                                    },
                                                    children: [
                                                        {
                                                            name: '0',
                                                            symbolSize: [50, 20],
                                                            itemStyle: {
                                                                // borderColor: '#CEF0FE',
                                                                color: '#194E87',
                                                                // borderType: 'solid',
                                                                borderColor: 'none',
                                                                normal: {
                                                                    label: {
                                                                        show: true,
                                                                        position: 'inside',
                                                                        textStyle: {
                                                                            // color: '#CEF0FE',
                                                                            fontSize: 10,
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    name: 'UDP',
                                    symbolSize: [50, 20],
                                    itemStyle: {
                                        // borderColor: '#CEF0FE',
                                        color: '#194E87',
                                        // borderType: 'solid',
                                        borderColor: 'none',
                                        normal: {
                                            label: {
                                                show: true,
                                                position: 'inside',
                                                textStyle: {
                                                    // color: '#CEF0FE',
                                                    fontSize: 10,
                                                }
                                            }
                                        }
                                    },
                                }
                            ]
                        }
                    ]
                },
                {
                    name: '树图1',
                    type: 'tree',
                    orient: 'vertical',  // vertical horizontal
                    rootLocation: {x: 'center', y: 30}, // 根节点位置  {x: 'center',y: 10}
                    nodePadding: 5,
                    symbol: 'rect',
                    symbolSize: [120, 25],
                    layerPadding: 20,
                    layout: 'orthogonal',
                    initialTreeDepth: 3,
                    top: '20%',
                    left: '50%',
                    height: 200,
                    right: '30%',
                    expandAndCollapse: false,
                    itemStyle: {
                        normal: {
                            label: {
                                show: true,
                                position: 'inside',
                                textStyle: {
                                    color: '#fff',
                                    fontSize: 12,
                                },
                                lineHeight: 10
                            },
                            lineStyle: {
                                color: '#CEF0FE',
                                width: 1,
                                type: 'solid',
                                height: 10,
                                curveness: 0
                            }
                        },
                        emphasis: {
                            label: {
                                show: true,
                            }
                        },
                    },
                    data: [
                        {
                            name: 'DNS',
                            value: 6,
                            itemStyle: {
                                borderColor: 'none',
                                color: '#71A7FC',
                            },
                            children: [
                                {
                                    name: 'TCP',
                                    symbolSize: [50, 20],
                                    itemStyle: {
                                        // borderColor: '#CEF0FE',
                                        color: '#194E87',
                                        // borderType: 'solid',
                                        borderColor: 'none',
                                        normal: {
                                            label: {
                                                show: true,
                                                position: 'inside',
                                                textStyle: {
                                                    // color: '#CEF0FE',
                                                    fontSize: 10,
                                                }
                                            }
                                        }
                                    },
                                    lineStyle: {
                                        color: '#CEF0FE',
                                        width: 1,
                                        type: 'solid',
                                        height: 10,
                                        curveness: 0
                                    },
                                    children: [
                                        {
                                            name: '',
                                            symbolSize: 0,
                                            children: [
                                                {
                                                    name: '0 Byte',
                                                    symbolSize: [50, 20],
                                                    itemStyle: {
                                                        // borderColor: '#CEF0FE',
                                                        color: '#194E87',
                                                        // borderType: 'solid',
                                                        borderColor: 'none',
                                                        normal: {
                                                            label: {
                                                                show: true,
                                                                position: 'inside',
                                                                textStyle: {
                                                                    // color: '#CEF0FE',
                                                                    fontSize: 10,
                                                                }
                                                            }
                                                        }
                                                    },
                                                    children: [
                                                        {
                                                            name: '0',
                                                            symbolSize: [50, 20],
                                                            itemStyle: {
                                                                // borderColor: '#CEF0FE',
                                                                color: '#194E87',
                                                                // borderType: 'solid',
                                                                borderColor: 'none',
                                                                normal: {
                                                                    label: {
                                                                        show: true,
                                                                        position: 'inside',
                                                                        textStyle: {
                                                                            // color: '#CEF0FE',
                                                                            fontSize: 10,
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    name: 'UDP',
                                    symbolSize: [50, 20],
                                    itemStyle: {
                                        // borderColor: '#CEF0FE',
                                        color: '#194E87',
                                        // borderType: 'solid',
                                        borderColor: 'none',
                                        normal: {
                                            label: {
                                                show: true,
                                                position: 'inside',
                                                textStyle: {
                                                    // color: '#CEF0FE',
                                                    fontSize: 10,
                                                }
                                            }
                                        }
                                    },
                                }
                            ]
                        }
                    ]
                }
            ]
        };
    }
}
