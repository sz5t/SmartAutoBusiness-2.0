import { Component, OnInit, Inject, Input, ViewChild, OnDestroy } from '@angular/core';
import { UploadFile } from 'ng-zorro-antd';
import { BSN_COMPONENT_SERVICES } from '@core/relations/bsn-relatives';
import { CnComponentBase } from '@shared/components/cn-component.base';
import { ComponentServiceProvider } from '@core/services/component/component-service.provider';
import { ParameterResolver } from '@shared/resolver/parameter/parameter.resolver';
import { CnDataFormComponent } from '@shared/components/data-form/cn-data-form.component';
import { environment } from '@env/environment';
import { CnDataTableComponent } from '@shared/components/data_table/cn-data-table.component';
import { CN_UPLOAD_PROPERTY } from '@core/relations/bsn-property/upload.property.interface.1';
import { CN_UPLOAD_METHOD } from '@core/relations/bsn-methods/upload-methods';
import { Subject, Subscription } from 'rxjs';
import { RelationResolver } from '@shared/resolver/relation/relation.resolver';
import { Console } from 'console';
import { AvatarListItemComponent } from '@delon/abc';

@Component({
  selector: 'cn-upload,[cn-upload]',
  templateUrl: './cn-upload.component.html',
  styleUrls: ['./cn-upload.component.less']
})
export class CnUploadComponent extends CnComponentBase implements OnInit, OnDestroy {
  @Input() public config; // dataTables 的配置参数
  @Input() initData;
  @Input() tempData;
  @Input() changeValue: any;
  @Input() dataServe;

  @ViewChild('fileform', { static: true }) public fileform: CnDataFormComponent;
 // @ViewChild('filetable', { static: true }) public filetable: CnDataTableComponent;

  public url = environment.SERVER_URL;


  public COMPONENT_NAME = "CnUpload";
  /**
   * 组件操作对外名称
   * 所有组件实现此属性
   */
  public COMPONENT_METHODS = CN_UPLOAD_METHOD;
  public COMPONENT_PROPERTY = CN_UPLOAD_PROPERTY;

  private _sender_source$: Subject<any>;
  private _receiver_source$: Subject<any>;
  private _trigger_source$: Subject<any>;

  private _receiver_subscription$: Subscription;
  private _sender_subscription$: Subscription;
  private _trigger_receiver_subscription$: Subscription;
  constructor(@Inject(BSN_COMPONENT_SERVICES)
  public componentService: ComponentServiceProvider) {
    super(componentService);
    this.cacheValue = this.componentService.cacheService;
    this.tempValue = {};
    this.initValue = {};
  }


  ngOnInit() {
    console.log("xxxxxxxxxxxxxxxxxxxxxx=======");
    // 将准备参数解析后导入当前组件内部变量
    this.setChangeValue(this.changeValue);
    this._initInnerValue();
    this.resolveRelations();

  }

