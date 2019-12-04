import { Component, OnInit, Input, Inject } from '@angular/core';
import { CnComponentBase } from '@shared/components/cn-component.base';
import { BSN_COMPONENT_SERVICES } from '@core/relations/bsn-relatives';
import { ComponentServiceProvider } from '@core/services/component/component-service.provider';
import { CommonUtils } from '@core/utils/common-utils';

@Component({
  selector: 'cfg-form-item,[cfg-form-item]',
  templateUrl: './cfg-form-item.component.html',
  styleUrls: ['./cfg-form-item.component.css']
})
export class CfgFormItemComponent extends CnComponentBase implements OnInit {
  @Input() public config;
  @Input() public formState;
  public is_drag = true;
  public is_dragj = true;
  public compont = {text:'',editor:''};
  public editTitleState = false;
  constructor(@Inject(BSN_COMPONENT_SERVICES)
  public componentService: ComponentServiceProvider) {
    super(componentService);
  }

  public ngOnInit() {
    console.log('-->表单列-》', this.config);
    if (this.config) {

    } else {
      this.config = {};
    }

    if (!this.config['controls']) {
      this.config['controls'] = {};
      const fieldIdentity = CommonUtils.uuID(36);
      this.config['controls']['id'] = 'fieldIdentity';
      this.config['controls']['title'] = '标题';
      this.config['controls']['text'] = {};
      this.config['controls']['editor'] = {};
    }

    if (this.formState) {
      if (this.config['controls']['editor'].hasOwnProperty('type')) {
        this.compont['editor'] = this.config['controls']['editor']['type'];
      } else {
        this.compont['editor'] = '';
      }
    } else {
      if (this.config['controls']['text'].hasOwnProperty('type')) {
        this.compont['text']= this.config['controls']['text']['type'];
      } else {
        this.compont['text'] = '';
      }
    }

  }

  public f_ondrop(e?, d?) {
    e.preventDefault();
    console.log('拖动行ondrop', e, d);
    const ss = e.dataTransfer.getData('test');
    console.log('拖动行ondrop临时值', ss);

    let _compont;
    if (this.formState) {
      _compont=   this.compont['editor'];

    } else {
      _compont=   this.compont['text'];
   
    }

    if (_compont) {
      this.componentService.modalService.confirm({
        nzTitle: '确认框?',
        nzContent: '<b style="color: red;">你确定要替换当前组件吗？</b>',
        nzOkText: '确定',
        nzOkType: 'danger',
        nzOnOk: () => {
          if (this.formState) {
            this.compont['editor'] ='';
      
          } else {
             this.compont['text']='';
         
          }
          this.config.container ='component';
          if (this.formState) {
            this.config['controls']['editor'] = { type: ss };
          } else {
            this.config['controls']['text'] = { type: ss };
          }

          console.log('拖拽后组件状态----》', this.compont);
          setTimeout(() => {
            if (this.formState) {
              this.compont['editor'] =ss;
        
            } else {
               this.compont['text']=ss;
           
            }
          });
        },
        nzCancelText: '取消',
        nzOnCancel: () => console.log('Cancel')
      });
    }
    else {
      if (this.formState) {
        this.compont['editor'] =ss;
  
      } else {
         this.compont['text']=ss;
     
      }
      this.config.container = 'component';
      if (this.formState) {
        this.config['controls']['editor'] = { type: ss };
      } else {
        this.config['controls']['text'] = { type: ss };
      }
      console.log('拖拽后组件状态----》', this.compont);
    }
    //  【配置信息的生成】
    // 配置信息分两部分，一部分，在表单布局内标识，一部分是在control 里具体详细配置
    // 布局最小记录为contorl 标识的占位，其下分两部分，text、editor 方便组件状态切换，展示切换
    // 默认均为 insert 下取默认值，update下 只读加载值，text 只读加载值
    // 生成control 的内置参数，外部引用配置，独立生成，构建关联关系

    const c = {
      id: '001',
      "hidden": true, // 字段是否隐藏
      "title": '测试字段1',  // lable 信息
      "titleConfig": {  // 展示文本的信息
        required: true
      },
      "field": "code",  // fromcontrol name  默认的字段
      "labelSize": {
        "span": 8,
        "nzXs": { span: 7, offset: 1 },
        "nzSm": { span: 7, offset: 1 },
        "nzMd": { span: 7, offset: 1 },
        "nzLg": { span: 7, offset: 1 },
        "ngXl": { span: 7, offset: 1 },
        "nzXXl": { span: 7, offset: 1 }
      },  // 
      "controlSize": {
        "span": 16,
        "nzXs": 16,
        "nzSm": 16,
        "nzMd": 16,
        "nzLg": 16,
        "ngXl": 16,
        "nzXXl": 16
      },
      "state": "edit", // 当前组件默认状态 文本，编辑，或者由表单状态控制text、edit、form
      "text": { // 文本展示字段
        "type": 'input', // 什么组件展示文本 
        "field": 'code',   // 字段
      },
      "editor": {            // 编辑状态字段  日后扩充可为数组，满足条件下的组件变化
        "type": "input",
        "field": "code",  // 编辑字段于定义字段一致 （此处定义于表格相反）
        "placeholder": "请输入",
        "validate": {  // 校验

        }
      }
    }


  }
  public f_ondragover(e?, d?) {
    // 进入，就设置可以拖放进来（设置不执行默认：【默认的是不可以拖动进来】）
    if (this.is_drag)
      e.preventDefault();
    // --05--设置具体效果copy
    e.dataTransfer.dropEffect = 'copy';
    // if (this.is_dragj) {
    //   this.is_dragj = false;
    //   window.setTimeout(() => { this.setState(); }, 500);
    // }


  }

