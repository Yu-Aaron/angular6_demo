import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
    selector: 'app-device-modal',
    template: `
        <nz-modal [(nzVisible)]="confirmModal.isVisible" 
                  [nzTitle]="confirmModal.title"
                  [nzFooter]="confirmModal.hideFooter"
                  [nzClosable]="confirmModal.hideFooter"
                  [nzMaskClosable]="confirmModal.hideFooter"
                  (nzOnCancel)="handleCancel()" 
                  (nzOnOk)="handleOk()"
                  [nzWidth]=600>
            <p *ngFor="let item of confirmModal.content">{{item}}</p>
        </nz-modal>`
})
export class DeviceModalComponent implements OnInit {
    @Input() confirmModal: any;
    @Output() closeModel = new EventEmitter();

    constructor() {
    }

    ngOnInit() {
    }

    handleOk(): void {
        console.log('Button ok clicked!');
        this.confirmModal.isVisible = false;
        this.closeModel.emit(true);
    }

    handleCancel(): void {
        console.log('Button cancel clicked!');
        this.confirmModal.isVisible = false;
        this.closeModel.emit(false);
    }

}
