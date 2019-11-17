import { Component, OnInit, Input, Output, EventEmitter, ViewChild, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CnDataTableComponent } from '@shared/components/data_table/cn-data-table.component';
import { CnComponentBase } from '@shared/components/cn-component.base';
import { BSN_COMPONENT_SERVICES } from '@core/relations/bsn-relatives';
import { ComponentServiceProvider } from '@core/services/component/component-service.provider';
import { ParameterResolver } from '@shared/resolver/parameter/parameter.resolver';
import { isArray } from 'util';

@Component({
  selector: 'app-cn-form-grid-select',
  templateUrl: './cn-form-grid-select.component.html',
  styleUrls: ['./cn-form-grid-select.component.less']
})
export class CnFormGridSelectComponent extends CnComponentBase implements OnInit {
  @Input() public config;
  @Input() formGroup: FormGroup;
  @Output() public updateValue = new EventEmitter();
  tableConfig: any;
  value = null;
  visible = false;
  _value = null;
  _focus = false;
  _ifocus = false;

  selectedRowValue;
  selectedRowItem;
  public cascadeOptions: any;
  @ViewChild('table', { static: true }) public table: CnDataTableComponent;
  constructor(@Inject(BSN_COMPONENT_SERVICES)
  public componentService: ComponentServiceProvider) {
    super(componentService);
  }

  ngOnInit() {
    this.tableConfig = this.componentService.cacheService.getNone(this.config.layoutName);
    // 静态数据，动态数据
  }



  /**
   * VisibleChange
   */
  public VisibleChange(v?) {

    // console.log('VisibleChange', v, this.visible);

  }
  /**
   * onOk
   */
  public onOk() {
    const xz = this.table.ROW_SELECTED;
    if (xz) {
      const labelName = xz[this.config.labelName];
      const valueName = xz[this.config.valueName];
      this.value = valueName;
      this._value = labelName ? labelName : valueName;
      this.selectedRowItem = xz;
    } else {
      this.value = null;
      this._value = null;
      this.selectedRowItem = null;
    }
    this.visible = false;

    console.log('ok', xz);
  }

  /**
   * onCancel
   */
  public onCancel() {
    this.visible = false;
  }

  private _onFocus() {
    // console.log('_onFocus');
    // if (!this._focus)
    //   this._focus = true;

  }
  private _onBlur() {
    // console.log('_onBlur');
    // if (this._focus)
    //   this._focus = false;
  }
  private _onMouseover() {
    setTimeout(() => {
      if (!this._ifocus)
        this._focus = true;
    }, 50);
  }
  private _onMouseout() {

    setTimeout(() => {
      if (!this._ifocus)
        this._focus = false;
    }, 50);
  }
  private _ionMouseover() {
    if (!this._ifocus)
      this._ifocus = true;
  }
  private _ionMouseout() {
    if (this._ifocus)
      this._ifocus = false;
  }

  /**
   * 数据清空
   */
  public valueClear() {
    console.log('valueClear');
    this._value = null;
    this.value = null;
    this._ifocus = false;
    this.value = null;
    this.selectedRowItem = null;
    this.table.selectedRowValue = null;
    this.table.clearSelectRow('selectedOrchecked');
  }

  // 构建参数-》下拉选择自加载数据
  public buildParameters(paramsCfg) {
    return ParameterResolver.resolve({
      params: paramsCfg,
      tempValue: this.tempValue,
      componentValue: { value: this.value }, //  组件值？返回值？级联值，需要三值参数
      initValue: this.initValue,
      cacheValue: this.cacheValue,
      router: this.routerValue,
      cascadeValue: this.cascadeValue
    });
  }

  /**
   * load 自加载
   */
  public async load() {
    // 【参数不全是否阻止加载！】
    // 对后续业务判断有影响
    //  console.log('===select 自加载====>load');
    const url = this.config.loadingItemConfig['ajaxConfig'].url;
    const method = this.config.loadingItemConfig['ajaxConfig'].ajaxType;
    const params = {
      ...this.buildParameters(this.config.loadingItemConfig['ajaxConfig'].params)
    };
    // 考虑满足 get 对象，集合，存储过程【指定dataset 来接收数据】，加载错误的信息提示
    const response = await this.componentService.apiService.getRequest(url, method, { params }).toPromise();
    console.log('--da---' + this.config.field, response);
    if (isArray(response.data)) {
      if (response.data && response.data.length > 0) {
        const data_form = response.data;
        this.selectedRowItem = data_form[0];
      }
      else {
        this.selectedRowItem = null;
      }
    } else {
      if (response.data) {
        this.selectedRowItem = response.data;
      } else {
        this.selectedRowItem = null;
      }
    }



  }

