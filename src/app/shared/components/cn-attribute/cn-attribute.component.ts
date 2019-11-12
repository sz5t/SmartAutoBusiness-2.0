import { Component, OnInit, Inject, OnDestroy, Input } from '@angular/core';
import { CnComponentBase } from '@shared/components/cn-component.base';
import { BSN_COMPONENT_SERVICES } from '@core/relations/bsn-relatives';
import { ComponentServiceProvider } from '@core/services/component/component-service.provider';
import { ParameterResolver } from '@shared/resolver/parameter/parameter.resolver';

@Component({
  selector: 'cn-attribute',
  templateUrl: './cn-attribute.component.html',
  styleUrls: ['./cn-attribute.component.less']
})
export class CnAttributeComponent extends CnComponentBase implements OnInit, OnDestroy {
  @Input() public changeValue;
  constructor(@Inject(BSN_COMPONENT_SERVICES)
  public componentService: ComponentServiceProvider) {
    super(componentService);
  }

  attributeType = 3;
  ngOnInit() {
    this.setChangeValue(this.cacheValue);
    this.js();
  }
  tabs = [
    {
      title: "属性",
      panels: [
        {
          active: true,
          name: '组件属性设置',
          disabled: false,
          layout: "horizontal",
          size: "default",
          panelsform: [
            {
              name: "名称",
              field: "name",
              "state": "edit", // 当前组件默认状态 文本，编辑，或者由表单状态控制 text、edit、form
              "text": { // 文本展示字段
                "type": 'label', // 什么组件展示文本 
                "field": 'name',   // 字段
              },
              "editor": {            // 编辑状态字段  日后扩充可为数组，满足条件下的组件变化
                "type": "input",
                "field": "name",  // 编辑字段于定义字段一致 （此处定义于表格相反）
                "placeholder": "请输入",
              }
            },
            {
              name: "组件类型",
              field: "type",
              "state": "edit", // 当前组件默认状态 文本，编辑，或者由表单状态控制 text、edit、form
              "text": { // 文本展示字段
                "type": 'label', // 什么组件展示文本 
                "field": 'type',   // 字段
              },
              "editor": {            // 编辑状态字段  日后扩充可为数组，满足条件下的组件变化
                "type": "input",
                "field": "type",  // 编辑字段于定义字段一致 （此处定义于表格相反）
                "placeholder": "请输入",
              }
            }
          ]
        },
        {
          active: false,
          disabled: false,
          name: '组件样式设置',
          layout: "vertical",
          size: "default",
          panelsform: [
            {
              name: "选中行",
              field: "name",
              "state": "edit", // 当前组件默认状态 文本，编辑，或者由表单状态控制 text、edit、form
              "text": { // 文本展示字段
                "type": 'label', // 什么组件展示文本 
                "field": 'name',   // 字段
              },
              "editor": {            // 编辑状态字段  日后扩充可为数组，满足条件下的组件变化
                "type": "select",
                "field": "name",
                "placeholder": "请输入",
                options: [
                  { label: '东方不败', value: 0 },
                  { label: '独孤求败', value: 1 },
                  { label: '西门吹雪', value: 2 },
                  { label: '陆小凤', value: 3 },
                ],
                "defaultValue": 3,
                labelName: 'label',
                valueName: 'value',
              }
            },
            {
              name: "勾选行",
              field: "type",
              "state": "edit", // 当前组件默认状态 文本，编辑，或者由表单状态控制 text、edit、form
              "text": { // 文本展示字段
                "type": 'label', // 什么组件展示文本 
                "field": 'type',   // 字段
              },
              "editor": {            // 编辑状态字段  日后扩充可为数组，满足条件下的组件变化
                "type": "input",
                "field": "type",  // 编辑字段于定义字段一致 （此处定义于表格相反）
                "placeholder": "请输入",
              }
            }
          ]
        }
      ]
    },
    {
      title: "事件",
      panels: [
        {
          active: true,
          disabled: false,
          name: '加载事件设置',
          layout: "vertical",
          size: "default",
          panelsform: [
            {
              name: "加载loadajaxconfig",
              field: "name",
              "state": "edit", // 当前组件默认状态 文本，编辑，或者由表单状态控制 text、edit、form
              "text": { // 文本展示字段
                "type": 'label', // 什么组件展示文本 
                "field": 'name',   // 字段
              },
              "editor": {            // 编辑状态字段  日后扩充可为数组，满足条件下的组件变化
                "type": "select",
                "field": "name",
                "placeholder": "请输入",
                options: [
                  { label: '东方不败', value: 0 },
                  { label: '独孤求败', value: 1 },
                  { label: '西门吹雪', value: 2 },
                  { label: '陆小凤', value: 3 },
                ],
                "defaultValue": 3,
                labelName: 'label',
                valueName: 'value',
              }
            }
          ]
        },
        {
          active: true,
          disabled: false,
          name: '选中行事件设置',
          layout: "vertical",
          size: "default",
          panelsform: [
            {
              name: "选中行",
              field: "name",
              "state": "edit", // 当前组件默认状态 文本，编辑，或者由表单状态控制 text、edit、form
              "text": { // 文本展示字段
                "type": 'label', // 什么组件展示文本 
                "field": 'name',   // 字段
              },
              "editor": {            // 编辑状态字段  日后扩充可为数组，满足条件下的组件变化
                "type": "select",
                "field": "name",
                "placeholder": "请输入",
                options: [
                  { label: '东方不败', value: 0 },
                  { label: '独孤求败', value: 1 },
                  { label: '西门吹雪', value: 2 },
                  { label: '陆小凤', value: 3 },
                ],
                "defaultValue": 3,
                labelName: 'label',
                valueName: 'value',
              }
            }
          ]
        }
      ]
    },
    {
      title: "消息",
      panels: [
        {
          active: true,
          disabled: false,
          name: '发送消息设置',
          layout: "horizontal",
          size: "default",
          panelsform: [
            {
              name: "名称",
              field: "name",
              "state": "edit", // 当前组件默认状态 文本，编辑，或者由表单状态控制 text、edit、form
              "text": { // 文本展示字段
                "type": 'label', // 什么组件展示文本 
                "field": 'name',   // 字段
              },
              "editor": {            // 编辑状态字段  日后扩充可为数组，满足条件下的组件变化
                "type": "input",
                "field": "name",  // 编辑字段于定义字段一致 （此处定义于表格相反）
                "placeholder": "请输入",
              }
            },
            {
              name: "类型",
              field: "type",
              "state": "edit", // 当前组件默认状态 文本，编辑，或者由表单状态控制 text、edit、form
              "text": { // 文本展示字段
                "type": 'label', // 什么组件展示文本 
                "field": 'type',   // 字段
              },
              "editor": {            // 编辑状态字段  日后扩充可为数组，满足条件下的组件变化
                "type": "input",
                "field": "type",  // 编辑字段于定义字段一致 （此处定义于表格相反）
                "placeholder": "请输入",
              }
            }
          ]
        },
        {
          active: false,
          disabled: false,
          name: '接收消息设置'
        }
      ]
    },

  ];
  panels = [
    {
      active: true,
      name: '组件属性设置',
      disabled: false,
      layout: "horizontal",
      size: "default",
      panelsform: [
        {
          name: "名称",
          field: "name",
          "state": "edit", // 当前组件默认状态 文本，编辑，或者由表单状态控制 text、edit、form
          "text": { // 文本展示字段
            "type": 'label', // 什么组件展示文本 
            "field": 'name',   // 字段
          },
          "editor": {            // 编辑状态字段  日后扩充可为数组，满足条件下的组件变化
            "type": "input",
            "field": "name",  // 编辑字段于定义字段一致 （此处定义于表格相反）
            "placeholder": "请输入",
          }
        },
        {
          name: "组件类型",
          field: "type",
          "state": "edit", // 当前组件默认状态 文本，编辑，或者由表单状态控制 text、edit、form
          "text": { // 文本展示字段
            "type": 'label', // 什么组件展示文本 
            "field": 'type',   // 字段
          },
          "editor": {            // 编辑状态字段  日后扩充可为数组，满足条件下的组件变化
            "type": "input",
            "field": "type",  // 编辑字段于定义字段一致 （此处定义于表格相反）
            "placeholder": "请输入",
          }
        }
      ]
    },
    {
      active: false,
      disabled: false,
      name: '组件事件设置',
      layout: "vertical",
      size: "default",
      panelsform: [
        {
          name: "选中行",
          field: "name",
          "state": "edit", // 当前组件默认状态 文本，编辑，或者由表单状态控制 text、edit、form
          "text": { // 文本展示字段
            "type": 'label', // 什么组件展示文本 
            "field": 'name',   // 字段
          },
          "editor": {            // 编辑状态字段  日后扩充可为数组，满足条件下的组件变化
            "type": "select",
            "field": "name",
            "placeholder": "请输入",
            options: [
              { label: '东方不败', value: 0 },
              { label: '独孤求败', value: 1 },
              { label: '西门吹雪', value: 2 },
              { label: '陆小凤', value: 3 },
            ],
            "defaultValue": 3,
            labelName: 'label',
            valueName: 'value',
          }
        },
        {
          name: "勾选行",
          field: "type",
          "state": "edit", // 当前组件默认状态 文本，编辑，或者由表单状态控制 text、edit、form
          "text": { // 文本展示字段
            "type": 'label', // 什么组件展示文本 
            "field": 'type',   // 字段
          },
          "editor": {            // 编辑状态字段  日后扩充可为数组，满足条件下的组件变化
            "type": "input",
            "field": "type",  // 编辑字段于定义字段一致 （此处定义于表格相反）
            "placeholder": "请输入",
          }
        }
      ]
    },
    {
      active: false,
      disabled: false,
      name: '组件消息设置'
    },
    {
      active: false,
      disabled: false,
      name: '组件样式设置'
    }
  ];

