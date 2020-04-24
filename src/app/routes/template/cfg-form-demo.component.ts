import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cfg-form-demo,[cfg-form-demo]',
  templateUrl: './cfg-form-demo.component.html',
  styles: ['']
})
export class CfgFormDemoComponent implements OnInit {

  public is_drag = true;
  public gridStyle = {
    width: '100%'
  };
  constructor() { }

  public ngOnInit() {
  }


  // 拖动行

  public f_ondragstart(e?, d?) {
    // this.d_row = d;
    e.dataTransfer.setData('test', d);
    console.log('拖动行', e, d);
    const ss = e.dataTransfer.getData('test');
    console.log('拖动行临时值', ss);
  }

  // public config = {
  //   state: 'insert',
  //   toolbar: [
  //     {
  //       "targetViewId": "view_01",
  //       "group": [
  //         {
  //           "id": "M_refresh",
  //           "text": "刷新",
  //           "icon": "reload",
  //           "color": "text-primary",
  //           "hidden": false,
  //           "disabled": false,
  //           "execute": [
  //             {
  //               "triggerType": "BEHAVIOR",
  //               "trigger": "REFRESH"
  //             }
  //           ]
  //         },
  //         {
  //           "id": "M_addRow",
  //           "text": "新增",
  //           "icon": "plus",
  //           "color": "text-primary",
  //           "hidden": false,
  //           "disabled": false,
  //           "execute": [
  //             {
  //               "triggerType": "STATE",
  //               "trigger": "ADD_ROW",
  //               "conditionId": "add_state_1"
  //             }
  //           ]
  //         },
  //         {
  //           "id": "M_updateRow",
  //           "text": "修改",
  //           "icon": "edit",
  //           "color": "text-success",
  //           "hidden": false,
  //           "disabled": false,
  //           "state": "edit",
  //           "execute": [
  //             {
  //               "triggerType": "STATE",
  //               "trigger": "EDIT_ROW",
  //               // "conditionId": "edit_state_1"
  //             }
  //           ],
  //           "toggle": {
  //             "type": "state",
  //             "toggleProperty": "hidden",
  //             "values": [
  //               {
  //                 "name": "edit",
  //                 "value": true
  //               },
  //               {
  //                 "name": "text",
  //                 "value": false
  //               }
  //             ]
  //           }
  //         },
  //         {
  //           "id": "M_deleteRow",
  //           "text": "删除",
  //           "icon": "delete",
  //           "color": "text-red-light",
  //           "hidden": false,
  //           "disabled": false,
  //           "execute": [
  //             {
  //               "triggerType": "OPERATION",
  //               "trigger": "EXECUTE_CHECKED_ROWS_IDS",
  //               "conditionId": "delete_operation_1",
  //               "ajaxId": "delete_row_1"
  //             }
  //           ]
  //         },
  //         {
  //           "id": "M_saveRow",
  //           "text": "保存",
  //           "icon": "save",
  //           "color": "text-primary",
  //           "hidden": true,
  //           "disabled": false,
  //           "execute": [
  //             {
  //               "triggerType": "OPERATION",
  //               "trigger": "SAVE_ROW",
  //               "ajaxId": "add_save_1",
  //               "stateId": "add_save_1",
  //               "conditionId": "add_save_1"
  //             },
  //             {
  //               "triggerType": "OPERATION",
  //               "trigger": "EDIT_ROW",
  //               "stateId": "edit_save_1",
  //               "ajaxId": "edit_save_1",
  //               "conditionId": "edit_save_1"
  //             }
  //           ],
  //           "toggle": {
  //             "type": "state",
  //             "toggleProperty": "hidden",
  //             "values": [
  //               {
  //                 "name": "edit",
  //                 "value": false
  //               },
  //               {
  //                 "name": "text",
  //                 "value": true
  //               }
  //             ]
  //           }
  //         },
  //         {
  //           "id": "M_cancelrow",
  //           "text": "取消",
  //           "triggerType": "STATE",
  //           "trigger": "CANCEL",
  //           "icon": "rollback",
  //           "color": "text-grey-darker",
  //           "hidden": true,
  //           "disabled": null,
  //           "execute": [
  //             {
  //               "triggerType": "STATE",
  //               "trigger": "CANCEL"
  //             }
  //           ],
  //           "toggle": {
  //             "type": "state",
  //             "toggleProperty": "hidden",
  //             "values": [
  //               {
  //                 "name": "edit",
  //                 "value": false
  //               },
  //               {
  //                 "name": "text",
  //                 "value": true
  //               }
  //             ]
  //           }
  //         }
  //       ]
  //     },
  //     {
  //       "targetViewId": "view_02",
  //       "group": [
  //         {
  //           "name": "M_addSearchRow",
  //           "text": "查询",
  //           "triggerType": "STATE",
  //           "trigger": "SEARCH_ROW",
  //           "actionName": "addSearchRow",
  //           "icon": "search",
  //           "color": "text-primary",
  //           "hidden": false,
  //           "disabled": false,
  //           "execute": [
  //             {
  //               "triggerType": "STATE",
  //               "trigger": "SEARCH_ROW"
  //             }
  //           ]
  //         },
  //         {
  //           "name": "M_cancelSearchRow",
  //           "text": "取消查询",
  //           "icon": "rollback",
  //           "triggerType": "STATE",
  //           "trigger": "CANCEL_SEARCH_ROW",
  //           "actionName": "cancelSearchRow",
  //           "color": "text-grey-darker",
  //           "hidden": false,
  //           "disabled": false,
  //           "execute": [
  //             {
  //               "triggerType": "STATE",
  //               "trigger": "SEARCH_ROW"
  //             }
  //           ],
  //         }
  //       ]
  //     }
  //   ],
  //   loadingConfig: {
  //     id: "loadform" // 将加载配置引用
  //   },
  //   formLayout: {
  //     "id": "b86s2i",
  //     "type": "layout",
  //     "title": "表单布局b86s2i",
  //     "rows": [
  //       {
  //         "id": "MefhXa",
  //         "type": "row",
  //         // 行列，是否 显示。
  //         "cols": [
  //           {
  //             "id": "iHspYn", "col": "cc", "type": "col",
  //             "title": "列iHspYn", "span": 24,
  //             "layoutContain": "input",
  //             "size": {
  //               "nzXs": 24, "nzSm": 24, "nzMd": 24, "nzLg": 24, "ngXl": 24, "nzXXl": 24
  //             },
  //             "control": {
  //               "id": "001"  // id 和引用id 值相同
  //             }
  //           },
  //           {
  //             "id": "ioj0mV", "col": "cc", "type": "col", "title": "列ioj0mV", "span": 24, "layoutContain": "select",
  //             "size": {
  //               "nzXs": 24, "nzSm": 24, "nzMd": 24, "nzLg": 24, "ngXl": 24, "nzXXl": 24
  //             },
  //             "control": { "id": "002" }
  //           },
  //           {
  //             "id": "ioj0mV", "col": "cc", "type": "col", "title": "列ioj0mV", "span": 12, "layoutContain": "select",
  //             "size": {
  //               "nzXs": 12, "nzSm": 12, "nzMd": 12, "nzLg": 12, "ngXl": 12, "nzXXl": 12
  //             },
  //             "control": { "id": "003" }
  //           },
  //           {
  //             "id": "ioj0mV", "col": "cc", "type": "col", "title": "列ioj0mV", "span": 12, "layoutContain": "select",
  //             "size": {
  //               "nzXs": 12, "nzSm": 12, "nzMd": 12, "nzLg": 12, "ngXl": 12, "nzXXl": 12
  //             },
  //             "control": { "id": "004" }
  //           }
  //         ]
  //       }]
  //   },
  //   formControls: [
  //     {
  //       id: '001',
  //       "hidden": true, // 字段是否隐藏
  //       "title": '测试字段1',  // lable 信息
  //       "field": "code",  // fromcontrol name  默认的字段
  //       "labelSize": {
  //         "span": 8,
  //         "nzXs": { span: 7, offset: 1 },
  //         "nzSm": { span: 7, offset: 1 },
  //         "nzMd": { span: 7, offset: 1 },
  //         "nzLg": { span: 7, offset: 1 },
  //         "ngXl": { span: 7, offset: 1 },
  //         "nzXXl": { span: 7, offset: 1 }
  //       },  // 
  //       "controlSize": {
  //         "span": 16,
  //         "nzXs": 16,
  //         "nzSm": 16,
  //         "nzMd": 16,
  //         "nzLg": 16,
  //         "ngXl": 16,
  //         "nzXXl": 16
  //       },
  //       "state": "edit", // 当前组件默认状态 文本，编辑，或者由表单状态控制text、edit、form
  //       "text": { // 文本展示字段
  //         "type": 'label', // 什么组件展示文本 
  //         "field": 'code',   // 字段
  //       },
  //       "editor": {            // 编辑状态字段  日后扩充可为数组，满足条件下的组件变化
  //         "type": "input",
  //         "field": "code",  // 编辑字段于定义字段一致 （此处定义于表格相反）
  //         "placeholder": "请输入",
  //         "validate": {  // 校验

  //         }
  //       }
  //     },
  //     {
  //       id: '002',
  //       "hidden": true, // 字段是否隐藏
  //       "title": '省',  // lable 信息
  //       "field": "inputname2",  // fromcontrol name  默认的字段
  //       "labelSize": {
  //         "span": 8,
  //         "nzXs": 8, "nzSm": 8, "nzMd": 8, "nzLg": 8, "ngXl": 8, "nzXXl": 8
  //       },  // 
  //       "controlSize": {
  //         "span": 16,
  //         "nzXs": { span: 8, offset: 8 },
  //         "nzSm": { span: 8, offset: 8 },
  //         "nzMd": { span: 8, offset: 8 },
  //         "nzLg": { span: 8, offset: 8 },
  //         "ngXl": { span: 8, offset: 8 },
  //         "nzXXl": { span: 8, offset: 8 }
  //       },
  //       "state": "edit", // 当前组件默认状态 文本，编辑，或者由表单状态控制 text、edit、form
  //       "text": { // 文本展示字段
  //         "type": 'label', // 什么组件展示文本 
  //         "field": 'inputname2',   // 字段
  //       },
  //       "editor": {            // 编辑状态字段  日后扩充可为数组，满足条件下的组件变化
  //         "type": "select",
  //         "field": "inputname2",  // 编辑字段于定义字段一致 （此处定义于表格相反）
  //         "placeholder": "请输入",
  //         options: [
  //           { label: '是', value: '1' },
  //           { label: '否', value: '0' }
  //         ],
  //         labelName: 'PROVINCENAME',
  //         valueName: 'ID',
  //         loadingConfig: {
  //           id: "loadformselect1" // 将加载配置引用
  //         },
  //         "validate": {  // 校验

  //         }
  //       }
  //     },
  //     {
  //       id: '003',
  //       "hidden": true, // 字段是否隐藏
  //       "title": '市',  // lable 信息
  //       "field": "inputname3",  // fromcontrol name  默认的字段
  //       "labelSize": {
  //         "span": 8,
  //         "nzXs": 8, "nzSm": 8, "nzMd": 8, "nzLg": 8, "ngXl": 8, "nzXXl": 8
  //       },  // 
  //       "controlSize": {
  //         "span": 16,
  //         "nzXs": { span: 16, offset: 0 },
  //         "nzSm": { span: 16, offset: 0 },
  //         "nzMd": { span: 16, offset: 0 },
  //         "nzLg": { span: 16, offset: 0 },
  //         "ngXl": { span: 16, offset: 0 },
  //         "nzXXl": { span: 16, offset: 0 }
  //       },
  //       "state": "edit", // 当前组件默认状态 文本，编辑，或者由表单状态控制 text、edit、form
  //       "text": { // 文本展示字段
  //         "type": 'label', // 什么组件展示文本 
  //         "field": 'inputname3',   // 字段
  //       },
  //       "editor": {            // 编辑状态字段  日后扩充可为数组，满足条件下的组件变化
  //         "type": "select",
  //         "field": "inputname3",  // 编辑字段于定义字段一致 （此处定义于表格相反）
  //         "placeholder": "请输入",
  //         options: [
  //           { label: '是', value: '1' },
  //           { label: '否', value: '0' }
  //         ],
  //         labelName: 'CITYNAME',
  //         valueName: 'ID',
  //         loadingConfig: {
  //           id: "loadformselect2" // 将加载配置引用
  //         },
  //         "validate": {  // 校验

  //         }
  //       }
  //     },
  //     {
  //       id: '004',
  //       "hidden": true, // 字段是否隐藏
  //       "title": '测试字段4',  // lable 信息
  //       "field": "inputname4",  // fromcontrol name  默认的字段
  //       "labelSize": {
  //         "span": 8,
  //         "nzXs": 8, "nzSm": 8, "nzMd": 8, "nzLg": 8, "ngXl": 8, "nzXXl": 8
  //       },  // 
  //       "controlSize": {
  //         "span": 16,
  //         "nzXs": { span: 16, offset: 0 },
  //         "nzSm": { span: 16, offset: 0 },
  //         "nzMd": { span: 16, offset: 0 },
  //         "nzLg": { span: 16, offset: 0 },
  //         "ngXl": { span: 16, offset: 0 },
  //         "nzXXl": { span: 16, offset: 0 }
  //       },
  //       "state": "edit", // 当前组件默认状态 文本，编辑，或者由表单状态控制 text、edit、form
  //       "text": { // 文本展示字段
  //         "type": 'label', // 什么组件展示文本 
  //         "field": 'inputname4',   // 字段
  //       },
  //       "editor": {            // 编辑状态字段  日后扩充可为数组，满足条件下的组件变化
  //         "type": "select",
  //         "field": "inputname4",  // 编辑字段于定义字段一致 （此处定义于表格相反）
  //         "placeholder": "请输入",
  //         options: [
  //           { label: '好人', value: '1' },
  //           { label: '坏人', value: '0' }
  //         ],
  //         "validate": {  // 校验

  //         }
  //       }
  //     },
  //     {
  //       id: '005',
  //       "hidden": true, // 字段是否隐藏
  //       "title": '测试字段5',  // lable 信息
  //       "field": "inputname5",  // fromcontrol name  默认的字段
  //       "labelSize": {
  //         "span": 8,
  //         "nzXs": 24, "nzSm": 24, "nzMd": 24, "nzLg": 24, "ngXl": 24, "nzXXl": 24
  //       },  // 
  //       "controlSize": {
  //         "span": 16,
  //         "nzXs": 24, "nzSm": 24, "nzMd": 24, "nzLg": 24, "ngXl": 24, "nzXXl": 24
  //       },
  //       "state": "text", // 当前组件默认状态 文本，编辑，或者由表单状态控制 text、edit、form
  //       "text": { // 文本展示字段
  //         "type": 'label', // 什么组件展示文本 
  //         "field": 'inputname5',   // 字段
  //       },
  //       "editor": {            // 编辑状态字段  日后扩充可为数组，满足条件下的组件变化
  //         "type": "input",
  //         "field": "inputname5",  // 编辑字段于定义字段一致 （此处定义于表格相反）
  //         "placeholder": "请输入",
  //         "validate": {  // 校验

