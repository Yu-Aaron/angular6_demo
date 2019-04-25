import { Component, OnInit } from '@angular/core';
import { AssetService } from 'src/app/common/service/asset.service';
import { CommonService } from 'src/app/common/service/common.service';
import { DupeInfoService } from 'src/app/common/service/dupe-info.service';

@Component({
  selector: 'app-devicedetail',
  templateUrl: './devicedetail.component.html',
  styleUrls: ['./devicedetail.component.scss']
})
export class DevicedetailComponent implements OnInit {
  isCreate = false;
  models = [];

  device = {};
  forms = {};
  iconType: any;
  addModel = false;
  disableAddNewIp = false;

  errorMsg = {};



  constructor(
    public asetService: AssetService,
    public commonService: CommonService,
    public dupeInfoService: DupeInfoService
  ) { }

  ngOnInit() {
    const url = location.hash.split('/');
    this.isCreate = url[4] === 'create' ? true : false;
    if (this.isCreate) {
      this.getModels();
      this.init();
    }
  }

  init() {
    this.device = {};
    this.device['category'] = 'NETWORK_DEVICE';
    this.device['ipmac'] = [{ ip: '', mac: '' }];
    this.forms['modes'] = [
      { mode: 'SWITCH', modename: '网络交换机', icontype: 'switch' },
      { mode: 'ROUTER', modename: '路由器', icontype: 'router' },
      { mode: 'SWITCH', modename: '其它', icontype: 'unknown-device' }
    ];
    this['disableAddNewIp'] = true;
    this['isSaving'] = false;
    this['saveBtn'] = '完成';
  }


  getModels() {
    let params = {
      '$select': ['modelId', 'model', 'model_name', 'make', 'protocol', 'version', 'firmwareVersion', 'model_serialNo', 'model_memo', 'iconType', 'numOfPorts', 'subCategory'],
      '$filter': 'category eq NETWORK_DEVICE',
      '$limit': 1000000,
      '$orderby': 'model_name'
    };
    this.asetService.getModels(params).subscribe((data: any) => {
      if (data) {
        this.models = data;
        this.forms['models'] = this.models;
        this.forms['models'].splice(0, 0, { 'modelId': 'new', 'model_name': '添加设备型号' });
      }
    }, (error: any) => {
      this.models = [];
    });
  }

  getAllDeviceFull() {

  }

  modeChange() {  // 设备类型
    this.device['ipmac'] = [{ ip: '', mac: '' }];
    if (this.device['mode'] !== 'ROUTER') {
      this.device['ip'] = '';
      this.device['mac'] = '';
    }
    if (this.device['modename']) {
      for (let i in this.forms['modes']) {
        if (i && this.forms['modes'][i].modename === this.device['modename']['modename']) {
          this.device['mode'] = this.forms['modes'][i].mode;
          this.device['iconType'] = this.iconType ? this.iconType : this.forms['modes'][i].icontype;
          break;
        }
      }
      this.validateDevice();
    }
  }

  modelChange(modelId) { // 设备型号
    if (modelId === 'new') {
      // this.addModel = true;
      // this.device.model = '';
      // this.device.modelname = '';
      // this.device.modelmake = '';
      // this.device.modelprotocol = '';
      // this.device.modelversion = '';
      // this.device.modelfirmware = '';
      // this.device.modelserial = '';
      // this.device.remarks = '';
    } else {
      this.addModel = false;
      this.populateModelInfo(modelId);
    }
    this.validateDevice();
  }

  validateAllIp() {

  }

  // validateAllMac() {
  //   for (let i = 0; i < this.device['ipmac'].length; i++) {
  //     let tmp = this.device['ipmac'][i];
  //     this.validateIp(tmp, i);
  //   }
  //   this.allIpMacValid();
  // }

  // validateIp(ipmac, index) {
  //   if (this.device['iconType'] === 'subnet') {
  //     ipmac.invalidIp = !ipmac.ip || this.commonService.subnetValidation(ipmac.ip);
  //     ipmac.invalidRange = !ipmac.invalidIp && this.commonService.subnetOverlap(this.device, allDeviceFull, ipmac.ip);
  //   } else {
  //     ipmac.invalidIp = !ipmac.ip || this.commonService.validateIp(ipmac.ip);
  //     ipmac.hasDuplicateIP = !ipmac.invalidIp && (this.dupeInfoService.dupInOtherDevice('portIp', -1, allDeviceFull, ipmac.ip) || this.dupeInfoService.checkDupInDevice(this.device['ipmac'], ipmac, index, 'ip'));
  //     ipmac.invalidRange = !ipmac.invalidIp && !ipmac.hasDuplicateIP && this.commonService.checkIpInSubnet(ipmac.ip, allDeviceFull);
  //   }
  // }

  addIpMac() {
    this.device['ipmac'].push({ ip: '', mac: '' });
    this.disableAddNewIp = true;
  }

  validateDevice() {

  }

  populateModelInfo(modelId) {
    for (let i in this.forms['models']) {
      if (i && this.forms['models'][i]['modelId'] === modelId) {
        this.device['modelId'] = this.forms['models'][i]['modelId'];
        this.device['model'] = this.forms['models'][i]['model'];
        this.device['modelmake'] = this.forms['models'][i]['make'];
        this.device['modelprotocol'] = this.forms['models'][i]['protocol'];
        this.device['modelversion'] = this.forms['models'][i]['version'];
        this.device['modelfirmware'] = this.forms['models'][i]['firmwareVersion'];
        this.device['modelserial'] = this.forms['models'][i]['model_serialNo'];
        this.device['remarks'] = this.forms['models'][i]['remarks'];
        let iconType = this.forms['models'][i]['iconType'];
        if (!iconType) {
          this.modeChange();
        } else {
          this.device['iconType'] = iconType;
        }
        break;
      }
    }
  }



}
