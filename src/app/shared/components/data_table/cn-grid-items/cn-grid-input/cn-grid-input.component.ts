import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-cn-grid-input',
  templateUrl: './cn-grid-input.component.html',
  styleUrls: ['./cn-grid-input.component.less']
})
export class CnGridInputComponent implements OnInit {
  @Input() public config;
  @Input() public valueConfig;
  @Output() public updateValue = new EventEmitter();
  @Input() public state;
  constructor() { }
  value = null;
  count = 0;
  ngOnInit() {
    // console.log('input=>:', this.config,this.formGroup);
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


  /**
   * valueChange
   */
  public valueChange(v?) {
    const backValue ={id:this.valueConfig.id,name:this.config.field,value:v,count:this.count};
    this.updateValue.emit(backValue);
    this.count +=1;
  }
  public cascadeAnalysis(c?) {
  }

  public onblur(e?, type?) {
    this.assemblyValue();

}
public onKeyPress(e?, type?) {
    if (e.code === 'Enter') {
        this.assemblyValue();
    }
}

// 组装值
public assemblyValue() {
   console.log('组装值',this.value)
    this.valueChange(this.value);
}
// 远程操作
public remoteOperation(){
  this.count =0;
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

}
