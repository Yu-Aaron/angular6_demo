import {Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {DeviceService} from '../../../common/services/device.service';
import {NzNotificationService} from 'ng-zorro-antd';
import {CommonService} from '../../../common/services/common.service';
import {FormatValService} from '../../../common/services/formatVal.service';
import {ConfigService} from '../../../common/services/config.service';
import {SseService} from '../../../common/services/sse.service';

@Component({
    selector: 'app-device',
    templateUrl: './device.component.html',
    styleUrls: ['./device.component.scss']
})

export class DeviceComponent implements OnInit {
    PLATFORM_NAME = '安全管理平台';
    topologyId: string;
    mockData = {};   //模拟数据
    editMode = {
        ipaddress: false,
        ntpSync: false,
        scheduleDelete: false,
        storage: false,
    };  //是否编辑
    confirmModal = {};   //模态框确认信息
    /**网络端口配置**/
    networkInterfaces = [];
    networkInterface = {};
    portInfo = {};
    editPortInfo = {};
    validPlatformIP = true;
    validPlatformNetMask = true;
    validPlatformGateWay = true;
    /**时钟同步**/
    serverTime: Date;
    serverTimeBackup: Date;
    localTime: Date;
    activateNtp: boolean;
    setActivateNtp: boolean;
    ntpIp: string;
    ntpIpEnter: string;
    time: any;  //计时器
    /**定期删除信息**/
    logDeletionManagement = {};
    logDeletionData: string;
    logDeletionTime: Date;
    logDeletionBackup = [];
    /**存储管理配置**/
    storageStrategy = {};
    storageStrategyTmp: string;
    storageStrategyTmpBackup: string;
    /**系统升级**/
    system = {};
    uploadFailReason = {};
    isDPIUpgrading: any;
    currentImageVersion: string;
    uploadImageFail: string;
    uploadImageSuccess: boolean;
    /**配置备份**/
    isSwitchOn = false;
    confAutoBackUp = {};
    /**备份文件**/
    confBackUpInfo = [];
    selectedItems = [];
    allChecked = false;
    indeterminate = false;
    displayData = [];

    constructor(private fb: FormBuilder,
                private notification: NzNotificationService,
                private commonService: CommonService,
                private sseService: SseService,
                private formatVal: FormatValService,
                private configService: ConfigService,
                private deviceService: DeviceService) {
    }

    ngOnInit() {

        // this.isDPIUpgrading = this.deviceService.isDPIUpgrading('');
        setTimeout(()=> {
            console.log(this.isDPIUpgrading);
        },3000);
        this.topologyId = this.commonService.topologyId;
        this.confirmModal = {
            ipaddress: {
                title: '确定修改端口配置',
                content: ['修改端口配置会导致相关路由信息被清空,设置新的网关会覆盖原有网关设置', '是否确认修改?']
            },
            networkInterfaceProgress: {
                title: '网络端口配置',
                content: ['网络端口配置中，请稍等。。。'],
                hideFooter: null
            },
            redirectProgress: {
                title: '网络端口配置',
                content: ['系统重定向中，请稍等。。。'],
                hideFooter: null
            },
            ntpSync: {
                title: '手动更改系统时间',
                content: ['手动更改系统时间会导致安全管理平台重启，请确保重要信息已经保存备份', '确定要手动更改系统时间吗?']
            },
            shutdown: {
                title: this.PLATFORM_NAME + '关机',
                content: [this.PLATFORM_NAME + '关机后，将无法从远端启动!', this.PLATFORM_NAME + '关机，会导致所有当前用户登出，请确保重要信息已经保存备份。', '确定要关闭' + this.PLATFORM_NAME + '？']
            },
            restart: {
                title: '重新启动监管平台',
                content: ['重新启动监管平台，会导致所有当前用户登出，请确保重要信息已经保存备份。', '确定要重新启动监管平台吗？']
            },
            reset: {
                title: '恢复原厂设置',
                content: ['恢复原厂设置，会导致工控网络安全集中监管平台重启，删除所有已经部署的策略和网络审计规则，停止当前的学习，并清除以往学习历史。', '确定要恢复原厂设置吗？']
            },
            showUpgrade: {
                title: '系统升级确认',
                content: ['请注意，系统升级可能会导致信息丢失。请在执行升级前确保重要信息已经保存备份。', '升级完成后，系统会重新启动，导致所有当前用户退出。']
            },
            confirmUpgrade: {
                title: '系统升级确认',
                content: ['系统升级中，请稍等。。。'],
                hideFooter: null
            },
            doConfBackUp: {
                title: '配置信息备份',
                content: [this.PLATFORM_NAME + '配置备份配置信息备份将会持续较长时间，确认开始备份？']
            },
            deleteBackUpFiles: {
                title: '删除配置信息备份',
                content: ['确定删除选中的备份文件？']
            }
        };
        this.uploadFailReason = {
            "invalid_content_size":"升级包长度不符合规格，请重新上传。", // the size of the image less than the required length
            "invalid_algorithm":"checksum算法未找到，请重试。", // checksum algorithm not found
            "invalid_checksum_size":"checksum数值不匹配，请重新上传。", // checksum field from the file less than the checksum length of the algorithm
            "invalid_checksum":"升级包的checksum数值与checksum算法结果不匹配，请重新上传。", // the checksum value from the image file doesn't match the calculated checksum
            "invalid_meta_info":"meta信息中升级包文件路径不是合法的json数据，请重新上传。",    // meta info path of the image file is not a valid json object
            "invalid_file_format":"升级包格式错误，请重新上传。", // the last two bytes of the image file doesn't match the spec value
            "disk_full":"磁盘空间不足，请清理磁盘空间后重试。", // disk space full
            "missing_version_info":"升级包版本信息缺失，请重新上传。", // the meta data doesn't have the required image version information
            "unable_to_read_file":"无法读取升级包文件，请重新上传。", // unable to read image
            "publish_error":"升级包文件下发出错，请重试。" // unable to publish image to the repository
        };
        this.deviceService.getMockJs().subscribe((data: any) => {
            this.mockData = data;
        });
        this.getNetworkInterfaces();  //网络端口配置
        this.getSystemStatus();     //时钟同步
        this.getJobStrategyInfo(); //定期删除信息
        this.getStrategyInfo();   //存储管理配置
        this.getUpgradeInfo();    //系统升级
        this.getVersion();
        this.getBackUpStrategyInfo();//配置备份
        this.getConfBackUpInfo();  //备份文件
    }

    /**** 关闭模态框 ***/
    closeModel(event, type) {
        switch (type) {
            case 'ipaddress':
                event ? this.changeIPAddress() : this.cancelIPAddress();
                break;
            case 'ntpSync':
                event ? this.changeNtpSync() : this.cancelNtpSync();
                break;
            case 'shutdown':
                event && this.shutdown();
                break;
            case 'restart':
                event && this.restart();
                break;
            case 'reset':
                event && this.reset();
                break;
            case 'showUpgrade':
                event && this.confirmUpgrade();
                break;
            case 'doConfBackUp':
                event && this.doConfBackUp();
            default:
                break;
        }
    }

    /***** 【基本设置】- 网络端口配置 start *****/
    getNetworkInterfaces() {
        this.deviceService.getNetworkInterfaces().subscribe((data: any) => {
            this.networkInterfaces = data['slotInfoList'];
            this.networkInterface = this.networkInterfaces[0];
            this.portInfo = this.networkInterface['portInfoList'][0];
            this.editPortInfo = this.commonService.deepCopy(this.portInfo);
        }, () => {
            let data = this.mockData['networkInterfaces'];
            this.networkInterfaces = data['slotInfoList'];
            this.networkInterface = this.networkInterfaces[0];
            this.portInfo = this.networkInterface['portInfoList'][0];
            this.editPortInfo = this.commonService.deepCopy(this.portInfo);
        });
    }
    ipv4_to_num(ip) {
        let arr = ip.split(".");
        return ((Number(arr[0]) << 24) | (Number(arr[1]) << 16) | (Number(arr[2]) << 8) | (Number(arr[3]) << 0)) >>> 0;
    }
    validatePlatform(editPortInfo) {
        let isNull = !editPortInfo.bondingMode && !editPortInfo.ipAddr && !editPortInfo.netMask && !editPortInfo.defaultGW;
        this.validPlatformIP = isNull || (editPortInfo.ipAddr && !this.formatVal.validateIp(editPortInfo.ipAddr));
        this.validPlatformNetMask = editPortInfo.netMask !== '0.0.0.0' && ( isNull || (editPortInfo.netMask && editPortInfo.netMask.match(this.formatVal.getIPReg()) && !this.formatVal.validateNetMask(editPortInfo.netMask)));
        this.validatePlatformGateWay(editPortInfo);
    };
    validatePlatformGateWay(editPortInfo) {
        if (!editPortInfo.defaultGW){
            this.validPlatformGateWay = true;
        } else {
            if (this.validPlatformIP && this.validPlatformNetMask && editPortInfo.defaultGW && !this.formatVal.validateIp(editPortInfo.defaultGW)){
                let ip_num = this.ipv4_to_num(editPortInfo.defaultGW);
                let subnet = ( (this.ipv4_to_num(editPortInfo.ipAddr)) & (this.
                ipv4_to_num(editPortInfo.netMask)) )>>> 0;
                let broadcast = (subnet | (~this.ipv4_to_num(editPortInfo.netMask)))>>> 0;
                this.validPlatformGateWay = (subnet<ip_num && ip_num< broadcast);
            } else {
                this.validPlatformGateWay = false;
            }
        }
    };
    showRedirectProgress() {
        this.confirmModal['redirectProgress']['isVisible'] = true;
        setTimeout(function () {
            window.location.href = 'https://' + this.editPortInfo['ipAddr'];
            this.confirmModal['redirectProgress']['isVisible'] = false;
        }, 25000);
    }
    changeNetPort(netPort) {
        this.editPortInfo = this.commonService.deepCopy(netPort);
        this.validatePlatform(netPort);
        console.log(netPort);
    }
    changeIPAddress() {
        if (this.validPlatformIP && this.validPlatformNetMask && this.validPlatformGateWay){
            if (true) {
                this.confirmModal['networkInterfaceProgress'].isVisible=true;
                setTimeout(()=>{
                    this.confirmModal['networkInterfaceProgress'].isVisible=false;
                    this.editMode['ipaddress'] = false;
                }, 3000);
                let slotNum = this.networkInterface['slotNum'];
                let portName = this.editPortInfo['portName'];
                let editInfo = {
                    pollingInterval: '',
                    bondingMode: '',
                    primaryPort: '',
                    ipAddr: this.editPortInfo['ipAddr'],
                    netMask: this.editPortInfo['netMask'],
                    defaultGW: this.editPortInfo['defaultGW']
                };
                this.deviceService.updateNetworkInterface(slotNum, portName, editInfo).subscribe((data:any) => {
                    let orignIpAddr = this.editPortInfo['ipAddr'];
                    let isCurrentIp = window.location.href.split('/')[2] === orignIpAddr;
                    if (!isCurrentIp || this.portInfo['ipAddr'] === orignIpAddr) {
                        this.notification.create('error','端口配置成功',null);
                    } else {
                        setTimeout(()=>{this.showRedirectProgress()}, 3000);
                        this.notification.create('error','端口配置成功，系统稍后会自动网址重定向。请稍等。。。',null);
                    }
                    this.networkInterface = this.networkInterfaces[0];
                    this.portInfo = this.commonService.deepCopy(this.editPortInfo);
                }, error => {
                    setTimeout(()=>{this.showRedirectProgress()}, 3000);
                    this.cancelIPAddress();
                    this.notification.error('网络端口配置失败' + (error.status == 409 ? ': IP地址冲突!': ''),null);
                });
            } else {
                this.cancelIPAddress();
                this.notification.error('系统不允许所有端口IP地址都为空或者默认网关为空！',null);
            }
        } else {
            this.cancelIPAddress();
            this.notification.error('请确认IP地址与网关在同一有效网段！',null);
        }
        this.editMode.ipaddress = false;
    }
    cancelIPAddress() {
        this.networkInterface = this.networkInterfaces[0];
        this.portInfo = this.networkInterface['portInfoList'][0];
        this.editPortInfo = this.commonService.deepCopy(this.portInfo);
        this.editMode.ipaddress = false;
    }

    /***** 【基本设置】- 时钟同步 start *****/
    getSystemStatus() {
        this.commonService.sysbaseinfo().subscribe((data: any) => {
            this.serverTime = new Date(data || '');
            this.serverTimeBackup = this.serverTime;
            this.localTime = new Date();
            this.updateClock();
        }, () => {
            let data = '2019-01-11T03:23:33.844Z';
            this.serverTime = new Date(data || '');
            this.serverTimeBackup = this.serverTime;
            this.localTime = new Date();
            this.updateClock();
        });
        this.deviceService.getSystemStatus().subscribe(function (data) {
        }, () => {
            let data = this.mockData['systemStatus'];
            this.activateNtp = data['activateNtp'];
            this.setActivateNtp = this.activateNtp;
            this.ntpIp = data['ntpIp'];
            this.ntpIpEnter = this.ntpIp;
        });
    }
    updateClock() {
        this.serverTime = new Date(this.serverTime.getTime() + 1000);
        this.localTime = new Date(this.localTime.getTime() + 1000);
        setTimeout(() => this.updateClock(), 1000);
    };
    handleDateChange() {
        this.editMode.ntpSync=true;
        this.serverTimeBackup = this.serverTime;
        this.time = setInterval(()=>{
            this.serverTimeBackup =  new Date(this.serverTimeBackup.getTime() + 1000);
            console.log(this.serverTimeBackup);
        },1000);
    }
    changeNtpSync() {
        if (this.setActivateNtp) {   //NTP自动同步
            this.deviceService.updateNtpSync(this.ntpIpEnter, this.setActivateNtp).subscribe((data:any)=> {
                clearInterval(this.time);
                this.ntpIp = this.ntpIpEnter;
                this.activateNtp = true;
                this.notification.success('时钟同步设置成功！',null);
            },() => {
                this.cancelNtpSync();
                this.notification.error('时钟同步设置失败！',null);
            })
        } else {  //手动输入时间
            let time = this.serverTime.toISOString().substring(0, 19)+"Z";
            this.deviceService.setSystemTime(time).subscribe(() => {
                clearInterval(this.time);  //成功后清除计时器
                this.ntpIpEnter = this.ntpIp;
                this.activateNtp = false;
                this.deviceService.updateNtpSync(this.ntpIp, false).subscribe();
                let timeoutPromise = setInterval(() => {
                    this.commonService.sysbaseinfo().subscribe(() =>{
                        clearInterval(timeoutPromise);
                        window.location.reload();
                    });
                }, 10000, 12);
            },() => {
                this.cancelNtpSync(); //失败
                this.notification.error('时钟同步设置失败！',null);
            })
        }
        this.editMode.ntpSync = false;
    }
    cancelNtpSync() {
        clearInterval(this.time);
        this.serverTime = this.serverTimeBackup;
        this.ntpIpEnter = this.ntpIp;
        this.setActivateNtp = this.activateNtp;
        this.editMode.ntpSync = false;
    }

    /***** 【基本设置】- 定期删除信息 start *****/
    getJobStrategyInfo() {
        this.deviceService.getJobStrategyInfo('LOG_DELETION').subscribe((data: any) => {
            let timer = data['schedulingJobMeta'][0];
            let date = new Date();
            let utc = Date.UTC(date.getFullYear(), date.getMonth() + 1, date.getDate(), timer.hour, timer.minute, timer.second);
            this.logDeletionManagement = data;
            this.logDeletionData = data['schedulingJob'].jobData;
            this.logDeletionTime = new Date(utc);
            this.logDeletionBackup = [this.logDeletionData, this.logDeletionTime.valueOf()];
        }, () => {
            let data = this.mockData['jobStrategyInfo'];
            let timer = data['schedulingJobMeta'][0];
            let date = new Date();
            let utc = Date.UTC(date.getFullYear(), date.getMonth() + 1, date.getDate(), timer.hour, timer.minute, timer.second);
            this.logDeletionManagement = data;
            this.logDeletionData = data['schedulingJob'].jobData;
            this.logDeletionTime = new Date(utc);
            this.logDeletionBackup = [this.logDeletionData, this.logDeletionTime.valueOf()];
        });
    }
    changeScheduleDelete() {
        let logDeletionTime = new Date(this.logDeletionTime.valueOf());
        this.logDeletionManagement['schedulingJob']['jobData'] = this.logDeletionData;
        logDeletionTime.setHours(logDeletionTime.getHours() + Math.round(logDeletionTime.getTimezoneOffset()/60));
        this.logDeletionManagement['schedulingJobMeta'][0]['hour'] = logDeletionTime.getHours().toString();
        this.logDeletionManagement['schedulingJobMeta'][0]['minute'] = logDeletionTime.getMinutes().toString();
        this.deviceService.updateStradegyJobBuilder(this.logDeletionManagement).subscribe((data:any) => {
            this.logDeletionBackup = [this.logDeletionData, this.logDeletionTime.valueOf()];
            this.editMode.scheduleDelete = false;
            this.notification.error('定期删除信息更改失败！',null);
        }, () => {
            this.cancelScheduleDelete();
            this.notification.error('定期删除信息更改失败！',null);
        });
    }
    cancelScheduleDelete() {
        this.logDeletionData = this.logDeletionBackup[0];
        this.logDeletionTime = new Date(this.logDeletionBackup[1]);
        this.editMode.scheduleDelete = false;
    }

    /***** 【基本设置】- 存储管理配置 start *****/
    getStrategyInfo() {
        this.deviceService.getStrategyInfo().subscribe((data: any) => {
            data.forEach(el => {
                if (el.strategyInfo.strategyCode === 'STORAGE_MANAGEMENT') {
                    this.storageStrategy = el;
                    this.storageStrategyTmp = el.strategyRules[0].ruleData;
                    this.storageStrategyTmpBackup = this.storageStrategyTmp;
                }
            });
        }, () => {
            let data = this.mockData['strategyInfo'];
            data.forEach(el => {
                if (el.strategyInfo.strategyCode === 'STORAGE_MANAGEMENT') {
                    this.storageStrategy = el;
                    this.storageStrategyTmp = el.strategyRules[0].ruleData;
                    this.storageStrategyTmpBackup = this.storageStrategyTmp;
                }
            });
        });
    }
    changeStorageStatus() {
        this.deviceService.updateStorageInfo(this.storageStrategyTmp).subscribe((data: any) => {
            this.storageStrategyTmpBackup = this.storageStrategyTmp;
            this.editMode.storage = false;
            this.notification.success('存储管理配置更改成功！',null);
        }, () => {
            this.cancelStorageStatus();
            this.notification.error('存储管理配置更改失败！',null);
        });
    }
    cancelStorageStatus() {
        this.storageStrategyTmp = this.storageStrategyTmpBackup;
        this.editMode.storage = false;
    }

    /***** 【系统重置】- 系统关机和重启 start *****/
    redirectToMainPage() {
        setTimeout(() => {
            this.commonService.sysbaseinfo().subscribe(() => {
                window.location.reload();
            }, () => {
                this.redirectToMainPage();
            });
        }, 5000);
    };
    shutdown() {
        this.deviceService.shutdownSystem('0').subscribe(() => {
            this.notification.success('工控网络安全集中监管平台会在5秒后关机。', null);
        }, () => {
            this.notification.error('系统关机失败！', null);
        });
    }
    restart() {
        this.deviceService.restartSystem(this.topologyId).subscribe(() => {
            this.notification.success('系统会在十秒后开始重启。请稍等。。。', null);
            setTimeout(() => {this.redirectToMainPage()}, 10000);
        },() => {
            this.notification.error('系统重启失败！', null);
        });
    }

    /***** 【系统重置】- 恢复原厂设置 start *****/
    reset() {
        this.deviceService.resetSystem(this.topologyId).subscribe(() => {
            this.notification.success('系统会在十秒后开始恢复原厂设置。请稍等。。。', null);
            setTimeout(() => {this.redirectToMainPage()}, 10000);
        },() => {
            this.notification.error('恢复原厂设置失败！', null);
        });
    }

    /***** 【系统升级】- 系统升级 start *****/
    getUpgradeInfo() {
        this.deviceService.getSerialNumber().subscribe(data => {
            this.system['serialNumber'] = data;
        }, () => {
            this.system['serialNumber'] = '*********';
        });
        this.deviceService.getLastUpgrade().subscribe(data => {
            this.system['lastUpgrade'] = (data && data['updatedAt']) ? new Date(data['updatedAt']) : null;
        }, () => {
            let data = this.mockData['lastUpgrade'];
            this.system['lastUpgrade'] = (data && data['updatedAt']) ? new Date(data['updatedAt']) : null;
        });
    }
    getVersion() {
        this.configService.getVersion().subscribe((data: string) => {
            this.currentImageVersion = data;
        });
    }
    confirmUpgrade() {
        this.confirmModal['confirmUpgrade'].isVisible = true;
        this.deviceService.startUpgrade().subscribe((response:any) => {
            if (response && response['status'] === 202){
                let asynchUrl = response.headers('Location');
                asynchUrl = asynchUrl.replace(/http/, "https");

                let requestMW = setInterval(() => {
                    if (!window.navigator.onLine){
                        clearInterval(requestMW);
                        setTimeout(() => {
                            this.confirmModal['confirmUpgrade'].isVisible = false;
                            this.notification.error('无法连接到工控网络安全集中监管平台服务器,请确认网络连接！', null);
                        }, 5000);
                    } else {
                        this.deviceService.getServerStatus().subscribe(() => {
                            this.deviceService.freshUpgradeStatus(asynchUrl).subscribe((response:any) => {
                                if (response.status !== 202){
                                    clearInterval(requestMW);
                                    setTimeout(() => {this.confirmModal['confirmUpgrade'].isVisible = false},5000);
                                }
                            }, () => {
                                clearInterval(requestMW);
                                setTimeout(() => {this.confirmModal['confirmUpgrade'].isVisible = false},5000);
                            });
                        }, () => {
                            clearInterval(requestMW);
                            this.confirmModal['confirmUpgrade'].isVisible = false;
                            this.notification.error('无法连接到工控网络安全集中监管平台服务器!', null);
                        });
                    }
                }, 5000);
            } else {
                setTimeout(() => {this.confirmModal['confirmUpgrade'].isVisible = false},5000);
            }
        }, () => {
            setTimeout(() => {this.confirmModal['confirmUpgrade'].isVisible = false},5000);
        });
    }
    compareVersion(current, upload) {
        return current && upload && current[0]<=upload[0] && current[2] <= upload[2];
    }
    handleChange(response) {
        console.log(response);
        if (response.type === 'error'){
            this.uploadImageFail = this.uploadFailReason[response.reason] ? this.uploadFailReason[response.reason] : '升级包文档格式错误或上传时发生错误，请重新上传。';
        } else {
            this.uploadImageSuccess = true;
            let uploadImageVersion = response.file.name.substr(3, 3);
            this.uploadImageSuccess = this.compareVersion(this.currentImageVersion, uploadImageVersion);
            if (!this.uploadImageSuccess){
                this.uploadImageFail = '升级包版本低于当前系统版本，请重新上传。';
            }
        }
    }

    /***** 【系统备份】- 配置备份 start *****/
    getBackUpStrategyInfo() {
        let payload = "CONF_BACKUP_MW";
        this.deviceService.getJobStrategyInfo(payload).subscribe((data:any) => {
            if (data){
                this.confAutoBackUp = data;
                this.isSwitchOn = data['schedulingJob'].jobData ==="1";
            }
        }, () => {
            let data = this.mockData['confAutoBackUp'];
            this.confAutoBackUp = data;
            this.isSwitchOn = data['schedulingJob'].jobData !=="1"; //关闭：1 false  开启：0  true
        });
    }
    switchBackUpStrategy(status) {
        this.isSwitchOn = status;
        this.confAutoBackUp['schedulingJob'].jobData = status ? '0' : '1';
        this.deviceService.updateStradegyJobBuilder(this.confAutoBackUp).subscribe();
    }
    doConfBackUp() {
        this.sseService.createObservableSse('https://192.168.1.176/sse/UPDATE?X-Atmosphere-tracking-id=77520948-2408-479c-9929-ddb863debdd6&X-Atmosphere-Framework=2.2.7-javascript&X-Atmosphere-Transport=polling&Content-Type=application%2Fjson&_=1548818613565').subscribe();
    }

    /***** 【系统备份】- 备份文件 start *****/
    getConfBackUpInfo() {
        this.deviceService.getConfBackUpInfo({$filter: 'infoType eq MW', $limit: 10, $skip: 0}).subscribe((data: any) => {
            this.confBackUpInfo = data;
        }, () => {
            this.confBackUpInfo = this.mockData['confBackUpInfo'];
            // this.notification.error( error.status, error.statusText);
        });
    }
    deleteBackUpFiles() {
    }
    currentPageDataChange($event): void {
        this.displayData = $event;
        this.refreshStatus();
    }
    refreshStatus(): void {
        const allChecked = this.confBackUpInfo.filter(value => !value.disabled).every(value => value.checked === true);
        const allUnChecked = this.confBackUpInfo.filter(value => !value.disabled).every(value => !value.checked);
        this.allChecked = allChecked;
        this.indeterminate = (!allChecked) && (!allUnChecked);
    }
    checkAll(value: boolean): void {
        this.confBackUpInfo.forEach(data => {
            if (!data.disabled) {
                data.checked = value;
            }
        });
        this.refreshStatus();
    }

}
