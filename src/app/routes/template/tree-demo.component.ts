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
export class TreeDemoComponent implements OnInit {
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
                            "id": "view_tree_01",
                            "component": "cnToolbar",
                            "size": "default",
                            "cascade": {
                                "messageSender": [
                                    {
                                        "id": "toolbar_01",
                                        "senderId": "view_tree_01",
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
                                        "senderId": "view_tree_01",
                                        "receiveData": [
                                            {
                                                "triggerType": "STATE",
                                                "trigger": "STATE_TO_TEXT"
                                            }
                                        ]
                                    },
                                    {
                                        "id": "s_002",
                                        "senderId": "view_tree_01",
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
                            "dialog": [
                                {
                                    "id": "edit_office_form",
                                    "type": "confirm",
                                    "title": "数据编辑",
                                    "cancelText": "取消",
                                    "okText": "提交",
                                    "form": {
                                        "id": "form_01",
                                        "type": "form",
                                        "component": "form",
                                        state: 'text',
                                        loadingConfig: {
                                            id: "loadform" // 将加载配置引用
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
                                                            "id": "ioj0mV", "col": "cc", "type": "col", "title": "列ioj0mV", "span": 24, "layoutContain": "select",
                                                            "size": {
                                                                "nzXs": 24, "nzSm": 24, "nzMd": 24, "nzLg": 24, "ngXl": 24, "nzXXl": 24
                                                            },
                                                            "control": { "id": "002" }
                                                        },
                                                        {
                                                            "id": "ioj0mV", "col": "cc", "type": "col", "title": "列ioj0mV", "span": 12, "layoutContain": "select",
                                                            "size": {
                                                                "nzXs": 12, "nzSm": 12, "nzMd": 12, "nzLg": 12, "ngXl": 12, "nzXXl": 12
                                                            },
                                                            "control": { "id": "003" }
                                                        },
                                                        {
                                                            "id": "ioj0mV", "col": "cc", "type": "col", "title": "列ioj0mV", "span": 12, "layoutContain": "select",
                                                            "size": {
                                                                "nzXs": 12, "nzSm": 12, "nzMd": 12, "nzLg": 12, "ngXl": 12, "nzXXl": 12
                                                            },
                                                            "control": { "id": "004" }
                                                        }
                                                    ]
                                                }]
                                        },
                                        formControls: [
                                            {
                                                id: '001',
                                                "hidden": true, // 字段是否隐藏
                                                "title": '名称',  // lable 信息
                                                "titleConfig": {
                                                    required: true
                                                },
                                                "field": "provinceName",  // fromcontrol name  默认的字段
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
                                                "state": "edit", // 当前组件默认状态 文本，编辑，或者由表单状态控制text、edit、form
                                                "text": { // 文本展示字段
                                                    "type": 'label', // 什么组件展示文本 
                                                    "field": 'provinceName',   // 字段
                                                },
                                                "editor": {            // 编辑状态字段  日后扩充可为数组，满足条件下的组件变化
                                                    "type": "input",
                                                    "field": "provinceName",  // 编辑字段于定义字段一致 （此处定义于表格相反）
                                                    "placeholder": "请输入",
                                                    "validations": [  // 校验
                                                        { validator: "required", type: "default", "message": "请输入省名称" }
                                                    ]
                                                }
                                            },
                                            {
                                                id: '002',
                                                "hidden": true, // 字段是否隐藏
                                                "title": '区号',  // lable 信息
                                                "titleConfig": {
                                                    required: false
                                                },
                                                "field": "areaCode",  // fromcontrol name  默认的字段
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
                                                "text": { // 文本展示字段
                                                    "type": 'label', // 什么组件展示文本 
                                                    "field": 'areaCode',   // 字段
                                                },
                                                "editor": {            // 编辑状态字段  日后扩充可为数组，满足条件下的组件变化
                                                    "type": "input",
                                                    "field": "areaCode",  // 编辑字段于定义字段一致 （此处定义于表格相反）
                                                    "placeholder": "请输入",
                                                    "validations": [  // 校验

                                                    ]
                                                },
                                                "editor1": {            // 编辑状态字段  日后扩充可为数组，满足条件下的组件变化
                                                    "type": "select",
                                                    "field": "areaCode",  // 编辑字段于定义字段一致 （此处定义于表格相反）
                                                    "placeholder": "请输入",
                                                    options: [
                                                        { label: '是', value: '1' },
                                                        { label: '否', value: '0' }
                                                    ],
                                                    labelName: 'provinceName',
                                                    valueName: 'id',
                                                    loadingConfig: {
                                                        id: "loadformselect1" // 将加载配置引用
                                                    },
                                                    "validate": {  // 校验

                                                    }
                                                }
                                            },
                                            {
                                                id: '003',
                                                "hidden": true, // 字段是否隐藏
                                                "title": '直属',  // lable 信息
                                                "titleConfig": {
                                                    required: false
                                                },
                                                "field": "directlyUnder",  // fromcontrol name  默认的字段
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
                                                "text": { // 文本展示字段
                                                    "type": 'label', // 什么组件展示文本 
                                                    "field": 'directlyUnder',   // 字段
                                                },
                                                "editor": {            // 编辑状态字段  日后扩充可为数组，满足条件下的组件变化
                                                    "type": "input",
                                                    "field": "directlyUnder",  // 编辑字段于定义字段一致 （此处定义于表格相反）
                                                    "placeholder": "请输入",
                                                    "validations": [  // 校验

                                                    ]
                                                },
                                                "editor1": {            // 编辑状态字段  日后扩充可为数组，满足条件下的组件变化
                                                    "type": "select",
                                                    "field": "inputname3",  // 编辑字段于定义字段一致 （此处定义于表格相反）
                                                    "placeholder": "请输入",
                                                    options: [
                                                        { label: '是', value: '1' },
                                                        { label: '否', value: '0' }
                                                    ],
                                                    labelName: 'cityName',
                                                    valueName: 'id',
                                                    loadingConfig: {
                                                        id: "loadformselect2" // 将加载配置引用
                                                    },
                                                    "validate": {  // 校验

                                                    }
                                                }
                                            },
                                            {
                                                id: '004',
                                                "hidden": true, // 字段是否隐藏
                                                "title": '测试字段4',  // lable 信息
                                                "titleConfig": {
                                                    required: false
                                                },
                                                "field": "inputname4",  // fromcontrol name  默认的字段
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
                                                "text": { // 文本展示字段
                                                    "type": 'label', // 什么组件展示文本 
                                                    "field": 'inputname4',   // 字段
                                                },
                                                "editor": {            // 编辑状态字段  日后扩充可为数组，满足条件下的组件变化
                                                    "type": "select",
                                                    "field": "inputname4",  // 编辑字段于定义字段一致 （此处定义于表格相反）
                                                    "placeholder": "请输入",
                                                    options: [
                                                        { label: '好人', value: '1' },
                                                        { label: '坏人', value: '2' }
                                                    ],
                                                    "validations": [  // 校验

                                                    ]
                                                }
                                            },
                                            {
                                                id: '005',
                                                "hidden": true, // 字段是否隐藏
                                                "title": '测试字段5',  // lable 信息
                                                "titleConfig": {
                                                    required: false
                                                },
                                                "field": "id",  // fromcontrol name  默认的字段
                                                "labelSize": {
                                                    "span": 8,
                                                    "nzXs": 24, "nzSm": 24, "nzMd": 24, "nzLg": 24, "ngXl": 24, "nzXXl": 24
                                                },  // 
                                                "controlSize": {
                                                    "span": 16,
                                                    "nzXs": 24, "nzSm": 24, "nzMd": 24, "nzLg": 24, "ngXl": 24, "nzXXl": 24
                                                },
                                                "state": "text", // 当前组件默认状态 文本，编辑，或者由表单状态控制 text、edit、form
                                                "text": { // 文本展示字段
                                                    "type": 'label', // 什么组件展示文本 
                                                    "field": 'id',   // 字段
                                                },
                                                "editor": {            // 编辑状态字段  日后扩充可为数组，满足条件下的组件变化
                                                    "type": "input",
                                                    "field": "id",  // 编辑字段于定义字段一致 （此处定义于表格相反）
                                                    "placeholder": "请输入",
                                                    "validate": {  // 校验

                                                    }
                                                }
                                            }
                                        ],
                                        formControlsPermissions: [ // 初始表单字段，描述 新增、编辑、查看 状态下的文本
                                            {
                                                formState: "new", // 新增状态下的Controls 展示与否，是否读写属性设置
                                                formStateContent: { // 对当前状态的描述 ，描述当前状态下 表单组件 具备的行为，例如是否自加载，是否启用默认值
                                                    isLoad: false,
                                                    loadAjax: {}, // 如果启用load，是否用新的加载地址
                                                    isDefault: true
                                                },
                                                Controls: [
                                                    { id: '001', state: "edit", hidden: false, readOnly: false },
                                                    { id: '002', state: "edit", hidden: false, readOnly: false },
                                                    { id: '003', state: "edit", hidden: false, readOnly: false },
                                                    { id: '004', state: "edit", hidden: false, readOnly: false },
                                                    { id: '005', state: "edit", hidden: false, readOnly: false }
                                                ]
                                            },
                                            {
                                                formState: "edit",
                                                Controls: [
                                                    { id: '001', state: "edit", hidden: false, readOnly: false },
                                                    { id: '002', state: "edit", hidden: false, readOnly: false },
                                                    { id: '003', state: "edit", hidden: false, readOnly: false },
                                                    { id: '004', state: "edit", hidden: false, readOnly: false },
                                                    { id: '005', state: "edit", hidden: false, readOnly: false }
                                                ]
                                            },
                                            {
                                                formState: "text",
                                                Controls: [
                                                    { id: '001', state: "text", hidden: false, readOnly: false },
                                                    { id: '002', state: "text", hidden: false, readOnly: false },
                                                    { id: '003', state: "text", hidden: false, readOnly: false },
                                                    { id: '004', state: "text", hidden: false, readOnly: false },
                                                    { id: '005', state: "text", hidden: false, readOnly: false }
                                                ]
                                            }

                                        ],
                                        ajaxConfig: [
                                            {
                                                "id": "loadform",
                                                "url": "information/selectAllByProvinceId",
                                                "urlType": "inner",
                                                "ajaxType": "get",
                                                "params": [
                                                    {
                                                        "name": "id",
                                                        "type": "tempValue",
                                                        "valueName": "id"
                                                    }
                                                ],
                                                "outputParameters": [

                                                ],
                                                "result": [  // 描述 表单接收参数，将返回的哪些值赋给相应的组件属性

                                                ]
                                            },
                                            {
                                                "id": "loadformselect1",
                                                "url": "information/selectAllProvinceWithCity",
                                                "urlType": "inner",
                                                "ajaxType": "get",
                                                "params": [


                                                ],
                                                "outputParameters": [

                                                ],
                                                "result": [  // 描述 表单接收参数，将返回的哪些值赋给相应的组件属性

                                                ]
                                            },
                                            {
                                                "id": "loadformselect2_2",
                                                "url": "information/ssld",
                                                "urlType": "inner",
                                                "ajaxType": "get",
                                                "params": [

                                                    {
                                                        "name": "pId",
                                                        "type": "value",
                                                        "value": "1"
                                                    }
                                                ],
                                                "outputParameters": [

                                                ],
                                                "result": [  // 描述 表单接收参数，将返回的哪些值赋给相应的组件属性

                                                ]
                                            },
                                            {
                                                "id": "loadformselect2",
                                                "url": "information/selectCityByPid",
                                                "urlType": "inner",
                                                "ajaxType": "get",
                                                "params": [

                                                    {
                                                        "name": "pId",
                                                        "type": "cascadeValue",
                                                        "valueName": "PROVINCEID",
                                                        "value": "2"
                                                    }
                                                ],
                                                "outputParameters": [

                                                ],
                                                "result": [  // 描述 表单接收参数，将返回的哪些值赋给相应的组件属性

                                                ]
                                            }



                                        ],
                                        cascade: {
                                            "messageReceiver": [
                                                {
                                                    "id": "",
                                                    "senderId": "view_tree_01",
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
                                        cascadeValue: [ // 值级联配置
                                            {
                                                "type": '值变化',
                                                "controlId": '002', //  大的control标识，级联内部
                                                "name": 'inputname2',
                                                "CascadeObjects": [
                                                    {
                                                        "controlId": '003',
                                                        "cascadeName": 'inputname3',
                                                        "cascadeItems": [  // 根据值执行
                                                            {
                                                                "type": 'default',  // conditions   default  满足条件执行或者默认都执行
                                                                "caseValue": {    // 条件描述 （触发级联的前置条件，如果不设置，则是满足）
                                                                    "type": 'selectObjectValue',
                                                                    "valueName": 'num',
                                                                    "regular": '^0$'
                                                                },
                                                                "content": {  // 应答体描述
                                                                    "type": 'ajax', // 应答类型（异步、消息、赋值、隐藏、显示...）
                                                                    "data": {
                                                                        "option": [
                                                                            { "name": 'PROVINCEID', "type": 'selectObjectValue', "value": '1', "valueName": 'id' }
                                                                        ]
                                                                    }
                                                                }
                                                            }

                                                        ]
                                                    }
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
                                    "id": "tree_add_office",
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
                                    "id": "tree_edit_office",
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
                                    "senderId": "view_tree_01",
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
                                    "targetViewId": "view_tree_01",
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
                                            "text": "新增节点",
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
                                                    "dialogId": "edit_office_form",
                                                    "ajaxId": "tree_add_office",
                                                }
                                            ]
                                        },
                                        {
                                            "id": "M_addChildNode",
                                            "text": "新增节点",
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
                                                    "dialogId": "edit_office_form",
                                                    "ajaxId": "tree_add_office",
                                                }
                                            ]
                                        },
                                        {
                                            "id": "M_editTreeNode",
                                            "text": "编辑节点",
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
                                                    "dialogId": "edit_office_form",
                                                    "ajaxId": "form_edit_province",
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
                                                    // "conditionId": "delete_operation_1",
                                                    // "ajaxId": "delete_row_1"
                                                }
                                            ]
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
                            "id": "view_tree_01",
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
                            "loadingConfig": {
                                "url": "province/queryCondition/OFFICE_SHEET",
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
                                "url": "province/queryCondition/OFFICE_SHEET",
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
                                    "title": "OFFICENAME",
                                    "type": "title",
                                    "field": "OFFICENAME"
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
                                        "senderId": "view_tree_01",
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
                                        "senderId": "view_tree_01",
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
                                                        "value": "view_tree_01",
                                                        "type": "value"
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        "id": "grid_sender_04",
                                        "senderId": "view_tree_01",
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
                                                        "value": "view_tree_01",
                                                        "type": "value"
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        "id": "grid_sender_05",
                                        "senderId": "view_tree_01",
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
                                                        "value": "view_tree_01",
                                                        "type": "value"
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        "id": "grid_sender_06",
                                        "senderId": "view_tree_01",
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
                                                        "value": "view_tree_01",
                                                        "type": "value"
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        "id": "grid_sender_07",
                                        "senderId": "view_tree_01",
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
                                                        "value": "view_tree_01",
                                                        "type": "value"
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        "id": "grid_sender_08",
                                        "senderId": "view_tree_01",
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
                                                        "value": "view_tree_01",
                                                        "type": "value"
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        "id": "afterProvinceSaveSuccessfully",
                                        "senderId": "view_tree_01",
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
                                        "id": "afterProvinceUpdateSuccessfully",
                                        "senderId": "view_tree_01",
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
                                        "id": "afterProvinceSaveValidation",
                                        "senderId": "view_tree_01",
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
                                        "senderId": "view_tree_01",
                                        "sendData": [
                                            {
                                                "beforeSend": {},
                                                "reveicerId": "",
                                                "receiverTriggerType": "ACTION",
                                                "receiverTrigger": "SHOW_INVALIDATE_EDITED_ROWS"
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
                                    "senderId": "view_tree_01",
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
                                    "senderId": "view_tree_01",
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
                                            id: "loadform" // 将加载配置引用
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
                                                "hidden": true, // 字段是否隐藏
                                                "title": '市名称',  // lable 信息
                                                "titleConfig": {
                                                    required: true
                                                },
                                                "field": "cityName",  // fromcontrol name  默认的字段
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
                                                "state": "edit", // 当前组件默认状态 文本，编辑，或者由表单状态控制text、edit、form
                                                "text": { // 文本展示字段
                                                    "type": 'label', // 什么组件展示文本 
                                                    "field": 'cityName',   // 字段
                                                },
                                                "editor": {            // 编辑状态字段  日后扩充可为数组，满足条件下的组件变化
                                                    "type": "input",
                                                    "field": "cityName",  // 编辑字段于定义字段一致 （此处定义于表格相反）
                                                    "placeholder": "请输入",
                                                    "validations": [  // 校验
                                                        { validator: "required", type: "default", "message": "请输入省名称" }
                                                    ]
                                                }
                                            },
                                            {
                                                id: 'city_id',
                                                "hidden": true, // 字段是否隐藏
                                                "title": '区号',  // lable 信息
                                                "titleConfig": {
                                                    required: false
                                                },
                                                "field": "id",  // fromcontrol name  默认的字段
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
                                                "text": { // 文本展示字段
                                                    "type": 'label', // 什么组件展示文本 
                                                    "field": 'id',   // 字段
                                                },
                                                "editor": {            // 编辑状态字段  日后扩充可为数组，满足条件下的组件变化
                                                    "type": "input",
                                                    "field": "id",  // 编辑字段于定义字段一致 （此处定义于表格相反）
                                                    "placeholder": "请输入",
                                                    "validations": [  // 校验

                                                    ]
                                                }
                                            },
                                            {
                                                id: 'city_pid',
                                                "hidden": true, // 字段是否隐藏
                                                "title": '区号',  // lable 信息
                                                "titleConfig": {
                                                    required: false
                                                },
                                                "field": "pId",  // fromcontrol name  默认的字段
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
                                                "text": { // 文本展示字段
                                                    "type": 'label', // 什么组件展示文本 
                                                    "field": 'pId',   // 字段
                                                },
                                                "editor": {            // 编辑状态字段  日后扩充可为数组，满足条件下的组件变化
                                                    "type": "input",
                                                    "field": "pId",  // 编辑字段于定义字段一致 （此处定义于表格相反）
                                                    "placeholder": "请输入",
                                                    "validations": [  // 校验

                                                    ]
                                                }
                                            }
                                        ],
                                        formControlsPermissions: [ // 初始表单字段，描述 新增、编辑、查看 状态下的文本
                                            {
                                                formState: "new", // 新增状态下的Controls 展示与否，是否读写属性设置
                                                formStateContent: { // 对当前状态的描述 ，描述当前状态下 表单组件 具备的行为，例如是否自加载，是否启用默认值
                                                    isLoad: false,
                                                    loadAjax: {}, // 如果启用load，是否用新的加载地址
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
                                                "result": [  // 描述 表单接收参数，将返回的哪些值赋给相应的组件属性

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
                                    "id": "form_add_city",
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
                                            "type": "componentValue",
                                            "valueName": "pId"
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
                                            "senderId": "afterCitySaveSuccessfully"
                                        },
                                        {
                                            "name": "validation",
                                            "message": "message.ajax.state.success",
                                            "senderId": "afterCitySaveValidation"
                                        },
                                        {
                                            "name": "error",
                                            "senderId": "toolbar_02"
                                        }
                                    ]
                                },
                                {
                                    "id": "form_edit_city",
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
                                            "valueName": "pId"
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
                                            "senderId": "afterCitySaveSuccessfully"
                                        },
                                        {
                                            "name": "validation",
                                            "message": "message.ajax.state.success",
                                            "senderId": "afterCitySaveValidation"
                                        },
                                        {
                                            "name": "error",
                                            "senderId": "toolbar_02"
                                        }
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
                                                    "dialogId": "edit_city_form",
                                                    "ajaxId": "form_add_city",
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
                                                    "dialogId": "edit_city_form",
                                                    "ajaxId": "form_edit_city",
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
                                                    "conditionId": "city_condition_added_none"
                                                },
                                                {
                                                    "triggerType": "OPERATION",
                                                    "trigger": "SAVE_ROWS",
                                                    "ajaxId": "edit_cities_1",
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
                                                        "value": "view_tree_01",
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
                                        "senderId": "view_tree_01",
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

    public ngOnInit() { }
}