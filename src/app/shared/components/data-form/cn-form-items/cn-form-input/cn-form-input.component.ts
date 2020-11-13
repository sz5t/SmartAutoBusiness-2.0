import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CnComponentBase } from '@shared/components/cn-component.base';
import { ComponentServiceProvider } from '@core/services/component/component-service.provider';
import { BSN_COMPONENT_SERVICES } from '@core/relations/bsn-relatives';

@Component({
  selector: 'app-cn-form-input',
  templateUrl: './cn-form-input.component.html',
  styleUrls: ['./cn-form-input.component.less']
})
export class CnFormInputComponent extends CnComponentBase implements OnInit {
  @Input() public config;
  @Input() formGroup: FormGroup;
  @Output() public updateValue = new EventEmitter();
  constructor(@Inject(BSN_COMPONENT_SERVICES)
  public componentService: ComponentServiceProvider) {
    super(componentService);
    this.initValue = {};
    this.tempValue = {};
  }
  value;
  ngOnInit() {
    // console.log('input=>:', this.config,this.formGroup);
  }


  /**
   * valueChange
   */
  public valueChange(v?) {
    // console.log('input 值变化', v, this.formGroup);
    // tslint:disable-next-line:forin
    for (const key in this.formGroup.controls) {
      this.formGroup.controls[key].markAsPristine();
      this.formGroup.controls[key].updateValueAndValidity();
    }
  }
  public cascadeAnalysis(c?) {
        // 分类完善信息，此处完善的信息为 异步参数处理
    // cascadeValue
    if (c.hasOwnProperty(this.config.field)) {
      if (c[this.config.field].hasOwnProperty('cascadeValue')) {
        this.cascadeValue = c[this.config.field].cascadeValue;
      }
    

      if (c[this.config.field].hasOwnProperty('exec')) {
        if (c[this.config.field].exec === 'updateValue') {
          this.valueChangeBack(this.value);
        }
      }

    }
  }

  public async onKeyPress(e) {
    if (e.code === 'Enter') {
      this.valueChangeBack(this.value);
    } else {
      if (e.code === 'ArrowDown') {

      } else {
      }
    }
  }

  valueChangeBack(v?) {
    const backValue = { name: this.config.field, value: v, id: this.config.config.id };
    this.updateValue.emit(backValue);
  }

  public onblur(e?, type?) {
    console.log('input_onblur',this.value)
    this.valueChangeBack(this.value);
  }



}
