import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from "@angular/forms";
import * as moment from 'moment';

var self;

@Component({
  selector: 'app-filter-table',
  templateUrl: './filter-table.component.html',
  styleUrls: ['./filter-table.component.scss']
})
export class FilterTableComponent implements OnInit {

  validateForm: FormGroup;
  // 默认值 后续修改
  rangePickerFlag = false; // 时间选择器是否显示
  selectedValue = 'n';  // 时间选择器选中的
  timeValue = 'n';
  filterTableFlag = false;
  filterParameter;
  advancedSearchTimeRange = ['',''];
  timeFilterData = [
    {
      label: '不限',
      value: 'n'
    },{
      label: '1小时内',
      value: 'h'
    },{
      label: '24小时内',
      value: 'd'
    },{
      label: '一周内',
      value: 'w'
    },{
      label: '30天内',
      value: 'm'
    },{
      label: '一年内',
      value: 'y'
    },{
      label: '自定义日期范围',
      value: 'r'
    }
  ];
  @Input()
  timeValueData: [];
  @Input()
  controlArray;
  @Input()
  filterFlag: boolean;
  @Output() private filterTable = new EventEmitter();
  @Output() private searchFilterTable = new EventEmitter();
  constructor() {
    self = this;
  }

  ngOnInit() {
    if (!self.timeValueData.length) {
      self.timeValueData = self.timeFilterData;
    };
    let fb = new FormBuilder();
    this.validateForm = fb.group({
      timeValue: ['n'],
      rangePicker: [ [] ],
    });
    for (let i = 0; i < this.controlArray.length; i++) {
      const obj = {
        index: i
      };
      this.controlArray[i] = {
        ...this.controlArray[i],
        ...obj
      };
      this.validateForm.addControl(this.controlArray[i].name, new FormControl());
    }
  }

  // 时间选择下拉框改变时，
  timeOptionSelect() {
    self.selectedValue = self.validateForm.value.timeValue;
    self.initTimeRange();
    if (self.selectedValue === 'r') {
      self.rangePickerFlag = true;
    } else {
      self.rangePickerFlag = false;
    }
  }

  // 点击更新按钮触发
  submitForm(): void {
    var result = '';
    // time 处理
    if (self.validateForm.value.timeValue !== 'n') {
      if (self.advancedSearchTimeRange[0]) {
        var genTimeRange = self.genDateFilter(self.advancedSearchTimeRange);
        result ? result + ' and ' : '';
        result += "(" + "timestamp" + " ge '" + genTimeRange.start + (genTimeRange.end ? ("' and " + "timestamp" + " le '" + genTimeRange.end + "')") : "')");
      }
    }
    self.controlArray.forEach(function(data) {
      // input 处理
      if (data.type === 'input' && self.validateForm.value[data.name]) {
        result += self.CAFC.getConditionResult(result, [" and (", "("], [" and ", ""]);
        var dataArr = self.CAFC.getDataArray(self.validateForm.value[data.name]);
        if ((data.name === 'sourcePort' || data.name === 'destinationPort') && dataArr.length === 1) {
          var targetObj = { key: data.name, value: dataArr[0] };
          result += self.CAFC.getResult(targetObj);
          result += self.getConditionResult(false, ["", ")"], [")", ""]);
        } else {
            for (var l = 0; l < dataArr.length; l++) {
                result += self.CAFC.getResult({ key: data.name, value: dataArr[l] });
                result += self.CAFC.getConditionResult((l < dataArr.length - 1), [" and ", ")"], [" and ", ""]);
            }
        }
      }
      // select 处理
      if (data.type === "select" && parseInt(self.validateForm.value[data.name]) !== -1) {
        if (result) {
            result += ' and ' + data.name;
            result += " eq " + self.validateForm.value[data.name];
        } else {
            result += data.name;
            result += " eq " + self.validateForm.value[data.name];
        }
      }
    })
    self.filterParameter = result;
    self.pageIndex = 1;  // 将当前页数设置为1
    self.filterTableFlag = true;
    const filterParams = {
      params: self.filterParameter,
      pageIndex: self.pageIndex,
      filterTableFlag: self.filterTableFlag
    };
    self.searchFilterTable.emit(filterParams);
    // self.getTableData();
  }

  // 初始化时间
  initTimeRange() {
    self.setAdvancedSearchTimeRange(self.selectedValue);
  }
  setAdvancedSearchTimeRange (s) {
    if (s === 'n') {
      self.advancedSearchTimeRange = ['',''];
    } else if (s === 'h') {
      self.advancedSearchTimeRange[0] = moment(sessionStorage.getItem('currentTime')).subtract(1, 'hours').milliseconds(0).toDate();
      self.advancedSearchTimeRange[1] = moment(sessionStorage.getItem('currentTime')).milliseconds(0).toDate();
    } else if (s === 'd') {
      self.advancedSearchTimeRange[0] = moment(sessionStorage.getItem('currentTime')).subtract(1, 'days').milliseconds(0).toDate();
      self.advancedSearchTimeRange[1] = moment(sessionStorage.getItem('currentTime')).milliseconds(0).toDate();
    } else if (s === 'w') {
      self.advancedSearchTimeRange[0] = moment(sessionStorage.getItem('currentTime')).subtract(7, 'days').milliseconds(0).toDate();
      self.advancedSearchTimeRange[1] = moment(sessionStorage.getItem('currentTime')).milliseconds(0).toDate();
    } else if (s === 'm') {
      self.advancedSearchTimeRange[0] = moment(sessionStorage.getItem('currentTime')).subtract(30, 'days').milliseconds(0).toDate();
      self.advancedSearchTimeRange[1] = moment(sessionStorage.getItem('currentTime')).milliseconds(0).toDate();
    } else if (s === 'y') {
      self.advancedSearchTimeRange[0] = moment(sessionStorage.getItem('currentTime')).subtract(1, 'years').milliseconds(0).toDate();
      self.advancedSearchTimeRange[1] = moment(sessionStorage.getItem('currentTime')).milliseconds(0).toDate();
    }
  };
  // 自定义时间选择框
  onSearchTimeChange (result: Date): void {
    console.log('onChange: ', result);
    self.advancedSearchTimeRange = result;
  }
  // 点击过滤条件触发的事件
  filterCondition() {
    const emitData = {
      filterTableFlag: self.filterTableFlag,
      filterFlag: self.filterFlag
    };
    self.filterTable.emit(emitData);
  }
  // 时间参数组装
  genDateFilter(range) {
    var start, end;
    if (range && range[0]) {
      start = moment(range[0]).format('YYYY-MM-DD') + 'T' + moment(range[0]).format('HH:mm:ss');
      start = moment(start).utc().format();
    }
    if (range && range[1]) {
      end = moment(range[1]).format('YYYY-MM-DD') + 'T' + moment(range[1]).format('HH:mm:ss');
      end = moment(end).utc().format();
    }
    return { "start": start, "end": end };
  }
  // 参数拼接
  CAFC = {
    getResult: function (obj) {
        return self.isFuzzySearch ? "contains(" + obj.key + ",'" + obj.value + "')" : obj.key + " eq '" + obj.value + "'";
    },
    getConditionResult: function (condition, unAccOptions, isAccOptions) {
        var result = '';
        if (self.isFuzzySearch) {
            result = condition ? isAccOptions[0] : isAccOptions[1];
        } else {
            result = condition ? unAccOptions[0] : unAccOptions[1];
        }
        return result;
    },
    getDataArray: function (targetString) {
        return self.isFuzzySearch ? targetString.split(' ') : targetString.split();
    }
  };

}
