import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-configure-component',
  templateUrl: './configure-component.component.html',
  styleUrls: ['./configure-component.component.less']
})
export class ConfigureComponentComponent implements OnInit {
  @Input() public config: any;
  constructor() { }

  ngOnInit() {
  }

}