  valueChange(v?) {
    console.log('v', v);
  }


  // 【动态生成属性】
  /*
    1.指定tab页签数据集，静态数据、动态数据
    2.tab下 分组属性-》指定分组字段
    【？】多字段 决定单属性值 




    构建组件json过程中，需要关键组件信息，生成配置，关键组件信息，动态生成标识

    [
      {id:'',大属性标识id, 子属性：'', 子属编辑组件：,组件配置：}
    ]

    datalist：[
      {
          state:add\update\del    目前只有update，结构是默认生成的
          data：{}，原始数据
          editdata：{} 编辑数据
      }
      {
        groupbyname;"大属性分类",
        showComponent:'数据展示组件',
        mapOfDataState: {
        key: {
            disabled: boolean,
            checked: boolean,
            selected: boolean,
            state: string,
            data: any,
            originData: any,
            actions?: any[],
            validation?: boolean
        }
       }
      }
   
    ]

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

   */



  public config = {
    id: "aid",
    tabskey: "", // tab 标识
    tabsInit: "",
    tabsAjaxConfig: {

    },
    tabsOptions: [
      {
        id: "",
        title: "属性",
        type: ""
      },
      {
        id: "",
        title: "事件",
        type: ""
      },
      {
        id: "",
        title: "消息",
        type: ""
      }
    ],
    tabkey: "", // 页签
    tabAjaxConfig: {
      // 获取折叠分组集合
    },
    collapsekey: "",  // 折叠分组
    collapseAjaxConfig: {
      // 获取每个分组内的属性集合list
    },
    ajaxConfig: [
      {
        id: "",

      }
    ]

  }


  public _liuconfi = {
    "cascade": {
      "active": true,
      "name": "消息及联",
      "disabled": false,
      "layout": "horizontal",
      "size": "default",
      "panelsform": {
        "messageSender": [{
          "id": "",
          "triggerType": "",
          "trigger": "",
          "sendData": [{
            "beforeSender": {},
            "receiverTriggerType": "",
            "receiverId": "",
            "receiverTrigger": ""
          }],
          "senderId": "",
          "triggerMoment": ""
        }],
        "messageReceiver": [{
          "id": "",
          "receiveData": [{
            "trigger": "",
            "triggerType": "",
            "params": [{
              "value": "",
              "name": "",
              "type": "",
              "valueName": "",
              "valueTo": ""
            }]
          }],
          "senderId": ""
        }]
      }
    },
    "condition": {
      "active": true,
      "name": "前置条件",
      "disabled": false,
      "layout": "horizontal",
      "size": "default",
      "panelsform": null
    },
    "baseProperties": {
      "active": true,
      "name": "基本属性",
      "disabled": false,
      "layout": "horizontal",
      "size": "default",
      "panelsform": {
        "isBordered": "",
        "keyId": "",
        "showTotal": "",
        "titleIcon": "",
        "pageSize": "",
        "showCheckBox": "",
        "isFrontPagination": "",
        "id": "",
        "spanWidthCofnig": "",
        "loadingOnInit": "",
        "size": "",
        "component": "",
        "title": "",
        "pageSizeOptions": "",
        "isShowSizeChange": "",
        "isPagination": ""
      }
    },
    "rowActions": {
      "active": true,
      "name": "行内操作",
      "disabled": false,
      "layout": "horizontal",
      "size": "default",
      "panelsform": null
    },
    "ajaxConfig": {
      "active": true,
      "name": "数据操作",
      "disabled": false,
      "layout": "horizontal",
      "size": "default",
      "panelsform": null
    },
    "columns": {
      "active": true,
      "name": "数据列",
      "disabled": false,
      "layout": "horizontal",
      "size": "default",
      "panelsform": null
    },
    "afterTrigger": {
      "active": true,
      "name": "后置操作",
      "disabled": false,
      "layout": "horizontal",
      "size": "default",
      "panelsform": null
    },
    "loadingConfig": {
      "active": true,
      "name": "数据加载",
      "disabled": false,
      "layout": "horizontal",
      "size": "default",
      "panelsform": {
        "method": "",
        "filter": [{
          "valueName": "",
          "type": "",
          "value": "",
          "name": ""
        }],
        "params": [{
          "valueName": "",
          "name": "",
          "value": "",
          "type": ""
        }],
        "url": ""
      }
    },
    "dialog": {
      "active": true,
      "name": "弹出页",
      "disabled": false,
      "layout": "horizontal",
      "size": "default",
      "panelsform": null
    },
    "beforeTrigger": {
      "active": true,
      "name": "前置操作",
      "disabled": false,
      "layout": "horizontal",
      "size": "default",
      "panelsform": null
    }
  }



