import { Component, OnInit, Inject, ChangeDetectionStrategy, Input, OnDestroy, AfterViewInit, OnChanges, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, ValidationErrors } from '@angular/forms';
import { BSN_COMPONENT_SERVICES } from '@core/relations/bsn-relatives';
import { ComponentServiceProvider } from '@core/services/component/component-service.provider';
import { ParameterResolver } from '@shared/resolver/parameter/parameter.resolver';
import { CnComponentBase } from '@shared/components/cn-component.base';
import { CommonUtils } from '@core/utils/common-utils';
import { IDataFormProperty, CN_DATA_FORM_PROPERTY } from '@core/relations/bsn-property/data-form.property.interface';
import { RelationResolver, SenderResolver } from '@shared/resolver/relation/relation.resolver';
import { Subject, Subscription, Observable, Observer } from 'rxjs';
import { CN_DATA_FORM_METHOD } from '@core/relations/bsn-methods/bsn-form-methods';
import { CustomValidator } from '@shared/components/data-form/form-validator/CustomValidator';
import { isArray } from 'util';

@Component({
  selector: 'cn-data-form',
  templateUrl: './cn-data-form.component.html',
  styleUrls: ['./cn-data-form.component.less'],
  // changeDetection: ChangeDetectionStrategy.Default
})
export class CnDataFormComponent extends CnComponentBase implements OnInit, OnDestroy, OnChanges, IDataFormProperty, AfterViewInit {



  @Input() public config;
  @Input() public changeValue;
  @Input() public tempData;
  @Input() public initData;
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
  public FORM_VALID: any;
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

    if (this.initData) {
      this.initValue = this.initData;
    } else {
      this.initValue = {};
    }
    if (this.tempData) {
      this.tempValue = this.tempData;
    } else {
      this.tempValue = {};
    }
    this.staticComponentValue = {};
    // 动态构建表单的初始默认值, 校验规则
    // this.validateForm = this.fb.group({
    //   code: ['liu', [Validators.required]],
    //   inputname2: [null, [Validators.required]],
    //   inputname5: ['', [Validators.required]],

    // });
    this.setChangeValue(this.changeValue);
    this.validateForm = this.fb.group({});

