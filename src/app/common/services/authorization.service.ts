import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class AuthorizationService {

    constructor(private http: HttpClient) {
    }

    getMenu() {
        const url = `assets/jsons/conf.json`;
        return this.http.get(url);
    }
}
