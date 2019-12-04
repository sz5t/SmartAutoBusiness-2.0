import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-cn-form-button',
  templateUrl: './cn-form-button.component.html',
  styleUrls: ['./cn-form-button.component.less']
})
export class CnFormButtonComponent implements OnInit {
  @Input() public config;
  @Input() formGroup: FormGroup;
  @Output() public updateValue = new EventEmitter();

  public value: any = null;
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
