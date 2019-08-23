import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-cn-form-checkbox',
  templateUrl: './cn-form-checkbox.component.html',
  styleUrls: ['./cn-form-checkbox.component.less']
})
export class CnFormCheckboxComponent implements OnInit {
  @Input() public config;
  @Input() formGroup: FormGroup;
  @Output() public updateValue = new EventEmitter();
  value = null;

  checkOptionsOne = [
    { label: 'Apple', value: 'A', checked: false },
    { label: 'Pear', value: 'P', checked: false },
    { label: 'Orange', value: 'O', checked: false },
    { label: 'Brange', value: 'B', checked: false }
  ];
  constructor() { }

  ngOnInit() {
  }
  log(value: string[]): void {
    console.log('log', value);
    // 判断
    if (value && value.length > 0) {
      if (typeof (value[0]) === 'string') {
        this.value = value.join(',');
      }
      else {
        const _v = [];
        value.forEach(item => {
          if (item['checked'])
            _v.push(item['value']);
        });
        this.value = _v.join(',');
      }

    }



  }

  valueChange(v?) {
    console.log('多选值=>开始', v);
    let checkeds = [];
    // tslint:disable-next-line:prefer-conditional-expression
    if (v) {
      checkeds = v.split(',');
    } else {
      checkeds = [];
    }
    if(v!== this.value){
      this.checkOptionsOne.forEach(ck => {
        ck['checked'] = false;
        checkeds.forEach(ckitem => {
          if (ckitem === ck['value']){
            ck['checked'] = true;
          }
        });
      });
    }
    const backValue = { name: this.config.field, value: v, id: this.config.config.id};
    this.updateValue.emit(backValue);
    console.log('多选值=>结束', v,this.checkOptionsOne);
  }

}
