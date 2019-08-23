import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-cn-form-radio',
  templateUrl: './cn-form-radio.component.html',
  styleUrls: ['./cn-form-radio.component.less']
})
export class CnFormRadioComponent implements OnInit {
  @Input() public config;
  @Input() formGroup: FormGroup;
  @Output() public updateValue = new EventEmitter();
  radioValue = 'A';
  radioValues = {
    "A": false,
    "B": false,
    "C": false,
    "D": false,
  };
  constructor() { }

  ngOnInit() {
  }


  public radioValueChange(v?, type?) {

    console.log('单选点击=》' + type + ':', v);
  }

  /**
   * radioClick
   */
  public radioClick(t?) {
    if (this.radioValues[t]) {
      this.radioValue = null;
      this.radioValues[t] = false;
    } else {
      // tslint:disable-next-line:forin
      for (const x in this.radioValues) {
        this.radioValues[x] = false;
      }
      this.radioValues[t] = true;
    }

    console.log('radioClick', t, this.radioValue);

  }

  valueChange(v?){

    console.log('radio group',v);

  }

}
