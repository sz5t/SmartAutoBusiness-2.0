import { Component, OnInit, Input, Output, Inject, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BSN_COMPONENT_SERVICES } from '@core/relations/bsn-relatives';
import { ComponentServiceProvider } from '@core/services/component/component-service.provider';
import { CnComponentBase } from '@shared/components/cn-component.base';

@Component({
  selector: 'app-cn-form-input-password',
  templateUrl: './cn-form-input-password.component.html',
  styleUrls: ['./cn-form-input-password.component.less']
})
export class CnFormInputPasswordComponent extends CnComponentBase implements OnInit {
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

  private passwordVisible = true;
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
      if(key===this.config.field){
        this.formGroup.controls[key].markAsPristine();
        this.formGroup.controls[key].updateValueAndValidity();
      }
      if(this.config.hasOwnProperty('validationControls')){
        const index = this.config.validationControls.findIndex(item=>item['controlName']===key);
        if(index>-1){
          this.formGroup.controls[key].markAsPristine();
          this.formGroup.controls[key].updateValueAndValidity();
        }
      }
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
    this.valueChange();
  }

  public onblur(e?, type?) {
    console.log('input_onblur',this.value)
    this.valueChangeBack(this.value);
  }

  private passwordVisibleClick(){
    this.passwordVisible = !this.passwordVisible;
    if(this.passwordVisible){
      this.config.displayType ="password";
    } else{
      this.config.displayType ="text";
    }

  }



}
