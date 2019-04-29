import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SettingService } from '../../../common/service/setting.service';
import { FormatValService } from '../../../common/service/formatVal.service';
import { NzNotificationService } from 'ng-zorro-antd';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

var self;

@Component({
  selector: 'app-interface',
  templateUrl: './interface.component.html',
  styleUrls: ['./interface.component.scss']
})
export class InterfaceComponent implements OnInit {

  management_interface: Object[];    // 管理接口数据
  listOfData = [];   // 用户数据
  aggregateData = []; // 聚合接口
  agtotal: number;
  params: {};    // 参数
  total: number;  // 数据总条数
  pageSize = 5; // 每页展示多少条
  pages: number;   // 共多少页
  pageIndex = 1;
  loading: boolean;
  isShowEditM: Boolean = true;   // 管理接口的编辑按钮是否显示
  editManageData: {};    // 管理接口编辑的参数
  loadingData: Boolean = false;

  validateForm: FormGroup;
  isErrorIP: Boolean = true;   // ip 是否符合规则
  portIPValue: String = '';    // ip 的值
  isErrorGateway: Boolean = true; // 默认网关是否符合规则
  gatewayValue: String = '';      // 默认网关的值
  isErrorNetMask: Boolean = true;  // 掩码是否符合规则
  netmaskValue: String = '';       // 掩码的值
  tranformData: {};    // 聚合接口 model框传送的值

  isVisible = false;  // 新增聚合接口model是否显示

  constructor(
    private setUrl: SettingService,
    private fb: FormBuilder,
    private formatVal: FormatValService,
    private notification: NzNotificationService,
    private router: Router
  ) {
    self = this;
  }

  ngOnInit() {
    self.validateForm = self.fb.group({
      portIp: [ null, [self.validateIP, Validators.required]],
      gateway: [ null, [self.validateGateway, Validators.required] ],
      netMask: [ null, [self.validateNetMask, Validators.required] ]
    });
    self.getManagementData();
    self.getBusinessData();
    self.getAggregateData();
  }
  // 获取管理口接口
  getManagementData() {
    self.setUrl.getManagementData().subscribe(data => {
      const busData = data['data'][0];
      busData['linkState'] = self.transformState(busData['linkState']);
      self.management_interface = busData;
      self.editManageData = {...self.management_interface};
    });
  }
  transformState(state) {
    switch (state) {
      case 0:
        return '未连接';
      case 1:
        return '已连接';
      case -1:
        return '关闭';
    }
  }
  // 点击编辑管理接口
  editManageInterface() {
    self.isShowEditM = false;
  }