  public f_ondragleave(e) {
    console.log('离开当前领地++++');
  }
  public f_ondragenter(e, d?) {
    console.log('***进入当前领地****');
  }

  public setState() {
    this.is_dragj = true;
    // console.log('进入当前领地++++');
  }

  public editTitle(e?) {
    this.editTitleState = true;
  }

  public onblurtitle(e?, type?) {
    this.editTitleState = false;
    event.stopPropagation();
  }
  public onKeyPress(e?, type?) {
    if (e.code === 'Enter') {
      this.editTitleState = false;
    }
  }

  public mouseover(e?){
   // console.log(e);
    e.preventDefault();
    e.stopPropagation();
  }


  // 消息：
  // 1.内置消息

  // 2.自定义消息

  /*
  消息体
  ====【发送消息配置】====
  消息配置：[
    {
        消息标识：【唯一标识，方便引用，id】
        发送方：当前组件（默认给值）
        消息触发类型：组件行为触发、引用消息 【引用消息，当前组件异步事件后触发-》简析时用到】
        消息触发事件：【选中行触发、值变化触发、组件状态变化。。。】
        发送消息体：[
          {
            发送前置条件：【判断当前条件下是否可以发送】
            接收方：描述谁接受消息（下拉选择组件id）
            消息体：{
              消息名称：
              消息执行类型：接收参数，执行组件内部事件
              消息参数：[
                  {
                      参数名称：
                      参数类型：
                      参数取值：
                  }
              ]
            }
          }

        ]
    }

  ]

  ====【接受消息配置】====
  消息配置：[
    {
        消息标识：【唯一标识，方便引用，id】
        接受发送方：接受哪些组件发送的消息
        接受消息体：[  // 配置成数组，可以描述某一个组件的多个消息
          {
            接受前置条件：【判断当前条件下是否可以接受】
            消息体：{
              消息名称：
              消息执行类型：接收参数，执行组件内部事件
              消息参数：[ // 可指定别名，也可不指定，默认之间接受发送过来的所有信息
                  {
                      参数名称：
                      参数类型：
                      参数取值：
                  }
              ]
            }
          }

        ]
    }

  ]

  ==》》 只要配置了发送消息，后默认生成接受消息的，在接受消息部分，如果需要扩充指定接受前判断、
                                                             或者 参数指定别名

  组件自生状态变化也可触发消息：
          例如：表格，数据为空时 等

  组件需提供向外传递当前组件值的方法【通过消息，取到子组件的所有值】

  组件公布的行为都通过消息去触发。

  ====【操作配置】====

      操作分类：内置方法、异步执行
      【描述】 内置方法=》例如表格行内变成编辑状态等
                        异步执行=》与数据库交互

      [     // 操作布局 暂时不考虑
        {   // 操作内容
             操作分类：（配置时默认生成，行内操作按钮，toolbar操作按钮、弹出操作按钮）// 后续执行，取值等会有区别
             操作唯一标识：
             操作标题：
             操作图标：
             操作权限属性：是否不受权限控制
             类型：内置方法、异步执行
             操作对象：组件标识（默认是当前组件，也可执行跨组件操作）
             执行内容：[   // 执行内容数据，可以根据前置条件，区分 新增保存，修改保存
               {
                  分类条件：{
                                           判断体： 判断条件，根据条件执行
                                         }，
                 标识：异步标识、内置标识
               }
             ]

             }

        }
      ]

  ====【内置操作配置】====
  [
    {
      内置操作标识：唯一标识，
       前置事件：{  // 前置操作（判断当前条件是否满足执行内置操作）

      }，
       日志信息：{  // 日志操作，页面操作
               是否写日志:
               描述：对该方法的描述，日志信息（补充进日志）
               日志详细配置:[  // 动态生成日志操作信息 ，注意此处值和描述语音的合并替换
                 {
                     类型：描述、替换值
                     取值类型：文本描述、（从其他对象取值 组件值、临时变量）
                     取值名称：
                     默认值：
                 }
               ]
        }，
       操作请求：{
          内置操作：
          内置操作参数构建： // 不同的内置方法可能需要用参数不同
       }
        后置事件：{  // 如有有后续操作，可以继续指定
                    执行内容：[
                       {
                               前置条件： 根据条件决定 后续执行什么操作
                               后续执行体：消息、异步、组件行为(清空数据、选中行、切换状态...) 等（根据条件）
                        }
                      ]
        }

    }
  ]


  ====【异步请求配置】====
      [
        {
          异步标识：唯一标识，   // 方便其他引用
          前置事件：{  // 前置操作，构建参数（可描述构建业务对象）或者 拦截是否进入方法，提示信息
                   // 数据要进库， 需要配值成树形结构，系统给添加描述字段属性关系节点
                   // 树描述业务对象
          }，
          日志信息：{  // 日志操作成功失败 后进行记录
               是否写日志:
               描述：对该方法的描述，日志信息（补充进日志）
               日志详细配置:[  // 动态生成日志操作信息 ，注意此处值和描述语音的合并替换
                 {
                     类型：描述、替换值
                     取值类型：文本描述、（从其他对象取值 组件值、临时变量）
                     取值名称：
                     默认值：
                 }
               ]
          }，
          异步请求：{
               地址：
               类型：内部接口、外部接口，动态组装接口
               请求类型：get post put delete proc
               地址配置：[], // 应对调用外部接口
               参数：[
                 {
                    名称：
                    取值类型：
                    取值名称：
                    默认值：
                 }
               ]，
               输出参数：[
                  // 接受描述
               ],
               操作结果:[
                 // 表达式-》树形结构
               ]
          }，
          后置事件：{
            执行内容：[
              {
                前置条件：
                后续执行体：消息、异步、组件行为(清空数据、选中行、切换状态...) 等（根据条件）
              }
            ]
          }

        }
      ]

====【表达式】====
描述 业务对象的取值
大概结构如下，描述出树形结构，可以查找出具体层级属性值即可
当前树形结构描述 从业务对象取值赋值
  // 从根节点开始简析
  {
   类型：对象、数组、单值
   取值描述：{
     标识：
     类型：对象、数组、单值
     别名：
     业务类型：取值、赋值
     组件标识：
     组件配置：// 描述组件什么值   默认不配，则取组件值
     字段: 对象里属性名称    // 取值的 或者赋值时用到
     方式：getvalue，getlength， getsum 等自定义信息
     子对象：[
       {
          标识：
          类型：对象、数组、单值
          别名：
          业务类型：取值、赋值
          组件标识：
          组件配置：// 描述组件什么值
       }
     ]
  },

  }



？ 未能描述，对象的行为，例如某个子对象的某个字段和等等





  ====【级联】====
  通过级联，描述各种消息
  目前所有的触发，都是通过级联来触发
   级联分类：值变化、行为变化 （值变化，就是1.0里的；行为变化，选中行等）
  级联：[
    {
      类型：值变化、行为变化
      级联对象:[

      ]

    }
  ]


  消息需要有多种消息【重点】可连续操作多组件交互
  N个请求按顺序串行发出（前一个结束再发下一个）
  Observable.concat(...obs).subscribe(detail => console.log('每个请求都触发回调'));
  N个请求同时并行发出，对于每一个到达就触发一次回调
  Observable.merge(...obs).subscribe(detail => console.log('每个请求都触发回调'));
  N个请求同时发出并且要求全部到达后合并为数组，触发一次回调
  Observable.forkJoin(...obs).subscribe(detailArray => console.log('触发一次回调'));

  【Ngrx Store】












  */

