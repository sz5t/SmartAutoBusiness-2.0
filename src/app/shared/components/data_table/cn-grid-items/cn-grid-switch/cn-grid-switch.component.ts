import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-cn-grid-switch',
  templateUrl: './cn-grid-switch.component.html',
  styleUrls: ['./cn-grid-switch.component.less']
})
export class CnGridSwitchComponent implements OnInit {
  @Input() public config;
  @Input() public valueConfig;
  @Output() public updateValue = new EventEmitter();
  @Input() public state;
  value = null;
  count = 0;
  constructor() { }

  ngOnInit() {
    let v_value;
    if (this.valueConfig) {
      v_value = this.valueConfig.value;
    }
    if(this.state ==='new'){
      if (this.config.defaultValue) {
        if (!this.value) {
          v_value = this.config.defaultValue;
        }
      }
    }

    setTimeout(() => {
      this.value =v_value;
      this.valueChange( this.value);
    });
  }

  public valueChange(v?) {

    console.log('switch',v);
    const backValue ={id:this.valueConfig.id,name:this.config.field,value:v,count:this.count};
    this.updateValue.emit(backValue);
    this.count +=1;
    
  }
  public cascadeAnalysis(c?) {}

}
