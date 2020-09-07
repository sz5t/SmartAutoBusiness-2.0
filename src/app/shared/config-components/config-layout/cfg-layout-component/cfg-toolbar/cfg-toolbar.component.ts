import { Component, OnInit, Input, Inject } from '@angular/core';
import { CnComponentBase } from '@shared/components/cn-component.base';
import { BSN_COMPONENT_SERVICES } from '@core/relations/bsn-relatives';
import { ComponentServiceProvider } from '@core/services/component/component-service.provider';
import { ParameterResolver } from '@shared/resolver/parameter/parameter.resolver';

@Component({
  selector: 'cfg-toolbar,[cfg-toolbar]',
  templateUrl: './cfg-toolbar.component.html',
  styleUrls: ['./cfg-toolbar.component.less']
})
export class CfgToolbarComponent extends CnComponentBase  implements OnInit {
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


  toolbarConfig = [
    {
      "targetViewId": "view_01",
      "group": [
        {
          "id": "M_refresh",
          "text": "刷新",
          "icon": "reload",
          "color": "text-primary",
          "hidden": false,
          "disabled": false,
          "execute": [
            {
              "triggerType": "BEHAVIOR",
              "trigger": "REFRESH"
            }
          ]
        },
        {
          "id": "M_addRow",
          "text": "新增",
          "icon": "plus",
          "color": "text-primary",
          "hidden": false,
          "disabled": false,
          "execute": [
            {
              "triggerType": "STATE",
              "trigger": "ADD_ROW",
              // "conditionId": "add_state_1"
            }
          ]
        },
        {
          "id": "M_updateRow",
          "text": "修改",
          "icon": "edit",
          "color": "text-success",
          "hidden": false,
          "disabled": false,
          "state": "text",
          "execute": [
            {
              "triggerType": "STATE",
              "trigger": "EDIT_ROWS",
              // "conditionId": "edit_state_1"
            }
          ],
          "toggle": {
            "type": "state",
            "toggleProperty": "hidden",
            "values": [
              {
                "name": "edit",
                "value": true
              },
              {
                "name": "text",
                "value": false
              }
            ]
          }
        },
        {
          "id": "M_deleteRow",
          "text": "删除",
          "icon": "delete",
          "color": "text-red-light",
          "hidden": false,
          "disabled": false,
          "execute": [
            {
              "triggerType": "OPERATION",
              "trigger": "EXECUTE_CHECKED_ROWS_IDS",
              "conditionId": "delete_operation_1",
              "ajaxId": "delete_row_1"
            }
          ]
        },
        {
          "id": "M_saveRow",
          "text": "保存",
          "icon": "save",
          "color": "text-primary",
          "hidden": true,
          "disabled": false,
          "execute": [
            {
              "triggerType": "OPERATION",
              "trigger": "SAVE_ROWS",
              "ajaxId": "add_provinces_1",
              // "stateId": "add_save_1",
              // "conditionId": "add_save_1"
            },
            {
              "triggerType": "OPERATION",
              "trigger": "SAVE_ROWS",
              "ajaxId": "edit_save_1",
              // "stateId": "edit_save_1",
              // "conditionId": "edit_save_1"
            }
          ],
          "toggle": {
            "type": "state",
            "toggleProperty": "hidden",
            "values": [
              {
                "name": "edit",
                "value": false
              },
              {
                "name": "text",
                "value": true
              },
              {
                "name": "new",
                "value": false
              }
            ]
          }
        },
        {
          "id": "M_cancelrow",
          "text": "取消1",
          "state": "edit",
          "icon": "rollback",
          "color": "text-grey-darker",
          "hidden": true,
          "disabled": null,
          "execute": [
            {
              "triggerType": "STATE",
              "trigger": "CANCEL_EDIT_ROWS",
              "conditionId": "cancel_edit_rows_2"
            },
            {
              "triggerType": "STATE",
              "trigger": "CANCEL_NEW_ROWS"
            }
          ],
          "toggle": {
            "type": "state",
            "toggleProperty": "hidden",
            "values": [
              {
                "name": "edit",
                "value": false
              },
              {
                "name": "text",
                "value": true
              },
              {
                "name": "new",
                "value": false
              }
            ]
          }
        }
      ]
    },
    {
      "targetViewId": "view_02",
      "group": [
        {
          "name": "M_addSearchRow",
          "text": "查询",
          "triggerType": "STATE",
          "trigger": "SEARCH_ROW",
          "actionName": "addSearchRow",
          "icon": "search",
          "color": "text-primary",
          "hidden": false,
          "disabled": false,
          "execute": [
            {
              "triggerType": "STATE",
              "trigger": "SEARCH_ROW"
            }
          ]
        },
        {
          "name": "M_cancelSearchRow",
          "text": "取消查询",
          "icon": "rollback",
          "triggerType": "STATE",
          "trigger": "CANCEL_SEARCH_ROW",
          "actionName": "cancelSearchRow",
          "color": "text-grey-darker",
          "hidden": false,
          "disabled": false,
          "execute": [
            {
              "triggerType": "STATE",
              "trigger": "SEARCH_ROW"
            }
          ],
        }
      ]
    }
  ]



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
      cascadeValue: this.cascadeValue
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
    console.log('操作按钮的配置生成如下：', this.componentConfig);
    if( this.componentConfig){
      if(this.componentConfig.hasOwnProperty('toolbar')){
        this.toolbarConfig = this.componentConfig['toolbar'];
      }
    }
 
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
  // tslint:disable-next-line:use-lifecycle-interface
  public ngOnDestroy() {
    // 释放级联对象
    this.unsubscribeRelation();
    if (this.subscription$) {
      this.subscription$.unsubscribe();
    }
  }

}
