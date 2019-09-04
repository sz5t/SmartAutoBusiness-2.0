import { CnDataFormComponent } from '@shared/components/data-form/cn-data-form.component';
import { BSN_TOOLBAR_TRIGGER } from '../../../core/relations/bsn-trigger/toolbar.trigger.interface';
import { BSN_DATAGRID_TRIGGER } from '../../../core/relations/bsn-trigger/data-grid.trigger.interface';
import { ButtonOperationResolver } from '../../resolver/buttonOperation/buttonOperation.resolver';
import { CN_DATA_GRID_PROPERTY } from '../../../core/relations/bsn-property/data-grid.property.interface';
import { CN_DATA_GRID_METHOD } from '@core/relations/bsn-methods';
import { BSN_COMPONENT_SERVICES, BsnRelativesMessageModel, BSN_RELATION_SUBJECT } from '../../../core/relations/bsn-relatives';
import { ComponentServiceProvider } from '@core/services/component/component-service.provider';
import {
    Component,
    OnInit,
    Input,
    OnDestroy,
    Type,
    Inject,
    AfterViewInit,
    Output,
    EventEmitter,
    TemplateRef
} from '@angular/core';
import { CnComponentBase } from '../cn-component.base';
import { ParameterResolver } from '@shared/resolver/parameter/parameter.resolver';
import { RelationResolver } from '@shared/resolver/relation/relation.resolver';
import { filter, concatMap, mergeMap } from 'rxjs/operators';
import { Subscription, Subject, BehaviorSubject, merge, Observable } from 'rxjs';
import { CommonUtils } from '@core/utils/common-utils';
import { IDataGridProperty } from '@core/relations/bsn-property/data-grid.property.interface';
import { BSN_TRIGGER_TYPE } from '@core/relations/bsn-status';
import { arraysEqual } from 'ng-zorro-antd';
import { ITreeGridProperty, CN_TREE_GRID_PROPERTY } from '@core/relations/bsn-property/tree-grid.property.interface';
import { CN_TREE_GRID_METHOD } from '@core/relations/bsn-methods/bsn-tree-grid-method';
// const component: { [type: string]: Type<any> } = {
//     layout: LayoutResolverComponent,
//     form: CnFormWindowResolverComponent,
//     upload: BsnUploadComponent,
//     importExcel: BsnImportExcelComponent
// };

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'cn-tree-table,[cn-tree-table]',
    templateUrl: './cn-tree-table.component.html',
    styleUrls: [`cn-tree-table.component.less`]
})
export class CnTreeTableComponent extends CnComponentBase
    implements OnInit, AfterViewInit, OnDestroy, ITreeGridProperty {

    @Input()
    public config; // dataTables 的配置参数
    @Input()
    public permissions = [];
    @Input()
    public dataList = [];
    @Output() public updateValue = new EventEmitter();
    /**
     * 组件名称
     * 所有组件实现此属性 
     */
    public COMPONENT_NAME = "CnDataTable";
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
    // public mapOfCheckedId: { [key: string]: boolean } = {};
    // public mapOfSelectedId: { [key: string]: boolean } = {};
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

    public _sortName;
    public _sortValue;

    public ROWS_ADDED: any[] = [];
    public ROWS_EDITED: any[] = [];
    public ROW_SELECTED: any;
    public ROWS_CHECKED: any[] = [];
    public COMPONENT_VALUE: any[] = [];

    public operationRow: any;

    private _selectedRow;
    private _rowsData;
    private _addedRowsData;
    private _editedRowsData;
    private _search_row;

    private _columnFilterList;

    private _sender_source$: Subject<any>;
    private _receiver_source$: Subject<any>;
    private _trigger_source$: Subject<any>;

    private _receiver_subscription$: Subscription;
    private _sender_subscription$: Subscription;
    private _trigger_receiver_subscription$: Subscription;

    // 前置条件集合
    public beforeOperation;
    constructor(
        @Inject(BSN_COMPONENT_SERVICES)
        public componentService: ComponentServiceProvider
    ) {
        super(componentService);
        this.cacheValue = this.componentService.cacheService;
        this.cacheValue.set('userInfo', { _createUserId: '张三丰' });
        this.tempValue = {};
        this.initValue = {};
        // init cacheValue
    }

    public ngOnInit() {
        // 设置数据操作主键
        this.KEY_ID = this.config.keyId ? this.config.keyId : 'id';

        // 初始化默认分页大小
        this.config.pageSize && (this.pageSize = this.config.pageSize);

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
                        const act = this.config.rowActions.find(action => actionId === action.id);
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

    private _convertTreeToList(_root: any, _level = 0): any[] {
        const stack: any[] = [];
        const array: any[] = [];
        const hasMap = {};
        stack.push(
            {
                level: _level,
                expand: false,
                disabled: false,
                checked: false, // index === 0 ? true : false,
                selected: false, // index === 0 ? true : false,
                state: 'text',
                data: _root,
                originData: { ..._root },
                validation: true,
                actions: this.getRowActions('text'),
                children: []
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
                            state: 'text',
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

    private _setExpandedChildren() {

    }

    public expandRow(item, $event: boolean) {
        if ($event) {
            (async () => {
                const response = await this._getAsyncData(this.config.expandConfig, item.data, false);
                if (response.data && response.data) {
                    const appendedChildrenData: any[] = [];
                    response.data.map(data => {
                        this.mapOfDataExpanded[data[this.KEY_ID]] = this._convertTreeToList(data, item.level + 1);
                        appendedChildrenData.push(data);
                        this.total = this.total + 1;
                    })
                    item['children'] = appendedChildrenData;
                    this._appendChildrenToList(item.data, appendedChildrenData);
                }
            })();
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
                if (this.dataList[i][this.KEY_ID] === child[this.KEY_ID]) {
                    this.dataList.splice(i, 1);
                    i--;
                    len--;
                }
            });
        }
        this.dataList.splice(index + 1, 0, ...childrenList);
        this.dataList = this.dataList.filter(d => d[this.KEY_ID] !== null);
    }

    private _visitNode(node, hasMap: { [key: string]: any }, array: any[]) {
        if (!hasMap[node[this.KEY_ID]]) {
            hasMap[node[this.KEY_ID]] = true;
            array.push(node);
        }
    }

    private async _getAsyncData(ajaxConfig = null, nodeValue = null, isPaging = true) {
        let params = ParameterResolver.resolve({
            params: ajaxConfig.params,
            tempValue: this.tempValue,
            initValue: this.initValue,
            cacheValue: this.cacheValue,
            item: nodeValue
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
    }

    public loadRefreshData(option) {
        this.isLoading = true;
        const url = this.config.loadingConfig.url;
        const method = this.config.loadingConfig.method;
        // 返回结果解析id参数,构建ids
        const param1: any = {};
        if (option && Array.isArray(option)) {
            const rids = [];
            option.map(opt => {
                rids.push(opt[this.KEY_ID]);
            })
            param1['ids'] = `in(${rids.join(',')})`;
        } else if (option) {
            param1['ids'] = `in(${option[this.KEY_ID]})`
        }

        // 页面其他参数
        const params = {
            ...this.buildParameters(this.config.loadingConfig.params),
            // ...this._buildPaging(),
            ...param1
        }

        this.componentService.apiService.getRequest(url, method, { params }).subscribe(response => {
            if (response && response.data && response.data) {
                this.refreshData(response.data)
                this.isLoading = false;
            } else {
                this.isLoading = false;
            }
        }, error => {
            console.log(error);
        });

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

    // #region 内置方法
    /**
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
    /**
     * 处理URL格式
     * @param url
     * @returns {boolean}
     * @private
     */
    private _isUrlString(url) {
        return Object.prototype.toString.call(url) === '[object String]';
    }
    /**
     * 构建排序
     * @returns {{}}
     * @private
     */
    private _buildSort() {
        const sortObj = {};
        // if (this._sortName && this._sortType) {
        if (this._sortName && this._sortValue) {
            sortObj['_sort'] = this._sortName + this._sortValue;
            // sortObj['_order'] = sortObj['_order'] ? 'DESC' : 'ASC';
        }
        return sortObj;
    }
    /**
     * 构建查询焦点
     * @returns {{}}
     * @private
     */
    private _buildFocusId() {
        const focusParams = {};
        // 服务器端待解决
        if (this.focusIds) {
            focusParams['_focusedId'] = this.focusIds;
        }
        return focusParams;
    }
    /**
     * 构建查询字段
     * @returns {{}}
     * @private
     */
    private _buildColumnFilter() {
        const filterParams = {};
        if (this._columnFilterList && this._columnFilterList.length > 0) {
            this._columnFilterList.map(filter => {
                const valueStr = [];
                filter.value.map(value => {
                    valueStr.push(`'${value}'`);
                });
                filterParams[filter.field] = `in(${valueStr.join(',')})`;
            });
        }
        return filterParams;
    }
    /**
     * 构建查询参数
     */
    public _buildSearch() {
        let search = {};
        if (this._search_row) {
            const searchData = JSON.parse(JSON.stringify(this._search_row)); 4
            delete searchData.key;
            delete searchData.checked;
            delete searchData.row_status;
            delete searchData.selected;

            search = searchData;
        }
        return search;
    }
    // #endregion

    // #region state 状态切换



    private createNewRowData() {
        const newData = {}
        this.config.columns.filter(c => c.type === 'field').map(col => {
            newData[col.field] = null
        });
        return newData;
    }

    public addRootRow() {
        // 创建空数据对象
        const newId = CommonUtils.uuID(32);
        const newData = this.createNewRowData();
        newData[this.KEY_ID] = newId;

        // 新增数据加入原始列表,才能够动态新增一行编辑数据
        this.dataList = [newData, ...this.dataList];
        // this.mapOfDataExpanded[newId] = [];
        this.mapOfDataExpanded[newId] = [{
            data: newData,
            originData: { ...newData },
            disabled: false,
            checked: true, // index === 0 ? true : false,
            selected: false, // index === 0 ? true : false,
            state: 'new',
            actions: this.getRowActions('new')
        }]
        // 组装状态数据
        // this.mapOfDataExpanded[newId] = {
        //     data: newData,
        //     originData: { ...newData },
        //     disabled: false,
        //     checked: true, // index === 0 ? true : false,
        //     selected: false, // index === 0 ? true : false,
        //     state: 'new',
        //     actions: this.getRowActions('new')
        // }

        this.ROWS_ADDED = [newData, ...this.ROWS_ADDED];

        // 更新状态
    }

    public addChildRow() {
        // 创建空数据对象
        const newId = CommonUtils.uuID(32);
        const parentId = this.ROW_SELECTED[this.KEY_ID];
        const newData = this.createNewRowData();
        newData['PID'] = parentId;
        newData[this.KEY_ID] = newId;

        // 新增数据加入原始列表,才能够动态新增一行编辑数据
        this.dataList = this._setNewChildRow(newData, parentId);
        const parentLevel = this.mapOfDataExpanded[parentId][0].level;

        this.mapOfDataExpanded[newId] = [
            {
                data: newData,
                originData: { ...newData },
                disabled: false,
                checked: true, // index === 0 ? true : false,
                selected: false, // index === 0 ? true : false,
                state: 'new',
                level: parentLevel + 1,
                actions: this.getRowActions('new'),
                children: [],
                expand: false
            }
        ]

        this.mapOfDataExpanded[parentId][0].children.push(newData);
        this.mapOfDataExpanded[parentId][0].expand = true;
        // 组装状态数据

        this.ROWS_ADDED = [newData, ...this.ROWS_ADDED];

        // 更新状态
    }

    private _setNewChildRow(newRowData, parentId) {
        if (this.dataList) {
            const parentIndex = this.dataList.findIndex(d => d[this.KEY_ID] === parentId);
            if (parentIndex > -1) {
                // const level = this.dataList[parentIndex]['level'];
                // if (level > 0) {
                //     newRowData['level'] = level + 1;
                // }
                this.dataList.splice(parentIndex + 1, 0, newRowData);
            }
        }
        return this.dataList.filter(d => d[this.KEY_ID] !== null);
    }

    private removeEditRow(item) {
        this.ROWS_EDITED = this.ROWS_EDITED.filter(r => r[this.KEY_ID] !== item[this.KEY_ID]);
    }

    private addEditRows(item) {
        const index = this.ROWS_EDITED.findIndex(r => r[this.KEY_ID] === item[this.KEY_ID]);
        if (index < 0) {
            this.ROWS_EDITED = [item, ...this.ROWS_EDITED];
        }
    }

    public editRows(option) {
        this.ROWS_CHECKED.map(
            item => {
                this.addEditRows(item.data);
                const trigger = new ButtonOperationResolver(this.componentService, this.config, this.mapOfDataExpanded[item.data[this.KEY_ID]][0]);
                trigger.sendBtnMessage(option.btnCfg, { triggerType: BSN_TRIGGER_TYPE.STATE, trigger: BSN_DATAGRID_TRIGGER.EDIT_ROW }, this.config.id);
            }
        )
    }

    public editRow(option) {
        if (option.data) {
            this.addEditRows(option.data.data);
        }
        return true;
    }

    // 取消添加的新行 数据  
    public cancelNewRow(option) {
        if (option.data) {
            this.removeNewRow(option.data.data);
        }
    }

    public cancelNewRows(option) {
        this.ROWS_ADDED.map(
            item => {
                this.removeNewRow(item);
                const trigger = new ButtonOperationResolver(this.componentService, this.config, this.mapOfDataExpanded[item[this.KEY_ID]]);
                trigger.sendBtnMessage(option.btnCfg, { triggerType: BSN_TRIGGER_TYPE.STATE, trigger: BSN_DATAGRID_TRIGGER.CANCEL_EDIT_ROW }, this.config.id);

            }
        )
        return true;
    }

    private removeNewRow(item) {
        this.dataList = this.dataList.filter(r => r[this.KEY_ID] !== item[this.KEY_ID]);
        this.ROWS_ADDED = this.ROWS_ADDED.filter(r => r[this.KEY_ID] !== item[this.KEY_ID]);
        delete this.mapOfDataExpanded[item[this.KEY_ID]];
    }

    public cancelEditRows(option) {
        this.ROWS_CHECKED.map(
            item => {
                this.removeEditRow(item.data);
                const trigger = new ButtonOperationResolver(this.componentService, this.config, this.mapOfDataExpanded[item.data[this.KEY_ID]][0]);
                trigger.sendBtnMessage(option.btnCfg, { triggerType: BSN_TRIGGER_TYPE.STATE, trigger: BSN_DATAGRID_TRIGGER.CANCEL_EDIT_ROW }, this.config.id);

            }
        )
        return true;
    }

    public cancelEditRow(option) {
        if (option.data) {
            const itemId = option.data.data[this.KEY_ID];
            if (itemId) {
                this.ROWS_EDITED = this.ROWS_EDITED.filter(r => r[this.KEY_ID] !== itemId);
            }
        }

        console.log('-------------', this.ROWS_ADDED, this.ROWS_EDITED)
        // 调用方法之前,判断传递的验证配置,解析后是否能够继续进行后续操作
        // return true 表示通过验证, return false 表示未通过,无法继续后续操作

        return true;
    }

    public changeAddedRowsToText(option) {
        // 通过服务器端的临时ID与执行数据的ID匹配取得数据
        if (option && Array.isArray(option)) {
            option.map(opt => {
                if (this.mapOfDataExpanded[opt[this.KEY_ID]]) {

                    this.ROWS_ADDED = this.ROWS_ADDED.filter(r => r[this.KEY_ID] !== opt[this.KEY_ID]);
                    this.mapOfDataExpanded[opt[this.KEY_ID]][0]['originData'] = { ...this.mapOfDataExpanded[opt[this.KEY_ID]][0]['data'] };
                    this.mapOfDataExpanded[opt[this.KEY_ID]][0]['actions'] = [...this.config.rowActions.filter(action => action.state === 'text')];
                    const trigger = new ButtonOperationResolver(this.componentService, this.config, this.mapOfDataExpanded[opt[this.KEY_ID]][0]);
                    trigger.sendBtnMessage({}, { triggerType: BSN_TRIGGER_TYPE.STATE, trigger: BSN_DATAGRID_TRIGGER.CANCEL_EDIT_ROW }, this.config.id);
                }
            })
        } else if (option && option[this.KEY_ID]) {

            // this.mapOfDataState[option[this.KEY_ID]].state = 'text';
            this.ROWS_ADDED = this.ROWS_ADDED.filter(r => r[this.KEY_ID] !== option[this.KEY_ID]);
            this.mapOfDataExpanded[option[this.KEY_ID]][0]['originData'] = { ...this.mapOfDataExpanded[option[this.KEY_ID]][0]['data'] };
            this.mapOfDataExpanded[option[this.KEY_ID]][0]['actions'] = [...this.config.rowActions.filter(action => action.state === 'text')];
            const trigger = new ButtonOperationResolver(this.componentService, this.config, this.mapOfDataExpanded[option[this.KEY_ID]][0]);
            trigger.sendBtnMessage({}, { triggerType: BSN_TRIGGER_TYPE.STATE, trigger: BSN_DATAGRID_TRIGGER.CANCEL_EDIT_ROW }, this.config.id);
        }


    }

    public changeEditedRowsToText(option) {
        console.log('changeEditedRowsToText', option);
        // 通过服务器端的临时ID与执行数据的ID匹配取得数据
        if (option && Array.isArray(option)) {
            option.map(opt => {
                if (opt[this.KEY_ID] && this.mapOfDataExpanded[opt[this.KEY_ID]]) {
                    this.mapOfDataExpanded[opt[this.KEY_ID]][0]['originData'] = { ...this.mapOfDataExpanded[opt[this.KEY_ID]][0]['data'] };
                    const trigger = new ButtonOperationResolver(this.componentService, this.config, this.mapOfDataExpanded[opt[this.KEY_ID]][0]);
                    trigger.sendBtnMessage({}, { triggerType: BSN_TRIGGER_TYPE.STATE, trigger: BSN_DATAGRID_TRIGGER.CANCEL_EDIT_ROW }, this.config.id);
                }
            })
        } else if (option && option[this.KEY_ID]) {

            this.mapOfDataExpanded[option[this.KEY_ID]][0]['originData'] = { ...this.mapOfDataExpanded[option[this.KEY_ID]][0]['data'] };
            const trigger = new ButtonOperationResolver(this.componentService, this.config, this.mapOfDataExpanded[option[this.KEY_ID]][0]);
            trigger.sendBtnMessage({}, { triggerType: BSN_TRIGGER_TYPE.STATE, trigger: BSN_DATAGRID_TRIGGER.CANCEL_EDIT_ROW }, this.config.id);
        }

    }


    /**
     * 替换行内数据
     * @param option 
     */
    public replaceRowData(option) {
        if (option && Array.isArray(option)) {
            option.map(d => {
                this._rewriteData(d);
            })
        } else {
            this._rewriteData(option);
        }

        this.dataList = this.dataList.filter(d => d[this.KEY_ID] !== null);
    }

    private _rewriteData(newData) {
        if (this.mapOfDataExpanded[newData[this.KEY_ID]]) {
            this.mapOfDataExpanded[newData[this.KEY_ID]][0].originData = {
                ...this.mapOfDataExpanded[newData[this.KEY_ID]][0].originData, ...newData
            }

            this.mapOfDataExpanded[newData[this.KEY_ID]][0].data = {
                ...this.mapOfDataExpanded[newData[this.KEY_ID]][0].data, ...newData
            }

            this.mapOfDataExpanded[newData[this.KEY_ID]] = [...this.mapOfDataExpanded[newData[this.KEY_ID]]];

            for (let i = 0, n = this.dataList.length; i < n; i++) {
                if (this.dataList[i][this.KEY_ID] === newData[this.KEY_ID]) {
                    this.dataList[i] = { ...this.dataList[i], ...newData }
                }
            }

            // this.dataList.map(d => {
            //     if (d[this.KEY_ID] === newData[this.KEY_ID]) {
            //         d = { ...d, ...newData };
            //     }
            // });
        }
        if (this.ROW_SELECTED[this.KEY_ID] === newData[this.KEY_ID]) {
            this.ROW_SELECTED = { ...this.ROW_SELECTED, ...newData };
        }
    }






    // #endregion

    // #region operation 数据操作
    private _getComponentValueByHttpMethod(method): any[] {
        switch (method) {
            case 'post':
                return this.ROWS_ADDED;
            case 'put':
                return this.ROWS_EDITED;
            case 'proc':
                return [...this.ROWS_ADDED, ...this.ROWS_EDITED];
        }
    }

    public async executeHttpRequest(url, method, paramData) {
        return this.componentService.apiService[method](url, paramData).toPromise();
    }

    public deleteCurrentRow(option) {
        if (option[this.KEY_ID]) {
            // 为了保证树表在数据内容的一致性 , 需要递归删除所有子节点数据
            // 删除子节点数据时,只需要删除dataList上对应的数据项, 而mapOfDataExpanded 通过delete 删除的时候,能够将结构内的所有数据全部删除
            this._recursiveDeleteRow(option[this.KEY_ID]);
            // 如果选择的当前选中行,则需要重新选中定位
            // 区分跟节点的选中删除和子节点的选中删除、包括最后一个节点的选中删除
            if (option[this.KEY_ID] === this.ROW_SELECTED[this.KEY_ID]) {

                this.dataList = this.dataList.filter(d => d[this.KEY_ID] !== option[this.KEY_ID]);
                delete this.mapOfDataExpanded[option[this.KEY_ID]];

                // 如果选中的是根结点
                if (!this.ROW_SELECTED['PID'] || this.ROW_SELECTED['PID'] === '') {
                    // parentMapOfData['selected'] = true;
                    const parentList = this.dataList.filter(d => (!d['PID'] || d['PID'] === ''));
                    parentList && parentList.length > 0 && this.setSelectRow(parentList[0]);
                } else { // 选中的子节点

                    const parentMapOfData = this.mapOfDataExpanded[this.ROW_SELECTED['PID']][0];
                    const parentData = parentMapOfData.data;
                    const deleteItemIndex = parentMapOfData.children.findIndex(c => c[this.KEY_ID] === option[this.KEY_ID]);
                    if (deleteItemIndex > -1) {
                        parentMapOfData.children.splice(deleteItemIndex, 1);
                    }

                    if (parentMapOfData.children.length > 0) {
                        // 选中子节点中第一个
                        // parentMapOfData.children[0][this.KEY_ID];
                        this.setSelectRow(parentMapOfData.children[0]);

                    } else {
                        // 选中父节点
                        // parentMapOfData.selected = true;
                        this.setSelectRow(parentData);
                    }
                }
            } else {
                this.dataList = this.dataList.filter(d => d[this.KEY_ID] !== option[this.KEY_ID]);
                delete this.mapOfDataExpanded[option[this.KEY_ID]];
                if (option['PID'] && option['PID'].length > 0) {
                    const parentMapOfData = this.mapOfDataExpanded[option['PID']][0];
                    const deleteItemIndex = parentMapOfData.children.findIndex(c => c[this.KEY_ID] === option[this.KEY_ID]);
                    if (deleteItemIndex > -1) {
                        parentMapOfData.children.splice(deleteItemIndex, 0);
                    }
                }
            }
        } else {
            console.log('delete current row data', option);
        }
    }

    private _recursiveDeleteRow(recID) {
        if (this.mapOfDataExpanded[recID] && this.mapOfDataExpanded[recID][0].children.length > 0) {
            this.mapOfDataExpanded[recID][0].children.forEach(d => {
                this._recursiveDeleteRow(d[this.KEY_ID]);
                this.dataList = this.dataList.filter(s => s[this.KEY_ID] !== recID);
            })
        } else {
            this.dataList = this.dataList.filter(d => d[this.KEY_ID] !== recID);
        }
    }

    public async executeCurrentRow(option) {
        const url = option.ajaxConfig.url;
        const method = option.ajaxConfig.ajaxType;
        const ajaxParams = option.ajaxConfig.params ? option.ajaxConfig.params : []
        let paramData;
        if (option.data) {
            paramData = ParameterResolver.resolve({
                params: ajaxParams,
                item: option.data.data,
                tempValue: this.tempValue,
                initValue: this.initValue,
                cacheValue: this.cacheValue
            });
        }
        const response = await this.executeHttpRequest(url, method, paramData);
        // 批量对象数据,返回结果都将以对象的形式返回,如果对应结果没有值则返回 {}
        this._sendDataSuccessMessage(response, option.ajaxConfig.result);

        // 处理validation结果
        const validationResult = this._sendDataValidationMessage(response, option.ajaxConfig.result);

        // 处理error结果
        const errorResult = this._sendDataErrorMessage(response, option.ajaxConfig.result);

        return validationResult && errorResult;
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

    public async saveRow(option) {
        const ajaxConfig = option.ajaxConfig;
        const rowData = option.data.data;
        const url = ajaxConfig.url;
        const paramData = ParameterResolver.resolve({
            params: ajaxConfig.params,
            tempValue: this.tempValue,
            componentValue: rowData,
            item: this.ROW_SELECTED,
            initValue: this.initValue,
            cacheValue: this.cacheValue,
            router: this.routerValue
        });

        const response = await this.componentService.apiService[ajaxConfig.ajaxType](url, paramData).toPromise();

        // 批量对象数据,返回结果都将以对象的形式返回,如果对应结果没有值则返回 {}
        this._sendDataSuccessMessage(response, ajaxConfig.result);

        // 处理validation结果
        const validationResult = this._sendDataValidationMessage(response, ajaxConfig.result);

        // 处理error结果
        const errorResult = this._sendDataErrorMessage(response, ajaxConfig.result);

        // 返回true可以发送后续操作, 返回false终止发送,之前定义的后续操作将无法执行
        return validationResult && errorResult;
    }

    /**
     * 保存编辑行
     * @param options ajaxConfig
     */
    public async saveRows(option) {
        const ajaxConfig = option.ajaxConfig;
        // 构建业务对象
        // 执行异步操作
        const url = ajaxConfig.url;
        this.COMPONENT_VALUE = this._getComponentValueByHttpMethod(ajaxConfig.ajaxType);
        const paramsData = this.buildParameters(ajaxConfig.params, this.COMPONENT_VALUE, true);
        const response = await this.componentService.apiService[ajaxConfig.ajaxType](url, paramsData).toPromise();
        // 批量提交数据,返回结果都将以数组的形式返回,如果对应结果没有值则返回 {}
        this._sendDataSuccessMessage(response, ajaxConfig.result);

        // 处理validation结果
        const validationResult = this._sendDataValidationMessage(response, ajaxConfig.result);

        // 处理error结果
        const errorResult = this._sendDataErrorMessage(response, ajaxConfig.result);

        // 返回true可以发送后续操作, 返回false终止发送,之前定义的后续操作将无法执行
        return validationResult && errorResult;
    }

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
            })
        });

        this.mapOfDataExpanded[rowData[this.KEY_ID]].map(mItem => {
            if (mItem.data[this.KEY_ID] === rowData[this.KEY_ID]) {
                mItem['selected'] = true;
            }
        });

        // this.mapOfDataExpanded[rowData[this.KEY_ID]]['selected'] = true;

        // 勾选/取消当前行勾选状态
        this.mapOfDataExpanded[rowData[this.KEY_ID]]['checked'] = !this.mapOfDataExpanded[rowData[this.KEY_ID]]['checked'];
        this.dataCheckedStatusChange();
        return true;
    }

    public selectRow(rowData) {


        console.log(this.config.id + '-----------' + rowData, arguments);
        // this.ROW_SELECTED = rowData;
    }

    // #endregion

    // #region action

    public refreshData(loadNewData) {
        if (loadNewData && Array.isArray(loadNewData)) {
            loadNewData.map(newData => {
                const index = this.dataList.findIndex(d => d[this.KEY_ID] === newData[this.KEY_ID]);
                if (index > -1) {
                    this.dataList.splice(index, 1, newData);
                    this.dataList = [...this.dataList];
                } else {
                    this.dataList = [loadNewData[index], ...this.dataList];
                }
                const mapData = this.mapOfDataState[newData[this.KEY_ID]];
                if (mapData) {
                    mapData.data = newData;
                    mapData.originData = { ...newData };
                } else {
                    // 组装状态数据
                    this.mapOfDataState[newData[this.KEY_ID]] = {
                        data: newData,
                        originData: { ...newData },
                        disabled: false,
                        checked: true, // index === 0 ? true : false,
                        selected: false, // index === 0 ? true : false,
                        state: 'new',
                        actions: this.getRowActions('new')
                    }
                }
            })
        }
        // 刷新dataList
        // 刷新mapOfDataState
    }

    public showInvalidateAddedRows(option) {
        if (option && Array.isArray(option)) {
            option.map(opt => {
                const rowData = opt.data;
                this.mapOfDataExpanded[rowData[this.KEY_ID]][0]['validation'] = false;
            })
        } else if (option) {
            const rowData = option.data
            this.mapOfDataExpanded[rowData[this.KEY_ID]][0]['validation'] = false
        }
    }

    public showInvalidateEditedRows(option) {
        console.log(option);
        if (option && Array.isArray(option)) {
            option.map(opt => {
                const rowData = opt.data;
                this.mapOfDataExpanded[rowData[this.KEY_ID]][0]['validation'] = false;
            })
        } else if (option) {
            const rowData = option.data
            this.mapOfDataExpanded[rowData[this.KEY_ID]][0]['validation'] = false
        }
    }

    public checkedRows() {
        console.log('-------------checked rows');
        // this._sender_source$.subscribe(res => {
        //     console.log('send message', res);
        // });
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
                editedRows: this.ROWS_EDITED

            });
        } else if (!isArray && data) {
            parameterResult = ParameterResolver.resolve({
                params: paramsCfg,
                tempValue: this.tempValue,
                componentValue: this.COMPONENT_VALUE,
                item: this.ROW_SELECTED,
                initValue: this.initValue,
                cacheValue: this.cacheValue,
                router: this.routerValue,
                addedRows: data,
                editedRows: data,
                validation: data,
                returnValue: data

            });
        } else if (isArray && data && Array.isArray(data)) {
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
                    returnValue: d
                });
                parameterResult.push(param);
            })
        }
        return parameterResult;
    }

    public getCurrentComponentId() {
        return this.config.id;
    }

    public executeSelectRow() {
        console.log(this.config.id + '-------------executeSelectRow');
    }

    public async executeCheckedRows(option) {
        debugger;
        console.log(this.config.id + '-------------executeCheckedRows', option);
        const url = option.ajaxConfig.url;
        const method = option.ajaxConfig.ajaxType;
        const ajaxParams = option.ajaxConfig.params ? option.ajaxConfig.params : [];
        const data = this.ROWS_CHECKED;
        const parameterResult = [];
        if (data && data.length > 0) {
            data.map(d => {
                const p = ParameterResolver.resolve({
                    params: ajaxParams,
                    item: d.data,
                    tempValue: this.tempValue,
                    initValue: this.initValue,
                    cacheValue: this.cacheValue
                });
                parameterResult.push(p);
            });
        }
        if (parameterResult) {
            const response = await this.executeHttpRequest(url, method, parameterResult);
            // 批量对象数据,返回结果都将以对象的形式返回,如果对应结果没有值则返回 {}
            this._sendDataSuccessMessage(response, option.ajaxConfig.result);

            // 处理validation结果
            const validationResult = this._sendDataValidationMessage(response, option.ajaxConfig.result);

            // 处理error结果
            const errorResult = this._sendDataErrorMessage(response, option.ajaxConfig.result);

            return validationResult && errorResult;

        } else {
            return false;
        }
    }

    public async executeCheckedRowsIds(option) {
        console.log(this.config.id + '-------------executeCheckedRowsIds', option);
        const url = option.ajaxConfig.url;
        const method = option.ajaxConfig.ajaxType;
        const ajaxParams = option.ajaxConfig.params ? option.ajaxConfig.params : [];
        const data = this.ROW_SELECTED;
        const parameterResult = [];
        let paramData;
        if (data && data.length > 0) {
            data.map(d => {
                const p = paramData = ParameterResolver.resolve({
                    params: ajaxParams,
                    item: d,
                    tempValue: this.tempValue,
                    initValue: this.initValue,
                    cacheValue: this.cacheValue
                });
                parameterResult.push(p);
            });
        }
        if (parameterResult) {
            const ids = [];
            parameterResult.map(p => {
                const pData = p[this.KEY_ID]
                pData && ids.push(pData);
            });
            const response = await this.executeHttpRequest(url, method, { ids: ids.join(',') });
            // 批量对象数据,返回结果都将以对象的形式返回,如果对应结果没有值则返回 {}
            this._sendDataSuccessMessage(response, option.ajaxConfig.result);

            // 处理validation结果
            const validationResult = this._sendDataValidationMessage(response, option.ajaxConfig.result);

            // 处理error结果
            const errorResult = this._sendDataErrorMessage(response, option.ajaxConfig.result);

            return validationResult && errorResult;
        } else {
            return false;
        }


    }

    public searchRow() {
        console.log(this.config.id + '-------------searchRow');
    }

    public cancelSearchRow() {
        console.log(this.config.id + '-------------cancelSearchRow');
    }

    public export() {

    }

    public import() {

    }

    public download() {

    }

    /**
     * 显示确认对话框
     * @param option 确认参数 
     */
    public showConfirm(option: any) {
        this.confirm(option.dialog, () => { this.executeCurrentRow(option) })

    }

    /**
     * 显示表单对话框
     * @param option 配置参数
     * dialog
     * changeValue
     * ajaxConfig
     */
    public showDialog(option: any) {
        let dialog;
        // 根据按钮类型初始化表单状态
        const dialogCfg = option.dialog;
        dialogCfg.form.state = option.btnCfg.state ? option.btnCfg.state : 'text';

        // const isEditForm = dialogCfg.form.state === 'edit' ? true : false;
        // if(isEditForm) {

        // }
        if (option.changeValue) {
            const d = ParameterResolver.resolve({
                params: option.changeValue.params,
                tempValue: this.tempValue,
                // componentValue: cmptValue,
                item: this.ROW_SELECTED,
                initValue: this.initValue,
                cacheValue: this.cacheValue,
                router: this.routerValue
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
            nzContent: CnDataFormComponent,
            nzComponentParams: {
                config: dialogCfg.form,
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
                        (async () => {
                            const response = await componentInstance.executeModal(option);
                            this._sendDataSuccessMessage(response, option.ajaxConfig.result);

                            // 处理validation结果
                            this._sendDataValidationMessage(response, option.ajaxConfig.result)
                                &&
                                this._sendDataErrorMessage(response, option.ajaxConfig.result)
                                && dialog.close();
                        })();
                    }
                }
            ]
        }
        dialog = this.componentService.modalService.create(dialogOptional);
    }

    public showWindow() {

    }

    public showUpload() {

    }

    public showBatchDialog() {

    }

    /**
     * 显示消息框
     */
    public showMessage(option) {
        const message: { type: string, message: string, field: string } = { type: '', message: '', field: '' };
        if (option && Array.isArray(option)) {
            message.message = option[0].code;
            message.type = option[0].type;
            message.field = option[0].field;
        } else if (option) {
            message.message = option.code ? option.code : '';
            message.type = option.type;
            message.field = option.field ? option.field : '';
        }

        option && this.componentService.msgService.create(message.type, `${message.field}: ${message.message}`);
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
     * 列排序
     * @param $sort {key:string, value: string} 
     */
    sort($sort: { key: string, value: string }): void {
        this._sortName = $sort.key;
        this._sortValue = $sort.value;
        this.load();
    }

    searchData(reset: boolean = false) {
        if (reset) {
            this.pageIndex = 1;
        }
        this.isAllChecked = false;
        this.indeterminate = false;
        this.load();
    }


    //#endregion

    /**
     * 
     * @param actionCfg 当前操作按钮的配置
     * @param rowData 当前数据行
     * @param $event 
     */
    rowAction(actionCfg, dataOfState, $event?) {
        $event && $event.stopPropagation();
        const trigger = new ButtonOperationResolver(this.componentService, this.config, dataOfState);
        trigger.toolbarAction(actionCfg, this.config.id);
        $event && $event.preventDefault();
    }

    getRowActions(state): any[] {
        const orginAction = this.tableColumns.find(c => c.type === 'action');
        const copyAction = [];
        if (orginAction) {
            const actions = JSON.parse(JSON.stringify(this.tableColumns.find(c => c.type === 'action').action.filter(c => c.state === state)));
            copyAction.push(...actions);
        }
        return copyAction;
    }

}
