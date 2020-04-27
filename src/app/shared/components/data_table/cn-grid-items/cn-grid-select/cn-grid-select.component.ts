import { Component, OnInit, AfterViewInit, Input, EventEmitter, Output, Inject } from '@angular/core';
import { CnComponentBase } from '@shared/components/cn-component.base';
import { BSN_COMPONENT_SERVICES } from '@core/relations/bsn-relatives';
import { ComponentServiceProvider } from '@core/services/component/component-service.provider';
import { ParameterResolver } from '@shared/resolver/parameter/parameter.resolver';

@Component({
  selector: 'app-cn-grid-select',
  templateUrl: './cn-grid-select.component.html',
  styleUrls: ['./cn-grid-select.component.less']
})
export class CnGridSelectComponent extends CnComponentBase implements OnInit, AfterViewInit {

  @Input() public config;
  @Input() public valueConfig;
  @Output() public updateValue = new EventEmitter();
  @Input() public state;
  public selectedValue;
  public selectOptions = [];
  public selectItems = [];
  public cascadeOptions: any;
  public myControl;
  count = 0;
  constructor(@Inject(BSN_COMPONENT_SERVICES)
  public componentService: ComponentServiceProvider) {
    super(componentService);
  }

  ngOnInit() {
    // console.log('select 初始化ngOnInit=>当前表单的值',this.formGroup.value , this.config);
    // console.log('select required',this.myControl);



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
      this.valueChange(this.selectedValue);
    });

  }

  /**
   * valueChange
   */
  public async valueChange(v?) {
    const backValue = { id: this.valueConfig.id, name: this.config.field, value: v, count: this.count };
    if (this.selectItems.length < 1) {
      await this.load();
    }
    const index = this.selectItems.findIndex(item => item[this.config['valueName']] === v);
    if (index > -1) {
      backValue['dataItem'] = this.selectItems[index];
    } else {
      //  if(v)
      // myControl.setValue(null, { emitEvent: true });
    }
    console.log('select 值变化', v, this.config.field, this.selectItems);

    this.updateValue.emit(backValue);
    this.count += 1;
  }

  // 构建参数-》下拉选择自加载数据
  public buildParameters(paramsCfg) {
    return ParameterResolver.resolve({
      params: paramsCfg,
      tempValue: this.tempValue,
      componentValue: this.selectedValue, //  组件值？返回值？级联值，需要三值参数
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

}
