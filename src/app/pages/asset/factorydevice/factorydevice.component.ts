import {AfterContentInit, Component, OnInit} from '@angular/core';
import {CommonService} from "../../../common/services/common.service";

@Component({
    selector: 'app-factorydevice',
    templateUrl: './factorydevice.component.html',
    styleUrls: ['./factorydevice.component.scss']
})
export class FactorydeviceComponent implements OnInit {

    constructor(private commonService: CommonService) {
    }

    ngOnInit() {
        console.log(5555, this.commonService.topologyId);
    }


}
