import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SettingService } from '../../../../common/service/setting.service';
import { FormatValService } from '../../../../common/service/formatVal.service';
import { NzNotificationService } from 'ng-zorro-antd';

var self;

@Component({
  selector: 'app-add-agregate',
  templateUrl: './add-agregate.component.html',
  styleUrls: ['./add-agregate.component.scss']
})
export class AddAgregateComponent implements OnInit {

  @Input()
  isVisible: boolean;      // modal 是否显示
  @Input()
  modelTitle: string;     // modal title
  @Output() closeModal = new EventEmitter();
  @Input()
  tranformData: {};     // 传送过来的值

  validateForm: FormGroup;
  transformToParent: {};
  formsGrouptype: [];
  nameValue: String;
  isErrorName: Boolean = false;  // 接口名称验证是否成功
  isErrorGroup: Boolean = true;  // 接口成员不能为空
  loadingData: Boolean = false;    // 新增中 是否显示
  selectGroupData: [];   // 选择成员的数据

  constructor(
    private fb: FormBuilder,
    private formatVal: FormatValService,
    private setUrl: SettingService,
    private notification: NzNotificationService,
  ) {
    self = this;
  }

  ngOnInit() {
    self.validateForm = self.fb.group({
      name: [null, [ Validators.required, self.validadateName ] ],
      group: [null ],
      commet: ['']
    });
    self.getGroupType();
  }

  // 获取接口成员数据
  getGroupType() {
    self.setUrl.getNewBondItems().subscribe(data => {
      self.transfrom(data);
    });
  }

  transfrom(data) {
    self.formsGrouptype = data.map(item => {
      return {
        ...item,
        label: item.portName,
        value: item.portName
      };
    });
  }
  // 接口名称验证
  validadateName() {
    const validateFormData = self.validateForm ? self.validateForm.controls.name : '';
    if (self.validateForm && self.validateForm.get('name').dirty && validateFormData) {
      self.nameValue = self.validateForm.controls.name.value;
      self.isErrorName = self.formatVal.validateBondname(self.nameValue);
    }
  }
  // 接口成员选择
  modelTypeChange(event) {
    self.selectGroupData = event;
    if (self.validateForm.controls.group.value) {
      self.isErrorGroup = false;
    } else {
      self.isErrorGroup = true;
    }
  }

  handleOk() {
    self.isVisible = false;
    self.loadingData = true;
    let obj = {
      bondPort: {
        portName: self.nameValue,
        description: self.validateForm.controls.commet.value || '',
        mode: 0
      },
      bondLinkPorts: [],
    };
    for (let i = 0; i < self.selectGroupData.length; i++) {
      let portId = self.filterId(self.selectGroupData[i]);
      obj.bondLinkPorts.push({portName: self.selectGroupData[i], portId: portId});
    }
    self.setUrl.addNewBond(obj).subscribe(data => {
      if (!data['flag']) {
        self.notification.create('error', data.msg , '');
      }
      self.emitEvent();
    }, error => {
      self.notification.create('error', '新增接口失败' , '');
      self.emitEvent();
    });
  }

  emitEvent() {
    self.transformToParent = {
      isVisible: false,
      refresh: false
    };
    self.closeModal.emit(self.transformToParent);
  }

  filterId(name) {
    let id = self.formsGrouptype.filter((item) => {
      return item.portName === name;
    });
    return id[0].portId;
  }

  handleCancel(): void {
    self.isVisible = false;
    self.emitEvent();
  }

}
