import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from "@angular/forms";
import {SecurityService} from '../../../common/services/security.service';

var self;

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  validateModal: FormGroup;
  passwordType = '0';
  matchPassword = false;   // 解压密码是否符合规则
  username;
  @Input()
  isVisible: boolean;
  @Input()
  exportTypeFlag: boolean;
  @Input()
  exportParams: string;
  @Output() private exportVisibleTriggle = new EventEmitter();
  constructor(private scurityService: SecurityService) {
    self = this;
  }

  ngOnInit() {
    let fb = new FormBuilder();

    // this.validateModal = new FormGroup({
    //   username: new FormControl({value: '', disabled: false}),
    // });
    this.validateModal = fb.group({
      username: ['', self.positiveNumberValidator],
    });
  }

  positiveNumberValidator(control: FormControl): any {
    var regex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*(_|[^\w])).+$/g;
    self.matchPassword = control.value && control.value.match(regex) && control.value.length >= 8;
    console.log(self.matchPassword);
    console.log(self.checked);
  }

  handleOk(): void {
    const orderParams = self.exportParams;
    var p = {};
    p['$orderby'] = orderParams;
    p['$limit'] = 100000;//p.$limit = "";这样写可以避免系统默认填入100的limit值也不用给一个数值，获得的数据是全量的数据；
    //for CS-11814
    p['$skip'] = 0;
    if (!p['$orderby'] || p['$orderby'] === '') {
      p['$orderby'] = 'timestamp desc, incidentId desc';
    }
    self.scurityService.getAllExport(p, self.username).subscribe((data: any) => {
      self.isVisible = false;
      self.exportVisibleTriggle.emit(self.isVisible);
      window.open('./' + data, '_self');
    })
  }

  handleCancel(): void {
    self.isVisible = false;
    self.exportVisibleTriggle.emit(self.isVisible);
  }

  checkboxChange() {
    if (self.checked) {
      self.passwordType = '1';
      console.log(self.validateModal);
    } else {
      self.passwordType = '0';
    }
  }


}
