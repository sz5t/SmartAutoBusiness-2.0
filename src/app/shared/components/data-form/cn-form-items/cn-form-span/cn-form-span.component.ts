import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BSN_COMPONENT_SERVICES } from '@core/relations/bsn-relatives';
import { ComponentServiceProvider } from '@core/services/component/component-service.provider';
import { CnComponentBase } from '@shared/components/cn-component.base';

@Component({
  selector: 'app-cn-form-span',
  templateUrl: './cn-form-span.component.html',
  styleUrls: ['./cn-form-span.component.less']
})
export class CnFormSpanComponent  extends CnComponentBase implements OnInit {

  @Input() public config;
  @Input() formGroup: FormGroup;
  @Output() public updateValue = new EventEmitter();
  public isShow = true;
  public showAll = false;
  public showLable;
  public showShortLable;
  public showTitle;
  public value:any;
  constructor(@Inject(BSN_COMPONENT_SERVICES)
  public componentService: ComponentServiceProvider) {
    super(componentService);
    this.initValue = {};
    this.tempValue = {};
  }

  ngOnInit() {
  }
    
  /**
   * valueChange
   */
  public valueChange(v?) {
    this.value = v;
    // console.log('label 值变化', v);
    const backValue = { name: this.config.field, value: v, id: this.config.config.id };
    this.showLable = v;
    this.initText(v);
    // this.updateValue.emit(backValue);
  }

  public cascadeAnalysis(c?) {
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

  valueChangeBack(v?) {
    const backValue = { name: this.config.field, value: v, id: this.config.config.id };
    this.updateValue.emit(backValue);
  }

  public initText(v?){
    if (this.config.formatConfig) {
     
      const  formatConfig = this.config.formatConfig
        let regularData =v;
        if (formatConfig.type) {
          if (formatConfig.type === 'row') {
            if (this.formGroup.value) {
              regularData = this.formGroup.value[formatConfig['valueName']];
            }
          }
        }
        this.showTitle = regularData;
        this.showLable = regularData;
        const regularflag = formatConfig.responseConfig.substrlength ? formatConfig.responseConfig.substrlength : 50;
        if (regularData) {
          if (regularData.length <= regularflag) {
            this.isShow = true;
            return true;
          } else {
            this.isShow = false;
            this.showShortLable = regularData.substring(0, regularflag);
            return true;
          }
        }


     


    }
  }
    // 展开文本
    public openSapn() {
      this.showAll = !this.showAll;
  
    }
  
    // 收缩文本
    public closeSapn() {
      this.showAll = !this.showAll;
  
    }

}
