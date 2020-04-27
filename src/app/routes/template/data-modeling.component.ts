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
    selector: 'data-modeling',
    templateUrl: './data-modeling.component.html',
    styles: [
        `
            // :host ::ng-deep .ant-card-head {
            //     min-height: 36px;
            // }

            // .trigger {
            //     font-size: 20px;
            //     padding: 0 5px;
            //     cursor: pointer;
            //     transition: color 0.3;
            //     right:0px;
            //     position:relative;
            //     z-index:8;
            //     padding-top:8px;
            // }
            // .trigger:hover {
            //     color: #1890ff;
            // }

            // .collapsedArea {
            //     position:relative;

            // }
        `
    ]
})
export class DataModelingComponent extends CnComponentBase implements OnInit {
    public config = {
        "id": "4K0naM",
        "type": "pageHeader",
        "title": "布局4K0naM",
        "container": "pageHeader",
        "pageHeader": {
            "id": "pageheader_1",
            "title": "数据建模",
            "subTitle": "动态创建表及表资源API",
            "tagColor": "blue",
            "tagText": "系统功能",
            "descColumnsCount": 2,
            "operation": [],
            "contentItems": [
                {
                    "title": "注意事项",
                    "text": "请在创建表数据和列数据之后进行建模操作",
                    "span": 2
                },
                {
                    "title": "提示",
                    "text": "重新建模不会影响之前表中的数据",
                    "span": 2
                }
            ],
            // "extraItems": [
            //     {
            //         "label": "已建模统计",
            //         "detail": "120",
            //         "span": "12"
            //     },
            //     {
            //         "label": "未建模统计",
            //         "detail": "1",
            //         "span": "12"
            //     }
            // ],
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
                                "noBorder": true,
                                "size": {
                                    "nzXs": 24,
                                    "nzSm": 24,
                                    "nzMd": 24,
                                    "nzLg": 24,
                                    "nzXl": 24,
                                    "nzXXl": 24
                                },
                                "component": {
                                    "id": "view_business_search",
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
                                                "senderId": "view_business_search",
                                                // "triggerType": "ACTION",
                                                // "trigger": "VALUE_CHANGE",
                                                // "triggerMoment": "after",
                                                "sendData": [
                                                    {
                                                        "beforeSend": {},
                                                        "reveicerId": "",
                                                        "receiverTriggerType": "BEHAVIOR",
                                                        "receiverTrigger": "LOAD_BY_FILTER",
                                                        "params": [
                                                            {
                                                                "name": "_TABLE_NAME",
                                                                "type": "returnValue",
                                                                "valueName": "_OPTION_NAME",
                                                                "valueTo": "tempValue"
                                                            }
                                                        ]
                                                    }
                                                ]
                                            }
                                        ]
                                        // "messageReceiver": [
                                        //     {
                                        //         "id": "",
                                        //         "senderId": "view_tree_component_base",
                                        //         "receiveData": [
                                        //             {
                                        //                 "beforeReceive": [],
                                        //                 "triggerType": "BEHAVIOR",
                                        //                 "trigger": "REFRESH_AS_CHILD",
                                        //                 "params": [
                                        //                     {
                                        //                         "pname": "_ID",
                                        //                         "cname": "_ID",
                                        //                         "valueTo": "tempValue"
                                        //                     }
                                        //                 ]
                                        //             }
                                        //         ]
                                        //     }
                                        // ]
                                    },
                                    "cascadeValue": [
                                        {
                                            "type": "",
                                            "controlId": "search_name",
                                            "name": "resourceName",
                                            "CascadeObjects": [
                                                {
                                                    "controlId": "search_name",
                                                    "cascadeName": "resourceName",
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
                                                                            "name": "_OPTION_NAME",
                                                                            "type": "selectObjectValue",
                                                                            "valueName": "resourceName"
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
                                            "title": "表名称查询",
                                            "hiddenLabel": false,
                                            "titleConfig": {
                                                "required": false
                                            },
                                            "field": "resourceName",
                                            "noColon": true,
                                            "labelSize": {
                                                "span": 2,
                                                "nzXs": 2,
                                                "nzSm": 2,
                                                "nzMd": 2,
                                                "nzLg": 2,
                                                "ngXl": 2,
                                                "nzXXl": 2
                                            },
                                            "controlSize": {
                                                "span": 22,
                                                "nzXs": {
                                                    "span": 22,
                                                    "offset": 0
                                                },
                                                "nzSm": {
                                                    "span": 22,
                                                    "offset": 0
                                                },
                                                "nzMd": {
                                                    "span": 22,
                                                    "offset": 0
                                                },
                                                "nzLg": {
                                                    "span": 22,
                                                    "offset": 0
                                                },
                                                "ngXl": {
                                                    "span": 22,
                                                    "offset": 0
                                                },
                                                "nzXXl": {
                                                    "span": 22,
                                                    "offset": 0
                                                }
                                            },
                                            "state": "edit",
                                            "text": {
                                                "type": "label",
                                                "field": "resourceName"
                                            },
                                            "editor": {
                                                "type": "searchSelect",
                                                "field": "resourceName",
                                                "showSearch": true,
                                                "serverSearch": true,
                                                "loadingConfig": {
                                                    "id": "loadBusinessNameValue"
                                                },
                                                "labelName": "resourceName",
                                                "valueName": "id",
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
                                        }
                                    ],
                                    "ajaxConfig": [
                                        {
                                            "id": "loadBusinessNameValue",
                                            "url": "resource/GET_DATA_MODELING_TABLE/query",
                                            "urlType": "inner",
                                            "ajaxType": "get",
                                            "params": [
                                                {
                                                    "name": "resourceName",
                                                    "search": true,
                                                    "conditionType": "ctn"
                                                },
                                                {
                                                    "name": "_mapToObject",
                                                    "type": "value",
                                                    "value": true
                                                }
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
                                "span": 24,
                                "container": "component",
                                "noBorder": true,
                                "header": {
                                    "title": "表信息列表",
                                    "icon": "right-circle",
                                    "toolbar": {
                                        "id": "toolbar_001",
                                        "component": "cnToolbar",
                                        "size": "default",
                                        "cascade": {
                                            "messageSender": [
                                                {
                                                    "id": "toolbar_01",
                                                    "senderId": "view_data_table",
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
                                                    "senderId": "view_data_table",
                                                    "receiveData": [
                                                        {
                                                            "triggerType": "STATE",
                                                            "trigger": "STATE_TO_TEXT"
                                                        }
                                                    ]
                                                },
                                                {
                                                    "id": "s_002",
                                                    "senderId": "view_data_table",
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
                                                "id": "edit_form_data_table_changeValue",
                                                "params": [
                                                    {
                                                        "name": "_tableId",
                                                        "type": "item",
                                                        "valueName": "id",
                                                        "valueTo": "tempValue"
                                                    }
                                                ]
                                            }
                                        ],
                                        "dialog": [
                                            {
                                                "id": "edit_data_table_form",
                                                "type": "confirm",
                                                "title": "数据编辑",
                                                "cancelText": "取消",
                                                "okText": "提交",
                                                "form": {
                                                    "id": "form_data_table",
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
                                                                        "id": "ioj0mV", "col": "cc", "type": "col", "title": "列ioj0mV", "span": 24, "layoutContain": "input",
                                                                        "size": {
                                                                            "nzXs": 24, "nzSm": 24, "nzMd": 24, "nzLg": 24, "ngXl": 24, "nzXXl": 24
                                                                        },
                                                                        "control": { "id": "002" }
                                                                    }
                                                                ]
                                                            }]
                                                    },
                                                    formControls: [
                                                        {
                                                            id: '001',
                                                            "hidden": true, // 字段是否隐藏
                                                            "title": '表名',  // lable 信息
                                                            "titleConfig": {
                                                                required: true
                                                            },
                                                            "field": "resourceName",  // fromcontrol name  默认的字段
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
                                                                "field": 'resourceName',   // 字段
                                                            },
                                                            "editor": {            // 编辑状态字段  日后扩充可为数组，满足条件下的组件变化
                                                                "type": "input",
                                                                "field": "resourceName",  // 编辑字段于定义字段一致 （此处定义于表格相反）
                                                                "placeholder": "请输入",
                                                                "validations": [  // 校验
                                                                    { validator: "required", type: "default", "message": "请输入省名称" }
                                                                ]
                                                            }
                                                        },
                                                        {
                                                            id: '002',
                                                            "hidden": true, // 字段是否隐藏
                                                            "title": '表描述',  // lable 信息
                                                            "titleConfig": {
                                                                required: false
                                                            },
                                                            "field": "descName",  // fromcontrol name  默认的字段
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
                                                                "field": 'descName',   // 字段
                                                            },
                                                            "editor": {            // 编辑状态字段  日后扩充可为数组，满足条件下的组件变化
                                                                "type": "input",
                                                                "field": "descName",  // 编辑字段于定义字段一致 （此处定义于表格相反）
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
                                                                { id: '001', state: "edit", hidden: false, readOnly: false },
                                                                { id: '002', state: "edit", hidden: false, readOnly: false },
                                                                // { id: '003', state: "edit", hidden: false, readOnly: false }
                                                            ]
                                                        },
                                                        {
                                                            formState: "edit",
                                                            Controls: [
                                                                { id: '001', state: "edit", hidden: false, readOnly: false },
                                                                { id: '002', state: "edit", hidden: false, readOnly: false },
                                                                // { id: '003', state: "edit", hidden: false, readOnly: false }
                                                            ]
                                                        },
                                                        {
                                                            formState: "text",
                                                            Controls: [
                                                                { id: '001', state: "text", hidden: false, readOnly: false },
                                                                { id: '002', state: "text", hidden: false, readOnly: false },
                                                                // { id: '003', state: "edit", hidden: false, readOnly: false }
                                                            ]
                                                        }

                                                    ],
                                                    ajaxConfig: [
                                                        {
                                                            "id": "loadform",
                                                            "url": "resource/DM_RESOURCE/query",
                                                            "urlType": "inner",
                                                            "ajaxType": "get",
                                                            "params": [
                                                                {
                                                                    "name": "id",
                                                                    "type": "tempValue",
                                                                    "valueName": "_tableId"
                                                                },
                                                                {
                                                                    "name": "_mapToObject",
                                                                    "type": "value",
                                                                    "value": true
                                                                },
                                                                {
                                                                    "name": "resourceType",
                                                                    "type": "value",
                                                                    "value": 0
                                                                },
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
                                                                "senderId": "view_data_table",
                                                                "receiveData": [
                                                                    {
                                                                        "beforeReceive": [],
                                                                        "triggerType": "BEHAVIOR",
                                                                        "trigger": "REFRESH_AS_CHILD",
                                                                        "params": [
                                                                            {
                                                                                "pname": "id",
                                                                                "cname": "_id",
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
                                                            "name": 'inpuresourceName2',
                                                            "CascadeObjects": [
                                                                {
                                                                    "controlId": '003',
                                                                    "cascadeName": 'inpuresourceName3',
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
                                                "id": "add_data_tables_state",
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
                                                "id": "edit_data_tables_state",
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
                                                "id": "add_data_table_condition",
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
                                                "id": "edit_data_table_condition",
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
                                                "id": "edit_data_tables_cancel_2",
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
                                                "id": "add_data_tables",
                                                "url": "resource/batchInsert",
                                                "urlType": "inner",
                                                "ajaxType": "post",
                                                "params": [
                                                    {
                                                        "name": "resourceName",
                                                        "type": "componentValue",
                                                        "valueName": "resourceName"
                                                    },
                                                    {
                                                        "name": "descName",
                                                        "type": "componentValue",
                                                        "valueName": "descName"
                                                    },
                                                    {
                                                        "name": "resourceType",
                                                        "type": "value",
                                                        "value": 0
                                                    },
                                                    {
                                                        "name": "id",
                                                        "type": "GUID",
                                                    }
                                                ],
                                                "outputParameters": [

                                                ],
                                                "result": [
                                                    {
                                                        "name": "data",
                                                        "showMessageWithNext": 0,
                                                        "message": "message.ajax.state.success",
                                                        "senderId": "afterTableSaveSuccess"
                                                    },
                                                    {
                                                        "name": "validation",
                                                        "message": "message.ajax.state.success",
                                                        "senderId": "afterTableSaveValidation"
                                                    },
                                                    {
                                                        "name": "error",
                                                        "senderId": "toolbar_data_columns_01"
                                                    }
                                                ]
                                            },
                                            {
                                                "id": "edit_data_tables",
                                                "url": "resource/batchInsert",
                                                "urlType": "inner",
                                                "ajaxType": "put",
                                                "params": [
                                                    {
                                                        "name": "resourceName",
                                                        "type": "componentValue",
                                                        "valueName": "resourceName"
                                                    },
                                                    {
                                                        "name": "descName",
                                                        "type": "componentValue",
                                                        "valueName": "descName"
                                                    },
                                                    {
                                                        "name": "id",
                                                        "type": "componentValue",
                                                        "valueName": "id"
                                                    },
                                                    {
                                                        "name": "resourceType",
                                                        "type": "value",
                                                        "value": 0
                                                    }
                                                ],
                                                "outputParameters": [

                                                ],
                                                "result": [
                                                    {
                                                        "name": "data",
                                                        "showMessageWithNext": 0,
                                                        "message": "message.ajax.state.success",
                                                        "senderId": "afterTableUpdateSuccess"
                                                    },
                                                    {
                                                        "name": "validation",
                                                        "message": "message.ajax.state.success",
                                                        "senderId": "aftetProvinceUpdateValidation"
                                                    },
                                                    {
                                                        "name": "error",
                                                        "senderId": "toolbar_data_columns_01"
                                                    }
                                                ]
                                            },
                                            {
                                                "id": "form_add_data_table",
                                                "url": "resource/insert",
                                                "urlType": "inner",
                                                "ajaxType": "post",
                                                "params": [
                                                    {
                                                        "name": "resourceName",
                                                        "type": "componentValue",
                                                        "valueName": "resourceName"
                                                    },
                                                    {
                                                        "name": "descName",
                                                        "type": "componentValue",
                                                        "valueName": "descName"
                                                    },
                                                    {
                                                        "name": "resourceType",
                                                        "type": "value",
                                                        "value": 0
                                                    },
                                                    {
                                                        "name": "id",
                                                        "type": "GUID"
                                                    }
                                                ],
                                                "outputParameters": [

                                                ],
                                                "result": [
                                                    {
                                                        "name": "data",
                                                        "showMessageWithNext": 0,
                                                        "message": "message.ajax.state.success",
                                                        "senderId": "afterTableModelingSaveSuccess"
                                                    }
                                                ]
                                            },
                                            {
                                                "id": "form_edit_data_table",
                                                "url": "resource/update",
                                                "urlType": "inner",
                                                "ajaxType": "put",
                                                "params": [
                                                    {
                                                        "name": "resourceName",
                                                        "type": "componentValue",
                                                        "valueName": "resourceName"
                                                    },
                                                    {
                                                        "name": "descName",
                                                        "type": "componentValue",
                                                        "valueName": "descName"
                                                    },
                                                    {
                                                        "name": "resourceType",
                                                        "type": "value",
                                                        "value": 0
                                                    },
                                                    {
                                                        "name": "id",
                                                        "type": "tempValue",
                                                        "valueName": "_tableId"
                                                    }
                                                ],
                                                "outputParameters": [

                                                ],
                                                "result": [
                                                    {
                                                        "name": "data",
                                                        "showMessageWithNext": 0,
                                                        "message": "message.ajax.state.success",
                                                        "senderId": "afterTableModelingSaveSuccess"
                                                    }
                                                ]
                                            },
                                            {
                                                "id": "create_modeling",
                                                "url": "resource/createModel",
                                                "urlType": "inner",
                                                "ajaxType": "post",
                                                "params": [
                                                    {
                                                        "name": "id",
                                                        "type": "item",
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
                                                        "senderId": "afterTableModelingSaveSuccess"
                                                    },
                                                ]
                                            },
                                            {
                                                "id": "cancel_create_modeling",
                                                "url": "resource/cancelModel",
                                                "urlType": "inner",
                                                "ajaxType": "post",
                                                "params": [
                                                    {
                                                        "name": "id",
                                                        "type": "item",
                                                        "valueName": "id"
                                                    }
                                                ],
                                                "outputParameters": [

                                                ],
                                                "result": [

                                                ]
                                            },
                                            {
                                                "id": "delete_data_table",
                                                "url": "resource/delete",
                                                "urlType": "inner",
                                                "ajaxType": "delete",
                                                "params": [
                                                    {
                                                        "name": "ids",
                                                        "type": "checkedId",
                                                        "valueName": "id"
                                                    }
                                                ],
                                                "outputParameters": [

                                                ],
                                                "result": [

                                                ]
                                            }
                                        ],
                                        "beforeTrigger": [],
                                        "afterTrigger": [
                                            {
                                                "id": "",
                                                "senderId": "view_data_table",
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
                                                "targetViewId": "view_data_table",
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
                                                        "text": "创建资源",
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
                                                                "dialogId": "edit_data_table_form",
                                                                "ajaxId": "form_add_data_table",
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        "id": "M_editRowForm",
                                                        "text": "编辑资源",
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
                                                                "dialogId": "edit_data_table_form",
                                                                "ajaxId": "form_edit_data_table",
                                                                "changeValueId": "edit_form_data_table_changeValue"
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
                                                                "ajaxId": "delete_data_table"
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        "id": "M_modeling",
                                                        "text": "发布资源",
                                                        "icon": "table",
                                                        "type": "primary",
                                                        "color": "primary",
                                                        "hidden": false,
                                                        "disabled": false,
                                                        "execute": [
                                                            {
                                                                "triggerType": "OPERATION",
                                                                "trigger": "EXECUTE_SELECTED_ROW",
                                                                // "conditionId": "delete_operation_1",
                                                                "ajaxId": "create_modeling"
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        "id": "M_cancel_modeling",
                                                        "text": "取消发布",
                                                        "icon": "line",
                                                        "color": "text-red-light",
                                                        "hidden": false,
                                                        "disabled": false,
                                                        "execute": [
                                                            {
                                                                "triggerType": "OPERATION",
                                                                "trigger": "EXECUTE_SELECTED_ROW",
                                                                // "conditionId": "delete_operation_1",
                                                                "ajaxId": "cancel_create_modeling"
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
                                    "nzLg": 24,
                                    "nzXl": 24,
                                    "nzXXl": 24
                                },
                                "component": {
                                    "id": "view_data_table",
                                    "title": "",
                                    "titleIcon": "right-circle",
                                    "component": "cnDataTable",
                                    "keyId": "id",
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
                                    // "scroll": {
                                    //     "y": "300px"
                                    // },
                                    // "spanWidthConfig": [
                                    //     '50px', '100px', '200px', '200px', '200px'
                                    // ],
                                    "loadingConfig": {
                                        "url": "resource/GET_DATA_MODELING_TABLE/query",
                                        "method": "get",
                                        "params": [
                                            {
                                                "name": "_mapToObject",
                                                "type": "value",
                                                "value": true
                                            },
                                            // {
                                            //     "name": "_sort",
                                            //     "type": "value",
                                            //     "value": "resourceName ASC"
                                            // },
                                            // {
                                            //     "name": "_order",
                                            //     "type": "value",
                                            //     "value": "DESC"
                                            // }
                                        ],
                                        "filter": [
                                            {
                                                "name": "_mapToObject",
                                                "type": "value",
                                                "value": true
                                            },
                                            {
                                                "name": "resourceName",
                                                "type": "tempValue",
                                                "valueName": "_TABLE_NAME"
                                            }
                                        ]
                                    },
                                    "columns": [
                                        {
                                            "title": "主键",
                                            "type": "field",
                                            "field": "id",
                                            "hidden": true,
                                            "showFilter": false,
                                            "showSort": false,
                                            "width": "50px",
                                            "style": {}
                                        },
                                        {
                                            "title": "表名称",
                                            "type": "field",
                                            "field": "resourceName",
                                            "hidden": false,
                                            "showFilter": false,
                                            "showSort": false,
                                            // "width": "200px",
                                            "style": {},
                                        },
                                        {
                                            "title": "描述",
                                            "type": "field",
                                            "field": "descName",
                                            "hidden": false,
                                            "showFilter": false,
                                            "showSort": false,
                                            // "width": "200px",
                                            "style": {},
                                        },
                                        {
                                            "title": "是否建模",
                                            "type": "field",
                                            "field": "buildModelText",
                                            "hidden": false,
                                            "showFilter": false,
                                            "showSort": false,
                                            "width": "100px",
                                            "style": {},
                                            "custom": {
                                                "type": "tag",
                                                "field": "buildModelText",
                                                "dataMapping": [
                                                    {
                                                        "color": "#87d068",
                                                        "field": "buildModelText",
                                                        "value": "已建模"
                                                    },
                                                    {
                                                        "color": "#2db7f5",
                                                        "field": "buildModelText",
                                                        "value": "无"
                                                    },
                                                    {
                                                        "color": "#5db9f5",
                                                        "field": "buildModelText",
                                                        "value": "重新建模"
                                                    }
                                                ]
                                            }
                                        },
                                        {
                                            "title": "进度",
                                            "type": "field",
                                            "field": "isBuildModel",
                                            "hidden": false,
                                            "showFilter": false,
                                            "showSort": false,
                                            // "width": "200px",
                                            "style": {},
                                            "custom": {
                                                "type": "progress",
                                                "defaultType": "line",
                                                "inlineMode": true,
                                                "dataMapping": [
                                                    {
                                                        "name": "percent",
                                                        "field": "pPercent"
                                                    },
                                                    {
                                                        "name": "status",
                                                        "field": "pStatus"
                                                    },
                                                    {
                                                        "name": "title",
                                                        "field": "pTitle"
                                                    }
                                                ],
                                                "showInfo": true
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
                                        {
                                            "title": "操作",
                                            "type": "action",
                                            // "width": "150px",
                                            "actionIds": [
                                                "data_table_edit", "data_table_cancel", "data_table_save", "data_table_delete", "data_table_new", "data_table_new_cancel"
                                            ]
                                        }
                                    ],
                                    "cascade": {
                                        "messageSender": [
                                            {
                                                "id": "data_table_sender_01",
                                                "senderId": "view_data_table",
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
                                                                "name": "_tableId",
                                                                "type": "item",
                                                                "valueName": "id"
                                                            }
                                                        ]
                                                    }
                                                ]
                                            },
                                            {
                                                "id": "data_table_sender_02",
                                                "senderId": "view_data_table",
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
                                                                "value": "view_data_table",
                                                                "type": "value"
                                                            }
                                                        ]
                                                    }
                                                ]
                                            },
                                            {
                                                "id": "data_table_sender_03",
                                                "senderId": "view_data_table",
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
                                                                "value": "view_data_table",
                                                                "type": "value"
                                                            }
                                                        ]
                                                    }
                                                ]
                                            },
                                            {
                                                "id": "data_table_sender_04",
                                                "senderId": "view_data_table",
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
                                                                "value": "view_data_table",
                                                                "type": "value"
                                                            }
                                                        ]
                                                    }
                                                ]
                                            },
                                            {
                                                "id": "data_table_sender_05",
                                                "senderId": "view_data_table",
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
                                                                "value": "view_data_table",
                                                                "type": "value"
                                                            }
                                                        ]
                                                    }
                                                ]
                                            },
                                            {
                                                "id": "data_table_sender_06",
                                                "senderId": "view_data_table",
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
                                                                "value": "view_data_table",
                                                                "type": "value"
                                                            }
                                                        ]
                                                    }
                                                ]
                                            },
                                            {
                                                "id": "data_table_sender_07",
                                                "senderId": "view_data_table",
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
                                                                "value": "view_data_table",
                                                                "type": "value"
                                                            }
                                                        ]
                                                    }
                                                ]
                                            },
                                            {
                                                "id": "afterTableSaveSuccess",
                                                "senderId": "view_data_table",
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
                                                "id": "afterTableModelingSaveSuccess",
                                                "senderId": "view_data_table",
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
                                                "id": "afterTableUpdateSuccess",
                                                "senderId": "view_data_table",
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
                                                "id": "afterTableSaveValidation",
                                                "senderId": "view_data_table",
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
                                                "senderId": "view_data_table",
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
                                                "id": "",
                                                "senderId": "view_business_search",
                                                "receiveData": [
                                                    {
                                                        "beforeReceive": [],
                                                        "triggerType": "BEHAVIOR",
                                                        "trigger": "LOAD_BY_FILTER",
                                                        "params": [
                                                            {
                                                                "pname": "_TABLE_NAME",
                                                                "cname": "_TABLE_NAME",
                                                                "valueTo": "tempValue"
                                                            }
                                                        ]
                                                    }
                                                ]
                                            },
                                            {
                                                "id": "",
                                                "senderId": "view_data_table",
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
                                                        "trigger": "LOAD_REFRESH_DATA"
                                                    }
                                                ]
                                            }
                                        ]

                                    },
                                    "rowActions": [
                                        {
                                            "id": "data_table_new",
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
                                                    "ajaxId": "data_table_save_actions_01",
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
                                            "id": "data_table_new_cancel",
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
                                            "id": "data_table_edit",
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
                                                    //  "conditionId": "edit_data_table_condition"
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
                                            "id": "data_table_cancel",
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
                                            "id": "data_table_save",
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
                                                    "ajaxId": "data_table_edit_actions_02",
                                                    // "stateId": "add_save_1",
                                                    // "conditionId": "add_data_table_condition"
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
                                            "id": "data_table_delete",
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
                                                    "dialogId": "data_table_delete_confirm_actions_03",
                                                    // "conditionId": "delete_operation_1",
                                                    "ajaxId": "data_table_delete_actions_03",
                                                    // "stateId": "before_delete_data_table"
                                                }
                                            ]
                                        }
                                    ],
                                    "dialog": [
                                        {
                                            "id": "data_table_delete_confirm_actions_03",
                                            "type": "confirm",
                                            "title": "确认操作",
                                            "content": "是否删除当前操作数据?",
                                            "cancelText": "取消",
                                            "okText": "确认"
                                        }
                                    ],
                                    "condition": [
                                        {
                                            "id": "add_data_tables_state",
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
                                            "id": "edit_data_tables_state",
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
                                            "id": "add_data_table_condition",
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
                                            "id": "edit_data_table_condition",
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
                                            "id": "cancel_edit_data_tables",
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
                                            "id": "cancel_add_data_tables",
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
                                            "id": "data_table_save_actions_01",
                                            "url": "resource/insert ",
                                            "urlType": "inner",
                                            "ajaxType": "post",
                                            "params": [
                                                {
                                                    "name": "id",
                                                    "type": "GUID"
                                                },
                                                {
                                                    "name": "resourceName",
                                                    "type": "componentValue",
                                                    "valueName": "resourceName"
                                                },
                                                {
                                                    "name": "descName",
                                                    "type": "componentValue",
                                                    "valueName": "descName"
                                                }
                                            ],
                                            "outputParameters": [

                                            ],
                                            "result": [
                                                {
                                                    "name": "data",
                                                    "showMessageWithNext": 0,
                                                    "message": "message.ajax.state.success",
                                                    "senderId": "afterTableSaveSuccess"
                                                },
                                                {
                                                    "name": "validation",
                                                    "senderId": "afterTableSaveValidation"
                                                },
                                                // {
                                                //     "name": "error",
                                                //     "senderId": "data_table_sender_02"
                                                // }
                                            ]
                                        },
                                        {
                                            "id": "data_table_edit_actions_02",
                                            "url": "resource/update",
                                            "urlType": "inner",
                                            "ajaxType": "put",
                                            "params": [
                                                {
                                                    "name": "id",
                                                    "type": "componentValue",
                                                    "valueName": "id"
                                                },
                                                {
                                                    "name": "resourceName",
                                                    "type": "componentValue",
                                                    "valueName": "resourceName"
                                                },
                                                {
                                                    "name": "descName",
                                                    "type": "componentValue",
                                                    "valueName": "descName"
                                                }
                                            ],
                                            "outputParameters": [

                                            ],
                                            "result": [
                                                {
                                                    "name": "data",
                                                    "showMessageWithNext": 0,
                                                    "message": "message.ajax.state.success",
                                                    "senderId": "afterTableUpdateSuccess"
                                                },
                                                {
                                                    "name": "validation",
                                                    "senderId": "afterProvinceUpdateValidation"
                                                }
                                            ]
                                        },
                                        {
                                            "id": "data_table_delete_actions_03",
                                            "url": "resource/delete",
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
                                                {
                                                    "name": "data",
                                                    "showMessageWithNext": 0,
                                                    "message": "message.ajax.state.success",
                                                    "senderId": "afterTableDeleteSuccess"
                                                },
                                            ]
                                        }
                                    ],
                                    "beforeTrigger": [
                                        {
                                            "id": "before_delete_data_table",
                                            "senderId": "view_data_table",
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
                                            "id": "after_selected_row",
                                            "senderId": "view_data_table",
                                            "sendData": [
                                                {
                                                    "beforeSend": [],
                                                    "reveicerId": "",
                                                    "receiverTriggerType": "BEHAVIOR",
                                                    "receiverTrigger": "REFRESH_AS_CHILD",
                                                    "params": [
                                                        {
                                                            "name": "_pid",
                                                            "type": "item",
                                                            "valueName": "id"
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
                                "title": "",
                                "span": 24,
                                "container": "component",
                                "noBorder": true,
                                "size": {
                                    "nzXs": 24,
                                    "nzSm": 24,
                                    "nzMd": 24,
                                    "nzLg": 24,
                                    "nzXl": 24,
                                    "nzXXl": 24
                                },
                                "header": {
                                    "title": "列信息表",
                                    "icon": "right-circle",
                                    "toolbar": {
                                        "id": "toolbar_data_column",
                                        "component": "cnToolbar",
                                        "size": "default",
                                        "cascade": {
                                            "messageSender": [],
                                            "messageReceiver": [
                                                {
                                                    "id": "s_201",
                                                    "senderId": "view_data_columns",
                                                    "receiveData": [
                                                        {
                                                            "triggerType": "STATE",
                                                            "trigger": "STATE_TO_TEXT"
                                                        }
                                                    ]
                                                },
                                                {
                                                    "id": "s_202",
                                                    "senderId": "view_data_columns",
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
                                                        "name": "_columnId",
                                                        "type": "item",
                                                        "valueName": "id",
                                                        "valueTo": "tempValue"
                                                    }
                                                ]
                                            }
                                        ],
                                        "dialog": [],
                                        "condition": [
                                            {
                                                "id": "add_data_table_condition_2",
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
                                                "id": "edit_data_table_condition_2",
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
                                                "id": "add_table_column_condition_none",
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
                                                "id": "edit_table_column_condition_none",
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
                                                "id": "data_table_condition_cancel",
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
                                                "id": "add_table_columns",
                                                "url": "column/batchInsert",
                                                "urlType": "inner",
                                                "ajaxType": "post",
                                                "params": [
                                                    {
                                                        "name": "id",
                                                        "type": "componentValue",
                                                        "valueName": "id"
                                                    },
                                                    {
                                                        "name": "resourceId",
                                                        "type": "tempValue",
                                                        "valueName": "_tableId"
                                                    },
                                                    {
                                                        "name": "paramName",
                                                        "type": "componentValue",
                                                        "valueName": "paramName"
                                                    },
                                                    {
                                                        "name": "isNullable",
                                                        "type": "componentValue",
                                                        "valueName": "isNullable",
                                                        "dataType": "int"
                                                    },
                                                    {
                                                        "name": "isUnique",
                                                        "type": "componentValue",
                                                        "valueName": "isUnique",
                                                        "dataType": "int"
                                                    },
                                                    {
                                                        "name": "isValidate",
                                                        "type": "componentValue",
                                                        "valueName": "isValidate",
                                                        "dataType": "int"
                                                    },
                                                    {
                                                        "name": "defaultValue",
                                                        "type": "componentValue",
                                                        "valueName": "defaultValue"
                                                    },
                                                    {
                                                        "name": "descName",
                                                        "type": "componentValue",
                                                        "valueName": "descName"
                                                    },
                                                    {
                                                        "name": "datatype",
                                                        "type": "componentValue",
                                                        "valueName": "datatype"
                                                    },
                                                    {
                                                        "name": "orderCode",
                                                        "type": "componentValue",
                                                        "valueName": "orderCode",
                                                        "dataType": "int"
                                                    },
                                                    {
                                                        "name": "precision",
                                                        "type": "componentValue",
                                                        "valueName": "precision",
                                                        "dataType": "float"
                                                    },
                                                    {
                                                        "name": "length",
                                                        "type": "componentValue",
                                                        "valueName": "length"
                                                    }
                                                ],
                                                "outputParameters": [

                                                ],
                                                "result": [
                                                    {
                                                        "name": "data",
                                                        "showMessageWithNext": 0,
                                                        "message": "message.ajax.state.success",
                                                        "senderId": "afterTableColumnSaveSuccess"
                                                    },
                                                    {
                                                        "name": "validation",
                                                        "message": "message.ajax.state.success",
                                                        "senderId": "afterCitySaveValidation"
                                                    },
                                                    {
                                                        "name": "error",
                                                        "senderId": "toolbar_data_columns_01"
                                                    }
                                                ]
                                            },
                                            {
                                                "id": "edit_table_columns",
                                                "url": "column/batchUpdate",
                                                "urlType": "inner",
                                                "ajaxType": "put",
                                                "params": [
                                                    {
                                                        "name": "id",
                                                        "type": "componentValue",
                                                        "valueName": "id"
                                                    },
                                                    {
                                                        "name": "resourceId",
                                                        "type": "tempValue",
                                                        "valueName": "_tableId"
                                                    },
                                                    {
                                                        "name": "paramName",
                                                        "type": "componentValue",
                                                        "valueName": "paramName"
                                                    },
                                                    {
                                                        "name": "isNullable",
                                                        "type": "componentValue",
                                                        "valueName": "isNullable",
                                                        "dataType": "int"
                                                    },
                                                    {
                                                        "name": "isUnique",
                                                        "type": "componentValue",
                                                        "valueName": "isUnique",
                                                        "dataType": "int"
                                                    },
                                                    {
                                                        "name": "isValidate",
                                                        "type": "componentValue",
                                                        "valueName": "isValidate",
                                                        "dataType": "int"
                                                    },
                                                    {
                                                        "name": "defaultValue",
                                                        "type": "componentValue",
                                                        "valueName": "defaultValue"
                                                    },
                                                    {
                                                        "name": "descName",
                                                        "type": "componentValue",
                                                        "valueName": "descName"
                                                    },
                                                    {
                                                        "name": "datatype",
                                                        "type": "componentValue",
                                                        "valueName": "datatype"
                                                    },
                                                    {
                                                        "name": "orderCode",
                                                        "type": "componentValue",
                                                        "valueName": "orderCode",
                                                        "dataType": "int"
                                                    },
                                                    {
                                                        "name": "precision",
                                                        "type": "componentValue",
                                                        "valueName": "precision",
                                                        "dataType": "float"
                                                    },
                                                    {
                                                        "name": "length",
                                                        "type": "componentValue",
                                                        "valueName": "length"
                                                    }
                                                ],
                                                "outputParameters": [

                                                ],
                                                "result": [
                                                    {
                                                        "name": "data",
                                                        "showMessageWithNext": 0,
                                                        "message": "message.ajax.state.success",
                                                        "senderId": "afterTableColumnUpdateSuccess"
                                                    },
                                                    {
                                                        "name": "validation",
                                                        "showMessageWithNext": 0,
                                                        "message": "message.ajax.state.success",
                                                        "senderId": "afterTableColumnUpdateValidation"
                                                    },
                                                    {
                                                        "name": "error",
                                                        "senderId": "toolbar_data_columns_01"
                                                    }
                                                ]
                                            },
                                            {
                                                "id": "column_batch_delete_1",
                                                "url": "column/delete",
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
                                                        "senderId": "afterColumnDeleteSuccess"
                                                    }
                                                ]
                                            }
                                        ],
                                        "beforeTrigger": [

                                        ],
                                        "afterTrigger": [
                                            {
                                                "id": "",
                                                "senderId": "view_data_columns",
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
                                                "targetViewId": "view_data_columns",
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
                                                        "text": "创建列",
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
                                                        "text": "编辑列",
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
                                                                "ajaxId": "add_table_columns",
                                                                // "stateId": "add_save_1",
                                                                "conditionId": "add_table_column_condition_none"
                                                            },
                                                            {
                                                                "triggerType": "OPERATION",
                                                                "trigger": "SAVE_ROWS",
                                                                "ajaxId": "edit_table_columns",
                                                                // "stateId": "edit_save_1",
                                                                "conditionId": "edit_table_column_condition_none"
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
                                                    // {
                                                    //     "id": "M_addRowForm",
                                                    //     "text": "表单新增",
                                                    //     "state": "new",
                                                    //     "icon": "plus",
                                                    //     "color": "text-primary",
                                                    //     "hidden": false,
                                                    //     "disabled": false,
                                                    //     "execute": [
                                                    //         {
                                                    //             "triggerType": "ACTION",
                                                    //             "trigger": "DIALOG",
                                                    //             // "conditionId": "add_state_1"
                                                    //             "dialogId": "edit_data_table_form",
                                                    //             "ajaxId": "form_add_data_table",
                                                    //         }
                                                    //     ]
                                                    // },
                                                    // {
                                                    //     "id": "M_editRowForm",
                                                    //     "text": "表单更新",
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
                                                    //             "dialogId": "edit_data_table_form",
                                                    //             "ajaxId": "form_edit_city",
                                                    //             "changeValueId": "edit_form_changeValue"
                                                    //         }
                                                    //     ]
                                                    // },
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
                                                                // "conditionId": "delete_operation_2",
                                                                "ajaxId": "column_batch_delete_1"
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        "id": "M_cancelrow",
                                                        "text": "取消",
                                                        "state": "edit",
                                                        "icon": "rollback",
                                                        "color": "text-grey-darker",
                                                        "hidden": true,
                                                        "disabled": null,
                                                        "execute": [
                                                            {
                                                                "triggerType": "STATE",
                                                                "trigger": "CANCEL_EDIT_ROWS",
                                                                "conditionId": "data_table_condition_cancel"
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
                                            }
                                        ]
                                    }
                                },
                                "component": {
                                    "id": "view_data_columns",
                                    "title": "",
                                    "titleIcon": "right-circle",
                                    "component": "cnDataTable",
                                    "keyId": "id",
                                    "size": "large",
                                    "isBordered": false,
                                    "isFrontPagination": false,
                                    "isPagination": true,
                                    "isShowSizeChanger": true,
                                    "showTotal": true,
                                    "pageSize": 10,
                                    "showCheckBox": true,
                                    "pageSizeOptions": [10, 20, 50, 100],
                                    "loadingOnInit": false,
                                    "loadingConfig": {
                                        "url": "resource/GET_DM_COLUMNS_LIST/query",
                                        "method": "get",
                                        "params": [
                                            {
                                                "name": "resourceId",
                                                "type": "tempValue",
                                                "valueName": "_tableId"
                                            },
                                            {
                                                "name": "_mapToObject",
                                                "type": "value",
                                                "value": true
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
                                            "title": "tableId",
                                            "type": "field",
                                            "field": "resourceId",
                                            "hidden": true,
                                            "showFilter": false,
                                            "showSort": false,
                                            "isShowExpand": false,
                                            "width": "50px",
                                            "style": {}
                                        },
                                        {
                                            "title": "列名",
                                            "type": "field",
                                            "field": "paramName",
                                            "hidden": false,
                                            "showFilter": false,
                                            "showSort": false,
                                            "width": "100px",
                                            "style": {},
                                            "editor": {
                                                "type": "input",
                                                "field": "paramName"
                                            }
                                        },
                                        {
                                            "title": "描述",
                                            "type": "field",
                                            "field": "descName",
                                            "hidden": false,
                                            "showFilter": false,
                                            "showSort": false,
                                            "width": "100px",
                                            "style": {},
                                            "editor": {
                                                "type": "input",
                                                "field": "descName"
                                            }
                                        },
                                        {
                                            "title": "数据类型",
                                            "type": "field",
                                            "field": "datatype",
                                            "hidden": false,
                                            "showFilter": false,
                                            "showSort": false,
                                            "width": "100px",
                                            "style": {},
                                            "editor": {
                                                "type": "select",
                                                "field": "datatype",
                                                "placeholder": "请输入",
                                                "defaultValue": "string",
                                                "options": [
                                                    { "label": 'string', "value": "string" },
                                                    { "label": 'nstring', "value": "nstring" },
                                                    { "label": 'char', "value": "char" },
                                                    { "label": "nchar", "value": "nchar" },
                                                    { "label": 'byte', "value": "byte" },
                                                    { "label": 'short', "value": "short" },
                                                    { "label": 'integer', "value": "integer" },
                                                    { "label": "float", "value": "float" },
                                                    { "label": 'double', "value": "double" },
                                                    { "label": 'date', "value": "date" },
                                                    { "label": 'clob', "value": "clob" },
                                                    { "label": "blob", "value": "blob" }
                                                ],
                                                "labelName": 'label',
                                                "valueName": 'value'
                                            }
                                        },
                                        {
                                            "title": "长度",
                                            "type": "field",
                                            "field": "length",
                                            "hidden": false,
                                            "showFilter": false,
                                            "showSort": false,
                                            "width": "100px",
                                            "style": {},
                                            "editor": {
                                                "type": "input",
                                                "field": "length"
                                            }
                                        },
                                        {
                                            "title": "默认值",
                                            "type": "field",
                                            "field": "defaultValue",
                                            "hidden": false,
                                            "showFilter": false,
                                            "showSort": false,
                                            "width": "100px",
                                            "style": {},
                                            "editor": {
                                                "type": "input",
                                                "field": "defautValue"
                                            }
                                        },
                                        {
                                            "title": "精度",
                                            "type": "field",
                                            "field": "precision",
                                            "hidden": false,
                                            "showFilter": false,
                                            "showSort": false,
                                            "width": "100px",
                                            "style": {},
                                            "editor": {
                                                "type": "input",
                                                "field": "precision"
                                            }
                                        },
                                        {
                                            "title": "是否为空",
                                            "type": "field",
                                            "field": "isNullableText",
                                            "hidden": false,
                                            "showFilter": false,
                                            "showSort": false,
                                            "width": "100px",
                                            "style": {},
                                            "editor": {
                                                "type": "select",
                                                "field": "isNullable",
                                                // "placeholder": "请输入",
                                                "defaultValue": 1,
                                                "options": [
                                                    { "label": '不为空', "value": 0 },
                                                    { "label": '可为空', "value": 1 },
                                                ],
                                                "labelName": 'label',
                                                "valueName": 'value',
                                            },
                                            "custom": {
                                                "type": "tag",
                                                "field": "isNullableText",
                                                "dataMapping": [
                                                    {
                                                        "color": "#87d068",
                                                        "field": "isNullableText",
                                                        "value": "不为空"
                                                    },
                                                    {
                                                        "color": "orange",
                                                        "field": "isNullableText",
                                                        "value": "可为空"
                                                    }
                                                ]
                                            }
                                        },
                                        {
                                            "title": "是否唯一",
                                            "type": "field",
                                            "field": "isUniqueText",
                                            "hidden": false,
                                            "showFilter": false,
                                            "showSort": false,
                                            "width": "100px",
                                            "style": {},
                                            "editor": {
                                                "type": "select",
                                                "field": "isUnique",
                                                // "placeholder": "请输入",
                                                "defaultValue": 0,
                                                "options": [
                                                    { "label": '不唯一', "value": 0 },
                                                    { "label": '唯一', "value": 1 },
                                                ],
                                                "labelName": 'label',
                                                "valueName": 'value',
                                            },
                                            "custom": {
                                                "type": "tag",
                                                "field": "isUniqueText",
                                                "dataMapping": [
                                                    {
                                                        "color": "#87d068",
                                                        "field": "isUniqueText",
                                                        "value": "不唯一"
                                                    },
                                                    {
                                                        "color": "#2db7f5",
                                                        "field": "isUniqueText",
                                                        "value": "唯一"
                                                    }
                                                ]
                                            }
                                        },
                                        {
                                            "title": "是否可用",
                                            "type": "field",
                                            "field": "isValidateText",
                                            "hidden": false,
                                            "showFilter": false,
                                            "showSort": false,
                                            "width": "100px",
                                            "style": {},
                                            "editor": {
                                                "type": "select",
                                                "field": "isValidate",
                                                // "placeholder": "请输入",
                                                "defaultValue": 1,
                                                "options": [
                                                    { "label": '不可用', "value": 0 },
                                                    { "label": '可用', "value": 1 },
                                                ],
                                                "labelName": 'label',
                                                "valueName": 'value',
                                            },
                                            "custom": {
                                                "type": "tag",
                                                "field": "isValidateText",
                                                "dataMapping": [
                                                    {
                                                        "color": "#87d768",
                                                        "field": "isValidateText",
                                                        "value": "可用"
                                                    },
                                                    {
                                                        "color": "#2d27a5",
                                                        "field": "isValidateText",
                                                        "value": "不可用"
                                                    }
                                                ]
                                            }
                                        },
                                        {
                                            "title": "排序编号",
                                            "type": "field",
                                            "field": "orderCode",
                                            "hidden": false,
                                            "showFilter": false,
                                            "showSort": false,
                                            "width": "100px",
                                            "style": {},
                                            "editor": {
                                                "type": "input",
                                                "field": "orderCode"
                                            }
                                        },
                                        {
                                            "title": "操作",
                                            "type": "action",
                                            "width": "150px",
                                            "actionIds": [
                                                "column_new_row", "column_cancel_new_row", "column_edit", "column_save", "column_cancel", "column_delete"
                                            ]
                                        }
                                    ],
                                    "rowActions": [
                                        {
                                            "id": "column_new_row",
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
                                                    "ajaxId": "add_column_1",
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
                                            "id": "column_cancel_new_row",
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
                                            "id": "column_edit",
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
                                            "id": "column_save",
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
                                                    "ajaxId": "edit_column_1",
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
                                            "id": "column_cancel",
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
                                            "id": "column_delete",
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
                                                    "ajaxId": "column_delete_1"
                                                }
                                            ]
                                        }
                                    ],
                                    "cascade": {
                                        "messageSender": [
                                            {
                                                "id": "view2_sender_1",
                                                "senderId": "view_data_columns",
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
                                                                "value": "view_data_columns",
                                                                "type": "value"
                                                            }
                                                        ]
                                                    }
                                                ]
                                            },
                                            {
                                                "id": "view2_sender_2",
                                                "senderId": "view_data_columns",
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
                                                                "value": "view_data_columns",
                                                                "type": "value"
                                                            }
                                                        ]
                                                    }
                                                ]
                                            },
                                            {
                                                "id": "view2_sender_3",
                                                "senderId": "view_data_columns",
                                                "triggerType": "STATE",
                                                "trigger": "CANCEL_EDIT_ROW",
                                                "triggerMoment": "after",
                                                "sendData": [
                                                    {
                                                        "reveicerId": "",
                                                        "receiverTriggerType": "STATE",
                                                        "receiverTrigger": "STATE_TO_TEXT",
                                                        "conditionId": "cancel_edit_data_tables",
                                                        "params": [
                                                            {
                                                                "name": "targetViewId",
                                                                "value": "view_data_columns",
                                                                "type": "value"
                                                            }
                                                        ]
                                                    }
                                                ]
                                            },
                                            {
                                                "id": "view2_sender_04",
                                                "senderId": "view_data_columns",
                                                "triggerType": "STATE",
                                                "trigger": "CANCEL_NEW_ROW",
                                                "triggerMoment": "after",
                                                "sendData": [
                                                    {
                                                        "reveicerId": "",
                                                        "receiverTriggerType": "STATE",
                                                        "receiverTrigger": "STATE_TO_TEXT",
                                                        "conditionId": "cancel_add_data_tables",
                                                        "params": [
                                                            {
                                                                "name": "targetViewId",
                                                                "value": "view_data_columns",
                                                                "type": "value"
                                                            }
                                                        ]
                                                    }
                                                ]
                                            },
                                            {
                                                "id": "data_table_sender_04",
                                                "senderId": "view_data_columns",
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
                                                                "value": "view_data_columns",
                                                                "type": "value"
                                                            }
                                                        ]
                                                    }
                                                ]
                                            },
                                            {
                                                "id": "data_table_sender_07",
                                                "senderId": "view_data_columns",
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
                                                                "value": "view_data_table",
                                                                "type": "value"
                                                            }
                                                        ]
                                                    }
                                                ]
                                            },
                                            {
                                                "id": "afterTableColumnSaveSuccess",
                                                "senderId": "view_data_columns",
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
                                                "id": "afterTableColumnUpdateSuccess",
                                                "senderId": "view_data_columns",
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
                                                                "type": "editedRows",
                                                                "valueName": "id"
                                                            }
                                                        ]
                                                    }
                                                ]
                                            },
                                            {
                                                "id": "afterCitySaveValidation",
                                                "senderId": "view_data_columns",
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
                                                "senderId": "view_data_columns",
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
                                                "senderId": "view_data_columns",
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
                                                "senderId": "view_data_columns",
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
                                            {
                                                "id": "afterColumnDeleteSuccess",
                                                "senderId": "view_data_columns",
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
                                                "senderId": "view_data_table",
                                                "receiveData": [
                                                    {
                                                        "beforeReceive": [],
                                                        "triggerType": "BEHAVIOR",
                                                        "trigger": "REFRESH_AS_CHILD",
                                                        "params": [
                                                            {
                                                                "pname": "_tableId",
                                                                "cname": "_tableId",
                                                                "valueTo": "tempValue"
                                                            }
                                                        ]
                                                    }
                                                ]
                                            },
                                            {
                                                "id": "",
                                                "senderId": "view_data_columns",
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
                                                    // {
                                                    //     "beforeReceive": [],
                                                    //     "triggerType": "ACTION",
                                                    //     "trigger": "CHANGE_ADDED_ROWS_TO_TEXT"
                                                    //     // "params": [
                                                    //     //     {
                                                    //     //         "pname": "name",
                                                    //     //         "cname": "_PID",
                                                    //     //         "valueTo": "tempValue"
                                                    //     //     }
                                                    //     // ]
                                                    // },
                                                    // {
                                                    //     "beforeReceive": [],
                                                    //     "triggerType": "ACTION",
                                                    //     "trigger": "CHANGE_EDITED_ROWS_TO_TEXT"
                                                    //     // "params": [
                                                    //     //     {
                                                    //     //         "pname": "name",
                                                    //     //         "cname": "_PID",
                                                    //     //         "valueTo": "tempValue"
                                                    //     //     }
                                                    //     // ]
                                                    // },
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
                                    "condition": [
                                        {
                                            "id": "add_table_column_state",
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
                                            "id": "edit_table_column_state",
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
                                            "id": "add_table_column_condition",
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
                                            "id": "edit_table_column_condition",
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
                                            "id": "cancel_edit_table_column",
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
                                            "id": "cancel_add_table_column",
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
                                    "ajaxConfig": [],
                                    cascadeValue1: [ // 值级联配置
                                        {
                                          "type": '值变化',
                                          "controlId": '002', //  大的control标识，级联内部
                                          "name": 'isNullable',
                                          "CascadeObjects": [
                                            {
                                              "controlId": '003',
                                              "cascadeName": 'isUnique',
                                              "cascadeItems": [  // 根据值执行
                                                {
                                                  "type": 'default',  // conditions   default  满足条件执行或者默认都执行
                                                  "caseValue": {    // 条件描述 （触发级联的前置条件，如果不设置，则是满足）
                                                    "type": 'selectObjectValue',
                                                    "valueName": 'num',
                                                    "regular": '^0$'
                                                  },
                                                  "content": {  // 应答体描述
                                                    "type": 'setValue', // 应答类型（异步、消息、赋值、隐藏、显示...）
                                                    "data": {
                                                      "option": [
                                                        { "name": 'value', "type": 'selectValue', "value": '1', "valueName": 'value' }
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
                            }],
                        id: "3vlDRq",
                        type: "row"
                    }
                ]

            }
        }
    }

    // public config = {
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
    //                         "size": "default",
    //                         "cascade": {
    //                             "messageSender": [
    //                                 {
    //                                     "id": "toolbar_01",
    //                                     "senderId": "view_data_table",
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
    //                                     "senderId": "view_data_table",
    //                                     "receiveData": [
    //                                         {
    //                                             "triggerType": "STATE",
    //                                             "trigger": "STATE_TO_TEXT"
    //                                         }
    //                                     ]
    //                                 },
    //                                 {
    //                                     "id": "s_002",
    //                                     "senderId": "view_data_table",
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
    //                                 "id": "edit_form_data_table_changeValue",
    //                                 "params": [
    //                                     {
    //                                         "name": "_tableId",
    //                                         "type": "item",
    //                                         "valueName": "id",
    //                                         "valueTo": "tempValue"
    //                                     }
    //                                 ]
    //                             }
    //                         ],
    //                         "dialog": [
    //                             {
    //                                 "id": "edit_data_table_form",
    //                                 "type": "confirm",
    //                                 "title": "数据编辑",
    //                                 "cancelText": "取消",
    //                                 "okText": "提交",
    //                                 "form": {
    //                                     "id": "form_data_table",
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
    //                                                         "id": "ioj0mV", "col": "cc", "type": "col", "title": "列ioj0mV", "span": 24, "layoutContain": "input",
    //                                                         "size": {
    //                                                             "nzXs": 24, "nzSm": 24, "nzMd": 24, "nzLg": 24, "ngXl": 24, "nzXXl": 24
    //                                                         },
    //                                                         "control": { "id": "002" }
    //                                                     },
    //                                                     // {
    //                                                     //     "id": "ioj0mV1", "col": "cc", "type": "col", "title": "列ioj0mV", "span": 24, "layoutContain": "input",
    //                                                     //     "size": {
    //                                                     //         "nzXs": 24, "nzSm": 24, "nzMd": 24, "nzLg": 24, "ngXl": 24, "nzXXl": 24
    //                                                     //     },
    //                                                     //     "control": { "id": "003" }
    //                                                     // }
    //                                                 ]
    //                                             }]
    //                                     },
    //                                     formControls: [
    //                                         {
    //                                             id: '001',
    //                                             "hidden": true, // 字段是否隐藏
    //                                             "title": '表名',  // lable 信息
    //                                             "titleConfig": {
    //                                                 required: true
    //                                             },
    //                                             "field": "resourceName",  // fromcontrol name  默认的字段
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
    //                                                 "field": 'resourceName',   // 字段
    //                                             },
    //                                             "editor": {            // 编辑状态字段  日后扩充可为数组，满足条件下的组件变化
    //                                                 "type": "input",
    //                                                 "field": "resourceName",  // 编辑字段于定义字段一致 （此处定义于表格相反）
    //                                                 "placeholder": "请输入",
    //                                                 "validations": [  // 校验
    //                                                     { validator: "required", type: "default", "message": "请输入省名称" }
    //                                                 ]
    //                                             }
    //                                         },
    //                                         {
    //                                             id: '002',
    //                                             "hidden": true, // 字段是否隐藏
    //                                             "title": '表描述',  // lable 信息
    //                                             "titleConfig": {
    //                                                 required: false
    //                                             },
    //                                             "field": "descName",  // fromcontrol name  默认的字段
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
    //                                                 "field": 'descName',   // 字段
    //                                             },
    //                                             "editor": {            // 编辑状态字段  日后扩充可为数组，满足条件下的组件变化
    //                                                 "type": "input",
    //                                                 "field": "descName",  // 编辑字段于定义字段一致 （此处定义于表格相反）
    //                                                 "placeholder": "请输入",
    //                                                 "validations": [  // 校验

    //                                                 ]
    //                                             }
    //                                         },
    //                                         {
    //                                             id: '003',
    //                                             "hidden": true, // 字段是否隐藏
    //                                             "title": '直属',  // lable 信息
    //                                             "titleConfig": {
    //                                                 required: false
    //                                             },
    //                                             "field": "id",  // fromcontrol name  默认的字段
    //                                             "labelSize": {
    //                                                 "span": 8,
    //                                                 "nzXs": 8, "nzSm": 8, "nzMd": 8, "nzLg": 8, "ngXl": 8, "nzXXl": 8
    //                                             },  // 
    //                                             "controlSize": {
    //                                                 "span": 16,
    //                                                 "nzXs": { span: 16, offset: 0 },
    //                                                 "nzSm": { span: 16, offset: 0 },
    //                                                 "nzMd": { span: 16, offset: 0 },
    //                                                 "nzLg": { span: 16, offset: 0 },
    //                                                 "ngXl": { span: 16, offset: 0 },
    //                                                 "nzXXl": { span: 16, offset: 0 }
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
    //                                                 { id: '003', state: "edit", hidden: false, readOnly: false }
    //                                             ]
    //                                         },
    //                                         {
    //                                             formState: "edit",
    //                                             Controls: [
    //                                                 { id: '001', state: "edit", hidden: false, readOnly: false },
    //                                                 { id: '002', state: "edit", hidden: false, readOnly: false },
    //                                                 { id: '003', state: "edit", hidden: false, readOnly: false }
    //                                             ]
    //                                         },
    //                                         {
    //                                             formState: "text",
    //                                             Controls: [
    //                                                 { id: '001', state: "text", hidden: false, readOnly: false },
    //                                                 { id: '002', state: "text", hidden: false, readOnly: false },
    //                                                 { id: '003', state: "edit", hidden: false, readOnly: false }
    //                                             ]
    //                                         }

    //                                     ],
    //                                     ajaxConfig: [
    //                                         {
    //                                             "id": "loadform",
    //                                             "url": "resource/DM_TABLE/query",
    //                                             "urlType": "inner",
    //                                             "ajaxType": "get",
    //                                             "params": [
    //                                                 {
    //                                                     "name": "id",
    //                                                     "type": "tempValue",
    //                                                     "valueName": "_tableId"
    //                                                 },
    //                                                 {
    //                                                     "name": "_mapToObject",
    //                                                     "type": "value",
    //                                                     "value": true
    //                                                 },
    //                                                 {
    //                                                     "name": "_mapToObject",
    //                                                     "type": "value",
    //                                                     "value": true
    //                                                 },
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
    //                                                 "senderId": "view_data_table",
    //                                                 "receiveData": [
    //                                                     {
    //                                                         "beforeReceive": [],
    //                                                         "triggerType": "BEHAVIOR",
    //                                                         "trigger": "REFRESH_AS_CHILD",
    //                                                         "params": [
    //                                                             {
    //                                                                 "pname": "id",
    //                                                                 "cname": "_id",
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
    //                                             "name": 'inpuresourceName2',
    //                                             "CascadeObjects": [
    //                                                 {
    //                                                     "controlId": '003',
    //                                                     "cascadeName": 'inpuresourceName3',
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
    //                                 "id": "add_data_tables_state",
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
    //                                 "id": "edit_data_tables_state",
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
    //                                 "id": "add_data_table_condition",
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
    //                                 "id": "edit_data_table_condition",
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
    //                                 "id": "edit_data_tables_cancel_2",
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
    //                                 "id": "add_data_tables",
    //                                 "url": "table/batchInsert",
    //                                 "urlType": "inner",
    //                                 "ajaxType": "post",
    //                                 "params": [
    //                                     {
    //                                         "name": "resourceName",
    //                                         "type": "componentValue",
    //                                         "valueName": "resourceName"
    //                                     },
    //                                     {
    //                                         "name": "descName",
    //                                         "type": "componentValue",
    //                                         "valueName": "descName"
    //                                     },
    //                                     {
    //                                         "name": "id",
    //                                         "type": "GUID",
    //                                     }
    //                                 ],
    //                                 "outputParameters": [

    //                                 ],
    //                                 "result": [
    //                                     {
    //                                         "name": "data",
    //                                         "showMessageWithNext": 0,
    //                                         "message": "message.ajax.state.success",
    //                                         "senderId": "afterTableSaveSuccess"
    //                                     },
    //                                     {
    //                                         "name": "validation",
    //                                         "message": "message.ajax.state.success",
    //                                         "senderId": "afterTableSaveValidation"
    //                                     },
    //                                     {
    //                                         "name": "error",
    //                                         "senderId": "toolbar_data_columns_01"
    //                                     }
    //                                 ]
    //                             },
    //                             {
    //                                 "id": "edit_data_tables",
    //                                 "url": "table/batchInsert",
    //                                 "urlType": "inner",
    //                                 "ajaxType": "put",
    //                                 "params": [
    //                                     {
    //                                         "name": "resourceName",
    //                                         "type": "componentValue",
    //                                         "valueName": "resourceName"
    //                                     },
    //                                     {
    //                                         "name": "descName",
    //                                         "type": "componentValue",
    //                                         "valueName": "descName"
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
    //                                         "senderId": "afterTableUpdateSuccess"
    //                                     },
    //                                     {
    //                                         "name": "validation",
    //                                         "message": "message.ajax.state.success",
    //                                         "senderId": "aftetProvinceUpdateValidation"
    //                                     },
    //                                     {
    //                                         "name": "error",
    //                                         "senderId": "toolbar_data_columns_01"
    //                                     }
    //                                 ]
    //                             },
    //                             {
    //                                 "id": "form_add_data_table",
    //                                 "url": "table/insert",
    //                                 "urlType": "inner",
    //                                 "ajaxType": "post",
    //                                 "params": [
    //                                     {
    //                                         "name": "resourceName",
    //                                         "type": "componentValue",
    //                                         "valueName": "resourceName"
    //                                     },
    //                                     {
    //                                         "name": "descName",
    //                                         "type": "componentValue",
    //                                         "valueName": "descName"
    //                                     },
    //                                     {
    //                                         "name": "id",
    //                                         "type": "GUID"
    //                                     }
    //                                 ],
    //                                 "outputParameters": [

    //                                 ],
    //                                 "result": [
    //                                     {
    //                                         "name": "data",
    //                                         "showMessageWithNext": 0,
    //                                         "message": "message.ajax.state.success",
    //                                         "senderId": "afterTableModelingSaveSuccess"
    //                                     }
    //                                 ]
    //                             },
    //                             {
    //                                 "id": "form_edit_data_table",
    //                                 "url": "table/update",
    //                                 "urlType": "inner",
    //                                 "ajaxType": "put",
    //                                 "params": [
    //                                     {
    //                                         "name": "resourceName",
    //                                         "type": "componentValue",
    //                                         "valueName": "resourceName"
    //                                     },
    //                                     {
    //                                         "name": "descName",
    //                                         "type": "componentValue",
    //                                         "valueName": "descName"
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
    //                                         "senderId": "afterTableModelingSaveSuccess"
    //                                     }
    //                                 ]
    //                             },
    //                             {
    //                                 "id": "create_modeling",
    //                                 "url": "table/createModel",
    //                                 "urlType": "inner",
    //                                 "ajaxType": "post",
    //                                 "params": [
    //                                     {
    //                                         "name": "id",
    //                                         "type": "item",
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
    //                                         "senderId": "afterTableModelingSaveSuccess"
    //                                     },
    //                                 ]
    //                             },
    //                             {
    //                                 "id": "cancel_create_modeling",
    //                                 "url": "dmtable/cancelModel",
    //                                 "urlType": "inner",
    //                                 "ajaxType": "put",
    //                                 "params": [
    //                                     {
    //                                         "name": "id",
    //                                         "type": "checkedId",
    //                                         "valueName": "id"
    //                                     }
    //                                 ],
    //                                 "outputParameters": [

    //                                 ],
    //                                 "result": [

    //                                 ]
    //                             },
    //                             {
    //                                 "id": "delete_data_table",
    //                                 "url": "table/delete",
    //                                 "urlType": "inner",
    //                                 "ajaxType": "delete",
    //                                 "params": [
    //                                     {
    //                                         "name": "ids",
    //                                         "type": "checkedId",
    //                                         "valueName": "id"
    //                                     }
    //                                 ],
    //                                 "outputParameters": [

    //                                 ],
    //                                 "result": [

    //                                 ]
    //                             }
    //                         ],
    //                         "beforeTrigger": [],
    //                         "afterTrigger": [
    //                             {
    //                                 "id": "",
    //                                 "senderId": "view_data_table",
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
    //                                 "targetViewId": "view_data_table",
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
    //                                     // {
    //                                     //     "id": "M_addRow",
    //                                     //     "text": "新增表资源",
    //                                     //     "icon": "plus",
    //                                     //     "color": "text-primary",
    //                                     //     "hidden": false,
    //                                     //     "disabled": false,
    //                                     //     "execute": [
    //                                     //         {
    //                                     //             "triggerType": "STATE",
    //                                     //             "trigger": "ADD_ROW",
    //                                     //             // "conditionId": "add_state_1"
    //                                     //         }
    //                                     //     ]
    //                                     // },
    //                                     {
    //                                         "id": "M_addRowForm",
    //                                         "text": "新增表资源",
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
    //                                                 "dialogId": "edit_data_table_form",
    //                                                 "ajaxId": "form_add_data_table",
    //                                             }
    //                                         ]
    //                                     },
    //                                     {
    //                                         "id": "M_editRowForm",
    //                                         "text": "修改表资源",
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
    //                                                 "dialogId": "edit_data_table_form",
    //                                                 "ajaxId": "form_edit_data_table",
    //                                                 "changeValueId": "edit_form_data_table_changeValue"
    //                                             }
    //                                         ]
    //                                     },
    //                                     // {
    //                                     //     "id": "M_updateRow",
    //                                     //     "text": "修改",
    //                                     //     "icon": "edit",
    //                                     //     "color": "text-success",
    //                                     //     "hidden": false,
    //                                     //     "disabled": false,
    //                                     //     "state": "text",
    //                                     //     "execute": [
    //                                     //         {
    //                                     //             "triggerType": "STATE",
    //                                     //             "trigger": "EDIT_ROWS",
    //                                     //             "conditionId": "edit_data_tables_state"
    //                                     //         }
    //                                     //     ],
    //                                     //     "toggle": {
    //                                     //         "type": "state",
    //                                     //         "toggleProperty": "hidden",
    //                                     //         "values": [
    //                                     //             {
    //                                     //                 "name": "edit",
    //                                     //                 "value": true
    //                                     //             },
    //                                     //             {
    //                                     //                 "name": "text",
    //                                     //                 "value": false
    //                                     //             }
    //                                     //         ]
    //                                     //     }
    //                                     // },
    //                                     {
    //                                         "id": "M_modeling",
    //                                         "text": "建模",
    //                                         "icon": "table",
    //                                         "color": "text-red-light",
    //                                         "hidden": false,
    //                                         "disabled": false,
    //                                         "execute": [
    //                                             {
    //                                                 "triggerType": "OPERATION",
    //                                                 "trigger": "EXECUTE_SELECTED_ROW",
    //                                                 // "conditionId": "delete_operation_1",
    //                                                 "ajaxId": "create_modeling"
    //                                             }
    //                                         ]
    //                                     },
    //                                     {
    //                                         "id": "M_cancel_modeling",
    //                                         "text": "取消建模",
    //                                         "icon": "line",
    //                                         "color": "text-red-light",
    //                                         "hidden": false,
    //                                         "disabled": false,
    //                                         "execute": [
    //                                             {
    //                                                 "triggerType": "OPERATION",
    //                                                 "trigger": "EXECUTE_CHECKED_ROWS_IDS",
    //                                                 // "conditionId": "delete_operation_1",
    //                                                 "ajaxId": "cancel_create_modeling"
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
    //                                                 // "conditionId": "delete_operation_1",
    //                                                 "ajaxId": "delete_data_table"
    //                                             }
    //                                         ]
    //                                     },
    //                                     // {
    //                                     //     "id": "M_saveRow",
    //                                     //     "text": "保存",
    //                                     //     "icon": "save",
    //                                     //     "color": "text-primary",
    //                                     //     "hidden": true,
    //                                     //     "disabled": false,
    //                                     //     "execute": [
    //                                     //         {
    //                                     //             "triggerType": "OPERATION",
    //                                     //             "trigger": "SAVE_ROWS",
    //                                     //             "ajaxId": "add_data_tables",
    //                                     //             // "stateId": "add_save_1",
    //                                     //             "conditionId": "add_data_table_condition"
    //                                     //         },
    //                                     //         {
    //                                     //             "triggerType": "OPERATION",
    //                                     //             "trigger": "SAVE_ROWS",
    //                                     //             "ajaxId": "edit_data_table_condition",
    //                                     //             // "stateId": "edit_data_tables",
    //                                     //             "conditionId": ""
    //                                     //         }
    //                                     //     ],
    //                                     //     "toggle": {
    //                                     //         "type": "state",
    //                                     //         "toggleProperty": "hidden",
    //                                     //         "values": [
    //                                     //             {
    //                                     //                 "name": "edit",
    //                                     //                 "value": false
    //                                     //             },
    //                                     //             {
    //                                     //                 "name": "text",
    //                                     //                 "value": true
    //                                     //             },
    //                                     //             {
    //                                     //                 "name": "new",
    //                                     //                 "value": false
    //                                     //             }
    //                                     //         ]
    //                                     //     }
    //                                     // },
    //                                     // {
    //                                     //     "id": "M_cancelrow",
    //                                     //     "text": "取消1",
    //                                     //     "state": "edit",
    //                                     //     "icon": "rollback",
    //                                     //     "color": "text-grey-darker",
    //                                     //     "hidden": true,
    //                                     //     "disabled": null,
    //                                     //     "execute": [
    //                                     //         {
    //                                     //             "triggerType": "STATE",
    //                                     //             "trigger": "CANCEL_EDIT_ROWS",
    //                                     //             "conditionId": "edit_data_tables_cancel_2"
    //                                     //         },
    //                                     //         {
    //                                     //             "triggerType": "STATE",
    //                                     //             "trigger": "CANCEL_NEW_ROWS"
    //                                     //         }
    //                                     //     ],
    //                                     //     "toggle": {
    //                                     //         "type": "state",
    //                                     //         "toggleProperty": "hidden",
    //                                     //         "values": [
    //                                     //             {
    //                                     //                 "name": "edit",
    //                                     //                 "value": false
    //                                     //             },
    //                                     //             {
    //                                     //                 "name": "text",
    //                                     //                 "value": true
    //                                     //             },
    //                                     //             {
    //                                     //                 "name": "new",
    //                                     //                 "value": false
    //                                     //             }
    //                                     //         ]
    //                                     //     }
    //                                     // }
    //                                 ]
    //                             },
    //                             {
    //                                 "targetViewId": "view_data_columns",
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
    //                         "id": "view_data_table",
    //                         "title": "主表",
    //                         "titleIcon": "right-circle",
    //                         "component": "cnDataTable",
    //                         "keyId": "id",
    //                         "size": "small",
    //                         "isBordered": true,
    //                         "isFrontPagination": false,
    //                         "isPagination": true,
    //                         "isShowSizeChanger": true,
    //                         "showTotal": true,
    //                         "pageSize": 10,
    //                         "showCheckBox": true,
    //                         "pageSizeOptions": [10, 20, 50, 100],
    //                         "loadingOnInit": true,
    //                         // "scroll": {
    //                         //     "y": "300px"
    //                         // },
    //                         "spanWidthConfig": [
    //                             '50px', '100px', '200px', '200px', '200px'
    //                         ],
    //                         "loadingConfig": {
    //                             "url": "resource/DM_TABLE/query",
    //                             "method": "get",
    //                             "params": [
    //                                 {
    //                                     "name": "_mapToObject",
    //                                     "type": "value",
    //                                     "value": true
    //                                 },
    //                                 // {
    //                                 //     "name": "_sort",
    //                                 //     "type": "value",
    //                                 //     "value": "resourceName ASC"
    //                                 // },
    //                                 // {
    //                                 //     "name": "_order",
    //                                 //     "type": "value",
    //                                 //     "value": "DESC"
    //                                 // }
    //                             ],
    //                             "filter": []
    //                         },
    //                         "columns": [
    //                             {
    //                                 "title": "主键",
    //                                 "type": "field",
    //                                 "field": "id",
    //                                 "hidden": true,
    //                                 "showFilter": false,
    //                                 "showSort": false,
    //                                 "width": "50px",
    //                                 "style": {}
    //                             },
    //                             {
    //                                 "title": "表名称",
    //                                 "type": "field",
    //                                 "field": "resourceName",
    //                                 "hidden": false,
    //                                 "showFilter": false,
    //                                 "showSort": false,
    //                                 // "width": "50px",
    //                                 "style": {},
    //                             },
    //                             {
    //                                 "title": "描述",
    //                                 "type": "field",
    //                                 "field": "descName",
    //                                 "hidden": false,
    //                                 "showFilter": false,
    //                                 "showSort": false,
    //                                 // "width": "100px",
    //                                 "style": {},
    //                             },
    //                             {
    //                                 "title": "是否建模",
    //                                 "type": "field",
    //                                 "field": "isBuildModel",
    //                                 "hidden": false,
    //                                 "showFilter": false,
    //                                 "showSort": false,
    //                                 // "width": "100px",
    //                                 "style": {},
    //                             },
    //                             // {
    //                             //     "title": "创建时间",
    //                             //     "type": "field",
    //                             //     "field": "createDate",
    //                             //     "hidden": false,
    //                             //     "showFilter": false,
    //                             //     "showSort": false,
    //                             //     "width": "100px",
    //                             //     "style": {},
    //                             // },
    //                             {
    //                                 "title": "ACTION",
    //                                 "type": "action",
    //                                 "actionIds": [
    //                                     "data_table_edit", "data_table_cancel", "data_table_save", "data_table_delete", "data_table_new", "data_table_new_cancel"
    //                                 ]
    //                             }
    //                         ],
    //                         "cascade": {
    //                             "messageSender": [
    //                                 {
    //                                     "id": "data_table_sender_01",
    //                                     "senderId": "view_data_table",
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
    //                                                     "name": "_tableId",
    //                                                     "type": "item",
    //                                                     "valueName": "id"
    //                                                 }
    //                                             ]
    //                                         }
    //                                     ]
    //                                 },
    //                                 {
    //                                     "id": "data_table_sender_02",
    //                                     "senderId": "view_data_table",
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
    //                                                     "value": "view_data_table",
    //                                                     "type": "value"
    //                                                 }
    //                                             ]
    //                                         }
    //                                     ]
    //                                 },
    //                                 {
    //                                     "id": "data_table_sender_03",
    //                                     "senderId": "view_data_table",
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
    //                                                     "value": "view_data_table",
    //                                                     "type": "value"
    //                                                 }
    //                                             ]
    //                                         }
    //                                     ]
    //                                 },
    //                                 {
    //                                     "id": "data_table_sender_04",
    //                                     "senderId": "view_data_table",
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
    //                                                     "value": "view_data_table",
    //                                                     "type": "value"
    //                                                 }
    //                                             ]
    //                                         }
    //                                     ]
    //                                 },
    //                                 {
    //                                     "id": "data_table_sender_05",
    //                                     "senderId": "view_data_table",
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
    //                                                     "value": "view_data_table",
    //                                                     "type": "value"
    //                                                 }
    //                                             ]
    //                                         }
    //                                     ]
    //                                 },
    //                                 {
    //                                     "id": "data_table_sender_06",
    //                                     "senderId": "view_data_table",
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
    //                                                     "value": "view_data_table",
    //                                                     "type": "value"
    //                                                 }
    //                                             ]
    //                                         }
    //                                     ]
    //                                 },
    //                                 {
    //                                     "id": "data_table_sender_07",
    //                                     "senderId": "view_data_table",
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
    //                                                     "value": "view_data_table",
    //                                                     "type": "value"
    //                                                 }
    //                                             ]
    //                                         }
    //                                     ]
    //                                 },
    //                                 {
    //                                     "id": "afterTableSaveSuccess",
    //                                     "senderId": "view_data_table",
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
    //                                     "id": "afterTableModelingSaveSuccess",
    //                                     "senderId": "view_data_table",
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
    //                                     "id": "afterTableUpdateSuccess",
    //                                     "senderId": "view_data_table",
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
    //                                     "id": "afterTableSaveValidation",
    //                                     "senderId": "view_data_table",
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
    //                                     "senderId": "view_data_table",
    //                                     "sendData": [
    //                                         {
    //                                             "beforeSend": {},
    //                                             "reveicerId": "",
    //                                             "receiverTriggerType": "ACTION",
    //                                             "receiverTrigger": "SHOW_INVALIDATE_EDITED_ROWS"
    //                                         }
    //                                     ]
    //                                 }
    //                             ],
    //                             "messageReceiver": [
    //                                 {
    //                                     "id": "",
    //                                     "senderId": "view_data_table",
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
    //                                             "trigger": "LOAD_REFRESH_DATA"
    //                                         }
    //                                     ]
    //                                 }
    //                             ]

    //                         },
    //                         "rowActions": [
    //                             {
    //                                 "id": "data_table_new",
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
    //                                         "ajaxId": "data_table_save_actions_01",
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
    //                                 "id": "data_table_new_cancel",
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
    //                                 "id": "data_table_edit",
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
    //                                         //  "conditionId": "edit_data_table_condition"
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
    //                                 "id": "data_table_cancel",
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
    //                                 "id": "data_table_save",
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
    //                                         "ajaxId": "data_table_edit_actions_02",
    //                                         // "stateId": "add_save_1",
    //                                         // "conditionId": "add_data_table_condition"
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
    //                                 "id": "data_table_delete",
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
    //                                         "dialogId": "data_table_delete_confirm_actions_03",
    //                                         // "conditionId": "delete_operation_1",
    //                                         "ajaxId": "data_table_delete_actions_03",
    //                                         // "stateId": "before_delete_data_table"
    //                                     }
    //                                 ]
    //                             }
    //                         ],
    //                         "dialog": [
    //                             {
    //                                 "id": "data_table_delete_confirm_actions_03",
    //                                 "type": "confirm",
    //                                 "title": "确认操作",
    //                                 "content": "是否删除当前操作数据?",
    //                                 "cancelText": "取消",
    //                                 "okText": "确认"
    //                             }
    //                         ],
    //                         "condition": [
    //                             {
    //                                 "id": "add_data_tables_state",
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
    //                                 "id": "edit_data_tables_state",
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
    //                                 "id": "add_data_table_condition",
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
    //                                 "id": "edit_data_table_condition",
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
    //                                 "id": "cancel_edit_data_tables",
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
    //                                 "id": "cancel_add_data_tables",
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
    //                                 "id": "data_table_save_actions_01",
    //                                 "url": "table/insert ",
    //                                 "urlType": "inner",
    //                                 "ajaxType": "post",
    //                                 "params": [
    //                                     {
    //                                         "name": "id",
    //                                         "type": "GUID"
    //                                     },
    //                                     {
    //                                         "name": "resourceName",
    //                                         "type": "componentValue",
    //                                         "valueName": "resourceName"
    //                                     },
    //                                     {
    //                                         "name": "descName",
    //                                         "type": "componentValue",
    //                                         "valueName": "descName"
    //                                     }
    //                                 ],
    //                                 "outputParameters": [

    //                                 ],
    //                                 "result": [
    //                                     {
    //                                         "name": "data",
    //                                         "showMessageWithNext": 0,
    //                                         "message": "message.ajax.state.success",
    //                                         "senderId": "afterTableSaveSuccess"
    //                                     },
    //                                     {
    //                                         "name": "validation",
    //                                         "senderId": "afterTableSaveValidation"
    //                                     },
    //                                     // {
    //                                     //     "name": "error",
    //                                     //     "senderId": "data_table_sender_02"
    //                                     // }
    //                                 ]
    //                             },
    //                             {
    //                                 "id": "data_table_edit_actions_02",
    //                                 "url": "table/update",
    //                                 "urlType": "inner",
    //                                 "ajaxType": "put",
    //                                 "params": [
    //                                     {
    //                                         "name": "id",
    //                                         "type": "componentValue",
    //                                         "valueName": "id"
    //                                     },
    //                                     {
    //                                         "name": "resourceName",
    //                                         "type": "componentValue",
    //                                         "valueName": "resourceName"
    //                                     },
    //                                     {
    //                                         "name": "descName",
    //                                         "type": "componentValue",
    //                                         "valueName": "descName"
    //                                     }
    //                                 ],
    //                                 "outputParameters": [

    //                                 ],
    //                                 "result": [
    //                                     {
    //                                         "name": "data",
    //                                         "showMessageWithNext": 0,
    //                                         "message": "message.ajax.state.success",
    //                                         "senderId": "afterTableUpdateSuccess"
    //                                     },
    //                                     {
    //                                         "name": "validation",
    //                                         "senderId": "afterProvinceUpdateValidation"
    //                                     }
    //                                 ]
    //                             },
    //                             {
    //                                 "id": "data_table_delete_actions_03",
    //                                 "url": "table/delete",
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
    //                                     {
    //                                         "name": "data",
    //                                         "showMessageWithNext": 0,
    //                                         "message": "message.ajax.state.success",
    //                                         "senderId": "afterTableDeleteSuccess"
    //                                     },
    //                                 ]
    //                             }
    //                         ],
    //                         "beforeTrigger": [
    //                             {
    //                                 "id": "before_delete_data_table",
    //                                 "senderId": "view_data_table",
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
    //                                 "id": "after_selected_row",
    //                                 "senderId": "view_data_table",
    //                                 "sendData": [
    //                                     {
    //                                         "beforeSend": [],
    //                                         "reveicerId": "",
    //                                         "receiverTriggerType": "BEHAVIOR",
    //                                         "receiverTrigger": "REFRESH_AS_CHILD",
    //                                         "params": [
    //                                             {
    //                                                 "name": "_pid",
    //                                                 "type": "item",
    //                                                 "valueName": "id"
    //                                             }
    //                                         ]
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
    //                         "id": "toolbar_data_column",
    //                         "component": "cnToolbar",
    //                         "size": "default",
    //                         "cascade": {
    //                             "messageSender": [
    //                                 // {
    //                                 //     "id": "toolbar_data_columns_01",
    //                                 //     "senderId": "view_data_columns",
    //                                 //     "triggerType": "OPERATION",
    //                                 //     "trigger": "EXECUTE_CHECKED_ROWS",
    //                                 //     "triggerMoment": "after",
    //                                 //     "sendData": [
    //                                 //         {
    //                                 //             "beforeSend": {},
    //                                 //             "reveicerId": "",
    //                                 //             "receiverTriggerType": "BEHAVIOR",
    //                                 //             "receiverTrigger": "REFRESH_AS_CHILD",
    //                                 //             "params": [
    //                                 //                 {
    //                                 //                     "name": "id",
    //                                 //                     "type": "item",
    //                                 //                     "valueName": "id"
    //                                 //                 },
    //                                 //                 {
    //                                 //                     "name": "parent_name",
    //                                 //                     "type": "item",
    //                                 //                     "valueName": "name"
    //                                 //                 }
    //                                 //             ]
    //                                 //         }
    //                                 //     ]
    //                                 // }
    //                             ],
    //                             "messageReceiver": [
    //                                 {
    //                                     "id": "s_201",
    //                                     "senderId": "view_data_columns",
    //                                     "receiveData": [
    //                                         {
    //                                             "triggerType": "STATE",
    //                                             "trigger": "STATE_TO_TEXT"
    //                                         }
    //                                     ]
    //                                 },
    //                                 {
    //                                     "id": "s_202",
    //                                     "senderId": "view_data_columns",
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
    //                                         "name": "_columnId",
    //                                         "type": "item",
    //                                         "valueName": "id",
    //                                         "valueTo": "tempValue"
    //                                     }
    //                                 ]
    //                             }
    //                         ],
    //                         "dialog": [
    //                             {
    //                                 "id": "edit_data_table_form",
    //                                 "type": "confirm",
    //                                 "title": "数据编辑",
    //                                 "cancelText": "取消",
    //                                 "okText": "提交",
    //                                 "form": {
    //                                     "id": "form_data_table",
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
    //                                                             "id": "data_table_name_control"  // id 和引用id 值相同
    //                                                         }
    //                                                     }
    //                                                 ]
    //                                             }]
    //                                     },
    //                                     formControls: [
    //                                         {
    //                                             id: 'data_table_name_control',
    //                                             "hidden": true, // 字段是否隐藏
    //                                             "title": '表名称',  // lable 信息
    //                                             "titleConfig": {
    //                                                 required: true
    //                                             },
    //                                             "field": "resourceName",  // fromcontrol name  默认的字段
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
    //                                                 "field": 'resourceName',   // 字段
    //                                             },
    //                                             "editor": {            // 编辑状态字段  日后扩充可为数组，满足条件下的组件变化
    //                                                 "type": "input",
    //                                                 "field": "resourceName",  // 编辑字段于定义字段一致 （此处定义于表格相反）
    //                                                 "placeholder": "请输入",
    //                                                 "validations": [  // 校验
    //                                                     { validator: "required", type: "default", "message": "请输入省名称" }
    //                                                 ]
    //                                             }
    //                                         },
    //                                         {
    //                                             id: 'data_table_id_control',
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
    //                                             id: 'data_table_desc_control',
    //                                             "hidden": true, // 字段是否隐藏
    //                                             "title": '描述',  // lable 信息
    //                                             "titleConfig": {
    //                                                 required: false
    //                                             },
    //                                             "field": "descName",  // fromcontrol name  默认的字段
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
    //                                                 "field": 'descName',   // 字段
    //                                             },
    //                                             "editor": {            // 编辑状态字段  日后扩充可为数组，满足条件下的组件变化
    //                                                 "type": "input",
    //                                                 "field": "descName",  // 编辑字段于定义字段一致 （此处定义于表格相反）
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
    //                                                 { id: 'data_table_name_control', state: "edit", hidden: false, readOnly: false }
    //                                             ]
    //                                         },
    //                                         {
    //                                             formState: "edit",
    //                                             Controls: [
    //                                                 { id: 'data_table_name_control', state: "edit", hidden: false, readOnly: false }
    //                                             ]
    //                                         },
    //                                         {
    //                                             formState: "text",
    //                                             Controls: [
    //                                                 { id: 'data_table_name_control', state: "text", hidden: false, readOnly: false }
    //                                             ]
    //                                         }

    //                                     ],
    //                                     ajaxConfig: [
    //                                         {
    //                                             "id": "loadform",
    //                                             "url": "resource/DM_TABLE/query",
    //                                             "urlType": "inner",
    //                                             "ajaxType": "get",
    //                                             "params": [
    //                                                 {
    //                                                     "name": "id",
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
    //                                 "id": "add_data_table_condition_2",
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
    //                                 "id": "edit_data_table_condition_2",
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
    //                                 "id": "add_table_column_condition_none",
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
    //                                 "id": "edit_table_column_condition_none",
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
    //                                 "id": "data_table_condition_cancel",
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
    //                             // {
    //                             //     "id": "form_add_data_table",
    //                             //     "url": "dmtable/insert",
    //                             //     "urlType": "inner",
    //                             //     "ajaxType": "post",
    //                             //     "params": [
    //                             //         {
    //                             //             "name": "resourceName",
    //                             //             "type": "componentValue",
    //                             //             "valueName": "resourceName"
    //                             //         },
    //                             //         {
    //                             //             "name": "descName",
    //                             //             "type": "componentValue",
    //                             //             "valueName": "descName"
    //                             //         },
    //                             //         {
    //                             //             "name": "id",
    //                             //             "type": "GUID"
    //                             //         }
    //                             //     ],
    //                             //     "outputParameters": [

    //                             //     ],
    //                             //     "result": [
    //                             //         {
    //                             //             "name": "data",
    //                             //             "showMessageWithNext": 0,
    //                             //             "message": "message.ajax.state.success",
    //                             //             "senderId": "afterTableColumnSaveSuccess"
    //                             //         },
    //                             //         {
    //                             //             "name": "validation",
    //                             //             "message": "message.ajax.state.success",
    //                             //             "senderId": "afterTableColumnSaveValidation"
    //                             //         },
    //                             //         {
    //                             //             "name": "error",
    //                             //             "senderId": "toolbar_data_columns_01"
    //                             //         }
    //                             //     ]
    //                             // },
    //                             // {
    //                             //     "id": "form_edit_city",
    //                             //     "url": "city/update",
    //                             //     "urlType": "inner",
    //                             //     "ajaxType": "put",
    //                             //     "params": [
    //                             //         {
    //                             //             "name": "cityName",
    //                             //             "type": "componentValue",
    //                             //             "valueName": "cityName"
    //                             //         },
    //                             //         {
    //                             //             "name": "zipCode",
    //                             //             "type": "componentValue",
    //                             //             "valueName": "zipCode"
    //                             //         },
    //                             //         {
    //                             //             "name": "populationSize",
    //                             //             "type": "componentValue",
    //                             //             "valueName": "populationSize"
    //                             //         },
    //                             //         {
    //                             //             "name": "directlyUnder",
    //                             //             "type": "componentValue",
    //                             //             "valueName": "directlyUnder"
    //                             //         },
    //                             //         {
    //                             //             "name": "createDate",
    //                             //             "type": "componentValue",
    //                             //             "valueName": "createDate"
    //                             //         },
    //                             //         {
    //                             //             "name": "pId",
    //                             //             "type": "componentValue",
    //                             //             "valueName": "pId"
    //                             //         },
    //                             //         {
    //                             //             "name": "id",
    //                             //             "type": "componentValue",
    //                             //             "valueName": "id"
    //                             //         }
    //                             //     ],
    //                             //     "outputParameters": [

    //                             //     ],
    //                             //     "result": [
    //                             //         {
    //                             //             "name": "data",
    //                             //             "showMessageWithNext": 0,
    //                             //             "message": "message.ajax.state.success",
    //                             //             "senderId": "afterCityUpdateFormSuccessfully"
    //                             //         },
    //                             //         {
    //                             //             "name": "validation",
    //                             //             "showMessageWithNext": 0,
    //                             //             "message": "message.ajax.state.success",
    //                             //             "senderId": "afterCityUpdateFormValidation"
    //                             //         },
    //                             //         {
    //                             //             "name": "error",
    //                             //             "senderId": "toolbar_data_columns_01"
    //                             //         }
    //                             //     ]
    //                             // },
    //                             {
    //                                 "id": "add_table_columns",
    //                                 "url": "column/batchInsert",
    //                                 "urlType": "inner",
    //                                 "ajaxType": "post",
    //                                 "params": [
    //                                     {
    //                                         "name": "id",
    //                                         "type": "componentValue",
    //                                         "valueName": "id"
    //                                     },
    //                                     {
    //                                         "name": "tableId",
    //                                         "type": "tempValue",
    //                                         "valueName": "_tableId"
    //                                     },
    //                                     {
    //                                         "name": "cname",
    //                                         "type": "componentValue",
    //                                         "valueName": "cname"
    //                                     },
    //                                     {
    //                                         "name": "isNullable",
    //                                         "type": "componentValue",
    //                                         "valueName": "isNullable",
    //                                         "dataType": "int"
    //                                     },
    //                                     {
    //                                         "name": "isUnique",
    //                                         "type": "componentValue",
    //                                         "valueName": "isUnique",
    //                                         "dataType": "int"
    //                                     },
    //                                     {
    //                                         "name": "isValidate",
    //                                         "type": "componentValue",
    //                                         "valueName": "isValidate",
    //                                         "dataType": "int"
    //                                     },
    //                                     {
    //                                         "name": "defaultValue",
    //                                         "type": "componentValue",
    //                                         "valueName": "defaultValue"
    //                                     },
    //                                     {
    //                                         "name": "descName",
    //                                         "type": "componentValue",
    //                                         "valueName": "descName"
    //                                     },
    //                                     {
    //                                         "name": "datatype",
    //                                         "type": "componentValue",
    //                                         "valueName": "datatype"
    //                                     },
    //                                     {
    //                                         "name": "orderCode",
    //                                         "type": "componentValue",
    //                                         "valueName": "orderCode",
    //                                         "dataType": "int"
    //                                     },
    //                                     {
    //                                         "name": "precision",
    //                                         "type": "componentValue",
    //                                         "valueName": "precision",
    //                                         "dataType": "float"
    //                                     },
    //                                     {
    //                                         "name": "length",
    //                                         "type": "componentValue",
    //                                         "valueName": "length"
    //                                     }
    //                                 ],
    //                                 "outputParameters": [

    //                                 ],
    //                                 "result": [
    //                                     {
    //                                         "name": "data",
    //                                         "showMessageWithNext": 0,
    //                                         "message": "message.ajax.state.success",
    //                                         "senderId": "afterTableColumnSaveSuccess"
    //                                     },
    //                                     {
    //                                         "name": "validation",
    //                                         "message": "message.ajax.state.success",
    //                                         "senderId": "afterCitySaveValidation"
    //                                     },
    //                                     {
    //                                         "name": "error",
    //                                         "senderId": "toolbar_data_columns_01"
    //                                     }
    //                                 ]
    //                             },
    //                             {
    //                                 "id": "edit_table_columns",
    //                                 "url": "column/batchUpdate",
    //                                 "urlType": "inner",
    //                                 "ajaxType": "put",
    //                                 "params": [
    //                                     {
    //                                         "name": "id",
    //                                         "type": "componentValue",
    //                                         "valueName": "id"
    //                                     },
    //                                     {
    //                                         "name": "tableId",
    //                                         "type": "tempValue",
    //                                         "valueName": "_tableId"
    //                                     },
    //                                     {
    //                                         "name": "cname",
    //                                         "type": "componentValue",
    //                                         "valueName": "cname"
    //                                     },
    //                                     {
    //                                         "name": "isNullable",
    //                                         "type": "componentValue",
    //                                         "valueName": "isNullable",
    //                                         "dataType": "int"
    //                                     },
    //                                     {
    //                                         "name": "isUnique",
    //                                         "type": "componentValue",
    //                                         "valueName": "isUnique",
    //                                         "dataType": "int"
    //                                     },
    //                                     {
    //                                         "name": "isValidate",
    //                                         "type": "componentValue",
    //                                         "valueName": "isValidate",
    //                                         "dataType": "int"
    //                                     },
    //                                     {
    //                                         "name": "defaultValue",
    //                                         "type": "componentValue",
    //                                         "valueName": "defaultValue"
    //                                     },
    //                                     {
    //                                         "name": "descName",
    //                                         "type": "componentValue",
    //                                         "valueName": "descName"
    //                                     },
    //                                     {
    //                                         "name": "datatype",
    //                                         "type": "componentValue",
    //                                         "valueName": "datatype"
    //                                     },
    //                                     {
    //                                         "name": "orderCode",
    //                                         "type": "componentValue",
    //                                         "valueName": "orderCode",
    //                                         "dataType": "int"
    //                                     },
    //                                     {
    //                                         "name": "precision",
    //                                         "type": "componentValue",
    //                                         "valueName": "precision",
    //                                         "dataType": "float"
    //                                     },
    //                                     {
    //                                         "name": "length",
    //                                         "type": "componentValue",
    //                                         "valueName": "length"
    //                                     }
    //                                 ],
    //                                 "outputParameters": [

    //                                 ],
    //                                 "result": [
    //                                     {
    //                                         "name": "data",
    //                                         "showMessageWithNext": 0,
    //                                         "message": "message.ajax.state.success",
    //                                         "senderId": "afterTableColumnUpdateSuccess"
    //                                     },
    //                                     {
    //                                         "name": "validation",
    //                                         "showMessageWithNext": 0,
    //                                         "message": "message.ajax.state.success",
    //                                         "senderId": "afterTableColumnUpdateValidation"
    //                                     },
    //                                     {
    //                                         "name": "error",
    //                                         "senderId": "toolbar_data_columns_01"
    //                                     }
    //                                 ]
    //                             },
    //                             {
    //                                 "id": "column_batch_delete_1",
    //                                 "url": "column/delete",
    //                                 "urlType": "inner",
    //                                 "ajaxType": "delete",
    //                                 "params": [
    //                                     {
    //                                         "name": "id",
    //                                         "type": "checkedItem",
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
    //                                         "senderId": "afterColumnDeleteSuccess"
    //                                     }
    //                                 ]
    //                             }
    //                         ],
    //                         "beforeTrigger": [

    //                         ],
    //                         "afterTrigger": [
    //                             {
    //                                 "id": "",
    //                                 "senderId": "view_data_columns",
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
    //                                 "targetViewId": "view_data_columns",
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
    //                                         "text": "新增列",
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
    //                                         "text": "编辑列",
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
    //                                         "id": "M_saveRow",
    //                                         "text": "保存",
    //                                         "icon": "save",
    //                                         "color": "text-primary",
    //                                         "hidden": true,
    //                                         "disabled": false,
    //                                         "execute": [
    //                                             {
    //                                                 "triggerType": "OPERATION",
    //                                                 "trigger": "SAVE_ROWS",
    //                                                 "ajaxId": "add_table_columns",
    //                                                 // "stateId": "add_save_1",
    //                                                 "conditionId": "add_table_column_condition_none"
    //                                             },
    //                                             {
    //                                                 "triggerType": "OPERATION",
    //                                                 "trigger": "SAVE_ROWS",
    //                                                 "ajaxId": "edit_table_columns",
    //                                                 // "stateId": "edit_save_1",
    //                                                 "conditionId": "edit_table_column_condition_none"
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
    //                                     // {
    //                                     //     "id": "M_addRowForm",
    //                                     //     "text": "表单新增",
    //                                     //     "state": "new",
    //                                     //     "icon": "plus",
    //                                     //     "color": "text-primary",
    //                                     //     "hidden": false,
    //                                     //     "disabled": false,
    //                                     //     "execute": [
    //                                     //         {
    //                                     //             "triggerType": "ACTION",
    //                                     //             "trigger": "DIALOG",
    //                                     //             // "conditionId": "add_state_1"
    //                                     //             "dialogId": "edit_data_table_form",
    //                                     //             "ajaxId": "form_add_data_table",
    //                                     //         }
    //                                     //     ]
    //                                     // },
    //                                     // {
    //                                     //     "id": "M_editRowForm",
    //                                     //     "text": "表单更新",
    //                                     //     "state": "edit",
    //                                     //     "icon": "edit",
    //                                     //     "color": "text-primary",
    //                                     //     "hidden": false,
    //                                     //     "disabled": false,
    //                                     //     "execute": [
    //                                     //         {
    //                                     //             "triggerType": "ACTION",
    //                                     //             "trigger": "DIALOG",
    //                                     //             // "conditionId": "add_state_1"
    //                                     //             "dialogId": "edit_data_table_form",
    //                                     //             "ajaxId": "form_edit_city",
    //                                     //             "changeValueId": "edit_form_changeValue"
    //                                     //         }
    //                                     //     ]
    //                                     // },
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
    //                                                 // "conditionId": "delete_operation_2",
    //                                                 "ajaxId": "column_batch_delete_1"
    //                                             }
    //                                         ]
    //                                     },
    //                                     {
    //                                         "id": "M_cancelrow",
    //                                         "text": "取消",
    //                                         "state": "edit",
    //                                         "icon": "rollback",
    //                                         "color": "text-grey-darker",
    //                                         "hidden": true,
    //                                         "disabled": null,
    //                                         "execute": [
    //                                             {
    //                                                 "triggerType": "STATE",
    //                                                 "trigger": "CANCEL_EDIT_ROWS",
    //                                                 "conditionId": "data_table_condition_cancel"
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
    //                                 "targetViewId": "view_data_columns",
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
    //                         "id": "view_data_columns",
    //                         "title": "建模列",
    //                         "titleIcon": "right-circle",
    //                         "component": "cnDataTable",
    //                         "keyId": "id",
    //                         "size": "small",
    //                         "isBordered": true,
    //                         "isFrontPagination": false,
    //                         "isPagination": true,
    //                         "isShowSizeChanger": true,
    //                         "showTotal": true,
    //                         "pageSize": 10,
    //                         "showCheckBox": true,
    //                         "pageSizeOptions": [10, 20, 50, 100],
    //                         "loadingOnInit": false,
    //                         "loadingConfig": {
    //                             "url": "resource/DM_COLUMN/query",
    //                             "method": "get",
    //                             "params": [
    //                                 {
    //                                     "name": "tableId",
    //                                     "type": "tempValue",
    //                                     "valueName": "_tableId"
    //                                 },
    //                                 {
    //                                     "name": "_mapToObject",
    //                                     "type": "value",
    //                                     "value": true
    //                                 }
    //                             ],
    //                             "filter": [

    //                             ]
    //                         },
    //                         "columns": [
    //                             {
    //                                 "title": "id",
    //                                 "type": "field",
    //                                 "field": "id",
    //                                 "hidden": true,
    //                                 "showFilter": false,
    //                                 "showSort": false,
    //                                 "isShowExpand": false,
    //                                 "width": "50px",
    //                                 "style": {}
    //                             },
    //                             {
    //                                 "title": "tableId",
    //                                 "type": "field",
    //                                 "field": "tableId",
    //                                 "hidden": true,
    //                                 "showFilter": false,
    //                                 "showSort": false,
    //                                 "isShowExpand": false,
    //                                 "width": "50px",
    //                                 "style": {}
    //                             },
    //                             {
    //                                 "title": "列名",
    //                                 "type": "field",
    //                                 "field": "cname",
    //                                 "hidden": false,
    //                                 "showFilter": false,
    //                                 "showSort": false,
    //                                 "width": "100px",
    //                                 "style": {},
    //                                 "editor": {
    //                                     "type": "input",
    //                                     "field": "cname"
    //                                 }
    //                             },
    //                             {
    //                                 "title": "描述",
    //                                 "type": "field",
    //                                 "field": "descName",
    //                                 "hidden": false,
    //                                 "showFilter": false,
    //                                 "showSort": false,
    //                                 "width": "100px",
    //                                 "style": {},
    //                                 "editor": {
    //                                     "type": "input",
    //                                     "field": "descName"
    //                                 }
    //                             },
    //                             {
    //                                 "title": "数据类型",
    //                                 "type": "field",
    //                                 "field": "datatype",
    //                                 "hidden": false,
    //                                 "showFilter": false,
    //                                 "showSort": false,
    //                                 "width": "100px",
    //                                 "style": {},
    //                                 "editor": {
    //                                     "type": "select",
    //                                     "field": "datatype",
    //                                     "placeholder": "请输入",
    //                                     "defaultValue": "string",
    //                                     "options": [
    //                                         { "label": 'string', "value": "string" },
    //                                         { "label": 'nstring', "value": "nstring" },
    //                                         { "label": 'char', "value": "char" },
    //                                         { "label": "nchar", "value": "nchar" },
    //                                         { "label": 'byte', "value": "byte" },
    //                                         { "label": 'short', "value": "short" },
    //                                         { "label": 'integer', "value": "integer" },
    //                                         { "label": "float", "value": "float" },
    //                                         { "label": 'double', "value": "double" },
    //                                         { "label": 'date', "value": "date" },
    //                                         { "label": 'clob', "value": "clob" },
    //                                         { "label": "blob", "value": "blob" }
    //                                     ],
    //                                     "labelName": 'label',
    //                                     "valueName": 'value'
    //                                 }
    //                             },
    //                             {
    //                                 "title": "长度",
    //                                 "type": "field",
    //                                 "field": "length",
    //                                 "hidden": false,
    //                                 "showFilter": false,
    //                                 "showSort": false,
    //                                 "width": "100px",
    //                                 "style": {},
    //                                 "editor": {
    //                                     "type": "input",
    //                                     "field": "length"
    //                                 }
    //                             },
    //                             {
    //                                 "title": "默认值",
    //                                 "type": "field",
    //                                 "field": "defaultValue",
    //                                 "hidden": false,
    //                                 "showFilter": false,
    //                                 "showSort": false,
    //                                 "width": "100px",
    //                                 "style": {},
    //                                 "editor": {
    //                                     "type": "input",
    //                                     "field": "defautValue"
    //                                 }
    //                             },
    //                             {
    //                                 "title": "精度",
    //                                 "type": "field",
    //                                 "field": "precision",
    //                                 "hidden": false,
    //                                 "showFilter": false,
    //                                 "showSort": false,
    //                                 "width": "100px",
    //                                 "style": {},
    //                                 "editor": {
    //                                     "type": "input",
    //                                     "field": "precision"
    //                                 }
    //                             },
    //                             {
    //                                 "title": "是否为空",
    //                                 "type": "field",
    //                                 "field": "isNullable",
    //                                 "hidden": false,
    //                                 "showFilter": false,
    //                                 "showSort": false,
    //                                 "width": "100px",
    //                                 "style": {},
    //                                 "editor": {
    //                                     "type": "select",
    //                                     "field": "isNullable",
    //                                     // "placeholder": "请输入",
    //                                     "defaultValue": 1,
    //                                     "options": [
    //                                         { "label": '不为空', "value": 0 },
    //                                         { "label": '可为空', "value": 1 },
    //                                     ],
    //                                     "labelName": 'label',
    //                                     "valueName": 'value',
    //                                 }
    //                             },
    //                             {
    //                                 "title": "是否唯一",
    //                                 "type": "field",
    //                                 "field": "isUnique",
    //                                 "hidden": false,
    //                                 "showFilter": false,
    //                                 "showSort": false,
    //                                 "width": "100px",
    //                                 "style": {},
    //                                 "editor": {
    //                                     "type": "select",
    //                                     "field": "isUnique",
    //                                     // "placeholder": "请输入",
    //                                     "defaultValue": 0,
    //                                     "options": [
    //                                         { "label": '不唯一', "value": 0 },
    //                                         { "label": '唯一', "value": 1 },
    //                                     ],
    //                                     "labelName": 'label',
    //                                     "valueName": 'value',
    //                                 }
    //                             },
    //                             {
    //                                 "title": "是否可用",
    //                                 "type": "field",
    //                                 "field": "isValidate",
    //                                 "hidden": false,
    //                                 "showFilter": false,
    //                                 "showSort": false,
    //                                 "width": "100px",
    //                                 "style": {},
    //                                 "editor": {
    //                                     "type": "select",
    //                                     "field": "isValidate",
    //                                     // "placeholder": "请输入",
    //                                     "defaultValue": 1,
    //                                     "options": [
    //                                         { "label": '不可用', "value": 0 },
    //                                         { "label": '可用', "value": 1 },
    //                                     ],
    //                                     "labelName": 'label',
    //                                     "valueName": 'value',
    //                                 }
    //                             },
    //                             {
    //                                 "title": "排序编号",
    //                                 "type": "field",
    //                                 "field": "orderCode",
    //                                 "hidden": false,
    //                                 "showFilter": false,
    //                                 "showSort": false,
    //                                 "width": "100px",
    //                                 "style": {},
    //                                 "editor": {
    //                                     "type": "input",
    //                                     "field": "orderCode"
    //                                 }
    //                             },
    //                             {
    //                                 "title": "ACTION",
    //                                 "type": "action",
    //                                 "width": "150px",
    //                                 "actionIds": [
    //                                     "column_new_row", "column_cancel_new_row", "column_edit", "column_save", "column_cancel", "column_delete"
    //                                 ]
    //                             }
    //                         ],
    //                         "rowActions": [
    //                             {
    //                                 "id": "column_new_row",
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
    //                                         "ajaxId": "add_column_1",
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
    //                                 "id": "column_cancel_new_row",
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
    //                                 "id": "column_edit",
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
    //                                 "id": "column_save",
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
    //                                         "ajaxId": "edit_column_1",
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
    //                                 "id": "column_cancel",
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
    //                                 "id": "column_delete",
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
    //                                         "ajaxId": "column_delete_1"
    //                                     }
    //                                 ]
    //                             }
    //                         ],
    //                         "cascade": {
    //                             "messageSender": [
    //                                 {
    //                                     "id": "view2_sender_1",
    //                                     "senderId": "view_data_columns",
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
    //                                                     "value": "view_data_columns",
    //                                                     "type": "value"
    //                                                 }
    //                                             ]
    //                                         }
    //                                     ]
    //                                 },
    //                                 {
    //                                     "id": "view2_sender_2",
    //                                     "senderId": "view_data_columns",
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
    //                                                     "value": "view_data_columns",
    //                                                     "type": "value"
    //                                                 }
    //                                             ]
    //                                         }
    //                                     ]
    //                                 },
    //                                 {
    //                                     "id": "view2_sender_3",
    //                                     "senderId": "view_data_columns",
    //                                     "triggerType": "STATE",
    //                                     "trigger": "CANCEL_EDIT_ROW",
    //                                     "triggerMoment": "after",
    //                                     "sendData": [
    //                                         {
    //                                             "reveicerId": "",
    //                                             "receiverTriggerType": "STATE",
    //                                             "receiverTrigger": "STATE_TO_TEXT",
    //                                             "conditionId": "cancel_edit_data_tables",
    //                                             "params": [
    //                                                 {
    //                                                     "name": "targetViewId",
    //                                                     "value": "view_data_columns",
    //                                                     "type": "value"
    //                                                 }
    //                                             ]
    //                                         }
    //                                     ]
    //                                 },
    //                                 {
    //                                     "id": "view2_sender_04",
    //                                     "senderId": "view_data_columns",
    //                                     "triggerType": "STATE",
    //                                     "trigger": "CANCEL_NEW_ROW",
    //                                     "triggerMoment": "after",
    //                                     "sendData": [
    //                                         {
    //                                             "reveicerId": "",
    //                                             "receiverTriggerType": "STATE",
    //                                             "receiverTrigger": "STATE_TO_TEXT",
    //                                             "conditionId": "cancel_add_data_tables",
    //                                             "params": [
    //                                                 {
    //                                                     "name": "targetViewId",
    //                                                     "value": "view_data_columns",
    //                                                     "type": "value"
    //                                                 }
    //                                             ]
    //                                         }
    //                                     ]
    //                                 },
    //                                 {
    //                                     "id": "data_table_sender_04",
    //                                     "senderId": "view_data_columns",
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
    //                                                     "value": "view_data_columns",
    //                                                     "type": "value"
    //                                                 }
    //                                             ]
    //                                         }
    //                                     ]
    //                                 },
    //                                 {
    //                                     "id": "data_table_sender_07",
    //                                     "senderId": "view_data_columns",
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
    //                                                     "value": "view_data_table",
    //                                                     "type": "value"
    //                                                 }
    //                                             ]
    //                                         }
    //                                     ]
    //                                 },
    //                                 {
    //                                     "id": "afterTableColumnSaveSuccess",
    //                                     "senderId": "view_data_columns",
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
    //                                     "id": "afterTableColumnUpdateSuccess",
    //                                     "senderId": "view_data_columns",
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
    //                                     "senderId": "view_data_columns",
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
    //                                     "senderId": "view_data_columns",
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
    //                                     "senderId": "view_data_columns",
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
    //                                                     "value": "operation.code.success"
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
    //                                     "senderId": "view_data_columns",
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
    //                                 {
    //                                     "id": "afterColumnDeleteSuccess",
    //                                     "senderId": "view_data_columns",
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
    //                                                     "value": "message.operation.success"
    //                                                 }
    //                                             ]
    //                                         },
    //                                         {
    //                                             "beforeSend": {},
    //                                             "reveicerId": "",
    //                                             "receiverTriggerType": "ACTION",
    //                                             "receiverTrigger": "DELETE_CHECKED_ROWS",
    //                                             "params": [
    //                                                 {
    //                                                     "name": "ids",
    //                                                     "type": "returnValue",
    //                                                     "valueName": "ids"
    //                                                 }
    //                                             ]
    //                                         }
    //                                     ]
    //                                 }
    //                             ],
    //                             "messageReceiver": [
    //                                 {
    //                                     "id": "",
    //                                     "senderId": "view_data_table",
    //                                     "receiveData": [
    //                                         {
    //                                             "beforeReceive": [],
    //                                             "triggerType": "BEHAVIOR",
    //                                             "trigger": "REFRESH_AS_CHILD",
    //                                             "params": [
    //                                                 {
    //                                                     "pname": "_tableId",
    //                                                     "cname": "_tableId",
    //                                                     "valueTo": "tempValue"
    //                                                 }
    //                                             ]
    //                                         }
    //                                     ]
    //                                 },
    //                                 {
    //                                     "id": "",
    //                                     "senderId": "view_data_columns",
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
    //                                         },
    //                                         {
    //                                             "beforeReceive": [],
    //                                             "triggerType": "ACTION",
    //                                             "trigger": "DELETE_CHECKED_ROWS"
    //                                         }
    //                                     ]
    //                                 }
    //                             ]
    //                         },
    //                         "condition": [
    //                             {
    //                                 "id": "add_table_column_state",
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
    //                                 "id": "edit_table_column_state",
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
    //                                 "id": "add_table_column_condition",
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
    //                                 "id": "edit_table_column_condition",
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
    //                                 "id": "cancel_edit_table_column",
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
    //                                 "id": "cancel_add_table_column",
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
    //                                 "id": "add_column_1",
    //                                 "url": "column/insert",
    //                                 "urlType": "inner",
    //                                 "ajaxType": "post",
    //                                 "params": [
    //                                     {
    //                                         "name": "id",
    //                                         "type": "componentValue",
    //                                         "valueName": "id"
    //                                     },
    //                                     {
    //                                         "name": "tableId",
    //                                         "type": "tempValue",
    //                                         "valueName": "_tableId"
    //                                     },
    //                                     {
    //                                         "name": "cname",
    //                                         "type": "componentValue",
    //                                         "valueName": "cname"
    //                                     },
    //                                     {
    //                                         "name": "isNullable",
    //                                         "type": "componentValue",
    //                                         "valueName": "isNullable"
    //                                     },
    //                                     {
    //                                         "name": "isUnique",
    //                                         "type": "componentValue",
    //                                         "valueName": "isUnique"
    //                                     },
    //                                     {
    //                                         "name": "isValidate",
    //                                         "type": "componentValue",
    //                                         "valueName": "isValidate"
    //                                     },
    //                                     {
    //                                         "name": "defaultValue",
    //                                         "type": "componentValue",
    //                                         "valueName": "defaultValue"
    //                                     },
    //                                     {
    //                                         "name": "descName",
    //                                         "type": "componentValue",
    //                                         "valueName": "descName"
    //                                     },
    //                                     {
    //                                         "name": "datatype",
    //                                         "type": "componentValue",
    //                                         "valueName": "datatype"
    //                                     },
    //                                     {
    //                                         "name": "orderCode",
    //                                         "type": "componentValue",
    //                                         "valueName": "orderCode"
    //                                     },
    //                                     {
    //                                         "name": "precision",
    //                                         "type": "componentValue",
    //                                         "valueName": "precision"
    //                                     },
    //                                     {
    //                                         "name": "length",
    //                                         "type": "componentValue",
    //                                         "valueName": "length"
    //                                     }

    //                                 ],
    //                                 "outputParameters": [

    //                                 ],
    //                                 "result": [
    //                                     {
    //                                         "name": "data",
    //                                         "showMessageWithNext": 0,
    //                                         "message": "message.ajax.state.success",
    //                                         "senderId": "afterTableColumnSaveSuccess"
    //                                     },
    //                                     {
    //                                         "name": "validation",
    //                                         "showMessageWithNext": 0,
    //                                         "message": "message.ajax.state.success",
    //                                         "senderId": "afterTableColumnSaveValidation"
    //                                     },
    //                                     // {
    //                                     //     "name": "error",
    //                                     //     "senderId": "data_table_sender_02"
    //                                     // }
    //                                 ]
    //                             },
    //                             {
    //                                 "id": "edit_column_1",
    //                                 "url": "column/update",
    //                                 "urlType": "inner",
    //                                 "ajaxType": "put",
    //                                 "params": [
    //                                     {
    //                                         "name": "id",
    //                                         "type": "componentValue",
    //                                         "valueName": "id"
    //                                     },
    //                                     {
    //                                         "name": "tableId",
    //                                         "type": "tempValue",
    //                                         "valueName": "tableId"
    //                                     },
    //                                     {
    //                                         "name": "cname",
    //                                         "type": "componentValue",
    //                                         "valueName": "cname"
    //                                     },
    //                                     {
    //                                         "name": "isNullable",
    //                                         "type": "componentValue",
    //                                         "valueName": "isNullable"
    //                                     },
    //                                     {
    //                                         "name": "isUnique",
    //                                         "type": "componentValue",
    //                                         "valueName": "isUnique"
    //                                     },
    //                                     {
    //                                         "name": "isValidate",
    //                                         "type": "componentValue",
    //                                         "valueName": "isValidate"
    //                                     },
    //                                     {
    //                                         "name": "defaultValue",
    //                                         "type": "componentValue",
    //                                         "valueName": "defaultValue"
    //                                     },
    //                                     {
    //                                         "name": "descName",
    //                                         "type": "componentValue",
    //                                         "valueName": "descName"
    //                                     },
    //                                     {
    //                                         "name": "datatype",
    //                                         "type": "componentValue",
    //                                         "valueName": "datatype"
    //                                     },
    //                                     {
    //                                         "name": "orderCode",
    //                                         "type": "componentValue",
    //                                         "valueName": "orderCode",
    //                                         "dataType": "ingeter"
    //                                     },
    //                                     {
    //                                         "name": "precision",
    //                                         "type": "componentValue",
    //                                         "valueName": "precision"
    //                                     },
    //                                     {
    //                                         "name": "length",
    //                                         "type": "componentValue",
    //                                         "valueName": "length"
    //                                     }
    //                                 ],
    //                                 "outputParameters": [

    //                                 ],
    //                                 "result": [
    //                                     {
    //                                         "name": "data",
    //                                         "showMessageWithNext": 0,
    //                                         "message": "message.ajax.state.success",
    //                                         "senderId": "afterTableColumnUpdateSuccess"
    //                                     },
    //                                     {
    //                                         "name": "validation",
    //                                         "showMessageWithNext": 0,
    //                                         "message": "message.ajax.state.success",
    //                                         "senderId": "afterTableColumnUpdateValidation"
    //                                     },
    //                                     {
    //                                         "name": "error",
    //                                         "senderId": "toolbar_data_columns_01"
    //                                     }
    //                                 ]
    //                             },
    //                             {
    //                                 "id": "add_table_column",
    //                                 "url": "column/insert",
    //                                 "urlType": "inner",
    //                                 "ajaxType": "post",
    //                                 "params": [
    //                                     {
    //                                         "name": "id",
    //                                         "type": "GUID"
    //                                     },
    //                                     {
    //                                         "name": "tableId",
    //                                         "type": "tempValue",
    //                                         "valueName": "tableId"
    //                                     },
    //                                     {
    //                                         "name": "cname",
    //                                         "type": "componentValue",
    //                                         "valueName": "cname"
    //                                     },
    //                                     {
    //                                         "name": "isNullable",
    //                                         "type": "componentValue",
    //                                         "valueName": "isNullable"
    //                                     },
    //                                     {
    //                                         "name": "isUnique",
    //                                         "type": "componentValue",
    //                                         "valueName": "isUnique"
    //                                     },
    //                                     {
    //                                         "name": "isValidate",
    //                                         "type": "componentValue",
    //                                         "valueName": "isValidate"
    //                                     },
    //                                     {
    //                                         "name": "defaultValue",
    //                                         "type": "componentValue",
    //                                         "valueName": "defaultValue"
    //                                     },
    //                                     {
    //                                         "name": "descName",
    //                                         "type": "componentValue",
    //                                         "valueName": "descName"
    //                                     },
    //                                     {
    //                                         "name": "datatype",
    //                                         "type": "componentValue",
    //                                         "valueName": "datatype"
    //                                     },
    //                                     {
    //                                         "name": "orderCode",
    //                                         "type": "componentValue",
    //                                         "valueName": "orderCode"
    //                                     },
    //                                     {
    //                                         "name": "precision",
    //                                         "type": "componentValue",
    //                                         "valueName": "precision"
    //                                     },
    //                                     {
    //                                         "name": "length",
    //                                         "type": "componentValue",
    //                                         "valueName": "length"
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
    //                                     //     "senderId": "data_table_sender_01"
    //                                     // },
    //                                     // {
    //                                     //     "name": "error",
    //                                     //     "senderId": "data_table_sender_02"
    //                                     // }
    //                                 ]
    //                             },
    //                             {
    //                                 "id": "edit_table_columns_1",
    //                                 "url": "column/batchUpdate",
    //                                 "urlType": "inner",
    //                                 "ajaxType": "put",
    //                                 "params": [
    //                                     {
    //                                         "name": "id",
    //                                         "type": "componentValue",
    //                                         "valueName": "id"
    //                                     },
    //                                     {
    //                                         "name": "tableId",
    //                                         "type": "tempValue",
    //                                         "valueName": "tableId"
    //                                     },
    //                                     {
    //                                         "name": "cname",
    //                                         "type": "componentValue",
    //                                         "valueName": "cname"
    //                                     },
    //                                     {
    //                                         "name": "isNullable",
    //                                         "type": "componentValue",
    //                                         "valueName": "isNullable"
    //                                     },
    //                                     {
    //                                         "name": "isUnique",
    //                                         "type": "componentValue",
    //                                         "valueName": "isUnique"
    //                                     },
    //                                     {
    //                                         "name": "isValidate",
    //                                         "type": "componentValue",
    //                                         "valueName": "isValidate"
    //                                     },
    //                                     {
    //                                         "name": "defaultValue",
    //                                         "type": "componentValue",
    //                                         "valueName": "defaultValue"
    //                                     },
    //                                     {
    //                                         "name": "descName",
    //                                         "type": "componentValue",
    //                                         "valueName": "descName"
    //                                     },
    //                                     {
    //                                         "name": "datatype",
    //                                         "type": "componentValue",
    //                                         "valueName": "datatype"
    //                                     },
    //                                     {
    //                                         "name": "orderCode",
    //                                         "type": "componentValue",
    //                                         "valueName": "orderCode",
    //                                         "dataType": "integer"
    //                                     },
    //                                     {
    //                                         "name": "precision",
    //                                         "type": "componentValue",
    //                                         "valueName": "precision"
    //                                     },
    //                                     {
    //                                         "name": "length",
    //                                         "type": "componentValue",
    //                                         "valueName": "length"
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
    //                                 "id": "column_delete_1",
    //                                 "url": "column/delete",
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