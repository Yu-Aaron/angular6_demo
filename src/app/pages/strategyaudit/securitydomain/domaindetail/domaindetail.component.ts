import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-domaindetail',
  templateUrl: './domaindetail.component.html',
  styleUrls: ['./domaindetail.component.scss']
})
export class DomaindetailComponent implements OnInit {
  threat = {
    data: [],
    total: 0,
    loading: false,
    pageIndex: 1,
    pageSize: 10,
    pages: 1
  };
  protocol = {
    data: [],
    total: 0,
    loading: false,
    pageIndex: 1,
    pageSize: 10,
    pages: 1
  };
  ipmac = {
    data: [],
    total: 0,
    loading: false,
    pageIndex: 1,
    pageSize: 10,
    pages: 1
  };
  domainName = {
    data: [],
    total: 0,
    loading: false,
    pageIndex: 1,
    pageSize: 10,
    pages: 1
  };

  constructor() { }

  ngOnInit() {
  }

}
