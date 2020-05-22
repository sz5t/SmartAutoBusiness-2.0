import { Component, OnInit, Inject, Input } from '@angular/core';
import { UploadFile } from 'ng-zorro-antd';
import { BSN_COMPONENT_SERVICES } from '@core/relations/bsn-relatives';
import { CnComponentBase } from '@shared/components/cn-component.base';
import { ComponentServiceProvider } from '@core/services/component/component-service.provider';
import { ParameterResolver } from '@shared/resolver/parameter/parameter.resolver';

@Component({
  selector: 'cn-upload,[cn-upload]',
  templateUrl: './cn-upload.component.html',
  styleUrls: ['./cn-upload.component.less']
})
export class CnUploadComponent extends CnComponentBase implements OnInit {
  @Input()  public config; // dataTables 的配置参数
  @Input() initData;
  @Input() tempData;
  @Input() changeValue: any;
  constructor(
    @Inject(BSN_COMPONENT_SERVICES)
    public componentService: ComponentServiceProvider
) {
    super(componentService);
    this.cacheValue = this.componentService.cacheService;
    this.tempValue = {};
    this.initValue = {};
    // init cacheValue
}
  ngOnInit() {

    // 将准备参数解析后导入当前组件内部变量
    this.setChangeValue(this.changeValue);

  }

  uploading = false;
  fileList: UploadFile[] = [];

 

  beforeUpload = (file: UploadFile): boolean => {
    this.fileList = this.fileList.concat(file);
    return false;
  };

  execConfig={
    "ajaxConfig":{
      "urlType": "inner", // 是否内置地址
      url:"file/upload",
      ajaxType:"post",
      params:[]
    }
  }

  Percent=90;
  myVar;
  async handleUpload(): Promise<void> {
debugger;
    const formData = new FormData();
    // tslint:disable-next-line:no-any
    this.fileList.forEach((file: any, index) => {
      formData.append(`files.${index}`, file);
      formData.append(`TYPE.${index}`, index.toString());
      formData.append(`ORDER_CODE.${index}`,  index.toString());
      formData.append(`SAVE_TYPE.${index}`, 'service');
      formData.append(`SECRET_LEVEL.${index}`, 'public');
      formData.append(`REMARK.${index}`, '备注');
      formData.append(`REF_DATA_ID.${index}`, 'LIUTEXT00001');
    });

    this.uploading = true;

    // You can use any AJAX library you like
    const url = this.execConfig.ajaxConfig.url;
    const params = this.buildParameters( this.execConfig.ajaxConfig.params);
    this.fileList=[];

    const response = await this.componentService.apiService[this.execConfig.ajaxConfig.ajaxType](url, formData).toPromise();

    console.log('附件提交返回',response);


    setTimeout(()=>{
      this.uploading = false;
    },2000);
 


    // const response = await this.componentService.apiService[ this.execConfig.ajaxConfig.ajaxType](url, params).toPromise();

    // this._apiService.post(this.config.ajaxConfig['url'], formData).subscribe(

    // const req = new HttpRequest('POST', 'https://jsonplaceholder.typicode.com/posts/', formData, {
    //   // reportProgress: true
    // });
    // this.http
    //   .request(req)
    //   .pipe(filter(e => e instanceof HttpResponse))
    //   .subscribe(
    //     () => {
    //       this.uploading = false;
    //       this.fileList = [];
    //       this.msg.success('upload successfully.');
    //     },
    //     () => {
    //       this.uploading = false;
    //       this.msg.error('upload failed.');
    //     }
    //   );
  }



  public buildParameters(paramsCfg, returnData?) {
    return ParameterResolver.resolve({
      params: paramsCfg,
      tempValue: this.tempValue,
      componentValue: {},
      initValue: this.initValue,
      cacheValue: this.cacheValue,
      router: this.routerValue,
      returnValue: returnData ? returnData : {}
    });
  }


   /**
    *  setChangeValue 接受 初始变量值
    */
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


