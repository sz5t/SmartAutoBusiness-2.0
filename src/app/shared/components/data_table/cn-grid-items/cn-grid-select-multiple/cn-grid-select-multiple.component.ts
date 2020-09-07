import { Component, OnInit, Input, EventEmitter, Output, Inject, AfterViewInit } from '@angular/core';
import { CnComponentBase } from '@shared/components/cn-component.base';
import { ComponentServiceProvider } from '@core/services/component/component-service.provider';
import { BSN_COMPONENT_SERVICES } from '@core/relations/bsn-relatives';
import { ParameterResolver } from '@shared/resolver/parameter/parameter.resolver';

@Component({
  selector: 'app-cn-grid-select-multiple',
  templateUrl: './cn-grid-select-multiple.component.html',
  styleUrls: ['./cn-grid-select-multiple.component.less']
})
export class CnGridSelectMultipleComponent extends CnComponentBase implements OnInit, AfterViewInit {

  @Input() public config;
  @Input() public valueConfig;
  @Output() public updateValue = new EventEmitter();
  @Input() public state;
  @Input() public initData;
  @Input() public rowData;
  @Input() public tempData;
  public selectedValue;
  public selectOptions = [];
  public selectItems = [];
  public cascadeOptions: any;
  public myControl;
  value;
  count = 0;
  listOfSelectedValue =[];
  constructor(@Inject(BSN_COMPONENT_SERVICES)
  public componentService: ComponentServiceProvider) {
    super(componentService);
    this.initValue ={};
    this.tempValue ={};
  }

  ngOnInit() {
    // console.log('select 初始化ngOnInit=>当前表单的值',this.formGroup.value , this.config);
    // console.log('select required',this.myControl);

    if (this.initData) {
      this.initValue =this.tempData;
    } else {
      this.initValue = {};
    }
    if (this.tempData) {
      this.tempValue = this.tempData;
    } else {
      this.tempValue = {};
    }

  }

  ngAfterViewInit() {

    // console.log('ngAfterViewInit ==>' , this.config.field);
    if (this.config.loadingConfig) {
      // this.load();
    } else {
      if (this.config.options) {
        setTimeout(() => {
          this.selectOptions = this.config.options;
        });
        this.selectItems = this.config.options;
      }
    }

    let s_value;
    if (this.valueConfig) {
      s_value = this.valueConfig.value;
    }

    if (this.state === 'new') {
      if (this.config.hasOwnProperty('defaultValue')) {
        if (!this.selectedValue) {
          s_value = this.config.defaultValue;
        }
      }
    }

    setTimeout(() => {
      this.selectedValue = s_value;
      this.listOfSelectedValue = this.selectedValue.split(',');
     // this.listOfSelectedValue = this.listOfSelectedValue.filter(item=>{return true;});
      this.valueChange(this.selectedValue);
    });

  }

  // 构建参数-》下拉选择自加载数据
  public buildParameters(paramsCfg) {
    return ParameterResolver.resolve({
      params: paramsCfg,
      tempValue: this.tempValue,
      componentValue:{ value: this.selectedValue }, //  组件值？返回值？级联值，需要三值参数
      selectedRow:this.rowData,
      item:this.rowData,
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
    const url = this.config.loadingConfig['ajaxConfig'].url;
    const method = this.config.loadingConfig['ajaxConfig'].ajaxType;
    const params = {
      ...this.buildParameters(this.config.loadingConfig['ajaxConfig'].params)
    };
    // 考虑满足 get 对象，集合，存储过程【指定dataset 来接收数据】，加载错误的信息提示
    const response = await this.componentService.apiService.getRequest(url, method, { params }).toPromise();
    console.log('--da---' + this.config.field, response);
    if (response.data && response.data.length > 0) {
      const data_form = response.data;
      this.selectItems = data_form;
      const newOptions = [];
      // 下拉选项赋值
      data_form.forEach(element => {
        newOptions.push({ label: element[this.config.labelName], value: element[this.config.valueName] });
      });
      setTimeout(() => {
        this.selectOptions = newOptions;
      });


    }
    else {
      this.selectItems = [];
      this.selectOptions = [];
    }


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
      }
      if (c[this.config.field].hasOwnProperty('cascadeOptions')) {
        this.cascadeOptions = c[this.config.field].cascadeOptions;
      }
      if (c[this.config.field].hasOwnProperty('exec')) {
        if (c[this.config.field].exec === 'ajax') {
          this.load();
        }
      }
      if (c[this.config.field].hasOwnProperty('exec')) {
        if (c[this.config.field].exec === 'setOptions') {
          this.selectItems = this.cascadeOptions;
          const newOptions = [];
          // 下拉选项赋值
          this.cascadeOptions.forEach(element => {
            newOptions.push({ label: element[this.config.labelName], value: element[this.config.valueName] });
          });
          setTimeout(() => {
            this.selectOptions = newOptions;
          });
        }
        if (c[this.config.field].exec === 'setValue') {
          this.selectedValue= c[this.config.field]['setValue']['value'];
          console.log('执行级联赋值',  this.selectedValue);
       }
      }

    }

    // console.log('级联具体小组件接受=》',c );
  }


  /**
   * 值变化
   * @param v 
   */
  public async valueChange(v?) {
    console.log('多选值变化model', v);
    const backValue = { id: this.valueConfig.id, name: this.config.field, value: v, count: this.count };
    if (this.selectItems.length < 1) {
     if(this.config.loadingConfig) 
      await this.load();
    }
    // if (v) {
    //   this.listOfSelectedValue = v.split(',');
    // } else {
    //   this.listOfSelectedValue = [];
    // }

    console.log('selectMuilt 值变化', v, this.config.field, this.selectItems);
    this.count += 1;
    this.updateValue.emit(backValue);
  }

  /**
   * 多选值变化
   * @param v 
   */
  public valueChangeSelect(v?) {
    console.log('多选值变化select', v);
    const newValue = v.join(',');
    if (this.selectedValue !== newValue) {
      this.selectedValue = newValue;
      this.valueChange(this.selectedValue);
    }

  }

}