  public M_config = [
    {
      "feild": "cascade",
      "active": true,
      "name": "消息及联",
      "disabled": false,
      "layout": "horizontal",
      "size": "default",
      "panelsform": [{
        "title": "消息发送器",
        "field": "messageSender",
        "type": "ARRAY",
        "array": [[{
          "title": "标识",
          "field": "id",
          "state": "edit",
          "text": {
            "type": "label",
            "field": "id"

          },
          "editor": {
            "type": "input",
            "field": "id",
            "placeholder": "请输入"
          }

        }, {
          "title": "触发类型",
          "field": "triggerType",
          "state": "edit",
          "text": {
            "type": "label",
            "field": "triggerType"

          },
          "editor": {
            "type": "input",
            "field": "triggerType",
            "placeholder": "请输入"
          }

        }, {
          "title": "触发内容",
          "field": "trigger",
          "state": "edit",
          "text": {
            "type": "label",
            "field": "trigger"

          },
          "editor": {
            "type": "input",
            "field": "trigger",
            "placeholder": "请输入"
          }

        }, {
          "title": "消息数据",
          "field": "sendData",
          "type": "ARRAY",
          "array": [[{
            "title": "触发前置事件",
            "field": "beforeSender",
            "type": "OBJECT",
            "object": []

          }, {
            "title": "接收消息的触发类型",
            "field": "receiverTriggerType",
            "state": "edit",
            "text": {
              "type": "label",
              "field": "receiverTriggerType"

            },
            "editor": {
              "type": "input",
              "field": "receiverTriggerType",
              "placeholder": "请输入"
            }

          }, {
            "title": "消息接收者",
            "field": "receiverId",
            "state": "edit",
            "text": {
              "type": "label",
              "field": "receiverId"

            },
            "editor": {
              "type": "input",
              "field": "receiverId",
              "placeholder": "请输入"
            }

          }, {
            "title": "接受消息的触发内容",
            "field": "receiverTrigger",
            "state": "edit",
            "text": {
              "type": "label",
              "field": "receiverTrigger"

            },
            "editor": {
              "type": "input",
              "field": "receiverTrigger",
              "placeholder": "请输入"
            }

          }]]

        }, {
          "title": "消息发送者",
          "field": "senderId",
          "state": "edit",
          "text": {
            "type": "label",
            "field": "senderId"

          },
          "editor": {
            "type": "input",
            "field": "senderId",
            "placeholder": "请输入"
          }

        }, {
          "title": "触发时机",
          "field": "triggerMoment",
          "state": "edit",
          "text": {
            "type": "label",
            "field": "triggerMoment"

          },
          "editor": {
            "type": "input",
            "field": "triggerMoment",
            "placeholder": "请输入"
          }

        }]]

      }, {
        "title": "消息接收器",
        "field": "messageReceiver",
        "type": "ARRAY",
        "array": [[{
          "title": "标识",
          "field": "id",
          "state": "edit",
          "text": {
            "type": "label",
            "field": "id"

          },
          "editor": {
            "type": "input",
            "field": "id",
            "placeholder": "请输入"
          }

        }, {
          "title": "接收消息数据",
          "field": "receiveData",
          "type": "ARRAY",
          "array": [[{
            "title": "触发消息内容",
            "field": "trigger",
            "state": "edit",
            "text": {
              "type": "label",
              "field": "trigger"

            },
            "editor": {
              "type": "input",
              "field": "trigger",
              "placeholder": "请输入"
            }

          }, {
            "title": "触发消息类型",
            "field": "triggerType",
            "state": "edit",
            "text": {
              "type": "label",
              "field": "triggerType"

            },
            "editor": {
              "type": "input",
              "field": "triggerType",
              "placeholder": "请输入"
            }

          }, {
            "title": "接收数据",
            "field": "params",
            "type": "ARRAY",
            "array": [[{
              "title": "固定值",
              "field": "value",
              "state": "edit",
              "text": {
                "type": "label",
                "field": "value"

              },
              "editor": {
                "type": "input",
                "field": "value",
                "placeholder": "请输入"
              }

            }, {
              "title": "赋值参数",
              "field": "name",
              "state": "edit",
              "text": {
                "type": "label",
                "field": "name"

              },
              "editor": {
                "type": "input",
                "field": "name",
                "placeholder": "请输入"
              }

            }, {
              "title": "取值类型",
              "field": "type",
              "state": "edit",
              "text": {
                "type": "label",
                "field": "type"

              },
              "editor": {
                "type": "input",
                "field": "type",
                "placeholder": "请输入"
              }

            }, {
              "title": "取值参数",
              "field": "valueName",
              "state": "edit",
              "text": {
                "type": "label",
                "field": "valueName"

              },
              "editor": {
                "type": "input",
                "field": "valueName",
                "placeholder": "请输入"
              }

            }, {
              "title": "参数写入对象",
              "field": "valueTo",
              "state": "edit",
              "text": {
                "type": "label",
                "field": "valueTo"

              },
              "editor": {
                "type": "input",
                "field": "valueTo",
                "placeholder": "请输入"
              }

            }]]

          }]]

        }, {
          "title": "消息发送者",
          "field": "senderId",
          "state": "edit",
          "text": {
            "type": "label",
            "field": "senderId"

          },
          "editor": {
            "type": "input",
            "field": "senderId",
            "placeholder": "请输入"
          }

        }]]

      }]
    }, {
      "feild": "condition",
      "active": true,
      "name": "前置条件",
      "disabled": false,
      "layout": "horizontal",
      "size": "default",
      "panelsform": []
    }, {
      "feild": "baseProperties",
      "active": true,
      "name": "基本属性",
      "disabled": false,
      "layout": "horizontal",
      "size": "default",
      "panelsform": [{
        "title": "是否显示边框",
        "field": "isBordered",
        "state": "edit",
        "text": {
          "type": "label",
          "field": "isBordered"

        },
        "editor": {
          "type": "input",
          "field": "isBordered",
          "placeholder": "请输入"
        }

      }, {
        "title": "数据主键",
        "field": "keyId",
        "state": "edit",
        "text": {
          "type": "label",
          "field": "keyId"

        },
        "editor": {
          "type": "input",
          "field": "keyId",
          "placeholder": "请输入"
        }

      }, {
        "title": "是否显示总页数",
        "field": "showTotal",
        "state": "edit",
        "text": {
          "type": "label",
          "field": "showTotal"

        },
        "editor": {
          "type": "input",
          "field": "showTotal",
          "placeholder": "请输入"
        }

      }, {
        "title": "标题图标",
        "field": "titleIcon",
        "state": "edit",
        "text": {
          "type": "label",
          "field": "titleIcon"

        },
        "editor": {
          "type": "input",
          "field": "titleIcon",
          "placeholder": "请输入"
        }

      }, {
        "title": "分页每页大小",
        "field": "pageSize",
        "state": "edit",
        "text": {
          "type": "label",
          "field": "pageSize"

        },
        "editor": {
          "type": "input",
          "field": "pageSize",
          "placeholder": "请输入"
        }

      }, {
        "title": "是否启用多选",
        "field": "showCheckBox",
        "state": "edit",
        "text": {
          "type": "label",
          "field": "showCheckBox"

        },
        "editor": {
          "type": "input",
          "field": "showCheckBox",
          "placeholder": "请输入"
        }

      }, {
        "title": "是否前端分页",
        "field": "isFrontPagination",
        "state": "edit",
        "text": {
          "type": "label",
          "field": "isFrontPagination"

        },
        "editor": {
          "type": "input",
          "field": "isFrontPagination",
          "placeholder": "请输入"
        }

      }, {
        "title": "标识",
        "field": "id",
        "state": "edit",
        "text": {
          "type": "label",
          "field": "id"

        },
        "editor": {
          "type": "input",
          "field": "id",
          "placeholder": "请输入"
        }

      }, {
        "title": "跨行宽度设置",
        "field": "spanWidthCofnig",
        "state": "edit",
        "text": {
          "type": "label",
          "field": "spanWidthCofnig"

        },
        "editor": {
          "type": "input",
          "field": "spanWidthCofnig",
          "placeholder": "请输入"
        }

      }, {
        "title": "是否初始化加载数据",
        "field": "loadingOnInit",
        "state": "edit",
        "text": {
          "type": "label",
          "field": "loadingOnInit"

        },
        "editor": {
          "type": "input",
          "field": "loadingOnInit",
          "placeholder": "请输入"
        }

      }, {
        "title": "尺寸",
        "field": "size",
        "state": "edit",
        "text": {
          "type": "label",
          "field": "size"

        },
        "editor": {
          "type": "input",
          "field": "size",
          "placeholder": "请输入"
        }

      }, {
        "title": "组件名称",
        "field": "component",
        "state": "edit",
        "text": {
          "type": "label",
          "field": "component"

        },
        "editor": {
          "type": "input",
          "field": "component",
          "placeholder": "请输入"
        }

      }, {
        "title": "标题",
        "field": "title",
        "state": "edit",
        "text": {
          "type": "label",
          "field": "title"

        },
        "editor": {
          "type": "input",
          "field": "title",
          "placeholder": "请输入"
        }

      }, {
        "title": "分页跨度设置",
        "field": "pageSizeOptions",
        "state": "edit",
        "text": {
          "type": "label",
          "field": "pageSizeOptions"

        },
        "editor": {
          "type": "input",
          "field": "pageSizeOptions",
          "placeholder": "请输入"
        }

      }, {
        "title": "是否启用分页跨度",
        "field": "isShowSizeChange",
        "state": "edit",
        "text": {
          "type": "label",
          "field": "isShowSizeChange"

        },
        "editor": {
          "type": "input",
          "field": "isShowSizeChange",
          "placeholder": "请输入"
        }

      }, {
        "title": "是否分页",
        "field": "isPagination",
        "state": "edit",
        "text": {
          "type": "label",
          "field": "isPagination"

        },
        "editor": {
          "type": "input",
          "field": "isPagination",
          "placeholder": "请输入"
        }

      }]
    }, {
      "feild": "rowActions",
      "active": true,
      "name": "行内操作",
      "disabled": false,
      "layout": "horizontal",
      "size": "default",
      "panelsform": [[{
        "title": "是否隐藏",
        "field": "hidden",
        "state": "edit",
        "text": {
          "type": "label",
          "field": "hidden"

        },
        "editor": {
          "type": "input",
          "field": "hidden",
          "placeholder": "请输入"
        }

      }, {
        "title": "字体颜色",
        "field": "color",
        "state": "edit",
        "text": {
          "type": "label",
          "field": "color"

        },
        "editor": {
          "type": "input",
          "field": "color",
          "placeholder": "请输入"
        }

      }, {
        "title": "初始化状态",
        "field": "state",
        "state": "edit",
        "text": {
          "type": "label",
          "field": "state"

        },
        "editor": {
          "type": "input",
          "field": "state",
          "placeholder": "请输入"
        }

      }, {
        "title": "执行操作",
        "field": "execute",
        "type": "ARRAY",
        "array": [[]]

      }, {
        "title": "标识",
        "field": "id",
        "state": "edit",
        "text": {
          "type": "label",
          "field": "id"

        },
        "editor": {
          "type": "input",
          "field": "id",
          "placeholder": "请输入"
        }

      }, {
        "title": "按钮类型",
        "field": "type",
        "state": "edit",
        "text": {
          "type": "label",
          "field": "type"

        },
        "editor": {
          "type": "input",
          "field": "type",
          "placeholder": "请输入"
        }

      }, {
        "title": "按钮尺寸",
        "field": "size",
        "state": "edit",
        "text": {
          "type": "label",
          "field": "size"

        },
        "editor": {
          "type": "input",
          "field": "size",
          "placeholder": "请输入"
        }

      }, {
        "title": "按钮内容",
        "field": "text",
        "state": "edit",
        "text": {
          "type": "label",
          "field": "text"

        },
        "editor": {
          "type": "input",
          "field": "text",
          "placeholder": "请输入"
        }

      }, {
        "title": "状态切换",
        "field": "toggle",
        "type": "OBJECT",
        "object": [{
          "title": "目标属性",
          "field": "toggleProperty",
          "state": "edit",
          "text": {
            "type": "label",
            "field": "toggleProperty"

          },
          "editor": {
            "type": "input",
            "field": "toggleProperty",
            "placeholder": "请输入"
          }

        }, {
          "title": "状态类型",
          "field": "type",
          "state": "edit",
          "text": {
            "type": "label",
            "field": "type"

          },
          "editor": {
            "type": "input",
            "field": "type",
            "placeholder": "请输入"
          }

        }, {
          "title": "状态数据",
          "field": "values",
          "type": "ARRAY",
          "array": [[{
            "title": "状态名称",
            "field": "name",
            "state": "edit",
            "text": {
              "type": "label",
              "field": "name"

            },
            "editor": {
              "type": "input",
              "field": "name",
              "placeholder": "请输入"
            }

          }, {
            "title": "状态值",
            "field": "value",
            "state": "edit",
            "text": {
              "type": "label",
              "field": "value"

            },
            "editor": {
              "type": "input",
              "field": "value",
              "placeholder": "请输入"
            }

          }]]

        }]

      }, {
        "title": "图标",
        "field": "icon",
        "state": "edit",
        "text": {
          "type": "label",
          "field": "icon"

        },
        "editor": {
          "type": "input",
          "field": "icon",
          "placeholder": "请输入"
        }

      }]]
    }, {
      "feild": "ajaxConfig",
      "active": true,
      "name": "数据操作",
      "disabled": false,
      "layout": "horizontal",
      "size": "default",
      "panelsform": [[{
        "title": "标识",
        "field": "id",
        "state": "edit",
        "text": {
          "type": "label",
          "field": "id"

        },
        "editor": {
          "type": "input",
          "field": "id",
          "placeholder": "请输入"
        }

      }, {
        "title": "url地址",
        "field": "url",
        "state": "edit",
        "text": {
          "type": "label",
          "field": "url"

        },
        "editor": {
          "type": "input",
          "field": "url",
          "placeholder": "请输入"
        }

      }, {
        "title": "执行参数",
        "field": "params",
        "type": "ARRAY",
        "array": [[{
          "title": "取值属性",
          "field": "valueName",
          "state": "edit",
          "text": {
            "type": "label",
            "field": "valueName"

          },
          "editor": {
            "type": "input",
            "field": "valueName",
            "placeholder": "请输入"
          }

        }, {
          "title": "固定值",
          "field": "value",
          "state": "edit",
          "text": {
            "type": "label",
            "field": "value"

          },
          "editor": {
            "type": "input",
            "field": "value",
            "placeholder": "请输入"
          }

        }, {
          "title": "赋值参数",
          "field": "name",
          "state": "edit",
          "text": {
            "type": "label",
            "field": "name"

          },
          "editor": {
            "type": "input",
            "field": "name",
            "placeholder": "请输入"
          }

        }, {
          "title": "取值类型",
          "field": "type",
          "state": "edit",
          "text": {
            "type": "label",
            "field": "type"

          },
          "editor": {
            "type": "input",
            "field": "type",
            "placeholder": "请输入"
          }

        }]]

      }, {
        "title": "url类型",
        "field": "urlType",
        "state": "edit",
        "text": {
          "type": "label",
          "field": "urlType"

        },
        "editor": {
          "type": "input",
          "field": "urlType",
          "placeholder": "请输入"
        }

      }, {
        "title": "执行方式",
        "field": "ajaxType",
        "state": "edit",
        "text": {
          "type": "label",
          "field": "ajaxType"

        },
        "editor": {
          "type": "input",
          "field": "ajaxType",
          "placeholder": "请输入"
        }

      }]]
    }, {
      "feild": "columns",
      "active": true,
      "name": "数据列",
      "disabled": false,
      "layout": "horizontal",
      "size": "default",
      "panelsform": [[{
        "title": "是否展开列",
        "field": "showExpand",
        "state": "edit",
        "text": {
          "type": "label",
          "field": "showExpand"

        },
        "editor": {
          "type": "input",
          "field": "showExpand",
          "placeholder": "请输入"
        }

      }, {
        "title": "自定义样式",
        "field": "style",
        "type": "OBJECT",
        "object": []

      }, {
        "title": "是否过滤",
        "field": "showFilter",
        "state": "edit",
        "text": {
          "type": "label",
          "field": "showFilter"

        },
        "editor": {
          "type": "input",
          "field": "showFilter",
          "placeholder": "请输入"
        }

      }, {
        "title": "是否隐藏",
        "field": "hidden",
        "state": "edit",
        "text": {
          "type": "label",
          "field": "hidden"

        },
        "editor": {
          "type": "input",
          "field": "hidden",
          "placeholder": "请输入"
        }

      }, {
        "title": "列类型",
        "field": "type",
        "state": "edit",
        "text": {
          "type": "label",
          "field": "type"

        },
        "editor": {
          "type": "input",
          "field": "type",
          "placeholder": "请输入"
        }

      }, {
        "title": "绑定字段",
        "field": "field",
        "state": "edit",
        "text": {
          "type": "label",
          "field": "field"

        },
        "editor": {
          "type": "input",
          "field": "field",
          "placeholder": "请输入"
        }

      }, {
        "title": "列标题",
        "field": "title",
        "state": "edit",
        "text": {
          "type": "label",
          "field": "title"

        },
        "editor": {
          "type": "input",
          "field": "title",
          "placeholder": "请输入"
        }

      }, {
        "title": "是否排序",
        "field": "showSort",
        "state": "edit",
        "text": {
          "type": "label",
          "field": "showSort"

        },
        "editor": {
          "type": "input",
          "field": "showSort",
          "placeholder": "请输入"
        }

      }, {
        "title": "编辑器",
        "field": "editor",
        "type": "OBJECT",
        "object": [{
          "title": "编辑字段",
          "field": "field",
          "state": "edit",
          "text": {
            "type": "label",
            "field": "field"

          },
          "editor": {
            "type": "input",
            "field": "field",
            "placeholder": "请输入"
          }

        }, {
          "title": "选项文本名称",
          "field": "labelName",
          "state": "edit",
          "text": {
            "type": "label",
            "field": "labelName"

          },
          "editor": {
            "type": "input",
            "field": "labelName",
            "placeholder": "请输入"
          }

        }, {
          "title": "数据选项",
          "field": "options",
          "type": "ARRAY",
          "array": [[{
            "title": "值",
            "field": "value",
            "state": "edit",
            "text": {
              "type": "label",
              "field": "value"

            },
            "editor": {
              "type": "input",
              "field": "value",
              "placeholder": "请输入"
            }

          }, {
            "title": "文本",
            "field": "label",
            "state": "edit",
            "text": {
              "type": "label",
              "field": "label"

            },
            "editor": {
              "type": "input",
              "field": "label",
              "placeholder": "请输入"
            }

          }]]

        }, {
          "title": "组件类型",
          "field": "type",
          "state": "edit",
          "text": {
            "type": "label",
            "field": "type"

          },
          "editor": {
            "type": "input",
            "field": "type",
            "placeholder": "请输入"
          }

        }, {
          "title": "选项值名称",
          "field": "valueName",
          "state": "edit",
          "text": {
            "type": "label",
            "field": "valueName"

          },
          "editor": {
            "type": "input",
            "field": "valueName",
            "placeholder": "请输入"
          }

        }, {
          "title": "默认值",
          "field": "defaultValue",
          "state": "edit",
          "text": {
            "type": "label",
            "field": "defaultValue"

          },
          "editor": {
            "type": "input",
            "field": "defaultValue",
            "placeholder": "请输入"
          }

        }]

      }, {
        "title": "宽度",
        "field": "width",
        "state": "edit",
        "text": {
          "type": "label",
          "field": "width"

        },
        "editor": {
          "type": "input",
          "field": "width",
          "placeholder": "请输入"
        }

      }]]
    }, {
      "feild": "afterTrigger",
      "active": true,
      "name": "后置操作",
      "disabled": false,
      "layout": "horizontal",
      "size": "default",
      "panelsform": []
    }, {
      "feild": "loadingConfig",
      "active": true,
      "name": "数据加载",
      "disabled": false,
      "layout": "horizontal",
      "size": "default",
      "panelsform": [{
        "title": "执行方式",
        "field": "method",
        "state": "edit",
        "text": {
          "type": "label",
          "field": "method"

        },
        "editor": {
          "type": "input",
          "field": "method",
          "placeholder": "请输入"
        }

      }, {
        "title": "过滤/查询参数",
        "field": "filter",
        "type": "ARRAY",
        "array": [
          [{
            "title": "取值参数",
            "field": "valueName",
            "state": "edit",
            "text": {
              "type": "label",
              "field": "valueName"

            },
            "editor": {
              "type": "input",
              "field": "valueName",
              "placeholder": "请输入"
            }

          }, {
            "title": "取值类型",
            "field": "type",
            "state": "edit",
            "text": {
              "type": "label",
              "field": "type"

            },
            "editor": {
              "type": "input",
              "field": "type",
              "placeholder": "请输入"
            }

          }, {
            "title": "固定值",
            "field": "value",
            "state": "edit",
            "text": {
              "type": "label",
              "field": "value"

            },
            "editor": {
              "type": "input",
              "field": "value",
              "placeholder": "请输入"
            }

          }, {
            "title": "赋值参数",
            "field": "name",
            "state": "edit",
            "text": {
              "type": "label",
              "field": "name"

            },
            "editor": {
              "type": "input",
              "field": "name",
              "placeholder": "请输入"
            }

          }]]

      }, {
        "title": "加载参数",
        "field": "params",
        "type": "ARRAY",
        "array": [[{
          "title": "赋值属性",
          "field": "valueName",
          "state": "edit",
          "text": {
            "type": "label",
            "field": "valueName"

          },
          "editor": {
            "type": "input",
            "field": "valueName",
            "placeholder": "请输入"
          }

        }, {
          "title": "参数名称",
          "field": "name",
          "state": "edit",
          "text": {
            "type": "label",
            "field": "name"

          },
          "editor": {
            "type": "input",
            "field": "name",
            "placeholder": "请输入"
          }

        }, {
          "title": "固定值",
          "field": "value",
          "state": "edit",
          "text": {
            "type": "label",
            "field": "value"

          },
          "editor": {
            "type": "input",
            "field": "value",
            "placeholder": "请输入"
          }

        }, {
          "title": "取值类型",
          "field": "type",
          "state": "edit",
          "text": {
            "type": "label",
            "field": "type"

          },
          "editor": {
            "type": "input",
            "field": "type",
            "placeholder": "请输入"
          }

        }]]

      }, {
        "title": "url地址",
        "field": "url",
        "state": "edit",
        "text": {
          "type": "label",
          "field": "url"

        },
        "editor": {
          "type": "input",
          "field": "url",
          "placeholder": "请输入"
        }

      }]
    }, {
      "feild": "dialog",
      "active": true,
      "name": "弹出页",
      "disabled": false,
      "layout": "horizontal",
      "size": "default",
      "panelsform": []
    }, {
      "feild": "beforeTrigger",
      "active": true,
      "name": "前置操作",
      "disabled": false,
      "layout": "horizontal",
      "size": "default",
      "panelsform": []
    }
  ]

