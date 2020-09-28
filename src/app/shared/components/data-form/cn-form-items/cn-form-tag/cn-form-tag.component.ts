import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-cn-form-tag',
  templateUrl: './cn-form-tag.component.html',
  styleUrls: ['./cn-form-tag.component.less']
})
export class CnFormTagComponent implements OnInit {
  @Input() public config;
  @Input() formGroup: FormGroup;
  @Input() tempData;
  @Input() initData;
  @Output() public updateValue = new EventEmitter();
  @Input() public valueConfig;
  public text: string;
  public color: string;

  public value;

  constructor() { }
  ngOnInit() {
    if (this.valueConfig) {
      this.text = this.value;
      this._colorMappingResolve();
    }
  }

  private _colorMappingResolve() {
    if (this.config.dataMapping) {
      this.config.dataMapping.forEach(d => {
        let val = this.value;
        if (d.type === 'tempValue') {
          val = this.tempData[d['field']];
        }
        if (d.type  === 'initValue') {
          val = this.initData[d['field']];
        }
        if (d.type  === 'rowValue') {
          val = this.formGroup.value[d['field']];
        }
        if (d.type  === 'formValue') {
          val = this.formGroup.value[d['field']];
        }
        if (d.type  === 'currentValue') {
          val = this.value;
        }
        if (val && (d.value === val)) {
          this.color = d.color;
          if(d.valueText){
            this.text = d.valueText;
          }
          if(d.valueField){
            this.text = this.formGroup.value[d['valueField']];
          } 
          if(!d.valueText && !d.valueField) {
            this.text = this.value;
          }
          return false;
        }
      })
    }
  }

  public async valueChange(v?) {
    this.value =v;
    this.text = this.value;
    this._colorMappingResolve();
  }

  public cascadeAnalysis (c?){

  }

}
