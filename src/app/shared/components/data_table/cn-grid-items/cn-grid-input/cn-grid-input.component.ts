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
    const backValue ={id:this.valueConfig.id,name:this.config.field,value:v};
    this.updateValue.emit(backValue);
  }
  public cascadeAnalysis(c?) {
  }

}
