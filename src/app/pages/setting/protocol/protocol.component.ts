import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-protocol',
  templateUrl: './protocol.component.html',
  styleUrls: ['./protocol.component.scss']
})
export class ProtocolComponent implements OnInit {
  defaultProtocolList = [];
  switchDisabled = true;
  constructor() { }

  ngOnInit() {
    this.getDefaultProtocolList();
  }

  getDefaultProtocolList() {
    let list = [];
    for (let i = 0; i < 61; i++) {
      let item = {
        status: i % 3 === 0 ? true : false,
        type: i % 4 === 0 ? '【TCP】' : '【UDP】',
        name: 'BGP' + i,
        port: i
      };
      list.push(item);
    }
    this.defaultProtocolList = list;
  }
}
