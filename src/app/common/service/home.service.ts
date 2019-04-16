import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class HomeService {

    constructor(private http: HttpClient) {
    }

    baseUrl = 'api/v2.0';

    getProgress() {
        return this.http.get(this.baseUrl + '/systemsetting/mw/systemstat');
    }

}

