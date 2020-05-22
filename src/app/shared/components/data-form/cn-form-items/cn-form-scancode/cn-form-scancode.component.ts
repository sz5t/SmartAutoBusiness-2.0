import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CnComponentBase } from '@shared/components/cn-component.base';
import { BSN_COMPONENT_SERVICES } from '@core/relations/bsn-relatives';
import { ComponentServiceProvider } from '@core/services/component/component-service.provider';
import { ParameterResolver } from '@shared/resolver/parameter/parameter.resolver';
import { isArray } from 'util';

@Component({
  selector: 'app-cn-form-scancode,[cn-form-scancode]',
  templateUrl: './cn-form-scancode.component.html',
  styleUrls: ['./cn-form-scancode.component.less']
})
export class CnFormScancodeComponent extends CnComponentBase implements OnInit {

  @Input() public config;
  @Input() formGroup: FormGroup;
  @Input() public initData;
  @Input() public tempData;
  @Output() public updateValue = new EventEmitter();
  constructor(@Inject(BSN_COMPONENT_SERVICES)
  public componentService: ComponentServiceProvider) {
    super(componentService);
  }
  value = null;
  selectedRowItem;
  ngOnInit() {
    // console.log('input=>:', this.config,this.formGroup);
  }


  /**
   * valueChange
   */
  public valueChange(v?) {
    console.log('input 值变化', v,   this.selectedRowItem);
    // tslint:disable-next-line:forin
    for (const key in this.formGroup.controls) {
      if (this.config.field === key) {
        this.formGroup.controls[key].markAsPristine();
        this.formGroup.controls[key].updateValueAndValidity();
      }
    }
    const backValue = { name: this.config.field, value: v, id: this.config.config.id,dataItem: this.selectedRowItem };
    this.updateValue.emit(backValue);
  }
  public cascadeAnalysis(c?) {
  }


  // 构建参数-》下拉选择自加载数据
  public buildParameters(paramsCfg) {
    return ParameterResolver.resolve({
      params: paramsCfg,
      tempValue: this.tempValue,
      componentValue: { value: this.value }, //  组件值？返回值？级联值，需要三值参数
      initValue: this.initValue,
      cacheValue: this.cacheValue,
      router: this.routerValue,
      cascadeValue: this.cascadeValue
    });
  }


  isScan = true;
  oldvalue = null;
  public async onKeyPress(e) {
    if (e.code === 'Enter') {
      this.isScan = false;
      this.oldvalue = this.value;
       const result = await this.load();
      //  扫码后 触发返回
      //  this.valueChange(this.value, result.data);
      this.valueChange(this.value);
    } else {
      if (e.code === 'ArrowDown') {

      } else {
        if (!this.isScan) {
          const newvalue = this.value;
          if (this.oldvalue) {
            this.value = newvalue.substring(
              this.oldvalue.length ? this.oldvalue.length : 0
            );
          }
          this.isScan = true;
        }
      }
    }
  }

  // 扫码后数据加载  可配置，当前扫码是否加载数据，后续操作均由返回触发级联执行
  public async load() {
    // 【参数不全是否阻止加载！】
    // 对后续业务判断有影响
    //  console.log('===select 自加载====>load');
    if(!this.config.loadingItemConfig['ajaxConfig']){
        return false;
    }
    const url = this.config.loadingItemConfig['ajaxConfig'].url;
    const method = this.config.loadingItemConfig['ajaxConfig'].ajaxType;
    const params = {
      ...this.buildParameters(this.config.loadingItemConfig['ajaxConfig'].params)
    };
    // 考虑满足 get 对象，集合，存储过程【指定dataset 来接收数据】，加载错误的信息提示

    const response = await this.componentService.apiService.getRequest(url, method, { params }).toPromise();
    console.log('--da---' + this.config.field, response);
    if (isArray(response.data)) {
      if (response.data && response.data.length > 0) {
        const data_form = response.data;
         this.selectedRowItem = data_form[0];
      }
      else {
        this.selectedRowItem = null;
      }
    } else {
      if (response.data) {

        const _data = response.data;
          this.selectedRowItem =_data;
      } else {
        this.selectedRowItem = null;
      }
    }




  }

}