  public async valueChange(v?) {
    //  labelName: 'provinceName',
    // valueName: 'id',
    // ,dataItem: item
    // tslint:disable-next-line:forin
    this.value = v;
    if (!v) {
      this.selectedRowItem = null;
    }
    if (v) {
      if (!this.selectedRowItem) {
        await this.load();
      }
      if (this.selectedRowItem && !this.selectedRowItem.hasOwnProperty(this.config.valueName)) {
        await this.load();
      }
    }
    if (this.selectedRowItem) {
      const labelName = this.selectedRowItem[this.config.labelName];
      if (labelName) {
        this._value = labelName;
      } else {
        this._value = v;
      }
    } else {
      this._value = v;
    }
    this.table.selectedRowValue = v;
    const backValue = { name: this.config.field, value: v, id: this.config.config.id, dataItem: this.selectedRowItem };
    this.updateValue.emit(backValue);

    console.log('backValue=>', backValue)
    // 3 青海

  }
  /**
   * 级联分析
   */
  public cascadeAnalysis(c?) {
    // 分类完善信息，此处完善的信息为 异步参数处理
    // cascadeValue
    if (c.hasOwnProperty(this.config.field)) {
      if (c[this.config.field].hasOwnProperty('cascadeValue')) {
        this.cascadeValue = c[this.config.field].cascadeValue;
        console.log('cascadeValue', this.cascadeValue);
      }
      if (c[this.config.field].hasOwnProperty('cascadeOptions')) {
        this.cascadeOptions = c[this.config.field].cascadeOptions;
      }
      if (c[this.config.field].hasOwnProperty('exec')) {
        if (c[this.config.field].exec === 'ajax') {
          this.load();

          this.table.setInitValue(this.cascadeValue);
          this.table.load();
        }
      }
      if (c[this.config.field].hasOwnProperty('exec')) {
        if (c[this.config.field].exec === 'setOptions') {
          //  this.selectItems =  this.cascadeOptions;
          const newOptions = [];
          // 下拉选项赋值
          this.cascadeOptions.forEach(element => {
            newOptions.push({ label: element[this.config.labelName], value: element[this.config.valueName] });
          });
          setTimeout(() => {
            //  this.selectOptions = newOptions;
          });
        }
      }
    }
  }


  // public tableConfig = {
  //   "component": {
  //     "id": "view_01select",
  //     "title": "主表",
  //     "titleIcon": "right-circle",
  //     "component": "cnDataTable",
  //     "keyId": "id",
  //     "size": "small",
  //     "isBordered": true,
  //     "isFrontPagination": false,
  //     "isPagination": true,
  //     "isShowSizeChanger": true,
  //     "showTotal": true,
  //     "pageSize": 5,
  //     "showCheckBox": false,
  //     "pageSizeOptions": [10, 20, 50, 100],
  //     "loadingOnInit": true,
  //     "isSelected": true,
  //     // "scroll": {
  //     //     "y": "300px"
  //     // },
  //     "spanWidthConfig": [
  //       //  '50px', '100px', '200px', '200px', '200px'
  //     ],
  //     "loadingConfig": {
  //       "url": "province/page",
  //       "method": "get",
  //       "params": [

  //       ],
  //       "filter": [

  //       ]
  //     },
  //     "columns": [
  //       {
  //         "title": "ID",
  //         "type": "field",
  //         "field": "id",
  //         "hidden": true,
  //         "showFilter": false,
  //         "showSort": false,
  //         "isShowExpand": false,
  //         "width": "50px",
  //         "style": {}
  //       },
  //       {
  //         "title": "省名称",
  //         "type": "field",
  //         "field": "provinceName",
  //         "hidden": false,
  //         "showFilter": false,
  //         "showSort": false,
  //         "width": "50px",
  //         "style": {},
  //       },
  //       {
  //         "title": "人口",
  //         "type": "field",
  //         "field": "populationSize",
  //         "hidden": false,
  //         "showFilter": false,
  //         "showSort": false,
  //         "width": "30px",
  //         "style": {},
  //       },
  //       {
  //         "title": "直辖",
  //         "type": "field",
  //         "field": "directlyUnder",
  //         "hidden": false,
  //         "showFilter": false,
  //         "showSort": false,
  //         "width": "30px",
  //         "style": {},
  //       },
  //       {
  //         "title": "区号",
  //         "type": "field",
  //         "field": "areaCode",
  //         "hidden": false,
  //         "showFilter": false,
  //         "showSort": false,
  //         "width": "30px",
  //         "style": {},
  //       },
  //       {
  //         "title": "创建日期",
  //         "type": "field",
  //         "field": "createDate",
  //         "hidden": false,
  //         "showFilter": false,
  //         "showSort": false,
  //         "width": "60px",
  //         "style": {},
  //       },
  //       {
  //         "title": "优势",
  //         "type": "field",
  //         "field": "remark",
  //         "hidden": false,
  //         "showFilter": false,
  //         "showSort": false,
  //         "width": "100px",
  //         "style": {},
  //       },

