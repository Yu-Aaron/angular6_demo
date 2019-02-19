import {Component, Input, Output, OnInit, EventEmitter, TemplateRef} from '@angular/core';
import {AssetService} from '../../../common/services/asset.service';
import {DupeInfo} from "../../../common/services/dupeInfo";
import { NzMessageService } from 'ng-zorro-antd';
import {FormatValService} from '../../../common/services/formatVal.service';
import {TopologyService} from '../../../common/services/topology.service';
import {CommonService} from '../../../common/services/common.service';
import {forkJoin} from 'rxjs';

@Component({
    selector: 'fac-view-device',
    templateUrl: './viewDeviceDetail.component.html',
    styleUrls: ['./factorydevice.component.scss']
})

export class ViewdeviceComponent implements OnInit {
    @Input() isViewDevice:boolean;
    @Input() models:any;
    @Input() alldevice:any;
    @Input() allDeviceFull:any;
    @Input() device:any;
    @Output() change = new EventEmitter();

	isEdited:boolean = false;
	isIPEdited:boolean = false;
	isConfirmLoading = false;
    newDevice: any;
    newModel: any;
    nameError: boolean;
    nameLengthError: boolean;
    modelError: boolean;
    hasDuplicateSN:boolean;
    forms:any;
    payload:any;
    editedInfo:any;
    allIpMacValid:boolean = false;
    needMac:boolean = false;

    constructor(private assetService: AssetService, private dupeInfo: DupeInfo, private message: NzMessageService, private formatVal: FormatValService, private topologyService: TopologyService, private commonService: CommonService){

    }

    ngOnInit() :void{
        // this.device = {'name':"", 'modename':"", 'modelname':"", 'modelmake':"", 'ipmac':[{ip:"", mac:""}], 'category': 'FACTORY_DEVICE', 'zoneName': "NA"};
        this.forms = {'modes' : [
                {mode: 'ENDPOINT', modename: 'HMI', icontype: 'hmi'},
                {mode: 'ENDPOINT', modename: 'OPC 客户端', icontype: 'opc_client'},
                {mode: 'ENDPOINT', modename: 'OPC 服务器', icontype: 'opc_server'},
                {mode: 'ENDPOINT', modename: 'PLC', icontype: 'plc'},
                {mode: 'ENDPOINT', modename: '工作站', icontype: 'workstation'},
                {mode: 'ENDPOINT', modename: '子网', icontype: 'subnet'},
                {mode: 'ENDPOINT', modename: '其它', icontype: 'unknown-device'}
            ], 'models': this.models};
        this.newDevice = {'newModel': true};
        this.payload = {'$filter': "zoneName ne 'NA'", '$orderby': 'zoneName'};
        this.assetService.getAllNodeZone(this.payload).subscribe((data:any) => {
            this.forms.nodezones = data;
        });
        this.editedInfo = this.commonService.deepCopy(this.device);
    }
    
    editDevice = function () {
        delete this.device.port;
        this.editedInfo = this.commonService.deepCopy(this.device);
        this.editedInfo.nodeZoneId = this.device.nodes[0].nodeZoneId;
        this.isEdited = true;
        this.validateDevice();
    };

    checkAllIpMacValid (){
        this.allIpMacValid = false;
        for (let i=0, len = this.editedInfo.devicePorts.length;i<len;i++){
            let tmp = this.editedInfo.devicePorts[i];
            if (tmp.invalidIp || tmp.hasDuplicateIP || tmp.invalidRange || tmp.invalidMac || tmp.hasDuplicateMAC){
                return;
            }
        }
        this.allIpMacValid = true;
    };

    editIP () {
        this.editedInfo = this.commonService.deepCopy(this.device);
        this.validateAllIp();
        this.validateAllMac();
        this.isIPEdited = true;
    };

    editIPCancel () {
        this.editedInfo = this.commonService.deepCopy(this.device);
        this.isIPEdited = false;
    };

    removeIpMac (index){
        this.editedInfo.devicePorts.splice(index, 1);
        this.validateAllIp();
        this.validateAllMac();
        this.checkAllIpMacValid();
    };

    addIpMac (){
        this.editedInfo.devicePorts.push({portIp:"", mac:"", isMgmtPort:true, invalidIp:true, invalidMac:this.needMac});
        this.checkAllIpMacValid();
    };

// remove all links id in the array links
    removeLinks (topologyId, links){
        this.topologyService.deleteLink(links, topologyId);
    };

