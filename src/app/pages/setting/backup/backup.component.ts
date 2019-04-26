import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-backup',
  templateUrl: './backup.component.html',
  styleUrls: ['./backup.component.scss']
})
export class BackupComponent implements OnInit {

  loading: boolean;
  listOfData = [];   // 备份数据

  constructor() { }

  ngOnInit() {
  }

}
