import {Component, Input, Output, OnInit, EventEmitter, TemplateRef} from '@angular/core';
import {AssetService} from '../../../common/services/asset.service';
import {DupeInfo} from "../../../common/services/dupeInfo";
import { NzMessageService } from 'ng-zorro-antd';
import {FormatValService} from '../../../common/services/formatVal.service';

@Component({
    selector: 'fac-new-device',
    templateUrl: './newdevice.component.html',
    styleUrls: ['./factorydevice.component.scss']
})

export class NewdeviceComponent implements OnInit {
    @Input() isNewDevice:boolean;
    @Input() models:boolean;
    @Input() alldevice:any;
    @Input() allDeviceFull:any;
    @Output() change = new EventEmitter();


    isConfirmLoading = false;
    device: any;
    newDevice: any;
    nameError: boolean;
    nameLengthError: boolean;
    modeError: boolean;
    modelError: boolean;
    newModel: any;
    hasDuplicateName: boolean;
    hasDuplicateSN:boolean;
    forms:any;
    disableAddNewIp:boolean = true;

    constructor(private assetService: AssetService, private dupeInfo: DupeInfo, private message: NzMessageService, private formatVal: FormatValService){

    }

    ngOnInit() :void{
        this.device = {'name':"", 'modename':"", 'modelname':"", 'modelmake':"", 'ipmac':[{ip:"", mac:""}], 'category': 'FACTORY_DEVICE', 'zoneName': "NA", 'needMac': false};
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

    }
    //设备名称校验
    validateDevice(){
        // if (this.device.iconType === 'subnet' && this.device.subnetIp) {
        //     this.formatVal.subnetParser(this.device, this.device.subnetIp, this.alldevice);
        // }
        this.nameError = (!this.device['name'] || this.device['name'].length === 0);
        this.nameLengthError = !this.nameError && this.device['name'].length > 25;
        this.modeError = (!this.device['mode'] || this.device['mode'].length === 0);
        if (this.newModel) {
            this.modelError = (!this.device['modelname'] || this.device['modelname'].length === 0);
        } else {
            this.modelError = (!this.device['modelname'] || this.device['modelname'].length === 0);
        }
        if (this.device['name'] && this.nameError) {
            this.nameError=true;
        } else if (this.device['name'] && this.nameLengthError) {
            this.nameLengthError=true;
        } else {
            this.hasDuplicateName = this.dupeInfo.dupeCheck(-1, "name", this.device['name'], this.allDeviceFull);
        }
    }

    //序列号
    serialNumberChanged(){
        if (this.device['serialNumber']){
            this.hasDuplicateSN = this.formatVal.checkSerialNumberDup(this.allDeviceFull, this.device.serialNumber, -1);
        } else {
            this.hasDuplicateSN = false;
        }
    }
    //设备类型
    modeChange($event){
        if (this.device.modename) {
            for (let i in this.forms.modes) {
                if (i && this.forms.modes[i].icontype === $event) {
                    this.device['mode'] = this.forms.modes[i].mode;
                    this.device['iconType'] = this.forms.modes[i].icontype;
                    // this.digest;
                    break;
                }
            }
            if (this.device.modename==='subnet') {
                // clear ip mac array when the mode is changed
                this.device.ipmac = [{ip:"", mac:""}];
                this.clearModelFields();
            }
            for (let j=0, len = this.device.ipmac.length;j<len;j++){
                let tmp = this.device.ipmac[j];
                if (tmp.ip){
                    this.validateIp(tmp, j);
                }
            }
            this.allIpMacValid();
            this.validateDevice();
        }
    }

    clearModelFields () {
        this.newModel = true;
        this.device.model = '';
        this.device.modelname = '';
        this.device.modelmake = '';
        this.device.modelprotocol = '';
        this.device.modelversion = '';
        this.device.modelfirmware = '';
        this.device.modelserial = '';
        this.device.modelmemo = '';
    };

    validateIp (ipmac, index){
        if (this.device.iconType === 'subnet') {
            ipmac.invalidIp = !ipmac.ip || this.formatVal.subnetValidation(ipmac.ip);
            ipmac.invalidRange = !ipmac.invalidIp && this.formatVal.subnetOverlap(this.device, this.allDeviceFull, ipmac.ip);
        } else {
            ipmac.invalidIp = !ipmac.ip || this.formatVal.validateIp(ipmac.ip);
            ipmac.hasDuplicateIP = !ipmac.invalidIp && (this.dupeInfo.dupInOtherDevice('portIp', -1, this.allDeviceFull, ipmac.ip) || this.dupeInfo.checkDupInDevice(this.device.ipmac, ipmac, index, 'ip'));
            ipmac.invalidRange = !ipmac.invalidIp && !ipmac.hasDuplicateIP && this.formatVal.checkIpInSubnet(ipmac.ip, this.allDeviceFull);
        }
    };

