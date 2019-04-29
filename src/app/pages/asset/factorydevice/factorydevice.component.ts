import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-factorydevice',
  templateUrl: './factorydevice.component.html',
  styleUrls: ['./factorydevice.component.scss']
})
export class FactorydeviceComponent implements OnInit {

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