    editIPDone () {
        delete this.editedInfo._iconName;
        delete this.editedInfo.nodes;
        delete this.editedInfo.rules;
        let ports = [];
        let portIndex = -1;
        if (this.editedInfo.devicePorts.length < this.device.devicePorts.length){
            portIndex = this.editedInfo.devicePorts.length;
        }
        for (let i=0,len = this.editedInfo.devicePorts.length;i<len;i++) {
            let tmp = this.editedInfo.devicePorts[i];
            delete tmp.hasDuplicateIP;
            delete tmp.hasDuplicateMAC;
            delete tmp.invalidIp;
            delete tmp.invalidMac;
            delete tmp.invalidRange;
            tmp.portName = 'p'+ i.toString();
            tmp.mac = tmp.mac ? tmp.mac.toUpperCase() : '';
            ports.push(tmp.portName);
        }

        // get the ids of the links that need to be deleted
        let requests = [];
        requests.push(this.topologyService.getLinks(this.device.topologyId));
        requests.push(this.topologyService.getDeviceNodes(this.device.deviceId));

        this.assetService.updateAllDevicePorts(this.device.topologyId, this.device.deviceId, this.editedInfo).subscribe((data:any) => {
            let node = this.device.nodes[0];
            if (this.device.iconType !== 'subnet') {
                node.ports = ports;
            }
            this.device.devicePorts = data.devicePorts;
            this.editedInfo.devicePorts = data.devicePorts;
            this.assetService.updateNode(node).subscribe((data:any) => {
                this.isIPEdited = false;
                this.message.create('success', `修改设备端口成功`);
            });
            //get the ids of all the links that need to be removed
            if (portIndex !== -1){
                forkJoin(requests).subscribe((data:any) => {
                    let links = data[0].data;
                    let node = data[1][0];
                    let ids = [];
                    for (let i=0, len = links.length;i<len;i++){
                        let tmp = links[i];
                        if (tmp.nodeID === node.id){
                            if (tmp.sourcePortName && parseInt(tmp.sourcePortName.slice(1))>=portIndex){
                                ids.push({id:tmp.id});
                            }
                        }
                    }
                    this.removeLinks(node.topologyId, ids);
                });
            }
        }, (data:any) => {
            this.message.create('error', "修设备端口失败")
        });
    };

    editCancel () {
        this.editedInfo = this.commonService.deepCopy(this.device);
        this.newModel = false;
        this.isEdited = false;
    };

    validateDevice() {
        this.nameError = (!this.editedInfo.name || this.editedInfo.name.length === 0);
        this.nameLengthError = !this.nameError && this.editedInfo.name.length > 25;
        this.hasDuplicateSN = false;
        if (this.editedInfo.serialNumber){
            this.hasDuplicateSN = this.formatVal.checkSerialNumberDup(this.allDeviceFull, this.editedInfo.serialNumber, this.editedInfo.deviceId);
        }
        if (this.newModel) {
            this.modelError = (!this.editedInfo._model_name || this.editedInfo._model_name.length === 0);
        } else {
            this.modelError = (!this.editedInfo.modelId || this.editedInfo.modelId.length === 0);
        }
    }

    modelChange (modelId) {
        if (modelId === 'new') {
            this.newModel = true;
            this.editedInfo.model = '';
            this.editedInfo._model_name = '';
            this.editedInfo.make = '';
            this.editedInfo.modelId = '';
        } else {
            this.newModel = false;
            this.populateModelInfo(modelId);
        }
        this.validateDevice();
    };

    populateModelInfo(modelId) {
        for (let i in this.forms.models) {
            if (i && this.forms.models[i]['modelId'] === modelId) {
                this.editedInfo.modelId = modelId;
                this.editedInfo.make = this.forms.models[i]['make'];
                this.editedInfo.iconType = this.forms.models[i]['iconType'] ? this.forms.models[i]['iconType'] : this.editedInfo.iconType ? this.editedInfo.iconType : 'unknown-device';
                break;
            }
        }
    }

    deviceIpChange (port, index) {
        if (this.device.iconType === 'subnet') {
            port.invalidIp = this.formatVal.subnetValidation(port.portIp);
            port.invalidRange = !port.invalidIp && this.formatVal.subnetOverlap(this.device, this.allDeviceFull, port.portIp);
        } else {
            port.invalidIp = !port.portIp || this.formatVal.validateIp(port.portIp);
            port.hasDuplicateIP = !port.invalidIp && (this.dupeInfo.checkDupInDevice(this.editedInfo.devicePorts, port, index, 'portIp') || this.dupeInfo.dupInOtherDevice('portIp', this.device.deviceId, this.allDeviceFull, port.portIp));
            port.invalidRange = !port.invalidIp && !port.hasDuplicateIP && this.formatVal.checkIpInSubnet(port.portIp, this.allDeviceFull);
        }
    };

