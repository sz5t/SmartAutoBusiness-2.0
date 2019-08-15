import { BSN_TOOLBAR_TRIGGER } from './../../../core/relations/bsn-trigger/toolbar.trigger.interface';
import { BSN_DATAGRID_TRIGGER } from './../../../core/relations/bsn-trigger/data-grid.trigger.interface';
import { ButtonOperationResolver } from './../../resolver/buttonOperation/buttonOperation.resolver';
import { CN_DATA_GRID_PROPERTY } from './../../../core/relations/bsn-property/data-grid.property.interface';
import { CN_DATA_GRID_METHOD } from '@core/relations/bsn-methods';
import { BSN_COMPONENT_SERVICES, BsnRelativesMessageModel, BSN_RELATION_SUBJECT } from './../../../core/relations/bsn-relatives';
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
// const component: { [type: string]: Type<any> } = {
//     layout: LayoutResolverComponent,
//     form: CnFormWindowResolverComponent,
//     upload: BsnUploadComponent,
//     importExcel: BsnImportExcelComponent
// };

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'cn-data-table,[cn-data-table]',
    templateUrl: './cn-data-table.component.html',
    styleUrls: [`cn-data-table.component.less`]
})
export class CnDataTableComponent extends CnComponentBase
    implements OnInit, AfterViewInit, OnDestroy, IDataGridProperty {

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
    public COMPONENT_METHODS = CN_DATA_GRID_METHOD;

    public COMPONENT_PROPERTY = CN_DATA_GRID_PROPERTY;

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
            actions?: any[]
        }
    } = {};
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
            this._receiver_source$ = new RelationResolver(this).resolveReceiver(this.config);
            this._receiver_subscription$ = this._receiver_source$.subscribe();
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

    public load() {
        this.isLoading = true;
        const url = this.config.loadingConfig.url;
        const method = this.config.loadingConfig.method;
        const params = {
            ...this.buildParameters(this.config.loadingConfig.params),
            ...this._buildPaging(),
            // ...this._buildFilter(this.config.ajaxConfig.filter),
            // ...this._buildSort(),
            // ...this._buildColumnFilter(),
            // ...this._buildFocusId(),
            // ...this._buildSearch()
        };

        this.componentService.apiService.getRequest(url, method, { params }).subscribe(response => {
            if (response && response.data && response.data.resultDatas) {
                response.data.resultDatas.map((d, index) => {

                    this.mapOfDataState[d[this.KEY_ID]] = {
                        disabled: false,
                        checked: false, // index === 0 ? true : false,
                        selected: false, // index === 0 ? true : false,
                        state: 'text',
                        data: d,
                        originData: { ...d },
                        actions: this.getRowActions('text')
                    };
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
            params['pageNum'] = this.pageIndex;
            params['pageSize'] = this.pageSize;
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




    private createNewRowData() {
        const newData = {}
        this.config.columns.map(col => {
            newData[col.field] = null
        });
        return newData;
    }

    public addRow() {
        console.log(this.config.id + '-------------add row');
        // 创建空数据对象
        const newId = CommonUtils.uuID(6);
        const newData = this.createNewRowData();
        newData[this.KEY_ID] = newId;

        // 新增数据加入原始列表,才能够动态新增一行编辑数据
        this.dataList = [newData, ...this.dataList];

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

        this.ROWS_ADDED = [newData, ...this.ROWS_ADDED];

        // 更新状态
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
        this.ROWS_ADDED.map(
            item => {
                this.removeNewRow(item);
                const trigger = new ButtonOperationResolver(this.componentService, this.config, this.mapOfDataState[item[this.KEY_ID]]);
                trigger.sendBtnMessage(option.btnCfg, { triggerType: BSN_TRIGGER_TYPE.STATE, trigger: BSN_DATAGRID_TRIGGER.CANCEL_EDIT_ROW }, this.config.id);

            }
        )
        return true;
    }

    private removeNewRow(item) {
        this.dataList = this.dataList.filter(r => r[this.KEY_ID] !== item[this.KEY_ID]);
        this.ROWS_ADDED = this.ROWS_ADDED.filter(r => r[this.KEY_ID] !== item[this.KEY_ID]);
        delete this.mapOfDataState[item[this.KEY_ID]];
    }

    public cancelEditRows(option) {
        this.ROWS_CHECKED.map(
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
                this.ROWS_EDITED = this.ROWS_EDITED.filter(r => r[this.KEY_ID] !== itemId);
            }
        }

        console.log('-------------', this.ROWS_ADDED, this.ROWS_EDITED)
        // 调用方法之前,判断传递的验证配置,解析后是否能够继续进行后续操作
        // return true 表示通过验证, return false 表示未通过,无法继续后续操作

        return true;
    }

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

    public saveRow(option) {
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
        this.componentService.apiService[ajaxConfig.ajaxType](url, paramData).subscribe(response => {
            // success 0:全部错误,1:全部正确,2:部分错误
            if (response.data) {
                const successCfg = ajaxConfig.result.find(res => res.name === 'data');
                // 弹出提示框
                if (successCfg) {
                    new RelationResolver(this).resolveInnerSender(successCfg.senderCfg);
                }
            }
            if (response.validation) {
                const validationCfg = ajaxConfig.result.find(res => res.name === 'validation');
                if (validationCfg) {
                    new RelationResolver(this).resolveInnerSender(validationCfg.senderCfg);
                }
            }
            if (response.error) {
                const errorCfg = ajaxConfig.result.find(res => res.name === 'error');
                if (errorCfg) {
                    new RelationResolver(this).resolveInnerSender(errorCfg.senderCfg);
                }
            }

            this.load();
        });

    }

    /**
     * 保存编辑行
     * @param options ajaxConfig
     */
    public saveRows(option) {

        console.log(this.config.id + '-------------save row');
        const ajaxConfig = option.ajaxConfig;
        // 构建业务对象
        // 执行异步操作
        // this.componentService.apiService.doPost();
        const url = ajaxConfig.url;
        const paramsData = [];
        this.COMPONENT_VALUE = this._getComponentValueByHttpMethod(ajaxConfig.ajaxType);
        this.COMPONENT_VALUE.map(cmptValue => {
            const d = ParameterResolver.resolve({
                params: ajaxConfig.params,
                tempValue: this.tempValue,
                componentValue: cmptValue,
                item: this.ROW_SELECTED,
                initValue: this.initValue,
                cacheValue: this.cacheValue,
                router: this.routerValue
            });
            if (d) {
                paramsData.push(d);
            }
        })
        // const params = this.buildParameters(ajaxConfig.params);
        this.componentService.apiService[ajaxConfig.ajaxType](url, paramsData).subscribe(response => {
            // success 0:全部错误,1:全部正确,2:部分错误
            if (response.data) {
                const successCfg = ajaxConfig.result.find(res => res.name === 'data');
                // 弹出提示框
                if (successCfg) {
                    new RelationResolver(this).resolveInnerSender(successCfg.senderCfg);
                }
            }
            if (response.validation) {
                const validationCfg = ajaxConfig.result.find(res => res.name === 'validation');
                if (validationCfg) {
                    new RelationResolver(this).resolveInnerSender(validationCfg.senderCfg);
                }
            }
            if (response.error) {
                const errorCfg = ajaxConfig.result.find(res => res.name === 'error');
                if (errorCfg) {
                    new RelationResolver(this).resolveInnerSender(errorCfg.senderCfg);
                }
            }
            this.load();
        })
        // 处理data结果
        // 处理message结果
        // 处理validation结果
        // 发送后续操作消息

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



    public checkedRows() {
        console.log('-------------checked rows');
        // this._sender_source$.subscribe(res => {
        //     console.log('send message', res);
        // });
    }

    public buildParameters(paramsCfg) {
        return ParameterResolver.resolve({
            params: paramsCfg,
            tempValue: this.tempValue,
            componentValue: this.COMPONENT_VALUE,
            item: this.ROW_SELECTED,
            initValue: this.initValue,
            cacheValue: this.cacheValue,
            router: this.routerValue
        });
    }

    public getCurrentComponentId() {
        return this.config.id;
    }

    public executeSelectRow() {
        console.log(this.config.id + '-------------executeSelectRow');
    }

    public executeCheckedRows() {
        console.log(this.config.id + '-------------executeCheckedRows');
    }

    public executeCheckedRowsIds() {
        console.log(this.config.id + '-------------executeCheckedRowsIds');
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

    public showDialog() {

    }

    public showWindow() {

    }

    public showUpload() {

    }

    public showBatchDialog() {

    }

    /**
     * 全选
     */
    public checkAll($value: boolean): void {
        //
        this.dataList
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
        this.isAllChecked = this.dataList
            .filter(item => !this.mapOfDataState[item[this.KEY_ID]]['dislabled'])
            .every(item => this.mapOfDataState[item[this.KEY_ID]]['checked']);

        this.indeterminate = this.dataList
            .filter(item => !this.mapOfDataState[item[this.KEY_ID]]['dislabled'])
            .some(item => this.mapOfDataState[item[this.KEY_ID]]['checked']) && !this.isAllChecked;

        this.checkedNumber = this.dataList.filter(item => this.mapOfDataState[item[this.KEY_ID]]['checked']).length;

        // 更新当前选中数据集合
        this.ROWS_CHECKED = this.dataList
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
