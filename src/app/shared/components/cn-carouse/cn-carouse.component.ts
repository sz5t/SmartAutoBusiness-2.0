import { Component, Inject, Input, OnDestroy, OnInit } from '@angular/core';
import { BSN_COMPONENT_SERVICES } from '@core/relations/bsn-relatives';
import { ComponentServiceProvider } from '@core/services/component/component-service.provider';
import { ParameterResolver } from '@shared/resolver/parameter/parameter.resolver';
import { RelationResolver } from '@shared/resolver/relation/relation.resolver';
import { Subject, Subscription } from 'rxjs';
import { CnComponentBase } from '../cn-component.base';

@Component({
  selector: 'app-cn-carouse,[cn-carouse]',
  templateUrl: './cn-carouse.component.html',
  styleUrls: ['./cn-carouse.component.less']
})
export class CnCarouseComponent extends CnComponentBase implements OnInit, OnDestroy {

  @Input() public config;
  @Input() public changeValue;
  @Input() public tempData;
  @Input() public initData;
  @Input() dataServe;
  private _sender_source$: Subject<any>;
  private _receiver_source$: Subject<any>;
  private _trigger_source$: Subject<any>;

  private _receiver_subscription$: Subscription;
  private _sender_subscription$: Subscription;
  private _trigger_receiver_subscription$: Subscription;

  constructor(@Inject(BSN_COMPONENT_SERVICES)
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

  }

  array = [1, 2, 3, 4];
  effect = 'scrollx';

  load(){

    // 加载数据，将数据路径指定 
  }

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

  
  public buildParameters(paramsCfg, returnData?) {
    return ParameterResolver.resolve({
      params: paramsCfg,
      tempValue: this.tempValue,
      componentValue: {},
      initValue: this.initValue,
      cacheValue: this.cacheValue,
      router: this.routerValue,
      returnValue: returnData ? returnData : {}
    });
  }

  
  testClick(){
 
    let execConfig={
      ajaxConfig:{
        "url": "resource/B_P_C_TEST/operate",  // operation 操作 query
        "ajaxType": "post",
        "params": [
    
          {
            "name": "messagedata",
            "type": "value",
            "valueName": "value",
            "value":"message",
            "dataType": "string"
          }
    
        ],
        "filter": [
    
        ],
        "result": [
          {
            "name": "data",
            "showMessageWithNext": 0,
            "message": "message.ajax.state.success",
            "senderId": "afterTableUpdateSuccess"
          },
          {
            "name": "validation",
            "senderId": "afterProvinceUpdateValidation"
          }
        ]
      }
    }
  

    this.execute(execConfig);
  }
  /**
   * 执行sql
   * @param Config 
   */
  public async execute(execConfig) {

    // 这个方法通过配置来调用
    console.log('  execute',execConfig);
    console.log( '-------------执行sql');
    // 构建业务对象
    // 执行异步操作
    // this.componentService.apiService.doPost();


      const url = execConfig.ajaxConfig.url;
      const params = this.buildParameters(execConfig.ajaxConfig.params);
      console.log( '-------------执行sql params:', params);
      const response = await this.componentService.apiService[execConfig.ajaxConfig.ajaxType](url, params).toPromise();

      console.log('--------执行结果',response);
      // 批量对象数据,返回结果都将以对象的形式返回,如果对应结果没有值则返回 {}

      return true;
      // this._sendDataSuccessMessage(response, execConfig.ajaxConfig.result);

      // // 处理validation结果
      // const validationResult = this._sendDataValidationMessage(response, execConfig.ajaxConfig.result);

      // // 处理error结果
      // const errorResult = this._sendDataErrorMessage(response, execConfig.ajaxConfig.result);

      // return validationResult && errorResult;
  

    

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


  public transferValue(option?) {
    console.log('将接受传递的值');
  }

  public getCurrentComponentId() {
    return this.config.id;
  }
  ngOnDestroy(): void {
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


}
