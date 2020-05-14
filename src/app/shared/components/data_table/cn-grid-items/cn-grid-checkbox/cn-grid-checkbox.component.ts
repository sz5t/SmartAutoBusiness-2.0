import { Component, OnInit, Inject, Output, EventEmitter, Input } from '@angular/core';
import { isArray } from 'util';
import { ParameterResolver } from '@shared/resolver/parameter/parameter.resolver';
import { BSN_COMPONENT_SERVICES } from '@core/relations/bsn-relatives';
import { ComponentServiceProvider } from '@core/services/component/component-service.provider';
import { FormGroup } from '@angular/forms';
import { CnComponentBase } from '@shared/components/cn-component.base';

@Component({
  selector: 'app-cn-grid-checkbox',
  templateUrl: './cn-grid-checkbox.component.html',
  styleUrls: ['./cn-grid-checkbox.component.less']
})
export class CnGridCheckboxComponent  extends CnComponentBase implements OnInit {
  @Input() public config;
  @Output() public updateValue = new EventEmitter();
  @Input() public valueConfig;
  @Input() public state;
  @Input() public initData;
  @Input() public rowData;
  @Input() public tempData;
  value = null;
  selectItems;
  checkOptions = [
    { label: 'Apple', value: 'A', checked: false },
    { label: 'Pear', value: 'P', checked: false },
    { label: 'Orange', value: 'O', checked: false },
    { label: 'Brange', value: 'B', checked: false }
  ];
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
        this.checkOptions = this.config.options;
        });
        this.selectItems = this.config.options;
      }
    }

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

  async valueChange(v?) {
    console.log('多选值=>开始', v);
    const backValue = { name: this.config.field, value: v, id: this.valueConfig.id};
    if(v){
      if( this.selectItems.length<1){
        await  this.load();
      }
      // const index = this.selectItems.findIndex(item => item[this.config['valueName']] === v);
      // if (index > -1) {
      //   backValue['dataItem'] = this.selectItems[index];
      // } else {
      // }
    }
    let checkeds = [];
    // tslint:disable-next-line:prefer-conditional-expression
    if (v) {
      checkeds = v.split(',');
    } else {
      checkeds = [];
    }
    if(v!== this.value){
      this.checkOptions.forEach(ck => {
        ck['checked'] = false;
        checkeds.forEach(ckitem => {
          if (ckitem === ck['value']){
            ck['checked'] = true;
          }
        });
      });
    }
    this.updateValue.emit(backValue);
    console.log('多选值=>结束', v);
  }
  public cascadeAnalysis(c?) {

    // 分类完善信息，此处完善的信息为 异步参数处理
    // cascadeValue
    if (c.hasOwnProperty(this.config.field)) {
      if (c[this.config.field].hasOwnProperty('cascadeValue')) {
        this.cascadeValue = c[this.config.field].cascadeValue;
      }
      if (c[this.config.field].hasOwnProperty('exec')) {
        if (c[this.config.field].exec === 'ajax') {
          this.load();
        }
        if (c[this.config.field].exec === 'setValue') {
          this.value= c[this.config.field]['setValue']['value'];
       }
      }
    }

  }


  
  // 构建参数-》下拉选择自加载数据
  public buildParameters(paramsCfg) {
    return ParameterResolver.resolve({
      params: paramsCfg,
      tempValue: this.tempValue,
      // componentValue: { value: this.radioValue }, //  组件值？返回值？级联值，需要三值参数
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
      }
    } else {
      if (response.data) {
        selectedRowItem= response.data;
        newOptions.push({ label: selectedRowItem[this.config.labelName], value: selectedRowItem[this.config.valueName] });
        this.selectItems.push(selectedRowItem);
      } else {
        selectedRowItem = null;
      }
    }
    setTimeout(() => {
      this.checkOptions = newOptions;
    });
  }

}
