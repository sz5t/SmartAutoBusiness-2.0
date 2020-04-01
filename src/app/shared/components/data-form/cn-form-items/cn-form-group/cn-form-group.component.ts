import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-cn-form-group',
  templateUrl: './cn-form-group.component.html',
  styleUrls: ['./cn-form-group.component.less']
})
export class CnFormGroupComponent implements OnInit {
  @Input() public config;
  @Input() formGroup: FormGroup;
  @Output() public updateValue = new EventEmitter();
  constructor() { }
  value;
  ngOnInit() {
    console.log('input=>:', this.config, this.formGroup);
  }


  /**
   * valueChange
   */
  public valueChange(v?) {
    // console.log('input 值变化', v, this.formGroup);
    // // tslint:disable-next-line:forin
    // for (const key in this.formGroup.controls) {
    //   this.formGroup.controls[key].markAsPristine();
    //   this.formGroup.controls[key].updateValueAndValidity();
    // }
  }
  public cascadeAnalysis(c?) {
  }
}