  //         }
  //       }
  //     }
  //   ],
  //   formControlsPermissions: [ // 初始表单字段，描述 新增、编辑、查看 状态下的文本
  //     {
  //       formState: "insert", // 新增状态下的Controls 展示与否，是否读写属性设置
  //       formStateContent: { // 对当前状态的描述 ，描述当前状态下 表单组件 具备的行为，例如是否自加载，是否启用默认值
  //         isLoad: false,
  //         loadAjax: {}, // 如果启用load，是否用新的加载地址
  //         isDefault: true
  //       },
  //       Controls: [
  //         { id: '001', state: "edit", hidden: false, readOnly: false },
  //         { id: '002', state: "edit", hidden: false, readOnly: false },
  //         { id: '003', state: "edit", hidden: false, readOnly: false },
  //         { id: '004', state: "edit", hidden: false, readOnly: false },
  //         { id: '005', state: "edit", hidden: false, readOnly: false }
  //       ]
  //     },
  //     {
  //       formState: "update",
  //       Controls: [
  //         { id: '001', state: "edit", hidden: false, readOnly: false },
  //         { id: '002', state: "edit", hidden: false, readOnly: false },
  //         { id: '003', state: "edit", hidden: false, readOnly: false },
  //         { id: '004', state: "edit", hidden: false, readOnly: false },
  //         { id: '005', state: "edit", hidden: false, readOnly: false }
  //       ]
  //     },
  //     {
  //       formState: "text",
  //       Controls: [
  //         { id: '001', state: "text", hidden: false, readOnly: false },
  //         { id: '002', state: "text", hidden: false, readOnly: false },
  //         { id: '003', state: "text", hidden: false, readOnly: false },
  //         { id: '004', state: "text", hidden: false, readOnly: false },
  //         { id: '005', state: "text", hidden: false, readOnly: false }
  //       ]
  //     }

  //   ],
  //   ajaxConfig: [
  //     {
  //       "id": "loadform",
  //       "url": "information/testList",
  //       "urlType": "inner",
  //       "ajaxType": "get",
  //       "params": [
  //         {
  //           "name": "state",
  //           "type": "value",
  //           "value": "D"
  //         }
  //       ],
  //       "outputParameters": [

  //       ],
  //       "result": [  // 描述 表单接收参数，将返回的哪些值赋给相应的组件属性

  //       ]
  //     },
  //     {
  //       "id": "loadformselect1",
  //       "url": "information/selectAllProvinceWithCity",
  //       "urlType": "inner",
  //       "ajaxType": "get",
  //       "params": [
  //         {
  //           "name": "state",
  //           "type": "value",
  //           "value": "D"
  //         }

  //       ],
  //       "outputParameters": [

  //       ],
  //       "result": [  // 描述 表单接收参数，将返回的哪些值赋给相应的组件属性

  //       ]
  //     },
  //     {
  //       "id": "loadformselect2_2",
  //       "url": "information/ssld",
  //       "urlType": "inner",
  //       "ajaxType": "get",
  //       "params": [
  //         {
  //           "name": "state",
  //           "type": "value",
  //           "value": "D"
  //         },
  //         {
  //           "name": "pId",
  //           "type": "value",
  //           "value": "1"
  //         }
  //       ],
  //       "outputParameters": [

  //       ],
  //       "result": [  // 描述 表单接收参数，将返回的哪些值赋给相应的组件属性

  //       ]
  //     },
  //     {
  //       "id": "loadformselect2",
  //       "url": "information/selectCityByPid",
  //       "urlType": "inner",
  //       "ajaxType": "get",
  //       "params": [
  //         {
  //           "name": "state",
  //           "type": "value",
  //           "value": "D"
  //         },
  //         {
  //           "name": "pId",
  //           "type": "cascadeValue",
  //           "valueName": "PROVINCEID",
  //           "value": "2"
  //         }
  //       ],
  //       "outputParameters": [

  //       ],
  //       "result": [  // 描述 表单接收参数，将返回的哪些值赋给相应的组件属性

  //       ]
  //     }



  //   ],
  //   cascade: {
  //     "messageSender": [
  //       {
  //         "id": "toolbar_01",
  //         "senderId": "view_01",
  //         "triggerType": "OPERATION",
  //         "trigger": "EXECUTE_CHECKED_ROWS",
  //         "triggerMoment": "after",
  //         "sendData": [
  //           {
  //             "beforeSend": [],
  //             "reveicerId": "",
  //             "receiverTriggerType": "BEHAVIOR",
  //             "receiverTrigger": "REFRESH_AS_CHILD",
  //             "params": [
  //               {
  //                 "name": "parent_id",
  //                 "type": "item",
  //                 "valueName": "id"
  //               },
  //               {
  //                 "name": "parent_name",
  //                 "type": "item",
  //                 "valueName": "name"
  //               }
  //             ]
  //           }
  //         ]
  //       }
  //     ]
  //   },
  //   cascadeValue: [ // 值级联配置
  //     {
  //       "type": '值变化',
  //       "controlId": '002', //  大的control标识，级联内部
  //       "name": 'inputname2',
  //       "CascadeObjects": [
  //         {
  //           "controlId": '003',
  //           "cascadeName": 'inputname3',
  //           "cascadeItems": [  // 根据值执行
  //             {
  //               "type": 'default',  // conditions   default  满足条件执行或者默认都执行
  //               "caseValue": {    // 条件描述 （触发级联的前置条件，如果不设置，则是满足）
  //                 "type": 'selectObjectValue',
  //                 "valueName": 'num',
  //                 "regular": '^0$'
  //               },
  //               "content": {  // 应答体描述
  //                 "type": 'ajax', // 应答类型（异步、消息、赋值、隐藏、显示...）
  //                 "data": {
  //                   "option": [
  //                     { "name": 'PROVINCEID', "type": 'selectObjectValue', "value": '1', "valueName": 'ID' }
  //                   ]
  //                 }
  //               }
  //             }

  //           ]
  //         }
  //       ]
  //     },
  //     {
  //       "type": '值变化',
  //       "controlId": '003',
  //       "name": 'inputname3',
  //       "CascadeObjects": [
  //         {
  //           "controlId": '004',
  //           "cascadeName": 'inputname4',
  //           "cascadeItems": [  // 根据值执行
  //             {
  //               "type": 'default',  // conditions   default  满足条件执行或者默认都执行
  //               "caseValue": {    // 条件描述 （触发级联的前置条件，如果不设置，则是满足）
  //                 "type": 'selectObjectValue',
  //                 "valueName": 'num',
  //                 "regular": '^0$'
  //               },
  //               "content": {  // 应答体描述
  //                 "type": 'message', // 应答类型（异步、消息、赋值、隐藏、显示...）
  //                 "data": {
  //                   "option": [
  //                     {
  //                       "messageType": 'warning',
  //                       "type": 'selectObjectValue',
  //                       "valueName": 'msg'
  //                     }
  //                   ]
  //                 }
  //               }
  //             }

  //           ]
  //         }
  //       ]
  //     }

  //   ]
  // }


  // public formconfig = {
  //   "id": "CKC23J",
  //   "type": "layout",
  //   "title": "布局CKC23J",
  //   "container": "rows",
  //   "rows": [
  //     {
  //       "cols": [
  //         {
  //           "id": "lsWPaU",
  //           "col": "cc",
  //           "type": "col", "titlestate": 1, "title": "列lsWPaU", "span": 24,
  //           "container": "component",
  //           "size": { "nzXs": 24, "nzSm": 24, "nzMd": 24, "nzLg": 24, "ngXl": 24, "nzXXl": 24 },
  //           "component": {
  //             "id": "toolbar_001",
  //             "component": "cnToolbar",
  //             "size": "default",
  //             "cascade": {

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
  //               }

  //             ],
  //             "ajaxConfig": [
  //               {
  //                 "id": "add_save_1",
  //                 "url": "information/test2",
  //                 "urlType": "inner",
  //                 "ajaxType": "post",
  //                 "params": [
  //                   {
  //                     "name": "state",
  //                     "type": "value",
  //                     "value": "DVM"
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
  //                 "url": "information/test2",
  //                 "urlType": "inner",
  //                 "ajaxType": "put",
  //                 "params": [
  //                   {
  //                     "name": "state",
  //                     "type": "value",
  //                     "value": "DVM"
  //                   }
  //                 ],
  //                 "outputParameters": [

  //                 ],
  //                 "result": [

  //                 ]
  //               }
  //             ],
  //             "builtinConfig": [
  //               {
  //                 "id": "add_state_1",
  //                 event: "changeState", // 内置方法
  //                 "url": "information/test2",
  //                 "urlType": "inner",
  //                 "ajaxType": "post",
  //                 "params": [
  //                   {
  //                     "name": "state",
  //                     "type": "value",
  //                     "value": "DVM"
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
  //             ],
  //             "beforeTrigger": [

  //             ],
  //             "afterTrigger": [
  //               {
  //                 "id": "",
  //                 "senderId": "view_01",
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
  //                 "targetViewId": "view_01",
  //                 "group": [

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
  //                         "trigger": "ADD_FORM",
  //                         // "conditionId": "add_state_1"
  //                         "builtinId": "add_state_1"

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
  //                     "state": "edit",
  //                     "execute": [
  //                       {
  //                         "triggerType": "STATE",
  //                         "trigger": "EDIT_FORM",
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
  //                     "id": "M_saveRow",
  //                     "text": "保存",
  //                     "icon": "save",
  //                     "color": "text-primary",
  //                     "hidden": true,
  //                     "disabled": false,
  //                     "execute": [ // 根据前置条件判断，当前 表单状态是什么，执行什么sql
  //                       {
  //                         "triggerType": "OPERATION",
  //                         "trigger": "EXECUTE",
  //                         "ajaxId": "add_save_1",
  //                         "stateId": "add_save_1",
  //                         // "conditionId": "add_save_1"
  //                       },
  //                       {
  //                         "triggerType": "OPERATION",
  //                         "trigger": "EXECUTE",
  //                         "stateId": "edit_save_1",
  //                         "ajaxId": "edit_save_1",
  //                         //  "conditionId": "edit_save_1"
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
  //                         }
  //                       ]
  //                     }
  //                   },
  //                   {
  //                     "id": "M_cancelrow",
  //                     "text": "取消",
  //                     "triggerType": "STATE",
  //                     "trigger": "CANCEL",
  //                     "icon": "rollback",
  //                     "color": "text-grey-darker",
  //                     "hidden": true,
  //                     "disabled": null,
  //                     "execute": [
  //                       {
  //                         "triggerType": "STATE",
  //                         "trigger": "CANCEL"
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
  //                         }
  //                       ]
  //                     }
  //                   }
  //                 ]
  //               }
  //             ]
  //           }
  //         },
  //         {
  //           "id": "DF5GVd", "col": "cc", "type": "col", "titlestate": 1, "title": "列DF5GVd", "span": 24,
  //           "container": "component",
  //           "size": { "nzXs": 24, "nzSm": 24, "nzMd": 24, "nzLg": 24, "ngXl": 24, "nzXXl": 24 },
  //           "component": {
  //             "id": "view_01",
  //             "type": "form",
  //             "component": "form",
  //             state: 'text',
  //             loadingConfig: {
  //               id: "loadform" // 将加载配置引用
  //             },
  //             formLayout: {
  //               "id": "b86s2i",
  //               "type": "layout",
  //               "title": "表单布局b86s2i",
  //               "rows": [
  //                 {
  //                   "id": "MefhXa",
  //                   "type": "row",
  //                   // 行列，是否 显示。
  //                   "cols": [
  //                     {
  //                       "id": "iHspYn", "col": "cc", "type": "col",
  //                       "title": "列iHspYn", "span": 24,
  //                       "layoutContain": "input",
  //                       "size": {
  //                         "nzXs": 24, "nzSm": 24, "nzMd": 24, "nzLg": 24, "ngXl": 24, "nzXXl": 24
  //                       },
  //                       "control": {
  //                         "id": "001"  // id 和引用id 值相同
  //                       }
  //                     },
  //                     {
  //                       "id": "ioj0mV", "col": "cc", "type": "col", "title": "列ioj0mV", "span": 24, "layoutContain": "select",
  //                       "size": {
  //                         "nzXs": 24, "nzSm": 24, "nzMd": 24, "nzLg": 24, "ngXl": 24, "nzXXl": 24
  //                       },
  //                       "control": { "id": "002" }
  //                     },
  //                     {
  //                       "id": "ioj0mV", "col": "cc", "type": "col", "title": "列ioj0mV", "span": 12, "layoutContain": "select",
  //                       "size": {
  //                         "nzXs": 12, "nzSm": 12, "nzMd": 12, "nzLg": 12, "ngXl": 12, "nzXXl": 12
  //                       },
  //                       "control": { "id": "003" }
  //                     },
  //                     {
  //                       "id": "ioj0mV", "col": "cc", "type": "col", "title": "列ioj0mV", "span": 12, "layoutContain": "select",
  //                       "size": {
  //                         "nzXs": 12, "nzSm": 12, "nzMd": 12, "nzLg": 12, "ngXl": 12, "nzXXl": 12
  //                       },
  //                       "control": { "id": "004" }
  //                     }
  //                   ]
  //                 }]
  //             },
  //             formControls: [
  //               {
  //                 id: '001',
  //                 "hidden": true, // 字段是否隐藏
  //                 "title": '省名称',  // lable 信息
  //                 "titleConfig": {
  //                   required: true
  //                 },
  //                 "field": "provinceName",  // fromcontrol name  默认的字段
  //                 "labelSize": {
  //                   "span": 8,
  //                   "nzXs": { span: 7, offset: 1 },
  //                   "nzSm": { span: 7, offset: 1 },
  //                   "nzMd": { span: 7, offset: 1 },
  //                   "nzLg": { span: 7, offset: 1 },
  //                   "ngXl": { span: 7, offset: 1 },
  //                   "nzXXl": { span: 7, offset: 1 }
  //                 },  // 
  //                 "controlSize": {
  //                   "span": 16,
  //                   "nzXs": 16,
  //                   "nzSm": 16,
  //                   "nzMd": 16,
  //                   "nzLg": 16,
  //                   "ngXl": 16,
  //                   "nzXXl": 16
  //                 },
  //                 "state": "edit", // 当前组件默认状态 文本，编辑，或者由表单状态控制text、edit、form
  //                 "text": { // 文本展示字段
  //                   "type": 'label', // 什么组件展示文本 
  //                   "field": 'provinceName',   // 字段
  //                 },
  //                 "editor": {            // 编辑状态字段  日后扩充可为数组，满足条件下的组件变化
  //                   "type": "input",
  //                   "field": "provinceName",  // 编辑字段于定义字段一致 （此处定义于表格相反）
  //                   "placeholder": "请输入",
  //                   "validate": {  // 校验

