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
    selector: 'data-table-demo',
    templateUrl: './data-table-demo.component.html',
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
export class DataTableDemoComponent extends CnComponentBase implements OnInit {
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
                            "id": "toolbar_001",
                            "component": "cnToolbar",
                            "size": "default",
                            "cascade": {
                                "messageSender": [
                                    {
                                        "id": "toolbar_01",
                                        "senderId": "view_01",
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
                                        "senderId": "view_01",
                                        "receiveData": [
                                            {
                                                "triggerType": "STATE",
                                                "trigger": "STATE_TO_TEXT"
                                            }
                                        ]
                                    },
                                    {
                                        "id": "s_002",
                                        "senderId": "view_01",
                                        "receiveData": [
                                            {
                                                "triggerType": "STATE",
                                                "trigger": "STATE_TO_EDIT"
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

                                    ]
                                }
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
                                                    // "ajaxId": "delete_row_1"
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
                                                    "conditionId": "add_cities"
                                                },
                                                {
                                                    "triggerType": "OPERATION",
                                                    "trigger": "SAVE_ROWS",
                                                    "ajaxId": "edit_cities",
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
                            "id": "view_01",
                            "title": "主表",
                            "titleIcon": "right-circle",
                            "component": "cnDataTable",
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
                            "loadingOnInit": true,
                            // "scroll": {
                            //     "y": "300px"
                            // },
                            "spanWidthConfig": [
                                '50px', '100px', '200px', '200px', '200px'
                            ],
                            "loadingConfig": {
                                "url": "province/page",
                                "method": "get",
                                "params": [

                                ],
                                "filter": [

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
                                    "isShowExpand": false,
                                    "width": "50px",
                                    "style": {}
                                },
                                {
                                    "title": "PROVINCE_NAME",
                                    "type": "field",
                                    "field": "provinceName",
                                    "hidden": false,
                                    "showFilter": false,
                                    "showSort": false,
                                    "width": "50px",
                                    "style": {},
                                },
                                {
                                    "title": "POPULATIONSIZE",
                                    "type": "field",
                                    "field": "populationSize",
                                    "hidden": false,
                                    "showFilter": false,
                                    "showSort": false,
                                    "width": "100px",
                                    "style": {},
                                },
                                {
                                    "title": "DIRECTLYUNDER",
                                    "type": "field",
                                    "field": "directlyUnder",
                                    "hidden": false,
                                    "showFilter": false,
                                    "showSort": false,
                                    "width": "100px",
                                    "style": {},
                                },
                                {
                                    "title": "AREACODE",
                                    "type": "field",
                                    "field": "areaCode",
                                    "hidden": false,
                                    "showFilter": false,
                                    "showSort": false,
                                    "width": "100px",
                                    "style": {},
                                },
                                {
                                    "title": "CREATEDATE",
                                    "type": "field",
                                    "field": "createDate",
                                    "hidden": false,
                                    "showFilter": false,
                                    "showSort": false,
                                    "width": "100px",
                                    "style": {},
                                },
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
                                    "actionIds": [
                                        "grid_edit", "grid_cancel", "grid_save", "grid_delete", "grid_new", "grid_new_cancel"
                                    ]
                                }
                            ],
                            "cascade": {
                                "messageSender": [
                                    {
                                        "id": "grid_sender_02",
                                        "senderId": "view_01",
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
                                                        "valueName": "id"
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        "id": "grid_sender_03",
                                        "senderId": "view_01",
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
                                                        "value": "view_01",
                                                        "type": "value"
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        "id": "grid_sender_04",
                                        "senderId": "view_01",
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
                                                        "value": "view_01",
                                                        "type": "value"
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        "id": "grid_sender_05",
                                        "senderId": "view_01",
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
                                                        "value": "view_01",
                                                        "type": "value"
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        "id": "grid_sender_06",
                                        "senderId": "view_01",
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
                                                        "value": "view_01",
                                                        "type": "value"
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        "id": "grid_sender_07",
                                        "senderId": "view_01",
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
                                                        "value": "view_01",
                                                        "type": "value"
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        "id": "grid_sender_08",
                                        "senderId": "view_01",
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
                                    "content": "是否删除当前操作数据?"
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
                                    "senderId": "view_01",
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
                                "messageReceiver": [
                                    {
                                        "id": "s_201",
                                        "senderId": "view_02",
                                        "receiveData": [
                                            {
                                                "triggerType": "STATE",
                                                "trigger": "STATE_TO_TEXT"
                                            }
                                        ]
                                    },
                                    {
                                        "id": "s_202",
                                        "senderId": "view_02",
                                        "receiveData": [
                                            {
                                                "triggerType": "STATE",
                                                "trigger": "STATE_TO_EDIT"
                                            }
                                        ]
                                    }

                                ]
                            },
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
                                    "id": "add_save_2",
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
                                    "id": "edit_save_2",
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
                                    "id": "add_cities_1",
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
                                            "senderId": "toolbar_02"
                                        },
                                        {
                                            "name": "validation",
                                            "senderId": "toolbar_02"
                                        },
                                        {
                                            "name": "error",
                                            "senderId": "toolbar_02"
                                        }
                                    ]
                                },
                                {
                                    "id": "edit_cities_1",
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
                                                    // "conditionId": "add_save_1"
                                                },
                                                {
                                                    "triggerType": "OPERATION",
                                                    "trigger": "SAVE_ROWS",
                                                    "ajaxId": "edit_cities_1",
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
                                "url": "information/selectCityByProvinceIdPage",
                                "method": "get",
                                "params": [
                                    {
                                        "name": "pid",
                                        "type": "tempValue",
                                        "valueName": "_PID"
                                    }
                                ],
                                "filter": [

                                ]
                            },
                            "columns": [
                                {
                                    "title": "id",
                                    "type": "field",
                                    "field": "id",
                                    "hidden": true,
                                    "showFilter": false,
                                    "showSort": false,
                                    "isShowExpand": false,
                                    "width": "50px",
                                    "style": {}
                                },
                                {
                                    "title": "id",
                                    "type": "field",
                                    "field": "pId",
                                    "hidden": true,
                                    "showFilter": false,
                                    "showSort": false,
                                    "isShowExpand": false,
                                    "width": "50px",
                                    "style": {}
                                },
                                {
                                    "title": "CITY_NAME",
                                    "type": "field",
                                    "field": "cityName",
                                    "hidden": false,
                                    "showFilter": false,
                                    "showSort": false,
                                    "width": "100px",
                                    "style": {},
                                },
                                {
                                    "title": "ZIPCODE",
                                    "type": "field",
                                    "field": "zipCode",
                                    "hidden": false,
                                    "showFilter": false,
                                    "showSort": false,
                                    "width": "100px",
                                    "style": {},
                                },
                                {
                                    "title": "POPULATIONSIZE",
                                    "type": "field",
                                    "field": "populationSize",
                                    "hidden": false,
                                    "showFilter": false,
                                    "showSort": false,
                                    "width": "100px",
                                    "style": {},
                                },
                                {
                                    "title": "DIRECTLYUNDER",
                                    "type": "field",
                                    "field": "directlyUnder",
                                    "hidden": false,
                                    "showFilter": false,
                                    "showSort": false,
                                    "width": "100px",
                                    "style": {},
                                },
                                {
                                    "title": "CREATEDATE",
                                    "type": "field",
                                    "field": "createDate",
                                    "hidden": false,
                                    "showFilter": false,
                                    "showSort": false,
                                    "width": "100px",
                                    "style": {},
                                },
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
                                        "triggerMoment": "after",
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
                                        "triggerMoment": "after",
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
                                            "type": "componentValue",
                                            "valueName": "pid"
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
                                            "name": "pId",
                                            "type": "componentValue",
                                            "valueName": "_PID"
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

                                    ]
                                },
                                {
                                    "id": "city_delete_1",
                                    "url": "province/delete",
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
        entity: 'CaseDemo',
        targetViewId: '',
        type: 'array',
        properties: [
            {
                name: 'id',
                field: 'id',
                text: 'entity.data.name',
                value: '1',
                dataType: 'string'
            },
            {
                name: 'code',
                field: 'code',
                text: 'entity.data.code',
                value: '',
                dataType: 'string'
            },
            {
                name: 'language',
                field: 'language',
                text: 'entity.data.language',
                value: '',
                dataType: 'string'
            },
            {
                name: 'message',
                field: 'message',
                text: 'entity.data.message',
                value: '',
                dataType: 'string'
            }
        ],
        children: [
            {
                entity: 'validation',
                targetViewId: '',
                type: 'array',
                properties: [
                    {
                        name: 'code',
                        field: 'code',
                        text: 'entity.data.code',
                        value: '',
                        dataType: 'string'
                    },
                    {
                        name: 'msg',
                        field: 'message',
                        text: 'entity.data.message',
                        value: '',
                    }
                ],
                children: [
                    {
                        entity: 'data',
                        targetViewId: '',
                        properties: [
                            {
                                name: 'id',
                                field: 'id',
                                text: 'entity.data.name',
                                value: '1',
                                dataType: 'string'
                            },
                            {
                                name: 'code',
                                field: 'code',
                                text: 'entity.data.code',
                                value: '',
                                dataType: 'string'
                            },
                            {
                                name: 'language',
                                field: 'language',
                                text: 'entity.data.language',
                                value: '',
                                dataType: 'string'
                            },
                            {
                                name: 'message',
                                field: 'message',
                                text: 'entity.data.message',
                                value: '',
                                dataType: 'string'
                            }
                        ]
                    }
                ]
            },
            {
                entity: 'error',
                targetViewId: '',
                properties: [
                    {
                        name: 'code',
                        field: 'code',
                        text: 'entity.data.code',
                        value: '',
                        dataType: 'string'
                    },
                    {
                        name: 'msg',
                        field: 'message',
                        text: 'entity.data.message',
                        value: '',
                    }
                ],
                children: [
                    {
                        entity: 'data',
                        targetViewId: '',
                        properties: [
                            {
                                name: 'id',
                                field: 'id',
                                text: 'entity.data.name',
                                value: '1',
                                dataType: 'string'
                            },
                            {
                                name: 'code',
                                field: 'code',
                                text: 'entity.data.code',
                                value: '',
                                dataType: 'string'
                            },
                            {
                                name: 'language',
                                field: 'language',
                                text: 'entity.data.language',
                                value: '',
                                dataType: 'string'
                            },
                            {
                                name: 'message',
                                field: 'message',
                                text: 'entity.data.message',
                                value: '',
                                dataType: 'string'
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
                accountId: 'user1'
            },
            {
                _createUserId: 'user1'
            }, this._componentServices.apiService, this._componentServices.modalService, this._componentServices.msgService);
        beforeOperation.operationItemData = {
            _recordstatus: 1,
            _recods: 1,
            _resourcesreceiveid1: "undefined",
            _createUserId: '1'
        }
        this.testResult = beforeOperation.buildStatusObservableByStatusCfg({ name: 'D_addRow' }).pipe(reduce((a, b) => a || b));

        const s = new BusinessObjectBase();
        // console.log(s.resolver(s.dataConfig));
        const t = s.resolver(this.dataConfig);
        t.addProperty('caseText', '123456');
        t.editProperty('caseText', '67890');
        // t.removeProperty('caseText');

        t.addChildren('validation', { code: '2', msg: '2', data: {} });
        t.addChildren('error', [{ code: '3', msg: '3', data: {} }, { code: '4', msg: '4', data: {} }]);
        // t.orderChange({ groupName: '2', id: '2' }, { groupName: '4', id: '4' }, 'group');

        console.log(t);
    }
}