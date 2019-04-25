import { Component, OnInit } from '@angular/core';
import { SettingService } from 'src/app/common/service/setting.service';
import { NzNotificationService } from 'ng-zorro-antd';

@Component({
  selector: 'app-protocol',
  templateUrl: './protocol.component.html',
  styleUrls: ['./protocol.component.scss']
})
export class ProtocolComponent implements OnInit {
  defaultProtocolList = [];
  customProtocolList = [];
  switchDisabled = true;

  constructor(
    public settingService: SettingService,
    public notification: NzNotificationService
  ) { }

  ngOnInit() {
    this.getDefaultProtocolList();
  }

  getDefaultProtocolList() {
    this.settingService.getPrivateProtocols('DEFAULT').subscribe((data: any) => {
      this.defaultProtocolList = data;
    }, (error) => {
      this.defaultProtocolList = [];
    });
  }

  getCustomProtocolList() {
    this.settingService.getPrivateProtocols('CUSTOM').subscribe((data: any) => {
      this.customProtocolList = data;
    }, (error) => {
      this.customProtocolList = [];
    });
  }
}
