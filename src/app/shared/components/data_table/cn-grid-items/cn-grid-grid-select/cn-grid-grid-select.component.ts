import { Component, OnInit, Input, Output, EventEmitter, ViewChild, Inject } from '@angular/core';
import { CnComponentBase } from '@shared/components/cn-component.base';
import { CnDataTableComponent } from '@shared/components/data_table/cn-data-table.component';
import { BSN_COMPONENT_SERVICES } from '@core/relations/bsn-relatives';
import { ComponentServiceProvider } from '@core/services/component/component-service.provider';
import { ParameterResolver } from '@shared/resolver/parameter/parameter.resolver';
import { isArray } from 'util';

@Component({
  selector: 'app-cn-grid-grid-select',
  templateUrl: './cn-grid-grid-select.component.html',
  styleUrls: ['./cn-grid-grid-select.component.less']
})
export class CnGridGridSelectComponent  extends CnComponentBase implements OnInit {

  @Input() public config;
  @Input() public valueConfig;
  @Output() public updateValue = new EventEmitter();
  @Input() public state;
  tableConfig: any;
  value = null;
  visible = false;
  _value = null;
  _focus = false;
  _ifocus = false;
  count=0;
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
    // this._componentRef.instance.config = this.config;

    // console.log('组件实例数组+++', this.componentService.com );

    // this.componentService.com.forEach(item=>{
    //   if(item.hasOwnProperty('view_business_main')){
    //     console.log('liu组件选中的值', item['view_business_main']['instance']['ROW_SELECTED']);
    //   }
    // });

    // 静态数据，动态数据
    let v_value;
    if (this.valueConfig) {
      v_value = this.valueConfig.value;
    }
    if(this.state ==='new'){
      if (this.config.defaultValue) {
        if (!this.value) {
          v_value = this.config.defaultValue;
        }
      }
    }

    setTimeout(() => {
      this.value =v_value;
      this.valueChange1( this.value);
    });
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
    this.valueChange1( this.value);
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
      componentValue: { value: this._value }, //  组件值？返回值？级联值，需要三值参数
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
    if(!this.config.loadingItemConfig['ajaxConfig']){
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
    console.log("xxx",v);
  }
  public async valueChange1(v?) {
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
    this.table.selectedRowValue = v;
    const backValue ={id:this.valueConfig.id,name:this.config.field,value:v,count:this.count,dataItem: this.selectedRowItem};
   // const backValue = { name: this.config.field, value: v, id: this.config.config.id, dataItem: this.selectedRowItem };
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



}
