import { Component, OnInit, Input, Inject, AfterViewInit } from '@angular/core';
import { CnComponentBase } from '@shared/components/cn-component.base';
import { BSN_COMPONENT_SERVICES } from '@core/relations/bsn-relatives';
import { ComponentServiceProvider } from '@core/services/component/component-service.provider';
import { ParameterResolver } from '@shared/resolver/parameter/parameter.resolver';

@Component({
  selector: 'cn-attribute-form,[cn-attribute-form]',
  templateUrl: './cn-attribute-form.component.html',
  styleUrls: ['./cn-attribute-form.component.less']
})
export class CnAttributeFormComponent extends CnComponentBase implements OnInit,AfterViewInit {
  @Input() public config;
  dataList :any;
  constructor(@Inject(BSN_COMPONENT_SERVICES)
  public componentService: ComponentServiceProvider) {
    super(componentService);
  }


  async ngOnInit() {
    console.log('===弹出页面object的配置===>', this.config);
    await this.load();
   
  }

  async ngAfterViewInit(): Promise<void> {

  }
  // 构建参数-》下拉选择自加载数据
  public buildParameters(paramsCfg) {
    return ParameterResolver.resolve({
      params: paramsCfg,
      tempValue: this.tempValue,
      componentValue: { PID: this.config.keyId }, //  组件值？返回值？级联值，需要三值参数
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
        "type": "componentValue",
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
    ],
    "filter": [

    ]
  }
  public async load() {

    const url = this.loadingConfig.url;
    const method = this.loadingConfig.ajaxType;
    const params = {
      ...this.buildParameters(this.loadingConfig.params)
    };
    // 考虑满足 get 对象，集合，存储过程【指定dataset 来接收数据】，加载错误的信息提示
    const response = await this.componentService.apiService.post(url, params).toPromise();
    // console.log("数组加载", response.data,response.data._procedure_resultset_1[0].W);
    if (response.data._procedure_resultset_1[0]['W'] === "") { 
      this.dataList={};
    }
    else {
      const d = JSON.parse(response.data._procedure_resultset_1[0]['W']);
      this.convertData(d);
    }



  }
  convertData(d?) {
    const datalistitem = {};
        datalistitem['rowId'] = d['keyId'];
       
    d.data.forEach(item => {
      datalistitem[item['feild']] = item['value'] ? item['value'] : '未知';
    });

  
     // this.dataList = datalistitem;
  
      this.dataList = JSON.parse(JSON.stringify(datalistitem));

 
    console.log('object最终数据集', this.dataList);

  }
  valueChange(d?) {
      console.log('表单返回值',d);
  }
}
