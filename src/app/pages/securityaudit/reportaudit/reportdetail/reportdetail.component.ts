import { Component, OnInit } from '@angular/core';
import { ChartService } from 'src/app/common/service/chart.service';

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

  }

  getSecurityDomainProtocolCharts() {
    let domain = {

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
