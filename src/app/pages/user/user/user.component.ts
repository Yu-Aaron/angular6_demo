import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../common/service/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  dataSet: [];   // 用户数据
  params: {};    // 参数

  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {
    this.getUserTableData();
  }

  getUserTableData() {
    this.params = {
      $limit: 10,
      $skip: 0
    };
    this.userService.getUser(this.params).subscribe(data => {
      console.log(data);
    });
  }
}
