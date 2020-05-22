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
        "type": "pageHeader",
        "title": "布局4K0naM",
        "container": "pageHeader",
        "pageHeader": {
            "id": "pageheader_1",
            "title": "SQL 语句建模",
            "subTitle": "该功能可以将用户自己编写的SQL语句、代码块以及存储过程,发布成为系统可提供的API资源,并提供外部程序进行访问",
            "tagColor": "blue",
            "tagText": "系统功能",
            "descColumnsCount": 2,
            "operation": [],
            "contentItems": [
                {
                    "title": "注意事项",
                    "text": "创建SQL资源或者修改SQL资源后,需要通过建模功能,发布API资源",
                    "span": 2
                }
            ],
            "extraItems": [],
            "defaultLoading": true,
            "layout": {
                "id": "4K0naM",
                "type": "layout",
                "title": "布局4K0naM",
                "container": "rows",
                "rows": [
                    {
                        "cols": [
                            // {
                            //     "id": "lsWPaU",
                            //     "col": "cc",
                            //     "type": "col",
                            //     "titlestate": 1,
                            //     "title": "",
                            //     "span": 24,
                            //     "container": "component",
                            //     "size": { "nzXs": 24, "nzSm": 24, "nzMd": 24, "nzLg": 24, "ngXl": 24, "nzXXl": 24 },
                            //     "component": {
                            //         "id": "toolbar_002",
                            //         "component": "cnToolbar",
                            //         "size": "default",
                            //         "cascade": {

                            //         },
                            //         "condition": [
                            //             {
                            //                 "id": "add_state_1",
                            //                 "state": [
                            //                     {
                            //                         "type": "component",
                            //                         "valueName": "ROWS_CHECKED",
                            //                         "expression": [
                            //                             {
                            //                                 "type": "property",
                            //                                 "name": "length",
                            //                                 "matchValue": 0,
                            //                                 "match": "gt"
                            //                             },
                            //                             {
                            //                                 "type": "element",
                            //                                 "name": "descName",
                            //                                 "matchValue": "1",
                            //                                 "match": "eq",
                            //                             }
                            //                         ]
                            //                     }
                            //                 ]
                            //             },
                            //             {
                            //                 "id": "edit_state_1",
                            //                 "state": [
                            //                     {
                            //                         "type": "component",
                            //                         "valueName": "ROWS_CHECKED",
                            //                         "expression": [
                            //                             {
                            //                                 "type": "property",
                            //                                 "name": "length",
                            //                                 "matchValue": 0,
                            //                                 "match": "gt"
                            //                             }
                            //                         ]
                            //                     }
                            //                 ]
                            //             },
                            //             {
                            //                 "id": "add_save_1",
                            //                 "state": [
                            //                     {
                            //                         "type": "component",
                            //                         "valueName": "FORM_STATE",
                            //                         "expression": [
                            //                             {
                            //                                 "type": "property",
                            //                                 "name": "",
                            //                                 "matchValue": "new",
                            //                                 "match": "eq"
                            //                             }
                            //                         ]
                            //                     }
                            //                 ]
                            //             },
                            //             {
                            //                 "id": "edit_save_1",
                            //                 "state": [
                            //                     {
                            //                         "type": "component",
                            //                         "valueName": "FORM_STATE",
                            //                         "expression": [
                            //                             {
                            //                                 "type": "property",
                            //                                 "name": "",
                            //                                 "matchValue": "edit",
                            //                                 "match": "eq"
                            //                             }
                            //                         ]
                            //                     }

                            //                 ]
                            //             }

                            //         ],
                            //         "ajaxConfig": [
                            //             {
                            //                 "id": "add_save_1",
                            //                 "url": "resource/insert",
                            //                 "urlType": "inner",
                            //                 "ajaxType": "post",
                            //                 "params": [
                            //                     {
                            //                         "name": "resourceName",
                            //                         "type": "componentValue",
                            //                         "valueName": "RESOURCE_NAME"
                            //                     },
                            //                     {
                            //                         "name": "descName",
                            //                         "type": "componentValue",
                            //                         "valueName": "DESC_NAME"
                            //                     },
                            //                     {
                            //                         "name": "content",
                            //                         "type": "componentValue",
                            //                         "valueName": "CONTENT"
                            //                     },
                            //                     {
                            //                         "name": "resourceType",
                            //                         "type": "value",
                            //                         "value": 1
                            //                     }
                            //                 ],
                            //                 "outputParameters": [

                            //                 ],
                            //                 "result": [
                            //                     {
                            //                         "name": "data",
                            //                         "showMessageWithNext": 0,
                            //                         "message": "message.ajax.state.success",
                            //                         "senderId": "afterSQLSaveSuccess"
                            //                     },
                            //                     // {
                            //                     //     "name": "validation",
                            //                     //     "showMessageWithNext": 0,
                            //                     //     "message": "message.ajax.state.success",
                            //                     //     "senderId": "afterCitySaveValidation"
                            //                     // },
                            //                 ]
                            //             },
                            //             {
                            //                 "id": "edit_save_1",
                            //                 "url": "resource/update",
                            //                 "urlType": "inner",
                            //                 "ajaxType": "put",
                            //                 "params": [
                            //                     {
                            //                         "name": "id",
                            //                         "type": "tempValue",
                            //                         "valueName": "_ID"
                            //                     },
                            //                     {
                            //                         "name": "resourceName",
                            //                         "type": "componentValue",
                            //                         "valueName": "RESOURCE_NAME"
                            //                     },
                            //                     {
                            //                         "name": "descName",
                            //                         "type": "componentValue",
                            //                         "valueName": "DESC_NAME"
                            //                     },
                            //                     {
                            //                         "name": "content",
                            //                         "type": "componentValue",
                            //                         "valueName": "CONTENT"
                            //                     },
                            //                     {
                            //                         "name": "resourceType",
                            //                         "type": "value",
                            //                         "value": 1
                            //                     }
                            //                 ],
                            //                 "outputParameters": [

                            //                 ],
                            //                 "result": [
                            //                     {
                            //                         "name": "data",
                            //                         "showMessageWithNext": 0,
                            //                         "message": "message.ajax.state.success",
                            //                         "senderId": "afterSQLSaveSuccess"
                            //                     },
                            //                     // {
                            //                     //     "name": "validation",
                            //                     //     "showMessageWithNext": 0,
                            //                     //     "message": "message.ajax.state.success",
                            //                     //     "senderId": "afterCitySaveValidation"
                            //                     // },
                            //                 ]
                            //             },
                            //             {
                            //                 "id": "create_sql_model",
                            //                 "url": "resource/createModel",
                            //                 "urlType": "inner",
                            //                 "ajaxType": "post",
                            //                 "params": [
                            //                     {
                            //                         "name": "id",
                            //                         "type": "item",
                            //                         "valueName": "ID"
                            //                     }
                            //                 ],
                            //                 "outputParameters": [

                            //                 ],
                            //                 "result": [
                            //                     {
                            //                         "name": "data",
                            //                         "showMessageWithNext": 0,
                            //                         "message": "message.ajax.state.success",
                            //                         "senderId": "afterSQLModelSuccess"
                            //                     },
                            //                     // {
                            //                     //     "name": "validation",
                            //                     //     "showMessageWithNext": 0,
                            //                     //     "message": "message.ajax.state.success",
                            //                     //     "senderId": "afterCitySaveValidation"
                            //                     // },
                            //                 ]
                            //             },
                            //             {
                            //                 "id": "cancel_sql_model",
                            //                 "url": "resource/cancelModel",
                            //                 "urlType": "inner",
                            //                 "ajaxType": "post",
                            //                 "params": [
                            //                     {
                            //                         "name": "id",
                            //                         "type": "item",
                            //                         "valueName": "ID"
                            //                     }
                            //                 ],
                            //                 "outputParameters": [

                            //                 ],
                            //                 "result": [
                            //                     {
                            //                         "name": "data",
                            //                         "showMessageWithNext": 0,
                            //                         "message": "message.ajax.state.success",
                            //                         "senderId": "afterSQLModelSuccess"
                            //                     },
                            //                     // {
                            //                     //     "name": "validation",
                            //                     //     "showMessageWithNext": 0,
                            //                     //     "message": "message.ajax.state.success",
                            //                     //     "senderId": "afterCitySaveValidation"
                            //                     // },
                            //                 ]
                            //             }
                            //         ],
                            //         "builtinConfig": [
                            //             {
                            //                 "id": "add_state_1",
                            //                 "event": "formStateChange", // 内置方法
                            //                 "state": "new",
                            //             },
                            //             {
                            //                 "id": "edit_state_1",
                            //                 "event": "formStateChange", // 内置方法
                            //                 "state": "edit",
                            //             },
                            //             {
                            //                 "id": "cancel_state_1",
                            //                 "event": "formStateChange", // 内置方法
                            //                 "state": "text",
                            //             }
                            //         ],
                            //         "beforeTrigger": [

                            //         ],
                            //         "afterTrigger": [
                            //             {
                            //                 "id": "edit_save_1",
                            //                 "senderId": "form_sql",
                            //                 "sendData": [
                            //                     {
                            //                         "beforeSend": [],
                            //                         "reveicerId": "",
                            //                         "receiverTriggerType": "BEHAVIOR",
                            //                         "receiverTrigger": "REFRESH_AS_CHILD",
                            //                         "params": [
                            //                         ]
                            //                     }
                            //                 ]
                            //             }
                            //         ],
                            //         "toolbar": [
                            //             {
                            //                 "targetViewId": "form_sql",
                            //                 "group": [
                            //                     {
                            //                         "id": "M_addRow",
                            //                         "text": "创建资源",
                            //                         "icon": "plus",
                            //                         "color": "text-primary",
                            //                         "hidden": false,
                            //                         "disabled": false,
                            //                         "state": "new",
                            //                         "execute": [
                            //                             {
                            //                                 "triggerType": "STATE",
                            //                                 "trigger": "ADD_FORM",
                            //                                 // "conditionId": "add_state_1"
                            //                                 "builtinId": "add_state_1"

                            //                             }
                            //                         ],
                            //                         "toggle": {
                            //                             "type": "state",
                            //                             "toggleProperty": "hidden",
                            //                             "values": [
                            //                                 {
                            //                                     "name": "edit",
                            //                                     "value": true
                            //                                 },
                            //                                 {
                            //                                     "name": "text",
                            //                                     "value": false
                            //                                 },
                            //                                 {
                            //                                     "name": "cancel",
                            //                                     "value": false
                            //                                 },
                            //                                 {
                            //                                     "name": "new",
                            //                                     "value": true
                            //                                 },

                            //                             ]
                            //                         }
                            //                     },
                            //                     {
                            //                         "id": "M_updateRow",
                            //                         "text": "编辑资源",
                            //                         "icon": "edit",
                            //                         "color": "text-success",
                            //                         "hidden": false,
                            //                         "disabled": false,
                            //                         "state": "edit",
                            //                         "execute": [
                            //                             {
                            //                                 "triggerType": "STATE",
                            //                                 "trigger": "EDIT_FORM",
                            //                                 "builtinId": "edit_state_1"
                            //                             }
                            //                         ],
                            //                         "toggle": {
                            //                             "type": "state",
                            //                             "toggleProperty": "hidden",
                            //                             "values": [
                            //                                 {
                            //                                     "name": "edit",
                            //                                     "value": true
                            //                                 },
                            //                                 {
                            //                                     "name": "new",
                            //                                     "value": true
                            //                                 },
                            //                                 {
                            //                                     "name": "text",
                            //                                     "value": false
                            //                                 },
                            //                                 {
                            //                                     "name": "cancel",
                            //                                     "value": false
                            //                                 }
                            //                             ]
                            //                         }
                            //                     },
                            //                     {
                            //                         "id": "M_saveRow",
                            //                         "text": "保存",
                            //                         "icon": "save",
                            //                         "color": "text-primary",
                            //                         "hidden": true,
                            //                         "disabled": false,
                            //                         "execute": [
                            //                             {
                            //                                 "triggerType": "OPERATION",
                            //                                 "trigger": "EXECUTE",
                            //                                 "ajaxId": "add_save_1",
                            //                                 // "stateId": "add_save_1",
                            //                                 "conditionId": "add_save_1"
                            //                             },
                            //                             {
                            //                                 "triggerType": "OPERATION",
                            //                                 "trigger": "EXECUTE",
                            //                                 // "stateId": "edit_save_1",
                            //                                 "ajaxId": "edit_save_1",
                            //                                 "conditionId": "edit_save_1",
                            //                                 // "afterId": "edit_save_1"
                            //                             }
                            //                         ],
                            //                         "toggle": {
                            //                             "type": "state",
                            //                             "toggleProperty": "hidden",
                            //                             "values": [
                            //                                 {
                            //                                     "name": "edit",
                            //                                     "value": false
                            //                                 },
                            //                                 {
                            //                                     "name": "new",
                            //                                     "value": false
                            //                                 },
                            //                                 {
                            //                                     "name": "text",
                            //                                     "value": true
                            //                                 },
                            //                                 {
                            //                                     "name": "cancel",
                            //                                     "value": true
                            //                                 }
                            //                             ]
                            //                         }
                            //                     },
                            //                     {
                            //                         "id": "M_cancelrow",
                            //                         "text": "取消",
                            //                         "triggerType": "STATE",
                            //                         "trigger": "CANCEL",
                            //                         "icon": "rollback",
                            //                         "color": "text-grey-darker",
                            //                         "hidden": true,
                            //                         "disabled": null,
                            //                         "execute": [
                            //                             {
                            //                                 "triggerType": "STATE",
                            //                                 "trigger": "CANCEL",
                            //                                 "builtinId": "cancel_state_1"
                            //                             }
                            //                         ],
                            //                         "state": "cancel",
                            //                         "toggle": {
                            //                             "type": "state",
                            //                             "toggleProperty": "hidden",
                            //                             "values": [
                            //                                 {
                            //                                     "name": "edit",
                            //                                     "value": false
                            //                                 },
                            //                                 {
                            //                                     "name": "new",
                            //                                     "value": false
                            //                                 },
                            //                                 {
                            //                                     "name": "text",
                            //                                     "value": true
                            //                                 },
                            //                                 {
                            //                                     "name": "cancel",
                            //                                     "value": true
                            //                                 }
                            //                             ]
                            //                         }
                            //                     }
                            //                 ]
                            //             },
                            //             {
                            //                 "targetViewId": "sql_grid_view",
                            //                 "group": [
                            //                     {
                            //                         "id": "M_updateRows",
                            //                         "text": "发布资源",
                            //                         "icon": "build",
                            //                         "color": "primary",
                            //                         "hidden": false,
                            //                         "disabled": false,
                            //                         "state": "text",
                            //                         "execute": [
                            //                             {
                            //                                 "triggerType": "OPERATION",
                            //                                 "trigger": "EXECUTE_SELECTED_ROW",
                            //                                 // "builtinId": "cancel_state_1",
                            //                                 "ajaxId": "create_sql_model"
                            //                             }
                            //                         ]
                            //                     },
                            //                     {
                            //                         "id": "M_cancelRows",
                            //                         "text": "取消发布",
                            //                         "icon": "build",
                            //                         "color": "dashed",
                            //                         "hidden": false,
                            //                         "disabled": false,
                            //                         "state": "text",
                            //                         "execute": [
                            //                             {
                            //                                 "triggerType": "OPERATION",
                            //                                 "trigger": "EXECUTE_SELECTED_ROW",
                            //                                 // "builtinId": "cancel_state_1",
                            //                                 "ajaxId": "cancel_sql_model"
                            //                             }
                            //                         ]
                            //                     }
                            //                 ]
                            //             }
                            //         ]
                            //     }
                            // },
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
                                    "id": "view_sql_search",
                                    "type": "form",
                                    "component": "form",
                                    "state": "edit",
                                    "loadingConfig": {
                                        "id": "loadBusinessObject"
                                    },
                                    "cascade": {
                                        "messageSender": [
                                            {
                                                "id": "afterSelectValueChange",
                                                "senderId": "view_sql_search",
                                                "sendData": [
                                                    {
                                                        "beforeSend": {},
                                                        "reveicerId": "",
                                                        "receiverTriggerType": "BEHAVIOR",
                                                        "receiverTrigger": "LOAD_BY_FILTER",
                                                        "params": [
                                                            {
                                                                "name": "_SNAME",
                                                                "type": "returnValue",
                                                                "valueName": "_SNAME",
                                                                "valueTo": "tempValue"
                                                            }
                                                        ]
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    "cascadeValue": [
                                        {
                                            "type": "",
                                            "controlId": "search_name",
                                            "name": "SNAME",
                                            "CascadeObjects": [
                                                {
                                                    "controlId": "search_name",
                                                    "cascadeName": "SNAME",
                                                    "cascadeItems": [
                                                        {
                                                            "type": "default",
                                                            "content": {
                                                                "type": "relation",
                                                                "sender": {
                                                                    "name": "validation",
                                                                    "message": "message.ajax.state.success",
                                                                    "senderId": "afterSelectValueChange"
                                                                },
                                                                "data": {
                                                                    "option": [
                                                                        {
                                                                            "name": "_SNAME",
                                                                            "type": "selectObjectValue",
                                                                            "valueName": "SNAME"
                                                                        }
                                                                    ]
                                                                }
                                                            }
                                                        }
                                                    ]
                                                }
                                            ]
                                        },
                                        // {
                                        //     "type": "",
                                        //     "controlId": "res_ref_id",
                                        //     "name": "refResourceId",
                                        //     "CascadeObjects": [
                                        //         {
                                        //             "controlId": "res_refField",
                                        //             "cascadeName": "refParentResourcePropId",
                                        //             "cascadeItems": [
                                        //                 {
                                        //                     "type": "default",
                                        //                     "content": {
                                        //                         "type": "ajax",
                                        //                         "data": {
                                        //                             "option": [
                                        //                                 {
                                        //                                     "name": "_TABLE_ID",
                                        //                                     "type": "selectValue",
                                        //                                     "valueName": "id"
                                        //                                 }
                                        //                             ]
                                        //                         }
                                        //                     }
                                        //                 }

                                        //             ]
                                        //         }
                                        //     ],
                                        // },
                                        // {
                                        //     "type": "",
                                        //     "controlId": "res_refSQL",
                                        //     "name": "sqlList",
                                        //     "CascadeObjects": [
                                        //         {
                                        //             "controlId": "res_refSQL",
                                        //             "cascadeName": "sqlList",
                                        //             "cascadeItems": [
                                        //                 {
                                        //                     "type": "default",
                                        //                     "content": {
                                        //                         "type": "setValue",
                                        //                         "data": {
                                        //                             "option": [
                                        //                                 {
                                        //                                     // "name": "_TYPE",
                                        //                                     "type": "dataList",
                                        //                                     // "valueName": "refResourceType"
                                        //                                 }
                                        //                             ]
                                        //                         }
                                        //                     }
                                        //                 }

                                        //             ]
                                        //         }
                                        //     ]
                                        // }
                                    ],
                                    "formLayout": {
                                        "id": "b86s2i",
                                        "type": "layout",
                                        "title": "表单布局b86s2i",
                                        "rows": [
                                            {
                                                "id": "MefhXa",
                                                "type": "row",
                                                "cols": [
                                                    {
                                                        "id": "col_2",
                                                        "col": "cc",
                                                        "type": "col",
                                                        "title": "列ioj0mV",
                                                        "span": 12,
                                                        "layoutContain": "select",
                                                        "size": {
                                                            "nzXs": 24,
                                                            "nzSm": 24,
                                                            "nzMd": 24,
                                                            "nzLg": { "span": 12, "offset": 12 },
                                                            "ngXl": { "span": 12, "offset": 12 },
                                                            "nzXXl": { "span": 12, "offset": 12 }
                                                        },
                                                        "control": {
                                                            "id": "search_name"
                                                        }
                                                    },
                                                    // {
                                                    //     "id": "col_2",
                                                    //     "col": "cc",
                                                    //     "type": "col",
                                                    //     "title": "列ioj0mV",
                                                    //     "span": 12,
                                                    //     "layoutContain": "select",
                                                    //     "size": {
                                                    //         "nzXs": 24,
                                                    //         "nzSm": 24,
                                                    //         "nzMd": 12,
                                                    //         "nzLg": 12,
                                                    //         "ngXl": 12,
                                                    //         "nzXXl": 12
                                                    //     },
                                                    //     "control": {
                                                    //         "id": "search_reset"
                                                    //     }
                                                    // }
                                                ]
                                            }
                                        ]
                                    },
                                    "formControls": [
                                        {
                                            "id": "search_name",
                                            "hidden": false,
                                            "title": "SQL 名称",
                                            "titleConfig": {
                                                "required": false
                                            },
                                            "field": "SNAME",
                                            "labelSize": {
                                                "span": 4,
                                                "nzXs": 4,
                                                "nzSm": 4,
                                                "nzMd": 4,
                                                "nzLg": 4,
                                                "ngXl": 4,
                                                "nzXXl": 4
                                            },
                                            "controlSize": {
                                                "span": 20,
                                                "nzXs": {
                                                    "span": 20,
                                                    "offset": 0
                                                },
                                                "nzSm": {
                                                    "span": 20,
                                                    "offset": 0
                                                },
                                                "nzMd": {
                                                    "span": 20,
                                                    "offset": 0
                                                },
                                                "nzLg": {
                                                    "span": 20,
                                                    "offset": 0
                                                },
                                                "ngXl": {
                                                    "span": 20,
                                                    "offset": 0
                                                },
                                                "nzXXl": {
                                                    "span": 20,
                                                    "offset": 0
                                                }
                                            },
                                            "state": "edit",
                                            "text": {
                                                "type": "label",
                                                "field": "SNAME"
                                            },
                                            "editor": {
                                                "type": "searchSelect",
                                                "field": "SNAME",
                                                "showSearch": true,
                                                "serverSearch": true,
                                                "loadingConfig": {
                                                    "id": "loadBusinessNameValue"
                                                },
                                                "labelName": "SNAME",
                                                "valueName": "SNAME",
                                                "placeholder": "请输入查找内容..."
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
                                                {
                                                    "id": "search_name",
                                                    "state": "edit",
                                                    "hidden": false,
                                                    "readOnly": false
                                                },
                                                // {
                                                //     "id": "search_reset",
                                                //     "state": "edit",
                                                //     "hidden": false,
                                                //     "readOnly": false
                                                // }
                                            ]
                                        },
                                        {
                                            "formState": "edit",
                                            "Controls": [
                                                {
                                                    "id": "search_name",
                                                    "state": "edit",
                                                    "hidden": false,
                                                    "readOnly": false
                                                },
                                                // {
                                                //     "id": "search_reset",
                                                //     "state": "edit",
                                                //     "hidden": false,
                                                //     "readOnly": false
                                                // }
                                            ]
                                        },
                                        {
                                            "formState": "text",
                                            "Controls": [
                                                {
                                                    "id": "search_name",
                                                    "state": "edit",
                                                    "hidden": false,
                                                    "readOnly": false
                                                },
                                                // {
                                                //     "id": "search_reset",
                                                //     "state": "edit",
                                                //     "hidden": false,
                                                //     "readOnly": false
                                                // }
                                            ]
                                        }
                                    ],
                                    "ajaxConfig": [
                                        {
                                            "id": "loadBusinessNameValue",
                                            "url": "resource/GET_DM_SQL_LIST/query",
                                            "urlType": "inner",
                                            "ajaxType": "get",
                                            "params": [
                                                {
                                                    "name": "SNAME",
                                                    "search": true,
                                                    "conditionType": "ctn"
                                                },
                                                // {
                                                //     "name": "_mapToObject",
                                                //     "type": "value",
                                                //     "value": true
                                                // }
                                            ],
                                            "outputParameters": [],
                                            "result": []

                                        }
                                    ]
                                }
                            },
                            {
                                "id": "r5zDHB",
                                "col": "cc",
                                "type": "col",
                                "title": "",
                                "span": 10,
                                "container": "component",
                                "bodyStyle": {
                                    "min-height": "700px"
                                },
                                "header": {
                                    "title": "SQL 编辑",
                                    "icon": "edit",
                                    "toolbar": {
                                        "id": "toolbar_002",
                                        "component": "cnToolbar",
                                        "size": "default",
                                        "cascade": {
                                            "messageReceiver": [
                                                {
                                                    "id": "",
                                                    "senderId": "form_sql",
                                                    "receiveData": [
                                                        {
                                                            "beforeReceive": [],
                                                            "triggerType": "STATE",
                                                            "trigger": "STATE_TO_TEXT",
                                                            // "params": [
                                                            //     {
                                                            //         "pname": "_ID",
                                                            //         "cname": "_ID",
                                                            //         "valueTo": "tempValue"
                                                            //     }
                                                            // ]
                                                        }
                                                    ]
                                                }
                                            ]
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
                                                                "name": "descName",
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
                                                                "matchValue": "new",
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
                                                                "matchValue": "edit",
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
                                                "url": "resource/insert",
                                                "urlType": "inner",
                                                "ajaxType": "post",
                                                "params": [
                                                    {
                                                        "name": "resourceName",
                                                        "type": "componentValue",
                                                        "valueName": "RESOURCE_NAME"
                                                    },
                                                    {
                                                        "name": "descName",
                                                        "type": "componentValue",
                                                        "valueName": "DESC_NAME"
                                                    },
                                                    {
                                                        "name": "content",
                                                        "type": "componentValue",
                                                        "valueName": "CONTENT"
                                                    },
                                                    {
                                                        "name": "resourceType",
                                                        "type": "value",
                                                        "value": 1
                                                    }
                                                ],
                                                "outputParameters": [

                                                ],
                                                "result": [
                                                    {
                                                        "name": "data",
                                                        "showMessageWithNext": 0,
                                                        "message": "message.ajax.state.success",
                                                        "senderId": "afterSQLSaveSuccess"
                                                    },
                                                    // {
                                                    //     "name": "validation",
                                                    //     "showMessageWithNext": 0,
                                                    //     "message": "message.ajax.state.success",
                                                    //     "senderId": "afterCitySaveValidation"
                                                    // },
                                                ]
                                            },
                                            {
                                                "id": "edit_save_1",
                                                "url": "resource/update",
                                                "urlType": "inner",
                                                "ajaxType": "put",
                                                "params": [
                                                    {
                                                        "name": "id",
                                                        "type": "tempValue",
                                                        "valueName": "_ID"
                                                    },
                                                    {
                                                        "name": "resourceName",
                                                        "type": "componentValue",
                                                        "valueName": "RESOURCE_NAME"
                                                    },
                                                    {
                                                        "name": "descName",
                                                        "type": "componentValue",
                                                        "valueName": "DESC_NAME"
                                                    },
                                                    {
                                                        "name": "content",
                                                        "type": "componentValue",
                                                        "valueName": "CONTENT"
                                                    },
                                                    {
                                                        "name": "resourceType",
                                                        "type": "value",
                                                        "value": 1
                                                    }
                                                ],
                                                "outputParameters": [

                                                ],
                                                "result": [
                                                    {
                                                        "name": "data",
                                                        "showMessageWithNext": 0,
                                                        "message": "message.ajax.state.success",
                                                        "senderId": "afterSQLSaveSuccess"
                                                    },
                                                    // {
                                                    //     "name": "validation",
                                                    //     "showMessageWithNext": 0,
                                                    //     "message": "message.ajax.state.success",
                                                    //     "senderId": "afterCitySaveValidation"
                                                    // },
                                                ]
                                            },
                                            {
                                                "id": "create_sql_model",
                                                "url": "resource/createModel",
                                                "urlType": "inner",
                                                "ajaxType": "post",
                                                "params": [
                                                    {
                                                        "name": "id",
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
                                                        "senderId": "afterSQLModelSuccess"
                                                    },
                                                    // {
                                                    //     "name": "validation",
                                                    //     "showMessageWithNext": 0,
                                                    //     "message": "message.ajax.state.success",
                                                    //     "senderId": "afterCitySaveValidation"
                                                    // },
                                                ]
                                            },
                                            {
                                                "id": "cancel_sql_model",
                                                "url": "resource/cancelModel",
                                                "urlType": "inner",
                                                "ajaxType": "post",
                                                "params": [
                                                    {
                                                        "name": "id",
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
                                                        "senderId": "afterSQLModelSuccess"
                                                    },
                                                    // {
                                                    //     "name": "validation",
                                                    //     "showMessageWithNext": 0,
                                                    //     "message": "message.ajax.state.success",
                                                    //     "senderId": "afterCitySaveValidation"
                                                    // },
                                                ]
                                            }
                                        ],
                                        "builtinConfig": [
                                            {
                                                "id": "add_state_1",
                                                "event": "formStateChange", // 内置方法
                                                "state": "new",
                                            },
                                            {
                                                "id": "edit_state_1",
                                                "event": "formStateChange", // 内置方法
                                                "state": "edit",
                                            },
                                            {
                                                "id": "cancel_state_1",
                                                "event": "formStateChange", // 内置方法
                                                "state": "text",
                                            }
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
                                                        "text": "创建资源",
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
                                                                {
                                                                    "name": "save",
                                                                    "value": false
                                                                }
                                                            ]
                                                        }
                                                    },
                                                    {
                                                        "id": "M_updateRow",
                                                        "text": "编辑资源",
                                                        "icon": "edit",
                                                        "color": "text-success",
                                                        "hidden": false,
                                                        "disabled": false,
                                                        "state": "edit",
                                                        "execute": [
                                                            {
                                                                "triggerType": "STATE",
                                                                "trigger": "EDIT_FORM",
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
                                                                },
                                                                {
                                                                    "name": "save",
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
                                                        "state": "save",
                                                        "execute": [
                                                            {
                                                                "triggerType": "OPERATION",
                                                                "trigger": "EXECUTE",
                                                                "ajaxId": "add_save_1",
                                                                // "stateId": "add_save_1",
                                                                "conditionId": "add_save_1"
                                                            },
                                                            {
                                                                "triggerType": "OPERATION",
                                                                "trigger": "EXECUTE",
                                                                // "stateId": "edit_save_1",
                                                                "ajaxId": "edit_save_1",
                                                                "conditionId": "edit_save_1",
                                                                "builtinId": "cancel_state_1"
                                                                // "afterId": "edit_save_1"
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
                                                                },
                                                                {
                                                                    "name": "save",
                                                                    "value": true
                                                                }
                                                            ]
                                                        }
                                                    },
                                                    {
                                                        "id": "M_cancelrow",
                                                        "text": "取消",
                                                        // "triggerType": "STATE",
                                                        // "trigger": "CANCEL",
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
                                                                },
                                                                {
                                                                    "name": "save",
                                                                    "value": true
                                                                }
                                                            ]
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                "targetViewId": "sql_grid_view",
                                                "group": [
                                                    {
                                                        "id": "M_updateRows",
                                                        "text": "发布资源",
                                                        "icon": "build",
                                                        "color": "primary",
                                                        "hidden": false,
                                                        "disabled": false,
                                                        "state": "text",
                                                        "execute": [
                                                            {
                                                                "triggerType": "OPERATION",
                                                                "trigger": "EXECUTE_SELECTED_ROW",
                                                                // "builtinId": "cancel_state_1",
                                                                "ajaxId": "create_sql_model"
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        "id": "M_cancelRows",
                                                        "text": "取消发布",
                                                        "icon": "build",
                                                        "color": "dashed",
                                                        "hidden": false,
                                                        "disabled": false,
                                                        "state": "text",
                                                        "execute": [
                                                            {
                                                                "triggerType": "OPERATION",
                                                                "trigger": "EXECUTE_SELECTED_ROW",
                                                                // "builtinId": "cancel_state_1",
                                                                "ajaxId": "cancel_sql_model"
                                                            }
                                                        ]
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                },
                                "size": {
                                    "nzXs": 24,
                                    "nzSm": 24,
                                    "nzMd": 24,
                                    "nzLg": 11,
                                    "nzXl": 11,
                                    "nzXXl": 11
                                },
                                "component": {
                                    "id": "form_sql",
                                    "type": "form",
                                    "component": "form",
                                    "state": "text",
                                    "loadingConfig": {
                                        "id": "loadform"
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
                                                        "title": "", "span": 24,
                                                        "layoutContain": "input",
                                                        "size": {
                                                            "nzXs": 24, "nzSm": 24, "nzMd": 24, "nzLg": 24, "ngXl": 24, "nzXXl": 24
                                                        },
                                                        "control": {
                                                            "id": "sql_name"  // id 和引用id 值相同
                                                        }
                                                    },
                                                    {
                                                        "id": "iHspYn2", "col": "cc", "type": "col",
                                                        "title": "", "span": 24,
                                                        "layoutContain": "input",
                                                        "size": {
                                                            "nzXs": 24, "nzSm": 24, "nzMd": 24, "nzLg": 24, "ngXl": 24, "nzXXl": 24
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
                                    "cascade": {
                                        "messageSender": [
                                            {
                                                "id": "afterSQLSaveSuccess",
                                                "senderId": "form_sql",
                                                // "triggerType": "BEHAVIOR",
                                                // "trigger": "SET_SELECT_ROW",
                                                "triggerMoment": "asyncAfter",
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
                                                                "value": "operation.code.success"
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
                                                                "name": "ID",
                                                                "type": "returnValue",
                                                                "valueName": "id"
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        "beforeSend": {},
                                                        "reveicerId": "",
                                                        "receiverTriggerType": "STATE",
                                                        "receiverTrigger": "CANCEL",
                                                        // "params": [
                                                        //     {
                                                        //         "name": "ID",
                                                        //         "type": "returnValue",
                                                        //         "valueName": "id"
                                                        //     }
                                                        // ]
                                                    }
                                                ]
                                            },
                                            {
                                                "id": "reloadFormState",
                                                "senderId": "form_sql",
                                                "triggerType": "STATE",
                                                "trigger": "CANCEL",
                                                "triggerMoment": "after",
                                                "sendData": [
                                                    {
                                                        "beforeSend": {},
                                                        "reveicerId": "",
                                                        "receiverTriggerType": "STATE",
                                                        "receiverTrigger": "STATE_TO_TEXT",
                                                        "params": [
                                                            {
                                                                "name": "targetViewId",
                                                                "type": "value",
                                                                "value": "toolbar_002"
                                                            }
                                                        ]
                                                    }
                                                ]
                                            }
                                        ],
                                        "messageReceiver": [
                                            {
                                                "id": "",
                                                "senderId": "sql_grid_view",
                                                "receiveData": [
                                                    {
                                                        "beforeReceive": [],
                                                        "triggerType": "BEHAVIOR",
                                                        "trigger": "REFRESH_AS_CHILD",
                                                        "params": [
                                                            {
                                                                "pname": "_ID",
                                                                "cname": "_ID",
                                                                "valueTo": "tempValue"
                                                            }
                                                        ]
                                                    },
                                                    // {
                                                    //     "beforeReceive": [],
                                                    //     "triggerType": "STATE",
                                                    //     "trigger": "CANCEL",
                                                    //     // "params": [
                                                    //     //     {
                                                    //     //         "pname": "_ID",
                                                    //     //         "cname": "_ID",
                                                    //     //         "valueTo": "tempValue"
                                                    //     //     }
                                                    //     // ]
                                                    // }
                                                ]
                                            },
                                            {
                                                "id": "",
                                                "senderId": "form_sql",
                                                "receiveData": [
                                                    {
                                                        "beforeReceive": [],
                                                        "triggerType": "STATE",
                                                        "trigger": "CANCEL",
                                                        // "params": [
                                                        //     {
                                                        //         "pname": "_ID",
                                                        //         "cname": "_ID",
                                                        //         "valueTo": "tempValue"
                                                        //     }
                                                        // ]
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    "cascadeValue": [],
                                    "formControls": [
                                        {
                                            "id": "sql_name",
                                            "hidden": true,
                                            "title": "名称",
                                            "titleConfig": {
                                                "required": true
                                            },
                                            "field": "DESC_NAME",
                                            "labelSize": {
                                                "span": 3,
                                                "nzXs": { "span": 24 },
                                                "nzSm": { "span": 24 },
                                                "nzMd": { "span": 4 },
                                                "nzLg": { "span": 4 },
                                                "ngXl": { "span": 4 },
                                                "nzXXl": { "span": 4 }
                                            },
                                            "controlSize": {
                                                "span": 21,
                                                "nzXs": 24,
                                                "nzSm": 24,
                                                "nzMd": 20,
                                                "nzLg": 20,
                                                "ngXl": 20,
                                                "nzXXl": 20
                                            },
                                            "state": "edit",
                                            "text": {
                                                "type": "label",
                                                "field": "DESC_NAME",
                                            },
                                            "editor": {
                                                "type": "input",
                                                "field": "DESC_NAME",
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
                                            "field": "RESOURCE_NAME",
                                            "labelSize": {
                                                "span": 4,
                                                "nzXs": 24, "nzSm": 24, "nzMd": 24, "nzLg": 4, "ngXl": 4, "nzXXl": 4
                                            },
                                            "controlSize": {
                                                "span": 21,
                                                "nzXs": { "span": 24, "offset": 0 },
                                                "nzSm": { "span": 24, "offset": 0 },
                                                "nzMd": { "span": 24, "offset": 0 },
                                                "nzLg": { "span": 20, "offset": 0 },
                                                "ngXl": { "span": 20, "offset": 0 },
                                                "nzXXl": { "span": 20, "offset": 0 }
                                            },
                                            "state": "edit",
                                            "text": {
                                                "type": "label",
                                                "field": "RESOURCE_NAME",
                                            },
                                            "editor": {
                                                "type": "input",
                                                "field": "RESOURCE_NAME",
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
                                            "field": "CONTENT",
                                            "labelSize": {
                                                "span": 3,
                                                "nzXs": 24, "nzSm": 24, "nzMd": 3, "nzLg": 3, "ngXl": 3, "nzXXl": 3
                                            },
                                            "controlSize": {
                                                "span": 24,
                                                "nzXs": { "span": 24, "offset": 0 },
                                                "nzSm": { "span": 24, "offset": 0 },
                                                "nzMd": { "span": 24, "offset": 0 },
                                                "nzLg": { "span": 24, "offset": 0 },
                                                "ngXl": { "span": 24, "offset": 0 },
                                                "nzXXl": { "span": 24, "offset": 0 }
                                            },
                                            "state": "edit",
                                            "text": {
                                                "type": "codeEdit",
                                                "field": "CONTENT",
                                                "autofocus": false,
                                                "mode": "text/x-sql",
                                                "readOnly": true,
                                                "height": 500
                                            },
                                            "editor": {
                                                "type": "codeEdit",
                                                "field": "CONTENT",
                                                "mode": "text/x-sql",
                                                "placeholder": "请输入",
                                                "autofocus": true,
                                                "readOnly": false,
                                                "height": 500,
                                                "autosize": {
                                                    minRows: 2, maxRows: 6
                                                },
                                                "validations": [
                                                    { validator: "required" }
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
                                            "url": "resource/DM_RESOURCE/query",
                                            "urlType": "inner",
                                            "ajaxType": "get",
                                            "params": [
                                                {
                                                    "name": "ID",
                                                    "type": "tempValue",
                                                    "valueName": "_ID"
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
                                "id": "r5zDHB2-1",
                                "col": "cc",
                                "type": "col",
                                "title": "",
                                "span": 12,
                                "container": "component",
                                "header": {
                                    "title": "SQL 资源表",
                                    "icon": "right-circle"
                                },
                                "bodyStyle": {
                                    "min-height": "700px"
                                },
                                "size": {
                                    "nzXs": 24,
                                    "nzSm": 24,
                                    "nzMd": 24,
                                    "nzLg": 13,
                                    "nzXl": 13,
                                    "nzXXl": 13
                                },
                                "component": {
                                    "id": "sql_grid_view",
                                    "title": "",
                                    "titleIcon": "",
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
                                    "loadingOnInit": true,
                                    "loadingConfig": {
                                        "url": "resource/GET_DM_SQL_LIST/query",
                                        "method": "get",
                                        "params": [
                                            // {
                                            //     "name": "pid",
                                            //     "type": "tempValue",
                                            //     "valueName": "_PID"
                                            // }
                                        ],
                                        "filter": [
                                            {
                                                "name": "SNAME",
                                                "type": "tempValue",
                                                "valueName": "_SNAME",
                                                "value": "-999"
                                            }
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
                                            // "width": "200px",
                                            "style": {},
                                        },
                                        {
                                            "title": "资源名称",
                                            "type": "field",
                                            "field": "SNAME",
                                            "hidden": false,
                                            "showFilter": false,
                                            "showSort": false,
                                            // "width": "100px",
                                            "style": {},
                                        },
                                        {
                                            "title": "状态",
                                            "type": "field",
                                            "field": "IS_BUILD_MODEL_TEXT",
                                            "hidden": false,
                                            "showFilter": false,
                                            "showSort": false,
                                            // "width": "75px",
                                            "style": {},
                                            "custom": {
                                                "type": "tag",
                                                "field": "IS_BUILD_MODEL_TEXT",
                                                "dataMapping": [
                                                    {
                                                        "color": "#2db7f5",
                                                        "field": "IS_BUILD_MODEL_TEXT",
                                                        "value": "未发布"
                                                    },
                                                    {
                                                        "color": "#87d068",
                                                        "field": "IS_BUILD_MODEL_TEXT",
                                                        "value": "已发布"
                                                    },
                                                    {
                                                        "color": "#2ee7f5",
                                                        "field": "IS_BUILD_MODEL_TEXT",
                                                        "value": "变更发布"
                                                    }
                                                ]
                                            }
                                        },
                                        // {
                                        //     "title": "创建时间",
                                        //     "type": "field",
                                        //     "field": "CREATE_DATE",
                                        //     "hidden": false,
                                        //     "showFilter": false,
                                        //     "showSort": false,
                                        //     "width": "100px",
                                        //     "style": {},
                                        // },
                                        // {
                                        //     "title": "最近修改时间",
                                        //     "type": "field",
                                        //     "field": "LAST_UPDATE_DATE",
                                        //     "hidden": false,
                                        //     "showFilter": false,
                                        //     "showSort": false,
                                        //     "width": "100px",
                                        //     "style": {},
                                        // },
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
                                        // {
                                        //     "title": "ACTION",
                                        //     "type": "action",
                                        //     "width": "150px",
                                        //     "actionIds": [
                                        //         "city_new_row", "city_cancel_new_row", "city_edit", "city_save", "city_cancel", "city_delete"
                                        //     ]
                                        // }
                                    ],
                                    "rowActions": [
                                        // {
                                        //     "id": "city_new_row",
                                        //     "state": "new",
                                        //     "text": "保存",
                                        //     "icon": "save",
                                        //     "color": "text-primary",
                                        //     "type": "link",
                                        //     "size": "small",
                                        //     "hidden": false,
                                        //     "execute": [
                                        //         {
                                        //             "triggerType": "OPERATION",
                                        //             "trigger": "SAVE_ROW",
                                        //             "ajaxId": "add_city_1",
                                        //             // "stateId": "add_save_1",
                                        //             // "conditionId": "add_save_1"
                                        //         }
                                        //     ],
                                        //     "toggle": {
                                        //         "type": "state",
                                        //         "toggleProperty": "hidden",
                                        //         "values": [
                                        //             {
                                        //                 "name": "new",
                                        //                 "value": false
                                        //             },
                                        //             {
                                        //                 "name": "text",
                                        //                 "value": true
                                        //             }
                                        //         ]
                                        //     }
                                        // },
                                        // {
                                        //     "id": "city_cancel_new_row",
                                        //     "state": "new",
                                        //     "text": "取消",
                                        //     "icon": "rollback",
                                        //     "color": "text-primary",
                                        //     "type": "link",
                                        //     "size": "small",
                                        //     "hidden": false,
                                        //     "execute": [
                                        //         {
                                        //             "triggerType": "STATE",
                                        //             "trigger": "CANCEL_NEW_ROW",
                                        //             // "ajaxId": "add_save_1",
                                        //             // "stateId": "add_save_1",
                                        //             // "conditionId": "add_save_1"
                                        //         }
                                        //     ],
                                        //     "toggle": {
                                        //         "type": "state",
                                        //         "toggleProperty": "hidden",
                                        //         "values": [
                                        //             {
                                        //                 "name": "new",
                                        //                 "value": false
                                        //             },
                                        //             {
                                        //                 "name": "text",
                                        //                 "value": true
                                        //             }
                                        //         ]
                                        //     }
                                        // },
                                        // {
                                        //     "id": "city_edit",
                                        //     "state": "text",
                                        //     "text": "编辑",
                                        //     "icon": "save",
                                        //     "color": "text-primary",
                                        //     "type": "link",
                                        //     "size": "small",
                                        //     "hidden": false,
                                        //     "execute": [
                                        //         {
                                        //             "triggerType": "STATE",
                                        //             "trigger": "EDIT_ROW"
                                        //         }
                                        //     ],
                                        //     "toggle": {
                                        //         "type": "state",
                                        //         "toggleProperty": "hidden",
                                        //         "values": [
                                        //             {
                                        //                 "name": "edit",
                                        //                 "value": true
                                        //             },
                                        //             {
                                        //                 "name": "text",
                                        //                 "value": false
                                        //             }
                                        //         ]
                                        //     }
                                        // },
                                        // {
                                        //     "id": "city_save",
                                        //     "text": "保存",
                                        //     "state": "text",
                                        //     "icon": "save",
                                        //     "color": "text-primary",
                                        //     "type": "link",
                                        //     "size": "small",
                                        //     "hidden": true,
                                        //     "execute": [
                                        //         {
                                        //             "triggerType": "OPERATION",
                                        //             "trigger": "SAVE_ROW",
                                        //             "ajaxId": "edit_city_1",
                                        //             // "stateId": "add_save_1",
                                        //             // "conditionId": "add_save_1"
                                        //         }
                                        //     ],
                                        //     "toggle": {
                                        //         "type": "state",
                                        //         "toggleProperty": "hidden",
                                        //         "values": [
                                        //             {
                                        //                 "name": "edit",
                                        //                 "value": false
                                        //             },
                                        //             {
                                        //                 "name": "text",
                                        //                 "value": true
                                        //             }
                                        //         ]
                                        //     }
                                        // },
                                        // {
                                        //     "id": "city_cancel",
                                        //     "state": "text",
                                        //     "text": "取消",
                                        //     "icon": "rollback",
                                        //     "color": "text-primary",
                                        //     "type": "link",
                                        //     "size": "small",
                                        //     "hidden": true,
                                        //     "execute": [
                                        //         {
                                        //             "triggerType": "STATE",
                                        //             "trigger": "CANCEL_EDIT_ROW"
                                        //         }
                                        //     ],
                                        //     "toggle": {
                                        //         "type": "state",
                                        //         "toggleProperty": "hidden",
                                        //         "values": [
                                        //             {
                                        //                 "name": "edit",
                                        //                 "value": false
                                        //             },
                                        //             {
                                        //                 "name": "text",
                                        //                 "value": true
                                        //             }
                                        //         ]
                                        //     }
                                        // },
                                        // {
                                        //     "id": "city_delete",
                                        //     "text": "删除",
                                        //     "state": "text",
                                        //     "icon": "delete",
                                        //     "type": "link",
                                        //     "color": "primary",
                                        //     "size": "small",
                                        //     "hidden": false,
                                        //     "execute": [
                                        //         {
                                        //             "triggerType": "OPERATION",
                                        //             "trigger": "EXECUTE_SELECTED_ROW",
                                        //             // "conditionId": "delete_operation_1",
                                        //             "ajaxId": "city_delete_1"
                                        //         }
                                        //     ]
                                        // }
                                    ],
                                    "cascade": {
                                        "messageSender": [
                                            {
                                                "id": "grid_sender_02",
                                                "senderId": "sql_grid_view",
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
                                                                "name": "_ID",
                                                                "type": "item",
                                                                "valueName": "ID"
                                                            }
                                                        ]
                                                    }
                                                ]
                                            },
                                            {
                                                "id": "view2_sender_1",
                                                "senderId": "sql_grid_view",
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
                                                                "value": "sql_grid_view",
                                                                "type": "value"
                                                            }
                                                        ]
                                                    }
                                                ]
                                            },
                                            {
                                                "id": "view2_sender_2",
                                                "senderId": "sql_grid_view",
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
                                                                "value": "sql_grid_view",
                                                                "type": "value"
                                                            }
                                                        ]
                                                    }
                                                ]
                                            },
                                            {
                                                "id": "view2_sender_3",
                                                "senderId": "sql_grid_view",
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
                                                                "value": "sql_grid_view",
                                                                "type": "value"
                                                            }
                                                        ]
                                                    }
                                                ]
                                            },
                                            {
                                                "id": "view2_sender_04",
                                                "senderId": "sql_grid_view",
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
                                                                "value": "sql_grid_view",
                                                                "type": "value"
                                                            }
                                                        ]
                                                    }
                                                ]
                                            },
                                            {
                                                "id": "grid_sender_05",
                                                "senderId": "sql_grid_view",
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
                                                                "value": "sql_grid_view",
                                                                "type": "value"
                                                            }
                                                        ]
                                                    }
                                                ]
                                            },
                                            {
                                                "id": "grid_sender_08",
                                                "senderId": "sql_grid_view",
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
                                                "id": "afterSQLSaveSuccess",
                                                "senderId": "sql_grid_view",
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
                                                "id": "afterSQLUpdateSuccess",
                                                "senderId": "sql_grid_view",
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
                                                "senderId": "sql_grid_view",
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
                                                "senderId": "sql_grid_view",
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
                                                "id": "afterSQLModelSuccess",
                                                "senderId": "sql_grid_view",
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
                                                                "value": "operation.code.success"
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
                                                                "name": "ID",
                                                                "type": "item",
                                                                "valueName": "ID"
                                                            }
                                                        ]
                                                    }
                                                ]
                                            },
                                            {
                                                "id": "afterCityUpdateFormValidation",
                                                "senderId": "sql_grid_view",
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
                                            // {
                                            //     "id": "",
                                            //     "senderId": "view_01",
                                            //     "receiveData": [
                                            //         {
                                            //             "beforeReceive": [],
                                            //             "triggerType": "BEHAVIOR",
                                            //             "trigger": "REFRESH_AS_CHILD",
                                            //             "params": [
                                            //                 {
                                            //                     "pname": "_PID",
                                            //                     "cname": "_PID",
                                            //                     "valueTo": "tempValue"
                                            //                 }
                                            //             ]
                                            //         }
                                            //     ]
                                            // },
                                            {
                                                "id": "",
                                                "senderId": "view_sql_search",
                                                "receiveData": [
                                                    {
                                                        "beforeReceive": [],
                                                        "triggerType": "BEHAVIOR",
                                                        "trigger": "LOAD_BY_FILTER",
                                                        "params": [
                                                            {
                                                                "pname": "_SNAME",
                                                                "cname": "_SNAME",
                                                                "valueTo": "tempValue"
                                                            }
                                                        ]
                                                    }
                                                ]
                                            },
                                            {
                                                "id": "",
                                                "senderId": "form_sql",
                                                "receiveData": [
                                                    {
                                                        "beforeReceive": [],
                                                        "triggerType": "ACTION",
                                                        "trigger": "MESSAGE"
                                                    },
                                                    {
                                                        "beforeReceive": [],
                                                        "triggerType": "ACTION",
                                                        "trigger": "LOAD_REFRESH_DATA"
                                                    }
                                                ]
                                            },
                                            {
                                                "id": "",
                                                "senderId": "sql_grid_view",
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
                                                            "name": "descName",
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
                                    "ajaxConfig": []
                                }
                            }],
                        id: "3vlDRq",
                        type: "row"
                    }
                ]
            }
        }
    }

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