import { debounceTime, map, switchMap } from 'rxjs/operators';
import { Component, OnInit, Input, Inject, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { BSN_COMPONENT_SERVICES } from '@core/relations/bsn-relatives';
import { ComponentServiceProvider } from '@core/services/component/component-service.provider';
import { CnComponentBase } from '@shared/components/cn-component.base';
import { ParameterResolver } from '@shared/resolver/parameter/parameter.resolver';
import { Observable, BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-cn-form-search-select',
  templateUrl: './cn-form-search-select.component.html',
  styleUrls: ['./cn-form-search-select.component.less']
})
export class CnFormSearchSelectComponent extends CnComponentBase implements OnInit, AfterViewInit {

  @Input() public config;
  @Input() formGroup: FormGroup;
  @Output() public updateValue = new EventEmitter();
  public selectedValue;
  public selectOptions = [];
  public selectItems = [];
  public cascadeOptions: any;
  public myControl;
  searchChange$ = new BehaviorSubject('');
  public isLoading = false;
  constructor(@Inject(BSN_COMPONENT_SERVICES)
  public componentService: ComponentServiceProvider) {
    super(componentService);
  }

  ngOnInit() {
    // console.log('select 初始化ngOnInit=>当前表单的值',this.formGroup.value , this.config);
    this.myControl = this.formGroup.get(this.config.field);
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
  }

  /**
   * valueChange
   */
  public async valueChange(v?) {
    // tslint:disable-next-line:forin
    // for (const i in this.formGroup.controls) {
    // this.formGroup.controls[i].markAsDirty();
    // this.formGroup.controls[i].updateValueAndValidity();
    // this.formGroup.get('inputname2')!.setValidators(Validators.required);
    // this.formGroup.get('inputname2')!.markAsDirty();
    // this.formGroup.get('inputname2')!.updateValueAndValidity();
    // }

    const backValue = { name: this.config.field, value: v, id: this.config.config.id };
    if (this.selectItems.length < 1) {
      // await this.load();
    }
    const index = this.selectItems.findIndex(item => item[this.config['valueName']] === v);
    const myControl = this.formGroup.get(this.config.field);
    if (index > -1) {
      backValue['dataItem'] = this.selectItems[index];
    } else {
      //  if(v)
      // myControl.setValue(null, { emitEvent: true });
    }
    console.log('select 值变化', v, this.config.field, this.selectItems);
    this.updateValue.emit(backValue);
  }

  // 构建参数-》下拉选择自加载数据
  public buildParameters(paramsCfg, searchValue?) {
    if (searchValue) {
      paramsCfg.forEach(p => {
        if (p.search) {
          p['type'] = "value";
          p['value'] = searchValue;
        }
      })
    }
    return ParameterResolver.resolve({
      params: paramsCfg,
      tempValue: this.tempValue,
      componentValue: this.formGroup.value, //  组件值？返回值？级联值，需要三值参数
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
    console.log('===select 自加载====>load');
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

      //   console.log('下拉选择的最终数据集===》', this.selectOptions);
      // for (const item in this.formValue) {
      //   if (data_form.hasOwnProperty(item)) {
      //     this.formValue[item] = data_form[item];
      //   }
      // }

    }
    else {
      this.selectItems = [];
      this.selectOptions = [];
    }
    // this.componentService.apiService.getRequest(url, method, { params }).subscribe(response => {
    //   if (response.data && response.data.length > 0) {
    //     const data_form = response.data;
    //     this.selectItems = data_form;
    //     const newOptions = [];
    //     // 下拉选项赋值
    //     data_form.forEach(element => {
    //       newOptions.push({ label: element[this.config.labelName], value: element[this.config.valueName] });
    //     });
    //     this.selectOptions = newOptions;
    //  //   console.log('下拉选择的最终数据集===》', this.selectOptions);
    //     // for (const item in this.formValue) {
    //     //   if (data_form.hasOwnProperty(item)) {
    //     //     this.formValue[item] = data_form[item];
    //     //   }
    //     // }

    //   }
    //   else{
    //     this.selectItems = [];
    //     this.selectOptions  =[];
    //   }


    // }, error => {
    //   console.log(error);
    // });


  }


  public onSearch(searchValue: string) {
    const url = this.config.loadingConfig['ajaxConfig'].url;
    const method = this.config.loadingConfig['ajaxConfig'].ajaxType;
    const params = {
      ...this.buildParameters(this.config.loadingConfig['ajaxConfig'].params, searchValue)
    };
    this.isLoading = true;

    const response = () => this.componentService.apiService.getRequest(url, method, { params })
      .pipe(map((res: any) => res.data ? res.data : []))
      .pipe(map((list: any) => {
        this.selectItems = list;
        return list.map((item: any) => {
          return { label: item[this.config.labelName], value: item[this.config.valueName] }
        });
      }));


    const optionList$: Observable<[{ label: string, value: any }]> = this.searchChange$.asObservable()
      .pipe(debounceTime(500))
      .pipe(switchMap(response));
    optionList$.subscribe(data => {
      this.selectOptions = data;
      this.isLoading = false;
    });




    // if (response.data && response.data.length > 0) {
    //   const data_form = response.data;
    //   this.selectItems = data_form;
    //   const newOptions = [];

    //   data_form.forEach(element => {
    //     newOptions.push({ label: element[this.config.labelName], value: element[this.config.valueName] });
    //   });
    //   setTimeout(() => {
    //     this.selectOptions = newOptions;
    //   });
    // }
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
      }

    }

    // console.log('级联具体小组件接受=》',c );
  }

}
