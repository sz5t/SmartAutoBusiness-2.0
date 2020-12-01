import { Component, OnInit, Input, Inject, OnDestroy } from '@angular/core';
import { CnComponentBase } from '../cn-component.base';
import { BSN_COMPONENT_SERVICES } from '@core/relations/bsn-relatives';
import { Subject, Subscription } from 'rxjs';
import { ComponentServiceProvider } from '@core/services/component/component-service.provider';
import { CN_REPORTGRID_METHOD } from '@core/relations/bsn-methods/report-grid-methods';
import { CN_REPORTGRID_PROPERTY } from '@core/relations/bsn-property/report-grid.property.interface copy';
import { RelationResolver } from '@shared/resolver/relation/relation.resolver';
import { ParameterResolver } from '@shared/resolver/parameter/parameter.resolver';
import { environment } from '@env/environment';

@Component({
  selector: 'cn-report-grid,[cn-report-grid]',
  templateUrl: './cn-report-grid.component.html',
  styleUrls: ['./cn-report-grid.component.less']
})
export class CnReportGridComponent  extends CnComponentBase  implements OnInit,OnDestroy {
  @Input() public config;
  @Input() initData;
  @Input() tempData;
  @Input() changeValue: any;
  @Input() public permissions = [];
  @Input() public dataList = [];
  @Input() dataServe;

  public COMPONENT_NAME = "CnReportGrid";
  /**
   * 组件操作对外名称
   * 所有组件实现此属性
   */
  public COMPONENT_METHODS = CN_REPORTGRID_METHOD;

  public COMPONENT_PROPERTY = CN_REPORTGRID_PROPERTY;

  private _sender_source$: Subject<any>;
  private _trigger_source$: Subject<any>;

  private _receiver_subscription$: Subscription;
  private _sender_subscription$: Subscription;
  private _trigger_receiver_subscription$: Subscription;

  reportURL:any;

  constructor(
    @Inject(BSN_COMPONENT_SERVICES)
    public componentService: ComponentServiceProvider
  ) {
    super(componentService);
    this.cacheValue = this.componentService.cacheService;
  }


  ngOnInit() {

    this._initInnerValue(); // 初始化当前组件值
    this.resolveRelations(); // 消息\
    this.setChangeValue(this.changeValue);
    // 将当前视图在容器内展示
    // 是否需要进行初始化数据加载
    if (this.config.loadingOnInit) {
      this.load();
    }
  }

  public getCurrentComponentId() {
    return this.config.id;
  }
  
  private _initInnerValue() {
    if (this.tempData) {
      this.tempValue = this.tempData;
    } else {
      this.tempValue = {};
    }
    if (this.initData) {
      this.initValue = this.initData;
    } else {
      this.initValue = {};
    }
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
  /*
 * 解析级联消息
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

  public transferValue(option?) {
    console.log('将接受传递的值', this.tempValue);
  }

  public buildParameters(paramsCfg, returnData?) {
    return ParameterResolver.resolve({
      params: paramsCfg,
      tempValue: this.tempValue,
      componentValue: {},
      initValue: this.initValue,
      cacheValue: this.cacheValue,
      router: this.routerValue,
      returnValue: returnData ? returnData : {},
      userValue:this.userValue
    });
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


  public async load() {

    const url = [];
    const d_params = this.buildParameters(this.config.ajaxConfig.params);
    const inline = this.config.inline;
    const report = this.config.reportName;
    const type = this.config.type ? this.config.type : 'pdf';

    for (const d in d_params) {
      if (d_params.hasOwnProperty(d)) {
        url.push(`${d}=${d_params[d]}`);
      }
    }
    const resource = `${this.config.ajaxConfig.url}&${url.join('&')}`;
    this.reportURL = `${environment['REPORT_SERVER_URL']}?inline=${inline}&report=${report}&type=${type}&resource=${resource}`;
    // console.log(this._replaceCurrentURL(this.reportURL));
  }
  private _replaceCurrentURL(oldUrl: string): string {
    const reg = /\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/;
    const reg_port = /:\d{1,5}/;
    const reg_all = /\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}:\d{1,5}/
    const ip = reg_all.exec(oldUrl)[0];

    const href = window.location.href;

    const port = reg_port.exec(href)[0];
    const subPort = reg_port.exec(href)[0].substring(1, port.length);

    let match, matchIP;
    if (href.indexOf('localhost') < 0) {
      match = reg.exec(window.location.href)[0].replace(/\./g, '_');

      matchIP = `url_${match}_${subPort}`;
    } else {
      matchIP = `url_localhost_${subPort}`;
    }
    let newIP;
    if (oldUrl.indexOf('api.cfg') > 0) {
     // newIP = SystemResource_1[matchIP].settingSystemServer;
    } else if (oldUrl.indexOf('ReportServer.ashx') > 0) {
     // newIP = SystemResource_1[matchIP].reportServerUrl;
    } else {
     // newIP = SystemResource_1[matchIP].localResourceUrl;
    }
    return oldUrl.replace(ip, newIP);
  }

}
