import { Component, OnInit, Inject, ChangeDetectionStrategy, Input, OnDestroy, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { BSN_COMPONENT_SERVICES } from '@core/relations/bsn-relatives';
import { ComponentServiceProvider } from '@core/services/component/component-service.provider';
import { ParameterResolver } from '@shared/resolver/parameter/parameter.resolver';
import { CnComponentBase } from '@shared/components/cn-component.base';
import { CommonUtils } from '@core/utils/common-utils';
import { IDataFormProperty, CN_DATA_FORM_PROPERTY } from '@core/relations/bsn-property/data-form.property.interface';
import { CN_DATA_FORM_METHOD } from '@core/relations/bsn-methods';
import { RelationResolver } from '@shared/resolver/relation/relation.resolver';
import { Subject, Subscription } from 'rxjs';

@Component({
  selector: 'cn-data-form',
  templateUrl: './cn-data-form.component.html',
  styleUrls: ['./cn-data-form.component.less'],
 // changeDetection: ChangeDetectionStrategy.Default
})
export class CnDataFormComponent extends CnComponentBase implements OnInit, OnDestroy,OnChanges, IDataFormProperty,AfterViewInit {

 

  @Input() public config;
  validateForm: FormGroup;
  controlArray: any[] = [];
  value;
  formControlObj: any = {};
  ajaxConfigObj: any = {};
  formValue: any = {}; // 表单值
  formCascade = {}; // 级联信息
  fromFieldPermissions;  // 表单字段权限
  //  字段权限 于状态有关，insert、update、text 3大状态下 某个小组件的状态，
  // 有一套dufault 配置，用户权限加载后合并当前 字段权限，再处理一次，以每个control 控制
  /**
   * 组件名称
   * 所有组件实现此属性 
   */
  public COMPONENT_NAME = "CnDataForm";
  /**
   * 组件操作对外名称
   * 所有组件实现此属性
   */
  public COMPONENT_METHODS = CN_DATA_FORM_METHOD;

  public COMPONENT_PROPERTY = CN_DATA_FORM_PROPERTY;
  public FORM_VALUE: any = {}; // 当前表单组件值
  public FORM_STATE: any;  // 表单的状态=》新增、修改、展示
  private _sender_source$: Subject<any>;
  private _receiver_source$: Subject<any>;
  private _trigger_source$: Subject<any>;

  private _receiver_subscription$: Subscription;
  private _sender_subscription$: Subscription;
  private _trigger_receiver_subscription$: Subscription;

  constructor(private fb: FormBuilder, @Inject(BSN_COMPONENT_SERVICES)
  public componentService: ComponentServiceProvider) {
    super(componentService);
  }

  ngOnInit() {
    // 动态构建表单的初始默认值, 校验规则
    // this.validateForm = this.fb.group({
    //   code: ['liu', [Validators.required]],
    //   inputname2: [null, [Validators.required]],
    //   inputname5: ['', [Validators.required]],

    // });
     this.validateForm = this.fb.group({});

    // 生成Controls
    this.createControls( this.validateForm);
    // 生成表单的异步请求  ajaxConfigObj 对象
    this.config.ajaxConfig.forEach(ajax => {
      this.ajaxConfigObj[ajax.id] = ajax;
    });


    // 将异步请求结果拼接组装到 controls、load ，方便后面程序解析。
    if (this.config.loadingConfig) { // 构建load异步请求
      this.config.loadingConfig['ajaxConfig'] = this.ajaxConfigObj[this.config.loadingConfig.id];
    }

    // 生成表单formControlObj 对象
    this.config.formControls.forEach(Control => {
      if (Control.editor) {
        if (Control.editor.loadingConfig) {
          Control.editor['loadingConfig']['ajaxConfig'] = this.ajaxConfigObj[Control.editor.loadingConfig.id];
        }
      }
      this.formControlObj[Control.id] = Control;
    });
    // 初始化表单状态
    this. formStateChange(this.config.state);

    // 解析及联配置
    this.resolveRelations();
    // => 正则校验
    /*     this.validateForm = this.fb.group({
          userName: ['', [Validators.required], [this.userNameAsyncValidator]],
          email: ['', [Validators.email, Validators.required]],
          password: ['', [Validators.required]],
          confirm: ['', [this.confirmValidator]],
          comment: ['', [Validators.required]]
        });
     */

    this.load();
  }

  ngAfterViewInit(): void {
    console.log('*******ngAfterViewInit********');
    this.load();
  }

  ngOnChanges(changes: SimpleChanges) {
    if(this.validateForm){
      console.log('form 变化', this.validateForm);
    }
  }
  /**
   * Controls 生成（根据配置信息生成Controls）
   */
  private createControls(f) {
   // const controls = Object.keys(this.validateForm.controls);
    // controls.forEach(control => this.validateForm.removeControl(control));

    this.config.formControls.forEach(Control => {
      if (Control.text && Control.editor) {
        if (Control.text.field === Control.editor.field) {
          f.addControl(`${Control.field}`, new FormControl());
          this.formValue[Control.field] = null;
        }
        else {
         f.addControl(`${Control.text.field}`, new FormControl());
          this.formValue[Control.text.field] = null;
          f.addControl(`${Control.editor.field}`, new FormControl());
          this.formValue[Control.editor.field] = null;
        }
      }
      else {
        if (Control.text) {
          f.addControl(`${Control.text.field}`, new FormControl());
          this.formValue[Control.text.field] = null;
        }
        if (Control.editor) {
          f.addControl(`${Control.editor.field}`, new FormControl());
          this.formValue[Control.editor.field] = null;
        }
      }
      this.formCascade[Control.id] = {};
    });
  }

  public createGroup() {
    const controls = [];
    const group = this.fb.group({});
    // this.
    controls.forEach(control => {
      group.addControl(control.name, this.createControl(control));
    });
    return group;
  }

  public createControl(control) {
    const { disabled, value } = control;
    const validations = this.getValidations(control.validations);
    return this.fb.control({ disabled, value }, validations);
  }


  /**
   * 生成 校验规则
   */
  public getValidations(validations) {
    const validation = [];
    validations &&
      validations.forEach(valid => {
        if (valid.validator === 'required' || valid.validator === 'email') {
          validation.push(Validators[valid.validator]);
        } else if (
          valid.validator === 'minLength' ||
          valid.validator === 'maxLength'
        ) {
          validation.push(Validators[valid.validator](valid.length));
        } else if (valid.validator === 'pattern') {
          validation.push(Validators[valid.validator](valid.pattern));
        }
      });
    return validation;
  }

  /**
   * Controls 状态生成（根据配置信息生成Controls 的状态）
   * @param state 
   */
  private ControlsPermissions(state?) {
    // const ob = JSON.parse(JSON.stringify( this.formControlObj));
    this.config.formControlsPermissions.forEach(items => {
     //  debugger;
      if (items.formState === state) {
        items.Controls.forEach(Control => {
          this.formControlObj[Control.id].state = Control.state;
          // 读写等操作 未处理
          // 将 Control 的其他行为也写入
        });

      }
    });
    console.log('ControlsPermissions', this.formControlObj);
  }
  /**
   * formStateChange  表单状态切换=》 编辑状态、新增状态、浏览状态
   * 状态切换时，可根据权限控制 formControls 的字段读写权限
   * @param state 
   */
  public formStateChange(state?) {
     // insert  update   text  新增、修改、查看 3种状态切换
    this. FORM_STATE =  state;
    // 新增状态可填写默认值，其他状态无默认值
    this.ControlsPermissions(this. FORM_STATE);
  }

  /**
   * 表单设计理念=》 1.0中编辑字段不能灵活切换
   * 2.0设计=》字段展示编辑可自由切换不同字段
   * 
   * 字段的默认值，只有表单状态是新增的时候有效，在setValue时赋值
   * 
   */

  /**
   * SaveJson
   */
  public SaveJson() {
    console.log('提交表单', this.validateForm.valid,this.validateForm.value);
  }

  public buildParameters(paramsCfg) {
    return ParameterResolver.resolve({
      params: paramsCfg,
      tempValue: this.tempValue,
      componentValue: this.validateForm.value,
      initValue: this.initValue,
      cacheValue: this.cacheValue,
      router: this.routerValue
    });
  }

  public submitForm(): void {
    // tslint:disable-next-line:forin
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
  }
  /**
   * load 自加载
   */
  public load() {
    console.log('======>load');
    const url = this.config.loadingConfig['ajaxConfig'].url;
    const method = this.config.loadingConfig['ajaxConfig'].ajaxType;
    const params = {
      ...this.buildParameters(this.config.loadingConfig['ajaxConfig'].params)
    };
    // 考虑满足 get 对象，集合，存储过程【指定dataset 来接收数据】，加载错误的信息提示
    this.componentService.apiService.getRequest(url, method, { params }).subscribe(response => {
      if (response.data && response.data.length > 0) {
        const data_form = response.data[0];
        for (const item in this.formValue) {
          if (data_form.hasOwnProperty(item)) {
            this.formValue[item] = data_form[item];
          }
        }
        this.validateForm.setValue(this.formValue);
      }


    }, error => {
      console.log(error);
    });

    this.formValue['code'] ="11110010"
    this.validateForm.setValue(this.formValue);
    console.log('****loadliu*****');
  }

  /**
   *  解析级联消息
   */
  private resolveRelations() {
    if (this.config.cascade && this.config.cascade.messageSender) {
      if (!this._sender_source$) {
        // 解析组件发送消息配置,并注册消息发送对象
        this._sender_source$ = new RelationResolver(this).resolve(this.config.cascade);
        this._sender_subscription$ = this._sender_source$.subscribe();
      }

    }
    if (this.config.cascade && this.config.cascade.messageReceiver) {
      // 解析消息接受配置,并注册消息接收对象
      this._receiver_source$ = new RelationResolver(this).resolve(this.config.cascade);
      this._receiver_subscription$ = this._receiver_source$.subscribe();
    }
    this._trigger_source$ = new RelationResolver(this).resolve();

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
  }


  /**
   * valueChange 表单内值变化
   * 需要构建一个表单状态级联对象，将每个被级联对象的控制，组装，被级联对象解析该对象
   * 考虑，如何解决1.0的问题，控制级联状态的分割，级联参数的优先级
   */
  public valueChange(v?) {
    console.log('===valueChange==',v);
    if (!this.formCascade) {
      this.formCascade = {};
    }

    // 1. 循环发出对象

    // 2. 解析应答对象（应答策略） 本次优化，将1.0里的data value 变化合并为一种策略，
    //      条件变化为原来的value变化
    //      条件默认default 则是data变化，如此 配置是1种结构

    // 做配置转化，否则需要不断循环处理，转化为对象，则直接访问属性
    const triggerKey = v.name;

    this.config.cascadeValue.forEach(cascade => {
      // 满足应答触发
      if (cascade.controlId !== v.id) {
        return true;
      }
      if (cascade.name !== triggerKey) {
        return true;
      }
      // console.log('==****开始应答解析*****==', cascade);
      cascade.CascadeObjects.forEach(cascadeObj => {
        const cascadeResult = this.formCascade[cascadeObj.controlId] ? this.formCascade[cascadeObj.controlId] : {};  // 单个应答对象
        cascadeResult[cascadeObj.cascadeName] = {};
        cascadeObj.cascadeItems.forEach(item => {

          // 满足前置条件、或者 类型是default
          if (item.content.type === 'ajax') {
            const _cascadeValue = {};
            item.content.data['option'].forEach(ajaxItem => {
              if (ajaxItem['type'] === 'value') {
                _cascadeValue[ajaxItem['name']] = ajaxItem['value'];
              }
              if (ajaxItem['type'] === 'selectValue') {
                // 选中行数据[这个是单值]
                _cascadeValue[ajaxItem['name']] = v['value'];
              }
              if (ajaxItem['type'] === 'selectObjectValue') {
                // 选中行对象数据
                if (v.dataItem) {
                  _cascadeValue[ajaxItem['name']] = v.dataItem[ajaxItem['valueName']];
                }
              }
              // 其他取值【日后扩展部分】
            });
            if (cascadeResult[cascadeObj.cascadeName].hasOwnProperty('cascadeValue')) {
              cascadeResult[cascadeObj.cascadeName]['cascadeValue'] = { ...cascadeResult[cascadeObj.cascadeName]['cascadeValue'], ..._cascadeValue };
            } else {
              cascadeResult[cascadeObj.cascadeName]['cascadeValue'] = { ..._cascadeValue };
            }
            cascadeResult[cascadeObj.cascadeName]['exec'] = 'ajax';
            this.setValue(cascadeObj.cascadeName, null); // 异步执行前，将组件值置空
          }
          if (item.content.type === 'setOptions') {
            // 小组件静态数据集 , 目前静态数据，支持 多字段
            const _cascadeOptions = item.content.data['option'];

            if (cascadeResult[cascadeObj.cascadeName].hasOwnProperty('cascadeOptions')) {
              cascadeResult[cascadeObj.cascadeName]['cascadeOptions'] = _cascadeOptions;
            } else {
              cascadeResult[cascadeObj.cascadeName]['cascadeOptions'] = _cascadeOptions;
            }
            cascadeResult[cascadeObj.cascadeName]['exec'] = 'setOptions';
            this.setValue(cascadeObj.cascadeName, null); // 异步执行前，将组件值置空
          }
          if (item.content.type === 'setValue') {
            let __setValue;
            item.content.data['option'].forEach(ajaxItem => {
              if (ajaxItem['type'] === 'value') {
                __setValue = ajaxItem['value'];
              }
              if (ajaxItem['type'] === 'selectValue') {
                // 选中行数据[这个是单值]
                __setValue = v['value'];
              }
              if (ajaxItem['type'] === 'selectObjectValue') {
                // 选中行对象数据
                if (v.dataItem) {
                  __setValue = v.dataItem[ajaxItem['valueName']];
                }
              }
              // 其他取值【日后扩展部分】
            });
            // 表单赋值
            this.setValue(cascadeObj.cascadeName, __setValue);

          }
          if (item.content.type === 'display') {
            // 控制 小组件的显示、隐藏，由于组件不可控制，故而控制行列布局的显示隐藏

          }
          if (item.content.type === 'message') {
            // 某种操作后，或者返回后，弹出提示消息，可提示静态消息，可提示动态消息

          }
          if (item.content.type === 'relation') {
            // 当满足某种条件下，触发某种消息，消息值的组转，-》调用配置完善的消息结构
            // 提供 消息配置名称，发送参数组合

          }
          if (item.content.type === 'preventCascade') {

            // 【大招】 某条件下，将级联阻止

          }



        });
        this.formCascade[cascadeObj.controlId] = JSON.parse(JSON.stringify(this.formCascade[cascadeObj.controlId]));
       // console.log('==表单内值变化反馈==', this.formCascade);
      });




    });

    // tslint:disable-next-line:forin liu 自定义
    // for (const key in this.validateForm.controls) {
    //   this.validateForm.controls[key].markAsPristine();
    //   this.validateForm.controls[key].updateValueAndValidity();
    // }
  }


  /**
   * 表单内置 赋值操作
   * @param name 
   * @param value 
   */
  public setValue(name: string, value: any) {
    const control = this.validateForm.controls[name];
    if (control) {
      control.setValue(value, { emitEvent: true });
    }
  }

  /**
   * 【表单内置操作】
   *  动态执行配置，组件提供参数
   * 
   * 
   */


  public getCurrentComponentId() {
    return this.config.id;
}

  public addForm(v?) {
    this.createControls( this.validateForm);
    this.formStateChange('insert');
    console.log(this.config.id + '-------------addForm',v);
  }
  public editForm(v?) {
    this.validateForm = this.fb.group({});
    this.createControls( this.validateForm);
    this.formStateChange('update');
   //  this.validateForm.setValue( this.validateForm.value);
    console.log(this.config.id + '-------------editForm',v, this.validateForm.value);
  }
  public cancel(v?) {
    debugger;
    const ss = JSON.parse(JSON.stringify(this.validateForm.value));
    console.log(this.config.id + '-------------cancel【开始】------------') ;

    this.validateForm = this.fb.group({});
    this.createControls(this.validateForm);
    // this.validateForm.setValue(ss,{onlySelf:false,emitEvent:true});
   this.value = ss;
    this.formStateChange('text');

   // this.validateForm.setValue(this.validateForm.value);
   // this.load();
    console.log(this.config.id + '-------------cancel【结束】',v, this.validateForm.value) ;
    // setTimeout(() => this.setValue('code','liu'), 1000);
   // setTimeout(() => this.validateForm.setValue(ss), 1000);
   // this.setValue('code','liu');
  }

/**
 * 执行sql
 * @param ajaxConfig 
 */
  public execute(ajaxConfig) {
      console.log(this.config.id + '-------------执行sql', ajaxConfig);
      // 构建业务对象
      // 执行异步操作
      // this.componentService.apiService.doPost();
      const url = ajaxConfig.url;
      const params = this.buildParameters(ajaxConfig.params);
      this.componentService.apiService[ajaxConfig.ajaxType](url, params).subscribe(response => {
          // success 0:全部错误,1:全部正确,2:部分错误
          if (response.data) {
              const successCfg = ajaxConfig.result.find(res => res.name === 'data');
              // 弹出提示框
              if (successCfg.senderCfg) {
                  new RelationResolver(this).resolveInnerSender(successCfg.senderCfg);
              }
          }
          if (response.validation) {
              const validationCfg = ajaxConfig.result.find(res => res.name === 'validation');
              if (validationCfg) {
                  new RelationResolver(this).resolveInnerSender(validationCfg.senderCfg);
              }
          }
          if (response.error) {
              const errorCfg = ajaxConfig.result.find(res => res.name === 'error');
              if (errorCfg) {
                  new RelationResolver(this).resolveInnerSender(errorCfg.senderCfg);
              }
          }
      })

  }

/**
 * 状态更改-》直接修改配置
 */


}
