import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UcdService {

  constructor() { }

  getUrl(ip?, head?, port?) {
    let flag = true;
    if (flag) {
      return ip ? ((head ? head : 'https://') + ip) : '';
    } else {
      return ip ? ((head ? head : 'http://') + ip + (port ? port : ':3000')) : '';
    }
  }
}
