import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-cn-form-switch',
  templateUrl: './cn-form-switch.component.html',
  styleUrls: ['./cn-form-switch.component.less']
})
export class CnFormSwitchComponent implements OnInit {
  @Input() public config;
  @Input() formGroup: FormGroup;
  @Output() public updateValue = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  /**
   * valueChange
   */
  public valueChange(v?) {

    console.log('switch',v);
    
  }
  public cascadeAnalysis(c?) {}
}
