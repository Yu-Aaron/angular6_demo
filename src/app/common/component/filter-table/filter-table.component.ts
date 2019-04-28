import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {FormBuilder, FormGroup, FormControl} from '@angular/forms';
import * as moment from 'moment';

let self;

@Component({
    selector: 'app-filter-table',
    templateUrl: './filter-table.component.html',
    styleUrls: ['./filter-table.component.scss']
})

export class FilterTableComponent implements OnInit {
    // 默认值
    validateForm: FormGroup;
    filterParameter: string;  // 过滤参数
    isCollapseAdvance: boolean;  // 高级查询是否展开
    rangePickerFlag: boolean; // 自定义时间范围是否显示
    timeFilterData = [
        {label: '不限', value: 'n'},
        {label: '最近1H', value: 'h'},
        {label: '最近24H', value: 'd'},
        {label: '最近1周', value: 'w'},
        {label: '最近30天', value: 'm'},
        {label: '最近1年', value: 'y'},
        {label: '自定义日期范围', value: 'r'}
    ]; // 时间枚举值
    advancedSearchTimeRange = ['', ''];  // 时间变量
    selectedValue = 'n';  // 默认不限时间
    CAFC = {}; // 参数拼接

    // 用户自定义
    @Input() timeValueData = [];  // 时间枚举值
    @Input() controlArray = [];   // 过滤条件可选项
    @Input() showTimePicker = false; // 时间选择器是否显示
    @Input() showAdvance = true; // 高级搜索是否显示
    @Input() isFuzzySearch: boolean; // 模糊查询
    @Input() isFuzzySearchShow: boolean; // 模糊查询是否显示
    @Output() private searchFilterTable = new EventEmitter();

    constructor() {
        self = this;
    }

