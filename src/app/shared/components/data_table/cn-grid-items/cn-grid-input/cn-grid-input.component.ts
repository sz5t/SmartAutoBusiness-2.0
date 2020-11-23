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
  cascadeValue: any;
  constructor() { }
  value = null;
  count = 0;
  ngOnInit() {
    // console.log('input=>:', this.config,this.formGroup);
    let v_value;
    if (this.valueConfig) {
      v_value = this.valueConfig.value;
    }


if (typeof(v_value) === "undefined"){ 
  if (this.state === 'new') {
    if (this.config.defaultValue) {
      if (!this.value) {
        v_value = this.config.defaultValue;
      }
    }
  }
}else if (!v_value && typeof(v_value)!=="undefined" && v_value!==0){ 
  if (this.state === 'new') {
    if (this.config.defaultValue) {
      if (!this.value) {
        v_value = this.config.defaultValue;
      }
    }
  } 
}


    

    setTimeout(() => {
      this.value = v_value;
      this.valueChange(this.value);
    });

  }


  /**
   * valueChange
   */
  public valueChange(v?) {
    const backValue = { id: this.valueConfig.id, name: this.config.field, value: v, count: this.count };
    this.updateValue.emit(backValue);
    this.count += 1;
  }
  public cascadeAnalysis(c?) {
    if (c && c.hasOwnProperty(this.config.field)) {
      if (c[this.config.field].hasOwnProperty('cascadeValue')) {
        this.cascadeValue = c[this.config.field].cascadeValue;
      }
      if (c[this.config.field].hasOwnProperty('exec')) {
        if (c[this.config.field].exec === 'setValue') {
          this.value = c[this.config.field]['setValue']['value'];
          this.assemblyValue();
        }
        if (c[this.config.field].exec === 'computeSetValue') {
          this.value = c[this.config.field]['computeSetValue']['value'];
          this.assemblyValue();
        }
      }

    }
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
    console.log('组装值', this.value)
    this.valueChange(this.value);
  }
  // 远程操作
  public remoteOperation() {
    this.count = 0;
    let v_value;
    if (this.valueConfig) {
      v_value = this.valueConfig.value;
    }
    if (this.state === 'new') {
      if (this.config.defaultValue) {
        if (!this.value) {
          v_value = this.config.defaultValue;
        }
      }
    }
    setTimeout(() => {
      this.value = v_value;
      this.valueChange(this.value);
    });
  }

}
