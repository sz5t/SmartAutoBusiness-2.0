import { Component, OnInit, Input, Inject, EventEmitter, Output } from '@angular/core';
import { BSN_COMPONENT_SERVICES } from '@core/relations/bsn-relatives';
import { CnComponentBase } from '@shared/components/cn-component.base';
import { ComponentServiceProvider } from '@core/services/component/component-service.provider';
import { ParameterResolver } from '@shared/resolver/parameter/parameter.resolver';

@Component({
  selector: 'cfg-attribute-form,[cfg-attribute-form]',
  templateUrl: './cfg-attribute-form.component.html',
  styleUrls: ['./cfg-attribute-form.component.less']
})
export class CfgAttributeFormComponent  extends CnComponentBase implements OnInit {
  @Input() public config;
  @Input() public attributeConfig;
  @Input() public initData;
  @Input() public changeValue;
  @Input() public attributeType;
  @Output() public execOperation = new EventEmitter();
  dataList;
  dataListObj={};
  loadData: any;
  objectCompont: { PID: any; };
  rowData;
  constructor(@Inject(BSN_COMPONENT_SERVICES)
  public componentService: ComponentServiceProvider) {
    super(componentService);
    this.tempValue ={};
    this.initValue ={};

  }



  ngOnInit() {
    console.log('&&&&&&&&&',this.initData,this.attributeType);
    this.tempValue['ParentType'] =  this.attributeType?this.attributeType:2;
    this.initValue ={...this.initValue,...this.initData};
    this.setChangeValue(this.changeValue);
    this.load();
  }

  
  public setChangeValue(ChangeValues?) {
   // console.log('changeValue', ChangeValues);
    // const ChangeValues = [{ name: "", value: "", valueTo: "" }];
    if (ChangeValues && ChangeValues.length > 0) {
      ChangeValues.forEach(p => {
        switch (p.valueTo) {
          case 'tempValue':
            this.tempValue[p.name] = p.value;
            break;
          case 'initValue':
            this.initValue[p.name] = p.value;
            break;
          case 'staticComponentValue':
            this.staticComponentValue[p.name] = p.value;
            break;
  
        }
      });
    }
  
  }
    // 构建参数-》下拉选择自加载数据
    public buildParameters(paramsCfg,RcomponentValue?) {
      if(!RcomponentValue){
        RcomponentValue ={};
      }
      if(! RcomponentValue['PID']){
        RcomponentValue['PID'] = this.config.keyId;
      }
  
      // console.log('RcomponentValue',RcomponentValue);
      return ParameterResolver.resolve({
        params: paramsCfg,
        tempValue: this.tempValue,
        componentValue: RcomponentValue, //  组件值？返回值？级联值，需要三值参数
        initValue: this.initValue,
        cacheValue: this.cacheValue,
        router: this.routerValue,
        cascadeValue: this.cascadeValue
      });
    }
  
    loadingConfig = {
      "url": "sd/B_P_D_CONFIG_JSON_P/procedure",  // operation 操作 query
      "ajaxType": "post",
      "params": [
        {
          "name": "PID",
          "type": "initValue",
          "valueName": "PID",
          "dataType": "string"
        },
        {
          "name": "TYPE",
          "type": "value",
          "valueName": "PID",
          "dataType": "int",
          "value": 1
        },
        {
          "name": "PageId",
          "type": "tempValue",
          "valueName": "ID",
          "dataType": "string",
          "value": ""
        },
        {
          "name": "CMTId",
          "type": "tempValue",
          "valueName": "CMTId",
          "dataType": "string",
          "value": ""
        },
        {
          "name": "ParentType",
          "type": "tempValue",
          "valueName": "ParentType",
          "dataType": "int",
          "value": 2
        },
      ],
      "filter": [
  
      ]
    }
    public async load(componentValue?) {
  
      const url = this.loadingConfig.url;
      const method = this.loadingConfig.ajaxType;
      const params = {
        ...this.buildParameters(this.loadingConfig.params,componentValue)
      };
      // 考虑满足 get 对象，集合，存储过程【指定dataset 来接收数据】，加载错误的信息提示
      const response = await this.componentService.apiService.post(url, params).toPromise();
     //  console.log("数组加载", response.data,response.data._procedure_resultset_1[0]['W']);
                              
      if (response.data._procedure_resultset_1[0]['W'] === "") { 
        this.dataList= null;
      }
      else {
        const d = JSON.parse(response.data._procedure_resultset_1[0]['W']);
        this.loadData =d;
        this.convertData(d);
      }
      // const oc = {PID:this.dataList['rowId']};
      // this.objectCompont = oc;
      // console.log('*****************',params, this.objectCompont, this.loadData);
  
  
    }
    convertData(d?) {
      const datalistitem = {};
      const datalistitemobj = {};
      datalistitem['rowId'] = d['keyId'];
      d.data.forEach(item => {
        datalistitemobj[item['feild']]={PID:item['keyId']};
        datalistitem[item['feild']] = item['value'] ? item['value'] : '';
      });
  
    
       // this.dataList = datalistitem;
       this.dataListObj = null;
       this.dataListObj=datalistitemobj;
        this.dataList =null;
        this.dataList = JSON.parse(JSON.stringify(datalistitem));
     // console.log('object最终数据集', d,this.dataList);
  
    }

    valueChange(d?) {
      // console.log('表单返回值',d, this.dataList,this.loadData );
       this.dataList[d.name] = d.value;
 
       if(d['count']>0){
       
          this.save();
          this.toTableRow(this.dataList);
       }
 
   }

   saveConfig = {
    "url": "sd/B_P_SAVE_JSON/procedure",  // operation 操作 query
    "ajaxType": "post",
    "params": [
      {
        "name": "Id",
        "type": "componentValue",
        "valueName": "ID",
        "dataType": "string"
      },
      {
        "name": "Json",
        "type": "componentValue",
        "valueName": "JSON",
        "dataType": "string",
        "value": "{}"
      },
    ],
    "filter": [

    ]
  }

  public async save() {

    const url = this.saveConfig.url;
    const method = this.saveConfig.ajaxType;
    const componentValue={ID: this.dataList.rowId,JSON:JSON.stringify(this.dataList)};
    const params = {
      ...this.buildParameters(this.saveConfig.params,componentValue)
    };
    console.log('=+==++==++==++===++===',componentValue);
    // 考虑满足 get 对象，集合，存储过程【指定dataset 来接收数据】，加载错误的信息提示
    const response = await this.componentService.apiService.post(url, params).toPromise();
    // console.log("执行保存", response.data);
   
  }


   public async changeData(r?) {
    this.rowData = r;
     if(r){

       this.initValue['PID'] = r['rowId'];
       await this.load();
     }else {
       this.dataList =null;
     }
 
   }

   public toTableRow(r){
    if( this.rowData){
      const row ={};
      row['rowId'] =  this.rowData['rowId'];
      const rowback ={...r,...row};
      this.execOperation.emit(rowback);
    }
  }

}
