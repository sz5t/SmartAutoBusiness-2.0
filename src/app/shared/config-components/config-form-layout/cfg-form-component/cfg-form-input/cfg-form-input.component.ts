import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'cfg-form-input',
  templateUrl: './cfg-form-input.component.html',
  styleUrls: ['./cfg-form-input.component.css']
})
export class CfgFormInputComponent implements OnInit {
  @Input() public config;
  constructor() { }

  public ngOnInit() {
    this.config['name'] = 'inputname';
  }

}
