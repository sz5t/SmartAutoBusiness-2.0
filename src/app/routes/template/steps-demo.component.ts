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
    selector: 'steps-demo',
    templateUrl: './steps-demo.component.html',
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
export class StepsDemoComponent extends CnComponentBase implements OnInit {
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
                        "title": "通用步骤条",
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
                            "id": "steps_001",
                            "component": "cnSteps",
                            "size": "small",
                            "direction": "horizontal",
                            "mode": "normal",
                            "innerParams": [
                                {
                                    "name": "_SID",
                                    "valueName": "ID",
                                    "valueTo": "initData"
                                }
                            ],
                            "stepItems": [
                                {
                                    "title": "步骤 1",
                                    "subTitle": "子标题 1",
                                    "desc": "这个是第一个步骤"
                                },
                                {
                                    "title": "步骤 2",
                                    "subTitle": "子标题 2",
                                    "desc": "这个是第二个步骤"
                                },
                                {
                                    "title": "步骤 3",
                                    "subTitle": "子标题 3",
                                    "desc": "这个是第三个步骤"
                                }
                            ],
                            "stepViews": [
                                {
                                    "id": "step_1",
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
                                                                "id": "form_add_province",
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
                                                                    }
                                                                ],
                                                                "outputParameters": [

                                                                ],
                                                                "result": [

                                                                ]
                                                            },
                                                            {
                                                                "id": "form_edit_province",
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
                                                                        "text": "刷新1",
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
                                                                        "text": "新增1",
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
                                                                                "dialogId": "edit_province_form",
                                                                                "ajaxId": "form_add_province",
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
                                                                                "dialogId": "edit_province_form",
                                                                                "ajaxId": "form_edit_province",
                                                                                "changeValueId": "edit_form_changeValue"
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
                                                                                "conditionId": ""
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
                                                }
                                            ],
                                            id: "3vlDRq",
                                            type: "row"
                                        }
                                    ]
                                },
                                {
                                    "id": "step_2",
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
                                                                "id": "form_add_province",
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
                                                                    }
                                                                ],
                                                                "outputParameters": [

                                                                ],
                                                                "result": [

                                                                ]
                                                            },
                                                            {
                                                                "id": "form_edit_province",
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
                                                                        "text": "刷新2",
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
                                                                                "dialogId": "edit_province_form",
                                                                                "ajaxId": "form_add_province",
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
                                                                                "dialogId": "edit_province_form",
                                                                                "ajaxId": "form_edit_province",
                                                                                "changeValueId": "edit_form_changeValue"
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
                                                                                "conditionId": ""
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
                                                }
                                            ],
                                            id: "3vlDRq",
                                            type: "row"
                                        }
                                    ]
                                },
                                {
                                    "id": "step_3",
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
                                                                "id": "form_add_province",
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
                                                                    }
                                                                ],
                                                                "outputParameters": [

                                                                ],
                                                                "result": [

                                                                ]
                                                            },
                                                            {
                                                                "id": "form_edit_province",
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
                                                                        "text": "刷新3",
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
                                                                                "dialogId": "edit_province_form",
                                                                                "ajaxId": "form_add_province",
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
                                                                                "dialogId": "edit_province_form",
                                                                                "ajaxId": "form_edit_province",
                                                                                "changeValueId": "edit_form_changeValue"
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
                                                                                "conditionId": ""
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
                                                }
                                            ],
                                            id: "3vlDRq",
                                            type: "row"
                                        }
                                    ],
                                }
                            ],
                            "cascade": {
                                "messageSender": [
                                    // {
                                    //     "id": "toolbar_01",
                                    //     "senderId": "view_01",
                                    //     "triggerType": "OPERATION",
                                    //     "trigger": "EXECUTE_CHECKED_ROWS",
                                    //     "triggerMoment": "after",
                                    //     "sendData": [
                                    //         {
                                    //             "beforeSend": {},
                                    //             "reveicerId": "",
                                    //             "receiverTriggerType": "BEHAVIOR",
                                    //             "receiverTrigger": "REFRESH_AS_CHILD",
                                    //             "params": [
                                    //                 {
                                    //                     "name": "parent_id",
                                    //                     "type": "item",
                                    //                     "valueName": "id"
                                    //                 },
                                    //                 {
                                    //                     "name": "parent_name",
                                    //                     "type": "item",
                                    //                     "valueName": "name"
                                    //                 }
                                    //             ]
                                    //         }
                                    //     ]
                                    // }
                                ],
                                "messageReceiver": [
                                    // {
                                    //     "id": "s_001",
                                    //     "senderId": "view_01",
                                    //     "receiveData": [
                                    //         {
                                    //             "triggerType": "STATE",
                                    //             "trigger": "STATE_TO_TEXT"
                                    //         }
                                    //     ]
                                    // },
                                    // {
                                    //     "id": "s_002",
                                    //     "senderId": "view_01",
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
                                            "name": "id",
                                            "type": "item",
                                            "valueName": "id",
                                            "valueTo": "tempValue"
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
                                    "id": "form_add_province",
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
                                        }
                                    ],
                                    "outputParameters": [

                                    ],
                                    "result": [

                                    ]
                                },
                                {
                                    "id": "form_edit_province",
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
                        }
                    },
                    {
                        "id": "r5zDHB2-1",
                        "col": "cc",
                        "type": "col",
                        "title": "动态步骤条",
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
                            "id": "steps_001",
                            "component": "cnSteps",
                            "size": "middle",
                            "direction": "vertical",
                            "loadingOnInit": true,
                            "mode": "normal",
                            "innerParams": [
                                {
                                    "name": "_SID",
                                    "valueName": "ID",
                                    "valueTo": "initValue"
                                }
                            ],
                            "dataMapping": [
                                {
                                    "name": "title",
                                    "field": "NAME"
                                },
                                {
                                    "name": "subTitle",
                                    "field": "CODE"
                                },
                                {
                                    "name": "desc",
                                    "field": "TYPE"
                                }
                            ],
                            "stepMapping": [
                                {
                                    "field": "TYPE",
                                    "value": "component",
                                    "targetId": "step_1"
                                },
                                {
                                    "field": "TYPE",
                                    "value": "layout",
                                    "targetId": "step_2"
                                }
                            ],
                            "stepViews": [
                                {
                                    "id": "step_1",
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
                                                                "id": "form_add_province",
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
                                                                    }
                                                                ],
                                                                "outputParameters": [

                                                                ],
                                                                "result": [

                                                                ]
                                                            },
                                                            {
                                                                "id": "form_edit_province",
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
                                                                        "text": "刷新1",
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
                                                                        "text": "新增1",
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
                                                                                "dialogId": "edit_province_form",
                                                                                "ajaxId": "form_add_province",
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
                                                                                "dialogId": "edit_province_form",
                                                                                "ajaxId": "form_edit_province",
                                                                                "changeValueId": "edit_form_changeValue"
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
                                                                                "conditionId": ""
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
                                                }
                                            ],
                                            id: "3vlDRq",
                                            type: "row"
                                        }
                                    ]
                                },
                                {
                                    "id": "step_2",
                                    "type": "layout",
                                    "title": "布局4K0naM",
                                    "container": "rows",
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
                                                        "id": "view_form_edit_component",
                                                        "type": "form",
                                                        "component": "form",
                                                        "state": 'text',
                                                        "loadingConfig": {
                                                            "id": "loadform"
                                                        },
                                                        "cascade": {
                                                            "messageSender": [
                                                                {
                                                                    "id": "afterComponentFormUpdateSuccess",
                                                                    "senderId": "view_form_edit_component",
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
                                                        "formLayout": {
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
                                                                            "title": "列iHspYn", "span": 12,
                                                                            "layoutContain": "input",
                                                                            "size": {
                                                                                "nzXs": 24, "nzSm": 24, "nzMd": 12, "nzLg": 12, "ngXl": 12, "nzXXl": 12
                                                                            },
                                                                            "control": {
                                                                                "id": "ctl_name"  // id 和引用id 值相同
                                                                            }
                                                                        },
                                                                        {
                                                                            "id": "ioj0mV1", "col": "cc", "type": "col", "title": "列ioj0mV", "span": 12, "layoutContain": "select",
                                                                            "size": {
                                                                                "nzXs": 24, "nzSm": 24, "nzMd": 12, "nzLg": 12, "ngXl": 12, "nzXXl": 12
                                                                            },
                                                                            "control": { "id": "ctl_code" }
                                                                        },
                                                                        {
                                                                            "id": "ioj0mV2", "col": "cc", "type": "col", "title": "列ioj0mV", "span": 12, "layoutContain": "select",
                                                                            "size": {
                                                                                "nzXs": 24, "nzSm": 24, "nzMd": 12, "nzLg": 12, "ngXl": 12, "nzXXl": 12
                                                                            },
                                                                            "control": { "id": "ctl_type" }
                                                                        },
                                                                        {
                                                                            "id": "ioj0mV3", "col": "cc", "type": "col", "title": "列ioj0mV", "span": 12, "layoutContain": "select",
                                                                            "size": {
                                                                                "nzXs": 24, "nzSm": 24, "nzMd": 12, "nzLg": 12, "ngXl": 12, "nzXXl": 12
                                                                            },
                                                                            "control": { "id": "ctl_version" }
                                                                        },
                                                                        {
                                                                            "id": "ioj0mV4", "col": "cc", "type": "col", "title": "列ioj0mV", "span": 12, "layoutContain": "select",
                                                                            "size": {
                                                                                "nzXs": 24, "nzSm": 24, "nzMd": 12, "nzLg": 12, "ngXl": 12, "nzXXl": 12
                                                                            },
                                                                            "control": { "id": "ctl_sort" }
                                                                        },
                                                                        {
                                                                            "id": "ioj0mV5", "col": "cc", "type": "col", "title": "列ioj0mV", "span": 12, "layoutContain": "select",
                                                                            "size": {
                                                                                "nzXs": 24, "nzSm": 24, "nzMd": 12, "nzLg": 12, "ngXl": 12, "nzXXl": 12
                                                                            },
                                                                            "control": { "id": "ctl_state" }
                                                                        }
                                                                    ]
                                                                }]
                                                        },
                                                        "formControls": [
                                                            {
                                                                id: 'ctl_id',
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
                                                                id: 'ctl_name',
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
                                                                id: 'ctl_code',
                                                                "hidden": true,
                                                                "title": "组件编码",
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
                                                            {
                                                                id: 'ctl_version',
                                                                "hidden": true,
                                                                "title": "版本",
                                                                "titleConfig": {
                                                                    required: false
                                                                },
                                                                "field": "VERSION",
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
                                                                    "field": 'VERSION',
                                                                },
                                                                "editor": {
                                                                    "type": "select",
                                                                    "field": "VERSION",
                                                                    "placeholder": "请输入",
                                                                    "options": [
                                                                        { "label": 'v1.0', "value": "v1.0" },
                                                                        { "label": 'v2.0', "value": "v2.0" }
                                                                    ],
                                                                    "defaultValue": "v2.0",
                                                                    "labelName": "label",
                                                                    "valueName": "value"
                                                                }
                                                            },
                                                            {
                                                                id: 'ctl_sort',
                                                                "hidden": true,
                                                                "title": "排序",
                                                                "titleConfig": {
                                                                    required: false
                                                                },
                                                                "field": "SORT",
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
                                                                    "field": 'SORT',
                                                                },
                                                                "editor": {
                                                                    "type": "input",
                                                                    "field": "SORT",
                                                                    "placeholder": "请输入"
                                                                }
                                                            },
                                                            {
                                                                id: 'ctl_type',
                                                                "hidden": true,
                                                                "title": "组件类型",
                                                                "titleConfig": {
                                                                    required: false
                                                                },
                                                                "field": "TYPE",
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
                                                                    "field": 'TYPE',
                                                                },
                                                                "editor": {
                                                                    "type": "select",
                                                                    "field": "TYPE",
                                                                    "placeholder": "请输入",
                                                                    "options": [
                                                                        { "label": "布局", "value": "1" },
                                                                        { "label": "组件", "value": "2" }
                                                                    ],
                                                                    "defaultValue": "1",
                                                                    "labelName": "label",
                                                                    "valueName": "value"
                                                                }
                                                            },
                                                            {
                                                                id: 'ctl_state',
                                                                "hidden": true,
                                                                "title": "是否启用",
                                                                "titleConfig": {
                                                                    required: false
                                                                },
                                                                "field": "STATE",
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
                                                                    "field": 'STATE',
                                                                },
                                                                "editor": {
                                                                    "type": "select",
                                                                    "field": "STATE",
                                                                    "placeholder": "请输入",
                                                                    "options": [
                                                                        { "label": "启用", "value": 1 },
                                                                        { "label": "禁用", "value": 2 }
                                                                    ],
                                                                    "defaultValue": 1,
                                                                    "labelName": "label",
                                                                    "valueName": "value"
                                                                }
                                                            },
                                                        ],
                                                        "formControlsPermissions": [
                                                            {
                                                                formState: "new",
                                                                formStateContent: {
                                                                    isLoad: false,
                                                                    loadAjax: {},
                                                                    isDefault: true
                                                                },
                                                                Controls: [
                                                                    { id: 'ctl_name', state: "edit", hidden: false, readOnly: false },
                                                                    { id: 'ctl_code', state: "edit", hidden: true, readOnly: false },
                                                                    { id: 'ctl_type', state: "edit", hidden: true, readOnly: false },
                                                                    { id: 'ctl_version', state: "edit", hidden: true, readOnly: false },
                                                                    { id: 'ctl_sort', state: "edit", hidden: true, readOnly: false },
                                                                    { id: 'ctl_state', state: "edit", hidden: true, readOnly: false }

                                                                ]
                                                            },
                                                            {
                                                                formState: "edit",
                                                                Controls: [
                                                                    { id: 'ctl_name', state: "edit", hidden: false, readOnly: false },
                                                                    { id: 'ctl_code', state: "edit", hidden: true, readOnly: false },
                                                                    { id: 'ctl_type', state: "edit", hidden: true, readOnly: false },
                                                                    { id: 'ctl_version', state: "edit", hidden: true, readOnly: false },
                                                                    { id: 'ctl_sort', state: "edit", hidden: true, readOnly: false },
                                                                    { id: 'ctl_state', state: "edit", hidden: true, readOnly: false }
                                                                ]
                                                            },
                                                            {
                                                                formState: "text",
                                                                Controls: [
                                                                    { id: 'ctl_name', state: "text", hidden: false, readOnly: false },
                                                                    { id: 'ctl_code', state: "text", hidden: true, readOnly: false },
                                                                    { id: 'ctl_type', state: "text", hidden: true, readOnly: false },
                                                                    { id: 'ctl_version', state: "text", hidden: true, readOnly: false },
                                                                    { id: 'ctl_sort', state: "text", hidden: true, readOnly: false },
                                                                    { id: 'ctl_state', state: "text", hidden: true, readOnly: false }
                                                                ]
                                                            }

                                                        ],
                                                        "ajaxConfig": [
                                                            {
                                                                "id": "loadform",
                                                                "url": "resource/SMT_BASE_COMPONENT/query",
                                                                "urlType": "inner",
                                                                "ajaxType": "get",
                                                                "params": [
                                                                    {
                                                                        "name": "ID",
                                                                        "type": "initValue",
                                                                        "valueName": "_SID"
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
                                            id: "3vlDRq",
                                            type: "row"
                                        }
                                    ],
                                },
                                {
                                    "id": "step_3",
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
                                                                "id": "form_add_province",
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
                                                                    }
                                                                ],
                                                                "outputParameters": [

                                                                ],
                                                                "result": [

                                                                ]
                                                            },
                                                            {
                                                                "id": "form_edit_province",
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
                                                                        "text": "刷新3",
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
                                                                                "dialogId": "edit_province_form",
                                                                                "ajaxId": "form_add_province",
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
                                                                                "dialogId": "edit_province_form",
                                                                                "ajaxId": "form_edit_province",
                                                                                "changeValueId": "edit_form_changeValue"
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
                                                                                "conditionId": ""
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
                                                }
                                            ],
                                            id: "3vlDRq",
                                            type: "row"
                                        }
                                    ],
                                }
                            ],
                            "cascade": {
                                "messageSender": [
                                    // {
                                    //     "id": "toolbar_01",
                                    //     "senderId": "view_01",
                                    //     "triggerType": "OPERATION",
                                    //     "trigger": "EXECUTE_CHECKED_ROWS",
                                    //     "triggerMoment": "after",
                                    //     "sendData": [
                                    //         {
                                    //             "beforeSend": {},
                                    //             "reveicerId": "",
                                    //             "receiverTriggerType": "BEHAVIOR",
                                    //             "receiverTrigger": "REFRESH_AS_CHILD",
                                    //             "params": [
                                    //                 {
                                    //                     "name": "parent_id",
                                    //                     "type": "item",
                                    //                     "valueName": "id"
                                    //                 },
                                    //                 {
                                    //                     "name": "parent_name",
                                    //                     "type": "item",
                                    //                     "valueName": "name"
                                    //                 }
                                    //             ]
                                    //         }
                                    //     ]
                                    // }
                                ],
                                "messageReceiver": [
                                    // {
                                    //     "id": "s_001",
                                    //     "senderId": "view_01",
                                    //     "receiveData": [
                                    //         {
                                    //             "triggerType": "STATE",
                                    //             "trigger": "STATE_TO_TEXT"
                                    //         }
                                    //     ]
                                    // },
                                    // {
                                    //     "id": "s_002",
                                    //     "senderId": "view_01",
                                    //     "receiveData": [
                                    //         {
                                    //             "triggerType": "STATE",
                                    //             "trigger": "STATE_TO_EDIT"
                                    //         }
                                    //     ]
                                    // }

                                ]
                            },
                            "loadingConfig": {
                                "id": "loadingData",
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
                            "ajaxConfig": [
                                {
                                    "id": "loadingData",
                                    "url": "resource/COMPONENT_TREE_BASE_DATA/query",
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
                                    ]
                                },
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
                                    "id": "form_add_province",
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
                                        }
                                    ],
                                    "outputParameters": [

                                    ],
                                    "result": [

                                    ]
                                },
                                {
                                    "id": "form_edit_province",
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
                        }
                    },
                    {
                        "id": "r5zDHB2-1",
                        "col": "cc",
                        "type": "col",
                        "title": "自定义步骤条",
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
                            "id": "steps_001",
                            "component": "cnSteps",
                            "size": "middle",
                            "direction": "vertical",
                            "loadingOnInit": true,
                            "mode": "custom",
                            "innerParams": [
                                {
                                    "name": "_SID",
                                    "valueName": "ID",
                                    "valueTo": "initValue"
                                }
                            ],
                            "dataMapping": [
                                {
                                    "name": "title",
                                    "field": "NAME"
                                },
                                {
                                    "name": "subTitle",
                                    "field": "CODE"
                                },
                                {
                                    "name": "desc",
                                    "field": "TYPE"
                                }
                            ],
                            "stepMapping": [
                                {
                                    "field": "TYPE",
                                    "value": "component",
                                    "targetId": "step_1"
                                },
                                {
                                    "field": "TYPE",
                                    "value": "layout",
                                    "targetId": "step_2"
                                }
                            ],
                            "stepStatusMapping": {
                                "process": [
                                    {
                                        "field": "TYPE",
                                        "value": "component"
                                    }
                                ],
                                "await": [
                                    {
                                        "field": "TYPE",
                                        "value": "layout"
                                    }
                                ],
                                // "finish": [
                                //     {
                                //         "field": "TYPE",
                                //         "value": ""
                                //     }
                                // ]
                            },
                            "stepViews": [
                                {
                                    "id": "step_1",
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
                                                                "id": "form_add_province",
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
                                                                    }
                                                                ],
                                                                "outputParameters": [

                                                                ],
                                                                "result": [

                                                                ]
                                                            },
                                                            {
                                                                "id": "form_edit_province",
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
                                                                        "text": "刷新1",
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
                                                                        "text": "新增1",
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
                                                                                "dialogId": "edit_province_form",
                                                                                "ajaxId": "form_add_province",
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
                                                                                "dialogId": "edit_province_form",
                                                                                "ajaxId": "form_edit_province",
                                                                                "changeValueId": "edit_form_changeValue"
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
                                                                                "conditionId": ""
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
                                                }
                                            ],
                                            id: "3vlDRq",
                                            type: "row"
                                        }
                                    ],
                                },
                                {
                                    "id": "step_2",
                                    "type": "layout",
                                    "title": "布局4K0naM",
                                    "container": "rows",
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
                                                        "id": "view_form_edit_component",
                                                        "type": "form",
                                                        "component": "form",
                                                        "state": 'text',
                                                        "loadingConfig": {
                                                            "id": "loadform"
                                                        },
                                                        "cascade": {
                                                            "messageSender": [
                                                                {
                                                                    "id": "afterComponentFormUpdateSuccess",
                                                                    "senderId": "view_form_edit_component",
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
                                                        "formLayout": {
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
                                                                            "title": "列iHspYn", "span": 12,
                                                                            "layoutContain": "input",
                                                                            "size": {
                                                                                "nzXs": 24, "nzSm": 24, "nzMd": 12, "nzLg": 12, "ngXl": 12, "nzXXl": 12
                                                                            },
                                                                            "control": {
                                                                                "id": "ctl_name"  // id 和引用id 值相同
                                                                            }
                                                                        },
                                                                        {
                                                                            "id": "ioj0mV1", "col": "cc", "type": "col", "title": "列ioj0mV", "span": 12, "layoutContain": "select",
                                                                            "size": {
                                                                                "nzXs": 24, "nzSm": 24, "nzMd": 12, "nzLg": 12, "ngXl": 12, "nzXXl": 12
                                                                            },
                                                                            "control": { "id": "ctl_code" }
                                                                        },
                                                                        {
                                                                            "id": "ioj0mV2", "col": "cc", "type": "col", "title": "列ioj0mV", "span": 12, "layoutContain": "select",
                                                                            "size": {
                                                                                "nzXs": 24, "nzSm": 24, "nzMd": 12, "nzLg": 12, "ngXl": 12, "nzXXl": 12
                                                                            },
                                                                            "control": { "id": "ctl_type" }
                                                                        },
                                                                        {
                                                                            "id": "ioj0mV3", "col": "cc", "type": "col", "title": "列ioj0mV", "span": 12, "layoutContain": "select",
                                                                            "size": {
                                                                                "nzXs": 24, "nzSm": 24, "nzMd": 12, "nzLg": 12, "ngXl": 12, "nzXXl": 12
                                                                            },
                                                                            "control": { "id": "ctl_version" }
                                                                        },
                                                                        {
                                                                            "id": "ioj0mV4", "col": "cc", "type": "col", "title": "列ioj0mV", "span": 12, "layoutContain": "select",
                                                                            "size": {
                                                                                "nzXs": 24, "nzSm": 24, "nzMd": 12, "nzLg": 12, "ngXl": 12, "nzXXl": 12
                                                                            },
                                                                            "control": { "id": "ctl_sort" }
                                                                        },
                                                                        {
                                                                            "id": "ioj0mV5", "col": "cc", "type": "col", "title": "列ioj0mV", "span": 12, "layoutContain": "select",
                                                                            "size": {
                                                                                "nzXs": 24, "nzSm": 24, "nzMd": 12, "nzLg": 12, "ngXl": 12, "nzXXl": 12
                                                                            },
                                                                            "control": { "id": "ctl_state" }
                                                                        }
                                                                    ]
                                                                }]
                                                        },
                                                        "formControls": [
                                                            {
                                                                id: 'ctl_id',
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
                                                                id: 'ctl_name',
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
                                                                id: 'ctl_code',
                                                                "hidden": true,
                                                                "title": "组件编码",
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
                                                            {
                                                                id: 'ctl_version',
                                                                "hidden": true,
                                                                "title": "版本",
                                                                "titleConfig": {
                                                                    required: false
                                                                },
                                                                "field": "VERSION",
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
                                                                    "field": 'VERSION',
                                                                },
                                                                "editor": {
                                                                    "type": "select",
                                                                    "field": "VERSION",
                                                                    "placeholder": "请输入",
                                                                    "options": [
                                                                        { "label": 'v1.0', "value": "v1.0" },
                                                                        { "label": 'v2.0', "value": "v2.0" }
                                                                    ],
                                                                    "defaultValue": "v2.0",
                                                                    "labelName": "label",
                                                                    "valueName": "value"
                                                                }
                                                            },
                                                            {
                                                                id: 'ctl_sort',
                                                                "hidden": true,
                                                                "title": "排序",
                                                                "titleConfig": {
                                                                    required: false
                                                                },
                                                                "field": "SORT",
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
                                                                    "field": 'SORT',
                                                                },
                                                                "editor": {
                                                                    "type": "input",
                                                                    "field": "SORT",
                                                                    "placeholder": "请输入"
                                                                }
                                                            },
                                                            {
                                                                id: 'ctl_type',
                                                                "hidden": true,
                                                                "title": "组件类型",
                                                                "titleConfig": {
                                                                    required: false
                                                                },
                                                                "field": "TYPE",
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
                                                                    "field": 'TYPE',
                                                                },
                                                                "editor": {
                                                                    "type": "select",
                                                                    "field": "TYPE",
                                                                    "placeholder": "请输入",
                                                                    "options": [
                                                                        { "label": "布局", "value": "1" },
                                                                        { "label": "组件", "value": "2" }
                                                                    ],
                                                                    "defaultValue": "1",
                                                                    "labelName": "label",
                                                                    "valueName": "value"
                                                                }
                                                            },
                                                            {
                                                                id: 'ctl_state',
                                                                "hidden": true,
                                                                "title": "是否启用",
                                                                "titleConfig": {
                                                                    required: false
                                                                },
                                                                "field": "STATE",
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
                                                                    "field": 'STATE',
                                                                },
                                                                "editor": {
                                                                    "type": "select",
                                                                    "field": "STATE",
                                                                    "placeholder": "请输入",
                                                                    "options": [
                                                                        { "label": "启用", "value": 1 },
                                                                        { "label": "禁用", "value": 2 }
                                                                    ],
                                                                    "defaultValue": 1,
                                                                    "labelName": "label",
                                                                    "valueName": "value"
                                                                }
                                                            },
                                                        ],
                                                        "formControlsPermissions": [
                                                            {
                                                                formState: "new",
                                                                formStateContent: {
                                                                    isLoad: false,
                                                                    loadAjax: {},
                                                                    isDefault: true
                                                                },
                                                                Controls: [
                                                                    { id: 'ctl_name', state: "edit", hidden: false, readOnly: false },
                                                                    { id: 'ctl_code', state: "edit", hidden: true, readOnly: false },
                                                                    { id: 'ctl_type', state: "edit", hidden: true, readOnly: false },
                                                                    { id: 'ctl_version', state: "edit", hidden: true, readOnly: false },
                                                                    { id: 'ctl_sort', state: "edit", hidden: true, readOnly: false },
                                                                    { id: 'ctl_state', state: "edit", hidden: true, readOnly: false }

                                                                ]
                                                            },
                                                            {
                                                                formState: "edit",
                                                                Controls: [
                                                                    { id: 'ctl_name', state: "edit", hidden: false, readOnly: false },
                                                                    { id: 'ctl_code', state: "edit", hidden: true, readOnly: false },
                                                                    { id: 'ctl_type', state: "edit", hidden: true, readOnly: false },
                                                                    { id: 'ctl_version', state: "edit", hidden: true, readOnly: false },
                                                                    { id: 'ctl_sort', state: "edit", hidden: true, readOnly: false },
                                                                    { id: 'ctl_state', state: "edit", hidden: true, readOnly: false }
                                                                ]
                                                            },
                                                            {
                                                                formState: "text",
                                                                Controls: [
                                                                    { id: 'ctl_name', state: "text", hidden: false, readOnly: false },
                                                                    { id: 'ctl_code', state: "text", hidden: true, readOnly: false },
                                                                    { id: 'ctl_type', state: "text", hidden: true, readOnly: false },
                                                                    { id: 'ctl_version', state: "text", hidden: true, readOnly: false },
                                                                    { id: 'ctl_sort', state: "text", hidden: true, readOnly: false },
                                                                    { id: 'ctl_state', state: "text", hidden: true, readOnly: false }
                                                                ]
                                                            }

                                                        ],
                                                        "ajaxConfig": [
                                                            {
                                                                "id": "loadform",
                                                                "url": "resource/SMT_BASE_COMPONENT/query",
                                                                "urlType": "inner",
                                                                "ajaxType": "get",
                                                                "params": [
                                                                    {
                                                                        "name": "ID",
                                                                        "type": "initValue",
                                                                        "valueName": "_SID"
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
                                            id: "3vlDRq",
                                            type: "row"
                                        }
                                    ],
                                },
                                {
                                    "id": "step_3",
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
                                                                "id": "form_add_province",
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
                                                                    }
                                                                ],
                                                                "outputParameters": [

                                                                ],
                                                                "result": [

                                                                ]
                                                            },
                                                            {
                                                                "id": "form_edit_province",
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
                                                                        "text": "刷新3",
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
                                                                                "dialogId": "edit_province_form",
                                                                                "ajaxId": "form_add_province",
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
                                                                                "dialogId": "edit_province_form",
                                                                                "ajaxId": "form_edit_province",
                                                                                "changeValueId": "edit_form_changeValue"
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
                                                                                "conditionId": ""
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
                                                }
                                            ],
                                            id: "3vlDRq",
                                            type: "row"
                                        }
                                    ],
                                }
                            ],
                            "cascade": {
                                "messageSender": [
                                    // {
                                    //     "id": "toolbar_01",
                                    //     "senderId": "view_01",
                                    //     "triggerType": "OPERATION",
                                    //     "trigger": "EXECUTE_CHECKED_ROWS",
                                    //     "triggerMoment": "after",
                                    //     "sendData": [
                                    //         {
                                    //             "beforeSend": {},
                                    //             "reveicerId": "",
                                    //             "receiverTriggerType": "BEHAVIOR",
                                    //             "receiverTrigger": "REFRESH_AS_CHILD",
                                    //             "params": [
                                    //                 {
                                    //                     "name": "parent_id",
                                    //                     "type": "item",
                                    //                     "valueName": "id"
                                    //                 },
                                    //                 {
                                    //                     "name": "parent_name",
                                    //                     "type": "item",
                                    //                     "valueName": "name"
                                    //                 }
                                    //             ]
                                    //         }
                                    //     ]
                                    // }
                                ],
                                "messageReceiver": [
                                    // {
                                    //     "id": "s_001",
                                    //     "senderId": "view_01",
                                    //     "receiveData": [
                                    //         {
                                    //             "triggerType": "STATE",
                                    //             "trigger": "STATE_TO_TEXT"
                                    //         }
                                    //     ]
                                    // },
                                    // {
                                    //     "id": "s_002",
                                    //     "senderId": "view_01",
                                    //     "receiveData": [
                                    //         {
                                    //             "triggerType": "STATE",
                                    //             "trigger": "STATE_TO_EDIT"
                                    //         }
                                    //     ]
                                    // }

                                ]
                            },
                            "loadingConfig": {
                                "id": "loadingData",
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
                            "ajaxConfig": [
                                {
                                    "id": "loadingData",
                                    "url": "resource/COMPONENT_TREE_BASE_DATA/query",
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
                                    ]
                                },
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
                                    "id": "form_add_province",
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
                                        }
                                    ],
                                    "outputParameters": [

                                    ],
                                    "result": [

                                    ]
                                },
                                {
                                    "id": "form_edit_province",
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
                        }
                    }
                ],
                id: "3vlDRq",
                type: "row"
            }
        ]
    };

    constructor(
        @Inject(BSN_COMPONENT_SERVICES) private _componentServices: ComponentServiceProvider,
    ) {
        super(_componentServices);
    }

    ngOnInit() {

    }
}