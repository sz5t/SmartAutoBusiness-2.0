import { Component, OnInit, Input, Inject, OnDestroy } from '@angular/core';
import { BSN_COMPONENT_SERVICES } from '@core/relations/bsn-relatives';
import { ComponentServiceProvider } from '@core/services/component/component-service.provider';
import { CnComponentBase } from '@shared/components/cn-component.base';
import { ParameterResolver } from '@shared/resolver/parameter/parameter.resolver';

@Component({
  selector: 'app-cfg-data-table',
  templateUrl: './cfg-data-table.component.html',
  styleUrls: ['./cfg-data-table.component.less']
})
export class CfgDataTableComponent  extends CnComponentBase   implements OnInit,OnDestroy {
  @Input() public config;
  COM_ID;
  ComponentValue;
  PROPERTY = {};
  componentConfig={};
  constructor(@Inject(BSN_COMPONENT_SERVICES)
  public componentService: ComponentServiceProvider) {
    super(componentService);
  }

  ngOnInit() {
    this.ComponentValue={};
    this.ComponentValue['CMTId']=this.config.id;
     this.js();
     this.load();
   //  console.log('++++++++++++++++++++++++++++',this.config);
  }

  listOfData = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park'
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park'
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park'
    }
  ];

  
  loadingDataConfig = {
    "url": "resource/B_P_C_CONFIG_ATTRIBUTE_TYPE/operate",  // operation 操作 query
    "ajaxType": "post",
    "params": [
      {
        "name": "CMTId",
        "type": "componentValue",
        "valueName": "CMTId",
        "dataType": "string",
        "value":"null"
      }
    ],
    "filter": [

    ]
  }

  public buildParameters(paramsCfg, RcomponentValue?) {

    return ParameterResolver.resolve({
      params: paramsCfg,
      tempValue: this.tempValue,
      componentValue: this.ComponentValue, //  组件值？返回值？级联值，需要三值参数
      initValue: this.initValue,
      cacheValue: this.cacheValue,
      router: this.routerValue,
      cascadeValue: this.cascadeValue,
      userValue:this.userValue
    });
  }
  public async load() {
    const url = this.loadingDataConfig.url;
    const method = this.loadingDataConfig.ajaxType;
    const params = {
      ...this.buildParameters(this.loadingDataConfig.params)
    };
    // 考虑满足 get 对象，集合，存储过程【指定dataset 来接收数据】，加载错误的信息提示
    const response = await this.componentService.apiService.post(url, params).toPromise();
   // console.log("页面组件编辑配置加载", response.data);

    if (response.data._procedure_resultset_1[0]['W'] === "") {
     this.componentConfig =null;
    }
    else {
      this.componentConfig = JSON.parse(response.data._procedure_resultset_1[0]['W']);
    }
    console.log('表格的配置生成如下：', this.componentConfig);
  }

  public js() {
    if (!this.subscription$) {
      this.subscription$ = this.componentService.commonRelationSubject.subscribe(
        async data => {
     
           if (data.trigger.triggerType === "LAYOUT") {
            if (data.trigger.trigger === "COMPONENT_LOAD_CONFIG") {
             // console.log('table 接收消息', data);
              if (data.viewId === this.config.id) {
                     this.load();
              } 
            }
          }
        
        });

    }
  }
  public ngOnDestroy() {
    // 释放级联对象
    this.unsubscribeRelation();
    if (this.subscription$) {
      this.subscription$.unsubscribe();
    }
  }

}
