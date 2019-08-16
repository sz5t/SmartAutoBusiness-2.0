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

  public config = {
    state: 'insert',
    toolbar: [
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
                "conditionId": "add_state_1"
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
            "state": "edit",
            "execute": [
              {
                "triggerType": "STATE",
                "trigger": "EDIT_ROW",
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
                "trigger": "SAVE_ROW",
                "ajaxId": "add_save_1",
                "stateId": "add_save_1",
                "conditionId": "add_save_1"
              },
              {
                "triggerType": "OPERATION",
                "trigger": "EDIT_ROW",
                "stateId": "edit_save_1",
                "ajaxId": "edit_save_1",
                "conditionId": "edit_save_1"
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
                "trigger": "CANCEL"
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
    ],
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
            }
          ]
        }]
    },
    formControls: [
      {
        id: '001',
        "hidden": true, // 字段是否隐藏
        "title": '测试字段1',  // lable 信息
        "field": "code",  // fromcontrol name  默认的字段
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
          "field": 'code',   // 字段
        },
        "editor": {            // 编辑状态字段  日后扩充可为数组，满足条件下的组件变化
          "type": "input",
          "field": "code",  // 编辑字段于定义字段一致 （此处定义于表格相反）
          "placeholder": "请输入",
          "validate": {  // 校验

          }
        }
      },
      {
        id: '002',
        "hidden": true, // 字段是否隐藏
        "title": '省',  // lable 信息
        "field": "inputname2",  // fromcontrol name  默认的字段
        "labelSize": {
          "span": 8,
          "nzXs": 8, "nzSm": 8, "nzMd": 8, "nzLg": 8, "ngXl": 8, "nzXXl": 8
        },  // 
        "controlSize": {
          "span": 16,
          "nzXs": { span: 8, offset: 8 },
          "nzSm": { span: 8, offset: 8 },
          "nzMd": { span: 8, offset: 8 },
          "nzLg": { span: 8, offset: 8 },
          "ngXl": { span: 8, offset: 8 },
          "nzXXl": { span: 8, offset: 8 }
        },
        "state": "edit", // 当前组件默认状态 文本，编辑，或者由表单状态控制 text、edit、form
        "text": { // 文本展示字段
          "type": 'label', // 什么组件展示文本 
          "field": 'inputname2',   // 字段
        },
        "editor": {            // 编辑状态字段  日后扩充可为数组，满足条件下的组件变化
          "type": "select",
          "field": "inputname2",  // 编辑字段于定义字段一致 （此处定义于表格相反）
          "placeholder": "请输入",
          options: [
            { label: '是', value: '1' },
            { label: '否', value: '0' }
          ],
          labelName: 'PROVINCENAME',
          valueName: 'ID',
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
        "title": '市',  // lable 信息
        "field": "inputname3",  // fromcontrol name  默认的字段
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
          "field": 'inputname3',   // 字段
        },
        "editor": {            // 编辑状态字段  日后扩充可为数组，满足条件下的组件变化
          "type": "select",
          "field": "inputname3",  // 编辑字段于定义字段一致 （此处定义于表格相反）
          "placeholder": "请输入",
          options: [
            { label: '是', value: '1' },
            { label: '否', value: '0' }
          ],
          labelName: 'CITYNAME',
          valueName: 'ID',
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
            { label: '坏人', value: '0' }
          ],
          "validate": {  // 校验

          }
        }
      },
      {
        id: '005',
        "hidden": true, // 字段是否隐藏
        "title": '测试字段5',  // lable 信息
        "field": "inputname5",  // fromcontrol name  默认的字段
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
          "field": 'inputname5',   // 字段
        },
        "editor": {            // 编辑状态字段  日后扩充可为数组，满足条件下的组件变化
          "type": "input",
          "field": "inputname5",  // 编辑字段于定义字段一致 （此处定义于表格相反）
          "placeholder": "请输入",
          "validate": {  // 校验

          }
        }
      }
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
          { id: '001', state: "edit", hidden: false, readOnly: false },
          { id: '002', state: "edit", hidden: false, readOnly: false },
          { id: '003', state: "edit", hidden: false, readOnly: false },
          { id: '004', state: "edit", hidden: false, readOnly: false },
          { id: '005', state: "edit", hidden: false, readOnly: false }
        ]
      },
      {
        formState: "update",
        Controls: [
          { id: '001', state: "edit", hidden: false, readOnly: false },
          { id: '002', state: "edit", hidden: false, readOnly: false },
          { id: '003', state: "edit", hidden: false, readOnly: false },
          { id: '004', state: "edit", hidden: false, readOnly: false },
          { id: '005', state: "edit", hidden: false, readOnly: false }
        ]
      },
      {
        formState: "text",
        Controls: [
          { id: '001', state: "text", hidden: false, readOnly: false },
          { id: '002', state: "text", hidden: false, readOnly: false },
          { id: '003', state: "text", hidden: false, readOnly: false },
          { id: '004', state: "text", hidden: false, readOnly: false },
          { id: '005', state: "text", hidden: false, readOnly: false }
        ]
      }

    ],
    ajaxConfig: [
      {
        "id": "loadform",
        "url": "information/testList",
        "urlType": "inner",
        "ajaxType": "get",
        "params": [
          {
            "name": "state",
            "type": "value",
            "value": "D"
          }
        ],
        "outputParameters": [

        ],
        "result": [  // 描述 表单接收参数，将返回的哪些值赋给相应的组件属性

        ]
      },
      {
        "id": "loadformselect1",
        "url": "information/selectAllProvinceWithCity",
        "urlType": "inner",
        "ajaxType": "get",
        "params": [
          {
            "name": "state",
            "type": "value",
            "value": "D"
          }

        ],
        "outputParameters": [

        ],
        "result": [  // 描述 表单接收参数，将返回的哪些值赋给相应的组件属性

        ]
      },
      {
        "id": "loadformselect2_2",
        "url": "information/ssld",
        "urlType": "inner",
        "ajaxType": "get",
        "params": [
          {
            "name": "state",
            "type": "value",
            "value": "D"
          },
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
        "url": "information/selectCityByPid",
        "urlType": "inner",
        "ajaxType": "get",
        "params": [
          {
            "name": "state",
            "type": "value",
            "value": "D"
          },
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
      }



    ],
    cascade: {
      "messageSender": [
        {
          "id": "toolbar_01",
          "senderId": "view_01",
          "triggerType": "OPERATION",
          "trigger": "EXECUTE_CHECKED_ROWS",
          "triggerMoment": "after",
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
                      { "name": 'PROVINCEID', "type": 'selectObjectValue', "value": '1', "valueName": 'ID' }
                    ]
                  }
                }
              }

            ]
          }
        ]
      },
      {
        "type": '值变化',
        "controlId": '003',
        "name": 'inputname3',
        "CascadeObjects": [
          {
            "controlId": '004',
            "cascadeName": 'inputname4',
            "cascadeItems": [  // 根据值执行
              {
                "type": 'default',  // conditions   default  满足条件执行或者默认都执行
                "caseValue": {    // 条件描述 （触发级联的前置条件，如果不设置，则是满足）
                  "type": 'selectObjectValue',
                  "valueName": 'num',
                  "regular": '^0$'
                },
                "content": {  // 应答体描述
                  "type": 'message', // 应答类型（异步、消息、赋值、隐藏、显示...）
                  "data": {
                    "option": [
                      {
                        "messageType": 'warning',
                        "type": 'selectObjectValue',
                        "valueName": 'msg'
                      }
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


  public formconfig = {
    "id": "CKC23J",
    "type": "layout",
    "title": "布局CKC23J",
    "container": "rows",
    "rows": [
      {
        "cols": [
          {
            "id": "lsWPaU",
            "col": "cc",
            "type": "col", "titlestate": 1, "title": "列lsWPaU", "span": 24,
            "container": "component",
            "size": { "nzXs": 24, "nzSm": 24, "nzMd": 24, "nzLg": 24, "ngXl": 24, "nzXXl": 24 },
            "component": {
              "id": "toolbar_001",
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
                  "id": "edit_save_1",
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
                }

              ],
              "ajaxConfig": [
                {
                  "id": "add_save_1",
                  "url": "information/test2",
                  "urlType": "inner",
                  "ajaxType": "post",
                  "params": [
                    {
                      "name": "state",
                      "type": "value",
                      "value": "DVM"
                    }
                  ],
                  "outputParameters": [

                  ],
                  "result": [
                    {
                      "name": "data",
                      "showMessageWithNext": 0,
                      "message": "message.ajax.state.success",
                      "senderId": "toolbar_01"
                    },
                    {
                      "name": "validation",
                      "senderId": "toolbar_01"
                    },
                    {
                      "name": "error",
                      "senderId": "toolbar_01"
                    }
                  ]
                },
                {
                  "id": "edit_save_1",
                  "url": "information/test2",
                  "urlType": "inner",
                  "ajaxType": "put",
                  "params": [
                    {
                      "name": "state",
                      "type": "value",
                      "value": "DVM"
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
                  event:"changeState", // 内置方法
                  "url": "information/test2",
                  "urlType": "inner",
                  "ajaxType": "post",
                  "params": [
                    {
                      "name": "state",
                      "type": "value",
                      "value": "DVM"
                    }
                  ],
                  "outputParameters": [

                  ],
                  "result": [
                    {
                      "name": "data",
                      "showMessageWithNext": 0,
                      "message": "message.ajax.state.success",
                      "senderId": "toolbar_01"
                    },
                    {
                      "name": "validation",
                      "senderId": "toolbar_01"
                    },
                    {
                      "name": "error",
                      "senderId": "toolbar_01"
                    }
                  ]
                },
              ],
              "beforeTrigger": [

              ],
              "afterTrigger": [
                {
                  "id": "",
                  "senderId": "view_01",
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
                  "targetViewId": "view_01",
                  "group": [

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
                          "trigger": "ADD_FORM",
                          // "conditionId": "add_state_1"
                          "builtinId": "add_state_1"

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
                      "state": "edit",
                      "execute": [
                        {
                          "triggerType": "STATE",
                          "trigger": "EDIT_FORM",
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
                         // "conditionId": "add_save_1"
                        },
                        {
                          "triggerType": "OPERATION",
                          "trigger": "EXECUTE",
                          "stateId": "edit_save_1",
                          "ajaxId": "edit_save_1",
                        //  "conditionId": "edit_save_1"
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
                          "trigger": "CANCEL"
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
                    }
                  ]
                }
              ]
            }
          },
          {
            "id": "DF5GVd", "col": "cc", "type": "col", "titlestate": 1, "title": "列DF5GVd", "span": 24,
            "container": "component",
            "size": { "nzXs": 24, "nzSm": 24, "nzMd": 24, "nzLg": 24, "ngXl": 24, "nzXXl": 24 },
            "component": {
              "id": "view_01",
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
                      }
                    ]
                  }]
              },
              formControls: [
                {
                  id: '001',
                  "hidden": true, // 字段是否隐藏
                  "title": '测试字段1',  // lable 信息
                  "titleConfig":{
                    required: true
                  },
                  "field": "code",  // fromcontrol name  默认的字段
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
                    "type": 'input', // 什么组件展示文本 
                    "field": 'code',   // 字段
                  },
                  "editor": {            // 编辑状态字段  日后扩充可为数组，满足条件下的组件变化
                    "type": "input",
                    "field": "code",  // 编辑字段于定义字段一致 （此处定义于表格相反）
                    "placeholder": "请输入",
                    "validate": {  // 校验

                    }
                  }
                },
                {
                  id: '002',
                  "hidden": true, // 字段是否隐藏
                  "title": '省',  // lable 信息
                  "titleConfig":{
                    required: true
                  },
                  "field": "inputname2",  // fromcontrol name  默认的字段
                  "labelSize": {
                    "span": 8,
                    "nzXs": 8, "nzSm": 8, "nzMd": 8, "nzLg": 8, "ngXl": 8, "nzXXl": 8
                  },  // 
                  "controlSize": {
                    "span": 16,
                    "nzXs": { span: 8, offset: 8 },
                    "nzSm": { span: 8, offset: 8 },
                    "nzMd": { span: 8, offset: 8 },
                    "nzLg": { span: 8, offset: 8 },
                    "ngXl": { span: 8, offset: 8 },
                    "nzXXl": { span: 8, offset: 8 }
                  },
                  "state": "edit", // 当前组件默认状态 文本，编辑，或者由表单状态控制 text、edit、form
                  "text": { // 文本展示字段
                    "type": 'label', // 什么组件展示文本 
                    "field": 'inputname2',   // 字段
                  },
                  "editor": {            // 编辑状态字段  日后扩充可为数组，满足条件下的组件变化
                    "type": "select",
                    "field": "inputname2",  // 编辑字段于定义字段一致 （此处定义于表格相反）
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
                  "title": '市',  // lable 信息
                  "titleConfig":{
                    required: false
                  },
                  "field": "inputname3",  // fromcontrol name  默认的字段
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
                    "field": 'inputname3',   // 字段
                  },
                  "editor": {            // 编辑状态字段  日后扩充可为数组，满足条件下的组件变化
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
                  "titleConfig":{
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
                    "validate": {  // 校验

                    }
                  }
                },
                {
                  id: '005',
                  "hidden": true, // 字段是否隐藏
                  "title": '测试字段5',  // lable 信息
                  "titleConfig":{
                    required: false
                  },
                  "field": "inputname5",  // fromcontrol name  默认的字段
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
                    "field": 'inputname5',   // 字段
                  },
                  "editor": {            // 编辑状态字段  日后扩充可为数组，满足条件下的组件变化
                    "type": "input",
                    "field": "inputname5",  // 编辑字段于定义字段一致 （此处定义于表格相反）
                    "placeholder": "请输入",
                    "validate": {  // 校验

                    }
                  }
                }
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
                    { id: '001', state: "edit", hidden: false, readOnly: false },
                    { id: '002', state: "edit", hidden: false, readOnly: false },
                    { id: '003', state: "edit", hidden: false, readOnly: false },
                    { id: '004', state: "edit", hidden: false, readOnly: false },
                    { id: '005', state: "edit", hidden: false, readOnly: false }
                  ]
                },
                {
                  formState: "update",
                  Controls: [
                    { id: '001', state: "edit", hidden: false, readOnly: false },
                    { id: '002', state: "edit", hidden: false, readOnly: false },
                    { id: '003', state: "edit", hidden: false, readOnly: false },
                    { id: '004', state: "edit", hidden: false, readOnly: false },
                    { id: '005', state: "edit", hidden: false, readOnly: false }
                  ]
                },
                {
                  formState: "text",
                  Controls: [
                    { id: '001', state: "text", hidden: false, readOnly: false },
                    { id: '002', state: "text", hidden: false, readOnly: false },
                    { id: '003', state: "text", hidden: false, readOnly: false },
                    { id: '004', state: "text", hidden: false, readOnly: false },
                    { id: '005', state: "text", hidden: false, readOnly: false }
                  ]
                }

              ],
              ajaxConfig: [
                {
                  "id": "loadform",
                  "url": "information/testList",
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
                  "id": "loadformselect1",
                  "url": "information/selectAllProvinceWithCity",
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
                  "url": "information/ssld",
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
                  "url": "information/selectCityByPid",
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
                }



              ],
              cascade: {
                "messageSender": [
                  {
                    "id": "toolbar_01",
                    "senderId": "view_01",
                    "triggerType": "OPERATION",
                    "trigger": "EXECUTE_CHECKED_ROWS",
                    "triggerMoment": "after",
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
        "id": "szIOQb", "type": "row", "container": "cols"
      }],
    "customlayout": []
  }

}
