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
  switchvalue=true;
  value;
  ngOnInit() {
  }

  /**
   * valueChange
   */
  public valueChange(v?) {

    console.log('switch_value',v);
    if(v===1){
      this.switchvalue = true;
    }
    else {
      this.switchvalue = false;
    }
    
  }

public switchvalueChange(v?){
  console.log('switch',v);
  if(v){
    this.value = 1;
  }else{
    this.value = 0;
  }
}

  public cascadeAnalysis(c?) {}
}
