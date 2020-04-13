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
  switchvalue = true;
  value = 2;

  off = 0;
  on = 1;

  selectOptions={
    check:{},
    close:{}
  };
  ngOnInit() {

    // off  关闭
    // on   打开
    if (this.config.hasOwnProperty('off')) {
      this.off = this.config.off;
    }
    if (this.config.hasOwnProperty('on')) {
      this.on = this.config.on;
    }



    if(this.config.options){
      this.config.options.forEach(element => {
        if(element['type']==='check') {
          this.selectOptions['check'] = element;
        }
        if(element['type']==='close') {
          this.selectOptions['close'] = element;
        }
      });
      this.on =this.selectOptions['check']['value'];
      this.off=this.selectOptions['close']['value'];
    }
  }

  /**
   * valueChange
   */
  public valueChange(v?) {
    console.log('switch_value', v);
    const backValue = { name: this.config.field, value: v, id: this.config.config.id };
    if (v ===  this.off) {
      this.switchvalue = true;
    }
    else {
      this.switchvalue = false;
    }
    this.updateValue.emit(backValue);
  
  }
 
  public switchvalueChange(v?) {
    console.log('switch', v);
    if (v) {
      this.value =  this.off;
    } else {
      this.value = this.on;
    }
    
  }

  public cascadeAnalysis(c?) { }
}
