import { Component, OnInit, OnDestroy, AfterViewInit, Input, Inject, ViewChild, ElementRef, TemplateRef } from '@angular/core';
import { CnComponentBase } from '../cn-component.base';
import { BSN_COMPONENT_SERVICES } from './../../../core/relations/bsn-relatives';
import { ComponentServiceProvider } from '@core/services/component/component-service.provider';
import { NzDropdownContextComponent, NzMenuItemDirective } from 'ng-zorro-antd'
import { ParameterResolver } from '@shared/resolver/parameter/parameter.resolver';
import { RelationResolver } from '@shared/resolver/relation/relation.resolver';
// import G6Editor from '@antv/g6-editor';
import G6 from '@antv/g6';
import { CN_DATA_STEP_METHOD } from '@core/relations/bsn-methods/bsn-data-step-methods';
import { CN_DATA_STEP_PROPERTY } from './../../../core/relations/bsn-property/data-step.property.interface';
import { Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-cn-data-step',
  templateUrl: './cn-data-steps.component.html',
  styles: [``]
})
export class CnDataStepsComponent extends CnComponentBase implements OnInit, OnDestroy, AfterViewInit {
  @Input()
  public config;
  @Input()
  public initData;
  @Input()
  public tempData;
  @Input()
  public changeValue: any;
  @ViewChild('dataSteps', { static: false }) public dataSteps: ElementRef;
  public isLoading = true;
  public dataList = [];
  public pDatalist = []; // 父节点的节点数据集
  public cDatalist = []; // 父节点的节点数据集
  public haveChildStyle = {}; // 有子节点的节点样式
  public noChildStyle = {}; // 没有子节点的节点样式
  public pNode: any[] = []; // 父节点的节点集合
  public cNode = []; // 子节点的节点集合
  public edge = []; // 绘制图形的线的集合
  public edgeType; // 线的类型，有无箭头等
  public nodeLabelField; // 节点的文本字段
  public nodeWidth; // 节点宽度大小
  public nodeHeight; // 节点高度大小
  public direction; // 画图方向
  public graphWidth; // 画布宽度
  public graphHeight; // 画布高度
  public nodeParentField;// 父节点字段
  public descField; // 第二行描述内容的字段
  public colorField; // 节点的颜色判断字段
  public expandDataList = [];// 展开收缩节点之后的数据源
  public expandNodeList = [];// 展开收缩节点之后组装的拥有节点对象的数据源
  public expandLineList = [];// 展开收缩节点之后组装的拥有节点对象的数据源


  public COMPONENT_NAME = "CnDataStep";
  public COMPONENT_PROPERTY = CN_DATA_STEP_PROPERTY;
  public COMPONENT_METHODS = CN_DATA_STEP_METHOD;
  public KEY_ID;

  public _sender_source$: Subject<any>;
  public _receiver_source$: Subject<any>;
  public _trigger_source$: Subject<any>;
  private _receiver_subscription$: Subscription;
  private _sender_subscription$: Subscription;
  private _trigger_receiver_subscription$: Subscription;

  public bNodeColor;
  public sNodeColor = '#C6E5FF'; // '#eee'
  public sNodeEnterColor = '#00B2EE';
  public sNodeClickColor = '#9BCD9C';
  public sNodeStoke = ''; // 默认的选中外圈的颜色
  public sNodeStokeLine = 2; // 默认的选中外圈线的粗细
  public _statusSubscription;
  public _cascadeSubscription;
  public graph;
  public formatNode = [];
  public initNodeColor = []; // 节点的初始化颜色数组
  private dropdown: NzDropdownContextComponent;
  private defaultStyle = {
    color: '#ccc',
    background: '#ddd'
  };
  public nodeSelected; // 记录上一个选中的节点
  public NODE_SELECTED = {};
  public maxWidth;
  public maxHeight;

  public evt: any = {};

  constructor(
    @Inject(BSN_COMPONENT_SERVICES)
    public componentService: ComponentServiceProvider) {
    super(componentService);
  }

  public ngOnInit() {
    this.initComponent();
    this.initComponentData();
    this.initInnerData();
    this.relationResolve();
  }