  //                   }
  //                 }
  //               },
  //               {
  //                 id: '002',
  //                 "hidden": true, // 字段是否隐藏
  //                 "title": '省',  // lable 信息
  //                 "titleConfig": {
  //                   required: true
  //                 },
  //                 "field": "inputname2",  // fromcontrol name  默认的字段
  //                 "labelSize": {
  //                   "span": 8,
  //                   "nzXs": 8, "nzSm": 8, "nzMd": 8, "nzLg": 8, "ngXl": 8, "nzXXl": 8
  //                 },  // 
  //                 "controlSize": {
  //                   "span": 16,
  //                   "nzXs": { span: 8, offset: 8 },
  //                   "nzSm": { span: 8, offset: 8 },
  //                   "nzMd": { span: 8, offset: 8 },
  //                   "nzLg": { span: 8, offset: 8 },
  //                   "ngXl": { span: 8, offset: 8 },
  //                   "nzXXl": { span: 8, offset: 8 }
  //                 },
  //                 "state": "edit", // 当前组件默认状态 文本，编辑，或者由表单状态控制 text、edit、form
  //                 "text": { // 文本展示字段
  //                   "type": 'label', // 什么组件展示文本 
  //                   "field": 'inputname2',   // 字段
  //                 },
  //                 "editor": {            // 编辑状态字段  日后扩充可为数组，满足条件下的组件变化
  //                   "type": "select",
  //                   "field": "inputname2",  // 编辑字段于定义字段一致 （此处定义于表格相反）
  //                   "placeholder": "请输入",
  //                   options: [
  //                     { label: '是', value: '1' },
  //                     { label: '否', value: '0' }
  //                   ],
  //                   labelName: 'provinceName',
  //                   valueName: 'id',
  //                   loadingConfig: {
  //                     id: "loadformselect1" // 将加载配置引用
  //                   },
  //                   "validate": {  // 校验

  //                   }
  //                 }
  //               },
  //               {
  //                 id: '003',
  //                 "hidden": true, // 字段是否隐藏
  //                 "title": '市',  // lable 信息
  //                 "titleConfig": {
  //                   required: false
  //                 },
  //                 "field": "inputname3",  // fromcontrol name  默认的字段
  //                 "labelSize": {
  //                   "span": 8,
  //                   "nzXs": 8, "nzSm": 8, "nzMd": 8, "nzLg": 8, "ngXl": 8, "nzXXl": 8
  //                 },  // 
  //                 "controlSize": {
  //                   "span": 16,
  //                   "nzXs": { span: 16, offset: 0 },
  //                   "nzSm": { span: 16, offset: 0 },
  //                   "nzMd": { span: 16, offset: 0 },
  //                   "nzLg": { span: 16, offset: 0 },
  //                   "ngXl": { span: 16, offset: 0 },
  //                   "nzXXl": { span: 16, offset: 0 }
  //                 },
  //                 "state": "edit", // 当前组件默认状态 文本，编辑，或者由表单状态控制 text、edit、form
  //                 "text": { // 文本展示字段
  //                   "type": 'label', // 什么组件展示文本 
  //                   "field": 'inputname3',   // 字段
  //                 },
  //                 "editor": {            // 编辑状态字段  日后扩充可为数组，满足条件下的组件变化
  //                   "type": "select",
  //                   "field": "inputname3",  // 编辑字段于定义字段一致 （此处定义于表格相反）
  //                   "placeholder": "请输入",
  //                   options: [
  //                     { label: '是', value: '1' },
  //                     { label: '否', value: '0' }
  //                   ],
  //                   labelName: 'cityName',
  //                   valueName: 'id',
  //                   loadingConfig: {
  //                     id: "loadformselect2" // 将加载配置引用
  //                   },
  //                   "validate": {  // 校验

  //                   }
  //                 }
  //               },
  //               {
  //                 id: '004',
  //                 "hidden": true, // 字段是否隐藏
  //                 "title": '测试字段4',  // lable 信息
  //                 "titleConfig": {
  //                   required: false
  //                 },
  //                 "field": "inputname4",  // fromcontrol name  默认的字段
  //                 "labelSize": {
  //                   "span": 8,
  //                   "nzXs": 8, "nzSm": 8, "nzMd": 8, "nzLg": 8, "ngXl": 8, "nzXXl": 8
  //                 },  // 
  //                 "controlSize": {
  //                   "span": 16,
  //                   "nzXs": { span: 16, offset: 0 },
  //                   "nzSm": { span: 16, offset: 0 },
  //                   "nzMd": { span: 16, offset: 0 },
  //                   "nzLg": { span: 16, offset: 0 },
  //                   "ngXl": { span: 16, offset: 0 },
  //                   "nzXXl": { span: 16, offset: 0 }
  //                 },
  //                 "state": "edit", // 当前组件默认状态 文本，编辑，或者由表单状态控制 text、edit、form
  //                 "text": { // 文本展示字段
  //                   "type": 'label', // 什么组件展示文本 
  //                   "field": 'inputname4',   // 字段
  //                 },
  //                 "editor": {            // 编辑状态字段  日后扩充可为数组，满足条件下的组件变化
  //                   "type": "select",
  //                   "field": "inputname4",  // 编辑字段于定义字段一致 （此处定义于表格相反）
  //                   "placeholder": "请输入",
  //                   options: [
  //                     { label: '好人', value: '1' },
  //                     { label: '坏人', value: '2' }
  //                   ],
  //                   "validate": {  // 校验

  //                   }
  //                 }
  //               },
  //               {
  //                 id: '005',
  //                 "hidden": true, // 字段是否隐藏
  //                 "title": '测试字段5',  // lable 信息
  //                 "titleConfig": {
  //                   required: false
  //                 },
  //                 "field": "inputname5",  // fromcontrol name  默认的字段
  //                 "labelSize": {
  //                   "span": 8,
  //                   "nzXs": 24, "nzSm": 24, "nzMd": 24, "nzLg": 24, "ngXl": 24, "nzXXl": 24
  //                 },  // 
  //                 "controlSize": {
  //                   "span": 16,
  //                   "nzXs": 24, "nzSm": 24, "nzMd": 24, "nzLg": 24, "ngXl": 24, "nzXXl": 24
  //                 },
  //                 "state": "text", // 当前组件默认状态 文本，编辑，或者由表单状态控制 text、edit、form
  //                 "text": { // 文本展示字段
  //                   "type": 'label', // 什么组件展示文本 
  //                   "field": 'inputname5',   // 字段
  //                 },
  //                 "editor": {            // 编辑状态字段  日后扩充可为数组，满足条件下的组件变化
  //                   "type": "input",
  //                   "field": "inputname5",  // 编辑字段于定义字段一致 （此处定义于表格相反）
  //                   "placeholder": "请输入",
  //                   "validate": {  // 校验

  //                   }
  //                 }
  //               }
  //             ],
  //             formControlsPermissions: [ // 初始表单字段，描述 新增、编辑、查看 状态下的文本
  //               {
  //                 formState: "insert", // 新增状态下的Controls 展示与否，是否读写属性设置
  //                 formStateContent: { // 对当前状态的描述 ，描述当前状态下 表单组件 具备的行为，例如是否自加载，是否启用默认值
  //                   isLoad: false,
  //                   loadAjax: {}, // 如果启用load，是否用新的加载地址
  //                   isDefault: true
  //                 },
  //                 Controls: [
  //                   { id: '001', state: "edit", hidden: false, readOnly: false },
  //                   { id: '002', state: "edit", hidden: false, readOnly: false },
  //                   { id: '003', state: "edit", hidden: false, readOnly: false },
  //                   { id: '004', state: "edit", hidden: false, readOnly: false },
  //                   { id: '005', state: "edit", hidden: false, readOnly: false }
  //                 ]
  //               },
  //               {
  //                 formState: "update",
  //                 Controls: [
  //                   { id: '001', state: "edit", hidden: false, readOnly: false },
  //                   { id: '002', state: "edit", hidden: false, readOnly: false },
  //                   { id: '003', state: "edit", hidden: false, readOnly: false },
  //                   { id: '004', state: "edit", hidden: false, readOnly: false },
  //                   { id: '005', state: "edit", hidden: false, readOnly: false }
  //                 ]
  //               },
  //               {
  //                 formState: "text",
  //                 Controls: [
  //                   { id: '001', state: "text", hidden: false, readOnly: false },
  //                   { id: '002', state: "text", hidden: false, readOnly: false },
  //                   { id: '003', state: "text", hidden: false, readOnly: false },
  //                   { id: '004', state: "text", hidden: false, readOnly: false },
  //                   { id: '005', state: "text", hidden: false, readOnly: false }
  //                 ]
  //               }

  //             ],
  //             ajaxConfig: [
  //               {
  //                 "id": "loadform",
  //                 "url": "information/selectAllByProvinceId",
  //                 "urlType": "inner",
  //                 "ajaxType": "get",
  //                 "params": [
  //                   {
  //                     "name": "id",
  //                     "type": "tempValue",
  //                     "valueName": "_PID"
  //                   }
  //                 ],
  //                 "outputParameters": [

  //                 ],
  //                 "result": [  // 描述 表单接收参数，将返回的哪些值赋给相应的组件属性

  //                 ]
  //               },
  //               {
  //                 "id": "loadformselect1",
  //                 "url": "information/selectAllProvinceWithCity",
  //                 "urlType": "inner",
  //                 "ajaxType": "get",
  //                 "params": [


  //                 ],
  //                 "outputParameters": [

  //                 ],
  //                 "result": [  // 描述 表单接收参数，将返回的哪些值赋给相应的组件属性

  //                 ]
  //               },
  //               {
  //                 "id": "loadformselect2_2",
  //                 "url": "information/ssld",
  //                 "urlType": "inner",
  //                 "ajaxType": "get",
  //                 "params": [

  //                   {
  //                     "name": "pId",
  //                     "type": "value",
  //                     "value": "1"
  //                   }
  //                 ],
  //                 "outputParameters": [

  //                 ],
  //                 "result": [  // 描述 表单接收参数，将返回的哪些值赋给相应的组件属性

  //                 ]
  //               },
  //               {
  //                 "id": "loadformselect2",
  //                 "url": "information/selectCityByPid",
  //                 "urlType": "inner",
  //                 "ajaxType": "get",
  //                 "params": [

  //                   {
  //                     "name": "pId",
  //                     "type": "cascadeValue",
  //                     "valueName": "PROVINCEID",
  //                     "value": "2"
  //                   }
  //                 ],
  //                 "outputParameters": [

  //                 ],
  //                 "result": [  // 描述 表单接收参数，将返回的哪些值赋给相应的组件属性

  //                 ]
  //               }



  //             ],
  //             cascade: {
  //               "messageSender": [
  //                 {
  //                   "id": "toolbar_01",
  //                   "senderId": "view_01",
  //                   "triggerType": "OPERATION",
  //                   "trigger": "EXECUTE_CHECKED_ROWS",
  //                   "triggerMoment": "after",
  //                   "sendData": [
  //                     {
  //                       "beforeSend": [],
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
  //               ]
  //             },
  //             cascadeValue: [ // 值级联配置
  //               {
  //                 "type": '值变化',
  //                 "controlId": '002', //  大的control标识，级联内部
  //                 "name": 'inputname2',
  //                 "CascadeObjects": [
  //                   {
  //                     "controlId": '003',
  //                     "cascadeName": 'inputname3',
  //                     "cascadeItems": [  // 根据值执行
  //                       {
  //                         "type": 'default',  // conditions   default  满足条件执行或者默认都执行
  //                         "caseValue": {    // 条件描述 （触发级联的前置条件，如果不设置，则是满足）
  //                           "type": 'selectObjectValue',
  //                           "valueName": 'num',
  //                           "regular": '^0$'
  //                         },
  //                         "content": {  // 应答体描述
  //                           "type": 'ajax', // 应答类型（异步、消息、赋值、隐藏、显示...）
  //                           "data": {
  //                             "option": [
  //                               { "name": 'PROVINCEID', "type": 'selectObjectValue', "value": '1', "valueName": 'id' }
  //                             ]
  //                           }
  //                         }
  //                       }

  //                     ]
  //                   }
  //                 ]
  //               }
  //             ]
  //           }
  //         }],
  //       "id": "szIOQb", "type": "row", "container": "cols"
  //     }],
  //   "customlayout": []
  // }


