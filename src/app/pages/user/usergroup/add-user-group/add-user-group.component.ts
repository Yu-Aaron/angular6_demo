import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { NzNotificationService } from 'ng-zorro-antd';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

var self;

@Component({
  selector: 'app-add-user-group',
  templateUrl: './add-user-group.component.html',
  styleUrls: ['./add-user-group.component.scss']
})
export class AddUserGroupComponent implements OnInit {

  @Input()
  isVisible: boolean;      // modal 是否显示
  @Input()
  modelTitle: string;     // modal title
  @Input()
  fooletrTitle: string;   // footer 文字显示

  @Output() closeModal = new EventEmitter();

  transformToParent: {};

  constructor(
    private notification: NzNotificationService,
    private fb: FormBuilder,
  ) {
    self = this;
  }

  ngOnInit() {
    self.validateForm = self.fb.group({
      userName: [ null, [ this.validatorName ] ],
      role: [ null, [ Validators.required ] ],
    });
  }

  validatorName() {

  }

  // 点击确定
  handleOk(): void {
    self.isVisible = false;
    self.transformToParent = {
      isVisible: false,
      refresh: true
    };
    self.closeModal.emit(self.transformToParent);
  }
  // 点击取消
  handleCancel(): void {
    self.isVisible = false;
    self.transformToParent = {
      isVisible: false,
      refresh: false
    };
    self.closeModal.emit(self.transformToParent);
  }
}
