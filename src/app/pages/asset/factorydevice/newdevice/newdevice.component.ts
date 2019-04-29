import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouteService } from '../../../../common/service/route.service';


var self;

@Component({
  selector: 'app-newdevice',
  templateUrl: './newdevice.component.html',
  styleUrls: ['./newdevice.component.scss']
})
export class NewdeviceComponent implements OnInit {

  global;
  validateForm: FormGroup;
  enterDeviceModelName: Boolean = false; // 设备型号 选择添加设备型号
  constructor(
    private routeService: RouteService,
    private fb: FormBuilder,
  ) {
    self = this;
    self.formsModelType = [
      {icontype: 'SWITCH', label: '网络交换机', value: 'switch'},
      {icontype: 'ROUTER', label: '路由器', value: 'router'},
      {icontype: 'SWITCH', label: '其它', value: 'unknown-device'}
    ];
  }

  ngOnInit() {
    this.routeService.setVal(this.global);
    self.validateForm = self.fb.group({
      name: [null, [ Validators.required ] ],
      serialNumber: [null ],
      modeltype: [null, [Validators.required]],
      modelname: [null, [Validators.required] ],
      modelnameInput: [null],
      modelmakeInput: [null],
      commet: [''],
      tag: ['']
    });
  }

}