    deviceMacChange (port, index) {
        port.invalidMac = port.mac && this.formatVal.validateMac(port.mac);
        if (this.needMac && !port.mac) {
            port.invalidMac = true;
        }
        if (port.mac){
            port.hasDuplicateMAC = !port.invalidMac && (this.dupeInfo.checkDupInDevice(this.editedInfo.devicePorts, port, index, 'mac') || this.dupeInfo.dupInOtherDevice('mac', this.device.deviceId, this.allDeviceFull, port.mac));
        } else {
            port.hasDuplicateMAC = false;
        }
    };

    validateAllIp (){
        for (let i=0, len = this.editedInfo.devicePorts.length;i<len;i++){
            this.deviceIpChange(this.editedInfo.devicePorts[i], i);
        }
        this.checkAllIpMacValid();
    };

    validateAllMac (){
        for (let i=0, len = this.editedInfo.devicePorts.length;i<len;i++){
            this.deviceMacChange(this.editedInfo.devicePorts[i], i);
        }
        this.checkAllIpMacValid();
    };


    editDone () {
        let device = {};
        device = this.commonService.deepCopy(this.device);
        device['name'] = this.editedInfo.name;
        device['serialNumber'] = this.editedInfo.serialNumber;
        device['make'] = this.editedInfo.make;
        device['iconType'] = this.editedInfo.iconType;

        delete device['rules'];
        delete device['nodes'];
        delete device['_rulesCount'];
        delete device['_signaturesCount'];
        delete device['_iconName'];
        delete device['_factoryCount'];
        delete device['showRoutingInfo'];
        delete device['ip'];
        delete device['mac'];

        if (!device['serialNumber']) {
            delete device['serialNumber'];
        }
        if (this.newModel) {
            let newModel = {};
            newModel['model'] = this.editedInfo._model_name;
            newModel['model_name'] = this.editedInfo._model_name;
            newModel['make'] = this.editedInfo.make;
            newModel['iconType'] = this.editedInfo.iconType;
            newModel['category'] = 1;
            let modelExists = false;
            for (let i in this.forms.models) {
                if (i && this.forms.models[i]['model'] === newModel['model'] && this.forms.models[i]['version'] === 'N/A' && this.forms.models[i]['make'] === newModel['make']) {
                    modelExists = true;
                    device['modelId'] = this.forms.models[i]['modelId'];
                    break;
                }
            }
            if (modelExists) {
                this.newModel = false;
                this.updateDevice(device);
            } else {
                this.assetService.createModel(newModel).subscribe( (data: any) => {
                    device['modelId'] = data['modelId'];
                    this.forms.models.splice(1, 0, {'modelId' : data['modelId'], 'model_name' : newModel['model_name']});
                    this.editedInfo['modelId'] = data['modelId'];
                    this.newModel = false;
                    this.updateDevice(device);
                }, (data:any) => {
                    this.message.create('error', `添加设备型号失败${data && data.data && data.data.error ? '：' + data.data.error : ''}`);
                });
            }
        } else {
            device['modelId'] = this.editedInfo.modelId;
            this.updateDevice(device);
        }
    };

    updateDevice(device) {
        this.assetService.update(device.deviceId, device).subscribe( (data:any) => {
            this.device.name = data.name;
            this.device.serialNumber = data.serialNumber;
            this.device._model_name = data._model_name;
            this.editedInfo.name = data.name;
            this.editedInfo.serialNumber = data.serialNumber;
            this.editedInfo._model_name = data._model_name;
            for (let j = 0, len=this.models.length; j < len; j++) {
                if (this.models[j].modelId === data.modelId) {
                    this.device._model_name = this.editedInfo._model_name = this.models[j].model_name + (this.models[j].model && (this.models[j].model !== this.models[j].model_name) ? ' / ' + this.models[j].model : '');
                    this.device.modelId = this.editedInfo.modelId = data.modelId;
                    break;
                }
            }
            this.assetService.updateNodeAssociation(device.deviceId, this.editedInfo.nodeZoneId).subscribe((data:any) => {
                // $state.reload().then(function () {
                this.isEdited = false;
                this.message.create('success', "修改设备端口成功")
                // });
            }, (data:any) => {
                this.message.create('error', `修改设备逻辑分区失败${data && data.data && data.data.error ? '：' + data.data.error : ''}`);
            });
        }, (data:any) => {
            this.message.create('error', `修改设备失败${data && data.data && data.data.error ? '：' + data.data.error : ''}`);
        });
    }

    getPort(port){
        if(port&&port.length>0){
            let portData = [];
            for(let i = 0, len = port.length; i<len; i++){
                if(port[i].isMgmtPort === true){
                    portData.push(port[i]);
                }
            }
            return portData;
        }
    }

    handleCancel(){
        this.change.emit('false');
    }
}