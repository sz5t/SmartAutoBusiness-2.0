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
    selector: 'data-business-modeling',
    templateUrl: './data-business-modeling.component.html',
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
export class DataBusinessModelingComponent extends CnComponentBase implements OnInit {
    public config = {
        "id": "4K0naM",
        "type": "pageHeader",
        "title": "布局4K0naM",
        "container": "pageHeader",
        "pageHeader": {
            "id": "pageheader_1",
            "title": "业务建模",
            "subTitle": "动态创建业务对象及对象资源API",
            "tagColor": "blue",
            "tagText": "系统功能",
            "descColumnsCount": 2,
            "operation": [],
            "contentItems": [
                {
                    "title": "注意事项",
                    "text": "请在创建业务信息和业务对象后进行业务建模操作",
                    "span": 2
                },
                {
                    "title": "提示",
                    "text": "重新建模不会影响之前表中的数据",
                    "span": 2
                }
            ],
            "extraItems": [
                {
                    "label": "已建模统计",
                    "detail": "120",
                    "span": "12"
                },
                {
                    "label": "未建模统计",
                    "detail": "1",
                    "span": "12"
                }
            ],
            "defaultLoading": true,
            "layout": {
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
                                    "id": "toolbar_business_main",
                                    "component": "cnToolbar",
                                    "size": "default",
                                    "cascade": {
                                        // "messageSender": [
                                        //     {
                                        //         "id": "toolbar_01",
                                        //         "senderId": "view_business_main",
                                        //         "triggerType": "OPERATION",
                                        //         "trigger": "EXECUTE_CHECKED_ROWS",
                                        //         "triggerMoment": "after",
                                        //         "sendData": [
                                        //             {
                                        //                 "beforeSend": {},
                                        //                 "reveicerId": "",
                                        //                 "receiverTriggerType": "BEHAVIOR",
                                        //                 "receiverTrigger": "REFRESH_AS_CHILD",
                                        //                 "params": [
                                        //                     {
                                        //                         "name": "parent_id",
                                        //                         "type": "item",
                                        //                         "valueName": "id"
                                        //                     },
                                        //                     {
                                        //                         "name": "parent_name",
                                        //                         "type": "item",
                                        //                         "valueName": "name"
                                        //                     }
                                        //                 ]
                                        //             }
                                        //         ]
                                        //     }
                                        // ],
                                        "messageReceiver": [
                                            {
                                                "id": "s_001",
                                                "senderId": "view_business_main",
                                                "receiveData": [
                                                    {
                                                        "triggerType": "STATE",
                                                        "trigger": "STATE_TO_TEXT"
                                                    }
                                                ]
                                            },
                                            {
                                                "id": "s_002",
                                                "senderId": "view_business_main",
                                                "receiveData": [
                                                    {
                                                        "triggerType": "STATE",
                                                        "trigger": "STATE_TO_EDIT"
                                                    }
                                                ]
                                            }

                                        ]
                                    },
                                    "dialog": [
                                        {
                                            "id": "delete_business_main_confirm",
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
                                            "id": "add_business_main_condition",
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
                                            "id": "edit_business_main_condition",
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
                                            "id": "toolbar_business_main_cancel_edit",
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
                                            "id": "add_business_main",
                                            "url": "/cfgBusiModel/batchInsert",
                                            "urlType": "inner",
                                            "ajaxType": "post",
                                            "params": [
                                                {
                                                    "name": "id",
                                                    "type": "componentValue",
                                                    "valueName": "id"
                                                },
                                                {
                                                    "name": "name",
                                                    "type": "componentValue",
                                                    "valueName": "name",
                                                    "dataType": "string"
                                                },
                                                {
                                                    "name": "resourceName",
                                                    "type": "componentValue",
                                                    "valueName": "resourceName",
                                                    "dataType": "string"
                                                },
                                                {
                                                    "name": "isBuildModel",
                                                    "type": "componentValue",
                                                    "valueName": "isBuildModel",
                                                    "dataType": "int"
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
                                                {
                                                    "name": "data",
                                                    "showMessageWithNext": 0,
                                                    "message": "message.ajax.state.success",
                                                    "senderId": "afterBusinessMainSaveSuccessfully"
                                                },
                                                {
                                                    "name": "validation",
                                                    "message": "message.ajax.state.success",
                                                    "senderId": "afterBusinessMainSaveValidation"
                                                },
                                                {
                                                    "name": "error",
                                                    "senderId": "toolbar_02"
                                                }
                                            ]
                                        },
                                        {
                                            "id": "edit_business_main",
                                            "url": "/cfgBusiModel/batchUpdate",
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
                                                    "name": "name",
                                                    "type": "componentValue",
                                                    "valueName": "name",
                                                    "dataType": "string"
                                                },
                                                {
                                                    "name": "resourceName",
                                                    "type": "componentValue",
                                                    "valueName": "resourceName",
                                                    "dataType": "string"
                                                },
                                                {
                                                    "name": "isBuildModel",
                                                    "type": "componentValue",
                                                    "valueName": "isBuildModel",
                                                    "dataType": "int"
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
                                                {
                                                    "name": "data",
                                                    "showMessageWithNext": 0,
                                                    "message": "message.ajax.state.success",
                                                    "senderId": "afterBusinessMainUpdateSuccessfully"
                                                },
                                                {
                                                    "name": "validation",
                                                    "message": "message.ajax.state.success",
                                                    "senderId": "afterBusinessMainSaveValidation"
                                                },
                                                {
                                                    "name": "error",
                                                    "senderId": "toolbar_02"
                                                }
                                            ]
                                        },
                                        {
                                            "id": "delete_business_main",
                                            "url": "/cfgBusiModel/delete",
                                            "urlType": "inner",
                                            "ajaxType": "delete",
                                            "params": [
                                                {
                                                    "name": "id",
                                                    "type": "checkedItem",
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
                                                    "senderId": "afterDeleteBusinessMainSuccess"
                                                }
                                            ]
                                        }
                                    ],
                                    "beforeTrigger": [

                                    ],
                                    "afterTrigger": [
                                        {
                                            "id": "",
                                            "senderId": "view_business_main",
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
                                            "targetViewId": "view_business_main",
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
                                                    "text": "新增业务资源",
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
                                                            "conditionId": "edit_business_main_state"
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
                                                            "triggerType": "ACTION",
                                                            "trigger": "CHECKED_ITEMS_IDS_CONFIRM",
                                                            "conditionId": "delete_business_main_condition",
                                                            "ajaxId": "delete_business_main",
                                                            "dialogId": "delete_business_main_confirm"
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
                                                            "ajaxId": "add_business_main",
                                                            // "stateId": "add_save_1",
                                                            "conditionId": "add_business_main_condition"
                                                        },
                                                        {
                                                            "triggerType": "OPERATION",
                                                            "trigger": "SAVE_ROWS",
                                                            "ajaxId": "edit_business_main",
                                                            // "stateId": "edit_save_1",
                                                            "conditionId": "edit_business_main_condition"
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
                                                            "conditionId": "toolbar_business_main_cancel_edit"
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
                                    "id": "view_business_main",
                                    "title": "业务描述",
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
                                    "loadingOnInit": true,
                                    // "scroll": {
                                    //     "y": "300px"
                                    // },
                                    "spanWidthConfig": [
                                        '50px', '100px', '200px', '200px', '200px'
                                    ],
                                    "loadingConfig": {
                                        "url": "sd/GET_BUSINESS_MAIN_LIST/query",
                                        "method": "get",
                                        "params": [
                                            // {
                                            //     "name": "_mapToObject",
                                            //     "type": "value",
                                            //     "value": true
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
                                            "title": "业务名称",
                                            "type": "field",
                                            "field": "NAME",
                                            "hidden": false,
                                            "showFilter": false,
                                            "showSort": false,
                                            "width": "50px",
                                            "style": {},
                                            "editor": {
                                                "type": "input",
                                                "field": "name"
                                            }
                                        },
                                        {
                                            "title": "资源名称",
                                            "type": "field",
                                            "field": "RESOURCE_NAME",
                                            "hidden": false,
                                            "showFilter": false,
                                            "showSort": false,
                                            "width": "100px",
                                            "style": {},
                                            "editor": {
                                                "type": "input",
                                                "field": "resourceName"
                                            },
                                        },
                                        {
                                            "title": "备注",
                                            "type": "field",
                                            "field": "REMARK",
                                            "hidden": false,
                                            "showFilter": false,
                                            "showSort": false,
                                            "width": "100px",
                                            "style": {},
                                            "editor": {
                                                "type": "input",
                                                "field": "remark"
                                            }
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
                                            "custom": {
                                                "type": "tag",
                                                "field": "IS_BUILD_MODEL_TEXT",
                                                "dataMapping": [
                                                    {
                                                        "color": "#87d068",
                                                        "field": "IS_BUILD_MODEL_TEXT",
                                                        "value": "已建模"
                                                    },
                                                    {
                                                        "color": "#2db7f5",
                                                        "field": "IS_BUILD_MODEL_TEXT",
                                                        "value": "无"
                                                    }
                                                ]
                                            }
                                        },
                                        // {
                                        //     "title": "创建时间",
                                        //     "type": "field",
                                        //     "field": "createDate",
                                        //     "hidden": false,
                                        //     "showFilter": false,
                                        //     "showSort": false,
                                        //     "width": "100px",
                                        //     "style": {},
                                        // },
                                        // {
                                        //     "title": "修改时间",
                                        //     "type": "field",
                                        //     "field": "lastUpdateDate",
                                        //     "hidden": false,
                                        //     "showFilter": false,
                                        //     "showSort": false,
                                        //     "width": "100px",
                                        //     "style": {}
                                        // },
                                        // {
                                        //     "title": "操作",
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
                                                "senderId": "view_business_main",
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
                                                                "name": "_BUSI_ID",
                                                                "type": "item",
                                                                "valueName": "ID"
                                                            }
                                                        ]
                                                    }
                                                ]
                                            },
                                            {
                                                "id": "grid_sender_03",
                                                "senderId": "view_business_main",
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
                                                                "value": "view_business_main",
                                                                "type": "value"
                                                            }
                                                        ]
                                                    }
                                                ]
                                            },
                                            {
                                                "id": "grid_sender_04",
                                                "senderId": "view_business_main",
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
                                                                "value": "view_business_main",
                                                                "type": "value"
                                                            }
                                                        ]
                                                    }
                                                ]
                                            },
                                            {
                                                "id": "grid_sender_05",
                                                "senderId": "view_business_main",
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
                                                                "value": "view_business_main",
                                                                "type": "value"
                                                            }
                                                        ]
                                                    }
                                                ]
                                            },
                                            {
                                                "id": "grid_sender_06",
                                                "senderId": "view_business_main",
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
                                                                "value": "view_business_main",
                                                                "type": "value"
                                                            }
                                                        ]
                                                    }
                                                ]
                                            },
                                            {
                                                "id": "grid_sender_07",
                                                "senderId": "view_business_main",
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
                                                                "value": "view_business_main",
                                                                "type": "value"
                                                            }
                                                        ]
                                                    }
                                                ]
                                            },
                                            {
                                                "id": "grid_sender_08",
                                                "senderId": "view_business_main",
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
                                                                "value": "view_business_main",
                                                                "type": "value"
                                                            }
                                                        ]
                                                    }
                                                ]
                                            },
                                            {
                                                "id": "afterBusinessMainSaveSuccessfully",
                                                "senderId": "view_business_main",
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
                                                "id": "afterBusinessMainUpdateSuccessfully",
                                                "senderId": "view_business_main",
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
                                                "id": "afterBusinessMainSaveValidation",
                                                "senderId": "view_business_main",
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
                                                "senderId": "view_business_main",
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
                                                "id": "afterDeleteBusinessMainSuccess",
                                                "senderId": "view_business_main",
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
                                                        "receiverTrigger": "DELETE_CHECKED_ROWS",
                                                        "params": [
                                                            {
                                                                "name": "ids",
                                                                "type": "returnValue",
                                                                "valueName": "ids"
                                                            }
                                                        ]
                                                    }
                                                ]
                                            }
                                        ],
                                        "messageReceiver": [
                                            {
                                                "id": "",
                                                "senderId": "view_business_main",
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
                                                    },
                                                    {
                                                        "beforeReceive": [],
                                                        "triggerType": "ACTION",
                                                        "trigger": "DELETE_CHECKED_ROWS"
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
                                                    //  "conditionId": "edit_business_main"
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
                                                    // "conditionId": "add_business_main_condition"
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
                                            "id": "delete_business_main_confirm",
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
                                            "id": "edit_business_main_state",
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
                                            "id": "add_business_main_condition",
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
                                            "id": "edit_business_main_condition",
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
                                    ],
                                    "beforeTrigger": [
                                        {
                                            "id": "before_delete_province",
                                            "senderId": "view_business_main",
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
                                            "senderId": "view_business_main",
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
                                                "senderId": "view_business_object",
                                                "receiveData": [
                                                    {
                                                        "triggerType": "STATE",
                                                        "trigger": "STATE_TO_TEXT"
                                                    }
                                                ]
                                            },
                                            {
                                                "id": "s_002",
                                                "senderId": "view_business_object",
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
                                            "id": "add_business_object_changeValue",
                                            "params": [
                                                {
                                                    "name": "_BUSI_ID",
                                                    "type": "tempValue",
                                                    "valueName": "_BUSI_ID",
                                                    "valueTo": "tempValue"
                                                }
                                            ]
                                        },
                                        {
                                            "id": "add_sub_business_object_changeValue",
                                            "params": [
                                                {
                                                    "name": "_BUSI_ID",
                                                    "type": "tempValue",
                                                    "valueName": "_BUSI_ID",
                                                    "valueTo": "tempValue"
                                                },
                                                {
                                                    "name": "_PARENT_ID",
                                                    "type": "item",
                                                    "valueName": "id",
                                                    "valueTo": "tempValue"
                                                }
                                            ]
                                        },
                                        {
                                            "id": "edit_business_object_changeValue",
                                            "params": [
                                                {
                                                    "name": "_BUS_OBJ_ID",
                                                    "type": "item",
                                                    "valueName": "ID",
                                                    "valueTo": "tempValue"
                                                }
                                            ]
                                        }
                                    ],
                                    "dialog": [
                                        {
                                            "id": "business_object_layout",
                                            // "layoutName": "businessObjectForm",
                                            "type": "confirm",
                                            "width": "80%",
                                            "title": "业务对象",
                                            "cancelText": "取消",
                                            "okText": "提交",
                                            "form": {
                                                "id": "view_business_object_form",
                                                "type": "form",
                                                "component": "form",
                                                "state": "new",
                                                "loadingConfig": {
                                                    "id": "loadform"
                                                },
                                                "cascade": {
                                                    "messageSender": [
                                                        {
                                                            "id": "afterComponentFormUpdateSuccess",
                                                            "senderId": "view_business_object_form",
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
                                                                            "type": "returnValue",
                                                                            "valueName": "ID"
                                                                        },
                                                                        {
                                                                            "name": "NAME",
                                                                            "type": "returnValue",
                                                                            "valueName": "NAME"
                                                                        }
                                                                    ]
                                                                }
                                                            ]
                                                        }
                                                    ],
                                                    "messageReceiver": [
                                                        {
                                                            "id": "",
                                                            "senderId": "view_tree_component_base",
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
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                },
                                                "cascadeValue": [
                                                    {
                                                        "type": "",
                                                        "controlId": "res_type",
                                                        "name": "refResourceType",
                                                        "CascadeObjects": [
                                                            {
                                                                "controlId": "res_ref_id",
                                                                "cascadeName": "refResourceId",
                                                                "cascadeItems": [
                                                                    {
                                                                        "type": "default",
                                                                        "caseValue": {
                                                                            "type": "selectObjectValue",
                                                                            "valueName": "value",
                                                                            "regular": "^0$"
                                                                        },
                                                                        "content": {
                                                                            "type": "ajax",
                                                                            "data": {
                                                                                "option": [
                                                                                    {
                                                                                        "name": "_TYPE",
                                                                                        "type": "selectValue",
                                                                                        "valueName": "refResourceType"
                                                                                    }
                                                                                ]
                                                                            }
                                                                        }
                                                                    }

                                                                ]
                                                            }
                                                        ],
                                                    },
                                                    {
                                                        "type": "",
                                                        "controlId": "res_ref_id",
                                                        "name": "refResourceId",
                                                        "CascadeObjects": [
                                                            {
                                                                "controlId": "res_refField",
                                                                "cascadeName": "refParentResourcePropId",
                                                                "cascadeItems": [
                                                                    {
                                                                        "type": "default",
                                                                        "content": {
                                                                            "type": "ajax",
                                                                            "data": {
                                                                                "option": [
                                                                                    {
                                                                                        "name": "_TABLE_ID",
                                                                                        "type": "selectValue",
                                                                                        "valueName": "ID"
                                                                                    }
                                                                                ]
                                                                            }
                                                                        }
                                                                    }

                                                                ]
                                                            }
                                                        ],
                                                    },
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
                                                "cascadeLayout": [
                                                    {
                                                        "field": "refResourceType",
                                                        "mapping": [
                                                            {
                                                                "value": 0,
                                                                "layout": [
                                                                    "col_1",
                                                                    "col_2",
                                                                    "col_3",
                                                                    "col_4",
                                                                    "col_5",
                                                                ]
                                                            },
                                                            {
                                                                "value": 1,
                                                                "layout": [
                                                                    "col_1",
                                                                    "col_2",
                                                                    "col_3",
                                                                    "col_4",
                                                                    "col_6",
                                                                ]
                                                            }
                                                        ]
                                                    }
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
                                                                        "nzMd": 12,
                                                                        "nzLg": 12,
                                                                        "ngXl": 12,
                                                                        "nzXXl": 12
                                                                    },
                                                                    "control": {
                                                                        "id": "res_refProperty"
                                                                    }
                                                                },
                                                                {
                                                                    "id": "col_3",
                                                                    "col": "cc",
                                                                    "type": "col",
                                                                    "title": "列ioj0mV",
                                                                    "span": 12,
                                                                    "layoutContain": "select",
                                                                    "size": {
                                                                        "nzXs": 24,
                                                                        "nzSm": 24,
                                                                        "nzMd": 12,
                                                                        "nzLg": 12,
                                                                        "ngXl": 12,
                                                                        "nzXXl": 12
                                                                    },
                                                                    "control": {
                                                                        "id": "res_cascade_del"
                                                                    }
                                                                },
                                                                {
                                                                    "id": "col_4",
                                                                    "col": "cc",
                                                                    "type": "col",
                                                                    "title": "列iHspYn",
                                                                    "span": 24,
                                                                    "layoutContain": "select",
                                                                    "size": {
                                                                        "nzXs": 24,
                                                                        "nzSm": 24,
                                                                        "nzMd": 24,
                                                                        "nzLg": 24,
                                                                        "ngXl": 24,
                                                                        "nzXXl": 24
                                                                    },
                                                                    "control": {
                                                                        "id": "res_type"
                                                                    }
                                                                },
                                                                {
                                                                    "id": "col_5",
                                                                    "col": "cc",
                                                                    "type": "col",
                                                                    "title": "列ioj0mV",
                                                                    "span": 24,
                                                                    "layoutContain": "select",
                                                                    "size": {
                                                                        "nzXs": 24,
                                                                        "nzSm": 24,
                                                                        "nzMd": 24,
                                                                        "nzLg": 24,
                                                                        "ngXl": 24,
                                                                        "nzXXl": 24
                                                                    },
                                                                    "control": {
                                                                        "id": "res_ref_id"
                                                                    }
                                                                },
                                                                {
                                                                    "id": "col_6",
                                                                    "col": "cc",
                                                                    "type": "col",
                                                                    "title": "列ioj0mV",
                                                                    "span": 24,
                                                                    "layoutContain": "select",
                                                                    "size": {
                                                                        "nzXs": 24,
                                                                        "nzSm": 24,
                                                                        "nzMd": 24,
                                                                        "nzLg": 24,
                                                                        "ngXl": 24,
                                                                        "nzXXl": 24
                                                                    },
                                                                    "control": {
                                                                        "id": "res_refSQL"
                                                                    }
                                                                },
                                                                {
                                                                    "id": "col_1",
                                                                    "col": "cc",
                                                                    "type": "col",
                                                                    "title": "列ioj0mV",
                                                                    "span": 12,
                                                                    "layoutContain": "select",
                                                                    "size": {
                                                                        "nzXs": 24,
                                                                        "nzSm": 24,
                                                                        "nzMd": 12,
                                                                        "nzLg": 12,
                                                                        "ngXl": 12,
                                                                        "nzXXl": 12
                                                                    },
                                                                    "control": {
                                                                        "id": "res_refField"
                                                                    }
                                                                },
                                                            ]
                                                        }
                                                    ]
                                                },
                                                "formControls": [
                                                    {
                                                        "id": "res_refProperty",
                                                        "hidden": true,
                                                        "title": "关联属性",
                                                        "titleConfig": {
                                                            "required": false
                                                        },
                                                        "field": "refResourceKeyName",
                                                        "labelSize": {
                                                            "span": 6,
                                                            "nzXs": 6,
                                                            "nzSm": 6,
                                                            "nzMd": 6,
                                                            "nzLg": 6,
                                                            "ngXl": 6,
                                                            "nzXXl": 6
                                                        },
                                                        "controlSize": {
                                                            "span": 18,
                                                            "nzXs": {
                                                                "span": 18,
                                                                "offset": 0
                                                            },
                                                            "nzSm": {
                                                                "span": 18,
                                                                "offset": 0
                                                            },
                                                            "nzMd": {
                                                                "span": 18,
                                                                "offset": 0
                                                            },
                                                            "nzLg": {
                                                                "span": 18,
                                                                "offset": 0
                                                            },
                                                            "ngXl": {
                                                                "span": 18,
                                                                "offset": 0
                                                            },
                                                            "nzXXl": {
                                                                "span": 18,
                                                                "offset": 0
                                                            }
                                                        },
                                                        "state": "edit",
                                                        "text": {
                                                            "type": "label",
                                                            "field": "refResourceKeyName"
                                                        },
                                                        "editor": {
                                                            "type": "input",
                                                            "field": "refResourceKeyName",
                                                            "placeholder": "请输入..."
                                                        }
                                                    },
                                                    {
                                                        "id": "res_refField",
                                                        "hidden": true,
                                                        "title": "关联列名",
                                                        "titleConfig": {
                                                            "required": false
                                                        },
                                                        "field": "refParentResourcePropId",
                                                        "labelSize": {
                                                            "span": 6,
                                                            "nzXs": 6,
                                                            "nzSm": 6,
                                                            "nzMd": 6,
                                                            "nzLg": 6,
                                                            "ngXl": 6,
                                                            "nzXXl": 6
                                                        },
                                                        "controlSize": {
                                                            "span": 18,
                                                            "nzXs": {
                                                                "span": 18,
                                                                "offset": 0
                                                            },
                                                            "nzSm": {
                                                                "span": 18,
                                                                "offset": 0
                                                            },
                                                            "nzMd": {
                                                                "span": 18,
                                                                "offset": 0
                                                            },
                                                            "nzLg": {
                                                                "span": 18,
                                                                "offset": 0
                                                            },
                                                            "ngXl": {
                                                                "span": 18,
                                                                "offset": 0
                                                            },
                                                            "nzXXl": {
                                                                "span": 18,
                                                                "offset": 0
                                                            }
                                                        },
                                                        "state": "edit",
                                                        "text": {
                                                            "type": "label",
                                                            "field": "refParentResourcePropId"
                                                        },
                                                        "editor": {
                                                            "type": "gridSelect",
                                                            "field": "refParentResourcePropId",
                                                            "layoutName": "tableColumnsList",
                                                            "placeholder": "请选择",
                                                            "loadingItemConfig": {
                                                                "id": "loadformgrid1"
                                                            },
                                                            "labelName": "DESC_NAME",
                                                            "valueName": "CNAME"
                                                        }
                                                    },
                                                    {
                                                        "id": "res_cascade_del",
                                                        "hidden": true,
                                                        "title": "及联删除",
                                                        "titleConfig": {
                                                            "required": false
                                                        },
                                                        "field": "isCascadeDelete",
                                                        "labelSize": {
                                                            "span": 6,
                                                            "nzXs": 6,
                                                            "nzSm": 6,
                                                            "nzMd": 6,
                                                            "nzLg": 6,
                                                            "ngXl": 6,
                                                            "nzXXl": 6
                                                        },
                                                        "controlSize": {
                                                            "span": 18,
                                                            "nzXs": {
                                                                "span": 18,
                                                                "offset": 0
                                                            },
                                                            "nzSm": {
                                                                "span": 18,
                                                                "offset": 0
                                                            },
                                                            "nzMd": {
                                                                "span": 18,
                                                                "offset": 0
                                                            },
                                                            "nzLg": {
                                                                "span": 18,
                                                                "offset": 0
                                                            },
                                                            "ngXl": {
                                                                "span": 18,
                                                                "offset": 0
                                                            },
                                                            "nzXXl": {
                                                                "span": 18,
                                                                "offset": 0
                                                            }
                                                        },
                                                        "state": "edit",
                                                        "text": {
                                                            "type": "label",
                                                            "field": "isCascadeDelete"
                                                        },
                                                        "editor": {
                                                            "type": "select",
                                                            "field": "isCascadeDelete",
                                                            "placeholder": "请输入",
                                                            "options": [
                                                                {
                                                                    "label": "是",
                                                                    "value": 1
                                                                },
                                                                {
                                                                    "label": "否",
                                                                    "value": 0
                                                                }
                                                            ],
                                                            "defaultValue": 0,
                                                            "labelName": "label"
                                                        }
                                                    },
                                                    {
                                                        "id": "res_type",
                                                        "hidden": false,
                                                        "title": "资源类型",
                                                        "titleConfig": {
                                                            "required": false
                                                        },
                                                        "field": "refResourceType",
                                                        "labelSize": {
                                                            "span": 3,
                                                            "nzXs": {
                                                                "span": 3
                                                            },
                                                            "nzSm": {
                                                                "span": 3
                                                            },
                                                            "nzMd": {
                                                                "span": 3
                                                            },
                                                            "nzLg": {
                                                                "span": 3
                                                            },
                                                            "ngXl": {
                                                                "span": 3
                                                            },
                                                            "nzXXl": {
                                                                "span": 3
                                                            }
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
                                                            "field": "refResourceType"
                                                        },
                                                        "editor": {
                                                            "type": "select",
                                                            "field": "refResourceType",
                                                            "placeholder": "请选择",
                                                            "options": [
                                                                {
                                                                    "label": "表资源",
                                                                    "value": 0
                                                                },
                                                                {
                                                                    "label": "SQL 资源",
                                                                    "value": 1
                                                                }
                                                            ],
                                                            "defaultValue": 0,
                                                            "labelName": "label",
                                                            "valueName": "value"
                                                        }
                                                    },
                                                    {
                                                        "id": "res_ref_id",
                                                        "hidden": true,
                                                        "title": "关联表资源",
                                                        "titleConfig": {
                                                            "required": false
                                                        },
                                                        "field": "refResourceId",
                                                        "labelSize": {
                                                            "span": 3,
                                                            "nzXs": 3,
                                                            "nzSm": 3,
                                                            "nzMd": 3,
                                                            "nzLg": 3,
                                                            "ngXl": 3,
                                                            "nzXXl": 3
                                                        },
                                                        "controlSize": {
                                                            "span": 18,
                                                            "nzXs": {
                                                                "span": 18,
                                                                "offset": 0
                                                            },
                                                            "nzSm": {
                                                                "span": 18,
                                                                "offset": 0
                                                            },
                                                            "nzMd": {
                                                                "span": 18,
                                                                "offset": 0
                                                            },
                                                            "nzLg": {
                                                                "span": 18,
                                                                "offset": 0
                                                            },
                                                            "ngXl": {
                                                                "span": 18,
                                                                "offset": 0
                                                            },
                                                            "nzXXl": {
                                                                "span": 18,
                                                                "offset": 0
                                                            }
                                                        },
                                                        "state": "edit",
                                                        "text": {
                                                            "type": "label",
                                                            "field": "refResourceId"
                                                        },
                                                        "editor": {
                                                            "type": "gridSelect",
                                                            "field": "refResourceId",
                                                            "layoutName": "apiResourceList",
                                                            "placeholder": "请选择",
                                                            "loadingItemConfig": {
                                                                "id": "loadformgrid"
                                                            },
                                                            "labelName": "DESC_NAME",
                                                            "valueName": "ID"
                                                        }
                                                    },
                                                    {
                                                        "id": "res_refSQL",
                                                        "hidden": true,
                                                        "title": "关联SQL资源",
                                                        "titleConfig": {
                                                            "required": false
                                                        },
                                                        "field": "sqlList",
                                                        "labelSize": {
                                                            "span": 3,
                                                            "nzXs": 3,
                                                            "nzSm": 3,
                                                            "nzMd": 3,
                                                            "nzLg": 3,
                                                            "ngXl": 3,
                                                            "nzXXl": 3
                                                        },
                                                        "controlSize": {
                                                            "span": 21,
                                                            "nzXs": {
                                                                "span": 12,
                                                                "offset": 0
                                                            },
                                                            "nzSm": {
                                                                "span": 21,
                                                                "offset": 0
                                                            },
                                                            "nzMd": {
                                                                "span": 21,
                                                                "offset": 0
                                                            },
                                                            "nzLg": {
                                                                "span": 21,
                                                                "offset": 0
                                                            },
                                                            "ngXl": {
                                                                "span": 21,
                                                                "offset": 0
                                                            },
                                                            "nzXXl": {
                                                                "span": 21,
                                                                "offset": 0
                                                            }
                                                        },
                                                        "state": "edit",
                                                        "text": {
                                                            "type": "label",
                                                            "field": "sqlList"
                                                        },
                                                        "editor": {
                                                            "type": "staticGrid",
                                                            "field": "sqlList",
                                                            "placeholder": "",
                                                            "validations": []
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
                                                                "id": "res_type",
                                                                "state": "edit",
                                                                "hidden": false,
                                                                "readOnly": false
                                                            },
                                                            {
                                                                "id": "res_refField",
                                                                "state": "edit",
                                                                "hidden": true,
                                                                "readOnly": false
                                                            },
                                                            {
                                                                "id": "res_refProperty",
                                                                "state": "edit",
                                                                "hidden": true,
                                                                "readOnly": false
                                                            },
                                                            {
                                                                "id": "res_cascade_del",
                                                                "state": "edit",
                                                                "hidden": true,
                                                                "readOnly": false
                                                            },
                                                            {
                                                                "id": "res_ref_id",
                                                                "state": "edit",
                                                                "hidden": true,
                                                                "readOnly": false
                                                            }

                                                        ]
                                                    },
                                                    {
                                                        "formState": "edit",
                                                        "Controls": [
                                                            {
                                                                "id": "res_type",
                                                                "state": "edit",
                                                                "hidden": false,
                                                                "readOnly": false
                                                            },
                                                            {
                                                                "id": "res_refField",
                                                                "state": "edit",
                                                                "hidden": true,
                                                                "readOnly": false
                                                            },
                                                            {
                                                                "id": "res_refProperty",
                                                                "state": "edit",
                                                                "hidden": true,
                                                                "readOnly": false
                                                            },
                                                            {
                                                                "id": "res_cascade_del",
                                                                "state": "edit",
                                                                "hidden": true,
                                                                "readOnly": false
                                                            },
                                                            {
                                                                "id": "res_ref_id",
                                                                "state": "edit",
                                                                "hidden": true,
                                                                "readOnly": false
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        "formState": "text",
                                                        "Controls": [
                                                            {
                                                                "id": "res_type",
                                                                "state": "text",
                                                                "hidden": false,
                                                                "readOnly": false
                                                            },
                                                            {
                                                                "id": "res_refField",
                                                                "state": "text",
                                                                "hidden": true,
                                                                "readOnly": false
                                                            },
                                                            {
                                                                "id": "res_refProperty",
                                                                "state": "text",
                                                                "hidden": true,
                                                                "readOnly": false
                                                            },
                                                            {
                                                                "id": "res_cascade_del",
                                                                "state": "text",
                                                                "hidden": true,
                                                                "readOnly": false
                                                            },
                                                            {
                                                                "id": "res_ref_id",
                                                                "state": "edit",
                                                                "hidden": true,
                                                                "readOnly": false
                                                            }
                                                        ]
                                                    }
                                                ],
                                                "ajaxConfig": [
                                                    {
                                                        "id": "loadform",
                                                        "url": "td/SMT_BASE_COMPONENT/query",
                                                        "urlType": "inner",
                                                        "ajaxType": "get",
                                                        "params": [
                                                            {
                                                                "name": "ID",
                                                                "type": "tempValue",
                                                                "valueName": "_ID"
                                                            }
                                                        ],
                                                        "outputParameters": [],
                                                        "result": []
                                                    },
                                                    {
                                                        "id": "loadformgrid",
                                                        "url": "sd/GET_BUSINESS_OBJECT_LIST/query",
                                                        "urlType": "inner",
                                                        "ajaxType": "get",
                                                        "params": [
                                                            {
                                                                "name": "ID",
                                                                "type": "tempValue",
                                                                "valueName": "_ID",
                                                            }
                                                        ],
                                                        "outputParameters": [],
                                                        "result": []
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
                                            "id": "edit_business_main_state",
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
                                            "id": "add_business_main_condition",
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
                                            "id": "edit_business_main",
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
                                            "id": "toolbar_business_main_cancel_edit",
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
                                            "id": "add_business_sub_object",
                                            "url": "cfgBusiModelResRelations/insert",
                                            "urlType": "inner",
                                            "ajaxType": "post",
                                            "params": [
                                                {
                                                    "name": "id",
                                                    "type": "GUID"
                                                },
                                                {
                                                    "name": "refBusiModelId",
                                                    "type": "tempValue",
                                                    "valueName": "_BUSI_ID"
                                                },
                                                {
                                                    "name": "refResourceId",
                                                    "type": "componentValue",
                                                    "valueName": "refResourceId"
                                                },
                                                {
                                                    "name": "refResourceType",
                                                    "type": "componentValue",
                                                    "valueName": "refResourceType"
                                                },
                                                // {
                                                //     "name": "parentId",
                                                //     "type": "tempValue",
                                                //     "valueName": "_parentId"
                                                // },
                                                {
                                                    "name": "refResourceKeyName",
                                                    "type": "componentValue",
                                                    "valueName": "refResourceKeyName"
                                                },
                                                {
                                                    "name": "refParentResourcePropId",
                                                    "type": "componentValue",
                                                    "valueName": "refParentResourcePropId"
                                                },
                                                {
                                                    "name": "isCascadeDelete",
                                                    "type": "componentValue",
                                                    "valueName": "isCascadeDelete"

                                                },
                                                {
                                                    "name": "sqlList",
                                                    "type": "componentValue",
                                                    "valueName": "sqlList"
                                                }
                                            ],
                                            "outputParameters": [

                                            ],
                                            "result": [
                                                {
                                                    "name": "data",
                                                    "showMessageWithNext": 0,
                                                    "message": "message.ajax.state.success",
                                                    "senderId": "afterAddBusinessSubObjectSuccess"
                                                },
                                                {
                                                    "name": "validation",
                                                    "message": "message.ajax.state.success",
                                                    "senderId": "afterAddBusinessSubObjectValidation"
                                                },
                                                {
                                                    "name": "error",
                                                    "senderId": "toolbar_02"
                                                }
                                            ]
                                        },
                                        {
                                            "id": "add_sub_business_sub_object",
                                            "url": "cfgBusiModelResRelations/insert",
                                            "urlType": "inner",
                                            "ajaxType": "post",
                                            "params": [
                                                {
                                                    "name": "id",
                                                    "type": "GUID"
                                                },
                                                {
                                                    "name": "refBusiModelId",
                                                    "type": "tempValue",
                                                    "valueName": "_BUSI_ID"
                                                },
                                                {
                                                    "name": "refResourceId",
                                                    "type": "componentValue",
                                                    "valueName": "refResourceId"
                                                },
                                                {
                                                    "name": "refResourceType",
                                                    "type": "componentValue",
                                                    "valueName": "refResourceType"
                                                },
                                                {
                                                    "name": "parentId",
                                                    "type": "tempValue",
                                                    "valueName": "_PARENT_ID"
                                                },
                                                {
                                                    "name": "refResourceKeyName",
                                                    "type": "componentValue",
                                                    "valueName": "refResourceKeyName"
                                                },
                                                {
                                                    "name": "refParentResourcePropId",
                                                    "type": "componentValue",
                                                    "valueName": "refParentResourcePropId"
                                                },
                                                {
                                                    "name": "isCascadeDelete",
                                                    "type": "componentValue",
                                                    "valueName": "isCascadeDelete"

                                                },
                                                {
                                                    "name": "sqlList",
                                                    "type": "componentValue",
                                                    "valueName": "sqlList"
                                                }
                                            ],
                                            "outputParameters": [

                                            ],
                                            "result": [
                                                {
                                                    "name": "data",
                                                    "showMessageWithNext": 0,
                                                    "message": "message.ajax.state.success",
                                                    "senderId": "afterAddSubBusinessSubObjectSuccess"
                                                },
                                                {
                                                    "name": "validation",
                                                    "message": "message.ajax.state.success",
                                                    "senderId": "afterAddSubBusinessSubObjectValidation"
                                                },
                                                {
                                                    "name": "error",
                                                    "senderId": "toolbar_02"
                                                }
                                            ]
                                        },
                                        {
                                            "id": "edit_business_sub_object",
                                            "url": "cfgBusiModelResRelations/update",
                                            "urlType": "inner",
                                            "ajaxType": "put",
                                            "params": [
                                                {
                                                    "name": "id",
                                                    "type": "GUID"
                                                },
                                                {
                                                    "name": "refBusiModelId",
                                                    "type": "tempValue",
                                                    "valueName": "_BUSI_ID"
                                                },
                                                {
                                                    "name": "refResourceId",
                                                    "type": "componentValue",
                                                    "valueName": "refResourceId"
                                                },
                                                {
                                                    "name": "refResourceType",
                                                    "type": "componentValue",
                                                    "valueName": "refResourceType"
                                                },
                                                {
                                                    "name": "parentId",
                                                    "type": "tempValue",
                                                    "valueName": "_PARENT_ID"
                                                },
                                                {
                                                    "name": "refResourceKeyName",
                                                    "type": "componentValue",
                                                    "valueName": "refResourceKeyName"
                                                },
                                                {
                                                    "name": "refParentResourcePropId",
                                                    "type": "componentValue",
                                                    "valueName": "refParentResourcePropId"
                                                },
                                                {
                                                    "name": "isCascadeDelete",
                                                    "type": "componentValue",
                                                    "valueName": "isCascadeDelete"

                                                },
                                                {
                                                    "name": "sqlList",
                                                    "type": "componentValue",
                                                    "valueName": "sqlList"
                                                }
                                            ],
                                            "outputParameters": [

                                            ],
                                            "result": [
                                                {
                                                    "name": "data",
                                                    "showMessageWithNext": 0,
                                                    "message": "message.ajax.state.success",
                                                    "senderId": "afterEditBusinessSubObjectSuccess"
                                                },
                                                {
                                                    "name": "validation",
                                                    "message": "message.ajax.state.success",
                                                    "senderId": "afterEditBusinessSubObjectValidation"
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
                                            "senderId": "view_business_object",
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
                                            "targetViewId": "view_business_object",
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
                                                    "text": "添加主资源",
                                                    "state": "new",
                                                    "icon": "plus",
                                                    "color": "text-primary",
                                                    "hidden": false,
                                                    "disabled": false,
                                                    "execute": [
                                                        {
                                                            "triggerType": "ACTION",
                                                            // "trigger": "LAYOUT_DIALOG",
                                                            "trigger": "DIALOG",
                                                            "changeValueId": "add_business_object_changeValue",
                                                            // "conditionId": "add_state_1"
                                                            "dialogId": "business_object_layout",
                                                            "ajaxId": "add_business_sub_object",
                                                        }
                                                    ]
                                                },
                                                {
                                                    "id": "M_addChildNode",
                                                    "text": "添加子资源",
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
                                                            "changeValueId": "add_sub_business_object_changeValue",
                                                            "dialogId": "business_object_layout",
                                                            "ajaxId": "add_sub_business_sub_object",
                                                        }
                                                    ]
                                                },
                                                {
                                                    "id": "M_updateRow",
                                                    "text": "修改资源",
                                                    "icon": "edit",
                                                    "color": "text-success",
                                                    "hidden": false,
                                                    "disabled": false,
                                                    "state": "text",
                                                    "execute": [
                                                        {
                                                            "triggerType": "STATE",
                                                            "trigger": "EDIT_ROWS",
                                                            "conditionId": "edit_business_sub_object"
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
                                                            // "conditionId": "delete_business_main_condition",
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
                                                            "conditionId": "toolbar_business_main_cancel_edit"
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
                                                            // "conditionId": "toolbar_business_main_cancel_edit"
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
                                    "id": "view_business_object",
                                    "title": "业务对象列表",
                                    "titleIcon": "right-circle",
                                    "component": "cnTreeTable",
                                    "keyId": "id",
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
                                        "url": "sd/GET_BUSINESS_OBJECT_LIST/query",
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
                                                "value": "PARENT_ID"
                                            },
                                            {
                                                // "name": "_root.REF_BUSI_MODEL_ID",
                                                "name": "_root.refBusiModelId",
                                                "type": "tempValue",
                                                "valueName": "_BUSI_ID"
                                            },
                                            {
                                                "name": "_mapToObject",
                                                "type": "value",
                                                "value": true
                                            }
                                        ],
                                        "reloadParams": [
                                            {
                                                "name": "_mapToObject",
                                                "type": "value",
                                                "value": true
                                            }
                                        ],
                                        "filter": [

                                        ]
                                    },
                                    "expandConfig": {
                                        "url": "sd/GET_BUSINESS_OBJECT_LIST/query",
                                        "method": "get",
                                        "params": [
                                            {
                                                "name": "parentId",
                                                "type": "item",
                                                "valueName": "id"
                                            },
                                            {
                                                "name": "refBusiModelId",
                                                "type": "tempValue",
                                                "valueName": "_BUSI_ID"
                                            },
                                            {
                                                "name": "_mapToObject",
                                                "type": "value",
                                                "value": true
                                            }
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
                                            "field": "id",
                                            "hidden": true,
                                            "showFilter": false,
                                            "showSort": false,
                                            "isExpand": false,
                                            "width": "400px",
                                            "style": {}
                                        },
                                        {
                                            "title": "ID",
                                            "type": "field",
                                            "field": "parentId",
                                            "hidden": true,
                                            "showFilter": false,
                                            "showSort": false,
                                            "isExpand": false,
                                            "width": "400px",
                                            "style": {}
                                        },
                                        {
                                            "title": "ID",
                                            "type": "field",
                                            "field": "refBusiModelId",
                                            "hidden": true,
                                            "showFilter": false,
                                            "showSort": false,
                                            "isExpand": false,
                                            "width": "400px",
                                            "style": {}
                                        },
                                        {
                                            "title": "资源名称",
                                            "type": "field",
                                            "field": "resName",
                                            "hidden": false,
                                            "showFilter": false,
                                            "showSort": false,
                                            "expand": true,
                                            "style": {}
                                        },
                                        {
                                            "title": "资源类型",
                                            "type": "field",
                                            "field": "refResourceType",
                                            "hidden": true,
                                            "showFilter": false,
                                            "showSort": false,
                                            "expand": false,
                                            "style": {}
                                        },
                                        {
                                            "title": "资源描述",
                                            "type": "field",
                                            "field": "descName",
                                            "hidden": false,
                                            "showFilter": false,
                                            "showSort": false,
                                            "expand": false,
                                            "style": {}
                                        },
                                        {
                                            "title": "资源类型",
                                            "type": "field",
                                            "field": "refResourceTypeText",
                                            "hidden": false,
                                            "showFilter": false,
                                            "showSort": false,
                                            "expand": false,
                                            "style": {}
                                        },
                                        {
                                            "title": "关联属性",
                                            "type": "field",
                                            "field": "refResourceKeyName",
                                            "hidden": false,
                                            "showFilter": false,
                                            "showSort": false,
                                            "expand": false,
                                            "style": {}
                                        },
                                        {
                                            "title": "关联列名",
                                            "type": "field",
                                            "field": "refParentResourcePropId",
                                            "hidden": false,
                                            "showFilter": false,
                                            "showSort": false,
                                            "expand": false,
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
                                            // {
                                            //     "id": "grid_sender_02",
                                            //     "senderId": "view_business_object",
                                            //     "triggerType": "BEHAVIOR",
                                            //     "trigger": "SET_SELECT_ROW",
                                            //     "triggerMoment": "after",
                                            //     "sendData": [
                                            //         {
                                            //             "beforeSend": {},
                                            //             "reveicerId": "",
                                            //             "receiverTriggerType": "BEHAVIOR",
                                            //             "receiverTrigger": "REFRESH_AS_CHILD",
                                            //             "params": [
                                            //                 {
                                            //                     "name": "_PID",
                                            //                     "type": "item",
                                            //                     "valueName": "ID"
                                            //                 }
                                            //             ]
                                            //         }
                                            //     ]
                                            // },
                                            {
                                                "id": "grid_sender_03",
                                                "senderId": "view_business_object",
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
                                                                "value": "view_business_object",
                                                                "type": "value"
                                                            }
                                                        ]
                                                    }
                                                ]
                                            },
                                            {
                                                "id": "grid_sender_04",
                                                "senderId": "view_business_object",
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
                                                                "value": "view_business_object",
                                                                "type": "value"
                                                            }
                                                        ]
                                                    }
                                                ]
                                            },
                                            {
                                                "id": "grid_sender_05",
                                                "senderId": "view_business_object",
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
                                                                "value": "view_business_object",
                                                                "type": "value"
                                                            }
                                                        ]
                                                    }
                                                ]
                                            },
                                            {
                                                "id": "grid_sender_06",
                                                "senderId": "view_business_object",
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
                                                                "value": "view_business_object",
                                                                "type": "value"
                                                            }
                                                        ]
                                                    }
                                                ]
                                            },
                                            {
                                                "id": "grid_sender_07",
                                                "senderId": "view_business_object",
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
                                                                "value": "view_business_object",
                                                                "type": "value"
                                                            }
                                                        ]
                                                    }
                                                ]
                                            },
                                            {
                                                "id": "grid_sender_08",
                                                "senderId": "view_business_object",
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
                                                                "value": "view_business_object",
                                                                "type": "value"
                                                            }
                                                        ]
                                                    }
                                                ]
                                            },
                                            {
                                                "id": "afterAddBusinessSubObjectSuccess",
                                                "senderId": "view_business_object",
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
                                                "id": "afterAddSubBusinessSubObjectSuccess",
                                                "senderId": "view_business_object",
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
                                                "id": "afterEditBusinessSubObjectSuccess",
                                                "senderId": "view_business_object",
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
                                                        "receiverTrigger": "REPLACE_ROW_DATA",
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
                                                "id": "afterAddBusinessSubObjectValidation",
                                                "senderId": "view_business_object",
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
                                                "senderId": "view_business_object",
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
                                                "senderId": "view_business_object",
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
                                                "senderId": "view_business_object",
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
                                                "senderId": "view_business_main",
                                                "receiveData": [
                                                    {
                                                        "beforeReceive": [],
                                                        "triggerType": "BEHAVIOR",
                                                        "trigger": "REFRESH_AS_CHILD",
                                                        "params": [
                                                            {
                                                                "pname": "_BUSI_ID",
                                                                "cname": "_BUSI_ID",
                                                                "valueTo": "tempValue"
                                                            }
                                                        ]
                                                    }
                                                ]
                                            },
                                            {
                                                "id": "",
                                                "senderId": "view_business_object",
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
                                                    //  "conditionId": "edit_business_main"
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
                                                    // "conditionId": "add_business_main_condition"
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
                                                    "senderId": "afterAddBusinessSubObjectSuccess"
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
                                            "senderId": "view_business_object",
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
                                            "senderId": "view_business_object",
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
                            }],
                        id: "3vlDRq",
                        type: "row"
                    }
                ]
            }
        }
    }

    public subPageConfig = {
        "businessObjectForm": {
            "id": "4K0naM",
            "type": "layout",
            "title": "布局4K0naM",
            "container": "rows",
            "rows": [
                {
                    "cols": [
                        {
                            "id": "layout_component_form",
                            "col": "cc",
                            "type": "col",
                            "title": "",
                            "span": 24,
                            "container": "rows",
                            "size": {
                                "nzXs": 24,
                                "nzSm": 24,
                                "nzMd": 24,
                                "nzLg": 24,
                                "nzXl": 24,
                                "nzXXl": 24
                            },
                            "rows": [
                                {
                                    "cols": [
                                        {
                                            "id": "layout_form_component",
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
                                                "id": "view_business_object_form",
                                                "type": "form",
                                                "component": "form",
                                                "state": "new",
                                                "loadingConfig": {
                                                    "id": "loadform"
                                                },
                                                "cascade": {
                                                    "messageSender": [
                                                        {
                                                            "id": "afterComponentFormUpdateSuccess",
                                                            "senderId": "view_business_object_form",
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
                                                                            "type": "returnValue",
                                                                            "valueName": "ID"
                                                                        },
                                                                        {
                                                                            "name": "NAME",
                                                                            "type": "returnValue",
                                                                            "valueName": "NAME"
                                                                        }
                                                                    ]
                                                                }
                                                            ]
                                                        }
                                                    ],
                                                    "messageReceiver": [
                                                        {
                                                            "id": "",
                                                            "senderId": "view_tree_component_base",
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
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                },
                                                "cascadeValue": [
                                                    {
                                                        "type": "",
                                                        "controlId": "res_type",
                                                        "name": "refResourceType",
                                                        "CascadeObjects": [
                                                            {
                                                                "controlId": "res_ref_id",
                                                                "cascadeName": "refResourceId",
                                                                "cascadeItems": [
                                                                    {
                                                                        "type": "default",
                                                                        "caseValue": {
                                                                            "type": "selectObjectValue",
                                                                            "valueName": "value",
                                                                            "regular": "^0$"
                                                                        },
                                                                        "content": {
                                                                            "type": "ajax",
                                                                            "data": {
                                                                                "option": [
                                                                                    {
                                                                                        "name": "_TYPE",
                                                                                        "type": "selectValue",
                                                                                        "valueName": "refResourceType"
                                                                                    }
                                                                                ]
                                                                            }
                                                                        }
                                                                    }

                                                                ]
                                                            }
                                                        ]
                                                    }
                                                ],
                                                "cascadeLayout": [
                                                    {
                                                        "field": "refResourceType",
                                                        "mapping": [
                                                            {
                                                                "value": 0,
                                                                "layout": [
                                                                    "col_1",
                                                                    "col_2",
                                                                    "col_3",
                                                                    "col_4",
                                                                    "col_5",
                                                                ]
                                                            },
                                                            {
                                                                "value": 1,
                                                                "layout": [
                                                                    "col_1",
                                                                    "col_2",
                                                                    "col_3",
                                                                    "col_4",
                                                                    "col_6",
                                                                ]
                                                            }
                                                        ]
                                                    }
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
                                                                    "id": "col_1",
                                                                    "col": "cc",
                                                                    "type": "col",
                                                                    "title": "列ioj0mV",
                                                                    "span": 12,
                                                                    "layoutContain": "select",
                                                                    "size": {
                                                                        "nzXs": 24,
                                                                        "nzSm": 24,
                                                                        "nzMd": 12,
                                                                        "nzLg": 12,
                                                                        "ngXl": 12,
                                                                        "nzXXl": 12
                                                                    },
                                                                    "control": {
                                                                        "id": "res_refField"
                                                                    }
                                                                },
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
                                                                        "nzMd": 12,
                                                                        "nzLg": 12,
                                                                        "ngXl": 12,
                                                                        "nzXXl": 12
                                                                    },
                                                                    "control": {
                                                                        "id": "res_refProperty"
                                                                    }
                                                                },
                                                                {
                                                                    "id": "col_3",
                                                                    "col": "cc",
                                                                    "type": "col",
                                                                    "title": "列ioj0mV",
                                                                    "span": 12,
                                                                    "layoutContain": "select",
                                                                    "size": {
                                                                        "nzXs": 24,
                                                                        "nzSm": 24,
                                                                        "nzMd": 12,
                                                                        "nzLg": 12,
                                                                        "ngXl": 12,
                                                                        "nzXXl": 12
                                                                    },
                                                                    "control": {
                                                                        "id": "res_cascade_del"
                                                                    }
                                                                },
                                                                {
                                                                    "id": "col_4",
                                                                    "col": "cc",
                                                                    "type": "col",
                                                                    "title": "列iHspYn",
                                                                    "span": 24,
                                                                    "layoutContain": "select",
                                                                    "size": {
                                                                        "nzXs": 24,
                                                                        "nzSm": 24,
                                                                        "nzMd": 24,
                                                                        "nzLg": 24,
                                                                        "ngXl": 24,
                                                                        "nzXXl": 24
                                                                    },
                                                                    "control": {
                                                                        "id": "res_type"
                                                                    }
                                                                },
                                                                {
                                                                    "id": "col_5",
                                                                    "col": "cc",
                                                                    "type": "col",
                                                                    "title": "列ioj0mV",
                                                                    "span": 24,
                                                                    "layoutContain": "select",
                                                                    "size": {
                                                                        "nzXs": 24,
                                                                        "nzSm": 24,
                                                                        "nzMd": 24,
                                                                        "nzLg": 24,
                                                                        "ngXl": 24,
                                                                        "nzXXl": 24
                                                                    },
                                                                    "control": {
                                                                        "id": "res_ref_id"
                                                                    }
                                                                },
                                                                {
                                                                    "id": "col_6",
                                                                    "col": "cc",
                                                                    "type": "col",
                                                                    "title": "列ioj0mV",
                                                                    "span": 24,
                                                                    "layoutContain": "select",
                                                                    "size": {
                                                                        "nzXs": 24,
                                                                        "nzSm": 24,
                                                                        "nzMd": 24,
                                                                        "nzLg": 24,
                                                                        "ngXl": 24,
                                                                        "nzXXl": 24
                                                                    },
                                                                    "control": {
                                                                        "id": "res_refSQL"
                                                                    }
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                },
                                                "formControls": [
                                                    {
                                                        "id": "res_refProperty",
                                                        "hidden": false,
                                                        "title": "关联属性1",
                                                        "titleConfig": {
                                                            "required": false
                                                        },
                                                        "field": "refResourceKeyName",
                                                        "labelSize": {
                                                            "span": 6,
                                                            "nzXs": 6,
                                                            "nzSm": 6,
                                                            "nzMd": 6,
                                                            "nzLg": 6,
                                                            "ngXl": 6,
                                                            "nzXXl": 6
                                                        },
                                                        "controlSize": {
                                                            "span": 18,
                                                            "nzXs": {
                                                                "span": 18,
                                                                "offset": 0
                                                            },
                                                            "nzSm": {
                                                                "span": 18,
                                                                "offset": 0
                                                            },
                                                            "nzMd": {
                                                                "span": 18,
                                                                "offset": 0
                                                            },
                                                            "nzLg": {
                                                                "span": 18,
                                                                "offset": 0
                                                            },
                                                            "ngXl": {
                                                                "span": 18,
                                                                "offset": 0
                                                            },
                                                            "nzXXl": {
                                                                "span": 18,
                                                                "offset": 0
                                                            }
                                                        },
                                                        "state": "edit",
                                                        "text": {
                                                            "type": "label",
                                                            "field": "refResourceKeyName"
                                                        },
                                                        "editor": {
                                                            "type": "gridSelect",
                                                            "field": "refResourceKeyName",
                                                            "layoutName": "tableColumnsList",
                                                            "placeholder": "请选择",
                                                            "loadingItemConfig": {
                                                                "id": "loadformgrid1"
                                                            },
                                                            "labelName": "DESC_NAME",
                                                            "valueName": "CNAME"
                                                        }
                                                    },
                                                    {
                                                        "id": "res_refField",
                                                        "hidden": false,
                                                        "title": "关联列名",
                                                        "titleConfig": {
                                                            "required": false
                                                        },
                                                        "field": "refParentResourcePropId",
                                                        "labelSize": {
                                                            "span": 6,
                                                            "nzXs": 6,
                                                            "nzSm": 6,
                                                            "nzMd": 6,
                                                            "nzLg": 6,
                                                            "ngXl": 6,
                                                            "nzXXl": 6
                                                        },
                                                        "controlSize": {
                                                            "span": 18,
                                                            "nzXs": {
                                                                "span": 18,
                                                                "offset": 0
                                                            },
                                                            "nzSm": {
                                                                "span": 18,
                                                                "offset": 0
                                                            },
                                                            "nzMd": {
                                                                "span": 18,
                                                                "offset": 0
                                                            },
                                                            "nzLg": {
                                                                "span": 18,
                                                                "offset": 0
                                                            },
                                                            "ngXl": {
                                                                "span": 18,
                                                                "offset": 0
                                                            },
                                                            "nzXXl": {
                                                                "span": 18,
                                                                "offset": 0
                                                            }
                                                        },
                                                        "state": "edit",
                                                        "text": {
                                                            "type": "label",
                                                            "field": "refParentResourcePropId"
                                                        },
                                                        "editor": {
                                                            "type": "input",
                                                            "field": "refParentResourcePropId",
                                                            "placeholder": "请输入",
                                                            "validations": []
                                                        }
                                                    },
                                                    {
                                                        "id": "res_cascade_del",
                                                        "hidden": true,
                                                        "title": "及联删除",
                                                        "titleConfig": {
                                                            "required": false
                                                        },
                                                        "field": "isCascadeDelete",
                                                        "labelSize": {
                                                            "span": 6,
                                                            "nzXs": 6,
                                                            "nzSm": 6,
                                                            "nzMd": 6,
                                                            "nzLg": 6,
                                                            "ngXl": 6,
                                                            "nzXXl": 6
                                                        },
                                                        "controlSize": {
                                                            "span": 18,
                                                            "nzXs": {
                                                                "span": 18,
                                                                "offset": 0
                                                            },
                                                            "nzSm": {
                                                                "span": 18,
                                                                "offset": 0
                                                            },
                                                            "nzMd": {
                                                                "span": 18,
                                                                "offset": 0
                                                            },
                                                            "nzLg": {
                                                                "span": 18,
                                                                "offset": 0
                                                            },
                                                            "ngXl": {
                                                                "span": 18,
                                                                "offset": 0
                                                            },
                                                            "nzXXl": {
                                                                "span": 18,
                                                                "offset": 0
                                                            }
                                                        },
                                                        "state": "edit",
                                                        "text": {
                                                            "type": "label",
                                                            "field": "isCascadeDelete"
                                                        },
                                                        "editor": {
                                                            "type": "select",
                                                            "field": "isCascadeDelete",
                                                            "placeholder": "请输入",
                                                            "options": [
                                                                {
                                                                    "label": "是",
                                                                    "value": 1
                                                                },
                                                                {
                                                                    "label": "否",
                                                                    "value": 0
                                                                }
                                                            ],
                                                            "defaultValue": 0,
                                                            "labelName": "label"
                                                        }
                                                    },
                                                    {
                                                        "id": "res_type",
                                                        "hidden": false,
                                                        "title": "资源类型",
                                                        "titleConfig": {
                                                            "required": false
                                                        },
                                                        "field": "refResourceType",
                                                        "labelSize": {
                                                            "span": 3,
                                                            "nzXs": {
                                                                "span": 3
                                                            },
                                                            "nzSm": {
                                                                "span": 3
                                                            },
                                                            "nzMd": {
                                                                "span": 3
                                                            },
                                                            "nzLg": {
                                                                "span": 3
                                                            },
                                                            "ngXl": {
                                                                "span": 3
                                                            },
                                                            "nzXXl": {
                                                                "span": 3
                                                            }
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
                                                            "field": "refResourceType"
                                                        },
                                                        "editor": {
                                                            "type": "select",
                                                            "field": "refResourceType",
                                                            "placeholder": "请选择",
                                                            "options": [
                                                                {
                                                                    "label": "表资源",
                                                                    "value": 0
                                                                },
                                                                {
                                                                    "label": "SQL 资源",
                                                                    "value": 1
                                                                }
                                                            ],
                                                            "defaultValue": 0,
                                                            "labelName": "label",
                                                            "valueName": "value"
                                                        }
                                                    },
                                                    {
                                                        "id": "res_ref_id",
                                                        "hidden": true,
                                                        "title": "关联表资源",
                                                        "titleConfig": {
                                                            "required": false
                                                        },
                                                        "field": "refResourceId",
                                                        "labelSize": {
                                                            "span": 3,
                                                            "nzXs": 3,
                                                            "nzSm": 3,
                                                            "nzMd": 3,
                                                            "nzLg": 3,
                                                            "ngXl": 3,
                                                            "nzXXl": 3
                                                        },
                                                        "controlSize": {
                                                            "span": 18,
                                                            "nzXs": {
                                                                "span": 18,
                                                                "offset": 0
                                                            },
                                                            "nzSm": {
                                                                "span": 18,
                                                                "offset": 0
                                                            },
                                                            "nzMd": {
                                                                "span": 18,
                                                                "offset": 0
                                                            },
                                                            "nzLg": {
                                                                "span": 18,
                                                                "offset": 0
                                                            },
                                                            "ngXl": {
                                                                "span": 18,
                                                                "offset": 0
                                                            },
                                                            "nzXXl": {
                                                                "span": 18,
                                                                "offset": 0
                                                            }
                                                        },
                                                        "state": "edit",
                                                        "text": {
                                                            "type": "label",
                                                            "field": "refResourceId"
                                                        },
                                                        "editor": {
                                                            "type": "gridSelect",
                                                            "field": "refResourceId",
                                                            "layoutName": "apiResourceList",
                                                            "placeholder": "请选择",
                                                            "loadingItemConfig": {
                                                                "id": "loadformgrid"
                                                            },
                                                            "labelName": "DESC_NAME",
                                                            "valueName": "ID"
                                                        }
                                                    },
                                                    {
                                                        "id": "res_refSQL",
                                                        "hidden": true,
                                                        "title": "关联SQL资源",
                                                        "titleConfig": {
                                                            "required": false
                                                        },
                                                        "field": "sqlList",
                                                        "labelSize": {
                                                            "span": 3,
                                                            "nzXs": 3,
                                                            "nzSm": 3,
                                                            "nzMd": 3,
                                                            "nzLg": 3,
                                                            "ngXl": 3,
                                                            "nzXXl": 3
                                                        },
                                                        "controlSize": {
                                                            "span": 21,
                                                            "nzXs": {
                                                                "span": 12,
                                                                "offset": 0
                                                            },
                                                            "nzSm": {
                                                                "span": 21,
                                                                "offset": 0
                                                            },
                                                            "nzMd": {
                                                                "span": 21,
                                                                "offset": 0
                                                            },
                                                            "nzLg": {
                                                                "span": 21,
                                                                "offset": 0
                                                            },
                                                            "ngXl": {
                                                                "span": 21,
                                                                "offset": 0
                                                            },
                                                            "nzXXl": {
                                                                "span": 21,
                                                                "offset": 0
                                                            }
                                                        },
                                                        "state": "edit",
                                                        "text": {
                                                            "type": "label",
                                                            "field": "sqlList"
                                                        },
                                                        "editor": {
                                                            "type": "staticGrid",
                                                            "field": "sqlList",
                                                            "placeholder": "",
                                                            "validations": []
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
                                                                "id": "res_type",
                                                                "state": "edit",
                                                                "hidden": false,
                                                                "readOnly": false
                                                            },
                                                            {
                                                                "id": "res_refField",
                                                                "state": "edit",
                                                                "hidden": true,
                                                                "readOnly": false
                                                            },
                                                            {
                                                                "id": "res_refProperty",
                                                                "state": "edit",
                                                                "hidden": true,
                                                                "readOnly": false
                                                            },
                                                            {
                                                                "id": "res_cascade_del",
                                                                "state": "edit",
                                                                "hidden": true,
                                                                "readOnly": false
                                                            },
                                                            {
                                                                "id": "res_ref_id",
                                                                "state": "edit",
                                                                "hidden": true,
                                                                "readOnly": false
                                                            }

                                                        ]
                                                    },
                                                    {
                                                        "formState": "edit",
                                                        "Controls": [
                                                            {
                                                                "id": "res_type",
                                                                "state": "edit",
                                                                "hidden": false,
                                                                "readOnly": false
                                                            },
                                                            {
                                                                "id": "res_refField",
                                                                "state": "edit",
                                                                "hidden": true,
                                                                "readOnly": false
                                                            },
                                                            {
                                                                "id": "res_refProperty",
                                                                "state": "edit",
                                                                "hidden": true,
                                                                "readOnly": false
                                                            },
                                                            {
                                                                "id": "res_cascade_del",
                                                                "state": "edit",
                                                                "hidden": true,
                                                                "readOnly": false
                                                            },
                                                            {
                                                                "id": "res_ref_id",
                                                                "state": "edit",
                                                                "hidden": true,
                                                                "readOnly": false
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        "formState": "text",
                                                        "Controls": [
                                                            {
                                                                "id": "res_type",
                                                                "state": "text",
                                                                "hidden": false,
                                                                "readOnly": false
                                                            },
                                                            {
                                                                "id": "res_refField",
                                                                "state": "text",
                                                                "hidden": true,
                                                                "readOnly": false
                                                            },
                                                            {
                                                                "id": "res_refProperty",
                                                                "state": "text",
                                                                "hidden": true,
                                                                "readOnly": false
                                                            },
                                                            {
                                                                "id": "res_cascade_del",
                                                                "state": "text",
                                                                "hidden": true,
                                                                "readOnly": false
                                                            },
                                                            {
                                                                "id": "res_ref_id",
                                                                "state": "edit",
                                                                "hidden": true,
                                                                "readOnly": false
                                                            }
                                                        ]
                                                    }
                                                ],
                                                "ajaxConfig": [
                                                    {
                                                        "id": "loadform",
                                                        "url": "td/SMT_BASE_COMPONENT/query",
                                                        "urlType": "inner",
                                                        "ajaxType": "get",
                                                        "params": [
                                                            {
                                                                "name": "ID",
                                                                "type": "tempValue",
                                                                "valueName": "_ID"
                                                            }
                                                        ],
                                                        "outputParameters": [],
                                                        "result": []
                                                    },
                                                    {
                                                        "id": "loadformgrid",
                                                        "url": "sd/GET_BUSINESS_OBJECT_LIST/query",
                                                        "urlType": "inner",
                                                        "ajaxType": "get",
                                                        "params": [
                                                            {
                                                                "name": "ID",
                                                                "type": "tempValue",
                                                                "valueName": "_ID",
                                                            }
                                                        ],
                                                        "outputParameters": [],
                                                        "result": []
                                                    }
                                                ]
                                            }
                                        }
                                    ]
                                }
                            ]
                        }
                    ],
                    "id": "3vlDRq",
                    "type": "row"
                }
            ]
        },
        "apiResourceList": {
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
                "id": "view_01",
                "title": "资源列表",
                "titleIcon": "right-circle",
                "component": "cnDataTable",
                "keyId": "ID",
                "size": "small",
                "isBordered": true,
                "isFrontPagination": false,
                "isPagination": true,
                "isShowSizeChanger": true,
                "showTotal": true,
                "pageSize": 5,
                "isSelected": true,
                "showCheckBox": false,
                "pageSizeOptions": [
                    10,
                    20,
                    50,
                    100
                ],
                "loadingOnInit": true,
                "spanWidthConfig": [
                    "50px",
                    "100px",
                    "200px",
                    "200px",
                    "200px"
                ],
                "loadingConfig": {
                    "url": "sd/GET_ALL_RESOURCE_LIST/query",
                    "method": "get",
                    "params": [
                        {
                            "name": "TYPE",
                            "type": "initValue",
                            "valueName": "refResourceType"
                        }
                    ],
                    "filter": []
                },
                "columns": [{
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
                    "title": "资源名称",
                    "type": "field",
                    "field": "RES_NAME",
                    "hidden": false,
                    "showFilter": false,
                    "showSort": false,
                    "width": "50px",
                    "style": {}
                },
                {
                    "title": "资源描述",
                    "type": "field",
                    "field": "DESC_NAME",
                    "hidden": false,
                    "showFilter": false,
                    "showSort": false,
                    "width": "100px",
                    "style": {}
                }
                ],
                "cascade": {
                    "messageSender": [{
                        "id": "grid_sender_02",
                        "senderId": "view_01",
                        "triggerType": "BEHAVIOR",
                        "trigger": "SET_SELECT_ROW",
                        "triggerMoment": "after",
                        "sendData": [{
                            "beforeSend": {},
                            "reveicerId": "",
                            "receiverTriggerType": "BEHAVIOR",
                            "receiverTrigger": "REFRESH_AS_CHILD",
                            "params": [{
                                "name": "_PID",
                                "type": "item",
                                "valueName": "id"
                            }]
                        }]
                    }]
                },
                "rowActions": [],
                "dialog": [],
                "condition": [],
                "ajaxConfig": [],
                "beforeTrigger": [],
                "afterTrigger": []
            }
        },
        "tableColumnsList": {
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
                "id": "view_table_column",
                "title": "资源字段列表",
                "titleIcon": "right-circle",
                "component": "cnDataTable",
                "keyId": "ID",
                "size": "small",
                "isBordered": true,
                "isFrontPagination": false,
                "isPagination": true,
                "isShowSizeChanger": true,
                "showTotal": true,
                "pageSize": 5,
                "isSelected": true,
                "showCheckBox": false,
                "pageSizeOptions": [
                    10,
                    20,
                    50,
                    100
                ],
                "loadingOnInit": false,
                "spanWidthConfig": [
                    "50px",
                    "100px",
                    "200px",
                    "200px",
                    "200px"
                ],
                "loadingConfig": {
                    "url": "td/DM_COLUMN/query",
                    "method": "get",
                    "params": [
                        {
                            "name": "TABLE_ID",
                            "type": "initValue",
                            "valueName": "_TABLE_ID"
                        }
                    ],
                    "filter": []
                },
                "columns": [
                    {
                        "title": "列名称",
                        "type": "field",
                        "field": "CNAME",
                        "hidden": false,
                        "showFilter": false,
                        "showSort": false,
                        "width": "100px",
                        "style": {}
                    },
                    {
                        "title": "列描述",
                        "type": "field",
                        "field": "DESC_NAME",
                        "hidden": false,
                        "showFilter": false,
                        "showSort": false,
                        "width": "100px",
                        "style": {}
                    }
                ],
                "cascade": {
                    "messageSender": [{
                        "id": "grid_sender_02",
                        "senderId": "view_01",
                        "triggerType": "BEHAVIOR",
                        "trigger": "SET_SELECT_ROW",
                        "triggerMoment": "after",
                        "sendData": [{
                            "beforeSend": {},
                            "reveicerId": "",
                            "receiverTriggerType": "BEHAVIOR",
                            "receiverTrigger": "REFRESH_AS_CHILD",
                            "params": [{
                                "name": "_PID",
                                "type": "item",
                                "valueName": "id"
                            }]
                        }]
                    }]
                },
                "rowActions": [],
                "dialog": [],
                "condition": [],
                "ajaxConfig": [],
                "beforeTrigger": [],
                "afterTrigger": []
            }
        }

    }

    public constructor(@Inject(BSN_COMPONENT_SERVICES)
    public componentService: ComponentServiceProvider) {
        super(componentService);
    }

    public ngOnInit() {
        this.componentService.cacheService.set('businessObjectForm', this.subPageConfig.businessObjectForm);
        this.componentService.cacheService.set('apiResourceList', this.subPageConfig.apiResourceList);
        this.componentService.cacheService.set('tableColumnsList', this.subPageConfig.tableColumnsList);
    }
}