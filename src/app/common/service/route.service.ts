import { Injectable, Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RouteService {

  private global = 'true';

  valueUpdated: Subject<string> = new Subject<string>();

  constructor() { }

  setVal(val) {
    this.global = val;
    this.valueUpdated.next(this.global);
  }

  getVal() {
    return this.global;
  }
}
