import { Component, OnInit, Input, Output, EventEmitter, Inject, ViewChild } from '@angular/core';
import { CnComponentBase } from '@shared/components/cn-component.base';
import { BSN_COMPONENT_SERVICES } from '@core/relations/bsn-relatives';
import { CfgAttributeTableComponent } from '@shared/config-components/config-attribute/cfg-attribute-item/cfg-attribute-table/cfg-attribute-table.component';
import { ComponentServiceProvider } from '@core/services/component/component-service.provider';
import { isArray } from 'util';
import { ParameterResolver } from '@shared/resolver/parameter/parameter.resolver';

@Component({
  selector: 'app-cfg-attribute-grid-select',
  templateUrl: './cfg-attribute-grid-select.component.html',
  styleUrls: ['./cfg-attribute-grid-select.component.less']
})
export class CfgAttributeGridSelectComponent extends CnComponentBase implements OnInit {
  @Input() public config;
  @Input() public valueConfig;
  @Input() public initData;
  @Input() public changeValue;
  @Output() public updateValue = new EventEmitter();
  tableConfig: any;
  _initData;
  _attributeConfig;
  value = null;
  visible = false;
  _value = null;
  _focus = false;
  _ifocus = false;
  count = 0;
  selectedRowValue;
  selectedRowItem;

  public cascadeOptions: any;
  @ViewChild('table', { static: true }) public table: CfgAttributeTableComponent;
  constructor(@Inject(BSN_COMPONENT_SERVICES)
  public componentService: ComponentServiceProvider) {
    super(componentService);
    this.tempValue = {};
  }


  // 1.渲染页面json ,获取当前节点类型的基本配置结构生成页面
  // 2. 可选择或者添加处理数据