  cancelManageInterface() {
    self.isShowEditM = true;
    self.editManageData = {...self.management_interface};
    self.isErrorIP = true;
    self.isErrorGateway = true;
    self.isErrorNetMask = true;
  }
// 保存
  saveManageInterface() {
    self.loadingData = true;
    let ip_num = self.ipv4_to_num(self.editManageData.portIp);
    let subnet = ((self.ipv4_to_num(self.editManageData.portIp)) & (self.ipv4_to_num(self.editManageData.netMask))) >>> 0;
    let broadcast = (subnet | (~self.ipv4_to_num(self.netmaskValue))) >>> 0;
    self.isErrorIP = subnet < ip_num && ip_num < broadcast;
    if (self.isErrorIP && self.isErrorGateway && self.isErrorNetMask) {
      let obj = {
        mwIp: self.editManageData.portIp,
        netMask: self.editManageData.netMask,
        gateWay: self.editManageData.gateway
      };
      self.setUrl.setManagementPort(obj).subscribe(data => {
        self.notification.create('success', '系统会在十秒后自动网址重定向。请稍等。。。', '');
        setTimeout(function() {
          self.router.navigate(['/login']);
          self.isShowEditM = true;
        }, 10000);
      }, error => {
        self.notification.create('error', '网络端口配置失败', '');
      });
    } else {
      self.notification.create('error', '请确认IP地址与网关在同一有效网段！', '');
    }
  }
  // ip 格式验证
  validateIP() {
    const validateFormData = self.validateForm ? self.validateForm.controls.portIp : '';
    if (self.validateForm && self.validateForm.get('portIp').dirty && validateFormData) {
      self.portIPValue = self.validateForm.controls.portIp.value;
      self.isErrorIP = self.portIPValue && !self.formatVal.validateIp(self.portIPValue);
      self.validateGatewayCommon();
    }
  }
  // 默认网关验证
  validateGateway() {
    const validateFormData = self.validateForm ? self.validateForm.controls.gateway : '';
    if (self.validateForm && self.validateForm.get('gateway').dirty && validateFormData) {
      self.validateGatewayCommon();
    }
  }
  validateGatewayCommon() {
    self.gatewayValue = self.validateForm.controls.gateway.value;
    self.portIPValue = self.validateForm.controls.portIp.value;
    self.netmaskValue = self.validateForm.controls.netMask.value;
    if ( self.isErrorIP && self.isErrorNetMask && !self.formatVal.validateIp(self.gatewayValue)) {
      let ip_num = self.ipv4_to_num(self.gatewayValue);
      let subnet = ((self.ipv4_to_num(self.portIPValue)) & (self.ipv4_to_num(self.netmaskValue))) >>> 0;
      let broadcast = (subnet | (~self.ipv4_to_num(self.netmaskValue))) >>> 0;
      self.isErrorGateway = subnet < ip_num && ip_num < broadcast;
    } else {
      self.isErrorGateway = false;
    }
  }
  ipv4_to_num(value) {
    let arr = value.split('.');
    return ((Number.parseInt(arr[0], 10) << 24 ) | (Number.parseInt(arr[1], 10) << 16) | (Number.parseInt(arr[2], 10) << 8) | (Number.parseInt(arr[3], 10) << 0)) >>> 0;
  }

  // 默认掩码验证
  validateNetMask() {
    const validateFormData = self.validateForm ? self.validateForm.controls.netMask : '';
    if (self.validateForm && self.validateForm.get('netMask').dirty && validateFormData) {
      self.netmaskValue = self.validateForm.controls.netMask.value;
      self.isErrorNetMask = self.netmaskValue && self.netmaskValue.match(self.formatVal.getIPReg()) && !self.formatVal.validateNetMask(self.netmaskValue);
      self.validateGatewayCommon();
    }
  }

  // 获取业务接口数据
  getBusinessData() {
    let params = {};
    self.setUrl.getBusinessData(params).subscribe(data => {
      self.loading = false;
      self.listOfData = data['data'];
      self.total = data['count'];
      self.pages = Math.ceil(self.total / self.pageSize);
    }, error => {
      self.loading = true;
    });
  }
  // 清除
  clearData(id) {
    self.setUrl.clearPackets(id).subscribe(data => {
      if (data['flag']) {
        self.getBusinessData();
      } else {
        self.notification.create('error', data['error'], '');
      }
    });
  }
  // 获取聚合接口
  getAggregateData() {
    let params = {};
    self.setUrl.getDeviceBondData(params).subscribe(data => {
      self.loading = false;
      // self.aggregateData = data['data'];
      self.agtotal = data['count'];
      self.agpages = Math.ceil(self.agtotal / self.pageSize);
    }, error => {
      self.loading = true;
    });
  }
  // 新增聚合接口
  addAgregate(title, name) {
    self.modelTitle = title + '聚合接口';
    self.tranformData = {
      isShowName: name ? true : false,
      nameValue: name
    };
    if (name) {
      self.isVisible = true;
      // self.setUrl.getEditSecurearea(name).subscribe(data => {
      //   if (!data['flag']) {

      //   } else {
      //     self.isVisible = true;
      //   }
      // });
    } else {
      self.isVisible = true;
    }
  }
  // 聚合接口删除
  deleteData(dataValue) {
    self.setUrl.getDeleteSecurearea(dataValue.portName).subscribe(data => {
      if (data.flag) {
        self.setUrl.deleteBondItem(dataValue.portName, dataValue.portId).subscribe(value => {
          if (value.flag) {
            self.getAggregateData();
          } else {
            self.notification.create('error', value.msg , '');
          }
        });
      } else {
        // 逻辑
      }
    });
  }

  closeModal(event) {
    self.isVisible = event.isVisible;
    if (event.refresh) {
      // this.getUserTableData();
    }
  }
}
