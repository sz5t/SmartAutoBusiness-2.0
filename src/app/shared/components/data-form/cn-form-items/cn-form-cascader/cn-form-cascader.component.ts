import { Component, OnInit, Input, Output, EventEmitter, ViewChild, Inject } from '@angular/core';
import { CnComponentBase } from '@shared/components/cn-component.base';
import { FormGroup } from '@angular/forms';
import { BSN_COMPONENT_SERVICES } from '@core/relations/bsn-relatives';
import { ComponentServiceProvider } from '@core/services/component/component-service.provider';
import { ParameterResolver } from '@shared/resolver/parameter/parameter.resolver';
import { isArray } from 'util';

@Component({
  selector: 'app-cn-form-cascader',
  templateUrl: './cn-form-cascader.component.html',
  styleUrls: ['./cn-form-cascader.component.less']
})
export class CnFormCascaderComponent extends CnComponentBase implements OnInit {
  @Input() public config;
  @Input() formGroup: FormGroup;
  @Input() tempData;
  @Input() initData;
  @Output() public updateValue = new EventEmitter();

  isLoading;
  public mapOfDataState: {
    [key: string]: {
      disabled: boolean,
      checked: boolean,
      selected: boolean,
      state: string,
      data: any,
      originData: any,
      actions?: any[],
      validation?: boolean
    }
  } = {};
  KEY_ID: any;
  cascadeOptions: any;
  constructor(
    @Inject(BSN_COMPONENT_SERVICES)
    public componentService: ComponentServiceProvider
  ) {
    super(componentService);
    this.cacheValue = this.componentService.cacheService;
    this.initValue = {};
    // init cacheValue
  }
  expandKeys = null; // ['100', '1001'];
  value: string;
  _value;
  nodes = [];
  nodes1 = [
    {
      title: 'parent 1',
      key: '100',
      children: [
        {
          title: 'parent 1-0',
          key: '1001',
          children: [
            { title: 'leaf 1-0-0', key: '10010', isLeaf: true },
            { title: 'leaf 1-0-1', key: '10011', isLeaf: true }
          ]
        },
        {
          title: 'parent 1-1',
          key: '1002',
          children: [{ title: 'leaf 1-1-0', key: '10020', isLeaf: true }]
        }
      ]
    }
  ];


  async valueChange(v: string): Promise<void> {
    // v = "6IkDKuH1iXCnC5xiszniEVbbUWnOLRKm";
    // this.value = v;
    // v = 'A2a1BqdtCsLfoLB23YwJpkrRSvTrdHdc';
   // console.log("树valueChange", v);
    if (!this.nodes || (this.nodes && this.nodes.length <= 0)) {
      await this.load();
    }


    let item = null;
    if (v) {
      item = this.getChidlren(v);
/*       if (!item) {
        // 异步执行 loaditem
        item = await this.loadItem();

        const _itemData = {};
        this.config.columns.map(column => {
          _itemData[column['type']] = item[column['field']];
        });
        _itemData['isLeaf'] = true;
        _itemData['isSystem_Add'] = true;


        this.nodes = [...[_itemData], ... this.nodes];

        // const d: any = {
        //   key: _itemData['key'],
        //   title:_itemData['title'],
        //   level: 1,
        //   parentNode: null,
        //   origin: item
        // };
        // this.tree['selectedNodes'] = [];
        // this.tree['value'] = [];
        // this.tree['selectedNodes'].push(new NzTreeNode(d));
        // this.tree['value'].push( _itemData['key'] );
        // this.tree['selectedNodes'][0]['_title'] =  _itemData['title'];

       // console.log('zxzxzxzxzx', this.nodes);
      } */
    }

    const backValue = { name: this.config.field, value: v, id: this.config.config.id, dataItem: item };
    this.updateValue.emit(backValue);



    console.log('下拉树返回', backValue);
  }


  valueChange_ByCascader(v?){
     if(v){
         this.value =v[v.length-1];
         if(! this.value){
          this.value =null;
         }
     } else {
       v=null;
       this.value = null;
     }


  }

  validate(option?, _index ?: number): boolean {
    const value = option.value as string;
    return true;
  }

  clicktree() {

    const item = {};
    item['key'] = "A2a1BqdtCsLfoLB23YwJpkrRSvTrdHdc";
    item['NAME'] = "开发一部";
    const d: any = {
      key: "A2a1BqdtCsLfoLB23YwJpkrRSvTrdHdc",
      level: 1,
      parentNode: null,
      origin: item
    };
    // this.tree['selectedNodes'] = [];
    // this.tree['value'] = [];
    // this.tree['selectedNodes'].push(new NzTreeNode(d));
    // this.tree['value'].push( item['key'] );
    // this.tree['selectedNodes'][0]['_title'] =  item['NAME'];
    // console.log('下拉树返回___CLICK', this.tree);
  }

  ngOnInit(): void {
    this.KEY_ID = this.config.keyId ? this.config.keyId : 'ID';
    this.tempValue = this.tempValue;
    this.initValue = this.initData;
    // this.value = 'A2a1BqdtCsLfoLB23YwJpkrRSvTrdHdc';
  }


