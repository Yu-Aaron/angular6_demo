import { Component, Input, OnInit, NgModule } from '@angular/core';
@NgModule()
@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {
    @Input() secondState: string;

    constructor() {
    }

    ngOnInit() {
    }

}
