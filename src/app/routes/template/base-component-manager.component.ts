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
    selector: 'base-component-manager',
    templateUrl: './base-component-manager.component.html',
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
export class BaseComponentMannagerComponent extends CnComponentBase implements OnInit {
    public config = {
        "id": "4K0naM",
        "type": "pageHeader",
        "title": "布局4K0naM",
        "container": "pageHeader",
        "pageHeader": {
            "id": "pageheader_1",
            "title": "组件库",
            "subTitle": "为系统创建并提供组件基本的维护功能",
            "tagColor": "blue",
            "tagText": "系统功能",
            "descColumnsCount": 2,
            "operation": [],
            "contentItems": [
                {
                    "title": "注意事项",
                    "text": "此功能提供了创建组件功能",
                    "span": 2
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
                                    "span": 24,
                                    "nzXs": { span: 24 },
                                    "nzSm": { span: 24 },
                                    "nzMd": { span: 24 },
                                    "nzLg": { offset: 0, span: 24 },
                                    "ngXl": { offset: 0, span: 24 },
                                    "nzXXl": { offset: 0, span: 24 }
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
                                                        "span": 6,
                                                        "layoutContain": "select",
                                                        "size": {
                                                            // "span": 18,
                                                            "nzXs": { span: 24 },
                                                            "nzSm": { span: 24 },
                                                            "nzMd": { offset: 12, span: 6 },
                                                            "nzLg": { offset: 12, span: 6 },
                                                            "ngXl": { offset: 12, span: 6 },
                                                            "nzXXl": { offset: 12, span: 6 }
                                                        },
                                                        "control": {
                                                            "id": "search_state"
                                                        }
                                                    },
                                                    {
                                                        "id": "col_2",
                                                        "col": "cc",
                                                        "type": "col",
                                                        "title": "列ioj0mV",
                                                        "span": 6,
                                                        "layoutContain": "select",
                                                        "size": {
                                                            "nzXs": 24,
                                                            "nzSm": 24,
                                                            "nzMd": 6,
                                                            "nzLg": 6,
                                                            "ngXl": 6,
                                                            "nzXXl": 6
                                                        },
                                                        "control": {
                                                            "id": "search_name"
                                                        }
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    "formControls": [
                                        {
                                            "id": "search_state",
                                            "hidden": false,
                                            "title": "",
                                            "hiddenLabel": true,
                                            "noColon": true,
                                            "titleConfig": {
                                                "required": false
                                            },
                                            "field": "TYPE",
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
                                                "span": 18,
                                                "nzXs": {
                                                    "span": 18,
                                                    "offset": 6
                                                },
                                                "nzSm": {
                                                    "span": 18,
                                                    "offset": 6
                                                },
                                                "nzMd": {
                                                    "span": 18,
                                                    "offset": 6
                                                },
                                                "nzLg": {
                                                    "span": 18,
                                                    "offset": 6
                                                },
                                                "ngXl": {
                                                    "span": 18,
                                                    "offset": 6
                                                },
                                                "nzXXl": {
                                                    "span": 18,
                                                    "offset": 6
                                                }
                                            },
                                            "state": "edit",
                                            "text": {
                                                "type": "label",
                                                "field": "TYPE"
                                            },
                                            "editor": {
                                                "type": "button",
                                                "buttonType": "radio",
                                                "field": "TYPE",
                                                "serverSearch": true,
                                                "group": [
                                                    {
                                                        "title": "全部",
                                                        "value": null
                                                    },
                                                    {
                                                        "title": "业务组件",
                                                        "value": "component"
                                                    },
                                                    {
                                                        "title": "布局组件",
                                                        "value": "layout"
                                                    }
                                                ]
                                            }
                                        },
                                        {
                                            "id": "search_name",
                                            "hidden": false,
                                            "title": "",
                                            "hiddenLabel": true,
                                            "noColon": true,
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
                                                "span": 18,
                                                "nzXs": {
                                                    "span": 18,
                                                    "offset": 6
                                                },
                                                "nzSm": {
                                                    "span": 18,
                                                    "offset": 6
                                                },
                                                "nzMd": {
                                                    "span": 18,
                                                    "offset": 6
                                                },
                                                "nzLg": {
                                                    "span": 18,
                                                    "offset": 6
                                                },
                                                "ngXl": {
                                                    "span": 18,
                                                    "offset": 6
                                                },
                                                "nzXXl": {
                                                    "span": 18,
                                                    "offset": 6
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
                                                {
                                                    "id": "search_state",
                                                    "state": "edit",
                                                    "hidden": false,
                                                    "readOnly": false
                                                }
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
                                                {
                                                    "id": "search_state",
                                                    "state": "edit",
                                                    "hidden": false,
                                                    "readOnly": false
                                                }
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
                                                {
                                                    "id": "search_state",
                                                    "state": "edit",
                                                    "hidden": false,
                                                    "readOnly": false
                                                }
                                            ]
                                        }
                                    ],
                                    "ajaxConfig": [
                                        {
                                            "id": "loadBusinessNameValue",
                                            "url": "sd/GET_DM_SQL_LIST/query",
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
                                "id": "4EnORY",
                                "col": "cc",
                                "type": "col",
                                "titlestate": 1,
                                "span": 24,
                                "size": {
                                    "nzXs": 24,
                                    "nzSm": 24,
                                    "nzMd": 24,
                                    "nzLg": 24,
                                    "ngXl": 24,
                                    "nzXXl": 24
                                },
                                "container": "component",
                                "component": {
                                    "id": "compoment_card_list",
                                    "component": "cnCardList",
                                    "title": "",
                                    "size": "middle",
                                    "gutter": {
                                        "gutter": 24,
                                        "lg": 8, "md": 12, "sm": 24, "xs": 24
                                    },
                                    "layout": "vertical",
                                    "cascade": {
                                        "messageSender": [
                                            {
                                                "id": "afterComponentAddedSuccess",
                                                "senderId": "compoment_card_list",
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
                                                        "receiverTrigger": "ADD_LIST_ITEM",
                                                        "params": [
                                                            {
                                                                "name": "ID",
                                                                "type": "addedItem",
                                                                "valueName": "ID"
                                                            },
                                                            {
                                                                "name": "NAME",
                                                                "type": "addedItem",
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
                                                "senderId": "compoment_card_list",
                                                "receiveData": [
                                                    {
                                                        "beforeReceive": [],
                                                        "triggerType": "ACTION",
                                                        "trigger": "MESSAGE"
                                                    },
                                                    {
                                                        "beforeReceive": [],
                                                        "triggerType": "ACTION",
                                                        "trigger": "ADD_LIST_ITEM"
                                                    },
                                                    {
                                                        "beforeReceive": [],
                                                        "triggerType": "ACTION",
                                                        "trigger": "CHANGE_EDITED_ROWS_TO_TEXT"
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
                                    "dialog": [
                                        {
                                            "id": "newComponentForm",
                                            "type": "confirm",
                                            "title": "创建组件信息",
                                            "cancelText": "取消",
                                            "okText": "提交",
                                            "width": "80%",
                                            "form": {
                                                "id": "form_01",
                                                "type": "form",
                                                "component": "form",
                                                "state": "new",
                                                "loadingConfig": {
                                                    // "id": "loadform"
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
                                                                        "nzXs": 24, "nzSm": 24, "nzMd": 24, "nzLg": 12, "ngXl": 12, "nzXXl": 12
                                                                    },
                                                                    "control": {
                                                                        "id": "ctl_name"  // id 和引用id 值相同
                                                                    }
                                                                },
                                                                {
                                                                    "id": "ioj0mV1", "col": "cc", "type": "col", "title": "列ioj0mV", "span": 12, "layoutContain": "select",
                                                                    "size": {
                                                                        "nzXs": 24, "nzSm": 24, "nzMd": 24, "nzLg": 12, "ngXl": 12, "nzXXl": 12
                                                                    },
                                                                    "control": { "id": "ctl_code" }
                                                                },
                                                                {
                                                                    "id": "ioj0mV2", "col": "cc", "type": "col", "title": "列ioj0mV", "span": 12, "layoutContain": "select",
                                                                    "size": {
                                                                        "nzXs": 24, "nzSm": 24, "nzMd": 24, "nzLg": 12, "ngXl": 12, "nzXXl": 12
                                                                    },
                                                                    "control": { "id": "ctl_type" }
                                                                },
                                                                {
                                                                    "id": "ioj0mV3", "col": "cc", "type": "col", "title": "列ioj0mV", "span": 12, "layoutContain": "select",
                                                                    "size": {
                                                                        "nzXs": 24, "nzSm": 24, "nzMd": 24, "nzLg": 12, "ngXl": 12, "nzXXl": 12
                                                                    },
                                                                    "control": { "id": "ctl_version" }
                                                                },
                                                                {
                                                                    "id": "ioj0mV4", "col": "cc", "type": "col", "title": "列ioj0mV", "span": 12, "layoutContain": "select",
                                                                    "size": {
                                                                        "nzXs": 24, "nzSm": 24, "nzMd": 24, "nzLg": 12, "ngXl": 12, "nzXXl": 12
                                                                    },
                                                                    "control": { "id": "ctl_sort" }
                                                                },
                                                                {
                                                                    "id": "ioj0mV5", "col": "cc", "type": "col", "title": "列ioj0mV", "span": 12, "layoutContain": "select",
                                                                    "size": {
                                                                        "nzXs": 24, "nzSm": 24, "nzMd": 24, "nzLg": 12, "ngXl": 12, "nzXXl": 12
                                                                    },
                                                                    "control": { "id": "ctl_state" }
                                                                },
                                                                {
                                                                    "id": "ioj0mV5", "col": "cc", "type": "col", "title": "列ioj0mV", "span": 24, "layoutContain": "select",
                                                                    "size": {
                                                                        "nzXs": 24, "nzSm": 24, "nzMd": 24, "nzLg": 24, "ngXl": 24, "nzXXl": 24
                                                                    },
                                                                    "control": { "id": "ctl_properties" }
                                                                },
                                                                {
                                                                    "id": "ioj0mV5", "col": "cc", "type": "col", "title": "列ioj0mV", "span": 24, "layoutContain": "select",
                                                                    "size": {
                                                                        "nzXs": 24, "nzSm": 24, "nzMd": 24, "nzLg": 24, "ngXl": 24, "nzXXl": 24
                                                                    },
                                                                    "control": { "id": "ctl_method" }
                                                                }
                                                            ]
                                                        }]
                                                },
                                                formControls: [
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
                                                                { "label": "布局", "value": "layout" },
                                                                { "label": "组件", "value": "component" }
                                                            ],
                                                            "defaultValue": "layout",
                                                            "labelName": "label",
                                                            "valueName": "value"
                                                        }
                                                    },
                                                    {
                                                        id: 'ctl_state',
                                                        "hidden": false,
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
                                                    {
                                                        "id": "ctl_properties",
                                                        "hidden": false,
                                                        "title": "组件属性",
                                                        "titleConfig": {
                                                            "required": true
                                                        },
                                                        "field": "cmptProperty",
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
                                                        "state": "new",
                                                        "text": {
                                                            "type": "label",
                                                            "field": "cmptProperty"
                                                        },
                                                        "editor": {
                                                            "type": "staticGrid",
                                                            "field": "cmptProperty",
                                                            "placeholder": "",
                                                            "layoutName": "ctlProperties",
                                                            "validations": []
                                                        }
                                                    },
                                                    {
                                                        "id": "ctl_method",
                                                        "hidden": false,
                                                        "title": "组件功能",
                                                        "titleConfig": {
                                                            "required": true
                                                        },
                                                        "field": "cmptMethod",
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
                                                        "state": "new",
                                                        "text": {
                                                            "type": "label",
                                                            "field": "cmptMethod"
                                                        },
                                                        "editor": {
                                                            "type": "staticGrid",
                                                            "field": "cmptMethod",
                                                            "placeholder": "",
                                                            "layoutName": "ctlMethod",
                                                            "validations": []
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
                                                            { id: 'ctl_name', state: "edit", hidden: false, readOnly: false },
                                                            { id: 'ctl_code', state: "edit", hidden: false, readOnly: false },
                                                            { id: 'ctl_type', state: "edit", hidden: false, readOnly: false },
                                                            { id: 'ctl_version', state: "edit", hidden: false, readOnly: false },
                                                            { id: 'ctl_sort', state: "edit", hidden: false, readOnly: false },
                                                            { id: 'ctl_state', state: "edit", hidden: false, readOnly: false },
                                                            { id: 'ctl_properties', state: "edit", hidden: false, readOnly: false },
                                                            { id: 'ctl_method', state: "edit", hidden: false, readOnly: false }

                                                        ]
                                                    },
                                                    {
                                                        formState: "edit",
                                                        Controls: [
                                                            { id: 'ctl_name', state: "edit", hidden: false, readOnly: false },
                                                            { id: 'ctl_code', state: "edit", hidden: false, readOnly: false },
                                                            { id: 'ctl_type', state: "edit", hidden: false, readOnly: false },
                                                            { id: 'ctl_version', state: "edit", hidden: false, readOnly: false },
                                                            { id: 'ctl_sort', state: "edit", hidden: false, readOnly: false },
                                                            { id: 'ctl_state', state: "edit", hidden: false, readOnly: false },
                                                            { id: 'ctl_properties', state: "edit", hidden: false, readOnly: false },
                                                            { id: 'ctl_method', state: "edit", hidden: false, readOnly: false }
                                                        ]
                                                    },
                                                    {
                                                        formState: "text",
                                                        Controls: [
                                                            { id: 'ctl_name', state: "edit", hidden: false, readOnly: false },
                                                            { id: 'ctl_code', state: "edit", hidden: true, readOnly: false },
                                                            { id: 'ctl_type', state: "edit", hidden: true, readOnly: false },
                                                            { id: 'ctl_version', state: "edit", hidden: true, readOnly: false },
                                                            { id: 'ctl_sort', state: "edit", hidden: true, readOnly: false },
                                                            { id: 'ctl_state', state: "edit", hidden: true, readOnly: false },
                                                            { id: 'ctl_properties', state: "edit", hidden: false, readOnly: false },
                                                            { id: 'ctl_method', state: "edit", hidden: false, readOnly: false }
                                                        ]
                                                    }

                                                ],
                                                ajaxConfig: [
                                                    {
                                                        "id": "loadform",
                                                        "url": "cfgBusiModel/CREATE_COMPONENT/query",
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
                                        },
                                        {
                                            "id": "form_property",
                                            "type": "confirm",
                                            "title": "创建组件内置属性信息",
                                            "cancelText": "取消",
                                            "okText": "提交",
                                            "form": {
                                                "id": "form_property_new",
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
                                                                        "id": "prop_name"  // id 和引用id 值相同
                                                                    }
                                                                },
                                                                {
                                                                    "id": "ioj0mV1", "col": "cc", "type": "col", "title": "列ioj0mV", "span": 24, "layoutContain": "select",
                                                                    "size": {
                                                                        "nzXs": 24, "nzSm": 24, "nzMd": 24, "nzLg": 24, "ngXl": 24, "nzXXl": 24
                                                                    },
                                                                    "control": { "id": "prop_code" }
                                                                },
                                                                {
                                                                    "id": "ioj0mV2", "col": "cc", "type": "col", "title": "列ioj0mV", "span": 24, "layoutContain": "select",
                                                                    "size": {
                                                                        "nzXs": 24, "nzSm": 24, "nzMd": 24, "nzLg": 24, "ngXl": 24, "nzXXl": 24
                                                                    },
                                                                    "control": { "id": "prop_type" }
                                                                },
                                                                {
                                                                    "id": "ioj0mV3", "col": "cc", "type": "col", "title": "列ioj0mV", "span": 24, "layoutContain": "select",
                                                                    "size": {
                                                                        "nzXs": 24, "nzSm": 24, "nzMd": 24, "nzLg": 24, "ngXl": 24, "nzXXl": 24
                                                                    },
                                                                    "control": { "id": "prop_datatype" }
                                                                },
                                                                {
                                                                    "id": "ioj0mV4", "col": "cc", "type": "col", "title": "列ioj0mV", "span": 24, "layoutContain": "select",
                                                                    "size": {
                                                                        "nzXs": 24, "nzSm": 24, "nzMd": 24, "nzLg": 24, "ngXl": 24, "nzXXl": 24
                                                                    },
                                                                    "control": { "id": "prop_remark" }
                                                                },
                                                                {
                                                                    "id": "ioj0mV5", "col": "cc", "type": "col", "title": "列ioj0mV", "span": 24, "layoutContain": "select",
                                                                    "size": {
                                                                        "nzXs": 24, "nzSm": 24, "nzMd": 24, "nzLg": 24, "ngXl": 24, "nzXXl": 24
                                                                    },
                                                                    "control": { "id": "prop_cmptId" }
                                                                },
                                                                // {
                                                                //     "id": "ioj0mV", "col": "cc", "type": "col", "title": "列ioj0mV", "span": 12, "layoutContain": "select",
                                                                //     "size": {
                                                                //         "nzXs": 12, "nzSm": 12, "nzMd": 12, "nzLg": 12, "ngXl": 12, "nzXXl": 12
                                                                //     },
                                                                //     "control": { "id": "004" }
                                                                // }
                                                            ]
                                                        }]
                                                },
                                                formControls: [
                                                    {
                                                        id: 'prop_id',
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

                                                            ]
                                                        }
                                                    },
                                                    {
                                                        id: 'prop_name',
                                                        "hidden": true,
                                                        "title": "属性名称",
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
                                                                { validator: "required", type: "default", "message": "请输入属性名称" }
                                                            ]
                                                        }
                                                    },
                                                    {
                                                        id: 'prop_code',
                                                        "hidden": true,
                                                        "title": "属性编码",
                                                        "titleConfig": {
                                                            required: true
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
                                                                { validator: "required", type: "default", "message": "请输入属性编码" }
                                                            ]
                                                        }
                                                    },
                                                    {
                                                        id: 'prop_type',
                                                        "hidden": true,
                                                        "title": "属性类型",
                                                        "titleConfig": {
                                                            required: true
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
                                                                { "label": "属性", "value": "property" },
                                                                { "label": "方法", "value": "method" }
                                                            ],
                                                            "validations": [
                                                                { validator: "required", type: "default", "message": "请选择属性类型" }
                                                            ],
                                                            "defaultValue": "1",
                                                            "labelName": "label",
                                                            "valueName": "value"
                                                        }
                                                    },
                                                    {
                                                        id: 'prop_remark',
                                                        "hidden": true,
                                                        "title": "属性说明",
                                                        "titleConfig": {
                                                            required: false
                                                        },
                                                        "field": "REMARK",
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
                                                            "field": 'REMARK',
                                                        },
                                                        "editor": {
                                                            "type": "input",
                                                            "field": "REMARK",
                                                            "placeholder": "请输入"
                                                        }
                                                    },
                                                    {
                                                        id: 'prop_datatype',
                                                        "hidden": true,
                                                        "title": "属性数据类型",
                                                        "titleConfig": {
                                                            required: true
                                                        },
                                                        "field": "DATA_TYPE",
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
                                                            "field": 'DATA_TYPE',
                                                        },
                                                        "editor": {
                                                            "type": "select",
                                                            "field": "DATA_TYPE",
                                                            "placeholder": "请输入",
                                                            "options": [
                                                                { "label": "值", "value": "value" },
                                                                { "label": "对象", "value": "object" },
                                                                { "label": "数组", "value": "array" }
                                                            ],
                                                            "validations": [
                                                                { validator: "required", type: "default", "message": "请选择属性数据类型" }
                                                            ],
                                                            "defaultValue": "object",
                                                            "labelName": "label",
                                                            "valueName": "value"
                                                        }
                                                    },
                                                    {
                                                        id: 'prop_cmptId',
                                                        "hidden": true,
                                                        "title": "所属组件",
                                                        "titleConfig": {
                                                            required: true
                                                        },
                                                        "field": "CMPT_ID",
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
                                                            "field": 'CMPT_ID',
                                                        },
                                                        "editor": {
                                                            "type": "select",
                                                            "field": "CMPT_ID",
                                                            "placeholder": "请输入",
                                                            loadingConfig: {
                                                                id: "loadformselectcmpt" // 将加载配置引用
                                                            },
                                                            "validations": [
                                                                { validator: "required", type: "default", "message": "属性不能没有所属组件" }
                                                            ],
                                                            "defaultValue": "v2.0",
                                                            "labelName": "NAME",
                                                            "valueName": "ID"
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
                                                            { id: 'prop_name', state: "edit", hidden: false, readOnly: false },
                                                            { id: 'prop_code', state: "edit", hidden: false, readOnly: false },
                                                            { id: 'prop_type', state: "edit", hidden: false, readOnly: false },
                                                            { id: 'prop_remark', state: "edit", hidden: false, readOnly: false },
                                                            { id: 'prop_datatype', state: "edit", hidden: false, readOnly: false },
                                                            { id: 'prop_cmptId', state: "edit", hidden: false, readOnly: false }

                                                        ]
                                                    },
                                                    {
                                                        formState: "edit",
                                                        Controls: [
                                                            { id: 'prop_name', state: "edit", hidden: false, readOnly: false },
                                                            { id: 'prop_code', state: "edit", hidden: false, readOnly: false },
                                                            { id: 'prop_type', state: "edit", hidden: false, readOnly: false },
                                                            { id: 'prop_remark', state: "edit", hidden: false, readOnly: false },
                                                            { id: 'prop_datatype', state: "edit", hidden: false, readOnly: false },
                                                            { id: 'prop_cmptId', state: "edit", hidden: false, readOnly: false }
                                                        ]
                                                    },
                                                    {
                                                        formState: "text",
                                                        Controls: [
                                                            { id: 'prop_name', state: "text", hidden: false, readOnly: true },
                                                            { id: 'prop_code', state: "text", hidden: false, readOnly: true },
                                                            { id: 'prop_type', state: "text", hidden: false, readOnly: true },
                                                            { id: 'prop_remark', state: "text", hidden: false, readOnly: true },
                                                            { id: 'prop_datatype', state: "text", hidden: false, readOnly: true },
                                                            { id: 'prop_cmptId', state: "text", hidden: false, readOnly: true }
                                                        ]
                                                    }

                                                ],
                                                ajaxConfig: [
                                                    {
                                                        "id": "loadform",
                                                        "url": "td/SMT_BASE_COMPONENT_PROPERTY/query",
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
                                                    },
                                                    {
                                                        "id": "loadformselectcmpt",
                                                        "url": "td/SMT_BASE_COMPONENT/query",
                                                        "urlType": "inner",
                                                        "ajaxType": "get",
                                                        "params": [
                                                            // {
                                                            //     "name": "ID",
                                                            //     "type": "tempValue",
                                                            //     "valueName": "_ID"
                                                            // }
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
                                    "isPagination": true,
                                    "loadingOnInit": true,
                                    "pageSize": 8,
                                    "pageSizeOptions": [5, 10, 20, 30],
                                    "loadingConfig": {
                                        "id": "loadingComponentList"
                                    },
                                    "actions": [
                                        {
                                            "title": "创建一个新组件",
                                            "icon": "plus",
                                            "type": "outer",
                                            "state": "new",
                                            "style": "dashed",
                                            "execute": [
                                                {
                                                    "triggerType": "ACTION",
                                                    "trigger": "DIALOG",
                                                    "dialogId": "newComponentForm",
                                                    "ajaxId": "createNewComponent"
                                                }
                                            ]
                                        },
                                        {
                                            "title": "编辑",
                                            "icon": "edit",
                                            "type": "inner",
                                            "execute": [
                                                {
                                                    "triggerType": "ACTION",
                                                    "trigger": "DIALOG",
                                                    // "conditionId": "add_state_1"
                                                    "dialogId": "form_component",
                                                    "ajaxId": "tree_add_component"
                                                }
                                            ]
                                        },
                                        {
                                            "title": "删除",
                                            "icon": "remove",
                                            "type": "inner",
                                            "execute": [
                                                {
                                                    "triggerType": "ACTION",
                                                    "trigger": "DIALOG",
                                                    // "conditionId": "add_state_1"
                                                    "dialogId": "form_component",
                                                    "ajaxId": "tree_add_component"
                                                }
                                            ]
                                        },
                                        {
                                            "title": "启用/禁用",
                                            "icon": "cancel",
                                            "type": "inner",
                                            "execute": [
                                                {
                                                    "triggerType": "ACTION",
                                                    "trigger": "DIALOG",
                                                    // "conditionId": "add_state_1"
                                                    "dialogId": "form_component",
                                                    "ajaxId": "tree_add_component"
                                                }
                                            ]
                                        }
                                    ],
                                    "ajaxConfig": [
                                        {
                                            "id": "loadingComponentList",
                                            "url": "sd/GET_COMPONENT_LIST/query",
                                            "method": "get",
                                            "params": [
                                                // {
                                                //     "name": "ID",
                                                //     "type": "tempValue",
                                                //     "valueName": "_ID"
                                                // },
                                                // {
                                                //     "name": "_onlyOneObject",
                                                //     "type": "value",
                                                //     "value": true
                                                // }
                                            ],
                                            "filter": [

                                            ]
                                        },
                                        {
                                            "id": "createNewComponent",
                                            "url": "cfgBusiModel/CREATE_COMPONENT/operate",
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
                                                    "name": "TYPE",
                                                    "type": "componentValue",
                                                    "valueName": "TYPE"
                                                },
                                                {
                                                    "name": "VERSION",
                                                    "type": "componentValue",
                                                    "valueName": "VERSION"
                                                },
                                                {
                                                    "name": "SORT",
                                                    "type": "componentValue",
                                                    "valueName": "SORT",
                                                    "dataType": "int"
                                                },
                                                {
                                                    "name": "STATE",
                                                    "type": "componentValue",
                                                    "valueName": "STATE"
                                                },
                                                {
                                                    "name": "$state$",
                                                    "type": "value",
                                                    "value": "insert"
                                                },
                                                {
                                                    "name": "CMPT_PROPERTY",
                                                    "type": "componentValue",
                                                    "valueName": "cmptProperty"
                                                },
                                                {
                                                    "name": "CMPT_METHOD",
                                                    "type": "componentValue",
                                                    "valueName": "cmptMethod"
                                                }

                                            ],
                                            "outputParameters": [],
                                            "result": [
                                                {
                                                    "name": "data",
                                                    "showMessageWithNext": 0,
                                                    "message": "message.ajax.state.success",
                                                    "senderId": "afterComponentAddedSuccess"
                                                },
                                                {
                                                    "name": "validation",
                                                    "message": "message.ajax.state.success",
                                                    "senderId": "afterComponentAddedValidation"
                                                },
                                                {
                                                    "name": "error",
                                                    "senderId": "toolbar_02"
                                                }
                                            ]
                                        }
                                    ],
                                    "dataMapping": [
                                        {
                                            "name": "title",
                                            "field": "NAME"
                                        },
                                        {
                                            "name": "avatar",
                                            "field": "AVANTA"
                                        },
                                        {
                                            "name": "desc",
                                            "field": "REMARK"
                                        },
                                        {
                                            "name": "extra",
                                            "fields": [
                                                {
                                                    "label": "组件编码",
                                                    "field": "CODE",
                                                    "type": "tag",
                                                    "color": "#2db7f5",
                                                    "span": 12
                                                },
                                                {
                                                    "label": "组件类型",
                                                    "field": "TYPE_TEXT",
                                                    "type": "tag",
                                                    "color": "purple",
                                                    "span": 12
                                                },
                                                {
                                                    "label": "版本编号",
                                                    "field": "VERSION",
                                                    "type": "tag",
                                                    "color": "#2db7f5",
                                                    "span": 12
                                                },
                                                {
                                                    "label": "组件状态",
                                                    "type": "tag",
                                                    "color": "green",
                                                    "field": "STATE_TEXT",
                                                    "span": 12
                                                },
                                                {
                                                    "label": "创建日期",
                                                    "field": "CREATE_DATE",
                                                    "type": "text",
                                                    "span": 12
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
            }
        }
    }

    public subFormConfig = {
        "ctl_properties": {
            "id": "view_02",
            "title": "",
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
                    "field": "TYPE",
                    "hidden": false,
                    "showFilter": false,
                    "showSort": false,
                    "width": "100px",
                    "style": {},
                    "editor": {
                        "type": "select",
                        "field": "TYPE",
                        "placeholder": "请选择",
                        "defaultValue": "property",
                        "options": [
                            { "label": '属性', "value": "property" },
                            { "label": '方法', "value": "method" }
                        ],
                        "labelName": 'label',
                        "valueName": 'value'
                    }
                },
                {
                    "title": "属性数据类型",
                    "type": "field",
                    "field": "DATA_TYPE",
                    "hidden": false,
                    "showFilter": false,
                    "showSort": false,
                    "width": "100px",
                    "style": {},
                    "editor": {
                        "type": "select",
                        "field": "DATA_TYPE",
                        "placeholder": "请选择",
                        "defaultValue": "object",
                        "options": [
                            { "label": '对象', "value": "object" },
                            { "label": '数组', "value": "array" },
                            { "label": '值', "value": "value" }
                        ],
                        "labelName": 'label',
                        "valueName": 'value'
                    }
                },
                // {
                //     "title": "是否启用",
                //     "type": "field",
                //     "field": "STATE",
                //     "hidden": false,
                //     "showFilter": false,
                //     "showSort": false,
                //     "width": "100px",
                //     "style": {},
                //     "editor": {
                //         "type": "select",
                //         "field": "STATE",
                //         "placeholder": "请选择",
                //         "defaultValue": 1,
                //         "options": [
                //             { "label": '启用', "value": 1 },
                //             { "label": '禁用', "value": 2 }
                //         ],
                //         "labelName": 'label',
                //         "valueName": 'value'
                //     }
                // },
                {
                    "title": "属性说明",
                    "type": "field",
                    "field": "REMARK",
                    "hidden": false,
                    "showFilter": false,
                    "showSort": false,
                    "width": "100px",
                    "style": {},
                    "editor": {
                        "type": "input",
                        "field": "REMARK"
                    }
                },
                {
                    "title": "操作",
                    "type": "action",
                    "actionIds": [
                        "grid_new_cancel", "grid_edit", "grid_cancel"
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
                                "name": "new",
                                "value": true
                            }
                        ]
                    }
                },
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
        "ctl_method": {
            "id": "view_02",
            "title": "操作列表",
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
                "url": "td/SMT_BASE_INNER_METHOD/query",
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
                    "title": "操作名称",
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
                    "title": "操作编码",
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
                    "title": "操作类型",
                    "type": "field",
                    "field": "METHOD_TYPE",
                    "hidden": false,
                    "showFilter": false,
                    "showSort": false,
                    "width": "100px",
                    "style": {},
                    "editor": {
                        "type": "select",
                        "field": "METHOD_TYPE",
                        "placeholder": "请选择",
                        "defaultValue": "STATE",
                        "options": [
                            { "label": '状态改变', "value": "STATE" },
                            { "label": '动作', "value": "ACTION" },
                            { "label": '行为', "value": "BEHAVIOR" },
                            { "label": '操作', "value": "OPERATION" }
                        ],
                        "labelName": 'label',
                        "valueName": 'value'
                    }
                },
                {
                    "title": "操作",
                    "type": "field",
                    "field": "METHOD",
                    "hidden": false,
                    "showFilter": false,
                    "showSort": false,
                    "width": "100px",
                    "style": {},
                    "editor": {
                        "type": "input",
                        "field": "METHOD"
                    }
                },
                // {
                //     "title": "是否启用",
                //     "type": "field",
                //     "field": "STATE",
                //     "hidden": false,
                //     "showFilter": false,
                //     "showSort": false,
                //     "width": "100px",
                //     "style": {},
                //     "editor": {
                //         "type": "select",
                //         "field": "STATE",
                //         "placeholder": "请选择",
                //         "defaultValue": 1,
                //         "options": [
                //             { "label": '启用', "value": 1 },
                //             { "label": '禁用', "value": 2 }
                //         ],
                //         "labelName": 'label',
                //         "valueName": 'value'
                //     }
                // },
                {
                    "title": "操作说明",
                    "type": "field",
                    "field": "REMARK",
                    "hidden": false,
                    "showFilter": false,
                    "showSort": false,
                    "width": "100px",
                    "style": {},
                    "editor": {
                        "type": "input",
                        "field": "REMARK"
                    }
                },
                {
                    "title": "操作",
                    "type": "action",
                    "actionIds": [
                        "grid_new_cancel", "grid_edit", "grid_cancel"
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
            "rowActions": [
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
                                "name": "edit",
                                "value": true
                            }
                        ]
                    }
                },
                {
                    "id": "grid_edit",
                    "state": "edit",
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
                                "name": "new",
                                "value": true
                            }
                        ]
                    }
                },
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
        }
    }

    public constructor(@Inject(BSN_COMPONENT_SERVICES)
    public componentService: ComponentServiceProvider) {
        super(componentService);
    }

    public ngOnInit() {
        this.componentService.cacheService.set('ctlProperties', this.subFormConfig.ctl_properties);
        this.componentService.cacheService.set('ctlMethod', this.subFormConfig.ctl_method);
    }
}