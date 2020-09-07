import { Component, OnInit, ViewChild, ElementRef, Inject, Input, OnDestroy } from '@angular/core';
import { CnComponentBase } from '@shared/components/cn-component.base';
import { BSN_COMPONENT_SERVICES } from '@core/relations/bsn-relatives';
import { ComponentServiceProvider } from '@core/services/component/component-service.provider';
import { Subject, Subscription } from 'rxjs';
import { RelationResolver } from '@shared/resolver/relation/relation.resolver';
import { CN_DATA_TAG_PROPERTY } from '@core/relations/bsn-property/data-tag.property.interface';
import { CN_DATA_TAG_METHOD } from '@core/relations/bsn-methods/bsn-tag-methods';
import { ParameterResolver } from '@shared/resolver/parameter/parameter.resolver';
import { isArray } from 'util';
import { CommonUtils } from '@core/utils/common-utils';

@Component({
  selector: 'cn-tag,[cn-tag]',
  templateUrl: './cn-tag.component.html',
  styleUrls: ['./cn-tag.component.less']
})
export class CnTagComponent extends CnComponentBase implements OnInit,OnDestroy {

   @Input() public config;
  @Input() public changeValue;
  @Input() public tempData;
  @Input() public initData;


  public COMPONENT_NAME = "CnTag";
  /**
   * 组件操作对外名称
   * 所有组件实现此属性
   */
  public COMPONENT_METHODS = CN_DATA_TAG_METHOD;
  public COMPONENT_PROPERTY = CN_DATA_TAG_PROPERTY;

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

  ajaxConfigObj={};

  ngOnInit() {

   // this.config = this.json;
   if( this.config.ajaxConfig){
    this.config.ajaxConfig.forEach(ajax => {
      this.ajaxConfigObj[ajax.id] = ajax;
    });
   }



    // 将异步请求结果拼接组装到 load ，方便后面程序解析。
    if (this.config.loadingConfig) { // 构建load异步请求
      this.config.loadingConfig['ajaxConfig'] = this.ajaxConfigObj[this.config.loadingConfig.id];
    }
    
    // 是否需要进行初始化数据加载，或者从静态数据读取
    if (this.config.loadingOnInit) {
          this.load();
    } else {
      if(this.initData &&this.config.targetValue &&  this.initData.hasOwnProperty(this.config.targetValue? this.config.targetValue:'tags')){
        if(this.initData[this.config.targetValue? this.config.targetValue:'tags']){
          this.nodeList =  this.initData[this.config.targetValue? this.config.targetValue:'tags']; 
        }
      }
    }



    this.resolveRelations();
    this.valueChange( this.nodeList );
  }

  tags = ['Unremovable', 'Tag 2', 'Tag 3'];
  inputVisible = false;
  inputValue = '';
  @ViewChild('inputElement', { static: false }) inputElement: ElementRef;

  nodeList=[
    // {label:'',value:'',origin:{}}  // label 文本展示  value 隐藏值，origin 是原始数据
  ];

  tagValues=null;
  tagLabels=null;


  handleClose1(removedTag: {}): void {
    this.nodeList = this.nodeList.filter(tag => tag !== removedTag);
    this.valueChange(this.nodeList);
    console.log('删除节点nodeList===>>>', this.nodeList);
  }
  

  sliceTagName(tag: string): string {
    const isLongTag = tag.length > 20;
    return isLongTag ? `${tag.slice(0, 20)}...` : tag;
  }

  showInput(): void {
    this.inputVisible = true;
    setTimeout(() => {
      this.inputElement.nativeElement.focus();
    }, 10);
  }

  handleInputConfirm(): void {
    if (this.inputValue && this.tags.indexOf(this.inputValue) === -1) {
      this.tags = [...this.tags, this.inputValue];
    }
    this.inputValue = '';
    this.inputVisible = false;
  }


  /**
   * 当前组件值变化
   */
  valueChange(v?){

       // 当值变化的时候，需要将变化值通知外部组件，由外部容器组件接受存储当前值
       // 隐藏input 存储值，值变化可以通过ngmodelchange 来触发当前
       this.nodeListToData();
       console.log('tags值变化',v);
       return true;
  }


  load_text(){

    // 加载数据处理为可展示结构
    const format ={
        close:true,  // 是否启用关闭当前tag
        color:"blue", // 标签颜色 
        mode:'default',  // 设定标签工作的模式 'closeable' | 'default' | 'checkable'  默认值 default 
        checked:false  // 设置标签的选中状态，可双向绑定，在 nzMode="checkable" 时可用  默认值 false
    };


  }


