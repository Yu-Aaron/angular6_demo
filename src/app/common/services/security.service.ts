import { CommonService } from './common.service';
import {Injectable} from '@angular/core';
import {HttpClient} from '../../../../node_modules/@angular/common/http';
import { Observable, of, from } from 'rxjs';
import { HttpParams } from '@angular/common/http';
@Injectable({
    providedIn: 'root'
})
export class SecurityService {

    constructor(private http: HttpClient, private commonService: CommonService) {
    }

    baseUrl = 'api/v2.0';

    getSecurityTableData(params): Observable<any> {
        // topolopy id 是mock 的，后续得修改
        return this.http.get(this.baseUrl + '/incidents/topology/' + 'd3c327c1-6915-44df-a29d-9b214a24d65f', {
            params: this.commonService.encodeURL(params)
        });
    }
    // 获取总数
    getSecurityTableTotalData() {
        return this.http.get(this.baseUrl + '/incidents/topology/' + 'd3c327c1-6915-44df-a29d-9b214a24d65f' + '/incidentcount');
    }

    // 点击搜索按钮时调取的接口
    getSearchData(params) {
        return this.http.get(this.baseUrl + '/datadictionaries/topology/' + 'd3c327c1-6915-44df-a29d-9b214a24d65f' + '/type/incidents/source/' + params);
    }

    // 获取点击搜索按钮时的总数
    getFilterData(params) {
        return this.http.get(this.baseUrl + '/incidents/topology/' + 'd3c327c1-6915-44df-a29d-9b214a24d65f' + '/count', {
            params: this.commonService.encodeURL(params)
        });
    }
}