  /**
   * df_config 定义结构
   */
  public df_config() {

    // ======= 发送消息=======
    const senderMessageconfiguration =
      [
        {
          id: '',
          sender: '发送组件id',
          triggertype: '组件行为触发、引用消息',
          triggerevent: 'SelectedRow、value change、component state change',
          sendbody: [
            {
              preconditions: [],
              receiver: '接受组件id',  // 可单一，也可数组多个
              messagebody: {
                name: '消息名称',
                executiontype: '接收参数，执行组件内部事件 1.0 里的消息类型 ',
                parameters: [
                  {
                    name: '',
                    type: '',
                    valuename: '',
                    value: ''
                  }
                ]
              }
            }
          ]
        }
      ]
    // ======= 发送消息=======

    // =*====== 接受消息======*=
    const ReceivingMessageconfiguration =
      [
        {
          id: '',
          receivingsenders: '',
          receivingbody: [
            {
              preConditions: [],
              messagebody: {
                name: '',
                executiontype: 'Receiving Parameters, Executing Component Internal Events',
                parameters: [// can specify aliases or not, and all messages sent are accepted by default.
                  {
                    name: '',
                    type: '',
                    valuename: '',
                    values: ''
                  }
                ]
              }
            }
          ]
        }
      ]
    // =*====== 接受消息======*=

    // *******内置操作***************
    const operationconfiguration =
      [
        {
          id: '',
          preevent: { // 前置事件

          },
          Loginformation: { // 日志信息
            islog: true,
            Description: '',
            LogDetailed: [// Generate Log Operational Information dynamically, note the merged substitution of this value and description voice
              {
                type: '',
                valuename: '',
                value: ''
              }
            ]
          },
          OperationalRequest: {
            operation: '',
            operationparamete: '' // Different built-in methods may require different parameters
          },
          Postevent: {// If there are subsequent actions, you can continue to specify
            Implementationcontent: [
              {
                Prerequisites: 'Decide what to do next according to the conditions',
                SubsequentExecutors: ''
              }
            ]

          }
        }
      ]


  }


