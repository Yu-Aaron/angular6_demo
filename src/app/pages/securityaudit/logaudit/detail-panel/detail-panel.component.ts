import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-detail-panel',
  templateUrl: './detail-panel.component.html',
  styleUrls: ['./detail-panel.component.scss']
})
export class DetailPanelComponent implements OnInit {
    pageIndex = 1;
    pageSize = 10;
    pageTotalNumber = 0;
    loading: boolean;

    fileZipPsw = '';
    @Input() auditDataDetail = {};

    constructor() {
    }

    ngOnInit() {
    }

    handleCancel(): void {
        this.auditDataDetail['isVisible'] = false;
    }

    exportFile(flag, headid) {
        // const params = flag ? params : {};
        // params.$limit = 100000;
        // if (headid > 0) {
        //     params.$filter = 'flowdataHeadId eq ' + headid;
        // }
        // $q.all().then(function () {
        //     Audit.getAllExport(params, $scope.auditDataDetail.fileZipPsw, $scope.auditDataDetail.protocolSourceName).then(function (data) {
        //         window.open('./' + data, '_self');
        //     });
        // });
    }

}