  //       // {
  //       //     "title": "message",
  //       //     "type": "field",
  //       //     "field": "MESSAGE",
  //       //     "hidden": false,
  //       //     "showFilter": false,
  //       //     "showSort": false,
  //       //     "width": "150px",
  //       //     "style": {}
  //       // },
  //       // {
  //       //     "title": "language",
  //       //     "type": "field",
  //       //     "field": "LANGUAGE",
  //       //     "hidden": false,
  //       //     "showFilter": false,
  //       //     "showSort": false,
  //       //     "isExpand": true,
  //       //     "width": "400px",
  //       //     "style": {}
  //       // },
  //     ],
  //     "cascade": {
  //       "messageSender": [
  //       ],
  //       "messageReceiver": [
  //         {
  //           "id": "",
  //           "senderId": "form_01",
  //           "receiveData": [
  //             {
  //               "beforeReceive": [],
  //               "triggerType": "BEHAVIOR",
  //               "trigger": "REFRESH_AS_CHILD",
  //               "params": [
  //               ]
  //             }
  //           ]
  //         }
  //       ]

  //     },
  //     "rowActions": [
  //       {
  //         "id": "grid_new",
  //         "state": "new",
  //         "text": "保存",
  //         "icon": "save",
  //         "color": "text-primary",
  //         "type": "link",
  //         "size": "small",
  //         "hidden": false,
  //         "execute": [
  //           {
  //             "triggerType": "OPERATION",
  //             "trigger": "SAVE_ROW",
  //             "ajaxId": "province_save_1",
  //             // "stateId": "add_save_1",
  //             // "conditionId": "add_save_1"
  //           }
  //         ],
  //         "toggle": {
  //           "type": "state",
  //           "toggleProperty": "hidden",
  //           "values": [
  //             {
  //               "name": "new",
  //               "value": false
  //             },
  //             {
  //               "name": "text",
  //               "value": true
  //             }
  //           ]
  //         }
  //       },
  //       {
  //         "id": "grid_new_cancel",
  //         "state": "new",
  //         "text": "取消",
  //         "icon": "rollback",
  //         "color": "text-primary",
  //         "type": "link",
  //         "size": "small",
  //         "hidden": false,
  //         "execute": [
  //           {
  //             "triggerType": "STATE",
  //             "trigger": "CANCEL_NEW_ROW",
  //             // "ajaxId": "add_save_1",
  //             // "stateId": "add_save_1",
  //             // "conditionId": "add_save_1"
  //           }
  //         ],
  //         "toggle": {
  //           "type": "state",
  //           "toggleProperty": "hidden",
  //           "values": [
  //             {
  //               "name": "new",
  //               "value": false
  //             },
  //             {
  //               "name": "text",
  //               "value": true
  //             }
  //           ]
  //         }
  //       },
  //       {
  //         "id": "grid_edit",
  //         "state": "text",
  //         "text": "编辑",
  //         "icon": "edit",
  //         "color": "text-primary",
  //         "type": "link",
  //         "size": "small",
  //         "hidden": false,
  //         "execute": [
  //           {
  //             "triggerType": "STATE",
  //             "trigger": "EDIT_ROW",
  //             // "ajaxId": "add_save_1",
  //             // "stateId": "add_save_1",
  //             // "conditionId": "add_save_1"
  //           }
  //         ],
  //         "toggle": {
  //           "type": "state",
  //           "toggleProperty": "hidden",
  //           "values": [
  //             {
  //               "name": "edit",
  //               "value": true
  //             },
  //             {
  //               "name": "text",
  //               "value": false
  //             }
  //           ]
  //         }
  //       },
  //       {
  //         "id": "grid_cancel",
  //         "state": "text",
  //         "text": "取消",
  //         "icon": "rollback",
  //         "color": "text-primary",
  //         "type": "link",
  //         "size": "small",
  //         "hidden": true,
  //         "execute": [
  //           {
  //             "triggerType": "STATE",
  //             "trigger": "CANCEL_EDIT_ROW",
  //             // "ajaxId": "add_save_1",
  //             // "stateId": "add_save_1",
  //             // "conditionId": "cancel_edit_1"
  //           }
  //         ],
  //         "toggle": {
  //           "type": "state",
  //           "toggleProperty": "hidden",
  //           "values": [
  //             {
  //               "name": "edit",
  //               "value": false
  //             },
  //             {
  //               "name": "text",
  //               "value": true
  //             }
  //           ]
  //         }
  //       },
  //       {
  //         "id": "grid_save",
  //         "state": "text",
  //         "text": "保存",
  //         "icon": "save",
  //         "color": "text-primary",
  //         "type": "link",
  //         "size": "small",
  //         "hidden": true,
  //         "execute": [
  //           {
  //             "triggerType": "OPERATION",
  //             "trigger": "SAVE_ROW",
  //             "ajaxId": "province_edit_1",
  //             // "stateId": "add_save_1",
  //             // "conditionId": "add_save_1"
  //           }
  //         ],
  //         "toggle": {
  //           "type": "state",
  //           "toggleProperty": "hidden",
  //           "values": [
  //             {
  //               "name": "edit",
  //               "value": false
  //             },
  //             {
  //               "name": "text",
  //               "value": true
  //             }
  //           ]
  //         }
  //       },
  //       {
  //         "id": "grid_delete",
  //         "state": "text",
  //         "text": "删除",
  //         "icon": "delete",
  //         "type": "link",
  //         "color": "primary",
  //         "size": "small",
  //         "execute": [
  //           {
  //             "triggerType": "OPERATION",
  //             "trigger": "EXECUTE_SELECTED_ROW",
  //             // "conditionId": "delete_operation_1",
  //             // "ajaxId": "delete_row_1"
  //           }
  //         ]
  //       }
  //     ],
  //     "condition": [
  //       {
  //         "id": "add_state_1",
  //         "state": [
  //           {
  //             "type": "component",
  //             "valueName": "ROWS_CHECKED",
  //             "expression": [
  //               {
  //                 "type": "property",
  //                 "name": "length",
  //                 "matchValue": 0,
  //                 "match": "gt"
  //               },
  //               {
  //                 "type": "element",
  //                 "name": "name",
  //                 "matchValue": "1",
  //                 "match": "eq",
  //               }
  //             ]
  //           }
  //         ]
  //       },
  //       {
  //         "id": "edit_state_1",
  //         "state": [
  //           {
  //             "type": "component",
  //             "valueName": "ROWS_CHECKED",
  //             "expression": [
  //               {
  //                 "type": "property",
  //                 "name": "length",
  //                 "matchValue": 0,
  //                 "match": "gt"
  //               }
  //             ]
  //           }
  //         ]
  //       },
  //       {
  //         "id": "add_save_1",
  //         "state": [
  //           {
  //             "type": "component",
  //             "valueName": "ROWS_CHECKED",
  //             "expression": [
  //               {
  //                 "type": "property",
  //                 "name": "length",
  //                 "matchValue": 0,
  //                 "match": "gt"
  //               }
  //             ]
  //           },
  //           {
  //             "type": "component",
  //             "valueName": "ROWS_ADDED",
  //             "expression": [
  //               {
  //                 "type": "property",
  //                 "name": "length",
  //                 "matchValue": 0,
  //                 "match": "gt"
  //               }
  //             ]
  //           }
  //         ]
  //       },
  //       {
  //         "id": "edit_save_1",
  //         "state": [
  //           {
  //             "type": "component",
  //             "valueName": "ROWS_EDITED",
  //             "expression": [
  //               {
  //                 "type": "property",
  //                 "name": "length",
  //                 "matchValue": 0,
  //                 "match": "gt"
  //               }
  //             ]
  //           },
  //           {
  //             "type": "component",
  //             "valueName": "ROWS_CHECKED",
  //             "expression": [
  //               {
  //                 "type": "property",
  //                 "name": "length",
  //                 "matchValue": 0,
  //                 "match": "gt"
  //               }
  //             ]
  //           }
  //         ]
  //       },
  //       {
  //         "id": "cancel_edit_1",
  //         "state": [
  //           {
  //             "type": "component",
  //             "valueName": "ROWS_EDITED",
  //             "expression": [
  //               {
  //                 "type": "property",
  //                 "name": "length",
  //                 "matchValue": 0,
  //                 "match": "eq"
  //               }
  //             ]
  //           }
  //         ]
  //       },
  //       {
  //         "id": "cancel_edit_2",
  //         "state": [
  //           {
  //             "type": "component",
  //             "valueName": "ROWS_ADDED",
  //             "expression": [
  //               {
  //                 "type": "property",
  //                 "name": "length",
  //                 "matchValue": 0,
  //                 "match": "eq"
  //               }
  //             ]
  //           }
  //         ]
  //       }

