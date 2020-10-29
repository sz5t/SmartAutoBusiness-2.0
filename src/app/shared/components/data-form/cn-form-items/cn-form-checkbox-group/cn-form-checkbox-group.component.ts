import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BSN_COMPONENT_SERVICES } from '@core/relations/bsn-relatives';
import { ComponentServiceProvider } from '@core/services/component/component-service.provider';
import { CnComponentBase } from '@shared/components/cn-component.base';

@Component({
  selector: 'cn-form-checkbox-group',
  templateUrl: './cn-form-checkbox-group.component.html',
  styleUrls: ['./cn-form-checkbox-group.component.less']
})
export class CnFormCheckboxGroupComponent extends CnComponentBase implements OnInit {
  @Input() public config;
  @Input() formGroup: FormGroup;
  @Input() public initData; 
  @Input() tempData;
  @Output() public updateValue = new EventEmitter();
  constructor(@Inject(BSN_COMPONENT_SERVICES)
  public componentService: ComponentServiceProvider) {
    super(componentService);
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
   * 响应级联
   * @param c 
   */
  public cascadeAnalysis(c?) {


  }


  allChecked = false;
  indeterminate = true;
  checkOptionsOne = [
    { label: 'Apple', value: 'Apple', checked: true },
    { label: 'Pear', value: 'Pear', checked: false },
    { label: 'Orange', value: 'Orange', checked: false }
  ];

  updateAllChecked(): void {
    this.indeterminate = false;
    if (this.allChecked) {
      this.checkOptionsOne = this.checkOptionsOne.map(item => {
        return {
          ...item,
          checked: true
        };
      });
    } else {
      this.checkOptionsOne = this.checkOptionsOne.map(item => {
        return {
          ...item,
          checked: false
        };
      });
    }
  }

  updateSingleChecked(): void {
    if (this.checkOptionsOne.every(item => !item.checked)) {
      this.allChecked = false;
      this.indeterminate = false;
    } else if (this.checkOptionsOne.every(item => item.checked)) {
      this.allChecked = true;
      this.indeterminate = false;
    } else {
      this.indeterminate = true;
    }
  }


  // 组件类型3种 check input 
  public struck(){
      



  }

  public new_data=[
    {
      pageName:'页面01',
      isP:true,
      isR:true
    },
    {
      pageName:'页面02',
      isP:true,
      isR:true
    }
  ];

  public new_config={
    ajaxConfig:{

    },
    columns:[
      {
        feild:'',      // 字段名称
        title:'', // 制单当前属性名称
        type:'switch',  // 组件类型
        defaultValue:''
      },
      {
        feild:'',
        type:'checked',  // 组件类型
        option:{ // 组件详细描述

        }
      }
    ],
    Dcolumns:[ // 动态映射 类似表格动态列
      {
        feild:'', // 
        labelFeild:'', //labelFeild 从库中读取字段
      }
    ]
  
  }

  switchValue=true;
  checked=true;
  value='';

  public buttonSwitchClick(v?){
    v = !v;
    this.switchValue = ! this.switchValue;
    console.log(v);
  }
  public buttonCheckClick(v?){
    v = !v;
    this.checked = ! this.checked;
    console.log(v);
  }

  
}
