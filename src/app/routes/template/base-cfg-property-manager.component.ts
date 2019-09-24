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
    selector: 'base-cfg-property-manager',
    templateUrl: './base-cfg-property-manager.component.html',
    styles: [
        `
        `
    ]
})
export class BaseCfgPropertyManagerComponent implements OnInit {
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
                            "id": "view_tree_component_property_category",
                            "component": "cnToolbar",
                            "size": "default",
                            "cascade": {
                                "messageSender": [
                                    {
                                        "id": "toolbar_01",
                                        "senderId": "view_tree_component_property_category",
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
                                    // {
                                    //     "id": "s_001",
                                    //     "senderId": "view_tree_component_property_category",
                                    //     "receiveData": [
                                    //         {
                                    //             "triggerType": "STATE",
                                    //             "trigger": "STATE_TO_TEXT"
                                    //         }
                                    //     ]
                                    // },
                                    // {
                                    //     "id": "s_002",
                                    //     "senderId": "view_tree_component_property_category",
                                    //     "receiveData": [
                                    //         {
                                    //             "triggerType": "STATE",
                                    //             "trigger": "STATE_TO_EDIT"
                                    //         }
                                    //     ]
                                    // }

                                ]
                            },
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
                                },
                                {
                                    "id": "add_property_form_changeValue",
                                    "params": [
                                        {
                                            "name": "CMPT_ID",
                                            "type": "item",
                                            "valueName": "ID",
                                            "valueTo": "tempValue"
                                        },
                                        {
                                            "name": "CMPT_ID",
                                            "type": "item",
                                            "valueName": "ID",
                                            "valueTo": "staticComponentValue"
                                        }
                                    ]
                                }
                            ],
                            "dialog": [
                                {
                                    "id": "form_property_category",
                                    "type": "confirm",
                                    "title": "新增组件属性分类信息",
                                    "cancelText": "取消",
                                    "okText": "提交",
                                    "form": {
                                        "id": "form_01",
                                        "type": "form",
                                        "component": "form",
                                        state: 'text',
                                        loadingConfig: {
                                            id: "loadform"
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
                                                                "id": "category_name"  // id 和引用id 值相同
                                                            }
                                                        },
                                                        {
                                                            "id": "ioj0mV1", "col": "cc", "type": "col", "title": "列ioj0mV", "span": 24, "layoutContain": "select",
                                                            "size": {
                                                                "nzXs": 24, "nzSm": 24, "nzMd": 24, "nzLg": 24, "ngXl": 24, "nzXXl": 24
                                                            },
                                                            "control": { "id": "category_code" }
                                                        },
                                                        {
                                                            "id": "ioj0mV2", "col": "cc", "type": "col", "title": "列ioj0mV", "span": 24, "layoutContain": "select",
                                                            "size": {
                                                                "nzXs": 24, "nzSm": 24, "nzMd": 24, "nzLg": 24, "ngXl": 24, "nzXXl": 24
                                                            },
                                                            "control": { "id": "category_type" }
                                                        },
                                                        // {
                                                        //     "id": "ioj0mV4", "col": "cc", "type": "col", "title": "列ioj0mV", "span": 24, "layoutContain": "select",
                                                        //     "size": {
                                                        //         "nzXs": 24, "nzSm": 24, "nzMd": 24, "nzLg": 24, "ngXl": 24, "nzXXl": 24
                                                        //     },
                                                        //     "control": { "id": "category_sort" }
                                                        // },
                                                        // {
                                                        //     "id": "ioj0mV5", "col": "cc", "type": "col", "title": "列ioj0mV", "span": 24, "layoutContain": "select",
                                                        //     "size": {
                                                        //         "nzXs": 24, "nzSm": 24, "nzMd": 24, "nzLg": 24, "ngXl": 24, "nzXXl": 24
                                                        //     },
                                                        //     "control": { "id": "category_state" }
                                                        // }
                                                    ]
                                                }]
                                        },
                                        formControls: [
                                            {
                                                id: 'category_id',
                                                "hidden": true,
                                                "title": "ID",
                                                "titleConfig": {
                                                    required: false
                                                },
                                                "field": "ID",
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
                                                "state": "edit",
                                                "text": {
                                                    "type": 'label',
                                                    "field": 'ID',
                                                },
                                                "editor": {
                                                    "type": "input",
                                                    "field": "ID",
                                                    "placeholder": "请输入",
                                                    "validations": [
                                                        { validator: "required", type: "default", "message": "请输入组件名称" }
                                                    ]
                                                }
                                            },
                                            {
                                                id: 'category_name',
                                                "hidden": true,
                                                "title": "名称",
                                                "titleConfig": {
                                                    required: true
                                                },
                                                "field": "NAME",
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
                                                "state": "edit",
                                                "text": {
                                                    "type": 'label',
                                                    "field": 'NAME',
                                                },
                                                "editor": {
                                                    "type": "input",
                                                    "field": "NAME",
                                                    "placeholder": "请输入",
                                                    "validations": [
                                                        { validator: "required", type: "default", "message": "请输入组件名称" }
                                                    ]
                                                }
                                            },
                                            {
                                                id: 'category_code',
                                                "hidden": true,
                                                "title": "属性分类编码",
                                                "titleConfig": {
                                                    required: false
                                                },
                                                "field": "CODE",
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
                                                "state": "edit",
                                                "text": {
                                                    "type": 'label',
                                                    "field": 'CODE',
                                                },
                                                "editor": {
                                                    "type": "input",
                                                    "field": "CODE",
                                                    "placeholder": "请输入",
                                                    "validations": [

                                                    ]
                                                }
                                            },
                                            // {
                                            //     id: 'category_sort',
                                            //     "hidden": true,
                                            //     "title": "属性分类排序",
                                            //     "titleConfig": {
                                            //         required: false
                                            //     },
                                            //     "field": "SORT",
                                            //     "labelSize": {
                                            //         "span": 6,
                                            //         "nzXs": 6, "nzSm": 6, "nzMd": 6, "nzLg": 6, "ngXl": 6, "nzXXl": 6
                                            //     },  // 
                                            //     "controlSize": {
                                            //         "span": 18,
                                            //         "nzXs": { span: 18, offset: 0 },
                                            //         "nzSm": { span: 18, offset: 0 },
                                            //         "nzMd": { span: 18, offset: 0 },
                                            //         "nzLg": { span: 18, offset: 0 },
                                            //         "ngXl": { span: 18, offset: 0 },
                                            //         "nzXXl": { span: 18, offset: 0 }
                                            //     },
                                            //     "state": "edit",
                                            //     "text": {
                                            //         "type": 'label',
                                            //         "field": 'SORT',
                                            //     },
                                            //     "editor": {
                                            //         "type": "input",
                                            //         "field": "SORT",
                                            //         "placeholder": "请输入",
                                            //         "validations": [

                                            //         ]
                                            //     }
                                            // },
                                            {
                                                id: 'category_type',
                                                "hidden": true,
                                                "title": "属性分类",
                                                "titleConfig": {
                                                    required: false
                                                },
                                                "field": "PROPERTY_TYPE",
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
                                                "state": "edit",
                                                "text": {
                                                    "type": 'label',
                                                    "field": 'PROPERTY_TYPE',
                                                },
                                                "editor": {
                                                    "type": "select",
                                                    "field": "PROPERTY_TYPE",
                                                    "placeholder": "请输入",
                                                    "options": [
                                                        { "label": "对象", "value": "object" },
                                                        { "label": "数组", "value": "array" }
                                                    ],
                                                    "defaultValue": "object",
                                                    "labelName": "label",
                                                    "valueName": "value"
                                                }
                                            },
                                            // {
                                            //     id: 'category_state',
                                            //     "hidden": true,
                                            //     "title": "是否启用",
                                            //     "titleConfig": {
                                            //         required: false
                                            //     },
                                            //     "field": "STATE",
                                            //     "labelSize": {
                                            //         "span": 6,
                                            //         "nzXs": 6, "nzSm": 6, "nzMd": 6, "nzLg": 6, "ngXl": 6, "nzXXl": 6
                                            //     },  // 
                                            //     "controlSize": {
                                            //         "span": 18,
                                            //         "nzXs": { span: 18, offset: 0 },
                                            //         "nzSm": { span: 18, offset: 0 },
                                            //         "nzMd": { span: 18, offset: 0 },
                                            //         "nzLg": { span: 18, offset: 0 },
                                            //         "ngXl": { span: 18, offset: 0 },
                                            //         "nzXXl": { span: 18, offset: 0 }
                                            //     },
                                            //     "state": "edit",
                                            //     "text": {
                                            //         "type": 'label',
                                            //         "field": 'STATE',
                                            //     },
                                            //     "editor": {
                                            //         "type": "select",
                                            //         "field": "STATE",
                                            //         "placeholder": "请输入",
                                            //         "options": [
                                            //             { "label": "启用", "value": 1 },
                                            //             { "label": "禁用", "value": 2 }
                                            //         ],
                                            //         "defaultValue": 1,
                                            //         "labelName": "label",
                                            //         "valueName": "value"
                                            //     }
                                            // }
                                        ],
                                        formControlsPermissions: [
                                            {
                                                formState: "new",
                                                formStateContent: {
                                                    isLoad: false,
                                                    loadAjax: {},
                                                    isDefault: true
                                                },
                                                Controls: [
                                                    { id: 'category_name', state: "edit", hidden: false, readOnly: false },
                                                    { id: 'category_code', state: "edit", hidden: false, readOnly: false },
                                                    { id: 'category_type', state: "edit", hidden: false, readOnly: false },
                                                    // { id: 'category_sort', state: "edit", hidden: true, readOnly: false },
                                                    // { id: 'category_state', state: "edit", hidden: true, readOnly: false }

                                                ]
                                            },
                                            {
                                                formState: "edit",
                                                Controls: [
                                                    { id: 'category_name', state: "edit", hidden: false, readOnly: false },
                                                    { id: 'category_code', state: "edit", hidden: false, readOnly: false },
                                                    { id: 'category_type', state: "edit", hidden: false, readOnly: false },
                                                    // { id: 'category_sort', state: "edit", hidden: true, readOnly: false },
                                                    // { id: 'category_state', state: "edit", hidden: true, readOnly: false }
                                                ]
                                            }
                                        ],
                                        ajaxConfig: [
                                            {
                                                "id": "loadform",
                                                "url": "td/SMT_BASE_CFG_PROPERTY/query",
                                                "urlType": "inner",
                                                "ajaxType": "get",
                                                "params": [
                                                    {
                                                        "name": "ID",
                                                        "type": "tempValue",
                                                        "valueName": "ID"
                                                    }
                                                ],
                                                "outputParameters": [

                                                ],
                                                "result": [

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
                                    "id": "tree_add_property_category",
                                    "url": "sd/operate/ADD_PROPERTY_CATEGORY",
                                    "urlType": "inner",
                                    "ajaxType": "post",
                                    "params": [
                                        {
                                            "name": "ID",
                                            "type": "GUID"
                                        },
                                        {
                                            "name": "NAME",
                                            "type": "componentValue",
                                            "valueName": "NAME",
                                            "dataType": "string"
                                        },
                                        {
                                            "name": "CODE",
                                            "type": "componentValue",
                                            "valueName": "CODE"
                                        },
                                        {
                                            "name": "PROPERTY_TYPE",
                                            "type": "componentValue",
                                            "valueName": "PROPERTY_TYPE"
                                        },

                                        // {
                                        //     "name": "SORT",
                                        //     "type": "componentValue",
                                        //     "valueName": "SORT"
                                        // },
                                        // {
                                        //     "name": "STATE",
                                        //     "type": "componentValue",
                                        //     "valueName": "STATE"
                                        // },
                                        {
                                            "name": "PARENT_ID",
                                            "type": "tempValue",
                                            "valueName": "CMPT_ID"
                                        },
                                        {
                                            "name": "CMPT_ID",
                                            "type": "tempValue",
                                            "valueName": "CMPT_ID"
                                        }
                                    ],
                                    "outputParameters": [

                                    ],
                                    "result": [
                                        {
                                            "name": "data",
                                            "showMessageWithNext": 0,
                                            "message": "message.ajax.state.success",
                                            "senderId": "afterPropertyCategorySaveSuccess"
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
                                    "id": "tree_edit_property_category",
                                    "url": "td/SMT_BASE_CFG_PROPERTY/update",
                                    "urlType": "inner",
                                    "ajaxType": "put",
                                    "params": [
                                        {
                                            "name": "ID",
                                            "type": "componentValue",
                                            "valueName": "ID"
                                        },
                                        {
                                            "name": "NAME",
                                            "type": "componentValue",
                                            "valueName": "NAME",
                                            "dataType": "string"
                                        },
                                        {
                                            "name": "CODE",
                                            "type": "componentValue",
                                            "valueName": "CODE"
                                        },
                                        // {
                                        //     "name": "TYPE",
                                        //     "type": "componentValue",
                                        //     "valueName": "TYPE"
                                        // },
                                        // {
                                        //     "name": "CATEGORY_TYPE",
                                        //     "type": "componentValue",
                                        //     "valueName": "CATEGORY_TYPE"
                                        // },
                                        // {
                                        //     "name": "SORT",
                                        //     "type": "componentValue",
                                        //     "valueName": "SORT"
                                        // },
                                        // {
                                        //     "name": "STATE",
                                        //     "type": "componentValue",
                                        //     "valueName": "STATE"
                                        // },
                                        // {
                                        //     "name": "PARENT_ID",
                                        //     "type": "tempValue",
                                        //     "valueName": "CMPT_ID"
                                        // },
                                        // {
                                        //     "name": "CMPT_ID",
                                        //     "type": "tempValue",
                                        //     "valueName": "CMPT_ID"
                                        // }
                                    ],
                                    "outputParameters": [

                                    ],
                                    "result": [
                                        {
                                            "name": "data",
                                            "showMessageWithNext": 0,
                                            "message": "message.ajax.state.success",
                                            "senderId": "afterPropertyCategoryUpdateSuccess"
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
                                    "id": "tree_delete_property",
                                    "url": "sd/operate/DELETE_PROPERTY",
                                    "urlType": "inner",
                                    "ajaxType": "post",
                                    "params": [
                                        {
                                            "name": "ID",
                                            "type": "item",
                                            "valueName": "ID",
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
                                            "senderId": "afterPropertyDeleteSuccess"
                                        }
                                    ]
                                },
                            ],
                            "beforeTrigger": [

                            ],
                            "afterTrigger": [
                                {
                                    "id": "",
                                    "senderId": "view_tree_component_property_category",
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
                                    "targetViewId": "view_tree_component_property_category",
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
                                            "id": "add_property_category_node",
                                            "text": "新增属性分类",
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
                                                    "dialogId": "form_property_category",
                                                    "ajaxId": "tree_add_property_category",
                                                    "changeValueId": "add_property_form_changeValue"
                                                }
                                            ]
                                        },
                                        // {
                                        //     "id": "M_addChildNode",
                                        //     "text": "新增数组属性",
                                        //     "state": "new",
                                        //     "icon": "plus",
                                        //     "color": "text-primary",
                                        //     "hidden": false,
                                        //     "disabled": false,
                                        //     "execute": [
                                        //         {
                                        //             "triggerType": "ACTION",
                                        //             "trigger": "DIALOG",
                                        //             // "conditionId": "add_state_1"
                                        //             "dialogId": "form_array_properties",
                                        //             "ajaxId": "tree_add_array_properties",
                                        //             "changeValueId": "add_child_form_changeValue"
                                        //         }
                                        //     ]
                                        // },
                                        {
                                            "id": "M_editTreeNode",
                                            "text": "编辑属性分类",
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
                                                    "dialogId": "form_property_category",
                                                    "ajaxId": "tree_edit_property_category",
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
                                                    "trigger": "EXECUTE_SELECTED_NODE",
                                                    // "conditionId": "delete_operation_1",
                                                    "ajaxId": "tree_delete_property"
                                                }
                                            ]
                                        },
                                        // {
                                        //     "id": "M_deleteRow_m",
                                        //     "text": "批量删除",
                                        //     "icon": "delete",
                                        //     "color": "text-red-light",
                                        //     "hidden": false,
                                        //     "disabled": false,
                                        //     "execute": [
                                        //         {
                                        //             "triggerType": "OPERATION",
                                        //             "trigger": "EXECUTE_DELETE_CHECKED_NODES_BY_ID",
                                        //             // "conditionId": "delete_operation_1",
                                        //             "ajaxId": "tree_batch_delete_component"
                                        //         }
                                        //     ]
                                        // }
                                    ]
                                }
                            ]
                        }
                    },
                    {
                        "id": "r5zDHB",
                        "col": "cc",
                        "type": "col",
                        "title": "组件属性结构树",
                        "span": 8,
                        "container": "component",
                        "size": {
                            "nzXs": 8,
                            "nzSm": 8,
                            "nzMd": 8,
                            "nzLg": 8,
                            "nzXl": 8,
                            "nzXXl": 8
                        },
                        "component": {
                            "id": "view_tree_component_property_category",
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
                            "desc": "NAME",
                            "loadingConfig": {
                                "url": "sd/query/COMPONENT_TREE_BASE_PROPERTIES_DATA",
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
                                "url": "sd/query/COMPONENT_TREE_BASE_PROPERTIES_DATA",
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
                                    "title": "CODE",
                                    "type": "title",
                                    "field": "CODE"
                                }

                            ],
                            "cascade": {
                                "messageSender": [
                                    {
                                        "id": "",
                                        "senderId": "view_tree_component_property_category",
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
                                                        "name": "_ID",
                                                        "type": "item",
                                                        "valueName": "ID"
                                                    },
                                                    {
                                                        "name": "_PID",
                                                        "type": "item",
                                                        "valueName": "ID"
                                                    },
                                                    {
                                                        "name": "_CMPT_ID",
                                                        "type": "item",
                                                        "valueName": "CMPT_ID"
                                                    },
                                                    {
                                                        "name": "_NODE_TYPE",
                                                        "type": "item",
                                                        "valueName": "TYPE"
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        "id": "grid_sender_03",
                                        "senderId": "view_tree_component_property_category",
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
                                                        "value": "view_tree_component_property_category",
                                                        "type": "value"
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        "id": "grid_sender_04",
                                        "senderId": "view_tree_component_property_category",
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
                                                        "value": "view_tree_component_property_category",
                                                        "type": "value"
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        "id": "grid_sender_05",
                                        "senderId": "view_tree_component_property_category",
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
                                                        "value": "view_tree_component_property_category",
                                                        "type": "value"
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        "id": "grid_sender_06",
                                        "senderId": "view_tree_component_property_category",
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
                                                        "value": "view_tree_component_property_category",
                                                        "type": "value"
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        "id": "grid_sender_07",
                                        "senderId": "view_tree_component_property_category",
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
                                                        "value": "view_tree_component_property_category",
                                                        "type": "value"
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        "id": "grid_sender_08",
                                        "senderId": "view_tree_component_property_category",
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
                                                        "value": "view_tree_component_property_category",
                                                        "type": "value"
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        "id": "afterObjectPropertySuccess",
                                        "senderId": "view_tree_component_property_category",
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
                                                "receiverTrigger": "APPEND_CHILD_TO_ROOT_NODE",
                                                "params": [
                                                    {
                                                        "name": "ID",
                                                        "type": "addedRows",
                                                        "valueName": "ID"
                                                    },
                                                    {
                                                        "name": "NAME",
                                                        "type": "addedRows",
                                                        "valueName": "NAME"
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        "id": "afterPropertyCategorySaveSuccess",
                                        "senderId": "view_tree_component_property_category",
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
                                                "receiverTrigger": "APPEND_CHILD_TO_SELECTED_NODE",
                                                "params": [
                                                    {
                                                        "name": "ID",
                                                        "type": "addedRows",
                                                        "valueName": "ID"
                                                    },
                                                    {
                                                        "name": "NAME",
                                                        "type": "addedRows",
                                                        "valueName": "NAME"
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        "id": "afterPropertyCategoryUpdateSuccess",
                                        "senderId": "view_tree_component_property_category",
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
                                                "receiverTrigger": "UPDATE_SELECTED_NODE",
                                                "params": [
                                                    {
                                                        "name": "ID",
                                                        "type": "editedRows",
                                                        "valueName": "ID"
                                                    },
                                                    {
                                                        "name": "NAME",
                                                        "type": "editedRows",
                                                        "valueName": "NAME+"
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        "id": "afterPropertyDeleteSuccess",
                                        "senderId": "view_tree_component_property_category",
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
                                                "receiverTrigger": "DELETE_SELECTED_NODE",
                                                "params": [
                                                    {
                                                        "name": "ID",
                                                        "type": "item",
                                                        "valueName": "ID"
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        "id": "afterProvinceSaveValidation",
                                        "senderId": "view_tree_component_property_category",
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
                                        "senderId": "view_tree_component_property_category",
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
                                        "senderId": "view_tree_component_property_category",
                                        "receiveData": [
                                            {
                                                "triggerType": "ACTION",
                                                "trigger": "APPEND_CHILD_TO_SELECTED_NODE"
                                            }
                                        ]
                                    },
                                    {
                                        "id": "s_2011",
                                        "senderId": "view_tree_component_property_category",
                                        "receiveData": [
                                            {
                                                "triggerType": "ACTION",
                                                "trigger": "APPEND_CHILD_TO_SELECTED_NODE"
                                            }
                                        ]
                                    },
                                    {
                                        "id": "s_203",
                                        "senderId": "view_tree_component_property_category",
                                        "receiveData": [
                                            {
                                                "triggerType": "ACTION",
                                                "trigger": "UPDATE_SELECTED_NODE"
                                            }
                                        ]
                                    },
                                    {
                                        "id": "s_204",
                                        "senderId": "view_tree_component_property_category",
                                        "receiveData": [
                                            {
                                                "triggerType": "ACTION",
                                                "trigger": "MESSAGE"
                                            }
                                        ]
                                    },
                                    {
                                        "id": "s_205",
                                        "senderId": "view_tree_component_property_category",
                                        "receiveData": [
                                            {
                                                "triggerType": "ACTION",
                                                "trigger": "DELETE_SELECTED_NODE"
                                            }
                                        ]
                                    }
                                ]
                            },
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
                                    "senderId": "view_tree_component_property_category",
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
                                    "senderId": "view_tree_component_property_category",
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
                        "id": "4K0naM",
                        "type": "layout",
                        "title": "",
                        "container": "rows",
                        "span": 16,
                        "size": {
                            "nzXs": 16,
                            "nzSm": 16,
                            "nzMd": 16,
                            "nzLg": 16,
                            "nzXl": 16,
                            "nzXXl": 16
                        },
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
                                            "id": "toolbar_property_detail",
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
                                                            id: "loadform"
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
                                                                "hidden": true,
                                                                "title": '市名称',
                                                                "titleConfig": {
                                                                    required: true
                                                                },
                                                                "field": "cityName",
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
                                                                "state": "edit",
                                                                "text": {
                                                                    "type": 'label',
                                                                    "field": 'cityName',
                                                                },
                                                                "editor": {
                                                                    "type": "input",
                                                                    "field": "cityName",
                                                                    "placeholder": "请输入",
                                                                    "validations": [
                                                                        { validator: "required", type: "default", "message": "请输入省名称" }
                                                                    ]
                                                                }
                                                            },
                                                            {
                                                                id: 'city_id',
                                                                "hidden": true,
                                                                "title": '区号',
                                                                "titleConfig": {
                                                                    required: false
                                                                },
                                                                "field": "id",
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
                                                                "state": "edit",
                                                                "text": {
                                                                    "type": 'label',
                                                                    "field": 'id',
                                                                },
                                                                "editor": {
                                                                    "type": "input",
                                                                    "field": "id",
                                                                    "placeholder": "请输入",
                                                                    "validations": [

                                                                    ]
                                                                }
                                                            },
                                                            {
                                                                id: 'city_pid',
                                                                "hidden": true,
                                                                "title": '区号',
                                                                "titleConfig": {
                                                                    required: false
                                                                },
                                                                "field": "pId",
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
                                                                "state": "edit",
                                                                "text": {
                                                                    "type": 'label',
                                                                    "field": 'pId',
                                                                },
                                                                "editor": {
                                                                    "type": "input",
                                                                    "field": "pId",
                                                                    "placeholder": "请输入",
                                                                    "validations": [

                                                                    ]
                                                                }
                                                            }
                                                        ],
                                                        formControlsPermissions: [
                                                            {
                                                                formState: "new",
                                                                formStateContent: {
                                                                    isLoad: false,
                                                                    loadAjax: {},
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
                                                                "result": [

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
                                                    "id": "properties_condition_added_none",
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
                                                    "id": "properties_condition_edited_none",
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
                                                    "id": "add_properties_data",
                                                    "url": "sd/batchOperate/ADD_PROPERTY_DETAIL",
                                                    "urlType": "inner",
                                                    "ajaxType": "post",
                                                    "params": [
                                                        {
                                                            "name": "ID",
                                                            "type": "GUID",
                                                        },
                                                        {
                                                            "name": "NAME",
                                                            "type": "componentValue",
                                                            "valueName": "NAME"
                                                        },
                                                        {
                                                            "name": "CODE",
                                                            "type": "componentValue",
                                                            "valueName": "CODE"
                                                        },
                                                        {
                                                            "name": "PROPERTY_TYPE",
                                                            "type": "componentValue",
                                                            "valueName": "PROPERTY_TYPE"
                                                        },
                                                        {
                                                            "name": "CMPT_ID",
                                                            "type": "tempValue",
                                                            "valueName": "_CMPT_ID"
                                                        },
                                                        {
                                                            "name": "IS_SUB_PROPERTY",
                                                            "type": "componentValue",
                                                            "valueName": "IS_SUB_PROPERTY"
                                                        },
                                                        {
                                                            "name": "PROPERTY_TYPE",
                                                            "type": "componentValue",
                                                            "valueName": "PROPERTY_TYPE"
                                                        },
                                                        {
                                                            "name": "REF_TYPE",
                                                            "type": "componentValue",
                                                            "valueName": "REF_TYPE"
                                                        },
                                                        {
                                                            "name": "STATE",
                                                            "type": "componentValue",
                                                            "valueName": "STATE"
                                                        },
                                                        {
                                                            "name": "PARENT_ID",
                                                            "type": "tempValue",
                                                            "valueName": "_PID"
                                                        },
                                                        {
                                                            "name": "NODE_TYPE",
                                                            "type": "tempValue",
                                                            "valueName": "_NODE_TYPE"
                                                        }
                                                    ],
                                                    "outputParameters": [

                                                    ],
                                                    "result": [
                                                        {
                                                            "name": "data",
                                                            "showMessageWithNext": 0,
                                                            "message": "message.ajax.state.success",
                                                            "senderId": "afterPropertyDetailSuccess"
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
                                                    "id": "edit_properties_data",
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
                                                            "senderId": "afterpropertyDetailSuccess"
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
                                            "beforeTrigger": [],
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
                                                            "text": "新增属性",
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
                                                            "text": "修改属性",
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
                                                                    "ajaxId": "add_properties_data",
                                                                    // "stateId": "add_save_1",
                                                                    "conditionId": "properties_condition_added_none"
                                                                },
                                                                {
                                                                    "triggerType": "OPERATION",
                                                                    "trigger": "SAVE_ROWS",
                                                                    "ajaxId": "edit_properties_data",
                                                                    // "stateId": "edit_save_1",
                                                                    "conditionId": "properties_condition_edited_none"
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
                                                            "text": "取消",
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
                                            "title": "属性列表",
                                            "titleIcon": "right-circle",
                                            "component": "cnDataTable",
                                            "keyId": "ID",
                                            "size": "middle",
                                            "isBordered": true,
                                            "isFrontPagination": false,
                                            "isPagination": true,
                                            "isShowSizeChanger": true,
                                            "showTotal": true,
                                            "pageSize": 10,
                                            "showCheckBox": true,
                                            "pageSizeOptions": [10, 20, 50, 100],
                                            "loadingOnInit": false,
                                            "loadingConfig": {
                                                "url": "sd/query/GET_PROPERTY_DETAILS",
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
                                                    "hidden": true,
                                                    "showFilter": false,
                                                    "showSort": false,
                                                    "width": "50px",
                                                    "style": {}
                                                },
                                                {
                                                    "title": "PID",
                                                    "type": "field",
                                                    "field": "PID",
                                                    "hidden": true,
                                                    "showFilter": false,
                                                    "showSort": false,
                                                    "width": "50px",
                                                    "style": {}
                                                },
                                                {
                                                    "title": "属性名称",
                                                    "type": "field",
                                                    "field": "NAME",
                                                    "hidden": false,
                                                    "showFilter": false,
                                                    "showSort": false,
                                                    "width": "100px",
                                                    "style": {},
                                                    "editor": {
                                                        "type": "input",
                                                        "field": "NAME"
                                                    }
                                                },
                                                {
                                                    "title": "属性编码",
                                                    "type": "field",
                                                    "field": "CODE",
                                                    "hidden": false,
                                                    "showFilter": false,
                                                    "showSort": false,
                                                    "width": "100px",
                                                    "style": {},
                                                    "editor": {
                                                        "type": "input",
                                                        "field": "CODE"
                                                    }
                                                },
                                                {
                                                    "title": "属性类型",
                                                    "type": "field",
                                                    "field": "TYPE_TEXT",
                                                    "hidden": false,
                                                    "showFilter": false,
                                                    "showSort": false,
                                                    "width": "100px",
                                                    "style": {},
                                                    "editor": {
                                                        "type": "select",
                                                        "field": "TYPE",
                                                        "placeholder": "请输入",
                                                        "defaultValue": "value",
                                                        "options": [
                                                            { "label": '对象', "value": "object" },
                                                            { "label": '数组', "value": "array" },
                                                            { "label": '值', "value": "value" }
                                                        ],
                                                        "labelName": 'label',
                                                        "valueName": 'value'
                                                    }
                                                },
                                                {
                                                    "title": "属性关系",
                                                    "type": "field",
                                                    "field": "REF_TYPE_TEXT",
                                                    "hidden": false,
                                                    "showFilter": false,
                                                    "showSort": false,
                                                    "width": "100px",
                                                    "style": {},
                                                    "editor": {
                                                        "type": "select",
                                                        "field": "REF_TYPE",
                                                        "placeholder": "请输入",
                                                        "defaultValue": "value",
                                                        "options": [
                                                            { "label": '值-对象', "value": "value_object" },
                                                            { "label": '值-数组', "value": "value_array" },
                                                            { "label": '值', "value": "value" },
                                                            { "label": '数组-对象', "value": "array-object" },
                                                            { "label": '数组-数组', "value": "array-array" }

                                                        ],
                                                        "labelName": 'label',
                                                        "valueName": 'value'
                                                    }
                                                },
                                                {
                                                    "title": "是否末级属性",
                                                    "type": "field",
                                                    "field": "IS_SUB_PROPERTY_TEXT",
                                                    "hidden": false,
                                                    "showFilter": false,
                                                    "showSort": false,
                                                    "width": "100px",
                                                    "style": {},
                                                    "editor": {
                                                        "type": "select",
                                                        "field": "IS_SUB_PROPERTY",
                                                        "placeholder": "请选择",
                                                        "defaultValue": 1,
                                                        "options": [
                                                            { "label": "是", "value": 1 },
                                                            { "label": "否", "value": 2 }
                                                        ],
                                                        "labelName": 'label',
                                                        "valueName": 'value'
                                                    }
                                                },
                                                {
                                                    "title": "是否启用",
                                                    "type": "field",
                                                    "field": "STATE_TEXT",
                                                    "hidden": false,
                                                    "showFilter": false,
                                                    "showSort": false,
                                                    "width": "100px",
                                                    "style": {},
                                                    "editor": {
                                                        "type": "select",
                                                        "field": "STATE",
                                                        "placeholder": "请选择",
                                                        "defaultValue": 1,
                                                        "options": [
                                                            { "label": "启用", "value": 1 },
                                                            { "label": "禁用", "value": 2 }
                                                        ],
                                                        "labelName": 'label',
                                                        "valueName": 'value'
                                                    }
                                                },
                                                // {
                                                //     "title": "备注",
                                                //     "type": "field",
                                                //     "field": "REMARK",
                                                //     "hidden": false,
                                                //     "showFilter": false,
                                                //     "showSort": false,
                                                //     "width": "100px",
                                                //     "style": {}
                                                // }
                                            ],
                                            "cascade": {
                                                "messageSender": [
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
                                                                        "value": "view_tree_component_property_category",
                                                                        "type": "value"
                                                                    }
                                                                ]
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        "id": "afterPropertyDetailSuccess",
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
                                                                        "value": "success"
                                                                    },
                                                                    {
                                                                        "name": "code",
                                                                        "type": "value",
                                                                        "value": "message.operation.success"
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
                                                                        "name": "key",
                                                                        "type": "addedRows",
                                                                        "valueName": "ID"
                                                                    },
                                                                    {
                                                                        "name": "parentId",
                                                                        "type": "addedRows",
                                                                        "valueName": "PID"
                                                                    },
                                                                    {
                                                                        "name": "parentId",
                                                                        "type": "addedRows",
                                                                        "valueName": "PID"
                                                                    }
                                                                ]
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        "id": "afterpropertyDetailSuccess",
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
                                                    }
                                                ],
                                                "messageReceiver": [
                                                    {
                                                        "id": "",
                                                        "senderId": "view_tree_component_property_category",
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
                                                                    },
                                                                    {
                                                                        "pname": "_CMPT_ID",
                                                                        "cname": "_CMPT_ID",
                                                                        "valueTo": "tempValue"
                                                                    },
                                                                    {
                                                                        "pname": "_NODE_TYPE",
                                                                        "cname": "_NODE_TYPE",
                                                                        "valueTo": "tempValue"
                                                                    },
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
                                                    "id": "add_properties_data",
                                                    "url": "sd/operate/ADD_PROPERTY_DETAIL",
                                                    "urlType": "inner",
                                                    "ajaxType": "post",
                                                    "params": [
                                                        {
                                                            "name": "ID",
                                                            "type": "GUID",
                                                        },
                                                        {
                                                            "name": "NAME",
                                                            "type": "componentValue",
                                                            "valueName": "NAME"
                                                        },
                                                        {
                                                            "name": "CODE",
                                                            "type": "componentValue",
                                                            "valueName": "CODE"
                                                        },
                                                        {
                                                            "name": "PROPERTY_TYPE",
                                                            "type": "componentValue",
                                                            "valueName": "PROPERTY_TYPE"
                                                        },
                                                        {
                                                            "name": "CMPT_ID",
                                                            "type": "tempValue",
                                                            "valueName": "_CMPT_ID"
                                                        },
                                                        {
                                                            "name": "IS_SUB_PROPERTY",
                                                            "type": "componentValue",
                                                            "valueName": "IS_SUB_PROPERTY"
                                                        },
                                                        {
                                                            "name": "PROPERTY_TYPE",
                                                            "type": "componentValue",
                                                            "valueName": "PROPERTY_TYPE"
                                                        },
                                                        {
                                                            "name": "REF_TYPE",
                                                            "type": "componentValue",
                                                            "valueName": "REF_TYPE"
                                                        },
                                                        {
                                                            "name": "STATE",
                                                            "type": "componentValue",
                                                            "valueName": "STATE"
                                                        },
                                                        {
                                                            "name": "PARENT_ID",
                                                            "type": "tempValue",
                                                            "valueName": "_PID"
                                                        },
                                                        {
                                                            "name": "NODE_TYPE",
                                                            "type": "tempValue",
                                                            "valueName": "_NODE_TYPE"
                                                        }
                                                    ],
                                                    "outputParameters": [

                                                    ],
                                                    "result": [
                                                        {
                                                            "name": "data",
                                                            "showMessageWithNext": 0,
                                                            "message": "message.ajax.state.success",
                                                            "senderId": "afterPropertyDetailSuccess"
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
                                                    "id": "edit_properties_data",
                                                    "url": "td/SMT_BASE_CFG_PROPERTY_DETAIL/update",
                                                    "urlType": "inner",
                                                    "ajaxType": "put",
                                                    "params": [
                                                        {
                                                            "name": "ID",
                                                            "type": "componentValue",
                                                            "valueName": "ID"
                                                        },
                                                        {
                                                            "name": "NAME",
                                                            "type": "componentValue",
                                                            "valueName": "NAME"
                                                        },
                                                        {
                                                            "name": "CODE",
                                                            "type": "componentValue",
                                                            "valueName": "CODE"
                                                        },
                                                        {
                                                            "name": "STATE",
                                                            "type": "componentValue",
                                                            "valueName": "STATE"
                                                        }
                                                    ],
                                                    "outputParameters": [

                                                    ],
                                                    "result": [
                                                        {
                                                            "name": "data",
                                                            "showMessageWithNext": 0,
                                                            "message": "message.ajax.state.success",
                                                            "senderId": "afterpropertyDetailSuccess"
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
                                    }
                                ]
                            }
                        ]
                    }
                ],
                id: "3vlDRq",
                type: "row"
            }
        ]
    };

    public ngOnInit() { }
}