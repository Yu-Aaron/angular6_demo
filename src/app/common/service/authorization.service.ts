import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})

export class AuthorizationService {
    baseUrl = 'api/v2.0';

    constructor(private http: HttpClient) {
    }

    getMenu() {
        const url = `assets/json/conf.json`;
        return this.http.get(url);
    }

    logout() {
        return this.http.post(this.baseUrl + '/logout', null);
    }
}

