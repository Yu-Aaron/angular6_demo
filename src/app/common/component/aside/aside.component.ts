import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.scss']
})
export class AsideComponent implements OnInit {
  username = 'Admin';
  showGuide = false;
  auditProcess = [
    [
      {
        name: '接口配置',
        state: 'setting/interface'
      },
      {
        name: '集中管理配置',
        state: 'setting/basic'
      },
      {
        name: '添加<span style="color: #FF9933;">已知IP</span>工控设备',
        state: 'asset/factorydevice'
      },
      {
        name: '添加<span style="color: #FF9933;">未知IP</span>工控设备',
        state: 'asset/factorydevice'
      },
      {
        name: '智能学习',
        state: 'strategyaudit/learning'
      },
      {
        name: '新建策略',
        state: 'strategyaudit/strategy'
      },
      {
        name: '新建安全域',
        state: 'strategyaudit/securitydomain'
      },
      {
        name: '审计报表',
        state: 'securityaudit/reportaudit'
      }
    ],
    [{ name: '抓包', state: '/setting/debug' }]
  ];
  shortcutList = [
    {
      name: '智能学习',
      iconType: '',
      state: 'strategyaudit/learning'
    },
    {
      name: '审计报表',
      iconType: '',
      state: 'securityaudit/reportaudit'
    },
    {
      name: '抓包',
      iconType: '',
      state: 'setting/debug'
    },
    {
      name: '策略',
      iconType: '',
      state: 'strategyaudit/strategy'
    },
    {
      name: '工控设备',
      iconType: '',
      state: 'asset/factorydevice'
    },
    {
      name: '安全域',
      iconType: '',
      state: 'strategyaudit/securitydomain'
    }
  ];

  constructor() { }

  ngOnInit() {
  }

  changePwd() {

  }

  toggleGuide() {
    this.showGuide = !this.showGuide;
  }

}
