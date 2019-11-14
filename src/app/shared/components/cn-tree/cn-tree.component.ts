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
    TemplateRef,
    ViewChild
} from '@angular/core';
import { CnComponentBase } from '../cn-component.base';
import { ParameterResolver } from '@shared/resolver/parameter/parameter.resolver';
import { RelationResolver } from '@shared/resolver/relation/relation.resolver';
import { filter, concatMap, mergeMap } from 'rxjs/operators';
import { Subscription, Subject, BehaviorSubject, merge, Observable } from 'rxjs';
import { CommonUtils } from '@core/utils/common-utils';
import { IDataGridProperty } from '@core/relations/bsn-property/data-grid.property.interface';
import { BSN_TRIGGER_TYPE } from '@core/relations/bsn-status';
import { arraysEqual, NzFormatEmitEvent, NzTreeNode, NzTreeComponent } from 'ng-zorro-antd';
import { ITreeProperty, CN_TREE_PROPERTY } from '@core/relations/bsn-property/tree.property.interface';
import { CN_TREE_METHOD } from '@core/relations/bsn-methods/bsn-tree-methods';
// const component: { [type: string]: Type<any> } = {
//     layout: LayoutResolverComponent,
//     form: CnFormWindowResolverComponent,
//     upload: BsnUploadComponent,
//     importExcel: BsnImportExcelComponent
// };

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'cn-tree,[cn-tree]',
    templateUrl: './cn-tree.component.html',
    styleUrls: [`cn-tree.component.less`]
})
export class CnTreeComponent extends CnComponentBase
    implements OnInit, AfterViewInit, OnDestroy, ITreeProperty {

    @Input()
    public config; // dataTables 的配置参数
    @Input()
    public permissions = [];
    @Input()
    public nodes = [];
    @Output() public updateValue = new EventEmitter();

    @ViewChild('treeObj', { static: true })
    public treeObj: NzTreeComponent;
    /**
     * 组件名称
     * 所有组件实现此属性 
     */
    public COMPONENT_NAME = "CnTree";
    /**
     * 组件操作对外名称
     * 所有组件实现此属性
     */
    public COMPONENT_METHODS = CN_TREE_METHOD;

    public COMPONENT_PROPERTY = CN_TREE_PROPERTY;

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
            validation?: boolean
        }
    } = {};
    public checkedNumber = 0;

    public KEY_ID: string;

    public _sortName;
    public _sortValue;

    public NODES_ADDED: any[] = [];
    public NODES_EDITED: any[] = [];
    public NODE_SELECTED: any;
    public NODES_CHECKED: any[] = [];
    public COMPONENT_VALUE: any[] = [];
    public ACTIVED_NODE: any;

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
        this.tempValue = {};
        this.initValue = {};
        // init cacheValue
    }

    public ngOnInit() {
        // 设置数据操作主键
        this.KEY_ID = this.config.keyId ? this.config.keyId : 'ID';

        // 初始化默认分页大小

        // 构建表格列及列标题
        // this._buildColumns(this.config.columns);

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

        if (this.subscription$) {
            this.subscription$.unsubscribe();
        }

        // 释放触发器对象
        if (this._trigger_source$) {
            this._trigger_source$.unsubscribe();
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

        if (!this._trigger_source$) {
            this._trigger_source$ = new RelationResolver(this).resolve();
            // this._trigger_receiver_subscription$ = this._trigger_source$.subscribe();
        }


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

    public async load() {
        this.isLoading = true;
        const response = await this._getAsyncTreeData(this.config.loadingConfig);
        if (response && response.data) {
            response.data.map((d, index) => {
                // 默认选中第一个节点
                if (index === 0) {
                    d['selected'] = true;
                    this.ACTIVED_NODE = {};
                    this.ACTIVED_NODE['origin'] = d;
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

    public clickNode($event: NzFormatEmitEvent) {
        if (this.ACTIVED_NODE) {
            this.ACTIVED_NODE['isSelected'] = false;
            this.ACTIVED_NODE['selected'] && (this.ACTIVED_NODE['selected'] = false);
            this.ACTIVED_NODE = null;
        }
        $event.node.isSelected = true;
        this.ACTIVED_NODE = $event.node;

        this.tempValue['selectedNode'] = {
            ...$event.node.origin
        };

        return true;
    }

    public openFolder(data: NzTreeNode | Required<NzFormatEmitEvent>) {
        if (data instanceof NzTreeNode) {
            if (!data.isExpanded) {
                data.isExpanded = true;
                this.expandNode(data);
            }
        } else {
            const node = data.node;
            if (node) {
                if (!node.isExpanded) {
                    node.isExpanded = true;
                    this.expandNode(data);
                }
            }
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

    // #region 内置方法

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

    }
    // #endregion

    // #region state 状态切换
    private createNewRowData() {
        const newData = {}
        this.config.columns.map(col => {
            newData[col.field] = null
        });
        return newData;
    }

    public addRow() {
        // 创建空数据对象
        const newId = CommonUtils.uuID(32);
        const newData = this.createNewRowData();
        newData[this.KEY_ID] = newId;

        // 新增数据加入原始列表,才能够动态新增一行编辑数据
        this.nodes = [newData, ...this.nodes];

        // 组装状态数据
        this.mapOfDataState[newId] = {
            data: newData,
            originData: { ...newData },
            disabled: false,
            checked: true, // index === 0 ? true : false,
            selected: false, // index === 0 ? true : false,
            state: 'new',
            actions: this.getRowActions('new')
        }

        this.NODES_ADDED = [newData, ...this.NODES_ADDED];

        // 更新状态
    }

    private removeEditRow(item) {
        this.NODES_EDITED = this.NODES_EDITED.filter(r => r[this.KEY_ID] !== item[this.KEY_ID]);
    }

    private addEditRows(item) {
        const index = this.NODES_EDITED.findIndex(r => r[this.KEY_ID] === item[this.KEY_ID]);
        if (index < 0) {
            this.NODES_EDITED = [item, ...this.NODES_EDITED];
        }
    }

    public editRows(option) {
        this.NODES_CHECKED.map(
            item => {
                this.addEditRows(item);
                const trigger = new ButtonOperationResolver(this.componentService, this.config, this.mapOfDataState[item[this.KEY_ID]]);
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
        this.NODES_ADDED.map(
            item => {
                this.removeNewRow(item);
                const trigger = new ButtonOperationResolver(this.componentService, this.config, this.mapOfDataState[item[this.KEY_ID]]);
                trigger.sendBtnMessage(option.btnCfg, { triggerType: BSN_TRIGGER_TYPE.STATE, trigger: BSN_DATAGRID_TRIGGER.CANCEL_EDIT_ROW }, this.config.id);

            }
        )
        return true;
    }

    private removeNewRow(item) {
        this.nodes = this.nodes.filter(r => r[this.KEY_ID] !== item[this.KEY_ID]);
        this.NODES_ADDED = this.NODES_ADDED.filter(r => r[this.KEY_ID] !== item[this.KEY_ID]);
        delete this.mapOfDataState[item[this.KEY_ID]];
    }

    public cancelEditRows(option) {
        this.NODES_CHECKED.map(
            item => {
                this.removeEditRow(item);
                const trigger = new ButtonOperationResolver(this.componentService, this.config, this.mapOfDataState[item[this.KEY_ID]]);
                trigger.sendBtnMessage(option.btnCfg, { triggerType: BSN_TRIGGER_TYPE.STATE, trigger: BSN_DATAGRID_TRIGGER.CANCEL_EDIT_ROW }, this.config.id);

            }
        )
        return true;
    }

    public cancelEditRow(option) {
        if (option.data) {
            const itemId = option.data.data[this.KEY_ID];
            if (itemId) {
                this.NODES_EDITED = this.NODES_EDITED.filter(r => r[this.KEY_ID] !== itemId);
            }
        }

        // 调用方法之前,判断传递的验证配置,解析后是否能够继续进行后续操作
        // return true 表示通过验证, return false 表示未通过,无法继续后续操作

        return true;
    }

    public changeAddedRowsToText(option) {
        // 通过服务器端的临时ID与执行数据的ID匹配取得数据
        if (option && Array.isArray(option)) {
            option.map(opt => {
                if (this.mapOfDataState[opt[this.KEY_ID]]) {

                    this.NODES_ADDED = this.NODES_ADDED.filter(r => r[this.KEY_ID] !== opt[this.KEY_ID]);
                    this.mapOfDataState[opt[this.KEY_ID]]['originData'] = { ...this.mapOfDataState[opt[this.KEY_ID]]['data'] };
                    this.mapOfDataState[opt[this.KEY_ID]]['actions'] = [...this.config.rowActions.filter(action => action.state === 'text')];
                    const trigger = new ButtonOperationResolver(this.componentService, this.config, this.mapOfDataState[opt[this.KEY_ID]]);
                    trigger.sendBtnMessage({}, { triggerType: BSN_TRIGGER_TYPE.STATE, trigger: BSN_DATAGRID_TRIGGER.CANCEL_EDIT_ROW }, this.config.id);
                }
            })
        } else if (option) {
            // this.mapOfDataState[option[this.KEY_ID]].state = 'text';
            this.NODES_ADDED = this.NODES_ADDED.filter(r => r[this.KEY_ID] !== option[this.KEY_ID]);
            this.mapOfDataState[option[this.KEY_ID]]['originData'] = { ...this.mapOfDataState[option[this.KEY_ID]]['data'] };
            this.mapOfDataState[option[this.KEY_ID]]['actions'] = [...this.config.rowActions.filter(action => action.state === 'text')];
            const trigger = new ButtonOperationResolver(this.componentService, this.config, this.mapOfDataState[option[this.KEY_ID]]);
            trigger.sendBtnMessage({}, { triggerType: BSN_TRIGGER_TYPE.STATE, trigger: BSN_DATAGRID_TRIGGER.CANCEL_EDIT_ROW }, this.config.id);
        }


    }

    public changeEditedRowsToText(option) {
        console.log('changeEditedRowsToText', option);
        // 通过服务器端的临时ID与执行数据的ID匹配取得数据
        if (option && Array.isArray(option)) {
            option.map(opt => {
                if (this.mapOfDataState[opt[this.KEY_ID]]) {
                    this.mapOfDataState[opt[this.KEY_ID]]['originData'] = { ...this.mapOfDataState[opt[this.KEY_ID]]['data'] };
                    const trigger = new ButtonOperationResolver(this.componentService, this.config, this.mapOfDataState[opt[this.KEY_ID]]);
                    trigger.sendBtnMessage({}, { triggerType: BSN_TRIGGER_TYPE.STATE, trigger: BSN_DATAGRID_TRIGGER.CANCEL_EDIT_ROW }, this.config.id);
                }
            })
        } else if (option) {
            // this.mapOfDataState[option[this.KEY_ID]].state = 'text';
            this.mapOfDataState[option[this.KEY_ID]]['originData'] = { ...this.mapOfDataState[option[this.KEY_ID]]['data'] };
            const trigger = new ButtonOperationResolver(this.componentService, this.config, this.mapOfDataState[option[this.KEY_ID]]);
            trigger.sendBtnMessage({}, { triggerType: BSN_TRIGGER_TYPE.STATE, trigger: BSN_DATAGRID_TRIGGER.CANCEL_EDIT_ROW }, this.config.id);
        }

    }

    // #endregion

    // #region operation 数据操作
    private _getComponentValueByHttpMethod(method): any[] {
        switch (method) {
            case 'post':
                return this.NODES_ADDED;
            case 'put':
                return this.NODES_EDITED;
            case 'proc':
                return [...this.NODES_ADDED, ...this.NODES_EDITED];
        }
    }

    public async executeHttpRequest(url, method, paramData) {
        return this.componentService.apiService[method](url, paramData).toPromise();
    }

    public async deleteCurrentRow(option) {
        console.log(this.config.id + '-------------executeSelectRow', option);

        // const url = option.ajaxConfig.url;
        // const method = option.ajaxConfig.ajaxType ? option.ajaxConfig.ajaxType : 'delete';
        // const ajaxParams = option.ajaxConfig.params ? option.ajaxConfig.params : []
        // let paramData;
        // if (option.data) {
        //     paramData = ParameterResolver.resolve({
        //         params: ajaxParams,
        //         item: option.data.data,
        //         tempValue: this.tempValue,
        //         initValue: this.initValue,
        //         cacheValue: this.cacheValue
        //     });
        // }
        // const response = await this.executeHttpRequest(url, method, paramData);
        // if (response) {
        //     this.load();
        // }
    }

    public deleteCheckedNodes(option) {
        console.log('deletecheckecNodes', option);
        if (option.ids) {
            const arr_id = option.ids.split(',');
            if (arr_id && arr_id.length > 0) {
                arr_id.map(arr => {
                    this.deleteSelectedNode({ 'ID': arr, 'id': arr });
                })
            }
        }
    }

    public deleteSelectedNode(option) {
        if (option[this.KEY_ID]) {
            const deletedNode = this.treeObj.getTreeNodeByKey(option[this.KEY_ID]);
            if (deletedNode) {
                // 判断删除的Node节点是否存在父节点
                const parentNode = deletedNode.getParentNode();
                if (parentNode) {
                    // 删除子节点
                    deletedNode.remove();
                    // 判断当前父节点是否存在子节点集合
                    if (parentNode.getChildren().length === 0) {
                        parentNode.isSelected = true;
                        parentNode.isExpanded = false;
                        this.ACTIVED_NODE = parentNode;
                    } else {
                        const firstNode = parentNode.getChildren()[0];
                        firstNode.isSelected = true;
                        this.ACTIVED_NODE = firstNode;
                    }
                } else {
                    // 删除根节点
                    this.nodes = this.nodes.filter(node => node.key !== option[this.KEY_ID]);
                    this.nodes[0].isSelected = true;
                    this.ACTIVED_NODE = this.nodes[0];
                }
            }
        }
    }

    public async executeSelectedNode(option) {
        const url = option.ajaxConfig.url;
        const method = option.ajaxConfig.ajaxType;
        const ajaxParams = option.ajaxConfig.params ? option.ajaxConfig.params : []
        let paramData;
        if (option.data) {
            paramData = ParameterResolver.resolve({
                params: ajaxParams,
                item: this.ACTIVED_NODE.origin,
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

    public async executeCheckedNodes(option) {
        console.log('execute checked nodes', option);
    }

    public async executeDeleteCheckedNodesByID(option) {
        console.log('execute checked nodes', option);
        const url = option.ajaxConfig.url;
        const method = option.ajaxConfig.ajaxType;
        const ajaxParams = option.ajaxConfig.params ? option.ajaxConfig.params : []
        const data = this.treeObj.getCheckedNodeList();
        const parameterResult = [];
        data.map(d => {
            const param = ParameterResolver.resolve({
                params: ajaxParams,
                tempValue: this.tempValue,
                checkedItem: d.origin,
                initValue: this.initValue,
                cacheValue: this.cacheValue
            });
            parameterResult.push(param);
        });
        if (parameterResult) {
            const ids = [];
            parameterResult.map(p => {
                const pData = p[this.KEY_ID]
                pData && ids.push(pData);
            })
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

    public async excecuteCheckedNodesByID(option) {
        console.log('execute checked nodes', option);
        const url = option.ajaxConfig.url;
        const method = option.ajaxConfig.ajaxType;
        const ajaxParams = option.ajaxConfig.params ? option.ajaxConfig.params : []
        const data = [...this.treeObj.getCheckedNodeList(), ...this.treeObj.getHalfCheckedNodeList()];
        const parameterResult = [];
        data.map(d => {
            const param = ParameterResolver.resolve({
                params: ajaxParams,
                tempValue: this.tempValue,
                item: d.origin,
                initValue: this.initValue,
                cacheValue: this.cacheValue
            });
            parameterResult.push(param);
        });
        if (parameterResult) {
            const ids = [];
            parameterResult.map(p => {
                const pData = p[this.KEY_ID]
                pData && ids.push(pData);
            })
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
            item: this.NODE_SELECTED,
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

    public setSelectedNode() {

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

        this.NODE_SELECTED = rowData;

        // 选中当前行
        this.nodes.map(row => {
            this.mapOfDataState[row[this.KEY_ID]]['selected'] = false;
        });

        this.mapOfDataState[rowData[this.KEY_ID]]['selected'] = true;

        // 勾选/取消当前行勾选状态
        this.mapOfDataState[rowData[this.KEY_ID]]['checked'] = !this.mapOfDataState[rowData[this.KEY_ID]]['checked'];
        this.dataCheckedStatusChange();
        return true;
    }

    public selectRow(rowData) {


        console.log(this.config.id + '-----------' + rowData, arguments);
        // this.ROW_SELECTED = rowData;
    }

    // #endregion

    // #region action

    private _setChildrenSelectedNode(currentSelectedNode) {
        currentSelectedNode.isSelected = false;

        const sNode = currentSelectedNode.getChildren();
        sNode[0].isSelected = true;

        // that.activedNode.isSelected = false;
        // that.activedNode = null;


        this.ACTIVED_NODE = sNode[0];
        // that.selectedItem = that.activedNode.origin;
        // that.tempValue['_selectedNode'] = that.selectedItem;
    }

    private _setRootSelectedNode(currentSelectedNode) {
        if (currentSelectedNode) {
            currentSelectedNode.isSelected = false;
        }
        // const sNode = this.treeObj.getTreeNodes();
        // sNode[0].isSelected = true;
        // this.ACTIVED_NODE = sNode[0];
    }

    public appendChildToRootNode(option) {
        const appendNodeData = {}
        this.config.columns.map(col => {
            appendNodeData[col['type']] = option[col['field']];
        });

        const addRootNode = new NzTreeNode({
            key: appendNodeData['key'],
            title: appendNodeData['title'],
            selected: true,
            parentId: null,
            origin: appendNodeData,
            ...option
        });
        this.nodes = this.treeObj.getTreeNodes();
        const currentSelectedNode = this.treeObj.getTreeNodeByKey(this.ACTIVED_NODE.key);
        /// const nNode = { ...option, addRootNode };
        this.nodes = [addRootNode, ...this.nodes];
        this.ACTIVED_NODE = addRootNode;
        this._setRootSelectedNode(currentSelectedNode);

    }

    public appendChildToSelectedNode(option) {
        // let appendNode: NzTreeNode;
        const appendNodeData = {}
        this.config.columns.map(col => {
            appendNodeData[col['type']] = option[col['field']];
        });

        // const addChildNode = new NzTreeNode({
        //     key: appendNodeData['key'],
        //     title: appendNodeData['title'],
        //     selected: true,
        //     parentId: appendNodeData['parentId'],
        //     origin: appendNodeData
        // });

        const currentSelectedNode = this.treeObj.getTreeNodeByKey(this.ACTIVED_NODE.key);
        if (!currentSelectedNode.isExpanded) {
            currentSelectedNode.isExpanded = true;
            this.expandNode(currentSelectedNode);
            // this._setChildrenSelectedNode(currentSelectedNode);
        } else { // 节点已经打开,直接在节点下添加子节点
            currentSelectedNode.addChildren([{ ...option, ...appendNodeData }]);
            // this._setChildrenSelectedNode(currentSelectedNode);
        }




    }

    public updateSelectedNode(option) {
        const appendNodeData = {}
        this.config.columns.map(col => {
            appendNodeData[col['type']] = option[col['field']];
        });

        const node = this.treeObj.getTreeNodeByKey(appendNodeData['key']);
        if (node) {
            node.title = appendNodeData['title'];
        }
    }

    public refreshData(loadNewData) {
        if (loadNewData && Array.isArray(loadNewData)) {
            loadNewData.map(newData => {
                const index = this.nodes.findIndex(d => d[this.KEY_ID] === newData[this.KEY_ID]);
                if (index > -1) {
                    this.nodes.splice(index, 1, newData);
                    this.nodes = [...this.nodes];
                } else {
                    this.nodes = [loadNewData[index], ...this.nodes];
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
        // 刷新nodes
        // 刷新mapOfDataState
    }

    public showInvalidateAddedRows(option) {
        if (option && Array.isArray(option)) {
            option.map(opt => {
                const rowData = opt.data;
                this.mapOfDataState[rowData[this.KEY_ID]]['validation'] = false;
            })
        } else if (option) {
            const rowData = option.data
            this.mapOfDataState[rowData[this.KEY_ID]]['validation'] = false
        }
    }

    public showInvalidateEditedRows(option) {
        console.log(option);
        if (option && Array.isArray(option)) {
            option.map(opt => {
                const rowData = opt.data;
                this.mapOfDataState[rowData[this.KEY_ID]]['validation'] = false;
            })
        } else if (option) {
            const rowData = option.data
            this.mapOfDataState[rowData[this.KEY_ID]]['validation'] = false
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
                item: this.ACTIVED_NODE['origin'],
                initValue: this.initValue,
                cacheValue: this.cacheValue,
                router: this.routerValue,
                addedRows: this.NODES_ADDED,
                editedRows: this.NODES_EDITED

            });
        } else if (!isArray && data) {
            parameterResult = ParameterResolver.resolve({
                params: paramsCfg,
                tempValue: this.tempValue,
                componentValue: this.COMPONENT_VALUE,
                item: this.ACTIVED_NODE['origin'],
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
                    item: this.ACTIVED_NODE['origin'],
                    checkedItem: d,
                    initValue: this.initValue,
                    cacheValue: this.cacheValue,
                    router: this.routerValue,
                    addedRows: d,
                    editedRows: d,
                    validation: d
                });
                parameterResult.push(param);
            })
        }
        return parameterResult;
    }

    public getCurrentComponentId() {
        return this.config.id;
    }

    // public executeSelectRow() {
    //     console.log(this.config.id + '-------------executeSelectRow');
    // }

    // public executeCheckedRows() {
    //     console.log(this.config.id + '-------------executeCheckedRows');
    // }

    // public executeCheckedRowsIds() {
    //     console.log(this.config.id + '-------------executeCheckedRowsIds');
    // }

    // public searchRow() {
    //     console.log(this.config.id + '-------------searchRow');
    // }

    // public cancelSearchRow() {
    //     console.log(this.config.id + '-------------cancelSearchRow');
    // }

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
                item: this.ACTIVED_NODE.origin,
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
        //
        this.nodes
            .filter(item => !this.mapOfDataState[item[this.KEY_ID]]['dislabled'])
            .map(item =>
                this.mapOfDataState[item[this.KEY_ID]]['checked'] = $value
            );
        this.dataCheckedStatusChange();

    }

    /**
     * 更新数据选中状态的CheckBox
     */
    public dataCheckedStatusChange() {
        this.isAllChecked = this.nodes
            .filter(item => !this.mapOfDataState[item[this.KEY_ID]]['dislabled'])
            .every(item => this.mapOfDataState[item[this.KEY_ID]]['checked']);

        this.indeterminate = this.nodes
            .filter(item => !this.mapOfDataState[item[this.KEY_ID]]['dislabled'])
            .some(item => this.mapOfDataState[item[this.KEY_ID]]['checked']) && !this.isAllChecked;

        this.checkedNumber = this.nodes.filter(item => this.mapOfDataState[item[this.KEY_ID]]['checked']).length;

        // 更新当前选中数据集合
        this.NODES_CHECKED = this.nodes
            .filter(item => !this.mapOfDataState[item[this.KEY_ID]]['dislabled'])
            .filter(item => this.mapOfDataState[item[this.KEY_ID]]['checked']);
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
    rowAction(actionCfg, rowData, $event?) {
        const dataOfState = this.mapOfDataState[rowData[this.KEY_ID]];
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
