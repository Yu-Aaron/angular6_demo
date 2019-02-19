import { Component, OnInit } from '@angular/core';
import { ThreatService } from '../../../common/services/threat.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-featurelib',
  templateUrl: './featurelib.component.html',
  styleUrls: ['./featurelib.component.scss']
})
export class FeaturelibComponent implements OnInit {
  topologyId: any;
  policyId: any;
  featureList: Array<Object> = [];
  featurelibCount: number = 0;
  pageIndex: number = 1;
  pageSize: number = 10;
  pageTotal: number = 0;
  loading: boolean = true;
  featureDetailInfo: any;
  featureDetailList: Array<Object> = [];
  featureDetailCount: number = 0;
  pageIndexDetail: number = 1;
  pageSizeDetail: number = 10;
  pageTotalDetail: number = 0;
  loadingModal: boolean = true;
  modalVisible: boolean = false;

  constructor(public threatService: ThreatService, public activatedRoute: ActivatedRoute) {
    this.activatedRoute.queryParams.subscribe(queryParams => {
      this.topologyId = queryParams.topologyId;
      // this.policyId = queryParams.policyId;
      this.topologyId = sessionStorage.getItem('topologyId');
    })
  }

  ngOnInit() {
    this.getFeatureCount();
    this.getFeature();
  }

  // 获取威胁列表
  getFeature() {
    this.loading = true;
    this.threatService.getFeature(this.pageIndex, this.pageSize, this.topologyId, this.policyId, 'NoDeploy', 'signature').subscribe((data: any) => {
      if (data.length > 0) {
        this.featureList = data;
      } else {
        this.featureList = [];
      }
      this.loading = false;
    })
  }

  // 获取威胁列表总数
  getFeatureCount() {
    this.threatService.getFeatureCount(this.topologyId, this.policyId, 'NoDeploy', 'signature').subscribe((data: number) => {
      if (data) {
        this.featurelibCount = data;
        this.pageTotal = Math.ceil(this.featurelibCount / this.pageSize);
      } else {
        this.featurelibCount = 0;
        this.pageTotal = 0;
      }
    })
  }

  // 获取威胁列表点击页数
  pageIndexChange() {
    this.getFeature();
    this.getFeatureCount();
  }

  // 上传威胁特征库
  upload() {
    
  }

  // 威胁项详情
  getFeatureDetail(data) {
    this.featureDetailInfo = data;
    this.modalVisible = true;
    this.loadingModal = true;
    if (this.featureDetailInfo) {
      this.threatService.getFeaturebyBlockId(this.featureDetailInfo.policyBlockId).subscribe((data: any) => {
        if (data) {
          this.featureDetailList = data;
          this.featureDetailCount = data.length;
          this.pageTotalDetail = Math.ceil(this.featureDetailCount / this.pageSizeDetail);
        } else {
          this.featureDetailList = [];
          this.featureDetailCount = 0;
          this.pageTotalDetail = 0;
        }
        this.loadingModal = false;
      })
    }
  }
}
