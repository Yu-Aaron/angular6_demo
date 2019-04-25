import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/common/service/common.service';
import { StrategyService } from 'src/app/common/service/strategy.service';
import { forkJoin } from 'rxjs';
import { NzNotificationService } from 'ng-zorro-antd';
import { TaskService } from 'src/app/common/service/task.service';

@Component({
  selector: 'app-securitydomain',
  templateUrl: './securitydomain.component.html',
  styleUrls: ['./securitydomain.component.scss']
})
export class SecuritydomainComponent implements OnInit {
  domain = {
    data: [],
    total: 0,
    loading: false,
    pageIndex: 1,
    pageSize: 10,
    pages: 1
  };
  createOrEditModal = {
    modalFlag: false, //  新增编辑模态框显示标志
    modalTitle: '',   //  新增编辑模态框标题
    type: '',         //  新增还是编辑
    isOkLoading: false
  };

  ids = [];
  auditPolicies = [];
  unrelatedPorts = [];

  disabledSubmit = true;

  securityDomainEnable = {
    modalFlag: false,
    title: '',
    confirm: false,
    type: '',
    securityAreaName: [],
    securityArea: {}
  };
  sourceSecurityArea = {
    area: {},
    index: -1
  };

  securityArea = {
    auditPolicyId: '',
    name: '',
    ports: [],
    securityAreaUniqueNumber: ''
  };

  constructor(
    public commonSerivce: CommonService,
    public strategyService: StrategyService,
    public notification: NzNotificationService,
    public taskService: TaskService
  ) {
  }

  ngOnInit() {
    this.getDomainData();
  }

  getDomainData() {
    this.domain.loading = true;
    let params = { '$limit': this.domain.pageSize, '$skip': (this.domain.pageIndex - 1) * 10 };
    if (params && (params['$orderby'] === undefined || params['$orderby'] === '')) {
      params['$orderby'] = 'createdAt desc';
    }
    this.strategyService.getSecurityDomainAll(params).subscribe((data: any) => {
      this.domain.data = data;
      this.domain.total = this.domain.data.length;
      this.domain.pages = Math.ceil(this.domain.total / this.domain.pageSize);
      this.domain.loading = false;
    }, (error) => {
      this.domain.data = [];
      this.domain.total = 0;
      this.domain.pages = 1;
      this.domain.loading = false;
    });
  }

  showModal(flag, type?, securityArea?) {
    if (flag) { // 打开模态框
      if (type === 'create') {
        forkJoin(
          this.strategyService.getIds(),
          this.strategyService.getMaxId()
        ).subscribe((data: any) => {
          if (data[0] && data[0].length > 0) {
            this.initModal(type);
            this.createOrEditModal.modalTitle = '新增安全域';
            this.createOrEditModal.modalFlag = true;
            this.createOrEditModal.type = 'create';
          } else {
            this.notification.create('error', `系统最多保存${data[1]}个安全域，目前已达上限`, '');
            this.createOrEditModal.modalFlag = false;
            this.createOrEditModal.type = '';
          }
        });
      } else if (type === 'edit') {
        this.initModal(type, securityArea);
        this.createOrEditModal.modalTitle = '编辑安全域';
        this.createOrEditModal.modalFlag = true;
        this.createOrEditModal.type = 'edit';
      }
    } else {// 关闭模态框
      this.createOrEditModal.modalFlag = false;
      this.createOrEditModal.type = '';
      this.securityArea = {
        auditPolicyId: '',
        name: '',
        ports: [],
        securityAreaUniqueNumber: ''
      };
    }
  }

  initModal(type, securityArea?) {
    forkJoin(
      this.strategyService.getIds(),
      this.strategyService.getAllStrategy({ '$limit': '' }),
      this.strategyService.getUnrelatedPorts()
    ).subscribe((data: any) => {
      if (data) {
        let selectedmodel = [];
        data[2].forEach(function (item) {
          selectedmodel.push({ id: item.portName, label: item.portName });
        });
        if (type === 'edit' && securityArea) {// 编辑
          this.securityArea = this.commonSerivce.deepCopy(securityArea);
          data[0].push(securityArea.securityAreaUniqueNumber);
          securityArea.ports.forEach(function (item) {
            selectedmodel.push({ id: item, label: item });
          });
        } else if (type === 'create') {
          this.securityArea.securityAreaUniqueNumber = this.ids[0] ? this.ids[0] : '';
          this.securityArea.auditPolicyId = this.auditPolicies[0] ? this.auditPolicies[0].auditPolicyId : '';
        }
        this.ids = data[0].sort();
        this.auditPolicies = data[1];
        this.unrelatedPorts = selectedmodel;
      }
    }, (error) => {
      this.ids = [];
      this.auditPolicies = [];
      this.unrelatedPorts = [];
    });
  }

