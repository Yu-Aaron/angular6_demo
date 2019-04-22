import { Component, OnInit } from '@angular/core';
import { ChartService } from 'src/app/common/service/chart.service';
import { trigger } from '@angular/animations';

@Component({
  selector: 'app-reportdetail',
  templateUrl: './reportdetail.component.html',
  styleUrls: ['./reportdetail.component.scss']
})
export class ReportdetailComponent implements OnInit {
  sourceOption = {};
  targetOption = {};
  actionOption = {};
  trendOption = {};
  flowProtocolOption = {};
  securityDomainProtocolOption = {};
  event = {
    data: [],
    total: 0,
    loading: false,
    pageIndex: 1,
    pageSize: 10,
    pages: 1
  };
  log = {
    data: [],
    total: 0,
    loading: false,
    pageIndex: 1,
    pageSize: 10,
    pages: 1
  };

  constructor(public chartService: ChartService) { }

  ngOnInit() {
    this.getSourceCharts();
    this.getFlowProtocolCharts();
    this.getSecurityDomainProtocolCharts();
    this.getEventTableData();
    this.getLogTableData();
  }

  getSourceCharts() {
    let source = {
      name: '攻击来源',
      color: '#3BA1FF',
      showLabel: true,
      labelP: 'top',
      labelC: '#fff',
      xData: ['192.100.100.100', '192.100.100.101', '192.100.100.102', '192.100.100.103', '192.100.100.104', '192.100.100.105', '192.100.100.106', '192.100.100.107', '192.100.100.108', '192.100.100.109'],
      seriesData: [1100, 800, 300, 50, 660, 900, 100, 30, 500, 1060]
    };
    this.sourceOption = this.chartService.drawHistogram(source);
  }

  getTargetCharts() {
    let target = {
      name: '攻击目标',
      color: '#FFA927',
      showLabel: true,
      labelP: 'top',
      labelC: '#fff',
      xData: ['192.100.100.100', '192.100.100.101', '192.100.100.102', '192.100.100.103', '192.100.100.104', '192.100.100.105', '192.100.100.106', '192.100.100.107', '192.100.100.108', '192.100.100.109'],
      seriesData: [100, 400, 200, 500, 660, 200, 1000, 30, 500, 60]
    };
    this.targetOption = this.chartService.drawHistogram(target);
  }

