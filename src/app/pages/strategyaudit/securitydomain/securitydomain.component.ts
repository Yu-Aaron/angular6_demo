import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-securitydomain',
  templateUrl: './securitydomain.component.html',
  styleUrls: ['./securitydomain.component.scss']
})
export class SecuritydomainComponent implements OnInit {
  domain = {
    data: [],
    total: 0,
    loading: false,
    pageIndex: 1,
    pageSize: 10,
    pages: 1
  };
  createFlag = false;

  constructor() {
  }

  ngOnInit() {
    this.getDomainData();
  }

  getDomainData() {
    this.domain.data = [
      {
        name: '默认安全域',
        port: 'GE1、GE2、GE3',
        strategy: '默认策略',
        time: '2019-01-02 02:02:00',
        flag: true
      },
      {
        name: '工业控制1安全域',
        port: 'GE4',
        strategy: 'UX策略',
        time: '2019-01-02 02:02:00',
        flag: false
      },
      {
        name: '工业控制2安全域',
        port: 'GE5',
        strategy: 'UXtext',
        time: '2019-01-02 02:02:00',
        flag: false
      }
    ];
    this.domain.total = this.domain.data.length;
    this.domain.pages = Math.ceil(this.domain.total / this.domain.pageSize);
  }

  toggleCreate(flag) {
    if (flag) { // 新建

    } else {// 重置表单

    }
    this.createFlag = false;
  }

}
