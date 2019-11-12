# ShareModule

**应** 包含定义：

+ 应用通用自定义业务组件

**应** 导出所有包含的模块。

**不应** 有 `providers` 属性。

## 自定义全局组件或指令

每一个组件或指令应该有一个完整的说明文件，**建议**一个合理的目录结构应该是：

```
├── components
│   ├── comp1
│   │   ├── index.ts
│   │   ├── README.md
│   ├── comp2
│   │   ├── index.ts
│   │   ├── README.md
├── directives
│   ├── dire1
│   │   ├── index.ts
│   │   ├── README.md
│   ├── dire2
│   │   ├── index.ts
│   │   ├── README.md
```
# messageSender
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
}

# messageReceiver
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

# dialog
"dialog": [
    {
        "id": "edit_province_form",
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
                    "title": '省名称',  // lable 信息
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
]
# condition
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
# valueChange
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
]
# toolbar
"toolbar": [
    {
        "targetViewId": "view_business_main",
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
                "text": "新增业务资源",
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
# editor
 "editor": {
    "type": "input",
    "field": "descName"
},               
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
},
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
    }