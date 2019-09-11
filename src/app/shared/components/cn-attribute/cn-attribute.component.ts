import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cn-attribute',
  templateUrl: './cn-attribute.component.html',
  styleUrls: ['./cn-attribute.component.less']
})
export class CnAttributeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
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


   */

  /**
   * load
   */
  public load() {
    // 数据集结构   业务对象？数据列表

    // 目前已数据列表解决
    // 单样 tab ，tab 和 折叠分组的关系
    // tabsajaxconfig
    // groupconfig
    // attributeconfig



  }


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
        type:""
      },
      {
        id: "",
        title: "事件",
        type:""
      },
      {
        id: "",
        title: "消息",
        type:""
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






}
