import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';
import { CnComponentBase } from '@shared/components/cn-component.base';
import { isArray } from 'util';
import { ParameterResolver } from '@shared/resolver/parameter/parameter.resolver';
import { BSN_COMPONENT_SERVICES } from '@core/relations/bsn-relatives';
import { ComponentServiceProvider } from '@core/services/component/component-service.provider';

@Component({
  selector: 'app-cn-grid-radio',
  templateUrl: './cn-grid-radio.component.html',
  styleUrls: ['./cn-grid-radio.component.less']
})
export class CnGridRadioComponent extends CnComponentBase implements OnInit {

  @Input() public config;
  @Input() public valueConfig;
  @Output() public updateValue = new EventEmitter();
  @Input() public state;
  @Input() public initData;
  @Input() public rowData;
  @Input() public tempData;
  value = null;
  count = 0;
  selectOptions = [];
  selectItems = [];
  radioValue = 'A';
  radioValues = {
    "A": false,
    "B": false,
    "C": false,
    "D": false,
  };
  constructor(@Inject(BSN_COMPONENT_SERVICES)
  public componentService: ComponentServiceProvider) {
    super(componentService);
  }

  ngOnInit() {
    if (this.config.loadingConfig) {
      // this.load();
    } else {
      if (this.config.options) {
        setTimeout(() => {
        this.selectOptions = this.config.options;
        });
        this.selectItems = this.config.options;
      }
    }

    let v_value;
   if (this.valueConfig) {
     v_value = this.valueConfig.value;
   }
   if(this.state ==='new'){
     if (this.config.defaultValue) {
       if (!this.value) {
         v_value = this.config.defaultValue;
       }
     }
   }

   setTimeout(() => {
     this.value =v_value;
     this.valueChange( this.value);
   });

  }


  public radioValueChange(v?, type?) {

    console.log('单选点击=》' + type + ':', v);
  }

  /**
   * radioClick
   */
  public radioClick(t?) {

    const index =  this.selectOptions.findIndex(v=>v.value===t);
    if(index>-1){
       if(this.selectOptions[index]['selected']){
             this.radioValue = null;
             this.selectOptions[index]['selected'] = false;
       } else {
        this.selectOptions.forEach(op=>{
            op['selected'] = false;
        });
        this.selectOptions[index]['selected'] = true;
       }
    }
   console.log('radioClick', index);
  }

  async valueChange(v?){
    const backValue ={id:this.valueConfig.id,name:this.config.field,value:v,count:this.count};
    if(v){
      if( this.selectItems.length<1){
        await  this.load();
      }
      const index = this.selectItems.findIndex(item => item[this.config['valueName']] === v);
      if (index > -1) {
        backValue['dataItem'] = this.selectItems[index];
      } else {
      //  if(v)
          // myControl.setValue(null, { emitEvent: true });
      }
    }
  
     console.log('radio 值变化', v, this.config.field ,  this.selectItems);
    this.updateValue.emit(backValue);

  }

  // 构建参数-》下拉选择自加载数据
  public buildParameters(paramsCfg) {
    return ParameterResolver.resolve({
      params: paramsCfg,
      tempValue: this.tempValue,
      componentValue: { value: this.radioValue }, //  组件值？返回值？级联值，需要三值参数
      initValue: this.initValue,
      cacheValue: this.cacheValue,
      router: this.routerValue,
      cascadeValue: this.cascadeValue
    });
  }
  public async load() {
    if( !this.config.loadingItemConfig){
      return null;
    }
    let selectedRowItem = null;
    const url = this.config.loadingConfig['ajaxConfig'].url;
    const method = this.config.loadingConfig['ajaxConfig'].ajaxType;
    const params = {
      ...this.buildParameters(this.config.loadingConfig['ajaxConfig'].params)
    };
    // 考虑满足 get 对象，集合，存储过程【指定dataset 来接收数据】，加载错误的信息提示
    const newOptions = [];
    const response = await this.componentService.apiService.getRequest(url, method, { params }).toPromise();
    if (isArray(response.data)) {
      if (response.data && response.data.length > 0) {
        const data_form = response.data;
        data_form.forEach(element => {
          newOptions.push({ label: element[this.config.labelName], value: element[this.config.valueName] });
        });
        this.selectItems = data_form;
      }
      else {
        selectedRowItem = null;
        this.selectItems = null;
      }
    } else {
      if (response.data) {
        selectedRowItem= response.data;
        newOptions.push({ label: selectedRowItem[this.config.labelName], value: selectedRowItem[this.config.valueName] });
        this.selectItems.push(selectedRowItem);
      } else {
        selectedRowItem = null;
        this.selectItems = null;
      }
    }
    setTimeout(() => {
      this.selectOptions = newOptions;
    });
  }

  public cascadeAnalysis(c?) {
    if (c && c.hasOwnProperty(this.config.field)) {
      if (c[this.config.field].hasOwnProperty('cascadeValue')) {
        this.cascadeValue = c[this.config.field].cascadeValue;
      }
      if (c[this.config.field].hasOwnProperty('exec')) {
        if (c[this.config.field].exec === 'setValue') {
           this.value= c[this.config.field]['setValue']['value'];
        }
      }

    }
  }
}