  /*
     * 属性初始化
     */
  initComponent() {
    this.setChangeValue(this.changeValue);

    this.KEY_ID = this.config.keyId ? this.config.keyId : 'id';
    // this.pageSize = this.config.pageSize;
  }

  /**
   * 数据初始化
   */
  initComponentData() {
    this.haveChildStyle = {}
    this.graphWidth = this.config.basiAttribute.graphWidth ? this.config.basiAttribute.graphWidth : 800;
    this.graphHeight = this.config.basiAttribute.graphHeight ? this.config.basiAttribute.graphHeight : 600;
    this.nodeLabelField = this.config.basiAttribute.nodeLabelField ? this.config.basiAttribute.nodeLabelField : '节点名称';
    this.nodeWidth = this.config.basiAttribute.nodeWidth ? this.config.basiAttribute.nodeWidth : 200;
    this.nodeHeight = this.config.basiAttribute.nodeHeight ? this.config.basiAttribute.nodeHeight : 64;
    this.nodeParentField = this.config.basiAttribute.nodeParentField ? this.config.basiAttribute.nodeParentField : '';
    this.descField = this.config.basiAttribute.descField ? this.config.basiAttribute.descField : '节点描述';
    this.edgeType = this.config.basiAttribute.edgeType ? this.config.basiAttribute.edgeType : 'line';
    this.sNodeStoke = this.config.basiAttribute.sNodeStoke ? this.config.basiAttribute.sNodeStoke : this.sNodeStoke;
    this.sNodeStokeLine = this.config.basiAttribute.sNodeStokeLine ? this.config.basiAttribute.sNodeStokeLine : this.sNodeStokeLine;
    // this.initNodeColor = this.config.basiAttribute.processNode.initNodeColor ? this.config.basiAttribute.processNode.initNodeColor : null;
    this.colorField = this.config.basiAttribute.colorField ? this.config.basiAttribute.colorField : '';
    this.direction = this.config.drawDirection ? this.config.drawDirection : 'vertical';
    this.maxWidth = this.config.bodyStyle.maxWidth ? this.config.bodyStyle.maxWidth : 500;
    this.maxHeight = this.config.bodyStyle.maxHeight ? this.config.bodyStyle.maxHeight : 500;
  }