    // 生成Controls
    this.createControls(this.validateForm);
    console.log("this.validateForm=> ", this.validateForm);
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
        if (Control.editor.loadingItemConfig) {
          Control.editor['loadingItemConfig']['ajaxConfig'] = this.ajaxConfigObj[Control.editor.loadingItemConfig.id];
        }
        if (Control.editor.expandConfig) {
          Control.editor['expandConfig']['ajaxConfig'] = this.ajaxConfigObj[Control.editor.expandConfig.id];
        }

      }
      this.formControlObj[Control.id] = Control;
    });
    // 初始化表单状态
    this.formStateChange(this.config.state);

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

    // this.load();
  }

  ngAfterViewInit(): void {
    console.log('*******ngAfterViewInit********');
    this.load();
    this.FORM_VALID = this.validateForm.valid;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.validateForm) {
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
          f.addControl(`${Control.field}`, new FormControl(null, this.getValidations(Control.editor.validations)));
          this.formValue[Control.field] = null;
        }
        else {
          f.addControl(`${Control.text.field}`, new FormControl());
          this.formValue[Control.text.field] = null;
          f.addControl(`${Control.field}`, new FormControl(null, this.getValidations(Control.editor.validations)));
          this.formValue[Control.editor.field] = null;
        }
      }
      else {
        if (Control.text) {
          f.addControl(`${Control.text.field}`, new FormControl());
          this.formValue[Control.text.field] = null;
        }
        if (Control.editor) {
          // f.addControl(`${Control.editor.field}`, new FormControl());
          f.addControl(`${Control.field}`, new FormControl(null, this.getValidations(Control.editor.validations)));
          this.formValue[Control.editor.field] = null;
        }
      }
      this.formCascade[Control.id] = {};
    });
  }


  /**
   * 生成 校验规则
   */
  public getValidations(validations) {
    const validation = [];
    validations &&
      validations.forEach(valid => {
        if (valid.type && valid.type === 'custom') {
          if (valid.type === 'custom') {
            //  validation.push(CustomValidator[valid.validator](valid));
            validation.push(this[valid.validator]);
          } else {
            validation.push(Validators[valid.validator]);
          }
        } else {
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
    this.FORM_STATE = state;
    // 新增状态可填写默认值，其他状态无默认值
    this.ControlsPermissions(this.FORM_STATE);
  }

  /**
   * setChangeValue 接受 初始变量值
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
    // this.validateForm.valid  表单校验状态  是否提供，写在前置条件中，判断是否通过校验
    console.log('提交表单', this.validateForm.valid, this.validateForm.value);
  }

  public buildParameters(paramsCfg, returnData?) {
    return ParameterResolver.resolve({
      params: paramsCfg,
      tempValue: this.tempValue,
      componentValue: this.validateForm.value,
      initValue: this.initValue,
      cacheValue: this.cacheValue,
      router: this.routerValue,
      returnValue: returnData ? returnData : {}
    });
  }

  public submitForm(): void {
    // tslint:disable-next-line:forin
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    this.FORM_VALID = this.validateForm.valid;
  }

  /**
   * validate
   */
  public validate() {
    // tslint:disable-next-line:forin
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
      // Promise.resolve().then(() => this.validateForm.controls[i].updateValueAndValidity());
    }


    this.FORM_VALID = this.validateForm.valid;

  }
  /**
   * load 自加载
   */
  public load() {
    console.log('======>load', this.tempValue);
    const url = this.config.loadingConfig['ajaxConfig'].url;
    const method = this.config.loadingConfig['ajaxConfig'].ajaxType;
    const params = {
      ...this.buildParameters(this.config.loadingConfig['ajaxConfig'].params)
    };
    // 考虑满足 get 对象，集合，存储过程【指定dataset 来接收数据】，加载错误的信息提示
    let data_form;
    this.componentService.apiService.getRequest(url, method, { params }).subscribe(response => {
      if (isArray(response.data)) {
        if (response.data && response.data.length > 0) {
          data_form = response.data[0];
        }
      } else {
        if (response.data) {
          data_form = response.data;
        }
      }

      data_form = { ...data_form, ...this.staticComponentValue };
      for (const item in this.formValue) {
        if (data_form.hasOwnProperty(item)) {
          this.formValue[item] = data_form[item];
        }
      }
      this.validateForm.setValue(this.formValue);

    }, error => {
      console.log(error);
    });
  }

  /**
   *  解析级联消息
   */
  private resolveRelations() {
    if (this.config.cascade && this.config.cascade.messageSender) {
      if (!this._sender_source$) {
        // 解析组件发送消息配置,并注册消息发送对象
        this._sender_source$ = new RelationResolver(this).resolveSender(this.config);
        this._sender_subscription$ = this._sender_source$.subscribe();
      }

    }
    if (this.config.cascade && this.config.cascade.messageReceiver) {
      // 解析消息接受配置,并注册消息接收对象
      // this._receiver_source$ = new RelationResolver(this).resolveReceiver(this.config);
      // this._receiver_subscription$ = this._receiver_source$.subscribe();
      new RelationResolver(this).resolveReceiver(this.config);
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

    if (this._trigger_source$) {
      this._trigger_source$.unsubscribe();
    }

    if (this.subscription$) {
      this.subscription$.unsubscribe();
    }
  }

  /**
   * valueChange 表单内值变化
   * 需要构建一个表单状态级联对象，将每个被级联对象的控制，组装，被级联对象解析该对象
   * 考虑，如何解决1.0的问题，控制级联状态的分割，级联参数的优先级
   */
  public valueChange(v?) {
    console.log('===valueChange==', v);
    if (!this.formCascade) {
      this.formCascade = {};
    }

    // 1. 循环发出对象

    // 2. 解析应答对象（应答策略） 本次优化，将1.0里的data value 变化合并为一种策略，
    //      条件变化为原来的value变化
    //      条件默认default 则是data变化，如此 配置是1种结构

    // 做配置转化，否则需要不断循环处理，转化为对象，则直接访问属性
    const triggerKey = v.name;

    if (this.config.cascadeValue)
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
              // this.setValue(cascadeObj.cascadeName, null); // 异步执行前，将组件值置空
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
    this.validateForm = this.fb.group({});
    this.createControls(this.validateForm);
    this.value = this.formValue;
    if (v.hasOwnProperty('builtinConfig')) {
      if (v['builtinConfig'].event === 'formStateChange') {
        this.formStateChange(v['builtinConfig'].state ? v['builtinConfig'].state : 'insert');
      }
    }

    console.log(this.config.id + '-------------addForm', v);
  }
  public editForm(v?) {
    const ss = JSON.parse(JSON.stringify(this.validateForm.value));
    // this.validateForm = this.fb.group({});
    // this.createControls( this.validateForm);
    this.value = ss;
    if (v.hasOwnProperty('builtinConfig')) {
      if (v['builtinConfig'].event === 'formStateChange') {
        this.formStateChange(v['builtinConfig'].state ? v['builtinConfig'].state : 'update');
      }
    }
    this.load();
    //  this.validateForm.setValue( this.validateForm.value);
    console.log(this.config.id + '-------------editForm', v, this.validateForm.value);
  }
  public cancel(v?) {
    // debugger;
    const ss = JSON.parse(JSON.stringify(this.validateForm.value));
    console.log(this.config.id + '-------------cancel【开始】------------');

    // this.validateForm = this.fb.group({});
    // this.createControls(this.validateForm);
    // this.validateForm.setValue(ss,{onlySelf:false,emitEvent:true});
    this.value = ss;
    if (v.hasOwnProperty('builtinConfig')) {
      if (v['builtinConfig'].event === 'formStateChange') {
        this.formStateChange(v['builtinConfig'].state ? v['builtinConfig'].state : 'text');
      }
    }
    // this.validateForm.setValue(this.validateForm.value);
    this.load();
    console.log(this.config.id + '-------------cancel【结束】', v, this.validateForm.value);
    // setTimeout(() => this.setValue('code','liu'), 1000);
    // setTimeout(() => this.validateForm.setValue(ss), 1000);
    // this.setValue('code','liu');
  }

  /**
   * 执行sql
   * @param Config 
   */
  public async execute(execConfig) {

    this.validate(); // 这个方法通过配置来调用
    console.log('  this.FORM_VALID', this.FORM_VALID);
    console.log(this.config.id + '-------------执行sql', execConfig, this.validateForm.value, this.validateForm.valid);
    // 构建业务对象
    // 执行异步操作
    // this.componentService.apiService.doPost();
    const url = execConfig.ajaxConfig.url;
    const params = this.buildParameters(execConfig.ajaxConfig.params);
    console.log(this.config.id + '-------------执行sql params:', params);
    const response = await this.componentService.apiService[execConfig.ajaxConfig.ajaxType](url, params).toPromise();


    // 批量对象数据,返回结果都将以对象的形式返回,如果对应结果没有值则返回 {}
    this._sendDataSuccessMessage(response, execConfig.ajaxConfig.result);

    // 处理validation结果
    const validationResult = this._sendDataValidationMessage(response, execConfig.ajaxConfig.result);

    // 处理error结果
    const errorResult = this._sendDataErrorMessage(response, execConfig.ajaxConfig.result);

    return validationResult && errorResult;

  }



  public async executeModal(execConfig) {

    this.validate(); // 这个方法通过配置来调用
    console.log('  this.FORM_VALID', this.FORM_VALID);
    console.log(this.config.id + '-------------执行sql', execConfig, this.validateForm.value, this.validateForm.valid);
    // 构建业务对象
    // 执行异步操作
    // this.componentService.apiService.doPost();
    const url = execConfig.ajaxConfig.url;
    const params = this.buildParameters(execConfig.ajaxConfig.params);
    console.log(this.config.id + '-------------执行sql params:', params);
    const back = false;
    const response = await this.componentService.apiService[execConfig.ajaxConfig.ajaxType](url, params).toPromise();
    return response;
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

  //       return new SenderResolver(this._componentInstance).resolve(config.cascade.messageSender);

  /**
   * 状态更改-》直接修改配置
   *  消息过来时，判断当前组件相应的内置操作，
   * 例如当接受主子刷新时，子组件状态保存当前，还是恢复到某个状态
   * 可控=》子组件可连续操作不间断。
   * 消息的前置条件可控
   */


  repeat = (control: FormControl): { [s: string]: boolean } => {
    // console.log('repeat==>', control);
    if (!control.value) {
      return { error: true, required: true };
    } else if (control.value === '中国香港') {
      return { repeat: true };
    }
    return {};
  };

  repeat1 = (control: FormControl): { [s: string]: boolean } => {
    // console.log('repeat2==>', control);
    let dd = {};

    if (!control.value) {
      dd = { error: true, required: true };
    } else if (control.value === '中国香港2') {
      dd = { repeat1: true };
    }


    return dd;
  };


  validating1 = (control: FormControl) =>
    new Observable((observer: Observer<ValidationErrors | null>) => {
      setTimeout(() => {
        console.log('validating>>>>>>>>>>测试远程校验');

        if (control.value === '中国香港1') {
          // you have to return `{error: true}` to mark it as an error event
          observer.next({ validating: true, repeat: true });
          console.log('validating>>>>>>>>>>');
        } else {
          observer.next(null);
        }
        observer.complete();
      }, 200);
    });

  userNameAsyncValidator = (control: FormControl) =>
    new Observable((observer: Observer<ValidationErrors | null>) => {
      //  setTimeout(() => {
      if (control.value === '中国香港1') {
        // you have to return `{error: true}` to mark it as an error event
        console.log('validating>>>>>>>>>>');
        observer.next({ error: true, userNameAsyncValidator: true });
      } else {
        observer.next(null);
      }
      observer.complete();
      //  }, 1000);
    });



  // 分组属性表单=》动态读取属性，分布提交
  // 根据属性生成-》折叠+表格+扩展页面=>组合属性
  // 【分组】? 
  // tab页签下：折叠面板+Descriptions描述列表 ==构成属性编辑器

}
