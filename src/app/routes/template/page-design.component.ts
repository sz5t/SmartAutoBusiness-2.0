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
    selector: 'page-design',
    templateUrl: './page-design.component.html',
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
export class PageDesignComponent implements OnInit {

    public config = {
        "id": "4K0naM",
        "type": "pageHeader",
        "title": "布局4K0naM",
        "container": "pageHeader",
        "pageHeader": {
            "id": "pageheader_1",
            "title": "组件配置属性管理",
            "subTitle": "维护组件配置属性, 为组件配置功能提供基础数据",
            // "type": "breadcrumb",
            "tagColor": "blue",
            "tagText": "系统功能",
            "descColumnsCount": 2,
            "operation": [],
            "contentItems": [
                // {
                //     "title": "注意事项",
                //     "text": "此功能提供了创建组件功能",
                //     "span": 2
                // }
            ],
            "extraItems": [
                // {
                //     "label": "组件数量",
                //     "detail": "20",
                //     "span": "12"
                // }
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
                                "id": "r5zDHB",
                                "col": "cc",
                                "type": "col",
                                "title": "",
                                "span": 6,
                                "container": "component",
                                "header": {
                                    "title": "功能分类",
                                    "icon": "right-square",
                                    "toolbar": {
                                        "id": "view_tree_func",
                                        "component": "cnToolbar",
                                        "size": "default",
                                        "cascade": {
                                            "messageSender": [
                                                {
                                                    "id": "toolbar_01",
                                                    "senderId": "view_tree_func",
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
                                                //     "senderId": "view_tree_func",
                                                //     "receiveData": [
                                                //         {
                                                //             "triggerType": "STATE",
                                                //             "trigger": "STATE_TO_TEXT"
                                                //         }
                                                //     ]
                                                // },
                                                // {
                                                //     "id": "s_002",
                                                //     "senderId": "view_tree_func",
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
                                                ],
                                            },
                                            {
                                                "id": "add_child_form_changeValue",
                                                "params": [
                                                    {
                                                        "name": "PID",
                                                        "type": "item",
                                                        "valueName": "ID",
                                                        "valueTo": "tempValue"
                                                    },
                                                    {
                                                        "name": "FUNC_ID",
                                                        "type": "item",
                                                        "valueName": "FUNC_ID",
                                                        "valueTo": "tempValue"
                                                    }
                                                ],
                                            }
                                        ],
                                        "dialog": [
                                            {
                                                "id": "edit_func_form",
                                                "type": "confirm",
                                                "title": "功能编辑",
                                                "cancelText": "取消",
                                                "okText": "提交",
                                                "form": {
                                                    "id": "form_01",
                                                    "type": "form",
                                                    "component": "form",
                                                    "state": "new",
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
                                                                            "id": "001"  // id 和引用id 值相同
                                                                        }
                                                                    },
                                                                    {
                                                                        "id": "iHspYn1", "col": "cc", "type": "col",
                                                                        "title": "列iHspYn", "span": 24,
                                                                        "layoutContain": "input",
                                                                        "size": {
                                                                            "nzXs": 24, "nzSm": 24, "nzMd": 24, "nzLg": 24, "ngXl": 24, "nzXXl": 24
                                                                        },
                                                                        "control": {
                                                                            "id": "004"  // id 和引用id 值相同
                                                                        }
                                                                    },
                                                                    // {
                                                                    //     "id": "ioj0mV", "col": "cc", "type": "col", "title": "列ioj0mV", "span": 24, "layoutContain": "select",
                                                                    //     "size": {
                                                                    //         "nzXs": 24, "nzSm": 24, "nzMd": 24, "nzLg": 24, "ngXl": 24, "nzXXl": 24
                                                                    //     },
                                                                    //     "control": { "id": "002" }
                                                                    // },
                                                                    // {
                                                                    //     "id": "ioj0mV", "col": "cc", "type": "col", "title": "列ioj0mV", "span": 12, "layoutContain": "select",
                                                                    //     "size": {
                                                                    //         "nzXs": 12, "nzSm": 12, "nzMd": 12, "nzLg": 12, "ngXl": 12, "nzXXl": 12
                                                                    //     },
                                                                    //     "control": { "id": "003" }
                                                                    // },
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
                                                            id: '001',
                                                            "hidden": true,
                                                            "title": '名称',
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
                                                                    { validator: "required", type: "default", "message": "请输入功能名称 " }
                                                                ]
                                                            }
                                                        },
                                                        {
                                                            id: '002',
                                                            "hidden": true,
                                                            "title": '',
                                                            "titleConfig": {
                                                                required: false
                                                            },
                                                            "field": "ID",
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
                                                            id: '003',
                                                            "hidden": true,
                                                            "title": '',
                                                            "titleConfig": {
                                                                required: false
                                                            },
                                                            "field": "PID",
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
                                                            "text": {
                                                                "type": 'label',
                                                                "field": 'PID',
                                                            },
                                                            "editor": {
                                                                "type": "input",
                                                                "field": "PID",
                                                                "placeholder": "请输入",
                                                                "validations": [
            
                                                                ]
                                                            }
                                                        },
                                                        {
                                                            id: '004',
                                                            "hidden": true,
                                                            "title": '功能编码',
                                                            "titleConfig": {
                                                                required: true
                                                            },
                                                            "field": "CODE",
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
                                                                "field": 'CODE',
                                                            },
                                                            "editor": {
                                                                "type": "input",
                                                                "field": "CODE",
                                                                "placeholder": "请输入",
                                                                "validations": [
                                                                    { validator: "required", type: "default", "message": "请输入功能编码" }
                                                                ]
                                                            }
                                                        },
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
                                                                { id: '001', state: "edit", hidden: false, readOnly: false },
                                                                { id: '002', state: "text", hidden: true, readOnly: false },
                                                                { id: '003', state: "text", hidden: true, readOnly: false },
                                                                { id: '004', state: "edit", hidden: false, readOnly: false }
                                                            ]
                                                        },
                                                        {
                                                            formState: "edit",
                                                            Controls: [
                                                                { id: '001', state: "edit", hidden: false, readOnly: false },
                                                                { id: '002', state: "edit", hidden: true, readOnly: false },
                                                                { id: '003', state: "edit", hidden: true, readOnly: false },
                                                                { id: '004', state: "edit", hidden: false, readOnly: false }
                                                            ]
                                                        },
                                                        {
                                                            formState: "text",
                                                            Controls: [
                                                                { id: '001', state: "text", hidden: false, readOnly: false },
                                                                { id: '002', state: "text", hidden: true, readOnly: false },
                                                                { id: '003', state: "text", hidden: true, readOnly: false },
                                                                { id: '004', state: "text", hidden: false, readOnly: false }
                                                            ]
                                                        }
            
                                                    ],
                                                    ajaxConfig: [
                                                        {
                                                            "id": "loadform",
                                                            "url": "resource/SMT_SETTING_FUNC/query",
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
                                                "id": "edit_page_form",
                                                "type": "confirm",
                                                "title": "页面编辑",
                                                "cancelText": "取消",
                                                "okText": "提交",
                                                "form": {
                                                    "id": "form_01",
                                                    "type": "form",
                                                    "component": "form",
                                                    state: 'new',
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
                                                                            "id": "001"  // id 和引用id 值相同
                                                                        }
                                                                    },
                                                                    {
                                                                        "id": "iHspYn", "col": "cc", "type": "col",
                                                                        "title": "列iHspYn", "span": 24,
                                                                        "layoutContain": "input",
                                                                        "size": {
                                                                            "nzXs": 24, "nzSm": 24, "nzMd": 24, "nzLg": 24, "ngXl": 24, "nzXXl": 24
                                                                        },
                                                                        "control": {
                                                                            "id": "004"  // id 和引用id 值相同
                                                                        }
                                                                    },
                                                                    {
                                                                        "id": "iHspYn", "col": "cc", "type": "col",
                                                                        "title": "列iHspYn", "span": 24,
                                                                        "layoutContain": "input",
                                                                        "size": {
                                                                            "nzXs": 24, "nzSm": 24, "nzMd": 24, "nzLg": 24, "ngXl": 24, "nzXXl": 24
                                                                        },
                                                                        "control": {
                                                                            "id": "005"  // id 和引用id 值相同
                                                                        }
                                                                    },
                                                                    {
                                                                        "id": "iHspYn", "col": "cc", "type": "col",
                                                                        "title": "列iHspYn", "span": 24,
                                                                        "layoutContain": "input",
                                                                        "size": {
                                                                            "nzXs": 24, "nzSm": 24, "nzMd": 24, "nzLg": 24, "ngXl": 24, "nzXXl": 24
                                                                        },
                                                                        "control": {
                                                                            "id": "006"  // id 和引用id 值相同
                                                                        }
                                                                    },
                                                                    // {
                                                                    //     "id": "ioj0mV", "col": "cc", "type": "col", "title": "列ioj0mV", "span": 24, "layoutContain": "select",
                                                                    //     "size": {
                                                                    //         "nzXs": 24, "nzSm": 24, "nzMd": 24, "nzLg": 24, "ngXl": 24, "nzXXl": 24
                                                                    //     },
                                                                    //     "control": { "id": "002" }
                                                                    // },
                                                                    // {
                                                                    //     "id": "ioj0mV", "col": "cc", "type": "col", "title": "列ioj0mV", "span": 12, "layoutContain": "select",
                                                                    //     "size": {
                                                                    //         "nzXs": 12, "nzSm": 12, "nzMd": 12, "nzLg": 12, "ngXl": 12, "nzXXl": 12
                                                                    //     },
                                                                    //     "control": { "id": "003" }
                                                                    // },
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
                                                            id: '001',
                                                            "hidden": true,
                                                            "title": '名称',
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
                                                                    { validator: "required", type: "default", "message": "请输入页面名称 " }
                                                                ]
                                                            }
                                                        },
                                                        {
                                                            id: '002',
                                                            "hidden": true,
                                                            "title": '',
                                                            "titleConfig": {
                                                                required: false
                                                            },
                                                            "field": "ID",
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
                                                            id: '003',
                                                            "hidden": true,
                                                            "title": '',
                                                            "titleConfig": {
                                                                required: false
                                                            },
                                                            "field": "FUNC_ID",
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
                                                            "text": {
                                                                "type": 'label',
                                                                "field": 'FUNC_ID',
                                                            },
                                                            "editor": {
                                                                "type": "input",
                                                                "field": "FUNC_ID",
                                                                "placeholder": "请输入",
                                                                "validations": [
            
                                                                ]
                                                            }
                                                        },
                                                        {
                                                            id: '004',
                                                            "hidden": true,
                                                            "title": '页面编码',
                                                            "titleConfig": {
                                                                required: true
                                                            },
                                                            "field": "CODE",
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
                                                                "field": 'CODE',
                                                            },
                                                            "editor": {
                                                                "type": "input",
                                                                "field": "CODE",
                                                                "placeholder": "请输入",
                                                                "validations": [
                                                                    { validator: "required", type: "default", "message": "请输入编码" }
                                                                ]
                                                            }
                                                        },
                                                        {
                                                            id: '005',
                                                            "hidden": true,
                                                            "title": '是否启用',
                                                            "titleConfig": {
                                                                required: true
                                                            },
                                                            "field": "STATE",
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
                                                                "field": 'STATE',
                                                            },
                                                            "editor": {
                                                                "type": "select",
                                                                "field": "STATE",
                                                                "placeholder": "请输选择",
                                                                "options": [
                                                                    { "label": "启用", "value": 1 },
                                                                    { "label": "禁用", "value": 2 }
                                                                ],
                                                                "defaultValue": "object",
                                                                "labelName": "label",
                                                                "valueName": "value"
                                                            }
                                                        },
                                                        {
                                                            id: '006',
                                                            "hidden": true,
                                                            "title": '公开方式',
                                                            "titleConfig": {
                                                                required: true
                                                            },
                                                            "field": "ACCESS_PERMISSION",
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
                                                                "field": 'ACCESS_PERMISSION',
                                                            },
                                                            "editor": {
                                                                "type": "select",
                                                                "field": "ACCESS_PERMISSION",
                                                                "placeholder": "请输选择",
                                                                "options": [
                                                                    { "label": "私有", "value": "private" },
                                                                    { "label": "公开", "value": "public" }
                                                                ],
                                                                "defaultValue": "object",
                                                                "labelName": "label",
                                                                "valueName": "value"
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
                                                                { id: '001', state: "edit", hidden: false, readOnly: false },
                                                                { id: '002', state: "edit", hidden: true, readOnly: false },
                                                                { id: '003', state: "edit", hidden: true, readOnly: false },
                                                                { id: '004', state: "edit", hidden: false, readOnly: false },
                                                                { id: '005', state: "edit", hidden: false, readOnly: false },
                                                                { id: '006', state: "edit", hidden: false, readOnly: false }
                                                            ]
                                                        },
                                                        {
                                                            formState: "edit",
                                                            Controls: [
                                                                { id: '001', state: "edit", hidden: false, readOnly: false },
                                                                { id: '002', state: "edit", hidden: true, readOnly: false },
                                                                { id: '003', state: "edit", hidden: true, readOnly: false },
                                                                { id: '004', state: "edit", hidden: false, readOnly: false },
                                                                { id: '005', state: "edit", hidden: false, readOnly: false },
                                                                { id: '006', state: "edit", hidden: false, readOnly: false }
                                                            ]
                                                        },
                                                        {
                                                            formState: "text",
                                                            Controls: [
                                                                { id: '001', state: "text", hidden: false, readOnly: false },
                                                                { id: '002', state: "text", hidden: true, readOnly: false },
                                                                { id: '003', state: "text", hidden: true, readOnly: false },
                                                                { id: '004', state: "text", hidden: false, readOnly: false },
                                                                { id: '005', state: "edit", hidden: false, readOnly: false },
                                                                { id: '006', state: "edit", hidden: false, readOnly: false }
                                                            ]
                                                        }
            
                                                    ],
                                                    ajaxConfig: [
                                                        {
                                                            "id": "loadform",
                                                            "url": "resource/SMT_SETTING_PAGE/query",
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
                                                "id": "tree_add_func",
                                                "url": "resource/SMT_SETTING_FUNC/insert",
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
                                                        "valueName": "CODE",
                                                        "dataType": "string"
                                                    },
                                                    {
                                                        "name": "PID",
                                                        "type": "value",
                                                        "valueName": null
                                                    }
                                                ],
                                                "outputParameters": [
            
                                                ],
                                                "result": [
                                                    {
                                                        "name": "data",
                                                        "showMessageWithNext": 0,
                                                        "message": "message.ajax.state.success",
                                                        "senderId": "aftetFuncSaveSuccessfully"
                                                    }
                                                ]
                                            },
                                            {
                                                "id": "tree_edit_func",
                                                "url": "resource/SMT_SETTING_FUNC/update",
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
                                                        "valueName": "CODE",
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
                                                        "senderId": "afterFuncUpdateSuccessfully"
                                                    }
                                                ]
                                            },
                                            {
                                                "id": "tree_add_page",
                                                "url": "resource/SMT_SETTING_PAGE/insert",
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
                                                        "name": "STATE",
                                                        "type": "componentValue",
                                                        "valueName": "STATE",
                                                        "dataType": "string"
                                                    },
                                                    {
                                                        "name": "PID",
                                                        "type": "tempValue",
                                                        "valueName": "PID"
                                                    },
                                                    {
                                                        "name": "ACCESS_PERMISSION",
                                                        "type": "componentValue",
                                                        "valueName": "ACCESS_PERMISSION",
                                                        "dataType": "string"
                                                    },
                                                    {
                                                        "name": "FUNC_ID",
                                                        "type": "tempValue",
                                                        "valueName": "FUNC_ID"
                                                    }
                                                ],
                                                "outputParameters": [
            
                                                ],
                                                "result": [
                                                    {
                                                        "name": "data",
                                                        "showMessageWithNext": 0,
                                                        "message": "message.ajax.state.success",
                                                        "senderId": "afterLayoutVersionSaveSuccessfully"
                                                    }
                                                ]
                                            },
                                            {
                                                "id": "tree_edit_page",
                                                "url": "resource/SMT_SETTING_PAGE/update",
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
                                                        "valueName": "CODE",
                                                        "dataType": "string"
                                                    },
                                                    {
                                                        "name": "ACCESS_PERMISSION",
                                                        "type": "componentValue",
                                                        "valueName": "ACCESS_PERMISSION",
                                                        "dataType": "string"
                                                    },
                                                    {
                                                        "name": "STATE",
                                                        "type": "componentValue",
                                                        "valueName": "STATE",
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
                                                        "senderId": "afterOfficeUpdateSuccessfully"
                                                    }
                                                ]
                                            },
                                            {
                                                "id": "tree_delete",
                                                "url": "resource/DEL_FUNC_OR_PAGE/OFFICE_SHEET",
                                                "urlType": "inner",
                                                "ajaxType": "delete",
                                                "params": [
                                                    {
                                                        "name": "ids",
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
                                                        "senderId": "afterOfficeDeleteSuccessfully"
                                                    }
                                                ]
                                            },
                                            {
                                                "id": "tree_batch_delete_office",
                                                "url": "office/delete/OFFICE_SHEET",
                                                "urlType": "inner",
                                                "ajaxType": "delete",
                                                "params": [
                                                    {
                                                        "name": "ID",
                                                        "type": "checkedId",
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
                                                        "senderId": "afterOfficeBatchDeleteSuccessfully"
                                                    }
                                                ]
                                            }
                                        ],
                                        "beforeTrigger": [
            
                                        ],
                                        "afterTrigger": [
                                            {
                                                "id": "",
                                                "senderId": "view_tree_func",
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
                                                "targetViewId": "view_tree_func",
                                                "dropdown": [
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
                                                        "text": "新增功能",
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
                                                                "dialogId": "edit_func_form",
                                                                "ajaxId": "tree_add_func"
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        "id": "M_addChildNode",
                                                        "text": "新增页面",
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
                                                                "dialogId": "edit_page_form",
                                                                "ajaxId": "tree_add_page",
                                                                "changeValueId": "add_child_form_changeValue"
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        "id": "M_editTreeNode",
                                                        "text": "编辑功能",
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
                                                                "dialogId": "edit_func_form",
                                                                "ajaxId": "tree_edit_func",
                                                                "changeValueId": "edit_form_changeValue"
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        "id": "M_editTreeNodePage",
                                                        "text": "编辑页面",
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
                                                                "dialogId": "edit_page_form",
                                                                "ajaxId": "tree_edit_page",
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
                                                                "ajaxId": "tree_delete_office"
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        "id": "M_deleteRow_m",
                                                        "text": "批量删除",
                                                        "icon": "delete",
                                                        "color": "text-red-light",
                                                        "hidden": false,
                                                        "disabled": false,
                                                        "execute": [
                                                            {
                                                                "triggerType": "OPERATION",
                                                                "trigger": "EXECUTE_DELETE_CHECKED_NODES_BY_ID",
                                                                // "conditionId": "delete_operation_1",
                                                                "ajaxId": "tree_batch_delete_office"
                                                            }
                                                        ]
                                                    }
                                                ]
                                            },
            
                                        ]
                                    }

                                },
                                "size": {
                                    "nzXs": 6,
                                    "nzSm": 6,
                                    "nzMd": 6,
                                    "nzLg": 6,
                                    "nzXl": 6,
                                    "nzXXl": 6
                                },
                                "component": {
                                    "id": "view_tree_func",
                                    "title": "树",
                                    "titleIcon": "right-circle",
                                    "component": "cnTree",
                                    "keyId": "ID",
                                    "async": true,
                                    "showCheckBox": true,
                                    "expandAll": false,
                                    "loadingOnInit": true,
                                    "showLine": false,
                                    "rootTitle": '根节点',
                                    "loadingConfig": {
                                        "url": "resource/GET_FUNC_TREE/query",
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
                                                "value": "2"
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
                                        "url": "resource/GET_FUNC_TREE/query",
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
                                                "value": "2"
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
                                            "title": "NAME",
                                            "type": "title",
                                            "field": "NAME"
                                        },
                                        // {
                                        //     "title": "ACTION",
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
                                                "senderId": "view_tree_func",
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
                                                                "name": "PID",
                                                                "type": "item",
                                                                "valueName": "ID"
                                                            }
                                                        ]
                                                    }
                                                ]
                                            },
                                            {
                                                "id": "grid_sender_03",
                                                "senderId": "view_tree_func",
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
                                                                "value": "view_tree_func",
                                                                "type": "value"
                                                            }
                                                        ]
                                                    }
                                                ]
                                            },
                                            {
                                                "id": "grid_sender_04",
                                                "senderId": "view_tree_func",
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
                                                                "value": "view_tree_func",
                                                                "type": "value"
                                                            }
                                                        ]
                                                    }
                                                ]
                                            },
                                            {
                                                "id": "grid_sender_05",
                                                "senderId": "view_tree_func",
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
                                                                "value": "view_tree_func",
                                                                "type": "value"
                                                            }
                                                        ]
                                                    }
                                                ]
                                            },
                                            {
                                                "id": "grid_sender_06",
                                                "senderId": "view_tree_func",
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
                                                                "value": "view_tree_func",
                                                                "type": "value"
                                                            }
                                                        ]
                                                    }
                                                ]
                                            },
                                            {
                                                "id": "grid_sender_07",
                                                "senderId": "view_tree_func",
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
                                                                "value": "view_tree_func",
                                                                "type": "value"
                                                            }
                                                        ]
                                                    }
                                                ]
                                            },
                                            {
                                                "id": "grid_sender_08",
                                                "senderId": "view_tree_func",
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
                                                                "value": "view_tree_func",
                                                                "type": "value"
                                                            }
                                                        ]
                                                    }
                                                ]
                                            },
                                            {
                                                "id": "aftetFuncSaveSuccessfully",
                                                "senderId": "view_tree_func",
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
                                                "id": "afterFuncUpdateSuccessfully",
                                                "senderId": "view_tree_func",
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
                                                "id": "afterLayoutVersionSaveSuccessfully",
                                                "senderId": "view_tree_func",
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
                                                                "name": "ID",
                                                                "type": "addedRows",
                                                                "valueName": "ID"
                                                            },
                                                            {
                                                                "name": "NAME",
                                                                "type": "addedRows",
                                                                "valueName": "NAME"
                                                            },
                                                            {
                                                                "name": "PID",
                                                                "type": "addedRows",
                                                                "valueName": "PID"
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        "beforeSend": {},
                                                        "reveicerId": "",
                                                        "receiverTriggerType": "BEHAVIOR",
                                                        "receiverTrigger": "REFRESH_AS_CHILD",
                                                        "params": [
                                                            {
                                                                "name": "PID",
                                                                "type": "item",
                                                                "valueName": "ID"
                                                            }
                                                        ]
                                                    }
                                                ]
                                            },
                                            {
                                                "id": "afterOfficeUpdateSuccessfully",
                                                "senderId": "view_tree_func",
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
                                                                "valueName": "NAME"
                                                            }
                                                        ]
                                                    }
                                                ]
                                            },
                                            {
                                                "id": "afterOfficeDeleteSuccessfully",
                                                "senderId": "view_tree_func",
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
                                                "id": "afterOfficeBatchDeleteSuccessfully",
                                                "senderId": "view_tree_func",
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
                                                        "receiverTrigger": "DELETE_CHECKED_NODES",
                                                        "params": [
                                                            {
                                                                "name": "ids",
                                                                "type": "returnValue",
                                                                "valueName": "ids"
                                                            }
                                                        ]
                                                    }
                                                ]
                                            },
                                            {
                                                "id": "afterProvinceSaveValidation",
                                                "senderId": "view_tree_func",
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
                                                "senderId": "view_tree_func",
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
                                                "senderId": "view_tree_func",
                                                "receiveData": [
                                                    {
                                                        "triggerType": "ACTION",
                                                        "trigger": "APPEND_CHILD_TO_SELECTED_NODE"
                                                    }
                                                ]
                                            },
                                            {
                                                "id": "s_202",
                                                "senderId": "view_tree_func",
                                                "receiveData": [
                                                    {
                                                        "triggerType": "ACTION",
                                                        "trigger": "APPEND_CHILD_TO_ROOT_NODE"
                                                    }
                                                ]
                                            },
                                            {
                                                "id": "s_203",
                                                "senderId": "view_tree_func",
                                                "receiveData": [
                                                    {
                                                        "triggerType": "ACTION",
                                                        "trigger": "UPDATE_SELECTED_NODE"
                                                    }
                                                ]
                                            },
                                            {
                                                "id": "s_204",
                                                "senderId": "view_tree_func",
                                                "receiveData": [
                                                    {
                                                        "triggerType": "ACTION",
                                                        "trigger": "MESSAGE"
                                                    }
                                                ]
                                            },
                                            {
                                                "id": "s_205",
                                                "senderId": "view_tree_func",
                                                "receiveData": [
                                                    {
                                                        "triggerType": "ACTION",
                                                        "trigger": "DELETE_SELECTED_NODE"
                                                    }
                                                ]
                                            },
                                            {
                                                "id": "s_205",
                                                "senderId": "view_tree_func",
                                                "receiveData": [
                                                    {
                                                        "triggerType": "ACTION",
                                                        "trigger": "DELETE_CHECKED_NODES"
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
                                            "senderId": "view_tree_func",
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
                                            "senderId": "view_tree_func",
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
                                "title": "页面版本",
                                "span": 18,
                                "container": "layout",
                                "size": {
                                    "nzXs": 18,
                                    "nzSm": 18,
                                    "nzMd": 18,
                                    "nzLg": 18,
                                    "nzXl": 18,
                                    "nzXXl": 18
                                },
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
                                                    "header": {
                                                        "title": "功能页面",
                                                        "icon":"table",
                                                        "toolbar": {
                                                            "id": "toolbar_layout",
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
                                                                            "name": "ID",
                                                                            "type": "item",
                                                                            "valueName": "ID",
                                                                            "valueTo": "tempValue"
                                                                        }
            
                                                                    ]
                                                                },
                                                                {
                                                                    "id": "edit_form_changeValue_new",
                                                                    "params": [
                                                                        {
                                                                            "name": "PID",
                                                                            "type": "tempValue",
                                                                            "valueName": "PID",
                                                                            "valueTo": "tempValue"
                                                                        }
                                                                    ]
                                                                }
                                                            ],
                                                            "dialog": [
                                                                {
                                                                    "id": "edit_layout_version_form",
                                                                    "type": "confirm",
                                                                    "title": "版本编辑",
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
                                                                                                "id": "layout_version_name"  // id 和引用id 值相同
                                                                                            }
                                                                                        },
                                                                                        {
                                                                                            "id": "iHspYn", "col": "cc", "type": "col",
                                                                                            "title": "列iHspYn", "span": 24,
                                                                                            "layoutContain": "input",
                                                                                            "size": {
                                                                                                "nzXs": 24, "nzSm": 24, "nzMd": 24, "nzLg": 24, "ngXl": 24, "nzXXl": 24
                                                                                            },
                                                                                            "control": {
                                                                                                "id": "layout_version"  // id 和引用id 值相同
                                                                                            }
                                                                                        },
                                                                                        {
                                                                                            "id": "iHspYn", "col": "cc", "type": "col",
                                                                                            "title": "列iHspYn", "span": 24,
                                                                                            "layoutContain": "input",
                                                                                            "size": {
                                                                                                "nzXs": 24, "nzSm": 24, "nzMd": 24, "nzLg": 24, "ngXl": 24, "nzXXl": 24
                                                                                            },
                                                                                            "control": {
                                                                                                "id": "layout_version_state"  // id 和引用id 值相同
                                                                                            }
                                                                                        }
                                                                                    ]
                                                                                }]
                                                                        },
                                                                        formControls: [
                                                                            {
                                                                                id: 'layout_version_name',
                                                                                "hidden": true,
                                                                                "title": '版本名称',
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
                                                                                    "field": 'VERSION',
                                                                                },
                                                                                "editor": {
                                                                                    "type": "input",
                                                                                    "field": "NAME",
                                                                                    "placeholder": "请输入",
                                                                                    "validations": [
                                                                                        { validator: "required", type: "default", "message": "请输入版本名称" }
                                                                                    ]
                                                                                }
                                                                            },
                                                                            {
                                                                                id: 'layout_version',
                                                                                "hidden": true,
                                                                                "title": '版本号',
                                                                                "titleConfig": {
                                                                                    required: true
                                                                                },
                                                                                "field": "VERSION",
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
                                                                                    "field": 'VERSION',
                                                                                },
                                                                                "editor": {
                                                                                    "type": "input",
                                                                                    "field": "VERSION",
                                                                                    "placeholder": "请输入",
                                                                                    "validations": [
                                                                                        { validator: "required", type: "default", "message": "请输入版本号" }
                                                                                    ]
                                                                                }
                                                                            },
                                                                            {
                                                                                id: 'layout_version_state',
                                                                                "hidden": true,
                                                                                "title": '是否启用',
                                                                                "titleConfig": {
                                                                                    required: true
                                                                                },
                                                                                "field": "STATE",
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
                                                                                    "field": 'STATE',
                                                                                },
                                                                                "editor": {
                                                                                    "type": "select",
                                                                                    "field": "STATE",
                                                                                    "placeholder": "请输选择",
                                                                                    "options": [
                                                                                        { "label": "启用", "value": 1 },
                                                                                        { "label": "禁用", "value": 2 }
                                                                                    ],
                                                                                    "defaultValue": "object",
                                                                                    "labelName": "label",
                                                                                    "valueName": "value"
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
                                                                                    { id: 'layout_version_name', state: "edit", hidden: false, readOnly: false },
                                                                                    { id: 'layout_version', state: "edit", hidden: false, readOnly: false },
                                                                                    { id: 'layout_version_state', state: "edit", hidden: false, readOnly: false }
                                                                                ]
                                                                            },
                                                                            {
                                                                                formState: "edit",
                                                                                Controls: [
                                                                                    { id: 'layout_version_name', state: "edit", hidden: false, readOnly: false },
                                                                                    { id: 'layout_version', state: "edit", hidden: false, readOnly: false },
                                                                                    { id: 'layout_version_state', state: "edit", hidden: false, readOnly: false }
                                                                                ]
                                                                            },
                                                                            {
                                                                                formState: "text",
                                                                                Controls: [
                                                                                    { id: 'layout_version_name', state: "edit", hidden: false, readOnly: false },
                                                                                    { id: 'layout_version', state: "edit", hidden: false, readOnly: false },
                                                                                    { id: 'layout_version_state', state: "edit", hidden: false, readOnly: false }
                                                                                ]
                                                                            }
            
                                                                        ],
                                                                        ajaxConfig: [
                                                                            {
                                                                                "id": "loadform",
                                                                                "url": "resource/SMT_SETTING_LAYOUT/query",
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
                                                                    "id": "edit_layout_version_form_json",
                                                                    "type": "confirm",
                                                                    "title": "版本JSON编辑",
                                                                    "width": "100%",
                                                                    "style": { "top": "0px", "padding-bottom": "0px" },
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
                                                                                                "id": "layout_version_pagejson"  // id 和引用id 值相同
                                                                                            }
                                                                                        }
                                                                                    ]
                                                                                }]
                                                                        },
                                                                        formControls: [
                                                                            {
                                                                                id: 'layout_version_pagejson',
                                                                                "hidden": true,
                                                                                "title": '版本页面json',
                                                                                "titleConfig": {
                                                                                    required: true
                                                                                },
                                                                                "field": "PAGE_JSON",
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
                                                                                    "type": "codeEdit",
                                                                                    "field": "PAGE_JSON",
                                                                                    "autofocus": false,
                                                                                    "mode": "text/javascript",
                                                                                    "readOnly": true,
                                                                                    "height": 650
                                                                                },
                                                                                "editor": {
                                                                                    "type": "codeEdit",
                                                                                    "field": "PAGE_JSON",
                                                                                    "mode": "text/javascript",
                                                                                    "placeholder": "请输入",
                                                                                    "autofocus": true,
                                                                                    "readOnly": false,
                                                                                    "height": 650,
                                                                                    "nzWidth": '100%',
                                                                                    "width": '100%',
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
                                                                                    { id: 'layout_version_pagejson', state: "edit", hidden: false, readOnly: false }
            
                                                                                ]
                                                                            },
                                                                            {
                                                                                formState: "edit",
                                                                                Controls: [
                                                                                    { id: 'layout_version_pagejson', state: "edit", hidden: false, readOnly: false }
            
                                                                                ]
                                                                            },
                                                                            {
                                                                                formState: "text",
                                                                                Controls: [
                                                                                    { id: 'layout_version_pagejson', state: "edit", hidden: false, readOnly: false }
            
                                                                                ]
                                                                            }
            
                                                                        ],
                                                                        ajaxConfig: [
                                                                            {
                                                                                "id": "loadform",
                                                                                "url": "resource/SMT_SETTING_LAYOUT/query",
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
                                                                    "id": "cfg_page_layout",
                                                                    "type": "confirm",
                                                                    "title": "页面设置",
                                                                    "width": "100%",
                                                                    "style": { "top": "0px", "padding-bottom": "0px" },
                                                                    "cancelText": "取消",
                                                                    "okText": "确定",
                                                                    "form": {
                                                                        "id": "cfg_page_layout",
                                                                        "type": "cfgLayoutPage",
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
                                                                    "id": "city_condition_added_none",
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
                                                                    "id": "city_condition_edited_none",
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
                                                                    "id": "form_add_layout_version",
                                                                    "url": "resource/SMT_SETTING_LAYOUT/insert",
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
                                                                            "valueName": "NAME"
                                                                        },
                                                                        {
                                                                            "name": "VERSION",
                                                                            "type": "componentValue",
                                                                            "valueName": "VERSION"
                                                                        },
                                                                        {
                                                                            "name": "STATE",
                                                                            "type": "componentValue",
                                                                            "valueName": "STATE"
                                                                        },
                                                                        {
                                                                            "name": "PAGE_ID",
                                                                            "type": "tempValue",
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
                                                                            "senderId": "afterLayoutVersionSaveSuccessfully"
                                                                        },
                                                                        {
                                                                            "name": "validation",
                                                                            "message": "message.ajax.state.success",
                                                                            "senderId": "afterLayoutVersionSaveValidation"
                                                                        },
                                                                        {
                                                                            "name": "error",
                                                                            "senderId": "toolbar_02"
                                                                        }
                                                                    ]
                                                                },
                                                                {
                                                                    "id": "form_edit_layout_version",
                                                                    "url": "resource/SMT_SETTING_LAYOUT/update",
                                                                    "urlType": "inner",
                                                                    "ajaxType": "put",
                                                                    "params": [
                                                                        {
                                                                            "name": "ID",
                                                                            "type": "tempValue",
                                                                            "valueName": "ID"
                                                                        },
                                                                        {
                                                                            "name": "NAME",
                                                                            "type": "componentValue",
                                                                            "valueName": "NAME"
                                                                        },
                                                                        {
                                                                            "name": "VERSION",
                                                                            "type": "componentValue",
                                                                            "valueName": "VERSION"
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
                                                                            "senderId": "afterCityUpdateFormSuccessfully"
                                                                        },
                                                                        {
                                                                            "name": "validation",
                                                                            "showMessageWithNext": 0,
                                                                            "message": "message.ajax.state.success",
                                                                            "senderId": "afterCityUpdateFormValidation"
                                                                        },
                                                                        {
                                                                            "name": "error",
                                                                            "senderId": "toolbar_02"
                                                                        }
                                                                    ]
                                                                },
                                                                {
                                                                    "id": "form_edit_layout_version_json",
                                                                    "url": "resource/SMT_SETTING_LAYOUT/update",
                                                                    "urlType": "inner",
                                                                    "ajaxType": "put",
                                                                    "params": [
                                                                        {
                                                                            "name": "ID",
                                                                            "type": "tempValue",
                                                                            "valueName": "ID"
                                                                        },
                                                                        {
                                                                            "name": "PAGE_JSON",
                                                                            "type": "componentValue",
                                                                            "valueName": "PAGE_JSON"
                                                                        }
                                                                    ],
                                                                    "outputParameters": [
            
                                                                    ],
                                                                    "result": [
                                                                        {
                                                                            "name": "data",
                                                                            "showMessageWithNext": 0,
                                                                            "message": "message.ajax.state.success",
                                                                            "senderId": "afterCityUpdateFormSuccessfully"
                                                                        },
                                                                        {
                                                                            "name": "validation",
                                                                            "showMessageWithNext": 0,
                                                                            "message": "message.ajax.state.success",
                                                                            "senderId": "afterCityUpdateFormValidation"
                                                                        },
                                                                        {
                                                                            "name": "error",
                                                                            "senderId": "toolbar_02"
                                                                        }
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
                                                                            "id": "M_addRowForm",
                                                                            "text": "新增版本",
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
                                                                                    "dialogId": "edit_layout_version_form",
                                                                                    "ajaxId": "form_add_layout_version",
                                                                                    "changeValueId": "edit_form_changeValue_new"
                                                                                }
                                                                            ]
                                                                        },
                                                                        {
                                                                            "id": "M_editRowForm",
                                                                            "text": "修改",
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
                                                                                    "dialogId": "edit_layout_version_form",
                                                                                    "ajaxId": "form_edit_layout_version",
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
                                                                                    "trigger": "EXECUTE_CHECKED_ROWS_IDS",
                                                                                    "conditionId": "delete_operation_2",
                                                                                    "ajaxId": "delete_row_2"
                                                                                }
                                                                            ]
                                                                        },
            
                                                                        {
                                                                            "id": "M_deleteRow",
                                                                            "text": "页面设置",
                                                                            "icon": "setting",
                                                                            "color": "text-red-light",
                                                                            "hidden": false,
                                                                            "disabled": false,
                                                                            "execute": [
                                                                                {
                                                                                    "triggerType": "ACTION",
                                                                                    "trigger": "DIALOG",
                                                                                    "dialogId": "cfg_page_layout",
                                                                                    // "ajaxId": "form_edit_layout_version",
                                                                                    "changeValueId": "edit_form_changeValue"
                                                                                }
                                                                            ]
                                                                        },
                                                                        {
                                                                            "id": "M_editRowFormjson",
                                                                            "text": "编辑页面JSON",
                                                                            "state": "edit",
                                                                            "icon": "edit",
                                                                            "color": "primary",
                                                                            "hidden": false,
                                                                            "disabled": false,
                                                                            "execute": [
                                                                                {
                                                                                    "triggerType": "ACTION",
                                                                                    "trigger": "DIALOG",
                                                                                    // "conditionId": "add_state_1"
                                                                                    "dialogId": "edit_layout_version_form_json",
                                                                                    "ajaxId": "form_edit_layout_version_json",
                                                                                    "changeValueId": "edit_form_changeValue"
                                                                                }
                                                                            ]
                                                                        },
                                                                    ]
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
                                                        "showCheckBox": true,
                                                        "pageSizeOptions": [10, 20, 50, 100],
                                                        "loadingOnInit": false,
                                                        "loadingConfig": {
                                                            "url": "resource/SMT_SETTING_LAYOUT/query",
                                                            "method": "get",
                                                            "params": [
                                                                {
                                                                    "name": "PAGE_ID",
                                                                    "type": "tempValue",
                                                                    "valueName": "PID"
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
                                                                "width": "220px",
                                                                // "width": "50px",
                                                                "style": {}
                                                            },
                                                            {
                                                                "title": "PID",
                                                                "type": "field",
                                                                "field": "PAGE_ID",
                                                                "hidden": true,
                                                                "showFilter": false,
                                                                "showSort": false,
                                                                // "width": "200px",
                                                                "style": {}
                                                            },
                                                            {
                                                                "title": "布局名称",
                                                                "type": "field",
                                                                "field": "NAME",
                                                                "hidden": false,
                                                                "showFilter": false,
                                                                "showSort": false,
                                                                // "width": "100px",
                                                                "style": {}
                                                            },
                                                            {
                                                                "title": "版本",
                                                                "type": "field",
                                                                "field": "VERSION",
                                                                "hidden": false,
                                                                "showFilter": false,
                                                                "showSort": false,
                                                                // "width": "100px",
                                                                "style": {}
                                                            },
                                                            {
                                                                "title": "状态",
                                                                "type": "field",
                                                                "field": "STATE",
                                                                "hidden": false,
                                                                "showFilter": false,
                                                                "showSort": false,
                                                                // "width": "100px",
                                                                "style": {}
                                                            },
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
                                                                                    "value": "view_tree_func",
                                                                                    "type": "value"
                                                                                }
                                                                            ]
                                                                        }
                                                                    ]
                                                                },
                                                                {
                                                                    "id": "afterLayoutVersionSaveSuccessfully",
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
                                                                            "receiverTrigger": "LOAD_REFRESH_DATA",
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
                                                                                    "name": "ID",
                                                                                    "type": "editedRows",
                                                                                    "valueName": "ID"
                                                                                }
                                                                            ]
                                                                        }
                                                                    ]
                                                                },
                                                                {
                                                                    "id": "afterLayoutVersionSaveValidation",
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
                                                                    "senderId": "view_tree_func",
                                                                    "receiveData": [
                                                                        {
                                                                            "beforeReceive": [],
                                                                            "triggerType": "BEHAVIOR",
                                                                            "trigger": "REFRESH_AS_CHILD",
                                                                            "params": [
                                                                                {
                                                                                    "pname": "PID",
                                                                                    "cname": "PID",
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
                                                                        "senderId": "afterLayoutVersionSaveSuccessfully"
                                                                    },
                                                                    {
                                                                        "name": "validation",
                                                                        "showMessageWithNext": 0,
                                                                        "message": "message.ajax.state.success",
                                                                        "senderId": "afterLayoutVersionSaveValidation"
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

    public ngOnInit() { }
}