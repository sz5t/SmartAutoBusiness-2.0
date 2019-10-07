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
    selector: 'base-inner-method-manager',
    templateUrl: './base-inner-method-manager.component.html',
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
export class BaseInnerMethodManagerComponent implements OnInit {
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
                            "id": "view_tree_component_base",
                            "component": "cnToolbar",
                            "size": "default",
                            "cascade": {
                                "messageSender": [
                                    {
                                        "id": "toolbar_01",
                                        "senderId": "view_tree_component_base",
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
                                    //     "senderId": "view_tree_component_base",
                                    //     "receiveData": [
                                    //         {
                                    //             "triggerType": "STATE",
                                    //             "trigger": "STATE_TO_TEXT"
                                    //         }
                                    //     ]
                                    // },
                                    // {
                                    //     "id": "s_002",
                                    //     "senderId": "view_tree_component_base",
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
                                    "id": "add_child_form_changeValue",
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
                                    "id": "form_component",
                                    "type": "confirm",
                                    "title": "新增组件信息",
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
                                                                "id": "ctl_name"  // id 和引用id 值相同
                                                            }
                                                        },
                                                        {
                                                            "id": "ioj0mV1", "col": "cc", "type": "col", "title": "列ioj0mV", "span": 24, "layoutContain": "select",
                                                            "size": {
                                                                "nzXs": 24, "nzSm": 24, "nzMd": 24, "nzLg": 24, "ngXl": 24, "nzXXl": 24
                                                            },
                                                            "control": { "id": "ctl_code" }
                                                        },
                                                        {
                                                            "id": "ioj0mV2", "col": "cc", "type": "col", "title": "列ioj0mV", "span": 24, "layoutContain": "select",
                                                            "size": {
                                                                "nzXs": 24, "nzSm": 24, "nzMd": 24, "nzLg": 24, "ngXl": 24, "nzXXl": 24
                                                            },
                                                            "control": { "id": "ctl_type" }
                                                        },
                                                        {
                                                            "id": "ioj0mV3", "col": "cc", "type": "col", "title": "列ioj0mV", "span": 24, "layoutContain": "select",
                                                            "size": {
                                                                "nzXs": 24, "nzSm": 24, "nzMd": 24, "nzLg": 24, "ngXl": 24, "nzXXl": 24
                                                            },
                                                            "control": { "id": "ctl_version" }
                                                        },
                                                        {
                                                            "id": "ioj0mV4", "col": "cc", "type": "col", "title": "列ioj0mV", "span": 24, "layoutContain": "select",
                                                            "size": {
                                                                "nzXs": 24, "nzSm": 24, "nzMd": 24, "nzLg": 24, "ngXl": 24, "nzXXl": 24
                                                            },
                                                            "control": { "id": "ctl_sort" }
                                                        },
                                                        {
                                                            "id": "ioj0mV5", "col": "cc", "type": "col", "title": "列ioj0mV", "span": 24, "layoutContain": "select",
                                                            "size": {
                                                                "nzXs": 24, "nzSm": 24, "nzMd": 24, "nzLg": 24, "ngXl": 24, "nzXXl": 24
                                                            },
                                                            "control": { "id": "ctl_state" }
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
                                                    { id: 'ctl_name', state: "edit", hidden: false, readOnly: false },
                                                    { id: 'ctl_code', state: "edit", hidden: true, readOnly: false },
                                                    { id: 'ctl_type', state: "edit", hidden: true, readOnly: false },
                                                    { id: 'ctl_version', state: "edit", hidden: true, readOnly: false },
                                                    { id: 'ctl_sort', state: "edit", hidden: true, readOnly: false },
                                                    { id: 'ctl_state', state: "edit", hidden: true, readOnly: false }
                                                ]
                                            }

                                        ],
                                        ajaxConfig: [
                                            {
                                                "id": "loadform",
                                                "url": "td/SMT_BASE_COMPONENT/query",
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
                                    "id": "form_method",
                                    "type": "confirm",
                                    "title": "新增组件内置操作信息",
                                    "cancelText": "取消",
                                    "okText": "提交",
                                    "form": {
                                        "id": "form_method_new",
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
                                                            "control": { "id": "prop_method" }
                                                        },
                                                        {
                                                            "id": "ioj0mV2", "col": "cc", "type": "col", "title": "列ioj0mV", "span": 24, "layoutContain": "select",
                                                            "size": {
                                                                "nzXs": 24, "nzSm": 24, "nzMd": 24, "nzLg": 24, "ngXl": 24, "nzXXl": 24
                                                            },
                                                            "control": { "id": "prop_type" }
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
                                                "title": "操作名称",
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
                                                        { validator: "required", type: "default", "message": "请输操作性名称" }
                                                    ]
                                                }
                                            },
                                            {
                                                id: 'prop_code',
                                                "hidden": true,
                                                "title": "操作编码",
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
                                                        { validator: "required", type: "default", "message": "请输入操作编码" }
                                                    ]
                                                }
                                            },
                                            {
                                                id: 'prop_method',
                                                "hidden": true,
                                                "title": "操作",
                                                "titleConfig": {
                                                    required: true
                                                },
                                                "field": "METHOD",
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
                                                    "field": 'METHOD',
                                                },
                                                "editor": {
                                                    "type": "input",
                                                    "field": "METHOD",
                                                    "placeholder": "请输入",
                                                    "validations": [
                                                        { validator: "required", type: "default", "message": "请输入操作" }
                                                    ]
                                                }
                                            },
                                            {
                                                id: 'prop_type',
                                                "hidden": true,
                                                "title": "操作类型",
                                                "titleConfig": {
                                                    required: true
                                                },
                                                "field": "METHOD_TYPE",
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
                                                    "field": 'METHOD_TYPE',
                                                },
                                                "editor": {
                                                    "type": "select",
                                                    "field": "METHOD_TYPE",
                                                    "placeholder": "请选择",
                                                    "options": [
                                                        { "label": "状态变更", "value": "STATE" },
                                                        { "label": "动作", "value": "ACTION" },
                                                        { "label": "行为", "value": "BEHAVIOR" },
                                                        { "label": "操作", "value": "OPERATION" }
                                                    ],
                                                    "validations": [
                                                        { validator: "required", type: "default", "message": "请选择操作类型" }
                                                    ],
                                                    "defaultValue": "STATE",
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
                                                    { id: 'prop_method', state: "edit", hidden: false, readOnly: false },
                                                    { id: 'prop_type', state: "edit", hidden: false, readOnly: false },
                                                    { id: 'prop_remark', state: "edit", hidden: false, readOnly: false },
                                                    { id: 'prop_cmptId', state: "edit", hidden: false, readOnly: false }

                                                ]
                                            },
                                            {
                                                formState: "edit",
                                                Controls: [
                                                    { id: 'prop_name', state: "edit", hidden: false, readOnly: false },
                                                    { id: 'prop_code', state: "edit", hidden: false, readOnly: false },
                                                    { id: 'prop_method', state: "edit", hidden: false, readOnly: false },
                                                    { id: 'prop_type', state: "edit", hidden: false, readOnly: false },
                                                    { id: 'prop_remark', state: "edit", hidden: false, readOnly: false },
                                                    { id: 'prop_cmptId', state: "edit", hidden: false, readOnly: false }
                                                ]
                                            },
                                            {
                                                formState: "text",
                                                Controls: [
                                                    { id: 'prop_name', state: "text", hidden: false, readOnly: true },
                                                    { id: 'prop_code', state: "text", hidden: false, readOnly: true },
                                                    { id: 'prop_method', state: "edit", hidden: false, readOnly: false },
                                                    { id: 'prop_type', state: "text", hidden: false, readOnly: true },
                                                    { id: 'prop_remark', state: "text", hidden: false, readOnly: true },
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
                                    "id": "tree_add_method",
                                    "url": "td/SMT_BASE_INNER_METHOD/insert",
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
                                            "name": "METHOD",
                                            "type": "componentValue",
                                            "valueName": "METHOD"
                                        },
                                        {
                                            "name": "METHOD_TYPE",
                                            "type": "componentValue",
                                            "valueName": "METHOD_TYPE"
                                        },
                                        {
                                            "name": "CMPT_ID",
                                            "type": "tempValue",
                                            "valueName": "CMPT_ID"
                                        },
                                        {
                                            "name": "REMARK",
                                            "type": "componentValue",
                                            "valueName": "REMARK"
                                        }
                                    ],
                                    "outputParameters": [

                                    ],
                                    "result": [
                                        {
                                            "name": "data",
                                            "showMessageWithNext": 0,
                                            "message": "message.ajax.state.success",
                                            "senderId": "afterMethodSaveSuccess"
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
                                    "id": "tree_edit_method",
                                    "url": "td/SMT_BASE_INNER_METHOD/update",
                                    "urlType": "inner",
                                    "ajaxType": "put",
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
                                            "name": "DATA_TYPE",
                                            "type": "componentValue",
                                            "valueName": "DATA_TYPE"
                                        },
                                        {
                                            "name": "CMPT_ID",
                                            "type": "componentValue",
                                            "valueName": "CMPT_ID"
                                        },
                                        {
                                            "name": "REMARK",
                                            "type": "componentValue",
                                            "valueName": "REMARK"
                                        }
                                    ],
                                    "outputParameters": [

                                    ],
                                    "result": [
                                        {
                                            "name": "data",
                                            "showMessageWithNext": 0,
                                            "message": "message.ajax.state.success",
                                            "senderId": "afterComponentSaveSuccess"
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
                                    "id": "tree_add_component",
                                    "url": "td/SMT_BASE_COMPONENT/insert",
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
                                        }
                                    ],
                                    "outputParameters": [

                                    ],
                                    "result": [
                                        {
                                            "name": "data",
                                            "showMessageWithNext": 0,
                                            "message": "message.ajax.state.success",
                                            "senderId": "afterComponentSaveSuccess"
                                        }
                                    ]
                                },
                                {
                                    "id": "tree_edit_component",
                                    "url": "td/SMT_BASE_COMPONENT/update",
                                    "urlType": "inner",
                                    "ajaxType": "put",
                                    "params": [
                                        {
                                            "name": "ID",
                                            "type": "componentValue",
                                            "valueName": "ID",
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
                                            "valueName": "SORT"
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
                                            "senderId": "afterComponentUpdateSuccess"
                                        }
                                    ]
                                },
                                {
                                    "id": "tree_delete_component",
                                    "url": "td/SMT_BASE_COMPONENT/delete",
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
                                            "senderId": "afterComponentDeleteSuccess"
                                        }
                                    ]
                                },
                                {
                                    "id": "tree_batch_delete_component",
                                    "url": "td/SMT_BASE_COMPONENT/delete",
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
                                            "senderId": "afterComponentBatchDeleteSuccess"
                                        }
                                    ]
                                },
                                {
                                    "id": "tree_delete_component",
                                    "url": "td/SMT_BASE_INNER_PROPERTY/delete",
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
                                            "senderId": "afterComponentDeleteSuccess"
                                        }
                                    ]
                                },
                            ],
                            "beforeTrigger": [

                            ],
                            "afterTrigger": [
                                {
                                    "id": "",
                                    "senderId": "view_tree_component_base",
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
                                    "targetViewId": "view_tree_component_base",
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
                                            "text": "新增组件",
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
                                                    "dialogId": "form_component",
                                                    "ajaxId": "tree_add_component"
                                                }
                                            ]
                                        },
                                        {
                                            "id": "M_addChildNode",
                                            "text": "新增操作",
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
                                                    "dialogId": "form_method",
                                                    "ajaxId": "tree_add_method",
                                                    "changeValueId": "add_child_form_changeValue"
                                                }
                                            ]
                                        },
                                        // {
                                        //     "id": "M_editTreeNode",
                                        //     "text": "编辑节点",
                                        //     "state": "edit",
                                        //     "icon": "edit",
                                        //     "color": "text-primary",
                                        //     "hidden": false,
                                        //     "disabled": false,
                                        //     "execute": [
                                        //         {
                                        //             "triggerType": "ACTION",
                                        //             "trigger": "DIALOG",
                                        //             // "conditionId": "add_state_1"
                                        //             "dialogId": "edit_office_form",
                                        //             "ajaxId": "tree_edit_component",
                                        //             "changeValueId": "edit_form_changeValue"
                                        //         }
                                        //     ]
                                        // },
                                        // {
                                        //     "id": "M_deleteRow",
                                        //     "text": "删除",
                                        //     "icon": "delete",
                                        //     "color": "text-red-light",
                                        //     "hidden": false,
                                        //     "disabled": false,
                                        //     "execute": [
                                        //         {
                                        //             "triggerType": "OPERATION",
                                        //             "trigger": "EXECUTE_SELECTED_NODE",
                                        //             // "conditionId": "delete_operation_1",
                                        //             "ajaxId": "tree_delete_component"
                                        //         }
                                        //     ]
                                        // },
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
                            "id": "view_tree_component_base",
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
                                "url": "sd/query/COMPONENT_TREE_BASE_METHOD",
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
                                "url": "sd/query/COMPONENT_TREE_BASE_METHOD",
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
                                    "title": "NAME",
                                    "type": "title",
                                    "field": "CODE"
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
                                        "id": "",
                                        "senderId": "view_tree_component_base",
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
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        "id": "grid_sender_03",
                                        "senderId": "view_tree_component_base",
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
                                                        "value": "view_tree_component_base",
                                                        "type": "value"
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        "id": "grid_sender_04",
                                        "senderId": "view_tree_component_base",
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
                                                        "value": "view_tree_component_base",
                                                        "type": "value"
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        "id": "grid_sender_05",
                                        "senderId": "view_tree_component_base",
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
                                                        "value": "view_tree_component_base",
                                                        "type": "value"
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        "id": "grid_sender_06",
                                        "senderId": "view_tree_component_base",
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
                                                        "value": "view_tree_component_base",
                                                        "type": "value"
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        "id": "grid_sender_07",
                                        "senderId": "view_tree_component_base",
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
                                                        "value": "view_tree_component_base",
                                                        "type": "value"
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        "id": "grid_sender_08",
                                        "senderId": "view_tree_component_base",
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
                                        "senderId": "view_tree_component_base",
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
                                        "id": "afterMethodSaveSuccess",
                                        "senderId": "view_tree_component_base",
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
                                        "id": "afterComponentSaveSuccess1",
                                        "senderId": "view_tree_component_base",
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
                                                        "name": "OFFICENAME",
                                                        "type": "addedRows",
                                                        "valueName": "OFFICENAME"
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
                                    // {
                                    //     "id": "afterComponentUpdateSuccess",
                                    //     "senderId": "view_tree_component_base",
                                    //     // "triggerType": "ACTION",
                                    //     // "trigger": "MESSAGE0",
                                    //     // "triggerMoment": "after",
                                    //     "sendData": [
                                    //         {
                                    //             "beforeSend": {},
                                    //             "reveicerId": "",
                                    //             "receiverTriggerType": "ACTION",
                                    //             "receiverTrigger": "MESSAGE",
                                    //             "params": [
                                    //                 {
                                    //                     "name": "type",
                                    //                     "type": "value",
                                    //                     "value": "success"
                                    //                 },
                                    //                 {
                                    //                     "name": "code",
                                    //                     "type": "value",
                                    //                     "value": "message.operation.success"
                                    //                 }
                                    //             ]
                                    //         },
                                    //         {
                                    //             "beforeSend": {},
                                    //             "reveicerId": "",
                                    //             "receiverTriggerType": "ACTION",
                                    //             "receiverTrigger": "UPDATE_SELECTED_NODE",
                                    //             "params": [
                                    //                 {
                                    //                     "name": "ID",
                                    //                     "type": "editedRows",
                                    //                     "valueName": "ID"
                                    //                 },
                                    //                 {
                                    //                     "name": "OFFICENAME",
                                    //                     "type": "editedRows",
                                    //                     "valueName": "OFFICENAME"
                                    //                 }
                                    //             ]
                                    //         }
                                    //     ]
                                    // },
                                    {
                                        "id": "afterComponentDeleteSuccess",
                                        "senderId": "view_tree_component_base",
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
                                        "id": "afterComponentBatchDeleteSuccess",
                                        "senderId": "view_tree_component_base",
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
                                        "senderId": "view_tree_component_base",
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
                                        "senderId": "view_tree_component_base",
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
                                        "senderId": "view_tree_component_base",
                                        "receiveData": [
                                            {
                                                "triggerType": "ACTION",
                                                "trigger": "APPEND_CHILD_TO_SELECTED_NODE"
                                            }
                                        ]
                                    },
                                    {
                                        "id": "s_202",
                                        "senderId": "view_tree_component_base",
                                        "receiveData": [
                                            {
                                                "triggerType": "ACTION",
                                                "trigger": "APPEND_CHILD_TO_ROOT_NODE"
                                            }
                                        ]
                                    },
                                    {
                                        "id": "s_203",
                                        "senderId": "view_form_edit_component",
                                        "receiveData": [
                                            {
                                                "triggerType": "ACTION",
                                                "trigger": "UPDATE_SELECTED_NODE"
                                            }
                                        ]
                                    },
                                    {
                                        "id": "s_204",
                                        "senderId": "view_tree_component_base",
                                        "receiveData": [
                                            {
                                                "triggerType": "ACTION",
                                                "trigger": "MESSAGE"
                                            }
                                        ]
                                    },
                                    {
                                        "id": "s_205",
                                        "senderId": "view_tree_component_base",
                                        "receiveData": [
                                            {
                                                "triggerType": "ACTION",
                                                "trigger": "DELETE_SELECTED_NODE"
                                            }
                                        ]
                                    },
                                    {
                                        "id": "s_205",
                                        "senderId": "view_tree_component_base",
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
                                    "senderId": "view_tree_component_base",
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
                                    "senderId": "view_tree_component_base",
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
                        "id": "layout_component_form",
                        "col": "cc",
                        "type": "col",
                        "title": "",
                        "span": 16,
                        "container": "rows",
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
                                            "id": "toolbar_edit_component",
                                            "component": "cnToolbar",
                                            "size": "default",
                                            "cascade": {
                                                "messageSender": [

                                                ]
                                            },
                                            "changeValue": [
                                                {
                                                    "id": "edit_form_changeValue",
                                                    "params": [
                                                        // {
                                                        //     "name": "id",
                                                        //     "type": "item",
                                                        //     "valueName": "id",
                                                        //     "valueTo": "tempValue"
                                                        // },
                                                        {
                                                            "name": "CMPT_ID",
                                                            "type": "item",
                                                            "valueName": "ID",
                                                            "valueTo": "staticComponentValue"
                                                        }

                                                    ]
                                                }
                                            ],
                                            "condition": [
                                                {
                                                    "id": "component_condition_edited_none",
                                                    "state": [
                                                        {
                                                            "type": "component",
                                                            "valueName": "FORM_VALID",
                                                            "expression": [
                                                                {
                                                                    "type": "property",
                                                                    "name": "",
                                                                    "matchValue": true,
                                                                    "match": "eq"
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                }
                                            ],
                                            "ajaxConfig": [
                                                {
                                                    "id": "toolbar_form_component_base_edit",
                                                    "url": "td/SMT_BASE_COMPONENT/update",
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
                                                        }
                                                    ],
                                                    "outputParameters": [

                                                    ],
                                                    "result": [
                                                        {
                                                            "name": "data",
                                                            "showMessageWithNext": 0,
                                                            "message": "message.ajax.state.success",
                                                            "senderId": "afterComponentFormUpdateSuccess"
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
                                            "builtinConfig": [
                                                // {
                                                //     "id": "add_state_1",
                                                //     "event": "formStateChange", // 内置方法
                                                //     "state": "new",
                                                // },
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
                                            "toolbar": [
                                                {
                                                    "targetViewId": "view_form_edit_component",
                                                    "group": [
                                                        {
                                                            "id": "toolbar_edit_component_refresh",
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
                                                            "id": "toolbar_edit_component_edit",
                                                            "text": "编辑",
                                                            "icon": "edit",
                                                            "color": "text-success",
                                                            "hidden": false,
                                                            "disabled": false,
                                                            "state": "text",
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
                                                                        "name": "text",
                                                                        "value": false
                                                                    }
                                                                ]
                                                            }
                                                        },
                                                        {
                                                            "id": "toolbar_edit_component_save",
                                                            "text": "保存",
                                                            "state": "text",
                                                            "icon": "save",
                                                            "color": "text-primary",
                                                            "hidden": false,
                                                            "disabled": false,
                                                            "execute": [
                                                                {
                                                                    "triggerType": "OPERATION",
                                                                    "trigger": "EXECUTE",
                                                                    "ajaxId": "toolbar_form_component_base_edit",
                                                                    // "conditionId": "component_condition_edited_none"
                                                                }
                                                            ],
                                                            // "toggle": {
                                                            //     "type": "state",
                                                            //     "toggleProperty": "hidden",
                                                            //     "values": [
                                                            //         {
                                                            //             "name": "edit",
                                                            //             "value": false
                                                            //         },
                                                            //         {
                                                            //             "name": "text",
                                                            //             "value": true
                                                            //         }
                                                            //     ]
                                                            // }
                                                        },
                                                        {
                                                            "id": "toolbar_edit_component_cancel",
                                                            "text": "取消",
                                                            "state": "text",
                                                            "icon": "rollback",
                                                            "color": "text-grey-darker",
                                                            "hidden": false,
                                                            "disabled": null,
                                                            "execute": [
                                                                {
                                                                    "triggerType": "STATE",
                                                                    "trigger": "CANCEL",
                                                                    "builtinId": "cancel_state_1"
                                                                }
                                                            ],
                                                            // "toggle": {
                                                            //     "type": "state",
                                                            //     "toggleProperty": "hidden",
                                                            //     "values": [
                                                            //         {
                                                            //             "name": "edit",
                                                            //             "value": false
                                                            //         },
                                                            //         {
                                                            //             "name": "text",
                                                            //             "value": true
                                                            //         }
                                                            //     ]
                                                            // }
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    },
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
                    },
                    {
                        "id": "4K0naM",
                        "type": "layout",
                        "title": "",
                        "container": "rows",
                        "span": 24,
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
                                                    "id": "add_methods",
                                                    "url": "td/SMT_BASE_INNER_METHOD/batchInsert",
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
                                                            "name": "METHOD",
                                                            "type": "componentValue",
                                                            "valueName": "METHOD"
                                                        },
                                                        {
                                                            "name": "METHOD_TYPE",
                                                            "type": "componentValue",
                                                            "valueName": "METHOD_TYPE"
                                                        },
                                                        {
                                                            "name": "CMPT_ID",
                                                            "type": "tempValue",
                                                            "valueName": "_PID"
                                                        },
                                                        {
                                                            "name": "REMARK",
                                                            "type": "componentValue",
                                                            "valueName": "REMARK"
                                                        }
                                                    ],
                                                    "outputParameters": [

                                                    ],
                                                    "result": [
                                                        {
                                                            "name": "data",
                                                            "showMessageWithNext": 0,
                                                            "message": "message.ajax.state.success",
                                                            "senderId": "afterMethodSaveSuccess"
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
                                                    "id": "edit_methods",
                                                    "url": "td/SMT_BASE_INNER_METHOD/batchUpdate",
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
                                                        {
                                                            "name": "METHOD",
                                                            "type": "componentValue",
                                                            "valueName": "METHOD"
                                                        },
                                                        {
                                                            "name": "METHOD_TYPE",
                                                            "type": "componentValue",
                                                            "valueName": "METHOD_TYPE"
                                                        },
                                                        {
                                                            "name": "CMPT_ID",
                                                            "type": "componentValue",
                                                            "valueName": "_PID"
                                                        },
                                                        {
                                                            "name": "REMARK",
                                                            "type": "componentValue",
                                                            "valueName": "REMARK"
                                                        }
                                                    ],
                                                    "outputParameters": [

                                                    ],
                                                    "result": [
                                                        {
                                                            "name": "data",
                                                            "showMessageWithNext": 0,
                                                            "message": "message.ajax.state.success",
                                                            "senderId": "afterComponentSaveSuccess"
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
                                                            "text": "新增操作",
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
                                                            "text": "修改操作",
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
                                                            "text": "删除操作",
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
                                                                    "ajaxId": "add_methods",
                                                                    // "stateId": "add_save_1",
                                                                    "conditionId": "city_condition_added_none"
                                                                },
                                                                {
                                                                    "triggerType": "OPERATION",
                                                                    "trigger": "SAVE_ROWS",
                                                                    "ajaxId": "edit_methods",
                                                                    // "stateId": "edit_save_1",
                                                                    "conditionId": "city_condition_edited_none"
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