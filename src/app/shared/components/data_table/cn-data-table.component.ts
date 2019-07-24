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
import { filter } from 'rxjs/operators';
import { Subscription, Subject, BehaviorSubject } from 'rxjs';
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
    styles: [
        `
            .table-operations {
                margin-bottom: 8px;
            }

            .table-operations > button {
                margin-right: 8px;
            }

            .selectedRow {
                color: #fff;
                font-weight:600;
                background-color: rgb(100, 149, 222);
            }
            .text-center {
                text-align: center;
            }
            ,
            .text-right {
                text-align: right;
            }

        `
    ]
})
export class CnDataTableComponent extends CnComponentBase
    implements OnInit, AfterViewInit, OnDestroy, IDataGridProperty {

    @Input()
    public config; // dataTables 的配置参数
    @Input()
    public permissions = [];
    @Input()
    public dataList = []; // 表格数据集合
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


    public loading = false;
    public pageIndex = 1;
    public pageSize = 10;
    public total = 1;
    public focusIds;

    public allChecked = false;
    public indeterminate = false;
    public _sortName;
    public _sortOrder;

    public ROWS_ADDED: any = [];
    public ROWS_EDITED: any = [];
    public ROW_SELECTED: any = {};
    public ROWS_CHECKED: any = [];

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
        this._selectedRow = {
            id: '1-001',
            name: '单行数据'
        }


        this._rowsData = [
            { id: '1-001', name: '第一行' },
            { id: '1-002', name: '第二行' },
            { id: '1-003', name: '第三行' },
            { id: '1-004', name: '第四行' }
        ]
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

    public load() {
        console.log(this.config.id + '-------------CnDataTable On Loading');
        // console.log(this.config.id + 'current tempValue ', this.tempValue);
        // console.log(this.config.id + 'current initValue ', this.initValue);
        const url = this.config.loadingConfig.url;
        const method = this.config.loadingConfig.method;
        const params = {
            ...this.buildParameters(this.config.loadingConfig.params),
            // ...this._buildPaging(),
            // ...this._buildFilter(this.config.ajaxConfig.filter),
            // ...this._buildSort(),
            // ...this._buildColumnFilter(),
            // ...this._buildFocusId(),
            // ...this._buildSearch()
        };
        this.componentService.apiService.getRequest(url, method, { params })
            .toPromise()
            .then(result => {
                console.log(result);
            }).catch(res => {
                console.log(res);
            })
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
        if (this.config.pagination) {
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
        if (this._sortName && this._sortOrder) {
            sortObj['_sort'] = this._sortName + this._sortOrder;
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
        console.log(this.config.id + '-------------edit row');
    }

    /**
     * 保存编辑行
     * @param options ajaxConfig
     */
    public saveRow(options) {
        console.log(this.config.id + '-------------save row', options);

    }

    public cancelRow() {
        console.log(this.config.id + '-------------cancel  row');
    }

    public selectRow() {
        console.log(this.config.id + '-------------select row');


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

}
