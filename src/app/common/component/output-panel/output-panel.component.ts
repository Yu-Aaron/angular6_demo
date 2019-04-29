import {Component, Input, OnInit} from '@angular/core';
import {LogService} from '../../service/log.service';

@Component({
    selector: 'app-output-panel',
    templateUrl: './output-panel.component.html',
    styleUrls: ['./output-panel.component.scss']
})
export class OutputPanelComponent implements OnInit {
    @Input() outPutModal = {};
    addPsw = false; // true：不加密  false：加密
    psw = '';  // 解压密码
    psw1 = ''; // 确认密码
    isPswValidate = true;

    constructor(private logService: LogService) {
    }

    ngOnInit() {
    }

    // 加密规则验证
    validatePsw(psw) {
        const regex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*(_|[^\w])).+$/g;
        this.isPswValidate = psw && psw.match(regex) && psw.length >= 8;
    }

    // 是否加密
    isAddPsw() {
        this.psw = '';
        this.psw1 = '';
    }

    // 下载文件
    download(psw) {
        let params = {
            '$orderby': 'timestamp desc'
        };
        this.logService.getAllExport(params, psw, this.outPutModal['type']).subscribe((data:any) => {
            window.open('./' + data, '_self');
            this.outPutModal['isVisible'] = false;
        });
    }

    handleCancel(): void {
        this.outPutModal['isVisible'] = false;
    }

}
