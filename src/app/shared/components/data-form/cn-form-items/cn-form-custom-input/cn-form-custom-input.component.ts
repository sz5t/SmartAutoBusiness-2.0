import { Component, OnInit, Inject, Output, EventEmitter, Input } from '@angular/core';
import { CnComponentBase } from '@shared/components/cn-component.base';
import { ParameterResolver } from '@shared/resolver/parameter/parameter.resolver';
import { BSN_COMPONENT_SERVICES } from '@core/relations/bsn-relatives';
import { ComponentServiceProvider } from '@core/services/component/component-service.provider';
import { FormGroup } from '@angular/forms';
import { CnPageComponent } from '@shared/components/cn-page/cn-page.component';

@Component({
  selector: 'app-cn-form-custom-input',
  templateUrl: './cn-form-custom-input.component.html',
  styleUrls: ['./cn-form-custom-input.component.less']
})
export class CnFormCustomInputComponent extends CnComponentBase implements OnInit {

  @Input() public config;
  @Input() formGroup: FormGroup;
  @Output() public updateValue = new EventEmitter();
  @Input() public initData; 
  @Input() tempData;
  value = null;
  _value = null;
  selectedRowValue;
  selectedRowItem;
  tableConfig;
  public cascadeOptions: any;
  _changeValue:any;
  tags=[];
  constructor(@Inject(BSN_COMPONENT_SERVICES)
  public componentService: ComponentServiceProvider) {
    super(componentService);
  }

  async ngOnInit() {
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
    this.buildChangeValue(this.config);
    // if(!this.config.layoutName){
    //   this.config.layoutName ="xjdKJcJoSqXHOnuIbWziw4yD1NQVAGWs";
    //   this.config.targetValue="tag_BAxdPtAm5Gbzipe3DFRjhbtRcysySoIrlG5C";
    //   this.config.model ="multiple";
    //   this.config.valueName="value";
    // }
    if(this.config.layoutName){
      this.tableConfig = this.componentService.cacheService.getNone("PAGE_"+this.config.layoutName);
    }
    if( !this.tableConfig){
      await  this.getCustomConfig(this.config.layoutName);
      this.tableConfig = this.componentService.cacheService.getNone("PAGE_"+this.config.layoutName);
     }
    // if(this.config.model ==='multiple') {
    //   this.value ="9F2D4A2D-5C57-44AA-8F06-B8F5D0B96AAE,93F1C6C9-140D-42A5-9379-FE47EDA2DEEB";
    // } else {
    //   this.value ="9F2D4A2D-5C57-44AA-8F06-B8F5D0B96AAE";
    // }


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

/**
 * 构造changeValue
 */
public buildChangeValue(option:any){
  if (option.changeValue) {
    const d = ParameterResolver.resolve({
        params: option.changeValue.params,
        tempValue: this.tempValue,
        componentValue: this.formGroup.value,
        item:  this.selectedRowItem,
        initValue: this.initValue,
        cacheValue: this.cacheValue,
        router: this.routerValue
    });
    option.changeValue.params.map(param => {
        if (param.type === 'value') {
            // 类型为value是不需要进行任何值的解析和变化
        } else {
            if (d[param.name]) {
                param['value'] = d[param.name];
            }
        }
    });
}

this._changeValue =  option.changeValue ? option.changeValue.params : []
console.log('===*****************===',option);
}

public async onKeyPress(e) {
  if (e.code === 'Enter') {
    this.valueChangeBack(this.value);
  } else {
    if (e.code === 'ArrowDown') {

    } else {
    }
  }
  e.stopPropagation();
  e.preventDefault();
}

groupClick(e){
   console.log('group_click');
   e.stopPropagation();
  // e.preventDefault();
}

oldvalue = null;
valueChangeBack(v?,item?) {
  this.oldvalue = v;
  const backValue = { name: this.config.field, value: v, id: this.config.config.id,dataItem:item?item:null };
  this.updateValue.emit(backValue);
}

public onblur(e?, type?) {
  console.log('input_onblur',this.value);
  if(this.value!==  this.oldvalue) 
  this.valueChangeBack(this.value);
}



createCustomModal(){
  console.log('createModal');
  this.initData[ this.config.targetValue? this.config.targetValue:'tags'] = this.tags; 
  this.componentService.modalService.create({
    nzWidth: this.config.customWidth? this.config.customWidth: '85%',
    nzBodyStyle: this.config.customBodyStyle?this.config.customBodyStyle:{ overflow: 'auto' },
    nzTitle:this.config.customTitle?this.config.customTitle:'',
    //  nzContent: '可实现树+表等多种组件组合',
    nzContent: CnPageComponent,
    nzComponentParams: {
      config:this. tableConfig,
      customPageId:this.config.layoutName,
      initData:this.initData,
      changeValue:this._changeValue 
    },
    nzClosable: false,
    nzOnOk: componentInstance => {
      console.log('OK', componentInstance.SELECTED_VALUE);
      if (componentInstance.SELECTED_VALUE) {
       this.tags = componentInstance.SELECTED_VALUE;
       this.initData[this.config.targetValue? this.config.targetValue:'tags'] = this.tags; 
      }

      if(this.config.model ==='multiple') {
        this.selectedRowItem =this.valueMultipleFormat();
      } else {
        this.selectedRowItem = this.valueSingleFormat();
      }
      console.log("=================>>>>",this.selectedRowItem);
    //  this.valueChange( this.selectedRowItem['value']);
       this.value =  this.selectedRowItem['label'];
       this.valueChangeBack(this.value ,this.selectedRowItem);
    }
  });
}


valueChange(v){

}
  /**
   * 将值转化 多选，转化成对象，多选将数组存储在originData MULTIPLE
   */
  valueMultipleFormat(){
    let label_value="";
    let value_value="";
    this.tags.forEach(item=>{
      label_value+= item['label']+',';
      value_value+= item['value']+',';
    });

    if (this.tags.length>0){
      if(label_value.length>0){
        label_value = label_value.substr(0,label_value.length-1);
      }
      if(value_value.length>0){
        value_value = value_value.substr(0,value_value.length-1);
      }
    }
    const format_v={label: label_value,value:value_value, originData:this.tags};
    return format_v;
  }

  /**
   * 将值转化 单选
   */
  valueSingleFormat(){


    let format_v={};  // ={label: null,value:null, originData:null};
    if (this.tags.length>0){
      format_v = this.tags[0];
    } else {
      format_v = {label: null,value:null};
    }
    return format_v;
  }



}
