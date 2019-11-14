import { CfgLayoutPageComponent } from '../../config-components/config-layout-page/cfg-layout-page/cfg-layout-page.component';
import { CnDataFormComponent } from '@shared/components/data-form/cn-data-form.component';
import { BSN_TOOLBAR_TRIGGER } from '../../../core/relations/bsn-trigger/toolbar.trigger.interface';
import { BSN_DATAGRID_TRIGGER } from '../../../core/relations/bsn-trigger/data-grid.trigger.interface';
import { ButtonOperationResolver } from '../../resolver/buttonOperation/buttonOperation.resolver';
import { CN_DATA_GRID_PROPERTY } from '../../../core/relations/bsn-property/data-grid.property.interface';
import { CN_DATA_GRID_METHOD } from '@core/relations/bsn-methods';
import { BSN_COMPONENT_SERVICES, BsnRelativesMessageModel, BSN_RELATION_SUBJECT } from '../../../core/relations/bsn-relatives';
import { ComponentServiceProvider } from '@core/services/component/component-service.provider';
import {
    Component,
    OnInit,
    Input,
    OnDestroy,
    Type,
    Inject,
    AfterViewInit,
    Output,
    EventEmitter,
    TemplateRef
} from '@angular/core';
import { CnComponentBase } from '../cn-component.base';
import { ParameterResolver } from '@shared/resolver/parameter/parameter.resolver';
import { RelationResolver } from '@shared/resolver/relation/relation.resolver';
import { filter, concatMap, mergeMap } from 'rxjs/operators';
import { Subscription, Subject, BehaviorSubject, merge, Observable } from 'rxjs';
import { CommonUtils } from '@core/utils/common-utils';
import { IDataGridProperty } from '@core/relations/bsn-property/data-grid.property.interface';
import { BSN_TRIGGER_TYPE } from '@core/relations/bsn-status';
// const component: { [type: string]: Type<any> } = {
//     layout: LayoutResolverComponent,
//     form: CnFormWindowResolverComponent,
//     upload: BsnUploadComponent,
//     importExcel: BsnImportExcelComponent
// };
const components: { [type: string]: Type<any> } = {
    form: CnDataFormComponent,
    cfgLayoutPage: CfgLayoutPageComponent
    // label: ,
    // selectMultiple:,
    // datePicker:,
    // yearPicker:,
    // weekPicke:,
    // rangePicker:,
    // monthPicker:,
    // switch:,
    // radio:,
    // checkbox:,
    // treeSelect:,
    // transfer: ,
    // gridSelect:,
    // textarea: ,
    // customSelect: ,
};

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'cn-static-table,[cn-static-table]',
    templateUrl: './cn-static-table.component.html',
    styleUrls: [`cn-static-table.component.less`]
})
export class CnStaticTableComponent extends CnComponentBase
    implements OnInit, AfterViewInit, OnDestroy, IDataGridProperty {

    @Input()
    public config = {
        "id": "view_static_demo",
        "title": "资源列表",
        "titleIcon": "right-circle",
        "component": "cnDataTable",
        "keyId": "id",
        "size": "small",
        "isSelected": false,
        "isBordered": true,
        "isFrontPagination": false,
        "isPagination": true,
        "isShowSizeChanger": true,
        "showTotal": true,
        "pageSize": 5,
        "showCheckBox": true,
        "pageSizeOptions": [10, 20, 50, 100],
        "loadingOnInit": false,
        // "scroll": {
        //     "y": "300px"
        // },
        // "spanWidthConfig": [
        //     '50px', '100px', '100px', '100px', '100px'
        // ],
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
                "field": "id",
                "hidden": true,
                "showFilter": false,
                "showSort": false,
                "isShowExpand": false,
                "width": "50px",
                "style": {}
            },
            {
                "title": "SQL 资源",
                "type": "field",
                "field": "sqlId",
                "hidden": false,
                "showFilter": false,
                "showSort": false,
                "width": "400px",
                "style": {},
                "editor": {
                    "type": "input",
                    "field": "sqlId"
                }
            },
            {
                "title": "操作类型",
                "type": "field",
                "field": "type",
                "hidden": false,
                "showFilter": false,
                "showSort": false,
                "width": "100px",
                "style": {},
                "editor": {
                    "type": "select",
                    "field": "type",
                    // "placeholder": "请输入",
                    "defaultValue": 1,
                    "options": [
                        { "label": '新增', "value": "insert" },
                        { "label": '修改', "value": "update" },
                        { "label": '删除', "value": "delete" },
                        { "label": '查询', "value": "select" }
                    ],
                    "labelName": 'label',
                    "valueName": 'value',
                }
            },
            {
                "title": "操作",
                "type": "action",
                "width": "100px",
                "actionIds": [
                    "grid_edit", "grid_cancel", "grid_save", "grid_delete", "grid_new", "grid_new_cancel"
                ]
            }
        ],
        "cascade": {
            "messageSender": [
                {
                    "id": "grid_sender_02",
                    "senderId": "view_static_demo",
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
                                    "name": "ID",
                                    "type": "item",
                                    "valueName": "ID"
                                }
                            ]
                        }
                    ]
                },
                {
                    "id": "grid_sender_03",
                    "senderId": "view_static_demo",
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
                                    "value": "view_static_demo",
                                    "type": "value"
                                }
                            ]
                        }
                    ]
                },
                {
                    "id": "grid_sender_04",
                    "senderId": "view_static_demo",
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
                                    "value": "view_static_demo",
                                    "type": "value"
                                }
                            ]
                        }
                    ]
                },
                {
                    "id": "grid_sender_05",
                    "senderId": "view_static_demo",
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
                                    "value": "view_static_demo",
                                    "type": "value"
                                }
                            ]
                        }
                    ]
                },
                {
                    "id": "grid_sender_06",
                    "senderId": "view_static_demo",
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
                                    "value": "view_static_demo",
                                    "type": "value"
                                }
                            ]
                        }
                    ]
                },
                {
                    "id": "grid_sender_07",
                    "senderId": "view_static_demo",
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
                                    "value": "view_static_demo",
                                    "type": "value"
                                }
                            ]
                        }
                    ]
                },
                {
                    "id": "grid_sender_08",
                    "senderId": "view_static_demo",
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
                                    "value": "view_static_demo",
                                    "type": "value"
                                }
                            ]
                        }
                    ]
                },
                {
                    "id": "afterBusinessMainSaveSuccessfully",
                    "senderId": "view_static_demo",
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
                    "senderId": "view_static_demo",
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
                    "senderId": "view_static_demo",
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
                    "senderId": "view_static_demo",
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
                    "senderId": "view_static_demo",
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
                    "senderId": "view_static_demo",
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
            // {
            //     "id": "grid_new",
            //     "state": "new",
            //     "text": "保存",
            //     "icon": "save",
            //     "color": "text-primary",
            //     "type": "link",
            //     "size": "small",
            //     "hidden": false,
            //     "execute": [
            //         {
            //             "triggerType": "OPERATION",
            //             "trigger": "SAVE_ROW",
            //             "ajaxId": "province_save_1",
            //             // "stateId": "add_save_1",
            //             // "conditionId": "add_citiessave_1"
            //         }
            //     ],
            //     "toggle": {
            //         "type": "state",
            //         "toggleProperty": "hidden",
            //         "values": [
            //             {
            //                 "name": "new",
            //                 "value": false
            //             },
            //             {
            //                 "name": "text",
            //                 "value": true
            //             }
            //         ]
            //     }
            // },
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
                "senderId": "view_static_demo",
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
                "senderId": "view_static_demo",
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
    @Input() initData;
    @Input() tempData;
    @Input()
    public permissions = [];
    @Input()
    public dataList = [];
    @Output() public updateValue = new EventEmitter();
    /**
     * 组件名称
     * 所有组件实现此属性 
     */
    public COMPONENT_NAME = "CnDataTable";
    /**
     * 组件操作对外名称
     * 所有组件实现此属性
     */
    public COMPONENT_METHODS = CN_DATA_GRID_METHOD;

    public COMPONENT_PROPERTY = CN_DATA_GRID_PROPERTY;

    public tableColumns = [];

    public spanCount = 0;


    public isLoading = false;
    public loading = false;
    public pageIndex = 1;
    public pageSize = 10;
    public total = 0;
    public focusIds;

    public isAllChecked = false;
    public indeterminate = false;
    // public mapOfCheckedId: { [key: string]: boolean } = {};
    // public mapOfSelectedId: { [key: string]: boolean } = {};
    public mapOfDataState: {
        [key: string]: {
            disabled: boolean,
            checked: boolean,
            selected: boolean,
            state: string,
            data: any,
            originData: any,
            actions?: any[],
            validation?: boolean
        }
    } = {};
    public checkedNumber = 0;

    public KEY_ID: string;

    public _sortName;
    public _sortValue;

    public ROWS_ADDED: any[] = [];
    public ROWS_EDITED: any[] = [];
    public ROW_SELECTED: any;
    public ROWS_CHECKED: any[] = [];
    public COMPONENT_VALUE: any[] = [];

    public operationRow: any;

    // 作为子组件时变量
    public selectedRowValue;

    private _selectedRow;
    private _rowsData;
    private _addedRowsData;
    private _editedRowsData;
    private _search_row;

    private _columnFilterList;

    private _sender_source$: Subject<any>;
    private _receiver_source$: Subject<any>;
    private _trigger_source$: Subject<any>;

    private _receiver_subscription$: Subscription;
    private _sender_subscription$: Subscription;
    private _trigger_receiver_subscription$: Subscription;

    // 前置条件集合
    public beforeOperation;
    constructor(
        @Inject(BSN_COMPONENT_SERVICES)
        public componentService: ComponentServiceProvider
    ) {
        super(componentService);
        this.cacheValue = this.componentService.cacheService;

        // init cacheValue
    }

    public ngOnInit() {
        // 设置数据操作主键
        this.KEY_ID = this.config.keyId ? this.config.keyId : 'id';

        // 初始化默认分页大小
        this.config.pageSize && (this.pageSize = this.config.pageSize);

        // 构建表格列及列标题
        this._buildColumns(this.config.columns);

        this._initInnerValue();

        // 解析及联配置
        this.resolveRelations();



        // 是否需要进行初始化数据加载
        if (this.config.loadingOnInit) {
            this.load();
        }
    }

    private _initInnerValue() {
        if (this.tempData) {
            this.tempValue = this.tempData;
        } else {
            this.tempValue = {};
        }
        if (this.initData) {
            this.initValue = this.initData;
        } else {
            this.initValue = {};
        }
    }

    public setInitValue(val) {
        this.initValue = { ...this.initValue, ...val };
    }


    public ngAfterViewInit() {

    }

    public ngOnDestroy() {
        // 释放级联对象
        this.unsubscribeRelation();
        // 释放及联接受对象
        if (this._receiver_subscription$) {
            this._receiver_subscription$.unsubscribe();
        }

        if (this._sender_subscription$) {
            this._sender_subscription$.unsubscribe();
        }

        // 释放触发器对象
        if (this._trigger_receiver_subscription$) {
            this._trigger_receiver_subscription$.unsubscribe();
        }

        if (this._trigger_source$) {
            this._trigger_source$.unsubscribe();
        }

        if (this.subscription$) {
            this.subscription$.unsubscribe();
        }
    }

    /**
     * 解析级联消息
     */
    private resolveRelations() {
        if (this.config.cascade && this.config.cascade.messageSender) {
            if (!this._sender_source$) {
                // 解析组件发送消息配置,并注册消息发送对象
                this._sender_source$ = new RelationResolver(this).resolveSender(this.config);
                this._sender_subscription$ = this._sender_source$.subscribe();
            }

        }
        if (this.config.cascade && this.config.cascade.messageReceiver) {
            // 解析消息接受配置,并注册消息接收对象
            // this._receiver_source$ = new RelationResolver(this).resolveReceiver(this.config);
            // this._receiver_subscription$ = this._receiver_source$.subscribe();
            new RelationResolver(this).resolveReceiver(this.config);
        }

        this._trigger_source$ = new RelationResolver(this).resolve();
    }

    /**
     * 构建表格列集合
     * @param columns 
     */
    private _buildColumns(columns) {
        if (Array.isArray(columns) && columns.length > 0) {
            const colObjs = columns.filter(item => item.type === 'field');
            const actionCfgs = columns.filter(item => item.type === 'action');
            if (actionCfgs && actionCfgs.length > 0) {
                actionCfgs.map(cfg => {
                    const colActions = [];
                    cfg.actionIds.map(actionId => {
                        const act = this.config.rowActions.find(action => actionId === action.id);
                        if (act) {
                            colActions.push(act);
                        }
                    });
                    if (colActions.length > 0) {
                        cfg['action'] = colActions;
                    }

                })
            }

            if (colObjs && colObjs.length > 0) {
                this.tableColumns.push(...colObjs);
            }
            if (actionCfgs && actionCfgs.length > 0) {
                this.tableColumns.push(...actionCfgs);
            }
        }

    }

    private _initComponentData() {
        this.mapOfDataState = {};
        this.ROWS_ADDED = [];
        this.ROWS_EDITED = [];
        this.ROW_SELECTED = [];
        this.ROWS_CHECKED = [];
        this.COMPONENT_VALUE = [];
        this.ROW_SELECTED = JSON.parse(`{"${this.KEY_ID}": ""}`);
    }



    public addBtnClick() {
        this.addRow();
        this.updateValue.emit(this.getAddedNewRowsData());
    }

    public getAddedNewRowsData() {
        return this.ROWS_ADDED;

    }

    public load() {
        this.isLoading = true;
        const url = this.config.loadingConfig.url;
        const method = this.config.loadingConfig.method;
        const params = {
            ...this.buildParameters(this.config.loadingConfig.params),
            ...this._buildPaging(),
            // ...this._buildFilter(this.config.ajaxConfig.filter),
            ...this._buildSort(),
            // ...this._buildColumnFilter(),
            // ...this._buildFocusId(),
            // ...this._buildSearch()
        };

        this.componentService.apiService.getRequest(url, method, { params }).subscribe(response => {
            if (response && response.data && response.data.resultDatas) {
                this._initComponentData();
                response.data.resultDatas.map((d, index) => {
                    this.mapOfDataState[d[this.KEY_ID]] = {
                        disabled: false,
                        checked: false, // index === 0 ? true : false,
                        selected: false, // index === 0 ? true : false,
                        state: 'text',
                        data: d,
                        originData: { ...d },
                        validation: true,
                        actions: this.getRowActions('text')
                    };
                    if (!this.config.isSelected) {
                        index === 0 && (this.ROW_SELECTED = d);
                    } else {
                        if (d[this.KEY_ID] === this.selectedRowValue) {
                            this.ROW_SELECTED = d
                        }
                    }

                });

                this.dataList = response.data.resultDatas;
                this.total = response.data.count;
                // 更新
                // this.dataCheckedStatusChange();
                // 默认设置选中第一行, 初始数据的选中状态和选中数据,均通过setSelectRow方法内实现
                // this.dataList.length > 0 && this.setSelectRow(this.ROW_SELECTED);

                this.setSelectRow(this.ROW_SELECTED);
                this.isLoading = false;
            } else {
                this.isLoading = false;
            }
        }, error => {
            console.log(error);
        });
    }

    public loadRefreshData(option) {
        this.isLoading = true;
        const url = this.config.loadingConfig.url;
        const method = this.config.loadingConfig.method;
        // 返回结果解析id参数,构建ids
        const param1: any = {};
        if (option && Array.isArray(option)) {
            const rids = [];
            option.map(opt => {
                rids.push(opt[this.KEY_ID]);
            })
            param1['id'] = `in(${rids.join(',')})`;
        } else if (option) {
            param1['id'] = `in(${option[this.KEY_ID]})`
        }

        // 页面其他参数
        const params = {
            ...this.buildParameters(this.config.loadingConfig.params),
            // ...this._buildPaging(),
            ...param1
        }

        this.componentService.apiService.getRequest(url, method, { params }).subscribe(response => {
            if (response && response.data && response.data) {
                this.refreshData(response.data)
                this.isLoading = false;
            } else {
                this.isLoading = false;
            }
        }, error => {
            console.log(error);
        });

    }

    /**
     * 构建查询过滤参数
     * @param filterConfig
     * @returns {{}}
     * @private
     */
    private _buildFilter(filterConfig) {
        let filter = {};
        if (filterConfig) {
            filter = ParameterResolver.resolve({
                params: filterConfig,
                tempValue: this.tempValue,
                cacheValue: this.cacheValue
            });
        }
        return filter;
    }

    // #region 内置方法
    /**
     * 构建URL
     * @param ajaxUrl
     * @returns {string}
     * @private
     */
    private _buildURL(ajaxUrl) {
        let url = '';
        if (ajaxUrl && this._isUrlString(ajaxUrl)) {
            url = ajaxUrl;
        } else if (ajaxUrl) {
        }
        return url;
    }
    /**
     * 构建分页
     * @returns {{}}
     * @private
     */
    private _buildPaging() {
        const params = {};
        if (this.config.isPagination) {
            params['_page'] = this.pageIndex;
            params['_rows'] = this.pageSize;
        }
        return params;
    }
    /**
     * 处理URL格式
     * @param url
     * @returns {boolean}
     * @private
     */
    private _isUrlString(url) {
        return Object.prototype.toString.call(url) === '[object String]';
    }
    /**
     * 构建排序
     * @returns {{}}
     * @private
     */
    private _buildSort() {
        const sortObj = {};
        // if (this._sortName && this._sortType) {
        if (this._sortName && this._sortValue) {
            sortObj['_sort'] = this._sortName + this._sortValue;
            // sortObj['_order'] = sortObj['_order'] ? 'DESC' : 'ASC';
        }
        return sortObj;
    }
    /**
     * 构建查询焦点
     * @returns {{}}
     * @private
     */
    private _buildFocusId() {
        const focusParams = {};
        // 服务器端待解决
        if (this.focusIds) {
            focusParams['_focusedId'] = this.focusIds;
        }
        return focusParams;
    }
    /**
     * 构建查询字段
     * @returns {{}}
     * @private
     */
    private _buildColumnFilter() {
        const filterParams = {};
        if (this._columnFilterList && this._columnFilterList.length > 0) {
            this._columnFilterList.map(filter => {
                const valueStr = [];
                filter.value.map(value => {
                    valueStr.push(`'${value}'`);
                });
                filterParams[filter.field] = `in(${valueStr.join(',')})`;
            });
        }
        return filterParams;
    }
    /**
     * 构建查询参数
     */
    public _buildSearch() {
        let search = {};
        if (this._search_row) {
            const searchData = JSON.parse(JSON.stringify(this._search_row)); 4
            delete searchData.key;
            delete searchData.checked;
            delete searchData.row_status;
            delete searchData.selected;

            search = searchData;
        }
        return search;
    }
    // #endregion

    // #region state 状态切换
    private createNewRowData() {
        const newData = {}
        this.config.columns.map(col => {
            newData[col.field] = null
        });
        return newData;
    }

    public addRow() {
        // 创建空数据对象
        const newId = CommonUtils.uuID(32);
        const newData = this.createNewRowData();
        newData[this.KEY_ID] = newId;

        // 新增数据加入原始列表,才能够动态新增一行编辑数据
        this.dataList = [newData, ...this.dataList];

        // 组装状态数据
        this.mapOfDataState[newId] = {
            data: newData,
            originData: { ...newData },
            disabled: false,
            checked: true, // index === 0 ? true : false,
            selected: false, // index === 0 ? true : false,
            state: 'new',
            actions: this.getRowActions('new')
        }

        this.ROWS_ADDED = [newData, ...this.ROWS_ADDED];

        // 更新状态
    }

    private removeEditRow(item) {
        this.ROWS_EDITED = this.ROWS_EDITED.filter(r => r[this.KEY_ID] !== item[this.KEY_ID]);
    }

    private addEditRows(item) {
        const index = this.ROWS_EDITED.findIndex(r => r[this.KEY_ID] === item[this.KEY_ID]);
        if (index < 0) {
            this.ROWS_EDITED = [item, ...this.ROWS_EDITED];
        }
    }

    public editRows(option) {
        this.ROWS_CHECKED.map(
            item => {
                this.addEditRows(item);
                const trigger = new ButtonOperationResolver(this.componentService, this.config, this.mapOfDataState[item[this.KEY_ID]]);
                trigger.sendBtnMessage(option.btnCfg, { triggerType: BSN_TRIGGER_TYPE.STATE, trigger: BSN_DATAGRID_TRIGGER.EDIT_ROW }, this.config.id);
            }
        )
    }

    public editRow(option) {
        if (option.data) {
            this.addEditRows(option.data.data);
        }
        return true;
    }

    // 取消添加的新行 数据  
    public cancelNewRow(option) {
        if (option.data) {
            this.removeNewRow(option.data.data);
        }
    }

    public cancelNewRows(option) {
        this.ROWS_ADDED.map(
            item => {
                this.removeNewRow(item);
                const trigger = new ButtonOperationResolver(this.componentService, this.config, this.mapOfDataState[item[this.KEY_ID]]);
                trigger.sendBtnMessage(option.btnCfg, { triggerType: BSN_TRIGGER_TYPE.STATE, trigger: BSN_DATAGRID_TRIGGER.CANCEL_EDIT_ROW }, this.config.id);

            }
        )
        return true;
    }

    private removeNewRow(item) {
        this.dataList = this.dataList.filter(r => r[this.KEY_ID] !== item[this.KEY_ID]);
        this.ROWS_ADDED = this.ROWS_ADDED.filter(r => r[this.KEY_ID] !== item[this.KEY_ID]);
        delete this.mapOfDataState[item[this.KEY_ID]];
    }

    public cancelEditRows(option) {
        this.ROWS_CHECKED.map(
            item => {
                this.removeEditRow(item);
                const trigger = new ButtonOperationResolver(this.componentService, this.config, this.mapOfDataState[item[this.KEY_ID]]);
                trigger.sendBtnMessage(option.btnCfg, { triggerType: BSN_TRIGGER_TYPE.STATE, trigger: BSN_DATAGRID_TRIGGER.CANCEL_EDIT_ROW }, this.config.id);

            }
        )
        return true;
    }

    public cancelEditRow(option) {
        if (option.data) {
            const itemId = option.data.data[this.KEY_ID];
            if (itemId) {
                this.ROWS_EDITED = this.ROWS_EDITED.filter(r => r[this.KEY_ID] !== itemId);
            }
        }

        console.log('-------------', this.ROWS_ADDED, this.ROWS_EDITED)
        // 调用方法之前,判断传递的验证配置,解析后是否能够继续进行后续操作
        // return true 表示通过验证, return false 表示未通过,无法继续后续操作

        return true;
    }

    public changeAddedRowsToText(option) {
        console.log('changeAddedRowsToText', option);
        // 通过服务器端的临时ID与执行数据的ID匹配取得数据
        if (option && Array.isArray(option)) {
            option.map(opt => {
                if (this.mapOfDataState[opt[this.KEY_ID]]) {

                    this.ROWS_ADDED = this.ROWS_ADDED.filter(r => r[this.KEY_ID] !== opt[this.KEY_ID]);
                    this.mapOfDataState[opt[this.KEY_ID]]['originData'] = { ...this.mapOfDataState[opt[this.KEY_ID]]['data'] };
                    this.mapOfDataState[opt[this.KEY_ID]]['actions'] = [...this.config.rowActions.filter(action => action.state === 'text')];
                    const trigger = new ButtonOperationResolver(this.componentService, this.config, this.mapOfDataState[opt[this.KEY_ID]]);
                    trigger.sendBtnMessage({}, { triggerType: BSN_TRIGGER_TYPE.STATE, trigger: BSN_DATAGRID_TRIGGER.CANCEL_EDIT_ROW }, this.config.id);
                }
            })
        } else if (option) {
            // this.mapOfDataState[option[this.KEY_ID]].state = 'text';
            this.ROWS_ADDED = this.ROWS_ADDED.filter(r => r[this.KEY_ID] !== option[this.KEY_ID]);
            this.mapOfDataState[option[this.KEY_ID]]['originData'] = { ...this.mapOfDataState[option[this.KEY_ID]]['data'] };
            this.mapOfDataState[option[this.KEY_ID]]['actions'] = [...this.config.rowActions.filter(action => action.state === 'text')];
            const trigger = new ButtonOperationResolver(this.componentService, this.config, this.mapOfDataState[option[this.KEY_ID]]);
            trigger.sendBtnMessage({}, { triggerType: BSN_TRIGGER_TYPE.STATE, trigger: BSN_DATAGRID_TRIGGER.CANCEL_EDIT_ROW }, this.config.id);
        }


    }

    public changeEditedRowsToText(option) {
        console.log('changeEditedRowsToText', option);
        // 通过服务器端的临时ID与执行数据的ID匹配取得数据
        if (option && Array.isArray(option)) {
            option.map(opt => {
                if (this.mapOfDataState[opt[this.KEY_ID]]) {
                    this.mapOfDataState[opt[this.KEY_ID]]['originData'] = { ...this.mapOfDataState[opt[this.KEY_ID]]['data'] };
                    const trigger = new ButtonOperationResolver(this.componentService, this.config, this.mapOfDataState[opt[this.KEY_ID]]);
                    trigger.sendBtnMessage({}, { triggerType: BSN_TRIGGER_TYPE.STATE, trigger: BSN_DATAGRID_TRIGGER.CANCEL_EDIT_ROW }, this.config.id);
                }
            })
        } else if (option) {
            // this.mapOfDataState[option[this.KEY_ID]].state = 'text';
            this.mapOfDataState[option[this.KEY_ID]]['originData'] = { ...this.mapOfDataState[option[this.KEY_ID]]['data'] };
            const trigger = new ButtonOperationResolver(this.componentService, this.config, this.mapOfDataState[option[this.KEY_ID]]);
            trigger.sendBtnMessage({}, { triggerType: BSN_TRIGGER_TYPE.STATE, trigger: BSN_DATAGRID_TRIGGER.CANCEL_EDIT_ROW }, this.config.id);
        }

    }

    // #endregion

    // #region operation 数据操作
    private _getComponentValueByHttpMethod(method): any[] {
        switch (method) {
            case 'post':
                return this.ROWS_ADDED;
            case 'put':
                return this.ROWS_EDITED;
            case 'proc':
                return [...this.ROWS_ADDED, ...this.ROWS_EDITED];
        }
    }

    public async executeHttpRequest(url, method, paramData) {
        return this.componentService.apiService[method](url, paramData).toPromise();
    }

    public deleteCheckedRows(option) {
        console.log(this.config.id + '-------------executeSelectRow', option);
        if (option && option.ids) {
            option.ids.split(',').map(id => {
                this.dataList = this.dataList.filter(d => d[this.KEY_ID] !== id);
            });
        }
        if (this.dataList.length > 0) {
            this.setSelectRow(this.dataList[0]);
        }
    }

    public async deleteCurrentRow(option) {
        console.log(this.config.id + '-------------executeSelectRow', option);

        // const url = option.ajaxConfig.url;
        // const method = option.ajaxConfig.ajaxType ? option.ajaxConfig.ajaxType : 'delete';
        // const ajaxParams = option.ajaxConfig.params ? option.ajaxConfig.params : []
        // let paramData;
        // if (option.data) {
        //     paramData = ParameterResolver.resolve({
        //         params: ajaxParams,
        //         item: option.data.data,
        //         tempValue: this.tempValue,
        //         initValue: this.initValue,
        //         cacheValue: this.cacheValue
        //     });
        // }
        // const response = await this.executeHttpRequest(url, method, paramData);
        // if (response) {
        //     this.load();
        // }
    }

    public async executeCurrentRow(option) {
        const url = option.ajaxConfig.url;
        const method = option.ajaxConfig.ajaxType;
        const ajaxParams = option.ajaxConfig.params ? option.ajaxConfig.params : []
        let paramData;
        if (option.data) {
            paramData = ParameterResolver.resolve({
                params: ajaxParams,
                item: option.data.data,
                tempValue: this.tempValue,
                initValue: this.initValue,
                cacheValue: this.cacheValue
            });
        }
        const response = await this.executeHttpRequest(url, method, paramData);
        // 批量对象数据,返回结果都将以对象的形式返回,如果对应结果没有值则返回 {}
        this._sendDataSuccessMessage(response, option.ajaxConfig.result);

        // 处理validation结果
        const validationResult = this._sendDataValidationMessage(response, option.ajaxConfig.result);

        // 处理error结果
        const errorResult = this._sendDataErrorMessage(response, option.ajaxConfig.result);

        return validationResult && errorResult;
    }

    private _sendDataSuccessMessage(response, resultCfg): boolean {
        let result = false;
        if (Array.isArray(response.data) && response.data.length <= 0) {
            return result;
        }
        if (response && response.data) {
            const successCfg = resultCfg.find(res => res.name === 'data');
            // 弹出提示框
            if (successCfg) {
                new RelationResolver(this)
                    .resolveInnerSender(
                        successCfg,
                        response.data,
                        Array.isArray(response.data)
                    );
            }
            result = true;
        }

        return result;
    }

    private _sendDataValidationMessage(response, resultCfg) {
        let result = true;
        if (response && Array.isArray(response.validation) && response.validation.length <= 0) {
            return result;
        }
        if (response && response.validation) {
            const validationCfg = resultCfg.find(res => res.name === 'validation');
            if (validationCfg) {
                new RelationResolver(this)
                    .resolverDataValidationSender(
                        validationCfg,
                        response.validation);
            }
            result = false;
        }
        return result;
    }

    private _sendDataErrorMessage(response, resultCfg) {
        let result = true;
        if (response && Array.isArray(response.error) && response.error.length <= 0) {
            return result;
        }
        if (response && response.error) {
            const errorCfg = resultCfg.find(res => res.name === 'error');
            if (errorCfg) {
                new RelationResolver(this)
                    .resolverDataErrorSender(
                        errorCfg,
                        response.error);
            }
            result = false;
        }
        return result;
    }

    public async saveRow(option) {
        const ajaxConfig = option.ajaxConfig;
        const rowData = option.data.data;
        const url = ajaxConfig.url;
        const paramData = ParameterResolver.resolve({
            params: ajaxConfig.params,
            tempValue: this.tempValue,
            componentValue: rowData,
            item: this.ROW_SELECTED,
            initValue: this.initValue,
            cacheValue: this.cacheValue,
            router: this.routerValue
        });

        const response = await this.componentService.apiService[ajaxConfig.ajaxType](url, paramData).toPromise();

        // 批量对象数据,返回结果都将以对象的形式返回,如果对应结果没有值则返回 {}
        this._sendDataSuccessMessage(response, ajaxConfig.result);

        // 处理validation结果
        const validationResult = this._sendDataValidationMessage(response, ajaxConfig.result);

        // 处理error结果
        const errorResult = this._sendDataErrorMessage(response, ajaxConfig.result);

        // 返回true可以发送后续操作, 返回false终止发送,之前定义的后续操作将无法执行
        return validationResult && errorResult;
    }

    /**
     * 保存编辑行
     * @param options ajaxConfig
     */
    public async saveRows(option) {
        const ajaxConfig = option.ajaxConfig;
        // 构建业务对象
        // 执行异步操作
        const url = ajaxConfig.url;
        this.COMPONENT_VALUE = this._getComponentValueByHttpMethod(ajaxConfig.ajaxType);
        const paramsData = this.buildParameters(ajaxConfig.params, this.COMPONENT_VALUE, true);
        const response = await this.componentService.apiService[ajaxConfig.ajaxType](url, paramsData).toPromise();
        // 批量提交数据,返回结果都将以数组的形式返回,如果对应结果没有值则返回 {}
        this._sendDataSuccessMessage(response, ajaxConfig.result);

        // 处理validation结果
        const validationResult = this._sendDataValidationMessage(response, ajaxConfig.result);

        // 处理error结果
        const errorResult = this._sendDataErrorMessage(response, ajaxConfig.result);

        // 返回true可以发送后续操作, 返回false终止发送,之前定义的后续操作将无法执行
        return validationResult && errorResult;
    }

    public setSelectRow(rowData?, $event?) {
        if (!rowData) {
            return false;
        }
        if ($event) {
            const src = $event.srcElement || $event.target;
            if (src.type !== undefined) {
                return false;
            }
            $event.stopPropagation();
            $event.preventDefault();
        }

        this.ROW_SELECTED = rowData;

        // 选中当前行
        if (this.dataList.length > 0) {
            this.dataList.map(row => {
                this.mapOfDataState[row[this.KEY_ID]]['selected'] = false;
            });

            if (rowData[this.KEY_ID] && rowData[this.KEY_ID].length > 0) {
                this.mapOfDataState[rowData[this.KEY_ID]]['selected'] = true;
            }


            // 勾选/取消当前行勾选状态
            this.mapOfDataState[rowData[this.KEY_ID]]['checked'] = !this.mapOfDataState[rowData[this.KEY_ID]]['checked'];
            this.dataCheckedStatusChange();
        }

        return true;
    }

    public clearSelectRow(type?) {
        this.dataList.map(row => {
            switch (type) {
                case "selected":
                    this.mapOfDataState[row[this.KEY_ID]]['selected'] = false;
                    break;
                case "checked":
                    this.mapOfDataState[row[this.KEY_ID]]['checked'] = false;
                    break;
                case "selectedOrchecked":
                    this.mapOfDataState[row[this.KEY_ID]]['selected'] = false;
                    this.mapOfDataState[row[this.KEY_ID]]['checked'] = false;
                    break;
                default:
                    this.mapOfDataState[row[this.KEY_ID]]['selected'] = false;
                    this.mapOfDataState[row[this.KEY_ID]]['checked'] = false;
                    break;
            }
        });
        this.dataCheckedStatusChange();
    }

    public selectRow(rowData) {


        console.log(this.config.id + '-----------' + rowData, arguments);
        // this.ROW_SELECTED = rowData;
    }

    // #endregion

    // #region action

    public refreshData(loadNewData) {
        if (loadNewData && Array.isArray(loadNewData)) {
            loadNewData.map((newData, ind) => {
                const index = this.dataList.findIndex(d => d[this.KEY_ID] === newData[this.KEY_ID]);
                if (index > -1) {
                    this.dataList.splice(index, 1, newData);
                    this.dataList = [...this.dataList];
                } else {
                    this.dataList = [loadNewData[ind], ...this.dataList];
                }
                const mapData = this.mapOfDataState[newData[this.KEY_ID]];
                if (mapData) {
                    mapData.data = newData;
                    mapData.originData = { ...newData };
                } else {
                    // 组装状态数据
                    this.mapOfDataState[newData[this.KEY_ID]] = {
                        data: newData,
                        originData: { ...newData },
                        disabled: false,
                        checked: true, // index === 0 ? true : false,
                        selected: false, // index === 0 ? true : false,
                        state: 'new',
                        actions: this.getRowActions('new')
                    }
                }
            })
        }
        // 刷新dataList
        // 刷新mapOfDataState
    }

    public showInvalidateAddedRows(option) {
        if (option && Array.isArray(option)) {
            option.map(opt => {
                const rowData = opt.data;
                this.mapOfDataState[rowData[this.KEY_ID]]['validation'] = false;
            })
        } else if (option) {
            const rowData = option.data
            this.mapOfDataState[rowData[this.KEY_ID]]['validation'] = false
        }
    }

    public showInvalidateEditedRows(option) {
        console.log(option);
        if (option && Array.isArray(option)) {
            option.map(opt => {
                const rowData = opt.data;
                this.mapOfDataState[rowData[this.KEY_ID]]['validation'] = false;
            })
        } else if (option) {
            const rowData = option.data
            this.mapOfDataState[rowData[this.KEY_ID]]['validation'] = false
        }
    }

    public checkedRows() {
        console.log('-------------checked rows');
        // this._sender_source$.subscribe(res => {
        //     console.log('send message', res);
        // });
    }

    public buildParameters(paramsCfg, data?, isArray = false) {
        let parameterResult: any | any[];
        if (!isArray && !data) {
            parameterResult = ParameterResolver.resolve({
                params: paramsCfg,
                tempValue: this.tempValue,
                componentValue: this.COMPONENT_VALUE,
                item: this.ROW_SELECTED,
                initValue: this.initValue,
                cacheValue: this.cacheValue,
                router: this.routerValue,
                addedRows: this.ROWS_ADDED,
                editedRows: this.ROWS_EDITED

            });
        } else if (!isArray && data) {
            parameterResult = ParameterResolver.resolve({
                params: paramsCfg,
                tempValue: this.tempValue,
                componentValue: this.COMPONENT_VALUE,
                item: this.ROW_SELECTED,
                initValue: this.initValue,
                cacheValue: this.cacheValue,
                router: this.routerValue,
                addedRows: data,
                editedRows: data,
                validation: data,
                returnValue: data

            });
        } else if (isArray && data && Array.isArray(data)) {
            parameterResult = [];
            data.map(d => {
                const param = ParameterResolver.resolve({
                    params: paramsCfg,
                    tempValue: this.tempValue,
                    componentValue: d,
                    item: this.ROW_SELECTED,
                    initValue: this.initValue,
                    cacheValue: this.cacheValue,
                    router: this.routerValue,
                    addedRows: d,
                    editedRows: d,
                    validation: d,
                    returnValue: d
                });
                parameterResult.push(param);
            })
        }
        return parameterResult;
    }

    public getCurrentComponentId() {
        return this.config.id;
    }

    public async executeSelectRow(option) {
        console.log(this.config.id + '-------------executeSelectRow', option);
        const ajaxParams = option.ajaxConfig.params ? option.ajaxConfig.params : []
        const paramData = this._createSelectedRowParameter(ajaxParams);
        const result = await this._executeAjax(option, paramData);
        return result;
    }

    private async _executeAjax(option, paramData) {
        const url = option.ajaxConfig.url;
        const method = option.ajaxConfig.ajaxType;

        const response = await this.executeHttpRequest(url, method, paramData ? paramData : {});
        // 批量对象数据,返回结果都将以对象的形式返回,如果对应结果没有值则返回 {}
        this._sendDataSuccessMessage(response, option.ajaxConfig.result);

        // 处理validation结果
        const validationResult = this._sendDataValidationMessage(response, option.ajaxConfig.result);

        // 处理error结果
        const errorResult = this._sendDataErrorMessage(response, option.ajaxConfig.result);

        return validationResult && errorResult;
    }

    private _createSelectedRowParameter(ajaxParams) {
        return ParameterResolver.resolve({
            params: ajaxParams,
            item: this.ROW_SELECTED,
            tempValue: this.tempValue,
            initValue: this.initValue,
            cacheValue: this.cacheValue
        });
    }



    public executeCheckedRows() {
        console.log(this.config.id + '-------------executeCheckedRows');
    }

    public async executeCheckedRowsIds(option) {
        console.log(this.config.id + '-------------executeCheckedRowsIds', option);
        const ajaxParams = option.ajaxConfig.params ? option.ajaxConfig.params : []
        const paramData = this._createCheckedRowsIdParameter(ajaxParams);
        const result = await this._executeAjax(option, paramData);
        return result;
    }

    private _createCheckedRowsIdParameter(ajaxParams) {
        const params = [];
        if (this.ROWS_CHECKED.length > 0) {
            this.ROWS_CHECKED.map(cr => {
                const p = ParameterResolver.resolve({
                    params: ajaxParams,
                    checkedItem: cr,
                    tempValue: this.tempValue,
                    initValue: this.initValue,
                    cacheValue: this.cacheValue
                });
                params.push(p[this.KEY_ID]);
            });
        }
        return { ids: params.join(',') };
    }

    public searchRow() {
        console.log(this.config.id + '-------------searchRow');
    }

    public cancelSearchRow() {
        console.log(this.config.id + '-------------cancelSearchRow');
    }

    public export() {

    }

    public import() {

    }

    public download() {

    }

    /**
     * ACTION
     * 显示确认对话框
     * @param option 确认参数 
     */
    public showConfirm(option: any) {
        this.confirm(option.dialog, () => { this.executeCurrentRow(option) })

    }

    /**
     * ACTION
     * @param option 
     */
    public showCheckedItemsIdsConfirm(option: any) {
        this.confirm(option.dialog, () => { this.executeCheckedRowsIds(option) })
    }

    /**
     * ACTION
     * @param option 
     */
    public showCheckedItems(option: any) {
        this.confirm(option.dialog, () => { this.executeCheckedRows() })
    }

    /**
     * 显示表单对话框
     * @param option 配置参数
     * dialog
     * changeValue
     * ajaxConfig
     */
    public showDialog(option: any) {
        let dialog;
        // 根据按钮类型初始化表单状态
        const dialogCfg = option.dialog;
        dialogCfg.form.state = option.btnCfg.state ? option.btnCfg.state : 'text';

        // const isEditForm = dialogCfg.form.state === 'edit' ? true : false;
        // if(isEditForm) {

        // }
        if (option.changeValue) {
            const d = ParameterResolver.resolve({
                params: option.changeValue.params,
                tempValue: this.tempValue,
                // componentValue: cmptValue,
                item: this.ROW_SELECTED,
                initValue: this.initValue,
                cacheValue: this.cacheValue,
                router: this.routerValue
            });
            option.changeValue.params.map(param => {
                if (param.type === 'value') {
                    // 类型为value是不需要进行任何值的解析和变化
                } else {
                    if (d[param.name]) {
                        param['value'] = d[param.name];
                    }
                }
            });
        }

        const dialogOptional = {
            nzTitle: dialogCfg.title ? dialogCfg.title : '',
            nzWidth: dialogCfg.width ? dialogCfg.width : '600px',
            nzStyle: dialogCfg.style ? dialogCfg.style : null, // style{top:'1px'},
            nzContent: components[dialogCfg.form.type],
            nzComponentParams: {
                config: dialogCfg.form,
                changeValue: option.changeValue ? option.changeValue.params : []
            },
            nzFooter: [
                {
                    label: dialogCfg.cancelText ? dialogCfg.cancelText : 'cancel',
                    onClick: componentInstance => {
                        dialog.close();
                    }
                },
                {
                    label: dialogCfg.okText ? dialogCfg.okText : 'OK',
                    onClick: componentInstance => {
                        (async () => {
                            const response = await componentInstance.executeModal(option);
                            this._sendDataSuccessMessage(response, option.ajaxConfig.result);

                            // 处理validation结果
                            this._sendDataValidationMessage(response, option.ajaxConfig.result)
                                &&
                                this._sendDataErrorMessage(response, option.ajaxConfig.result)
                                && dialog.close();
                        })();
                    }
                }
            ]
        }
        dialog = this.componentService.modalService.create(dialogOptional);
    }

    public showWindow() {

    }

    public showUpload() {

    }

    public showBatchDialog() {

    }

    /**
     * 显示消息框
     */
    public showMessage(option) {
        const message: { type: string, message: string, field: string } = { type: '', message: '', field: '' };
        if (option && Array.isArray(option)) {
            message.message = option[0].code;
            message.type = option[0].type;
            message.field = option[0].field;
        } else if (option) {
            message.message = option.code ? option.code : '';
            message.type = option.type;
            message.field = option.field ? option.field : '';
        }

        option && this.componentService.msgService.create(message.type, `${message.field}: ${message.message}`);
    }


    /**
     * 全选
     */
    public checkAll($value: boolean): void {
        //
        this.dataList
            .filter(item => !this.mapOfDataState[item[this.KEY_ID]]['dislabled'])
            .map(item =>
                this.mapOfDataState[item[this.KEY_ID]]['checked'] = $value
            );
        this.dataCheckedStatusChange();

    }

    /**
     * 更新数据选中状态的CheckBox
     */
    public dataCheckedStatusChange() {
        this.isAllChecked = this.dataList
            .filter(item => !this.mapOfDataState[item[this.KEY_ID]]['dislabled'])
            .every(item => this.mapOfDataState[item[this.KEY_ID]]['checked']);

        this.indeterminate = this.dataList
            .filter(item => !this.mapOfDataState[item[this.KEY_ID]]['dislabled'])
            .some(item => this.mapOfDataState[item[this.KEY_ID]]['checked']) && !this.isAllChecked;

        this.checkedNumber = this.dataList.filter(item => this.mapOfDataState[item[this.KEY_ID]]['checked']).length;

        // 更新当前选中数据集合
        this.ROWS_CHECKED = this.dataList
            .filter(item => !this.mapOfDataState[item[this.KEY_ID]]['dislabled'])
            .filter(item => this.mapOfDataState[item[this.KEY_ID]]['checked']);
    }

    /**
     * 列排序
     * @param $sort {key:string, value: string} 
     */
    sort($sort: { key: string, value: string }): void {
        this._sortName = $sort.key;
        this._sortValue = $sort.value;
        this.load();
    }

    searchData(reset: boolean = false) {
        if (reset) {
            this.pageIndex = 1;
        }
        this.isAllChecked = false;
        this.indeterminate = false;
        this.load();
    }


    //#endregion

    /**
     * 
     * @param actionCfg 当前操作按钮的配置
     * @param rowData 当前数据行
     * @param $event 
     */
    rowAction(actionCfg, rowData, $event?) {
        const dataOfState = this.mapOfDataState[rowData[this.KEY_ID]];
        $event && $event.stopPropagation();
        const trigger = new ButtonOperationResolver(this.componentService, this.config, dataOfState);
        trigger.toolbarAction(actionCfg, this.config.id);
        $event && $event.preventDefault();
    }

    getRowActions(state): any[] {
        const orginAction = this.tableColumns.find(c => c.type === 'action');
        const copyAction = [];
        if (orginAction) {
            const actions = JSON.parse(JSON.stringify(this.tableColumns.find(c => c.type === 'action').action.filter(c => c.state === state)));
            copyAction.push(...actions);
        }
        return copyAction;
    }


    valueChange(v?) {
        console.log('行返回', v);
        this.mapOfDataState[v.id]['data'][v.name] = v.value;
    }

}