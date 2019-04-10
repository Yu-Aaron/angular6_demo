import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ConfigService {

    constructor(private http: HttpClient) {
    }

    baseUrl = 'api/v2.0/';

    getVersion() {
        const url = `${this.baseUrl}systemsetting/configuration/item/buildVersion`;
        return this.http.get(url);
    }

    getImage() {
        const url = `${this.baseUrl}users/getImage`;
        return this.http.get(url);
    }

    getSecretKey() {
        const url = `${this.baseUrl}users/getSecretKey`;
        return this.http.get(url);
    }

    login(loginInfo) {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/x-www-form-urlencoded'
            })
        };
        const url = `${this.baseUrl}login`;
        return this.http.post(url, loginInfo, httpOptions);
    }

    whoAmI() {
        const url = `${this.baseUrl}users/whoami`;
        return this.http.get(url);
    }
}

