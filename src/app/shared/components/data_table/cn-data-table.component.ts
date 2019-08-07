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
import { TriggerResolver } from '@shared/resolver/trigger/trigger.resolver';
import { filter, concatMap, mergeMap } from 'rxjs/operators';
import { Subscription, Subject, BehaviorSubject, merge, Observable } from 'rxjs';
import { CommonUtils } from '@core/utils/common-utils';
import { IDataGridProperty } from '@core/relations/bsn-property/data-grid.property.interface';
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
            dislabled: boolean,
            checked: boolean,
            selected: boolean,
            state: string,
            data: any,
            actions?: any[]
        }
    } = {};
    public checkedNumber = 0;

    public KEY_ID: string;

    public _sortName;
    public _sortValue;

    public ROWS_ADDED: any[] = [];
    public ROWS_EDITED: any[] = [];
    public ROW_SELECTED: any = {};
    public ROWS_CHECKED: any[] = [];

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
                this._sender_source$ = new RelationResolver(this).resolve(this.config.cascade);
                this._sender_subscription$ = this._sender_source$.subscribe();
            }

        }
        if (this.config.cascade && this.config.cascade.messageReceiver) {
            // 解析消息接受配置,并注册消息接收对象
            this._receiver_source$ = new RelationResolver(this).resolve(this.config.cascade);
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
            // ...this.buildParameters(this.config.loadingConfig.params),
            ...this._buildPaging(),
            // ...this._buildFilter(this.config.ajaxConfig.filter),
            // ...this._buildSort(),
            // ...this._buildColumnFilter(),
            // ...this._buildFocusId(),
            // ...this._buildSearch()
        };

        this.componentService.apiService.getRequest(url, method, { params }).subscribe(response => {
            if (response.data && response.data.resultDatas.length > 0) {
                response.data.resultDatas.map((d, index) => {
                    const orginAction = this.tableColumns.find(c => c.type === 'action');
                    const copyAction = [];
                    if (orginAction) {
                        const actions = JSON.parse(JSON.stringify(this.tableColumns.find(c => c.type === 'action').action));
                        copyAction.push(...actions);
                    }
                    this.mapOfDataState[d[this.KEY_ID]] = {
                        dislabled: false,
                        checked: false, // index === 0 ? true : false,
                        selected: false, // index === 0 ? true : false,
                        state: 'text',
                        data: d,
                        actions: copyAction
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
            const searchData = JSON.parse(JSON.stringify(this._search_row));
            delete searchData.key;
            delete searchData.checked;
            delete searchData.row_status;
            delete searchData.selected;

            search = searchData;
        }
        return search;
    }
    // #endregion





    public addRow() {
        console.log(this.config.id + '-------------add row');
    }

    public editRow() {
        console.log('edit-row arguments', arguments);
        // console.log(this.config.id + '-------------edit row');
        if (this.ROWS_CHECKED.length > 0) {
            this.ROWS_CHECKED.map(rowData => {
                // this.rowAction(sdf, rowData);
            })

        }
        // 
        // this.rowAction()
    }

    /**
     * 保存编辑行
     * @param options ajaxConfig
     */
    public saveRow(ajaxConfig) {
        console.log(this.config.id + '-------------save row', ajaxConfig);
        // 构建业务对象
        // 执行异步操作
        // this.componentService.apiService.doPost();
        const url = ajaxConfig.url;
        const params = this.buildParameters(ajaxConfig.params);
        this.componentService.apiService[ajaxConfig.ajaxType](url, params).subscribe(response => {
            // success 0:全部错误,1:全部正确,2:部分错误
            if (response.data) {
                const successCfg = ajaxConfig.result.find(res => res.name === 'data');
                // 弹出提示框
                if (successCfg.senderCfg) {
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
            // switch (response.success) {
            //     case 0:
            //         const successCfg = ajaxConfig.result.find(res => res.name === 'data');
            //         // 弹出提示信息

            //         // 发送消息
            //         if (successCfg.senderCfg) {
            //             new RelationResolver(this).resolveInnerSender(successCfg.senderCfg);
            //         }
            //         // 发送消息
            //         break;
            //     case 1:
            //             const validationCfg = ajaxConfig.result.find(res => res.name === 'validation');
            //         break;
            //     case 2:
            //             const errorCfg = ajaxConfig.result.find(res => res.name === 'error');
            //         break;

            // }
        })
        // 处理data结果
        // 处理message结果
        // 处理validation结果
        // 发送后续操作消息

    }

    public cancelRow() {
        console.log(this.config.id + '-------------cancel  row');
    }

    public setSelectRow(rowData?, $event?) {
        console.log(this.config.id, arguments);
        if ($event) {
            const src = $event.srcElement || $event.target;
            if (src.type === 'checkbox') {
                return;
            }
            $event.stopPropagation();
        }

        // if (!rowData) {
        //     rowData = this.ROW_SELECTED;
        // }

        // 选中当前行
        this.dataList.map(row => {
            this.mapOfDataState[row[this.KEY_ID]]['selected'] = false;
        });

        this.mapOfDataState[rowData[this.KEY_ID]]['selected'] = true;

        // 勾选/取消当前行勾选状态
        this.mapOfDataState[rowData[this.KEY_ID]]['checked'] = !this.mapOfDataState[rowData[this.KEY_ID]]['checked'];
        this.dataCheckedStatusChange();
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
            componentValue: this._rowsData,
            item: this._selectedRow,
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
     * @param rowData 当前数据航
     * @param $event 
     */
    rowAction(actionCfg, rowData, $event?) {
        const dataOfState = this.mapOfDataState[rowData[this.KEY_ID]];
        $event && $event.stopPropagation();
        const trigger = new ButtonOperationResolver(this.componentService, this.config, dataOfState);
        trigger.toolbarAction(actionCfg, this.config.id);
        $event && $event.preventDefault();
    }

}