  getActionCharts() {
    this.actionOption = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      legend: {
        textStyle: {
          color: '#fff'
        },
        data: ['未知设备(192.168.40.10)', '未知设备(192.168.40.11)', '未知设备(192.168.40.12)', '未知设备(192.168.40.13)', '未知设备(192.168.40.14)', '未知设备(192.168.40.15)', '未知设备(192.168.40.16)', '未知设备(192.168.40.17)', '未知设备(192.168.40.18)', '未知设备(192.168.40.19)', '未知设备(192.168.40.20)']
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'value',
        axisLine: {
          lineStyle: {
            color: '#999'
          }
        },
      },
      yAxis: {
        type: 'category',
        axisLine: {
          lineStyle: {
            color: '#DDD'
          }
        },
        data: ['针对139端口的扫描', '域名规则', 'SMB Session Setup NTMLSSP unicode asn1 溢出尝试', 'FTP暴力破解登录尝试', '针对445端口的扫描', '木马DNS回复未分配的地址-Potentially Malicious 1.1.1.0/24']
      },
      series: [
        {
          name: '未知设备(192.168.40.10)',
          type: 'bar',
          stack: '总量',
          itemStyle: {
            color: '#24A6F0'
          },
          label: {
            normal: {
              show: true,
              position: 'insideRight'
            }
          },
          data: [130, 300, 134, 101, 102, 120]
        },
        {
          name: '未知设备(192.168.40.11)',
          type: 'bar',
          stack: '总量',
          itemStyle: {
            color: '#7D9CED'
          },
          label: {
            normal: {
              show: true,
              position: 'insideRight'
            }
          },
          data: [230, 90, 134, 101, 92, 80]
        },
        {
          name: '未知设备(192.168.40.12)',
          type: 'bar',
          stack: '总量',
          itemStyle: {
            color: '#BB96ED'
          },
          label: {
            normal: {
              show: true,
              position: 'insideRight'
            }
          },
          data: [230, 90, 134, 101, 92, 80]
        },
        {
          name: '未知设备(192.168.40.13)',
          type: 'bar',
          stack: '总量',
          itemStyle: {
            color: '#F665B7'
          },
          label: {
            normal: {
              show: true,
              position: 'insideRight'
            }
          },
          data: [230, 90, 134, 101, 102, 120]
        },
        {
          name: '未知设备(192.168.40.14)',
          type: 'bar',
          stack: '总量',
          itemStyle: {
            color: '#F9646B'
          },
          label: {
            normal: {
              show: true,
              position: 'insideRight'
            }
          },
          data: [230, 90, 134, 101, 102, 120]
        },
        {
          name: '未知设备(192.168.40.15)',
          type: 'bar',
          stack: '总量',
          itemStyle: {
            color: '#F2A571'
          },
          label: {
            normal: {
              show: true,
              position: 'insideRight'
            }
          },
          data: [230, 300, 134, 101, 102, 120]
        },
        {
          name: '未知设备(192.168.40.16)',
          type: 'bar',
          stack: '总量',
          itemStyle: {
            color: '#F2DD67'
          },
          label: {
            normal: {
              show: true,
              position: 'insideRight'
            }
          },
          data: [130, 300, 134, 101, 102, 120]
        },
        {
          name: '未知设备(192.168.40.17)',
          type: 'bar',
          stack: '总量',
          itemStyle: {
            color: '#8FDF68'
          },
          label: {
            normal: {
              show: true,
              position: 'insideRight'
            }
          },
          data: [130, 300, 134, 101, 102, 120]
        },
        {
          name: '未知设备(192.168.40.18)',
          type: 'bar',
          stack: '总量',
          itemStyle: {
            color: '#75D1BC'
          },
          label: {
            normal: {
              show: true,
              position: 'insideRight'
            }
          },
          data: [130, 300, 134, 101, 102, 120]
        },
        {
          name: '未知设备(192.168.40.19)',
          type: 'bar',
          stack: '总量',
          itemStyle: {
            color: '#5DCFE3'
          },
          label: {
            normal: {
              show: true,
              position: 'insideRight'
            }
          },
          data: [130, 300, 134, 101, 102, 120]
        },
        {
          name: '未知设备(192.168.40.20)',
          type: 'bar',
          stack: '总量',
          itemStyle: {
            color: '#858FFE'
          },
          label: {
            normal: {
              show: true,
              position: 'insideRight'
            }
          },
          data: [130, 300, 134, 101, 102, 120]
        }
      ]
    };
  }

  getTrendCharts() {
    let trend = {
      type: 'graph',
      lineColor: '#F87037',
      lineWidth: 3,
      itemColor: '#FBB38E',
      xData: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
      seriesData: [100, 200, 300, 400, 500, 600, 300, 700, 500, 100, 1000, 900, 440, 555, 900, 100, 200, 100, 1000, 500]
    };
    this.trendOption = this.chartService.drawLineChart(trend);
  }

  getFlowProtocolCharts() {
    let flow = {
      showTitle: true,
      titleText: '流量协议分布双环图',
      titleColor: '#fff',
      legendData: ['OTHER(TCP)', 'OTHER(UDP)', 'SNMP(UDP)', 'OTHER(OTHER)'],
      seriesData: [
        {
          name: 'OTHER',
          type: 'pie',
          radius: ['0%', '30%'],
          avoidLabelOverlap: false,
          label: {
            normal: {
              show: true,
              position: 'outside',
              textStyle: {
                fontSize: '16',
                fontWeight: 'bold'
              }
            },
            emphasis: {
              show: true,
              textStyle: {
                fontSize: '16',
                fontWeight: 'bold'
              }
            }
          },
          data: [
            {
              value: 10,
              name: 'TCP',
              itemStyle: {
                color: '#A3D6FD'
              },
              labelLine: {
                normal: {
                  show: true,
                  length: 10,
                  length2: 3,
                  smooth: true
                }
              }
            },
            {
              value: 20,
              name: 'UDP',
              itemStyle: {
                color: '#8E97F9'
              },
              labelLine: {
                normal: {
                  show: true,
                  length: 10,
                  length2: 3,
                  smooth: true
                }
              }
            },
            {
              value: 100,
              name: 'OTHER',
              itemStyle: {
                color: '#FA7070'
              },
              labelLine: {
                normal: {
                  show: true,
                  length: 10,
                  length2: 3,
                  smooth: true
                }
              }
            }
          ]
        },
        {
          name: 'other',
          type: 'pie',
          radius: ['40%', '55%'],
          avoidLabelOverlap: false,
          label: {
            normal: {
              show: true,
              position: 'outside',
              textStyle: {
                fontSize: '16',
                fontWeight: 'bold'
              }
            },
            emphasis: {
              show: true,
              textStyle: {
                fontSize: '16',
                fontWeight: 'bold'
              }
            }
          },
          data: [
            {
              value: 10,
              name: 'OTHER(TCP)',
              itemStyle: {
                color: '#77CDFC'
              },
              labelLine: {
                normal: {
                  show: true,
                  length: 40,
                  length2: 5,
                  smooth: true
                }
              }
            },
            {
              value: 10,
              name: 'OTHER(UDP)',
              itemStyle: {
                color: '#7D88F8'
              },
              labelLine: {
                normal: {
                  show: true,
                  length: 40,
                  length2: 5,
                  smooth: true
                }
              }
            },
            {
              value: 10,
              name: 'SNMP(UDP)',
              itemStyle: {
                color: '#FA709E'
              },
              labelLine: {
                normal: {
                  show: true,
                  length: 40,
                  length2: 5,
                  smooth: true
                }
              }
            }
          ]
        }
      ]
    };
    this.flowProtocolOption = this.chartService.drawPieChart(flow);
  }

  getSecurityDomainProtocolCharts() {
    let domain = {
      showTitle: true,
      titleText: '安全工控协议分布',
      titleColor: '#fff',
      legendData: ['Slice'],
      seriesData: [
        {
          name: 'Slice',
          type: 'pie',
          radius: ['0%', '50%'],
          avoidLabelOverlap: false,
          label: {
            normal: {
              show: true,
              position: 'outside',
              textStyle: {
                fontSize: '16',
                fontWeight: 'bold'
              }
            },
            emphasis: {
              show: true,
              textStyle: {
                fontSize: '16',
                fontWeight: 'bold'
              }
            }
          },
          data: [
            {
              value: 200,
              name: 'Slice: 3.72TB 100.0%',
              itemStyle: {
                color: '#77C2FC'
              },
              labelLine: {
                normal: {
                  show: true,
                  length: 40,
                  length2: 5,
                  smooth: true
                }
              }
            },
            {
              value: 0,
              name: '',
              itemStyle: {
                color: '#021C33'
              },
              emphasis: {
                itemStyle: {
                  color: '#021C33'
                }
              },
              labelLine: {
                normal: {
                  show: false
                },
                emphasis: {
                  show: false
                }
              }
            }
          ]
        }
      ]
    };
    this.securityDomainProtocolOption = this.chartService.drawPieChart(domain);
  }

  getEventTableData() {
    this.event.data = [
      {
        name: '【发现威胁】GPL NETBIOS SMB-DS IPC$ unicode共享',
        protocol: 'modbus',
        domain: '默认安全域',
        source: '威胁',
        sourceIp: '192.100.100.100',
        targetIp: '100.100.100.100',
        time: '2019-01-21 01:09:00'
      },
      {
        name: '【发现威胁】GPL NETBIOS SMB-DS IPC$ unicode共享',
        protocol: 'modbus',
        domain: '默认安全域',
        source: '威胁',
        sourceIp: '192.100.100.100',
        targetIp: '100.100.100.100',
        time: '2019-01-21 01:09:00'
      },
      {
        name: '【发现威胁】GPL NETBIOS SMB-DS IPC$ unicode共享',
        protocol: 'modbus',
        domain: '默认安全域',
        source: '威胁',
        sourceIp: '192.100.100.100',
        targetIp: '100.100.100.100',
        time: '2019-01-21 01:09:00'
      },
      {
        name: '【发现威胁】GPL NETBIOS SMB-DS IPC$ unicode共享',
        protocol: 'modbus',
        domain: '默认安全域',
        source: '威胁',
        sourceIp: '192.100.100.100',
        targetIp: '100.100.100.100',
        time: '2019-01-21 01:09:00'
      }
    ];
    this.event.total = this.event.data.length;
    this.event.pages = Math.ceil(this.event.total / this.event.pageSize);
  }

  getLogTableData() {
    this.log.data = [
      {
        time: '2019-02-01 00:03:00',
        sourceIp: '100.100.100.100',
        targetIp: '100.100.100.100',
        sourceMAC: '00:00:00:00:00:00',
        targetMAC: '00:00:00:00:00:00',
        sourcePort: '123',
        targetPort: '123',
        protocol: 'FTP'
      },
      {
        time: '2019-02-01 00:03:00',
        sourceIp: '100.100.100.100',
        targetIp: '100.100.100.100',
        sourceMAC: '00:00:00:00:00:00',
        targetMAC: '00:00:00:00:00:00',
        sourcePort: '123',
        targetPort: '123',
        protocol: 'FTP'
      },
      {
        time: '2019-02-01 00:03:00',
        sourceIp: '100.100.100.100',
        targetIp: '100.100.100.100',
        sourceMAC: '00:00:00:00:00:00',
        targetMAC: '00:00:00:00:00:00',
        sourcePort: '123',
        targetPort: '123',
        protocol: 'FTP'
      },
      {
        time: '2019-02-01 00:03:00',
        sourceIp: '100.100.100.100',
        targetIp: '100.100.100.100',
        sourceMAC: '00:00:00:00:00:00',
        targetMAC: '00:00:00:00:00:00',
        sourcePort: '123',
        targetPort: '123',
        protocol: 'FTP'
      },
      {
        time: '2019-02-01 00:03:00',
        sourceIp: '100.100.100.100',
        targetIp: '100.100.100.100',
        sourceMAC: '00:00:00:00:00:00',
        targetMAC: '00:00:00:00:00:00',
        sourcePort: '123',
        targetPort: '123',
        protocol: 'FTP'
      },
      {
        time: '2019-02-01 00:03:00',
        sourceIp: '100.100.100.100',
        targetIp: '100.100.100.100',
        sourceMAC: '00:00:00:00:00:00',
        targetMAC: '00:00:00:00:00:00',
        sourcePort: '123',
        targetPort: '123',
        protocol: 'FTP'
      }
    ];
    this.log.total = this.log.data.length;
    this.log.pages = Math.ceil(this.log.total / this.log.pageSize);
  }

}
