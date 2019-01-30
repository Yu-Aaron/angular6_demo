import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class OverviewService {

    constructor(private http: HttpClient) {
    }

    baseUrl = 'api/v2.0';

    getTodayTotal(startTime, endTime) {
        return this.http.get(this.baseUrl + '/incidents/onedayincidentcount/groupbylevel/starttime/' + startTime + '/endtime/' + endTime);
    }

    getDeviceTypeDistribution() {
        return this.http.get(this.baseUrl + '/devices/getDeviceCountGroupbySubCategory');
    }

    getSignatureTop(count) {
        return this.http.get(this.baseUrl + '/incidents/incidentcount/groupbyblackrule/count/' + count);
    }

    getAttackSource(count) {
        return this.http.get(this.baseUrl + '/incidents/attackeddevice/incidentcount/count/' + count);
    }

    getAttackTarget(count) {
        return this.http.get(this.baseUrl + '/incidents/beattackeddevice/incidentcount/count/' + count);
    }

}