  private resolveRelations() {
    if (this.config && this.config.cascade && this.config.cascade.messageSender) {
      if (!this._sender_source$) {
        // 解析组件发送消息配置,并注册消息发送对象
        this._sender_source$ = new RelationResolver(this).resolveSender(this.config);
        this._sender_subscription$ = this._sender_source$.subscribe();
      }

    }
    if (this.config && this.config.cascade && this.config.cascade.messageReceiver) {
      // 解析消息接受配置,并注册消息接收对象
      // this._receiver_source$ = new RelationResolver(this).resolveReceiver(this.config);
      // this._receiver_subscription$ = this._receiver_source$.subscribe();
      new RelationResolver(this).resolveReceiver(this.config);
    }

    this._trigger_source$ = new RelationResolver(this).resolve();
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


  public getCurrentComponentId() {
    return this.config.id;
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

  uploading = false;
  fileList: UploadFile[] = [];

  // 下载
  downClick() {
    window.location.href = `${this.url}file/download?ids=59f7a501-d7f6-4b20-bcd5-73dfc9a30fcd,79bc1433-3c5a-4ef1-99e7-9bfff380bd1f`;
  }

  beforeUpload = (file: UploadFile): boolean => {
    this.fileList = this.fileList.concat(file);
    return false;
  };

  execConfig = {
    "ajaxConfig": {
      "urlType": "inner", // 是否内置地址
      url: "file/upload",
      ajaxType: "post",
      params: [],
      result: []
    }
  }

  Percent = 90;
  myVar;
  async handleUpload_old(): Promise<void> {

    console.log('.>>>>>>>>>', this.initData, this.initValue);
    const fileform_value = this.fileform.validateForm.value;

    debugger;
    const formData = new FormData();
    // tslint:disable-next-line:no-any
    this.fileList.forEach((file: any, index) => {
      formData.append(`files.${index}`, file);
      formData.append(`TYPE.${index}`, index.toString());
      formData.append(`ORDER_CODE.${index}`, index.toString());
      formData.append(`SAVE_TYPE.${index}`, 'service');
      formData.append(`SECRET_LEVEL.${index}`, 'public');
      formData.append(`REMARK.${index}`, '备注');
      formData.append(`REF_DATA_ID.${index}`, 'LIUTEXT00001');
    });

    this.uploading = true;

    // You can use any AJAX library you like
    const url = this.execConfig.ajaxConfig.url;
    const params = this.buildParameters(this.execConfig.ajaxConfig.params);
    // this.fileList=[]; // 上传成功清空，上传失败，则不清除，方便第二次提交数据

    const response = await this.componentService.apiService[this.execConfig.ajaxConfig.ajaxType](url, formData).toPromise();

    if (response && response.data) {
      setTimeout(() => {
        this.uploading = false;
      }, 1000);
      this.fileList = [];
    } else {
      this.uploading = false;
    }
    //    console.log('附件提交返回',response);

    // 批量对象数据,返回结果都将以对象的形式返回,如果对应结果没有值则返回 {}
    this._sendDataSuccessMessage(response, this.execConfig.ajaxConfig.result);

    // 处理validation结果
    const validationResult = this._sendDataValidationMessage(response, this.execConfig.ajaxConfig.result);

    // 处理error结果
    const errorResult = this._sendDataErrorMessage(response, this.execConfig.ajaxConfig.result);

    // 上传成功，刷新一下表格

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



  public buildParameters(paramsCfg, returnData?, componentValue?) {
    return ParameterResolver.resolve({
      params: paramsCfg,
      tempValue: this.tempValue,
      componentValue: componentValue ? componentValue : {},
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
  _config = {
    "id": "cn_upload_01",
    "isCustomStructure": true, // 是否启用自定义内部结构
    "customStructure": {
      fileContent: { // 文件内容  表单组件
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
              "field": "SECRET_LEVEL",  // fromcontrol name  默认的字段
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
                "field": 'SECRET_LEVEL',   // 字段
              },
              "editor": {            // 编辑状态字段  日后扩充可为数组，满足条件下的组件变化
                "type": "select",
                "field": "SECRET_LEVEL",  // 编辑字段于定义字段一致 （此处定义于表格相反）
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
              "field": "REMARK",  // fromcontrol name  默认的字段
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
                "field": 'REMARK',   // 字段
              },
              "editor": {            // 编辑状态字段  日后扩充可为数组，满足条件下的组件变化
                "type": "textarea",
                "field": "REMARK",  // 编辑字段于定义字段一致 （此处定义于表格相反）
                "placeholder": "请输入",
                "autosize": {
                  minRows: 2, maxRows: 6
                },
                "validations": [  // 校验
                  { validator: "required" }
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
          },
          cascadeValue: [ // 值级联配置
          ]
        }

      },
      fileList: {  // 文件列表 表格组件
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
          "loadingOnInit": true,
          // "scroll": {
          //     "y": "300px"
          // },
          "spanWidthConfig": [
            '50px', '100px', '200px', '200px', '200px'
          ],
          "loadingConfig": {
            "url": "resource/SYS_FILE/query",
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
              "field": "ACT_NAME",
              "hidden": false,
              "showFilter": false,
              "showSort": false,
              "width": "200px",
              "style": {},
              editor: {
                "type": "input",
                "field": "ACT_NAME",
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
              "title": "备注1",
              "type": "field",
              "field": "areaCode1",
              "hidden": false,
              "showFilter": false,
              "showSort": false,
              "width": "200px",
              "style": {},
              editor: {
                "type": "selectMultiple",
                "field": "areaCode1",
                "placeholder": "请输入",
                options: [
                  { label: '东方不败', value: '0' },
                  { label: '独孤求败', value: '1' },
                  { label: '西门吹雪', value: '2' },
                  { label: '陆小凤', value: '3' },
                ],
                "defaultValue": '1,3',
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
          "customAction": [
            //   描述  新增、定位、数量叠加 或者 减少  扫码组合行为 扫码执行当前事件【暂时不处理】
            {
              id: 'scancode_addRow',   // 新增行【数量叠加】
              conent: {
                // 1.判断是否存在，如果存在，是否数量叠加 ，或者是如果存在，做信息提示
                execType: "addRow",

              }
            },
            {
              id: 'scancode_updateRow',   // 新增行【数量叠加】
              conent: {
                // 1.判断是否存在，如果存在，是否数量叠加 ，或者是如果存在，做信息提示
                execType: "addRow",

              }
            },
            {
              id: 'scancode_deleteRow',  // 删除行 【数量递减】
              conent: {
                execType: "deleteRow",

              }
            },
            {
              id: 'scancode_locateRow',  // 定位行
              conent: {
                // 如果不存在，，存在 需要完善定位页，定位行  定位行后当前行的状态 【新增，修改，删除，或者的由原来状态决定】
                execType: "locateRow",

              }
            },
          ]

        }
      }
    },
    "fileContentParams": [ // 上传附件表单映射列   conmponent ｛文件、索引,表单值｝
      {
        "name": "files",      // 文件 ，不用配置
        "type": "initValue",
        "value": "isnull",
        "valueName": "files"
      },
      {
        "name": "REF_DATA_ID",
        "type": "initValue",
        "value": "PID",
        "valueName": ""
      },
      {
        "name": "SAVE_TYPE",
        "type": "value",
        "value": "service",
        "valueName": ""
      },
      {
        "name": "SECRET_LEVEL",
        "type": "formValue",
        "value": "public",
        "valueName": "SECRET_LEVEL"
      },
      {
        "name": "REMARK",
        "type": "formValue",
        "value": "isnull",
        "valueName": "REMARK"
      },
      {
        "name": "TYPE",     // 外部传入，当前附件上传属于哪类附件，一般此处配置是表名称，或者功能名称，方便后期附件管理
        "type": "initValue",
        "value": "isnull",
        "valueName": "TYPE"
      },
      {
        "name": "ORDER_CODE",    // 排序字段，默认是当前排序
        "type": "initValue",
        "value": "isnull",
        "valueName": "ORDER_CODE"
      }
    ],
    "uploadAjaxConfig": {
      "urlType": "inner", // 是否内置地址
      "url": "file/upload",
      "ajaxType": "post",
      "params": [],
      "result": []
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



  // 上传最终配置

  fileConfig = {
    "id": "cn_upload_01",
    "type": "upload",
    "component": "upload",
    "isCustomStructure": true, // 是否启用自定义内部结构
    "customStructure": {
      "fileContent": {   // 表单字段是固定的，【不能超过api参数】
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
              "field": "SECRET_LEVEL",  // fromcontrol name  默认的字段
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
                "field": 'SECRET_LEVEL',   // 字段
              },
              "editor": {            // 编辑状态字段  日后扩充可为数组，满足条件下的组件变化
                "type": "select",
                "field": "SECRET_LEVEL",  // 编辑字段于定义字段一致 （此处定义于表格相反）
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
              "field": "REMARK",  // fromcontrol name  默认的字段
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
                "field": 'REMARK',   // 字段
              },
              "editor": {            // 编辑状态字段  日后扩充可为数组，满足条件下的组件变化
                "type": "textarea",
                "field": "REMARK",  // 编辑字段于定义字段一致 （此处定义于表格相反）
                "placeholder": "请输入",
                "autosize": {
                  minRows: 2, maxRows: 6
                },
                "validations": [  // 校验
                  { validator: "required" }
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
          },
          cascadeValue: [ // 值级联配置
          ]
        }
      },
      "fileParams": [   // conmponent ｛文件、索引｝
        {
          "name": "files",
          "type": "componentValue",
          "value": "isnull",
          "valueName": "file"
        },
        {
          "name": "REF_DATA_ID",
          "type": "initValue",
          "value": "PID",
          "valueName": "PID"
        },
        {
          "name": "SAVE_TYPE",
          "type": "value",
          "value": "service",
          "valueName": ""
        },
        {
          "name": "SECRET_LEVEL",
          "type": "componentValue",
          "value": "public",
          "valueName": "SECRET_LEVEL"
        },
        {
          "name": "REMARK",
          "type": "componentValue",
          "value": "isnull",
          "valueName": "REMARK"
        },
        {
          "name": "TYPE",     // 外部传入，当前附件上传属于哪类附件，一般此处配置是表名称，或者功能名称，方便后期附件管理
          "type": "initValue",
          "value": "isnull",
          "valueName": "TYPE"
        },

        {
          "name": "ORDER_CODE",    // 排序字段，默认是当前排序
          "type": "componentValue",
          "value": "isnull",
          "valueName": "index"
        }
      ],
      "ajaxConfig": {
        "urlType": "inner", // 是否内置地址
        "url": "file/upload",
        "ajaxType": "post",
        "params": [],
        "result": []
      }
    }


  }


  public async handleUpload() {

    let paramsCfg = [...this.config.customStructure.fileParams].filter(item=>item['name']!=='files');
   // let formData = {};
    let formData = new FormData();
    this.fileList.forEach((file: any, index) => {
      let _paramsCfg = JSON.parse(JSON.stringify(paramsCfg)); // 生成新参数
      _paramsCfg.forEach(item => {
        item['name'] = `${item['name']}.${index}`;
      });
     // console.log(_paramsCfg);
     let form_value = this.fileform.validateForm.value;
     if(this.fileform.validateForm.value){
      for (const key in form_value) {

        this.config.customStructure.fileParams.forEach(item=>{
          if(item['type'] ==='componentValue'){

            if(item['valueName']!=='index'){
              if(!form_value[item['valueName']]){
                form_value[item['valueName']] = item['value'];
              }
            }

          }
        })

      }
     } 


      let componentValue = { file: file, index: index.toString(), ...form_value };
    
      let back = this.buildParameters(_paramsCfg, {}, componentValue);
      //let f_obj={`files.${index}`:file}
      formData.append(`files.${index}`, file);
      for(var i in back) {
        formData.append(i, back[i]);
      }
      // formData = { ...formData, ...back };

    });
    this.uploading = true;
    console.log('最终数据', formData);
    const url = this.config.customStructure.ajaxConfig.url;
    const response = await this.componentService.apiService[this.config.customStructure.ajaxConfig.ajaxType](url, formData).toPromise();

    if (response && response.data) {
      setTimeout(() => {
        this.uploading = false;
      }, 1000);
      this.fileList = [];
    } else {
      this.uploading = false;
    }

    // 批量对象数据,返回结果都将以对象的形式返回,如果对应结果没有值则返回 {}
    if(this.config.customStructure.ajaxConfig.result){
      this._sendDataSuccessMessage(response, this.config.customStructure.ajaxConfig.result);

      // 处理validation结果
      const validationResult = this._sendDataValidationMessage(response, this.config.customStructure.ajaxConfig.result);
  
      // 处理error结果
      const errorResult = this._sendDataErrorMessage(response, this.config.customStructure.ajaxConfig.result);
  
  
    }


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

  
  /**
   * 显示消息框
   * @param option 
   */
  public showMessage(option) {
    let msgObj;
    if (option && Array.isArray(option)) {
      // 后续需要根据具体情况解析批量处理结果
      msgObj = this.buildMessageContent(option[0]);
    } else if (option) {
      msgObj = this.buildMessageContent(option);
    }
    option && this.componentService.msgService.create(msgObj.type, `${msgObj.message}`);
  }

  public buildMessageContent(msgObj) {
    const message: any = {};
    let array: any[];
    if (msgObj.type) {

    } else {
      array = msgObj.message.split(':');
    }

    if (!array) {
      if (msgObj.code) {
        message.message = msgObj.code;
      } else if (msgObj.message) {
        message.message = msgObj.message;
      }
      // message.message = option.code ? option.code : '';
      msgObj.field && (message.field = msgObj.field ? msgObj.field : '');
      message.type = msgObj.type;
    } else {
      message.type = array[0];
      message.message = array[1];
    }
    return message
  }





}
