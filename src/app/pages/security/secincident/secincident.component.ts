import { CommonService } from './../../../common/services/common.service';
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from "@angular/forms";
import {SecurityService} from '../../../common/services/security.service';

var self;

@Component({
  selector: 'app-secincident',
  templateUrl: './secincident.component.html',
  styleUrls: ['./secincident.component.scss']
})
export class SecincidentComponent implements OnInit {

  formModel: FormGroup;
  validateForm: FormGroup;
  items = [];
  basicTable = [];
  dataSet = [];
  sortName = null;
  sortValue = null;
  params = {};
  searchCountParams = {};
  pagination = true;
  tableTotalData = 1;
  loading = true;
  filterFlag = false;  // 过滤条件是否显示
  isFuzzySearch = false;
  searchTableFlag = false;
  filterTableFlag = false;
  all_payload;    // 过滤条件的参数
  selectedValue = 'n';  // 时间选择器选中的
  advancedSearchTimeRange = ['',''];
  filterParameter;
  pageIndex = 1;
  pageTotalNumber: number;
  pageSize = 10;
  // filter-table 组件需要传的参数
  filterConditionData = {
    timeValueData : [],
    controlArray : [
      {
        label: '处理方式',
        type: 'select',
        name: 'level',
        value: '-1',
        selectValueData : [{
          label: '全部',
          value: '-1'
        },{
          label: '警告',
          value: 'WARN'
        },{
          label: '丢弃',
          value: 'ERROR'
        },{
          label: '阻断',
          value: 'REJECTBOTH'
        }]
      },{
        label: '起源',
        type: 'input',
        name: 'sourceName'
      },{
        label: '目标',
        type: 'input',
        name: 'destinationName'
      },{
        label: '保护终端',
        type: 'input',
        name: 'deviceName'
      },{
        label: '协议',
        type: 'input',
        name: 'appLayerProtocol'
      }
    ]
  };
  // 默认值
  listOfOption = ['sourceName', 'deviceName', 'destinationName', 'appLayerProtocol'];
  constructor(
    private securityService: SecurityService,
    private commonService: CommonService
    ) {
    self = this;
    this.items = [
      {
        disabled: true,
        value: '标记所有未读成已读',
        select: false,
      },{
        disabled: false,
        value: '清空所有事件',
        select: true,
      },{
        disabled: false,
        value: '导出全部',
        select: false,
      }
    ];
    self.params = {
      $limit: 10,
      $orderby: "timestamp desc, incidentId desc",
      $skip: 0
    };
    self.advancedSearchOptions = {
      query: ''
    };
    let fb = new FormBuilder();
    this.formModel = fb.group({
      query: [''],
    });
  }

  ngOnInit() {
    // get table data
    this.initTable();
  }
  // 初始化表格数据
  initTable(reset: boolean = false, flag?: boolean) {
    if (reset) {
      this.pageIndex = 1;
    }
    this.loading = true;
    self.params.$skip = (this.pageIndex - 1) * self.pageSize;
    this.securityService.getSecurityTableData(self.params).subscribe((data: any) => {
      self.dataSet = data;
      self.getSecurityTableTotalData(flag);
    })
  }
  // 获取表格总条数
  getSecurityTableTotalData(flag) {
    if (flag) {
      this.securityService.getFilterData(self.searchCountParams).subscribe((data: any) => {
        this.tableTotalData = data;
        this.loading = false;
        self.pageTotalNumber = Math.ceil(self.tableTotalData / self.pageSize);
        console.log(data);
      })
    } else {
      this.securityService.getSecurityTableTotalData().subscribe((data: any) => {
        this.tableTotalData = data;
        this.loading = false;
        self.pageTotalNumber = Math.ceil(self.tableTotalData / self.pageSize);
        console.log(data);
      })
    }
  }
  // 排序
  sort(sort: {key: string, value: string}): void {
    console.log(sort.value);
    self.sortName = sort.key;
    self.sortValue = sort.value === 'descend' ? 'desc' : '';
    if (self.sortValue) {
      self.params.$orderby = self.sortName + ' ' + self.sortValue;
    } else {
      self.params.$orderby = self.sortName
    }
    self.initTable();
  }

  // 搜索框
  searchData (flag?: boolean, pageFlag?: boolean) {
    if(this.formModel.valid) {
      if (self.params.$filter) {
          delete self.params.$filter;
          delete self.searchCountParams.$filter;
        }
      if (this.formModel.value.query) {
        this.securityService.getSearchData(this.formModel.value.query).subscribe((data: any) => {
          if (!pageFlag) {
            self.pageIndex = 1;
          }
          if (!self.params['$filter']) {
            self.params['$filter'] = self.commonService.filterFunc(this.formModel.value.query, self.listOfOption);
          } else {
            self.params['$filter'] = self.params['$filter'] + ' and ' + self.commonService.filterFunc(this.formModel.value.query, self.listOfOption);
          }
          self.searchCountParams = {
            $filter: self.params['$filter']
          };
          self.initTable(flag, true);
        });
      } else {
        self.initTable(flag);
      }
    }
  }
  // 页数变化时
  pageIndexChange() {
    if (self.filterTableFlag) {
      self.loading = true;
      self.all_payload.$skip = (self.pageIndex - 1) * self.pageSize;
      self.securityService.getSecurityTableData(self.all_payload).subscribe((data: any) => {
        self.loading = false;
        self.dataSet = data;
      })
    } else {
      self.searchData('', true);
    }
  }
  // 过滤条件获取表格数据
  getTableData() {
    var payload;
    payload = {
      '$skip': (self.pageIndex - 1) * self.pageSize,
      '$limit': self.pageSize
    };
    // if (self.params.$orderby) {
    //   payload['$orderby'] =  "timestamp desc, incidentId desc";
    // }
    if (self.filterParameter) {
      self.advancedSearching(payload);
      var filterParams = {
        $filter : self.filterParameter
      }
    }
    var all_payload = { ...payload };
    self.all_payload = all_payload;
    self.loading = true;
    self.securityService.getSecurityTableData(all_payload).subscribe((data: any) => {
      self.dataSet = data;
      self.securityService.getFilterData(filterParams).subscribe((data: any) => {
        self.tableTotalData = data;
        this.loading = false;
        self.pageTotalNumber = Math.ceil(self.tableTotalData / self.pageSize);
        console.log(data);
      })
    });
  }

  // 将过滤参数和limit skip拼接起来
  advancedSearching(payload) {
    payload['$filter'] = self.filterParameter;
  }

  // 接受子组件传过来的信息
  filterButton(msg) {
    self.filterFlag = msg.filterFlag;
    self.filterTableFlag = msg.filterTableFlag;
    self.initTable(false, false);
    console.log(msg);// 接收到的数据
  }
  // 点击更新按钮 传过来的事件
  searchFilterTable(params) {
    self.pageIndex = params.pageIndex;
    self.filterParameter = params.params;
    self.filterTableFlag = params.filterTableFlag;
    self.getTableData();
  }
}
