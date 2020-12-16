import { Component, OnInit, Input, EventEmitter, Output, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CommonUtils } from '@core/utils/common-utils';
import { BSN_COMPONENT_SERVICES } from '@core/relations/bsn-relatives';
import { ComponentServiceProvider } from '@core/services/component/component-service.provider';
import { CnComponentBase } from '@shared/components/cn-component.base';
import { ParameterResolver } from '@shared/resolver/parameter/parameter.resolver';

@Component({
  selector: 'app-cn-form-button',
  templateUrl: './cn-form-button.component.html',
  styleUrls: ['./cn-form-button.component.less']
})
export class CnFormButtonComponent  extends CnComponentBase  implements OnInit {
  @Input() public config;
  @Input() formGroup: FormGroup;
  @Input() tempData;
  @Input() initData;
  @Output() public updateValue = new EventEmitter();

  public value: any = null;
  constructor(@Inject(BSN_COMPONENT_SERVICES)
  public componentService: ComponentServiceProvider) {
    super(componentService);
    this.initValue = {};
    this.tempValue = {};
  }

  ngOnInit() {
    if (this.initData) {
      this.initValue = this.initData;
    } else {
      this.initValue = {};
    }
    if (this.tempData) {
      this.tempValue = this.tempData;
    } else {
      this.tempValue = {};
    }
  }

  /**
   * valueChange
   */
  public valueChange(v?,dataItem?) {
    this.value = v;
    // console.log('label 值变化', v);
    const backValue = { name: this.config.field, value: v, id: this.config.config.id,dataItem:dataItem };
    this.updateValue.emit(backValue);
  }

  public hiddenValueChange(v?) {
    this.value = v;
     if(this.config.group && this.config.group.length===1){
       this.action(this.config.group[0]);
     } 
    console.log('hiddenvalue===>',v);
  }

  public cascadeAnalysis(c?) {
    if (c.hasOwnProperty(this.config.field)) {
      if (c[this.config.field].hasOwnProperty('cascadeValue')) {
        this.cascadeValue = c[this.config.field].cascadeValue;
      }
    
      // 目前支持单条件响应
      if (c[this.config.field].hasOwnProperty('exec')) {
        if (c[this.config.field].exec === 'updateValue') {
          this.valueChange(this.value);
        }
      }
    }
  }


  public action(options?) {
    // dataItem
    const _value = CommonUtils.uuID(36);
    let item= this.buildParameters(options['dataItem'])
    this.valueChange(_value,item);
 
    console.log('点击按钮', options,item);
  }

  /*
     liu 2020.12.11
     表单内按钮组配置： 描述当前表单内部操作行为，可以为单个按钮，也可谓按钮组。
  */

  btnlist = {
    group: [
      {
        "id": "M_search",
        "text": "查询",
        "icon": "search",
        "color": "primary",
        "hidden": false,
        "disabled": false,
        "dataItem": [
          {
            "name": "btnType",
            "type": "value",
            "valueName": "",
            "value": "1"
          }
        ]

      },
      {
        "id": "M_reset",
        "text": "重置",
        "icon": "rollback",
        "color": "text-primary",
        "hidden": false,
        "disabled": false,
        "dataItem": [
          {
            "name": "btnType",
            "type": "value",
            "valueName": "",
            "value": "2"
          }
        ]

      }
    ]
  }


  public buildParameters(paramsCfg, searchValue?) {
    return ParameterResolver.resolve({
      params: paramsCfg,
      tempValue: this.tempValue,
      componentValue: this.formGroup.value, //  组件值？返回值？级联值，需要三值参数
      initValue: this.initValue,
      cacheValue: this.cacheValue,
      router: this.routerValue,
      cascadeValue: this.cascadeValue,
      userValue:this.userValue
    });
  }



}
