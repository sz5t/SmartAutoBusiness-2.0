import { AfterViewInit, Component, EventEmitter, Inject, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { CN_TREE_GRID_METHOD } from '@core/relations/bsn-methods/bsn-tree-grid-method';
import { CN_TREE_GRID_PROPERTY } from '@core/relations/bsn-property/tree-grid.property.interface';
import { BSN_COMPONENT_SERVICES } from '@core/relations/bsn-relatives';
import { ComponentServiceProvider } from '@core/services/component/component-service.provider';
import { environment } from '@env/environment';
import { CnComponentBase } from '@shared/components/cn-component.base';
import { CnPageComponent } from '@shared/components/cn-page/cn-page.component';
import { ButtonOperationResolver } from '@shared/resolver/buttonOperation/buttonOperation.resolver';
import { ParameterResolver } from '@shared/resolver/parameter/parameter.resolver';
import { RelationResolver } from '@shared/resolver/relation/relation.resolver';
import { Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-cn-static-tree-table',
  templateUrl: './cn-static-tree-table.component.html',
  styleUrls: ['./cn-static-tree-table.component.less']
})
export class CnStaticTreeTableComponent extends CnComponentBase
  implements OnInit, AfterViewInit, OnDestroy {
  @Input()
  public config; // dataTables 的配置参数
  @Input()
  public permissions = [];
  @Input()
  public dataList = [];
  @Input() dataServe;
  @Output() public updateValue = new EventEmitter();
  /**
   * 组件名称
   * 所有组件实现此属性 
   */
  public COMPONENT_NAME = "cnStaticTreeTable";
  /**
   * 组件操作对外名称
   * 所有组件实现此属性
   */
  public COMPONENT_METHODS = CN_TREE_GRID_METHOD;

  public COMPONENT_PROPERTY = CN_TREE_GRID_PROPERTY;

  public tableColumns = [];

  public spanCount = 0;


  public isLoading = false;
  public loading = false;
  public pageIndex = 1;
  public pageSize = 10;
  public total = 0;
  public focusIds;

  public isAllChecked = false;
  public indeterminate = false;
  public mapOfDataState: {
    [key: string]: {
      disabled: boolean,
      checked: boolean,
      selected: boolean,
      state: string,
      data: any,
      originData: any,
      actions?: any[],
      validation?: boolean,
      parent?: any,
      children?: any[]
    }
  } = {};

  public mapOfDataExpanded: { [key: string]: any[] } = {};
  public checkedNumber = 0;

  public KEY_ID: string;
  public PARENT_ID: string;

  public _sortName;
  public _sortValue;

  public ROWS_ADDED: any[] = [];
  public ROWS_EDITED: any[] = [];
  public ROW_SELECTED: any;
  public ROWS_CHECKED: any[] = [];
  public COMPONENT_VALUE: any[] = [];
  public ROW_CURRENT: any;

  public operationRow: any;
  private _search_row;

  private _columnFilterList;

  private _sender_source$: Subject<any>;
  private _receiver_source$: Subject<any>;
  private _trigger_source$: Subject<any>;

  private _receiver_subscription$: Subscription;
  private _sender_subscription$: Subscription;
  private _trigger_receiver_subscription$: Subscription;

  public RowActions: any[] = [];
  // 前置条件集合
  public beforeOperation;

  constructor(
    @Inject(BSN_COMPONENT_SERVICES)
    public componentService: ComponentServiceProvider
  ) {
    super(componentService);
    this.cacheValue = this.componentService.cacheService;
    this.tempValue = {};
    this.initValue = {};
  }

  public ngOnInit() {
    // 设置数据操作主键
    this.KEY_ID = this.config.keyId ? this.config.keyId : 'id';
    this.PARENT_ID = this.config.parentKey ? this.config.parentKey : 'parentId';

    // 初始化默认分页大小
    this.config.pageSize && (this.pageSize = this.config.pageSize);
    // 日志
    this.initLog();
    this.getPermissionRowActions();
    // 构建表格列及列标题
    this._buildColumns(this.config.columns);

    // 解析及联配置
    this.resolveRelations();

    // 是否需要进行初始化数据加载
    if (this.config.loadingOnInit) {
      this.load();
    }
  }

  public ngAfterViewInit() {

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

  public getCurrentComponentId() {
    return this.config.id;
  }

  public async load() {
    this.isLoading = true;
    const response = await this._getAsyncData(this.config.loadingConfig);
    if (response && response.data && response.data.resultDatas) {
      response.data.resultDatas.map((d, index) => {

        this.mapOfDataState[d[this.KEY_ID]] = {
          disabled: false,
          checked: false, // index === 0 ? true : false,
          selected: false, // index === 0 ? true : false,
          state: 'text',
          data: d,
          originData: { ...d },
          validation: true,
          actions: this.getRowActions('text')
        };

        this.mapOfDataExpanded[d[this.KEY_ID]] = this._convertTreeToList(d);
        // const dsa = this._convertTreeToList(d);

        // this.mapOfDataState[d[this.KEY_ID]].children = this._convertTreeToList(d);

        index === 0 && (this.ROW_SELECTED = d);
      });
      this.dataList = response.data.resultDatas;
      this.total = response.data.count;
      // 更新
      // this.dataCheckedStatusChange();
      // 默认设置选中第一行, 初始数据的选中状态和选中数据,均通过setSelectRow方法内实现
      this.setSelectRow(this.ROW_SELECTED);
      this.isLoading = false;
    } else {
      this.isLoading = false;
    }

    console.log('xxxxxliuxxxxxx', this.dataList);
  }

  private async _getAsyncData(ajaxConfig = null, nodeValue = null, isPaging = true) {
    let params = ParameterResolver.resolve({
      params: ajaxConfig.params,
      tempValue: this.tempValue,
      initValue: this.initValue,
      cacheValue: this.cacheValue,
      item: nodeValue,
      userValue: this.userValue
    });

    if (isPaging) {
      params = { ...params, ...this._buildPaging() };
    }
    const ajaxData = await this.componentService.apiService
      .getRequest(
        ajaxConfig.url,
        'get',
        { params }
      ).toPromise();
    return ajaxData;
  }

  /**
       * 构建分页
       * @returns {{}}
       * @private
       */
  private _buildPaging() {
    const params = {};
    if (this.config.isPagination) {
      params['_page'] = this.pageIndex;
      params['_rows'] = this.pageSize;
    }
    return params;
  }

  // 渲染行内操作
  public getRowActions(state): any[] {
    const orginAction = this.tableColumns.find(c => c.type === 'action');
    const copyAction = [];
    if (orginAction) {
      if (this.tableColumns.find(c => c.type === 'action').action) {
        const actions = JSON.parse(JSON.stringify(this.tableColumns.find(c => c.type === 'action').action.filter(c => c.state === state)));
        copyAction.push(...actions);
      }
    }
    return copyAction;
  }

  // 前端组装树形结构数据
  private _convertTreeToList(_root: any, _level = 0): any[] {
    const stack: any[] = [];
    const array: any[] = [];
    const hasMap = {};
    const columnState = this.config['editable'] ? this.config['editable'] : 'text'
    stack.push(
      {
        level: _level,
        expand: false,
        disabled: false,
        checked: false, // index === 0 ? true : false,
        selected: false, // index === 0 ? true : false,
        state: columnState,
        data: _root,
        originData: { ..._root },
        validation: true,
        actions: this.getRowActions('text'),
        children: _root['children'] ? [] : null,
        isNewRow: false
      });

    while (stack.length !== 0) {
      const node = stack.pop();
      this._visitNode(node, hasMap, array);
      if (node.children) {
        for (let i = node.children.length - 1; i >= 0; i--) {
          stack.push(
            {
              level: node.level + 1,
              expand: false,
              parent: node,
              disabled: false,
              checked: false, // index === 0 ? true : false,
              selected: false, // index === 0 ? true : false,
              state: columnState,
              data: node.children[i],
              originData: { ...node.children[i] },
              validation: true,
              actions: this.getRowActions('text')
            })
        }
      }
    }

    return array;
  }

  // 映射节点信息
  private _visitNode(node, hasMap: { [key: string]: any }, array: any[]) {
    if (!hasMap[node[this.KEY_ID]]) {
      hasMap[node[this.KEY_ID]] = true;
      array.push(node);
    }
  }

  // 选中行
  public setSelectRow(rowData?, $event?) {
    if (!rowData) {
      return false;
    }
    if ($event) {
      const src = $event.srcElement || $event.target;
      if (src.type !== undefined) {
        return false;
      }
      $event.stopPropagation();
      $event.preventDefault();
    }

    this.ROW_SELECTED = rowData;

    // 选中当前行
    this.dataList.map(row => {
      this.mapOfDataExpanded[row[this.KEY_ID]].map(mItem => {
        mItem['selected'] = false;
      });
      this.mapOfDataExpanded[row[this.KEY_ID]].map(mItem => {
        mItem['checked'] = false;
      });
    });

    this.mapOfDataExpanded[rowData[this.KEY_ID]].map(mItem => {
      if (mItem.data[this.KEY_ID] === rowData[this.KEY_ID]) {
        mItem['selected'] = true;
      }
      if (mItem.data[this.KEY_ID] === rowData[this.KEY_ID]) {
        mItem['checked'] = true;
      }
    });

    // this.mapOfDataExpanded[rowData[this.KEY_ID]]['selected'] = true;

    // 勾选/取消当前行勾选状态
    this.mapOfDataExpanded[rowData[this.KEY_ID]]['checked'] = !this.mapOfDataExpanded[rowData[this.KEY_ID]]['checked'];
    this.dataCheckedStatusChange();
    return true;
  }

  /**
   * 全选
   */
  public checkAll($value: boolean): void {
    this.dataList.map(
      item => {
        this.mapOfDataExpanded[item[this.KEY_ID]]
          .filter(mItem => !mItem['disabled'])
          .map(mItem => mItem['checked'] = $value);
      }
    )

    this.dataCheckedStatusChange();

  }

  /**
   * 更新数据选中状态的CheckBox
   */
  public dataCheckedStatusChange() {
    this.isAllChecked = this.dataList.every(
      item => {
        return this.mapOfDataExpanded[item[this.KEY_ID]]
          .filter(mItem => !mItem['disabled'])
          .every(mItem => mItem['checked']);
      }
    )

    this.indeterminate = this.dataList.some(
      item => {
        return this.mapOfDataExpanded[item[this.KEY_ID]]
          .filter(mItem => !mItem['disabled'])
          .some(mItem => mItem['checked'] && !this.isAllChecked);
      }
    )

    this.checkedNumber = 0;
    this.ROWS_CHECKED = [];
    this.dataList.map(item => {
      const itemLength = this.mapOfDataExpanded[item[this.KEY_ID]]
        .filter(mItem => mItem['checked']).length;
      this.checkedNumber = this.checkedNumber + itemLength;

      this.ROWS_CHECKED.push(...this.mapOfDataExpanded[item[this.KEY_ID]].filter(mItem => mItem['checked']));
    })
  }

  /**
     * 构建表格列集合
     * @param columns 
     */
  private _buildColumns(columns) {
    if (Array.isArray(columns) && columns.length > 0) {
      const colObjs = columns.filter(item => item.type === 'field');
      const actionCfgs = columns.filter(item => item.type === 'action');
      if (actionCfgs && actionCfgs.length > 0) {
        actionCfgs.map(cfg => {
          const colActions = [];
          cfg.actionIds.map(actionId => {
            const act = this.RowActions.find(action => actionId === action.id);
            if (act) {
              colActions.push(act);
            }
          });
          if (colActions.length > 0) {
            cfg['action'] = colActions;
          }

        })
      }

      if (colObjs && colObjs.length > 0) {
        this.tableColumns.push(...colObjs);
      }
      if (actionCfgs && actionCfgs.length > 0) {
        this.tableColumns.push(...actionCfgs);
      }
    }

  }

  // 展开节点的方法
  public expandRow(item, $event: boolean) {
    console.log('expandRow', item);
    if ($event) {
      const appendedChildrenData: any[] = [];
      if (item.data['children'] && item.data['children'].length > 0) {
        item.data['children'].map(data => {
          if (data['children'] && data['children'].length > 0) {

          } else {
            data['children'] = null;
          }
          this.mapOfDataExpanded[data[this.KEY_ID]] = this._convertTreeToList(data, item.level + 1);
          appendedChildrenData.push(data);
          this.total = this.total + 1;
        })
      } else {
        item.data['children'] = null;
      }
      // 给状态数组中映射展开之后的节点数据
      appendedChildrenData.forEach(d => {
        this.mapOfDataState[d[this.KEY_ID]] = {
          disabled: false,
          checked: false, // index === 0 ? true : false,
          selected: false, // index === 0 ? true : false,
          state: 'text',
          data: d,
          originData: { ...d },
          validation: true,
          actions: this.getRowActions('text')
        };
      })

      item['children'] = appendedChildrenData;
      if (appendedChildrenData.length > 0) {
        item['children'] = appendedChildrenData;
      } else {
        item['children'] = null;
      }
      this._appendChildrenToList(item.data, appendedChildrenData);
    } else {
      if (item['children'] && item['children'].length > 0) {
        item['children'].map(c => {
          if (this.mapOfDataExpanded[c[this.KEY_ID]] && this.mapOfDataExpanded[c[this.KEY_ID]].length > 0) {
            this.mapOfDataExpanded[c[this.KEY_ID]].map(s => {
              this.expandRow(s, false);
            })
          }
          this.dataList = this.dataList.filter(d => d[this.KEY_ID] !== c[this.KEY_ID]);
          delete this.mapOfDataExpanded[c[this.KEY_ID]];
          this.total = this.total - 1;
        });
      }
    }
    this.dataCheckedStatusChange();
    // if ($event === false) {
    //     if (item.children) {
    //         item.children.map(d => {
    //             const target = array.find(arr => arr[this.KEY_ID] === d[this.KEY_ID]);
    //             target.expand = false;
    //             this.expandRow(array, target, false);
    //         })
    //     }
    // } else {
    //     return;
    // }
  }

  private _appendChildrenToList(parent, childrenList) {
    const index = this.dataList.findIndex(d => d[this.KEY_ID] === parent[this.KEY_ID]);
    for (let i = 0, len = this.dataList.length; i < len; i++) {
      childrenList.forEach(child => {
        if (i > -1) {
          if (this.dataList[i][this.KEY_ID] === child[this.KEY_ID]) {
            this.dataList.splice(i, 1);
            i--;
            len--;
          }
        }

      });
    }
    this.dataList.splice(index + 1, 0, ...childrenList);
    this.dataList = this.dataList.filter(d => d[this.KEY_ID] !== null);
  }

  // 初始化消息解析
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

  // 初始化读取按钮权限
  public getPermissionRowActions() {
    let componentPermission: any;
    let colActions = [];
    if (this.config.id) {
      componentPermission = this.getMenuComponentPermissionConfigById(this.config.id);
    }
    let enableToolbarPermission = false;
    if (environment['systemSettings'] && environment['systemSettings']['systemMode'] === 'work') {

      if (environment['systemSettings'] && environment['systemSettings']['permissionInfo']) {
        if (environment['systemSettings']['enablePermission']) {
          enableToolbarPermission = environment['systemSettings']['permissionInfo']['enableRowActionPermission'];
        }
      }
    }
    if (this.config['exceptionPermission']) {
      enableToolbarPermission = false;
    }
    const permissionMap = new Map();
    if (componentPermission && componentPermission['permission']) {
      componentPermission && componentPermission['permission'].forEach(item => {
        if (item['type'] === 'rowActions') {
          permissionMap.set(item.id, item);
        }
      });
    }

    if (this.config['rowActions']) {
      this.config['rowActions'].forEach(item => {

        if (!enableToolbarPermission || (!item.hasOwnProperty('id')) || (enableToolbarPermission && item.id && permissionMap.has(item.id + '_rowActions'))) {
          item['permission'] = true;
        }

        if (item['permission']) {
          colActions.push(item);
        }


      });
    }

    this.RowActions = colActions;
  }

  /**
   * 列排序
   * @param $sort {key:string, value: string} 
   */
  public sort($sort: { key: string, value: string }): void {
    this._sortName = $sort.key;
    this._sortValue = $sort.value;
    this.load();
  }

  public searchData(reset: boolean = false) {
    if (reset) {
      this.pageIndex = 1;
    }
    this.isAllChecked = false;
    this.indeterminate = false;
    this.load();
  }

  // 值变化触发方法
  formCascade = {};
  public valueChange(v?) {
    console.log('行返回', v);
    this.mapOfDataState[v.id]['data'][v.name] = v.value;
    if (v['id']) {
      if (!this.formCascade[v['id']]) {
        this.formCascade[v['id']] = {};
      }
      this.formCascade[v['id']][v['name']] = {};
    }

    const triggerKey = v.name;
    if (this.config['cascadeValue'])
      this.config['cascadeValue'].forEach(cascade => {
        if (cascade.name !== triggerKey) {
          return true;
        }
        // console.log('==****开始应答解析*****==', cascade);
        cascade.CascadeObjects.forEach(cascadeObj => {
          if (!this.formCascade[v['id']][cascadeObj.cascadeName]) {
            this.formCascade[v['id']][cascadeObj.cascadeName] = {};
          }
          const cascadeResult = this.formCascade[v['id']][cascadeObj.cascadeName];  // 单个应答对象
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
              // this.setValue(cascadeObj.cascadeName, null); // 异步执行前，将组件值置空
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
              // 赋值
              // this.setValue(cascadeObj.cascadeName, __setValue);

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
          this.formCascade[v['id']][cascadeObj.cascadeName] = JSON.parse(JSON.stringify(this.formCascade[v['id']][cascadeObj.cascadeName]));
          // console.log('==树表内值变化反馈==', this.formCascade);
        });
      });
  }

  public transferValue(option?) {
    console.log('将接受传递的值');
  }

  /**
     * 
     * @param actionCfg 当前操作按钮的配置
     * @param rowData 当前数据行
     * @param $event 
     */
  public rowAction(actionCfg, dataOfState, $event?) {

    $event && $event.stopPropagation();
    this.ROW_CURRENT = dataOfState.data;
    const trigger = new ButtonOperationResolver(this.componentService, this.config, dataOfState);
    trigger.toolbarAction(actionCfg, this.config.id);
    $event && $event.preventDefault();
  }

  public buildParameters(paramsCfg, data?, isArray = false) {
    let parameterResult: any | any[];
    if (!isArray && !data) {
      parameterResult = ParameterResolver.resolve({
        params: paramsCfg,
        tempValue: this.tempValue,
        componentValue: this.COMPONENT_VALUE,
        item: this.ROW_SELECTED,
        initValue: this.initValue,
        cacheValue: this.cacheValue,
        router: this.routerValue,
        addedRows: this.ROWS_ADDED,
        editedRows: this.ROWS_EDITED,
        selectedRow: this.ROW_SELECTED,
        currentRow: this.ROW_CURRENT,
        userValue: this.userValue,
        menuValue: this.componentService.cacheService.getNone('activeMenu') ?
          this.componentService.cacheService.getNone('activeMenu') : {}

      });
    } else if (!isArray && data) {
      if (data['_procedure_resultset_1']) {
        data = data['_procedure_resultset_1'][0];
      }
      parameterResult = ParameterResolver.resolve({
        params: paramsCfg,
        tempValue: this.tempValue,
        componentValue: this.COMPONENT_VALUE,
        item: data ? data : this.ROW_SELECTED,
        initValue: this.initValue,
        cacheValue: this.cacheValue,
        router: this.routerValue,
        addedRows: data,
        editedRows: data,
        validation: data,
        returnValue: data,
        selectedRow: this.ROW_SELECTED,
        currentRow: this.ROW_CURRENT,
        userValue: this.userValue,
        menuValue: this.componentService.cacheService.getNone('activeMenu') ?
          this.componentService.cacheService.getNone('activeMenu') : {}

      });
    } else if (isArray && Array.isArray(data)) {
      parameterResult = [];
      data.map(d => {
        const param = ParameterResolver.resolve({
          params: paramsCfg,
          tempValue: this.tempValue,
          componentValue: d,
          item: this.ROW_SELECTED,
          initValue: this.initValue,
          cacheValue: this.cacheValue,
          router: this.routerValue,
          addedRows: d,
          editedRows: d,
          validation: d,
          returnValue: d,
          currentRow: this.ROW_CURRENT,
          userValue: this.userValue,
          menuValue: this.componentService.cacheService.getNone('activeMenu') ?
            this.componentService.cacheService.getNone('activeMenu') : {}
        });
        parameterResult.push(param);
      })
    }
    return parameterResult;
  }

  public showWindow(option: any) {
    let dialog;
    // 根据按钮类型初始化表单状态
    const dialogCfg = option.window;

    // const isEditForm = dialogCfg.form.state === 'edit' ? true : false;
    // if(isEditForm) {

    // }
    if (option.changeValue) {
      const d = ParameterResolver.resolve({
        params: option.changeValue.params,
        tempValue: this.tempValue,
        // componentValue: cmptValue,
        item: option.data.data ? option.data.data : option.data,
        initValue: this.initValue,
        cacheValue: this.cacheValue,
        router: this.routerValue,
        selectedRow: this.ROW_SELECTED,
        addedRows: this.ROWS_ADDED,
        editedRows: this.ROWS_EDITED,
        userValue: this.userValue
      });
      option.changeValue.params.map(param => {
        if (param.type === 'value') {
          // 类型为value是不需要进行任何值的解析和变化
        } else {
          if (d[param.name]) {
            param['value'] = d[param.name];
          }
        }
      });
    }

    const dialogOptional = {
      nzTitle: dialogCfg.title ? dialogCfg.title : '',
      nzWidth: dialogCfg.width ? dialogCfg.width : '600px',
      nzStyle: dialogCfg.style ? dialogCfg.style : null, // style{top:'1px'},
      nzMaskClosable: dialogCfg.hasOwnProperty('maskClosable') ? dialogCfg.maskClosable : false,
      nzContent: CnPageComponent,
      nzComponentParams: {
        // config:this. tableConfig,
        config: {},
        customPageId: dialogCfg.layoutName, // "0MwdEVnpL0PPFnGISDWYdkovXiQ2cIOG",
        // initData:this.initData
        changeValue: option.changeValue ? option.changeValue.params : []
      },
      nzFooter: [
        {
          label: dialogCfg.cancelText ? dialogCfg.cancelText : 'cancel',
          onClick: componentInstance => {
            dialog.close();
          }
        },
        {
          label: dialogCfg.okText ? dialogCfg.okText : 'OK',
          onClick: componentInstance => {
            dialog.close();
            /*  (async () => {
                 const response = await componentInstance.executeModal(option);
                 this._sendDataSuccessMessage(response, option.ajaxConfig.result);

                 // 处理validation结果
                 this._sendDataValidationMessage(response, option.ajaxConfig.result)
                     &&
                     this._sendDataErrorMessage(response, option.ajaxConfig.result)
                     && dialog.close();
             })(); */
          }
        }
      ]
    }

    // 自定义 操作按钮
    if (dialogCfg.footerButton && dialogCfg.footerButton.length > 0) {
      dialogOptional.nzFooter = [];

      dialogCfg.footerButton.forEach(_button => {
        dialogOptional.nzFooter.push(
          {
            label: _button.text,
            onClick: componentInstance => {
              // dialog.close();
              // customAction
              let customAction;
              if (dialogCfg.customAction && dialogCfg.customAction.length > 0) {
                let customActionList = dialogCfg.customAction.filter(item => item.id === _button.customActionId);
                if (customActionList && customActionList.length > 0) {
                  customAction = customActionList[0];
                }
              }

              this.execCustomAction(customAction, dialog, componentInstance);
            }
          }
        );
      });

    }

    dialog = this.componentService.modalService.create(dialogOptional);
    this.windowDialog = dialog;
  }

  // 执行弹出页的按钮事件
  public execCustomAction(customAction?, dialog?, componentInstance?) {
    const customAction1 = [
      {
        id: "001",
        "declareParams": [
          {
            "name": "A",
            "componentId": "",
            "type": "",  // 取值，当前组件、弹出页面组件值，分两部分取值
            "datatype": "string",
            "value": "name"
          },
        ],
        execute: [
          {
            "type": "relation",
            "sender": {                                  // -- 设置消息发送内容, 当切仅当type为relation时该配置才生效
              "senderId": "afterSelectValueChange"
            },
          },
          {
            "type": "relation",
            "sender": {                                  // -- 设置消息发送内容, 当切仅当type为relation时该配置才生效
              "senderId": "afterSelectValueChange"
            },
          },
          {
            "type": "relation",
            "sender": {                                  // -- 设置消息发送内容, 当切仅当type为relation时该配置才生效
              "senderId": "afterSelectValueChange"
            },
          }
        ]
      }
    ];

    customAction.execute.forEach(item => {


      if (item.type === 'relation') {
        new RelationResolver(this)
          .resolveInnerSender(
            item.sender,
            {},
            Array.isArray({})
          );
      } else if (item.type === 'action') {
        this.windowDialog.close();
      }

    });

    // new RelationResolver(this). resolveSender();
    return true;
  }

  windowDialog;

  // 初始化日志服务
  public initLog() {
    if (environment['systemSettings']['enableLog']) {
      this.beforeLog(this, 'rowAction', this.writeLogInfo);
    }
  }

  public async writeLogInfo(that?, arguments1?) {

    console.log('ap===>', arguments1);
    let btnOption = arguments1[0];
    const text = btnOption['text'];
    let componentId;
    if (btnOption['targetViewId']) {
      componentId = btnOption['targetViewId'];
    } else {
      componentId = that.config['id'];
    }

    // 记录 按钮、按钮组件标识、作用组件
    let logConfig;
    let btnData;
    btnData = {
      componentId: that.config['id'], //当前组件
      targetViewId: componentId,     // 目标作用组件
      btnId: btnOption['id'],
      btnText: btnOption['text'],
      description: '[行内]：' + (btnOption['description'] ? btnOption['description'] : btnOption['text'])
    };

    console.log('操作按钮', text, '操作组件', componentId, btnData);
    if (environment['systemSettings']['enableLog']) {
      if (environment['systemSettings'] && environment['systemSettings']['logInfo']) {
        logConfig = environment['systemSettings']['logInfo']['logAjaxConfig'];
      }
    }

    if (logConfig) {
      const url = logConfig.url;
      const method = logConfig.ajaxType;
      const params = that.buildParameters(logConfig['params'], btnData, false);
      const response = await that.componentService.apiService[method](url, params).toPromise();
      console.log('写日志返回', response);
    }

    return true;

  }

}
