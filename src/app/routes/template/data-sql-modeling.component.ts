import { BusinessObjectBase } from "../../shared/business/business-object.base";
import { BSN_COMPONENT_SERVICES } from "../../core/relations/bsn-relatives";
import { CnComponentBase } from "../../shared/components/cn-component.base";
import { ApiService } from "../../core/services/api/api-service";
import { BeforeOperationResolver } from "../../shared/resolver/beforeOperation/before-operation.resolver";
import { Component, Input, OnInit, Output, EventEmitter, Inject, TemplateRef, ViewChild } from "@angular/core";
import { NzModalComponent, NzModalService, NzMessageService } from "ng-zorro-antd";
import { Observable } from "rxjs";
import { reduce } from "rxjs/internal/operators/reduce";
import { ComponentServiceProvider } from "@core/services/component/component-service.provider";
import { FastForwardOutline } from "@ant-design/icons-angular/icons/public_api";

@Component({
    // tslint:disable-next-line:component-selector
    selector: "data-sql-modeling",
    templateUrl: "./data-sql-modeling.component.html",
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
export class DataSqlModelingComponent extends CnComponentBase implements OnInit {
    public config = {
        "id": "4K0naM",
        "type": "layout",
        "title": "布局4K0naM",
        "container": "rows",
        "rows": [
            {
                "cols": [
                    {
                        "id": "r5zDHB",
                        "col": "cc",
                        "type": "col",
                        "title": "SQL 内容",
                        "span": 12,
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
                            "id": "form_sql",
                            "type": "form",
                            "component": "form",
                            "state": "edit",
                            "loadingConfig": {
                                "id": "loadform" // 将加载配置引用
                            },
                            "formLayout": {
                                "id": "b86s2i11",
                                "type": "layout",
                                "title": "SQL 语句",
                                "rows": [
                                    {
                                        "id": "MefhXa1",
                                        "type": "row",
                                        "cols": [
                                            {
                                                "id": "iHspYn1", "col": "cc", "type": "col",
                                                "title": "", "span": 12,
                                                "layoutContain": "input",
                                                "size": {
                                                    "nzXs": 12, "nzSm": 12, "nzMd": 12, "nzLg": 12, "ngXl": 12, "nzXXl": 12
                                                },
                                                "control": {
                                                    "id": "sql_name"  // id 和引用id 值相同
                                                }
                                            },
                                            {
                                                "id": "iHspYn2", "col": "cc", "type": "col",
                                                "title": "", "span": 12,
                                                "layoutContain": "input",
                                                "size": {
                                                    "nzXs": 12, "nzSm": 12, "nzMd": 12, "nzLg": 12, "ngXl": 12, "nzXXl": 12
                                                },
                                                "control": {
                                                    "id": "sql_source_name"
                                                }
                                            },
                                            {
                                                "id": "iHspYn3", "col": "cc", "type": "col",
                                                "title": "", "span": 24,
                                                "layoutContain": "input",
                                                "size": {
                                                    "nzXs": 24, "nzSm": 24, "nzMd": 24, "nzLg": 24, "ngXl": 24, "nzXXl": 24
                                                },
                                                "control": {
                                                    "id": "sql_txt"
                                                }
                                            },
                                        ]
                                    }
                                ]
                            },
                            "formControls": [
                                {
                                    "id": "sql_name",
                                    "hidden": true,
                                    "title": "名称",
                                    "titleConfig": {
                                        "required": true
                                    },
                                    "field": "NAME",
                                    "labelSize": {
                                        "span": 6,
                                        "nzXs": { "span": 6 },
                                        "nzSm": { "span": 6 },
                                        "nzMd": { "span": 6 },
                                        "nzLg": { "span": 6 },
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
                                        "field": "NAME",
                                    },
                                    "editor": {
                                        "type": "input",
                                        "field": "NAME",
                                        "placeholder": "请输入",
                                        "validations": [
                                            { "validator": "required", "type": "default", "message": "请输入名称" }
                                        ]
                                    }
                                },
                                {
                                    "id": "sql_source_name",
                                    "hidden": false,
                                    "title": "资源名",
                                    "titleConfig": {
                                        "required": true
                                    },
                                    "field": "SNAME",
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
                                        "ngXl": { "span": 18, "offset": 0 },
                                        "nzXXl": { "span": 18, "offset": 0 }
                                    },
                                    "state": "edit",
                                    "text": {
                                        "type": "label",
                                        "field": "SNAME",
                                    },
                                    "editor": {
                                        "type": "input",
                                        "field": "SNAME",
                                        "placeholder": "请输入",
                                        "validations": [
                                            { "validator": "required", "type": "default", "message": "请输入名称" }
                                        ]
                                    }
                                },
                                {
                                    "id": "sql_txt",
                                    "hidden": false,
                                    "title": "SQL语句",
                                    "titleConfig": {
                                        "required": true
                                    },
                                    "field": "SQL_CONTENT",
                                    "labelSize": {
                                        "span": 3,
                                        "nzXs": 3, "nzSm": 3, "nzMd": 3, "nzLg": 3, "ngXl": 3, "nzXXl": 3
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
                                        "field": "SQL_CONTENT",
                                    },
                                    "editor": {
                                        "type": "input",
                                        "field": "SQL_CONTENT",
                                        "placeholder": "请输入",
                                        "validations": [

                                        ]
                                    }
                                }
                            ],
                            "formControlsPermissions": [
                                {
                                    "formState": "new",
                                    "formStateContent": {
                                        "isLoad": false,
                                        "loadAjax": {},
                                        "isDefault": true
                                    },
                                    "Controls": [
                                        { "id": "sql_name", "state": "edit", "hidden": false, "readOnly": false },
                                        { "id": "sql_source_name", "state": "edit", "hidden": false, "readOnly": false },
                                        { "id": "sql_txt", "state": "edit", "hidden": false, "readOnly": false }
                                    ]
                                },
                                {
                                    "formState": "edit",
                                    "Controls": [
                                        { "id": "sql_name", "state": "edit", "hidden": false, "readOnly": false },
                                        { "id": "sql_source_name", "state": "edit", "hidden": false, "readOnly": false },
                                        { "id": "sql_txt", "state": "edit", "hidden": false, "readOnly": false }
                                    ]
                                },
                                {
                                    "formState": "text",
                                    "Controls": [
                                        { "id": "sql_name", "state": "text", "hidden": false, "readOnly": true },
                                        { "id": "sql_source_name", "state": "text", "hidden": false, "readOnly": true },
                                        { "id": "sql_txt", "state": "text", "hidden": false, "readOnly": true }
                                    ]
                                }

                            ],
                            "ajaxConfig": [
                                {
                                    "id": "loadform",
                                    "url": "td/DM_SQL/query",
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
                                    "result": [  // 描述 表单接收参数，将返回的哪些值赋给相应的组件属性

                                    ]
                                }
                            ]
                        }
                    },
                    {
                        "id": "lsWPaU",
                        "col": "cc",
                        "type": "col", "titlestate": 1,
                        "title": "", "span": 24,
                        "container": "component",
                        "size": { "nzXs": 24, "nzSm": 24, "nzMd": 24, "nzLg": 24, "ngXl": 24, "nzXXl": 24 },
                        "component": {
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
                                    event: "changeState", // 内置方法
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
                                    "id": "edit_save_1",
                                    "senderId": "form_sql",
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
                                    "targetViewId": "form_sql",
                                    "group": [

                                        {
                                            "id": "M_addRow",
                                            "text": "新增SQL资源",
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
                                                    // "builtinId": "add_state_1"

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
                                            "text": "编辑SQL资源",
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
                                                    "trigger": "CANCEL"
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
                    {
                        "id": "r5zDHB2-1",
                        "col": "cc",
                        "type": "col",
                        "title": "SQL 资源表",
                        "span": 12,
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
                            "size": "small",
                            "isBordered": true,
                            "isFrontPagination": false,
                            "isPagination": true,
                            "isShowSizeChanger": true,
                            "showTotal": true,
                            "pageSize": 10,
                            "showCheckBox": true,
                            "pageSizeOptions": [10, 20, 50, 100],
                            "loadingOnInit": true,
                            "loadingConfig": {
                                "url": "td/DM_SQL/query",
                                "method": "get",
                                "params": [
                                    // {
                                    //     "name": "pid",
                                    //     "type": "tempValue",
                                    //     "valueName": "_PID"
                                    // }
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
                                    "isShowExpand": false,
                                    "width": "50px",
                                    "style": {}
                                },
                                {
                                    "title": "名称",
                                    "type": "field",
                                    "field": "NAME",
                                    "hidden": false,
                                    "showFilter": false,
                                    "showSort": false,
                                    "width": "100px",
                                    "style": {},
                                },
                                {
                                    "title": "资源名称",
                                    "type": "field",
                                    "field": "SNAME",
                                    "hidden": false,
                                    "showFilter": false,
                                    "showSort": false,
                                    "width": "100px",
                                    "style": {},
                                },
                                {
                                    "title": "是否建模",
                                    "type": "field",
                                    "field": "IS_BUILD_MODEL",
                                    "hidden": false,
                                    "showFilter": false,
                                    "showSort": false,
                                    "width": "100px",
                                    "style": {},
                                },
                                {
                                    "title": "创建事件",
                                    "type": "field",
                                    "field": "CREATE_DATE",
                                    "hidden": false,
                                    "showFilter": false,
                                    "showSort": false,
                                    "width": "100px",
                                    "style": {},
                                },
                                {
                                    "title": "最近修改时间",
                                    "type": "field",
                                    "field": "LAST_UPDATE_DATE",
                                    "hidden": false,
                                    "showFilter": false,
                                    "showSort": false,
                                    "width": "100px",
                                    "style": {},
                                },
                                // {
                                //     "title": "CREATEDATE",
                                //     "type": "field",
                                //     "field": "createDate",
                                //     "hidden": false,
                                //     "showFilter": false,
                                //     "showSort": false,
                                //     "width": "100px",
                                //     "style": {},
                                // },
                                // {
                                //     "title": "message",
                                //     "type": "field",
                                //     "field": "MESSAGE",
                                //     "hidden": false,
                                //     "showFilter": false,
                                //     "showSort": false,
                                //     "width": "150px",
                                //     "style": {}
                                // },
                                // {
                                //     "title": "language",
                                //     "type": "field",
                                //     "field": "LANGUAGE",
                                //     "hidden": false,
                                //     "showFilter": false,
                                //     "showSort": false,
                                //     "isExpand": true,
                                //     "width": "400px",
                                //     "style": {}
                                // },
                                {
                                    "title": "ACTION",
                                    "type": "action",
                                    "width": "150px",
                                    "actionIds": [
                                        "city_new_row", "city_cancel_new_row", "city_edit", "city_save", "city_cancel", "city_delete"
                                    ]
                                }
                            ],
                            "rowActions": [
                                {
                                    "id": "city_new_row",
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
                                            "ajaxId": "add_city_1",
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
                                    "id": "city_cancel_new_row",
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
                                    "id": "city_edit",
                                    "state": "text",
                                    "text": "编辑",
                                    "icon": "save",
                                    "color": "text-primary",
                                    "type": "link",
                                    "size": "small",
                                    "hidden": false,
                                    "execute": [
                                        {
                                            "triggerType": "STATE",
                                            "trigger": "EDIT_ROW"
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
                                    "id": "city_save",
                                    "text": "保存",
                                    "state": "text",
                                    "icon": "save",
                                    "color": "text-primary",
                                    "type": "link",
                                    "size": "small",
                                    "hidden": true,
                                    "execute": [
                                        {
                                            "triggerType": "OPERATION",
                                            "trigger": "SAVE_ROW",
                                            "ajaxId": "edit_city_1",
                                            // "stateId": "add_save_1",
                                            // "conditionId": "add_save_1"
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
                                    "id": "city_cancel",
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
                                            "trigger": "CANCEL_EDIT_ROW"
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
                                    "id": "city_delete",
                                    "text": "删除",
                                    "state": "text",
                                    "icon": "delete",
                                    "type": "link",
                                    "color": "primary",
                                    "size": "small",
                                    "hidden": false,
                                    "execute": [
                                        {
                                            "triggerType": "OPERATION",
                                            "trigger": "EXECUTE_SELECTED_ROW",
                                            // "conditionId": "delete_operation_1",
                                            "ajaxId": "city_delete_1"
                                        }
                                    ]
                                }
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
                                                        "value": "view_01",
                                                        "type": "value"
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        "id": "afterCitySaveSuccessfully",
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
                                                "receiverTrigger": "CHANGE_ADDED_ROWS_TO_TEXT",
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
                                            "senderId": "afterCitySaveSuccessfully"
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
                id: "3vlDRq",
                type: "row"
            }
        ]
    };

    public beforeOperation = [
        {
            name: "D_addRow",
            status: [
                {
                    conditions: [
                        [
                            {
                                name: "_recordstatus",
                                value: 2,
                                checkType: "value"
                            },
                            {
                                name: "_recods",
                                value: 3,
                                checkType: "value"
                            },
                            {
                                "ajaxConfig": {
                                    "url": "information/testList",
                                    "ajaxType": "GET",
                                    "params": [
                                        {
                                            "name": "state",
                                            "type": "value",
                                            "value": "D"
                                        }
                                    ]
                                },
                                "checkType": "executeAjax"
                            }
                        ],
                        [
                            {
                                name: "_recordstatus",
                                value: 1,
                                checkType: "value"
                            },
                            {
                                name: "_recods",
                                value: 1,
                                checkType: "value"
                            }
                        ]
                    ],
                    action: {
                        type: "warning",
                        message: "在当前状态下，无法新增",
                        execute: "prevent"
                    }
                },
                {
                    conditions: [
                        [
                            {
                                name: "_resourcesreceiveid1",
                                value: "undefinded",
                                checkType: "value"
                            }
                        ]
                    ],
                    action: {
                        type: "info",
                        message: "主表未选中数据，无法新增！",
                        execute: "prevent"
                    }
                },
                {
                    conditions: [
                        [
                            {
                                tempValue: "_createUserId",
                                cacheValue: "accountId",
                                checkType: "innerValue"
                            }
                            // {
                            //     "ajaxConfig": {
                            //         "url": "https://jsonplaceholder.typicode.com/users",
                            //         "ajaxType": "GET",
                            //         "params": []
                            //     },
                            //     "checkType": "executeAjax"
                            // }
                        ]
                    ],
                    action: {
                        type: "info",
                        message: "对他人创建的数据只有浏览权限，没有编辑权限",
                        execute: "prevent"
                    }
                }
            ]
        }
    ];

    public dataConfig = {
        entity: "CaseDemo",
        targetViewId: "",
        type: "array",
        properties: [
            {
                name: "id",
                field: "id",
                text: "entity.data.name",
                value: "1",
                dataType: "string"
            },
            {
                name: "code",
                field: "code",
                text: "entity.data.code",
                value: "",
                dataType: "string"
            },
            {
                name: "language",
                field: "language",
                text: "entity.data.language",
                value: "",
                dataType: "string"
            },
            {
                name: "message",
                field: "message",
                text: "entity.data.message",
                value: "",
                dataType: "string"
            }
        ],
        children: [
            {
                entity: "validation",
                targetViewId: "",
                type: "array",
                properties: [
                    {
                        name: "code",
                        field: "code",
                        text: "entity.data.code",
                        value: "",
                        dataType: "string"
                    },
                    {
                        name: "msg",
                        field: "message",
                        text: "entity.data.message",
                        value: "",
                    }
                ],
                children: [
                    {
                        entity: "data",
                        targetViewId: "",
                        properties: [
                            {
                                name: "id",
                                field: "id",
                                text: "entity.data.name",
                                value: "1",
                                dataType: "string"
                            },
                            {
                                name: "code",
                                field: "code",
                                text: "entity.data.code",
                                value: "",
                                dataType: "string"
                            },
                            {
                                name: "language",
                                field: "language",
                                text: "entity.data.language",
                                value: "",
                                dataType: "string"
                            },
                            {
                                name: "message",
                                field: "message",
                                text: "entity.data.message",
                                value: "",
                                dataType: "string"
                            }
                        ]
                    }
                ]
            },
            {
                entity: "error",
                targetViewId: "",
                properties: [
                    {
                        name: "code",
                        field: "code",
                        text: "entity.data.code",
                        value: "",
                        dataType: "string"
                    },
                    {
                        name: "msg",
                        field: "message",
                        text: "entity.data.message",
                        value: "",
                    }
                ],
                children: [
                    {
                        entity: "data",
                        targetViewId: "",
                        properties: [
                            {
                                name: "id",
                                field: "id",
                                text: "entity.data.name",
                                value: "1",
                                dataType: "string"
                            },
                            {
                                name: "code",
                                field: "code",
                                text: "entity.data.code",
                                value: "",
                                dataType: "string"
                            },
                            {
                                name: "language",
                                field: "language",
                                text: "entity.data.language",
                                value: "",
                                dataType: "string"
                            },
                            {
                                name: "message",
                                field: "message",
                                text: "entity.data.message",
                                value: "",
                                dataType: "string"
                            }
                        ]
                    }
                ]
            }
        ]
    }

    testResult: Observable<any>;

    constructor(
        @Inject(BSN_COMPONENT_SERVICES) private _componentServices: ComponentServiceProvider,
    ) {
        super(_componentServices);
    }

    public ngOnInit() {


    }

    public click() {
        this.load();
    }

    private load() {
        const beforeOperation = new BeforeOperationResolver(this.beforeOperation,
            {

            },
            {
                accountId: "user1"
            },
            {
                _createUserId: "user1"
            }, this._componentServices.apiService, this._componentServices.modalService, this._componentServices.msgService);
        beforeOperation.operationItemData = {
            _recordstatus: 1,
            _recods: 1,
            _resourcesreceiveid1: "undefined",
            _createUserId: "1"
        }
        this.testResult = beforeOperation.buildStatusObservableByStatusCfg({ name: "D_addRow" }).pipe(reduce((a, b) => a || b));

        const s = new BusinessObjectBase();
        // console.log(s.resolver(s.dataConfig));
        const t = s.resolver(this.dataConfig);
        t.addProperty("caseText", "123456");
        t.editProperty("caseText", "67890");
        // t.removeProperty("caseText");

        t.addChildren("validation", { code: "2", msg: "2", data: {} });
        t.addChildren("error", [{ code: "3", msg: "3", data: {} }, { code: "4", msg: "4", data: {} }]);
        // t.orderChange({ groupName: "2", id: "2" }, { groupName: "4", id: "4" }, "group");

        console.log(t);
    }
}