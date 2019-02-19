import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {DeviceService} from '../../../common/services/device.service';
import {NzNotificationService} from 'ng-zorro-antd';
import {CommonService} from '../../../common/services/common.service';
import {FormatValService} from '../../../common/services/formatVal.service';
import {ConfigService} from '../../../common/services/config.service';
import {SseService} from '../../../common/services/sse.service';
import {PagesComponent} from '../../pages.component';
import {Router} from '@angular/router';

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
    confirmModal = {}; //模态框确认信息
    
    //网络端口配置
    networkInterfaces = [];
    networkInterface = {};
    portInfo = {};
    editPortInfo = {};
    validPlatformIP = true;
    validPlatformNetMask = true;
    validPlatformGateWay = true;
    
    //时钟同步
    serverTime: Date;
    serverTimeBackup: Date;
    localTime: Date;
    isDisabled: boolean;
    activateNtp = false;
    setActivateNtp = false;
    ntpIp: string;
    ntpIpEnter: string;
    time: any;  //计时器
    
    //定期删除信息
    logDeletionManagement = {};
    logDeletionData: string;
    logDeletionTime: Date;
    logDeletionBackup = [];
    
    //存储管理配置
    storageStrategy = {};
    storageStrategyTmp: string;
    storageStrategyTmpBackup: string;
    
    //系统升级
    system = {};
    fileList = [];
    uploadFailReason = {};
    requestMW: any;
    isDPIUpgrading: boolean;
    currentImageVersion: string;
    uploadImageFail: string;
    uploadImageSuccess: boolean;
    
    //配置备份
    isSwitchOn = false;
    isBackUp = false;
    target = 'MW';
    confAutoBackUp = {};

    //备份文件
    confBackUpInfo = [];
    selectedItems = [];
    allChecked = false;
    displayData = [];
    confBackUpCount: number;
    pageSize = 10;
    pageIndex: number;
    pageTotalNumber: number;
    loading: boolean;

    constructor(@Inject(PagesComponent) private pagesComponent:any,
                private fb: FormBuilder,
                private router: Router,
                private notification: NzNotificationService,
                private commonService: CommonService,
                private sseService: SseService,
                private formatVal: FormatValService,
                private configService: ConfigService,
                private deviceService: DeviceService) {
    }

    ngOnInit() {
        this.topologyId = this.commonService.topologyId;
        this.confirmModal = {
            ipaddress: {
                title: '确定修改端口配置',
                content: ['修改端口配置会导致相关路由信息被清空，设置新的网关会覆盖原有网关设置', '是否确认修改?']
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
            upgradeSuccess: {
                title: '系统升级成功',
                content: [this.PLATFORM_NAME + '正在重新启动中。重启后，系统页面会自动刷新。','<nz-spin></nz-spin>'],
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
            'invalid_content_size': '升级包长度不符合规格，请重新上传。', //the size of the image less than the required length
            'invalid_algorithm': 'checksum算法未找到，请重试。', //checksum algorithm not found
            'invalid_checksum_size': 'checksum数值不匹配，请重新上传。', //checksum field from the file less than the checksum length of the algorithm
            'invalid_checksum': '升级包的checksum数值与checksum算法结果不匹配，请重新上传。', //the checksum value from the image file doesn't match the calculated checksum
            'invalid_meta_info': 'meta信息中升级包文件路径不是合法的json数据，请重新上传。',    //meta info path of the image file is not a valid json object
            'invalid_file_format': '升级包格式错误，请重新上传。', //the last two bytes of the image file doesn't match the spec value
            'disk_full': '磁盘空间不足，请清理磁盘空间后重试。', //disk space full
            'missing_version_info': '升级包版本信息缺失，请重新上传。', //the meta data doesn't have the required image version information
            'unable_to_read_file': '无法读取升级包文件，请重新上传。', //unable to read image
            'publish_error': '升级包文件下发出错，请重试。' //unable to publish image to the repository
        };
        this.deviceService.getMockJs().subscribe((data: any) => {
            this.mockData = data;
        });
        this.getNetworkInterfaces();  //网络端口配置
        this.getSystemStatus();     //时钟同步
        this.getJobStrategyInfo(); //定期删除信息
        this.getStrategyInfo();   //存储管理配置
    }

    //关闭模态框
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

    //【基本设置】- 网络端口配置
    getNetworkInterfaces() {
        this.deviceService.getNetworkInterfaces().subscribe((data: any) => {
            this.networkInterfaces = data['slotInfoList'];
            this.networkInterface = this.networkInterfaces[0];
            this.portInfo = this.networkInterface['portInfoList'][0];
            this.editPortInfo = this.commonService.deepCopy(this.portInfo);
        });
    }
    ipv4_to_num(ip) {
        let arr = ip.split('.');
        return ((Number(arr[0]) << 24) | (Number(arr[1]) << 16) | (Number(arr[2]) << 8) | (Number(arr[3]) << 0)) >>> 0;
    }
    validatePlatform(editPortInfo) {
        let isNull = !editPortInfo.bondingMode && !editPortInfo.ipAddr && !editPortInfo.netMask && !editPortInfo.defaultGW;
        this.validPlatformIP = isNull || (editPortInfo.ipAddr && !this.formatVal.validateIp(editPortInfo.ipAddr));
        this.validPlatformNetMask = editPortInfo.netMask !== '0.0.0.0' && (isNull || (editPortInfo.netMask && editPortInfo.netMask.match(this.formatVal.getIPReg()) && !this.formatVal.validateNetMask(editPortInfo.netMask)));
        this.validatePlatformGateWay(editPortInfo);
    };
    validatePlatformGateWay(editPortInfo) {
        if (!editPortInfo.defaultGW) {
            this.validPlatformGateWay = true;
        } else {
            if (this.validPlatformIP && this.validPlatformNetMask && editPortInfo.defaultGW && !this.formatVal.validateIp(editPortInfo.defaultGW)) {
                let ip_num = this.ipv4_to_num(editPortInfo.defaultGW);
                let subnet = ((this.ipv4_to_num(editPortInfo.ipAddr)) & (this.ipv4_to_num(editPortInfo.netMask))) >>> 0;
                let broadcast = (subnet | (~this.ipv4_to_num(editPortInfo.netMask))) >>> 0;
                this.validPlatformGateWay = (subnet < ip_num && ip_num < broadcast);
            } else {
                this.validPlatformGateWay = false;
            }
        }
    };
    showRedirectProgress() {
        this.confirmModal['redirectProgress'].isVisible = true;
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
        if (this.validPlatformIP && this.validPlatformNetMask && this.validPlatformGateWay) {
            if (true) {
                this.confirmModal['networkInterfaceProgress'].isVisible = true;
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
                this.deviceService.updateNetworkInterface(slotNum, portName, editInfo).subscribe((data: any) => {
                    let orignIpAddr = this.editPortInfo['ipAddr'];
                    let isCurrentIp = window.location.href.split('/')[2] === orignIpAddr;
                    //当前地址与MGT地址不一致时 或  当前地址与MGT地址，编辑前后ipAddr值一致时
                    if (!isCurrentIp || this.portInfo['ipAddr'] === orignIpAddr) {
                        this.networkInterface = this.networkInterfaces[0];
                        this.networkInterface['portInfoList'][0] = this.commonService.deepCopy(this.editPortInfo);
                        this.portInfo = this.networkInterface['portInfoList'][0];
                        setTimeout(() => {
                            this.editMode.ipaddress = false;
                            this.confirmModal['networkInterfaceProgress'].isVisible = false;
                            this.notification.success('端口配置成功', null);
                        }, 3000);
                    } else {
                        this.notification.success('端口配置成功，系统稍后会自动网址重定向。请稍等。。。', null);
                        setTimeout(() => {
                            this.confirmModal['networkInterfaceProgress'].isVisible = false;
                            this.showRedirectProgress();
                        }, 3000);
                    }
                }, error => {
                    this.cancelIPAddress();
                    this.notification.error('网络端口配置失败' + (error.status == 409 ? ': IP地址冲突!' : ''), null);
                });
            } else {
                this.cancelIPAddress();
                this.notification.error('系统不允许所有端口IP地址都为空或者默认网关为空！', null);
            }
        } else {
            this.cancelIPAddress();
            this.notification.error('请确认IP地址与网关在同一有效网段！', null);
        }
    }
    cancelIPAddress() {
        this.networkInterface = this.networkInterfaces[0];
        this.portInfo = this.networkInterface['portInfoList'][0];
        this.editPortInfo = this.commonService.deepCopy(this.portInfo);
        this.editMode.ipaddress = false;
        this.confirmModal['networkInterfaceProgress'].isVisible = false;
    }

    //【基本设置】- 时钟同步 
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
        this.deviceService.getSystemStatus().subscribe( (data: any) => {
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
        this.editMode.ntpSync = true;
        this.serverTimeBackup = this.serverTime;
        this.time = setInterval(() => {
            this.serverTimeBackup = new Date(this.serverTimeBackup.getTime() + 1000);
        }, 1000);
    }
    changeNtpSync() {
        this.pagesComponent.timeoutPromise = true;  //显示服务器设置部署中
        if (this.setActivateNtp) {   //NTP自动同步
            this.deviceService.updateNtpSync(this.ntpIpEnter, this.setActivateNtp).subscribe((data: any) => {
                clearInterval(this.time);
                this.pagesComponent.timeoutPromise = false;
                this.ntpIp = this.ntpIpEnter;
                this.activateNtp = true;
                this.notification.success('时钟同步设置成功！', null);
            }, () => {
                this.cancelNtpSync();
                this.pagesComponent.timeoutPromise = false;
                this.notification.error('时钟同步设置失败！', null);
            });
        } else {  //手动输入时间
            let time = this.serverTime.toISOString().substring(0, 19) + 'Z';
            this.deviceService.setSystemTime(time).subscribe(() => {
                clearInterval(this.time);  //成功后清除计时器
                this.ntpIpEnter = this.ntpIp;
                this.activateNtp = false;
                this.deviceService.updateNtpSync(this.ntpIp, false).subscribe();
                let timeoutPromise = setInterval(() => {
                    this.commonService.sysbaseinfo().subscribe(() => {
                        clearInterval(timeoutPromise);
                        this.pagesComponent.timeoutPromise = false;
                        window.location.reload();
                    });
                }, 10000, 12);
            }, () => {
                this.cancelNtpSync(); //失败
                this.pagesComponent.timeoutPromise = false;
                this.notification.error('时钟同步设置失败！', null);
            });
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

    //【基本设置】- 定期删除信息 
    getJobStrategyInfo() {
        this.deviceService.getJobStrategyInfo('LOG_DELETION').subscribe((data: any) => {
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
        logDeletionTime.setHours(logDeletionTime.getHours() + Math.round(logDeletionTime.getTimezoneOffset() / 60));
        this.logDeletionManagement['schedulingJobMeta'][0]['hour'] = logDeletionTime.getHours().toString();
        this.logDeletionManagement['schedulingJobMeta'][0]['minute'] = logDeletionTime.getMinutes().toString();
        this.deviceService.updateStradegyJobBuilder(this.logDeletionManagement).subscribe((data: any) => {
            this.logDeletionBackup = [this.logDeletionData, this.logDeletionTime.valueOf()];
            this.editMode.scheduleDelete = false;
            this.notification.success('定期删除信息更改成功！', null);
        }, () => {
            this.cancelScheduleDelete();
            this.notification.error('定期删除信息更改失败！', null);
        });
    }
    cancelScheduleDelete() {
        this.logDeletionData = this.logDeletionBackup[0];
        this.logDeletionTime = new Date(this.logDeletionBackup[1]);
        this.editMode.scheduleDelete = false;
    }

    //【基本设置】- 存储管理配置 
    getStrategyInfo() {
        this.deviceService.getStrategyInfo().subscribe((data: any) => {
            data.forEach(el => {
                if (el.strategyInfo.strategyCode === 'STORAGE_MANAGEMENT') {
                    this.storageStrategy = el.strategyRules[0];
                    this.storageStrategyTmp = el.strategyRules[0].ruleData;
                    this.storageStrategyTmpBackup = this.storageStrategyTmp;
                }
            });
        });
    }
    changeStorageStatus() {
        this.storageStrategy['ruleData'] = this.storageStrategyTmp;
        this.deviceService.updateStorageInfo(this.storageStrategy).subscribe((data: any) => {
            this.storageStrategyTmpBackup = this.storageStrategyTmp;
            this.editMode.storage = false;
            this.notification.success('存储管理配置更改成功！', null);
        }, () => {
            this.cancelStorageStatus();
            this.notification.error('存储管理配置更改失败！', null);
        });
    }
    cancelStorageStatus() {
        this.storageStrategyTmp = this.storageStrategyTmpBackup;
        this.storageStrategy['ruleData'] = this.storageStrategyTmp;
        this.editMode.storage = false;
    }

    //【系统重置】- 系统关机和重启 
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
            setTimeout(() => {
                this.redirectToMainPage();
            }, 5000);
        }, () => {
            this.notification.error('系统重启失败！', null);
        });
    }
    redirectToMainPage() {
        setTimeout(() => {
            this.commonService.sysbaseinfo().subscribe(() => {
                window.location.reload();
            }, () => {
                this.redirectToMainPage();
            });
        }, 5000);
    };

    //【系统重置】- 恢复原厂设置 
    reset() {
        this.deviceService.resetSystem(this.topologyId).subscribe(() => {
            this.notification.success('系统会在十秒后开始恢复原厂设置。请稍等。。。', null);
            setTimeout(() => {
                this.redirectToMainPage();
            }, 5000);
        }, () => {
            this.notification.error('恢复原厂设置失败！', null);
        });
    }

    //【系统升级】- 系统升级 
    getUpgradeInfo() {
        this.checkDPIUpgrading();
        this.getSerialNumber();
        this.getVersion();
        this.getLastUpgrade();
    }
    checkDPIUpgrading() {
        this.deviceService.isDPIUpgrading().subscribe((data: any) => {
            for (let i = 0; i < data.length; i++) {
                if (data[i].state !== 'NONE' && !data[i].error) {
                    this.isDPIUpgrading = true;
                }
            }
            this.isDPIUpgrading = false;
        });
    }
    getSerialNumber() {
        this.deviceService.getSerialNumber().subscribe(data => {
            this.system['serialNumber'] = data['serialNumber'];
        });
    }
    getLastUpgrade() {
        this.deviceService.getLastUpgrade().subscribe(data => {
            this.system['lastUpgrade'] = (data && data['updatedAt']) ? new Date(data['updatedAt']) : null;
        });
    }
    getVersion() {
        this.configService.getVersion().subscribe((data: string) => {
            this.currentImageVersion = data;
        });
    }
    upLoadFile(response) {
        if (response.type === 'start') {
            this.fileList = [];
            this.fileList[0] = response.file;
        } else if (response.type === 'error') {
            this.uploadImageFail = this.uploadImageFail || this.uploadFailReason[response.reason] || '升级包文档格式错误或上传时发生错误，请重新上传。';
        } else {
            this.uploadImageSuccess = true;
            let uploadImageVersion = response.file.name.substr(3, 3);
            this.uploadImageSuccess = this.compareVersion(this.currentImageVersion, uploadImageVersion);
            if (!this.uploadImageSuccess) {
                this.uploadImageFail = '升级包版本低于当前系统版本，请重新上传。';
            }
        }
    }
    confirmUpgrade() {
        this.confirmModal['confirmUpgrade'].isVisible = true;
        this.deviceService.startUpgrade().subscribe((response: any) => {
            if (response && response['status'] === 202) {
                let asynchUrl = response.url.replace(/http/, 'https');
                this.requestMW = setInterval(() => {
                    if (!window.navigator.onLine) {
                        this.showUpgradeResponseModal(false, '无法连接到工控网络安全集中监管平台服务器,请确认网络连接！');
                        return;
                    }
                    this.deviceService.getServerStatus().subscribe(() => {
                        this.deviceService.freshUpgradeStatus(asynchUrl).subscribe((response: any) => {
                            response.status !== 202 && this.showUpgradeResponseModal(!response.error, '系统升级时出现错误。请检查升级包后重新升级。');
                        }, () => {
                            this.showUpgradeResponseModal(false, '系统升级时出现错误。请检查升级包后重新升级。');
                        });
                    }, () => {
                        this.showUpgradeResponseModal(false, '无法连接到工控网络安全集中监管平台服务器!');
                    });
                }, 5000);
            } else {
                this.showUpgradeResponseModal(false, '系统升级时出现错误。请检查升级包后重新升级。');
            }
        }, () => {
            this.showUpgradeResponseModal(false, '系统升级时出现错误。请检查升级包后重新升级。');
        });
    }
    compareVersion(current, upload) {
        return current && upload && current[0] <= upload[0] && current[2] <= upload[2];
    }
    showUpgradeResponseModal(response, errorMsg) {
        if (response) {
            clearInterval(this.requestMW);
            setTimeout(() => {
                this.confirmModal['confirmUpgrade'].isVisible = false; //关闭升级模态框
                this.confirmModal['upgradeSuccess'].isVisible = true; //打开重启模态框
                //正在重新启动中
                let pingMW = setInterval(() => {
                    this.commonService.sysbaseinfo().subscribe((response:any) => {
                        if (response.status === 200){
                            window.location.href = '/';
                            clearInterval(pingMW);
                            this.confirmModal['upgradeSuccess'].isVisible = false;
                        }
                    }, () => {
                        clearInterval(pingMW);
                        this.confirmModal['upgradeSuccess'].isVisible = false;
                    });
                }, 5000);
            }, 5000);
        } else {
            this.requestMW && clearInterval(this.requestMW);
            setTimeout(() => {
                this.notification.error('系统升级失败!', errorMsg);
                this.confirmModal['confirmUpgrade'].isVisible = false;
            }, 5000);
        }
    }


    //【系统备份】- 配置备份 
    initBackUp() {
        this.getBackUpStrategyInfo();
        this.pageIndex = 1;
        this.getConfBackUpInfo();
    }
    getBackUpStrategyInfo() {
        let payload = 'CONF_BACKUP_' + this.target;
        this.deviceService.getJobStrategyInfo(payload).subscribe((data: any) => {
            if (data) {
                this.confAutoBackUp = data;
                this.isSwitchOn = data['schedulingJob'].jobData === '1';
            }
        });
    }
    //开启或关闭自动备份
    switchBackUpStrategy(status) {
        this.isSwitchOn = status;
        this.confAutoBackUp['schedulingJob'].jobData = status ? '0' : '1';
        this.deviceService.updateStradegyJobBuilder(this.confAutoBackUp).subscribe();
    }
    //手动备份
    doConfBackUp() {
        this.isBackUp = true;
        let payload = {
            infoType: this.target,
            infoCollectionType: 'CONF_BACKUP'
        };
        this.deviceService.doConfBackUp(payload).subscribe(() => {
            this.sseService.deviceEmit.subscribe((data:any) => {
                if (data.content.name === 'mw') {
                    setTimeout(() => {
                        this.checkConfBackup(5, data.content.taskId);
                    }, 1000);
                }
            });
        }, (err:any) => {
            this.notification.error('配置备份失败!', err['rejectReason'] ? err['rejectReason'] : null);
            setTimeout(()=>{this.isBackUp = false;}, 5000);
        });
    }
    //备份处理中
    checkConfBackup(counter, taskId) {
        this.deviceService.getTask(taskId).subscribe((data:any) => {
            if (data.state === 'SUCCESS') {
                this.isBackUp = false;
                this.notification.success('配置备份成功!', data.reason ? data.reason : null);
                this.getConfBackUpInfo();
                return;
            } else if (data.state === 'FAILED') {
                this.isBackUp = false;
                this.notification.error('配置备份失败!', data.reason ? data.reason : null);
                return;
            } else {
                this.isBackUp = false;
                this.notification.error('无法获取配置备份任务结果，请联系管理员。', null);
            }
        });
    }

    //【系统备份】- 备份文件 
    getConfBackUpInfo() {
        this.loading = true;
        let params = {
            '$filter': 'infoType eq MW',
            '$skip': (this.pageIndex - 1) * this.pageSize,
            '$limit': this.pageSize
        };
        this.deviceService.getConfBackUpInfo(params).subscribe((data: any) => {
            this.confBackUpInfo = data;
            this.getConfBackUpInfoCount();
            this.loading = false;
        }, () => {
            this.loading = false;
        });
    }
    getConfBackUpInfoCount() {
        this.deviceService.getConfBackUpInfoCount({$filter: 'infoType eq MW'}).subscribe((data: any) => {
            this.confBackUpCount = data;
            this.pageTotalNumber = Math.ceil(this.confBackUpCount / this.pageSize);
        });
    }
    pageIndexChange() {
        this.pageIndex > 0 && this.getConfBackUpInfo();
    }
    refreshStatus(): void {
        if (this.confBackUpInfo.length<1) {return};
        this.selectedItems = [];
        this.confBackUpInfo.forEach(value => {
            if (value.checked) {
                this.selectedItems.push(value.backupFileInfoId);
            }
        });
        this.allChecked = this.confBackUpInfo.every(value => value.checked === true);
    }
    checkAll(value: boolean): void {
        this.confBackUpInfo.forEach(data => {
            data.checked = value;
        });
        this.refreshStatus();
    }
    deleteBackUpFiles() {
        if (this.selectedItems.length > 0) {
            this.deviceService.deleteBackUpFiles(this.selectedItems).subscribe((data:any) => {
                if (data) {
                    this.getConfBackUpInfo();
                    this.getConfBackUpInfoCount();
                    this.notification.success('文件删除成功', null);
                } else {
                    this.notification.error('文件删除失败', null);
                }
            }, () => {
                this.notification.error('文件删除失败', null);
            });
        } else {
            this.notification.warning('请至少选中一个文件', null);
        }
    }

}