  modalDone() {
    let _this = this;
    let securityArea = this.commonSerivce.deepCopy(this.securityArea);
    this.createOrEditModal.isOkLoading = true;
    if (this.createOrEditModal.type === 'create') {
      this.strategyService.createSecurityArea(securityArea).subscribe((data) => {
        if (data) {
          let taskId = data['taskId'];
          securityArea.taskId = taskId;
          (function countdown(counter) {
            let checkDeploy = setTimeout(function () {
              _this.taskService.getTask(taskId).subscribe((data) => {
                securityArea.taskName = data['taskName'];
                if (data['state'] === 'SUCCESS') {
                  _this.getDomainData();
                  this.createOrEditModal.isOkLoading = false;
                  _this.notification.create('success', '安全域创建成功', '');
                  _this.createOrEditModal.modalFlag = false;
                  _this.createOrEditModal.type = '';
                  _this.securityArea = {
                    auditPolicyId: '',
                    name: '',
                    ports: [],
                    securityAreaUniqueNumber: ''
                  };
                  clearTimeout(checkDeploy);
                } else if (data['state'] === 'FAILED') {
                  let content = data['reason'] ? (data['taskName'] + '：' + data['reason']) : data['taskName'];
                  _this.notification.create('error', content, '');
                  clearTimeout(checkDeploy);
                } else if (counter > 0) {
                  countdown(counter - 1);
                } else {
                  _this.notification.create('error', '操作超时', '');
                }
              });
            }, 1000);
          })(120);
        }
      }, (error) => {
        this.getDomainData();
        this.createOrEditModal.isOkLoading = false;
        this.notification.create('error', '安全域创建失败', '');
        this.createOrEditModal.modalFlag = false;
        this.createOrEditModal.type = '';
      });
    } else if (this.createOrEditModal.type === 'edit') {
      this.strategyService.updateSecurityArea(securityArea).subscribe((data) => {
        if (data) {
          let taskId = data['taskId'];
          securityArea.taskId = taskId;
          (function countdown(counter) {
            let checkDeploy = setTimeout(function () {
              _this.taskService.getTask(taskId).subscribe((data) => {
                securityArea.taskName = data['taskName'];
                if (data['state'] === 'SUCCESS') {
                  _this.getDomainData();
                  _this.notification.create('success', '安全域更新成功', '');
                  _this.createOrEditModal.modalFlag = false;
                  _this.createOrEditModal.type = '';
                  _this.securityArea = {
                    auditPolicyId: '',
                    name: '',
                    ports: [],
                    securityAreaUniqueNumber: ''
                  };
                  clearTimeout(checkDeploy);
                } else if (data['state'] === 'FAILED') {
                  let content = data['reason'] ? (data['taskName'] + '：' + data['reason']) : data['taskName'];
                  _this.notification.create('error', content, '');
                  clearTimeout(checkDeploy);
                } else if (counter > 0) {
                  countdown(counter - 1);
                } else {
                  _this.notification.create('error', '操作超时', '');
                }
              });
            }, 1000);
          })(120);
        }
      }, (error) => {
        this.getDomainData();
        this.notification.create('error', '安全域更新失败', '');
        this.createOrEditModal.modalFlag = false;
        this.createOrEditModal.type = '';
      });
    }
  }

  validate = function () {
    this.validateName = !this.securityArea.name;
    this.validatePorts = !this.securityArea.ports.length;
    this.disabledSubmit = this.validateName || this.validatePorts;
  };

  deleteSecurityArea(securityArea, index) {
    let _this = this;
    if (securityArea.enable) { return; }
    this.strategyService.deleteSecurityArea(securityArea.securityAreaId).subscribe((data: any) => {
      let taskId = data.taskId;
      securityArea.taskId = taskId;
      securityArea._taskState = '';
      securityArea._taskName = '正在删除安全域';
      (function countdown(counter) {
        let checkDeploy = setTimeout(() => {
          _this.taskService.getTask(taskId).subscribe((data: any) => {
            securityArea._taskName = data.taskName;
            if (data.state === 'SUCCESS') {
              _this.domain.data[index].status = '正在删除';
              _this.notification.create('success', '删除安全域成功', '');
              clearTimeout(checkDeploy);
              _this.getDomainData();
            } else if (data.state === 'FAILED') {
              let content = (data.reason ? (data.taskName + '：' + data.reason) : data.taskName);
              _this.notification.create('success', content, '');
              _this.getDomainData();
            } else if (counter > 0) {
              countdown(counter - 1);
            } else {
              _this.notification.create('error', '删除安全域超时', '');
            }
          });
        }, 1000);
      })(120);
    }, (error) => {
      this.notification.create('error', '删除安全域失败', '');
    });
  }