  public democonfig = {
    "id": "4K0naM",
    "type": "layout",
    "title": "布局4K0naM",
    "container": "rows",
    "rows": [
      {
        "cols": [
          // {
          //   "id": "r5zDHB",
          //   "col": "cc",
          //   "type": "col",
          //   "title": "",
          //   "span": 24,
          //   "container": "component",
          //   "header": {
          //     "title": "demo",
          //     "toolbar": {
          //       "id": "toolbar_001",
          //       "component": "cnToolbar",
          //       "size": "default",
          //       "cascade": {
          //         "messageSender": [
          //           {
          //             "id": "toolbar_01",
          //             "senderId": "view_01",
          //             "triggerType": "OPERATION",
          //             "trigger": "EXECUTE_CHECKED_ROWS",
          //             "triggerMoment": "after",
          //             "sendData": [
          //               {
          //                 "beforeSend": {},
          //                 "reveicerId": "",
          //                 "receiverTriggerType": "BEHAVIOR",
          //                 "receiverTrigger": "REFRESH_AS_CHILD",
          //                 "params": [
          //                   {
          //                     "name": "parent_id",
          //                     "type": "item",
          //                     "valueName": "id"
          //                   },
          //                   {
          //                     "name": "parent_name",
          //                     "type": "item",
          //                     "valueName": "name"
          //                   }
          //                 ]
          //               }
          //             ]
          //           }
          //         ],
          //         "messageReceiver": [
          //           {
          //             "id": "s_001",
          //             "senderId": "view_01",
          //             "receiveData": [
          //               {
          //                 "triggerType": "STATE",
          //                 "trigger": "STATE_TO_TEXT"
          //               }
          //             ]
          //           },
          //           {
          //             "id": "s_002",
          //             "senderId": "view_01",
          //             "receiveData": [
          //               {
          //                 "triggerType": "STATE",
          //                 "trigger": "STATE_TO_EDIT"
          //               }
          //             ]
          //           }

          //         ]
          //       },
          //       "condition": [
          //         {
          //           "id": "add_state_1",
          //           "state": [
          //             {
          //               "type": "component",
          //               "valueName": "ROWS_CHECKED",
          //               "expression": [
          //                 {
          //                   "type": "property",
          //                   "name": "length",
          //                   "matchValue": 0,
          //                   "match": "gt"
          //                 },
          //                 {
          //                   "type": "element",
          //                   "name": "name",
          //                   "matchValue": "1",
          //                   "match": "eq",
          //                 }
          //               ]
          //             }
          //           ]
          //         },
          //         {
          //           "id": "edit_state_1",
          //           "state": [
          //             {
          //               "type": "component",
          //               "valueName": "ROWS_CHECKED",
          //               "expression": [
          //                 {
          //                   "type": "property",
          //                   "name": "length",
          //                   "matchValue": 0,
          //                   "match": "gt"
          //                 }
          //               ]
          //             }
          //           ]
          //         },
          //         {
          //           "id": "add_save_1",
          //           "state": [
          //             {
          //               "type": "component",
          //               "valueName": "ROWS_CHECKED",
          //               "expression": [
          //                 {
          //                   "type": "property",
          //                   "name": "length",
          //                   "matchValue": 0,
          //                   "match": "gt"
          //                 }
          //               ]
          //             },
          //             {
          //               "type": "component",
          //               "valueName": "ROWS_ADDED",
          //               "expression": [
          //                 {
          //                   "type": "property",
          //                   "name": "length",
          //                   "matchValue": 0,
          //                   "match": "gt"
          //                 }
          //               ]
          //             }
          //           ]
          //         },
          //         {
          //           "id": "edit_save_1",
          //           "state": [
          //             {
          //               "type": "component",
          //               "valueName": "ROWS_EDITED",
          //               "expression": [
          //                 {
          //                   "type": "property",
          //                   "name": "length",
          //                   "matchValue": 0,
          //                   "match": "gt"
          //                 }
          //               ]
          //             },
          //             {
          //               "type": "component",
          //               "valueName": "ROWS_CHECKED",
          //               "expression": [
          //                 {
          //                   "type": "property",
          //                   "name": "length",
          //                   "matchValue": 0,
          //                   "match": "gt"
          //                 }
          //               ]
          //             }
          //           ]
          //         },
          //         {
          //           "id": "cancel_edit_rows_2",
          //           "state": [
          //             {
          //               "type": "component",
          //               "valueName": "ROWS_EDITED",
          //               "expression": [
          //                 {
          //                   "type": "property",
          //                   "name": "length",
          //                   "matchValue": 0,
          //                   "match": "gt"
          //                 }
          //               ]
          //             }
          //           ]
          //         }
          //       ],
          //       "ajaxConfig": [
          //         {
          //           "id": "add_provinces_1",
          //           "url": "PRPVINCE/insertMany",
          //           "urlType": "inner",
          //           "ajaxType": "post",
          //           "params": [
          //             {
          //               "name": "provinceName",
          //               "type": "componentValue",
          //               "valueName": "provinceName",
          //               "dataType": "string"
          //             },
          //             {
          //               "name": "populationSize",
          //               "type": "componentValue",
          //               "valueName": "populationSize",
          //               "dataType": "int"
          //             },
          //             {
          //               "name": "directlyUnder",
          //               "type": "componentValue",
          //               "valueName": "directlyUnder",
          //               "dataType": "int"
          //             },
          //             {
          //               "name": "areaCode",
          //               "type": "componentValue",
          //               "valueName": "areaCode",
          //               "dataType": "int"
          //             },
          //             {
          //               "name": "createDate",
          //               "type": "componentValue",
          //               "valueName": "createDate",
          //               "dataType": "string"
          //             }
          //           ],
          //           "outputParameters": [

          //           ],
          //           "result": [
          //             {
          //               "name": "data",
          //               "showMessageWithNext": 0,
          //               "message": "message.ajax.state.success",
          //               "senderId": "toolbar_01"
          //             },
          //             {
          //               "name": "validation",
          //               "senderId": "toolbar_01"
          //             },
          //             {
          //               "name": "error",
          //               "senderId": "toolbar_01"
          //             }
          //           ]
          //         },
          //         {
          //           "id": "edit_save_1",
          //           "url": "province/updateMany",
          //           "urlType": "inner",
          //           "ajaxType": "put",
          //           "params": [
          //             {
          //               "name": "id",
          //               "type": "componentValue",
          //               "valueName": "id",
          //               "dataType": "string"
          //             },
          //             {
          //               "name": "provinceName",
          //               "type": "componentValue",
          //               "valueName": "provinceName",
          //               "dataType": "string"
          //             },
          //             {
          //               "name": "populationSize",
          //               "type": "componentValue",
          //               "valueName": "populationSize",
          //               "dataType": "int"
          //             },
          //             {
          //               "name": "directlyUnder",
          //               "type": "componentValue",
          //               "valueName": "directlyUnder",
          //               "dataType": "int"
          //             },
          //             {
          //               "name": "areaCode",
          //               "type": "componentValue",
          //               "valueName": "areaCode",
          //               "dataType": "int"
          //             },
          //             {
          //               "name": "createDate",
          //               "type": "componentValue",
          //               "valueName": "createDate",
          //               "dataType": "string"
          //             }
          //           ],
          //           "outputParameters": [

          //           ],
          //           "result": [

          //           ]
          //         }
          //       ],
          //       "beforeTrigger": [

          //       ],
          //       "afterTrigger": [
          //         {
          //           "id": "",
          //           "senderId": "view_01",
          //           "sendData": [
          //             {
          //               "beforeSend": [],
          //               "reveicerId": "",
          //               "receiverTriggerType": "BEHAVIOR",
          //               "receiverTrigger": "REFRESH_AS_CHILD",
          //               "params": [
          //                 {
          //                   "name": "parent_id",
          //                   "type": "item",
          //                   "valueName": "id"
          //                 },
          //                 {
          //                   "name": "parent_name",
          //                   "type": "item",
          //                   "valueName": "name"
          //                 }
          //               ]
          //             }
          //           ]
          //         }
          //       ],
          //       "toolbar": [
          //         {
          //           "targetViewId": "view_01",
          //           "group": [
          //             {
          //               "id": "M_refresh",
          //               "text": "刷新",
          //               "icon": "reload",
          //               "color": "text-primary",
          //               "hidden": false,
          //               "disabled": false,
          //               "execute": [
          //                 {
          //                   "triggerType": "BEHAVIOR",
          //                   "trigger": "REFRESH"
          //                 }
          //               ]
          //             },
          //             {
          //               "id": "M_addRow",
          //               "text": "新增",
          //               "icon": "plus",
          //               "color": "text-primary",
          //               "hidden": false,
          //               "disabled": false,
          //               "execute": [
          //                 {
          //                   "triggerType": "STATE",
          //                   "trigger": "ADD_ROW",
          //                   // "conditionId": "add_state_1"
          //                 }
          //               ]
          //             },
          //             {
          //               "id": "M_updateRow",
          //               "text": "修改",
          //               "icon": "edit",
          //               "color": "text-success",
          //               "hidden": false,
          //               "disabled": false,
          //               "state": "text",
          //               "execute": [
          //                 {
          //                   "triggerType": "STATE",
          //                   "trigger": "EDIT_ROWS",
          //                   // "conditionId": "edit_state_1"
          //                 }
          //               ],
          //               "toggle": {
          //                 "type": "state",
          //                 "toggleProperty": "hidden",
          //                 "values": [
          //                   {
          //                     "name": "edit",
          //                     "value": true
          //                   },
          //                   {
          //                     "name": "text",
          //                     "value": false
          //                   }
          //                 ]
          //               }
          //             },
          //             {
          //               "id": "M_deleteRow",
          //               "text": "删除",
          //               "icon": "delete",
          //               "color": "text-red-light",
          //               "hidden": false,
          //               "disabled": false,
          //               "execute": [
          //                 {
          //                   "triggerType": "OPERATION",
          //                   "trigger": "EXECUTE_CHECKED_ROWS_IDS",
          //                   "conditionId": "delete_operation_1",
          //                   "ajaxId": "delete_row_1"
          //                 }
          //               ]
          //             },
          //             {
          //               "id": "M_saveRow",
          //               "text": "保存",
          //               "icon": "save",
          //               "color": "text-primary",
          //               "hidden": true,
          //               "disabled": false,
          //               "execute": [
          //                 {
          //                   "triggerType": "OPERATION",
          //                   "trigger": "SAVE_ROWS",
          //                   "ajaxId": "add_provinces_1",
          //                   // "stateId": "add_save_1",
          //                   // "conditionId": "add_save_1"
          //                 },
          //                 {
          //                   "triggerType": "OPERATION",
          //                   "trigger": "SAVE_ROWS",
          //                   "ajaxId": "edit_save_1",
          //                   // "stateId": "edit_save_1",
          //                   // "conditionId": "edit_save_1"
          //                 }
          //               ],
          //               "toggle": {
          //                 "type": "state",
          //                 "toggleProperty": "hidden",
          //                 "values": [
          //                   {
          //                     "name": "edit",
          //                     "value": false
          //                   },
          //                   {
          //                     "name": "text",
          //                     "value": true
          //                   },
          //                   {
          //                     "name": "new",
          //                     "value": false
          //                   }
          //                 ]
          //               }
          //             },
          //             {
          //               "id": "M_cancelrow",
          //               "text": "取消1",
          //               "state": "edit",
          //               "icon": "rollback",
          //               "color": "text-grey-darker",
          //               "hidden": true,
          //               "disabled": null,
          //               "execute": [
          //                 {
          //                   "triggerType": "STATE",
          //                   "trigger": "CANCEL_EDIT_ROWS",
          //                   "conditionId": "cancel_edit_rows_2"
          //                 },
          //                 {
          //                   "triggerType": "STATE",
          //                   "trigger": "CANCEL_NEW_ROWS"
          //                 }
          //               ],
          //               "toggle": {
          //                 "type": "state",
          //                 "toggleProperty": "hidden",
          //                 "values": [
          //                   {
          //                     "name": "edit",
          //                     "value": false
          //                   },
          //                   {
          //                     "name": "text",
          //                     "value": true
          //                   },
          //                   {
          //                     "name": "new",
          //                     "value": false
          //                   }
          //                 ]
          //               }
          //             }
          //           ]
          //         },
          //         {
          //           "targetViewId": "view_02",
          //           "group": [
          //             {
          //               "name": "M_addSearchRow",
          //               "text": "查询",
          //               "triggerType": "STATE",
          //               "trigger": "SEARCH_ROW",
          //               "actionName": "addSearchRow",
          //               "icon": "search",
          //               "color": "text-primary",
          //               "hidden": false,
          //               "disabled": false,
          //               "execute": [
          //                 {
          //                   "triggerType": "STATE",
          //                   "trigger": "SEARCH_ROW"
          //                 }
          //               ]
          //             },
          //             {
          //               "name": "M_cancelSearchRow",
          //               "text": "取消查询",
          //               "icon": "rollback",
          //               "triggerType": "STATE",
          //               "trigger": "CANCEL_SEARCH_ROW",
          //               "actionName": "cancelSearchRow",
          //               "color": "text-grey-darker",
          //               "hidden": false,
          //               "disabled": false,
          //               "execute": [
          //                 {
          //                   "triggerType": "STATE",
          //                   "trigger": "SEARCH_ROW"
          //                 }
          //               ],
          //             }
          //           ]
          //         }
          //       ]
          //     }
          //   },
          //   "size": {
          //     "nzXs": 24,
          //     "nzSm": 24,
          //     "nzMd": 24,
          //     "nzLg": 24,
          //     "nzXl": 24,
          //     "nzXXl": 24
          //   },
          //   "component": {
          //     "id": "view_01",
          //     "title": "主表",
          //     "titleIcon": "right-circle",
          //     "component": "cnDataTable",
          //     "keyId": "id",
          //     "size": "middle",
          //     "isBordered": true,
          //     "isFrontPagination": false,
          //     "isPagination": true,
          //     "isShowSizeChanger": true,
          //     "showTotal": true,
          //     "pageSize": 5,
          //     "showCheckBox": true,
          //     "pageSizeOptions": [10, 20, 50, 100],
          //     "loadingOnInit": false,
          //     // "scroll": {
          //     //     "y": "300px"
          //     // },
          //     "spanWidthConfig": [
          //       '50px', '100px', '200px', '200px', '200px'
          //     ],
          //     "loadingConfig": {
          //       "url": "",
          //       "method": "get",
          //       "params": [

          //       ],
          //       "filter": [

          //       ]
          //     },
          //     "columns": [
          //       {
          //         "title": "ID",
          //         "type": "field",
          //         "field": "id",
          //         "hidden": true,
          //         "showFilter": false,
          //         "showSort": false,
          //         "isShowExpand": false,
          //         "width": "50px",
          //         "style": {}
          //       },
          //       {
          //         "title": "PROVINCE_NAME",
          //         "type": "field",
          //         "field": "provinceName",
          //         "hidden": false,
          //         "showFilter": false,
          //         "showSort": false,
          //         "width": "50px",
          //         "style": {},
          //         editor: {
          //           "type": "input",
          //           "field": "provinceName",
          //           "defaultValue": '默认值'
          //         }
          //       },
          //       {
          //         "title": "POPULATIONSIZE",
          //         "type": "field",
          //         "field": "populationSize",
          //         "hidden": false,
          //         "showFilter": false,
          //         "showSort": false,
          //         "width": "100px",
          //         "style": {},
          //       },
          //       {
          //         "title": "DIRECTLYUNDER",
          //         "type": "field",
          //         "field": "directlyUnder",
          //         "hidden": false,
          //         "showFilter": false,
          //         "showSort": false,
          //         "width": "100px",
          //         "style": {},
          //       },
          //       {
          //         "title": "AREACODE",
          //         "type": "field",
          //         "field": "areaCode",
          //         "hidden": false,
          //         "showFilter": false,
          //         "showSort": false,
          //         "width": "100px",
          //         "style": {},
          //         editor: {
          //           "type": "select",
          //           "field": "areaCode",
          //           "placeholder": "请输入",
          //           options: [
          //             { label: '东方不败', value: 0 },
          //             { label: '独孤求败', value: 1 },
          //             { label: '西门吹雪', value: 2 },
          //             { label: '陆小凤', value: 3 },
          //           ],
          //           "defaultValue": 3,
          //           labelName: 'label',
          //           valueName: 'value',
          //         }
          //       },
          //       {
          //         "title": "CREATEDATE",
          //         "type": "field",
          //         "field": "createDate",
          //         "hidden": false,
          //         "showFilter": false,
          //         "showSort": false,
          //         "width": "100px",
          //         "style": {},
          //       },
          //       {
          //         "title": "优势",
          //         "type": "field",
          //         "field": "remark",
          //         "hidden": false,
          //         "showFilter": false,
          //         "showSort": false,
          //         "width": "100px",
          //         "style": {},
          //       },

          //       // {
          //       //     "title": "message",
          //       //     "type": "field",
          //       //     "field": "MESSAGE",
          //       //     "hidden": false,
          //       //     "showFilter": false,
          //       //     "showSort": false,
          //       //     "width": "150px",
          //       //     "style": {}
          //       // },
          //       // {
          //       //     "title": "language",
          //       //     "type": "field",
          //       //     "field": "LANGUAGE",
          //       //     "hidden": false,
          //       //     "showFilter": false,
          //       //     "showSort": false,
          //       //     "isExpand": true,
          //       //     "width": "400px",
          //       //     "style": {}
          //       // },
          //       {
          //         "title": "ACTION",
          //         "type": "action",
          //         "actionIds": [
          //           "grid_edit", "grid_cancel", "grid_save", "grid_delete", "grid_new", "grid_new_cancel"
          //         ]
          //       }
          //     ],
          //     "cascade": {
          //       "messageSender": [
          //         {
          //           "id": "form_01",
          //           "senderId": "view_01",
          //           "triggerType": "BEHAVIOR",
          //           "trigger": "SET_SELECT_ROW",
          //           "triggerMoment": "after",
          //           "sendData": [
          //             {
          //               "beforeSend": {},
          //               "reveicerId": "",
          //               "receiverTriggerType": "BEHAVIOR",
          //               "receiverTrigger": "REFRESH_AS_CHILD",
          //               "params": [
          //                 {
          //                   "name": "_PID",
          //                   "type": "item",
          //                   "valueName": "id"
          //                 }
          //               ]
          //             }
          //           ]
          //         },
          //         {
          //           "id": "grid_sender_03",
          //           "senderId": "view_01",
          //           "triggerType": "STATE",
          //           "trigger": "CANCEL_EDIT_ROW",
          //           "triggerMoment": "after",
          //           "sendData": [
          //             {
          //               "reveicerId": "",
          //               "receiverTriggerType": "STATE",
          //               "receiverTrigger": "STATE_TO_TEXT",
          //               "conditionId": "cancel_edit_1",
          //               "params": [
          //                 {
          //                   "name": "targetViewId",
          //                   "value": "view_01",
          //                   "type": "value"
          //                 }
          //               ]
          //             }
          //           ]
          //         },
          //         {
          //           "id": "grid_sender_04",
          //           "senderId": "view_01",
          //           "triggerType": "STATE",
          //           "trigger": "CANCEL_NEW_ROW",
          //           "triggerMoment": "after",
          //           "sendData": [
          //             {
          //               "reveicerId": "",
          //               "receiverTriggerType": "STATE",
          //               "receiverTrigger": "STATE_TO_TEXT",
          //               "conditionId": "cancel_edit_2",
          //               "params": [
          //                 {
          //                   "name": "targetViewId",
          //                   "value": "view_01",
          //                   "type": "value"
          //                 }
          //               ]
          //             }
          //           ]
          //         },
          //         {
          //           "id": "grid_sender_05",
          //           "senderId": "view_01",
          //           "triggerType": "STATE",
          //           "trigger": "EDIT_ROW",
          //           "triggerMoment": "after",
          //           "sendData": [
          //             {
          //               "reveicerId": "",
          //               "receiverTriggerType": "STATE",
          //               "receiverTrigger": "STATE_TO_EDIT",
          //               "params": [
          //                 {
          //                   "name": "targetViewId",
          //                   "value": "view_01",
          //                   "type": "value"
          //                 }
          //               ]
          //             }
          //           ]
          //         }
          //       ],
          //       "messageReceiver": [
          //         {
          //           "id": "",
          //           "senderId": "form_01",
          //           "receiveData": [
          //             {
          //               "beforeReceive": [],
          //               "triggerType": "BEHAVIOR",
          //               "trigger": "REFRESH_AS_CHILD",
          //               "params": [
          //               ]
          //             }
          //           ]
          //         }
          //       ]

          //     },
          //     "rowActions": [
          //       {
          //         "id": "grid_new",
          //         "state": "new",
          //         "text": "保存",
          //         "icon": "save",
          //         "color": "text-primary",
          //         "type": "link",
          //         "size": "small",
          //         "hidden": false,
          //         "execute": [
          //           {
          //             "triggerType": "OPERATION",
          //             "trigger": "SAVE_ROW",
          //             "ajaxId": "province_save_1",
          //             // "stateId": "add_save_1",
          //             // "conditionId": "add_save_1"
          //           }
          //         ],
          //         "toggle": {
          //           "type": "state",
          //           "toggleProperty": "hidden",
          //           "values": [
          //             {
          //               "name": "new",
          //               "value": false
          //             },
          //             {
          //               "name": "text",
          //               "value": true
          //             }
          //           ]
          //         }
          //       },
          //       {
          //         "id": "grid_new_cancel",
          //         "state": "new",
          //         "text": "取消",
          //         "icon": "rollback",
          //         "color": "text-primary",
          //         "type": "link",
          //         "size": "small",
          //         "hidden": false,
          //         "execute": [
          //           {
          //             "triggerType": "STATE",
          //             "trigger": "CANCEL_NEW_ROW",
          //             // "ajaxId": "add_save_1",
          //             // "stateId": "add_save_1",
          //             // "conditionId": "add_save_1"
          //           }
          //         ],
          //         "toggle": {
          //           "type": "state",
          //           "toggleProperty": "hidden",
          //           "values": [
          //             {
          //               "name": "new",
          //               "value": false
          //             },
          //             {
          //               "name": "text",
          //               "value": true
          //             }
          //           ]
          //         }
          //       },
          //       {
          //         "id": "grid_edit",
          //         "state": "text",
          //         "text": "编辑",
          //         "icon": "edit",
          //         "color": "text-primary",
          //         "type": "link",
          //         "size": "small",
          //         "hidden": false,
          //         "execute": [
          //           {
          //             "triggerType": "STATE",
          //             "trigger": "EDIT_ROW",
          //             // "ajaxId": "add_save_1",
          //             // "stateId": "add_save_1",
          //             // "conditionId": "add_save_1"
          //           }
          //         ],
          //         "toggle": {
          //           "type": "state",
          //           "toggleProperty": "hidden",
          //           "values": [
          //             {
          //               "name": "edit",
          //               "value": true
          //             },
          //             {
          //               "name": "text",
          //               "value": false
          //             }
          //           ]
          //         }
          //       },
          //       {
          //         "id": "grid_cancel",
          //         "state": "text",
          //         "text": "取消",
          //         "icon": "rollback",
          //         "color": "text-primary",
          //         "type": "link",
          //         "size": "small",
          //         "hidden": true,
          //         "execute": [
          //           {
          //             "triggerType": "STATE",
          //             "trigger": "CANCEL_EDIT_ROW",
          //             // "ajaxId": "add_save_1",
          //             // "stateId": "add_save_1",
          //             // "conditionId": "cancel_edit_1"
          //           }
          //         ],
          //         "toggle": {
          //           "type": "state",
          //           "toggleProperty": "hidden",
          //           "values": [
          //             {
          //               "name": "edit",
          //               "value": false
          //             },
          //             {
          //               "name": "text",
          //               "value": true
          //             }
          //           ]
          //         }
          //       },
          //       {
          //         "id": "grid_save",
          //         "state": "text",
          //         "text": "保存",
          //         "icon": "save",
          //         "color": "text-primary",
          //         "type": "link",
          //         "size": "small",
          //         "hidden": true,
          //         "execute": [
          //           {
          //             "triggerType": "OPERATION",
          //             "trigger": "SAVE_ROW",
          //             "ajaxId": "province_edit_1",
          //             // "stateId": "add_save_1",
          //             // "conditionId": "add_save_1"
          //           }
          //         ],
          //         "toggle": {
          //           "type": "state",
          //           "toggleProperty": "hidden",
          //           "values": [
          //             {
          //               "name": "edit",
          //               "value": false
          //             },
          //             {
          //               "name": "text",
          //               "value": true
          //             }
          //           ]
          //         }
          //       },
          //       {
          //         "id": "grid_delete",
          //         "state": "text",
          //         "text": "删除",
          //         "icon": "delete",
          //         "type": "link",
          //         "color": "primary",
          //         "size": "small",
          //         "execute": [
          //           {
          //             "triggerType": "OPERATION",
          //             "trigger": "EXECUTE_SELECTED_ROW",
          //             // "conditionId": "delete_operation_1",
          //             // "ajaxId": "delete_row_1"
          //           }
          //         ]
          //       }
          //     ],
          //     "condition": [
          //       {
          //         "id": "add_state_1",
          //         "state": [
          //           {
          //             "type": "component",
          //             "valueName": "ROWS_CHECKED",
          //             "expression": [
          //               {
          //                 "type": "property",
          //                 "name": "length",
          //                 "matchValue": 0,
          //                 "match": "gt"
          //               },
          //               {
          //                 "type": "element",
          //                 "name": "name",
          //                 "matchValue": "1",
          //                 "match": "eq",
          //               }
          //             ]
          //           }
          //         ]
          //       },
          //       {
          //         "id": "edit_state_1",
          //         "state": [
          //           {
          //             "type": "component",
          //             "valueName": "ROWS_CHECKED",
          //             "expression": [
          //               {
          //                 "type": "property",
          //                 "name": "length",
          //                 "matchValue": 0,
          //                 "match": "gt"
          //               }
          //             ]
          //           }
          //         ]
          //       },
          //       {
          //         "id": "add_save_1",
          //         "state": [
          //           {
          //             "type": "component",
          //             "valueName": "ROWS_CHECKED",
          //             "expression": [
          //               {
          //                 "type": "property",
          //                 "name": "length",
          //                 "matchValue": 0,
          //                 "match": "gt"
          //               }
          //             ]
          //           },
          //           {
          //             "type": "component",
          //             "valueName": "ROWS_ADDED",
          //             "expression": [
          //               {
          //                 "type": "property",
          //                 "name": "length",
          //                 "matchValue": 0,
          //                 "match": "gt"
          //               }
          //             ]
          //           }
          //         ]
          //       },
          //       {
          //         "id": "edit_save_1",
          //         "state": [
          //           {
          //             "type": "component",
          //             "valueName": "ROWS_EDITED",
          //             "expression": [
          //               {
          //                 "type": "property",
          //                 "name": "length",
          //                 "matchValue": 0,
          //                 "match": "gt"
          //               }
          //             ]
          //           },
          //           {
          //             "type": "component",
          //             "valueName": "ROWS_CHECKED",
          //             "expression": [
          //               {
          //                 "type": "property",
          //                 "name": "length",
          //                 "matchValue": 0,
          //                 "match": "gt"
          //               }
          //             ]
          //           }
          //         ]
          //       },
          //       {
          //         "id": "cancel_edit_1",
          //         "state": [
          //           {
          //             "type": "component",
          //             "valueName": "ROWS_EDITED",
          //             "expression": [
          //               {
          //                 "type": "property",
          //                 "name": "length",
          //                 "matchValue": 0,
          //                 "match": "eq"
          //               }
          //             ]
          //           }
          //         ]
          //       },
          //       {
          //         "id": "cancel_edit_2",
          //         "state": [
          //           {
          //             "type": "component",
          //             "valueName": "ROWS_ADDED",
          //             "expression": [
          //               {
          //                 "type": "property",
          //                 "name": "length",
          //                 "matchValue": 0,
          //                 "match": "eq"
          //               }
          //             ]
          //           }
          //         ]
          //       }

          //     ],
          //     "ajaxConfig": [
          //       {
          //         "id": "province_save_1",
          //         "url": "province/insert ",
          //         "urlType": "inner",
          //         "ajaxType": "post",
          //         "params": [
          //           {
          //             "name": "provinceName",
          //             "type": "componentValue",
          //             "valueName": "provinceName",
          //             "dataType": "string"
          //           },
          //           {
          //             "name": "populationSize",
          //             "type": "componentValue",
          //             "valueName": "populationSize",
          //             "dataType": "number"
          //           },
          //           {
          //             "name": "directlyUnder",
          //             "type": "componentValue",
          //             "valueName": "directlyUnder",
          //             "dataType": "number"
          //           },
          //           {
          //             "name": "areaCode",
          //             "type": "componentValue",
          //             "valueName": "areaCode",
          //             "dataType": "number"
          //           },
          //           {
          //             "name": "createDate",
          //             "type": "componentValue",
          //             "valueName": "createDate",
          //             "dataType": "string"
          //           }
          //         ],
          //         "outputParameters": [

          //         ],
          //         "result": [
          //           {
          //             "name": "data",
          //             "showMessageWithNext": 0,
          //             "message": "message.ajax.state.success",
          //             "senderId": "grid_sender_01"
          //           },
          //           // {
          //           //     "name": "validation",
          //           //     "senderId": "grid_sender_02"
          //           // },
          //           // {
          //           //     "name": "error",
          //           //     "senderId": "grid_sender_03"
          //           // }
          //         ]
          //       },
          //       {
          //         "id": "province_edit_1",
          //         "url": "province/update",
          //         "urlType": "inner",
          //         "ajaxType": "put",
          //         "params": [
          //           {
          //             "name": "provinceName",
          //             "type": "componentValue",
          //             "valueName": "provinceName",
          //             "dataType": "string"
          //           },
          //           {
          //             "name": "populationSize",
          //             "type": "componentValue",
          //             "valueName": "populationSize",
          //             "dataType": "int"
          //           },
          //           {
          //             "name": "directlyUnder",
          //             "type": "componentValue",
          //             "valueName": "directlyUnder",
          //             "dataType": "int"
          //           },
          //           {
          //             "name": "areaCode",
          //             "type": "componentValue",
          //             "valueName": "areaCode",
          //             "dataType": "int"
          //           },
          //           {
          //             "name": "createDate",
          //             "type": "componentValue",
          //             "valueName": "createDate",
          //             "dataType": "string"
          //           },
          //           {
          //             "name": "id",
          //             "type": "componentValue",
          //             "valueName": "id",
          //             "dataType": "string"
          //           }
          //         ],
          //         "outputParameters": [

          //         ],
          //         "result": [

          //         ]
          //       },
          //       {
          //         "id": "province_delete_1",
          //         "url": "province/delete",
          //         "urlType": "inner",
          //         "ajaxType": "delete",
          //         "params": [
          //           {
          //             "name": "ids",
          //             "type": "CHECKED_ROWS_ID",
          //             "value": "_ids"
          //           }
          //         ],
          //         "outputParameters": [

          //         ],
          //         "result": [

          //         ]
          //       }
          //     ],
          //     "beforeTrigger": [

          //     ],
          //     "afterTrigger": [
          //       {
          //         "id": "",
          //         "senderId": "view_01",
          //         "sendData": [
          //           {
          //             "beforeSend": [],
          //             "reveicerId": "",
          //             "receiverTriggerType": "BEHAVIOR",
          //             "receiverTrigger": "REFRESH_AS_CHILD",
          //             "params": [
          //               {
          //                 "name": "parent_id",
          //                 "type": "item",
          //                 "valueName": "id"
          //               },
          //               {
          //                 "name": "parent_name",
          //                 "type": "item",
          //                 "valueName": "name"
          //               }
          //             ]
          //           }
          //         ]
          //       }
          //     ]

          //   }
          // },
          {
            "id": "DF5GVd", "col": "cc", "type": "col", "titlestate": 1,
            "title": "详细信息", "span": 24,
            "container": "component",
            "header": {
              "title": "",
              "toolbar": {
                "id": "toolbar_002",
                "component": "cnToolbar",
                "size": "default",
                "cascade": {

                },
                "condition": [
                  {
                    "id": "add_state_1",
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
                    "id": "edit_state_1",
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
                    "id": "add_save_1",
                    "state": [
                      {
                        "type": "component",
                        "valueName": "FORM_STATE",
                        "expression": [
                          {
                            "type": "property",
                            "name": "",
                            "matchValue": "insert",
                            "match": "eq"
                          }
                        ]
                      }
                    ]
                  },
                  {
                    "id": "edit_save_1",
                    "state": [
                      {
                        "type": "component",
                        "valueName": "FORM_STATE",
                        "expression": [
                          {
                            "type": "property",
                            "name": "",
                            "matchValue": "update",
                            "match": "eq"
                          }
                        ]
                      }

                    ]
                  }

                ],
                "ajaxConfig": [
                  {
                    "id": "add_save_1",
                    "url": "province/insert",
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
                      },
                      {
                        "name": "remark",
                        "type": "componentValue",
                        "valueName": "remark",
                        "dataType": "string"
                      }
                    ],
                    "outputParameters": [

                    ],
                    "result": [

                    ]
                  },
                  {
                    "id": "edit_save_1",
                    "url": "province/update",
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
                      },
                      {
                        "name": "remark",
                        "type": "componentValue",
                        "valueName": "remark",
                        "dataType": "string"
                      }
                    ],
                    "outputParameters": [

                    ],
                    "result": [

                    ]
                  }
                ],
                "builtinConfig": [
                  {
                    "id": "add_state_1",
                    event: "formStateChange", // 内置方法
                    state: "insert",
                  },
                  {
                    "id": "edit_state_1",
                    event: "formStateChange", // 内置方法
                    state: "update",
                  },
                  {
                    "id": "cancel_state_1",
                    event: "formStateChange", // 内置方法
                    state: "text",
                  },
                ],
                "beforeTrigger": [

                ],
                "afterTrigger": [
                  {
                    "id": "edit_save_1",
                    "senderId": "form_01",
                    "sendData": [
                      {
                        "beforeSend": [],
                        "reveicerId": "",
                        "receiverTriggerType": "BEHAVIOR",
                        "receiverTrigger": "REFRESH_AS_CHILD",
                        "params": [
                        ]
                      }
                    ]
                  }
                ],
                "toolbar": [
                  {
                    "targetViewId": "form_01",
                    "group": [

                      {
                        "id": "M_addRow",
                        "text": "新增",
                        "icon": "plus",
                        "color": "text-primary",
                        "hidden": false,
                        "disabled": false,
                        "state": "new",
                        "execute": [
                          {
                            "triggerType": "STATE",
                            "trigger": "ADD_FORM",
                            // "conditionId": "add_state_1"
                            "builtinId": "add_state_1"

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
                            },
                            {
                              "name": "cancel",
                              "value": false
                            },
                            {
                              "name": "new",
                              "value": true
                            },

                          ]
                        }
                      },
                      {
                        "id": "M_updateRow",
                        "text": "修改",
                        "icon": "edit",
                        "color": "text-success",
                        "hidden": false,
                        "disabled": false,
                        "state": "edit",
                        "execute": [
                          {
                            "triggerType": "STATE",
                            "trigger": "EDIT_FORM",
                            // "conditionId": "edit_state_1"
                            "builtinId": "edit_state_1"
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
                              "name": "new",
                              "value": true
                            },
                            {
                              "name": "text",
                              "value": false
                            },
                            {
                              "name": "cancel",
                              "value": false
                            }
                          ]
                        }
                      },
                      {
                        "id": "M_saveRow",
                        "text": "保存",
                        "icon": "save",
                        "color": "text-primary",
                        "hidden": true,
                        "disabled": false,
                        "execute": [ // 根据前置条件判断，当前 表单状态是什么，执行什么sql
                          {
                            "triggerType": "OPERATION",
                            "trigger": "EXECUTE",
                            "ajaxId": "add_save_1",
                            "stateId": "add_save_1",
                            "conditionId": "add_save_1"
                          },
                          {
                            "triggerType": "OPERATION",
                            "trigger": "EXECUTE",
                            "stateId": "edit_save_1",
                            "ajaxId": "edit_save_1",
                            "conditionId": "edit_save_1",
                            "afterId": "edit_save_1"
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
                              "name": "new",
                              "value": false
                            },
                            {
                              "name": "text",
                              "value": true
                            },
                            {
                              "name": "cancel",
                              "value": true
                            }
                          ]
                        }
                      },
                      {
                        "id": "M_cancelrow",
                        "text": "取消",
                        "triggerType": "STATE",
                        "trigger": "CANCEL",
                        "icon": "rollback",
                        "color": "text-grey-darker",
                        "hidden": true,
                        "disabled": null,
                        "execute": [
                          {
                            "triggerType": "STATE",
                            "trigger": "CANCEL",
                            "builtinId": "cancel_state_1"
                          }
                        ],
                        "state": "cancel",
                        "toggle": {
                          "type": "state",
                          "toggleProperty": "hidden",
                          "values": [
                            {
                              "name": "edit",
                              "value": false
                            },
                            {
                              "name": "new",
                              "value": false
                            },
                            {
                              "name": "text",
                              "value": true
                            },
                            {
                              "name": "cancel",
                              "value": true
                            }
                          ]
                        }
                      }
                    ]
                  }
                ]
              }
            },
            "size": { "nzXs": 24, "nzSm": 24, "nzMd": 24, "nzLg": 24, "ngXl": 24, "nzXXl": 24 },
            "component": {
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
                        "id": "iHspYn12", "col": "cc", "type": "col",
                        "title": "列iHspYn", "span": 24,
                        "layoutContain": "input",
                        "size": {
                          "nzXs": 24, "nzSm": 24, "nzMd": 24, "nzLg": 24, "ngXl": 24, "nzXXl": 24
                        },
                        "control": {
                          "id": "group"  // id 和引用id 值相同
                        }
                      },
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
                      {
                        "id": "ioj0mV", "col": "cc", "type": "col", "title": "列ioj0mV", "span": 24, "layoutContain": "select",
                        "size": {
                          "nzXs": 24, "nzSm": 24, "nzMd": 24, "nzLg": 24, "ngXl": 24, "nzXXl": 24
                        },
                        "control": { "id": "002" }
                      },
                      {
                        "id": "ioj0mV", "col": "cc", "type": "col", "title": "列ioj0mV", "span": 12, "layoutContain": "select",
                        "size": {
                          "nzXs": 12, "nzSm": 12, "nzMd": 12, "nzLg": 12, "ngXl": 12, "nzXXl": 12
                        },
                        "control": { "id": "003" }
                      },
                      {
                        "id": "ioj0mV", "col": "cc", "type": "col", "title": "列ioj0mV", "span": 12, "layoutContain": "select",
                        "size": {
                          "nzXs": 12, "nzSm": 12, "nzMd": 12, "nzLg": 12, "ngXl": 12, "nzXXl": 12
                        },
                        "control": { "id": "004" }
                      },
                      {
                        "id": "ioj0mV", "col": "cc", "type": "col", "title": "列ioj0mV", "span": 12, "layoutContain": "select",
                        "size": {
                          "nzXs": 12, "nzSm": 12, "nzMd": 12, "nzLg": 12, "ngXl": 12, "nzXXl": 12
                        },
                        "control": { "id": "006" }
                      },
                      {
                        "id": "ioj0mV", "col": "cc", "type": "col", "title": "列ioj0mV", "span": 12, "layoutContain": "select",
                        "size": {
                          "nzXs": 12, "nzSm": 12, "nzMd": 12, "nzLg": 12, "ngXl": 12, "nzXXl": 12
                        },
                        "control": { "id": "007" }
                      },
                      {
                        "id": "ioj0mV", "col": "cc", "type": "col", "title": "列ioj0mV", "span": 12, "layoutContain": "select",
                        "size": {
                          "nzXs": 12, "nzSm": 12, "nzMd": 12, "nzLg": 12, "ngXl": 12, "nzXXl": 12
                        },
                        "control": { "id": "107" }
                      },
                      {
                        "id": "ioj0mV", "col": "cc", "type": "col", "title": "列ioj0mV", "span": 12, "layoutContain": "select",
                        "size": {
                          "nzXs": 12, "nzSm": 12, "nzMd": 12, "nzLg": 12, "ngXl": 12, "nzXXl": 12
                        },
                        "control": { "id": "008" }
                      },
                      {
                        "id": "ioj0mV", "col": "cc", "type": "col", "title": "列ioj0mV", "span": 12, "layoutContain": "select",
                        "size": {
                          "nzXs": 12, "nzSm": 12, "nzMd": 12, "nzLg": 12, "ngXl": 12, "nzXXl": 12
                        },
                        "control": { "id": "009" }
                      },
                      {
                        "id": "ioj0mV", "col": "cc", "type": "col", "title": "列ioj0mV", "span": 24, "layoutContain": "select",
                        "size": {
                          "nzXs": 24, "nzSm": 24, "nzMd": 24, "nzLg": 24, "ngXl": 24, "nzXXl": 24
                        },
                        "control": { "id": "109" }
                      },
                      {
                        "id": "iHspYn12", "col": "cc", "type": "col",
                        "title": "列iHspYn", "span": 24,
                        "layoutContain": "input",
                        "size": {
                          "nzXs": 24, "nzSm": 24, "nzMd": 24, "nzLg": 24, "ngXl": 24, "nzXXl": 24
                        },
                        "control": {
                          "id": "group2"  // id 和引用id 值相同
                        }
                      },
                      {
                        "id": "ioj0mV", "col": "cc", "type": "col", "title": "列ioj0mV", "span": 12, "layoutContain": "select",
                        "size": {
                          "nzXs": 12, "nzSm": 12, "nzMd": 12, "nzLg": 12, "ngXl": 12, "nzXXl": 12
                        },
                        "control": { "id": "010" }
                      },
                      {
                        "id": "ioj0mV", "col": "cc", "type": "col", "title": "列ioj0mV", "span": 12, "layoutContain": "select",
                        "size": {
                          "nzXs": 12, "nzSm": 12, "nzMd": 12, "nzLg": 12, "ngXl": 12, "nzXXl": 12
                        },
                        "control": { "id": "011" }
                      },
                      {
                        "id": "ioj0mV", "col": "cc", "type": "col", "title": "列ioj0mV", "span": 12, "layoutContain": "select",
                        "size": {
                          "nzXs": 12, "nzSm": 12, "nzMd": 12, "nzLg": 12, "ngXl": 12, "nzXXl": 12
                        },
                        "control": { "id": "012" }
                      },
                      {
                        "id": "ioj0mV", "col": "cc", "type": "col", "title": "列ioj0mV", "span": 12, "layoutContain": "select",
                        "size": {
                          "nzXs": 12, "nzSm": 12, "nzMd": 12, "nzLg": 12, "ngXl": 12, "nzXXl": 12
                        },
                        "control": { "id": "013" }
                      },
                      {
                        "id": "ioj0mV", "col": "cc", "type": "col", "title": "列ioj0mV", "span": 12, "layoutContain": "select",
                        "size": {
                          "nzXs": 12, "nzSm": 12, "nzMd": 12, "nzLg": 12, "ngXl": 12, "nzXXl": 12
                        },
                        "control": { "id": "014" }
                      },
                      {
                        "id": "ioj0mV", "col": "cc", "type": "col", "title": "列ioj0mV", "span": 12, "layoutContain": "select",
                        "size": {
                          "nzXs": 12, "nzSm": 12, "nzMd": 12, "nzLg": 12, "ngXl": 12, "nzXXl": 12
                        },
                        "control": { "id": "015" }
                      },
                      {
                        "id": "ioj0mV1", "col": "cc", "type": "col", "title": "列ioj0mV", "span": 24, "layoutContain": "select",
                        "size": {
                          "nzXs": 24, "nzSm": 24, "nzMd": 24, "nzLg": 24, "ngXl": 24, "nzXXl": 24
                        },
                        "control": { "id": "0151" }
                      },
                      {
                        "id": "ioj0mV", "col": "cc", "type": "col", "title": "列ioj0mV", "span": 24, "layoutContain": "select",
                        "size": {
                          "nzXs": 24, "nzSm": 24, "nzMd": 24, "nzLg": 24, "ngXl": 24, "nzXXl": 24
                        },
                        "control": { "id": "016" }
                      },
                      {
                        "id": "ioj0mV", "col": "cc", "type": "col", "title": "列ioj0mV", "span": 24, "layoutContain": "select",
                        "size": {
                          "nzXs": 24, "nzSm": 24, "nzMd": 24, "nzLg": 24, "ngXl": 24, "nzXXl": 24
                        },
                        "control": { "id": "017" }
                      },


                    ]
                  }]
              },
              formControls: [
                {
                  id: 'group',
                  "hidden": false, // 字段是否隐藏
                  "title": '分组 1',  // lable 信息
                  "titleConfig": {
                    required: false
                  },
                  "field": "e",  // fromcontrol name  默认的字段
                  "labelSize": {
                    "span": 8,
                    "nzXs": { span: 7, offset: 0 },
                    "nzSm": { span: 7, offset: 0 },
                    "nzMd": { span: 7, offset: 0 },
                    "nzLg": { span: 7, offset: 0 },
                    "ngXl": { span: 7, offset: 0 },
                    "nzXXl": { span: 7, offset: 0 }
                  },  // 
                  "controlSize": {
                    "span": 16,
                    "nzXs": 16,
                    "nzSm": 16,
                    "nzMd": 16,
                    "nzLg": 16,
                    "ngXl": 16,
                    "nzXXl": 16
                  },
                  "state": "edit", // 当前组件默认状态 文本，编辑，或者由表单状态控制text、edit、form
                  "text": { // 文本展示字段
                    "type": 'group', // 什么组件展示文本 
                    "field": 'e',   // 字段
                  },
                  "edit": {
                    "type": 'group', // 什么组件展示文本 
                    "field": 'e',   // 字段
                  }
                },
                {
                  id: 'group2',
                  "hidden": false, // 字段是否隐藏
                  "title": '分组 2',  // lable 信息
                  "titleConfig": {
                    required: false
                  },
                  "field": "e",  // fromcontrol name  默认的字段
                  "labelSize": {
                    "span": 8,
                    "nzXs": { span: 7, offset: 0 },
                    "nzSm": { span: 7, offset: 0 },
                    "nzMd": { span: 7, offset: 0 },
                    "nzLg": { span: 7, offset: 0 },
                    "ngXl": { span: 7, offset: 0 },
                    "nzXXl": { span: 7, offset: 0 }
                  },  // 
                  "controlSize": {
                    "span": 16,
                    "nzXs": 16,
                    "nzSm": 16,
                    "nzMd": 16,
                    "nzLg": 16,
                    "ngXl": 16,
                    "nzXXl": 16
                  },
                  "state": "edit", // 当前组件默认状态 文本，编辑，或者由表单状态控制text、edit、form
                  "text": { // 文本展示字段
                    "type": 'group', // 什么组件展示文本 
                    "field": 'e',   // 字段
                  },
                  "edit": {
                    "type": 'group', // 什么组件展示文本 
                    "field": 'e',   // 字段
                  }
                },
                {
                  id: '001',
                  "hidden": true, // 字段是否隐藏
                  "title": '省名称',  // lable 信息
                  "titleConfig": {
                    required: true
                  },
                  "field": "provinceName",  // fromcontrol name  默认的字段
                  "labelSize": {
                    "span": 8,
                    "nzXs": { span: 7, offset: 1 },
                    "nzSm": { span: 7, offset: 1 },
                    "nzMd": { span: 7, offset: 1 },
                    "nzLg": { span: 7, offset: 1 },
                    "ngXl": { span: 7, offset: 1 },
                    "nzXXl": { span: 7, offset: 1 }
                  },  // 
                  "controlSize": {
                    "span": 16,
                    "nzXs": 16,
                    "nzSm": 16,
                    "nzMd": 16,
                    "nzLg": 16,
                    "ngXl": 16,
                    "nzXXl": 16
                  },
                  "state": "edit", // 当前组件默认状态 文本，编辑，或者由表单状态控制text、edit、form
                  "text": { // 文本展示字段
                    "type": 'label', // 什么组件展示文本 
                    "field": 'provinceName',   // 字段
                  },
                  "editor": {            // 编辑状态字段  日后扩充可为数组，满足条件下的组件变化
                    "type": "input",
                    "field": "provinceName",  // 编辑字段于定义字段一致 （此处定义于表格相反）
                    "placeholder": "请输入",
                    "validations": [  // 校验
                      { validator: "required", type: "default", "message": "请输入省名称" },
                      {
                        validator: "repeat", type: "custom", "message": "重复名称", data: {
                          type: 'value',
                          value: '中国香港'
                        }
                      },
                      {
                        validator: "repeat1", type: "custom", "message": "重复名称2", data: {
                          type: 'value',
                          value: '中国香港2'
                        }
                      },
                      {
                        validator: "userNameAsyncValidator", type: "custom", "message": "远程校验不合理", data: {
                          type: 'value',
                          value: '中国香港1'
                        },

                      }
                    ]
                  }
                },
                {
                  id: '002',
                  "hidden": true, // 字段是否隐藏
                  "title": '区号',  // lable 信息
                  "titleConfig": {
                    required: true
                  },
                  "field": "areaCode",  // fromcontrol name  默认的字段
                  "labelSize": {
                    "span": 8,
                    "nzXs": 8, "nzSm": 8, "nzMd": 8, "nzLg": 8, "ngXl": 8, "nzXXl": 8
                  },  // 
                  "controlSize": {
                    "span": 16,
                    "nzXs": { span: 8, offset: 0 },
                    "nzSm": { span: 8, offset: 0 },
                    "nzMd": { span: 8, offset: 0 },
                    "nzLg": { span: 8, offset: 0 },
                    "ngXl": { span: 8, offset: 0 },
                    "nzXXl": { span: 8, offset: 0 }
                  },
                  "state": "edit", // 当前组件默认状态 文本，编辑，或者由表单状态控制 text、edit、form
                  "text": { // 文本展示字段
                    "type": 'label', // 什么组件展示文本 
                    "field": 'areaCode',   // 字段
                  },
                  "editor": {            // 编辑状态字段  日后扩充可为数组，满足条件下的组件变化
                    "type": "input",
                    "field": "areaCode",  // 编辑字段于定义字段一致 （此处定义于表格相反）
                    "placeholder": "请输入",
                    "validations": [  // 校验
                      { validator: "required" }
                    ]
                  },
                  "editor1": {            // 编辑状态字段  日后扩充可为数组，满足条件下的组件变化
                    "type": "select",
                    "field": "areaCode",  // 编辑字段于定义字段一致 （此处定义于表格相反）
                    "placeholder": "请输入",
                    options: [
                      { label: '是', value: '1' },
                      { label: '否', value: '0' }
                    ],
                    labelName: 'provinceName',
                    valueName: 'id',
                    loadingConfig: {
                      id: "loadformselect1" // 将加载配置引用
                    },
                    "validate": {  // 校验

                    }
                  }
                },
                {
                  id: '003',
                  "hidden": true, // 字段是否隐藏
                  "title": '直属',  // lable 信息
                  "titleConfig": {
                    required: false
                  },
                  "field": "directlyUnder",  // fromcontrol name  默认的字段
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
                    "field": 'directlyUnder',   // 字段
                  },
                  "editor": {            // 编辑状态字段  日后扩充可为数组，满足条件下的组件变化
                    "type": "input",
                    "field": "directlyUnder",  // 编辑字段于定义字段一致 （此处定义于表格相反）
                    "placeholder": "请输入",
                    "validations": [  // 校验
                      { validator: "required" }
                    ]
                  },
                  "editor1": {            // 编辑状态字段  日后扩充可为数组，满足条件下的组件变化
                    "type": "select",
                    "field": "inputname3",  // 编辑字段于定义字段一致 （此处定义于表格相反）
                    "placeholder": "请输入",
                    options: [
                      { label: '是', value: '1' },
                      { label: '否', value: '0' }
                    ],
                    labelName: 'cityName',
                    valueName: 'id',
                    loadingConfig: {
                      id: "loadformselect2" // 将加载配置引用
                    },
                    "validate": {  // 校验

                    }
                  }
                },
                {
                  id: '004',
                  "hidden": true, // 字段是否隐藏
                  "title": '测试字段4',  // lable 信息
                  "titleConfig": {
                    required: false
                  },
                  "field": "inputname4",  // fromcontrol name  默认的字段
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
                    "field": 'inputname4',   // 字段
                  },
                  "editor": {            // 编辑状态字段  日后扩充可为数组，满足条件下的组件变化
                    "type": "select",
                    "field": "inputname4",  // 编辑字段于定义字段一致 （此处定义于表格相反）
                    "placeholder": "请输入",
                    options: [
                      { label: '好人', value: '1' },
                      { label: '坏人', value: '2' }
                    ],
                    "validations": [  // 校验
                      { validator: "required" }
                    ]
                  }
                },
                {
                  id: '005',
                  "hidden": true, // 字段是否隐藏
                  "title": '测试字段5',  // lable 信息
                  "titleConfig": {
                    required: false
                  },
                  "field": "id",  // fromcontrol name  默认的字段
                  "labelSize": {
                    "span": 8,
                    "nzXs": 24, "nzSm": 24, "nzMd": 24, "nzLg": 24, "ngXl": 24, "nzXXl": 24
                  },  // 
                  "controlSize": {
                    "span": 16,
                    "nzXs": 24, "nzSm": 24, "nzMd": 24, "nzLg": 24, "ngXl": 24, "nzXXl": 24
                  },
                  "state": "text", // 当前组件默认状态 文本，编辑，或者由表单状态控制 text、edit、form
                  "text": { // 文本展示字段
                    "type": 'label', // 什么组件展示文本 
                    "field": 'id',   // 字段
                  },
                  "editor": {            // 编辑状态字段  日后扩充可为数组，满足条件下的组件变化
                    "type": "input",
                    "field": "id",  // 编辑字段于定义字段一致 （此处定义于表格相反）
                    "placeholder": "请输入",
                    "validate": {  // 校验

                    }
                  }
                },
                {
                  id: '006',
                  "hidden": true, // 字段是否隐藏
                  "title": '优势',  // lable 信息
                  "titleConfig": {
                    required: false
                  },
                  "field": "remark1",  // fromcontrol name  默认的字段
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
                    "field": 'remark1',   // 字段
                  },
                  "editor": {            // 编辑状态字段  日后扩充可为数组，满足条件下的组件变化
                    "type": "selectMultiple",
                    "field": "remark1",  // 编辑字段于定义字段一致 （此处定义于表格相反）
                    "placeholder": "请输入",
                    options: [
                      { label: '环境好', value: '1' },
                      { label: '高新产业多', value: '2' },
                      { label: '高校多', value: '3' },
                      { label: '交通便捷', value: '4' },
                    ],
                    "validations": [  // 校验
                      { validator: "required" }
                    ]
                  }
                },
                {
                  id: '007',
                  "hidden": true, // 字段是否隐藏
                  "title": '创建时间',  // lable 信息
                  "titleConfig": {
                    required: false
                  },
                  "field": "createDate",  // fromcontrol name  默认的字段
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
                    "field": 'createDate',   // 字段
                  },
                  "editor": {            // 编辑状态字段  日后扩充可为数组，满足条件下的组件变化
                    "type": "datePicker",
                    "field": "createDate",  // 编辑字段于定义字段一致 （此处定义于表格相反）
                    "placeholder": "请输入",

                    "validations": [  // 校验
                      { validator: "required" }
                    ]
                  }
                },
                {
                  id: '107',
                  "hidden": true, // 字段是否隐藏
                  "title": '创建年',  // lable 信息
                  "titleConfig": {
                    required: false
                  },
                  "field": "createDateyearPicker",  // fromcontrol name  默认的字段
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
                    "field": 'createDateyearPicker',   // 字段
                  },
                  "editor": {            // 编辑状态字段  日后扩充可为数组，满足条件下的组件变化
                    "type": "yearPicker",
                    "field": "createDateyearPicker",  // 编辑字段于定义字段一致 （此处定义于表格相反）
                    "placeholder": "请输入",

                    "validations": [  // 校验
                      { validator: "required" }
                    ]
                  }
                },
                {
                  id: '008',
                  "hidden": true, // 字段是否隐藏
                  "title": '创建周',  // lable 信息
                  "titleConfig": {
                    required: false
                  },
                  "field": "remark",  // fromcontrol name  默认的字段
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
                    "field": 'remark',   // 字段
                  },
                  "editor": {            // 编辑状态字段  日后扩充可为数组，满足条件下的组件变化
                    "type": "weekPicke",
                    "field": "remark",  // 编辑字段于定义字段一致 （此处定义于表格相反）
                    "placeholder": "请输入",

                    "validations": [  // 校验
                      { validator: "required" }
                    ]
                  }
                },
                {
                  id: '009',
                  "hidden": true, // 字段是否隐藏
                  "title": '创建月',  // lable 信息
                  "titleConfig": {
                    required: false
                  },
                  "field": "remark4",  // fromcontrol name  默认的字段
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
                    "field": 'remark4',   // 字段
                  },
                  "editor": {            // 编辑状态字段  日后扩充可为数组，满足条件下的组件变化
                    "type": "monthPicker",
                    "field": "remark4",  // 编辑字段于定义字段一致 （此处定义于表格相反）
                    "placeholder": "请输入",

                    "validations": [  // 校验
                      { validator: "required" }
                    ]
                  }
                },
                {
                  id: '109',
                  "hidden": true, // 字段是否隐藏
                  "title": '时间范围',  // lable 信息
                  "titleConfig": {
                    required: false
                  },
                  "field": "remarkrangePicker",  // fromcontrol name  默认的字段
                  "labelSize": {
                    "span": 4,
                    "nzXs": 4, "nzSm": 4, "nzMd": 4, "nzLg": 4, "ngXl": 4, "nzXXl": 8
                  },  // 
                  "controlSize": {
                    "span": 20,
                    "nzXs": { span: 20, offset: 0 },
                    "nzSm": { span: 20, offset: 0 },
                    "nzMd": { span: 20, offset: 0 },
                    "nzLg": { span: 20, offset: 0 },
                    "ngXl": { span: 20, offset: 0 },
                    "nzXXl": { span: 20, offset: 0 }
                  },
                  "state": "edit", // 当前组件默认状态 文本，编辑，或者由表单状态控制 text、edit、form
                  "text": { // 文本展示字段
                    "type": 'label', // 什么组件展示文本 
                    "field": 'remarkrangePicker',   // 字段
                  },
                  "editor": {            // 编辑状态字段  日后扩充可为数组，满足条件下的组件变化
                    "type": "rangePicker",
                    "field": "remarkrangePicker",  // 编辑字段于定义字段一致 （此处定义于表格相反）
                    "placeholder": "请输入",

                    "validations": [  // 校验
                      { validator: "required" }
                    ]
                  }
                },
                {
                  id: '010',
                  "hidden": true, // 字段是否隐藏
                  "title": '开关',  // lable 信息
                  "titleConfig": {
                    required: false
                  },
                  "field": "remark10",  // fromcontrol name  默认的字段
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
                    "field": 'remark10',   // 字段
                  },
                  "editor": {            // 编辑状态字段  日后扩充可为数组，满足条件下的组件变化
                    "type": "switch",
                    "field": "remark10",  // 编辑字段于定义字段一致 （此处定义于表格相反）
                    "placeholder": "请输入",
                    "options":[
                      {"type":"check","lable":"是","value":"是"},
                      {"type":"close","lable":"否","value":"否"}
                   ],
                    "validations": [  // 校验
                      { validator: "required" }
                    ]
                  }
                },
                {
                  id: '011',
                  "hidden": true, // 字段是否隐藏
                  "title": '单选',  // lable 信息
                  "titleConfig": {
                    required: false
                  },
                  "field": "remark11",  // fromcontrol name  默认的字段
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
                    "field": 'remark11',   // 字段
                  },
                  "editor": {            // 编辑状态字段  日后扩充可为数组，满足条件下的组件变化
                    "type": "radio",
                    "field": "remark11",  // 编辑字段于定义字段一致 （此处定义于表格相反）
                    "placeholder": "请输入",
                    valueName: "value",
                    labelName: "label",
                    options: [
                      { label: '环境好', value: '1' },
                      { label: '高新产业多', value: '2' },
                      { label: '高校多', value: '3' },
                      { label: '交通便捷', value: '4' },
                    ],
                    "validations": [  // 校验
                      { validator: "required" }
                    ]
                  }
                },
                {
                  id: '012',
                  "hidden": true, // 字段是否隐藏
                  "title": '多选',  // lable 信息
                  "titleConfig": {
                    required: false
                  },
                  "field": "remark12",  // fromcontrol name  默认的字段
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
                    "field": 'remark12',   // 字段
                  },
                  "editor": {            // 编辑状态字段  日后扩充可为数组，满足条件下的组件变化
                    "type": "checkbox",
                    "field": "remark12",  // 编辑字段于定义字段一致 （此处定义于表格相反）
                    "placeholder": "请输入",
                    "displayMode": "wrapper", // group wrapper
                    "span": 24,
                    valueName: "value",
                    labelName: "label",
                    options: [
                      { label: '环境好', value: '1' },
                      { label: '高新产业多', value: '2' },
                      { label: '高校多', value: '3' },
                      { label: '交通便捷', value: '4' },
                    ],
                    "validations": [  // 校验
                      { validator: "required" }
                    ]
                  }
                },
                {
                  id: '013',
                  "hidden": true, // 字段是否隐藏
                  "title": '下拉树',  // lable 信息
                  "titleConfig": {
                    required: false
                  },
                  "field": "remark13",  // fromcontrol name  默认的字段
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
                    "field": 'remark13',   // 字段
                  },
                  "editor": {            // 编辑状态字段  日后扩充可为数组，满足条件下的组件变化
                    "type": "treeSelect",
                    "field": "remark13",  // 编辑字段于定义字段一致 （此处定义于表格相反）
                    "placeholder": "请输入",
                    "loadingItemConfig1": {  // loadingItemConfig 逆向获取值
                      id: "loadformtreeItem"
                    },
                    loadingConfig: {
                      id: "loadformtree" // 将加载配置引用
                    },
                    expandConfig: {
                      id: "loadformtreeexpand"
                    },
                    loadingItemConfig: {
                      id: "loadformtreeitem" // 将加载配置引用
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
                        "title": "NAME",
                        "type": "title",
                        "field": "NAME"
                      }
                    ],
                    "validations": [  // 校验
                      { validator: "required" }
                    ]
                  }
                },
                {
                  id: '014',
                  "hidden": true, // 字段是否隐藏
                  "title": '下拉表格',  // lable 信息
                  "titleConfig": {
                    required: false
                  },
                  "field": "remark14",  // fromcontrol name  默认的字段
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
                    "field": 'remark14',   // 字段
                  },
                  "editor": {            // 编辑状态字段  日后扩充可为数组，满足条件下的组件变化
                    "type": "input", // gridSelect
                    "field": "remark14",  // 编辑字段于定义字段一致 （此处定义于表格相反）
                    "placeholder": "请输入",
                    "loadingItemConfig": {  // loadingItemConfig 逆向获取值
                      id: "loadformgrid"
                    },
                    labelName: 'provinceName',
                    valueName: 'id',
                    "validations": [  // 校验
                      { validator: "required" }
                    ]
                  }
                },
                {
                  id: '015',
                  "hidden": true, // 字段是否隐藏
                  "title": '自定义组件单选',  // lable 信息
                  "titleConfig": {
                    required: false
                  },
                  "field": "remark15",  // fromcontrol name  默认的字段
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
                    "field": 'remark15',   // 字段
                  },
                  "editor1": {            // 编辑状态字段  日后扩充可为数组，满足条件下的组件变化
                    "type": "customSelect",
                    "field": "remark15",  // 编辑字段于定义字段一致 （此处定义于表格相反）
                    "placeholder": "请输入",

                    labelName: 'OFFICENAME',
                    valueName: 'ID',
                    loadingItemConfig: {
                      id: "loadformcustom" // 将加载配置引用
                    },
                    "validations": [  // 校验
                      { validator: "required" }
                    ]
                  },
                  "editor": {            // 编辑状态字段  日后扩充可为数组，满足条件下的组件变化
                    "type": "customSelect",
                    "field": "remark15",  // 编辑字段于定义字段一致 （此处定义于表格相反）
                    "placeholder": "请输入",

                    
                    labelName: 'UNITNAME',
                    valueName: 'ID',
                    layoutName:"YeWuNswtNoIUFej5TzpLyWEckmnYHMA1", // 自定义页面标识（子页面id）
                    targetValue:"tag_SBAxdPtAm5Gbzipe3DFRjhbtRcysySoIrlG5C",      // 自定义页面里的承载tag标识
                    model:"single",  //  multiple 多选，single  默认单选
                    loadingItemConfig: {
                      id: "loadformcustom1" // 将加载配置引用
                    },

       
                    "validations": [  // 校验
                      { validator: "required" }
                    ]
                  }
                },
                {
                  id: '0151',
                  "hidden": true, // 字段是否隐藏
                  "title": '自定义组件多选',  // lable 信息
                  "titleConfig": {
                    required: false
                  },
                  "field": "remark151",  // fromcontrol name  默认的字段
                  "labelSize": {
                    "span": 4,
                    "nzXs": 4, "nzSm": 4, "nzMd": 4, "nzLg": 4, "ngXl": 4, "nzXXl": 4
                  },  // 
                  "controlSize": {
                    "span": 20,
                    "nzXs": { span: 20, offset: 0 },
                    "nzSm": { span: 20, offset: 0 },
                    "nzMd": { span: 20, offset: 0 },
                    "nzLg": { span: 20, offset: 0 },
                    "ngXl": { span: 20, offset: 0 },
                    "nzXXl": { span: 20, offset: 0 }
                  },
                  "state": "edit", // 当前组件默认状态 文本，编辑，或者由表单状态控制 text、edit、form
                  "text": { // 文本展示字段
                    "type": 'label', // 什么组件展示文本 
                    "field": 'remark151',   // 字段
                  },
                  "editor": {            // 编辑状态字段  日后扩充可为数组，满足条件下的组件变化
                    "type": "customSelect",
                    "field": "remark151",  // 编辑字段于定义字段一致 （此处定义于表格相反）
                    "placeholder": "请输入",
                    readonly:true,
                    labelName: 'UNITNAME',
                    valueName: 'ID',
                    layoutName:"xjdKJcJoSqXHOnuIbWziw4yD1NQVAGWs", // 自定义页面标识（子页面id）
                    targetValue:"tag_BAxdPtAm5Gbzipe3DFRjhbtRcysySoIrlG5C",      // 自定义页面里的承载tag标识
                    model:"multiple",  //  multiple 多选，single  默认单选
                    loadingItemConfig: {
                      id: "loadformcustom1" // 将加载配置引用
                    },
                    "validations": [  // 校验
                      { validator: "required" }
                    ]
                  }
                },
                {
                  id: '016',
                  "hidden": true, // 字段是否隐藏
                  "title": '大文本',  // lable 信息
                  "titleConfig": {
                    required: false
                  },
                  "field": "remark16",  // fromcontrol name  默认的字段
                  "labelSize": {
                    "span": 4,
                    "nzXs": 4, "nzSm": 4, "nzMd": 4, "nzLg": 4, "ngXl": 4, "nzXXl": 4
                  },  // 
                  "controlSize": {
                    "span": 20,
                    "nzXs": { span: 20, offset: 0 },
                    "nzSm": { span: 20, offset: 0 },
                    "nzMd": { span: 20, offset: 0 },
                    "nzLg": { span: 20, offset: 0 },
                    "ngXl": { span: 20, offset: 0 },
                    "nzXXl": { span: 20, offset: 0 }
                  },
                  "state": "edit", // 当前组件默认状态 文本，编辑，或者由表单状态控制 text、edit、form
                  "text": { // 文本展示字段
                    "type": 'label', // 什么组件展示文本 
                    "field": 'remark16',   // 字段
                  },
                  "editor": {            // 编辑状态字段  日后扩充可为数组，满足条件下的组件变化
                    "type": "textarea",
                    "field": "remark16",  // 编辑字段于定义字段一致 （此处定义于表格相反）
                    "placeholder": "请输入",
                    "autosize": {
                      minRows: 2, maxRows: 6
                    },
                    "validations": [  // 校验
                      { validator: "required" }
                    ]
                  }
                },
                {
                  id: '017',
                  "hidden": true, // 字段是否隐藏
                  "title": 'sql',  // lable 信息
                  "titleConfig": {
                    required: false
                  },
                  "field": "remark17",  // fromcontrol name  默认的字段
                  "labelSize": {
                    "span": 4,
                    "nzXs": 4, "nzSm": 4, "nzMd": 4, "nzLg": 4, "ngXl": 4, "nzXXl": 4
                  },  // 
                  "controlSize": {
                    "span": 20,
                    "nzXs": { span: 20, offset: 0 },
                    "nzSm": { span: 20, offset: 0 },
                    "nzMd": { span: 20, offset: 0 },
                    "nzLg": { span: 20, offset: 0 },
                    "ngXl": { span: 20, offset: 0 },
                    "nzXXl": { span: 20, offset: 0 }
                  },
                  "state": "edit", // 当前组件默认状态 文本，编辑，或者由表单状态控制 text、edit、form
                  "text": { // 文本展示字段
                    "type": "codeEdit",
                    "field": "remark17",  // 编辑字段于定义字段一致 （此处定义于表格相反）
                    "mode": "text/x-sql",
                    "autofocus": false,
                    "readOnly": true,
                    "placeholder": "请输入",
                    "autosize": {
                      minRows: 2, maxRows: 6
                    },
                    "validations": [  // 校验
                      { validator: "required" }
                    ]
                  },
                  "editor": {            // 编辑状态字段  日后扩充可为数组，满足条件下的组件变化
                    "type": "codeEdit",
                    "field": "remark17",  // 编辑字段于定义字段一致 （此处定义于表格相反）
                    "mode": "text/x-sql",
                    "placeholder": "请输入",
                    "autofocus": true,
                    "readOnly": false,
                    "height": 800,
                    "autosize": {
                      minRows: 2, maxRows: 6
                    },
                    "validations": [  // 校验
                      { validator: "required" }
                    ]
                  }
                },





                // transfer: CnFormTransferComponent,
                // gridSelect:CnFormGridSelectComponent,
                // textarea: CnFormTextareaComponent,

              ],
              formControlsPermissions: [ // 初始表单字段，描述 新增、编辑、查看 状态下的文本
                {
                  formState: "insert", // 新增状态下的Controls 展示与否，是否读写属性设置
                  formStateContent: { // 对当前状态的描述 ，描述当前状态下 表单组件 具备的行为，例如是否自加载，是否启用默认值
                    isLoad: false,
                    loadAjax: {}, // 如果启用load，是否用新的加载地址
                    isDefault: true
                  },
                  Controls: [
                    { id: 'group', state: "edit", hidden: false, readOnly: false },
                    { id: 'group2', state: "edit", hidden: false, readOnly: false },
                    { id: '001', state: "edit", hidden: false, readOnly: false },
                    { id: '002', state: "edit", hidden: false, readOnly: false },
                    { id: '003', state: "edit", hidden: false, readOnly: false },
                    { id: '004', state: "edit", hidden: false, readOnly: false },
                    { id: '005', state: "edit", hidden: false, readOnly: false },
                    { id: '006', state: "edit", hidden: false, readOnly: false },
                    { id: '017', state: "edit", hidden: false, readOnly: false },
                  ]
                },
                {
                  formState: "update",
                  Controls: [
                    { id: 'group2', state: "edit", hidden: false, readOnly: false },
                    { id: 'group', state: "edit", hidden: false, readOnly: false },
                    { id: '001', state: "edit", hidden: false, readOnly: false },
                    { id: '002', state: "edit", hidden: false, readOnly: false },
                    { id: '003', state: "edit", hidden: false, readOnly: false },
                    { id: '004', state: "edit", hidden: false, readOnly: false },
                    { id: '005', state: "edit", hidden: false, readOnly: false },
                    { id: '006', state: "edit", hidden: false, readOnly: false },
                    { id: '017', state: "edit", hidden: false, readOnly: false }
                  ]
                },
                {
                  formState: "text",
                  Controls: [
                    { id: 'group2', state: "text", hidden: false, readOnly: false },
                    { id: 'group', state: "text", hidden: false, readOnly: false },
                    { id: '001', state: "text", hidden: false, readOnly: false },
                    { id: '002', state: "text", hidden: false, readOnly: false },
                    { id: '003', state: "text", hidden: false, readOnly: false },
                    { id: '004', state: "text", hidden: false, readOnly: false },
                    { id: '005', state: "text", hidden: false, readOnly: false },
                    { id: '006', state: "text", hidden: false, readOnly: false },
                    { id: '017', state: "text", hidden: false, readOnly: false }
                  ]
                }

              ],
              ajaxConfig: [
                {
                  "id": "loadform",
                  "url": "resource/PROVINCE/query",
                  "urlType": "inner",
                  "ajaxType": "get",
                  "params": [
                    {
                      "name": "id",
                      "type": "tempValue",
                      "valueName": "_PID"
                    }
                  ],
                  "outputParameters": [

                  ],
                  "result": [  // 描述 表单接收参数，将返回的哪些值赋给相应的组件属性

                  ]
                },
                {
                  "id": "loadformselect1",
                  "url": "resource/PROVINCE/query",
                  "urlType": "inner",
                  "ajaxType": "get",
                  "params": [


                  ],
                  "outputParameters": [

                  ],
                  "result": [  // 描述 表单接收参数，将返回的哪些值赋给相应的组件属性

                  ]
                },
                {
                  "id": "loadformselect2_2",
                  "url": "resource/PROVINCE/query",
                  "urlType": "inner",
                  "ajaxType": "get",
                  "params": [

                    {
                      "name": "pId",
                      "type": "value",
                      "value": "1"
                    }
                  ],
                  "outputParameters": [

                  ],
                  "result": [  // 描述 表单接收参数，将返回的哪些值赋给相应的组件属性

                  ]
                },
                {
                  "id": "loadformselect2",
                  "url": "resource/PROVINCE/query",
                  "urlType": "inner",
                  "ajaxType": "get",
                  "params": [

                    {
                      "name": "pId",
                      "type": "cascadeValue",
                      "valueName": "PROVINCEID",
                      "value": "2"
                    }
                  ],
                  "outputParameters": [

                  ],
                  "result": [  // 描述 表单接收参数，将返回的哪些值赋给相应的组件属性

                  ]
                },
                {
                  "id": "loadformtree",
                  "url": "resource/PROVINCE/query",
                  "urlType": "inner",
                  "ajaxType": "get",
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
                {
                  id: "loadformtreeexpand",
                  "url": "resource/PROVINCE/query",
                  "urlType": "inner",
                  "ajaxType": "get",
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
                {
                  "id": "loadformtreeitem",
                  "url": "resource/PROVINCE/query",
                  "urlType": "inner",
                  "ajaxType": "get",
                  "params": [
                    {
                      "name": "ID",
                      "type": "componentValue",
                      "valueName": "value"
                    }
                  ],
                },
                {
                  "id": "loadformgrid",
                  "url": "information/selectAllByProvinceId",
                  "urlType": "inner",
                  "ajaxType": "get",
                  "params": [
                    {
                      "name": "id",
                      "type": "componentValue",
                      "valueName": "value"
                    }
                  ],
                  "outputParameters": [

                  ],
                  "result": [  // 描述 表单接收参数，将返回的哪些值赋给相应的组件属性

                  ]
                },
                {
                  "id": "loadformcustom",
                  "url": "resource/PROVINCE/query",
                  "urlType": "inner",
                  "ajaxType": "get",
                  "params": [
                    {
                      "name": "ID",
                      "type": "componentValue",
                      "valueName": "value"
                    }
                  ],
                },
                {
                  "id": "loadformcustom1",
                  "url": "resource/GET_UNIT_LIST/query",
                  "urlType": "inner",
                  "ajaxType": "get",
                  "params": [
                    {
                      "name": "ID",
                      "conditionType":"in",
                      "type": "componentValue",
                      "valueName": "value"
                    }
                  ],
                }



              ],
              cascade: {
                "messageReceiver": [
                  {
                    "id": "",
                    "senderId": "view_01",
                    "receiveData": [
                      {
                        "beforeReceive": [],
                        "triggerType": "BEHAVIOR",
                        "trigger": "REFRESH_AS_CHILD",
                        "params": [
                          {
                            "pname": "_PID",
                            "cname": "_PID",
                            "valueTo": "tempValue"
                          }
                        ]
                      }
                    ]
                  }
                ]
              },
              cascadeValue: [ // 值级联配置
                {
                  "type": '值变化',
                  "controlId": '002', //  大的control标识，级联内部
                  "name": 'inputname2',
                  "CascadeObjects": [
                    {
                      "controlId": '003',
                      "cascadeName": 'inputname3',
                      "cascadeItems": [  // 根据值执行
                        {
                          "type": 'default',  // conditions   default  满足条件执行或者默认都执行
                          "caseValue": {    // 条件描述 （触发级联的前置条件，如果不设置，则是满足）
                            "type": 'selectObjectValue',
                            "valueName": 'num',
                            "regular": '^0$'
                          },
                          "content": {  // 应答体描述
                            "type": 'ajax', // 应答类型（异步、消息、赋值、隐藏、显示...）
                            "data": {
                              "option": [
                                { "name": 'PROVINCEID', "type": 'selectObjectValue', "value": '1', "valueName": 'id' }
                              ]
                            }
                          }
                        }

                      ]
                    }
                  ]
                }
              ]
            }
          }],
        id: "3vlDRq",
        type: "row"
      }
    ]
  };

}