  //     ],
  //     "ajaxConfig": [
  //       {
  //         "id": "province_save_1",
  //         "url": "province/insert ",
  //         "urlType": "inner",
  //         "ajaxType": "post",
  //         "params": [
  //           {
  //             "name": "provinceName",
  //             "type": "componentValue",
  //             "valueName": "provinceName",
  //             "dataType": "string"
  //           },
  //           {
  //             "name": "populationSize",
  //             "type": "componentValue",
  //             "valueName": "populationSize",
  //             "dataType": "number"
  //           },
  //           {
  //             "name": "directlyUnder",
  //             "type": "componentValue",
  //             "valueName": "directlyUnder",
  //             "dataType": "number"
  //           },
  //           {
  //             "name": "areaCode",
  //             "type": "componentValue",
  //             "valueName": "areaCode",
  //             "dataType": "number"
  //           },
  //           {
  //             "name": "createDate",
  //             "type": "componentValue",
  //             "valueName": "createDate",
  //             "dataType": "string"
  //           }
  //         ],
  //         "outputParameters": [

  //         ],
  //         "result": [
  //           {
  //             "name": "data",
  //             "showMessageWithNext": 0,
  //             "message": "message.ajax.state.success",
  //             "senderId": "grid_sender_01"
  //           },
  //           // {
  //           //     "name": "validation",
  //           //     "senderId": "grid_sender_02"
  //           // },
  //           // {
  //           //     "name": "error",
  //           //     "senderId": "grid_sender_03"
  //           // }
  //         ]
  //       },
  //       {
  //         "id": "province_edit_1",
  //         "url": "province/update",
  //         "urlType": "inner",
  //         "ajaxType": "put",
  //         "params": [
  //           {
  //             "name": "provinceName",
  //             "type": "componentValue",
  //             "valueName": "provinceName",
  //             "dataType": "string"
  //           },
  //           {
  //             "name": "populationSize",
  //             "type": "componentValue",
  //             "valueName": "populationSize",
  //             "dataType": "int"
  //           },
  //           {
  //             "name": "directlyUnder",
  //             "type": "componentValue",
  //             "valueName": "directlyUnder",
  //             "dataType": "int"
  //           },
  //           {
  //             "name": "areaCode",
  //             "type": "componentValue",
  //             "valueName": "areaCode",
  //             "dataType": "int"
  //           },
  //           {
  //             "name": "createDate",
  //             "type": "componentValue",
  //             "valueName": "createDate",
  //             "dataType": "string"
  //           },
  //           {
  //             "name": "id",
  //             "type": "componentValue",
  //             "valueName": "id",
  //             "dataType": "string"
  //           }
  //         ],
  //         "outputParameters": [

  //         ],
  //         "result": [

  //         ]
  //       },
  //       {
  //         "id": "province_delete_1",
  //         "url": "province/delete",
  //         "urlType": "inner",
  //         "ajaxType": "delete",
  //         "params": [
  //           {
  //             "name": "ids",
  //             "type": "CHECKED_ROWS_ID",
  //             "value": "_ids"
  //           }
  //         ],
  //         "outputParameters": [

  //         ],
  //         "result": [

  //         ]
  //       }
  //     ],
  //     "beforeTrigger": [

  //     ],
  //     "afterTrigger": [
  //       {
  //         "id": "",
  //         "senderId": "view_01",
  //         "sendData": [
  //           {
  //             "beforeSend": [],
  //             "reveicerId": "",
  //             "receiverTriggerType": "BEHAVIOR",
  //             "receiverTrigger": "REFRESH_AS_CHILD",
  //             "params": [
  //               {
  //                 "name": "parent_id",
  //                 "type": "item",
  //                 "valueName": "id"
  //               },
  //               {
  //                 "name": "parent_name",
  //                 "type": "item",
  //                 "valueName": "name"
  //               }
  //             ]
  //           }
  //         ]
  //       }
  //     ]

  //   }
  // }

}