    ngOnInit() {
        if (!self.timeValueData.length) {
            self.timeValueData = self.timeFilterData;
        }
        const fb = new FormBuilder();
        this.validateForm = fb.group({
            isFuzzySearch: self.isFuzzySearch,
            rangePicker: [[]],
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
        // 参数拼接
        self.CAFC = {
            getResult: function (obj) {
                return self.isFuzzySearch ? 'contains(' + obj.key + ',\'' + obj.value + '\')' : obj.key + ' eq \'' + obj.value + '\'';
            },
            getConditionResult: function (condition, unAccOptions, isAccOptions) {
                let result = '';
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

    // 时间选择下拉框改变时
    timeOptionSelect(timeValue) {
        self.selectedValue = timeValue;
        self.rangePickerFlag = timeValue === 'r';
        self.initTimeRange(self.selectedValue);
        timeValue !== 'r' && this.submitForm();
    }

    // 初始化时间
    initTimeRange(s) {
        const currentTime = sessionStorage.getItem('currentTime');
        if (s === 'n') {
            self.advancedSearchTimeRange = ['', ''];
        } else if (s === 'h') {
            self.advancedSearchTimeRange[0] = moment(currentTime).subtract(1, 'hours').milliseconds(0).toDate();
            self.advancedSearchTimeRange[1] = moment(currentTime).milliseconds(0).toDate();
        } else if (s === 'd') {
            self.advancedSearchTimeRange[0] = moment(currentTime).subtract(1, 'days').milliseconds(0).toDate();
            self.advancedSearchTimeRange[1] = moment(currentTime).milliseconds(0).toDate();
        } else if (s === 'w') {
            self.advancedSearchTimeRange[0] = moment(currentTime).subtract(7, 'days').milliseconds(0).toDate();
            self.advancedSearchTimeRange[1] = moment(currentTime).milliseconds(0).toDate();
        } else if (s === 'm') {
            self.advancedSearchTimeRange[0] = moment(currentTime).subtract(30, 'days').milliseconds(0).toDate();
            self.advancedSearchTimeRange[1] = moment(currentTime).milliseconds(0).toDate();
        } else if (s === 'y') {
            self.advancedSearchTimeRange[0] = moment(currentTime).subtract(1, 'years').milliseconds(0).toDate();
            self.advancedSearchTimeRange[1] = moment(currentTime).milliseconds(0).toDate();
        }
    }

    // 自定义时间选择框
    onSearchTimeChange(result): void {
        console.log('onChange: ', result);
        self.advancedSearchTimeRange = result;
        this.submitForm();
    }

    // 时间参数组装
    genDateFilter(range) {
        let start, end;
        if (range && range[0]) {
            start = moment(range[0]).format('YYYY-MM-DD') + 'T' + moment(range[0]).format('HH:mm:ss');
            start = moment(start).utc().format();
        }
        if (range && range[1]) {
            end = moment(range[1]).format('YYYY-MM-DD') + 'T' + moment(range[1]).format('HH:mm:ss');
            end = moment(end).utc().format();
        }
        return {'start': start, 'end': end};
    }

    // 点击更新按钮触发
    submitForm(): void {
        let result = '';
        // time 处理
        if (self.selectedValue !== 'n') {
            if (self.advancedSearchTimeRange[0]) {
                const genTimeRange = self.genDateFilter(self.advancedSearchTimeRange);
                result += '(' + 'timestamp' + ' ge \'' + genTimeRange.start + (genTimeRange.end ? ('\' and ' + 'timestamp' + ' le \'' + genTimeRange.end + '\')') : '\')');
            }
        }
        self.controlArray.forEach(function (data) {
            // input 处理
            if (data.type === 'input' && self.validateForm.value[data.name]) {
                result += self.CAFC.getConditionResult(result, [' and (', '('], [' and ', '']);
                const dataArr = self.CAFC.getDataArray(self.validateForm.value[data.name]);
                if ((data.name === 'sourcePort' || data.name === 'destinationPort') && dataArr.length === 1) {
                    const targetObj = {key: data.name, value: dataArr[0]};
                    result += self.CAFC.getResult(targetObj);
                    result += self.CAFC.getConditionResult(false, ['', ')'], [')', '']);
                } else {
                    for (let l = 0; l < dataArr.length; l++) {
                        result += self.CAFC.getResult({key: data.name, value: dataArr[l]});
                        result += self.CAFC.getConditionResult((l < dataArr.length - 1), [' and ', ')'], [' and ', '']);
                    }
                }
            }
            // select 处理
            if (data.type === 'select' && parseInt(self.validateForm.value[data.name]) !== -1) {
                if (result) {
                    result += ' and ' + data.name;
                    result += ' eq ' + self.validateForm.value[data.name];
                } else {
                    result += data.name;
                    result += ' eq ' + self.validateForm.value[data.name];
                }
            }
            // list_checkbox 处理
            if (data.type === 'list_checkbox' && data.value !== []) {
                let checklistNum = 0;
                for (let i = 0; i < data.value.length; i++) {
                    const isDataType = data.filter === 'profinetio' && data.name === 'dataType';
                    if (checklistNum === 0) {
                        if (isDataType) {
                            if (result) {
                                result += ' and (contains(' + data.name;
                                result += ',\'' + data.value[i] + '\')';
                            } else {
                                result += '(contains(' + data.name;
                                result += ',\'' + data.value[i] + '\')';
                            }
                        } else {
                            if (result) {
                                result += ' and (' + data.name;
                                result += ' eq \'' + data.value[i] + '\'';
                            } else {
                                result += '(' + data.name;
                                result += ' eq \'' + data.value[i] + '\'';
                            }
                        }
                    } else {
                        if (isDataType) {
                            if (result) {
                                result += ' or contains(' + data.name;
                                result += ',\'' + data.value[i] + '\')';
                            } else {
                                result += 'contains(' + data.name;
                                result += ',\'' + data.value[i] + '\')';
                            }
                        } else {
                            if (result) {
                                result += ' or ' + data.name;
                                result += ' eq \'' + data.value[i] + '\'';
                            } else {
                                result += data.name;
                                result += ' eq \'' + data.value[i] + '\'';
                            }
                        }
                    }
                    checklistNum++;
                }
                if (checklistNum) {
                    result += ')';
                }
            }
        });
        self.filterParameter = result;
        self.pageIndex = 1;  // 将当前页数设置为1
        const filterParams = {
            params: self.filterParameter,
            pageIndex: self.pageIndex,
        };
        console.log(filterParams);
        self.searchFilterTable.emit(filterParams);
        // self.getTableData();
    }


}
