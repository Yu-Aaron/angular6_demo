import { Component, OnInit } from '@angular/core';
import { SettingService } from '../../../common/service/setting.service';


@Component({
  selector: 'app-interface',
  templateUrl: './interface.component.html',
  styleUrls: ['./interface.component.scss']
})
export class InterfaceComponent implements OnInit {

  management_interface: Object[];    // 管理接口数据
  listOfData = [];   // 用户数据
  params: {};    // 参数
  total: number;  // 数据总条数
  pageSize = 10; // 每页展示多少条
  pages: number;   // 共多少页
  pageIndex = 1;
  loading: boolean;

  constructor(
    private setUrl: SettingService,
  ) {
    this.management_interface = [
      {label: '接口名称', value: ''},
      {label: '链接状态', value: ''},
      {label: 'IP', value: ''},
      {label: '网关', value: ''},
      {label: '掩码', value: '', wrap: true},
      {label: '发送报文数', value: ''},
      {label: '发送丢包数', value: ''},
      {label: '发送错包数', value: ''},
      {label: '接收报文数', value: ''},
      {label: '接收丢包数', value: ''},
      {label: '接收错包数', value: ''}
    ];
  }

  ngOnInit() {
    this.getManagementData();
    // mock data
    // this.listOfData = [{
    //   portName: '1',
    //   linkState: '连接',
    //   txTotalTmp: '0',
    //   txDroppedTmp: '0',
    //   txErrosTmp: '0',
    //   rxTotalTmp: '0',
    //   rxDroppedTmp: '0',
    //   rxErrosTmp: '0'
    // }];
  }
  // 获取管理口接口
  getManagementData() {
    this.setUrl.getBusinessData().subscribe(data => {
      const busData = data['data'][0];
      busData['linkState'] = this.transformState(busData['linkState']);
      this.management_interface = [
        {label: '接口名称', value: busData.portName},
        {label: '链接状态', value: busData['linkState']},
        {label: 'IP', value: busData.portName},
        {label: '网关', value: busData.gateway},
        {label: '掩码', value: busData.netMask, wrap: true},
        {label: '发送报文数', value: busData.txTotalTmp},
        {label: '发送丢包数', value: busData.txDroppedTmp},
        {label: '发送错包数', value: busData.txErrosTmp},
        {label: '接收报文数', value: busData.rxTotalTmp},
        {label: '接收丢包数', value: busData.rxDroppedTmp},
        {label: '接收错包数', value: busData.rxErrosTmp}
      ];
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
  // 获取业务接口数据
  getBusinessData() {
    this.setUrl.getBusinessData().subscribe(data => {
      this.loading = false;
      // this.listOfData = data['data'][0];
      this.total = data['count'];
      this.pages = Math.ceil(this.total / this.pageSize);
    }, error => {
      this.loading = true;
    });
  }

}
