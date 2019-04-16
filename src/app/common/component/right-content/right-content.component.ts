import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-right-content',
  templateUrl: './right-content.component.html',
  styleUrls: ['./right-content.component.scss']
})
export class RightContentComponent implements OnInit {

  @Input() currentState: string;
  @Input() currentSubState: string;
  constructor() { }

  ngOnInit() {
  }

}