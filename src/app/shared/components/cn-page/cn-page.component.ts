import { Component, OnInit, Inject, Input, OnDestroy } from '@angular/core';
import { CnComponentBase } from '@shared/components/cn-component.base';
import { Subject, Subscription, config } from 'rxjs';
import { BSN_COMPONENT_SERVICES } from '@core/relations/bsn-relatives';
import { ComponentServiceProvider, DataServerService } from '@core/services/component/component-service.provider';
import { CN_PAGE_METHOD } from '@core/relations/bsn-methods/bsn-page-methods';
import { CN_PAGE_PROPERTY } from '@core/relations/bsn-property/page.property.interface';
import { RelationResolver } from '@shared/resolver/relation/relation.resolver';
import { ParameterResolver } from '@shared/resolver/parameter/parameter.resolver';

@Component({
  selector: 'app-cn-page',
  templateUrl: './cn-page.component.html',
  styleUrls: ['./cn-page.component.less'],
  providers: [
    DataServerService
    ]
})
export class CnPageComponent extends CnComponentBase implements OnInit, OnDestroy {

  @Input() config: any;
  @Input() changeValue: any;
  @Input() customPageId;
  @Input() public initData;
  /**
   * 组件名称
   * 所有组件实现此属性 
   */
  public COMPONENT_NAME = "CnPage";
  /**
   * 组件操作对外名称
   * 所有组件实现此属性
   */
  public COMPONENT_METHODS = CN_PAGE_METHOD;

  public COMPONENT_PROPERTY = CN_PAGE_PROPERTY;
  public FORM_VALUE: any = {}; // 当前表单组件值
  public FORM_STATE: any;  // 表单的状态=》新增、修改、展示
  public SELECTED_VALUE: any;
  private _sender_source$: Subject<any>;
  private _receiver_source$: Subject<any>;
  private _trigger_source$: Subject<any>;

  private _receiver_subscription$: Subscription;
  private _sender_subscription$: Subscription;
  private _trigger_receiver_subscription$: Subscription;

  constructor(@Inject(BSN_COMPONENT_SERVICES)
  public componentService: ComponentServiceProvider,
  public componentDataService: DataServerService
) {
    super(componentService);
    this.tempValue = {};
    this.initValue = {};
  }

  page_config;
  async ngOnInit() {

    this.componentDataService.data.push({id:1});
    const n =this.componentDataService.getInstanceAll();
    console.log('cccccccccccccccccccc',n);
    this.setChangeValue(this.changeValue);
    this.initValue = {...this.initValue,...this.initData};
   
    let _page_config=null;
     if(this.customPageId){
      _page_config = this.componentService.cacheService.getNone(this.customPageId);
    }
    if( !_page_config){
      await  this.getCustomConfig(this.customPageId);
      _page_config = this.componentService.cacheService.getNone(this.customPageId);
     }
     this.page_config =_page_config;
     console.log('222222', this.page_config,this.initData);
    // 解析及联配置
    this.resolveRelations();
  }

  /**
   *  解析级联消息
   */
  private resolveRelations() {
    if (this.config.cascade && this.config.cascade.messageSender) {
      if (!this._sender_source$) {
        // 解析组件发送消息配置,并注册消息发送对象
        this._sender_source$ = new RelationResolver(this).resolveSender(this.config);
        this._sender_subscription$ = this._sender_source$.subscribe();
      }

    }
    if (this.config.cascade && this.config.cascade.messageReceiver) {
      // 解析消息接受配置,并注册消息接收对象
      // this._receiver_source$ = new RelationResolver(this).resolveReceiver(this.config);
      // this._receiver_subscription$ = this._receiver_source$.subscribe();
      new RelationResolver(this).resolveReceiver(this.config);
    }

    this._trigger_source$ = new RelationResolver(this).resolve();
  }

