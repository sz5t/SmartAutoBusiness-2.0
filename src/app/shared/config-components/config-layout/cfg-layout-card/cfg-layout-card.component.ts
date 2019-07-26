import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'cfg-layout-card,[cfg-layout-card]',
  templateUrl: './cfg-layout-card.component.html',
  styleUrls: ['./cfg-layout-card.component.css']
})
export class CfgLayoutCardComponent implements OnInit {
  @Input() public designStatus;  // 设计状态
  constructor() { }

  ngOnInit() {
  }

}
