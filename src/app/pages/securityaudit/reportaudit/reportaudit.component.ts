import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reportaudit',
  templateUrl: './reportaudit.component.html',
  styleUrls: ['./reportaudit.component.scss']
})
export class ReportauditComponent implements OnInit {
  daily = {
    data: [],
    total: 0,
    loading: false,
    pageIndex: 1,
    pageSize: 10,
    pages: 1
  };
  weekly = {
    data: [],
    total: 0,
    loading: false,
    pageIndex: 1,
    pageSize: 10,
    pages: 1
  };
  monthly = {
    data: [],
    total: 0,
    loading: false,
    pageIndex: 1,
    pageSize: 10,
    pages: 1
  };

  constructor() { }

  ngOnInit() {
    this.getDailyData();
  }

  getDailyData() {
    this.daily.loading = true;
    this.daily.data = [
      { name: '日志_每日报告_2019-02-27', time: '2019-02-27  10:10:10' },
      { name: '日志_每日报告_2019-02-27', time: '2019-02-27  10:10:10' },
      { name: '日志_每日报告_2019-02-27', time: '2019-02-27  10:10:10' },
      { name: '日志_每日报告_2019-02-27', time: '2019-02-27  10:10:10' },
    ];
    this.daily.pages = 1;
    this.daily.total = this.daily.data.length;
    this.daily.loading = false;
  }

}