  public setChangeValue(ChangeValues?) {
    console.log('changeValue', ChangeValues);
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

  public getCurrentComponentId() {
    return this.config.id;
  }
  // 根据参数，自加载json 渲染页面

  // public democonfig1 = {
  //   "id": "4K0naM",
  //   "type": "layout",
  //   "title": "布局4K0naM",
  //   "container": "rows",
  //   "rows": [
  //     {
  //       "cols": [
  //         {
  //           "id": "r5zDHB2-1",
  //           "col": "cc",
  //           "type": "col",
  //           "title": "",
  //           "span": 24,
  //           "container": "component",
  //           "size": {
  //             "nzXs": 24,
  //             "nzSm": 24,
  //             "nzMd": 24,
  //             "nzLg": 24,
  //             "nzXl": 24,
  //             "nzXXl": 24
  //           },
  //           "component": {
  //             "id": "toolbar_001",
  //             "component": "cnToolbar",
  //             "size": "default",
  //             "cascade": {
  //               "messageSender": [
  //                 {
  //                   "id": "toolbar_01",
  //                   "senderId": "view_011",
  //                   "triggerType": "OPERATION",
  //                   "trigger": "EXECUTE_CHECKED_ROWS",
  //                   "triggerMoment": "after",
  //                   "sendData": [
  //                     {
  //                       "beforeSend": {},
  //                       "reveicerId": "",
  //                       "receiverTriggerType": "BEHAVIOR",
  //                       "receiverTrigger": "REFRESH_AS_CHILD",
  //                       "params": [
  //                         {
  //                           "name": "parent_id",
  //                           "type": "item",
  //                           "valueName": "id"
  //                         },
  //                         {
  //                           "name": "parent_name",
  //                           "type": "item",
  //                           "valueName": "name"
  //                         }
  //                       ]
  //                     }
  //                   ]
  //                 }
  //               ],
  //               "messageReceiver": [
  //                 {
  //                   "id": "s_001",
  //                   "senderId": "view_011",
  //                   "receiveData": [
  //                     {
  //                       "triggerType": "STATE",
  //                       "trigger": "STATE_TO_TEXT"
  //                     }
  //                   ]
  //                 },
  //                 {
  //                   "id": "s_002",
  //                   "senderId": "view_011",
  //                   "receiveData": [
  //                     {
  //                       "triggerType": "STATE",
  //                       "trigger": "STATE_TO_EDIT"
  //                     }
  //                   ]
  //                 }

  //               ]
  //             },
  //             "condition": [
  //               {
  //                 "id": "add_state_1",
  //                 "state": [
  //                   {
  //                     "type": "component",
  //                     "valueName": "ROWS_CHECKED",
  //                     "expression": [
  //                       {
  //                         "type": "property",
  //                         "name": "length",
  //                         "matchValue": 0,
  //                         "match": "gt"
  //                       },
  //                       {
  //                         "type": "element",
  //                         "name": "name",
  //                         "matchValue": "1",
  //                         "match": "eq",
  //                       }
  //                     ]
  //                   }
  //                 ]
  //               },
  //               {
  //                 "id": "edit_state_1",
  //                 "state": [
  //                   {
  //                     "type": "component",
  //                     "valueName": "ROWS_CHECKED",
  //                     "expression": [
  //                       {
  //                         "type": "property",
  //                         "name": "length",
  //                         "matchValue": 0,
  //                         "match": "gt"
  //                       }
  //                     ]
  //                   }
  //                 ]
  //               },
  //               {
  //                 "id": "add_save_1",
  //                 "state": [
  //                   {
  //                     "type": "component",
  //                     "valueName": "ROWS_CHECKED",
  //                     "expression": [
  //                       {
  //                         "type": "property",
  //                         "name": "length",
  //                         "matchValue": 0,
  //                         "match": "gt"
  //                       }
  //                     ]
  //                   },
  //                   {
  //                     "type": "component",
  //                     "valueName": "ROWS_ADDED",
  //                     "expression": [
  //                       {
  //                         "type": "property",
  //                         "name": "length",
  //                         "matchValue": 0,
  //                         "match": "gt"
  //                       }
  //                     ]
  //                   }
  //                 ]
  //               },
  //               {
  //                 "id": "edit_save_1",
  //                 "state": [
  //                   {
  //                     "type": "component",
  //                     "valueName": "ROWS_EDITED",
  //                     "expression": [
  //                       {
  //                         "type": "property",
  //                         "name": "length",
  //                         "matchValue": 0,
  //                         "match": "gt"
  //                       }
  //                     ]
  //                   },
  //                   {
  //                     "type": "component",
  //                     "valueName": "ROWS_CHECKED",
  //                     "expression": [
  //                       {
  //                         "type": "property",
  //                         "name": "length",
  //                         "matchValue": 0,
  //                         "match": "gt"
  //                       }
  //                     ]
  //                   }
  //                 ]
  //               },
  //               {
  //                 "id": "cancel_edit_rows_2",
  //                 "state": [
  //                   {
  //                     "type": "component",
  //                     "valueName": "ROWS_EDITED",
  //                     "expression": [
  //                       {
  //                         "type": "property",
  //                         "name": "length",
  //                         "matchValue": 0,
  //                         "match": "gt"
  //                       }
  //                     ]
  //                   }
  //                 ]
  //               }
  //             ],
  //             "ajaxConfig": [
  //               {
  //                 "id": "add_provinces_1",
  //                 "url": "province/insertMany",
  //                 "urlType": "inner",
  //                 "ajaxType": "post",
  //                 "params": [
  //                   {
  //                     "name": "provinceName",
  //                     "type": "componentValue",
  //                     "valueName": "provinceName",
  //                     "dataType": "string"
  //                   },
  //                   {
  //                     "name": "populationSize",
  //                     "type": "componentValue",
  //                     "valueName": "populationSize",
  //                     "dataType": "int"
  //                   },
  //                   {
  //                     "name": "directlyUnder",
  //                     "type": "componentValue",
  //                     "valueName": "directlyUnder",
  //                     "dataType": "int"
  //                   },
  //                   {
  //                     "name": "areaCode",
  //                     "type": "componentValue",
  //                     "valueName": "areaCode",
  //                     "dataType": "int"
  //                   },
  //                   {
  //                     "name": "createDate",
  //                     "type": "componentValue",
  //                     "valueName": "createDate",
  //                     "dataType": "string"
  //                   }
  //                 ],
  //                 "outputParameters": [

  //                 ],
  //                 "result": [
  //                   {
  //                     "name": "data",
  //                     "showMessageWithNext": 0,
  //                     "message": "message.ajax.state.success",
  //                     "senderId": "toolbar_01"
  //                   },
  //                   {
  //                     "name": "validation",
  //                     "senderId": "toolbar_01"
  //                   },
  //                   {
  //                     "name": "error",
  //                     "senderId": "toolbar_01"
  //                   }
  //                 ]
  //               },
  //               {
  //                 "id": "edit_save_1",
  //                 "url": "province/updateMany",
  //                 "urlType": "inner",
  //                 "ajaxType": "put",
  //                 "params": [
  //                   {
  //                     "name": "id",
  //                     "type": "componentValue",
  //                     "valueName": "id",
  //                     "dataType": "string"
  //                   },
  //                   {
  //                     "name": "provinceName",
  //                     "type": "componentValue",
  //                     "valueName": "provinceName",
  //                     "dataType": "string"
  //                   },
  //                   {
  //                     "name": "populationSize",
  //                     "type": "componentValue",
  //                     "valueName": "populationSize",
  //                     "dataType": "int"
  //                   },
  //                   {
  //                     "name": "directlyUnder",
  //                     "type": "componentValue",
  //                     "valueName": "directlyUnder",
  //                     "dataType": "int"
  //                   },
  //                   {
  //                     "name": "areaCode",
  //                     "type": "componentValue",
  //                     "valueName": "areaCode",
  //                     "dataType": "int"
  //                   },
  //                   {
  //                     "name": "createDate",
  //                     "type": "componentValue",
  //                     "valueName": "createDate",
  //                     "dataType": "string"
  //                   }
  //                 ],
  //                 "outputParameters": [

  //                 ],
  //                 "result": [

  //                 ]
  //               }
  //             ],
  //             "beforeTrigger": [

  //             ],
  //             "afterTrigger": [
  //               {
  //                 "id": "",
  //                 "senderId": "view_011",
  //                 "sendData": [
  //                   {
  //                     "beforeSend": [],
  //                     "reveicerId": "",
  //                     "receiverTriggerType": "BEHAVIOR",
  //                     "receiverTrigger": "REFRESH_AS_CHILD",
  //                     "params": [
  //                       {
  //                         "name": "parent_id",
  //                         "type": "item",
  //                         "valueName": "id"
  //                       },
  //                       {
  //                         "name": "parent_name",
  //                         "type": "item",
  //                         "valueName": "name"
  //                       }
  //                     ]
  //                   }
  //                 ]
  //               }
  //             ],
  //             "toolbar": [
  //               {
  //                 "targetViewId": "view_011",
  //                 "group": [
  //                   {
  //                     "id": "M_refresh",
  //                     "text": "刷新",
  //                     "icon": "reload",
  //                     "color": "text-primary",
  //                     "hidden": false,
  //                     "disabled": false,
  //                     "execute": [
  //                       {
  //                         "triggerType": "BEHAVIOR",
  //                         "trigger": "REFRESH"
  //                       }
  //                     ]
  //                   },
  //                   {
  //                     "id": "M_addRow",
  //                     "text": "新增",
  //                     "icon": "plus",
  //                     "color": "text-primary",
  //                     "hidden": false,
  //                     "disabled": false,
  //                     "execute": [
  //                       {
  //                         "triggerType": "STATE",
  //                         "trigger": "ADD_ROW",
  //                         // "conditionId": "add_state_1"
  //                       }
  //                     ]
  //                   },
  //                   {
  //                     "id": "M_updateRow",
  //                     "text": "修改",
  //                     "icon": "edit",
  //                     "color": "text-success",
  //                     "hidden": false,
  //                     "disabled": false,
  //                     "state": "text",
  //                     "execute": [
  //                       {
  //                         "triggerType": "STATE",
  //                         "trigger": "EDIT_ROWS",
  //                         // "conditionId": "edit_state_1"
  //                       }
  //                     ],
  //                     "toggle": {
  //                       "type": "state",
  //                       "toggleProperty": "hidden",
  //                       "values": [
  //                         {
  //                           "name": "edit",
  //                           "value": true
  //                         },
  //                         {
  //                           "name": "text",
  //                           "value": false
  //                         }
  //                       ]
  //                     }
  //                   },
  //                   {
  //                     "id": "M_deleteRow",
  //                     "text": "删除",
  //                     "icon": "delete",
  //                     "color": "text-red-light",
  //                     "hidden": false,
  //                     "disabled": false,
  //                     "execute": [
  //                       {
  //                         "triggerType": "OPERATION",
  //                         "trigger": "EXECUTE_CHECKED_ROWS_IDS",
  //                         "conditionId": "delete_operation_1",
  //                         "ajaxId": "delete_row_1"
  //                       }
  //                     ]
  //                   },
  //                   {
  //                     "id": "M_saveRow",
  //                     "text": "保存",
  //                     "icon": "save",
  //                     "color": "text-primary",
  //                     "hidden": true,
  //                     "disabled": false,
  //                     "execute": [
  //                       {
  //                         "triggerType": "OPERATION",
  //                         "trigger": "SAVE_ROWS",
  //                         "ajaxId": "add_provinces_1",
  //                         // "stateId": "add_save_1",
  //                         // "conditionId": "add_save_1"
  //                       },
  //                       {
  //                         "triggerType": "OPERATION",
  //                         "trigger": "SAVE_ROWS",
  //                         "ajaxId": "edit_save_1",
  //                         // "stateId": "edit_save_1",
  //                         // "conditionId": "edit_save_1"
  //                       }
  //                     ],
  //                     "toggle": {
  //                       "type": "state",
  //                       "toggleProperty": "hidden",
  //                       "values": [
  //                         {
  //                           "name": "edit",
  //                           "value": false
  //                         },
  //                         {
  //                           "name": "text",
  //                           "value": true
  //                         },
  //                         {
  //                           "name": "new",
  //                           "value": false
  //                         }
  //                       ]
  //                     }
  //                   },
  //                   {
  //                     "id": "M_cancelrow",
  //                     "text": "取消1",
  //                     "state": "edit",
  //                     "icon": "rollback",
  //                     "color": "text-grey-darker",
  //                     "hidden": true,
  //                     "disabled": null,
  //                     "execute": [
  //                       {
  //                         "triggerType": "STATE",
  //                         "trigger": "CANCEL_EDIT_ROWS",
  //                         "conditionId": "cancel_edit_rows_2"
  //                       },
  //                       {
  //                         "triggerType": "STATE",
  //                         "trigger": "CANCEL_NEW_ROWS"
  //                       }
  //                     ],
  //                     "toggle": {
  //                       "type": "state",
  //                       "toggleProperty": "hidden",
  //                       "values": [
  //                         {
  //                           "name": "edit",
  //                           "value": false
  //                         },
  //                         {
  //                           "name": "text",
  //                           "value": true
  //                         },
  //                         {
  //                           "name": "new",
  //                           "value": false
  //                         }
  //                       ]
  //                     }
  //                   }
  //                 ]
  //               },
  //               {
  //                 "targetViewId": "view_02",
  //                 "group": [
  //                   {
  //                     "name": "M_addSearchRow",
  //                     "text": "查询",
  //                     "triggerType": "STATE",
  //                     "trigger": "SEARCH_ROW",
  //                     "actionName": "addSearchRow",
  //                     "icon": "search",
  //                     "color": "text-primary",
  //                     "hidden": false,
  //                     "disabled": false,
  //                     "execute": [
  //                       {
  //                         "triggerType": "STATE",
  //                         "trigger": "SEARCH_ROW"
  //                       }
  //                     ]
  //                   },
  //                   {
  //                     "name": "M_cancelSearchRow",
  //                     "text": "取消查询",
  //                     "icon": "rollback",
  //                     "triggerType": "STATE",
  //                     "trigger": "CANCEL_SEARCH_ROW",
  //                     "actionName": "cancelSearchRow",
  //                     "color": "text-grey-darker",
  //                     "hidden": false,
  //                     "disabled": false,
  //                     "execute": [
  //                       {
  //                         "triggerType": "STATE",
  //                         "trigger": "SEARCH_ROW"
  //                       }
  //                     ],
  //                   }
  //                 ]
  //               }
  //             ]
  //           }
  //         },
  //         {
  //           "id": "r5zDHB",
  //           "col": "cc",
  //           "type": "col",
  //           "title": "",
  //           "span": 24,
  //           "container": "component",
  //           "size": {
  //             "nzXs": 24,
  //             "nzSm": 24,
  //             "nzMd": 24,
  //             "nzLg": 24,
  //             "nzXl": 24,
  //             "nzXXl": 24
  //           },
  //           "component": {
  //             "id": "view_011",
  //             "title": "主表",
  //             "titleIcon": "right-circle",
  //             "component": "cnDataTable",
  //             "keyId": "id",
  //             "size": "middle",
  //             "isBordered": true,
  //             "isFrontPagination": false,
  //             "isPagination": true,
  //             "isShowSizeChanger": true,
  //             "showTotal": true,
  //             "pageSize": 5,
  //             "showCheckBox": true,
  //             "pageSizeOptions": [10, 20, 50, 100],
  //             "loadingOnInit": true,
  //             // "scroll": {
  //             //     "y": "300px"
  //             // },
  //             "spanWidthConfig": [
  //               '50px', '100px', '200px', '200px', '200px'
  //             ],
  //             "loadingConfig": {
  //               "url": "province/page",
  //               "method": "get",
  //               "params": [

  //               ],
  //               "filter": [

  //               ]
  //             },
  //             "columns": [
  //               {
  //                 "title": "ID",
  //                 "type": "field",
  //                 "field": "id",
  //                 "hidden": true,
  //                 "showFilter": false,
  //                 "showSort": false,
  //                 "isShowExpand": false,
  //                 "width": "50px",
  //                 "style": {}
  //               },
  //               {
  //                 "title": "PROVINCE_NAME",
  //                 "type": "field",
  //                 "field": "provinceName",
  //                 "hidden": false,
  //                 "showFilter": false,
  //                 "showSort": false,
  //                 "width": "50px",
  //                 "style": {},
  //               },
  //               {
  //                 "title": "POPULATIONSIZE",
  //                 "type": "field",
  //                 "field": "populationSize",
  //                 "hidden": false,
  //                 "showFilter": false,
  //                 "showSort": false,
  //                 "width": "100px",
  //                 "style": {},
  //               },
  //               {
  //                 "title": "DIRECTLYUNDER",
  //                 "type": "field",
  //                 "field": "directlyUnder",
  //                 "hidden": false,
  //                 "showFilter": false,
  //                 "showSort": false,
  //                 "width": "100px",
  //                 "style": {},
  //               },
  //               {
  //                 "title": "AREACODE",
  //                 "type": "field",
  //                 "field": "areaCode",
  //                 "hidden": false,
  //                 "showFilter": false,
  //                 "showSort": false,
  //                 "width": "100px",
  //                 "style": {},
  //               },
  //               {
  //                 "title": "CREATEDATE",
  //                 "type": "field",
  //                 "field": "createDate",
  //                 "hidden": false,
  //                 "showFilter": false,
  //                 "showSort": false,
  //                 "width": "100px",
  //                 "style": {},
  //               },
  //               {
  //                 "title": "优势",
  //                 "type": "field",
  //                 "field": "remark",
  //                 "hidden": false,
  //                 "showFilter": false,
  //                 "showSort": false,
  //                 "width": "100px",
  //                 "style": {},
  //               },

  //               // {
  //               //     "title": "message",
  //               //     "type": "field",
  //               //     "field": "MESSAGE",
  //               //     "hidden": false,
  //               //     "showFilter": false,
  //               //     "showSort": false,
  //               //     "width": "150px",
  //               //     "style": {}
  //               // },
  //               // {
  //               //     "title": "language",
  //               //     "type": "field",
  //               //     "field": "LANGUAGE",
  //               //     "hidden": false,
  //               //     "showFilter": false,
  //               //     "showSort": false,
  //               //     "isExpand": true,
  //               //     "width": "400px",
  //               //     "style": {}
  //               // },
  //               {
  //                 "title": "ACTION",
  //                 "type": "action",
  //                 "actionIds": [
  //                   "grid_edit", "grid_cancel", "grid_save", "grid_delete", "grid_new", "grid_new_cancel"
  //                 ]
  //               }
  //             ],
  //             "cascade": {
  //               "messageSender": [
  //                 {
  //                   "id": "form_01",
  //                   "senderId": "view_011",
  //                   "triggerType": "BEHAVIOR",
  //                   "trigger": "SET_SELECT_ROW",
  //                   "triggerMoment": "after",
  //                   "sendData": [
  //                     {
  //                       "beforeSend": {},
  //                       "reveicerId": "",
  //                       "receiverTriggerType": "BEHAVIOR",
  //                       "receiverTrigger": "ADD_SELECTED",
  //                       "params": [
  //                         {
  //                           "name": "_PID",
  //                           "type": "item",
  //                           "valueName": "id"
  //                         }
  //                       ]
  //                     }
  //                   ]
  //                 },
  //                 {
  //                   "id": "grid_sender_03",
  //                   "senderId": "view_011",
  //                   "triggerType": "STATE",
  //                   "trigger": "CANCEL_EDIT_ROW",
  //                   "triggerMoment": "after",
  //                   "sendData": [
  //                     {
  //                       "reveicerId": "",
  //                       "receiverTriggerType": "STATE",
  //                       "receiverTrigger": "STATE_TO_TEXT",
  //                       "conditionId": "cancel_edit_1",
  //                       "params": [
  //                         {
  //                           "name": "targetViewId",
  //                           "value": "view_011",
  //                           "type": "value"
  //                         }
  //                       ]
  //                     }
  //                   ]
  //                 },
  //                 {
  //                   "id": "grid_sender_04",
  //                   "senderId": "view_011",
  //                   "triggerType": "STATE",
  //                   "trigger": "CANCEL_NEW_ROW",
  //                   "triggerMoment": "after",
  //                   "sendData": [
  //                     {
  //                       "reveicerId": "",
  //                       "receiverTriggerType": "STATE",
  //                       "receiverTrigger": "STATE_TO_TEXT",
  //                       "conditionId": "cancel_edit_2",
  //                       "params": [
  //                         {
  //                           "name": "targetViewId",
  //                           "value": "view_011",
  //                           "type": "value"
  //                         }
  //                       ]
  //                     }
  //                   ]
  //                 },
  //                 {
  //                   "id": "grid_sender_05",
  //                   "senderId": "view_011",
  //                   "triggerType": "STATE",
  //                   "trigger": "EDIT_ROW",
  //                   "triggerMoment": "after",
  //                   "sendData": [
  //                     {
  //                       "reveicerId": "",
  //                       "receiverTriggerType": "STATE",
  //                       "receiverTrigger": "STATE_TO_EDIT",
  //                       "params": [
  //                         {
  //                           "name": "targetViewId",
  //                           "value": "view_011",
  //                           "type": "value"
  //                         }
  //                       ]
  //                     }
  //                   ]
  //                 }
  //               ],
  //               "messageReceiver": [
  //                 {
  //                   "id": "",
  //                   "senderId": "form_01",
  //                   "receiveData": [
  //                     {
  //                       "beforeReceive": [],
  //                       "triggerType": "BEHAVIOR",
  //                       "trigger": "REFRESH_AS_CHILD",
  //                       "params": [
  //                       ]
  //                     }
  //                   ]
  //                 }
  //               ]

  //             },
  //             "rowActions": [
  //               {
  //                 "id": "grid_new",
  //                 "state": "new",
  //                 "text": "保存",
  //                 "icon": "save",
  //                 "color": "text-primary",
  //                 "type": "link",
  //                 "size": "small",
  //                 "hidden": false,
  //                 "execute": [
  //                   {
  //                     "triggerType": "OPERATION",
  //                     "trigger": "SAVE_ROW",
  //                     "ajaxId": "province_save_1",
  //                     // "stateId": "add_save_1",
  //                     // "conditionId": "add_save_1"
  //                   }
  //                 ],
  //                 "toggle": {
  //                   "type": "state",
  //                   "toggleProperty": "hidden",
  //                   "values": [
  //                     {
  //                       "name": "new",
  //                       "value": false
  //                     },
  //                     {
  //                       "name": "text",
  //                       "value": true
  //                     }
  //                   ]
  //                 }
  //               },
  //               {
  //                 "id": "grid_new_cancel",
  //                 "state": "new",
  //                 "text": "取消",
  //                 "icon": "rollback",
  //                 "color": "text-primary",
  //                 "type": "link",
  //                 "size": "small",
  //                 "hidden": false,
  //                 "execute": [
  //                   {
  //                     "triggerType": "STATE",
  //                     "trigger": "CANCEL_NEW_ROW",
  //                     // "ajaxId": "add_save_1",
  //                     // "stateId": "add_save_1",
  //                     // "conditionId": "add_save_1"
  //                   }
  //                 ],
  //                 "toggle": {
  //                   "type": "state",
  //                   "toggleProperty": "hidden",
  //                   "values": [
  //                     {
  //                       "name": "new",
  //                       "value": false
  //                     },
  //                     {
  //                       "name": "text",
  //                       "value": true
  //                     }
  //                   ]
  //                 }
  //               },
  //               {
  //                 "id": "grid_edit",
  //                 "state": "text",
  //                 "text": "编辑",
  //                 "icon": "edit",
  //                 "color": "text-primary",
  //                 "type": "link",
  //                 "size": "small",
  //                 "hidden": false,
  //                 "execute": [
  //                   {
  //                     "triggerType": "STATE",
  //                     "trigger": "EDIT_ROW",
  //                     // "ajaxId": "add_save_1",
  //                     // "stateId": "add_save_1",
  //                     // "conditionId": "add_save_1"
  //                   }
  //                 ],
  //                 "toggle": {
  //                   "type": "state",
  //                   "toggleProperty": "hidden",
  //                   "values": [
  //                     {
  //                       "name": "edit",
  //                       "value": true
  //                     },
  //                     {
  //                       "name": "text",
  //                       "value": false
  //                     }
  //                   ]
  //                 }
  //               },
  //               {
  //                 "id": "grid_cancel",
  //                 "state": "text",
  //                 "text": "取消",
  //                 "icon": "rollback",
  //                 "color": "text-primary",
  //                 "type": "link",
  //                 "size": "small",
  //                 "hidden": true,
  //                 "execute": [
  //                   {
  //                     "triggerType": "STATE",
  //                     "trigger": "CANCEL_EDIT_ROW",
  //                     // "ajaxId": "add_save_1",
  //                     // "stateId": "add_save_1",
  //                     // "conditionId": "cancel_edit_1"
  //                   }
  //                 ],
  //                 "toggle": {
  //                   "type": "state",
  //                   "toggleProperty": "hidden",
  //                   "values": [
  //                     {
  //                       "name": "edit",
  //                       "value": false
  //                     },
  //                     {
  //                       "name": "text",
  //                       "value": true
  //                     }
  //                   ]
  //                 }
  //               },
  //               {
  //                 "id": "grid_save",
  //                 "state": "text",
  //                 "text": "保存",
  //                 "icon": "save",
  //                 "color": "text-primary",
  //                 "type": "link",
  //                 "size": "small",
  //                 "hidden": true,
  //                 "execute": [
  //                   {
  //                     "triggerType": "OPERATION",
  //                     "trigger": "SAVE_ROW",
  //                     "ajaxId": "province_edit_1",
  //                     // "stateId": "add_save_1",
  //                     // "conditionId": "add_save_1"
  //                   }
  //                 ],
  //                 "toggle": {
  //                   "type": "state",
  //                   "toggleProperty": "hidden",
  //                   "values": [
  //                     {
  //                       "name": "edit",
  //                       "value": false
  //                     },
  //                     {
  //                       "name": "text",
  //                       "value": true
  //                     }
  //                   ]
  //                 }
  //               },
  //               {
  //                 "id": "grid_delete",
  //                 "state": "text",
  //                 "text": "删除",
  //                 "icon": "delete",
  //                 "type": "link",
  //                 "color": "primary",
  //                 "size": "small",
  //                 "execute": [
  //                   {
  //                     "triggerType": "OPERATION",
  //                     "trigger": "EXECUTE_SELECTED_ROW",
  //                     // "conditionId": "delete_operation_1",
  //                     // "ajaxId": "delete_row_1"
  //                   }
  //                 ]
  //               }
  //             ],
  //             "condition": [
  //               {
  //                 "id": "add_state_1",
  //                 "state": [
  //                   {
  //                     "type": "component",
  //                     "valueName": "ROWS_CHECKED",
  //                     "expression": [
  //                       {
  //                         "type": "property",
  //                         "name": "length",
  //                         "matchValue": 0,
  //                         "match": "gt"
  //                       },
  //                       {
  //                         "type": "element",
  //                         "name": "name",
  //                         "matchValue": "1",
  //                         "match": "eq",
  //                       }
  //                     ]
  //                   }
  //                 ]
  //               },
  //               {
  //                 "id": "edit_state_1",
  //                 "state": [
  //                   {
  //                     "type": "component",
  //                     "valueName": "ROWS_CHECKED",
  //                     "expression": [
  //                       {
  //                         "type": "property",
  //                         "name": "length",
  //                         "matchValue": 0,
  //                         "match": "gt"
  //                       }
  //                     ]
  //                   }
  //                 ]
  //               },
  //               {
  //                 "id": "add_save_1",
  //                 "state": [
  //                   {
  //                     "type": "component",
  //                     "valueName": "ROWS_CHECKED",
  //                     "expression": [
  //                       {
  //                         "type": "property",
  //                         "name": "length",
  //                         "matchValue": 0,
  //                         "match": "gt"
  //                       }
  //                     ]
  //                   },
  //                   {
  //                     "type": "component",
  //                     "valueName": "ROWS_ADDED",
  //                     "expression": [
  //                       {
  //                         "type": "property",
  //                         "name": "length",
  //                         "matchValue": 0,
  //                         "match": "gt"
  //                       }
  //                     ]
  //                   }
  //                 ]
  //               },
  //               {
  //                 "id": "edit_save_1",
  //                 "state": [
  //                   {
  //                     "type": "component",
  //                     "valueName": "ROWS_EDITED",
  //                     "expression": [
  //                       {
  //                         "type": "property",
  //                         "name": "length",
  //                         "matchValue": 0,
  //                         "match": "gt"
  //                       }
  //                     ]
  //                   },
  //                   {
  //                     "type": "component",
  //                     "valueName": "ROWS_CHECKED",
  //                     "expression": [
  //                       {
  //                         "type": "property",
  //                         "name": "length",
  //                         "matchValue": 0,
  //                         "match": "gt"
  //                       }
  //                     ]
  //                   }
  //                 ]
  //               },
  //               {
  //                 "id": "cancel_edit_1",
  //                 "state": [
  //                   {
  //                     "type": "component",
  //                     "valueName": "ROWS_EDITED",
  //                     "expression": [
  //                       {
  //                         "type": "property",
  //                         "name": "length",
  //                         "matchValue": 0,
  //                         "match": "eq"
  //                       }
  //                     ]
  //                   }
  //                 ]
  //               },
  //               {
  //                 "id": "cancel_edit_2",
  //                 "state": [
  //                   {
  //                     "type": "component",
  //                     "valueName": "ROWS_ADDED",
  //                     "expression": [
  //                       {
  //                         "type": "property",
  //                         "name": "length",
  //                         "matchValue": 0,
  //                         "match": "eq"
  //                       }
  //                     ]
  //                   }
  //                 ]
  //               }

  //             ],
  //             "ajaxConfig": [
  //               {
  //                 "id": "province_save_1",
  //                 "url": "province/insert ",
  //                 "urlType": "inner",
  //                 "ajaxType": "post",
  //                 "params": [
  //                   {
  //                     "name": "provinceName",
  //                     "type": "componentValue",
  //                     "valueName": "provinceName",
  //                     "dataType": "string"
  //                   },
  //                   {
  //                     "name": "populationSize",
  //                     "type": "componentValue",
  //                     "valueName": "populationSize",
  //                     "dataType": "number"
  //                   },
  //                   {
  //                     "name": "directlyUnder",
  //                     "type": "componentValue",
  //                     "valueName": "directlyUnder",
  //                     "dataType": "number"
  //                   },
  //                   {
  //                     "name": "areaCode",
  //                     "type": "componentValue",
  //                     "valueName": "areaCode",
  //                     "dataType": "number"
  //                   },
  //                   {
  //                     "name": "createDate",
  //                     "type": "componentValue",
  //                     "valueName": "createDate",
  //                     "dataType": "string"
  //                   }
  //                 ],
  //                 "outputParameters": [

  //                 ],
  //                 "result": [
  //                   {
  //                     "name": "data",
  //                     "showMessageWithNext": 0,
  //                     "message": "message.ajax.state.success",
  //                     "senderId": "grid_sender_01"
  //                   },
  //                   // {
  //                   //     "name": "validation",
  //                   //     "senderId": "grid_sender_02"
  //                   // },
  //                   // {
  //                   //     "name": "error",
  //                   //     "senderId": "grid_sender_03"
  //                   // }
  //                 ]
  //               },
  //               {
  //                 "id": "province_edit_1",
  //                 "url": "province/update",
  //                 "urlType": "inner",
  //                 "ajaxType": "put",
  //                 "params": [
  //                   {
  //                     "name": "provinceName",
  //                     "type": "componentValue",
  //                     "valueName": "provinceName",
  //                     "dataType": "string"
  //                   },
  //                   {
  //                     "name": "populationSize",
  //                     "type": "componentValue",
  //                     "valueName": "populationSize",
  //                     "dataType": "int"
  //                   },
  //                   {
  //                     "name": "directlyUnder",
  //                     "type": "componentValue",
  //                     "valueName": "directlyUnder",
  //                     "dataType": "int"
  //                   },
  //                   {
  //                     "name": "areaCode",
  //                     "type": "componentValue",
  //                     "valueName": "areaCode",
  //                     "dataType": "int"
  //                   },
  //                   {
  //                     "name": "createDate",
  //                     "type": "componentValue",
  //                     "valueName": "createDate",
  //                     "dataType": "string"
  //                   },
  //                   {
  //                     "name": "id",
  //                     "type": "componentValue",
  //                     "valueName": "id",
  //                     "dataType": "string"
  //                   }
  //                 ],
  //                 "outputParameters": [

  //                 ],
  //                 "result": [

  //                 ]
  //               },
  //               {
  //                 "id": "province_delete_1",
  //                 "url": "province/delete",
  //                 "urlType": "inner",
  //                 "ajaxType": "delete",
  //                 "params": [
  //                   {
  //                     "name": "ids",
  //                     "type": "CHECKED_ROWS_ID",
  //                     "value": "_ids"
  //                   }
  //                 ],
  //                 "outputParameters": [

  //                 ],
  //                 "result": [

  //                 ]
  //               }
  //             ],
  //             "beforeTrigger": [

  //             ],
  //             "afterTrigger": [
  //               {
  //                 "id": "",
  //                 "senderId": "view_011",
  //                 "sendData": [
  //                   {
  //                     "beforeSend": [],
  //                     "reveicerId": "",
  //                     "receiverTriggerType": "BEHAVIOR",
  //                     "receiverTrigger": "REFRESH_AS_CHILD",
  //                     "params": [
  //                       {
  //                         "name": "parent_id",
  //                         "type": "item",
  //                         "valueName": "id"
  //                       },
  //                       {
  //                         "name": "parent_name",
  //                         "type": "item",
  //                         "valueName": "name"
  //                       }
  //                     ]
  //                   }
  //                 ]
  //               }
  //             ]

  //           }
  //         }
  //       ],
  //       id: "3vlDRq",
  //       type: "row"
  //     }
  //   ]
  // };

  public democonfig = {
    "id": "CKC23J", "type": "layout", "title": "布局CKC23J", "container": "rows",
    "rows": [{
      "cols": [
        {
          "id": "JaG6jW", "col": "cc", "type": "col", "titlestate": 1, "title": "", "span": 24, "container": "rows",
          "size": { "nzXs": 23, "nzSm": 24, "nzMd": 10, "nzLg": 10, "ngXl": 10, "nzXXl": 10 },
          "rows": [{
            "cols": [
              {
                "id": "rw7pRO", "col": "cc", "type": "col", "titlestate": 1, "title": "列rw7pRO", "span": 24, "container": "component",
                "size": { "nzXs": 24, "nzSm": 24, "nzMd": 24, "nzLg": 24, "ngXl": 24, "nzXXl": 24 },
                "component": {
                  "id": "view_tree_01",
                  "component": "cnToolbar",
                  "size": "default",
                  "cascade": {
                    "messageSender": [
                      {
                        "id": "toolbar_01",
                        "senderId": "view_tree_01",
                        "triggerType": "OPERATION",
                        "trigger": "EXECUTE_CHECKED_ROWS",
                        "triggerMoment": "after",
                        "sendData": [
                          {
                            "beforeSend": {},
                            "reveicerId": "",
                            "receiverTriggerType": "BEHAVIOR",
                            "receiverTrigger": "REFRESH_AS_CHILD",
                            "params": [
                              {
                                "name": "parent_id",
                                "type": "item",
                                "valueName": "id"
                              },
                              {
                                "name": "parent_name",
                                "type": "item",
                                "valueName": "name"
                              }
                            ]
                          }
                        ]
                      }
                    ],
                    "messageReceiver": [
                      {
                        "id": "s_001",
                        "senderId": "view_tree_01",
                        "receiveData": [
                          {
                            "triggerType": "STATE",
                            "trigger": "STATE_TO_TEXT"
                          }
                        ]
                      },
                      {
                        "id": "s_002",
                        "senderId": "view_tree_01",
                        "receiveData": [
                          {
                            "triggerType": "STATE",
                            "trigger": "STATE_TO_EDIT"
                          }
                        ]
                      }

                    ]
                  },
                  "changeValue": [
                    {
                      "id": "edit_form_changeValue",
                      "params": [
                        {
                          "name": "PID",
                          "type": "item",
                          "valueName": "ID",
                          "valueTo": "tempValue"
                        }
                      ]
                    }
                  ],
                  "dialog": [
                    {
                      "id": "edit_office_form",
                      "type": "confirm",
                      "title": "数据编辑",
                      "cancelText": "取消",
                      "okText": "提交",
                      "form": {
                        "id": "form_01",
                        "type": "form",
                        "component": "form",
                        state: 'text',
                        loadingConfig: {
                          id: "loadform" // 将加载配置引用
                        },
                        formLayout: {
                          "id": "b86s2i",
                          "type": "layout",
                          "title": "表单布局b86s2i",
                          "rows": [
                            {
                              "id": "MefhXa",
                              "type": "row",
                              // 行列，是否 显示。
                              "cols": [
                                {
                                  "id": "iHspYn", "col": "cc", "type": "col",
                                  "title": "列iHspYn", "span": 24,
                                  "layoutContain": "input",
                                  "size": {
                                    "nzXs": 24, "nzSm": 24, "nzMd": 24, "nzLg": 24, "ngXl": 24, "nzXXl": 24
                                  },
                                  "control": {
                                    "id": "001"  // id 和引用id 值相同
                                  }
                                },
                                // {
                                //     "id": "ioj0mV", "col": "cc", "type": "col", "title": "列ioj0mV", "span": 24, "layoutContain": "select",
                                //     "size": {
                                //         "nzXs": 24, "nzSm": 24, "nzMd": 24, "nzLg": 24, "ngXl": 24, "nzXXl": 24
                                //     },
                                //     "control": { "id": "002" }
                                // },
                                // {
                                //     "id": "ioj0mV", "col": "cc", "type": "col", "title": "列ioj0mV", "span": 12, "layoutContain": "select",
                                //     "size": {
                                //         "nzXs": 12, "nzSm": 12, "nzMd": 12, "nzLg": 12, "ngXl": 12, "nzXXl": 12
                                //     },
                                //     "control": { "id": "003" }
                                // },
                                // {
                                //     "id": "ioj0mV", "col": "cc", "type": "col", "title": "列ioj0mV", "span": 12, "layoutContain": "select",
                                //     "size": {
                                //         "nzXs": 12, "nzSm": 12, "nzMd": 12, "nzLg": 12, "ngXl": 12, "nzXXl": 12
                                //     },
                                //     "control": { "id": "004" }
                                // }
                              ]
                            }]
                        },
                        formControls: [
                          {
                            id: '001',
                            "hidden": true, // 字段是否隐藏
                            "title": '名称',  // lable 信息
                            "titleConfig": {
                              required: true
                            },
                            "field": "OFFICENAME",  // fromcontrol name  默认的字段
                            "labelSize": {
                              "span": 6,
                              "nzXs": { span: 6 },
                              "nzSm": { span: 6 },
                              "nzMd": { span: 6 },
                              "nzLg": { span: 6 },
                              "ngXl": { span: 6 },
                              "nzXXl": { span: 6 }
                            },  // 
                            "controlSize": {
                              "span": 18,
                              "nzXs": 18,
                              "nzSm": 18,
                              "nzMd": 18,
                              "nzLg": 18,
                              "ngXl": 18,
                              "nzXXl": 18
                            },
                            "state": "edit", // 当前组件默认状态 文本，编辑，或者由表单状态控制text、edit、form
                            "text": { // 文本展示字段
                              "type": 'label', // 什么组件展示文本 
                              "field": 'OFFICENAME',   // 字段
                            },
                            "editor": {            // 编辑状态字段  日后扩充可为数组，满足条件下的组件变化
                              "type": "input",
                              "field": "OFFICENAME",  // 编辑字段于定义字段一致 （此处定义于表格相反）
                              "placeholder": "请输入",
                              "validations": [  // 校验
                                { validator: "required", type: "default", "message": "请输入省名称" }
                              ]
                            }
                          },
                          {
                            id: '002',
                            "hidden": true, // 字段是否隐藏
                            "title": '',  // lable 信息
                            "titleConfig": {
                              required: false
                            },
                            "field": "ID",  // fromcontrol name  默认的字段
                            "labelSize": {
                              "span": 6,
                              "nzXs": 6, "nzSm": 6, "nzMd": 6, "nzLg": 6, "ngXl": 6, "nzXXl": 6
                            },  // 
                            "controlSize": {
                              "span": 18,
                              "nzXs": { span: 18, offset: 0 },
                              "nzSm": { span: 18, offset: 0 },
                              "nzMd": { span: 18, offset: 0 },
                              "nzLg": { span: 18, offset: 0 },
                              "ngXl": { span: 18, offset: 0 },
                              "nzXXl": { span: 18, offset: 0 }
                            },
                            "state": "edit", // 当前组件默认状态 文本，编辑，或者由表单状态控制 text、edit、form
                            "text": { // 文本展示字段
                              "type": 'label', // 什么组件展示文本 
                              "field": 'ID',   // 字段
                            },
                            "editor": {            // 编辑状态字段  日后扩充可为数组，满足条件下的组件变化
                              "type": "input",
                              "field": "ID",  // 编辑字段于定义字段一致 （此处定义于表格相反）
                              "placeholder": "请输入",
                              "validations": [  // 校验

                              ]
                            }
                          },
                          {
                            id: '003',
                            "hidden": true, // 字段是否隐藏
                            "title": '',  // lable 信息
                            "titleConfig": {
                              required: false
                            },
                            "field": "PID",  // fromcontrol name  默认的字段
                            "labelSize": {
                              "span": 8,
                              "nzXs": 8, "nzSm": 8, "nzMd": 8, "nzLg": 8, "ngXl": 8, "nzXXl": 8
                            },  // 
                            "controlSize": {
                              "span": 16,
                              "nzXs": { span: 16, offset: 0 },
                              "nzSm": { span: 16, offset: 0 },
                              "nzMd": { span: 16, offset: 0 },
                              "nzLg": { span: 16, offset: 0 },
                              "ngXl": { span: 16, offset: 0 },
                              "nzXXl": { span: 16, offset: 0 }
                            },
                            "state": "edit", // 当前组件默认状态 文本，编辑，或者由表单状态控制 text、edit、form
                            "text": { // 文本展示字段
                              "type": 'label', // 什么组件展示文本 
                              "field": 'PID',   // 字段
                            },
                            "editor": {            // 编辑状态字段  日后扩充可为数组，满足条件下的组件变化
                              "type": "input",
                              "field": "PID",  // 编辑字段于定义字段一致 （此处定义于表格相反）
                              "placeholder": "请输入",
                              "validations": [  // 校验

                              ]
                            }
                          }
                        ],
                        formControlsPermissions: [ // 初始表单字段，描述 新增、编辑、查看 状态下的文本
                          {
                            formState: "new", // 新增状态下的Controls 展示与否，是否读写属性设置
                            formStateContent: { // 对当前状态的描述 ，描述当前状态下 表单组件 具备的行为，例如是否自加载，是否启用默认值
                              isLoad: false,
                              loadAjax: {}, // 如果启用load，是否用新的加载地址
                              isDefault: true
                            },
                            Controls: [
                              { id: '001', state: "edit", hidden: false, readOnly: false },
                              { id: '002', state: "edit", hidden: true, readOnly: false },
                              { id: '003', state: "edit", hidden: true, readOnly: false }
                            ]
                          },
                          {
                            formState: "edit",
                            Controls: [
                              { id: '001', state: "edit", hidden: false, readOnly: false },
                              { id: '002', state: "edit", hidden: true, readOnly: false },
                              { id: '003', state: "edit", hidden: true, readOnly: false }
                            ]
                          },
                          {
                            formState: "text",
                            Controls: [
                              { id: '001', state: "text", hidden: false, readOnly: false },
                              { id: '002', state: "text", hidden: true, readOnly: false },
                              { id: '003', state: "text", hidden: true, readOnly: false }
                            ]
                          }

                        ],
                        ajaxConfig: [
                          {
                            "id": "loadform",
                            "url": "province/queryCondition/OFFICE_SHEET",
                            "urlType": "inner",
                            "ajaxType": "get",
                            "params": [
                              {
                                "name": "id",
                                "type": "tempValue",
                                "valueName": "id"
                              }
                            ],
                            "outputParameters": [

                            ],
                            "result": [  // 描述 表单接收参数，将返回的哪些值赋给相应的组件属性

                            ]
                          }
                        ]
                      }
                    }
                  ],
                  "condition": [
                    {
                      "id": "add_cities_state",
                      "state": [
                        {
                          "type": "component",
                          "valueName": "ROWS_CHECKED",
                          "expression": [
                            {
                              "type": "property",
                              "name": "length",
                              "matchValue": 0,
                              "match": "gt"
                            },
                            {
                              "type": "element",
                              "name": "name",
                              "matchValue": "1",
                              "match": "eq",
                            }
                          ]
                        }
                      ]
                    },
                    {
                      "id": "edit_cities_state",
                      "state": [
                        {
                          "type": "component",
                          "valueName": "ROWS_CHECKED",
                          "expression": [
                            {
                              "type": "property",
                              "name": "length",
                              "matchValue": 0,
                              "match": "gt"
                            }
                          ]
                        }
                      ]
                    },
                    {
                      "id": "add_cities",
                      "state": [
                        {
                          "type": "component",
                          "valueName": "ROWS_CHECKED",
                          "expression": [
                            {
                              "type": "property",
                              "name": "length",
                              "matchValue": 0,
                              "match": "gt"
                            }
                          ]
                        },
                        {
                          "type": "component",
                          "valueName": "ROWS_ADDED",
                          "expression": [
                            {
                              "type": "property",
                              "name": "length",
                              "matchValue": 0,
                              "match": "gt"
                            }
                          ]
                        }
                      ]
                    },
                    {
                      "id": "edit_cities",
                      "state": [
                        {
                          "type": "component",
                          "valueName": "ROWS_EDITED",
                          "expression": [
                            {
                              "type": "property",
                              "name": "length",
                              "matchValue": 0,
                              "match": "gt"
                            }
                          ]
                        },
                        {
                          "type": "component",
                          "valueName": "ROWS_CHECKED",
                          "expression": [
                            {
                              "type": "property",
                              "name": "length",
                              "matchValue": 0,
                              "match": "gt"
                            }
                          ]
                        }
                      ]
                    },
                    {
                      "id": "cancel_edit_rows_2",
                      "state": [
                        {
                          "type": "component",
                          "valueName": "ROWS_EDITED",
                          "expression": [
                            {
                              "type": "property",
                              "name": "length",
                              "matchValue": 0,
                              "match": "gt"
                            }
                          ]
                        }
                      ]
                    }
                  ],
                  "ajaxConfig": [
                    {
                      "id": "add_provinces_1",
                      "url": "province/insertMany",
                      "urlType": "inner",
                      "ajaxType": "post",
                      "params": [
                        {
                          "name": "provinceName",
                          "type": "componentValue",
                          "valueName": "provinceName",
                          "dataType": "string"
                        },
                        {
                          "name": "populationSize",
                          "type": "componentValue",
                          "valueName": "populationSize",
                          "dataType": "int"
                        },
                        {
                          "name": "directlyUnder",
                          "type": "componentValue",
                          "valueName": "directlyUnder",
                          "dataType": "int"
                        },
                        {
                          "name": "areaCode",
                          "type": "componentValue",
                          "valueName": "areaCode",
                          "dataType": "int"
                        },
                        {
                          "name": "createDate",
                          "type": "componentValue",
                          "valueName": "createDate",
                          "dataType": "string"
                        }
                      ],
                      "outputParameters": [

                      ],
                      "result": [
                        {
                          "name": "data",
                          "showMessageWithNext": 0,
                          "message": "message.ajax.state.success",
                          "senderId": "afterProvinceSaveSuccessfully"
                        },
                        {
                          "name": "validation",
                          "message": "message.ajax.state.success",
                          "senderId": "afterProvinceSaveValidation"
                        },
                        {
                          "name": "error",
                          "senderId": "toolbar_02"
                        }
                      ]
                    },
                    {
                      "id": "edit_save_1",
                      "url": "province/updateMany",
                      "urlType": "inner",
                      "ajaxType": "put",
                      "params": [
                        {
                          "name": "id",
                          "type": "componentValue",
                          "valueName": "id",
                          "dataType": "string"
                        },
                        {
                          "name": "provinceName",
                          "type": "componentValue",
                          "valueName": "provinceName",
                          "dataType": "string"
                        },
                        {
                          "name": "populationSize",
                          "type": "componentValue",
                          "valueName": "populationSize",
                          "dataType": "int"
                        },
                        {
                          "name": "directlyUnder",
                          "type": "componentValue",
                          "valueName": "directlyUnder",
                          "dataType": "int"
                        },
                        {
                          "name": "areaCode",
                          "type": "componentValue",
                          "valueName": "areaCode",
                          "dataType": "int"
                        },
                        {
                          "name": "createDate",
                          "type": "componentValue",
                          "valueName": "createDate",
                          "dataType": "string"
                        }
                      ],
                      "outputParameters": [

                      ],
                      "result": [
                        {
                          "name": "data",
                          "showMessageWithNext": 0,
                          "message": "message.ajax.state.success",
                          "senderId": "afterProvinceUpdateSuccessfully"
                        },
                        {
                          "name": "validation",
                          "message": "message.ajax.state.success",
                          "senderId": "aftetProvinceUpdateValidation"
                        },
                        {
                          "name": "error",
                          "senderId": "toolbar_02"
                        }
                      ]
                    },
                    {
                      "id": "tree_add_office",
                      "url": "office/insert/OFFICE_SHEET",
                      "urlType": "inner",
                      "ajaxType": "post",
                      "params": [
                        {
                          "name": "ID",
                          "type": "GUID"
                        },
                        {
                          "name": "OFFICENAME",
                          "type": "componentValue",
                          "valueName": "OFFICENAME",
                          "dataType": "string"
                        },
                        {
                          "name": "PID",
                          "type": "tempValue",
                          "valueName": "PID",
                          "dataType": "string"
                        }
                      ],
                      "outputParameters": [

                      ],
                      "result": [
                        {
                          "name": "data",
                          "showMessageWithNext": 0,
                          "message": "message.ajax.state.success",
                          "senderId": "afterOfficeSaveSuccessfully"
                        }
                      ]
                    },
                    {
                      "id": "tree_edit_office",
                      "url": "office/update/OFFICE_SHEET",
                      "urlType": "inner",
                      "ajaxType": "put",
                      "params": [
                        {
                          "name": "OFFICENAME",
                          "type": "componentValue",
                          "valueName": "OFFICENAME",
                          "dataType": "string"
                        },
                        {
                          "name": "ID",
                          "type": "componentValue",
                          "valueName": "ID",
                          "dataType": "string"
                        }
                      ],
                      "outputParameters": [

                      ],
                      "result": [

                      ]
                    }
                  ],
                  "beforeTrigger": [

                  ],
                  "afterTrigger": [
                    {
                      "id": "",
                      "senderId": "view_tree_01",
                      "sendData": [
                        {
                          "beforeSend": [],
                          "reveicerId": "",
                          "receiverTriggerType": "BEHAVIOR",
                          "receiverTrigger": "REFRESH_AS_CHILD",
                          "params": [
                            {
                              "name": "parent_id",
                              "type": "item",
                              "valueName": "id"
                            },
                            {
                              "name": "parent_name",
                              "type": "item",
                              "valueName": "name"
                            }
                          ]
                        }
                      ]
                    }
                  ],
                  "toolbar": [
                    {
                      "targetViewId": "view_tree_01",
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
                          "id": "M_addParentNode",
                          "text": "新增根节点",
                          "state": "new",
                          "icon": "plus",
                          "color": "text-primary",
                          "hidden": false,
                          "disabled": false,
                          "execute": [
                            {
                              "triggerType": "ACTION",
                              "trigger": "DIALOG",
                              // "conditionId": "add_state_1"
                              "dialogId": "edit_office_form",
                              "ajaxId": "tree_add_office"
                            }
                          ]
                        },
                        {
                          "id": "M_addChildNode",
                          "text": "新增子节点",
                          "state": "new",
                          "icon": "plus",
                          "color": "text-primary",
                          "hidden": false,
                          "disabled": false,
                          "execute": [
                            {
                              "triggerType": "ACTION",
                              "trigger": "DIALOG",
                              // "conditionId": "add_state_1"
                              "dialogId": "edit_office_form",
                              "ajaxId": "tree_add_office",
                              "changeValueId": "edit_form_changeValue",
                            }
                          ]
                        },
                        {
                          "id": "M_editTreeNode",
                          "text": "编辑节点",
                          "state": "edit",
                          "icon": "edit",
                          "color": "text-primary",
                          "hidden": false,
                          "disabled": false,
                          "execute": [
                            {
                              "triggerType": "ACTION",
                              "trigger": "DIALOG",
                              // "conditionId": "add_state_1"
                              "dialogId": "edit_office_form",
                              "ajaxId": "form_edit_province",
                              "changeValueId": "edit_form_changeValue"
                            }
                          ]
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
                              // "conditionId": "delete_operation_1",
                              // "ajaxId": "delete_row_1"
                            }
                          ]
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
                }
              },
              {
                "id": "7kWKgW", "col": "cc", "type": "col", "titlestate": 1, "title": "列7kWKgW", "span": 24, "container": "component",
                "size": { "nzXs": 24, "nzSm": 24, "nzMd": 24, "nzLg": 24, "ngXl": 24, "nzXXl": 24 },
                "component": {
                  "id": "view_tree_01",
                  "title": "树",
                  "titleIcon": "right-circle",
                  "component": "cnTree",
                  "keyId": "ID",
                  "async": true,
                  "showCheckBox": false,
                  "expandAll": false,
                  "loadingOnInit": true,
                  "showLine": false,
                  "rootTitle": '根节点',
                  "loadingConfig": {
                    "url": "province/queryCondition/OFFICE_SHEET",
                    "method": "get",
                    "params": [
                      {
                        "name": "_recursive",
                        "type": "value",
                        "value": true
                      },
                      {
                        "name": "_deep",
                        "type": "value",
                        "value": "1"
                      },
                      {
                        "name": "_pcName",
                        "type": "value",
                        "value": "PID"
                      }
                    ],
                    "filter": [

                    ]
                  },
                  "expandConfig": {
                    "url": "province/queryCondition/OFFICE_SHEET",
                    "method": "get",
                    "params": [
                      {
                        "name": "_root.PID",
                        "type": "item",
                        "valueName": "key",
                        "value": ""
                      },
                      {
                        "name": "_recursive",
                        "type": "value",
                        "value": true
                      },
                      {
                        "name": "_deep",
                        "type": "value",
                        "value": "1"
                      },
                      {
                        "name": "_pcName",
                        "type": "value",
                        "value": "PID"
                      }
                    ]
                  },
                  "columns": [
                    {
                      "title": "ID",
                      "type": "key",
                      "field": "ID"
                    },
                    {
                      "title": "PID",
                      "type": "parentId",
                      "field": "PID"
                    },
                    {
                      "title": "OFFICENAME",
                      "type": "title",
                      "field": "OFFICENAME"
                    },
                    // {
                    //     "title": "ACTION",
                    //     "type": "action",
                    //     "actionIds": [
                    //         "grid_edit", "grid_cancel", "grid_save", "grid_delete", "grid_new", "grid_new_cancel"
                    //     ]
                    // }
                  ],
                  "cascade": {
                    "messageSender": [
                      {
                        "id": "grid_sender_02",
                        "senderId": "view_tree_01",
                        "triggerType": "BEHAVIOR",
                        "trigger": "CLICK_NODE",
                        "triggerMoment": "after",
                        "sendData": [
                          {
                            "beforeSend": {},
                            "reveicerId": "",
                            "receiverTriggerType": "BEHAVIOR",
                            "receiverTrigger": "REFRESH_AS_CHILD",
                            "params": [
                              {
                                "name": "PID",
                                "type": "item",
                                "valueName": "ID"
                              }
                            ]
                          }
                        ]
                      },
                      {
                        "id": "grid_sender_03",
                        "senderId": "view_tree_01",
                        "triggerType": "STATE",
                        "trigger": "CANCEL_EDIT_ROW",
                        "triggerMoment": "after",
                        "sendData": [
                          {
                            "reveicerId": "",
                            "receiverTriggerType": "STATE",
                            "receiverTrigger": "STATE_TO_TEXT",
                            "conditionId": "cancel_edit_1",
                            "params": [
                              {
                                "name": "targetViewId",
                                "value": "view_tree_01",
                                "type": "value"
                              }
                            ]
                          }
                        ]
                      },
                      {
                        "id": "grid_sender_04",
                        "senderId": "view_tree_01",
                        "triggerType": "STATE",
                        "trigger": "CANCEL_NEW_ROW",
                        "triggerMoment": "after",
                        "sendData": [
                          {
                            "reveicerId": "",
                            "receiverTriggerType": "STATE",
                            "receiverTrigger": "STATE_TO_TEXT",
                            "conditionId": "cancel_edit_2",
                            "params": [
                              {
                                "name": "targetViewId",
                                "value": "view_tree_01",
                                "type": "value"
                              }
                            ]
                          }
                        ]
                      },
                      {
                        "id": "grid_sender_05",
                        "senderId": "view_tree_01",
                        "triggerType": "STATE",
                        "trigger": "EDIT_ROW",
                        "triggerMoment": "after",
                        "sendData": [
                          {
                            "reveicerId": "",
                            "receiverTriggerType": "STATE",
                            "receiverTrigger": "STATE_TO_EDIT",
                            "params": [
                              {
                                "name": "targetViewId",
                                "value": "view_tree_01",
                                "type": "value"
                              }
                            ]
                          }
                        ]
                      },
                      {
                        "id": "grid_sender_06",
                        "senderId": "view_tree_01",
                        "triggerType": "OPERATION",
                        "trigger": "SAVE_ROW",
                        "triggerMoment": "after",
                        "sendData": [
                          {
                            "reveicerId": "",
                            "receiverTriggerType": "STATE",
                            "receiverTrigger": "STATE_TO_TEXT",
                            "params": [
                              {
                                "name": "targetViewId",
                                "value": "view_tree_01",
                                "type": "value"
                              }
                            ]
                          }
                        ]
                      },
                      {
                        "id": "grid_sender_07",
                        "senderId": "view_tree_01",
                        "triggerType": "OPERATION",
                        "trigger": "SAVE_ROWS",
                        "triggerMoment": "after",
                        "sendData": [
                          {
                            "reveicerId": "",
                            "receiverTriggerType": "STATE",
                            "receiverTrigger": "STATE_TO_TEXT",
                            "params": [
                              {
                                "name": "targetViewId",
                                "value": "view_tree_01",
                                "type": "value"
                              }
                            ]
                          }
                        ]
                      },
                      {
                        "id": "grid_sender_08",
                        "senderId": "view_tree_01",
                        "triggerType": "ACTION",
                        "trigger": "CONFIRM",
                        "triggerMoment": "after",
                        "sendData": [
                          {
                            "reveicerId": "",
                            "receiverTriggerType": "STATE",
                            "receiverTrigger": "STATE_TO_TEXT",
                            "params": [
                              {
                                "name": "targetViewId",
                                "value": "view_tree_01",
                                "type": "value"
                              }
                            ]
                          }
                        ]
                      },
                      {
                        "id": "afterOfficeSaveSuccessfully",
                        "senderId": "view_tree_01",
                        "sendData": [
                          {
                            "beforeSend": {},
                            "reveicerId": "",
                            "receiverTriggerType": "ACTION",
                            "receiverTrigger": "MESSAGE",
                            "params": [
                              {
                                "name": "type",
                                "type": "value",
                                "value": "success"
                              },
                              {
                                "name": "message",
                                "type": "value",
                                "value": "操作完成!"
                              },
                            ]
                          },
                          {
                            "beforeSend": {},
                            "reveicerId": "",
                            "receiverTriggerType": "ACTION",
                            "receiverTrigger": "APPEND_CHILD_TO_SELECTED_NODE",
                            "params": [
                              {
                                "name": "ID",
                                "type": "addedRows",
                                "valueName": "ID"
                              },
                              {
                                "name": "OFFICENAME",
                                "type": "addedRows",
                                "valueName": "ID"
                              },
                              {
                                "name": "PID",
                                "type": "addedRows",
                                "valueName": "PID"
                              }
                            ]
                          }
                        ]
                      },
                      {
                        "id": "afterProvinceUpdateSuccessfully",
                        "senderId": "view_tree_01",
                        // "triggerType": "ACTION",
                        // "trigger": "MESSAGE0",
                        // "triggerMoment": "after",
                        "sendData": [
                          {
                            "beforeSend": {},
                            "reveicerId": "",
                            "receiverTriggerType": "ACTION",
                            "receiverTrigger": "MESSAGE",
                            "params": [
                              {
                                "name": "type",
                                "type": "value",
                                "value": "success"
                              },
                              {
                                "name": "message",
                                "type": "value",
                                "value": "操作完成!"
                              },
                            ]
                          },
                          {
                            "beforeSend": {},
                            "reveicerId": "",
                            "receiverTriggerType": "ACTION",
                            "receiverTrigger": "CHANGE_EDITED_ROWS_TO_TEXT",
                            "params": [
                              {
                                "name": "id",
                                "type": "editedRows",
                                "valueName": "id"
                              }
                            ]
                          }
                        ]
                      },
                      {
                        "id": "afterProvinceSaveValidation",
                        "senderId": "view_tree_01",
                        "sendData": [
                          {
                            "beforeSend": {},
                            "reveicerId": "",
                            "receiverTriggerType": "ACTION",
                            "receiverTrigger": "SHOW_INVALIDATE_ADDED_ROWS"
                          }
                        ]
                      },
                      {
                        "id": "afterProvinceUpdateValidation",
                        "senderId": "view_tree_01",
                        "sendData": [
                          {
                            "beforeSend": {},
                            "reveicerId": "",
                            "receiverTriggerType": "ACTION",
                            "receiverTrigger": "SHOW_INVALIDATE_EDITED_ROWS"
                          }
                        ]
                      }
                    ],
                    "messageReceiver": [
                      {
                        "id": "s_201",
                        "senderId": "view_tree_01",
                        "receiveData": [
                          {
                            "triggerType": "ACTION",
                            "trigger": "APPEND_CHILD_TO_SELECTED_NODE"
                          }
                        ]
                      },
                      {
                        "id": "s_202",
                        "senderId": "view_tree_01",
                        "receiveData": [
                          {
                            "triggerType": "ACTION",
                            "trigger": "APPEND_CHILD_TO_ROOT_NODE"
                          }
                        ]
                      }
                    ]
                  },
                  "rowActions": [
                    {
                      "id": "grid_new",
                      "state": "new",
                      "text": "保存",
                      "icon": "save",
                      "color": "text-primary",
                      "type": "link",
                      "size": "small",
                      "hidden": false,
                      "execute": [
                        {
                          "triggerType": "OPERATION",
                          "trigger": "SAVE_ROW",
                          "ajaxId": "province_save_1",
                          // "stateId": "add_save_1",
                          // "conditionId": "add_citiessave_1"
                        }
                      ],
                      "toggle": {
                        "type": "state",
                        "toggleProperty": "hidden",
                        "values": [
                          {
                            "name": "new",
                            "value": false
                          },
                          {
                            "name": "text",
                            "value": true
                          }
                        ]
                      }
                    },
                    {
                      "id": "grid_new_cancel",
                      "state": "new",
                      "text": "取消",
                      "icon": "rollback",
                      "color": "text-primary",
                      "type": "link",
                      "size": "small",
                      "hidden": false,
                      "execute": [
                        {
                          "triggerType": "STATE",
                          "trigger": "CANCEL_NEW_ROW",
                          // "ajaxId": "add_save_1",
                          // "stateId": "add_save_1",
                          // "conditionId": "add_save_1"
                        }
                      ],
                      "toggle": {
                        "type": "state",
                        "toggleProperty": "hidden",
                        "values": [
                          {
                            "name": "new",
                            "value": false
                          },
                          {
                            "name": "text",
                            "value": true
                          }
                        ]
                      }
                    },
                    {
                      "id": "grid_edit",
                      "state": "text",
                      "text": "编辑",
                      "icon": "edit",
                      "color": "text-primary",
                      "type": "link",
                      "size": "small",
                      "hidden": false,
                      "execute": [
                        {
                          "triggerType": "STATE",
                          "trigger": "EDIT_ROW",
                          // "ajaxId": "add_save_1",
                          // "stateId": "add_save_1",
                          //  "conditionId": "edit_cities"
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
                      "id": "grid_cancel",
                      "state": "text",
                      "text": "取消",
                      "icon": "rollback",
                      "color": "text-primary",
                      "type": "link",
                      "size": "small",
                      "hidden": true,
                      "execute": [
                        {
                          "triggerType": "STATE",
                          "trigger": "CANCEL_EDIT_ROW",
                          // "ajaxId": "add_save_1",
                          // "stateId": "add_save_1",
                          // "conditionId": "cancel_edit_1"
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
                          }
                        ]
                      }
                    },
                    {
                      "id": "grid_save",
                      "state": "text",
                      "text": "保存",
                      "icon": "save",
                      "color": "text-primary",
                      "type": "link",
                      "size": "small",
                      "hidden": true,
                      "execute": [
                        {
                          "triggerType": "OPERATION",
                          "trigger": "SAVE_ROW",
                          "ajaxId": "province_edit_1",
                          // "stateId": "add_save_1",
                          // "conditionId": "add_cities"
                        },
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
                          }
                        ]
                      }
                    },
                    {
                      "id": "grid_delete",
                      "state": "text",
                      "text": "删除",
                      "icon": "delete",
                      "type": "link",
                      "color": "primary",
                      "size": "small",
                      "execute": [
                        {
                          "triggerType": "ACTION",
                          "trigger": "CONFIRM",
                          "dialogId": "delete_confirm",
                          // "conditionId": "delete_operation_1",
                          "ajaxId": "delete_province",
                          // "stateId": "before_delete_province"
                        }
                      ]
                    }
                  ],
                  "dialog": [
                    {
                      "id": "delete_confirm",
                      "type": "confirm",
                      "title": "确认操作",
                      "content": "是否删除当前操作数据?",
                      "cancelText": "取消",
                      "okText": "确认"
                    }
                  ],
                  "condition": [
                    {
                      "id": "add_cities_state",
                      "state": [
                        {
                          "type": "component",
                          "valueName": "ROWS_CHECKED",
                          "expression": [
                            {
                              "type": "property",
                              "name": "length",
                              "matchValue": 0,
                              "match": "gt"
                            },
                            {
                              "type": "element",
                              "name": "name",
                              "matchValue": "1",
                              "match": "eq",
                            }
                          ]
                        }
                      ]
                    },
                    {
                      "id": "edit_cities_state",
                      "state": [
                        {
                          "type": "component",
                          "valueName": "ROWS_CHECKED",
                          "expression": [
                            {
                              "type": "property",
                              "name": "length",
                              "matchValue": 0,
                              "match": "gt"
                            }
                          ]
                        }
                      ]
                    },
                    {
                      "id": "add_cities",
                      "state": [
                        {
                          "type": "component",
                          "valueName": "ROWS_CHECKED",
                          "expression": [
                            {
                              "type": "property",
                              "name": "length",
                              "matchValue": 0,
                              "match": "gt"
                            }
                          ]
                        },
                        {
                          "type": "component",
                          "valueName": "ROWS_ADDED",
                          "expression": [
                            {
                              "type": "property",
                              "name": "length",
                              "matchValue": 0,
                              "match": "gt"
                            }
                          ]
                        }
                      ]
                    },
                    {
                      "id": "edit_cities",
                      "state": [
                        {
                          "type": "component",
                          "valueName": "ROWS_EDITED",
                          "expression": [
                            {
                              "type": "property",
                              "name": "length",
                              "matchValue": 0,
                              "match": "gt"
                            }
                          ]
                        },
                        {
                          "type": "component",
                          "valueName": "ROWS_CHECKED",
                          "expression": [
                            {
                              "type": "property",
                              "name": "length",
                              "matchValue": 0,
                              "match": "gt"
                            }
                          ]
                        }
                      ]
                    },
                    {
                      "id": "cancel_edit_cities",
                      "state": [
                        {
                          "type": "component",
                          "valueName": "ROWS_EDITED",
                          "expression": [
                            {
                              "type": "property",
                              "name": "length",
                              "matchValue": 0,
                              "match": "eq"
                            }
                          ]
                        }
                      ]
                    },
                    {
                      "id": "cancel_add_cities",
                      "state": [
                        {
                          "type": "component",
                          "valueName": "ROWS_ADDED",
                          "expression": [
                            {
                              "type": "property",
                              "name": "length",
                              "matchValue": 0,
                              "match": "eq"
                            }
                          ]
                        }
                      ]
                    }

                  ],
                  "ajaxConfig": [
                    {
                      "id": "province_save_1",
                      "url": "province/insert ",
                      "urlType": "inner",
                      "ajaxType": "post",
                      "params": [
                        {
                          "name": "provinceName",
                          "type": "componentValue",
                          "valueName": "provinceName",
                          "dataType": "string"
                        },
                        {
                          "name": "populationSize",
                          "type": "componentValue",
                          "valueName": "populationSize",
                          "dataType": "number"
                        },
                        {
                          "name": "directlyUnder",
                          "type": "componentValue",
                          "valueName": "directlyUnder",
                          "dataType": "number"
                        },
                        {
                          "name": "areaCode",
                          "type": "componentValue",
                          "valueName": "areaCode",
                          "dataType": "number"
                        },
                        {
                          "name": "createDate",
                          "type": "componentValue",
                          "valueName": "createDate",
                          "dataType": "string"
                        }
                      ],
                      "outputParameters": [

                      ],
                      "result": [
                        {
                          "name": "data",
                          "showMessageWithNext": 0,
                          "message": "message.ajax.state.success",
                          "senderId": "afterProvinceSaveSuccessfully"
                        },
                        {
                          "name": "validation",
                          "senderId": "afterProvinceSaveValidation"
                        },
                        // {
                        //     "name": "error",
                        //     "senderId": "grid_sender_03"
                        // }
                      ]
                    },
                    {
                      "id": "province_edit_1",
                      "url": "province/update",
                      "urlType": "inner",
                      "ajaxType": "put",
                      "params": [
                        {
                          "name": "provinceName",
                          "type": "componentValue",
                          "valueName": "provinceName",
                          "dataType": "string"
                        },
                        {
                          "name": "populationSize",
                          "type": "componentValue",
                          "valueName": "populationSize",
                          "dataType": "int"
                        },
                        {
                          "name": "directlyUnder",
                          "type": "componentValue",
                          "valueName": "directlyUnder",
                          "dataType": "int"
                        },
                        {
                          "name": "areaCode",
                          "type": "componentValue",
                          "valueName": "areaCode",
                          "dataType": "int"
                        },
                        {
                          "name": "createDate",
                          "type": "componentValue",
                          "valueName": "createDate",
                          "dataType": "string"
                        },
                        {
                          "name": "id",
                          "type": "componentValue",
                          "valueName": "id",
                          "dataType": "string"
                        }
                      ],
                      "outputParameters": [

                      ],
                      "result": [
                        {
                          "name": "data",
                          "showMessageWithNext": 0,
                          "message": "message.ajax.state.success",
                          "senderId": "afterProvinceUpdateSuccessfully"
                        },
                        {
                          "name": "validation",
                          "senderId": "afterProvinceUpdateValidation"
                        },
                      ]
                    },
                    {
                      "id": "delete_province",
                      "url": "province/delete",
                      "urlType": "inner",
                      "ajaxType": "delete",
                      "params": [
                        {
                          "name": "ids",
                          "type": "item",
                          "valueName": "id"
                        }
                      ],
                      "outputParameters": [

                      ],
                      "result": [

                      ]
                    }
                  ],
                  "beforeTrigger": [
                    {
                      "id": "before_delete_province",
                      "senderId": "view_tree_01",
                      "sendData": [
                        {
                          "receiverTriggerType": "ACTION",
                          "receiverTrigger": "CONFIRM",
                          "params": [
                            {
                              "name": "title",
                              "type": " 确认操作",
                              "value": "title"
                            },
                            {
                              "name": "content",
                              "type": "确认删除当前数据",
                              "value": "content"
                            }
                          ]
                        }

                      ]
                    }
                  ],
                  "afterTrigger": [
                    {
                      "id": "",
                      "senderId": "view_tree_01",
                      "sendData": [
                        {
                          "beforeSend": [],
                          "reveicerId": "",
                          "receiverTriggerType": "BEHAVIOR",
                          "receiverTrigger": "REFRESH_AS_CHILD",
                          "params": [
                            {
                              "name": "parent_id",
                              "type": "item",
                              "valueName": "id"
                            },
                            {
                              "name": "parent_name",
                              "type": "item",
                              "valueName": "name"
                            }
                          ]
                        }
                      ]
                    }
                  ]

                }
              }
            ],
            "container": "cols", "id": "eJoEgx", "type": "row"
          }]
        },
        {
          "id": "DjOgQn", "col": "cc", "type": "col", "titlestate": 1, "title": "", "span": 24, "container": "rows",
          "size": { "nzXs": 24, "nzSm": 24, "nzMd": 14, "nzLg": 14, "ngXl": 14, "nzXXl": 14 },
          "rows": [{
            "cols": [
              {
                "id": "OV6Qgx", "col": "cc", "type": "col", "titlestate": 1, "title": "列OV6Qgx", "span": 24, "container": "component",
                "size": { "nzXs": 24, "nzSm": 24, "nzMd": 24, "nzLg": 24, "ngXl": 24, "nzXXl": 24 },
                "component": {
                  "id": "toolbar_002",
                  "component": "cnToolbar",
                  "size": "default",
                  "cascade": {
                    "messageSender": [
                      {
                        "id": "toolbar_02",
                        "senderId": "view_02",
                        "triggerType": "OPERATION",
                        "trigger": "EXECUTE_CHECKED_ROWS",
                        "triggerMoment": "after",
                        "sendData": [
                          {
                            "beforeSend": {},
                            "reveicerId": "",
                            "receiverTriggerType": "BEHAVIOR",
                            "receiverTrigger": "REFRESH_AS_CHILD",
                            "params": [
                              {
                                "name": "parent_id",
                                "type": "item",
                                "valueName": "id"
                              },
                              {
                                "name": "parent_name",
                                "type": "item",
                                "valueName": "name"
                              }
                            ]
                          }
                        ]
                      }
                    ],
                  },
                  "changeValue": [
                    {
                      "id": "edit_form_changeValue",
                      "params": [
                        {
                          "name": "id",
                          "type": "item",
                          "valueName": "id",
                          "valueTo": "tempValue"
                        }
                      ]
                    }
                  ],
                  "dialog": [
                    {
                      "id": "edit_city_form",
                      "type": "confirm",
                      "title": "数据编辑",
                      "cancelText": "取消",
                      "okText": "提交",
                      "form": {
                        "id": "form_city",
                        "type": "form",
                        "component": "form",
                        state: 'text',
                        loadingConfig: {
                          id: "loadform" // 将加载配置引用
                        },
                        formLayout: {
                          "id": "b86s2i11",
                          "type": "layout",
                          "title": "表单布局b86s2i",
                          "rows": [
                            {
                              "id": "MefhXa",
                              "type": "row",
                              // 行列，是否 显示。
                              "cols": [
                                {
                                  "id": "iHspYn", "col": "cc", "type": "col",
                                  "title": "列iHspYn", "span": 24,
                                  "layoutContain": "input",
                                  "size": {
                                    "nzXs": 24, "nzSm": 24, "nzMd": 24, "nzLg": 24, "ngXl": 24, "nzXXl": 24
                                  },
                                  "control": {
                                    "id": "city_name"  // id 和引用id 值相同
                                  }
                                }
                              ]
                            }]
                        },
                        formControls: [
                          {
                            id: 'city_name',
                            "hidden": true, // 字段是否隐藏
                            "title": '市名称',  // lable 信息
                            "titleConfig": {
                              required: true
                            },
                            "field": "cityName",  // fromcontrol name  默认的字段
                            "labelSize": {
                              "span": 6,
                              "nzXs": { span: 6 },
                              "nzSm": { span: 6 },
                              "nzMd": { span: 6 },
                              "nzLg": { span: 6 },
                              "ngXl": { span: 6 },
                              "nzXXl": { span: 6 }
                            },  // 
                            "controlSize": {
                              "span": 18,
                              "nzXs": 18,
                              "nzSm": 18,
                              "nzMd": 18,
                              "nzLg": 18,
                              "ngXl": 18,
                              "nzXXl": 18
                            },
                            "state": "edit", // 当前组件默认状态 文本，编辑，或者由表单状态控制text、edit、form
                            "text": { // 文本展示字段
                              "type": 'label', // 什么组件展示文本 
                              "field": 'cityName',   // 字段
                            },
                            "editor": {            // 编辑状态字段  日后扩充可为数组，满足条件下的组件变化
                              "type": "input",
                              "field": "cityName",  // 编辑字段于定义字段一致 （此处定义于表格相反）
                              "placeholder": "请输入",
                              "validations": [  // 校验
                                { validator: "required", type: "default", "message": "请输入省名称" }
                              ]
                            }
                          },
                          {
                            id: 'city_id',
                            "hidden": true, // 字段是否隐藏
                            "title": '区号',  // lable 信息
                            "titleConfig": {
                              required: false
                            },
                            "field": "id",  // fromcontrol name  默认的字段
                            "labelSize": {
                              "span": 6,
                              "nzXs": 6, "nzSm": 6, "nzMd": 6, "nzLg": 6, "ngXl": 6, "nzXXl": 6
                            },  // 
                            "controlSize": {
                              "span": 18,
                              "nzXs": { span: 18, offset: 0 },
                              "nzSm": { span: 18, offset: 0 },
                              "nzMd": { span: 18, offset: 0 },
                              "nzLg": { span: 18, offset: 0 },
                              "ngXl": { span: 18, offset: 0 },
                              "nzXXl": { span: 18, offset: 0 }
                            },
                            "state": "edit", // 当前组件默认状态 文本，编辑，或者由表单状态控制 text、edit、form
                            "text": { // 文本展示字段
                              "type": 'label', // 什么组件展示文本 
                              "field": 'id',   // 字段
                            },
                            "editor": {            // 编辑状态字段  日后扩充可为数组，满足条件下的组件变化
                              "type": "input",
                              "field": "id",  // 编辑字段于定义字段一致 （此处定义于表格相反）
                              "placeholder": "请输入",
                              "validations": [  // 校验

                              ]
                            }
                          },
                          {
                            id: 'city_pid',
                            "hidden": true, // 字段是否隐藏
                            "title": '区号',  // lable 信息
                            "titleConfig": {
                              required: false
                            },
                            "field": "pId",  // fromcontrol name  默认的字段
                            "labelSize": {
                              "span": 6,
                              "nzXs": 6, "nzSm": 6, "nzMd": 6, "nzLg": 6, "ngXl": 6, "nzXXl": 6
                            },  // 
                            "controlSize": {
                              "span": 18,
                              "nzXs": { span: 18, offset: 0 },
                              "nzSm": { span: 18, offset: 0 },
                              "nzMd": { span: 18, offset: 0 },
                              "nzLg": { span: 18, offset: 0 },
                              "ngXl": { span: 18, offset: 0 },
                              "nzXXl": { span: 18, offset: 0 }
                            },
                            "state": "edit", // 当前组件默认状态 文本，编辑，或者由表单状态控制 text、edit、form
                            "text": { // 文本展示字段
                              "type": 'label', // 什么组件展示文本 
                              "field": 'pId',   // 字段
                            },
                            "editor": {            // 编辑状态字段  日后扩充可为数组，满足条件下的组件变化
                              "type": "input",
                              "field": "pId",  // 编辑字段于定义字段一致 （此处定义于表格相反）
                              "placeholder": "请输入",
                              "validations": [  // 校验

                              ]
                            }
                          }
                        ],
                        formControlsPermissions: [ // 初始表单字段，描述 新增、编辑、查看 状态下的文本
                          {
                            formState: "new", // 新增状态下的Controls 展示与否，是否读写属性设置
                            formStateContent: { // 对当前状态的描述 ，描述当前状态下 表单组件 具备的行为，例如是否自加载，是否启用默认值
                              isLoad: false,
                              loadAjax: {}, // 如果启用load，是否用新的加载地址
                              isDefault: true
                            },
                            Controls: [
                              { id: 'city_name', state: "edit", hidden: false, readOnly: false }
                            ]
                          },
                          {
                            formState: "edit",
                            Controls: [
                              { id: 'city_name', state: "edit", hidden: false, readOnly: false }
                            ]
                          },
                          {
                            formState: "text",
                            Controls: [
                              { id: 'city_name', state: "text", hidden: false, readOnly: false }
                            ]
                          }

                        ],
                        ajaxConfig: [
                          {
                            "id": "loadform",
                            "url": "/province/queryConditionA/CITY_SHEET",
                            "urlType": "inner",
                            "ajaxType": "get",
                            "params": [
                              {
                                "name": "ID",
                                "type": "tempValue",
                                "valueName": "id"
                              }
                            ],
                            "outputParameters": [

                            ],
                            "result": [  // 描述 表单接收参数，将返回的哪些值赋给相应的组件属性

                            ]
                          }
                        ]
                      }
                    }
                  ],
                  "condition": [
                    {
                      "id": "add_state_2",
                      "state": [
                        {
                          "type": "component",
                          "valueName": "ROWS_CHECKED",
                          "expression": [
                            {
                              "type": "property",
                              "name": "length",
                              "matchValue": 0,
                              "match": "gt"
                            },
                            {
                              "type": "element",
                              "name": "name",
                              "matchValue": "1",
                              "match": "eq",
                            }
                          ]
                        }
                      ]
                    },
                    {
                      "id": "edit_state_2",
                      "state": [
                        {
                          "type": "component",
                          "valueName": "ROWS_CHECKED",
                          "expression": [
                            {
                              "type": "property",
                              "name": "length",
                              "matchValue": 0,
                              "match": "gt"
                            }
                          ]
                        }
                      ]
                    },
                    {
                      "id": "city_condition_added_none",
                      "state": [
                        {
                          "type": "component",
                          "valueName": "ROWS_CHECKED",
                          "expression": [
                            {
                              "type": "property",
                              "name": "length",
                              "matchValue": 0,
                              "match": "gt"
                            }
                          ]
                        },
                        {
                          "type": "component",
                          "valueName": "ROWS_ADDED",
                          "expression": [
                            {
                              "type": "property",
                              "name": "length",
                              "matchValue": 0,
                              "match": "gt"
                            }
                          ]
                        }
                      ]
                    },
                    {
                      "id": "city_condition_edited_none",
                      "state": [
                        {
                          "type": "component",
                          "valueName": "ROWS_EDITED",
                          "expression": [
                            {
                              "type": "property",
                              "name": "length",
                              "matchValue": 0,
                              "match": "gt"
                            }
                          ]
                        },
                        {
                          "type": "component",
                          "valueName": "ROWS_CHECKED",
                          "expression": [
                            {
                              "type": "property",
                              "name": "length",
                              "matchValue": 0,
                              "match": "gt"
                            }
                          ]
                        }
                      ]
                    },
                    {
                      "id": "cancel_edit_rows_2_2",
                      "state": [
                        {
                          "type": "component",
                          "valueName": "ROWS_EDITED",
                          "expression": [
                            {
                              "type": "property",
                              "name": "length",
                              "matchValue": 0,
                              "match": "gt"
                            }
                          ]
                        }
                      ]
                    }
                  ],
                  "ajaxConfig": [
                    {
                      "id": "form_add_city",
                      "url": "city/insert",
                      "urlType": "inner",
                      "ajaxType": "post",
                      "params": [
                        {
                          "name": "cityName",
                          "type": "componentValue",
                          "valueName": "cityName"
                        },
                        {
                          "name": "zipCode",
                          "type": "componentValue",
                          "valueName": "zipCode"
                        },
                        {
                          "name": "populationSize",
                          "type": "componentValue",
                          "valueName": "populationSize"
                        },
                        {
                          "name": "directlyUnder",
                          "type": "componentValue",
                          "valueName": "directlyUnder"
                        },
                        {
                          "name": "createDate",
                          "type": "componentValue",
                          "valueName": "createDate"
                        },
                        {
                          "name": "pId",
                          "type": "componentValue",
                          "valueName": "pId"
                        },
                        {
                          "name": "id",
                          "type": "componentValue",
                          "valueName": "id"
                        }
                      ],
                      "outputParameters": [

                      ],
                      "result": [
                        {
                          "name": "data",
                          "showMessageWithNext": 0,
                          "message": "message.ajax.state.success",
                          "senderId": "afterOfficeSaveSuccessfully"
                        },
                        {
                          "name": "validation",
                          "message": "message.ajax.state.success",
                          "senderId": "afterCitySaveValidation"
                        },
                        {
                          "name": "error",
                          "senderId": "toolbar_02"
                        }
                      ]
                    },
                    {
                      "id": "form_edit_city",
                      "url": "city/update",
                      "urlType": "inner",
                      "ajaxType": "put",
                      "params": [
                        {
                          "name": "cityName",
                          "type": "componentValue",
                          "valueName": "cityName"
                        },
                        {
                          "name": "zipCode",
                          "type": "componentValue",
                          "valueName": "zipCode"
                        },
                        {
                          "name": "populationSize",
                          "type": "componentValue",
                          "valueName": "populationSize"
                        },
                        {
                          "name": "directlyUnder",
                          "type": "componentValue",
                          "valueName": "directlyUnder"
                        },
                        {
                          "name": "createDate",
                          "type": "componentValue",
                          "valueName": "createDate"
                        },
                        {
                          "name": "pId",
                          "type": "componentValue",
                          "valueName": "pId"
                        },
                        {
                          "name": "id",
                          "type": "componentValue",
                          "valueName": "id"
                        }
                      ],
                      "outputParameters": [

                      ],
                      "result": [
                        {
                          "name": "data",
                          "showMessageWithNext": 0,
                          "message": "message.ajax.state.success",
                          "senderId": "afterCityUpdateFormSuccessfully"
                        },
                        {
                          "name": "validation",
                          "showMessageWithNext": 0,
                          "message": "message.ajax.state.success",
                          "senderId": "afterCityUpdateFormValidation"
                        },
                        {
                          "name": "error",
                          "senderId": "toolbar_02"
                        }
                      ]
                    },
                    {
                      "id": "add_cities_1",
                      "url": "city/insertMany",
                      "urlType": "inner",
                      "ajaxType": "post",
                      "params": [
                        {
                          "name": "cityName",
                          "type": "componentValue",
                          "valueName": "cityName"
                        },
                        {
                          "name": "zipCode",
                          "type": "componentValue",
                          "valueName": "zipCode"
                        },
                        {
                          "name": "populationSize",
                          "type": "componentValue",
                          "valueName": "populationSize"
                        },
                        {
                          "name": "directlyUnder",
                          "type": "componentValue",
                          "valueName": "directlyUnder"
                        },
                        {
                          "name": "createDate",
                          "type": "componentValue",
                          "valueName": "createDate"
                        },
                        {
                          "name": "pId",
                          "type": "tempValue",
                          "valueName": "_PID"
                        },
                        {
                          "name": "id",
                          "type": "componentValue",
                          "valueName": "id"
                        }
                      ],
                      "outputParameters": [

                      ],
                      "result": [
                        {
                          "name": "data",
                          "showMessageWithNext": 0,
                          "message": "message.ajax.state.success",
                          "senderId": "afterOfficeSaveSuccessfully"
                        },
                        {
                          "name": "validation",
                          "message": "message.ajax.state.success",
                          "senderId": "afterCitySaveValidation"
                        },
                        {
                          "name": "error",
                          "senderId": "toolbar_02"
                        }
                      ]
                    },
                    {
                      "id": "edit_cities_1",
                      "url": "city/updateMany",
                      "urlType": "inner",
                      "ajaxType": "put",
                      "params": [
                        {
                          "name": "cityName",
                          "type": "componentValue",
                          "valueName": "cityName"
                        },
                        {
                          "name": "zipCode",
                          "type": "componentValue",
                          "valueName": "zipCode"
                        },
                        {
                          "name": "populationSize",
                          "type": "componentValue",
                          "valueName": "populationSize"
                        },
                        {
                          "name": "directlyUnder",
                          "type": "componentValue",
                          "valueName": "directlyUnder"
                        },
                        {
                          "name": "createDate",
                          "type": "componentValue",
                          "valueName": "createDate"
                        },
                        {
                          "name": "pId",
                          "type": "tempValue",
                          "valueName": "_PID"
                        },
                        {
                          "name": "id",
                          "type": "componentValue",
                          "valueName": "id"
                        }
                      ],
                      "outputParameters": [

                      ],
                      "result": [
                        {
                          "name": "data",
                          "showMessageWithNext": 0,
                          "message": "message.ajax.state.success",
                          "senderId": "afterCityUpdateSuccessfully"
                        },
                        {
                          "name": "validation",
                          "showMessageWithNext": 0,
                          "message": "message.ajax.state.success",
                          "senderId": "afterCityUpdateValidation"
                        },
                        {
                          "name": "error",
                          "senderId": "toolbar_02"
                        }
                      ]
                    }
                  ],
                  "beforeTrigger": [

                  ],
                  "afterTrigger": [
                    {
                      "id": "",
                      "senderId": "view_02",
                      "sendData": [
                        {
                          "beforeSend": [],
                          "reveicerId": "",
                          "receiverTriggerType": "BEHAVIOR",
                          "receiverTrigger": "REFRESH_AS_CHILD",
                          "params": [
                            {
                              "name": "parent_id",
                              "type": "item",
                              "valueName": "id"
                            },
                            {
                              "name": "parent_name",
                              "type": "item",
                              "valueName": "name"
                            }
                          ]
                        }
                      ]
                    }
                  ],
                  "toolbar": [
                    {
                      "targetViewId": "view_02",
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
                          "id": "M_addRowForm",
                          "text": "表单新增",
                          "state": "new",
                          "icon": "plus",
                          "color": "text-primary",
                          "hidden": false,
                          "disabled": false,
                          "execute": [
                            {
                              "triggerType": "ACTION",
                              "trigger": "DIALOG",
                              // "conditionId": "add_state_1"
                              "dialogId": "edit_city_form",
                              "ajaxId": "form_add_city",
                            }
                          ]
                        },
                        {
                          "id": "M_editRowForm",
                          "text": "表单更新",
                          "state": "edit",
                          "icon": "edit",
                          "color": "text-primary",
                          "hidden": false,
                          "disabled": false,
                          "execute": [
                            {
                              "triggerType": "ACTION",
                              "trigger": "DIALOG",
                              // "conditionId": "add_state_1"
                              "dialogId": "edit_city_form",
                              "ajaxId": "form_edit_city",
                              "changeValueId": "edit_form_changeValue"
                            }
                          ]
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
                              "conditionId": "delete_operation_2",
                              "ajaxId": "delete_row_2"
                            }
                          ]
                        },
                        {
                          "id": "M_saveRow",
                          "text": "保存",
                          "state": "edit",
                          "icon": "save",
                          "color": "text-primary",
                          "hidden": true,
                          "disabled": false,
                          "execute": [
                            {
                              "triggerType": "OPERATION",
                              "trigger": "SAVE_ROWS",
                              "ajaxId": "add_cities_1",
                              // "stateId": "add_save_1",
                              "conditionId": "city_condition_added_none"
                            },
                            {
                              "triggerType": "OPERATION",
                              "trigger": "SAVE_ROWS",
                              "ajaxId": "edit_cities_1",
                              // "stateId": "edit_save_1",
                              "conditionId": "city_condition_edited_none"
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
                              "conditionId": "cancel_edit_rows_2_2"
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
                }
              },
              {
                "id": "H2n0f3", "col": "cc", "type": "col", "titlestate": 1, "title": "列H2n0f3", "span": 24, "container": "component",
                "size": { "nzXs": 24, "nzSm": 24, "nzMd": 24, "nzLg": 24, "ngXl": 24, "nzXXl": 24 },
                "component": {
                  "id": "view_02",
                  "title": "子表",
                  "titleIcon": "right-circle",
                  "component": "cnDataTable",
                  "keyId": "ID",
                  "size": "middle",
                  "isBordered": true,
                  "isFrontPagination": false,
                  "isPagination": true,
                  "isShowSizeChanger": true,
                  "showTotal": true,
                  "pageSize": 5,
                  "showCheckBox": true,
                  "pageSizeOptions": [10, 20, 50, 100],
                  "isSelected": true,
                  "loadingOnInit": false,
                  "loadingConfig": {
                    "url": "province/queryCondition/OFFICE_SHEET",
                    "method": "get",
                    "params": [
                      {
                        "name": "PID",
                        "type": "tempValue",
                        "valueName": "PID"
                      }
                    ],
                    "filter": [

                    ]
                  },
                  "columns": [
                    {
                      "title": "ID",
                      "type": "field",
                      "field": "ID",
                      "hidden": false,
                      "showFilter": false,
                      "showSort": false,
                      "width": "50px",
                      "style": {}
                    },
                    {
                      "title": "PID",
                      "type": "field",
                      "field": "PID",
                      "hidden": false,
                      "showFilter": false,
                      "showSort": false,
                      "width": "50px",
                      "style": {}
                    },
                    {
                      "title": "OFFICE_NAME",
                      "type": "field",
                      "field": "OFFICENAME",
                      "hidden": false,
                      "showFilter": false,
                      "showSort": false,
                      "width": "100px",
                      "style": {},
                    }
                  ],
                  "cascade": {
                    "messageSender": [
                      {
                        "id": "view2_sender_liu_1",
                        "senderId": "view2_sender_1",
                        "triggerType": "BEHAVIOR",
                        "trigger": "SET_SELECT_ROW",
                        "triggerMoment": "after",
                        "sendData": [
                          {
                            "beforeSend": {},
                            "reveicerId": "",
                            "receiverTriggerType": "BEHAVIOR",
                            "receiverTrigger": "ADD_SELECTED",
                            "params": [
                              {
                                "name": "_PID",
                                "type": "item",
                                "valueName": "ID"
                              },
                              {
                                "name": "_PIDD",
                                "type": "tempValue",
                                "valueName": ""
                              },
                              {
                                "name": "_PIDDD",
                                "type": "item",
                                "valueName": ""
                              },
                            ]
                          }
                        ]
                      },
                      {
                        "id": "view2_sender_1",
                        "senderId": "view_02",
                        "triggerType": "OPERATION",
                        "trigger": "SAVE_ROW",
                        "triggerMoment": "asyncAfter",
                        "sendData": [
                          {
                            "reveicerId": "",
                            "receiverTriggerType": "STATE",
                            "receiverTrigger": "STATE_TO_TEXT",
                            "params": [
                              {
                                "name": "targetViewId",
                                "value": "view_02",
                                "type": "value"
                              }
                            ]
                          }
                        ]
                      },
                      {
                        "id": "view2_sender_2",
                        "senderId": "view_02",
                        "triggerType": "OPERATION",
                        "trigger": "SAVE_ROWS",
                        "triggerMoment": "asyncAfter",
                        "sendData": [
                          {
                            "reveicerId": "",
                            "receiverTriggerType": "STATE",
                            "receiverTrigger": "STATE_TO_TEXT",
                            "params": [
                              {
                                "name": "targetViewId",
                                "value": "view_02",
                                "type": "value"
                              }
                            ]
                          }
                        ]
                      },
                      {
                        "id": "view2_sender_3",
                        "senderId": "view_02",
                        "triggerType": "STATE",
                        "trigger": "CANCEL_EDIT_ROW",
                        "triggerMoment": "after",
                        "sendData": [
                          {
                            "reveicerId": "",
                            "receiverTriggerType": "STATE",
                            "receiverTrigger": "STATE_TO_TEXT",
                            "conditionId": "cancel_edit_cities",
                            "params": [
                              {
                                "name": "targetViewId",
                                "value": "view_02",
                                "type": "value"
                              }
                            ]
                          }
                        ]
                      },
                      {
                        "id": "view2_sender_04",
                        "senderId": "view_02",
                        "triggerType": "STATE",
                        "trigger": "CANCEL_NEW_ROW",
                        "triggerMoment": "after",
                        "sendData": [
                          {
                            "reveicerId": "",
                            "receiverTriggerType": "STATE",
                            "receiverTrigger": "STATE_TO_TEXT",
                            "conditionId": "cancel_add_cities",
                            "params": [
                              {
                                "name": "targetViewId",
                                "value": "view_02",
                                "type": "value"
                              }
                            ]
                          }
                        ]
                      },
                      {
                        "id": "grid_sender_05",
                        "senderId": "view_02",
                        "triggerType": "STATE",
                        "trigger": "EDIT_ROW",
                        "triggerMoment": "after",
                        "sendData": [
                          {
                            "reveicerId": "",
                            "receiverTriggerType": "STATE",
                            "receiverTrigger": "STATE_TO_EDIT",
                            "params": [
                              {
                                "name": "targetViewId",
                                "value": "view_02",
                                "type": "value"
                              }
                            ]
                          }
                        ]
                      },
                      {
                        "id": "grid_sender_08",
                        "senderId": "view_02",
                        "triggerType": "ACTION",
                        "trigger": "CONFIRM",
                        "triggerMoment": "after",
                        "sendData": [
                          {
                            "reveicerId": "",
                            "receiverTriggerType": "STATE",
                            "receiverTrigger": "STATE_TO_TEXT",
                            "params": [
                              {
                                "name": "targetViewId",
                                "value": "view_tree_01",
                                "type": "value"
                              }
                            ]
                          }
                        ]
                      },
                      {
                        "id": "afterOfficeSaveSuccessfully",
                        "senderId": "view_02",
                        // "triggerType": "ACTION",
                        // "trigger": "MESSAGE0",
                        // "triggerMoment": "after",
                        "sendData": [
                          {
                            "beforeSend": {},
                            "reveicerId": "",
                            "receiverTriggerType": "ACTION",
                            "receiverTrigger": "MESSAGE",
                            "params": [
                              {
                                "name": "type",
                                "type": "value",
                                "value": "success"
                              },
                              {
                                "name": "message",
                                "type": "value",
                                "value": "操作完成!"
                              },
                            ]
                          },
                          {
                            "beforeSend": {},
                            "reveicerId": "",
                            "receiverTriggerType": "ACTION",
                            "receiverTrigger": "APPEND_CHILD_TO_SELECTED_NODE",
                            "params": [
                              {
                                "name": "id",
                                "type": "addedRows",
                                "valueName": "id"
                              }
                            ]
                          }
                        ]
                      },
                      {
                        "id": "afterCityUpdateSuccessfully",
                        "senderId": "view_02",
                        // "triggerType": "ACTION",
                        // "trigger": "MESSAGE0",
                        // "triggerMoment": "after",
                        "sendData": [
                          {
                            "beforeSend": {},
                            "reveicerId": "",
                            "receiverTriggerType": "ACTION",
                            "receiverTrigger": "MESSAGE",
                            "params": [
                              {
                                "name": "type",
                                "type": "value",
                                "value": "success"
                              },
                              {
                                "name": "message",
                                "type": "value",
                                "value": "操作完成!"
                              },
                            ]
                          },
                          {
                            "beforeSend": {},
                            "reveicerId": "",
                            "receiverTriggerType": "ACTION",
                            "receiverTrigger": "CHANGE_EDITED_ROWS_TO_TEXT",
                            "params": [
                              {
                                "name": "id",
                                "type": "editedRows",
                                "valueName": "id"
                              }
                            ]
                          }
                        ]
                      },
                      {
                        "id": "afterCitySaveValidation",
                        "senderId": "view_02",
                        "sendData": [
                          {
                            "beforeSend": {},
                            "reveicerId": "",
                            "receiverTriggerType": "ACTION",
                            "receiverTrigger": "SHOW_INVALIDATE_ADDED_ROWS"
                          }
                        ]
                      },
                      {
                        "id": "afterCityUpdateValidation",
                        "senderId": "view_02",
                        "sendData": [
                          {
                            "beforeSend": {},
                            "reveicerId": "",
                            "receiverTriggerType": "ACTION",
                            "receiverTrigger": "SHOW_INVALIDATE_EDITED_ROWS"
                          }
                        ]
                      },
                      {
                        "id": "afterCityUpdateFormSuccessfully",
                        "senderId": "view_02",
                        // "triggerType": "ACTION",
                        // "trigger": "MESSAGE0",
                        // "triggerMoment": "after",
                        "sendData": [
                          {
                            "beforeSend": {},
                            "reveicerId": "",
                            "receiverTriggerType": "ACTION",
                            "receiverTrigger": "MESSAGE",
                            "params": [
                              {
                                "name": "type",
                                "type": "value",
                                "value": "success"
                              },
                              {
                                "name": "code",
                                "type": "value",
                                "value": "operation..code.success"
                              }
                            ]
                          },
                          {
                            "beforeSend": {},
                            "reveicerId": "",
                            "receiverTriggerType": "ACTION",
                            "receiverTrigger": "LOAD_REFRESH_DATA",
                            "params": [
                              {
                                "name": "id",
                                "type": "addedRows",
                                "valueName": "id"
                              }
                            ]
                          }
                        ]
                      },
                      {
                        "id": "afterCityUpdateFormValidation",
                        "senderId": "view_02",
                        "sendData": [
                          {
                            "beforeSend": {},
                            "reveicerId": "",
                            "receiverTriggerType": "ACTION",
                            "receiverTrigger": "MESSAGE",
                            "params": [
                              {
                                "name": "type",
                                "type": "value",
                                "value": "warning"
                              },
                              {
                                "name": "message",
                                "type": "validation",
                                "valueName": "code"
                              },
                              {
                                "name": "field",
                                "type": "validation",
                                "valueName": "field"
                              }
                            ]
                          }
                        ]
                      },
                    ],
                    "messageReceiver": [
                      {
                        "id": "",
                        "senderId": "view_tree_01",
                        "receiveData": [
                          {
                            "beforeReceive": [],
                            "triggerType": "BEHAVIOR",
                            "trigger": "REFRESH_AS_CHILD",
                            "params": [
                              {
                                "pname": "PID",
                                "cname": "PID",
                                "valueTo": "tempValue"
                              }
                            ]
                          }
                        ]
                      },
                      {
                        "id": "",
                        "senderId": "view_02",
                        "receiveData": [
                          {
                            "beforeReceive": [],
                            "triggerType": "ACTION",
                            "trigger": "MESSAGE"
                            // "params": [
                            //     {
                            //         "pname": "name",
                            //         "cname": "_PID",
                            //         "valueTo": "tempValue"
                            //     }
                            // ]
                          },
                          {
                            "beforeReceive": [],
                            "triggerType": "ACTION",
                            "trigger": "APPEND_CHILD_TO_SELECTED_NODE"
                            // "params": [
                            //     {
                            //         "pname": "name",
                            //         "cname": "_PID",
                            //         "valueTo": "tempValue"
                            //     }
                            // ]
                          },
                          {
                            "beforeReceive": [],
                            "triggerType": "ACTION",
                            "trigger": "CHANGE_EDITED_ROWS_TO_TEXT"
                            // "params": [
                            //     {
                            //         "pname": "name",
                            //         "cname": "_PID",
                            //         "valueTo": "tempValue"
                            //     }
                            // ]
                          },
                          {
                            "beforeReceive": [],
                            "triggerType": "ACTION",
                            "trigger": "SHOW_INVALIDATE_ADDED_ROWS"
                          },
                          {
                            "beforeReceive": [],
                            "triggerType": "ACTION",
                            "trigger": "SHOW_INVALIDATE_EDITED_ROWS"
                          },
                          {
                            "beforeReceive": [],
                            "triggerType": "ACTION",
                            "trigger": "LOAD_REFRESH_DATA"
                          }
                        ]
                      }
                    ]
                  },
                  "condition": [
                    {
                      "id": "add_cities_state",
                      "state": [
                        {
                          "type": "component",
                          "valueName": "ROWS_CHECKED",
                          "expression": [
                            {
                              "type": "property",
                              "name": "length",
                              "matchValue": 0,
                              "match": "gt"
                            },
                            {
                              "type": "element",
                              "name": "name",
                              "matchValue": "1",
                              "match": "eq",
                            }
                          ]
                        }
                      ]
                    },
                    {
                      "id": "edit_cities_state",
                      "state": [
                        {
                          "type": "component",
                          "valueName": "ROWS_CHECKED",
                          "expression": [
                            {
                              "type": "property",
                              "name": "length",
                              "matchValue": 0,
                              "match": "gt"
                            }
                          ]
                        }
                      ]
                    },
                    {
                      "id": "add_cities",
                      "state": [
                        {
                          "type": "component",
                          "valueName": "ROWS_CHECKED",
                          "expression": [
                            {
                              "type": "property",
                              "name": "length",
                              "matchValue": 0,
                              "match": "gt"
                            }
                          ]
                        },
                        {
                          "type": "component",
                          "valueName": "ROWS_ADDED",
                          "expression": [
                            {
                              "type": "property",
                              "name": "length",
                              "matchValue": 0,
                              "match": "gt"
                            }
                          ]
                        }
                      ]
                    },
                    {
                      "id": "edit_cities",
                      "state": [
                        {
                          "type": "component",
                          "valueName": "ROWS_EDITED",
                          "expression": [
                            {
                              "type": "property",
                              "name": "length",
                              "matchValue": 0,
                              "match": "gt"
                            }
                          ]
                        },
                        {
                          "type": "component",
                          "valueName": "ROWS_CHECKED",
                          "expression": [
                            {
                              "type": "property",
                              "name": "length",
                              "matchValue": 0,
                              "match": "gt"
                            }
                          ]
                        }
                      ]
                    },
                    {
                      "id": "cancel_edit_cities",
                      "state": [
                        {
                          "type": "component",
                          "valueName": "ROWS_EDITED",
                          "expression": [
                            {
                              "type": "property",
                              "name": "length",
                              "matchValue": 0,
                              "match": "eq"
                            }
                          ]
                        }
                      ]
                    },
                    {
                      "id": "cancel_add_cities",
                      "state": [
                        {
                          "type": "component",
                          "valueName": "ROWS_ADDED",
                          "expression": [
                            {
                              "type": "property",
                              "name": "length",
                              "matchValue": 0,
                              "match": "eq"
                            }
                          ]
                        }
                      ]
                    }

                  ],
                  "ajaxConfig": [
                    {
                      "id": "add_city_1",
                      "url": "city/insert",
                      "urlType": "inner",
                      "ajaxType": "post",
                      "params": [
                        {
                          "name": "id",
                          "type": "componentValue",
                          "valueName": "id"
                        },
                        {
                          "name": "cityName",
                          "type": "componentValue",
                          "valueName": "cityName"
                        },
                        {
                          "name": "zipCode",
                          "type": "componentValue",
                          "valueName": "zipCode"
                        },
                        {
                          "name": "populationSize",
                          "type": "componentValue",
                          "valueName": "populationSize"
                        },
                        {
                          "name": "directlyUnder",
                          "type": "componentValue",
                          "valueName": "directlyUnder"
                        },
                        {
                          "name": "createDate",
                          "type": "componentValue",
                          "valueName": "createDate"
                        },
                        {
                          "name": "pId",
                          "type": "tempValue",
                          "valueName": "_PID"
                        }
                      ],
                      "outputParameters": [

                      ],
                      "result": [
                        {
                          "name": "data",
                          "showMessageWithNext": 0,
                          "message": "message.ajax.state.success",
                          "senderId": "afterOfficeSaveSuccessfully"
                        },
                        {
                          "name": "validation",
                          "showMessageWithNext": 0,
                          "message": "message.ajax.state.success",
                          "senderId": "afterCitySaveValidation"
                        },
                        // {
                        //     "name": "error",
                        //     "senderId": "grid_sender_03"
                        // }
                      ]
                    },
                    {
                      "id": "edit_city_1",
                      "url": "city/update",
                      "urlType": "inner",
                      "ajaxType": "put",
                      "params": [
                        {
                          "name": "cityName",
                          "type": "componentValue",
                          "valueName": "cityName"
                        },
                        {
                          "name": "zipCode",
                          "type": "componentValue",
                          "valueName": "zipCode"
                        },
                        {
                          "name": "populationSize",
                          "type": "componentValue",
                          "valueName": "populationSize"
                        },
                        {
                          "name": "directlyUnder",
                          "type": "componentValue",
                          "valueName": "directlyUnder"
                        },
                        {
                          "name": "createDate",
                          "type": "componentValue",
                          "valueName": "createDate"
                        },
                        {
                          "name": "pId",
                          "type": "tempValue",
                          "valueName": "_PID"
                        },
                        {
                          "name": "id",
                          "type": "componentValue",
                          "valueName": "id"
                        }
                      ],
                      "outputParameters": [

                      ],
                      "result": [
                        {
                          "name": "data",
                          "showMessageWithNext": 0,
                          "message": "message.ajax.state.success",
                          "senderId": "afterCityUpdateSuccessfully"
                        },
                        {
                          "name": "validation",
                          "showMessageWithNext": 0,
                          "message": "message.ajax.state.success",
                          "senderId": "afterCityUpdateValidation"
                        },
                        {
                          "name": "error",
                          "senderId": "toolbar_02"
                        }
                      ]
                    },
                    {
                      "id": "add_cities_1",
                      "url": "city/insertMany",
                      "urlType": "inner",
                      "ajaxType": "post",
                      "params": [
                        {
                          "name": "id",
                          "type": "componentValue",
                          "valueName": "id"
                        },
                        {
                          "name": "cityName",
                          "type": "componentValue",
                          "valueName": "cityName"
                        },
                        {
                          "name": "zipCode",
                          "type": "componentValue",
                          "valueName": "zipCode"
                        },
                        {
                          "name": "populationSize",
                          "type": "componentValue",
                          "valueName": "populationSize"
                        },
                        {
                          "name": "directlyUnder",
                          "type": "componentValue",
                          "valueName": "directlyUnder"
                        },
                        {
                          "name": "createDate",
                          "type": "componentValue",
                          "valueName": "createDate"
                        },
                        {
                          "name": "pId",
                          "type": "tempValue",
                          "valueName": "_PID"
                        }
                      ],
                      "outputParameters": [

                      ],
                      "result": [
                        {
                          "name": "data",
                          "showMessageWithNext": 0,
                          "message": "message.ajax.state.success",
                          "senderId": "grid_sender_01"
                        },
                        // {
                        //     "name": "validation",
                        //     "senderId": "grid_sender_02"
                        // },
                        // {
                        //     "name": "error",
                        //     "senderId": "grid_sender_03"
                        // }
                      ]
                    },
                    {
                      "id": "edit_cities_1",
                      "url": "city/updateMany",
                      "urlType": "inner",
                      "ajaxType": "put",
                      "params": [
                        {
                          "name": "cityName",
                          "type": "componentValue",
                          "valueName": "cityName"
                        },
                        {
                          "name": "zipCode",
                          "type": "componentValue",
                          "valueName": "zipCode"
                        },
                        {
                          "name": "populationSize",
                          "type": "componentValue",
                          "valueName": "populationSize"
                        },
                        {
                          "name": "directlyUnder",
                          "type": "componentValue",
                          "valueName": "directlyUnder"
                        },
                        {
                          "name": "createDate",
                          "type": "componentValue",
                          "valueName": "createDate"
                        },
                        {
                          "name": "id",
                          "type": "componentValue",
                          "valueName": "id"
                        },
                        {
                          "name": "pId",
                          "type": "tempValue",
                          "valueName": "_PID"
                        }
                      ],
                      "outputParameters": [

                      ],
                      "result": [
                        {
                          "name": "data",
                          "showMessageWithNext": 0,
                          "message": "message.ajax.state.success",
                          "senderId": "grid_sender_01"
                        }
                      ]
                    },
                    {
                      "id": "city_delete_1",
                      "url": "city/delete",
                      "urlType": "inner",
                      "ajaxType": "delete",
                      "params": [
                        {
                          "name": "ids",
                          "type": "CHECKED_ROWS_ID",
                          "value": "_ids"
                        }
                      ],
                      "outputParameters": [

                      ],
                      "result": [

                      ]
                    }
                  ]
                }
              }],
            "container": "cols", "id": "Q6amyJ", "type": "row"
          }]
        }], "id": "UsABpr", "type": "row", "container": "cols"
    }], "customlayout": []
  }

  public config1 = {
    "id": "page_01",
    "title": "子表",
    "titleIcon": "right-circle",
    "component": "cnPage",
    "keyId": "ID",
    "eventConfig": {
      "ADD_SELECTED": {
        name: "SELECTED_VALUE",
        valueName: "_PIDDD",
        type: "tempValue"
      }
    },
    "loadingOnInit": false,
    "cascade": {
      "messageSender": [
      ],
      "messageReceiver": [
        {
          "id": "",
          "senderId": "view2_sender_1",
          "receiveData": [
            {
              "beforeReceive": [],
              "triggerType": "BEHAVIOR",
              "trigger": "ADD_SELECTED",
              "params": [
                {
                  "pname": "_PID",
                  "cname": "PID",
                  "valueTo": "tempValue"
                },
                {
                  "pname": "_PIDD",
                  "cname": "_PIDD",
                  "valueTo": "tempValue"
                },
                {
                  "pname": "_PIDDD",
                  "cname": "_PIDDD",
                  "valueTo": "tempValue"
                }
              ]
            }
          ]
        }
      ]
    },
  }


  public configdemo = {
    "id": "demo",
    "type": "layout",
    "title": "",
    "container": "rows",
    "rows": [
      {

        "cols": [
          {
            "id": "row_2_col_1",
            "col": "cc",
            "type": "col",
            "title": "",
            "span": 24,
            "container": "component",
            "size": {
              "nzXs": 24,
              "nzSm": 24,
              "nzMd": 24,
              "nzLg": 24,
              "nzXl": 24,
              "nzXXl": 24
            },
            "component": {
              "id": "tag_main",
              "title": "",
              "titleIcon": "right-circle",
              "component": "cnTag",
              "keyId": "ID",
              "size": "large",
              "isBordered": false,
              "isFrontPagination": false,
              "isPagination": true,
              "isShowSizeChanger": true,
              "showTotal": true,
              "pageSize": 5,
              "showCheckBox": true,
              "pageSizeOptions": [10, 20, 50, 100],
              "loadingOnInit": true,
              "loadingConfig": {
                "url": "resource/PROVINCE/query",
                "method": "get",
                "params": [],
                "filter": []
              },
              "cascade": {
                "messageSender": [
                  {
                    "id": "tag_sender_liu_1",
                    "senderId": "tag_main",
                    "triggerType": "BEHAVIOR",
                    "trigger": "VALUE_CHANGE",
                    "triggerMoment": "after",
                    "sendData": [
                      {
                        "beforeSend": {},
                        "reveicerId": "",
                        "receiverTriggerType": "BEHAVIOR",
                        "receiverTrigger": "ADD_SELECTED",
                        "params": [
                          {
                            "name": "value",
                            "type": "componentValue",
                            "valueName": "value"
                          },

                        ]
                      }
                    ]
                  },
                ],
                "messageReceiver": [
                  {
                    "id": "",
                    "senderId": "table_main",
                    "receiveData": [
                      {
                        "beforeReceive": [],
                        "triggerType": "BEHAVIOR",
                        "trigger": "ADD_MULTIPLE_NODE",
                        "params": [
                          {
                            "pname": "value",
                            "cname": "_PID",
                            "valueTo": "tempValue"
                          },
                          {
                            "pname": "label",
                            "cname": "_PROVINCE_NAME",
                            "valueTo": "tempValue"
                          }

                        ]
                      }
                    ]
                  },

                ]
              },
              "ajaxConfig": [

              ]
            }
          }
        ],
        "id": "row_3",
        "type": "row",
      },
      {
        "cols": [
          {
            "id": "row_2_col_1",
            "col": "cc",
            "type": "col",
            "title": "",
            "span": 24,
            "container": "component",
            "header": {
              "title": "DEMO",
              "icon": "edit",
              "toolbar": {
                "id": "toolbar_main",
                "component": "cnToolbar",
                "size": "large",
                "changeValue": [
                  {
                    "id": "edit_form_changeValue",
                    "params": [
                      {
                        "name": "ID",
                        "type": "item",
                        "valueName": "ID",
                        "valueTo": "tempValue"
                      }
                    ]
                  }
                ],
                "toolbar": [
                  {
                    "targetViewId": "table_main",
                    "group": [
                      {
                        "id": "M_addRow",
                        "text": "新增",
                        "icon": "plus",
                        "color": "primary",
                        "hidden": false,
                        "disabled": false,
                        "size": "default",
                        "execute": [
                          {
                            "triggerType": "STATE",
                            "trigger": "ADD_ROW",
                            // "conditionId": "add_state_1"
                          }
                        ]
                      },
                      {
                        "id": "M_saveRow",
                        "text": "保存",
                        "icon": "save",
                        "color": "primary",
                        "hidden": false,
                        "disabled": false,
                        "size": "default",
                        "execute": [
                          {
                            "triggerType": "OPERATION",
                            "trigger": "SAVE_ROWS",
                            "ajaxId": "add_provinces_1",
                            // "stateId": "add_save_1",
                            // "conditionId": "add_province_condition"
                          },
                          // {
                          //     "triggerType": "OPERATION",
                          //     "trigger": "SAVE_ROWS",
                          //     "ajaxId": "edit_save_1",
                          //     // "stateId": "edit_save_1",
                          //     "conditionId": "edit_province_condition"
                          // }
                        ]
                      },
                      {
                        "id": "table_main_new_btn",
                        "text": "新增表单",
                        "state": "new",
                        "icon": "edit",
                        "color": "primary",
                        "hidden": false,
                        "disabled": false,
                        "size": "default",
                        "execute": [
                          {
                            "triggerType": "ACTION",
                            "trigger": "DIALOG",
                            "dialogId": "table_main_edit_btn",
                            // "changeValueId": "edit_form_changeValue",
                            "ajaxId": "form_edit_province",
                            // "stateId": "add_save_1",
                            // "conditionId": "add_province_condition"
                          }
                        ]
                      },
                      {
                        "id": "table_main_edit_btn",
                        "text": "编辑表单",
                        "state": "edit",
                        "icon": "edit",
                        "color": "primary",
                        "hidden": false,
                        "disabled": false,
                        "size": "default",
                        "execute": [
                          {
                            "triggerType": "ACTION",
                            "trigger": "DIALOG",
                            "dialogId": "table_main_edit_btn",
                            "changeValueId": "edit_form_changeValue",
                            "ajaxId": "form_edit_province",
                            // "stateId": "add_save_1",
                            // "conditionId": "add_province_condition"
                          }
                        ]
                      }
                    ]
                  }
                ],
                "ajaxConfig": [
                  {
                    "id": "add_provinces_1",
                    "url": "resource/PROVINCE/batchInsert",
                    "urlType": "inner",
                    "ajaxType": "post",
                    "params": [
                      {
                        "name": "ID",
                        "type": "componentValue",
                        "valueName": "ID"
                      },
                      {
                        "name": "PROVINCE_NAME",
                        "type": "componentValue",
                        "valueName": "PROVINCE_NAME",
                        "dataType": "string"
                      },
                      {
                        "name": "AREA_CODE",
                        "type": "componentValue",
                        "valueName": "AREA_CODE",
                        "dataType": "string"
                      },
                      {
                        "name": "DIRECTLY_UNDER",
                        "type": "componentValue",
                        "valueName": "DIRECTLY_UNDER",
                        "dataType": "int"
                      },
                      {
                        "name": "POPULATION",
                        "type": "componentValue",
                        "valueName": "POPULATION",
                        "dataType": "int"
                      }
                    ],
                    "outputParameters": [

                    ],
                    "result": [
                      {
                        "name": "data",
                        "showMessageWithNext": 0,
                        "message": "message.ajax.state.success",
                        "senderId": "afterProvinceSaveSuccessfully"
                      },
                      {
                        "name": "validation",
                        "message": "message.ajax.state.success",
                        "senderId": "afterProvinceSaveValidation"
                      },
                      {
                        "name": "error",
                        "senderId": "toolbar_02"
                      }
                    ]
                  },
                  {
                    "id": "form_edit_province",
                    "url": "resource/PROVINCE/update",
                    "urlType": "inner",
                    "ajaxType": "put",
                    "params": [
                      {
                        "name": "ID",
                        "type": "tempValue",
                        "valueName": "ID",
                        "dataType": "string"
                      },
                      {
                        "name": "PROVINCE_NAME",
                        "type": "componentValue",
                        "valueName": "PROVINCE_NAME",
                        "dataType": "string"
                      },
                      // {
                      //     "name": "AREA_CODE",
                      //     "type": "componentValue",
                      //     "valueName": "AREA_CODE",
                      //     "dataType": "string"
                      // },
                      {
                        "name": "DIRECTLY_UNDER",
                        "type": "componentValue",
                        "valueName": "DIRECTLY_UNDER",
                        "dataType": "int"
                      },
                      {
                        "name": "POPULATION",
                        "type": "componentValue",
                        "valueName": "POPULATION",
                        "dataType": "int"
                      },
                    ],
                    "outputParameters": [

                    ],
                    "result": [
                      {
                        "name": "data",
                        "showMessageWithNext": 0,
                        "message": "message.ajax.state.success",
                        "senderId": "afterProvinceSaveSuccessfully"
                      },
                      // {
                      //     "name": "validation",
                      //     "message": "message.ajax.state.success",
                      //     "senderId": "afterAddBusinessSubObjectValidation"
                      // },
                      // {
                      //     "name": "error",
                      //     "senderId": "toolbar_02"
                      // }
                    ]
                  }
                ],
                "cascade": {
                  "messageSender": [],
                  "messageReceiver": []
                },
                "dialog": [
                  {
                    "id": "table_main_edit_btn",
                    "type": "confirm",
                    "title": "数据编辑",
                    "cancelText": "取消",
                    "okText": "提交",
                    "form": {
                      "id": "form_province",
                      "type": "form",
                      "component": "form",
                      "state": "edit",
                      "loadingConfig": {
                        "id": "loadform"
                      },
                      "cascade": {
                        "messageSender": [],
                        "messageReceiver": []
                      },
                      "formLayout": {
                        "id": "layout_01",
                        "type": "layout",
                        "title": "表单布局b86s2i",
                        "rows": [
                          {
                            "id": "erw",
                            "type": "row",
                            "cols": [
                              {
                                "id": "iHspYn",
                                "col": "cc",
                                "type": "col",
                                "title": "",
                                "span": 24,
                                "layoutContain": "input",
                                "size": {
                                  "nzXs": 24, "nzSm": 24, "nzMd": 12, "nzLg": 24, "ngXl": 4, "nzXXl": 4
                                },
                                "control": {
                                  "id": "control_province"  // id 和引用id 值相同
                                }
                              },
                              {
                                "id": "iHspYn1",
                                "col": "cc",
                                "type": "col",
                                "title": "",
                                "span": 24,
                                "layoutContain": "input",
                                "size": {
                                  "nzXs": 24, "nzSm": 24, "nzMd": 12, "nzLg": 12, "ngXl": 4, "nzXXl": 4
                                },
                                "control": {
                                  "id": "control_population"  // id 和引用id 值相同
                                }
                              },
                              {
                                "id": "iHspYn2",
                                "col": "cc",
                                "type": "col",
                                "title": "",
                                "span": 24,
                                "layoutContain": "input",
                                "size": {
                                  "nzXs": 24, "nzSm": 24, "nzMd": 12, "nzLg": 12, "ngXl": 4, "nzXXl": 4
                                },
                                "control": {
                                  "id": "control_z"  // id 和引用id 值相同
                                }
                              }
                            ]
                          }
                        ]
                      },
                      "formControlsPermissions": [
                        {
                          "formState": "new",
                          "formStateContent": {
                            "isLoad": false,
                            "loadAjax": {},
                            "isDefault": true
                          },
                          "Controls": [
                            { "id": "control_province", "state": "edit", "hidden": false, "readOnly": false },
                            { "id": "control_population", "state": "edit", "hidden": false, "readOnly": false },
                            { "id": "control_z", "state": "edit", "hidden": false, "readOnly": false },
                            // { "id": "004", "state": "edit", "hidden": false, "readOnly": false }
                          ]
                        },
                        {
                          "formState": "edit",
                          "formStateContent": {
                            "isLoad": true,
                            "loadAjax": {},
                            "isDefault": true
                          },
                          "Controls": [
                            { "id": "control_province", "state": "edit", "hidden": false, "readOnly": false },
                            { "id": "control_population", "state": "edit", "hidden": false, "readOnly": false },
                            { "id": "control_z", "state": "edit", "hidden": false, "readOnly": false },
                            // { "id": "004", "state": "edit", "hidden": false, "readOnly": false }
                          ]
                        },
                      ],
                      "formControls": [
                        {
                          "id": "control_province",
                          "hidden": false,
                          "title": "省名称",
                          "titleConfig": {
                            "required": true
                          },
                          "field": "PROVINCE_NAME",
                          "labelSize": {
                            "span": 3,
                            "nzXs": { "span": 6 },
                            "nzSm": { "span": 6 },
                            "nzMd": { "span": 6 },
                            "nzLg": { "span": 3 },
                            "ngXl": { "span": 6 },
                            "nzXXl": { "span": 6 }
                          },
                          "controlSize": {
                            "span": 18,
                            "nzXs": 18,
                            "nzSm": 18,
                            "nzMd": 18,
                            "nzLg": 18,
                            "ngXl": 18,
                            "nzXXl": 18
                          },
                          "state": "edit",
                          "text": {
                            "type": "label",
                            "field": "PROVINCE_NAME",
                          },
                          "editor": {
                            "type": "input",
                            "field": "PROVINCE_NAME",
                            "placeholder": "请输入",
                            "validations": [
                              { "validator": "required", "type": "default", "message": "请输入省名称" }
                            ]
                          }
                        },
                        {
                          "id": "control_population",
                          "hidden": false,
                          "title": "人口",
                          "titleConfig": {
                            "required": true
                          },
                          "field": "POPULATION",
                          "labelSize": {
                            "span": 6,
                            "nzXs": 6, "nzSm": 6, "nzMd": 6, "nzLg": 6, "ngXl": 6, "nzXXl": 6
                          },
                          "controlSize": {
                            "span": 18,
                            "nzXs": { "span": 18, "offset": 0 },
                            "nzSm": { "span": 18, "offset": 0 },
                            "nzMd": { "span": 18, "offset": 0 },
                            "nzLg": { "span": 18, "offset": 0 },
                            "nzXl": { "span": 18, "offset": 0 },
                            "nzXXl": { "span": 18, "offset": 0 }
                          },
                          "state": "edit",
                          "text": {
                            "type": "label",
                            "field": "POPULATION",
                          },
                          "editor": {
                            "type": "input",
                            "field": "POPULATION",
                            "placeholder": "请输入",
                            "validations": [
                              { "validator": "required", type: "default", "message": "请输入人口数量" }
                            ]
                          }
                        },
                        {
                          "id": "control_z",
                          "hidden": false,
                          "title": "是否直辖市",
                          "titleConfig": {
                            "required": false
                          },
                          "field": "DIRECTLY_UNDER",
                          "labelSize": {
                            "span": 6,
                            "nzXs": 6, "nzSm": 6, "nzMd": 6, "nzLg": 6, "nzXl": 6, "nzXXl": 6
                          },
                          "controlSize": {
                            "span": 18,
                            "nzXs": { "span": 18, "offset": 0 },
                            "nzSm": { "span": 18, "offset": 0 },
                            "nzMd": { "span": 18, "offset": 0 },
                            "nzLg": { "span": 18, "offset": 0 },
                            "ngXl": { "span": 18, "offset": 0 },
                            "nzXXl": { "span": 18, "offset": 0 }
                          },
                          "state": "edit",
                          "text": {
                            "type": "label",
                            "field": "DIRECTLY_UNDER",
                          },
                          "editor": {
                            "type": "select",
                            "field": "DIRECTLY_UNDER",
                            "placeholder": "请输入",
                            "options": [
                              { "label": "是", "value": 1 },
                              { "label": "否", "value": 0 }
                            ],
                            "defaultValue": 0,
                            "validate": {

                            }
                          }
                        },
                      ],
                      "ajaxConfig": [
                        {
                          "id": "loadform",
                          "url": "resource/PROVINCE/query",
                          "urlType": "inner",
                          "ajaxType": "get",
                          "params": [
                            {
                              "name": "ID",
                              "type": "tempValue",
                              "valueName": "ID"
                            },
                            {
                              "name": "_onlyOneObject",
                              "type": "value",
                              "value": true
                            }
                          ],
                          "outputParameters": [

                          ],
                          "result": [

                          ]
                        },
                      ]
                    }
                  }

                ]
              }
            },
            "size": {
              "nzXs": 24,
              "nzSm": 24,
              "nzMd": 24,
              "nzLg": 24,
              "nzXl": 24,
              "nzXXl": 24
            },
            "component": {
              "id": "table_main",
              "title": "",
              "titleIcon": "right-circle",
              "component": "cnDataTable",
              "keyId": "ID",
              "size": "large",
              "isBordered": false,
              "isFrontPagination": false,
              "isPagination": true,
              "isShowSizeChanger": true,
              "showTotal": true,
              "pageSize": 5,
              "showCheckBox": true,
              "pageSizeOptions": [10, 20, 50, 100],
              "loadingOnInit": true,
              "isSelected": true,
              "loadingConfig": {
                "url": "resource/PROVINCE/query",
                "method": "get",
                "params": [],
                "filter": []
              },
              "columns": [
                {
                  "title": "ID",
                  "type": "field",
                  "field": "ID",
                  "hidden": true,
                  "showFilter": false,
                  "showSort": false,
                  "isShowExpand": false,
                  "width": "50px",
                  "style": {}
                },
                {
                  "title": "省名称",
                  "type": "field",
                  "field": "PROVINCE_NAME",
                  "hidden": false,
                  "showFilter": false,
                  "showSort": false,
                  "width": "200px",
                  "style": {},
                  "editor": {
                    "type": "input",
                    "field": "PROVINCE_NAME"
                  }
                },
                {
                  "title": "人口",
                  "type": "field",
                  "field": "POPULATION",
                  "hidden": false,
                  "showFilter": false,
                  "showSort": false,
                  "width": "200px",
                  "style": {},
                  "editor": {
                    "type": "input",
                    "field": "POPULATION"
                  }
                },
                {
                  "title": "是否直辖市",
                  "type": "field",
                  "field": "DIRECTLY_UNDER",
                  "hidden": false,
                  "showFilter": false,
                  "showSort": false,
                  "width": "300px",
                  "style": {},
                  "editor": {
                    "type": "select",
                    "field": "DIRECTLY_UNDER",
                    "placeholder": "请输入",
                    "options": [
                      {
                        "label": "是",
                        "value": 1
                      },
                      {
                        "label": "否",
                        "value": 2
                      }
                    ],
                    "defaultValue": 2,
                    "labelName": "label"
                  },
                  "custom": {
                    "type": "tag",
                    "field": "DIRECTLY_UNDER",
                    "dataMapping": [
                      {
                        "color": "#87d068",
                        "field": "DIRECTLY_UNDER",
                        "value": 1
                      },
                      {
                        "color": "#ff3367",
                        "field": "DIRECTLY_UNDER",
                        "value": 2
                      }
                    ]
                  }
                },
                {
                  "title": "操作",
                  "type": "action",
                  "width": "100px",
                  "actionIds": [
                    "main_table_new_row",
                    "main_table_edit_row",
                    "main_table_cancel_new_row",
                    "main_table_cancel_edit_row",
                    "main_table_row_link"
                  ]
                }
              ],
              "rowActions": [
                {
                  "id": "main_table_new_row",
                  "state": "text",
                  "text": "",
                  "icon": "plus",
                  "color": "primary",
                  "type": "link",
                  "size": "large",
                  "hidden": false,
                  "execute": [
                    {
                      "triggerType": "STATE",
                      "trigger": "ADD_ROW",
                    }
                  ]
                },
                {
                  "id": "main_table_edit_row",
                  "state": "text",
                  "text": "编辑",
                  "icon": "edit",
                  "color": "primary",
                  "type": "link",
                  "size": "large",
                  "hidden": false,
                  "execute": [
                    {
                      "triggerType": "STATE",
                      "trigger": "EDIT_ROW",
                    }
                  ]
                },
                {
                  "id": "main_table_cancel_new_row",
                  "state": "text",
                  "text": "删除",
                  "icon": "edit",
                  "color": "primary",
                  "type": "link",
                  "size": "large",
                  "hidden": true,
                  "execute": [
                    {
                      "triggerType": "STATE",
                      "trigger": "CANCEL_NEW_ROW",
                    }
                  ],
                  "toggle": {
                    "type": "state",
                    "toggleProperty": "hidden",
                    "values": [
                      {
                        "name": "new",
                        "value": false
                      },
                      {
                        "name": "text",
                        "value": true
                      }
                    ]
                  }
                },
                {
                  "id": "main_table_cancel_edit_row",
                  "state": "text",
                  "text": "取消",
                  "icon": "edit",
                  "color": "primary",
                  "type": "link",
                  "size": "large",
                  "hidden": true,
                  "execute": [
                    {
                      "triggerType": "STATE",
                      "trigger": "CANCEL_EDIT_ROW",
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
                      }
                    ]
                  }
                },
                {
                  "id": "main_table_row_link",
                  "state": "text",
                  "text": "跳转编辑",
                  "icon": "edit",
                  "type": "link",
                  "color": "primary",
                  "size": "large",
                  "execute": [
                    {
                      "triggerType": "LINK",
                      "trigger": "LINK",
                      "linkId": "linkToForm"
                    }
                  ]
                }
              ],
              "linkConfig": [
                {
                  "id": "linkToForm",
                  "link": "/template/dynamic/kV1qCkPk8frNWgVHMN0ENslJgji0Mx6U",
                  "params": [
                    {
                      "name": "ID",
                      "type": "returnValue",
                      "valueName": "ID"
                    }
                  ]
                }
              ],
              "cascade": {
                "messageSender": [
                  {
                    "id": "afterProvinceSaveSuccessfully",
                    "senderId": "table_main",
                    "sendData": [
                      {
                        "beforeSend": {},
                        "receiverTriggerType": "ACTION",
                        "receiverTrigger": "MESSAGE",
                        "params": [
                          {
                            "name": "type",
                            "type": "value",
                            "value": "warning"
                          },
                          {
                            "name": "message",
                            "type": "value",
                            "value": "操作完成!111111111111"
                          }
                        ]
                      },
                      {
                        "beforeSend": {},
                        "receiverTriggerType": "BEHAVIOR",
                        "receiverTrigger": "REFRESH",
                        "params": [
                          {
                            "name": "ID",
                            "type": "editedRows",
                            "valueName": "ID"
                          }
                        ]
                      },
                      {
                        "beforeSend": {},
                        "receiverTriggerType": "ACTION",
                        "receiverTrigger": "CHANGE_ADDED_ROWS_TO_TEXT",
                        "params": [
                          {
                            "name": "ID",
                            "type": "addedRows",
                            "valueName": "ID"
                          }
                        ]
                      }
                    ]
                  },
                  {
                    "id": "view2_sender_liu_1",
                    "senderId": "table_main",
                    "triggerType": "BEHAVIOR",
                    "trigger": "SET_SELECT_ROW",
                    "triggerMoment": "after",
                    "sendData": [
                      {
                        "beforeSend": {},
                        "reveicerId": "",
                        "receiverTriggerType": "BEHAVIOR",
                        "receiverTrigger": "ADD_MULTIPLE_NODE",
                        "params": [
                          {
                            "name": "value",
                            "type": "item",
                            "valueName": "ID"
                          },
                          {
                            "name": "label",
                            "type": "item",
                            "valueName": "PROVINCE_NAME"
                          }
                        ]
                      }
                    ]
                  },
                ],
                "messageReceiver": [
                  {
                    "id": "",
                    "senderId": "table_main",
                    "receiveData": [
                      {
                        "beforeReceive": [],
                        "triggerType": "ACTION",
                        "trigger": "MESSAGE"
                      },
                      // {
                      //     "beforeReceive": [],
                      //     "triggerType": "ACTION",
                      //     "trigger": "LOAD_REFRESH_DATA"
                      // },
                      {
                        "beforeReceive": [],
                        "triggerType": "BEHAVIOR",
                        "trigger": "REFRESH"
                      },
                      {
                        "beforeReceive": [],
                        "triggerType": "ACTION",
                        "trigger": "CHANGE_ADDED_ROWS_TO_TEXT"
                      }

                    ]
                  },

                ]
              },
              "toolbar": {
                "id": "toolbar_main",
                "component": "cnToolbar",
                "size": "large",
                "changeValue": [
                  {
                    "id": "edit_form_changeValue",
                    "params": [
                      {
                        "name": "ID",
                        "type": "item",
                        "valueName": "ID",
                        "valueTo": "tempValue"
                      }
                    ]
                  }
                ],
                "toolbar": [
                  {
                    "targetViewId": "table_main",
                    "group": [
                      {
                        "id": "M_addRow",
                        "text": "新增",
                        "icon": "plus",
                        "color": "primary",
                        "hidden": false,
                        "disabled": false,
                        "size": "large",
                        "execute": [
                          {
                            "triggerType": "STATE",
                            "trigger": "ADD_ROW",
                            // "conditionId": "add_state_1"
                          }
                        ]
                      },
                      {
                        "id": "M_saveRow",
                        "text": "保存",
                        "icon": "save",
                        "color": "primary",
                        "hidden": false,
                        "disabled": false,
                        "size": "large",
                        "execute": [
                          {
                            "triggerType": "OPERATION",
                            "trigger": "SAVE_ROWS",
                            "ajaxId": "add_provinces_1",
                            // "stateId": "add_save_1",
                            // "conditionId": "add_province_condition"
                          },
                          // {
                          //     "triggerType": "OPERATION",
                          //     "trigger": "SAVE_ROWS",
                          //     "ajaxId": "edit_save_1",
                          //     // "stateId": "edit_save_1",
                          //     "conditionId": "edit_province_condition"
                          // }
                        ]
                      },
                      {
                        "id": "table_main_new_btn",
                        "text": "新增表单",
                        "state": "new",
                        "icon": "edit",
                        "color": "primary",
                        "hidden": false,
                        "disabled": false,
                        "size": "large",
                        "execute": [
                          {
                            "triggerType": "ACTION",
                            "trigger": "DIALOG",
                            "dialogId": "table_main_edit_btn",
                            // "changeValueId": "edit_form_changeValue",
                            "ajaxId": "form_edit_province",
                            // "stateId": "add_save_1",
                            // "conditionId": "add_province_condition"
                          }
                        ]
                      },
                      {
                        "id": "table_main_edit_btn",
                        "text": "编辑表单",
                        "state": "edit",
                        "icon": "edit",
                        "color": "primary",
                        "hidden": false,
                        "disabled": false,
                        "size": "large",
                        "execute": [
                          {
                            "triggerType": "ACTION",
                            "trigger": "DIALOG",
                            "dialogId": "table_main_edit_btn",
                            "changeValueId": "edit_form_changeValue",
                            "ajaxId": "form_edit_province",
                            // "stateId": "add_save_1",
                            // "conditionId": "add_province_condition"
                          }
                        ]
                      }
                    ]
                  }
                ],
                "ajaxConfig": [
                  {
                    "id": "add_provinces_1",
                    "url": "resource/PROVINCE/batchInsert",
                    "urlType": "inner",
                    "ajaxType": "post",
                    "params": [
                      {
                        "name": "ID",
                        "type": "componentValue",
                        "valueName": "ID"
                      },
                      {
                        "name": "PROVINCE_NAME",
                        "type": "componentValue",
                        "valueName": "PROVINCE_NAME",
                        "dataType": "string"
                      },
                      {
                        "name": "AREA_CODE",
                        "type": "componentValue",
                        "valueName": "AREA_CODE",
                        "dataType": "string"
                      },
                      {
                        "name": "DIRECTLY_UNDER",
                        "type": "componentValue",
                        "valueName": "DIRECTLY_UNDER",
                        "dataType": "int"
                      },
                      {
                        "name": "POPULATION",
                        "type": "componentValue",
                        "valueName": "POPULATION",
                        "dataType": "int"
                      }
                    ],
                    "outputParameters": [

                    ],
                    "result": [
                      {
                        "name": "data",
                        "showMessageWithNext": 0,
                        "message": "message.ajax.state.success",
                        "senderId": "afterProvinceSaveSuccessfully"
                      },
                      {
                        "name": "validation",
                        "message": "message.ajax.state.success",
                        "senderId": "afterProvinceSaveValidation"
                      },
                      {
                        "name": "error",
                        "senderId": "toolbar_02"
                      }
                    ]
                  },
                  {
                    "id": "form_edit_province",
                    "url": "resource/PROVINCE/update",
                    "urlType": "inner",
                    "ajaxType": "put",
                    "params": [
                      {
                        "name": "ID",
                        "type": "tempValue",
                        "valueName": "ID",
                        "dataType": "string"
                      },
                      {
                        "name": "PROVINCE_NAME",
                        "type": "componentValue",
                        "valueName": "PROVINCE_NAME",
                        "dataType": "string"
                      },
                      // {
                      //     "name": "AREA_CODE",
                      //     "type": "componentValue",
                      //     "valueName": "AREA_CODE",
                      //     "dataType": "string"
                      // },
                      {
                        "name": "DIRECTLY_UNDER",
                        "type": "componentValue",
                        "valueName": "DIRECTLY_UNDER",
                        "dataType": "int"
                      },
                      {
                        "name": "POPULATION",
                        "type": "componentValue",
                        "valueName": "POPULATION",
                        "dataType": "int"
                      },
                    ],
                    "outputParameters": [

                    ],
                    "result": [
                      {
                        "name": "data",
                        "showMessageWithNext": 0,
                        "message": "message.ajax.state.success",
                        "senderId": "afterProvinceSaveSuccessfully"
                      },
                      // {
                      //     "name": "validation",
                      //     "message": "message.ajax.state.success",
                      //     "senderId": "afterAddBusinessSubObjectValidation"
                      // },
                      // {
                      //     "name": "error",
                      //     "senderId": "toolbar_02"
                      // }
                    ]
                  }
                ],
                "cascade": {
                  "messageSender": [],
                  "messageReceiver": []
                },
                "dialog": [
                  {
                    "id": "table_main_edit_btn",
                    "type": "confirm",
                    "title": "数据编辑",
                    "cancelText": "取消",
                    "okText": "提交",
                    "form": {
                      "id": "form_province",
                      "type": "form",
                      "component": "form",
                      "state": "edit",
                      "loadingConfig": {
                        "id": "loadform"
                      },
                      "cascade": {
                        "messageSender": [],
                        "messageReceiver": []
                      },
                      "formLayout": {
                        "id": "layout_01",
                        "type": "layout",
                        "title": "表单布局b86s2i",
                        "rows": [
                          {
                            "id": "erw",
                            "type": "row",
                            "cols": [
                              {
                                "id": "iHspYn",
                                "col": "cc",
                                "type": "col",
                                "title": "",
                                "span": 24,
                                "layoutContain": "input",
                                "size": {
                                  "nzXs": 24, "nzSm": 24, "nzMd": 12, "nzLg": 24, "ngXl": 4, "nzXXl": 4
                                },
                                "control": {
                                  "id": "control_province"  // id 和引用id 值相同
                                }
                              },
                              {
                                "id": "iHspYn1",
                                "col": "cc",
                                "type": "col",
                                "title": "",
                                "span": 24,
                                "layoutContain": "input",
                                "size": {
                                  "nzXs": 24, "nzSm": 24, "nzMd": 12, "nzLg": 12, "ngXl": 4, "nzXXl": 4
                                },
                                "control": {
                                  "id": "control_population"  // id 和引用id 值相同
                                }
                              },
                              {
                                "id": "iHspYn2",
                                "col": "cc",
                                "type": "col",
                                "title": "",
                                "span": 24,
                                "layoutContain": "input",
                                "size": {
                                  "nzXs": 24, "nzSm": 24, "nzMd": 12, "nzLg": 12, "ngXl": 4, "nzXXl": 4
                                },
                                "control": {
                                  "id": "control_z"  // id 和引用id 值相同
                                }
                              }
                            ]
                          }
                        ]
                      },
                      "formControlsPermissions": [
                        {
                          "formState": "new",
                          "formStateContent": {
                            "isLoad": false,
                            "loadAjax": {},
                            "isDefault": true
                          },
                          "Controls": [
                            { "id": "control_province", "state": "edit", "hidden": false, "readOnly": false },
                            { "id": "control_population", "state": "edit", "hidden": false, "readOnly": false },
                            { "id": "control_z", "state": "edit", "hidden": false, "readOnly": false },
                            // { "id": "004", "state": "edit", "hidden": false, "readOnly": false }
                          ]
                        },
                        {
                          "formState": "edit",
                          "formStateContent": {
                            "isLoad": true,
                            "loadAjax": {},
                            "isDefault": true
                          },
                          "Controls": [
                            { "id": "control_province", "state": "edit", "hidden": false, "readOnly": false },
                            { "id": "control_population", "state": "edit", "hidden": false, "readOnly": false },
                            { "id": "control_z", "state": "edit", "hidden": false, "readOnly": false },
                            // { "id": "004", "state": "edit", "hidden": false, "readOnly": false }
                          ]
                        },
                      ],
                      "formControls": [
                        {
                          "id": "control_province",
                          "hidden": false,
                          "title": "省名称",
                          "titleConfig": {
                            "required": true
                          },
                          "field": "PROVINCE_NAME",
                          "labelSize": {
                            "span": 3,
                            "nzXs": { "span": 6 },
                            "nzSm": { "span": 6 },
                            "nzMd": { "span": 6 },
                            "nzLg": { "span": 3 },
                            "ngXl": { "span": 6 },
                            "nzXXl": { "span": 6 }
                          },
                          "controlSize": {
                            "span": 18,
                            "nzXs": 18,
                            "nzSm": 18,
                            "nzMd": 18,
                            "nzLg": 18,
                            "ngXl": 18,
                            "nzXXl": 18
                          },
                          "state": "edit",
                          "text": {
                            "type": "label",
                            "field": "PROVINCE_NAME",
                          },
                          "editor": {
                            "type": "input",
                            "field": "PROVINCE_NAME",
                            "placeholder": "请输入",
                            "validations": [
                              { "validator": "required", "type": "default", "message": "请输入省名称" }
                            ]
                          }
                        },
                        {
                          "id": "control_population",
                          "hidden": false,
                          "title": "人口",
                          "titleConfig": {
                            "required": true
                          },
                          "field": "POPULATION",
                          "labelSize": {
                            "span": 6,
                            "nzXs": 6, "nzSm": 6, "nzMd": 6, "nzLg": 6, "ngXl": 6, "nzXXl": 6
                          },
                          "controlSize": {
                            "span": 18,
                            "nzXs": { "span": 18, "offset": 0 },
                            "nzSm": { "span": 18, "offset": 0 },
                            "nzMd": { "span": 18, "offset": 0 },
                            "nzLg": { "span": 18, "offset": 0 },
                            "nzXl": { "span": 18, "offset": 0 },
                            "nzXXl": { "span": 18, "offset": 0 }
                          },
                          "state": "edit",
                          "text": {
                            "type": "label",
                            "field": "POPULATION",
                          },
                          "editor": {
                            "type": "input",
                            "field": "POPULATION",
                            "placeholder": "请输入",
                            "validations": [
                              { "validator": "required", type: "default", "message": "请输入人口数量" }
                            ]
                          }
                        },
                        {
                          "id": "control_z",
                          "hidden": false,
                          "title": "是否直辖市",
                          "titleConfig": {
                            "required": false
                          },
                          "field": "DIRECTLY_UNDER",
                          "labelSize": {
                            "span": 6,
                            "nzXs": 6, "nzSm": 6, "nzMd": 6, "nzLg": 6, "nzXl": 6, "nzXXl": 6
                          },
                          "controlSize": {
                            "span": 18,
                            "nzXs": { "span": 18, "offset": 0 },
                            "nzSm": { "span": 18, "offset": 0 },
                            "nzMd": { "span": 18, "offset": 0 },
                            "nzLg": { "span": 18, "offset": 0 },
                            "ngXl": { "span": 18, "offset": 0 },
                            "nzXXl": { "span": 18, "offset": 0 }
                          },
                          "state": "edit",
                          "text": {
                            "type": "label",
                            "field": "DIRECTLY_UNDER",
                          },
                          "editor": {
                            "type": "select",
                            "field": "DIRECTLY_UNDER",
                            "placeholder": "请输入",
                            "options": [
                              { "label": "是", "value": 1 },
                              { "label": "否", "value": 0 }
                            ],
                            "defaultValue": 0,
                            "validate": {

                            }
                          }
                        },
                      ],
                      "ajaxConfig": [
                        {
                          "id": "loadform",
                          "url": "resource/PROVINCE/query",
                          "urlType": "inner",
                          "ajaxType": "get",
                          "params": [
                            {
                              "name": "ID",
                              "type": "tempValue",
                              "valueName": "ID"
                            },
                            {
                              "name": "_onlyOneObject",
                              "type": "value",
                              "value": true
                            }
                          ],
                          "outputParameters": [

                          ],
                          "result": [

                          ]
                        },
                      ]
                    }
                  }

                ]
              },
              "ajaxConfig": [

              ],
              "afterTrigger": [

              ],
            }
          }
        ],
        "id": "row_2",
        "type": "row",
      },

      {
        "cols": [

        ],
        "id": "row_4",
        "type": "row",
      }
    ]
  }

  /**
   * addSelected
   */
  public addSelected(v?) {
    // debugger;
    console.log('执行addSelected', this.tempValue, v);
      this.SELECTED_VALUE = v['value'];
    // const ev = this.config.eventConfig['ADD_SELECTED'];
    // if (ev)
    //   this[ev.name] = this[ev.type][ev.valueName]
    return true;
  }


  // 接受数组值  统一按数组接受
  public acceptSelectsValue(v) {

    console.log("选中多值反馈至页面容器：", v);

  }

  public buildParameters(paramsCfg, data?, isArray = false) {
    let parameterResult: any | any[];
    if (!isArray && !data) {
      parameterResult = ParameterResolver.resolve({
        params: paramsCfg,
        tempValue: this.tempValue,
        //           componentValue: this.COMPONENT_VALUE,
        //            item: this.ROW_SELECTED,
        initValue: this.initValue,
        cacheValue: this.cacheValue,
        router: this.routerValue,
        //           addedRows: this.ROWS_ADDED,
        //           editedRows: this.ROWS_EDITED,
        //          checkedRow: this.ROWS_CHECKED,
        outputValue: data

      });
    } else if (!isArray && data) {
      parameterResult = ParameterResolver.resolve({
        params: paramsCfg,
        tempValue: this.tempValue,
        //           componentValue: this.COMPONENT_VALUE,
        //           item: this.ROW_SELECTED,
        initValue: this.initValue,
        cacheValue: this.cacheValue,
        router: this.routerValue,
        addedRows: data,
        editedRows: data,
        validation: data,
        returnValue: data,
        //           checkedRow: this.ROWS_CHECKED,
        outputValue: data
      });
    } else if (isArray && data && Array.isArray(data)) {
      parameterResult = [];
      data.map(d => {
        const param = ParameterResolver.resolve({
          params: paramsCfg,
          tempValue: this.tempValue,
          componentValue: d,
          //               item: this.ROW_SELECTED,
          initValue: this.initValue,
          cacheValue: this.cacheValue,
          router: this.routerValue,
          addedRows: d,
          editedRows: d,
          validation: d,
          returnValue: d,
          //               checkedRow: this.ROWS_CHECKED,
          outputValue: data
        });
        parameterResult.push(param);
      })
    }
    return parameterResult;
  }

  public ngOnDestroy() {
    // 释放级联对象
    this.unsubscribeRelation();
    // 释放及联接受对象
    if (this._receiver_subscription$) {
      this._receiver_subscription$.unsubscribe();
    }

    if (this._sender_subscription$) {
      this._sender_subscription$.unsubscribe();
    }

    // 释放触发器对象
    if (this._trigger_receiver_subscription$) {
      this._trigger_receiver_subscription$.unsubscribe();
    }

    if (this._trigger_source$) {
      this._trigger_source$.unsubscribe();
    }

    if (this.subscription$) {
      this.subscription$.unsubscribe();
    }
  }


  // 自定义弹出，将承载组件的值变化，通过消息发送到弹出页面，弹出页面接收到当前值，弹出自定义页面的
  // 方法可以通过组件实例取值
  // 值初始化，也可通过当前page 组件将值发送给承载组件，或者承载组件自加载数据展示
  // 一般多选，展示的时候，就自加载数据，静态结构赋值的可能比较大


  // 单选，多选 都以承载组件作为载体接受数据，承载组件数据变化后将结果发送至容器页面组件，点击确定按钮的时候，
  // 从页面组件取固定值，页面组件分两部分值，一个是 单值（对象），一个是多值（数组），取值结果后自行转换结果
  // 反馈至内部小组件，当前操作完成。

  // isSelected 是否启用默认选中第一行
  // 







}