  /*
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
   * 内部变量初始化
   */
  initInnerData() {
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
   * relationResolve 构建消息解析
   */
  public relationResolve() {
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

    // this._trigger_source$ = new RelationResolver(this).resolve();
  }

  /**
   * load 加载数据
   */
  public async load() {
    this.dataList = await this.createUrlParams(this.config.loadingConfig);
    if (this.nodeParentField === '') {
      this.pDatalist = this.dataList
    } else {
      this.pDatalist = this.dataList.filter(e => e[this.nodeParentField] === null);
      this.cDatalist = this.dataList.filter(e => e[this.nodeParentField] !== null);
    }
    if (this.dataList.length > 0) {
      this.setStepParentNode();
      this.setStepParentLine();
    }
    this.createAction();
    this.createNodeAndLine();
  }

  public async createUrlParams(config) {
    const url = this._buildURL(config.url);
    const params = {
      ...this._buildParameters(config.params),
      ...this._buildFilter(config.filter)
    };
    const method = config.method;
    const loadData = await this._load(url, params, method);
    if (loadData.success) {
      if (loadData.success === 1 || loadData.success === 2) {
        return loadData.data;
      }
    } else {
      return [];
    }
  }

  /*
* 构建URL
* @param ajaxUrl
* @returns {string}
* @private
*/
  private _buildURL(ajaxUrl) {
    let url = '';
    if (ajaxUrl && this._isUrlString(ajaxUrl)) {
      url = ajaxUrl;
    } else if (ajaxUrl) {
    }
    return url;
  }
  /*
  * 处理URL格式
  * @param url
  * @returns {boolean}
  * @private
  */
  private _isUrlString(url) {
    return Object.prototype.toString.call(url) === '[object String]';
  }

  /**
   * 构建URL参数
   * @param paramsConfig
   * @returns {{}}
   * @private
   */
  private _buildParameters(paramsConfig) {
    let params = {};
    if (paramsConfig) {
      params = ParameterResolver.resolve({
        params: paramsConfig,
        tempValue: this.tempValue,
        initValue: this.initData,
        cacheValue: this.cacheValue,
        cascadeValue: this.cascadeValue
      });
    }
    return params;
  }
  /**
   * 构建查询过滤参数
   * @param filterConfig
   * @returns {{}}
   * @private
   */
  private _buildFilter(filterConfig) {
    let filter = {};
    if (filterConfig) {
      filter = ParameterResolver.resolve({
        params: filterConfig,
        tempValue: this.tempValue,
        cacheValue: this.cacheValue
      });
    }
    return filter;
  }

  private async _load(url, params, method) {
    const mtd = method === 'proc' ? 'post' : method;
    return this.componentService.apiService[mtd](url, params).toPromise();
  }

  public ngAfterViewInit() {
    this.dataSteps.nativeElement.style['height'] = this.maxHeight.toString() + 'px'
    this.dataSteps.nativeElement.style['width'] = this.maxWidth.toString() + 'px'
    this.dataSteps.nativeElement.style['overflow'] = 'auto'
    if (this.config.loadingOnInit) {
      this.load();
      setTimeout(() => {
        this.isLoading = false;
      });
    }
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

  public close(e: NzMenuItemDirective): void {
    this.dropdown.close();
  }

  /**
   * setStepNode 将数据源请求的数据组装成父节点信息
   */
  public setStepParentNode() {
    if (this.direction === 'vertical') {
      for (let i = 0; i < this.pDatalist.length; i++) {
        const hasChildren = this.nodeParentField === '' ? false : (this.cDatalist.findIndex(e => e[this.nodeParentField] === this.pDatalist[i][this.KEY_ID]) > -1 ? true : false)
        this.pNode.push({
          id: this.pDatalist[i][this.KEY_ID],
          x: 50,
          y: 50 + 100 * i,
          dataType: 'root',
          keyInfo: this.pDatalist[i][this.descField],
          name: this.pDatalist[i][this.nodeLabelField],
          level: 0,
          width: this.nodeWidth,
          height: this.nodeHeight,
          children: hasChildren,
          collapsed: hasChildren ? 'EXPAND_ICON' : 'COLLAPSE_ICON'
        });
        this.formatNode.push({
          id: this.pDatalist[i][this.KEY_ID]
        })
        for (const node of this.initNodeColor) {
          if (this.pDatalist[i][this.colorField] && this.pDatalist[i][this.colorField] === node.value) {
            this.formatNode[i]['color'] = node.color;
          }
        }
        if (!this.formatNode[i]['color']) {
          this.formatNode[i]['color'] = this.defaultStyle.color;
        }
      }
    } else if (this.direction === 'horizontal') {
      for (let i = 0; i < this.pDatalist.length; i++) {
        const hasChildren = this.nodeParentField === '' ? false : (this.cDatalist.findIndex(e => e[this.nodeParentField] === this.pDatalist[i][this.KEY_ID]) > -1 ? true : false)
        this.pNode.push({
          id: this.pDatalist[i][this.KEY_ID],
          x: (this.nodeWidth + 60) * i + 30,
          y: 50 + this.nodeHeight,
          dataType: 'root',
          keyInfo: this.pDatalist[i][this.descField],
          name: this.pDatalist[i][this.nodeLabelField],
          level: 0,
          width: this.nodeWidth,
          height: this.nodeHeight,
          children: hasChildren,
          collapsed: hasChildren ? 'EXPAND_ICON' : 'COLLAPSE_ICON'
        });
        this.formatNode.push({
          id: this.pDatalist[i][this.KEY_ID]
        })
        for (const node of this.initNodeColor) {
          if (this.pDatalist[i][this.colorField] && this.pDatalist[i][this.colorField] === node.value) {
            this.formatNode[i]['color'] = node.color;
          }
        }
        if (!this.formatNode[i]['color']) {
          this.formatNode[i]['color'] = this.defaultStyle.color;
        }
      }
    }

  }

  /**
   * setStepParentLine 组装父节点间的连线
   */
  public setStepParentLine() {
    for (let i = 0; i < this.pDatalist.length - 1; i++) {
      this.edge.push({
        id: 'node' + i + '-' + (i + 1),
        source: this.pDatalist[i][this.KEY_ID],
        target: this.pDatalist[i + 1][this.KEY_ID],
        weight: this.config.basiAttribute.lineWidth ? this.config.basiAttribute.lineWidth : 2
      })
    }
  }

  /**
   * createNodeAndLine 创建G6的画布，绘制点和线
   */
  public createNodeAndLine() {
    const that = this;
    this.isLoading = true;
    const data = { nodes: this.pNode, edges: this.edge }
    this.graph = new G6.Graph({
      container: this.dataSteps.nativeElement,
      width: that.graphWidth,
      height: that.graphHeight,
      defaultNode: {
        type: 'card-node'
      },
      defaultEdge: {
        type: 'line'
      },
      modes: {
        default: ['behaviorName']
      },
    });

    this.graph.data(data);
    this.graph.render();
    setTimeout(() => {
      const clickNodes = this.graph.findAllByState('node', 'selected');
      clickNodes.forEach(cn => {
        this.graph.setItemState(cn, 'selected', false);
      });
      this.graph.setItemState(this.pNode[0].id, 'selected', true);
      // 加载选中数据，模拟点击发送消息
      this.evt = this.graph.findAllByState('node', 'selected')[0];
      this.clickNode();
      this.isLoading = false;
    })
  }

  /**
   * updateNode 展开/收缩之后，生成节点数据
   */
  public updateNode(dataList) {
    if (this.expandNodeList.length > 0) {
      this.expandNodeList = [];
    }
    // console.log(dataList);
    for (let i = 0; i < dataList.length; i++) {
      let hasChildren;
      // 已经打开的节点
      if (this.cDatalist.findIndex(e => e[this.nodeParentField] === dataList[i][this.KEY_ID]
        && dataList.findIndex(d => d[this.KEY_ID] === e[this.KEY_ID]) > -1) > -1) {
        hasChildren = true
        if (dataList[i][this.nodeParentField] === null) {
          if (this.direction === 'vertical') {
            this.expandNodeList.push({
              id: dataList[i][this.KEY_ID],
              x: 50,
              y: 50 + 100 * i,
              dataType: 'root',
              keyInfo: dataList[i][this.descField],
              name: dataList[i][this.nodeLabelField],
              level: 0,
              width: this.nodeWidth,
              height: this.nodeHeight,
              children: hasChildren,
              collapsed: hasChildren ? 'COLLAPSE_ICON' : 'EXPAND_ICON'
            });
          } else if (this.direction === 'horizontal') {
            this.expandNodeList.push({
              id: dataList[i][this.KEY_ID],
              x: (this.nodeWidth + 60) * i + 30,
              y: 50 + this.nodeHeight,
              dataType: 'root',
              keyInfo: dataList[i][this.descField],
              name: dataList[i][this.nodeLabelField],
              level: 0,
              width: this.nodeWidth,
              height: this.nodeHeight,
              children: hasChildren,
              collapsed: hasChildren ? 'COLLAPSE_ICON' : 'EXPAND_ICON'
            });
          }

        } else {
          if (this.direction === 'vertical') {
            this.expandNodeList.push({
              id: dataList[i][this.KEY_ID],
              x: 50,
              y: 50 + 100 * i,
              dataType: 'child',
              keyInfo: dataList[i][this.descField],
              name: dataList[i][this.nodeLabelField],
              level: 1,
              width: this.nodeWidth,
              height: this.nodeHeight,
              children: hasChildren,
              collapsed: hasChildren ? 'COLLAPSE_ICON' : 'EXPAND_ICON'
            });
          } else if (this.direction === 'horizontal') {
            this.expandNodeList.push({
              id: dataList[i][this.KEY_ID],
              x: (this.nodeWidth + 60) * i + 30,
              y: 50 + this.nodeHeight,
              dataType: 'child',
              keyInfo: dataList[i][this.descField],
              name: dataList[i][this.nodeLabelField],
              level: 1,
              width: this.nodeWidth,
              height: this.nodeHeight,
              children: hasChildren,
              collapsed: hasChildren ? 'COLLAPSE_ICON' : 'EXPAND_ICON'
            });
          }

        }
        // 未打开的有子节点的节点
      } else if (this.cDatalist.findIndex(e => e[this.nodeParentField] === dataList[i][this.KEY_ID]
        && dataList.findIndex(d => d[this.KEY_ID] === e[this.KEY_ID]) > -1) === -1) {
        if (this.cDatalist.findIndex(e => e[this.nodeParentField] === dataList[i][this.KEY_ID]) > -1) {
          hasChildren = true
          if (dataList[i][this.nodeParentField] === null) {
            if (this.direction === 'vertical') {
              this.expandNodeList.push({
                id: dataList[i][this.KEY_ID],
                x: 50,
                y: 50 + 100 * i,
                dataType: 'root',
                keyInfo: dataList[i][this.descField],
                name: dataList[i][this.nodeLabelField],
                level: 0,
                width: this.nodeWidth,
                height: this.nodeHeight,
                children: hasChildren,
                collapsed: hasChildren ? 'EXPAND_ICON' : 'COLLAPSE_ICON'
              });
            } else if (this.direction === 'horizontal') {
              this.expandNodeList.push({
                id: dataList[i][this.KEY_ID],
                x: (this.nodeWidth + 60) * i + 30,
                y: 50 + this.nodeHeight,
                dataType: 'root',
                keyInfo: dataList[i][this.descField],
                name: dataList[i][this.nodeLabelField],
                level: 0,
                width: this.nodeWidth,
                height: this.nodeHeight,
                children: hasChildren,
                collapsed: hasChildren ? 'EXPAND_ICON' : 'COLLAPSE_ICON'
              });
            }

          } else {
            if (this.direction === 'vertical') {
              this.expandNodeList.push({
                id: dataList[i][this.KEY_ID],
                x: 50,
                y: 50 + 100 * i,
                dataType: 'child',
                keyInfo: dataList[i][this.descField],
                name: dataList[i][this.nodeLabelField],
                level: 1,
                width: this.nodeWidth,
                height: this.nodeHeight,
                children: hasChildren,
                collapsed: hasChildren ? 'EXPAND_ICON' : 'COLLAPSE_ICON'
              });
            } else if (this.direction === 'horizontal') {
              this.expandNodeList.push({
                id: dataList[i][this.KEY_ID],
                x: (this.nodeWidth + 60) * i + 30,
                y: 50 + this.nodeHeight,
                dataType: 'child',
                keyInfo: dataList[i][this.descField],
                name: dataList[i][this.nodeLabelField],
                level: 1,
                width: this.nodeWidth,
                height: this.nodeHeight,
                children: hasChildren,
                collapsed: hasChildren ? 'EXPAND_ICON' : 'COLLAPSE_ICON'
              });
            }

          }

        } else {
          hasChildren = false
          if (dataList[i][this.nodeParentField] === null) {
            if (this.direction === 'vertical') {
              this.expandNodeList.push({
                id: dataList[i][this.KEY_ID],
                x: 50,
                y: 50 + 100 * i,
                dataType: 'root',
                keyInfo: dataList[i][this.descField],
                level: 0,
                width: this.nodeWidth,
                height: this.nodeHeight,
                name: dataList[i][this.nodeLabelField],
                children: hasChildren
              });
            } else if (this.direction === 'horizontal') {
              this.expandNodeList.push({
                id: dataList[i][this.KEY_ID],
                x: (this.nodeWidth + 60) * i + 30,
                y: 50 + this.nodeHeight,
                dataType: 'root',
                keyInfo: dataList[i][this.descField],
                level: 0,
                width: this.nodeWidth,
                height: this.nodeHeight,
                name: dataList[i][this.nodeLabelField],
                children: hasChildren
              });
            }

          } else {
            if (this.direction === 'vertical') {
              this.expandNodeList.push({
                id: dataList[i][this.KEY_ID],
                x: 50,
                y: 50 + 100 * i,
                dataType: 'child',
                keyInfo: dataList[i][this.descField],
                level: 1,
                width: this.nodeWidth,
                height: this.nodeHeight,
                name: dataList[i][this.nodeLabelField],
                children: hasChildren
              });
            } else if (this.direction === 'horizontal') {
              this.expandNodeList.push({
                id: dataList[i][this.KEY_ID],
                x: (this.nodeWidth + 60) * i + 30,
                y: 50 + this.nodeHeight,
                dataType: 'child',
                keyInfo: dataList[i][this.descField],
                level: 1,
                width: this.nodeWidth,
                height: this.nodeHeight,
                name: dataList[i][this.nodeLabelField],
                children: hasChildren
              });
            }

          }
        }

      }
    }
  }

  /**
   * updateLine 展开/收缩之后，生成边数据
   */
  public updateLine() {
    if (this.expandLineList.length > 0) {
      this.expandLineList = [];
    }
    for (let i = 0; i < this.expandDataList.length - 1; i++) {
      this.expandLineList.push({
        id: 'node' + i + '-' + (i + 1),
        source: this.expandNodeList[i]['id'],
        target: this.expandNodeList[i + 1]['id'],
        weight: this.config.basiAttribute.lineWidth ? this.config.basiAttribute.lineWidth : 2
      })
    }
  }

  /**
   * name
   */
  public clickNode() {
    const node = this.evt.item ? this.evt.item : this.evt
    this.nodeSelected = node;
    this.NODE_SELECTED = this.dataList.find(e => e[this.KEY_ID] === node['_cfg']['id']);
    // console.log('onClick', node);
    const clickNodes = this.graph.findAllByState('node', 'selected');
    clickNodes.forEach(cn => {
      this.graph.setItemState(cn, 'selected', false);
    });
    this.graph.setItemState(node, 'selected', true); // 设置当前节点的 selected 状态为 true

    return true;
  }

  /**
   * createAction 注册G6的事件
   */
  public createAction() {
    const that = this;
    const getNodeConfig = (node) => {
      let config = {
        basicColor: '#5B8FF9',
        fontColor: '#000',
        borderColor: '#5B8FF9',
        bgColor: that.sNodeColor,
      };
      switch (node.type) {
        case 'root': {
          config = {
            basicColor: '#E3E6E8',
            fontColor: 'rgba(0,0,0,0.85)',
            borderColor: '#E3E6E8',
            bgColor: that.sNodeColor,
          };
          break;
        }
        default:
          break;
      }
      return config;
    };
    const COLLAPSE_ICON = (x, y, r) => {
      return [
        ['M', x - r, y],
        ['a', r, r, 0, 1, 0, r * 2, 0],
        ['a', r, r, 0, 1, 0, -r * 2, 0],
        ['M', x - r + 4, y],
        ['L', x - r + 2 * r - 4, y],
      ];
    };
    const EXPAND_ICON = (x, y, r) => {
      return [
        ['M', x - r, y],
        ['a', r, r, 0, 1, 0, r * 2, 0],
        ['a', r, r, 0, 1, 0, -r * 2, 0],
        ['M', x - r + 4, y],
        ['L', x - r + 2 * r - 4, y],
        ['M', x - r + r, y - r + 4],
        ['L', x, y + r - 4],
      ];
    };
    const nodeBasicMethod = {
      createNodeBox: (group, config, level, w, h, isRoot) => {
        /* 最外面的大矩形 */
        const container = group.addShape('rect', {
          attrs: {
            x: 0,
            y: 0,
            width: w,
            heigh: h,
          },
          name: 'big-rect-shape',
        });
        /* 矩形 */
        group.addShape('rect', {
          attrs: {
            x: 3,
            y: 0,
            width: w - 19 - 20 * level,
            height: h,
            fill: config.bgColor,
            stroke: config.borderColor,
            radius: 2,
            cursor: 'pointer'
          },
          name: 'rect-shape',
        });

        if (!isRoot) {
          /* 左边的小圆点 */
          group.addShape('circle', {
            attrs: {
              x: 3,
              y: h / 2,
              r: 6,
              fill: config.basicColor,
            },
            name: 'left-dot-shape',
          });
        }

        /* 左边的粗线 */
        group.addShape('rect', {
          attrs: {
            x: 3,
            y: 0,
            width: 3,
            height: h,
            fill: config.basicColor,
            radius: 1.5,
          },
          name: 'left-border-shape',
        });
        return container;
      },
      /* 生成树上的 marker */
      createNodeMarker: (group, nodeData, collapsed, x, y) => {
        group.addShape('circle', {
          attrs: {
            x,
            y,
            r: 13,
            item: nodeData,
            fill: 'rgba(47, 84, 235, 0.05)',
            opacity: 0,
            zIndex: -2,
          },
          name: 'collapse-icon-bg',
        });
        group.addShape('marker', {
          attrs: {
            x,
            y,
            r: 7,
            item: nodeData,
            symbol: collapsed ? EXPAND_ICON : COLLAPSE_ICON,
            stroke: 'rgba(0,0,0,0.25)',
            fill: 'rgba(0,0,0,0)',
            lineWidth: 1,
            cursor: 'pointer',
          },
          name: 'collapse-icon',
        });
      },
      afterDraw: (cfg, group) => {
        /* 操作 marker 的背景色显示隐藏 */
        const icon = group.find((element) => element.get('name') === 'collapse-icon');
        if (icon) {
          const bg = group.find((element) => element.get('name') === 'collapse-icon-bg');
          icon.on('mouseenter', () => {
            bg.attr('opacity', 1);
            that.graph.get('canvas').draw();
          });
          icon.on('mouseleave', () => {
            bg.attr('opacity', 0);
            that.graph.get('canvas').draw();
          });
          icon.on('click', (e) => {
            e['propagationStopped'] = true;
            e['defaultPrevented'] = true;
            const nodeItem = e['propagationPath'][0]['attrs']['item'];
            if (nodeItem['collapsed']) {
              if (nodeItem['collapsed'] === 'EXPAND_ICON') {
                const childArray: any[] = that.cDatalist.filter(child => child[that.nodeParentField] === nodeItem['id'])
                that.expandDataList = JSON.parse(JSON.stringify(that.pDatalist));
                const parentIndex = that.expandDataList.findIndex(p => p[that.KEY_ID] === nodeItem['id']);
                childArray.unshift(parentIndex + 1, 0);
                Array.prototype.splice.apply(that.expandDataList, childArray);
                that.updateNode(that.expandDataList)
                that.updateLine();
                const newStepDate = { nodes: that.expandNodeList, edges: that.expandLineList }
                that.graph.changeData(newStepDate);
                if (that.nodeSelected) {
                  that.graph.setItemState(that.nodeSelected['_cfg']['id'], 'selected', true);
                } else {
                  that.graph.setItemState(that.expandNodeList[0].id, 'selected', true);
                }
              } else if (nodeItem['collapsed'] === 'COLLAPSE_ICON') {
                that.expandDataList = that.expandDataList.filter(child => child[that.nodeParentField] !== nodeItem['id']);
                that.updateNode(that.expandDataList)
                that.updateLine();
                const newStepDate = { nodes: that.expandNodeList, edges: that.expandLineList }
                that.graph.changeData(newStepDate);
                if (that.nodeSelected) {
                  if (that.nodeSelected['destroyed']) {
                    that.graph.setItemState(that.expandNodeList[0].id, 'selected', true);
                    this.evt = this.graph.findAllByState('node', 'selected')[0];
                    this.clickNode();
                  } else {
                    that.graph.setItemState(that.nodeSelected['_cfg']['id'], 'selected', true);
                  }
                } else {
                  that.graph.setItemState(that.expandNodeList[0].id, 'selected', true);
                }
              }
            }
          });
        }
      },
      setState: (name, value, item) => {
        const group = item.getContainer();
        that.graph.setAutoPaint(false);
        const node = group.get('children')[1]; // 顺序根据 draw 时确定
        if (name === 'selected') {
          if (value) {
            node.attr('fill', that.sNodeClickColor);
          } else {
            node.attr('fill', that.sNodeColor);
          }
        }
        that.graph.setAutoPaint(true);
      },
    };
    // 注册自定义 Behavior
    G6.registerBehavior('behaviorName', {
      // 设置事件及处理事件的回调之间的对应关系
      getEvents() {
        return {
          'node:click': 'onClick',
          'node:mouseenter': 'onNodeMouseEnter',
          'node:mouseout': 'onNodeMouseOut',
          'edge:click': 'onEdgeClick',
        };
      },
      /**
       * 处理 node:click 事件的回调
       * @override
       * @param  {Object} evt 事件句柄
       */
      onClick(evt?) {
        // TODO
        that.evt = evt;
        that.clickNode();
        // const node = evt.item;
        // that.nodeSelected = node;
        // that.NODE_SELECTED = that.dataList.find(e => e[that.KEY_ID] === node['_cfg']['id']);
        // // console.log('onClick', node);
        // const clickNodes = that.graph.findAllByState('node', 'selected');
        // clickNodes.forEach(cn => {
        //   that.graph.setItemState(cn, 'selected', false);
        // });
        // that.graph.setItemState(node, 'selected', true); // 设置当前节点的 selected 状态为 true
      },

      onNodeMouseEnter(evt) {
        // TODO
        if (evt.item._cfg.model.style.fill !== that.sNodeClickColor) {
          that.bNodeColor = evt.item._cfg.model.style.fill;
          evt.item._cfg.model.style.fill = that.sNodeEnterColor;
          evt.item.refresh();
        }
        // const node = evt.item;
        // this.graph.setItemState(node, 'running', true);
      },

      onNodeMouseOut(evt) {
        // TODO
        if (evt.item._cfg.model.style.fill !== that.sNodeClickColor) {
          evt.item._cfg.model.style.fill = that.bNodeColor;
          evt.item.refresh();
        }
        // const node = evt.item;
        // this.graph.setItemState(node, 'running', false);
      },

      onEdgeClick(evt) {
        // TODO
      }
    });
    // 注册自定义节点类型
    G6.registerNode('card-node', {
      draw: (cfg: any, group) => {
        const config = getNodeConfig(cfg);
        const isRoot = cfg.dataType === 'root';
        /* the biggest rect */
        const container = nodeBasicMethod.createNodeBox(group, config, cfg.level, cfg.width, cfg.height, isRoot);

        if (cfg.dataType !== 'root') {
          /* the type text */
          group.addShape('text', {
            attrs: {
              text: cfg.dataType,
              x: 3,
              y: -10,
              fontSize: 12,
              textAlign: 'left',
              textBaseline: 'middle',
              fill: 'rgba(0,0,0,0.65)',
            },
            name: 'type-text-shape',
          });
        }

        /* name */
        group.addShape('text', {
          attrs: {
            text: cfg.name,
            x: 19,
            y: 19,
            fontSize: 14,
            fontWeight: 700,
            textAlign: 'left',
            textBaseline: 'middle',
            fill: config.fontColor,
            cursor: 'pointer',
          },
          name: 'name-text-shape',
        });

        /* the description text */
        group.addShape('text', {
          attrs: {
            text: cfg.keyInfo,
            x: 19,
            y: 39,
            fontSize: 14,
            textAlign: 'left',
            textBaseline: 'middle',
            fill: config.fontColor,
            cursor: 'pointer',
          },
          name: 'bottom-text-shape',
        });

        const hasChildren = cfg.children;
        const collapsed = cfg.collapsed === 'EXPAND_ICON' ? true : false
        if (hasChildren) {
          nodeBasicMethod.createNodeMarker(group, cfg, collapsed, cfg.width - 7, cfg.height / 2); // mark的起始点的X坐标是条形节点的其实坐标-7，y坐标是一半
        }
        return container;
      },
      afterDraw: nodeBasicMethod.afterDraw,
      setState: nodeBasicMethod.setState,
    });
  }

  /*
     * 参数构建
     */
  public buildParameters(paramsCfg, data?, isArray = false): any | any[] {
    let parameterResult: any | any[];
    if (!isArray && !data) {
      parameterResult = ParameterResolver.resolve({
        params: paramsCfg,
        tempValue: this.tempValue,
        item: this.NODE_SELECTED,
      });
    } else if (!isArray && data) {
      parameterResult = ParameterResolver.resolve({
        params: paramsCfg,
        tempValue: this.tempValue,
        item: this.NODE_SELECTED,
      });
    } else if (isArray && data && Array.isArray(data)) {
      parameterResult = [];
      data.map(d => {
        const param = ParameterResolver.resolve({
          params: paramsCfg,
          tempValue: this.tempValue,
          item: this.NODE_SELECTED,
        });
        parameterResult.push(param);
      });
    }
    return parameterResult;
  }
}