    //设备型号
    modelChange(modelId){
        if (modelId === 'new') {
            this.clearModelFields();
        } else {
            this.newModel = false;
            this.populateModelInfo(modelId);
        }
        this.validateDevice();
    }

    populateModelInfo(modelId) {
        for (let i in this.forms.models) {
            if (i && this.forms.models[i]['modelId'] === modelId) {
                this.device['modelId'] = this.forms.models[i]['modelId'];
                this.device['model'] = this.forms.models[i]['model'];
                this.device['modelmake'] = this.forms.models[i]['make'];
                this.device['modelprotocol'] = this.forms.models[i]['protocol'];
                this.device['modelversion'] = this.forms.models[i]['version'];
                this.device['modelfirmware'] = this.forms.models[i]['firmwareVersion'];
                this.device['modelserial'] = this.forms.models[i]['model_serialNo'];
                this.device['modelmemo'] = this.forms.models[i]['model_memo'];
                let iconType = this.forms.models[i]['iconType'];
                if (!iconType) {
                    this.modeChange(this.device.modename);
                } else {
                    this.device['iconType'] = iconType;
                }
                break;
            }
        }
    }

    //IP校验
    validateAllIp(){
        for (let i = 0, len = this.device.ipmac.length;i<len;i++) {
            let tmp = this.device.ipmac[i];
            this.validateIp(tmp, i);
        }
        this.allIpMacValid();
    }

    //mac校验
    validateAllMac (){
        for (let i = 0, len = this.device.ipmac.length;i<len;i++) {
            let tmp = this.device.ipmac[i];
            this.validateMac(tmp, i);
        }
        this.allIpMacValid();
    }

    validateMac (ipmac, index){
        ipmac.invalidMac = ipmac.mac && this.formatVal.validateMac(ipmac.mac);
        if (ipmac.mac) {
            ipmac.hasDuplicateMAC = !ipmac.invalidMac && (this.dupeInfo.dupInOtherDevice('mac', -1, this.allDeviceFull, ipmac.mac) || this.dupeInfo.checkDupInDevice(this.device.ipmac, ipmac, index, 'mac'));
        } else {
            ipmac.hasDuplicateMAC = false;
        }
    };

    //添加ipmac
    addIpMac(){
        this.device.ipmac.push({ip:"", mac:""});
        this.disableAddNewIp = true;
    }

    //删除ipmac
    removeIpMac(index){
        this.device.ipmac.splice(index, 1);
        this.validateAllIp();
        this.validateAllMac();
    }

    //
    allIpMacValid(){
        this.disableAddNewIp = true;
        for (let i=0, len = this.device.ipmac.length;i<len;i++){
            let tmp = this.device.ipmac[i];
            if (!tmp.ip || tmp.invalidIp || tmp.hasDuplicateIP || tmp.invalidRange){
                this.disableAddNewIp = true;
                return false;
            }
            if (tmp.invalidMac || tmp.hasDuplicateMAC){
                this.disableAddNewIp = true;
                return false;
            }
            if (this.device.needMac && !tmp.mac){
                this.disableAddNewIp = true;
                return false;
            }
        }
        this.disableAddNewIp = false;
        return true;
    }

