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
        const val = this.value;
        if (val && (d.value === val)) {
          this.color = d.color;
          if(d.valueText){
            this.text = d.valueText;
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
