import { Component, OnInit } from '@angular/core';
import { StrategyService } from 'src/app/common/service/strategy.service';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-strategydetail',
  templateUrl: './strategydetail.component.html',
  styleUrls: ['./strategydetail.component.scss']
})
export class StrategydetailComponent implements OnInit {
  auditPolicyId = '';
  auditPolicy = {};
  signatureDetail = {
    modalFlag: false,
    policyBlocks: {}
  };
  signature = {
    data: [],
    total: 0,
    loading: false,
    pageIndex: 1,
    pageSize: 10,
    pages: 1
  };
  protocol = {
    data: [],
    total: 0,
    loading: false,
    pageIndex: 1,
    pageSize: 10,
    pages: 1
  };
  ipmac = {
    data: [],
    total: 0,
    loading: false,
    pageIndex: 1,
    pageSize: 10,
    pages: 1
  };
  domainName = {
    data: [],
    total: 0,
    loading: false,
    pageIndex: 1,
    pageSize: 10,
    pages: 1
  };

  constructor(
    public strategyService: StrategyService,
    public activatedRoute: ActivatedRoute
  ) {
    this.auditPolicyId = this.activatedRoute.snapshot.params.id;
  }

  ngOnInit() {
    this.getStrategyDetail();
    this.getTableData('SIGNATURE', this.signature);
  }

  getStrategyDetail() {
    this.strategyService.getStrategyDetail(this.auditPolicyId).subscribe((data: any) => {
      this.auditPolicy = data;
    });
  }

  getTableData(type, obj) {
    obj.loading = true;
    let params = { '$skip': (obj['pageIndex'] - 1) * 10, '$limit': obj['pageSize'] };
    this.strategyService.getAllRuleLinkAll(this.auditPolicyId, type, params).subscribe((data: any) => {
      obj.data = data;
      obj.total = obj.data.length;
      obj.pages = Math.ceil(obj.total / obj.pageSize);
      obj.loading = false;
    }, (error) => {
      obj.data = [];
      obj.total = 0;
      obj.pages = 1;
      obj.loading = false;
    });
  }

  getSignatureDetail(data) {
    forkJoin(
      this.strategyService.getSignatureContentbyBlockId(data.policyBlockId),
      this.strategyService.getSignaturesbyBlockId(data.policyBlockId)
    ).subscribe((data: any) => {
      this.signatureDetail.policyBlocks = data[0];
      this.signatureDetail.policyBlocks['signatures'] = data[1];
      this.signatureDetail.modalFlag = true;
    }, (error) => {
      this.signatureDetail = {
        modalFlag: false,
        policyBlocks: {signatures: []}};
    });
  }

}
