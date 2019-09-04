import { BusinessObjectBase } from '../../shared/business/business-object.base';
import { BSN_COMPONENT_SERVICES } from '../../core/relations/bsn-relatives';
import { CnComponentBase } from '../../shared/components/cn-component.base';
import { ApiService } from '../../core/services/api/api-service';
import { BeforeOperationResolver } from '../../shared/resolver/beforeOperation/before-operation.resolver';
import { Component, Input, OnInit, Output, EventEmitter, Inject, TemplateRef, ViewChild } from '@angular/core';
import { NzModalComponent, NzModalService, NzMessageService } from 'ng-zorro-antd';
import { Observable } from 'rxjs';
import { reduce } from 'rxjs/internal/operators/reduce';
import { ComponentServiceProvider } from '@core/services/component/component-service.provider';
import { FastForwardOutline } from '@ant-design/icons-angular/icons/public_api';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'tree-table-demo',
    templateUrl: './tree-table-demo.component.html',
    styles: [
        `
            :host ::ng-deep .ant-card-head {
                min-height: 36px;
            }

            .trigger {
                font-size: 20px;
                padding: 0 5px;
                cursor: pointer;
                transition: color 0.3;
                right:0px;
                position:relative;
                z-index:8;
                padding-top:8px;
            }
            .trigger:hover {
                color: #1890ff;
            }

            .collapsedArea {
                position:relative;

            }
        `
    ]
})
export class TreeTableDemoComponent implements OnInit {
    public config = {
        "id": "4K0naM",
        "type": "layout",
        "title": "布局4K0naM",
        "container": "rows",
        "rows": [
            {
                "cols": [
                    {
                        "id": "r5zDHB2-1",
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
                            "id": "view_treegrid_toolbar",
                            "component": "cnToolbar",
                            "size": "default",
                            "cascade": {
                                "messageSender": [
                                    {
                                        "id": "toolbar_01",
                                        "senderId": "view_treegrid_toolbar",
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
                                        "senderId": "view_treegrid_01",
                                        "receiveData": [
                                            {
                                                "triggerType": "STATE",
                                                "trigger": "STATE_TO_TEXT"
                                            }
                                        ]
                                    },
                                    {
                                        "id": "s_002",
                                        "senderId": "view_treegrid_01",
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
                                        "id": "form_office",
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
                                                                "id": "office_name"  // id 和引用id 值相同
                                                            }
                                                        }
                                                    ]
                                                }]
                                        },
                                        formControls: [
                                            {
                                                id: 'office_name',
                                                "hidden": true, // 字段是否隐藏
                                                "title": '市名称',  // lable 信息
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
                                                id: 'office_id',
                                                "hidden": true, // 字段是否隐藏
                                                "title": '区号',  // lable 信息
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
                                                id: 'office_pid',
                                                "hidden": true, // 字段是否隐藏
                                                "title": '区号',  // lable 信息
                                                "titleConfig": {
                                                    required: false
                                                },
                                                "field": "PID",  // fromcontrol name  默认的字段
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
                                                    { id: 'office_name', state: "edit", hidden: false, readOnly: false }
                                                ]
                                            },
                                            {
                                                formState: "edit",
                                                Controls: [
                                                    { id: 'office_name', state: "edit", hidden: false, readOnly: false }
                                                ]
                                            },
                                            {
                                                formState: "text",
                                                Controls: [
                                                    { id: 'office_name', state: "text", hidden: false, readOnly: false }
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
                                    "id": "add_offices_1",
                                    "url": "office/insertMany/OFFICE_SHEET",
                                    "urlType": "inner",
                                    "ajaxType": "post",
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
                                            "valueName": "ID"
                                        },
                                        {
                                            "name": "PID",
                                            "type": "componentValue",
                                            "valueName": "PID"
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
                                            "senderId": "afterOfficeSaveValidation"
                                        },
                                        {
                                            "name": "error",
                                            "senderId": "toolbar_02"
                                        }
                                    ]
                                },
                                {
                                    "id": "edit_offices_1",
                                    "url": "office/updateMany/OFFICE_SHEET",
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
                                            "valueName": "ID"
                                        }
                                    ],
                                    "outputParameters": [

                                    ],
                                    "result": [
                                        {
                                            "name": "data",
                                            "showMessageWithNext": 0,
                                            "message": "message.ajax.state.success",
                                            "senderId": "afterOfficeUpdateSuccessfully"
                                        },
                                        {
                                            "name": "validation",
                                            "message": "message.ajax.state.success",
                                            "senderId": "aftetOfficeUpdateValidation"
                                        },
                                        {
                                            "name": "error",
                                            "senderId": "toolbar_02"
                                        }
                                    ]
                                },
                                {
                                    "id": "execute_checked_offices_1",
                                    "url": "office/updateMany/OFFICE_SHEET",
                                    "urlType": "inner",
                                    "ajaxType": "put",
                                    "params": [
                                        {
                                            "name": "OFFICENAME",
                                            "type": "value",
                                            "value": "text3",
                                            "dataType": "string"
                                        },
                                        {
                                            "name": "ID",
                                            "type": "item",
                                            "valueName": "ID"
                                        }
                                    ],
                                    "outputParameters": [

                                    ],
                                    "result": [
                                        {
                                            "name": "data",
                                            "showMessageWithNext": 0,
                                            "message": "message.ajax.state.success",
                                            "senderId": "afterOfficeBatchChangeSuccessfully"
                                        },
                                        // {
                                        //     "name": "validation",
                                        //     "message": "message.ajax.state.success",
                                        //     "senderId": "aftetOfficeUpdateValidation"
                                        // },
                                        // {
                                        //     "name": "error",
                                        //     "senderId": "toolbar_02"
                                        // }
                                    ]
                                }
                            ],
                            "beforeTrigger": [

                            ],
                            "afterTrigger": [
                                {
                                    "id": "",
                                    "senderId": "view_treegrid_01",
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
                                    "targetViewId": "view_treegrid_01",
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
                                            "id": "M_addParentNode_inner",
                                            "text": "新增根节点(行内)",
                                            "state": "new",
                                            "icon": "plus",
                                            "color": "text-primary",
                                            "hidden": false,
                                            "disabled": false,
                                            "execute": [
                                                {
                                                    "triggerType": "STATE",
                                                    "trigger": "ADD_ROOT_ROW",
                                                    // "conditionId": "add_state_1"
                                                    // "dialogId": "edit_office_form",
                                                    // "ajaxId": "tree_add_office",
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
                                                    "ajaxId": "tree_add_office",
                                                }
                                            ]
                                        },
                                        {
                                            "id": "M_addChildNode_inner",
                                            "text": "新增子节点(行内)",
                                            "state": "new",
                                            "icon": "plus",
                                            "color": "text-primary",
                                            "hidden": false,
                                            "disabled": false,
                                            "execute": [
                                                {
                                                    "triggerType": "STATE",
                                                    "trigger": "ADD_CHILD_ROW",
                                                    // "conditionId": "add_state_1"
                                                    // "dialogId": "edit_office_form",
                                                    // "ajaxId": "tree_add_office",
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
                                                    "conditionId": "edit_cities_state"
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
                                                    // "conditionId": "delete_operation_1",
                                                    "ajaxId": "delete_office_1"
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
                                                    "ajaxId": "add_offices_1",
                                                    // "stateId": "add_save_1",
                                                    // "conditionId": "add_offices"
                                                },
                                                {
                                                    "triggerType": "OPERATION",
                                                    "trigger": "SAVE_ROWS",
                                                    "ajaxId": "edit_offices_1",
                                                    // "stateId": "edit_save_1",
                                                    // "conditionId": "edit_offices"
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
                                        },
                                        {
                                            "id": "M_cancelrowc",
                                            "text": "批量处理",
                                            "icon": "rollback",
                                            "color": "text-grey-darker",
                                            "hidden": false,
                                            "disabled": null,
                                            "execute": [
                                                {
                                                    "triggerType": "OPERATION",
                                                    "trigger": "EXECUTE_CHECKED_ROWS",
                                                    // "conditionId": "cancel_edit_rows_2"
                                                    "ajaxId": "execute_checked_offices_1"
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    },
                    {
                        "id": "r5zDHB",
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
                            "id": "view_treegrid_01",
                            "title": "树表",
                            "titleIcon": "right-circle",
                            "component": "cnTreeTable",
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
                            "loadingOnInit": true,
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
                                        "name": "PID",
                                        "type": "item",
                                        "valueName": "ID"
                                    },
                                    // {
                                    //     "name": "_recursive",
                                    //     "type": "value",
                                    //     "value": true
                                    // },
                                    // {
                                    //     "name": "_deep",
                                    //     "type": "value",
                                    //     "value": "1"
                                    // },
                                    // {
                                    //     "name": "_pcName",
                                    //     "type": "value",
                                    //     "value": "PID"
                                    // }
                                ]
                            },
                            "columns": [
                                {
                                    "title": "ID",
                                    "type": "field",
                                    "field": "ID",
                                    "hidden": true,
                                    "showFilter": false,
                                    "showSort": false,
                                    "isExpand": true,
                                    "width": "400px",
                                    "style": {}
                                },
                                {
                                    "title": "OFFICE_NAME",
                                    "type": "field",
                                    "field": "OFFICENAME",
                                    "hidden": false,
                                    "showFilter": false,
                                    "showSort": false,
                                    "expand": true,
                                    "style": {}
                                },
                                {
                                    "title": "PID",
                                    "type": "field",
                                    "field": "PID",
                                    "hidden": true,
                                    "showFilter": false,
                                    "showSort": false,
                                    "width": "400px",
                                    "style": {}
                                },
                                {
                                    "title": "ACTION",
                                    "type": "action",
                                    "actionIds": [
                                        "treegrid_edit", "treegrid_cancel", "treegrid_save", "treegrid_delete", "treegrid_new", "treegrid_new_cancel"
                                    ]
                                }
                            ],
                            "cascade": {
                                "messageSender": [
                                    {
                                        "id": "grid_sender_02",
                                        "senderId": "view_treegrid_01",
                                        "triggerType": "BEHAVIOR",
                                        "trigger": "SET_SELECT_ROW",
                                        "triggerMoment": "after",
                                        "sendData": [
                                            {
                                                "beforeSend": {},
                                                "reveicerId": "",
                                                "receiverTriggerType": "BEHAVIOR",
                                                "receiverTrigger": "REFRESH_AS_CHILD",
                                                "params": [
                                                    {
                                                        "name": "_PID",
                                                        "type": "item",
                                                        "valueName": "ID"
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        "id": "grid_sender_03",
                                        "senderId": "view_treegrid_01",
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
                                                        "value": "view_treegrid_01",
                                                        "type": "value"
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        "id": "grid_sender_04",
                                        "senderId": "view_treegrid_01",
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
                                                        "value": "view_treegrid_01",
                                                        "type": "value"
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        "id": "grid_sender_05",
                                        "senderId": "view_treegrid_01",
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
                                                        "value": "view_treegrid_01",
                                                        "type": "value"
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        "id": "grid_sender_06",
                                        "senderId": "view_treegrid_01",
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
                                                        "value": "view_treegrid_01",
                                                        "type": "value"
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        "id": "grid_sender_07",
                                        "senderId": "view_treegrid_01",
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
                                                        "value": "view_treegrid_01",
                                                        "type": "value"
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        "id": "grid_sender_08",
                                        "senderId": "view_treegrid_01",
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
                                                        "value": "view_treegrid_01",
                                                        "type": "value"
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        "id": "afterOfficeSaveSuccessfully",
                                        "senderId": "view_treegrid_01",
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
                                        "id": "afterOfficeUpdateSuccessfully",
                                        "senderId": "view_treegrid_01",
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
                                                        "name": "ID",
                                                        "type": "editedRows",
                                                        "valueName": "ID"
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        "id": "afterOfficeSaveValidation",
                                        "senderId": "view_treegrid_01",
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
                                        "id": "afterOfficeUpdateValidation",
                                        "senderId": "view_treegrid_01",
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
                                        "id": "afterOfficeDeleteSuccessfully",
                                        "senderId": "view_treegrid_01",
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
                                                        "value": "message.operation.success"
                                                    }
                                                ]
                                            },
                                            {
                                                "beforeSend": {},
                                                "reveicerId": "",
                                                "receiverTriggerType": "ACTION",
                                                "receiverTrigger": "DELETE_CURRENT_ROW",
                                                "params": [
                                                    {
                                                        "name": "ID",
                                                        "type": "returnValue",
                                                        "valueName": "ids"
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        "id": "afterOfficeBatchChangeSuccessfully",
                                        "senderId": "view_treegrid_01",
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
                                                "receiverTriggerType": "BEHAVIOR",
                                                "receiverTrigger": "REPLACE_ROW_DATA",
                                                "params": [
                                                    {
                                                        "name": "OFFICENAME",
                                                        "type": "returnValue",
                                                        "valueName": "OFFICENAME"
                                                    },
                                                    {
                                                        "name": "ID",
                                                        "type": "returnValue",
                                                        "valueName": "ID"
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                ],
                                "messageReceiver": [
                                    {
                                        "id": "",
                                        "senderId": "view_treegrid_01",
                                        "receiveData": [
                                            {
                                                "beforeReceive": [],
                                                "triggerType": "STATE",
                                                "trigger": "STATE_TO_TEXT"
                                            },
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
                                                "trigger": "CHANGE_ADDED_ROWS_TO_TEXT"
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
                                                "triggerType": "BEHAVIOR",
                                                "trigger": "REPLACE_ROW_DATA"
                                            },
                                            {
                                                "beforeReceive": [],
                                                "triggerType": "ACTION",
                                                "trigger": "LOAD_REFRESH_DATA"
                                            },
                                            {
                                                "beforeReceive": [],
                                                "triggerType": "ACTION",
                                                "trigger": "DELETE_CURRENT_ROW"
                                            }
                                        ]
                                    }
                                ]
                            },
                            "rowActions": [
                                {
                                    "id": "treegrid_new",
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
                                            "ajaxId": "add_office_1",
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
                                    "id": "treegrid_new_cancel",
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
                                            // "ajaxId": "add_office_1",
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
                                    "id": "treegrid_edit",
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
                                    "id": "treegrid_cancel",
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
                                    "id": "treegrid_save",
                                    "state": "text",
                                    "text": "保存1",
                                    "icon": "save",
                                    "color": "text-primary",
                                    "type": "link",
                                    "size": "small",
                                    "hidden": true,
                                    "execute": [
                                        {
                                            "triggerType": "OPERATION",
                                            "trigger": "SAVE_ROW",
                                            "ajaxId": "edit_office_1",
                                            // "stateId": "add_save_1",
                                            // "conditionId": "add_cities"
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
                                    "id": "treegrid_delete",
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
                                            "ajaxId": "delete_office_1",
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
                                    "id": "add_offices",
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
                                    "id": "edit_offices",
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
                                    "id": "add_office_1",
                                    "url": "office/insert/OFFICE_SHEET",
                                    "urlType": "inner",
                                    "ajaxType": "post",
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
                                            "valueName": "ID"
                                        },
                                        {
                                            "name": "PID",
                                            "type": "componentValue",
                                            "valueName": "PID"
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
                                            "senderId": "aftetOfficeSaveValidation"
                                        },
                                        {
                                            "name": "error",
                                            "senderId": "toolbar_02"
                                        }
                                    ]
                                },
                                {
                                    "id": "edit_office_1",
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
                                            "valueName": "ID"
                                        }
                                    ],
                                    "outputParameters": [

                                    ],
                                    "result": [
                                        {
                                            "name": "data",
                                            "showMessageWithNext": 0,
                                            "message": "message.ajax.state.success",
                                            "senderId": "afterOfficeUpdateSuccessfully"
                                        },
                                        // {
                                        //     "name": "validation",
                                        //     "message": "message.ajax.state.success",
                                        //     "senderId": "aftetOfficeUpdateValidation"
                                        // },
                                        // {
                                        //     "name": "error",
                                        //     "senderId": "toolbar_02"
                                        // }
                                    ]
                                },
                                {
                                    "id": "delete_office_1",
                                    "url": "office/delete/OFFICE_SHEET",
                                    "urlType": "inner",
                                    "ajaxType": "delete",
                                    "params": [
                                        {
                                            "name": "ids",
                                            "type": "item",
                                            "valueName": "ID"
                                        }
                                    ],
                                    "outputParameters": [

                                    ],
                                    "result": [
                                        {
                                            "name": "data",
                                            "showMessageWithNext": 0,
                                            "message": "message.ajax.state.success",
                                            "senderId": "afterOfficeDeleteSuccessfully"
                                        }
                                    ]
                                }
                            ],
                            "beforeTrigger": [
                                {
                                    "id": "before_delete_province",
                                    "senderId": "view_treegrid_01",
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
                                    "senderId": "view_treegrid_01",
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
                    },
                    {
                        "id": "r5zDHB2-1",
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
                            "loadingOnInit": false,
                            "loadingConfig": {
                                "url": "province/queryCondition/OFFICE_SHEET",
                                "method": "get",
                                "params": [
                                    {
                                        "name": "PID",
                                        "type": "tempValue",
                                        "valueName": "_PID"
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
                                    "style": {}
                                }
                            ],
                            "cascade": {
                                "messageReceiver": [
                                    {
                                        "id": "",
                                        "senderId": "view_treegrid_01",
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
                            "condition": []
                        }
                    }],
                id: "3vlDRq",
                type: "row"
            }
        ]
    };

    public ngOnInit() { }
}