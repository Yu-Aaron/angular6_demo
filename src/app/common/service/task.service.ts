import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonService } from './common.service';
import { UcdService } from './ucd.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  baseUrl = 'api/v2.0';

  constructor(
    public http: HttpClient,
    public commonService: CommonService,
    public ucdService: UcdService
  ) { }

  getTask(taskId, ip?) {
    return this.http.get(this.ucdService.getUrl(ip) + this.baseUrl + '/tasks/' + taskId);
  }
}
