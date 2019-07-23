import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'cfg-form-select',
  templateUrl: './cfg-form-select.component.html',
  styleUrls: ['./cfg-form-select.component.css']
})
export class CfgFormSelectComponent implements OnInit {
  @Input() public config;
  constructor() { }

  public ngOnInit() {
  }

}