  /**
   * jx_消息
   */
  public jx_消息() {

    const cascade = [
      {
        type: '组件行为变化',
        name: 'selectRow',
        CascadeObjects: [
          // 根据行为变化，决定触发 操作、消息等
          {
            cascadeName: '消息、操作、当前字段作为标识',
            cascadeValueItems: [
              {
                caseValue: {
                  type: 'selectObjectValue',
                  valueName: 'num',
                  regular: '^0$'
                },
                data: {
                  type: 'message',
                  message_data: {
                    option: {
                      messageType: 'warning',
                      type: 'selectObjectValue',
                      valueName: 'msg'
                    }
                  }
                }
              }
            ]
          }
        ]
      },
      {
        type: '值变化',
        name: 'barcode',
        CascadeObjects: [
          {
            cascadeName: 'barcode',
            cascadeValueItems: [
              {
                caseValue: {
                  type: 'selectObjectValue',
                  valueName: 'num',
                  regular: '^0$'
                },
                data: {
                  type: 'message',
                  message_data: {
                    option: {
                      messageType: 'warning',
                      type: 'selectObjectValue',
                      valueName: 'msg'
                    }
                  }
                }
              },
              {
                caseValue: {
                  type: 'selectObjectValue',
                  valueName: 'num',
                  regular: '^1$'
                },
                data: {
                  type: 'relation',
                  relation_data: {
                    option: [
                      {
                        name: 'barcode',
                        cascadeMode: 'Scan_Code_ROW',
                        cascadeField: [
                          {
                            name: 'mappingData',
                            valueName: 'dataItem'
                          },
                          {
                            name: 'code',
                            type: 'selectObject',
                            valueName: 'value'
                          },
                          {
                            name: 'tempValueData',
                            type: 'tempValueObject'
                          },
                          {
                            name: 'initValueData',
                            type: 'initValueObject'
                          }
                        ]
                      },
                      {
                        name: 'barcode',
                        cascadeMode: 'REFRESH_AS_CHILD',
                        cascadeField: [
                          {
                            name: 'code',
                            type: 'selectObject',
                            valueName: 'value'
                          }
                        ]
                      }
                    ]
                  }
                }
              }
            ],
            cascadeDataItems: []
          }
        ]
      }
    ]
    /*
            循环当前组件的发送消息，然后将发送消息，注册到各组件动作响应后
            这样当组件行为变化就会发消息
            值变化就注册到值变化后，然后根据变化的值再做其他响应

            先做级联简析，级联里维护了消息触发内容
            例如 选中行的动作===》

             this.after(this, '组件内部方法', () => {

                     根据消息结构，判断，组装消息体，发送消息
                      this.cascade.next(
                       );
             })


    */
    cascade.forEach(s => {
      if (s.type === '') { // 内置行为简析
        // 将方法注册
        //   this.after(this, '组件内部方法', () => {

        //   });
      }
      if (s.type === '') {

      }

    });


  }





}