  updateEnable(securityArea, index) {
    this.sourceSecurityArea.area = securityArea;
    this.sourceSecurityArea.index = index;
    if (securityArea.enable) {
      if (securityArea.securityAreaUniqueNumber === 0) {
        let isExistEnableCustomSecurityDomain = this.domain.data.filter((item) => {
          return !item.defaultSecurityArea && item.enable;
        });
        if (isExistEnableCustomSecurityDomain.length > 0) {
          // 默认模态框打开
          this.securityDomainEnable.title = '开启默认安全域';
          this.securityDomainEnable.type = 'default';
          this.securityDomainEnable.securityArea = securityArea;
          isExistEnableCustomSecurityDomain.forEach((item) => {
            this.securityDomainEnable.securityAreaName.push(item.name);
          });
          this.securityDomainEnable.modalFlag = true;
        } else {
          this.enableSecurityDomain(securityArea);
        }
      } else {
        let isExistEnableDefaultSecurityDomain = this.domain.data.filter((item) => {
          return item.defaultSecurityArea && item.enable;
        });
        if (isExistEnableDefaultSecurityDomain.length > 0) {
          this.securityDomainEnable.title = '开启自定义安全域';
          this.securityDomainEnable.type = 'custom';
          this.securityDomainEnable.securityArea = securityArea;
          this.securityDomainEnable.modalFlag = true;
        } else {
          this.enableSecurityDomain(securityArea);
        }
      }
    } else {
      this.disableSecurityDomain(securityArea);
    }
  }

  closeEnableModal() {  // 关闭 开启关闭安全域模态框
    this.domain.data[this.sourceSecurityArea.index].enable = !this.sourceSecurityArea.area['enable'];
    this.securityDomainEnable.modalFlag = false;
    this.securityDomainEnable.confirm = false;
    this.securityDomainEnable.securityArea = {};
    this.securityDomainEnable.securityAreaName = [];
    this.securityDomainEnable.type = '';
    this.securityDomainEnable.title = '';
  }

  okEnableModal() { // 开启 开启关闭安全域模态框
    if (this.securityDomainEnable.type === 'default') {
      this.enableSecurityDomain(this.securityDomainEnable.securityArea);
    } else if (this.securityDomainEnable.type === 'custom') {
      this.enableSecurityDomain(this.securityDomainEnable.securityArea);
    }
  }

  enableSecurityDomain(securityArea) {
    let _this = this;
    this.strategyService.enableSecurityArea(securityArea.securityAreaId).subscribe((data: any) => {
      let taskId = data.taskId;
      securityArea.taskId = taskId;
      securityArea._taskState = '';
      securityArea.loading = true;
      securityArea._taskName = '正在启动安全域';
      (function countdown(counter) {
        let checkDeploy = setTimeout(() => {
          _this.taskService.getTask(taskId).subscribe((data: any) => {
            securityArea._taskName = data.taskName;
            if (data.state === 'SUCCESS') {
              _this.notification.create('success', data.taskName, '');
              _this.securityDomainEnable.modalFlag = false;
              securityArea.loading = false;
              _this.getDomainData();
              clearTimeout(checkDeploy);
            } else if (data.state === 'FAILED') {
              let content = data.reason ? (data.taskName + ': ' + data.reason) : data.taskName;
              _this.notification.create('error', content, '');
              securityArea.loading = false;
              _this.getDomainData();
              clearTimeout(checkDeploy);
            } else if (counter > 0) {
              countdown(counter - 1);
            } else {
              _this.notification.create('error', '开启安全域超时', '');
              securityArea.loading = false;
            }
          });
        }, 1000);
      })(120);
    }, (error) => {
      this.notification.create('error', '开启安全域失败', '');
      securityArea.loading = false;
    });
  }

  disableSecurityDomain(securityArea) {
    let _this = this;
    this.strategyService.disableSecurityArea(securityArea.securityAreaId).subscribe((data: any) => {
      let taskId = data.taskId;
      securityArea.taskId = taskId;
      securityArea._taskState = '';
      securityArea.loading = true;
      securityArea._taskName = '正在停止安全域';
      (function countdown(counter) {
        let checkDeploy = setTimeout(() => {
          _this.taskService.getTask(taskId).subscribe((data: any) => {
            securityArea._taskName = data.taskName;
            if (data.state === 'SUCCESS') {
              _this.notification.create('success', data.taskName, '');
              securityArea.loading = false;
              _this.securityDomainEnable.modalFlag = false;
              _this.getDomainData();
              clearTimeout(checkDeploy);
            } else if (data.state === 'FAILED') {
              let content = data.reason ? (data.taskName + '：' + data.reason) : data.taskName;
              _this.notification.create('error', content, '');
              securityArea.loading = false;
              clearTimeout(checkDeploy);
            } else if (counter > 0) {
              countdown(counter - 1);
            } else {
              _this.notification.create('error', '停止安全域超时', '');
              securityArea.loading = false;
            }
          });
        }, 1000);
      })(120);
    }, (error) => {
      this.notification.create('error', '停止安全域失败', '');
      securityArea.loading = false;
    });
  }
}
