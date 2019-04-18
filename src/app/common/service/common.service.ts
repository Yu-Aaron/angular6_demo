import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})

export class CommonService {

    constructor(private http: HttpClient) {
    }

    baseUrl = 'api/v2.0/';
    topology = {};
    topologyId: string;

    getDomain() {
        if (sessionStorage.getItem('topologyId')) {
            this.topologyId = sessionStorage.getItem('topologyId');
        }
        const url = `${this.baseUrl}domains/`;
        return this.http.get(url).subscribe((data) => {
            this.topology = data[0].domainInfo;
            this.topologyId = data[0].domainInfo.currentTopologyId;
            sessionStorage.setItem('topologyId', this.topologyId);
        });
    }

    encodeURL(urlObj) {
        if (urlObj) {
            Object.keys(urlObj).forEach(function (key) {
                // urlObj[key] = encodeURI(urlObj[key]);
                if (typeof (urlObj[key]) === 'string') {
                    urlObj[key] = urlObj[key].replace(/\s/g, '%20');
                }
            });
        }
        return urlObj;
    }

    //contains 参数拼接
    filterFunc(q, fields) {
        return '((' + q.split(' ').map(function (qa) {
            return fields.map(function (field) {
                return 'contains(' + field + ',\'' + qa + '\')';
            }).join(' or ');
        }).join(') and (') + '))';
    }

}
