import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../common/service/user.service';

@Component({
  selector: 'app-usergroup',
  templateUrl: './usergroup.component.html',
  styleUrls: ['./usergroup.component.scss']
})
export class UsergroupComponent implements OnInit {

  dataSet = [];   // 用户数据
  params: {};    // 参数
  total: number;  // 数据总条数
  pageSize = 10; // 每页展示多少条
  pages: number;   // 共多少页

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
      this.dataSet = data['data'];
      this.total = this.dataSet.length;
      this.pages = Math.ceil(this.total / this.pageSize);
    });
  }

}
