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
                                    }
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

                            ]
                        }
                    }
                ],
                "id": "row_2",
                "type": "row",
            },
            {
                "cols": [

                ],
                "id": "row_3",
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

    public config2 = {
        "id": "demo",
        "type": "layout",
        "title": "",
        "container": "rows",
        "rows": [
            {
                "cols": [
                    {
                        "id": "row_1_col_1",
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
                            "title": "",
                            "titleIcon": "right-circle",
                            "component": "cnStaticTable",
                            "keyId": "ID",
                            "size": "small",
                            "isBordered": false,
                            "isFrontPagination": false,
                            "isPagination": true,
                            "isShowSizeChanger": true,
                            "showTotal": true,
                            "pageSize": 5,
                            "showCheckBox": false,
                            "pageSizeOptions": [10, 20, 50, 100],
                            "loadingOnInit": false,
                            "loadingConfig": {
                                "url": "td/SMT_BASE_INNER_PROPERTY/query",
                                "method": "get",
                                "params": [
                                    {
                                        "name": "CMPT_ID",
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
                                    "isShowExpand": false,
                                    "width": "50px",
                                    "style": {}
                                },
                                {
                                    "title": "序号",
                                    "type": "index",
                                    "field": "_index",
                                    "hidden": false,
                                    "showFilter": false,
                                    "showSort": false,
                                    "isShowExpand": false,
                                    "width": "75px",
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
                                    },
                                    "summary": {
                                        "label": "总计:",
                                        "type": "sum",
                                        "name": "pSum"
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
                                    },
                                    "summary": {
                                        "label": "平均值:",
                                        "type": "avg",
                                        "name": "pcy",
                                        "fixed": 4
                                    }
                                },
                                {
                                    "title": "操作",
                                    "type": "action",
                                    "actionIds": [
                                        "grid_new_cancel",
                                        "grid_edit",
                                        "grid_cancel"
                                    ]
                                }
                            ],
                            "cascade": {
                                "messageSender": [
                                    // {
                                    //     "id": "grid_sender_02",
                                    //     "senderId": "view_02",
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
                                    //                     "name": "_ID",
                                    //                     "type": "item",
                                    //                     "valueName": "ID"
                                    //                 }
                                    //             ]
                                    //         }
                                    //     ]
                                    // },
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
                                                        "value": "view_tree_component_base",
                                                        "type": "value"
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        "id": "afterComponentSaveSuccess",
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
                                        "id": "afterComponentFormUpdateSuccess",
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
                                    // {
                                    //     "id": "",
                                    //     "senderId": "view_tree_component_base",
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
                                    // {
                                    //     "id": "",
                                    //     "senderId": "view_02",
                                    //     "receiveData": [
                                    //         {
                                    //             "beforeReceive": [],
                                    //             "triggerType": "ACTION",
                                    //             "trigger": "MESSAGE"
                                    //         },
                                    //         {
                                    //             "beforeReceive": [],
                                    //             "triggerType": "ACTION",
                                    //             "trigger": "APPEND_CHILD_TO_SELECTED_NODE"
                                    //         },
                                    //         {
                                    //             "beforeReceive": [],
                                    //             "triggerType": "ACTION",
                                    //             "trigger": "CHANGE_EDITED_ROWS_TO_TEXT"
                                    //         },
                                    //         {
                                    //             "beforeReceive": [],
                                    //             "triggerType": "ACTION",
                                    //             "trigger": "SHOW_INVALIDATE_ADDED_ROWS"
                                    //         },
                                    //         {
                                    //             "beforeReceive": [],
                                    //             "triggerType": "ACTION",
                                    //             "trigger": "SHOW_INVALIDATE_EDITED_ROWS"
                                    //         },
                                    //         {
                                    //             "beforeReceive": [],
                                    //             "triggerType": "ACTION",
                                    //             "trigger": "LOAD_REFRESH_DATA"
                                    //         }
                                    //     ]
                                    // }
                                ]
                            },
                            "rowActions": [
                                {
                                    "id": "grid_new_cancel",
                                    "state": "new",
                                    "text": "取消",
                                    "icon": "close",
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
                                                "name": "edit",
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
                                    "hidden": true,
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
                                                "value": false
                                            },
                                            {
                                                "name": "new",
                                                "value": true
                                            }
                                        ]
                                    }
                                },
                                {
                                    "id": "grid_cancel",
                                    "state": "edit",
                                    "text": "删除",
                                    "icon": "close",
                                    "color": "text-primary",
                                    "type": "link",
                                    "size": "small",
                                    "hidden": false,
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
                                                "name": "new",
                                                "value": true
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
                        },
                    }
                ],
                "id": "row_1",
                "type": "row",
            },
            {
                "cols": [

                ],
                "id": "row_3",
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
    // public config1 = {
    //     "id": "4K0naM",
    //     "type": "layout",
    //     "title": "布局4K0naM",
    //     "container": "rows",
    //     "rows": [
    //         {
    //             "cols": [
    //                 {
    //                     "id": "r5zDHB2-1",
    //                     "col": "cc",
    //                     "type": "col",
    //                     "title": "",
    //                     "span": 24,
    //                     "container": "component",
    //                     "size": {
    //                         "nzXs": 24,
    //                         "nzSm": 24,
    //                         "nzMd": 24,
    //                         "nzLg": 24,
    //                         "nzXl": 24,
    //                         "nzXXl": 24
    //                     },
    //                     "component": {
    //                         "id": "toolbar_001",
    //                         "component": "cnToolbar",
    //                         "size": "small",
    //                         "cascade": {
    //                             "messageSender": [
    //                                 {
    //                                     "id": "toolbar_01",
    //                                     "senderId": "view_01",
    //                                     "triggerType": "OPERATION",
    //                                     "trigger": "EXECUTE_CHECKED_ROWS",
    //                                     "triggerMoment": "after",
    //                                     "sendData": [
    //                                         {
    //                                             "beforeSend": {},
    //                                             "reveicerId": "",
    //                                             "receiverTriggerType": "BEHAVIOR",
    //                                             "receiverTrigger": "REFRESH_AS_CHILD",
    //                                             "params": [
    //                                                 {
    //                                                     "name": "parent_id",
    //                                                     "type": "item",
    //                                                     "valueName": "id"
    //                                                 },
    //                                                 {
    //                                                     "name": "parent_name",
    //                                                     "type": "item",
    //                                                     "valueName": "name"
    //                                                 }
    //                                             ]
    //                                         }
    //                                     ]
    //                                 }
    //                             ],
    //                             "messageReceiver": [
    //                                 {
    //                                     "id": "s_001",
    //                                     "senderId": "view_01",
    //                                     "receiveData": [
    //                                         {
    //                                             "triggerType": "STATE",
    //                                             "trigger": "STATE_TO_TEXT"
    //                                         }
    //                                     ]
    //                                 },
    //                                 {
    //                                     "id": "s_002",
    //                                     "senderId": "view_01",
    //                                     "receiveData": [
    //                                         {
    //                                             "triggerType": "STATE",
    //                                             "trigger": "STATE_TO_EDIT"
    //                                         }
    //                                     ]
    //                                 },
    //                                 {
    //                                     "id": "s_003",
    //                                     "senderId": "view_01",
    //                                     "receiveData": [
    //                                         {
    //                                             "triggerType": "ACTION",
    //                                             "trigger": "SET_OPERATION_DATA",
    //                                             "params": [
    //                                                 {
    //                                                     "pname": "_CHECKED_ROW",
    //                                                     "cname": "_CHECKED_ROW",
    //                                                     "valueTo": "tempValue"
    //                                                 }
    //                                             ]
    //                                         }
    //                                     ]
    //                                 }
    //                             ]
    //                         },
    //                         "changeValue": [
    //                             {
    //                                 "id": "edit_form_changeValue",
    //                                 "params": [
    //                                     {
    //                                         "name": "ID",
    //                                         "type": "item",
    //                                         "valueName": "ID",
    //                                         "valueTo": "tempValue"
    //                                     }
    //                                 ]
    //                             }
    //                         ],
    //                         "dialog": [
    //                             {
    //                                 "id": "edit_province_form",
    //                                 "type": "confirm",
    //                                 "title": "数据编辑",
    //                                 "cancelText": "取消",
    //                                 "okText": "提交",
    //                                 "form": {
    //                                     "id": "form_01",
    //                                     "type": "form",
    //                                     "component": "form",
    //                                     state: 'text',
    //                                     loadingConfig: {
    //                                         id: "loadform" // 将加载配置引用
    //                                     },
    //                                     formLayout: {
    //                                         "id": "b86s2i",
    //                                         "type": "layout",
    //                                         "title": "表单布局b86s2i",
    //                                         "rows": [
    //                                             {
    //                                                 "id": "MefhXa",
    //                                                 "type": "row",
    //                                                 // 行列，是否 显示。
    //                                                 "cols": [
    //                                                     {
    //                                                         "id": "iHspYn", "col": "cc", "type": "col",
    //                                                         "title": "列iHspYn", "span": 24,
    //                                                         "layoutContain": "input",
    //                                                         "size": {
    //                                                             "nzXs": 24, "nzSm": 24, "nzMd": 24, "nzLg": 24, "ngXl": 24, "nzXXl": 24
    //                                                         },
    //                                                         "control": {
    //                                                             "id": "001"  // id 和引用id 值相同
    //                                                         }
    //                                                     },
    //                                                     {
    //                                                         "id": "ioj0mV", "col": "cc", "type": "col", "title": "列ioj0mV", "span": 24, "layoutContain": "select",
    //                                                         "size": {
    //                                                             "nzXs": 24, "nzSm": 24, "nzMd": 24, "nzLg": 24, "ngXl": 24, "nzXXl": 24
    //                                                         },
    //                                                         "control": { "id": "002" }
    //                                                     },
    //                                                     {
    //                                                         "id": "ioj0mV", "col": "cc", "type": "col", "title": "列ioj0mV", "span": 24, "layoutContain": "select",
    //                                                         "size": {
    //                                                             "nzXs": 24, "nzSm": 24, "nzMd": 24, "nzLg": 24, "ngXl": 24, "nzXXl": 24
    //                                                         },
    //                                                         "control": { "id": "003" }
    //                                                     },
    //                                                     {
    //                                                         "id": "ioj0mV", "col": "cc", "type": "col", "title": "列ioj0mV", "span": 24, "layoutContain": "select",
    //                                                         "size": {
    //                                                             "nzXs": 24, "nzSm": 24, "nzMd": 24, "nzLg": 24, "nzXl": 24, "nzXXl": 24
    //                                                         },
    //                                                         "control": { "id": "004" }
    //                                                     }
    //                                                 ]
    //                                             }]
    //                                     },
    //                                     formControls: [
    //                                         {
    //                                             id: '001',
    //                                             "hidden": true, // 字段是否隐藏
    //                                             "title": '省名称',  // lable 信息
    //                                             "titleConfig": {
    //                                                 required: true
    //                                             },
    //                                             "field": "PROVINCE_NAME",  // fromcontrol name  默认的字段
    //                                             "labelSize": {
    //                                                 "span": 6,
    //                                                 "nzXs": { span: 6 },
    //                                                 "nzSm": { span: 6 },
    //                                                 "nzMd": { span: 6 },
    //                                                 "nzLg": { span: 6 },
    //                                                 "ngXl": { span: 6 },
    //                                                 "nzXXl": { span: 6 }
    //                                             },  // 
    //                                             "controlSize": {
    //                                                 "span": 18,
    //                                                 "nzXs": 18,
    //                                                 "nzSm": 18,
    //                                                 "nzMd": 18,
    //                                                 "nzLg": 18,
    //                                                 "ngXl": 18,
    //                                                 "nzXXl": 18
    //                                             },
    //                                             "state": "edit", // 当前组件默认状态 文本，编辑，或者由表单状态控制text、edit、form
    //                                             "text": { // 文本展示字段
    //                                                 "type": 'label', // 什么组件展示文本 
    //                                                 "field": 'PROVINCE_NAME',   // 字段
    //                                             },
    //                                             "editor": {            // 编辑状态字段  日后扩充可为数组，满足条件下的组件变化
    //                                                 "type": "input",
    //                                                 "field": "PROVINCE_NAME",  // 编辑字段于定义字段一致 （此处定义于表格相反）
    //                                                 "placeholder": "请输入",
    //                                                 "validations": [  // 校验
    //                                                     { validator: "required", type: "default", "message": "请输入省名称" }
    //                                                 ]
    //                                             }
    //                                         },
    //                                         {
    //                                             id: '002',
    //                                             "hidden": true, // 字段是否隐藏
    //                                             "title": '区号',  // lable 信息
    //                                             "titleConfig": {
    //                                                 required: false
    //                                             },
    //                                             "field": "AREA_CODE",  // fromcontrol name  默认的字段
    //                                             "labelSize": {
    //                                                 "span": 6,
    //                                                 "nzXs": 6, "nzSm": 6, "nzMd": 6, "nzLg": 6, "ngXl": 6, "nzXXl": 6
    //                                             },  // 
    //                                             "controlSize": {
    //                                                 "span": 18,
    //                                                 "nzXs": { span: 18, offset: 0 },
    //                                                 "nzSm": { span: 18, offset: 0 },
    //                                                 "nzMd": { span: 18, offset: 0 },
    //                                                 "nzLg": { span: 18, offset: 0 },
    //                                                 "ngXl": { span: 18, offset: 0 },
    //                                                 "nzXXl": { span: 18, offset: 0 }
    //                                             },
    //                                             "state": "edit", // 当前组件默认状态 文本，编辑，或者由表单状态控制 text、edit、form
    //                                             "text": { // 文本展示字段
    //                                                 "type": 'label', // 什么组件展示文本 
    //                                                 "field": 'AREA_CODE',   // 字段
    //                                             },
    //                                             "editor": {            // 编辑状态字段  日后扩充可为数组，满足条件下的组件变化
    //                                                 "type": "input",
    //                                                 "field": "AREA_CODE",  // 编辑字段于定义字段一致 （此处定义于表格相反）
    //                                                 "placeholder": "请输入",
    //                                                 "validations": [  // 校验

    //                                                 ]
    //                                             },
    //                                             "editor1": {            // 编辑状态字段  日后扩充可为数组，满足条件下的组件变化
    //                                                 "type": "select",
    //                                                 "field": "areaCode",  // 编辑字段于定义字段一致 （此处定义于表格相反）
    //                                                 "placeholder": "请输入",
    //                                                 options: [
    //                                                     { label: '是', value: '1' },
    //                                                     { label: '否', value: '0' }
    //                                                 ],
    //                                                 labelName: 'provinceName',
    //                                                 valueName: 'id',
    //                                                 loadingConfig: {
    //                                                     id: "loadformselect1" // 将加载配置引用
    //                                                 },
    //                                                 "validate": {  // 校验
    //                                                     validator: "required", type: "default", "message": "请输入区号"
    //                                                 }
    //                                             }
    //                                         },
    //                                         {
    //                                             id: '003',
    //                                             "hidden": true, // 字段是否隐藏
    //                                             "title": '是否直辖市',  // lable 信息
    //                                             "titleConfig": {
    //                                                 required: false
    //                                             },
    //                                             "field": "DIRECTLY_UNDER",  // fromcontrol name  默认的字段
    //                                             "labelSize": {
    //                                                 "span": 6,
    //                                                 "nzXs": 6, "nzSm": 6, "nzMd": 6, "nzLg": 6, "nzXl": 6, "nzXXl": 6
    //                                             },  // 
    //                                             "controlSize": {
    //                                                 "span": 18,
    //                                                 "nzXs": { span: 18, offset: 0 },
    //                                                 "nzSm": { span: 18, offset: 0 },
    //                                                 "nzMd": { span: 18, offset: 0 },
    //                                                 "nzLg": { span: 18, offset: 0 },
    //                                                 "ngXl": { span: 18, offset: 0 },
    //                                                 "nzXXl": { span: 18, offset: 0 }
    //                                             },
    //                                             "state": "edit", // 当前组件默认状态 文本，编辑，或者由表单状态控制 text、edit、form
    //                                             "text": { // 文本展示字段
    //                                                 "type": 'label', // 什么组件展示文本 
    //                                                 "field": 'DIRECTLY_UNDER',   // 字段
    //                                             },
    //                                             "editor": {            // 编辑状态字段  日后扩充可为数组，满足条件下的组件变化
    //                                                 "type": "select",
    //                                                 "field": "DIRECTLY_UNDER",  // 编辑字段于定义字段一致 （此处定义于表格相反）
    //                                                 "placeholder": "请输入",
    //                                                 options: [
    //                                                     { label: '是', value: 1 },
    //                                                     { label: '否', value: 0 }
    //                                                 ],
    //                                                 "defaultValue": 0,
    //                                                 // labelName: 'cityName',
    //                                                 // valueName: 'id',
    //                                                 // loadingConfig: {
    //                                                 //     id: "loadformselect2" // 将加载配置引用
    //                                                 // },
    //                                                 "validate": {  // 校验

    //                                                 }
    //                                             }
    //                                         },
    //                                         {
    //                                             id: '004',
    //                                             "hidden": true, // 字段是否隐藏
    //                                             "title": '人口',  // lable 信息
    //                                             "titleConfig": {
    //                                                 required: true
    //                                             },
    //                                             "field": "POPULATION",  // fromcontrol name  默认的字段
    //                                             "labelSize": {
    //                                                 "span": 6,
    //                                                 "nzXs": 6, "nzSm": 6, "nzMd": 6, "nzLg": 6, "ngXl": 6, "nzXXl": 6
    //                                             },  // 
    //                                             "controlSize": {
    //                                                 "span": 18,
    //                                                 "nzXs": { span: 18, offset: 0 },
    //                                                 "nzSm": { span: 18, offset: 0 },
    //                                                 "nzMd": { span: 18, offset: 0 },
    //                                                 "nzLg": { span: 18, offset: 0 },
    //                                                 "nzXl": { span: 18, offset: 0 },
    //                                                 "nzXXl": { span: 18, offset: 0 }
    //                                             },
    //                                             "state": "edit", // 当前组件默认状态 文本，编辑，或者由表单状态控制 text、edit、form
    //                                             "text": { // 文本展示字段
    //                                                 "type": 'label', // 什么组件展示文本 
    //                                                 "field": 'POPULATION',   // 字段
    //                                             },
    //                                             "editor": {            // 编辑状态字段  日后扩充可为数组，满足条件下的组件变化
    //                                                 "type": "input",
    //                                                 "field": "POPULATION",  // 编辑字段于定义字段一致 （此处定义于表格相反）
    //                                                 "placeholder": "请输入",
    //                                                 "validations": [  // 校验
    //                                                     { validator: "required", type: "default", "message": "请输入人口数量" }
    //                                                 ]
    //                                             }
    //                                         }
    //                                     ],
    //                                     formControlsPermissions: [ // 初始表单字段，描述 新增、编辑、查看 状态下的文本
    //                                         {
    //                                             formState: "new", // 新增状态下的Controls 展示与否，是否读写属性设置
    //                                             formStateContent: { // 对当前状态的描述 ，描述当前状态下 表单组件 具备的行为，例如是否自加载，是否启用默认值
    //                                                 isLoad: false,
    //                                                 loadAjax: {}, // 如果启用load，是否用新的加载地址
    //                                                 isDefault: true
    //                                             },
    //                                             Controls: [
    //                                                 { id: '001', state: "edit", hidden: false, readOnly: false },
    //                                                 { id: '002', state: "edit", hidden: false, readOnly: false },
    //                                                 { id: '003', state: "edit", hidden: false, readOnly: false },
    //                                                 { id: '004', state: "edit", hidden: false, readOnly: false }
    //                                             ]
    //                                         },
    //                                         {
    //                                             formState: "edit",
    //                                             Controls: [
    //                                                 { id: '001', state: "edit", hidden: false, readOnly: false },
    //                                                 { id: '002', state: "edit", hidden: false, readOnly: false },
    //                                                 { id: '003', state: "edit", hidden: false, readOnly: false },
    //                                                 { id: '004', state: "edit", hidden: false, readOnly: false }
    //                                             ]
    //                                         },
    //                                         {
    //                                             formState: "text",
    //                                             Controls: [
    //                                                 { id: '001', state: "text", hidden: false, readOnly: false },
    //                                                 { id: '002', state: "text", hidden: false, readOnly: false },
    //                                                 { id: '003', state: "text", hidden: false, readOnly: false },
    //                                                 { id: '004', state: "text", hidden: false, readOnly: false }
    //                                             ]
    //                                         }

    //                                     ],
    //                                     ajaxConfig: [
    //                                         {
    //                                             "id": "loadform",
    //                                             "url": "resource/PROVINCE/query",
    //                                             "urlType": "inner",
    //                                             "ajaxType": "get",
    //                                             "params": [
    //                                                 {
    //                                                     "name": "ID",
    //                                                     "type": "tempValue",
    //                                                     "valueName": "ID"
    //                                                 },
    //                                                 {
    //                                                     "name": "_onlyOneObject",
    //                                                     "type": "value",
    //                                                     "value": true
    //                                                 }
    //                                             ],
    //                                             "outputParameters": [

    //                                             ],
    //                                             "result": [  // 描述 表单接收参数，将返回的哪些值赋给相应的组件属性

    //                                             ]
    //                                         },
    //                                         {
    //                                             "id": "loadformselect1",
    //                                             "url": "information/selectAllProvinceWithCity",
    //                                             "urlType": "inner",
    //                                             "ajaxType": "get",
    //                                             "params": [


    //                                             ],
    //                                             "outputParameters": [

    //                                             ],
    //                                             "result": [  // 描述 表单接收参数，将返回的哪些值赋给相应的组件属性

    //                                             ]
    //                                         },
    //                                         {
    //                                             "id": "loadformselect2_2",
    //                                             "url": "information/ssld",
    //                                             "urlType": "inner",
    //                                             "ajaxType": "get",
    //                                             "params": [

    //                                                 {
    //                                                     "name": "pId",
    //                                                     "type": "value",
    //                                                     "value": "1"
    //                                                 }
    //                                             ],
    //                                             "outputParameters": [

    //                                             ],
    //                                             "result": [  // 描述 表单接收参数，将返回的哪些值赋给相应的组件属性

    //                                             ]
    //                                         },
    //                                         {
    //                                             "id": "loadformselect2",
    //                                             "url": "information/selectCityByPid",
    //                                             "urlType": "inner",
    //                                             "ajaxType": "get",
    //                                             "params": [

    //                                                 {
    //                                                     "name": "pId",
    //                                                     "type": "cascadeValue",
    //                                                     "valueName": "PROVINCEID",
    //                                                     "value": "2"
    //                                                 }
    //                                             ],
    //                                             "outputParameters": [

    //                                             ],
    //                                             "result": [  // 描述 表单接收参数，将返回的哪些值赋给相应的组件属性

    //                                             ]
    //                                         }



    //                                     ],
    //                                     cascade: {
    //                                         "messageReceiver": [
    //                                             {
    //                                                 "id": "",
    //                                                 "senderId": "view_01",
    //                                                 "receiveData": [
    //                                                     {
    //                                                         "beforeReceive": [],
    //                                                         "triggerType": "BEHAVIOR",
    //                                                         "trigger": "REFRESH_AS_CHILD",
    //                                                         "params": [
    //                                                             {
    //                                                                 "pname": "_PID",
    //                                                                 "cname": "_PID",
    //                                                                 "valueTo": "tempValue"
    //                                                             }
    //                                                         ]
    //                                                     }
    //                                                 ]
    //                                             }
    //                                         ]
    //                                     },
    //                                     cascadeValue: [ // 值级联配置
    //                                         {
    //                                             "type": '值变化',
    //                                             "controlId": '002', //  大的control标识，级联内部
    //                                             "name": 'inputname2',
    //                                             "CascadeObjects": [
    //                                                 {
    //                                                     "controlId": '003',
    //                                                     "cascadeName": 'inputname3',
    //                                                     "cascadeItems": [  // 根据值执行
    //                                                         {
    //                                                             "type": 'default',  // conditions   default  满足条件执行或者默认都执行
    //                                                             "caseValue": {    // 条件描述 （触发级联的前置条件，如果不设置，则是满足）
    //                                                                 "type": 'selectObjectValue',
    //                                                                 "valueName": 'num',
    //                                                                 "regular": '^0$'
    //                                                             },
    //                                                             "content": {  // 应答体描述
    //                                                                 "type": 'ajax', // 应答类型（异步、消息、赋值、隐藏、显示...）
    //                                                                 "data": {
    //                                                                     "option": [
    //                                                                         { "name": 'PROVINCEID', "type": 'selectObjectValue', "value": '1', "valueName": 'id' }
    //                                                                     ]
    //                                                                 }
    //                                                             }
    //                                                         }

    //                                                     ]
    //                                                 }
    //                                             ]
    //                                         }
    //                                     ]
    //                                 }
    //                             }
    //                         ],
    //                         "condition": [
    //                             {
    //                                 "id": "add_cities_state",
    //                                 "state": [
    //                                     {
    //                                         "type": "component",
    //                                         "valueName": "ROWS_CHECKED",
    //                                         "expression": [
    //                                             {
    //                                                 "type": "property",
    //                                                 "name": "length",
    //                                                 "matchValue": 0,
    //                                                 "match": "gt"
    //                                             },
    //                                             {
    //                                                 "type": "element",
    //                                                 "name": "name",
    //                                                 "matchValue": "1",
    //                                                 "match": "eq",
    //                                             }
    //                                         ]
    //                                     }
    //                                 ]
    //                             },
    //                             {
    //                                 "id": "edit_cities_state",
    //                                 "state": [
    //                                     {
    //                                         "type": "component",
    //                                         "valueName": "ROWS_CHECKED",
    //                                         "expression": [
    //                                             {
    //                                                 "type": "property",
    //                                                 "name": "length",
    //                                                 "matchValue": 0,
    //                                                 "match": "gt"
    //                                             }
    //                                         ]
    //                                     }
    //                                 ]
    //                             },
    //                             {
    //                                 "id": "add_province_condition",
    //                                 "state": [
    //                                     {
    //                                         "type": "component",
    //                                         "valueName": "ROWS_CHECKED",
    //                                         "expression": [
    //                                             {
    //                                                 "type": "property",
    //                                                 "name": "length",
    //                                                 "matchValue": 0,
    //                                                 "match": "gt"
    //                                             }
    //                                         ]
    //                                     },
    //                                     {
    //                                         "type": "component",
    //                                         "valueName": "ROWS_ADDED",
    //                                         "expression": [
    //                                             {
    //                                                 "type": "property",
    //                                                 "name": "length",
    //                                                 "matchValue": 0,
    //                                                 "match": "gt"
    //                                             }
    //                                         ]
    //                                     }
    //                                 ]
    //                             },
    //                             {
    //                                 "id": "edit_province_condition",
    //                                 "state": [
    //                                     {
    //                                         "type": "component",
    //                                         "valueName": "ROWS_EDITED",
    //                                         "expression": [
    //                                             {
    //                                                 "type": "property",
    //                                                 "name": "length",
    //                                                 "matchValue": 0,
    //                                                 "match": "gt"
    //                                             }
    //                                         ]
    //                                     },
    //                                     {
    //                                         "type": "component",
    //                                         "valueName": "ROWS_CHECKED",
    //                                         "expression": [
    //                                             {
    //                                                 "type": "property",
    //                                                 "name": "length",
    //                                                 "matchValue": 0,
    //                                                 "match": "gt"
    //                                             }
    //                                         ]
    //                                     }
    //                                 ]
    //                             },
    //                             {
    //                                 "id": "cancel_edit_rows_2",
    //                                 "state": [
    //                                     {
    //                                         "type": "component",
    //                                         "valueName": "ROWS_EDITED",
    //                                         "expression": [
    //                                             {
    //                                                 "type": "property",
    //                                                 "name": "length",
    //                                                 "matchValue": 0,
    //                                                 "match": "gt"
    //                                             }
    //                                         ]
    //                                     }
    //                                 ]
    //                             },
    //                             {
    //                                 "id": "form_add_province_condition",
    //                                 "state": [
    //                                     {
    //                                         "type": "component",
    //                                         "valueName": "FORM_VALID",
    //                                         "expression": [
    //                                             {
    //                                                 "type": "property",
    //                                                 "name": "length",
    //                                                 "matchValue": 0,
    //                                                 "match": "gt"
    //                                             }
    //                                         ]
    //                                     }
    //                                 ]
    //                             }
    //                         ],
    //                         "ajaxConfig": [
    //                             {
    //                                 "id": "add_provinces_1",
    //                                 "url": "resource/PROVINCE/batchInsert",
    //                                 "urlType": "inner",
    //                                 "ajaxType": "post",
    //                                 "params": [
    //                                     {
    //                                         "name": "ID",
    //                                         "type": "GUID"
    //                                     },
    //                                     {
    //                                         "name": "PROVINCE_NAME",
    //                                         "type": "componentValue",
    //                                         "valueName": "PROVINCE_NAME",
    //                                         "dataType": "string"
    //                                     },
    //                                     {
    //                                         "name": "AREA_CODE",
    //                                         "type": "componentValue",
    //                                         "valueName": "AREA_CODE",
    //                                         "dataType": "string"
    //                                     },
    //                                     {
    //                                         "name": "DIRECTLY_UNDER",
    //                                         "type": "componentValue",
    //                                         "valueName": "DIRECTLY_UNDER",
    //                                         "dataType": "int"
    //                                     },
    //                                     {
    //                                         "name": "POPULATION",
    //                                         "type": "componentValue",
    //                                         "valueName": "POPULATION",
    //                                         "dataType": "int"
    //                                     }
    //                                 ],
    //                                 "outputParameters": [

    //                                 ],
    //                                 "result": [
    //                                     {
    //                                         "name": "data",
    //                                         "showMessageWithNext": 0,
    //                                         "message": "message.ajax.state.success",
    //                                         "senderId": "afterProvinceSaveSuccessfully"
    //                                     },
    //                                     {
    //                                         "name": "validation",
    //                                         "message": "message.ajax.state.success",
    //                                         "senderId": "afterProvinceSaveValidation"
    //                                     },
    //                                     {
    //                                         "name": "error",
    //                                         "senderId": "toolbar_02"
    //                                     }
    //                                 ]
    //                             },
    //                             {
    //                                 "id": "edit_save_1",
    //                                 "url": "resource/PROVINCE/batchUpdate",
    //                                 "urlType": "inner",
    //                                 "ajaxType": "put",
    //                                 "params": [
    //                                     {
    //                                         "name": "ID",
    //                                         "type": "componentValue",
    //                                         "valueName": "ID",
    //                                         "dataType": "string"
    //                                     },
    //                                     {
    //                                         "name": "PROVINCE_NAME",
    //                                         "type": "componentValue",
    //                                         "valueName": "PROVINCE_NAME",
    //                                         "dataType": "string"
    //                                     },
    //                                     {
    //                                         "name": "AREA_CODE",
    //                                         "type": "componentValue",
    //                                         "valueName": "AREA_CODE",
    //                                         "dataType": "string"
    //                                     },
    //                                     {
    //                                         "name": "DIRECTLY_UNDER",
    //                                         "type": "componentValue",
    //                                         "valueName": "DIRECTLY_UNDER",
    //                                         "dataType": "int"
    //                                     },
    //                                     {
    //                                         "name": "POPULATION",
    //                                         "type": "componentValue",
    //                                         "valueName": "POPULATION",
    //                                         "dataType": "int"
    //                                     }
    //                                 ],
    //                                 "outputParameters": [

    //                                 ],
    //                                 "result": [
    //                                     {
    //                                         "name": "data",
    //                                         "showMessageWithNext": 0,
    //                                         "message": "message.ajax.state.success",
    //                                         "senderId": "afterProvinceUpdateSuccessfully"
    //                                     },
    //                                     {
    //                                         "name": "validation",
    //                                         "message": "message.ajax.state.success",
    //                                         "senderId": "aftetProvinceUpdateValidation"
    //                                     },
    //                                     {
    //                                         "name": "error",
    //                                         "senderId": "toolbar_02"
    //                                     }
    //                                 ]
    //                             },
    //                             {
    //                                 "id": "form_add_province",
    //                                 "url": "resource/PROVINCE/insert",
    //                                 "urlType": "inner",
    //                                 "ajaxType": "post",
    //                                 "params": [
    //                                     {
    //                                         "name": "ID",
    //                                         "type": "GUID"
    //                                     },
    //                                     {
    //                                         "name": "PROVINCE_NAME",
    //                                         "type": "componentValue",
    //                                         "valueName": "PROVINCE_NAME",
    //                                         "dataType": "string"
    //                                     },
    //                                     {
    //                                         "name": "AREA_CODE",
    //                                         "type": "componentValue",
    //                                         "valueName": "AREA_CODE",
    //                                         "dataType": "string"
    //                                     },
    //                                     {
    //                                         "name": "DIRECTLY_UNDER",
    //                                         "type": "componentValue",
    //                                         "valueName": "DIRECTLY_UNDER",
    //                                         "dataType": "int"
    //                                     },
    //                                     {
    //                                         "name": "POPULATION",
    //                                         "type": "componentValue",
    //                                         "valueName": "POPULATION",
    //                                         "dataType": "int"
    //                                     }
    //                                     // {
    //                                     //     "name": "CREATE_DATE",
    //                                     //     "type": "componentValue",
    //                                     //     "valueName": "CREATE_DATE",
    //                                     //     "dataType": "string"
    //                                     // }
    //                                 ],
    //                                 "outputParameters": [

    //                                 ],
    //                                 "result": [
    //                                     {
    //                                         "name": "data",
    //                                         "showMessageWithNext": 0,
    //                                         "message": "message.ajax.state.success",
    //                                         "senderId": "afterProvinceFormSuccess"
    //                                     },
    //                                     {
    //                                         "name": "validation",
    //                                         "message": "message.ajax.state.validation",
    //                                         "senderId": "afterAddBusinessSubObjectValidation"
    //                                     },
    //                                     {
    //                                         "name": "error",
    //                                         "senderId": "toolbar_02"
    //                                     }
    //                                 ]
    //                             },
    //                             {
    //                                 "id": "form_edit_province",
    //                                 "url": "resource/PROVINCE/update",
    //                                 "urlType": "inner",
    //                                 "ajaxType": "put",
    //                                 "params": [
    //                                     {
    //                                         "name": "ID",
    //                                         "type": "tempValue",
    //                                         "valueName": "ID",
    //                                         "dataType": "string"
    //                                     },
    //                                     {
    //                                         "name": "PROVINCE_NAME",
    //                                         "type": "componentValue",
    //                                         "valueName": "PROVINCE_NAME",
    //                                         "dataType": "string"
    //                                     },
    //                                     {
    //                                         "name": "AREA_CODE",
    //                                         "type": "componentValue",
    //                                         "valueName": "AREA_CODE",
    //                                         "dataType": "string"
    //                                     },
    //                                     {
    //                                         "name": "DIRECTLY_UNDER",
    //                                         "type": "componentValue",
    //                                         "valueName": "DIRECTLY_UNDER",
    //                                         "dataType": "int"
    //                                     },
    //                                     {
    //                                         "name": "POPULATION",
    //                                         "type": "componentValue",
    //                                         "valueName": "POPULATION",
    //                                         "dataType": "int"
    //                                     },
    //                                 ],
    //                                 "outputParameters": [

    //                                 ],
    //                                 "result": [
    //                                     {
    //                                         "name": "data",
    //                                         "showMessageWithNext": 0,
    //                                         "message": "message.ajax.state.success",
    //                                         "senderId": "afterProvinceFormSuccess"
    //                                     },
    //                                     {
    //                                         "name": "validation",
    //                                         "message": "message.ajax.state.success",
    //                                         "senderId": "afterAddBusinessSubObjectValidation"
    //                                     },
    //                                     {
    //                                         "name": "error",
    //                                         "senderId": "toolbar_02"
    //                                     }
    //                                 ]
    //                             }
    //                         ],
    //                         "beforeTrigger": [],
    //                         "afterTrigger": [
    //                             {
    //                                 "id": "",
    //                                 "senderId": "view_01",
    //                                 "sendData": [
    //                                     {
    //                                         "beforeSend": [],
    //                                         "reveicerId": "",
    //                                         "receiverTriggerType": "BEHAVIOR",
    //                                         "receiverTrigger": "REFRESH_AS_CHILD",
    //                                         "params": [
    //                                             {
    //                                                 "name": "parent_id",
    //                                                 "type": "item",
    //                                                 "valueName": "id"
    //                                             },
    //                                             {
    //                                                 "name": "parent_name",
    //                                                 "type": "item",
    //                                                 "valueName": "name"
    //                                             }
    //                                         ]
    //                                     }
    //                                 ]
    //                             }
    //                         ],
    //                         "toolbar": [
    //                             {
    //                                 "targetViewId": "view_01",
    //                                 "group": [
    //                                     {
    //                                         "id": "M_refresh",
    //                                         "text": "刷新",
    //                                         "icon": "reload",
    //                                         "color": "primary",
    //                                         "hidden": false,
    //                                         "disabled": false,
    //                                         "execute": [
    //                                             {
    //                                                 "triggerType": "BEHAVIOR",
    //                                                 "trigger": "REFRESH"
    //                                             }
    //                                         ]
    //                                     },
    //                                     {
    //                                         "id": "M_addRow",
    //                                         "text": "新增",
    //                                         "icon": "plus",
    //                                         "color": "text-primary",
    //                                         "hidden": false,
    //                                         "disabled": false,
    //                                         "execute": [
    //                                             {
    //                                                 "triggerType": "STATE",
    //                                                 "trigger": "ADD_ROW",
    //                                                 // "conditionId": "add_state_1"
    //                                             }
    //                                         ]
    //                                     },
    //                                     {
    //                                         "id": "M_addRowForm",
    //                                         "text": "表单新增",
    //                                         "state": "new",
    //                                         "icon": "plus",
    //                                         "color": "text-primary",
    //                                         "hidden": false,
    //                                         "disabled": false,
    //                                         "execute": [
    //                                             {
    //                                                 "triggerType": "ACTION",
    //                                                 "trigger": "DIALOG",
    //                                                 // "conditionId": "add_state_1",
    //                                                 "dialogId": "edit_province_form",
    //                                                 "ajaxId": "form_add_province",
    //                                             }
    //                                         ]
    //                                     },
    //                                     {
    //                                         "id": "M_editRowForm",
    //                                         "text": "表单更新",
    //                                         "state": "edit",
    //                                         "icon": "edit",
    //                                         "color": "text-primary",
    //                                         "hidden": false,
    //                                         "disabled": false,
    //                                         "execute": [
    //                                             {
    //                                                 "triggerType": "ACTION",
    //                                                 "trigger": "DIALOG",
    //                                                 // "conditionId": "add_state_1"
    //                                                 "dialogId": "edit_province_form",
    //                                                 "ajaxId": "form_edit_province",
    //                                                 "changeValueId": "edit_form_changeValue"
    //                                             }
    //                                         ]
    //                                     },
    //                                     {
    //                                         "id": "M_updateRow",
    //                                         "text": "修改",
    //                                         "icon": "edit",
    //                                         "color": "text-success",
    //                                         "hidden": false,
    //                                         "disabled": false,
    //                                         "state": "text",
    //                                         "beforeExecute": [
    //                                             {
    //                                                 "type": "component",
    //                                                 "valueName": "_CHECKED_ROW",
    //                                                 "expression": [
    //                                                     {
    //                                                         "type": "property",
    //                                                         "name": "length",
    //                                                         "match": "gt",
    //                                                         "matchValue": 0
    //                                                     }
    //                                                 ]

    //                                             }
    //                                         ],
    //                                         "execute": [
    //                                             {
    //                                                 "triggerType": "STATE",
    //                                                 "trigger": "EDIT_ROWS",
    //                                                 "conditionId": "edit_cities_state"
    //                                             }
    //                                         ],
    //                                         "toggle": {
    //                                             "type": "state",
    //                                             "toggleProperty": "hidden",
    //                                             "values": [
    //                                                 {
    //                                                     "name": "edit",
    //                                                     "value": true
    //                                                 },
    //                                                 {
    //                                                     "name": "text",
    //                                                     "value": false
    //                                                 }
    //                                             ]
    //                                         }
    //                                     },
    //                                     {
    //                                         "id": "M_deleteRow",
    //                                         "text": "删除",
    //                                         "icon": "delete",
    //                                         "color": "text-red-light",
    //                                         "hidden": false,
    //                                         "disabled": false,
    //                                         "execute": [
    //                                             {
    //                                                 "triggerType": "OPERATION",
    //                                                 "trigger": "EXECUTE_CHECKED_ROWS_IDS",
    //                                                 // "conditionId": "delete_operation_1",
    //                                                 // "ajaxId": "delete_row_1"
    //                                             }
    //                                         ]
    //                                     },
    //                                     {
    //                                         "id": "M_saveRow",
    //                                         "text": "保存",
    //                                         "icon": "save",
    //                                         "color": "text-primary",
    //                                         "hidden": false,
    //                                         "disabled": false,
    //                                         "execute": [
    //                                             {
    //                                                 "triggerType": "OPERATION",
    //                                                 "trigger": "SAVE_ROWS",
    //                                                 "ajaxId": "add_provinces_1",
    //                                                 // "stateId": "add_save_1",
    //                                                 "conditionId": "add_province_condition"
    //                                             },
    //                                             {
    //                                                 "triggerType": "OPERATION",
    //                                                 "trigger": "SAVE_ROWS",
    //                                                 "ajaxId": "edit_save_1",
    //                                                 // "stateId": "edit_save_1",
    //                                                 "conditionId": "edit_province_condition"
    //                                             }
    //                                         ],
    //                                         // "toggle": {
    //                                         //     "type": "state",
    //                                         //     "toggleProperty": "hidden",
    //                                         //     "values": [
    //                                         //         {
    //                                         //             "name": "edit",
    //                                         //             "value": false
    //                                         //         },
    //                                         //         {
    //                                         //             "name": "text",
    //                                         //             "value": true
    //                                         //         },
    //                                         //         {
    //                                         //             "name": "new",
    //                                         //             "value": false
    //                                         //         }
    //                                         //     ]
    //                                         // }
    //                                     },
    //                                     {
    //                                         "id": "M_cancelrow",
    //                                         "text": "取消1",
    //                                         "state": "edit",
    //                                         "icon": "rollback",
    //                                         "color": "text-grey-darker",
    //                                         "hidden": true,
    //                                         "disabled": null,
    //                                         "execute": [
    //                                             {
    //                                                 "triggerType": "STATE",
    //                                                 "trigger": "CANCEL_EDIT_ROWS",
    //                                                 "conditionId": "cancel_edit_rows_2"
    //                                             },
    //                                             {
    //                                                 "triggerType": "STATE",
    //                                                 "trigger": "CANCEL_NEW_ROWS"
    //                                             }
    //                                         ],
    //                                         "toggle": {
    //                                             "type": "state",
    //                                             "toggleProperty": "hidden",
    //                                             "values": [
    //                                                 {
    //                                                     "name": "edit",
    //                                                     "value": false
    //                                                 },
    //                                                 {
    //                                                     "name": "text",
    //                                                     "value": true
    //                                                 },
    //                                                 {
    //                                                     "name": "new",
    //                                                     "value": false
    //                                                 }
    //                                             ]
    //                                         }
    //                                     }
    //                                 ]
    //                             },
    //                             {
    //                                 "targetViewId": "view_02",
    //                                 "group": [
    //                                     {
    //                                         "name": "M_addSearchRow",
    //                                         "text": "查询",
    //                                         "triggerType": "STATE",
    //                                         "trigger": "SEARCH_ROW",
    //                                         "actionName": "addSearchRow",
    //                                         "icon": "search",
    //                                         "color": "text-primary",
    //                                         "hidden": false,
    //                                         "disabled": false,
    //                                         "execute": [
    //                                             {
    //                                                 "triggerType": "STATE",
    //                                                 "trigger": "SEARCH_ROW"
    //                                             }
    //                                         ]
    //                                     },
    //                                     {
    //                                         "name": "M_cancelSearchRow",
    //                                         "text": "取消查询",
    //                                         "icon": "rollback",
    //                                         "triggerType": "STATE",
    //                                         "trigger": "CANCEL_SEARCH_ROW",
    //                                         "actionName": "cancelSearchRow",
    //                                         "color": "text-grey-darker",
    //                                         "hidden": false,
    //                                         "disabled": false,
    //                                         "execute": [
    //                                             {
    //                                                 "triggerType": "STATE",
    //                                                 "trigger": "SEARCH_ROW"
    //                                             }
    //                                         ],
    //                                     }
    //                                 ]
    //                             }
    //                         ]
    //                     }
    //                 },
    //                 {
    //                     "id": "r5zDHB",
    //                     "col": "cc",
    //                     "type": "col",
    //                     "title": "",
    //                     "span": 24,
    //                     "container": "component",
    //                     "size": {
    //                         "nzXs": 24,
    //                         "nzSm": 24,
    //                         "nzMd": 24,
    //                         "nzLg": 24,
    //                         "nzXl": 24,
    //                         "nzXXl": 24
    //                     },
    //                     "component": {
    //                         "id": "view_01",
    //                         "title": "主表",
    //                         "titleIcon": "right-circle",
    //                         "component": "cnDataTable",
    //                         "keyId": "ID",
    //                         "size": "middle",
    //                         "isBordered": true,
    //                         "isFrontPagination": false,
    //                         "isPagination": true,
    //                         "isShowSizeChanger": true,
    //                         "showTotal": true,
    //                         "pageSize": 5,
    //                         "showCheckBox": true,
    //                         "pageSizeOptions": [10, 20, 50, 100],
    //                         "loadingOnInit": false,
    //                         // "scroll": {
    //                         //     "y": "300px"
    //                         // },
    //                         // "spanWidthConfig": [
    //                         //     '50px', '100px', '200px', '200px', '200px'
    //                         // ],
    //                         "loadingConfig": {
    //                             "url": "resource/PROVINCE/query",
    //                             "method": "get",
    //                             "params": [

    //                             ],
    //                             "filter": [

    //                             ]
    //                         },
    //                         "columns": [
    //                             {
    //                                 "title": "ID",
    //                                 "type": "field",
    //                                 "field": "ID",
    //                                 "hidden": true,
    //                                 "showFilter": false,
    //                                 "showSort": false,
    //                                 "isShowExpand": false,
    //                                 "width": "50px",
    //                                 "style": {}
    //                             },
    //                             {
    //                                 "title": "省名称",
    //                                 "type": "field",
    //                                 "field": "PROVINCE_NAME",
    //                                 "hidden": false,
    //                                 "showFilter": false,
    //                                 "showSort": false,
    //                                 "width": "150px",
    //                                 "style": {},
    //                                 "editor": {
    //                                     "type": "input",
    //                                     "field": "PROVINCE_NAME"
    //                                 }
    //                             },
    //                             {
    //                                 "title": "人口",
    //                                 "type": "field",
    //                                 "field": "POPULATION",
    //                                 "hidden": false,
    //                                 "showFilter": false,
    //                                 "showSort": false,
    //                                 "width": "150px",
    //                                 "style": {},
    //                                 "editor": {
    //                                     "type": "input",
    //                                     "field": "POPULATION"
    //                                 }
    //                             },
    //                             {
    //                                 "title": "是否直辖市",
    //                                 "type": "field",
    //                                 "field": "DIRECTLY_UNDER",
    //                                 "hidden": false,
    //                                 "showFilter": false,
    //                                 "showSort": false,
    //                                 "width": "150px",
    //                                 "style": {},
    //                                 "editor": {
    //                                     "type": "select",
    //                                     "field": "DIRECTLY_UNDER",
    //                                     "placeholder": "请输入",
    //                                     "options": [
    //                                         {
    //                                             "label": "是",
    //                                             "value": 1
    //                                         },
    //                                         {
    //                                             "label": "否",
    //                                             "value": 0
    //                                         }
    //                                     ],
    //                                     "defaultValue": 0,
    //                                     "labelName": "label"
    //                                 }
    //                             },
    //                             {
    //                                 "title": "区号",
    //                                 "type": "field",
    //                                 "field": "AREA_CODE",
    //                                 "hidden": false,
    //                                 "showFilter": false,
    //                                 "showSort": false,
    //                                 "width": "150px",
    //                                 "style": {},
    //                                 "editor": {
    //                                     "type": "input",
    //                                     "field": "AREA_CODE"
    //                                 }
    //                             },
    //                             {
    //                                 "title": "创建时间",
    //                                 "type": "field",
    //                                 "field": "CREATE_DATE",
    //                                 "hidden": false,
    //                                 "showFilter": false,
    //                                 "showSort": false,
    //                                 "width": "150px",
    //                                 "style": {},
    //                                 "editor": {
    //                                     "type": "datePicker",
    //                                     "field": "CREATE_DATE"
    //                                 }
    //                             },
    //                             {
    //                                 "title": "操作",
    //                                 "type": "action",
    //                                 "actionIds": [
    //                                     "grid_edit", "grid_cancel", "grid_save", "grid_delete", "grid_new", "grid_new_cancel", "grid_link"
    //                                 ]
    //                             }
    //                         ],
    //                         "cascade": {
    //                             "messageSender": [
    //                                 {
    //                                     "id": "grid_sender_02",
    //                                     "senderId": "view_01",
    //                                     "triggerType": "BEHAVIOR",
    //                                     "trigger": "SET_SELECT_ROW",
    //                                     "triggerMoment": "after",
    //                                     "sendData": [
    //                                         {
    //                                             "beforeSend": {},
    //                                             "reveicerId": "",
    //                                             "receiverTriggerType": "BEHAVIOR",
    //                                             "receiverTrigger": "REFRESH_AS_CHILD",
    //                                             "params": [
    //                                                 {
    //                                                     "name": "_PID",
    //                                                     "type": "item",
    //                                                     "valueName": "ID"
    //                                                 }
    //                                             ]
    //                                         }
    //                                     ]
    //                                 },
    //                                 {
    //                                     "id": "grid_sender_03",
    //                                     "senderId": "view_01",
    //                                     "triggerType": "STATE",
    //                                     "trigger": "CANCEL_EDIT_ROW",
    //                                     "triggerMoment": "after",
    //                                     "sendData": [
    //                                         {
    //                                             "reveicerId": "",
    //                                             "receiverTriggerType": "STATE",
    //                                             "receiverTrigger": "STATE_TO_TEXT",
    //                                             "conditionId": "cancel_edit_1",
    //                                             "params": [
    //                                                 {
    //                                                     "name": "targetViewId",
    //                                                     "value": "view_01",
    //                                                     "type": "value"
    //                                                 }
    //                                             ]
    //                                         }
    //                                     ]
    //                                 },
    //                                 {
    //                                     "id": "grid_sender_04",
    //                                     "senderId": "view_01",
    //                                     "triggerType": "STATE",
    //                                     "trigger": "CANCEL_NEW_ROW",
    //                                     "triggerMoment": "after",
    //                                     "sendData": [
    //                                         {
    //                                             "reveicerId": "",
    //                                             "receiverTriggerType": "STATE",
    //                                             "receiverTrigger": "STATE_TO_TEXT",
    //                                             "conditionId": "cancel_edit_2",
    //                                             "params": [
    //                                                 {
    //                                                     "name": "targetViewId",
    //                                                     "value": "view_01",
    //                                                     "type": "value"
    //                                                 }
    //                                             ]
    //                                         }
    //                                     ]
    //                                 },
    //                                 {
    //                                     "id": "grid_sender_05",
    //                                     "senderId": "view_01",
    //                                     "triggerType": "STATE",
    //                                     "trigger": "EDIT_ROW",
    //                                     "triggerMoment": "after",
    //                                     "sendData": [
    //                                         {
    //                                             "reveicerId": "",
    //                                             "receiverTriggerType": "STATE",
    //                                             "receiverTrigger": "STATE_TO_EDIT",
    //                                             "params": [
    //                                                 {
    //                                                     "name": "targetViewId",
    //                                                     "value": "view_01",
    //                                                     "type": "value"
    //                                                 }
    //                                             ]
    //                                         }
    //                                     ]
    //                                 },
    //                                 {
    //                                     "id": "grid_sender_06",
    //                                     "senderId": "view_01",
    //                                     "triggerType": "OPERATION",
    //                                     "trigger": "SAVE_ROW",
    //                                     "triggerMoment": "after",
    //                                     "sendData": [
    //                                         {
    //                                             "reveicerId": "",
    //                                             "receiverTriggerType": "STATE",
    //                                             "receiverTrigger": "STATE_TO_TEXT",
    //                                             "params": [
    //                                                 {
    //                                                     "name": "targetViewId",
    //                                                     "value": "view_01",
    //                                                     "type": "value"
    //                                                 }
    //                                             ]
    //                                         }
    //                                     ]
    //                                 },
    //                                 {
    //                                     "id": "grid_sender_07",
    //                                     "senderId": "view_01",
    //                                     "triggerType": "OPERATION",
    //                                     "trigger": "SAVE_ROWS",
    //                                     "triggerMoment": "after",
    //                                     "sendData": [
    //                                         {
    //                                             "reveicerId": "",
    //                                             "receiverTriggerType": "STATE",
    //                                             "receiverTrigger": "STATE_TO_TEXT",
    //                                             "params": [
    //                                                 {
    //                                                     "name": "targetViewId",
    //                                                     "value": "view_01",
    //                                                     "type": "value"
    //                                                 }
    //                                             ]
    //                                         }
    //                                     ]
    //                                 },
    //                                 {
    //                                     "id": "grid_sender_08",
    //                                     "senderId": "view_01",
    //                                     "triggerType": "ACTION",
    //                                     "trigger": "CONFIRM",
    //                                     "triggerMoment": "after",
    //                                     "sendData": [
    //                                         {
    //                                             "reveicerId": "",
    //                                             "receiverTriggerType": "STATE",
    //                                             "receiverTrigger": "STATE_TO_TEXT",
    //                                             "params": [
    //                                                 {
    //                                                     "name": "targetViewId",
    //                                                     "value": "view_01",
    //                                                     "type": "value"
    //                                                 }
    //                                             ]
    //                                         }
    //                                     ]
    //                                 },
    //                                 {
    //                                     "id": "afterProvinceSaveSuccessfully",
    //                                     "senderId": "view_01",
    //                                     // "triggerType": "ACTION",
    //                                     // "trigger": "MESSAGE0",
    //                                     // "triggerMoment": "after",
    //                                     "sendData": [
    //                                         {
    //                                             "beforeSend": {},
    //                                             "reveicerId": "",
    //                                             "receiverTriggerType": "ACTION",
    //                                             "receiverTrigger": "MESSAGE",
    //                                             "params": [
    //                                                 {
    //                                                     "name": "type",
    //                                                     "type": "value",
    //                                                     "value": "warning"
    //                                                 },
    //                                                 {
    //                                                     "name": "message",
    //                                                     "type": "value",
    //                                                     "value": "操作完成!111111111111"
    //                                                 },
    //                                             ]
    //                                         },
    //                                         {
    //                                             "beforeSend": {},
    //                                             "reveicerId": "",
    //                                             "receiverTriggerType": "ACTION",
    //                                             "receiverTrigger": "CHANGE_ADDED_ROWS_TO_TEXT",
    //                                             "params": [
    //                                                 {
    //                                                     "name": "ID",
    //                                                     "type": "addedRows",
    //                                                     "valueName": "ID"
    //                                                 }
    //                                             ]
    //                                         }
    //                                     ]
    //                                 },
    //                                 {
    //                                     "id": "afterProvinceUpdateSuccessfully",
    //                                     "senderId": "view_01",
    //                                     // "triggerType": "ACTION",
    //                                     // "trigger": "MESSAGE0",
    //                                     // "triggerMoment": "after",
    //                                     "sendData": [
    //                                         {
    //                                             "beforeSend": {},
    //                                             "reveicerId": "",
    //                                             "receiverTriggerType": "ACTION",
    //                                             "receiverTrigger": "MESSAGE",
    //                                             "params": [
    //                                                 {
    //                                                     "name": "type",
    //                                                     "type": "value",
    //                                                     "value": "success"
    //                                                 },
    //                                                 {
    //                                                     "name": "message",
    //                                                     "type": "value",
    //                                                     "value": "操作完成!"
    //                                                 },
    //                                             ]
    //                                         },
    //                                         {
    //                                             "beforeSend": {},
    //                                             "reveicerId": "",
    //                                             "receiverTriggerType": "ACTION",
    //                                             "receiverTrigger": "CHANGE_EDITED_ROWS_TO_TEXT",
    //                                             "params": [
    //                                                 {
    //                                                     "name": "ID",
    //                                                     "type": "editedRows",
    //                                                     "valueName": "ID"
    //                                                 }
    //                                             ]
    //                                         }
    //                                     ]
    //                                 },
    //                                 {
    //                                     "id": "afterProvinceSaveValidation",
    //                                     "senderId": "view_01",
    //                                     "sendData": [
    //                                         {
    //                                             "beforeSend": {},
    //                                             "reveicerId": "",
    //                                             "receiverTriggerType": "ACTION",
    //                                             "receiverTrigger": "SHOW_INVALIDATE_ADDED_ROWS"
    //                                         }
    //                                     ]
    //                                 },
    //                                 {
    //                                     "id": "afterProvinceUpdateValidation",
    //                                     "senderId": "view_01",
    //                                     "sendData": [
    //                                         {
    //                                             "beforeSend": {},
    //                                             "reveicerId": "",
    //                                             "receiverTriggerType": "ACTION",
    //                                             "receiverTrigger": "SHOW_INVALIDATE_EDITED_ROWS"
    //                                         }
    //                                     ]
    //                                 },
    //                                 {
    //                                     "id": "afterProvinceFormSuccess",
    //                                     "senderId": "view_01",
    //                                     "sendData": [
    //                                         {
    //                                             "beforeSend": {},
    //                                             "reveicerId": "",
    //                                             "receiverTriggerType": "ACTION",
    //                                             "receiverTrigger": "LOAD_REFRESH_DATA",
    //                                             "params": [
    //                                                 {
    //                                                     "name": "ID",
    //                                                     "type": "returnValue",
    //                                                     "valueName": "ID"
    //                                                 }
    //                                             ]
    //                                         }
    //                                     ]
    //                                 },
    //                                 {
    //                                     "id": "grid_sender_08",
    //                                     "senderId": "view_01",
    //                                     "triggerType": "ACTION",
    //                                     "trigger": "DATA_CHECKED_STATUS_CHANGE",
    //                                     "triggerMoment": "after",
    //                                     "sendData": [
    //                                         {
    //                                             "reveicerId": "",
    //                                             "receiverTriggerType": "ACTION",
    //                                             "receiverTrigger": "SET_OPERATION_DATA",
    //                                             "params": [
    //                                                 {
    //                                                     "name": "_CHECKED_ROW",
    //                                                     "type": "checkedRow",
    //                                                     "valueName": "ID"
    //                                                 }
    //                                             ]
    //                                         }
    //                                     ]
    //                                 },
    //                             ],
    //                             "messageReceiver": [
    //                                 {
    //                                     "id": "",
    //                                     "senderId": "view_01",
    //                                     "receiveData": [
    //                                         {
    //                                             "beforeReceive": [],
    //                                             "triggerType": "ACTION",
    //                                             "trigger": "LOAD_REFRESH_DATA"
    //                                         },
    //                                         {
    //                                             "beforeReceive": [],
    //                                             "triggerType": "ACTION",
    //                                             "trigger": "MESSAGE"
    //                                         },
    //                                         {
    //                                             "beforeReceive": [],
    //                                             "triggerType": "ACTION",
    //                                             "trigger": "CHANGE_ADDED_ROWS_TO_TEXT"
    //                                         },
    //                                         {
    //                                             "beforeReceive": [],
    //                                             "triggerType": "ACTION",
    //                                             "trigger": "CHANGE_EDITED_ROWS_TO_TEXT"
    //                                         },
    //                                         {
    //                                             "beforeReceive": [],
    //                                             "triggerType": "LINK",
    //                                             "trigger": "LINK"
    //                                         }
    //                                     ]
    //                                 }
    //                             ]
    //                         },
    //                         "rowActions": [
    //                             {
    //                                 "id": "grid_new",
    //                                 "state": "new",
    //                                 "text": "保存",
    //                                 "icon": "save",
    //                                 "color": "text-primary",
    //                                 "type": "link",
    //                                 "size": "small",
    //                                 "hidden": false,
    //                                 "execute": [
    //                                     {
    //                                         "triggerType": "OPERATION",
    //                                         "trigger": "SAVE_ROW",
    //                                         "ajaxId": "province_save_1",
    //                                         // "stateId": "add_save_1",
    //                                         // "conditionId": "add_citiessave_1"
    //                                     }
    //                                 ],
    //                                 "toggle": {
    //                                     "type": "state",
    //                                     "toggleProperty": "hidden",
    //                                     "values": [
    //                                         {
    //                                             "name": "new",
    //                                             "value": false
    //                                         },
    //                                         {
    //                                             "name": "text",
    //                                             "value": true
    //                                         }
    //                                     ]
    //                                 }
    //                             },
    //                             {
    //                                 "id": "grid_new_cancel",
    //                                 "state": "new",
    //                                 "text": "取消",
    //                                 "icon": "rollback",
    //                                 "color": "text-primary",
    //                                 "type": "link",
    //                                 "size": "small",
    //                                 "hidden": false,
    //                                 "execute": [
    //                                     {
    //                                         "triggerType": "STATE",
    //                                         "trigger": "CANCEL_NEW_ROW",
    //                                         // "ajaxId": "add_save_1",
    //                                         // "stateId": "add_save_1",
    //                                         // "conditionId": "add_save_1"
    //                                     }
    //                                 ],
    //                                 "toggle": {
    //                                     "type": "state",
    //                                     "toggleProperty": "hidden",
    //                                     "values": [
    //                                         {
    //                                             "name": "new",
    //                                             "value": false
    //                                         },
    //                                         {
    //                                             "name": "text",
    //                                             "value": true
    //                                         }
    //                                     ]
    //                                 }
    //                             },
    //                             {
    //                                 "id": "grid_edit",
    //                                 "state": "text",
    //                                 "text": "编辑",
    //                                 "icon": "edit",
    //                                 "color": "text-primary",
    //                                 "type": "link",
    //                                 "size": "small",
    //                                 "hidden": false,
    //                                 "execute": [
    //                                     {
    //                                         "triggerType": "STATE",
    //                                         "trigger": "EDIT_ROW",
    //                                         // "ajaxId": "add_save_1",
    //                                         // "stateId": "add_save_1",
    //                                         //  "conditionId": "edit_cities"
    //                                     }
    //                                 ],
    //                                 "toggle": {
    //                                     "type": "state",
    //                                     "toggleProperty": "hidden",
    //                                     "values": [
    //                                         {
    //                                             "name": "edit",
    //                                             "value": true
    //                                         },
    //                                         {
    //                                             "name": "text",
    //                                             "value": false
    //                                         }
    //                                     ]
    //                                 }
    //                             },
    //                             {
    //                                 "id": "grid_cancel",
    //                                 "state": "text",
    //                                 "text": "取消",
    //                                 "icon": "rollback",
    //                                 "color": "text-primary",
    //                                 "type": "link",
    //                                 "size": "small",
    //                                 "hidden": true,
    //                                 "execute": [
    //                                     {
    //                                         "triggerType": "STATE",
    //                                         "trigger": "CANCEL_EDIT_ROW",
    //                                         // "ajaxId": "add_save_1",
    //                                         // "stateId": "add_save_1",
    //                                         // "conditionId": "cancel_edit_1"
    //                                     }
    //                                 ],
    //                                 "toggle": {
    //                                     "type": "state",
    //                                     "toggleProperty": "hidden",
    //                                     "values": [
    //                                         {
    //                                             "name": "edit",
    //                                             "value": false
    //                                         },
    //                                         {
    //                                             "name": "text",
    //                                             "value": true
    //                                         }
    //                                     ]
    //                                 }
    //                             },
    //                             {
    //                                 "id": "grid_save",
    //                                 "state": "text",
    //                                 "text": "保存",
    //                                 "icon": "save",
    //                                 "color": "text-primary",
    //                                 "type": "link",
    //                                 "size": "small",
    //                                 "hidden": true,
    //                                 "execute": [
    //                                     {
    //                                         "triggerType": "OPERATION",
    //                                         "trigger": "SAVE_ROW",
    //                                         "ajaxId": "province_edit_1",
    //                                         // "stateId": "add_save_1",
    //                                         // "conditionId": "add_cities"
    //                                     },
    //                                 ],
    //                                 "toggle": {
    //                                     "type": "state",
    //                                     "toggleProperty": "hidden",
    //                                     "values": [
    //                                         {
    //                                             "name": "edit",
    //                                             "value": false
    //                                         },
    //                                         {
    //                                             "name": "text",
    //                                             "value": true
    //                                         }
    //                                     ]
    //                                 }
    //                             },
    //                             {
    //                                 "id": "grid_delete",
    //                                 "state": "text",
    //                                 "text": "删除",
    //                                 "icon": "delete",
    //                                 "type": "link",
    //                                 "color": "primary",
    //                                 "size": "small",
    //                                 "execute": [
    //                                     {
    //                                         "triggerType": "ACTION",
    //                                         "trigger": "CONFIRM",
    //                                         "dialogId": "delete_confirm",
    //                                         // "conditionId": "delete_operation_1",
    //                                         "ajaxId": "delete_province",
    //                                         // "stateId": "before_delete_province"
    //                                     }
    //                                 ]
    //                             },
    //                             {
    //                                 "id": "grid_link",
    //                                 "state": "text",
    //                                 "text": "跳转编辑",
    //                                 "icon": "edit",
    //                                 "type": "link",
    //                                 "color": "primary",
    //                                 "size": "small",
    //                                 "execute": [
    //                                     {
    //                                         "triggerType": "LINK",
    //                                         "trigger": "LINK",
    //                                         "link": "template/cfgformdemo"
    //                                         // "dialogId": "delete_confirm",
    //                                         // "conditionId": "delete_operation_1",
    //                                         // "ajaxId": "delete_province",
    //                                         // "stateId": "before_delete_province"
    //                                     }
    //                                 ]
    //                             }
    //                         ],
    //                         "routeParamMapping": [
    //                             {
    //                                 "name": "ID",
    //                                 "type": "item",
    //                                 "valueName": "ID"
    //                             },
    //                             {
    //                                 "name": "PID",
    //                                 "type": "tempValue",
    //                                 "valueName": "PID"
    //                             }
    //                         ],
    //                         "dialog": [
    //                             {
    //                                 "id": "delete_confirm",
    //                                 "type": "confirm",
    //                                 "title": "确认操作",
    //                                 "content": "是否删除当前操作数据?",
    //                                 "cancelText": "取消",
    //                                 "okText": "确认"
    //                             }
    //                         ],
    //                         "condition": [
    //                             {
    //                                 "id": "add_cities_state",
    //                                 "state": [
    //                                     {
    //                                         "type": "component",
    //                                         "valueName": "ROWS_CHECKED",
    //                                         "expression": [
    //                                             {
    //                                                 "type": "property",
    //                                                 "name": "length",
    //                                                 "matchValue": 0,
    //                                                 "match": "gt"
    //                                             },
    //                                             {
    //                                                 "type": "element",
    //                                                 "name": "name",
    //                                                 "matchValue": "1",
    //                                                 "match": "eq",
    //                                             }
    //                                         ]
    //                                     }
    //                                 ]
    //                             },
    //                             {
    //                                 "id": "edit_cities_state",
    //                                 "state": [
    //                                     {
    //                                         "type": "component",
    //                                         "valueName": "ROWS_CHECKED",
    //                                         "expression": [
    //                                             {
    //                                                 "type": "property",
    //                                                 "name": "length",
    //                                                 "matchValue": 0,
    //                                                 "match": "gt"
    //                                             }
    //                                         ]
    //                                     }
    //                                 ]
    //                             },
    //                             {
    //                                 "id": "add_cities",
    //                                 "state": [
    //                                     {
    //                                         "type": "component",
    //                                         "valueName": "ROWS_CHECKED",
    //                                         "expression": [
    //                                             {
    //                                                 "type": "property",
    //                                                 "name": "length",
    //                                                 "matchValue": 0,
    //                                                 "match": "gt"
    //                                             }
    //                                         ]
    //                                     },
    //                                     {
    //                                         "type": "component",
    //                                         "valueName": "ROWS_ADDED",
    //                                         "expression": [
    //                                             {
    //                                                 "type": "property",
    //                                                 "name": "length",
    //                                                 "matchValue": 0,
    //                                                 "match": "gt"
    //                                             }
    //                                         ]
    //                                     }
    //                                 ]
    //                             },
    //                             {
    //                                 "id": "edit_cities",
    //                                 "state": [
    //                                     {
    //                                         "type": "component",
    //                                         "valueName": "ROWS_EDITED",
    //                                         "expression": [
    //                                             {
    //                                                 "type": "property",
    //                                                 "name": "length",
    //                                                 "matchValue": 0,
    //                                                 "match": "gt"
    //                                             }
    //                                         ]
    //                                     },
    //                                     {
    //                                         "type": "component",
    //                                         "valueName": "ROWS_CHECKED",
    //                                         "expression": [
    //                                             {
    //                                                 "type": "property",
    //                                                 "name": "length",
    //                                                 "matchValue": 0,
    //                                                 "match": "gt"
    //                                             }
    //                                         ]
    //                                     }
    //                                 ]
    //                             },
    //                             {
    //                                 "id": "cancel_edit_cities",
    //                                 "state": [
    //                                     {
    //                                         "type": "component",
    //                                         "valueName": "ROWS_EDITED",
    //                                         "expression": [
    //                                             {
    //                                                 "type": "property",
    //                                                 "name": "length",
    //                                                 "matchValue": 0,
    //                                                 "match": "eq"
    //                                             }
    //                                         ]
    //                                     }
    //                                 ]
    //                             },
    //                             {
    //                                 "id": "cancel_add_cities",
    //                                 "state": [
    //                                     {
    //                                         "type": "component",
    //                                         "valueName": "ROWS_ADDED",
    //                                         "expression": [
    //                                             {
    //                                                 "type": "property",
    //                                                 "name": "length",
    //                                                 "matchValue": 0,
    //                                                 "match": "eq"
    //                                             }
    //                                         ]
    //                                     }
    //                                 ]
    //                             }

    //                         ],
    //                         "ajaxConfig": [
    //                             {
    //                                 "id": "province_save_1",
    //                                 "url": "resource/PROVINCE/insert ",
    //                                 "urlType": "inner",
    //                                 "ajaxType": "post",
    //                                 "params": [
    //                                     {
    //                                         "name": "ID",
    //                                         "type": "GUID"
    //                                     },
    //                                     {
    //                                         "name": "PROVINCE_NAME",
    //                                         "type": "componentValue",
    //                                         "valueName": "PROVINCE_NAME",
    //                                         "dataType": "string"
    //                                     },
    //                                     {
    //                                         "name": "AREA_CODE",
    //                                         "type": "componentValue",
    //                                         "valueName": "AREA_CODE",
    //                                         "dataType": "string"
    //                                     },
    //                                     {
    //                                         "name": "DIRECTLY_UNDER",
    //                                         "type": "componentValue",
    //                                         "valueName": "DIRECTLY_UNDER",
    //                                         "dataType": "int"
    //                                     },
    //                                     {
    //                                         "name": "POPULATION",
    //                                         "type": "componentValue",
    //                                         "valueName": "POPULATION",
    //                                         "dataType": "int"
    //                                     }
    //                                 ],
    //                                 "outputParameters": [

    //                                 ],
    //                                 "result": [
    //                                     {
    //                                         "name": "data",
    //                                         "showMessageWithNext": 0,
    //                                         "message": "message.ajax.state.success",
    //                                         "senderId": "afterProvinceSaveSuccessfully"
    //                                     },
    //                                     {
    //                                         "name": "validation",
    //                                         "senderId": "afterProvinceSaveValidation"
    //                                     },
    //                                     // {
    //                                     //     "name": "error",
    //                                     //     "senderId": "grid_sender_03"
    //                                     // }
    //                                 ]
    //                             },
    //                             {
    //                                 "id": "province_edit_1",
    //                                 "url": "resource/PROVINCE/update",
    //                                 "urlType": "inner",
    //                                 "ajaxType": "put",
    //                                 "params": [
    //                                     {
    //                                         "name": "ID",
    //                                         "type": "componentValue",
    //                                         "valueName": "ID"
    //                                     },
    //                                     {
    //                                         "name": "PROVINCE_NAME",
    //                                         "type": "componentValue",
    //                                         "valueName": "PROVINCE_NAME",
    //                                         "dataType": "string"
    //                                     },
    //                                     {
    //                                         "name": "AREA_CODE",
    //                                         "type": "componentValue",
    //                                         "valueName": "AREA_CODE",
    //                                         "dataType": "string"
    //                                     },
    //                                     {
    //                                         "name": "DIRECTLY_UNDER",
    //                                         "type": "componentValue",
    //                                         "valueName": "DIRECTLY_UNDER",
    //                                         "dataType": "int"
    //                                     },
    //                                     {
    //                                         "name": "POPULATION",
    //                                         "type": "componentValue",
    //                                         "valueName": "POPULATION",
    //                                         "dataType": "int"
    //                                     }
    //                                 ],
    //                                 "outputParameters": [

    //                                 ],
    //                                 "result": [
    //                                     {
    //                                         "name": "data",
    //                                         "showMessageWithNext": 0,
    //                                         "message": "message.ajax.state.success",
    //                                         "senderId": "afterProvinceUpdateSuccessfully"
    //                                     },
    //                                     {
    //                                         "name": "validation",
    //                                         "senderId": "afterProvinceUpdateValidation"
    //                                     },
    //                                 ]
    //                             },
    //                             {
    //                                 "id": "delete_province",
    //                                 "url": "province/delete",
    //                                 "urlType": "inner",
    //                                 "ajaxType": "delete",
    //                                 "params": [
    //                                     {
    //                                         "name": "ids",
    //                                         "type": "item",
    //                                         "valueName": "id"
    //                                     }
    //                                 ],
    //                                 "outputParameters": [

    //                                 ],
    //                                 "result": [

    //                                 ]
    //                             }
    //                         ],
    //                         "beforeTrigger": [
    //                             {
    //                                 "id": "before_delete_province",
    //                                 "senderId": "view_01",
    //                                 "sendData": [
    //                                     {
    //                                         "receiverTriggerType": "ACTION",
    //                                         "receiverTrigger": "CONFIRM",
    //                                         "params": [
    //                                             {
    //                                                 "name": "title",
    //                                                 "type": " 确认操作",
    //                                                 "value": "title"
    //                                             },
    //                                             {
    //                                                 "name": "content",
    //                                                 "type": "确认删除当前数据",
    //                                                 "value": "content"
    //                                             }
    //                                         ]
    //                                     }

    //                                 ]
    //                             }
    //                         ],
    //                         "afterTrigger": [
    //                             {
    //                                 "id": "",
    //                                 "senderId": "view_01",
    //                                 "sendData": [
    //                                     {
    //                                         "beforeSend": [],
    //                                         "reveicerId": "",
    //                                         "receiverTriggerType": "BEHAVIOR",
    //                                         "receiverTrigger": "REFRESH_AS_CHILD",
    //                                         "params": [
    //                                             {
    //                                                 "name": "parent_id",
    //                                                 "type": "item",
    //                                                 "valueName": "id"
    //                                             },
    //                                             {
    //                                                 "name": "parent_name",
    //                                                 "type": "item",
    //                                                 "valueName": "name"
    //                                             }
    //                                         ]
    //                                     }
    //                                 ]
    //                             }
    //                         ],
    //                         "toolbar": {
    //                             "id": "toolbar_001",
    //                             "component": "cnToolbar",
    //                             "size": "small",
    //                             "cascade": {
    //                                 "messageSender": [
    //                                     {
    //                                         "id": "toolbar_01",
    //                                         "senderId": "view_01",
    //                                         "triggerType": "OPERATION",
    //                                         "trigger": "EXECUTE_CHECKED_ROWS",
    //                                         "triggerMoment": "after",
    //                                         "sendData": [
    //                                             {
    //                                                 "beforeSend": {},
    //                                                 "reveicerId": "",
    //                                                 "receiverTriggerType": "BEHAVIOR",
    //                                                 "receiverTrigger": "REFRESH_AS_CHILD",
    //                                                 "params": [
    //                                                     {
    //                                                         "name": "parent_id",
    //                                                         "type": "item",
    //                                                         "valueName": "id"
    //                                                     },
    //                                                     {
    //                                                         "name": "parent_name",
    //                                                         "type": "item",
    //                                                         "valueName": "name"
    //                                                     }
    //                                                 ]
    //                                             }
    //                                         ]
    //                                     }
    //                                 ],
    //                                 "messageReceiver": [
    //                                     {
    //                                         "id": "s_001",
    //                                         "senderId": "view_01",
    //                                         "receiveData": [
    //                                             {
    //                                                 "triggerType": "STATE",
    //                                                 "trigger": "STATE_TO_TEXT"
    //                                             }
    //                                         ]
    //                                     },
    //                                     {
    //                                         "id": "s_002",
    //                                         "senderId": "view_01",
    //                                         "receiveData": [
    //                                             {
    //                                                 "triggerType": "STATE",
    //                                                 "trigger": "STATE_TO_EDIT"
    //                                             }
    //                                         ]
    //                                     },
    //                                     {
    //                                         "id": "s_003",
    //                                         "senderId": "view_01",
    //                                         "receiveData": [
    //                                             {
    //                                                 "triggerType": "ACTION",
    //                                                 "trigger": "SET_OPERATION_DATA",
    //                                                 "params": [
    //                                                     {
    //                                                         "pname": "_CHECKED_ROW",
    //                                                         "cname": "_CHECKED_ROW",
    //                                                         "valueTo": "tempValue"
    //                                                     }
    //                                                 ]
    //                                             }
    //                                         ]
    //                                     }
    //                                 ]
    //                             },
    //                             "changeValue": [
    //                                 {
    //                                     "id": "edit_form_changeValue",
    //                                     "params": [
    //                                         {
    //                                             "name": "ID",
    //                                             "type": "item",
    //                                             "valueName": "ID",
    //                                             "valueTo": "tempValue"
    //                                         }
    //                                     ]
    //                                 }
    //                             ],
    //                             "dialog": [
    //                                 {
    //                                     "id": "edit_province_form",
    //                                     "type": "confirm",
    //                                     "title": "数据编辑",
    //                                     "cancelText": "取消",
    //                                     "okText": "提交",
    //                                     "form": {
    //                                         "id": "form_01",
    //                                         "type": "form",
    //                                         "component": "form",
    //                                         state: 'text',
    //                                         loadingConfig: {
    //                                             id: "loadform" // 将加载配置引用
    //                                         },
    //                                         formLayout: {
    //                                             "id": "b86s2i",
    //                                             "type": "layout",
    //                                             "title": "表单布局b86s2i",
    //                                             "rows": [
    //                                                 {
    //                                                     "id": "MefhXa",
    //                                                     "type": "row",
    //                                                     // 行列，是否 显示。
    //                                                     "cols": [
    //                                                         {
    //                                                             "id": "iHspYn", "col": "cc", "type": "col",
    //                                                             "title": "列iHspYn", "span": 24,
    //                                                             "layoutContain": "input",
    //                                                             "size": {
    //                                                                 "nzXs": 24, "nzSm": 24, "nzMd": 24, "nzLg": 24, "ngXl": 24, "nzXXl": 24
    //                                                             },
    //                                                             "control": {
    //                                                                 "id": "001"  // id 和引用id 值相同
    //                                                             }
    //                                                         },
    //                                                         {
    //                                                             "id": "ioj0mV", "col": "cc", "type": "col", "title": "列ioj0mV", "span": 24, "layoutContain": "select",
    //                                                             "size": {
    //                                                                 "nzXs": 24, "nzSm": 24, "nzMd": 24, "nzLg": 24, "ngXl": 24, "nzXXl": 24
    //                                                             },
    //                                                             "control": { "id": "002" }
    //                                                         },
    //                                                         {
    //                                                             "id": "ioj0mV", "col": "cc", "type": "col", "title": "列ioj0mV", "span": 24, "layoutContain": "select",
    //                                                             "size": {
    //                                                                 "nzXs": 24, "nzSm": 24, "nzMd": 24, "nzLg": 24, "ngXl": 24, "nzXXl": 24
    //                                                             },
    //                                                             "control": { "id": "003" }
    //                                                         },
    //                                                         {
    //                                                             "id": "ioj0mV", "col": "cc", "type": "col", "title": "列ioj0mV", "span": 24, "layoutContain": "select",
    //                                                             "size": {
    //                                                                 "nzXs": 24, "nzSm": 24, "nzMd": 24, "nzLg": 24, "nzXl": 24, "nzXXl": 24
    //                                                             },
    //                                                             "control": { "id": "004" }
    //                                                         }
    //                                                     ]
    //                                                 }]
    //                                         },
    //                                         formControls: [
    //                                             {
    //                                                 id: '001',
    //                                                 "hidden": true, // 字段是否隐藏
    //                                                 "title": '省名称',  // lable 信息
    //                                                 "titleConfig": {
    //                                                     required: true
    //                                                 },
    //                                                 "field": "PROVINCE_NAME",  // fromcontrol name  默认的字段
    //                                                 "labelSize": {
    //                                                     "span": 6,
    //                                                     "nzXs": { span: 6 },
    //                                                     "nzSm": { span: 6 },
    //                                                     "nzMd": { span: 6 },
    //                                                     "nzLg": { span: 6 },
    //                                                     "ngXl": { span: 6 },
    //                                                     "nzXXl": { span: 6 }
    //                                                 },  // 
    //                                                 "controlSize": {
    //                                                     "span": 18,
    //                                                     "nzXs": 18,
    //                                                     "nzSm": 18,
    //                                                     "nzMd": 18,
    //                                                     "nzLg": 18,
    //                                                     "ngXl": 18,
    //                                                     "nzXXl": 18
    //                                                 },
    //                                                 "state": "edit", // 当前组件默认状态 文本，编辑，或者由表单状态控制text、edit、form
    //                                                 "text": { // 文本展示字段
    //                                                     "type": 'label', // 什么组件展示文本 
    //                                                     "field": 'PROVINCE_NAME',   // 字段
    //                                                 },
    //                                                 "editor": {            // 编辑状态字段  日后扩充可为数组，满足条件下的组件变化
    //                                                     "type": "input",
    //                                                     "field": "PROVINCE_NAME",  // 编辑字段于定义字段一致 （此处定义于表格相反）
    //                                                     "placeholder": "请输入",
    //                                                     "validations": [  // 校验
    //                                                         { validator: "required", type: "default", "message": "请输入省名称" }
    //                                                     ]
    //                                                 }
    //                                             },
    //                                             {
    //                                                 id: '002',
    //                                                 "hidden": true, // 字段是否隐藏
    //                                                 "title": '区号',  // lable 信息
    //                                                 "titleConfig": {
    //                                                     required: false
    //                                                 },
    //                                                 "field": "AREA_CODE",  // fromcontrol name  默认的字段
    //                                                 "labelSize": {
    //                                                     "span": 6,
    //                                                     "nzXs": 6, "nzSm": 6, "nzMd": 6, "nzLg": 6, "ngXl": 6, "nzXXl": 6
    //                                                 },  // 
    //                                                 "controlSize": {
    //                                                     "span": 18,
    //                                                     "nzXs": { span: 18, offset: 0 },
    //                                                     "nzSm": { span: 18, offset: 0 },
    //                                                     "nzMd": { span: 18, offset: 0 },
    //                                                     "nzLg": { span: 18, offset: 0 },
    //                                                     "ngXl": { span: 18, offset: 0 },
    //                                                     "nzXXl": { span: 18, offset: 0 }
    //                                                 },
    //                                                 "state": "edit", // 当前组件默认状态 文本，编辑，或者由表单状态控制 text、edit、form
    //                                                 "text": { // 文本展示字段
    //                                                     "type": 'label', // 什么组件展示文本 
    //                                                     "field": 'AREA_CODE',   // 字段
    //                                                 },
    //                                                 "editor": {            // 编辑状态字段  日后扩充可为数组，满足条件下的组件变化
    //                                                     "type": "input",
    //                                                     "field": "AREA_CODE",  // 编辑字段于定义字段一致 （此处定义于表格相反）
    //                                                     "placeholder": "请输入",
    //                                                     "validations": [  // 校验

    //                                                     ]
    //                                                 },
    //                                                 "editor1": {            // 编辑状态字段  日后扩充可为数组，满足条件下的组件变化
    //                                                     "type": "select",
    //                                                     "field": "areaCode",  // 编辑字段于定义字段一致 （此处定义于表格相反）
    //                                                     "placeholder": "请输入",
    //                                                     options: [
    //                                                         { label: '是', value: '1' },
    //                                                         { label: '否', value: '0' }
    //                                                     ],
    //                                                     labelName: 'provinceName',
    //                                                     valueName: 'id',
    //                                                     loadingConfig: {
    //                                                         id: "loadformselect1" // 将加载配置引用
    //                                                     },
    //                                                     "validate": {  // 校验
    //                                                         validator: "required", type: "default", "message": "请输入区号"
    //                                                     }
    //                                                 }
    //                                             },
    //                                             {
    //                                                 id: '003',
    //                                                 "hidden": true, // 字段是否隐藏
    //                                                 "title": '是否直辖市',  // lable 信息
    //                                                 "titleConfig": {
    //                                                     required: false
    //                                                 },
    //                                                 "field": "DIRECTLY_UNDER",  // fromcontrol name  默认的字段
    //                                                 "labelSize": {
    //                                                     "span": 6,
    //                                                     "nzXs": 6, "nzSm": 6, "nzMd": 6, "nzLg": 6, "nzXl": 6, "nzXXl": 6
    //                                                 },  // 
    //                                                 "controlSize": {
    //                                                     "span": 18,
    //                                                     "nzXs": { span: 18, offset: 0 },
    //                                                     "nzSm": { span: 18, offset: 0 },
    //                                                     "nzMd": { span: 18, offset: 0 },
    //                                                     "nzLg": { span: 18, offset: 0 },
    //                                                     "ngXl": { span: 18, offset: 0 },
    //                                                     "nzXXl": { span: 18, offset: 0 }
    //                                                 },
    //                                                 "state": "edit", // 当前组件默认状态 文本，编辑，或者由表单状态控制 text、edit、form
    //                                                 "text": { // 文本展示字段
    //                                                     "type": 'label', // 什么组件展示文本 
    //                                                     "field": 'DIRECTLY_UNDER',   // 字段
    //                                                 },
    //                                                 "editor": {            // 编辑状态字段  日后扩充可为数组，满足条件下的组件变化
    //                                                     "type": "select",
    //                                                     "field": "DIRECTLY_UNDER",  // 编辑字段于定义字段一致 （此处定义于表格相反）
    //                                                     "placeholder": "请输入",
    //                                                     options: [
    //                                                         { label: '是', value: 1 },
    //                                                         { label: '否', value: 0 }
    //                                                     ],
    //                                                     "defaultValue": 0,
    //                                                     // labelName: 'cityName',
    //                                                     // valueName: 'id',
    //                                                     // loadingConfig: {
    //                                                     //     id: "loadformselect2" // 将加载配置引用
    //                                                     // },
    //                                                     "validate": {  // 校验

    //                                                     }
    //                                                 }
    //                                             },
    //                                             {
    //                                                 id: '004',
    //                                                 "hidden": true, // 字段是否隐藏
    //                                                 "title": '人口',  // lable 信息
    //                                                 "titleConfig": {
    //                                                     required: true
    //                                                 },
    //                                                 "field": "POPULATION",  // fromcontrol name  默认的字段
    //                                                 "labelSize": {
    //                                                     "span": 6,
    //                                                     "nzXs": 6, "nzSm": 6, "nzMd": 6, "nzLg": 6, "ngXl": 6, "nzXXl": 6
    //                                                 },  // 
    //                                                 "controlSize": {
    //                                                     "span": 18,
    //                                                     "nzXs": { span: 18, offset: 0 },
    //                                                     "nzSm": { span: 18, offset: 0 },
    //                                                     "nzMd": { span: 18, offset: 0 },
    //                                                     "nzLg": { span: 18, offset: 0 },
    //                                                     "nzXl": { span: 18, offset: 0 },
    //                                                     "nzXXl": { span: 18, offset: 0 }
    //                                                 },
    //                                                 "state": "edit", // 当前组件默认状态 文本，编辑，或者由表单状态控制 text、edit、form
    //                                                 "text": { // 文本展示字段
    //                                                     "type": 'label', // 什么组件展示文本 
    //                                                     "field": 'POPULATION',   // 字段
    //                                                 },
    //                                                 "editor": {            // 编辑状态字段  日后扩充可为数组，满足条件下的组件变化
    //                                                     "type": "input",
    //                                                     "field": "POPULATION",  // 编辑字段于定义字段一致 （此处定义于表格相反）
    //                                                     "placeholder": "请输入",
    //                                                     "validations": [  // 校验
    //                                                         { validator: "required", type: "default", "message": "请输入人口数量" }
    //                                                     ]
    //                                                 }
    //                                             }
    //                                         ],
    //                                         formControlsPermissions: [ // 初始表单字段，描述 新增、编辑、查看 状态下的文本
    //                                             {
    //                                                 formState: "new", // 新增状态下的Controls 展示与否，是否读写属性设置
    //                                                 formStateContent: { // 对当前状态的描述 ，描述当前状态下 表单组件 具备的行为，例如是否自加载，是否启用默认值
    //                                                     isLoad: false,
    //                                                     loadAjax: {}, // 如果启用load，是否用新的加载地址
    //                                                     isDefault: true
    //                                                 },
    //                                                 Controls: [
    //                                                     { id: '001', state: "edit", hidden: false, readOnly: false },
    //                                                     { id: '002', state: "edit", hidden: false, readOnly: false },
    //                                                     { id: '003', state: "edit", hidden: false, readOnly: false },
    //                                                     { id: '004', state: "edit", hidden: false, readOnly: false }
    //                                                 ]
    //                                             },
    //                                             {
    //                                                 formState: "edit",
    //                                                 Controls: [
    //                                                     { id: '001', state: "edit", hidden: false, readOnly: false },
    //                                                     { id: '002', state: "edit", hidden: false, readOnly: false },
    //                                                     { id: '003', state: "edit", hidden: false, readOnly: false },
    //                                                     { id: '004', state: "edit", hidden: false, readOnly: false }
    //                                                 ]
    //                                             },
    //                                             {
    //                                                 formState: "text",
    //                                                 Controls: [
    //                                                     { id: '001', state: "text", hidden: false, readOnly: false },
    //                                                     { id: '002', state: "text", hidden: false, readOnly: false },
    //                                                     { id: '003', state: "text", hidden: false, readOnly: false },
    //                                                     { id: '004', state: "text", hidden: false, readOnly: false }
    //                                                 ]
    //                                             }

    //                                         ],
    //                                         ajaxConfig: [
    //                                             {
    //                                                 "id": "loadform",
    //                                                 "url": "resource/PROVINCE/query",
    //                                                 "urlType": "inner",
    //                                                 "ajaxType": "get",
    //                                                 "params": [
    //                                                     {
    //                                                         "name": "ID",
    //                                                         "type": "tempValue",
    //                                                         "valueName": "ID"
    //                                                     },
    //                                                     {
    //                                                         "name": "_onlyOneObject",
    //                                                         "type": "value",
    //                                                         "value": true
    //                                                     }
    //                                                 ],
    //                                                 "outputParameters": [

    //                                                 ],
    //                                                 "result": [  // 描述 表单接收参数，将返回的哪些值赋给相应的组件属性

    //                                                 ]
    //                                             },
    //                                             {
    //                                                 "id": "loadformselect1",
    //                                                 "url": "information/selectAllProvinceWithCity",
    //                                                 "urlType": "inner",
    //                                                 "ajaxType": "get",
    //                                                 "params": [


    //                                                 ],
    //                                                 "outputParameters": [

    //                                                 ],
    //                                                 "result": [  // 描述 表单接收参数，将返回的哪些值赋给相应的组件属性

    //                                                 ]
    //                                             },
    //                                             {
    //                                                 "id": "loadformselect2_2",
    //                                                 "url": "information/ssld",
    //                                                 "urlType": "inner",
    //                                                 "ajaxType": "get",
    //                                                 "params": [

    //                                                     {
    //                                                         "name": "pId",
    //                                                         "type": "value",
    //                                                         "value": "1"
    //                                                     }
    //                                                 ],
    //                                                 "outputParameters": [

    //                                                 ],
    //                                                 "result": [  // 描述 表单接收参数，将返回的哪些值赋给相应的组件属性

    //                                                 ]
    //                                             },
    //                                             {
    //                                                 "id": "loadformselect2",
    //                                                 "url": "information/selectCityByPid",
    //                                                 "urlType": "inner",
    //                                                 "ajaxType": "get",
    //                                                 "params": [

    //                                                     {
    //                                                         "name": "pId",
    //                                                         "type": "cascadeValue",
    //                                                         "valueName": "PROVINCEID",
    //                                                         "value": "2"
    //                                                     }
    //                                                 ],
    //                                                 "outputParameters": [

    //                                                 ],
    //                                                 "result": [  // 描述 表单接收参数，将返回的哪些值赋给相应的组件属性

    //                                                 ]
    //                                             }



    //                                         ],
    //                                         cascade: {
    //                                             "messageReceiver": [
    //                                                 {
    //                                                     "id": "",
    //                                                     "senderId": "view_01",
    //                                                     "receiveData": [
    //                                                         {
    //                                                             "beforeReceive": [],
    //                                                             "triggerType": "BEHAVIOR",
    //                                                             "trigger": "REFRESH_AS_CHILD",
    //                                                             "params": [
    //                                                                 {
    //                                                                     "pname": "_PID",
    //                                                                     "cname": "_PID",
    //                                                                     "valueTo": "tempValue"
    //                                                                 }
    //                                                             ]
    //                                                         }
    //                                                     ]
    //                                                 }
    //                                             ]
    //                                         },
    //                                         cascadeValue: [ // 值级联配置
    //                                             {
    //                                                 "type": '值变化',
    //                                                 "controlId": '002', //  大的control标识，级联内部
    //                                                 "name": 'inputname2',
    //                                                 "CascadeObjects": [
    //                                                     {
    //                                                         "controlId": '003',
    //                                                         "cascadeName": 'inputname3',
    //                                                         "cascadeItems": [  // 根据值执行
    //                                                             {
    //                                                                 "type": 'default',  // conditions   default  满足条件执行或者默认都执行
    //                                                                 "caseValue": {    // 条件描述 （触发级联的前置条件，如果不设置，则是满足）
    //                                                                     "type": 'selectObjectValue',
    //                                                                     "valueName": 'num',
    //                                                                     "regular": '^0$'
    //                                                                 },
    //                                                                 "content": {  // 应答体描述
    //                                                                     "type": 'ajax', // 应答类型（异步、消息、赋值、隐藏、显示...）
    //                                                                     "data": {
    //                                                                         "option": [
    //                                                                             { "name": 'PROVINCEID', "type": 'selectObjectValue', "value": '1', "valueName": 'id' }
    //                                                                         ]
    //                                                                     }
    //                                                                 }
    //                                                             }

    //                                                         ]
    //                                                     }
    //                                                 ]
    //                                             }
    //                                         ]
    //                                     }
    //                                 }
    //                             ],
    //                             "condition": [
    //                                 {
    //                                     "id": "add_cities_state",
    //                                     "state": [
    //                                         {
    //                                             "type": "component",
    //                                             "valueName": "ROWS_CHECKED",
    //                                             "expression": [
    //                                                 {
    //                                                     "type": "property",
    //                                                     "name": "length",
    //                                                     "matchValue": 0,
    //                                                     "match": "gt"
    //                                                 },
    //                                                 {
    //                                                     "type": "element",
    //                                                     "name": "name",
    //                                                     "matchValue": "1",
    //                                                     "match": "eq",
    //                                                 }
    //                                             ]
    //                                         }
    //                                     ]
    //                                 },
    //                                 {
    //                                     "id": "edit_cities_state",
    //                                     "state": [
    //                                         {
    //                                             "type": "component",
    //                                             "valueName": "ROWS_CHECKED",
    //                                             "expression": [
    //                                                 {
    //                                                     "type": "property",
    //                                                     "name": "length",
    //                                                     "matchValue": 0,
    //                                                     "match": "gt"
    //                                                 }
    //                                             ]
    //                                         }
    //                                     ]
    //                                 },
    //                                 {
    //                                     "id": "add_province_condition",
    //                                     "state": [
    //                                         {
    //                                             "type": "component",
    //                                             "valueName": "ROWS_CHECKED",
    //                                             "expression": [
    //                                                 {
    //                                                     "type": "property",
    //                                                     "name": "length",
    //                                                     "matchValue": 0,
    //                                                     "match": "gt"
    //                                                 }
    //                                             ]
    //                                         },
    //                                         {
    //                                             "type": "component",
    //                                             "valueName": "ROWS_ADDED",
    //                                             "expression": [
    //                                                 {
    //                                                     "type": "property",
    //                                                     "name": "length",
    //                                                     "matchValue": 0,
    //                                                     "match": "gt"
    //                                                 }
    //                                             ]
    //                                         }
    //                                     ]
    //                                 },
    //                                 {
    //                                     "id": "edit_province_condition",
    //                                     "state": [
    //                                         {
    //                                             "type": "component",
    //                                             "valueName": "ROWS_EDITED",
    //                                             "expression": [
    //                                                 {
    //                                                     "type": "property",
    //                                                     "name": "length",
    //                                                     "matchValue": 0,
    //                                                     "match": "gt"
    //                                                 }
    //                                             ]
    //                                         },
    //                                         {
    //                                             "type": "component",
    //                                             "valueName": "ROWS_CHECKED",
    //                                             "expression": [
    //                                                 {
    //                                                     "type": "property",
    //                                                     "name": "length",
    //                                                     "matchValue": 0,
    //                                                     "match": "gt"
    //                                                 }
    //                                             ]
    //                                         }
    //                                     ]
    //                                 },
    //                                 {
    //                                     "id": "cancel_edit_rows_2",
    //                                     "state": [
    //                                         {
    //                                             "type": "component",
    //                                             "valueName": "ROWS_EDITED",
    //                                             "expression": [
    //                                                 {
    //                                                     "type": "property",
    //                                                     "name": "length",
    //                                                     "matchValue": 0,
    //                                                     "match": "gt"
    //                                                 }
    //                                             ]
    //                                         }
    //                                     ]
    //                                 },
    //                                 {
    //                                     "id": "form_add_province_condition",
    //                                     "state": [
    //                                         {
    //                                             "type": "component",
    //                                             "valueName": "FORM_VALID",
    //                                             "expression": [
    //                                                 {
    //                                                     "type": "property",
    //                                                     "name": "length",
    //                                                     "matchValue": 0,
    //                                                     "match": "gt"
    //                                                 }
    //                                             ]
    //                                         }
    //                                     ]
    //                                 }
    //                             ],
    //                             "ajaxConfig": [
    //                                 {
    //                                     "id": "add_provinces_1",
    //                                     "url": "resource/PROVINCE/batchInsert",
    //                                     "urlType": "inner",
    //                                     "ajaxType": "post",
    //                                     "params": [
    //                                         {
    //                                             "name": "ID",
    //                                             "type": "GUID"
    //                                         },
    //                                         {
    //                                             "name": "PROVINCE_NAME",
    //                                             "type": "componentValue",
    //                                             "valueName": "PROVINCE_NAME",
    //                                             "dataType": "string"
    //                                         },
    //                                         {
    //                                             "name": "AREA_CODE",
    //                                             "type": "componentValue",
    //                                             "valueName": "AREA_CODE",
    //                                             "dataType": "string"
    //                                         },
    //                                         {
    //                                             "name": "DIRECTLY_UNDER",
    //                                             "type": "componentValue",
    //                                             "valueName": "DIRECTLY_UNDER",
    //                                             "dataType": "int"
    //                                         },
    //                                         {
    //                                             "name": "POPULATION",
    //                                             "type": "componentValue",
    //                                             "valueName": "POPULATION",
    //                                             "dataType": "int"
    //                                         }
    //                                     ],
    //                                     "outputParameters": [

    //                                     ],
    //                                     "result": [
    //                                         {
    //                                             "name": "data",
    //                                             "showMessageWithNext": 0,
    //                                             "message": "message.ajax.state.success",
    //                                             "senderId": "afterProvinceSaveSuccessfully"
    //                                         },
    //                                         {
    //                                             "name": "validation",
    //                                             "message": "message.ajax.state.success",
    //                                             "senderId": "afterProvinceSaveValidation"
    //                                         },
    //                                         {
    //                                             "name": "error",
    //                                             "senderId": "toolbar_02"
    //                                         }
    //                                     ]
    //                                 },
    //                                 {
    //                                     "id": "edit_save_1",
    //                                     "url": "resource/PROVINCE/batchUpdate",
    //                                     "urlType": "inner",
    //                                     "ajaxType": "put",
    //                                     "params": [
    //                                         {
    //                                             "name": "ID",
    //                                             "type": "componentValue",
    //                                             "valueName": "ID",
    //                                             "dataType": "string"
    //                                         },
    //                                         {
    //                                             "name": "PROVINCE_NAME",
    //                                             "type": "componentValue",
    //                                             "valueName": "PROVINCE_NAME",
    //                                             "dataType": "string"
    //                                         },
    //                                         {
    //                                             "name": "AREA_CODE",
    //                                             "type": "componentValue",
    //                                             "valueName": "AREA_CODE",
    //                                             "dataType": "string"
    //                                         },
    //                                         {
    //                                             "name": "DIRECTLY_UNDER",
    //                                             "type": "componentValue",
    //                                             "valueName": "DIRECTLY_UNDER",
    //                                             "dataType": "int"
    //                                         },
    //                                         {
    //                                             "name": "POPULATION",
    //                                             "type": "componentValue",
    //                                             "valueName": "POPULATION",
    //                                             "dataType": "int"
    //                                         }
    //                                     ],
    //                                     "outputParameters": [

    //                                     ],
    //                                     "result": [
    //                                         {
    //                                             "name": "data",
    //                                             "showMessageWithNext": 0,
    //                                             "message": "message.ajax.state.success",
    //                                             "senderId": "afterProvinceUpdateSuccessfully"
    //                                         },
    //                                         {
    //                                             "name": "validation",
    //                                             "message": "message.ajax.state.success",
    //                                             "senderId": "aftetProvinceUpdateValidation"
    //                                         },
    //                                         {
    //                                             "name": "error",
    //                                             "senderId": "toolbar_02"
    //                                         }
    //                                     ]
    //                                 },
    //                                 {
    //                                     "id": "form_add_province",
    //                                     "url": "resource/PROVINCE/insert",
    //                                     "urlType": "inner",
    //                                     "ajaxType": "post",
    //                                     "params": [
    //                                         {
    //                                             "name": "ID",
    //                                             "type": "GUID"
    //                                         },
    //                                         {
    //                                             "name": "PROVINCE_NAME",
    //                                             "type": "componentValue",
    //                                             "valueName": "PROVINCE_NAME",
    //                                             "dataType": "string"
    //                                         },
    //                                         {
    //                                             "name": "AREA_CODE",
    //                                             "type": "componentValue",
    //                                             "valueName": "AREA_CODE",
    //                                             "dataType": "string"
    //                                         },
    //                                         {
    //                                             "name": "DIRECTLY_UNDER",
    //                                             "type": "componentValue",
    //                                             "valueName": "DIRECTLY_UNDER",
    //                                             "dataType": "int"
    //                                         },
    //                                         {
    //                                             "name": "POPULATION",
    //                                             "type": "componentValue",
    //                                             "valueName": "POPULATION",
    //                                             "dataType": "int"
    //                                         }
    //                                         // {
    //                                         //     "name": "CREATE_DATE",
    //                                         //     "type": "componentValue",
    //                                         //     "valueName": "CREATE_DATE",
    //                                         //     "dataType": "string"
    //                                         // }
    //                                     ],
    //                                     "outputParameters": [

    //                                     ],
    //                                     "result": [
    //                                         {
    //                                             "name": "data",
    //                                             "showMessageWithNext": 0,
    //                                             "message": "message.ajax.state.success",
    //                                             "senderId": "afterProvinceFormSuccess"
    //                                         },
    //                                         {
    //                                             "name": "validation",
    //                                             "message": "message.ajax.state.validation",
    //                                             "senderId": "afterAddBusinessSubObjectValidation"
    //                                         },
    //                                         {
    //                                             "name": "error",
    //                                             "senderId": "toolbar_02"
    //                                         }
    //                                     ]
    //                                 },
    //                                 {
    //                                     "id": "form_edit_province",
    //                                     "url": "resource/PROVINCE/update",
    //                                     "urlType": "inner",
    //                                     "ajaxType": "put",
    //                                     "params": [
    //                                         {
    //                                             "name": "ID",
    //                                             "type": "tempValue",
    //                                             "valueName": "ID",
    //                                             "dataType": "string"
    //                                         },
    //                                         {
    //                                             "name": "PROVINCE_NAME",
    //                                             "type": "componentValue",
    //                                             "valueName": "PROVINCE_NAME",
    //                                             "dataType": "string"
    //                                         },
    //                                         {
    //                                             "name": "AREA_CODE",
    //                                             "type": "componentValue",
    //                                             "valueName": "AREA_CODE",
    //                                             "dataType": "string"
    //                                         },
    //                                         {
    //                                             "name": "DIRECTLY_UNDER",
    //                                             "type": "componentValue",
    //                                             "valueName": "DIRECTLY_UNDER",
    //                                             "dataType": "int"
    //                                         },
    //                                         {
    //                                             "name": "POPULATION",
    //                                             "type": "componentValue",
    //                                             "valueName": "POPULATION",
    //                                             "dataType": "int"
    //                                         },
    //                                     ],
    //                                     "outputParameters": [

    //                                     ],
    //                                     "result": [
    //                                         {
    //                                             "name": "data",
    //                                             "showMessageWithNext": 0,
    //                                             "message": "message.ajax.state.success",
    //                                             "senderId": "afterProvinceFormSuccess"
    //                                         },
    //                                         {
    //                                             "name": "validation",
    //                                             "message": "message.ajax.state.success",
    //                                             "senderId": "afterAddBusinessSubObjectValidation"
    //                                         },
    //                                         {
    //                                             "name": "error",
    //                                             "senderId": "toolbar_02"
    //                                         }
    //                                     ]
    //                                 }
    //                             ],
    //                             "beforeTrigger": [],
    //                             "afterTrigger": [
    //                                 {
    //                                     "id": "",
    //                                     "senderId": "view_01",
    //                                     "sendData": [
    //                                         {
    //                                             "beforeSend": [],
    //                                             "reveicerId": "",
    //                                             "receiverTriggerType": "BEHAVIOR",
    //                                             "receiverTrigger": "REFRESH_AS_CHILD",
    //                                             "params": [
    //                                                 {
    //                                                     "name": "parent_id",
    //                                                     "type": "item",
    //                                                     "valueName": "id"
    //                                                 },
    //                                                 {
    //                                                     "name": "parent_name",
    //                                                     "type": "item",
    //                                                     "valueName": "name"
    //                                                 }
    //                                             ]
    //                                         }
    //                                     ]
    //                                 }
    //                             ],
    //                             "toolbar": [
    //                                 {
    //                                     "targetViewId": "view_01",
    //                                     "group": [
    //                                         {
    //                                             "id": "M_refresh",
    //                                             "text": "刷新",
    //                                             "icon": "reload",
    //                                             "color": "primary",
    //                                             "hidden": false,
    //                                             "disabled": false,
    //                                             "execute": [
    //                                                 {
    //                                                     "triggerType": "BEHAVIOR",
    //                                                     "trigger": "REFRESH"
    //                                                 }
    //                                             ]
    //                                         },
    //                                         {
    //                                             "id": "M_addRow",
    //                                             "text": "新增",
    //                                             "icon": "plus",
    //                                             "color": "text-primary",
    //                                             "hidden": false,
    //                                             "disabled": false,
    //                                             "execute": [
    //                                                 {
    //                                                     "triggerType": "STATE",
    //                                                     "trigger": "ADD_ROW",
    //                                                     // "conditionId": "add_state_1"
    //                                                 }
    //                                             ]
    //                                         },
    //                                         {
    //                                             "id": "M_addRowForm",
    //                                             "text": "表单新增",
    //                                             "state": "new",
    //                                             "icon": "plus",
    //                                             "color": "text-primary",
    //                                             "hidden": false,
    //                                             "disabled": false,
    //                                             "execute": [
    //                                                 {
    //                                                     "triggerType": "ACTION",
    //                                                     "trigger": "DIALOG",
    //                                                     // "conditionId": "add_state_1",
    //                                                     "dialogId": "edit_province_form",
    //                                                     "ajaxId": "form_add_province",
    //                                                 }
    //                                             ]
    //                                         },
    //                                         {
    //                                             "id": "M_editRowForm",
    //                                             "text": "表单更新",
    //                                             "state": "edit",
    //                                             "icon": "edit",
    //                                             "color": "text-primary",
    //                                             "hidden": false,
    //                                             "disabled": false,
    //                                             "execute": [
    //                                                 {
    //                                                     "triggerType": "ACTION",
    //                                                     "trigger": "DIALOG",
    //                                                     // "conditionId": "add_state_1"
    //                                                     "dialogId": "edit_province_form",
    //                                                     "ajaxId": "form_edit_province",
    //                                                     "changeValueId": "edit_form_changeValue"
    //                                                 }
    //                                             ]
    //                                         },
    //                                         {
    //                                             "id": "M_updateRow",
    //                                             "text": "修改",
    //                                             "icon": "edit",
    //                                             "color": "text-success",
    //                                             "hidden": false,
    //                                             "disabled": false,
    //                                             "state": "text",
    //                                             "beforeExecute": [
    //                                                 {
    //                                                     "type": "component",
    //                                                     "valueName": "_CHECKED_ROW",
    //                                                     "expression": [
    //                                                         {
    //                                                             "type": "property",
    //                                                             "name": "length",
    //                                                             "match": "gt",
    //                                                             "matchValue": 0
    //                                                         }
    //                                                     ]

    //                                                 }
    //                                             ],
    //                                             "execute": [
    //                                                 {
    //                                                     "triggerType": "STATE",
    //                                                     "trigger": "EDIT_ROWS",
    //                                                     "conditionId": "edit_cities_state"
    //                                                 }
    //                                             ],
    //                                             "toggle": {
    //                                                 "type": "state",
    //                                                 "toggleProperty": "hidden",
    //                                                 "values": [
    //                                                     {
    //                                                         "name": "edit",
    //                                                         "value": true
    //                                                     },
    //                                                     {
    //                                                         "name": "text",
    //                                                         "value": false
    //                                                     }
    //                                                 ]
    //                                             }
    //                                         },
    //                                         {
    //                                             "id": "M_deleteRow",
    //                                             "text": "删除",
    //                                             "icon": "delete",
    //                                             "color": "text-red-light",
    //                                             "hidden": false,
    //                                             "disabled": false,
    //                                             "execute": [
    //                                                 {
    //                                                     "triggerType": "OPERATION",
    //                                                     "trigger": "EXECUTE_CHECKED_ROWS_IDS",
    //                                                     // "conditionId": "delete_operation_1",
    //                                                     // "ajaxId": "delete_row_1"
    //                                                 }
    //                                             ]
    //                                         },
    //                                         {
    //                                             "id": "M_saveRow",
    //                                             "text": "保存",
    //                                             "icon": "save",
    //                                             "color": "text-primary",
    //                                             "hidden": false,
    //                                             "disabled": false,
    //                                             "execute": [
    //                                                 {
    //                                                     "triggerType": "OPERATION",
    //                                                     "trigger": "SAVE_ROWS",
    //                                                     "ajaxId": "add_provinces_1",
    //                                                     // "stateId": "add_save_1",
    //                                                     "conditionId": "add_province_condition"
    //                                                 },
    //                                                 {
    //                                                     "triggerType": "OPERATION",
    //                                                     "trigger": "SAVE_ROWS",
    //                                                     "ajaxId": "edit_save_1",
    //                                                     // "stateId": "edit_save_1",
    //                                                     "conditionId": "edit_province_condition"
    //                                                 }
    //                                             ],
    //                                             // "toggle": {
    //                                             //     "type": "state",
    //                                             //     "toggleProperty": "hidden",
    //                                             //     "values": [
    //                                             //         {
    //                                             //             "name": "edit",
    //                                             //             "value": false
    //                                             //         },
    //                                             //         {
    //                                             //             "name": "text",
    //                                             //             "value": true
    //                                             //         },
    //                                             //         {
    //                                             //             "name": "new",
    //                                             //             "value": false
    //                                             //         }
    //                                             //     ]
    //                                             // }
    //                                         },
    //                                         {
    //                                             "id": "M_cancelrow",
    //                                             "text": "取消1",
    //                                             "state": "edit",
    //                                             "icon": "rollback",
    //                                             "color": "text-grey-darker",
    //                                             "hidden": true,
    //                                             "disabled": null,
    //                                             "execute": [
    //                                                 {
    //                                                     "triggerType": "STATE",
    //                                                     "trigger": "CANCEL_EDIT_ROWS",
    //                                                     "conditionId": "cancel_edit_rows_2"
    //                                                 },
    //                                                 {
    //                                                     "triggerType": "STATE",
    //                                                     "trigger": "CANCEL_NEW_ROWS"
    //                                                 }
    //                                             ],
    //                                             "toggle": {
    //                                                 "type": "state",
    //                                                 "toggleProperty": "hidden",
    //                                                 "values": [
    //                                                     {
    //                                                         "name": "edit",
    //                                                         "value": false
    //                                                     },
    //                                                     {
    //                                                         "name": "text",
    //                                                         "value": true
    //                                                     },
    //                                                     {
    //                                                         "name": "new",
    //                                                         "value": false
    //                                                     }
    //                                                 ]
    //                                             }
    //                                         }
    //                                     ]
    //                                 },
    //                                 {
    //                                     "targetViewId": "view_02",
    //                                     "group": [
    //                                         {
    //                                             "name": "M_addSearchRow",
    //                                             "text": "查询",
    //                                             "triggerType": "STATE",
    //                                             "trigger": "SEARCH_ROW",
    //                                             "actionName": "addSearchRow",
    //                                             "icon": "search",
    //                                             "color": "text-primary",
    //                                             "hidden": false,
    //                                             "disabled": false,
    //                                             "execute": [
    //                                                 {
    //                                                     "triggerType": "STATE",
    //                                                     "trigger": "SEARCH_ROW"
    //                                                 }
    //                                             ]
    //                                         },
    //                                         {
    //                                             "name": "M_cancelSearchRow",
    //                                             "text": "取消查询",
    //                                             "icon": "rollback",
    //                                             "triggerType": "STATE",
    //                                             "trigger": "CANCEL_SEARCH_ROW",
    //                                             "actionName": "cancelSearchRow",
    //                                             "color": "text-grey-darker",
    //                                             "hidden": false,
    //                                             "disabled": false,
    //                                             "execute": [
    //                                                 {
    //                                                     "triggerType": "STATE",
    //                                                     "trigger": "SEARCH_ROW"
    //                                                 }
    //                                             ],
    //                                         }
    //                                     ]
    //                                 }
    //                             ]
    //                         }
    //                     }
    //                 },
    //                 {
    //                     "id": "r5zDHB2-1",
    //                     "col": "cc",
    //                     "type": "col",
    //                     "title": "",
    //                     "span": 24,
    //                     "container": "component",
    //                     "size": {
    //                         "nzXs": 24,
    //                         "nzSm": 24,
    //                         "nzMd": 24,
    //                         "nzLg": 24,
    //                         "nzXl": 24,
    //                         "nzXXl": 24
    //                     },
    //                     "component": {
    //                         "id": "toolbar_002",
    //                         "component": "cnToolbar",
    //                         "size": "default",
    //                         "cascade": {
    //                             "messageSender": [
    //                                 {
    //                                     "id": "toolbar_02",
    //                                     "senderId": "view_02",
    //                                     "triggerType": "OPERATION",
    //                                     "trigger": "EXECUTE_CHECKED_ROWS",
    //                                     "triggerMoment": "after",
    //                                     "sendData": [
    //                                         {
    //                                             "beforeSend": {},
    //                                             "reveicerId": "",
    //                                             "receiverTriggerType": "BEHAVIOR",
    //                                             "receiverTrigger": "REFRESH_AS_CHILD",
    //                                             "params": [
    //                                                 {
    //                                                     "name": "parent_id",
    //                                                     "type": "item",
    //                                                     "valueName": "id"
    //                                                 },
    //                                                 {
    //                                                     "name": "parent_name",
    //                                                     "type": "item",
    //                                                     "valueName": "name"
    //                                                 }
    //                                             ]
    //                                         }
    //                                     ]
    //                                 }
    //                             ],
    //                             "messageReceiver": [
    //                                 {
    //                                     "id": "s_201",
    //                                     "senderId": "view_02",
    //                                     "receiveData": [
    //                                         {
    //                                             "triggerType": "STATE",
    //                                             "trigger": "STATE_TO_TEXT"
    //                                         }
    //                                     ]
    //                                 },
    //                                 {
    //                                     "id": "s_202",
    //                                     "senderId": "view_02",
    //                                     "receiveData": [
    //                                         {
    //                                             "triggerType": "STATE",
    //                                             "trigger": "STATE_TO_EDIT"
    //                                         }
    //                                     ]
    //                                 }

    //                             ]
    //                         },
    //                         "changeValue": [
    //                             {
    //                                 "id": "edit_form_changeValue",
    //                                 "params": [
    //                                     {
    //                                         "name": "id",
    //                                         "type": "item",
    //                                         "valueName": "id",
    //                                         "valueTo": "tempValue"
    //                                     }
    //                                 ]
    //                             }
    //                         ],
    //                         "dialog": [
    //                             {
    //                                 "id": "edit_city_form",
    //                                 "type": "confirm",
    //                                 "title": "数据编辑",
    //                                 "cancelText": "取消",
    //                                 "okText": "提交",
    //                                 "form": {
    //                                     "id": "form_city",
    //                                     "type": "form",
    //                                     "component": "form",
    //                                     state: 'text',
    //                                     loadingConfig: {
    //                                         id: "loadform" // 将加载配置引用
    //                                     },
    //                                     formLayout: {
    //                                         "id": "b86s2i11",
    //                                         "type": "layout",
    //                                         "title": "表单布局b86s2i",
    //                                         "rows": [
    //                                             {
    //                                                 "id": "MefhXa",
    //                                                 "type": "row",
    //                                                 // 行列，是否 显示。
    //                                                 "cols": [
    //                                                     {
    //                                                         "id": "iHspYn", "col": "cc", "type": "col",
    //                                                         "title": "列iHspYn", "span": 24,
    //                                                         "layoutContain": "input",
    //                                                         "size": {
    //                                                             "nzXs": 24, "nzSm": 24, "nzMd": 24, "nzLg": 24, "ngXl": 24, "nzXXl": 24
    //                                                         },
    //                                                         "control": {
    //                                                             "id": "city_name"  // id 和引用id 值相同
    //                                                         }
    //                                                     }
    //                                                 ]
    //                                             }]
    //                                     },
    //                                     formControls: [
    //                                         {
    //                                             id: 'city_name',
    //                                             "hidden": true, // 字段是否隐藏
    //                                             "title": '市名称',  // lable 信息
    //                                             "titleConfig": {
    //                                                 required: true
    //                                             },
    //                                             "field": "cityName",  // fromcontrol name  默认的字段
    //                                             "labelSize": {
    //                                                 "span": 6,
    //                                                 "nzXs": { span: 6 },
    //                                                 "nzSm": { span: 6 },
    //                                                 "nzMd": { span: 6 },
    //                                                 "nzLg": { span: 6 },
    //                                                 "ngXl": { span: 6 },
    //                                                 "nzXXl": { span: 6 }
    //                                             },  // 
    //                                             "controlSize": {
    //                                                 "span": 18,
    //                                                 "nzXs": 18,
    //                                                 "nzSm": 18,
    //                                                 "nzMd": 18,
    //                                                 "nzLg": 18,
    //                                                 "ngXl": 18,
    //                                                 "nzXXl": 18
    //                                             },
    //                                             "state": "edit", // 当前组件默认状态 文本，编辑，或者由表单状态控制text、edit、form
    //                                             "text": { // 文本展示字段
    //                                                 "type": 'label', // 什么组件展示文本 
    //                                                 "field": 'cityName',   // 字段
    //                                             },
    //                                             "editor": {            // 编辑状态字段  日后扩充可为数组，满足条件下的组件变化
    //                                                 "type": "input",
    //                                                 "field": "cityName",  // 编辑字段于定义字段一致 （此处定义于表格相反）
    //                                                 "placeholder": "请输入",
    //                                                 "validations": [  // 校验
    //                                                     { validator: "required", type: "default", "message": "请输入省名称" }
    //                                                 ]
    //                                             }
    //                                         },
    //                                         {
    //                                             id: 'city_id',
    //                                             "hidden": true, // 字段是否隐藏
    //                                             "title": '区号',  // lable 信息
    //                                             "titleConfig": {
    //                                                 required: false
    //                                             },
    //                                             "field": "id",  // fromcontrol name  默认的字段
    //                                             "labelSize": {
    //                                                 "span": 6,
    //                                                 "nzXs": 6, "nzSm": 6, "nzMd": 6, "nzLg": 6, "ngXl": 6, "nzXXl": 6
    //                                             },  // 
    //                                             "controlSize": {
    //                                                 "span": 18,
    //                                                 "nzXs": { span: 18, offset: 0 },
    //                                                 "nzSm": { span: 18, offset: 0 },
    //                                                 "nzMd": { span: 18, offset: 0 },
    //                                                 "nzLg": { span: 18, offset: 0 },
    //                                                 "ngXl": { span: 18, offset: 0 },
    //                                                 "nzXXl": { span: 18, offset: 0 }
    //                                             },
    //                                             "state": "edit", // 当前组件默认状态 文本，编辑，或者由表单状态控制 text、edit、form
    //                                             "text": { // 文本展示字段
    //                                                 "type": 'label', // 什么组件展示文本 
    //                                                 "field": 'id',   // 字段
    //                                             },
    //                                             "editor": {            // 编辑状态字段  日后扩充可为数组，满足条件下的组件变化
    //                                                 "type": "input",
    //                                                 "field": "id",  // 编辑字段于定义字段一致 （此处定义于表格相反）
    //                                                 "placeholder": "请输入",
    //                                                 "validations": [  // 校验

    //                                                 ]
    //                                             }
    //                                         },
    //                                         {
    //                                             id: 'city_pid',
    //                                             "hidden": true, // 字段是否隐藏
    //                                             "title": '区号',  // lable 信息
    //                                             "titleConfig": {
    //                                                 required: false
    //                                             },
    //                                             "field": "pId",  // fromcontrol name  默认的字段
    //                                             "labelSize": {
    //                                                 "span": 6,
    //                                                 "nzXs": 6, "nzSm": 6, "nzMd": 6, "nzLg": 6, "ngXl": 6, "nzXXl": 6
    //                                             },  // 
    //                                             "controlSize": {
    //                                                 "span": 18,
    //                                                 "nzXs": { span: 18, offset: 0 },
    //                                                 "nzSm": { span: 18, offset: 0 },
    //                                                 "nzMd": { span: 18, offset: 0 },
    //                                                 "nzLg": { span: 18, offset: 0 },
    //                                                 "ngXl": { span: 18, offset: 0 },
    //                                                 "nzXXl": { span: 18, offset: 0 }
    //                                             },
    //                                             "state": "edit", // 当前组件默认状态 文本，编辑，或者由表单状态控制 text、edit、form
    //                                             "text": { // 文本展示字段
    //                                                 "type": 'label', // 什么组件展示文本 
    //                                                 "field": 'pId',   // 字段
    //                                             },
    //                                             "editor": {            // 编辑状态字段  日后扩充可为数组，满足条件下的组件变化
    //                                                 "type": "input",
    //                                                 "field": "pId",  // 编辑字段于定义字段一致 （此处定义于表格相反）
    //                                                 "placeholder": "请输入",
    //                                                 "validations": [  // 校验

    //                                                 ]
    //                                             }
    //                                         }
    //                                     ],
    //                                     formControlsPermissions: [ // 初始表单字段，描述 新增、编辑、查看 状态下的文本
    //                                         {
    //                                             formState: "new", // 新增状态下的Controls 展示与否，是否读写属性设置
    //                                             formStateContent: { // 对当前状态的描述 ，描述当前状态下 表单组件 具备的行为，例如是否自加载，是否启用默认值
    //                                                 isLoad: false,
    //                                                 loadAjax: {}, // 如果启用load，是否用新的加载地址
    //                                                 isDefault: true
    //                                             },
    //                                             Controls: [
    //                                                 { id: 'city_name', state: "edit", hidden: false, readOnly: false }
    //                                             ]
    //                                         },
    //                                         {
    //                                             formState: "edit",
    //                                             Controls: [
    //                                                 { id: 'city_name', state: "edit", hidden: false, readOnly: false }
    //                                             ]
    //                                         },
    //                                         {
    //                                             formState: "text",
    //                                             Controls: [
    //                                                 { id: 'city_name', state: "text", hidden: false, readOnly: false }
    //                                             ]
    //                                         }

    //                                     ],
    //                                     ajaxConfig: [
    //                                         {
    //                                             "id": "loadform",
    //                                             "url": "/province/queryConditionA/CITY_SHEET",
    //                                             "urlType": "inner",
    //                                             "ajaxType": "get",
    //                                             "params": [
    //                                                 {
    //                                                     "name": "ID",
    //                                                     "type": "tempValue",
    //                                                     "valueName": "id"
    //                                                 }
    //                                             ],
    //                                             "outputParameters": [

    //                                             ],
    //                                             "result": [  // 描述 表单接收参数，将返回的哪些值赋给相应的组件属性

    //                                             ]
    //                                         }
    //                                     ]
    //                                 }
    //                             }
    //                         ],
    //                         "condition": [
    //                             {
    //                                 "id": "add_state_2",
    //                                 "state": [
    //                                     {
    //                                         "type": "component",
    //                                         "valueName": "ROWS_CHECKED",
    //                                         "expression": [
    //                                             {
    //                                                 "type": "property",
    //                                                 "name": "length",
    //                                                 "matchValue": 0,
    //                                                 "match": "gt"
    //                                             },
    //                                             {
    //                                                 "type": "element",
    //                                                 "name": "name",
    //                                                 "matchValue": "1",
    //                                                 "match": "eq",
    //                                             }
    //                                         ]
    //                                     }
    //                                 ]
    //                             },
    //                             {
    //                                 "id": "edit_state_2",
    //                                 "state": [
    //                                     {
    //                                         "type": "component",
    //                                         "valueName": "ROWS_CHECKED",
    //                                         "expression": [
    //                                             {
    //                                                 "type": "property",
    //                                                 "name": "length",
    //                                                 "matchValue": 0,
    //                                                 "match": "gt"
    //                                             }
    //                                         ]
    //                                     }
    //                                 ]
    //                             },
    //                             {
    //                                 "id": "city_condition_added_none",
    //                                 "state": [
    //                                     {
    //                                         "type": "component",
    //                                         "valueName": "ROWS_CHECKED",
    //                                         "expression": [
    //                                             {
    //                                                 "type": "property",
    //                                                 "name": "length",
    //                                                 "matchValue": 0,
    //                                                 "match": "gt"
    //                                             }
    //                                         ]
    //                                     },
    //                                     {
    //                                         "type": "component",
    //                                         "valueName": "ROWS_ADDED",
    //                                         "expression": [
    //                                             {
    //                                                 "type": "property",
    //                                                 "name": "length",
    //                                                 "matchValue": 0,
    //                                                 "match": "gt"
    //                                             }
    //                                         ]
    //                                     }
    //                                 ]
    //                             },
    //                             {
    //                                 "id": "city_condition_edited_none",
    //                                 "state": [
    //                                     {
    //                                         "type": "component",
    //                                         "valueName": "ROWS_EDITED",
    //                                         "expression": [
    //                                             {
    //                                                 "type": "property",
    //                                                 "name": "length",
    //                                                 "matchValue": 0,
    //                                                 "match": "gt"
    //                                             }
    //                                         ]
    //                                     },
    //                                     {
    //                                         "type": "component",
    //                                         "valueName": "ROWS_CHECKED",
    //                                         "expression": [
    //                                             {
    //                                                 "type": "property",
    //                                                 "name": "length",
    //                                                 "matchValue": 0,
    //                                                 "match": "gt"
    //                                             }
    //                                         ]
    //                                     }
    //                                 ]
    //                             },
    //                             {
    //                                 "id": "cancel_edit_rows_2_2",
    //                                 "state": [
    //                                     {
    //                                         "type": "component",
    //                                         "valueName": "ROWS_EDITED",
    //                                         "expression": [
    //                                             {
    //                                                 "type": "property",
    //                                                 "name": "length",
    //                                                 "matchValue": 0,
    //                                                 "match": "gt"
    //                                             }
    //                                         ]
    //                                     }
    //                                 ]
    //                             }
    //                         ],
    //                         "ajaxConfig": [
    //                             {
    //                                 "id": "form_add_city",
    //                                 "url": "city/insert",
    //                                 "urlType": "inner",
    //                                 "ajaxType": "post",
    //                                 "params": [
    //                                     {
    //                                         "name": "cityName",
    //                                         "type": "componentValue",
    //                                         "valueName": "cityName"
    //                                     },
    //                                     {
    //                                         "name": "zipCode",
    //                                         "type": "componentValue",
    //                                         "valueName": "zipCode"
    //                                     },
    //                                     {
    //                                         "name": "populationSize",
    //                                         "type": "componentValue",
    //                                         "valueName": "populationSize"
    //                                     },
    //                                     {
    //                                         "name": "directlyUnder",
    //                                         "type": "componentValue",
    //                                         "valueName": "directlyUnder"
    //                                     },
    //                                     {
    //                                         "name": "createDate",
    //                                         "type": "componentValue",
    //                                         "valueName": "createDate"
    //                                     },
    //                                     {
    //                                         "name": "pId",
    //                                         "type": "componentValue",
    //                                         "valueName": "pId"
    //                                     },
    //                                     {
    //                                         "name": "id",
    //                                         "type": "componentValue",
    //                                         "valueName": "id"
    //                                     }
    //                                 ],
    //                                 "outputParameters": [

    //                                 ],
    //                                 "result": [
    //                                     {
    //                                         "name": "data",
    //                                         "showMessageWithNext": 0,
    //                                         "message": "message.ajax.state.success",
    //                                         "senderId": "afterCitySaveSuccessfully"
    //                                     },
    //                                     {
    //                                         "name": "validation",
    //                                         "message": "message.ajax.state.success",
    //                                         "senderId": "afterCitySaveValidation"
    //                                     },
    //                                     {
    //                                         "name": "error",
    //                                         "senderId": "toolbar_02"
    //                                     }
    //                                 ]
    //                             },
    //                             {
    //                                 "id": "form_edit_city",
    //                                 "url": "city/update",
    //                                 "urlType": "inner",
    //                                 "ajaxType": "put",
    //                                 "params": [
    //                                     {
    //                                         "name": "cityName",
    //                                         "type": "componentValue",
    //                                         "valueName": "cityName"
    //                                     },
    //                                     {
    //                                         "name": "zipCode",
    //                                         "type": "componentValue",
    //                                         "valueName": "zipCode"
    //                                     },
    //                                     {
    //                                         "name": "populationSize",
    //                                         "type": "componentValue",
    //                                         "valueName": "populationSize"
    //                                     },
    //                                     {
    //                                         "name": "directlyUnder",
    //                                         "type": "componentValue",
    //                                         "valueName": "directlyUnder"
    //                                     },
    //                                     {
    //                                         "name": "createDate",
    //                                         "type": "componentValue",
    //                                         "valueName": "createDate"
    //                                     },
    //                                     {
    //                                         "name": "pId",
    //                                         "type": "componentValue",
    //                                         "valueName": "pId"
    //                                     },
    //                                     {
    //                                         "name": "id",
    //                                         "type": "componentValue",
    //                                         "valueName": "id"
    //                                     }
    //                                 ],
    //                                 "outputParameters": [

    //                                 ],
    //                                 "result": [
    //                                     {
    //                                         "name": "data",
    //                                         "showMessageWithNext": 0,
    //                                         "message": "message.ajax.state.success",
    //                                         "senderId": "afterCityUpdateFormSuccessfully"
    //                                     },
    //                                     {
    //                                         "name": "validation",
    //                                         "showMessageWithNext": 0,
    //                                         "message": "message.ajax.state.success",
    //                                         "senderId": "afterCityUpdateFormValidation"
    //                                     },
    //                                     {
    //                                         "name": "error",
    //                                         "senderId": "toolbar_02"
    //                                     }
    //                                 ]
    //                             },
    //                             {
    //                                 "id": "add_cities_1",
    //                                 "url": "city/insertMany",
    //                                 "urlType": "inner",
    //                                 "ajaxType": "post",
    //                                 "params": [
    //                                     {
    //                                         "name": "cityName",
    //                                         "type": "componentValue",
    //                                         "valueName": "cityName"
    //                                     },
    //                                     {
    //                                         "name": "zipCode",
    //                                         "type": "componentValue",
    //                                         "valueName": "zipCode"
    //                                     },
    //                                     {
    //                                         "name": "populationSize",
    //                                         "type": "componentValue",
    //                                         "valueName": "populationSize"
    //                                     },
    //                                     {
    //                                         "name": "directlyUnder",
    //                                         "type": "componentValue",
    //                                         "valueName": "directlyUnder"
    //                                     },
    //                                     {
    //                                         "name": "createDate",
    //                                         "type": "componentValue",
    //                                         "valueName": "createDate"
    //                                     },
    //                                     {
    //                                         "name": "pId",
    //                                         "type": "tempValue",
    //                                         "valueName": "_PID"
    //                                     },
    //                                     {
    //                                         "name": "id",
    //                                         "type": "componentValue",
    //                                         "valueName": "id"
    //                                     }
    //                                 ],
    //                                 "outputParameters": [

    //                                 ],
    //                                 "result": [
    //                                     {
    //                                         "name": "data",
    //                                         "showMessageWithNext": 0,
    //                                         "message": "message.ajax.state.success",
    //                                         "senderId": "afterCitySaveSuccessfully"
    //                                     },
    //                                     {
    //                                         "name": "validation",
    //                                         "message": "message.ajax.state.success",
    //                                         "senderId": "afterCitySaveValidation"
    //                                     },
    //                                     {
    //                                         "name": "error",
    //                                         "senderId": "toolbar_02"
    //                                     }
    //                                 ]
    //                             },
    //                             {
    //                                 "id": "edit_cities_1",
    //                                 "url": "city/updateMany",
    //                                 "urlType": "inner",
    //                                 "ajaxType": "put",
    //                                 "params": [
    //                                     {
    //                                         "name": "cityName",
    //                                         "type": "componentValue",
    //                                         "valueName": "cityName"
    //                                     },
    //                                     {
    //                                         "name": "zipCode",
    //                                         "type": "componentValue",
    //                                         "valueName": "zipCode"
    //                                     },
    //                                     {
    //                                         "name": "populationSize",
    //                                         "type": "componentValue",
    //                                         "valueName": "populationSize"
    //                                     },
    //                                     {
    //                                         "name": "directlyUnder",
    //                                         "type": "componentValue",
    //                                         "valueName": "directlyUnder"
    //                                     },
    //                                     {
    //                                         "name": "createDate",
    //                                         "type": "componentValue",
    //                                         "valueName": "createDate"
    //                                     },
    //                                     {
    //                                         "name": "pId",
    //                                         "type": "tempValue",
    //                                         "valueName": "_PID"
    //                                     },
    //                                     {
    //                                         "name": "id",
    //                                         "type": "componentValue",
    //                                         "valueName": "id"
    //                                     }
    //                                 ],
    //                                 "outputParameters": [

    //                                 ],
    //                                 "result": [
    //                                     {
    //                                         "name": "data",
    //                                         "showMessageWithNext": 0,
    //                                         "message": "message.ajax.state.success",
    //                                         "senderId": "afterCityUpdateSuccessfully"
    //                                     },
    //                                     {
    //                                         "name": "validation",
    //                                         "showMessageWithNext": 0,
    //                                         "message": "message.ajax.state.success",
    //                                         "senderId": "afterCityUpdateValidation"
    //                                     },
    //                                     {
    //                                         "name": "error",
    //                                         "senderId": "toolbar_02"
    //                                     }
    //                                 ]
    //                             }
    //                         ],
    //                         "beforeTrigger": [

    //                         ],
    //                         "afterTrigger": [
    //                             {
    //                                 "id": "",
    //                                 "senderId": "view_02",
    //                                 "sendData": [
    //                                     {
    //                                         "beforeSend": [],
    //                                         "reveicerId": "",
    //                                         "receiverTriggerType": "BEHAVIOR",
    //                                         "receiverTrigger": "REFRESH_AS_CHILD",
    //                                         "params": [
    //                                             {
    //                                                 "name": "parent_id",
    //                                                 "type": "item",
    //                                                 "valueName": "id"
    //                                             },
    //                                             {
    //                                                 "name": "parent_name",
    //                                                 "type": "item",
    //                                                 "valueName": "name"
    //                                             }
    //                                         ]
    //                                     }
    //                                 ]
    //                             }
    //                         ],
    //                         "toolbar": [
    //                             {
    //                                 "targetViewId": "view_02",
    //                                 "group": [
    //                                     {
    //                                         "id": "M_refresh",
    //                                         "text": "刷新",
    //                                         "icon": "reload",
    //                                         "color": "text-primary",
    //                                         "hidden": false,
    //                                         "disabled": false,
    //                                         "execute": [
    //                                             {
    //                                                 "triggerType": "BEHAVIOR",
    //                                                 "trigger": "REFRESH"
    //                                             }
    //                                         ]
    //                                     },
    //                                     {
    //                                         "id": "M_addRow",
    //                                         "text": "新增",
    //                                         "icon": "plus",
    //                                         "color": "text-primary",
    //                                         "hidden": false,
    //                                         "disabled": false,
    //                                         "execute": [
    //                                             {
    //                                                 "triggerType": "STATE",
    //                                                 "trigger": "ADD_ROW",
    //                                                 // "conditionId": "add_state_1"
    //                                             }
    //                                         ]
    //                                     },
    //                                     {
    //                                         "id": "M_updateRow",
    //                                         "text": "修改",
    //                                         "icon": "edit",
    //                                         "color": "text-success",
    //                                         "hidden": false,
    //                                         "disabled": false,
    //                                         "state": "text",
    //                                         "execute": [
    //                                             {
    //                                                 "triggerType": "STATE",
    //                                                 "trigger": "EDIT_ROWS",
    //                                                 // "conditionId": "edit_state_1"
    //                                             }
    //                                         ],
    //                                         "toggle": {
    //                                             "type": "state",
    //                                             "toggleProperty": "hidden",
    //                                             "values": [
    //                                                 {
    //                                                     "name": "edit",
    //                                                     "value": true
    //                                                 },
    //                                                 {
    //                                                     "name": "text",
    //                                                     "value": false
    //                                                 }
    //                                             ]
    //                                         }
    //                                     },
    //                                     {
    //                                         "id": "M_addRowForm",
    //                                         "text": "表单新增",
    //                                         "state": "new",
    //                                         "icon": "plus",
    //                                         "color": "text-primary",
    //                                         "hidden": false,
    //                                         "disabled": false,
    //                                         "execute": [
    //                                             {
    //                                                 "triggerType": "ACTION",
    //                                                 "trigger": "DIALOG",
    //                                                 // "conditionId": "add_state_1"
    //                                                 "dialogId": "edit_city_form",
    //                                                 "ajaxId": "form_add_city",
    //                                             }
    //                                         ]
    //                                     },
    //                                     {
    //                                         "id": "M_editRowForm",
    //                                         "text": "表单更新",
    //                                         "state": "edit",
    //                                         "icon": "edit",
    //                                         "color": "text-primary",
    //                                         "hidden": false,
    //                                         "disabled": false,
    //                                         "execute": [
    //                                             {
    //                                                 "triggerType": "ACTION",
    //                                                 "trigger": "DIALOG",
    //                                                 // "conditionId": "add_state_1"
    //                                                 "dialogId": "edit_city_form",
    //                                                 "ajaxId": "form_edit_city",
    //                                                 "changeValueId": "edit_form_changeValue"
    //                                             }
    //                                         ]
    //                                     },
    //                                     {
    //                                         "id": "M_deleteRow",
    //                                         "text": "删除",
    //                                         "icon": "delete",
    //                                         "color": "text-red-light",
    //                                         "hidden": false,
    //                                         "disabled": false,
    //                                         "execute": [
    //                                             {
    //                                                 "triggerType": "OPERATION",
    //                                                 "trigger": "EXECUTE_CHECKED_ROWS_IDS",
    //                                                 "conditionId": "delete_operation_2",
    //                                                 "ajaxId": "delete_row_2"
    //                                             }
    //                                         ]
    //                                     },
    //                                     {
    //                                         "id": "M_saveRow",
    //                                         "text": "保存",
    //                                         "state": "edit",
    //                                         "icon": "save",
    //                                         "color": "text-primary",
    //                                         "hidden": true,
    //                                         "disabled": false,
    //                                         "execute": [
    //                                             {
    //                                                 "triggerType": "OPERATION",
    //                                                 "trigger": "SAVE_ROWS",
    //                                                 "ajaxId": "add_cities_1",
    //                                                 // "stateId": "add_save_1",
    //                                                 "conditionId": "city_condition_added_none"
    //                                             },
    //                                             {
    //                                                 "triggerType": "OPERATION",
    //                                                 "trigger": "SAVE_ROWS",
    //                                                 "ajaxId": "edit_cities_1",
    //                                                 // "stateId": "edit_save_1",
    //                                                 "conditionId": "city_condition_edited_none"
    //                                             }
    //                                         ],
    //                                         "toggle": {
    //                                             "type": "state",
    //                                             "toggleProperty": "hidden",
    //                                             "values": [
    //                                                 {
    //                                                     "name": "edit",
    //                                                     "value": false
    //                                                 },
    //                                                 {
    //                                                     "name": "text",
    //                                                     "value": true
    //                                                 },
    //                                                 {
    //                                                     "name": "new",
    //                                                     "value": false
    //                                                 }
    //                                             ]
    //                                         }
    //                                     },
    //                                     {
    //                                         "id": "M_cancelrow",
    //                                         "text": "取消1",
    //                                         "state": "edit",
    //                                         "icon": "rollback",
    //                                         "color": "text-grey-darker",
    //                                         "hidden": true,
    //                                         "disabled": null,
    //                                         "execute": [
    //                                             {
    //                                                 "triggerType": "STATE",
    //                                                 "trigger": "CANCEL_EDIT_ROWS",
    //                                                 "conditionId": "cancel_edit_rows_2_2"
    //                                             },
    //                                             {
    //                                                 "triggerType": "STATE",
    //                                                 "trigger": "CANCEL_NEW_ROWS"
    //                                             }
    //                                         ],
    //                                         "toggle": {
    //                                             "type": "state",
    //                                             "toggleProperty": "hidden",
    //                                             "values": [
    //                                                 {
    //                                                     "name": "edit",
    //                                                     "value": false
    //                                                 },
    //                                                 {
    //                                                     "name": "text",
    //                                                     "value": true
    //                                                 },
    //                                                 {
    //                                                     "name": "new",
    //                                                     "value": false
    //                                                 }
    //                                             ]
    //                                         }
    //                                     }
    //                                 ]
    //                             },
    //                             {
    //                                 "targetViewId": "view_02",
    //                                 "group": [
    //                                     {
    //                                         "name": "M_addSearchRow",
    //                                         "text": "查询",
    //                                         "triggerType": "STATE",
    //                                         "trigger": "SEARCH_ROW",
    //                                         "actionName": "addSearchRow",
    //                                         "icon": "search",
    //                                         "color": "text-primary",
    //                                         "hidden": false,
    //                                         "disabled": false,
    //                                         "execute": [
    //                                             {
    //                                                 "triggerType": "STATE",
    //                                                 "trigger": "SEARCH_ROW"
    //                                             }
    //                                         ]
    //                                     },
    //                                     {
    //                                         "name": "M_cancelSearchRow",
    //                                         "text": "取消查询",
    //                                         "icon": "rollback",
    //                                         "triggerType": "STATE",
    //                                         "trigger": "CANCEL_SEARCH_ROW",
    //                                         "actionName": "cancelSearchRow",
    //                                         "color": "text-grey-darker",
    //                                         "hidden": false,
    //                                         "disabled": false,
    //                                         "execute": [
    //                                             {
    //                                                 "triggerType": "STATE",
    //                                                 "trigger": "SEARCH_ROW"
    //                                             }
    //                                         ],
    //                                     }
    //                                 ]
    //                             }
    //                         ]
    //                     }
    //                 },
    //                 {
    //                     "id": "r5zDHB2-1",
    //                     "col": "cc",
    //                     "type": "col",
    //                     "title": "",
    //                     "span": 24,
    //                     "container": "component",
    //                     "size": {
    //                         "nzXs": 24,
    //                         "nzSm": 24,
    //                         "nzMd": 24,
    //                         "nzLg": 24,
    //                         "nzXl": 24,
    //                         "nzXXl": 24
    //                     },
    //                     "component": {
    //                         "id": "view_02",
    //                         "title": "子表",
    //                         "titleIcon": "right-circle",
    //                         "component": "cnDataTable",
    //                         "keyId": "id",
    //                         "size": "middle",
    //                         "isBordered": true,
    //                         "isFrontPagination": false,
    //                         "isPagination": true,
    //                         "isShowSizeChanger": true,
    //                         "showTotal": true,
    //                         "pageSize": 5,
    //                         "showCheckBox": true,
    //                         "pageSizeOptions": [10, 20, 50, 100],
    //                         "loadingOnInit": false,
    //                         "loadingConfig": {
    //                             "url": "resource/GET_CITY_LIST/query",
    //                             "method": "get",
    //                             "params": [
    //                                 {
    //                                     "name": "pid",
    //                                     "type": "tempValue",
    //                                     "valueName": "_PID"
    //                                 }
    //                             ],
    //                             "filter": [

    //                             ]
    //                         },
    //                         "columns": [
    //                             {
    //                                 "title": "id",
    //                                 "type": "field",
    //                                 "field": "ID",
    //                                 "hidden": true,
    //                                 "showFilter": false,
    //                                 "showSort": false,
    //                                 "isShowExpand": false,
    //                                 "width": "50px",
    //                                 "style": {}
    //                             },
    //                             {
    //                                 "title": "PID",
    //                                 "type": "field",
    //                                 "field": "PID",
    //                                 "hidden": true,
    //                                 "showFilter": false,
    //                                 "showSort": false,
    //                                 "isShowExpand": false,
    //                                 "width": "50px",
    //                                 "style": {}
    //                             },
    //                             {
    //                                 "title": "城市名称",
    //                                 "type": "field",
    //                                 "field": "CITY_NAME",
    //                                 "hidden": false,
    //                                 "showFilter": false,
    //                                 "showSort": false,
    //                                 "width": "100px",
    //                                 "style": {},
    //                             },
    //                             {
    //                                 "title": "所属省份",
    //                                 "type": "field",
    //                                 "field": "PROVINCE_NAME",
    //                                 "hidden": false,
    //                                 "showFilter": false,
    //                                 "showSort": false,
    //                                 "width": "100px",
    //                                 "style": {},
    //                             },
    //                             {
    //                                 "title": "邮编",
    //                                 "type": "field",
    //                                 "field": "ZIP_CODE",
    //                                 "hidden": false,
    //                                 "showFilter": false,
    //                                 "showSort": false,
    //                                 "width": "100px",
    //                                 "style": {},
    //                             },
    //                             {
    //                                 "title": "人口数量",
    //                                 "type": "field",
    //                                 "field": "POPULATION",
    //                                 "hidden": false,
    //                                 "showFilter": false,
    //                                 "showSort": false,
    //                                 "width": "100px",
    //                                 "style": {},
    //                             },
    //                             {
    //                                 "title": "是否直辖市",
    //                                 "type": "field",
    //                                 "field": "DIRECTLY_UNDER",
    //                                 "hidden": false,
    //                                 "showFilter": false,
    //                                 "showSort": false,
    //                                 "width": "100px",
    //                                 "style": {},
    //                             },
    //                             {
    //                                 "title": "创建时间",
    //                                 "type": "field",
    //                                 "field": "CREATE_DATE",
    //                                 "hidden": false,
    //                                 "showFilter": false,
    //                                 "showSort": false,
    //                                 "width": "100px",
    //                                 "style": {},
    //                             },
    //                             {
    //                                 "title": "ACTION",
    //                                 "type": "action",
    //                                 "width": "150px",
    //                                 "actionIds": [
    //                                     "city_new_row", "city_cancel_new_row", "city_edit", "city_save", "city_cancel", "city_delete"
    //                                 ]
    //                             }
    //                         ],
    //                         "rowActions": [
    //                             {
    //                                 "id": "city_new_row",
    //                                 "state": "new",
    //                                 "text": "保存",
    //                                 "icon": "save",
    //                                 "color": "text-primary",
    //                                 "type": "link",
    //                                 "size": "small",
    //                                 "hidden": false,
    //                                 "execute": [
    //                                     {
    //                                         "triggerType": "OPERATION",
    //                                         "trigger": "SAVE_ROW",
    //                                         "ajaxId": "add_city_1",
    //                                         // "stateId": "add_save_1",
    //                                         // "conditionId": "add_save_1"
    //                                     }
    //                                 ],
    //                                 "toggle": {
    //                                     "type": "state",
    //                                     "toggleProperty": "hidden",
    //                                     "values": [
    //                                         {
    //                                             "name": "new",
    //                                             "value": false
    //                                         },
    //                                         {
    //                                             "name": "text",
    //                                             "value": true
    //                                         }
    //                                     ]
    //                                 }
    //                             },
    //                             {
    //                                 "id": "city_cancel_new_row",
    //                                 "state": "new",
    //                                 "text": "取消",
    //                                 "icon": "rollback",
    //                                 "color": "text-primary",
    //                                 "type": "link",
    //                                 "size": "small",
    //                                 "hidden": false,
    //                                 "execute": [
    //                                     {
    //                                         "triggerType": "STATE",
    //                                         "trigger": "CANCEL_NEW_ROW",
    //                                         // "ajaxId": "add_save_1",
    //                                         // "stateId": "add_save_1",
    //                                         // "conditionId": "add_save_1"
    //                                     }
    //                                 ],
    //                                 "toggle": {
    //                                     "type": "state",
    //                                     "toggleProperty": "hidden",
    //                                     "values": [
    //                                         {
    //                                             "name": "new",
    //                                             "value": false
    //                                         },
    //                                         {
    //                                             "name": "text",
    //                                             "value": true
    //                                         }
    //                                     ]
    //                                 }
    //                             },
    //                             {
    //                                 "id": "city_edit",
    //                                 "state": "text",
    //                                 "text": "编辑",
    //                                 "icon": "save",
    //                                 "color": "text-primary",
    //                                 "type": "link",
    //                                 "size": "small",
    //                                 "hidden": false,
    //                                 "execute": [
    //                                     {
    //                                         "triggerType": "STATE",
    //                                         "trigger": "EDIT_ROW"
    //                                     }
    //                                 ],
    //                                 "toggle": {
    //                                     "type": "state",
    //                                     "toggleProperty": "hidden",
    //                                     "values": [
    //                                         {
    //                                             "name": "edit",
    //                                             "value": true
    //                                         },
    //                                         {
    //                                             "name": "text",
    //                                             "value": false
    //                                         }
    //                                     ]
    //                                 }
    //                             },
    //                             {
    //                                 "id": "city_save",
    //                                 "text": "保存",
    //                                 "state": "text",
    //                                 "icon": "save",
    //                                 "color": "text-primary",
    //                                 "type": "link",
    //                                 "size": "small",
    //                                 "hidden": true,
    //                                 "execute": [
    //                                     {
    //                                         "triggerType": "OPERATION",
    //                                         "trigger": "SAVE_ROW",
    //                                         "ajaxId": "edit_city_1",
    //                                         // "stateId": "add_save_1",
    //                                         // "conditionId": "add_save_1"
    //                                     }
    //                                 ],
    //                                 "toggle": {
    //                                     "type": "state",
    //                                     "toggleProperty": "hidden",
    //                                     "values": [
    //                                         {
    //                                             "name": "edit",
    //                                             "value": false
    //                                         },
    //                                         {
    //                                             "name": "text",
    //                                             "value": true
    //                                         }
    //                                     ]
    //                                 }
    //                             },
    //                             {
    //                                 "id": "city_cancel",
    //                                 "state": "text",
    //                                 "text": "取消",
    //                                 "icon": "rollback",
    //                                 "color": "text-primary",
    //                                 "type": "link",
    //                                 "size": "small",
    //                                 "hidden": true,
    //                                 "execute": [
    //                                     {
    //                                         "triggerType": "STATE",
    //                                         "trigger": "CANCEL_EDIT_ROW"
    //                                     }
    //                                 ],
    //                                 "toggle": {
    //                                     "type": "state",
    //                                     "toggleProperty": "hidden",
    //                                     "values": [
    //                                         {
    //                                             "name": "edit",
    //                                             "value": false
    //                                         },
    //                                         {
    //                                             "name": "text",
    //                                             "value": true
    //                                         }
    //                                     ]
    //                                 }
    //                             },
    //                             {
    //                                 "id": "city_delete",
    //                                 "text": "删除",
    //                                 "state": "text",
    //                                 "icon": "delete",
    //                                 "type": "link",
    //                                 "color": "primary",
    //                                 "size": "small",
    //                                 "hidden": false,
    //                                 "execute": [
    //                                     {
    //                                         "triggerType": "OPERATION",
    //                                         "trigger": "EXECUTE_SELECTED_ROW",
    //                                         // "conditionId": "delete_operation_1",
    //                                         "ajaxId": "city_delete_1"
    //                                     }
    //                                 ]
    //                             }
    //                         ],
    //                         "cascade": {
    //                             "messageSender": [
    //                                 {
    //                                     "id": "view2_sender_1",
    //                                     "senderId": "view_02",
    //                                     "triggerType": "OPERATION",
    //                                     "trigger": "SAVE_ROW",
    //                                     "triggerMoment": "asyncAfter",
    //                                     "sendData": [
    //                                         {
    //                                             "reveicerId": "",
    //                                             "receiverTriggerType": "STATE",
    //                                             "receiverTrigger": "STATE_TO_TEXT",
    //                                             "params": [
    //                                                 {
    //                                                     "name": "targetViewId",
    //                                                     "value": "view_02",
    //                                                     "type": "value"
    //                                                 }
    //                                             ]
    //                                         }
    //                                     ]
    //                                 },
    //                                 {
    //                                     "id": "view2_sender_2",
    //                                     "senderId": "view_02",
    //                                     "triggerType": "OPERATION",
    //                                     "trigger": "SAVE_ROWS",
    //                                     "triggerMoment": "asyncAfter",
    //                                     "sendData": [
    //                                         {
    //                                             "reveicerId": "",
    //                                             "receiverTriggerType": "STATE",
    //                                             "receiverTrigger": "STATE_TO_TEXT",
    //                                             "params": [
    //                                                 {
    //                                                     "name": "targetViewId",
    //                                                     "value": "view_02",
    //                                                     "type": "value"
    //                                                 }
    //                                             ]
    //                                         }
    //                                     ]
    //                                 },
    //                                 {
    //                                     "id": "view2_sender_3",
    //                                     "senderId": "view_02",
    //                                     "triggerType": "STATE",
    //                                     "trigger": "CANCEL_EDIT_ROW",
    //                                     "triggerMoment": "after",
    //                                     "sendData": [
    //                                         {
    //                                             "reveicerId": "",
    //                                             "receiverTriggerType": "STATE",
    //                                             "receiverTrigger": "STATE_TO_TEXT",
    //                                             "conditionId": "cancel_edit_cities",
    //                                             "params": [
    //                                                 {
    //                                                     "name": "targetViewId",
    //                                                     "value": "view_02",
    //                                                     "type": "value"
    //                                                 }
    //                                             ]
    //                                         }
    //                                     ]
    //                                 },
    //                                 {
    //                                     "id": "view2_sender_04",
    //                                     "senderId": "view_02",
    //                                     "triggerType": "STATE",
    //                                     "trigger": "CANCEL_NEW_ROW",
    //                                     "triggerMoment": "after",
    //                                     "sendData": [
    //                                         {
    //                                             "reveicerId": "",
    //                                             "receiverTriggerType": "STATE",
    //                                             "receiverTrigger": "STATE_TO_TEXT",
    //                                             "conditionId": "cancel_add_cities",
    //                                             "params": [
    //                                                 {
    //                                                     "name": "targetViewId",
    //                                                     "value": "view_02",
    //                                                     "type": "value"
    //                                                 }
    //                                             ]
    //                                         }
    //                                     ]
    //                                 },
    //                                 {
    //                                     "id": "grid_sender_05",
    //                                     "senderId": "view_02",
    //                                     "triggerType": "STATE",
    //                                     "trigger": "EDIT_ROW",
    //                                     "triggerMoment": "after",
    //                                     "sendData": [
    //                                         {
    //                                             "reveicerId": "",
    //                                             "receiverTriggerType": "STATE",
    //                                             "receiverTrigger": "STATE_TO_EDIT",
    //                                             "params": [
    //                                                 {
    //                                                     "name": "targetViewId",
    //                                                     "value": "view_02",
    //                                                     "type": "value"
    //                                                 }
    //                                             ]
    //                                         }
    //                                     ]
    //                                 },
    //                                 {
    //                                     "id": "grid_sender_08",
    //                                     "senderId": "view_02",
    //                                     "triggerType": "ACTION",
    //                                     "trigger": "CONFIRM",
    //                                     "triggerMoment": "after",
    //                                     "sendData": [
    //                                         {
    //                                             "reveicerId": "",
    //                                             "receiverTriggerType": "STATE",
    //                                             "receiverTrigger": "STATE_TO_TEXT",
    //                                             "params": [
    //                                                 {
    //                                                     "name": "targetViewId",
    //                                                     "value": "view_01",
    //                                                     "type": "value"
    //                                                 }
    //                                             ]
    //                                         }
    //                                     ]
    //                                 },
    //                                 {
    //                                     "id": "afterCitySaveSuccessfully",
    //                                     "senderId": "view_02",
    //                                     // "triggerType": "ACTION",
    //                                     // "trigger": "MESSAGE0",
    //                                     // "triggerMoment": "after",
    //                                     "sendData": [
    //                                         {
    //                                             "beforeSend": {},
    //                                             "reveicerId": "",
    //                                             "receiverTriggerType": "ACTION",
    //                                             "receiverTrigger": "MESSAGE",
    //                                             "params": [
    //                                                 {
    //                                                     "name": "type",
    //                                                     "type": "value",
    //                                                     "value": "success"
    //                                                 },
    //                                                 {
    //                                                     "name": "message",
    //                                                     "type": "value",
    //                                                     "value": "操作完成!"
    //                                                 },
    //                                             ]
    //                                         },
    //                                         {
    //                                             "beforeSend": {},
    //                                             "reveicerId": "",
    //                                             "receiverTriggerType": "ACTION",
    //                                             "receiverTrigger": "CHANGE_ADDED_ROWS_TO_TEXT",
    //                                             "params": [
    //                                                 {
    //                                                     "name": "id",
    //                                                     "type": "addedRows",
    //                                                     "valueName": "id"
    //                                                 }
    //                                             ]
    //                                         }
    //                                     ]
    //                                 },
    //                                 {
    //                                     "id": "afterCityUpdateSuccessfully",
    //                                     "senderId": "view_02",
    //                                     // "triggerType": "ACTION",
    //                                     // "trigger": "MESSAGE0",
    //                                     // "triggerMoment": "after",
    //                                     "sendData": [
    //                                         {
    //                                             "beforeSend": {},
    //                                             "reveicerId": "",
    //                                             "receiverTriggerType": "ACTION",
    //                                             "receiverTrigger": "MESSAGE",
    //                                             "params": [
    //                                                 {
    //                                                     "name": "type",
    //                                                     "type": "value",
    //                                                     "value": "success"
    //                                                 },
    //                                                 {
    //                                                     "name": "message",
    //                                                     "type": "value",
    //                                                     "value": "操作完成!"
    //                                                 },
    //                                             ]
    //                                         },
    //                                         {
    //                                             "beforeSend": {},
    //                                             "reveicerId": "",
    //                                             "receiverTriggerType": "ACTION",
    //                                             "receiverTrigger": "CHANGE_EDITED_ROWS_TO_TEXT",
    //                                             "params": [
    //                                                 {
    //                                                     "name": "id",
    //                                                     "type": "editedRows",
    //                                                     "valueName": "id"
    //                                                 }
    //                                             ]
    //                                         }
    //                                     ]
    //                                 },
    //                                 {
    //                                     "id": "afterCitySaveValidation",
    //                                     "senderId": "view_02",
    //                                     "sendData": [
    //                                         {
    //                                             "beforeSend": {},
    //                                             "reveicerId": "",
    //                                             "receiverTriggerType": "ACTION",
    //                                             "receiverTrigger": "SHOW_INVALIDATE_ADDED_ROWS"
    //                                         }
    //                                     ]
    //                                 },
    //                                 {
    //                                     "id": "afterCityUpdateValidation",
    //                                     "senderId": "view_02",
    //                                     "sendData": [
    //                                         {
    //                                             "beforeSend": {},
    //                                             "reveicerId": "",
    //                                             "receiverTriggerType": "ACTION",
    //                                             "receiverTrigger": "SHOW_INVALIDATE_EDITED_ROWS"
    //                                         }
    //                                     ]
    //                                 },
    //                                 {
    //                                     "id": "afterCityUpdateFormSuccessfully",
    //                                     "senderId": "view_02",
    //                                     // "triggerType": "ACTION",
    //                                     // "trigger": "MESSAGE0",
    //                                     // "triggerMoment": "after",
    //                                     "sendData": [
    //                                         {
    //                                             "beforeSend": {},
    //                                             "reveicerId": "",
    //                                             "receiverTriggerType": "ACTION",
    //                                             "receiverTrigger": "MESSAGE",
    //                                             "params": [
    //                                                 {
    //                                                     "name": "type",
    //                                                     "type": "value",
    //                                                     "value": "success"
    //                                                 },
    //                                                 {
    //                                                     "name": "code",
    //                                                     "type": "value",
    //                                                     "value": "operation..code.success"
    //                                                 }
    //                                             ]
    //                                         },
    //                                         {
    //                                             "beforeSend": {},
    //                                             "reveicerId": "",
    //                                             "receiverTriggerType": "ACTION",
    //                                             "receiverTrigger": "LOAD_REFRESH_DATA",
    //                                             "params": [
    //                                                 {
    //                                                     "name": "id",
    //                                                     "type": "addedRows",
    //                                                     "valueName": "id"
    //                                                 }
    //                                             ]
    //                                         }
    //                                     ]
    //                                 },
    //                                 {
    //                                     "id": "afterCityUpdateFormValidation",
    //                                     "senderId": "view_02",
    //                                     "sendData": [
    //                                         {
    //                                             "beforeSend": {},
    //                                             "reveicerId": "",
    //                                             "receiverTriggerType": "ACTION",
    //                                             "receiverTrigger": "MESSAGE",
    //                                             "params": [
    //                                                 {
    //                                                     "name": "type",
    //                                                     "type": "value",
    //                                                     "value": "warning"
    //                                                 },
    //                                                 {
    //                                                     "name": "message",
    //                                                     "type": "validation",
    //                                                     "valueName": "code"
    //                                                 },
    //                                                 {
    //                                                     "name": "field",
    //                                                     "type": "validation",
    //                                                     "valueName": "field"
    //                                                 }
    //                                             ]
    //                                         }
    //                                     ]
    //                                 },
    //                             ],
    //                             "messageReceiver": [
    //                                 {
    //                                     "id": "",
    //                                     "senderId": "view_01",
    //                                     "receiveData": [
    //                                         {
    //                                             "beforeReceive": [],
    //                                             "triggerType": "BEHAVIOR",
    //                                             "trigger": "REFRESH_AS_CHILD",
    //                                             "params": [
    //                                                 {
    //                                                     "pname": "_PID",
    //                                                     "cname": "_PID",
    //                                                     "valueTo": "tempValue"
    //                                                 }
    //                                             ]
    //                                         }
    //                                     ]
    //                                 },
    //                                 {
    //                                     "id": "",
    //                                     "senderId": "view_02",
    //                                     "receiveData": [
    //                                         {
    //                                             "beforeReceive": [],
    //                                             "triggerType": "ACTION",
    //                                             "trigger": "MESSAGE"
    //                                             // "params": [
    //                                             //     {
    //                                             //         "pname": "name",
    //                                             //         "cname": "_PID",
    //                                             //         "valueTo": "tempValue"
    //                                             //     }
    //                                             // ]
    //                                         },
    //                                         {
    //                                             "beforeReceive": [],
    //                                             "triggerType": "ACTION",
    //                                             "trigger": "CHANGE_ADDED_ROWS_TO_TEXT"
    //                                             // "params": [
    //                                             //     {
    //                                             //         "pname": "name",
    //                                             //         "cname": "_PID",
    //                                             //         "valueTo": "tempValue"
    //                                             //     }
    //                                             // ]
    //                                         },
    //                                         {
    //                                             "beforeReceive": [],
    //                                             "triggerType": "ACTION",
    //                                             "trigger": "CHANGE_EDITED_ROWS_TO_TEXT"
    //                                             // "params": [
    //                                             //     {
    //                                             //         "pname": "name",
    //                                             //         "cname": "_PID",
    //                                             //         "valueTo": "tempValue"
    //                                             //     }
    //                                             // ]
    //                                         },
    //                                         {
    //                                             "beforeReceive": [],
    //                                             "triggerType": "ACTION",
    //                                             "trigger": "SHOW_INVALIDATE_ADDED_ROWS"
    //                                         },
    //                                         {
    //                                             "beforeReceive": [],
    //                                             "triggerType": "ACTION",
    //                                             "trigger": "SHOW_INVALIDATE_EDITED_ROWS"
    //                                         },
    //                                         {
    //                                             "beforeReceive": [],
    //                                             "triggerType": "ACTION",
    //                                             "trigger": "LOAD_REFRESH_DATA"
    //                                         }
    //                                     ]
    //                                 }
    //                             ]
    //                         },
    //                         "condition": [
    //                             {
    //                                 "id": "add_cities_state",
    //                                 "state": [
    //                                     {
    //                                         "type": "component",
    //                                         "valueName": "ROWS_CHECKED",
    //                                         "expression": [
    //                                             {
    //                                                 "type": "property",
    //                                                 "name": "length",
    //                                                 "matchValue": 0,
    //                                                 "match": "gt"
    //                                             },
    //                                             {
    //                                                 "type": "element",
    //                                                 "name": "name",
    //                                                 "matchValue": "1",
    //                                                 "match": "eq",
    //                                             }
    //                                         ]
    //                                     }
    //                                 ]
    //                             },
    //                             {
    //                                 "id": "edit_cities_state",
    //                                 "state": [
    //                                     {
    //                                         "type": "component",
    //                                         "valueName": "ROWS_CHECKED",
    //                                         "expression": [
    //                                             {
    //                                                 "type": "property",
    //                                                 "name": "length",
    //                                                 "matchValue": 0,
    //                                                 "match": "gt"
    //                                             }
    //                                         ]
    //                                     }
    //                                 ]
    //                             },
    //                             {
    //                                 "id": "add_cities",
    //                                 "state": [
    //                                     {
    //                                         "type": "component",
    //                                         "valueName": "ROWS_CHECKED",
    //                                         "expression": [
    //                                             {
    //                                                 "type": "property",
    //                                                 "name": "length",
    //                                                 "matchValue": 0,
    //                                                 "match": "gt"
    //                                             }
    //                                         ]
    //                                     },
    //                                     {
    //                                         "type": "component",
    //                                         "valueName": "ROWS_ADDED",
    //                                         "expression": [
    //                                             {
    //                                                 "type": "property",
    //                                                 "name": "length",
    //                                                 "matchValue": 0,
    //                                                 "match": "gt"
    //                                             }
    //                                         ]
    //                                     }
    //                                 ]
    //                             },
    //                             {
    //                                 "id": "edit_cities",
    //                                 "state": [
    //                                     {
    //                                         "type": "component",
    //                                         "valueName": "ROWS_EDITED",
    //                                         "expression": [
    //                                             {
    //                                                 "type": "property",
    //                                                 "name": "length",
    //                                                 "matchValue": 0,
    //                                                 "match": "gt"
    //                                             }
    //                                         ]
    //                                     },
    //                                     {
    //                                         "type": "component",
    //                                         "valueName": "ROWS_CHECKED",
    //                                         "expression": [
    //                                             {
    //                                                 "type": "property",
    //                                                 "name": "length",
    //                                                 "matchValue": 0,
    //                                                 "match": "gt"
    //                                             }
    //                                         ]
    //                                     }
    //                                 ]
    //                             },
    //                             {
    //                                 "id": "cancel_edit_cities",
    //                                 "state": [
    //                                     {
    //                                         "type": "component",
    //                                         "valueName": "ROWS_EDITED",
    //                                         "expression": [
    //                                             {
    //                                                 "type": "property",
    //                                                 "name": "length",
    //                                                 "matchValue": 0,
    //                                                 "match": "eq"
    //                                             }
    //                                         ]
    //                                     }
    //                                 ]
    //                             },
    //                             {
    //                                 "id": "cancel_add_cities",
    //                                 "state": [
    //                                     {
    //                                         "type": "component",
    //                                         "valueName": "ROWS_ADDED",
    //                                         "expression": [
    //                                             {
    //                                                 "type": "property",
    //                                                 "name": "length",
    //                                                 "matchValue": 0,
    //                                                 "match": "eq"
    //                                             }
    //                                         ]
    //                                     }
    //                                 ]
    //                             }

    //                         ],
    //                         "ajaxConfig": [
    //                             {
    //                                 "id": "add_city_1",
    //                                 "url": "city/insert",
    //                                 "urlType": "inner",
    //                                 "ajaxType": "post",
    //                                 "params": [
    //                                     {
    //                                         "name": "id",
    //                                         "type": "componentValue",
    //                                         "valueName": "id"
    //                                     },
    //                                     {
    //                                         "name": "cityName",
    //                                         "type": "componentValue",
    //                                         "valueName": "cityName"
    //                                     },
    //                                     {
    //                                         "name": "zipCode",
    //                                         "type": "componentValue",
    //                                         "valueName": "zipCode"
    //                                     },
    //                                     {
    //                                         "name": "populationSize",
    //                                         "type": "componentValue",
    //                                         "valueName": "populationSize"
    //                                     },
    //                                     {
    //                                         "name": "directlyUnder",
    //                                         "type": "componentValue",
    //                                         "valueName": "directlyUnder"
    //                                     },
    //                                     {
    //                                         "name": "createDate",
    //                                         "type": "componentValue",
    //                                         "valueName": "createDate"
    //                                     },
    //                                     {
    //                                         "name": "pId",
    //                                         "type": "tempValue",
    //                                         "valueName": "_PID"
    //                                     }
    //                                 ],
    //                                 "outputParameters": [

    //                                 ],
    //                                 "result": [
    //                                     {
    //                                         "name": "data",
    //                                         "showMessageWithNext": 0,
    //                                         "message": "message.ajax.state.success",
    //                                         "senderId": "afterCitySaveSuccessfully"
    //                                     },
    //                                     {
    //                                         "name": "validation",
    //                                         "showMessageWithNext": 0,
    //                                         "message": "message.ajax.state.success",
    //                                         "senderId": "afterCitySaveValidation"
    //                                     },
    //                                     // {
    //                                     //     "name": "error",
    //                                     //     "senderId": "grid_sender_03"
    //                                     // }
    //                                 ]
    //                             },
    //                             {
    //                                 "id": "edit_city_1",
    //                                 "url": "city/update",
    //                                 "urlType": "inner",
    //                                 "ajaxType": "put",
    //                                 "params": [
    //                                     {
    //                                         "name": "cityName",
    //                                         "type": "componentValue",
    //                                         "valueName": "cityName"
    //                                     },
    //                                     {
    //                                         "name": "zipCode",
    //                                         "type": "componentValue",
    //                                         "valueName": "zipCode"
    //                                     },
    //                                     {
    //                                         "name": "populationSize",
    //                                         "type": "componentValue",
    //                                         "valueName": "populationSize"
    //                                     },
    //                                     {
    //                                         "name": "directlyUnder",
    //                                         "type": "componentValue",
    //                                         "valueName": "directlyUnder"
    //                                     },
    //                                     {
    //                                         "name": "createDate",
    //                                         "type": "componentValue",
    //                                         "valueName": "createDate"
    //                                     },
    //                                     {
    //                                         "name": "pId",
    //                                         "type": "tempValue",
    //                                         "valueName": "_PID"
    //                                     },
    //                                     {
    //                                         "name": "id",
    //                                         "type": "componentValue",
    //                                         "valueName": "id"
    //                                     }
    //                                 ],
    //                                 "outputParameters": [

    //                                 ],
    //                                 "result": [
    //                                     {
    //                                         "name": "data",
    //                                         "showMessageWithNext": 0,
    //                                         "message": "message.ajax.state.success",
    //                                         "senderId": "afterCityUpdateSuccessfully"
    //                                     },
    //                                     {
    //                                         "name": "validation",
    //                                         "showMessageWithNext": 0,
    //                                         "message": "message.ajax.state.success",
    //                                         "senderId": "afterCityUpdateValidation"
    //                                     },
    //                                     {
    //                                         "name": "error",
    //                                         "senderId": "toolbar_02"
    //                                     }
    //                                 ]
    //                             },
    //                             {
    //                                 "id": "add_cities_1",
    //                                 "url": "city/insertMany",
    //                                 "urlType": "inner",
    //                                 "ajaxType": "post",
    //                                 "params": [
    //                                     {
    //                                         "name": "id",
    //                                         "type": "componentValue",
    //                                         "valueName": "id"
    //                                     },
    //                                     {
    //                                         "name": "cityName",
    //                                         "type": "componentValue",
    //                                         "valueName": "cityName"
    //                                     },
    //                                     {
    //                                         "name": "zipCode",
    //                                         "type": "componentValue",
    //                                         "valueName": "zipCode"
    //                                     },
    //                                     {
    //                                         "name": "populationSize",
    //                                         "type": "componentValue",
    //                                         "valueName": "populationSize"
    //                                     },
    //                                     {
    //                                         "name": "directlyUnder",
    //                                         "type": "componentValue",
    //                                         "valueName": "directlyUnder"
    //                                     },
    //                                     {
    //                                         "name": "createDate",
    //                                         "type": "componentValue",
    //                                         "valueName": "createDate"
    //                                     },
    //                                     {
    //                                         "name": "pId",
    //                                         "type": "tempValue",
    //                                         "valueName": "_PID"
    //                                     }
    //                                 ],
    //                                 "outputParameters": [

    //                                 ],
    //                                 "result": [
    //                                     {
    //                                         "name": "data",
    //                                         "showMessageWithNext": 0,
    //                                         "message": "message.ajax.state.success",
    //                                         "senderId": "grid_sender_01"
    //                                     },
    //                                     // {
    //                                     //     "name": "validation",
    //                                     //     "senderId": "grid_sender_02"
    //                                     // },
    //                                     // {
    //                                     //     "name": "error",
    //                                     //     "senderId": "grid_sender_03"
    //                                     // }
    //                                 ]
    //                             },
    //                             {
    //                                 "id": "edit_cities_1",
    //                                 "url": "city/updateMany",
    //                                 "urlType": "inner",
    //                                 "ajaxType": "put",
    //                                 "params": [
    //                                     {
    //                                         "name": "cityName",
    //                                         "type": "componentValue",
    //                                         "valueName": "cityName"
    //                                     },
    //                                     {
    //                                         "name": "zipCode",
    //                                         "type": "componentValue",
    //                                         "valueName": "zipCode"
    //                                     },
    //                                     {
    //                                         "name": "populationSize",
    //                                         "type": "componentValue",
    //                                         "valueName": "populationSize"
    //                                     },
    //                                     {
    //                                         "name": "directlyUnder",
    //                                         "type": "componentValue",
    //                                         "valueName": "directlyUnder"
    //                                     },
    //                                     {
    //                                         "name": "createDate",
    //                                         "type": "componentValue",
    //                                         "valueName": "createDate"
    //                                     },
    //                                     {
    //                                         "name": "id",
    //                                         "type": "componentValue",
    //                                         "valueName": "id"
    //                                     },
    //                                     {
    //                                         "name": "pId",
    //                                         "type": "tempValue",
    //                                         "valueName": "_PID"
    //                                     }
    //                                 ],
    //                                 "outputParameters": [

    //                                 ],
    //                                 "result": [
    //                                     {
    //                                         "name": "data",
    //                                         "showMessageWithNext": 0,
    //                                         "message": "message.ajax.state.success",
    //                                         "senderId": "grid_sender_01"
    //                                     }
    //                                 ]
    //                             },
    //                             {
    //                                 "id": "city_delete_1",
    //                                 "url": "city/delete",
    //                                 "urlType": "inner",
    //                                 "ajaxType": "delete",
    //                                 "params": [
    //                                     {
    //                                         "name": "ids",
    //                                         "type": "CHECKED_ROWS_ID",
    //                                         "value": "_ids"
    //                                     }
    //                                 ],
    //                                 "outputParameters": [

    //                                 ],
    //                                 "result": [

    //                                 ]
    //                             }
    //                         ]
    //                     }
    //                 }],
    //             id: "3vlDRq",
    //             type: "row"
    //         }
    //     ]
    // };

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