  public _isArray(a) {
    return (Object.prototype.toString.call(a) === '[object Array]');
  }

  public COM_ID = "";
  public M1_config = [];
  public M12_config = [
    {
      "feild": "cascade",
      "active": true,
      "name": "消息及联",
      "disabled": false,
      "layout": "horizontal",
      "size": "default",
      "panelsform": {
        "jsonType": "object", "keyId": "9C2B2CE3-6E51-4B1D-A24B-74FAAD515B94",
        "objectJson": [{
          "title": "消息发送器",
          "field": "messageSender",
          "type": "ARRAY",
          "array": {
            "jsonType": "array", "keyId": "E1070799-E75B-4AC9-9A5B-D1A5161B9AC3", "arrayJson": {
              "jsonType": "object", "keyId": "ARcPQwJCoLE0YZsHuYyGsnFsBRchV2d2", "objectJson": [{
                "title": "标识",
                "field": "id",
                "state": "edit",
                "text": {
                  "type": "label",
                  "field": "id"

                },
                "editor": {
                  "type": "input",
                  "field": "id",
                  "placeholder": "请输入"
                }

              }, {
                "title": "触发类型",
                "field": "triggerType",
                "state": "edit",
                "text": {
                  "type": "label",
                  "field": "triggerType"

                },
                "editor": {
                  "type": "input",
                  "field": "triggerType",
                  "placeholder": "请输入"
                }

              }, {
                "title": "触发内容",
                "field": "trigger",
                "state": "edit",
                "text": {
                  "type": "label",
                  "field": "trigger"

                },
                "editor": {
                  "type": "input",
                  "field": "trigger",
                  "placeholder": "请输入"
                }

              }, {
                "title": "消息数据",
                "field": "sendData",
                "type": "ARRAY",
                "array": {
                  "jsonType": "array", "keyId": "C03FD4A4-8598-4638-B153-E7AE45DED9ED", "arrayJson": {
                    "jsonType": "object", "keyId": "lQRfJHrW6sO3fsPd7RgN8ChNtpNCFI62", "objectJson": [{
                      "title": "触发前置事件",
                      "field": "beforeSender",
                      "type": "OBJECT",
                      "object": { "jsonType": "object", "keyId": "0507BEFC-FB7D-40CF-9FBD-2F9F3A4BED70", "objectJson": [] },
                      "editor": {
                        "type": "AttributeObject",
                        "field": "beforeSender",
                        "placeholder": "请输入"
                      }

                    }, {
                      "title": "接收消息的触发类型",
                      "field": "receiverTriggerType",
                      "state": "edit",
                      "text": {
                        "type": "label",
                        "field": "receiverTriggerType"

                      },
                      "editor": {
                        "type": "input",
                        "field": "receiverTriggerType",
                        "placeholder": "请输入"
                      }

                    }, {
                      "title": "消息接收者",
                      "field": "receiverId",
                      "state": "edit",
                      "text": {
                        "type": "label",
                        "field": "receiverId"

                      },
                      "editor": {
                        "type": "input",
                        "field": "receiverId",
                        "placeholder": "请输入"
                      }

                    }, {
                      "title": "接受消息的触发内容",
                      "field": "receiverTrigger",
                      "state": "edit",
                      "text": {
                        "type": "label",
                        "field": "receiverTrigger"

                      },
                      "editor": {
                        "type": "input",
                        "field": "receiverTrigger",
                        "placeholder": "请输入"
                      }

                    }]
                  }
                },
                "editor": {
                  "type": "AttributeArray",
                  "field": "sendData",
                  "placeholder": "请输入"
                }

              }, {
                "title": "消息发送者",
                "field": "senderId",
                "state": "edit",
                "text": {
                  "type": "label",
                  "field": "senderId"

                },
                "editor": {
                  "type": "input",
                  "field": "senderId",
                  "placeholder": "请输入"
                }

              }, {
                "title": "触发时机",
                "field": "triggerMoment",
                "state": "edit",
                "text": {
                  "type": "label",
                  "field": "triggerMoment"

                },
                "editor": {
                  "type": "input",
                  "field": "triggerMoment",
                  "placeholder": "请输入"
                }

              }]
            }
          },
          "editor": {
            "type": "AttributeArray",
            "field": "messageSender",
            "placeholder": "请输入"
          }

        }, {
          "title": "消息接收器",
          "field": "messageReceiver",
          "type": "ARRAY",
          "array": {
            "jsonType": "array", "keyId": "A226BCD3-E42C-4698-851E-CDD49BBD3A19", "arrayJson": {
              "jsonType": "object", "keyId": "Izgh4qVmohcFHZ7HGwDLqCgZhcYQ4MHS", "objectJson": [{
                "title": "标识",
                "field": "id",
                "state": "edit",
                "text": {
                  "type": "label",
                  "field": "id"

                },
                "editor": {
                  "type": "input",
                  "field": "id",
                  "placeholder": "请输入"
                }

              }, {
                "title": "接收消息数据",
                "field": "receiveData",
                "type": "ARRAY",
                "array": {
                  "jsonType": "array", "keyId": "6F2B0C5C-C59F-4F34-80A1-DB360551A1C3", "arrayJson": {
                    "jsonType": "object", "keyId": "qtbQtpsGHCXGGVuwtpJWSdonqXN9Gtfl", "objectJson": [{
                      "title": "触发消息内容",
                      "field": "trigger",
                      "state": "edit",
                      "text": {
                        "type": "label",
                        "field": "trigger"

                      },
                      "editor": {
                        "type": "input",
                        "field": "trigger",
                        "placeholder": "请输入"
                      }

                    }, {
                      "title": "触发消息类型",
                      "field": "triggerType",
                      "state": "edit",
                      "text": {
                        "type": "label",
                        "field": "triggerType"

                      },
                      "editor": {
                        "type": "input",
                        "field": "triggerType",
                        "placeholder": "请输入"
                      }

                    }, {
                      "title": "接收数据",
                      "field": "params",
                      "type": "ARRAY",
                      "array": {
                        "jsonType": "array", "keyId": "19A492A8-D01B-471E-B258-2414C7FD5105", "arrayJson": {
                          "jsonType": "object", "keyId": "sy5eudlEDSEQAwduJnzhFvBUho8rityz", "objectJson": [{
                            "title": "固定值",
                            "field": "value",
                            "state": "edit",
                            "text": {
                              "type": "label",
                              "field": "value"

                            },
                            "editor": {
                              "type": "input",
                              "field": "value",
                              "placeholder": "请输入"
                            }

                          }, {
                            "title": "赋值参数",
                            "field": "name",
                            "state": "edit",
                            "text": {
                              "type": "label",
                              "field": "name"

                            },
                            "editor": {
                              "type": "input",
                              "field": "name",
                              "placeholder": "请输入"
                            }

                          }, {
                            "title": "取值类型",
                            "field": "type",
                            "state": "edit",
                            "text": {
                              "type": "label",
                              "field": "type"

                            },
                            "editor": {
                              "type": "input",
                              "field": "type",
                              "placeholder": "请输入"
                            }

                          }, {
                            "title": "取值参数",
                            "field": "valueName",
                            "state": "edit",
                            "text": {
                              "type": "label",
                              "field": "valueName"

                            },
                            "editor": {
                              "type": "input",
                              "field": "valueName",
                              "placeholder": "请输入"
                            }

                          }, {
                            "title": "参数写入对象",
                            "field": "valueTo",
                            "state": "edit",
                            "text": {
                              "type": "label",
                              "field": "valueTo"

                            },
                            "editor": {
                              "type": "input",
                              "field": "valueTo",
                              "placeholder": "请输入"
                            }

                          }]
                        }
                      },
                      "editor": {
                        "type": "AttributeArray",
                        "field": "params",
                        "placeholder": "请输入"
                      }

                    }]
                  }
                },
                "editor": {
                  "type": "AttributeArray",
                  "field": "receiveData",
                  "placeholder": "请输入"
                }

              }, {
                "title": "消息发送者",
                "field": "senderId",
                "state": "edit",
                "text": {
                  "type": "label",
                  "field": "senderId"

                },
                "editor": {
                  "type": "input",
                  "field": "senderId",
                  "placeholder": "请输入"
                }

              }]
            }
          },
          "editor": {
            "type": "AttributeArray",
            "field": "messageReceiver",
            "placeholder": "请输入"
          }

        }]
      }
    }, {
      "feild": "condition",
      "active": true,
      "name": "前置条件",
      "disabled": false,
      "layout": "horizontal",
      "size": "default",
      "panelsform": { "jsonType": "array", "keyId": "72D11F11-9129-4FA9-BE68-478FBFA3970E", "arrayJson": [] }
    }, {
      "feild": "baseProperties",
      "active": true,
      "name": "基本属性",
      "disabled": false,
      "layout": "horizontal",
      "size": "default",
      "panelsform": {
        "jsonType": "object", "keyId": "9B01D70F-4255-40E8-9E3F-CEAD1355AAA7", "objectJson": [{
          "title": "是否显示边框",
          "field": "isBordered",
          "state": "edit",
          "text": {
            "type": "label",
            "field": "isBordered"

          },
          "editor": {
            "type": "input",
            "field": "isBordered",
            "placeholder": "请输入"
          }

        }, {
          "title": "数据主键",
          "field": "keyId",
          "state": "edit",
          "text": {
            "type": "label",
            "field": "keyId"

          },
          "editor": {
            "type": "input",
            "field": "keyId",
            "placeholder": "请输入"
          }

        }, {
          "title": "是否显示总页数",
          "field": "showTotal",
          "state": "edit",
          "text": {
            "type": "label",
            "field": "showTotal"

          },
          "editor": {
            "type": "input",
            "field": "showTotal",
            "placeholder": "请输入"
          }

        }, {
          "title": "标题图标",
          "field": "titleIcon",
          "state": "edit",
          "text": {
            "type": "label",
            "field": "titleIcon"

          },
          "editor": {
            "type": "input",
            "field": "titleIcon",
            "placeholder": "请输入"
          }

        }, {
          "title": "分页每页大小",
          "field": "pageSize",
          "state": "edit",
          "text": {
            "type": "label",
            "field": "pageSize"

          },
          "editor": {
            "type": "input",
            "field": "pageSize",
            "placeholder": "请输入"
          }

        }, {
          "title": "是否启用多选",
          "field": "showCheckBox",
          "state": "edit",
          "text": {
            "type": "label",
            "field": "showCheckBox"

          },
          "editor": {
            "type": "input",
            "field": "showCheckBox",
            "placeholder": "请输入"
          }

        }, {
          "title": "是否前端分页",
          "field": "isFrontPagination",
          "state": "edit",
          "text": {
            "type": "label",
            "field": "isFrontPagination"

          },
          "editor": {
            "type": "input",
            "field": "isFrontPagination",
            "placeholder": "请输入"
          }

        }, {
          "title": "标识",
          "field": "id",
          "state": "edit",
          "text": {
            "type": "label",
            "field": "id"

          },
          "editor": {
            "type": "input",
            "field": "id",
            "placeholder": "请输入"
          }

        }, {
          "title": "跨行宽度设置",
          "field": "spanWidthCofnig",
          "state": "edit",
          "text": {
            "type": "label",
            "field": "spanWidthCofnig"

          },
          "editor": {
            "type": "input",
            "field": "spanWidthCofnig",
            "placeholder": "请输入"
          }

        }, {
          "title": "是否初始化加载数据",
          "field": "loadingOnInit",
          "state": "edit",
          "text": {
            "type": "label",
            "field": "loadingOnInit"

          },
          "editor": {
            "type": "input",
            "field": "loadingOnInit",
            "placeholder": "请输入"
          }

        }, {
          "title": "尺寸",
          "field": "size",
          "state": "edit",
          "text": {
            "type": "label",
            "field": "size"

          },
          "editor": {
            "type": "input",
            "field": "size",
            "placeholder": "请输入"
          }

        }, {
          "title": "组件名称",
          "field": "component",
          "state": "edit",
          "text": {
            "type": "label",
            "field": "component"

          },
          "editor": {
            "type": "input",
            "field": "component",
            "placeholder": "请输入"
          }

        }, {
          "title": "标题",
          "field": "title",
          "state": "edit",
          "text": {
            "type": "label",
            "field": "title"

          },
          "editor": {
            "type": "input",
            "field": "title",
            "placeholder": "请输入"
          }

        }, {
          "title": "分页跨度设置",
          "field": "pageSizeOptions",
          "state": "edit",
          "text": {
            "type": "label",
            "field": "pageSizeOptions"

          },
          "editor": {
            "type": "input",
            "field": "pageSizeOptions",
            "placeholder": "请输入"
          }

        }, {
          "title": "是否启用分页跨度",
          "field": "isShowSizeChange",
          "state": "edit",
          "text": {
            "type": "label",
            "field": "isShowSizeChange"

          },
          "editor": {
            "type": "input",
            "field": "isShowSizeChange",
            "placeholder": "请输入"
          }

        }, {
          "title": "是否分页",
          "field": "isPagination",
          "state": "edit",
          "text": {
            "type": "label",
            "field": "isPagination"

          },
          "editor": {
            "type": "input",
            "field": "isPagination",
            "placeholder": "请输入"
          }

        }]
      }
    }, {
      "feild": "rowActions",
      "active": true,
      "name": "行内操作",
      "disabled": false,
      "layout": "horizontal",
      "size": "default",
      "panelsform": {
        "jsonType": "array", "keyId": "A3F056DE-365C-4AB0-A85F-BCCDD34C427D", "arrayJson": {
          "jsonType": "object", "keyId": "MFYojRxTxcy8rk0WO1GbsAbdw8zU00Cc", "objectJson": [{
            "title": "是否隐藏",
            "field": "hidden",
            "state": "edit",
            "text": {
              "type": "label",
              "field": "hidden"

            },
            "editor": {
              "type": "input",
              "field": "hidden",
              "placeholder": "请输入"
            }

          }, {
            "title": "字体颜色",
            "field": "color",
            "state": "edit",
            "text": {
              "type": "label",
              "field": "color"

            },
            "editor": {
              "type": "input",
              "field": "color",
              "placeholder": "请输入"
            }

          }, {
            "title": "初始化状态",
            "field": "state",
            "state": "edit",
            "text": {
              "type": "label",
              "field": "state"

            },
            "editor": {
              "type": "input",
              "field": "state",
              "placeholder": "请输入"
            }

          }, {
            "title": "执行操作",
            "field": "execute",
            "type": "ARRAY",
            "array": { "jsonType": "array", "keyId": "6D2C62BF-9F98-4B70-BCF9-D9AFAA81EF6E", "arrayJson": { "jsonType": "object", "keyId": "1WHTVKcEbARAsLNOE9f5dWfEKt7r9aqJ", "objectJson": [] } },
            "editor": {
              "type": "AttributeArray",
              "field": "execute",
              "placeholder": "请输入"
            }

          }, {
            "title": "标识",
            "field": "id",
            "state": "edit",
            "text": {
              "type": "label",
              "field": "id"

            },
            "editor": {
              "type": "input",
              "field": "id",
              "placeholder": "请输入"
            }

          }, {
            "title": "按钮类型",
            "field": "type",
            "state": "edit",
            "text": {
              "type": "label",
              "field": "type"

            },
            "editor": {
              "type": "input",
              "field": "type",
              "placeholder": "请输入"
            }

          }, {
            "title": "按钮尺寸",
            "field": "size",
            "state": "edit",
            "text": {
              "type": "label",
              "field": "size"

            },
            "editor": {
              "type": "input",
              "field": "size",
              "placeholder": "请输入"
            }

          }, {
            "title": "按钮内容",
            "field": "text",
            "state": "edit",
            "text": {
              "type": "label",
              "field": "text"

            },
            "editor": {
              "type": "input",
              "field": "text",
              "placeholder": "请输入"
            }

          }, {
            "title": "状态切换",
            "field": "toggle",
            "type": "OBJECT",
            "object": {
              "jsonType": "object", "keyId": "3694F33A-F035-4339-A45D-E35A146DD234", "objectJson": [{
                "title": "目标属性",
                "field": "toggleProperty",
                "state": "edit",
                "text": {
                  "type": "label",
                  "field": "toggleProperty"

                },
                "editor": {
                  "type": "input",
                  "field": "toggleProperty",
                  "placeholder": "请输入"
                }

              }, {
                "title": "状态类型",
                "field": "type",
                "state": "edit",
                "text": {
                  "type": "label",
                  "field": "type"

                },
                "editor": {
                  "type": "input",
                  "field": "type",
                  "placeholder": "请输入"
                }

              }, {
                "title": "状态数据",
                "field": "values",
                "type": "ARRAY",
                "array": {
                  "jsonType": "array", "keyId": "59A59475-E639-4775-B4A4-CB6BDD170036", "arrayJson": {
                    "jsonType": "object", "keyId": "eGKhdLT5ZcCk6JMqZZ2gxqbbLOjLlgS2", "objectJson": [{
                      "title": "状态名称",
                      "field": "name",
                      "state": "edit",
                      "text": {
                        "type": "label",
                        "field": "name"

                      },
                      "editor": {
                        "type": "input",
                        "field": "name",
                        "placeholder": "请输入"
                      }

                    }, {
                      "title": "状态值",
                      "field": "value",
                      "state": "edit",
                      "text": {
                        "type": "label",
                        "field": "value"

                      },
                      "editor": {
                        "type": "input",
                        "field": "value",
                        "placeholder": "请输入"
                      }

                    }]
                  }
                },
                "editor": {
                  "type": "AttributeArray",
                  "field": "values",
                  "placeholder": "请输入"
                }

              }]
            },
            "editor": {
              "type": "AttributeObject",
              "field": "toggle",
              "placeholder": "请输入"
            }

          }, {
            "title": "图标",
            "field": "icon",
            "state": "edit",
            "text": {
              "type": "label",
              "field": "icon"

            },
            "editor": {
              "type": "input",
              "field": "icon",
              "placeholder": "请输入"
            }

          }]
        }
      }
    }, {
      "feild": "ajaxConfig",
      "active": true,
      "name": "数据操作",
      "disabled": false,
      "layout": "horizontal",
      "size": "default",
      "panelsform": {
        "jsonType": "array", "keyId": "87BE8EE5-0CF1-45A8-BF07-D109233C0FB3", "arrayJson": {
          "jsonType": "object", "keyId": "6y1587c2AfPu0js3mD1MmQXS82qxDX9Y", "objectJson": [{
            "title": "标识",
            "field": "id",
            "state": "edit",
            "text": {
              "type": "label",
              "field": "id"

            },
            "editor": {
              "type": "input",
              "field": "id",
              "placeholder": "请输入"
            }

          }, {
            "title": "url地址",
            "field": "url",
            "state": "edit",
            "text": {
              "type": "label",
              "field": "url"

            },
            "editor": {
              "type": "input",
              "field": "url",
              "placeholder": "请输入"
            }

          }, {
            "title": "执行参数",
            "field": "params",
            "type": "ARRAY",
            "array": {
              "jsonType": "array", "keyId": "2D542DAF-6AE2-4A79-A8F4-4FAFA4A57408", "arrayJson": {
                "jsonType": "object", "keyId": "iqOEL2tn6bS1c6nr2S3rHqihhx8WVu1u", "objectJson": [{
                  "title": "取值属性",
                  "field": "valueName",
                  "state": "edit",
                  "text": {
                    "type": "label",
                    "field": "valueName"

                  },
                  "editor": {
                    "type": "input",
                    "field": "valueName",
                    "placeholder": "请输入"
                  }

                }, {
                  "title": "固定值",
                  "field": "value",
                  "state": "edit",
                  "text": {
                    "type": "label",
                    "field": "value"

                  },
                  "editor": {
                    "type": "input",
                    "field": "value",
                    "placeholder": "请输入"
                  }

                }, {
                  "title": "赋值参数",
                  "field": "name",
                  "state": "edit",
                  "text": {
                    "type": "label",
                    "field": "name"

                  },
                  "editor": {
                    "type": "input",
                    "field": "name",
                    "placeholder": "请输入"
                  }

                }, {
                  "title": "取值类型",
                  "field": "type",
                  "state": "edit",
                  "text": {
                    "type": "label",
                    "field": "type"

                  },
                  "editor": {
                    "type": "input",
                    "field": "type",
                    "placeholder": "请输入"
                  }

                }]
              }
            },
            "editor": {
              "type": "AttributeArray",
              "field": "params",
              "placeholder": "请输入"
            }

          }, {
            "title": "url类型",
            "field": "urlType",
            "state": "edit",
            "text": {
              "type": "label",
              "field": "urlType"

            },
            "editor": {
              "type": "input",
              "field": "urlType",
              "placeholder": "请输入"
            }

          }, {
            "title": "执行方式",
            "field": "ajaxType",
            "state": "edit",
            "text": {
              "type": "label",
              "field": "ajaxType"

            },
            "editor": {
              "type": "input",
              "field": "ajaxType",
              "placeholder": "请输入"
            }

          }]
        }
      }
    }, {
      "feild": "columns",
      "active": true,
      "name": "数据列",
      "disabled": false,
      "layout": "horizontal",
      "size": "default",
      "panelsform": {
        "jsonType": "array", "keyId": "F363D6AB-E933-4F25-B318-61A3D53AE729", "arrayJson": {
          "jsonType": "object", "keyId": "eMqk5MkVcp5547xLlhR5Twnhc2Eyisuw", "objectJson": [{
            "title": "是否展开列",
            "field": "showExpand",
            "state": "edit",
            "text": {
              "type": "label",
              "field": "showExpand"

            },
            "editor": {
              "type": "input",
              "field": "showExpand",
              "placeholder": "请输入"
            }

          }, {
            "title": "自定义样式",
            "field": "style",
            "type": "OBJECT",
            "object": { "jsonType": "object", "keyId": "4BFCC77A-4192-44D8-ACB5-3DEB0AD5A979", "objectJson": [] },
            "editor": {
              "type": "AttributeObject",
              "field": "style",
              "placeholder": "请输入"
            }

          }, {
            "title": "是否过滤",
            "field": "showFilter",
            "state": "edit",
            "text": {
              "type": "label",
              "field": "showFilter"

            },
            "editor": {
              "type": "input",
              "field": "showFilter",
              "placeholder": "请输入"
            }

          }, {
            "title": "是否隐藏",
            "field": "hidden",
            "state": "edit",
            "text": {
              "type": "label",
              "field": "hidden"

            },
            "editor": {
              "type": "input",
              "field": "hidden",
              "placeholder": "请输入"
            }

          }, {
            "title": "列类型",
            "field": "type",
            "state": "edit",
            "text": {
              "type": "label",
              "field": "type"

            },
            "editor": {
              "type": "input",
              "field": "type",
              "placeholder": "请输入"
            }

          }, {
            "title": "绑定字段",
            "field": "field",
            "state": "edit",
            "text": {
              "type": "label",
              "field": "field"

            },
            "editor": {
              "type": "input",
              "field": "field",
              "placeholder": "请输入"
            }

          }, {
            "title": "列标题",
            "field": "title",
            "state": "edit",
            "text": {
              "type": "label",
              "field": "title"

            },
            "editor": {
              "type": "input",
              "field": "title",
              "placeholder": "请输入"
            }

          }, {
            "title": "是否排序",
            "field": "showSort",
            "state": "edit",
            "text": {
              "type": "label",
              "field": "showSort"

            },
            "editor": {
              "type": "input",
              "field": "showSort",
              "placeholder": "请输入"
            }

          }, {
            "title": "编辑器",
            "field": "editor",
            "type": "OBJECT",
            "object": {
              "jsonType": "object", "keyId": "D82FDA08-3F50-470A-9BDF-48AC3A8FF29E", "objectJson": [{
                "title": "编辑字段",
                "field": "field",
                "state": "edit",
                "text": {
                  "type": "label",
                  "field": "field"

                },
                "editor": {
                  "type": "input",
                  "field": "field",
                  "placeholder": "请输入"
                }

              }, {
                "title": "选项文本名称",
                "field": "labelName",
                "state": "edit",
                "text": {
                  "type": "label",
                  "field": "labelName"

                },
                "editor": {
                  "type": "input",
                  "field": "labelName",
                  "placeholder": "请输入"
                }

              }, {
                "title": "数据选项",
                "field": "options",
                "type": "ARRAY",
                "array": {
                  "jsonType": "array", "keyId": "61252A71-5EB5-48F9-ABDD-470F60209A76", "arrayJson": {
                    "jsonType": "object", "keyId": "jFnZbo1IJW2z18ybF8gYcym4deTAvATJ", "objectJson": [{
                      "title": "值",
                      "field": "value",
                      "state": "edit",
                      "text": {
                        "type": "label",
                        "field": "value"

                      },
                      "editor": {
                        "type": "input",
                        "field": "value",
                        "placeholder": "请输入"
                      }

                    }, {
                      "title": "文本",
                      "field": "label",
                      "state": "edit",
                      "text": {
                        "type": "label",
                        "field": "label"

                      },
                      "editor": {
                        "type": "input",
                        "field": "label",
                        "placeholder": "请输入"
                      }

                    }]
                  }
                },
                "editor": {
                  "type": "AttributeArray",
                  "field": "options",
                  "placeholder": "请输入"
                }

              }, {
                "title": "组件类型",
                "field": "type",
                "state": "edit",
                "text": {
                  "type": "label",
                  "field": "type"

                },
                "editor": {
                  "type": "input",
                  "field": "type",
                  "placeholder": "请输入"
                }

              }, {
                "title": "选项值名称",
                "field": "valueName",
                "state": "edit",
                "text": {
                  "type": "label",
                  "field": "valueName"

                },
                "editor": {
                  "type": "input",
                  "field": "valueName",
                  "placeholder": "请输入"
                }

              }, {
                "title": "默认值",
                "field": "defaultValue",
                "state": "edit",
                "text": {
                  "type": "label",
                  "field": "defaultValue"

                },
                "editor": {
                  "type": "input",
                  "field": "defaultValue",
                  "placeholder": "请输入"
                }

              }]
            },
            "editor": {
              "type": "AttributeObject",
              "field": "editor",
              "placeholder": "请输入"
            }

          }, {
            "title": "宽度",
            "field": "width",
            "state": "edit",
            "text": {
              "type": "label",
              "field": "width"

            },
            "editor": {
              "type": "input",
              "field": "width",
              "placeholder": "请输入"
            }

          }]
        }
      }
    }, {
      "feild": "afterTrigger",
      "active": true,
      "name": "后置操作",
      "disabled": false,
      "layout": "horizontal",
      "size": "default",
      "panelsform": { "jsonType": "array", "keyId": "89461DDD-57A5-4E01-928C-4BD715800D0D", "arrayJson": [] }
    }, {
      "feild": "loadingConfig",
      "active": true,
      "name": "数据加载",
      "disabled": false,
      "layout": "horizontal",
      "size": "default",
      "panelsform": {
        "jsonType": "object", "keyId": "71E31FF0-D563-46FA-95F5-AEEEF17F9EC5", "objectJson": [{
          "title": "执行方式",
          "field": "method",
          "state": "edit",
          "text": {
            "type": "label",
            "field": "method"

          },
          "editor": {
            "type": "input",
            "field": "method",
            "placeholder": "请输入"
          }

        }, {
          "title": "过滤/查询参数",
          "field": "filter",
          "type": "ARRAY",
          "array": {
            "jsonType": "array", "keyId": "43D25E68-1DA1-4DA7-913B-5AD057073A32", "arrayJson": {
              "jsonType": "object", "keyId": "tm23z3H3K18drjk0ADb1xuK8noRVIohY", "objectJson": [{
                "title": "取值参数",
                "field": "valueName",
                "state": "edit",
                "text": {
                  "type": "label",
                  "field": "valueName"

                },
                "editor": {
                  "type": "input",
                  "field": "valueName",
                  "placeholder": "请输入"
                }

              }, {
                "title": "取值类型",
                "field": "type",
                "state": "edit",
                "text": {
                  "type": "label",
                  "field": "type"

                },
                "editor": {
                  "type": "input",
                  "field": "type",
                  "placeholder": "请输入"
                }

              }, {
                "title": "固定值",
                "field": "value",
                "state": "edit",
                "text": {
                  "type": "label",
                  "field": "value"

                },
                "editor": {
                  "type": "input",
                  "field": "value",
                  "placeholder": "请输入"
                }

              }, {
                "title": "赋值参数",
                "field": "name",
                "state": "edit",
                "text": {
                  "type": "label",
                  "field": "name"

                },
                "editor": {
                  "type": "input",
                  "field": "name",
                  "placeholder": "请输入"
                }

              }]
            }
          },
          "editor": {
            "type": "AttributeArray",
            "field": "filter",
            "placeholder": "请输入"
          }

        }, {
          "title": "加载参数",
          "field": "params",
          "type": "ARRAY",
          "array": {
            "jsonType": "array", "keyId": "76281444-0EA4-4B09-8654-AA27BBB82A81", "arrayJson": {
              "jsonType": "object", "keyId": "FpLAw6rba1jyacSBBkDAYK8zncs12PY3", "objectJson": [{
                "title": "赋值属性",
                "field": "valueName",
                "state": "edit",
                "text": {
                  "type": "label",
                  "field": "valueName"

                },
                "editor": {
                  "type": "input",
                  "field": "valueName",
                  "placeholder": "请输入"
                }

              }, {
                "title": "参数名称",
                "field": "name",
                "state": "edit",
                "text": {
                  "type": "label",
                  "field": "name"

                },
                "editor": {
                  "type": "input",
                  "field": "name",
                  "placeholder": "请输入"
                }

              }, {
                "title": "固定值",
                "field": "value",
                "state": "edit",
                "text": {
                  "type": "label",
                  "field": "value"

                },
                "editor": {
                  "type": "input",
                  "field": "value",
                  "placeholder": "请输入"
                }

              }, {
                "title": "取值类型",
                "field": "type",
                "state": "edit",
                "text": {
                  "type": "label",
                  "field": "type"

                },
                "editor": {
                  "type": "input",
                  "field": "type",
                  "placeholder": "请输入"
                }

              }]
            }
          },
          "editor": {
            "type": "AttributeArray",
            "field": "params",
            "placeholder": "请输入"
          }

        }, {
          "title": "url地址",
          "field": "url",
          "state": "edit",
          "text": {
            "type": "label",
            "field": "url"

          },
          "editor": {
            "type": "input",
            "field": "url",
            "placeholder": "请输入"
          }

        }]
      }
    }, {
      "feild": "dialog",
      "active": true,
      "name": "弹出页",
      "disabled": false,
      "layout": "horizontal",
      "size": "default",
      "panelsform": { "jsonType": "array", "keyId": "CFA274C9-0FEC-4C52-9589-E26703780FF6", "arrayJson": [] }
    }, {
      "feild": "beforeTrigger",
      "active": true,
      "name": "前置操作",
      "disabled": false,
      "layout": "horizontal",
      "size": "default",
      "panelsform": { "jsonType": "array", "keyId": "BF2AC4D8-4091-4321-BAE5-DDDB44400FED", "arrayJson": [] }
    }
  ]



