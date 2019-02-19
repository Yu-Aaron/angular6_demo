import { filter } from 'rxjs/operator/filter';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from './../../../../common/services/common.service';
import { SecurityService } from './../../../../common/services/security.service';

var self;
@Component({
  selector: 'app-secincident-details',
  templateUrl: './secincident-details.component.html',
  styleUrls: ['./secincident-details.component.scss']
})
export class SecincidentDetailsComponent implements OnInit {

  private eventId: number;
  detail = {
    incident : {
      packet: {}
    },
    nodes : [],
    nodesChild: []
  };

  nodes = ['source', 'dpi', 'destination'];
  loading = true;
  params = {};
  pageIndex = 1;
  pageTotalNumber: number;
  pageSize = 10;
  tableTotalData = 1;
  tabIndex = 0;
  detailsDataSet;

  constructor(
    private routeInfo: ActivatedRoute,
    private commonService: CommonService,
    private securityService: SecurityService,
    private route: Router
  ) {
    self = this;
    this.eventId = this.routeInfo.snapshot.params['eventId'];
    self.params = {
      $limit: 10,
      $orderby: "timestamp desc, incidentId desc",
      $skip: 0
    };
  }

  ngOnInit() {
    self.tabIndex = 0;
    self.getDetailsData();
  }

  tabIndexChange(index) {
    if (index === 2) {
      self.getAssociatedEvent();
    }
  }

  // 关联事件数据获取
  getAssociatedEvent() {
    this.loading = true;
    var filter = "(sourceIp eq '" + self.detail.incident.sourceIp + "' or sourceMac eq '" + self.detail.incident.sourceMac +
                //+ "' and dpiIp eq '" + scope.detail.incident.dpiIp
                "') and appLayerProtocol eq '" + self.detail.incident.appLayerProtocol +
                "' and (destinationIp eq '" + self.detail.incident.destinationIp + "' or destinationMac eq '" + self.detail.incident.destinationMac +
                "') and incidentId ne '" + self.eventId + "'";
    self.params.$skip = (this.pageIndex - 1) * self.pageSize;
    self.params.$filter = filter;
    this.securityService.getSecurityTableData(self.params).subscribe((data: any) => {
      self.detailsDataSet = data;
      self.getSecurityTableTotalData();
    }, error => {
      this.loading = false;
    })
  }
  // 获取表格总条数
  getSecurityTableTotalData() {
    this.securityService.getFilterData(self.params).subscribe((data: any) => {
      this.tableTotalData = data;
      this.loading = false;
      self.pageTotalNumber = Math.ceil(self.tableTotalData / self.pageSize);
      console.log(data);
    })
  }

  // 页数变化时
  pageIndexChange() {
    self.loading = true;
    self.params.$skip = (self.pageIndex - 1) * self.pageSize;
    self.securityService.getSecurityTableData(self.params).subscribe((data: any) => {
      self.loading = false;
      self.detailsDataSet = data;
    }, error => {
      self.loading = false;
    })
  }

  // 排序
  sort(sort: {key: string, value: string}): void {
    console.log(sort.value);
    self.sortName = sort.key;
    self.sortValue = sort.value === 'descend' ? 'desc' : '';
    if (self.sortValue) {
      self.params.$orderby = self.sortName + ' ' + self.sortValue;
    } else {
      self.params.$orderby = self.sortName
    }
    self.getAssociatedEvent();
  }

  // 关联事件点击查看
  tabChangeRefresh(incidentId) {
    this.route.navigate(['/pages/security/secincident/' + incidentId]);
    self.eventId = incidentId;
    self.ngOnInit();
  }

  getDetailsData () {
    self.commonService.sysbaseinfo().subscribe((data: any) => {
      var now = new Date(data);
      var startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      self.detail['startOfDay'] = startOfDay;
      self.securityService.getId(self.eventId).subscribe((data: any) => {
        var inc = self.detail.incident = data;
        if (self.detail.incident && self.detail.incident.packet) {
          self.detail.incident.packet.hb_sliced = self.detail.incident.packet.hb && Array.isArray(self.detail.incident.packet.hb) ? self.detail.incident.packet.hb.slice(0, 57) : [];
        }
        var sss = {
          name: '未知',
          iconType: 'unknown-device'
        };
        Promise.all(
          [
            new Promise(function(resolve, reject){
              self.securityService.getDeviceByIpOrMac(inc.sourceIp, inc.sourceMac).subscribe((data: any) => {
                resolve(data);
              }, function(error) {
                resolve(sss);
              })
            }),
            new Promise(function(resolve, reject){
              self.securityService.getDeviceBySerialNumber('', inc.boxId).subscribe((data: any) => {
                resolve(data);
              }, function(error) {
                resolve(sss);
              })
            }),
            new Promise(function(resolve, reject){
              self.securityService.getDeviceByIpOrMac(inc.destinationIp, inc.destinationMac).subscribe((data: any) => {
                resolve(data);
              }, function(error) {
                resolve(sss);
              })
            })
          ]
        ).then(function(data) {
          self.detail.nodes = [];
          data[0]['_iconName'] = self.securityService.getIconName(data[0]['iconType'], data[0]['_model_name']);
          self.detail.nodes[0] = data[0];
          data[1]['_iconName'] = self.securityService.getIconName(data[1]['iconType'], data[1]['_model_name']);
          self.detail.nodes[1] = data[1];
          self.detail.nodesChild = data[1]['devicePorts'];
          data[2]['_iconName'] = self.securityService.getIconName(data[2]['iconType'], data[2]['_model_name']);
          self.detail.nodes[2] = data[2];
          console.log(self.detail.incident.level);
        })
      })
    })
  }

}