  /*
      【附件组件】：主要分为两部分，一部分是资源上传，一部分是资源查看
      readonly:上传资源，查看资源

      其他字段：表单描述 备注，密级等字段

      展示字段：表格配置，自定义配置 

      结构类似custom

      布局：{

      }
      组件：{
        上传组件：{
          上传所需的关键信息
        }
        表单组件：{
          完整表单配置，可级联等操作
        }
        表格组件：{
           完整表格配置
        }
      }
     
   */
  _config={
    "id":"cn_upload_01",
    "isCustomStructure":true, // 是否启用自定义内部结构
    "customStructure":{
      fileContent:{ // 文件内容  表单组件
        // 表单的组件配置
        "component": {
          "id": "form_01",
          "type": "form",
          "component": "form",
          state: 'insert',
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
                    "id": "ioj0mV1", "col": "cc", "type": "col", "title": "列ioj0mV", "span": 24, "layoutContain": "select",
                    "size": {
                      "nzXs": 24, "nzSm": 24, "nzMd": 24, "nzLg": 24, "ngXl": 24, "nzXXl": 24
                    },
                    "control": { "id": "003" }
                  }
                ]
              }]
          },
          formControls: [
            {
              id: '001',
              "hidden": true, // 字段是否隐藏
              "title": '密级',  // lable 信息
              "titleConfig": {
                required: false
              },
              "field": "inputname4",  // fromcontrol name  默认的字段
              "labelSize": {
                "span": 6,
                "nzXs": 6, "nzSm": 6, "nzMd": 6, "nzLg": 6, "ngXl": 6, "nzXXl": 6
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
                  { label: '公开', value: '1' },
                  { label: '私有', value: '2' },
                  { label: '秘密', value: '3' },
                  { label: '绝密', value: '4' }
                ],
                "validations": [  // 校验
                  { validator: "required" }
                ]
              }
            },

            {
              id: '002',
              "hidden": true, // 字段是否隐藏
              "title": '附件描述',  // lable 信息
              "titleConfig": {
                required: false
              },
              "field": "remark",  // fromcontrol name  默认的字段
              "labelSize": {
                "span": 6,
                "nzXs": 6, "nzSm": 6, "nzMd": 6, "nzLg": 6, "ngXl": 6, "nzXXl": 6
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
                "field": 'remark',   // 字段
              },
              "editor": {            // 编辑状态字段  日后扩充可为数组，满足条件下的组件变化
                "type": "textarea",
                "field": "remark",  // 编辑字段于定义字段一致 （此处定义于表格相反）
                "placeholder": "请输入",
                "autosize": {
                  minRows: 2, maxRows: 6
                },
                "validations": [  // 校验
                  { validator: "required" }
                ]
              }
            },
            {
              id: '003',
              "hidden": true, // 字段是否隐藏
              "title": '扫码',  // lable 信息
              "titleConfig": {
                required: false
              },
              "field": "remarkscancode",  // fromcontrol name  默认的字段
              "labelSize": {
                "span": 6,
                "nzXs": 6, "nzSm": 6, "nzMd": 6, "nzLg": 6, "ngXl": 6, "nzXXl": 6
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
                "field": 'remarkscancode',   // 字段
              },
              "editor": {            // 编辑状态字段  日后扩充可为数组，满足条件下的组件变化
                "type": "scancode",
                "field": "remarkscancode",  // 编辑字段于定义字段一致 （此处定义于表格相反）
                "placeholder": "请扫码",
                "loadingItemConfig": {
                  "id": "loadform_scancode"     // 通过id方式引用,ajaxConfig配置，扫码后的返回
                },
                "validations": [  // 校验
                ]
              }
            }
          ],
          formControlsPermissions: [ // 初始表单字段，描述 新增、编辑、查看 状态下的文本
            {
              formState: "insert", // 新增状态下的Controls 展示与否，是否读写属性设置
              formStateContent: { // 对当前状态的描述 ，描述当前状态下 表单组件 具备的行为，例如是否自加载，是否启用默认值
                isLoad: false,
                loadAjax: {}, // 如果启用load，是否用新的加载地址
                isDefault: true
              },
              Controls: [
             
                { id: '001', state: "edit", hidden: false, readOnly: false },
                { id: '002', state: "edit", hidden: false, readOnly: false },
             
              ]
            },
            {
              formState: "update",
              Controls: [
                { id: '001', state: "edit", hidden: false, readOnly: false },
                { id: '002', state: "edit", hidden: false, readOnly: false },
              ]
            },
            {
              formState: "text",
              Controls: [ 
                { id: '001', state: "text", hidden: false, readOnly: false },
                { id: '002', state: "text", hidden: false, readOnly: false },
              ]
            }

          ],
          ajaxConfig: [
            {
              "id": "loadform",
              "url": "resource/PROVINCE/query",
              "urlType": "inner",
              "ajaxType": "get",
              "params": [
                {
                  "name": "id",
                  "type": "tempValue",
                  "valueName": "_PID"
                }
              ],
              "outputParameters": [

              ],
              "result": [  // 描述 表单接收参数，将返回的哪些值赋给相应的组件属性

              ]
            },
            {
              "id": "loadform_scancode",
              "url": "resource/GET_SALESORDER_LIST/query",
              "urlType": "inner",
              "ajaxType": "get",
              "params": [
                {
                  "name": "id",
                  "type": "componentValue",
                  "valueName": "value",
                  "value": "value"
                }
              ],
              "outputParameters": [

              ],
              "result": [  // 描述 表单接收参数，将返回的哪些值赋给相应的组件属性

              ]
            }
          ],
          cascade: {
            // action
            "messageSender": [
              {
                  "id": "afterscanCode",
                  "senderId": "form_01",
                  "sendData": [
                      {
                          "beforeSend": {},
                          "reveicerId": "",
                          "receiverTriggerType": "ACTION",
                          "receiverTrigger": "ADD_ROW",
                          "params": [
                              {
                                  "name": "provinceName",
                                  "type": "returnValue",
                                  "valueName": "ID",
                                  "valueTo": "tempValue"
                              }
                          ]
                      }
                  ]
              }
           ],
            "messageReceiver": [
            ]
          },
          cascadeValue: [ // 值级联配置
            {
              "type": "",
              "controlId": "003",
              "name": "remarkscancode",
              "CascadeObjects": [
                  {
                      "controlId": "003",
                      "cascadeName": "remarkscancode",
                      "cascadeItems": [
                          {
                              "type": "default",
                              "content": {
                                  "type": "relation",
                                  "sender": {
                                      "name": "scanCode",
                                      "senderId": "afterscanCode"
                                  },
                                  "data": {
                                      "option": [
                                          {
                                              "name": "ID",
                                              "type": "selectObjectValue",
                                              "valueName": "ID"
                                          }
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

      },
      fileList:{  // 文件列表 表格组件
        // 表格的配置
        // 行内操作，下载，删除，修改
              "component": {
              "id": "view_01",
              "title": "附件列表",
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
              // "scroll": {
              //     "y": "300px"
              // },
              "spanWidthConfig": [
                '50px', '100px', '200px', '200px', '200px'
              ],
              "loadingConfig": {
                "url": "",
                "method": "get",
                "params": [

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
                  "title": "文件名称",
                  "type": "field",
                  "field": "provinceName",
                  "hidden": false,
                  "showFilter": false,
                  "showSort": false,
                  "width": "200px",
                  "style": {},
                  editor: {
                    "type": "input",
                    "field": "provinceName",
                    "defaultValue": '默认值'
                  }
                },
                {
                  "title": "密级",
                  "type": "field",
                  "field": "populationSize",
                  "hidden": false,
                  "showFilter": false,
                  "showSort": false,
                  "width": "80px",
                  "style": {},
                },
                {
                  "title": "创建时间",
                  "type": "field",
                  "field": "directlyUnder",
                  "hidden": false,
                  "showFilter": false,
                  "showSort": false,
                  "width": "100px",
                  "style": {},
                },
                {
                  "title": "备注",
                  "type": "field",
                  "field": "areaCode",
                  "hidden": false,
                  "showFilter": false,
                  "showSort": false,
                  "width": "200px",
                  "style": {},
                  editor: {
                    "type": "select",
                    "field": "areaCode",
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
                  "title": "操作",
                  "type": "action",
                  "actionIds": [
                    "grid_edit", "grid_cancel", "grid_save", "grid_delete", "grid_new", "grid_new_cancel"
                  ]
                }
              ],
              "cascade": {
                "messageSender": [
                ],
                "messageReceiver": [
                  {
                    "id": "",
                    "senderId": "form_01",
                    "receiveData": [
                      {
                        "beforeReceive": [],
                        "triggerType": "ACTION",
                        "trigger": "ADD_ROW",
                        "params": [
                        ]
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
                      // "conditionId": "add_save_1"
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
                  "id": "grid_delete",
                  "state": "text",
                  "text": "删除",
                  "icon": "delete",
                  "type": "link",
                  "color": "primary",
                  "size": "small",
                  "execute": [
                    {
                      "triggerType": "OPERATION",
                      "trigger": "EXECUTE_SELECTED_ROW",
                      // "conditionId": "delete_operation_1",
                      // "ajaxId": "delete_row_1"
                    }
                  ]
                }
              ],
              "condition": [
                {
                  "id": "add_state_1",
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
                  "id": "edit_state_1",
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
                  "id": "add_save_1",
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
                  "id": "edit_save_1",
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
                  "id": "cancel_edit_1",
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
                  "id": "cancel_edit_2",
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

                  ]
                },
                {
                  "id": "province_delete_1",
                  "url": "province/delete",
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
              ],
              "beforeTrigger": [

              ],
              "afterTrigger": [
                {
                  "id": "",
                  "senderId": "view_01",
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
              "customAction":[
                //   描述  新增、定位、数量叠加 或者 减少  扫码组合行为 扫码执行当前事件【暂时不处理】
                {
                  id:'scancode_addRow',   // 新增行【数量叠加】
                  conent:{
                    // 1.判断是否存在，如果存在，是否数量叠加 ，或者是如果存在，做信息提示
                    execType:"addRow",

                  }
                },
                {
                  id:'scancode_updateRow',   // 新增行【数量叠加】
                  conent:{
                    // 1.判断是否存在，如果存在，是否数量叠加 ，或者是如果存在，做信息提示
                    execType:"addRow",

                  }
                },
                {
                  id:'scancode_deleteRow',  // 删除行 【数量递减】
                  conent:{
                    execType:"deleteRow",

                  }
                },
                {
                  id:'scancode_locateRow',  // 定位行
                  conent:{
                    // 如果不存在，，存在 需要完善定位页，定位行  定位行后当前行的状态 【新增，修改，删除，或者的由原来状态决定】
                    execType:"locateRow",

                  }
                },
              ]

            }
      }
    }


    


  };

  listOfData = [
    {
      key: '1',
      name: '附件001',
      age: "公开",
      address: '工艺规程001'
    },
    {
      key: '2',
      name: '附件002',
      age: "公开",
      address: '工艺规程002'
    },
    {
      key: '3',
      name: '附件003',
      age: "公开",
      address: '工艺规程003'
    }
  ];



}
