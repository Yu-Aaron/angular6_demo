import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-device-model',
    templateUrl: './device-model.component.html',
    styleUrls: ['./device-model.component.scss']
})
export class DeviceModelComponent implements OnInit {
    pageIndex = 1;
    pageSize = 10;
    pageTotalNumber = 0;
    tableCount = 0;
    loading: boolean;
    @Input() deviceModal = {};

    constructor() {
    }

    ngOnInit() {
    }

    handleCancel(): void {
        this.deviceModal['isVisible'] = false;
    }

}
