import { Component, OnInit } from '@angular/core';
import { AssetService } from '../../../common/services/asset.service';

@Component({
  selector: 'app-securitydevice',
  templateUrl: './securitydevice.component.html',
  styleUrls: ['./securitydevice.component.scss']
})
export class SecuritydeviceComponent implements OnInit {

  constructor(public assetService: AssetService) { }

  ngOnInit() {
  }

}
