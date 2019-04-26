import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-config',
  templateUrl: './login-config.component.html',
  styleUrls: ['./login-config.component.scss']
})
export class LoginConfigComponent implements OnInit {
  sysInfo = {
    name: '工业安全监测审计系统',
    copyright: '中科物安'
  };
  current = 0;
  seconds = 10;
  systime = 'manual';

  constructor() { }

  ngOnInit() {
  }

  pre() {
    this.current -= 1;
  }

  next() {
    this.current += 1;
  }

  done() {
    this.current = 3;
    let _this = this;
    let timer = setInterval(() => {
      _this.seconds--;
      if (_this.seconds === 0) {
        clearInterval(timer);
        // 页面跳转
      }
    }, 1000);
  }

}