  // B_P_EDIT_ATTRIBUTE_TYPE

  public buildParameters(paramsCfg, RcomponentValue?) {
    if (!RcomponentValue) {
      RcomponentValue = {};
    }
    console.log('RcomponentValue', RcomponentValue);
    return ParameterResolver.resolve({
      params: paramsCfg,
      tempValue: this.tempValue,
      componentValue: RcomponentValue, //  组件值？返回值？级联值，需要三值参数
      initValue: this.initValue,
      cacheValue: this.cacheValue,
      router: this.routerValue,
      cascadeValue: this.cascadeValue
    });
  }

  loadingConfig = {
    "url": "sd/B_P_EDIT_ATTRIBUTE_TYPE/procedure",  // operation 操作 query
    "ajaxType": "post",
    "params": [
      {
        "name": "CODE",
        "type": "componentValue",
        "valueName": "CODE",
        "dataType": "string"
      }
    ],
    "filter": [

    ]
  }
  public async load(componentValue?) {

    const url = this.loadingConfig.url;
    const method = this.loadingConfig.ajaxType;
    const params = {
      ...this.buildParameters(this.loadingConfig.params, componentValue)
    };
    // 考虑满足 get 对象，集合，存储过程【指定dataset 来接收数据】，加载错误的信息提示
    const response = await this.componentService.apiService.post(url, params).toPromise();
    console.log("组件编辑配置加载", response.data);

    if (response.data._procedure_resultset_1[0]['W'] === "") {
      this.M1_config = [];
    }
    else {
      const CMTId = {
        name: "CMTId",
        type: "item",
        value:  this.COM_ID ,
        valueName: "CMTId",
        valueTo: "tempValue",
      };
      const ParentType = {
        name: "ParentType",
        type: "value",
        value: 3,
        valueName: "ParentType",
        valueTo: "tempValue",
      };
      let is_chang = true;
      this.changeValue.forEach(element => {
           if(element.name ==='CMTId'){
            element['value'] = this.COM_ID;
            is_chang =false;
           }
      });
      if(is_chang){
        this.changeValue = [...this.changeValue,CMTId];
      }
     

      console.log("******");
      console.log("changeValue:", this.changeValue );
      console.log("******");
      this.M1_config = JSON.parse(response.data._procedure_resultset_1[0]['W']);
     
     



    }



  }


