import { Component, OnInit, Input, OnDestroy, Inject, ViewEncapsulation } from '@angular/core';
import { CnComponentBase } from '../cn-component.base';
import { Subject, Subscription } from 'rxjs';
import { BSN_COMPONENT_SERVICES } from '@core/relations/bsn-relatives';
import { ComponentServiceProvider } from '@core/services/component/component-service.provider';
import { RelationResolver } from '@shared/resolver/relation/relation.resolver';
import { CN_CONTAINERS_METHOD } from '@core/relations/bsn-methods/containers-methods';
import { CN_CONTAINERS_PROPERTY } from '@core/relations/bsn-property/containers.property.interface';

@Component({
  selector: 'app-cn-containers',
  templateUrl: './cn-containers.component.html',
  styleUrls: ['./cn-containers.component.less']
})
export class CnContainersComponent extends CnComponentBase implements OnInit, OnDestroy {

  @Input() public config; //配置参数
  @Input() initData;
  @Input() tempData;
  @Input() changeValue: any;
  @Input() public permissions = [];
  @Input() public dataList = [];
  @Input() dataServe;


  public COMPONENT_NAME = "CnContainers";
  /**
   * 组件操作对外名称
   * 所有组件实现此属性
   */
  public COMPONENT_METHODS = CN_CONTAINERS_METHOD;

  public COMPONENT_PROPERTY = CN_CONTAINERS_PROPERTY;

  private _sender_source$: Subject<any>;
  private _trigger_source$: Subject<any>;

  private _receiver_subscription$: Subscription;
  private _sender_subscription$: Subscription;
  private _trigger_receiver_subscription$: Subscription;
  constructor(
    @Inject(BSN_COMPONENT_SERVICES)
    public componentService: ComponentServiceProvider
  ) {
    super(componentService);
    this.cacheValue = this.componentService.cacheService;
  }


  view;
  viewId; // 当前标识
  showLayout;

  _initValue_new;
  _tempValue_new;

  _linkViews;
  ngOnInit() {

    this._linkViews = this.config.views;
    this._initInnerValue(); // 初始化当前组件值
    this.resolveRelations(); // 消息
    // 将当前视图在容器内展示
    // 是否需要进行初始化数据加载
    if (this.config.loadingOnInit) {
      this.load();
    }
   // console.log('容器组件初始化');

  }

  load() {
    let v = this.viewChange();
    this.switchContaine(v);
    console.log('容器组件load==>', this.tempValue, v);

  }
  public getCurrentComponentId() {
    return this.config.id;
  }

  /**
   * liuliu 
   * 当前结构有两种
   * 1.切换组件  
   * 2.切换布局
   * 3.切换布局、组件的内容【当前组件内、引用外部子页面】
   * 容器配置，通过layout pageId 加载？ 容器组件全加载分配
   * 
   * 问题：不想每次都刷新容器，若容器不变，则调用方法，只做外部变量变化，以及load，于表单内部级联一致
   * 当前可能会导致问题，每次都将触发容器变化
   *  */

  // 容器切换
  async switchContaine(c_viewId?) {

    this.showLayout = false;
    this.view = null;
    // viewId 

    // 1.查询出当前容器对应的内容
    let c_view_list = this.config.views.filter(v => v.id === c_viewId);
    let c_view;
    if (c_view_list && c_view_list.length > 0) {
      c_view = c_view_list[0];
    }
    let currentView;
    // 2.将当前缓存值传递只容器内,准备传递缓存值


    // 3.切换容器组件为当前内容
    // 当前配置缓存没有，则自动加载
    if (c_view) {
      currentView = this.componentService.cacheService.getNone(c_view['layoutName']);
    }
    if (!currentView) {
      await this.getCustomConfig(c_view['layoutName']);
      currentView = this.componentService.cacheService.getNone(c_view['layoutName']);
    }
   // console.log('------', c_view['layoutName'], currentView);
    setTimeout(() => {
      this.view = currentView['layoutJson'];
      this._initValue_new = {...this.initValue};
      this._tempValue_new = {...this.tempValue};
      this.showLayout = true;
    });

    console.log('=========================',this._linkViews);
  }



