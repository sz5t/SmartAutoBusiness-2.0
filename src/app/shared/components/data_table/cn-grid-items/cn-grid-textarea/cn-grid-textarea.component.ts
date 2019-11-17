import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-cn-grid-textarea',
  templateUrl: './cn-grid-textarea.component.html',
  styleUrls: ['./cn-grid-textarea.component.less']
})
export class CnGridTextareaComponent implements OnInit {

  @Input() public config;
  @Input() public valueConfig;
  @Output() public updateValue = new EventEmitter();
  @Input() public state;
  value;
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
    const backValue ={id:this.valueConfig.id,name:this.config.field,value:v,count:this.count};
    this.updateValue.emit(backValue);
    this.count +=1;
  }

  public cascadeAnalysis(c?) {}
}
