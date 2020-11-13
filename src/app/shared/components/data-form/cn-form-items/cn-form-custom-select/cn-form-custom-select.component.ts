import { Component, OnInit, Inject, Output, EventEmitter, Input, ViewChild, ViewEncapsulation } from '@angular/core';
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
  styleUrls: ['./cn-form-custom-select.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class CnFormCustomSelectComponent extends CnComponentBase implements OnInit {

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
    // debugger;
    if(this.config.layoutName){
      //liu 20.11.12
      this.tableConfig =this.getMenuComponentConfigById("PAGE_"+this.config.layoutName);
     // this.tableConfig = this.componentService.cacheService.getNone("PAGE_"+this.config.layoutName);
    }
    if( !this.tableConfig){
        await this.getCustomConfig(this.config.layoutName);
        // liu 20.11.12
        //this.tableConfig = this.componentService.cacheService.getNone("PAGE_"+this.config.layoutName);
        this.tableConfig =this.getMenuComponentConfigById("PAGE_"+this.config.layoutName);
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
   * load 自加载
   */
  public async load() {
    // 【参数不全是否阻止加载！】
    // 对后续业务判断有影响
    //  console.log('===select 自加载====>load');
    const url = this.config.loadingItemConfig['ajaxConfig'].url;
    const method = this.config.loadingItemConfig['ajaxConfig'].ajaxType;
    const params = {
      ...this.buildParameters(this.config.loadingItemConfig['ajaxConfig'].params)
    };
    // 考虑满足 get 对象，集合，存储过程【指定dataset 来接收数据】，加载错误的信息提示
   
    const response = await this.componentService.apiService.getRequest(url, method, { params }).toPromise();
    console.log('--da---' + this.config.field, response);
    if (isArray(response['data'])) {
      if (response['data'] && response['data'].length > 0) {
        const data_form = response['data'];
        // this.selectedRowItem = data_form[0];
        data_form.forEach(element => {
          element['label'] = element[this.config.labelName];
          element['value'] = element[this.config.valueName];
        });
        this.tags =  data_form;
      }
      else {
        this.selectedRowItem = null;
      }
    } else {
      if (response['data']) {

        const _data =response['data'];
        _data['label'] = _data[this.config.labelName];
        _data['value'] = _data[this.config.valueName];
        this.tags = [];
        this.tags.push(_data);
       //  this.selectedRowItem = response['data'];
      } else {
        this.selectedRowItem = null;
      }
    }

    if(this.config.model ==='multiple') {
      this.selectedRowItem =this.valueMultipleFormat();
    } else {
      this.selectedRowItem = this.valueSingleFormat();
    }



  }
  handleClose1(removedTag: {}): void {
    this.tags = this.tags.filter(tag => tag !== removedTag);
    // this.valueChange(this.tags);
    if(this.config.model ==='multiple') {
      this.selectedRowItem =this.valueMultipleFormat();
    } else {
      this.selectedRowItem = this.valueSingleFormat();
    }
    console.log("=================>>>>",this.selectedRowItem);
     this.value =  this.selectedRowItem['value'];
    console.log('删除节点nodeList===>>>', this.tags,this.selectedRowItem);
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
        config:this. page_config
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

  createCustomModal(){
    this.buildChangeValue(this.config);
    console.log('createModal');
    this.initData[ this.config.targetValue? this.config.targetValue:'tags'] = this.tags; 
    this.componentService.modalService.create({
      nzWidth: this.config.customWidth? this.config.customWidth: '85%',
      nzBodyStyle: this.config.customBodyStyle?this.config.customBodyStyle:{ overflow: 'auto' },
      nzTitle:this.config.customTitle?this.config.customTitle:'',
      nzMaskClosable: this.config.hasOwnProperty('customMaskClosable')?this.config.customMaskClosable : false,
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
         this.value =  this.selectedRowItem['value'];
      }
    });
  }


  public async valueChange(v?) {

    this.buildChangeValue(this.config);
    console.log('==================================');
    console.log(this.config.changeValue,this.formGroup.value);
    console.log('==================================');
      console.log('自定义页面-》 值变化', v);
   // v="6IkDKuH1iXCnC5xiszniEVbbUWnOLRKm";
    if (!v) {
      this.selectedRowItem = null;
    }
    if (v) {
      if (!this.selectedRowItem) {
        await this.load();
      }
      if(this.selectedRowItem && !this.selectedRowItem.hasOwnProperty('value') && v!= this.selectedRowItem['value'] ){
        await this.load();
      }
    }
    if (this.selectedRowItem) {
      const labelName = this.selectedRowItem['label'];
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
        // cascadeValue
        if (c.hasOwnProperty(this.config.field)) {
          if (c[this.config.field].hasOwnProperty('cascadeValue')) {
            this.cascadeValue = c[this.config.field].cascadeValue;
          }
          if (c[this.config.field].hasOwnProperty('cascadeOptions')) {
            this.cascadeOptions = c[this.config.field].cascadeOptions;
          }
          if (c[this.config.field].hasOwnProperty('exec')) {
            if (c[this.config.field].exec === 'ajax') {
              this.load();
            }
            if (c[this.config.field].exec === 'changeValue') {
              this.buildChangeValue(this.config);
            }
          }
    
        }
  }

  tags=[];
  tags22=[
    {"label":'一个是阆苑仙葩',value:'01'},
    {"label":'一个是美玉无瑕',value:'02'},
    {"label":'若说没奇缘',value:'03'},
    {"label":'今生偏又遇着他',value:'04'},
    {"label":'一个枉自嗟呀',value:'05'},
    {"label":'一个空劳牵挂',value:'06'},
    {"label":'一个是水中月',value:'07'},
    {"label":'一个是镜中花',value:'08'},
    {"label":'测试数据',value:'09'}
  ];


  page_config = {
    'id':"page_main",
    "component": "cnPage",
    "isAllJson":true,
    cascade: {
      "messageSender": [

      ],
      "messageReceiver2":[],
      "messageReceiver": [
        {
          "id": "2",
          "senderId": "tag_main",
          "receiveData": [
            {
              "beforeReceive": [],
              "triggerType": "BEHAVIOR",
              "trigger": "ADD_SELECTED",
              "params": [
                {
                  "pname": "value",
                  "cname": "_PID",
                  "valueTo": "tempValue"
                },
              ]
            }
          ]
        }
      ]
    }
  };


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


/** 
 * 构造changeValue
 * @param option 
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

}