    handleOk(): void {
        let newDevice = {};
        let newModel = {};
        let newNodes = [];
        newDevice['name'] = this.device['name'];
        newDevice['modelId'] = this.device['modelname'];
        newDevice['_configMismatch'] = this.device['_configMismatch'];
        newDevice['protectedDevicesNumber'] = this.device['protectedDevicesNumber'];
        newDevice['cmmnPortnumber'] = this.device['cmmnPortnumber'];
        newDevice['isProtected'] = this.device['isProtected'];
        newDevice['iconType'] = this.device['iconType'];
        newDevice['hasUSB'] = this.device['hasUSB'];
        newDevice['hasWireless'] = this.device['hasWireless'];
        newDevice['hasPort'] = this.device['hasPort'];
        newDevice['serialNumber'] = this.device['serialNumber'];
        newDevice['devicePorts'] = [];
        for (let i=0, len = this.device.ipmac.length;i<len;i++){
            let tmp = this.device.ipmac[i];
            let data = {
                isMgmtPort: true,
                portIp: tmp.ip,
                mac: tmp.mac ? tmp.mac.toUpperCase() : '',
            };
            if (newDevice['iconType'] === 'subnet'){
                let lst = data.portIp.split('/');
                data['netMask'] = this.formatVal.numToNetmask(lst[1]);
            }
            newDevice['devicePorts'].push(data);
        }
        newModel['model'] = this.device['model'] ? this.device['model'] : this.device['modelname'];
        newModel['model_name'] = this.device['modelname'];
        newModel['make'] = this.device['modelmake'];
        newModel['model_memo'] = this.device['modelmemo'];
        newModel['numOfPorts'] = this.device['modelnumofports'];
        newModel['iconType'] = this.device['iconType'];
        newModel['category'] = 1;
        newNodes[0] = {};
        let defaultPort = [];
        for (let dCount =0, len = this.device.ipmac.length; dCount < len; dCount++) {
            defaultPort.push('p'+dCount);
        }
        if (newDevice['iconType'] !== 'subnet') {
            newNodes[0]['ports'] = defaultPort;
        }
        newNodes[0]['name'] = this.device['name'];
        newNodes[0]['type'] = this.device['mode'];
        newNodes[0]['zoneName'] = this.device['zoneName'];
        newNodes[0]['importance'] = 1;

        if (this.newModel) {
            let modelExists = false;
            for (let i in this.forms.models) {
                if (i && this.forms.models[i]['model'] === newModel['model'] && this.forms.models[i]['version'] === 'N/A' && (this.forms.models[i]['make'] === newModel['make'] || (this.forms.models[i]['make'] === 'N/A' && newModel['make'] === ''))) {
                    modelExists = true;
                    newDevice['modelId'] = this.forms.models[i]['modelId'];
                    break;
                }
            }
            if (modelExists) {
                this.newModel = false;
                this.createDevice(newDevice, newNodes);
            } else {
                this.assetService.createModel(newModel).subscribe( (data) => {
                    newDevice['modelId'] = data['modelId'];
                    this.forms.models.splice(1, 0, {'modelId' : data['modelId'], 'model_name' : newModel['model_name']});
                    this.device['modelname'] = data['modelId'];
                    this.newModel = false;
                    this.createDevice(newDevice, newNodes);
                },  (data:any) => {
                    // $rootScope.addAlert({
                    //     type: 'danger',
                    //     content: '添加设备型号失败' + (data && data.data && data.data.error ? '：' + data.data.error : '')
                    // });
                    this.message.create('error', `添加设备型号失败${data && data.data && data.data.error ? '：' + data.data.error : ''}`);
                });
            }
        } else {
            this.createDevice(newDevice, newNodes);
        }
    }

    createDevice (newDevice, newNodes) {
        this.assetService.createDevice(newDevice).subscribe( (data:any) =>{
            newNodes[0]['deviceId'] = data['deviceId'];
            this.createNodes(newNodes);
        },  (data:any) => {
            // this.handleCancel();
            this.change.emit(false);
            // $rootScope.addAlert({
            //     type: 'danger',
            //     content: '添加设备失败' + (data && data.data && data.data.error ? '：' + data.data.error : '')
            // });
            this.message.create('error', `添加设备型号失败${data && data.data && data.data.error ? '：' + data.data.error : ''}`);
        });
    }

    createNodes (newNodes) {
        // this.handleCancel();
        this.assetService.createNodes(newNodes).subscribe( data=> {
            console.log(data);
            this.isConfirmLoading = true;
            setTimeout(() => {
                this.change.emit(false);
                this.isConfirmLoading = false;
            }, 3000);
            // $rootScope.addAlert({
            //     type: 'success',
            //     content: '添加设备到加入当前拓扑成功'
            // });
            this.message.create('success', `添加设备到加入当前拓扑成功`);
        },  (data:any) => {
            // $rootScope.addAlert({
            //     type: 'danger',
            //     content: '加入当前拓扑失败' + (data && data.data && data.data.error ? '：' + data.data.error : '')
            // });
            this.change.emit(false);
            this.message.create('error', `添加设备型号失败${data && data.data && data.data.error ? '：' + data.data.error : ''}`);
        });
    }

    handleCancel() {
        this.change.emit(false);
    }

}