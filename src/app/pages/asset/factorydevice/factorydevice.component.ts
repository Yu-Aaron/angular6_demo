import {AfterContentInit, Component, EventEmitter, OnInit, Output} from '@angular/core';
import {CommonService} from "../../../common/services/common.service";
import {AssetService} from "../../../common/services/asset.service";
import {DeviceTypeService} from "../../../common/services/deviceType";
import { NzModalRef, NzModalService } from 'ng-zorro-antd';
import {TopologyService} from '../../../common/services/topology.service';
import { forkJoin } from 'rxjs/observable/forkJoin';

@Component({
    selector: 'nz-demo-table-ajax',
    templateUrl: './factorydevice.component.html',
    styleUrls: ['./factorydevice.component.scss']
})
export class FactorydeviceComponent implements OnInit {


    pageIndex = 1;
    pageSize = 10;
    total = 0;
    tableData = [];
    loading = true;
    sortValue = null;
    sortKey = null;
    filter = 'category eq FACTORY_DEVICE';
    // isNewDevice = false;
    models:any;
    alldevice:any;
    allDeviceFull:any;
    device:any;
    @Output() isNewDevice : boolean;
    @Output() isViewDevice : boolean;
    sort(sort: { key: string, value: string }): void {
        this.sortKey = sort.key;
        this.sortValue = sort.value;
        this.getAll({'$orderby': this.sortKey + (this.sortValue === 'descend' ? " desc" : "")});
    }

    constructor(private commonService: CommonService, private assetService: AssetService, private deviceType: DeviceTypeService, private modalService: NzModalService, private topologyService: TopologyService) {
    }

    getType(type){
        return this.deviceType.getFactoryType(type);
    }

    getAll(params): any {
        this.loading = true;
        let payload = params || {};
        if (!payload['$orderby'] || payload['$orderby'] === '') {
            payload['$orderby'] = 'name';
        }
        payload['$skip'] = 10*(this.pageIndex-1);
        payload['$limit'] = 10;
        payload['$filter'] = this.filter;
        this.assetService.getAll(payload, this.commonService.topologyId).subscribe((data: any) => {
            this.loading = false;
            this.tableData = data;
        });
    }

    getCount(): any{
        this.assetService.getCount({'$filter': this.filter}, this.commonService.topologyId).subscribe((data:any) =>{
            this.total = data;
        });
    }

    ngOnInit(): void {
        this.getAll({});
        this.getCount();
    }

    newDevice(){
        forkJoin([this.assetService.getModels({
            '$select': ["modelId", "model", "model_name", "make", "protocol", "version", "firmwareVersion", "model_serialNo", "model_memo", "iconType", "numOfPorts", "subCategory"],
            '$filter': 'category eq FACTORY_DEVICE',
            '$limit': 1000000,
            '$orderby': 'model_name'
        }), this.assetService.allDevice()]).subscribe(totalData=>{
            this.models = totalData[0];
            this.models.splice(0, 0, {'modelId' : 'new', 'model_name' : '添加设备型号'});
            this.alldevice = this.getAllDevice(totalData[1]);
            this.allDeviceFull = totalData[1];
            this.isNewDevice = true;
        });
    }

    viewDeviceDetail(deviceId){
        forkJoin([this.assetService.getModels({
            '$select': ["modelId", "model", "model_name", "make", "protocol", "version", "firmwareVersion", "model_serialNo", "model_memo", "iconType", "numOfPorts", "subCategory"],
            '$filter': 'category eq FACTORY_DEVICE',
            '$limit': 1000000,
            '$orderby': 'model_name'
        }), this.assetService.allDevice(), this.assetService.get(deviceId)]).subscribe(totalData=>{
            this.models = totalData[0];
            this.models.splice(0, 0, {'modelId' : 'new', 'model_name' : '添加设备型号'});
            this.alldevice = this.getAllDevice(totalData[1]);
            this.allDeviceFull = totalData[1];
            forkJoin([
                this.assetService.getBlocksRef(totalData[2].blocksRef.baseUrl, {}),
                this.topologyService.getDeviceNodes(totalData[2].deviceId)
            ]).subscribe( (d:any) => {
                let data = this.commonService.deepCopy(totalData[2]);
                data.rules = d[0];
                data.nodes = d[1];
                data._iconName = this.assetService.getIconName(data.iconType, "");
                this.device = data;
                this.isViewDevice = true;
            });
        });
    }

    getAllDevice(data){
        let deviceIps = [];
        for (let count = 0, len = data.length; count < len; count++) {
            let ip = '', subnetIp = '', mac = '';
            for (let d = 0, len = data[count].devicePorts.length; d < len; d++) {
                if (data[count].devicePorts[d].isMgmtPort) {
                    ip = (data[count].devicePorts[d].portIp) ? data[count].devicePorts[d].portIp.split('/')[0] : '';
                    subnetIp = (data[count].devicePorts[d].portIp) ? data[count].devicePorts[d].portIp : '';
                    mac = (data[count].devicePorts[d].mac) ? data[count].devicePorts[d].mac : '';
                    break;
                }
            }
            deviceIps.push({
                deviceId: data[count].deviceId,
                category: data[count].category,
                iconType: data[count].iconType,
                ip: ip,
                subnetIp: subnetIp,
                mac: mac

            });
        }
        return deviceIps;
    }

    deleteDevice(dvc){
        this.modalService.confirm({
            nzTitle     : '删除设备' + dvc.name || dvc.nameInDetail,
            nzContent   : '<b style="color: red;">删除设备后所有分析、评估、事件与审计也会跟随拓扑改变移除。\n' +
            '\n' +
            '请在删除设备前完成备份工作，确保信息不会丢失。</b>',
            nzOkText    : '删除设备',
            // nzOkType    : 'danger',
            nzOnOk      : () => this.confirmDelete(dvc),
            nzCancelText: '取消',
            nzOnCancel  : () => console.log('Cancel')
        });
    }

    confirmDelete(device){
        forkJoin([this.topologyService.getLinks(device.topologyId), this.topologyService.getNodes()]).subscribe((d:any) => {
            let nodes = d[0].data;
            let nodeMap = {}; // 更快速的访问
            let links = d[1].data;
            let deletables = [];
            //创建注册到设备的所有节点的节点。
            for (let n = 0; n < nodes.length; n++) {
                if (nodes[n].deviceId === device.deviceId) {
                    nodeMap[nodes[n].id] = n;
                }
            }
            // 循环通过拓扑链接, 并找到可删除的链接
            for (let l = 0; l < links.length; l++) {
                if (nodeMap[links[l].nodeID] !== undefined || nodeMap[links[l].destinationNodeID] !== undefined) {
                    deletables.push({id: links[l].id});
                }
            }
            this.topologyService.deleteLink(deletables, device.topologyId).subscribe(data => {
                this.assetService.deleteOneDevice(device.deviceId).subscribe((data: any) => {

                });
            });
        });
    }

    newDeviceChange($event) {
        this.isNewDevice = $event;
        this.getAll({});
        this.getCount();
    }

    viewDetailChange($event){
        this.isViewDevice = $event;
        this.getAll({});
        this.getCount();
    }

}
