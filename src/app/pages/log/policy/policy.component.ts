import { Component, OnInit } from '@angular/core';
import { LogService } from "../../../common/services/log.service";

@Component({
    selector: 'app-policy',
    templateUrl: './policy.component.html',
    styleUrls: ['./policy.component.scss']
})
export class PolicyComponent implements OnInit {

    pageIndex = 1;
    pageSize = 10;
    total = 1;
    dataSet = [];
    loading = true;
    sortValue = null;
    sortKey = null;
    allChecked = false;
    indeterminate = false;
    displayData = [];

    constructor(private logService: LogService) {
    }

    searchData(reset: boolean = false): void {
        if (reset) {
            this.pageIndex = 1;
        }
        this.loading = true;
        this.logService.getPolicyLogList(this.pageIndex, this.pageSize).subscribe((data: any) => {
            this.loading = false;
            for (let item of data) {
                item.checked = false;
            }
            this.dataSet = data;
        });
    }

    getTotalCount() {
        this.logService.getPolicyLogCount().subscribe((data: any) => {
            this.total = data;
        });
    }

    currentPageDataChange($event: Array<{ name: string; age: number; address: string; checked: boolean; disabled: boolean; }>): void {
        this.displayData = $event;
        console.log('this.displayData');
        console.log(this.displayData);
        this.refreshStatus();
    }

    refreshStatus(): void {
        const allChecked = this.displayData.filter(value => !value.disabled).every(value => value.checked === true);
        const allUnChecked = this.displayData.filter(value => !value.disabled).every(value => !value.checked);
        this.allChecked = allChecked;
        this.indeterminate = (!allChecked) && (!allUnChecked);
        console.log('this.allChecked');
        console.log(this.allChecked);
        console.log(this.indeterminate);
        console.log('this.displayData');
        console.log(this.displayData);
    }

    checkAll(value: boolean): void {
        this.displayData.forEach(data => {
            if (!data.disabled) {
                data.checked = value;
            }
        });
        this.refreshStatus();
    }

    ngOnInit() {
        this.searchData();
        this.getTotalCount();
    }

}