  switchContaineload(option?) {

    // 静态切换，需要告知 当前消息是是否重新加载
    let isLoad= true;
    if(option.hasOwnProperty('isLoad')){
      isLoad = option['isLoad'];
    }
    let v = this.viewChange();
    this.switchContaine_cache(v,isLoad);
    console.log('容器组件load==>', this.tempValue, v);

  }
  //  容器数组内存在的子页面，则自由切换，不存在的子页面，加载出数据切换
  async switchContaine_cache(c_viewId?,isLoad?) {

    this._linkViews.forEach(element => {
      if(element.id ===c_viewId){
        if(isLoad){
         element['showLayout'] = false;
        }     
      }
      else{
        element['showLayout'] = true;
      }
      // "lbj_002"
   });
    this.showLayout = false;
    this.view = null;
    // viewId 

    // 1.查询出当前容器对应的内容
    let c_view_list = this.config.views.filter(v => v.id === c_viewId);
    let c_view;
    if (c_view_list && c_view_list.length > 0) {
      c_view = c_view_list[0];
    }
    let currentView;
    // 2.将当前缓存值传递只容器内,准备传递缓存值


    // 3.切换容器组件为当前内容
    // 当前配置缓存没有，则自动加载
    if (c_view) {
      currentView = this.componentService.cacheService.getNone(c_view['layoutName']);
    }
    if (!currentView) {
      await this.getCustomConfig(c_view['layoutName']);
      currentView = this.componentService.cacheService.getNone(c_view['layoutName']);
    }
   // console.log('------', c_view['layoutName'], currentView);
    setTimeout(() => {
      this.view = currentView['layoutJson'];
      this._linkViews.forEach(element => {
         if(element.id ===c_viewId){
          if(isLoad){
            element['showLayout'] = true;
          }   
          element['viewConfig'] = currentView['layoutJson'];
          element['hidden'] = false;
         }else {
          element['hidden'] = true;
         }
         // "lbj_002"
      });
      this._initValue_new = {...this.initValue};
      this._tempValue_new = {...this.tempValue};
      // this.showLayout = true;
    });

    console.log('=========================',this._linkViews);
  }

  // 计算出满足当前条件的视图
  viewChange() {

    let _viewId;
    // 循环 映射条件
    try {
      this.config.mapping.forEach(item => {
        let regularflag = true;
        if (item.caseValue && item.type === "condition") {
          const reg1 = new RegExp(item.caseValue.regular);
          let regularData;
          if (item.caseValue.type) {
            if (item.caseValue.type === 'tempValue') {
              regularData = this.tempValue[item.caseValue['valueName']];
            }
            if (item.caseValue.type === 'initValue') {
              regularData = this.initValue[item.caseValue['valueName']];
            }


          } else {
            regularData = "";
          }
          regularflag = reg1.test(regularData);
          // 满足正则表达 
          if (regularflag) {
            // 返回 满足条件视图
            _viewId = item.viewId;
            throw new Error()
          }
        } else {
          _viewId = item.viewId;
          throw new Error()
          // 无条件，直接返回 视图
        }
      });
    } catch (e) {
      // console.log(e)
    }

    return _viewId;






  }





  // json 结构定义
  new_config = {

    id: '001',
    state: '', // 当前组件状态（根据组件状态决定容器内容的展示）
    views: [   // 组件内容
      {
        id: '1001',
        name: '子页面01',
        layoutName: ''
      },
      {
        id: '1002',
        name: '子页面02',
        layoutName: ''
      }
    ],
    mapping: [  // 满足条件，
      {
        id: '',
        type: 'condition', // 条件、默认 condition default
        caseValue: {
          "type": "tem",      // 设置取值类型
          "valueName": "num",               // 取值属性名称
          "regular": "^0$",
          "value": ""
        },
        viewType: 'page', // page\component 
        viewId: '' //  满足条件下的视图
      }

    ],
    "cascade": {  // 消息
      "messageSender": [

      ],
      "messageReceiver": [


      ]
    },

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
  /**
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


  // 取出当前配置 参数：页面id
  public async getCustomConfig(customConfigId?) {
    const response = await this.componentService.apiService.post('resource/B_P_C_CONFIG_PAGE_ALL/operate', { "PageId": customConfigId }).toPromise();

    if (response['data']) {
      if (response['data']._procedure_resultset_1[0]['W'] === "") {
        // this.config = null;
      }
      else {
        const pageJson = JSON.parse(response['data']._procedure_resultset_1[0]['W']);
        for (const key in pageJson) {
          if (pageJson.hasOwnProperty(key)) {
            // 判断是否时主页面配置,如果是主页面配置,则直接进行页面解析
            if (key === customConfigId) {
              //  this.config = pageJson[customConfigId]['layoutJson'];
              const componentJson = pageJson[customConfigId]['componentsJson']
              if (Array.isArray(componentJson) && componentJson.length > 0) {
                componentJson.forEach(json => {
                  this.componentService.cacheService.set(json['id'], json);
                });
              }

              this.componentService.cacheService.set(key, pageJson[customConfigId]);

            } else {
              // 将子页面的配置加入缓存, 后期使用子页面数据时直接从缓存中获取
              this.componentService.cacheService.set(key, pageJson[key]);
              const componentJson = pageJson[key]['componentsJson']
              if (Array.isArray(componentJson) && componentJson.length > 0) {
                componentJson.forEach(json => {
                  this.componentService.cacheService.set(json['id'], json);
                });
              }

            }
          }
        }
      }

    }
  }



}
