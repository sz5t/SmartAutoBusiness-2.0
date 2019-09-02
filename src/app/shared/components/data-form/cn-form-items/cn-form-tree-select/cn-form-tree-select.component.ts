import { Component, OnInit, Input, Inject } from '@angular/core';
import { CnComponentBase } from '@shared/components/cn-component.base';
import { BSN_COMPONENT_SERVICES } from '@core/relations/bsn-relatives';
import { ComponentServiceProvider } from '@core/services/component/component-service.provider';
import { ParameterResolver } from '@shared/resolver/parameter/parameter.resolver';
import { NzFormatEmitEvent, NzTreeNode } from 'ng-zorro-antd';

@Component({
  selector: 'app-cn-form-tree-select',
  templateUrl: './cn-form-tree-select.component.html',
  styleUrls: ['./cn-form-tree-select.component.less']
})
export class CnFormTreeSelectComponent extends CnComponentBase implements OnInit {
  @Input() public config;
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
  constructor(
    @Inject(BSN_COMPONENT_SERVICES)
    public componentService: ComponentServiceProvider
  ) {
    super(componentService);
    this.cacheValue = this.componentService.cacheService;
    this.tempValue = {};
    this.initValue = {};
    // init cacheValue
  }
  expandKeys = ['100', '1001'];
  value: string;
  nodes = [
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

  valueChange($event: string): void {
    console.log($event);
  }

  ngOnInit(): void {
    // mock async
    setTimeout(() => {
      this.value = '1001';
    }, 1000);
  }


  /**
   * load
   */
  public async load() {
    this.isLoading = true;
    const response = await this._getAsyncTreeData(this.config.loadingConfig);
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

  }

  private async _getAsyncTreeData(ajaxConfig = null, nodeValue = null) {
    const params = ParameterResolver.resolve({
      params: ajaxConfig.params,
      tempValue: this.tempValue,
      initValue: this.initValue,
      cacheValue: this.cacheValue,
      item: nodeValue
    })
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

    if (node.children && node.children.length > 0) {
      node.children.map(n => {
        this._setTreeNode(n);
      })
    }
  }

  public async expandNode($event: NzFormatEmitEvent | NzTreeNode) {
    let node;
    if ($event instanceof NzTreeNode) {
      node = $event;
    } else {
      node = $event['node'];
    }
    if (node && node.isExpanded) {
      const response = await this._getAsyncTreeData(this.config.expandConfig, node);
      if (response && response.data && response.data.length > 0) {
        response.data.map(d => {
          this._setTreeNode(d);
          d['isLeaf'] = false;
          d['children'] = [];
        });
        node.addChildren(response.data);
      } else {
        node.addChildren([]);
        node.isExpanded = false;
      }
      // (async () => {
      //     const s = await Promise.all(
      //         this.config.expand
      //             .filter(p => p.type === node.isLeaf)
      //             .map(async expand => {

      //             })
      //     )
      // })()
    } else if (node.isExpanded === false) {
      node.clearChildren();
    }
  }



  // 树加载
  // 定义树结构
  // id  name parentid  =》 指定字段
  // 树类型（异步树、静态树）
  // 异步树-》Expand 节点展开-》数据加载，可扩充条件，加载不同数据，异构树
  // 下拉树，值展示 根据component 取出对象值

}
