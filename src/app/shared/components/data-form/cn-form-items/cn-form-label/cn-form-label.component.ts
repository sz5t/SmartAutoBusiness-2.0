import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-cn-form-label',
  templateUrl: './cn-form-label.component.html',
  styleUrls: ['./cn-form-label.component.less']
})
export class CnFormLabelComponent implements OnInit {
  @Input() public config;
  @Input() formGroup: FormGroup;
  @Output() public updateValue = new EventEmitter();

  public value:any;
  constructor() { }

  ngOnInit() {
  }
    
  /**
   * valueChange
   */
  public valueChange(v?) {
    this.value = v;
    // console.log('label 值变化', v);
    const backValue = { name: this.config.field, value: v, id: this.config.config.id };
    // this.updateValue.emit(backValue);
  }

  public cascadeAnalysis(c?) {
  }

}
