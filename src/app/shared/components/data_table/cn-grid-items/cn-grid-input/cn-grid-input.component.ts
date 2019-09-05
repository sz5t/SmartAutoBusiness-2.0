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
  constructor() { }
  value = null;
  ngOnInit() {
    // console.log('input=>:', this.config,this.formGroup);
    if (this.valueConfig) {
      this.value = this.valueConfig.value;
    }
  }


  /**
   * valueChange
   */
  public valueChange(v?) {
    console.log("sllslslslslslsl:", v);
    const backValue ={id:this.valueConfig.id,name:this.config.field,value:v};
    this.updateValue.emit(backValue);
  }
  public cascadeAnalysis(c?) {
  }

}