  config1 ={
    "id":"tag_main",
    "component":"cn-tag",
    "dataForm":"", // 静态数据，动态加载数据
    "key":'',  // 唯一标识（===valueName）
    "tagNameLength":20, // 每个tag显示的最大长度（默认20个字符）
    "isClose":false, // 是否启用删除（默认不启用）
    "isChecked":true,
    "labelName":"PROVINCE_NAME",
    "valueName":"ID",
    "loadingConfig":{
        id:"loadtags"
    },
    "columns": [
      {
        "title": "文本",
        "type": "label",  // 类型映射什么属性字段
        "field": "PROVINCE_NAME"
      },
      {
        "title": "值",
        "type": "value",  // 类型映射什么属性字段
        "field": "ID"
      },
      // {
      //   "title": "close",
      //   "type": "close",  // 类型映射什么属性字段
      //   "field": "close",
      //   "value":true
      // },
      // {
      //   "title": "color",
      //   "type": "color",  // 类型映射什么属性字段
      //   "field": "color",
      //   "value":true
      // },
      // {
      //   "title": "mode",
      //   "type": "mode",  // 类型映射什么属性字段
      //   "field": "mode",
      //   "value":true
      // },
      // {
      //   "title": "checked",
      //   "type": "checked",  // 类型映射什么属性字段
      //   "field": "checked",
      //   "value":true
      // },
      
    ],
    ajaxConfig:[
      {
        id:'loadtags',
        url:"resource/PROVINCE/query",
        ajaxType:"get",
        params:[]
      }
    ],
    cascade:{
      messageSender:[
        {
          "id": "tag_sender_liu_1",
          "senderId": "tag_main",
          "triggerType": "BEHAVIOR",
          "trigger": "VALUE_CHANGE",
          "triggerMoment": "after",
          "sendData": [
            {
              "beforeSend": {},
              "reveicerId": "",
              "receiverTriggerType": "BEHAVIOR",
              "receiverTrigger": "ADD_SELECTED",
              "params": [
                {
                  "name": "value",
                  "type": "item",
                  "valueName": "ID"
                },
                {
                  "name": "label",
                  "type": "item",
                  "valueName": "PROVINCE_NAME"
                }
              ]
            }
          ]
        },
      ],
      messageReceiver:[]
    }
  }
  
  // 场景描述：
  // 当前组件大部分作为容器组件，承接其他组件的选中项等结构的展示
  // 比较复杂的是当前组件的请求，简单，是每次都加载最新数据，另一种是首次加载，后续和扫码类似通过消息合并数据
  /*

    内置方法： 1 清空
                      2.新增tag节点
                      3.删除tag节点
                      4.选中tag节点
                      5.编辑tag节点
    体验友好，需要异步刷新 （也支持全刷新）

    组件值： 文本值，id值，个数，数组值  提供这3个值
    组件值组装结果
    {value: value,dataItem:{labelName:"",valueName:"",dataItems:[lable:"",value:"",orgin:{}]}}

   */

   /**
    * 加载当前数据
    */
  public load() {
    if(!this.config.loadingConfig['ajaxConfig']){
      return false;
    }
    if(!this.config.loadingConfig['ajaxConfig'].hasOwnProperty('url') ){
      return false;
    }
    const url = this.config.loadingConfig['ajaxConfig'].url;
    const method = this.config.loadingConfig['ajaxConfig'].ajaxType;
    const params = {
      ...this.buildParameters(this.config.loadingConfig['ajaxConfig'].params)
    };
    // 考虑满足 get 对象，集合，存储过程【指定dataset 来接收数据】，加载错误的信息提示
    let data_form;
    this.componentService.apiService[method](url, params).subscribe(response => {
      if (isArray(response.data)) {
        if (response.data && response.data.length > 0) {
          data_form = response.data;
        }
      } else {
        if (response.data) {
          data_form = [response.data];
        }
      }

      this.dataToNodeList(data_form);
      this.nodeListToData();
      console.log('tag加载数据',data_form);

      // data_form = { ...data_form, ...this.staticComponentValue };
      // for (const item in this.formValue) {
      //   if (data_form.hasOwnProperty(item)) {
      //     this.formValue[item] = data_form[item];
      //   }
      // }
 
    }, error => {
      console.log(error);
    });
  }

  public getCurrentComponentId() {
    return this.config.id;
}
  /**
   * 数据转tag所需结构
   */
  public dataToNodeList(data?){
   
    data.forEach(element => {
     this.setNode(element);
    });
 
    this.nodeList = data;
    this.valueChange(this.nodeList);
  }

