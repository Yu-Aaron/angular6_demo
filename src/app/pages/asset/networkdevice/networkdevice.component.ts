import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-networkdevice',
  templateUrl: './networkdevice.component.html',
  styleUrls: ['./networkdevice.component.scss']
})
export class NetworkdeviceComponent implements OnInit {
  networkDevice = {
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
