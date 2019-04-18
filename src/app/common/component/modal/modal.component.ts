import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  @Input() isVisible;  // modal 提示框是否显示
  @Input() message_content;   //  内容
  @Input() message_content_tip;
  @Input() isSetColor;
  @Output() private closeModal = new EventEmitter();  // 传值关闭modal弹框

  transferValue: {};

  constructor() { }

  ngOnInit() {
  }

  handleOk(): void {
    this.isVisible = false;
    this.transferValue = {
      isVisible: this.isVisible,
      ok: true
    };
    this.closeModal.emit(this.transferValue);
  }

  handleCancel(): void {
    this.isVisible = false;
    this.transferValue = {
      isVisible: this.isVisible,
      ok: false
    };
    this.closeModal.emit(this.transferValue);
  }

}
