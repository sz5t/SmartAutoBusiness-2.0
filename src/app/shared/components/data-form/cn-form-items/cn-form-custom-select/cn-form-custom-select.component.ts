import { Component, OnInit, Inject, Output, EventEmitter, Input, ViewChild } from '@angular/core';
import { BSN_COMPONENT_SERVICES } from '@core/relations/bsn-relatives';
import { ComponentServiceProvider } from '@core/services/component/component-service.provider';
import { FormGroup } from '@angular/forms';
import { CnComponentBase } from '@shared/components/cn-component.base';
import { CnPageComponent } from '@shared/components/cn-page/cn-page.component';
import { isArray } from 'util';
import { ParameterResolver } from '@shared/resolver/parameter/parameter.resolver';

@Component({
  selector: 'app-cn-form-custom-select',
  templateUrl: './cn-form-custom-select.component.html',
  styleUrls: ['./cn-form-custom-select.component.less']
})
export class CnFormCustomSelectComponent extends CnComponentBase implements OnInit {

  @Input() public config;
  @Input() formGroup: FormGroup;
  @Output() public updateValue = new EventEmitter();
  value = null;
  _value = null;
  selectedRowValue;
  selectedRowItem;
  public cascadeOptions: any;

  constructor(@Inject(BSN_COMPONENT_SERVICES)
  public componentService: ComponentServiceProvider) {
    super(componentService);
  }

  ngOnInit() {
  }


  // 构建参数-》下拉选择自加载数据
  public buildParameters(paramsCfg) {
    return ParameterResolver.resolve({
      params: paramsCfg,
      tempValue: this.tempValue,
      componentValue: { value: this._value }, //  组件值？返回值？级联值，需要三值参数
      initValue: this.initValue,
      cacheValue: this.cacheValue,
      router: this.routerValue,
      cascadeValue: this.cascadeValue
    });
  }

  /**
   * load 自加载
   */
  public async load() {
    // 【参数不全是否阻止加载！】
    // 对后续业务判断有影响
    //  console.log('===select 自加载====>load');
    const url = this.config.loadingConfig['ajaxConfig'].url;
    const method = this.config.loadingConfig['ajaxConfig'].ajaxType;
    const params = {
      ...this.buildParameters(this.config.loadingConfig['ajaxConfig'].params)
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
        this.selectedRowItem = response.data;
      } else {
        this.selectedRowItem = null;
      }
    }



  }


  createModal(): void {
    console.log('createModal');
    this.componentService.modalService.create({
      nzWidth: '85%',
      nzBodyStyle: { overflow: 'auto' },
      nzTitle: '自定义组件',
      //  nzContent: '可实现树+表等多种组件组合',
      nzContent: CnPageComponent,
      nzComponentParams: {

      },
      nzClosable: false,
      nzOnOk: componentInstance => {
        console.log('OK', componentInstance.SELECTED_VALUE);
        if (componentInstance.SELECTED_VALUE) {
          this._value = componentInstance.SELECTED_VALUE[this.config.labelName];
          this.value = componentInstance.SELECTED_VALUE[this.config.valueName];
          this.selectedRowItem = componentInstance.SELECTED_VALUE;
        }

      }
    });
  }
  public async valueChange(v?) {
    //  console.log('input 值变化', v,this.formGroup);
    v="6IkDKuH1iXCnC5xiszniEVbbUWnOLRKm";
    if (!v) {
      this.selectedRowItem = null;
    }
    if (v) {
      if (!this.selectedRowItem) {
        await this.load();
      }
    }
    if (this.selectedRowItem) {
      const labelName = this.selectedRowItem[this.config.labelName];
      if (labelName) {
        this._value = labelName;
      } else {
        this._value = v;
      }
    } else {
      this._value = v;
    }
    //  this.table.selectedRowValue = v;  !!反向写值
    const backValue = { name: this.config.field, value: v, id: this.config.config.id, dataItem: this.selectedRowItem };
    this.updateValue.emit(backValue);

    console.log('自定义页面backValue=>', backValue)

  }
  public cascadeAnalysis(c?) {
  }



}