  public js() {
    if (!this.subscription$) {
      this.subscription$ = this.componentService.commonRelationSubject.subscribe(
        data => {
          console.log('attribute 接收消息', data, this.config.id);

          if (data.options) {
            if (data.options.component) {
              if (data.options.component.type) {
                if (this.COM_ID !== data.options.component.id) {
                  this.COM_ID = data.options.component.id;
                  console.log('attribute 接收消息组件标识', data.options.component.id , this.COM_ID);
                  this.load({ CODE: data.options.component.type });
                  // 根据 标识加载数据
                  // M1_config =[];
                  // this.M1_config = this.M12_config;
                }
                else {
                  this.COM_ID = "";
                  this.M1_config = [];
                }

              }
            } else {

            }
          }
        });

    }
  }

  public setChangeValue(ChangeValues?) {
    console.log('changeValue', ChangeValues);
    // const ChangeValues = [{ name: "", value: "", valueTo: "" }];
    if (ChangeValues && ChangeValues.length > 0) {
      ChangeValues.forEach(p => {
        switch (p.valueTo) {
          case 'tempValue':
            this.tempValue[p.name] = p.value;
            break;
          case 'initValue':
            this.initValue[p.name] = p.value;
            break;
          case 'staticComponentValue':
            this.staticComponentValue[p.name] = p.value;
            break;

        }
      });
    }

  }
  public ngOnDestroy() {
    // 释放级联对象
    this.unsubscribeRelation();
    if (this.subscription$) {
      this.subscription$.unsubscribe();
    }
  }

}