  // 构建参数-》下拉选择自加载数据
  public buildParameters(paramsCfg) {
    return ParameterResolver.resolve({
      params: paramsCfg,
      tempValue: this.tempValue,
      componentValue: { value: this.value }, //  组件值？返回值？级联值，需要三值参数
      initValue: this.initValue,
      cacheValue: this.cacheValue,
      router: this.routerValue,
      cascadeValue: this.cascadeValue,
      userValue:this.userValue
    });
  }
  public async loadItem() {
    if (!this.config.loadingItemConfig) {
      return null;
    }
    let selectedRowItem = null;
    const url = this.config.loadingItemConfig['ajaxConfig'].url;
    const method = this.config.loadingItemConfig['ajaxConfig'].ajaxType;
    const params = {
      ...this.buildParameters(this.config.loadingItemConfig['ajaxConfig'].params)
    };
    // 考虑满足 get 对象，集合，存储过程【指定dataset 来接收数据】，加载错误的信息提示
    const response = await this.componentService.apiService.getRequest(url, method, { params }).toPromise();
    if (isArray(response.data)) {
      if (response.data && response.data.length > 0) {
        const data_form = response.data;
        selectedRowItem = data_form[0];
      }
      else {
        selectedRowItem = null;
      }
    } else {
      if (response.data) {
        selectedRowItem = response.data;
      } else {
        selectedRowItem = null;
      }
    }
    return selectedRowItem;
  }
  /**
   * load
   */
  public async load() {
    this.isLoading = true;
    const response = await this._getAsyncTreeData(this.config.loadingConfig.ajaxConfig);

    if (response && response.data) {
      response.data.map((d, index) => {
        // 默认选中第一个节点
        if (index === 0) {
          d['selected'] = true;
          //  this.ACTIVED_NODE = {};
          //  this.ACTIVED_NODE['origin'] = d;
        }
        this._setTreeNode(d);

      });
      this.nodes = response.data;
      this.isLoading = false;
    } else {
      this.isLoading = false;
    }

    console.log("&&&&&&&&&&&&&&", this.nodes);

  }

  private async _getAsyncTreeData(ajaxConfig = null, nodeValue = null) {
    const params = ParameterResolver.resolve({
      params: ajaxConfig.params,
      tempValue: this.tempValue,
      initValue: this.initValue,
      cacheValue: this.cacheValue,
      item: nodeValue,
      userValue:this.userValue
    });
    const ajaxData = await this.componentService.apiService
      .getRequest(
        ajaxConfig.url,
        'get',
        { params }
      ).toPromise();
    return ajaxData;
  }

  private _setTreeNode(node) {
    this.mapOfDataState[node[this.KEY_ID]] = {
      disabled: false,
      checked: false, // index === 0 ? true : false,
      selected: false, // index === 0 ? true : false,
      state: 'text',
      data: node,
      originData: { ...node },
      // validation: true,
      // actions: this.getRowActions('text')
    };
    this.config.columns.map(column => {
      node[column['type']] = node[column['field']];
    });

    const dd = this.nodes.find(d => d.isSystem_Add);
    if (dd) {
      if (node['key'] === dd['key']) {
          this.nodes = this.nodes.filter(d=>!d.isSystem_Add);
      }
    }



    if (node.children && node.children.length > 0) {
      if (!this.config.asyncData) {
        // 静态
        node.children.map(n => {
          this._setTreeNode(n);
        })
      }
      node['isLeaf'] = false;
    }else{
        node['isLeaf'] = true;
    }
  }


  // 展开加载
  loadData(node?): PromiseLike<void> {

    return new Promise(resolve => {
      setTimeout(() => {
        // if (index < 0) {
        //   // if index less than 0 it is root node
        //   node.children = provinces;
        // } else if (index === 0) {
        //   node.children = cities[node.value];
        // } else {
        //   node.children = scenicspots[node.value];
        // }
        resolve();
      }, 1000);
    });
  }
  // public async expandNode($event: NzFormatEmitEvent | NzTreeNode) {
  //   let node;
  //   if ($event instanceof NzTreeNode) {
  //     node = $event;
  //   } else {
  //     node = $event['node'];
  //   }

  //   if (!this.config.asyncData) {
  //     return true;
  //   }

  //   if (node && node.isExpanded) {
  //     const response = await this._getAsyncTreeData(this.config.expandConfig.ajaxConfig, node);
  //     if (response && response.data && response.data.length > 0) {
  //       node.clearChildren();
  //       response.data.map(d => {
  //         this._setTreeNode(d);
  //         // d['isLeaf'] = false;
  //        //  d['children'] = [];
  //       });
  //       node.addChildren(response.data);
  //     } else {
  //       node.addChildren([]);
  //       node.isExpanded = false;
  //     }
  //   } else if (node.isExpanded === false) {
  //     node.clearChildren();
  //   }
  // }

  // onExpandChange(e: Required<NzFormatEmitEvent>): void {
  //   const node = e.node;
  //   if (node && node.getChildren().length === 0 && node.isExpanded) {
  //     this.loadNode().then(data => {
  //       node.addChildren(data);
  //     });
  //   }
  // }

  getChidlren(id) {
    let hasFound = false; // 表示是否有找到id值
    let result = null;
    const fn = (data) => {
      if (Array.isArray(data) && !hasFound) { // 判断是否是数组并且没有的情况下，
        data.forEach(item => {
          if (item.key === id) { // 数据循环每个子项，并且判断子项下边是否有id值
            result = item; // 返回的结果等于每一项
            hasFound = true; // 并且找到id值
          } else if (item.children) {
            fn(item.children); // 递归调用下边的子项
          }
        })
      }
    }
    fn(this.nodes); // 调用一下
    return result;
  }

  public cascadeAnalysis(c?) {
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

    }

   }




}