  public nodeListToData(){
   
  
    let values="";
    let labels="";
    this.nodeList.forEach( item=>{
          values = values+item['value']+',';
          labels=labels+item['label']+',';
    });
    if(labels.length>0){
      labels = labels.substr(0,labels.length-1);
    }
    if(values.length>0){
      values = values.substr(0,values.length-1);
    }

    this.tagValues = values;
    this.tagLabels =labels;
  
  }

  public setNode(node?){

    // {
    //   "title": "ID",
    //   "type": "key",
    //   "field": "ID"
    // },

  //   {
  //     "title": "id",
  //     "type": "field",
  //     "field": "id",
  //     "hidden": true,
  // },
  // {
  //     "title": "header",
  //     "type": "formatStr",
  //     "field": "name",
  //     "hidden": false,
  //     "formatStr": [
  //         { type: 'field', valueName: 'name' },
  //         { type: 'value', valueName: null, value: '【发出】' },
  //     ]  //  标题是  | 字段名称+（字段）+【发出】 |  数据组合标题 
  // },
  // {
  //     "title": "extra",
  //     "type": "value",
  //     "field": "nzExtra",
  //     "hidden": false,
  //     "value": 'extraTpl',
  // },
  // {
  //     "title": "active",
  //     "type": "value",
  //     "field": "nzActive",
  //     "hidden": false,
  //     "value": false,
  // },
  // {
  //     "title": "disabled",
  //     "type": "value",
  //     "field": "nzDisabled",
  //     "hidden": false,
  //     "value": false,
  // },


    this.config.columns.map(column => {
      node[column['type']] = node[column['field']];
    });
  }

  /**
   * 添加节点 
   * node 节点数据
   * type  指定位置、头位置、结尾位置
   * index 插入节点位置
   */
  public addNode(node,type,index?){

    const newnode =[node];
    if(type ==='first'){
      // 添加在第一个位置
      this.nodeList = [...newnode,...this.nodeList];

    } else if (type ==='last'){
      // 添加在最后一个位置
      this.nodeList = [...this.nodeList,...newnode];
    } else if (type ==='index'){ 
      // 添加在指定位置（可指定节点插入，或者移动节点）
      
    }else {
      // 默认添加在末尾位置
      this.nodeList = [...this.nodeList,...newnode];
    }

  }

  public addNodeTest(){

    const fieldIdentity = CommonUtils.uuID(36);
    const d ={label:fieldIdentity,value:fieldIdentity};
    this.addNode(d,"last");

    this.nodeList = this.nodeList.filter(item =>item.value !=='key');
    this.valueChange(this.nodeList);
    console.log('手动添加节点测试nodeList===>>>', this.nodeList);
    
  }
  public addSingleNodeTest(){
    this.nodeList =[];
    const fieldIdentity = CommonUtils.uuID(36);
    const d ={label:fieldIdentity,value:fieldIdentity};
    this.addNode(d,"last");
    this.valueChange(this.nodeList);
    console.log('手动单选节点测试nodeList===>>>', this.nodeList);
    
  }

  
  // 添加单选
  public addSingleNode(v?){
    if(!v['value']){
      return false;
    }
    // 添加单选，需要先将当前tag数组清空
    this.nodeList =[];
    const fieldIdentity = CommonUtils.uuID(36);
    this.addNode(v,"last");
    this.nodeList = this.nodeList.filter(item =>item.value !=='key');
    console.log('nodeList单选结果===>>>', this.nodeList);
    this.valueChange(this.nodeList);
    return true;
  }

  // 添加多选
  public addMultipleNode(v?){
    // 添加多选，在原有基础上追加
    if(!v['value']){
      return false;
    }
    const test = this.nodeList.filter(item =>item.value ===v['value']);
    if(test.length>0){
      return false;
    }
    const fieldIdentity = CommonUtils.uuID(36);
    const d =v;
    this.addNode(d,"last");

    this.nodeList = this.nodeList.filter(item =>item.value !=='key');
    console.log('nodeList多选结果===>>>',v, this.nodeList);
    this.valueChange(this.nodeList);
    return true;
    
  }

   
  public buildParameters(paramsCfg, returnData?) {
    return ParameterResolver.resolve({
      params: paramsCfg,
      tempValue: this.tempValue,
      componentValue: {value:this.nodeList,tagValues:this.tagValues,tagLabels:this.tagLabels},
      initValue: this.initValue,
      cacheValue: this.cacheValue,
      router: this.routerValue,
      returnValue: returnData ? returnData : {}
    });
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


}

