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
    selector: 'calendar-demo',
    templateUrl: './calendar-demo.component.html',
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
export class CalendarDemoComponent implements OnInit {
    public config = {
        "id": "4K0naM",
        "type": "pageHeader",
        "title": "布局4K0naM",
        "container": "pageHeader",
        "pageHeader": {
            "id": "pageheader_1",
            "title": "日历组件",
            "subTitle": "查看/维护日程或者计划",
            "tagColor": "blue",
            "tagText": "组件实例",
            "descColumnsCount": 2,
            "operation": [],
            "contentItems": [
                {
                    "title": "注意事项",
                    "text": "此功能提供了新增组件功能",
                    "span": 2
                }
            ],
            "extraItems": [
                {
                    "label": "组件数量",
                    "detail": "20",
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
                                    "id": "view_calendar",
                                    "component": "cnCalendar",
                                    "size": "default",
                                    "startField": "START_DATE",
                                    "endField": "END_DATE",
                                    "cascade": {
                                        "messageSender": [

                                        ],
                                        "messageReceiver": []
                                    },
                                    "loadingOnInit": true,
                                    "loadingConfig": {
                                        "id": "loading"
                                    },
                                    "dataMapping": [
                                        {
                                            "name": "title",
                                            "field": "TITLE"
                                        },
                                        {
                                            "name": "start",
                                            "field": "START_DATE"
                                        },
                                        {
                                            "name": "end",
                                            "field": "END_DATE"
                                        }
                                    ],
                                    "descMapping": [
                                        {
                                            "title": "任务名称",
                                            "field": "TITLE",
                                            "span": 2,
                                        },
                                        {
                                            "title": "开始日期",
                                            "field": "START_DATE",
                                            "span": 1
                                        },
                                        {
                                            "title": "结束日期",
                                            "field": "END_DATE",
                                            "span": 1
                                        },
                                        {
                                            "title": "任务描述",
                                            "field": "TITLE",
                                            "span": 2
                                        }
                                    ],
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
                                                "state": "text",
                                                "loadingConfig": {
                                                    "id": "loadform"
                                                },
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
                                                                    "id": "iHspYn",
                                                                    "col": "cc",
                                                                    "type": "col",
                                                                    "title": "列iHspYn",
                                                                    "span": 24,
                                                                    "layoutContain": "input",
                                                                    "size": {
                                                                        "nzXs": 24,
                                                                        "nzSm": 24,
                                                                        "nzMd": 24,
                                                                        "nzLg": 24,
                                                                        "ngXl": 24,
                                                                        "nzXXl": 24
                                                                    },
                                                                    "control": {
                                                                        "id": "ctl_name"
                                                                    }
                                                                },
                                                                {
                                                                    "id": "ioj0mV1",
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
                                                                        "id": "ctl_code"
                                                                    }
                                                                },
                                                                {
                                                                    "id": "ioj0mV2",
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
                                                                        "id": "ctl_type"
                                                                    }
                                                                },
                                                                {
                                                                    "id": "ioj0mV3",
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
                                                                        "id": "ctl_version"
                                                                    }
                                                                },
                                                                {
                                                                    "id": "ioj0mV4",
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
                                                                        "id": "ctl_sort"
                                                                    }
                                                                },
                                                                {
                                                                    "id": "ioj0mV5",
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
                                                                        "id": "ctl_state"
                                                                    }
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                },
                                                "formControls": [
                                                    {
                                                        "id": "ctl_id",
                                                        "hidden": true,
                                                        "title": "ID",
                                                        "titleConfig": {
                                                            "required": false
                                                        },
                                                        "field": "ID",
                                                        "labelSize": {
                                                            "span": 6,
                                                            "nzXs": {
                                                                "span": 6
                                                            },
                                                            "nzSm": {
                                                                "span": 6
                                                            },
                                                            "nzMd": {
                                                                "span": 6
                                                            },
                                                            "nzLg": {
                                                                "span": 6
                                                            },
                                                            "ngXl": {
                                                                "span": 6
                                                            },
                                                            "nzXXl": {
                                                                "span": 6
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
                                                            "field": "ID"
                                                        },
                                                        "editor": {
                                                            "type": "input",
                                                            "field": "ID",
                                                            "placeholder": "请输入",
                                                            "validations": [
                                                                {
                                                                    "validator": "required",
                                                                    "type": "default",
                                                                    "message": "请输入组件名称"
                                                                }
                                                            ]
                                                        }
                                                    },
                                                    {
                                                        "id": "ctl_name",
                                                        "hidden": true,
                                                        "title": "名称",
                                                        "titleConfig": {
                                                            "required": true
                                                        },
                                                        "field": "NAME",
                                                        "labelSize": {
                                                            "span": 6,
                                                            "nzXs": {
                                                                "span": 6
                                                            },
                                                            "nzSm": {
                                                                "span": 6
                                                            },
                                                            "nzMd": {
                                                                "span": 6
                                                            },
                                                            "nzLg": {
                                                                "span": 6
                                                            },
                                                            "ngXl": {
                                                                "span": 6
                                                            },
                                                            "nzXXl": {
                                                                "span": 6
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
                                                            "field": "NAME"
                                                        },
                                                        "editor": {
                                                            "type": "input",
                                                            "field": "NAME",
                                                            "placeholder": "请输入",
                                                            "validations": [
                                                                {
                                                                    "validator": "required",
                                                                    "type": "default",
                                                                    "message": "请输入组件名称"
                                                                }
                                                            ]
                                                        }
                                                    },
                                                    {
                                                        "id": "ctl_code",
                                                        "hidden": true,
                                                        "title": "组件编码",
                                                        "titleConfig": {
                                                            "required": false
                                                        },
                                                        "field": "CODE",
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
                                                            "field": "CODE"
                                                        },
                                                        "editor": {
                                                            "type": "input",
                                                            "field": "CODE",
                                                            "placeholder": "请输入",
                                                            "validations": []
                                                        }
                                                    },
                                                    {
                                                        "id": "ctl_version",
                                                        "hidden": true,
                                                        "title": "版本",
                                                        "titleConfig": {
                                                            "required": false
                                                        },
                                                        "field": "VERSION",
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
                                                            "field": "VERSION"
                                                        },
                                                        "editor": {
                                                            "type": "select",
                                                            "field": "VERSION",
                                                            "placeholder": "请输入",
                                                            "options": [
                                                                {
                                                                    "label": "v1.0",
                                                                    "value": "v1.0"
                                                                },
                                                                {
                                                                    "label": "v2.0",
                                                                    "value": "v2.0"
                                                                }
                                                            ],
                                                            "defaultValue": "v2.0",
                                                            "labelName": "label",
                                                            "valueName": "value"
                                                        }
                                                    },
                                                    {
                                                        "id": "ctl_sort",
                                                        "hidden": true,
                                                        "title": "排序",
                                                        "titleConfig": {
                                                            "required": false
                                                        },
                                                        "field": "SORT",
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
                                                            "field": "SORT"
                                                        },
                                                        "editor": {
                                                            "type": "input",
                                                            "field": "SORT",
                                                            "placeholder": "请输入"
                                                        }
                                                    },
                                                    {
                                                        "id": "ctl_type",
                                                        "hidden": true,
                                                        "title": "组件类型",
                                                        "titleConfig": {
                                                            "required": false
                                                        },
                                                        "field": "TYPE",
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
                                                            "field": "TYPE"
                                                        },
                                                        "editor": {
                                                            "type": "select",
                                                            "field": "TYPE",
                                                            "placeholder": "请输入",
                                                            "options": [
                                                                {
                                                                    "label": "布局",
                                                                    "value": "layout"
                                                                },
                                                                {
                                                                    "label": "组件",
                                                                    "value": "component"
                                                                }
                                                            ],
                                                            "defaultValue": "layout",
                                                            "labelName": "label",
                                                            "valueName": "value"
                                                        }
                                                    },
                                                    {
                                                        "id": "ctl_state",
                                                        "hidden": true,
                                                        "title": "是否启用",
                                                        "titleConfig": {
                                                            "required": false
                                                        },
                                                        "field": "STATE",
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
                                                            "field": "STATE"
                                                        },
                                                        "editor": {
                                                            "type": "select",
                                                            "field": "STATE",
                                                            "placeholder": "请输入",
                                                            "options": [
                                                                {
                                                                    "label": "启用",
                                                                    "value": 1
                                                                },
                                                                {
                                                                    "label": "禁用",
                                                                    "value": 2
                                                                }
                                                            ],
                                                            "defaultValue": 1,
                                                            "labelName": "label",
                                                            "valueName": "value"
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
                                                                "id": "ctl_name",
                                                                "state": "edit",
                                                                "hidden": false,
                                                                "readOnly": false
                                                            },
                                                            {
                                                                "id": "ctl_code",
                                                                "state": "edit",
                                                                "hidden": true,
                                                                "readOnly": false
                                                            },
                                                            {
                                                                "id": "ctl_type",
                                                                "state": "edit",
                                                                "hidden": true,
                                                                "readOnly": false
                                                            },
                                                            {
                                                                "id": "ctl_version",
                                                                "state": "edit",
                                                                "hidden": true,
                                                                "readOnly": false
                                                            },
                                                            {
                                                                "id": "ctl_sort",
                                                                "state": "edit",
                                                                "hidden": true,
                                                                "readOnly": false
                                                            },
                                                            {
                                                                "id": "ctl_state",
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
                                                                "id": "ctl_name",
                                                                "state": "edit",
                                                                "hidden": false,
                                                                "readOnly": false
                                                            },
                                                            {
                                                                "id": "ctl_code",
                                                                "state": "edit",
                                                                "hidden": true,
                                                                "readOnly": false
                                                            },
                                                            {
                                                                "id": "ctl_type",
                                                                "state": "edit",
                                                                "hidden": true,
                                                                "readOnly": false
                                                            },
                                                            {
                                                                "id": "ctl_version",
                                                                "state": "edit",
                                                                "hidden": true,
                                                                "readOnly": false
                                                            },
                                                            {
                                                                "id": "ctl_sort",
                                                                "state": "edit",
                                                                "hidden": true,
                                                                "readOnly": false
                                                            },
                                                            {
                                                                "id": "ctl_state",
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
                                                                "id": "ctl_name",
                                                                "state": "edit",
                                                                "hidden": false,
                                                                "readOnly": false
                                                            },
                                                            {
                                                                "id": "ctl_code",
                                                                "state": "edit",
                                                                "hidden": true,
                                                                "readOnly": false
                                                            },
                                                            {
                                                                "id": "ctl_type",
                                                                "state": "edit",
                                                                "hidden": true,
                                                                "readOnly": false
                                                            },
                                                            {
                                                                "id": "ctl_version",
                                                                "state": "edit",
                                                                "hidden": true,
                                                                "readOnly": false
                                                            },
                                                            {
                                                                "id": "ctl_sort",
                                                                "state": "edit",
                                                                "hidden": true,
                                                                "readOnly": false
                                                            },
                                                            {
                                                                "id": "ctl_state",
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
                                                                "valueName": "ID"
                                                            }
                                                        ],
                                                        "outputParameters": [],
                                                        "result": []
                                                    }
                                                ]
                                            }
                                        },
                                        {
                                            "id": "form_property",
                                            "type": "confirm",
                                            "title": "新增组件内置属性信息",
                                            "cancelText": "取消",
                                            "okText": "提交",
                                            "form": {
                                                "id": "form_property_new",
                                                "type": "form",
                                                "component": "form",
                                                "state": "text",
                                                "loadingConfig": {
                                                    "id": "loadform"
                                                },
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
                                                                    "id": "iHspYn",
                                                                    "col": "cc",
                                                                    "type": "col",
                                                                    "title": "列iHspYn",
                                                                    "span": 24,
                                                                    "layoutContain": "input",
                                                                    "size": {
                                                                        "nzXs": 24,
                                                                        "nzSm": 24,
                                                                        "nzMd": 24,
                                                                        "nzLg": 24,
                                                                        "ngXl": 24,
                                                                        "nzXXl": 24
                                                                    },
                                                                    "control": {
                                                                        "id": "prop_name"
                                                                    }
                                                                },
                                                                {
                                                                    "id": "ioj0mV1",
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
                                                                        "id": "prop_code"
                                                                    }
                                                                },
                                                                {
                                                                    "id": "ioj0mV2",
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
                                                                        "id": "prop_type"
                                                                    }
                                                                },
                                                                {
                                                                    "id": "ioj0mV3",
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
                                                                        "id": "prop_datatype"
                                                                    }
                                                                },
                                                                {
                                                                    "id": "ioj0mV4",
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
                                                                        "id": "prop_remark"
                                                                    }
                                                                },
                                                                {
                                                                    "id": "ioj0mV5",
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
                                                                        "id": "prop_cmptId"
                                                                    }
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                },
                                                "formControls": [
                                                    {
                                                        "id": "prop_id",
                                                        "hidden": true,
                                                        "title": "ID",
                                                        "titleConfig": {
                                                            "required": false
                                                        },
                                                        "field": "ID",
                                                        "labelSize": {
                                                            "span": 6,
                                                            "nzXs": {
                                                                "span": 6
                                                            },
                                                            "nzSm": {
                                                                "span": 6
                                                            },
                                                            "nzMd": {
                                                                "span": 6
                                                            },
                                                            "nzLg": {
                                                                "span": 6
                                                            },
                                                            "ngXl": {
                                                                "span": 6
                                                            },
                                                            "nzXXl": {
                                                                "span": 6
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
                                                            "field": "ID"
                                                        },
                                                        "editor": {
                                                            "type": "input",
                                                            "field": "ID",
                                                            "placeholder": "请输入",
                                                            "validations": []
                                                        }
                                                    },
                                                    {
                                                        "id": "prop_name",
                                                        "hidden": true,
                                                        "title": "属性名称",
                                                        "titleConfig": {
                                                            "required": true
                                                        },
                                                        "field": "NAME",
                                                        "labelSize": {
                                                            "span": 6,
                                                            "nzXs": {
                                                                "span": 6
                                                            },
                                                            "nzSm": {
                                                                "span": 6
                                                            },
                                                            "nzMd": {
                                                                "span": 6
                                                            },
                                                            "nzLg": {
                                                                "span": 6
                                                            },
                                                            "ngXl": {
                                                                "span": 6
                                                            },
                                                            "nzXXl": {
                                                                "span": 6
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
                                                            "field": "NAME"
                                                        },
                                                        "editor": {
                                                            "type": "input",
                                                            "field": "NAME",
                                                            "placeholder": "请输入",
                                                            "validations": [
                                                                {
                                                                    "validator": "required",
                                                                    "type": "default",
                                                                    "message": "请输入属性名称"
                                                                }
                                                            ]
                                                        }
                                                    },
                                                    {
                                                        "id": "prop_code",
                                                        "hidden": true,
                                                        "title": "属性编码",
                                                        "titleConfig": {
                                                            "required": true
                                                        },
                                                        "field": "CODE",
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
                                                            "field": "CODE"
                                                        },
                                                        "editor": {
                                                            "type": "input",
                                                            "field": "CODE",
                                                            "placeholder": "请输入",
                                                            "validations": [
                                                                {
                                                                    "validator": "required",
                                                                    "type": "default",
                                                                    "message": "请输入属性编码"
                                                                }
                                                            ]
                                                        }
                                                    },
                                                    {
                                                        "id": "prop_type",
                                                        "hidden": true,
                                                        "title": "属性类型",
                                                        "titleConfig": {
                                                            "required": true
                                                        },
                                                        "field": "TYPE",
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
                                                            "field": "TYPE"
                                                        },
                                                        "editor": {
                                                            "type": "select",
                                                            "field": "TYPE",
                                                            "placeholder": "请输入",
                                                            "options": [
                                                                {
                                                                    "label": "属性",
                                                                    "value": "property"
                                                                },
                                                                {
                                                                    "label": "方法",
                                                                    "value": "method"
                                                                }
                                                            ],
                                                            "validations": [
                                                                {
                                                                    "validator": "required",
                                                                    "type": "default",
                                                                    "message": "请选择属性类型"
                                                                }
                                                            ],
                                                            "defaultValue": "1",
                                                            "labelName": "label",
                                                            "valueName": "value"
                                                        }
                                                    },
                                                    {
                                                        "id": "prop_remark",
                                                        "hidden": true,
                                                        "title": "属性说明",
                                                        "titleConfig": {
                                                            "required": false
                                                        },
                                                        "field": "REMARK",
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
                                                            "field": "REMARK"
                                                        },
                                                        "editor": {
                                                            "type": "input",
                                                            "field": "REMARK",
                                                            "placeholder": "请输入"
                                                        }
                                                    },
                                                    {
                                                        "id": "prop_datatype",
                                                        "hidden": true,
                                                        "title": "属性数据类型",
                                                        "titleConfig": {
                                                            "required": true
                                                        },
                                                        "field": "DATA_TYPE",
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
                                                            "field": "DATA_TYPE"
                                                        },
                                                        "editor": {
                                                            "type": "select",
                                                            "field": "DATA_TYPE",
                                                            "placeholder": "请输入",
                                                            "options": [
                                                                {
                                                                    "label": "值",
                                                                    "value": "value"
                                                                },
                                                                {
                                                                    "label": "对象",
                                                                    "value": "object"
                                                                },
                                                                {
                                                                    "label": "数组",
                                                                    "value": "array"
                                                                }
                                                            ],
                                                            "validations": [
                                                                {
                                                                    "validator": "required",
                                                                    "type": "default",
                                                                    "message": "请选择属性数据类型"
                                                                }
                                                            ],
                                                            "defaultValue": "object",
                                                            "labelName": "label",
                                                            "valueName": "value"
                                                        }
                                                    },
                                                    {
                                                        "id": "prop_cmptId",
                                                        "hidden": true,
                                                        "title": "所属组件",
                                                        "titleConfig": {
                                                            "required": true
                                                        },
                                                        "field": "CMPT_ID",
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
                                                            "field": "CMPT_ID"
                                                        },
                                                        "editor": {
                                                            "type": "select",
                                                            "field": "CMPT_ID",
                                                            "placeholder": "请输入",
                                                            "loadingConfig": {
                                                                "id": "loadformselectcmpt"
                                                            },
                                                            "validations": [
                                                                {
                                                                    "validator": "required",
                                                                    "type": "default",
                                                                    "message": "属性不能没有所属组件"
                                                                }
                                                            ],
                                                            "defaultValue": "v2.0",
                                                            "labelName": "NAME",
                                                            "valueName": "ID"
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
                                                                "id": "prop_name",
                                                                "state": "edit",
                                                                "hidden": false,
                                                                "readOnly": false
                                                            },
                                                            {
                                                                "id": "prop_code",
                                                                "state": "edit",
                                                                "hidden": false,
                                                                "readOnly": false
                                                            },
                                                            {
                                                                "id": "prop_type",
                                                                "state": "edit",
                                                                "hidden": false,
                                                                "readOnly": false
                                                            },
                                                            {
                                                                "id": "prop_remark",
                                                                "state": "edit",
                                                                "hidden": false,
                                                                "readOnly": false
                                                            },
                                                            {
                                                                "id": "prop_datatype",
                                                                "state": "edit",
                                                                "hidden": false,
                                                                "readOnly": false
                                                            },
                                                            {
                                                                "id": "prop_cmptId",
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
                                                                "id": "prop_name",
                                                                "state": "edit",
                                                                "hidden": false,
                                                                "readOnly": false
                                                            },
                                                            {
                                                                "id": "prop_code",
                                                                "state": "edit",
                                                                "hidden": false,
                                                                "readOnly": false
                                                            },
                                                            {
                                                                "id": "prop_type",
                                                                "state": "edit",
                                                                "hidden": false,
                                                                "readOnly": false
                                                            },
                                                            {
                                                                "id": "prop_remark",
                                                                "state": "edit",
                                                                "hidden": false,
                                                                "readOnly": false
                                                            },
                                                            {
                                                                "id": "prop_datatype",
                                                                "state": "edit",
                                                                "hidden": false,
                                                                "readOnly": false
                                                            },
                                                            {
                                                                "id": "prop_cmptId",
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
                                                                "id": "prop_name",
                                                                "state": "text",
                                                                "hidden": false,
                                                                "readOnly": true
                                                            },
                                                            {
                                                                "id": "prop_code",
                                                                "state": "text",
                                                                "hidden": false,
                                                                "readOnly": true
                                                            },
                                                            {
                                                                "id": "prop_type",
                                                                "state": "text",
                                                                "hidden": false,
                                                                "readOnly": true
                                                            },
                                                            {
                                                                "id": "prop_remark",
                                                                "state": "text",
                                                                "hidden": false,
                                                                "readOnly": true
                                                            },
                                                            {
                                                                "id": "prop_datatype",
                                                                "state": "text",
                                                                "hidden": false,
                                                                "readOnly": true
                                                            },
                                                            {
                                                                "id": "prop_cmptId",
                                                                "state": "text",
                                                                "hidden": false,
                                                                "readOnly": true
                                                            }
                                                        ]
                                                    }
                                                ],
                                                "ajaxConfig": [
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
                                                        "outputParameters": [],
                                                        "result": []
                                                    },
                                                    {
                                                        "id": "loadformselectcmpt",
                                                        "url": "td/SMT_BASE_COMPONENT/query",
                                                        "urlType": "inner",
                                                        "ajaxType": "get",
                                                        "params": [],
                                                        "outputParameters": [],
                                                        "result": []
                                                    }
                                                ]
                                            }
                                        }
                                    ],
                                    "ajaxConfig": [
                                        {
                                            "id": "loading",
                                            "url": "sd/CALENDAR_DEMO/query",
                                            "urlType": "inner",
                                            "method": "get",
                                            "params": [
                                                // {
                                                //     "name": "ID",
                                                //     "type": "GUID"
                                                // },
                                                // {
                                                //     "name": "NAME",
                                                //     "type": "componentValue",
                                                //     "valueName": "NAME",
                                                //     "dataType": "string"
                                                // }
                                            ],
                                            "outputParameters": [],
                                            "result": [
                                                {
                                                    "name": "data",
                                                    "showMessageWithNext": 0,
                                                    "message": "message.ajax.state.success",
                                                    "senderId": "afterPropertySaveSuccess"
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
                                        }
                                    ]
                                }
                            }
                        ],
                        "id": "3vlDRq",
                        "type": "row"
                    }
                ]
            }
        }
    };

    public ngOnInit() { }
}