  async ngOnInit() {
    if (this.config.changeValue) {
      this.setChangeValue(this.config.changeValue);
    }

    this.setChangeValue(this.changeValue);
    console.log('++++++', this.changeValue);
    await this.loadinitDataJson();
    await this.loadEditJson();
    this.table.load();
    // this.tableConfig = this.componentService.cacheService.getNone(this.config.layoutName);
    // if (this.config.loadingOnInit) {
    //   this.tableConfig.component['loadingOnInit'] = this.config.loadingOnInit;
    // }
    // this.tableConfig['component']=null;

    let v_value;
    if (this.valueConfig) {
      v_value = this.valueConfig.value;
    }
    this.value = v_value;
    this.valueChange1(this.value);
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

  // B_P_EDIT_ATTRIBUTE_SELECT  @CODE nvarchar(50),	@ACODE nvarchar(50) ajaxConfig
  loadEditJsonConfig = {
    "url": "resource/B_P_EDIT_ATTRIBUTE_SELECT/operate",  // operation 操作 query
    "ajaxType": "post",
    "params": [
      {
        "name": "CODE",
        "type": "tempValue",
        "valueName": "CMTCODE",
        "dataType": "string"
      },
      {
        "name": "ACODE",
        "type": "tempValue",
        "valueName": "ACODE",
        "dataType": "string",
        "value": "ajaxConfig"
      }
    ],
    "filter": [

    ]
  }

  loadDataJsonConfig = {
    "url": "resource/B_P_D_CONFIG_PROPERTY_SELECT_JSON/operate",  // operation 操作 query
    "ajaxType": "post",
    "params": [
      {
        "name": "ComponentId",
        "type": "tempValue",
        "valueName": "CMTId",
        "dataType": "string"
      },
      {
        "name": "CODE",
        "type": "tempValue",
        "valueName": "ACODE",
        "dataType": "string",
        "value": "ajaxConfig"
      }
    ],
    "filter": [

    ]
  }



  // 加载匹配数据
  async loadEditJson() {

    const url = this.loadEditJsonConfig.url;
    const method = this.loadEditJsonConfig.ajaxType;
    const params = {
      ...this.buildParameters(this.loadEditJsonConfig.params)
    };


    // 考虑满足 get 对象，集合，存储过程【指定dataset 来接收数据】，加载错误的信息提示
    const response = await this.componentService.apiService.post(url, params).toPromise();
    console.log('--selectGrid---' + this.config.field, response, params, this.value, this.loadEditJsonConfig.params);
    // [config]="{  type: 'AttributeTable', keyId:panel.panelsform.keyId, field: 'params',columns:panel.panelsform.arrayJson.objectJson}

    if (response.data._procedure_resultset_1[0]['W'] === "") {
      this.tableConfig = null;
      this._attributeConfig = null;
    }
    else {
      const d = JSON.parse(response.data._procedure_resultset_1[0]['W']);
      this.tableConfig = { type: 'AttributeTable', keyId: d.keyId, field: 'params', columns: d.arrayJson.objectJson }
      this._attributeConfig = d.arrayJson;
    }

    this.table.attributeConfig = this._attributeConfig;
    this.table.config = this.tableConfig;

  }

  async loadinitDataJson() {

    const url = this.loadDataJsonConfig.url;
    const method = this.loadDataJsonConfig.ajaxType;
    const params = {
      ...this.buildParameters(this.loadDataJsonConfig.params)
    };


    // 考虑满足 get 对象，集合，存储过程【指定dataset 来接收数据】，加载错误的信息提示
    const response = await this.componentService.apiService.post(url, params).toPromise();
    console.log('--selectGridinitData---' + this.config.field, response, params, this.value, this.loadDataJsonConfig.params);
    // [config]="{  type: 'AttributeTable', keyId:panel.panelsform.keyId, field: 'params',columns:panel.panelsform.arrayJson.objectJson}

    // tslint:disable-next-line:prefer-conditional-expression
    if (response.data._procedure_resultset_1[0]) {
      this._initData = response.data._procedure_resultset_1[0];
    }
    else {
      this._initData = null;
    }
    this.table.initData = this._initData;

  }




  /**
   * VisibleChange
   */
  public VisibleChange(v?) {

    // console.log('VisibleChange', v, this.visible);

  }
  public onRefresh() {
    this.table.load();
  }
  /**
   * onOk
   */
  public onOk() {
    console.log('ok_table', this.table);
    const xz = this.table.SelectRow;
    if (xz) {
      const labelName = xz[this.config.labelName ? this.config.labelName : 'id'];
      const valueName = xz[this.config.valueName ? this.config.valueName : 'id'];
      this.value = valueName;
      this._value = labelName ? labelName : valueName;
      this.selectedRowItem = xz;
    } else {
      this.value = null;
      this._value = null;
      this.selectedRowItem = null;
    }
    this.visible = false;
    this.valueChange1(this.value);
    console.log('ok', xz);
  }

  /**
   * onCancel
   */
  public onCancel() {
    this.visible = false;
  }

  public _onFocus() {
    // console.log('_onFocus');
    // if (!this._focus)
    //   this._focus = true;

  }
  public _onBlur() {
    // console.log('_onBlur');
    // if (this._focus)
    //   this._focus = false;
  }
  public _onMouseover() {
    setTimeout(() => {
      if (!this._ifocus)
        this._focus = true;
    }, 50);
  }
  public _onMouseout() {

    setTimeout(() => {
      if (!this._ifocus)
        this._focus = false;
    }, 50);
  }
  public _ionMouseover() {
    if (!this._ifocus)
      this._ifocus = true;
  }
  public _ionMouseout() {
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
    this.table.SelectRow = null;
    //  this.table.clearSelectRow('selectedOrchecked');
  }

  // 构建参数-》下拉选择自加载数据
  public buildParameters(paramsCfg) {
    const _componentValue = {};
    _componentValue['value'] = this.value;
    console.log(_componentValue['value']);
    return ParameterResolver.resolve({
      params: paramsCfg,
      tempValue: this.tempValue,
      componentValue: _componentValue, //  组件值？返回值？级联值，需要三值参数
      initValue: this.initValue,
      cacheValue: this.cacheValue,
      router: this.routerValue,
      cascadeValue: this.cascadeValue,
      userValue:this.userValue
    });
  }

  /**
   * load 自加载
   */
  public async load() {
    // 【参数不全是否阻止加载！】
    // 对后续业务判断有影响
    console.log('===select 自加载====>load');
    this.selectedRowItem = null;
    return;
    if (!this.config.loadingItemConfig['ajaxConfig']) {
      this.selectedRowItem = null;
      return;
    }
    const url = this.config.loadingItemConfig['ajaxConfig'].url;
    const method = this.config.loadingItemConfig['ajaxConfig'].ajaxType;
    const params = {
      ...this.buildParameters(this.config.loadingItemConfig['ajaxConfig'].params)
    };


    // 考虑满足 get 对象，集合，存储过程【指定dataset 来接收数据】，加载错误的信息提示
    const response = await this.componentService.apiService.getRequest(url, method, { params }).toPromise();
    console.log('--da---' + this.config.field, response, params, this.value, this.config.loadingItemConfig['ajaxConfig'].params);
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
    console.log("xxx", v);
  }
  public async valueChange1(v?) {
    console.log('select ---------- valueChange 1', v);
    //  labelName: 'provinceName',
    // valueName: 'id',
    // ,dataItem: item
    // tslint:disable-next-line:forin
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
    this.table.SelectRow = v;
    const backValue = { id: this.valueConfig.id, name: this.config.field, value: v, count: this.count, dataItem: this.selectedRowItem };
    // const backValue = { name: this.config.field, value: v, id: this.config.config.id, dataItem: this.selectedRowItem };
    this.updateValue.emit(backValue);
    this.count += 1;
    console.log('backValue=>', backValue)
    // 3 青海

  }
  /**
   * 级联分析
   */
  public cascadeAnalysis(c?) {
    // 分类完善信息，此处完善的信息为 异步参数处理
    // cascadeValue
    if (c && c.hasOwnProperty(this.config.field)) {
      if (c[this.config.field].hasOwnProperty('cascadeValue')) {
        this.cascadeValue = c[this.config.field].cascadeValue;
        console.log('cascadeValue', this.cascadeValue);
      }
      if (c[this.config.field].hasOwnProperty('cascadeOptions')) {
        this.cascadeOptions = c[this.config.field].cascadeOptions;
      }
      if (c[this.config.field].hasOwnProperty('exec')) {
        if (c[this.config.field].exec === 'ajax') {

          // this.load();

          // this.table.setInitValue(this.cascadeValue);
          // this.table.load();
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

  public remoteOperation() {

  }

}
