import { Component, OnInit, Inject, Input, EventEmitter, Output, ViewEncapsulation } from '@angular/core';
import { BSN_COMPONENT_SERVICES } from '@core/relations/bsn-relatives';
import { ComponentServiceProvider } from '@core/services/component/component-service.provider';
import { CnComponentBase } from '@shared/components/cn-component.base';
import { isArray } from 'util';
import { ParameterResolver } from '@shared/resolver/parameter/parameter.resolver';
import { CnPageComponent } from '@shared/components/cn-page/cn-page.component';

@Component({
  selector: 'cn-grid-custom-select,[cn-grid-custom-select]',
  templateUrl: './cn-grid-custom-select.component.html',
  styleUrls: ['./cn-grid-custom-select.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class CnGridCustomSelectComponent extends CnComponentBase implements OnInit {
  @Input() public config;
  @Input() public valueConfig;
  @Output() public updateValue = new EventEmitter();
  @Input() public state;
  @Input() public initData;
  @Input() public rowData;
  @Input() public tempData;

  selectedRowItem;
  value = null;
  _value = null;
  tableConfig;
  count = 0;
  _changeValue:any;

  constructor(@Inject(BSN_COMPONENT_SERVICES)
  public componentService: ComponentServiceProvider) {
    super(componentService);
  }

  tags=[];
  tags1 = [
    { "label": '我是的数据暗示', value: '01' },
    { "label": '粉丝大师的骄傲', value: '02' },
    { "label": 'SDK你打上次你说的基础节点是', value: '03' },
    { "label": '收到件案件', value: '04' },
    { "label": 'as接的就是那爱上的脑残删除 的妃娘娘口', value: '05' },
    { "label": '数据送到哪饭饭南师大的时间段', value: '06' },
    { "label": '啥的就能加快技术带你吃鸡', value: '07' },
    { "label": '驾驶的那次即可拿数控机床', value: '08' },
    { "label": '爱神的箭奶茶色', value: '09' }
  ];
  ngOnInit() {

    // 加载页面配置
    if (this.config.layoutName) {
      this.tableConfig = this.componentService.cacheService.getNone("PAGE_" + this.config.layoutName);
    }

    // if(!this.valueConfig){
    //   this.valueConfig ={
    //     id:'001',
    //     value: "9F2D4A2D-5C57-44AA-8F06-B8F5D0B96AAE,93F1C6C9-140D-42A5-9379-FE47EDA2DEEB"
    //   }  
    // }

    if(!this.initData){
      this.initData ={};
    }

    if(this.tempData){
      this.tempValue ={...this.tempData};
    }

    // 静态数据，动态数据
    let v_value;
    if (this.valueConfig) {
      v_value = this.valueConfig.value;
    }
    if (this.state === 'new') {
      if (this.config.defaultValue) {
        if (!this.value) {
          v_value = this.config.defaultValue;
        }
      }
    }

    this.value = v_value;
    this.valueChange(this.value);
  }

  handleClose(removedTag: {}): void {
    this.tags = this.tags.filter(tag => tag !== removedTag);
    // this.valueChange(this.tags);
    if (this.config.model === 'multiple') {
      this.selectedRowItem = this.valueMultipleFormat();
    } else {
      this.selectedRowItem = this.valueSingleFormat();
    }
    console.log("=================>>>>", this.selectedRowItem);
    this.value = this.selectedRowItem['value'];
    console.log('删除节点nodeList===>>>', this.tags, this.selectedRowItem);
  }

  /**
   * 将值转化 多选，转化成对象，多选将数组存储在originData MULTIPLE
   */
  valueMultipleFormat() {
    let label_value = "";
    let value_value = "";
    this.tags.forEach(item => {
      label_value += item['label'] + ',';
      value_value += item['value'] + ',';
    });

    if (this.tags.length > 0) {
      if (label_value.length > 0) {
        label_value = label_value.substr(0, label_value.length - 1);
      }
      if (value_value.length > 0) {
        value_value = value_value.substr(0, value_value.length - 1);
      }
    }
    const format_v = { label: label_value, value: value_value, originData: this.tags };
    return format_v;
  }

  /**
   * 将值转化 单选
   */
  valueSingleFormat() {


    let format_v = {};  // ={label: null,value:null, originData:null};
    if (this.tags.length > 0) {
      format_v = this.tags[0];
    } else {
      format_v = { label: null, value: null };
    }
    return format_v;
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
        // this.selectedRowItem = data_form[0];
        data_form.forEach(element => {
          element['label'] = element[this.config.labelName];
          element['value'] = element[this.config.valueName];
        });
        this.tags = data_form;
      }
      else {
        this.selectedRowItem = null;
      }
    } else {
      if (response.data) {

        const _data = response.data;
        _data['label'] = _data[this.config.labelName];
        _data['value'] = _data[this.config.valueName];
        this.tags = [];
        this.tags.push(_data);
        //  this.selectedRowItem = response.data;
      } else {
        this.selectedRowItem = null;
      }
    }

    if (this.config.model === 'multiple') {
      this.selectedRowItem = this.valueMultipleFormat();
    } else {
      this.selectedRowItem = this.valueSingleFormat();
    }



  }


  /**
   * 弹出自定义选择
   */
  createCustomModal() {
    console.log('createModal', this.initData,this.rowData);
    this.initData[this.config.targetValue ? this.config.targetValue : 'tags'] = this.tags;
    this.componentService.modalService.create({
      nzWidth: this.config.customWidth? this.config.customWidth: '85%',
      nzBodyStyle: this.config.customBodyStyle?this.config.customBodyStyle:{ overflow: 'auto' },
      nzTitle:this.config.customTitle?this.config.customTitle:'',// '自定义组件',
      //  nzContent: '可实现树+表等多种组件组合',
      nzContent: CnPageComponent,
      nzComponentParams: {
        config: this.tableConfig,
        customPageId: this.config.layoutName,
        initData: this.initData
      },
      nzClosable: false,
      nzOnOk: componentInstance => {
        console.log('OK', componentInstance.SELECTED_VALUE);
        if (componentInstance.SELECTED_VALUE) {
          this.tags = componentInstance.SELECTED_VALUE;
          this.initData[this.config.targetValue ? this.config.targetValue : 'tags'] = this.tags;
        }

        if (this.config.model === 'multiple') {
          this.selectedRowItem = this.valueMultipleFormat();
        } else {
          this.selectedRowItem = this.valueSingleFormat();
        }
        console.log("=================>>>>", this.selectedRowItem);
        this.valueChange( this.selectedRowItem['value']);
        this.value = this.selectedRowItem['value'];
      }
    });
  }

  /**
   * 值变化
   * @param v 
   */
  public async valueChange(v?) {
    console.log('自定义页面-》 值变化', v);
    // v="6IkDKuH1iXCnC5xiszniEVbbUWnOLRKm";
    if (!v) {
      this.selectedRowItem = null;
    }
    if (v) {
      if (!this.selectedRowItem) {
        await this.load();
      }
      if (this.selectedRowItem && !this.selectedRowItem.hasOwnProperty('value') && v !== this.selectedRowItem['value']) {
        await this.load();
      }
    }
    if (this.selectedRowItem) {
      const labelName = this.selectedRowItem['label'];
      if (labelName) {
        this._value = labelName;
      } else {
        this._value = v;
      }
    } else {
      this._value = v;
    }
    //  this.table.selectedRowValue = v;  !!反向写值
    const backValue = { id: this.valueConfig.id, name: this.config.field, value: v, count: this.count, dataItem: this.selectedRowItem };
    this.updateValue.emit(backValue);
    this.count += 1;
    console.log('自定义页面backValue=>', backValue)

  }

  public cascadeAnalysis(c?) {
    if (c && c.hasOwnProperty(this.config.field)) {
      if (c[this.config.field].hasOwnProperty('cascadeValue')) {
        this.cascadeValue = c[this.config.field].cascadeValue;
      }

      if (c[this.config.field].hasOwnProperty('exec')) {
        if (c[this.config.field].exec === 'ajax') {
          this.load();
        }
      }
      if (c[this.config.field].hasOwnProperty('exec')) {
        if (c[this.config.field].exec === 'setValue') {
           this.value= c[this.config.field]['setValue']['value'];
        }
      }

    }
  }


  public buildChangeValue(option:any){
    if (option.changeValue) {
      const d = ParameterResolver.resolve({
          params: option.changeValue.params,
          tempValue: this.tempValue,
          componentValue: this.rowData, // 当前行
          item:  this.selectedRowItem,
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
  
  this._changeValue =  option.changeValue ? option.changeValue.params : []
  console.log('===*****************===',option);
  }


}
