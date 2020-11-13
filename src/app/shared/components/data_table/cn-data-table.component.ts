import { CfgLayoutPageComponent } from './../../config-components/config-layout-page/cfg-layout-page/cfg-layout-page.component';
import { CnDataFormComponent } from '@shared/components/data-form/cn-data-form.component';
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
import { CnPageComponent } from '@shared/components/cn-page/cn-page.component';
import { environment } from '@env/environment';
import { PageStructure } from '@shared/resolver/structure/page_Structure';
// const component: { [type: string]: Type<any> } = {
//     layout: LayoutResolverComponent,
//     form: CnFormWindowResolverComponent,
//     upload: BsnUploadComponent,
//     importExcel: BsnImportExcelComponent
// };
const components: { [type: string]: Type<any> } = {
    form: CnDataFormComponent,
    cfgLayoutPage: CfgLayoutPageComponent
    // label: ,
    // selectMultiple:,
    // datePicker:,
    // yearPicker:,
    // weekPicke:,
    // rangePicker:,
    // monthPicker:,
    // switch:,
    // radio:,
    // checkbox:,
    // treeSelect:,
    // transfer: ,
    // gridSelect:,
    // textarea: ,
    // customSelect: ,
};

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'cn-data-table,[cn-data-table]',
    templateUrl: './cn-data-table.component.html',
    styleUrls: [`cn-data-table.component.less`]
})
export class CnDataTableComponent extends CnComponentBase
    implements OnInit, AfterViewInit, OnDestroy {

    @Input()
    public config; // dataTables 的配置参数
    @Input() initData;
    @Input() tempData;
    @Input() changeValue: any;
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
            actions?: any[],
            validation?: boolean,
            mergeData?: any
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
    public ROW_CURRENT: any;
    public operationRow: any;

    // 作为子组件时变量
    public selectedRowValue;

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
    private _ajaxConfigObj: any = {};
    
    public _url = environment.SERVER_URL;

    constructor(
        @Inject(BSN_COMPONENT_SERVICES)
        public componentService: ComponentServiceProvider
    ) {
        super(componentService);
        this.cacheValue = this.componentService.cacheService;

        // init cacheValue
    }

    public async ngOnInit() {
        this.setChangeValue(this.changeValue);
        // 设置数据操作主键
        this.KEY_ID = this.config.keyId ? this.config.keyId : 'id';

        // 初始化默认分页大小
        this.config.pageSize && (this.pageSize = this.config.pageSize);
        this.config.ajaxConfig.forEach(ajax => {
            this._ajaxConfigObj[ajax.id] = ajax;
        });
        // 构建表格列及列标题

        if (this.config.columnsAjax) {
            await this.loadDynamicColumns();
            console.log('动态++++》', this.config.columns);
        }
        this._buildColumns(this.config.columns);

        this._initInnerValue();

        // 解析及联配置
        this.resolveRelations();




        // 是否需要进行初始化数据加载
        if (this.config.loadingOnInit) {
            this.load();
        }
    }

    private _initInnerValue() {
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

    public setInitValue(val) {
        this.initValue = { ...this.initValue, ...val };
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
            const colIndex = columns.filter(item => item.type === 'index');
            const colObjs = columns.filter(item => item.type === 'field');
            const actionCfgs = columns.filter(item => item.type === 'action');
            colObjs.forEach(col => {
                if (col.editor) {
                    if (col.editor.loadingConfig) {
                        col.editor['loadingConfig']['ajaxConfig'] = this._ajaxConfigObj[col.editor.loadingConfig.id];
                    }
                    if (col.editor.loadingItemConfig) {
                        col.editor['loadingItemConfig']['ajaxConfig'] = this._ajaxConfigObj[col.editor.loadingItemConfig.id];
                    }
                    if (col.editor.expandConfig) {
                        col.editor['expandConfig']['ajaxConfig'] = this._ajaxConfigObj[col.editor.expandConfig.id];
                    }
                    if (col.editor.hasOwnProperty('changeValueId')) {
                        col.editor['changeValue'] = this.findChangeValueConfig(col.editor.changeValueId);
                      }
                }
            });
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
            if (colIndex && colIndex.length > 0) {
                this.tableColumns.push(...colIndex);
            }
            if (colObjs && colObjs.length > 0) {
                this.tableColumns.push(...colObjs);
            }
            if (actionCfgs && actionCfgs.length > 0) {
                this.tableColumns.push(...actionCfgs);
            }
        }

    }

    private findChangeValueConfig(changeValueId) {
        let changeValueConfig;
        if (this.config.changeValue && Array.isArray(this.config.changeValue) && this.config.changeValue.length > 0) {
          const c = this.config.changeValue.find(cfg => cfg.id === changeValueId);
          if (c) {
            changeValueConfig = c;
          }
        }
        return changeValueConfig;
      }
    private _initComponentData() {
        this.mapOfDataState = {};
        this.ROWS_ADDED = [];
        this.ROWS_EDITED = [];
        this.ROW_SELECTED = [];
        this.ROWS_CHECKED = [];
        this.COMPONENT_VALUE = [];
        this.ROW_SELECTED = JSON.parse(`{"${this.KEY_ID}": ""}`);
    }

    public loadByFilter() {
        if (!this.config.loadingConfig) {
            return;
        }
        this.isLoading = true;
        const url = this.config.loadingConfig.url;
        const method = this.config.loadingConfig.method ? this.config.loadingConfig.method : this.config.loadingConfig.ajaxType;
        const params = {
            ...this.buildParameters(this.config.loadingConfig.params),
            ...this._buildPaging(),
            ...this._buildFilter(this.config.loadingConfig.filter),   // 查询是在当前基础上进行查询的
            ...this._buildSort(),
            // ...this._buildColumnFilter(),
            // ...this._buildFocusId(),
            // ...this._buildSearch()
        };

        this.componentService.apiService.getRequest(url, method, { params }).subscribe(response => {
            if (response && response.data && response.data.resultDatas) {
                this._initComponentData();
                let _index = 0;
                if (this.pageIndex === 1) {
                    _index = _index;
                } else {
                    _index = (this.pageIndex - 1) * this.pageSize;
                }
                response.data.resultDatas.map((d, index) => {
                    _index = _index + 1;
                    d['_index'] = _index;
                    this.mapOfDataState[d[this.KEY_ID]] = {
                        disabled: false,
                        checked: false, // index === 0 ? true : false,
                        selected: false, // index === 0 ? true : false,
                        state: 'text',
                        data: d,
                        originData: { ...d },
                        validation: true,
                        actions: this.getRowActions('text'),
                        mergeData: {}
                    };
                    if (!this.config.isSelected) {
                        index === 0 && (this.ROW_SELECTED = d);
                    } else {
                        if (d[this.KEY_ID] === this.selectedRowValue) {
                            this.ROW_SELECTED = d
                        }
                    }

                });

                this.dataList = response.data.resultDatas;
                this.total = response.data.count;
                // 更新
                // this.dataCheckedStatusChange();
                // 默认设置选中第一行, 初始数据的选中状态和选中数据,均通过setSelectRow方法内实现
                // this.dataList.length > 0 && this.setSelectRow(this.ROW_SELECTED);

                this.setSelectRow(this.ROW_SELECTED);
                this.isLoading = false;
            } else {
                this.isLoading = false;
            }
        }, error => {
            console.log(error);
        });
    }

    public load() {
        this.isLoading = true;
        if (!this.config.loadingConfig) {
            return;
        }
        const url = this.config.loadingConfig.url;
        const method = this.config.loadingConfig.method ? this.config.loadingConfig.method : this.config.loadingConfig.ajaxType;

        const params = {
            ...this.buildParameters(this.config.loadingConfig.params),
            ...this._buildPaging(),
            ...this._buildFilter(this.config.loadingConfig.filter),
            ...this._buildSort(),
            // ...this._buildColumnFilter(),
            // ...this._buildFocusId(),
            // ...this._buildSearch()
        };

        this.componentService.apiService.getRequest(url, method, { params }).subscribe(response => {
            if (response && response.data && response.data.resultDatas) {
                this._initComponentData();
                let _index = 0;
                if (this.pageIndex === 1) {
                    _index = _index;
                } else {
                    _index = (this.pageIndex - 1) * this.pageSize;
                }
                response.data.resultDatas.map((d, index) => {

                    _index = _index + 1;
                    d['_index'] = _index;
                    this.mapOfDataState[d[this.KEY_ID]] = {
                        disabled: false,
                        checked: false, // index === 0 ? true : false,
                        selected: false, // index === 0 ? true : false,
                        state: 'text',
                        data: d,
                        originData: { ...d },
                        validation: true,
                        actions: this.getRowActions('text'),
                        mergeData: {}
                    };
                    if (!this.config.isSelected) {
                        index === 0 && (this.ROW_SELECTED = d);
                    } else {
                        if (d[this.KEY_ID] === this.selectedRowValue) {
                            this.ROW_SELECTED = d
                        }
                    }

                });

                this.dataList = response.data.resultDatas;
                this.total = response.data.count;
                // 更新
                // this.dataCheckedStatusChange();
                // 默认设置选中第一行, 初始数据的选中状态和选中数据,均通过setSelectRow方法内实现
                // this.dataList.length > 0 && this.setSelectRow(this.ROW_SELECTED);

                this.setSelectRow(this.ROW_SELECTED);
                this.isLoading = false;
                // 2020.7.27 计算合并列
                if (this.config.mergeconfig)
                    this._createMapd_new(this.config.mergeconfig, this.dataList);
            } else {
                this.isLoading = false;
                this._initComponentData();
                this.dataList = [];
                this.total = 0;
            }

            this.dataServe && this.dataServe.setComponentValue(this.config.id, this.dataList);
        }, error => {
            console.log(error);
        });
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
            param1[this.KEY_ID] = `in(${rids.join(',')})`;
        } else if (option) {
            param1[this.KEY_ID] = `in(${option[this.KEY_ID]})`
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

    public ajaxColumns; // 动态列
    public async loadDynamicColumns() {
        // debugger;
        const url = this.config.columnsAjax.url;
        const method = this.config.columnsAjax.method ? this.config.columnsAjax.method : this.config.columnsAjax.ajaxType;

        const params = {
            ...this.buildParameters(this.config.columnsAjax.params),
        };
        const loadColumns = [];
        const loadData = await this.componentService.apiService.getRequest(url, method, { params }).toPromise();
        if (loadData && loadData.data && loadData.success) {
            if (loadData.data) {
                // console.log('异步请求列信息', loadData.data);
                if (loadData.data.length > 0) {
                    if (loadData.data.length < 50) { // 异常处理，超过50个
                        this.ajaxColumns = loadData.data;
                        loadData.data.forEach(element => {
                            const column = {};
                            column['type'] = "field";
                            this.config.columnsConfig.forEach(cc => {
                                if (cc.feild) {
                                    column[cc.name] = element[cc.feild];
                                } else {
                                    column[cc.name] = cc['value'];
                                }
                            });
                            loadColumns.push(column);
                        });
                    }
                }
            }
        }
        const Columns = this.mergedColumns(loadColumns);
        this.config.columns = Columns;
    }

    public mergedColumns(fieldConfig?) {
        const dynamicColumns = this.setFieldByColumns(fieldConfig);
        const dynamicdefaultcolumns = [];
        this.config.defaultcolumns.forEach(c => {
            if (c['type'] !== 'action') {
                const index = dynamicColumns.findIndex(item => item.feild === c.field);
                if (index > -1) {
                    // 动态列重复，覆盖默认列
                } else {
                    dynamicdefaultcolumns.push(c);
                }
            } else {
                dynamicdefaultcolumns.push(c);
            }

        });

        const columns = [...dynamicdefaultcolumns, ...dynamicColumns];
        // console.log('最终生成列', columns);
        return columns;
    }

    public setFieldByColumns(fieldConfig?) {
        const cf_config = [];
        fieldConfig.forEach(f => {
            const cf = {};
            cf['title'] = f.title;
            cf['type'] = f.type;
            cf['subtitle'] = f.subtitle ? f.subtitle : null;
            cf['subtitletext'] = f.subtitletext ? f.subtitletext : null;
            cf['text'] = f.text ? f.text : null;
            cf['field'] = f.field;
            cf['width'] = f.width;
            cf['hidden'] = f.hidden;
            cf['titleField'] = f.titleField;
            cf['fieldAlign'] = f.fieldAlign ? f.field.Align : 'text-center'
            if (f.isEdit) {
                cf['editor'] = this.setEditConfig(f);
            }
            cf_config.push(cf);
        });
        return cf_config;
    }

    public setEditConfig(d?) {
        let c;
        if (d.editType === 'input') {
            c = {
                'type': 'input',
                'field': d.field,
                'options': {
                    'type': 'input',
                    'width': d.width,
                    'inputType': 'text'
                }
            }
        } else if (d.editType === 'select') {
            // 无法实现动态数据源，这部分信息只能由视图补充
            c = {
                'type': 'select',
                'field': d.field,
                'options': {
                    'type': 'select',
                    'labelSize': '6',
                    'controlSize': '18',
                    'inputType': 'submit',
                    'disabled': false,
                    'size': 'default',
                    'width': d.width,
                    'defaultValue': '1',
                    'options': [
                        {
                            'label': '合格',
                            'value': '1',
                            'disabled': false
                        },
                        {
                            'label': '不合格',
                            'value': '2',
                            'disabled': false
                        }
                    ]
                }
            }
        }
        return c;

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
                cacheValue: this.cacheValue,
                initValue: this.initValue
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

    // #region state 状态切换
    private createNewRowData() {
        const newData = {}
        this.config.columns.map(col => {
            newData[col.field] = null
        });
        return newData;
    }

    public addRow(r?) {
        // debugger;
        // 创建空数据对象
        const newId = CommonUtils.uuID(36);
        let newData = this.createNewRowData();
        newData[this.KEY_ID] = newId;
        if (r) {
            newData = { ...newData, ...r };
        }

        // 新增数据加入原始列表,才能够动态新增一行编辑数据
        this.dataList = [newData, ...this.dataList];
        this.total = this.total + 1;

        // 组装状态数据
        this.mapOfDataState[newId] = {
            data: newData,
            originData: { ...newData },
            disabled: false,
            checked: true, // index === 0 ? true : false,
            selected: false, // index === 0 ? true : false,
            state: 'new',
            actions: this.getRowActions('new'),
            mergeData: {}
        }

        this.ROWS_ADDED = [newData, ...this.ROWS_ADDED];

        this.dataCheckedStatusChange();
        //this.setSelectRow(newData);

        // 更新状态
    }

    private removeEditRow(item) {
        this.ROWS_EDITED = this.ROWS_EDITED.filter(r => r[this.KEY_ID] !== item[this.KEY_ID]);
        this.dataCheckedStatusChange();
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
        console.log('edit====', option)
        if (option.data) {
            this.addEditRows(option.data.data);
            // 2020.7.27 计算合并列
            if (this.config.mergeconfig)
                this._createMapd_new(this.config.mergeconfig, this.dataList);
        }
        return true;
    }

    // 取消添加的新行 数据  
    public cancelNewRow(option) {
        if (option.data) {
            this.removeNewRow(option.data.data);
        }
        this.dataCheckedStatusChange();
    }

    public cancelNewRows(option) {
        this.ROWS_ADDED.map(
            item => {
                this.removeNewRow(item);
                const trigger = new ButtonOperationResolver(this.componentService, this.config, this.mapOfDataState[item[this.KEY_ID]]);
                trigger.sendBtnMessage(option.btnCfg, { triggerType: BSN_TRIGGER_TYPE.STATE, trigger: BSN_DATAGRID_TRIGGER.CANCEL_EDIT_ROW }, this.config.id);

            }
        )
        this.dataCheckedStatusChange();
        return true;
    }

    private removeNewRow(item) {
        this.dataList = this.dataList.filter(r => r[this.KEY_ID] !== item[this.KEY_ID]);
        this.ROWS_ADDED = this.ROWS_ADDED.filter(r => r[this.KEY_ID] !== item[this.KEY_ID]);
        delete this.mapOfDataState[item[this.KEY_ID]];
        if (this.total > 0) {
            this.total = this.total - 1;
        }
        // 2020.7.27 计算合并列
        if (this.config.mergeconfig)
            this._createMapd_new(this.config.mergeconfig, this.dataList);

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
            // 2020.7.27 计算合并列
            if (this.config.mergeconfig)
                this._createMapd_new(this.config.mergeconfig, this.dataList);
        }

        console.log('-------------', this.ROWS_ADDED, this.ROWS_EDITED)
        // 调用方法之前,判断传递的验证配置,解析后是否能够继续进行后续操作
        // return true 表示通过验证, return false 表示未通过,无法继续后续操作

        return true;
    }

    public changeAddedRowsToText(option) {
        console.log('changeAddedRowsToText', option);
        // 通过服务器端的临时ID与执行数据的ID匹配取得数据
        if (option && Array.isArray(option)) {
            option.map(opt => {
                if (this.mapOfDataState[opt[this.KEY_ID]]) {

                    this.ROWS_ADDED = this.ROWS_ADDED.filter(r => r[this.KEY_ID] !== opt[this.KEY_ID]);
                    this.mapOfDataState[opt[this.KEY_ID]]['originData'] = { ...this.mapOfDataState[opt[this.KEY_ID]]['data'] };
                    this.config.rowActions && (this.mapOfDataState[opt[this.KEY_ID]]['actions'] = [...this.config.rowActions.filter(action => action.state === 'text')]);
                    const trigger = new ButtonOperationResolver(this.componentService, this.config, this.mapOfDataState[opt[this.KEY_ID]]);
                    trigger.sendBtnMessage({}, { triggerType: BSN_TRIGGER_TYPE.STATE, trigger: BSN_DATAGRID_TRIGGER.CANCEL_EDIT_ROW }, this.config.id);
                }
            })
        } else if (option) {
            // this.mapOfDataState[option[this.KEY_ID]].state = 'text';
            this.ROWS_ADDED = this.ROWS_ADDED.filter(r => r[this.KEY_ID] !== option[this.KEY_ID]);
            this.mapOfDataState[option[this.KEY_ID]]['originData'] = { ...this.mapOfDataState[option[this.KEY_ID]]['data'] };
            this.config.rowActions && (this.mapOfDataState[option[this.KEY_ID]]['actions'] = [...this.config.rowActions.filter(action => action.state === 'text')]);
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

    public deleteCheckedRows(option) {
        console.log(this.config.id + '-------------executeSelectRow', option);
        if (option && option.ids) {
            option.ids.split(',').map(id => {
                this.dataList = this.dataList.filter(d => d[this.KEY_ID] !== id);
            });
        }
        if (this.dataList.length > 0) {
            this.setSelectRow(this.dataList[0]);
        }
        this.total = this.dataList.length;
    }

    public async deleteCurrentRow(option) {
        console.log(this.config.id + '-------------executeSelectRow', option);
        if (option && option[this.KEY_ID]) {
            this.dataList = this.dataList.filter(d => d[this.KEY_ID] !== option[this.KEY_ID]);
        }
        if (this.dataList.length > 0) {
            this.setSelectRow(this.dataList[0]);
        }

        this.total = this.dataList.length;
        // const url = option.ajaxConfig.url;
        // const method = option.ajaxConfig.ajaxType ? option.ajaxConfig.ajaxType : 'delete';
        // const ajaxParams = option.ajaxConfig.params ? option.ajaxConfig.params : []
        // let paramData;
        // if (option.data) {
        //     paramData = ParameterResolver.resolve({
        //         params: ajaxParams,
        //         item: option.data.data?option.data.data:option.data,
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

    public async executeCurrentRow(option) {
        console.log('executeCurrentRow');
        const url = option.ajaxConfig.url;
        const method = option.ajaxConfig.ajaxType;
        const ajaxParams = option.ajaxConfig.params ? option.ajaxConfig.params : []
        let paramData;
        if (option.data) {
            paramData = ParameterResolver.resolve({
                params: ajaxParams,
                item: option.data.data ? option.data.data : option.data,

                selectedRow: this.ROW_SELECTED,
                router: this.routerValue,
                addedRows: this.ROWS_ADDED,
                editedRows: this.ROWS_EDITED,
                checkedRow: this.ROWS_CHECKED,
                tempValue: this.tempValue,
                initValue: this.initValue,
                cacheValue: this.cacheValue,
                currentRow:this.ROW_CURRENT
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
        const rowData = option.data.data ? option.data.data : option.data;
        const url = ajaxConfig.url;
        const paramData = ParameterResolver.resolve({
            params: ajaxConfig.params,
            tempValue: this.tempValue,
            componentValue: rowData,
            item: this.ROW_SELECTED,
            initValue: this.initValue,
            cacheValue: this.cacheValue,
            router: this.routerValue,
            selectedRow: this.ROW_SELECTED,
            addedRows: this.ROWS_ADDED,
            editedRows: this.ROWS_EDITED,
            checkedRow: this.ROWS_CHECKED,
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

    public setSelectRow1(rowData?, $event?) {
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
        if (!rowData) {
            if (this.dataList.length > 0) {

                this.dataList.map(row => {
                    this.mapOfDataState[row[this.KEY_ID]]['selected'] = false;
                    this.mapOfDataState[row[this.KEY_ID]]['checked'] = false;
                });

                const key = this.dataList[0][this.KEY_ID];
                this.mapOfDataState[key]['selected'] = true;
                this.mapOfDataState[key]['checked'] = true;
                // 勾选/取消当前行勾选状态            

                this.dataCheckedStatusChange();
            }
            // return false;
        }
        else {
            this.ROW_SELECTED = rowData;

            // 选中当前行
            if (this.dataList.length > 0) {
                this.dataList.map(row => {
                    this.mapOfDataState[row[this.KEY_ID]]['selected'] = false;
                    this.mapOfDataState[row[this.KEY_ID]]['checked'] = false;
                });

                if (rowData[this.KEY_ID] && rowData[this.KEY_ID].length > 0) {
                    this.mapOfDataState[rowData[this.KEY_ID]]['selected'] = true;
                    this.mapOfDataState[rowData[this.KEY_ID]]['checked'] = true; // !this.mapOfDataState[rowData[this.KEY_ID]]['checked'];
                }


                // 勾选/取消当前行勾选状态            

                this.dataCheckedStatusChange();
            }
        }


        return true;
    }

    public setSelectRow(rowData?, $event?) {

        if ($event) {
            const src = $event.srcElement || $event.target;
            if (src.type !== undefined) {
                return false;
            }
            $event.stopPropagation();
            $event.preventDefault();
        }
        if (!rowData.hasOwnProperty(this.KEY_ID)) {
            if (this.dataList.length > 0) {

                this.dataList.map(row => {
                    this.mapOfDataState[row[this.KEY_ID]]['selected'] = false;
                    this.mapOfDataState[row[this.KEY_ID]]['checked'] = false;
                });

                const key = this.dataList[0][this.KEY_ID];
                this.mapOfDataState[key]['selected'] = true;
                this.mapOfDataState[key]['checked'] = true;
                // 勾选/取消当前行勾选状态            

                this.dataCheckedStatusChange();
            }
            // return false;
        }
        else {
            this.ROW_SELECTED = rowData;

            // 选中当前行
            if (this.dataList.length > 0) {
                this.dataList.map(row => {
                    this.mapOfDataState[row[this.KEY_ID]]['selected'] = false;
                    this.mapOfDataState[row[this.KEY_ID]]['checked'] = false;
                });

                if (rowData[this.KEY_ID] && rowData[this.KEY_ID].length > 0) {
                    this.mapOfDataState[rowData[this.KEY_ID]]['selected'] = true;
                    this.mapOfDataState[rowData[this.KEY_ID]]['checked'] = true; // !this.mapOfDataState[rowData[this.KEY_ID]]['checked'];
                }


                // 勾选/取消当前行勾选状态            

                this.dataCheckedStatusChange();
            }
        }
        return true;
    }

    public clearSelectRow(type?) {
        this.dataList.map(row => {
            switch (type) {
                case "selected":
                    this.mapOfDataState[row[this.KEY_ID]]['selected'] = false;
                    break;
                case "checked":
                    this.mapOfDataState[row[this.KEY_ID]]['checked'] = false;
                    break;
                case "selectedOrchecked":
                    this.mapOfDataState[row[this.KEY_ID]]['selected'] = false;
                    this.mapOfDataState[row[this.KEY_ID]]['checked'] = false;
                    break;
                default:
                    this.mapOfDataState[row[this.KEY_ID]]['selected'] = false;
                    this.mapOfDataState[row[this.KEY_ID]]['checked'] = false;
                    break;
            }
        });
        this.dataCheckedStatusChange();
    }

    public selectRow(rowData) {


        console.log(this.config.id + '-----------' + rowData, arguments);
        // this.ROW_SELECTED = rowData;
    }

    // #endregion

    // #region action

    public refreshData(loadNewData) {
        if (loadNewData && Array.isArray(loadNewData)) {
            loadNewData.map((newData, ind) => {
                const index = this.dataList.findIndex(d => d[this.KEY_ID] === newData[this.KEY_ID]);
                if (index > -1) {
                    this.dataList.splice(index, 1, newData);
                    this.dataList = [...this.dataList];
                } else {
                    this.dataList = [loadNewData[ind], ...this.dataList];
                }

                // liu 20200818 处理编辑一次后不可编辑，刷新将状态恢复

                // liu 20200525
                const mapData = this.mapOfDataState[newData[this.KEY_ID]];
                if (mapData) {
                    mapData.state = "text";
                    mapData.actions = this.getRowActions('text');
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
                        state: 'text',
                        validation: true,
                        actions: this.getRowActions('text'),
                        mergeData: {}
                    }
                }

                this.rows_Add_Edit(newData);
            })
        }
        // 刷新dataList
        // 刷新mapOfDataState

        this.dataList.forEach((item, idx) => {
            this.mapOfDataState[item[this.KEY_ID]]['originData']['_index'] = idx + 1;
            // item[this.KEY_ID]
            item['_index'] = idx + 1;

        })
        //liu 20200818
        this.dataCheckedStatusChange();
    }

    // liu 20200818 去除保存后的新增，编辑状态
    public rows_Add_Edit(item?) {
        this.ROWS_ADDED = this.ROWS_ADDED.filter(r => r[this.KEY_ID] !== item[this.KEY_ID]);
        this.ROWS_EDITED = this.ROWS_EDITED.filter(r => r[this.KEY_ID] !== item[this.KEY_ID]);
        // this.dataCheckedStatusChange();
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
                item: this.ROW_SELECTED,
                initValue: this.initValue,
                cacheValue: this.cacheValue,
                router: this.routerValue,
                addedRows: this.ROWS_ADDED,
                editedRows: this.ROWS_EDITED,
                checkedRow: this.ROWS_CHECKED,
                outputValue: data,
                returnValue: data,
                selectedRow: this.ROW_SELECTED,
                currentRow:this.ROW_CURRENT

            });
        } else if (!isArray && data) {
            if (data['_procedure_resultset_1']) {
                data ={...data['_procedure_resultset_1'][0],...data};
            }
            parameterResult = ParameterResolver.resolve({
                params: paramsCfg,
                tempValue: this.tempValue,
                componentValue: this.COMPONENT_VALUE,
                item: data,
                initValue: this.initValue,
                cacheValue: this.cacheValue,
                router: this.routerValue,
                addedRows: data,
                editedRows: data,
                validation: data,
                returnValue: data,
                checkedRow: this.ROWS_CHECKED,
                outputValue: data,
                selectedRow: this.ROW_SELECTED,
                currentRow:this.ROW_CURRENT
            });
        } else if (isArray && data && Array.isArray(data)) {
            parameterResult = [];
            data.map(d => {
                const param = ParameterResolver.resolve({
                    params: paramsCfg,
                    tempValue: this.tempValue,
                    componentValue: d,
                    item: d,
                    initValue: this.initValue,
                    cacheValue: this.cacheValue,
                    router: this.routerValue,
                    addedRows: d,
                    editedRows: d,
                    validation: d,
                    returnValue: d,
                    checkedRow: this.ROWS_CHECKED,
                    outputValue: data,
                    currentRow:this.ROW_CURRENT
                });
                parameterResult.push(param);
            })
        }
        return parameterResult;
    }

    public getCurrentComponentId() {
        return this.config.id;
    }

    public async executeSelectRow(option) {
        console.log(this.config.id + '-------------executeSelectRow', option);
        const ajaxParams = option.ajaxConfig.params ? option.ajaxConfig.params : []
        const paramData = this._createSelectedRowParameter(ajaxParams);
        const result = await this._executeAjax(option, paramData);
        return result;
    }

    private async _executeAjax(option, paramData) {
        const url = option.ajaxConfig.url;
        const method = option.ajaxConfig.ajaxType;

        const response = await this.executeHttpRequest(url, method, paramData ? paramData : {});
        // 批量对象数据,返回结果都将以对象的形式返回,如果对应结果没有值则返回 {}
        this._sendDataSuccessMessage(response, option.ajaxConfig.result);

        // 处理validation结果
        const validationResult = this._sendDataValidationMessage(response, option.ajaxConfig.result);

        // 处理error结果
        const errorResult = this._sendDataErrorMessage(response, option.ajaxConfig.result);

        return validationResult && errorResult;
    }

    private _createSelectedRowParameter(ajaxParams) {
        return ParameterResolver.resolve({
            params: ajaxParams,
            item: this.ROW_SELECTED,
            tempValue: this.tempValue,
            initValue: this.initValue,
            cacheValue: this.cacheValue,
            selectedRow: this.ROW_SELECTED
        });
    }



    public async executeCheckedRows(option) {
        console.log(this.config.id + '-------------executeCheckedRows', option);
        const ajaxParams = option.ajaxConfig.params ? option.ajaxConfig.params : []

        const paramData = this._createCheckedRowsParameter(ajaxParams);
        console.log('executeCheckedRows params', paramData);
        const result = await this._executeAjax(option, paramData);
        return result;
    }

    private _createCheckedRowsParameter(ajaxParams) {
        const params = [];
        if (this.ROWS_CHECKED.length > 0) {
            this.ROWS_CHECKED.map(cr => {
                const p = ParameterResolver.resolve({
                    params: ajaxParams,
                    checkedItem: cr,
                    tempValue: this.tempValue,
                    initValue: this.initValue,
                    cacheValue: this.cacheValue
                });
                params.push(p);
            });
        }
        return params;
    }

    public async executeCheckedRowsIds(option) {
        console.log(this.config.id + '-------------executeCheckedRowsIds', option);
        const ajaxParams = option.ajaxConfig.params ? option.ajaxConfig.params : []
        const ajaxParams_1 = [{ name: this.KEY_ID, type: "item", valueName: this.KEY_ID }];
        const paramDataids = this._createCheckedRowsIdParameter(ajaxParams_1);
        let paramData;
        paramData = ParameterResolver.resolve({
            params: ajaxParams,
            item: paramDataids,
            checkedItem: paramDataids,
            tempValue: this.tempValue,
            initValue: this.initValue,
            cacheValue: this.cacheValue
        });
        const result = await this._executeAjax(option, paramData);
        return result;
    }

    private _createCheckedRowsIdParameter(ajaxParams) {
        const params = [];
        if (this.ROWS_CHECKED.length > 0) {
            this.ROWS_CHECKED.map(cr => {
                const p = ParameterResolver.resolve({
                    params: ajaxParams,
                    checkedItem: cr,
                    item: cr,
                    tempValue: this.tempValue,
                    initValue: this.initValue,
                    cacheValue: this.cacheValue
                });
                params.push(p[this.KEY_ID]);
            });
        }
        return { ids: params.join(',') };
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
     * 
     * @param option option.linkConfig -> {id: '', link: '', params:[{name: '', type:'', valueName: ''}]}
     */
    public link(option) {
        // debugger;
        let url;
        let params;
        if (option && option.linkConfig) {
            if (option.linkConfig.link) {
                url = option.linkConfig.link;
            }

            if (option.linkConfig.params && Array.isArray(option.linkConfig.params)) {
                params = this.buildParameters(option.linkConfig.params, option.data.originData ? option.data.originData : option.data);
                url = `${url}/${params['ID']}`;
            }
            if (url && params) {
                this.componentService.router.navigate([url], { queryParams: { ...params } });
            }
            else if (url) {
                this.componentService.router.navigate([url]);
            }
        } else {
            console.log('error');
        }
        // this.componentService.router.navigate([option.link], { queryParams: { ...option.data.originData } });
        // this.componentService.activeRoute
        // this.router.navigate(['../home'],{relativeTo:this.route});
    }

    public linkTo(option) {

    }

    /**
     * 内部子页面跳转【问题，参数传递、覆盖 changValue 和 普通参数传递】
     * @param option 
     */
    public linkToSub(option?){

        // let params = this.buildParameters(option.linkConfig.params, option.data.originData ? option.data.originData : option.data);
        // let item;
        // new RelationResolver(this)
        // .resolveInnerSender(
        //     item.sender,
        //     params,
        //     Array.isArray(params)
        // );
    }

    /**
     * ACTION
     * 显示确认对话框
     * @param option 确认参数 
     */
    public showConfirm(option: any) {
        this.confirm(option.dialog, () => { this.executeCurrentRow(option) })

    }

    /**
     * ACTION
     * @param option 
     */
    public showCheckedItemsIdsConfirm(option: any) {
        this.confirm(option.dialog, () => { this.executeCheckedRowsIds(option) })
    }

    /**
     * ACTION
     * @param option 
     */
    public showCheckedItems(option: any) {
        this.confirm(option.dialog, () => { this.executeCheckedRows(option) })
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

        const ajaxParams_1 = [{ name: this.KEY_ID, type: "item", valueName: this.KEY_ID }];
        const paramDataids = this._createCheckedRowsIdParameter(ajaxParams_1);
   
        if (option.changeValue) {
            const d = ParameterResolver.resolve({
                params: option.changeValue.params,
                tempValue: this.tempValue,
                // componentValue: cmptValue,
                item: option.data.data ? option.data.data : option.data,
                checkedItem: paramDataids,
                selectedRow: this.ROW_SELECTED,
                addedRows: this.ROWS_ADDED,
                editedRows: this.ROWS_EDITED,
                checkedRow: this.ROWS_CHECKED,
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
            nzWidth: dialogCfg.width ? dialogCfg.width : '600px',
            nzStyle: dialogCfg.style ? dialogCfg.style : null, // style{top:'1px'},
            nzMaskClosable: dialogCfg.hasOwnProperty('maskClosable')?dialogCfg.maskClosable : false,
            nzContent: components[dialogCfg.form.type],
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
                            if(response){
                                this._sendDataSuccessMessage(response, option.ajaxConfig.result);

                                // 处理validation结果
                                this._sendDataValidationMessage(response, option.ajaxConfig.result)
                                    &&
                                    this._sendDataErrorMessage(response, option.ajaxConfig.result)
                                    && dialog.close();
                            }

                        })();
                    }
                }
            ]
        }
        dialog = this.componentService.modalService.create(dialogOptional);
    }

    public showWindow(option: any) {
        let dialog;
        // 根据按钮类型初始化表单状态
        const dialogCfg = option.window;
        // dialogCfg.form.state = option.btnCfg.state ? option.btnCfg.state : 'text';

        // const isEditForm = dialogCfg.form.state === 'edit' ? true : false;
        // if(isEditForm) {

        // }

        const ajaxParams_1 = [{ name: this.KEY_ID, type: "item", valueName: this.KEY_ID }];
        const paramDataids = this._createCheckedRowsIdParameter(ajaxParams_1);
   
        if (option.changeValue) {
            const d = ParameterResolver.resolve({
                params: option.changeValue.params,
                tempValue: this.tempValue,
                // componentValue: cmptValue,
                item: option.data.data ? option.data.data : option.data,
                selectedRow: this.ROW_SELECTED,
                checkedItem: paramDataids,
                addedRows: this.ROWS_ADDED,
                editedRows: this.ROWS_EDITED,
                checkedRow: this.ROWS_CHECKED,
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
            nzWidth: dialogCfg.width ? dialogCfg.width : '600px',
            nzStyle: dialogCfg.style ? dialogCfg.style : null, // style{top:'1px'},
            nzMaskClosable: dialogCfg.hasOwnProperty('maskClosable')?dialogCfg.maskClosable : false,
            nzContent: CnPageComponent,
            nzComponentParams: {
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
                        /*   (async () => {
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
            console.log('execCustomAction');
    
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
    
        /**
         * 执行关闭，通过消息等将当前弹出关闭
         * @param option 
         */
        executePopupClose(option?) {
    
            console.log('关闭弹出executeShowClose', option)
            // 参数传递 更加传递类型关闭，若传递类型不配置，则将当前存在的示例关闭 popup
    
            if (this.windowDialog) {
                this.windowDialog.close(); // 关闭弹出
                this.windowDialog = null;
            }
    
            return true;
        }


    public showUpload(option: any) {

        // CnUploadComponent
        console.log('上传', option);
        let dialog;
        // 根据按钮类型初始化表单状态
        const dialogCfg = option.window;
        // dialogCfg.form.state = option.btnCfg.state ? option.btnCfg.state : 'text';

        // const isEditForm = dialogCfg.form.state === 'edit' ? true : false;
        // if(isEditForm) {

        // }
        if (option.changeValue) {
            const d = ParameterResolver.resolve({
                params: option.changeValue.params,
                tempValue: this.tempValue,
                // componentValue: cmptValue,
                item: option.data,
                selectedRow: this.ROW_SELECTED,
                addedRows: this.ROWS_ADDED,
                editedRows: this.ROWS_EDITED,
                checkedRow: this.ROWS_CHECKED,
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
            nzWidth: dialogCfg.width ? dialogCfg.width : '600px',
            nzStyle: dialogCfg.style ? dialogCfg.style : null, // style{top:'1px'},
            nzContent: CnPageComponent,
            nzComponentParams: {
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
                        /*   (async () => {
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
        dialog = this.componentService.modalService.create(dialogOptional);


    }

    public showBatchDialog() {

    }

    /**
     * 显示消息框
     */
    public showMessage(option) {
        let msgObj;
        if (option && Array.isArray(option)) {
            // 后续需要根据具体情况解析批量处理结果
            msgObj = this.buildMessageContent(option[0]);
        } else if (option) {
            msgObj = this.buildMessageContent(option);
        }
        option && this.componentService.msgService.create(msgObj.type, `${msgObj.message}`);
    }

    public buildMessageContent(msgObj) {
        const message: any = {};
        let array: any[];
        if (msgObj.type) {

        } else {
            array = msgObj.message.split(':');
        }

        if (!array) {
            if (msgObj.code) {
                message.message = msgObj.code;
            } else if (msgObj.message) {
                message.message = msgObj.message;
            }
            // message.message = option.code ? option.code : '';
            msgObj.field && (message.field = msgObj.field ? msgObj.field : '');
            message.type = msgObj.type;
        } else {
            message.type = array[0];
            message.message = array[1];
        }
        return message
    }

    /**
     * 全选
     */
    public checkAll($value: boolean): void {
        //
        this.dataList
            .filter(item => !this.mapOfDataState[item[this.KEY_ID]]['disabled'])
            .map(item =>
                this.mapOfDataState[item[this.KEY_ID]]['checked'] = $value
            );
        this.dataCheckedStatusChange();

    }

    /**
     * 更新数据选中状态的CheckBox
     */
    public dataCheckedStatusChange() {
        if (this.dataList.length > 0) {
            this.isAllChecked = this.dataList
                .filter(item => !this.mapOfDataState[item[this.KEY_ID]]['disabled'])
                .every(item => this.mapOfDataState[item[this.KEY_ID]]['checked']);

            this.indeterminate = this.dataList
                .filter(item => !this.mapOfDataState[item[this.KEY_ID]]['disabled'])
                .some(item => this.mapOfDataState[item[this.KEY_ID]]['checked']) && !this.isAllChecked;

            this.checkedNumber = this.dataList.filter(item => this.mapOfDataState[item[this.KEY_ID]]['checked']).length;

            // 更新当前选中数据集合
            this.ROWS_CHECKED = this.dataList
                .filter(item => !this.mapOfDataState[item[this.KEY_ID]]['disabled'])
                .filter(item => this.mapOfDataState[item[this.KEY_ID]]['checked']);
        } else {
            this.isAllChecked = false;
            this.indeterminate = false;
            this.checkedNumber = 0;

        }

        return true;

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
        this.ROW_CURRENT = dataOfState.originData;
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

        if (this.config.cascadeValue) {

            const cascade_arry = this.config.cascadeValue.filter(item => item.name === triggerKey);
            let cascade;
            if (cascade_arry.length > 0) {
                cascade = cascade_arry[0];

                // this.config.cascadeValue.forEach(cascade => {
                //     if (cascade.name !== triggerKey) {
                //       //  return false;
                //     }
                // console.log('==****开始应答解析*****==', cascade);
                cascade.CascadeObjects.forEach(cascadeObj => {
                    if (!this.formCascade[v['id']][cascadeObj.cascadeName]) {
                        this.formCascade[v['id']][cascadeObj.cascadeName] = {};
                    }
                    const cascadeResult = this.formCascade[v['id']][cascadeObj.cascadeName];  // 单个应答对象
                    cascadeResult[cascadeObj.cascadeName] = {};
                    cascadeObj.cascadeItems.forEach(item => {
                        let regularflag = true;
                        if (item.caseValue && item.type === "condition") {
                            const reg1 = new RegExp(item.caseValue.regular);
                            let regularData;
                            if (item.caseValue.type) {
                                if (item.caseValue.regularType === 'value') {
                                    regularData = item.caseValue['value'];
                                }
                                if (item.caseValue.type === 'selectValue') {
                                    // 选中行数据[这个是单值]
                                    regularData = v['value'];
                                }
                                if (item.caseValue.type === 'selectObjectValue') {
                                    // 选中行对象数据
                                    if (v.dataItem) {
                                        regularData = v.dataItem[item.caseValue['valueName']];
                                    }
                                }
                                if (item.caseValue['type'] === 'rowValue') {
                                    // 选中行对象数据
                                    if (this.mapOfDataState[v.id]['data']) {
                                        regularData = this.mapOfDataState[v.id]['data'][item.caseValue['valueName']];
                                    }
                                }

                            } else {
                                regularData = v['value'];
                            }
                            regularflag = reg1.test(regularData);
                        }

                        // 正则校验
                        if (regularflag) {

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

                                cascadeResult[cascadeObj.cascadeName]['setValue'] = { value: __setValue };
                                cascadeResult[cascadeObj.cascadeName]['exec'] = 'setValue';
                                // 赋值
                                // this.setValue(cascadeObj.cascadeName, __setValue);
                                this.mapOfDataState[v.id]['data'][cascadeObj.cascadeName] = __setValue;
                            }
                            if (item.content.type === 'compute') {
                                let __setValue;
                                const computeObj = {};

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
                                    if (ajaxItem['type'] === 'rowValue') {
                                        // 选中行对象数据
                                        if (this.mapOfDataState[v.id]['data']) {
                                            __setValue = this.mapOfDataState[v.id]['data'][ajaxItem['valueName']];
                                        }
                                    }

                                    computeObj[ajaxItem['name']] = Number(__setValue) ? Number(__setValue) : 0;
                                    // 其他取值【日后扩展部分】
                                });


                                const _computeValue = this.L__getComputeSymbol(item.content.compute.expression[0], computeObj);


                                cascadeResult[cascadeObj.cascadeName]['setValue'] = { value: _computeValue };
                                cascadeResult[cascadeObj.cascadeName]['exec'] = 'setValue';
                                this.mapOfDataState[v.id]['data'][cascadeObj.cascadeName] = _computeValue;
                                // cascadeResult[cascadeObj.cascadeName]['computeSetValue'] = { value: _computeValue };
                                // cascadeResult[cascadeObj.cascadeName]['exec'] = 'computeSetValue';
                                // this.mapOfDataState[v.id]['data'][cascadeObj.cascadeName] = _computeValue;
                                // 赋值
                                // this.setValue(cascadeObj.cascadeName, __setValue);

                            }
                            if (item.content.type === 'display') {
                                // 控制 小组件的显示、隐藏，由于组件不可控制，故而控制行列布局的显示隐藏

                            }
                            if (item.content.type === 'message') {
                                // 某种操作后，或者返回后，弹出提示消息，可提示静态消息，可提示动态消息

                            }
                            if (item.content.type === 'changeValue') {
                                cascadeResult[cascadeObj.cascadeName]['exec'] = 'changeValue';
                            }
                            if (item.content.type === 'relation') {
                                // 当满足某种条件下，触发某种消息，消息值的组转，-》调用配置完善的消息结构
                                // 提供 消息配置名称，发送参数组合
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

                                if (item.content.sender) {
                                    new RelationResolver(this)
                                        .resolveInnerSender(
                                            item.content.sender, // 消息泪痣
                                            _cascadeValue, // 消息数据
                                            Array.isArray(_cascadeValue) // 是否数组
                                        );
                                }


                            }
                            if (item.content.type === 'preventCascade') {

                                // 【大招】 某条件下，将级联阻止

                            }
                        }
                    });
                    this.formCascade[v['id']][cascadeObj.cascadeName] = JSON.parse(JSON.stringify(this.formCascade[v['id']][cascadeObj.cascadeName]));
                    // console.log('==树表内值变化反馈==', this.formCascade);
                });
                // });
            }
        }
    }

    public L__getComputeSymbol(symbolObj?, computeObj?) {

        let r = 0;
        if (symbolObj.valueName === 'result') {

        }
        if (symbolObj.valueName === '*') {
            r = 1;
            if (symbolObj.children) {
                symbolObj.children.forEach(_item => {
                    // r = r * this.L_getComputeValue(_item, computeObj);
                    r = parseFloat((r * this.L_getComputeValue(_item, computeObj)).toFixed(10));
                });
                return r;
            }
            return 0;
        }
        if (symbolObj.valueName === '+') {
            r = 0;
            if (symbolObj.children) {
                symbolObj.children.forEach(_item => {
                    // r = r + this.L_getComputeValue(_item, computeObj);
                    r = parseFloat((r + this.L_getComputeValue(_item, computeObj)).toFixed(10));
                });

            }
            return r;
        }
        if (symbolObj.valueName === '-') {
            // r = 0;
            // if (symbolObj.children) {
            //     symbolObj.children.forEach(_item => {
            //         r = r - this.L_getComputeValue(_item, computeObj);
            //     });
            //     r = r+ 2* this.L_getComputeValue(symbolObj.children[0], computeObj);

            // }
            // return r;
            r = 0;
            if (symbolObj.children) {
                r = r + this.L_getComputeValue(symbolObj.children[0], computeObj);
                for (let i = 1; i < symbolObj.children.length; i++) {
                    const comput_value = this.L_getComputeValue(symbolObj.children[i], computeObj);
                    //  r = r - comput_value;
                    r = parseFloat((r - comput_value).toFixed(10));
                }
            }
            return r;
        }
        if (symbolObj.valueName === '/') {
            // 
            r = 0.0;
            if (symbolObj.children) {
                r = r + this.L_getComputeValue(symbolObj.children[0], computeObj);
                for (let i = 1; i < symbolObj.children.length; i++) {
                    const comput_value = this.L_getComputeValue(symbolObj.children[i], computeObj);
                    if (comput_value === 0) {
                        return 0;
                    }
                    //  r = r / comput_value;
                    r = parseFloat((r / comput_value).toFixed(10));
                }
            }
            // const dd =  parseFloat((110.0 / 1.1).toFixed(10)) ; 

            return r;
        }

        return r;

    }

    public L_getComputeValue(item?, computeObj?) {

        if (item.type === 'symbol') {
            return this.L__getComputeSymbol(item, computeObj);
        }
        if (item.type === 'value') {
            return computeObj[item.valueName] ? computeObj[item.valueName] : 0;
        }
    }
    /**
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




    public _createMapd_new_old(mergeconfig?, listOfData?) {

        // 生成group字段

        const mergeData = {};


        listOfData.forEach(
            row => {
                this.mapOfDataState[row[this.KEY_ID]]['mergeData'] = {}; // 初始化
            }
        );


        // 按照 group 分组顺序进行  merge


        mergeconfig.rowConfig && mergeconfig.rowConfig.forEach(r_c => {


            listOfData.forEach(row => {

                if (!this.mapOfDataState[row[this.KEY_ID]]['mergeData'][r_c.colName]) {
                    this.mapOfDataState[row[this.KEY_ID]]['mergeData'][r_c.colName] = {};
                }
                let new_data = [...listOfData];
                r_c.groupCols.forEach(group_col => {

                    new_data = new_data.filter(d => d[group_col.groupColName] === row[group_col.groupColName]);
                });

                new_data = new_data.filter(d => d[r_c.groupName] === row[r_c.groupName]);
                let group_num = new_data.length;
                let group_index = new_data.findIndex(d => d[this.KEY_ID] === row[this.KEY_ID]);
                this.mapOfDataState[row[this.KEY_ID]]['mergeData'][r_c.colName]['groupNum'] = group_num;
                this.mapOfDataState[row[this.KEY_ID]]['mergeData'][r_c.colName]['groupIndex'] = group_index + 1;
                this.mapOfDataState[row[this.KEY_ID]]['mergeData'][r_c.colName]['colgroupIndex'] = 1;
                this.mapOfDataState[row[this.KEY_ID]]['mergeData'][r_c.colName]['colgroupNum'] = 1;


            });

        }
        );



        mergeconfig.colConfig && mergeconfig.colConfig.length > 0 && listOfData.forEach(
            row => {
                // this.mapd[row.id]={}; // 初始化

                mergeconfig.colConfig.forEach(col_c => {

                    col_c.mergeItems.forEach(item => {


                        let regularflag = true;
                        if (item.caseValue && item.type === "condition") {
                            const reg1 = new RegExp(item.caseValue.regular);
                            let regularData;
                            if (item.caseValue.type) {
                                if (item.caseValue.type === 'value') {
                                    regularData = item.caseValue['value'];
                                }
                                if (item.caseValue['type'] === 'rowValue') {
                                    // 选中行对象数据
                                    if (row) {
                                        regularData = row[item.caseValue['valueName']];
                                    }
                                }

                            } else {
                                regularData = null;
                            }
                            regularflag = reg1.test(regularData);
                        }
                        if (regularflag) {

                            let group_num = item.mergeCols.length;
                            item.mergeCols.forEach(merge_col => {
                                if (!this.mapOfDataState[row[this.KEY_ID]]['mergeData'][merge_col['mergeColName']]) {
                                    this.mapOfDataState[row[this.KEY_ID]]['mergeData'][merge_col['mergeColName']] = {};
                                }
                                let group_index = item.mergeCols.findIndex(d => d['mergeColName'] === merge_col['mergeColName']);
                                this.mapOfDataState[row[this.KEY_ID]]['mergeData'][merge_col['mergeColName']]['colgroupIndex'] = group_index + 1;
                                this.mapOfDataState[row[this.KEY_ID]]['mergeData'][merge_col['mergeColName']]['colgroupNum'] = group_num;
                            });





                        }


                    });


                });



            }
        );


        console.log('new生成分组信息', this.mapOfDataState);

    }


    public _createMapd_new(mergeconfig?, listOfData?) {

        // 生成group字段

        const mergeData = {};


        listOfData.forEach(
            row => {
                this.mapOfDataState[row[this.KEY_ID]]['mergeData'] = {}; // 初始化
            }
        );


        // 按照 group 分组顺序进行  merge


        mergeconfig.rowConfig && mergeconfig.rowConfig.forEach(r_c => {


            listOfData.forEach(row => {

                if (!this.mapOfDataState[row[this.KEY_ID]]['mergeData'][r_c.colName]) {
                    this.mapOfDataState[row[this.KEY_ID]]['mergeData'][r_c.colName] = {};
                }
                let new_data = [...listOfData];
                r_c.groupCols.forEach(group_col => {

                    // new_data = new_data.filter(d => d[group_col.groupColName] === row[group_col.groupColName]);
                    let _SingleEdit = true;
                    if (group_col.hasOwnProperty('singleEdit')) {
                        _SingleEdit = group_col['singleEdit'];
                    }
                    new_data = [...this._createMapd_array(new_data, group_col.groupColName, row, _SingleEdit)];
                    //     console.log('jisuan:',group_col.groupColName,new_data);
                });



                // console.log('统计:',new_data , row[r_c.groupName]); 
                // new_data = new_data.filter(d => d[r_c.groupName] === row[r_c.groupName]);
                let group_num = new_data.length;
                let group_index = new_data.findIndex(d => d[this.KEY_ID] === row[this.KEY_ID]);
                // if(group_index<0){
                //     console.log('错误统计',new_data,row[this.KEY_ID])
                // } 

                this.mapOfDataState[row[this.KEY_ID]]['mergeData'][r_c.colName]['groupNum'] = group_num;
                this.mapOfDataState[row[this.KEY_ID]]['mergeData'][r_c.colName]['groupIndex'] = group_index + 1;
                this.mapOfDataState[row[this.KEY_ID]]['mergeData'][r_c.colName]['colgroupIndex'] = 1;
                this.mapOfDataState[row[this.KEY_ID]]['mergeData'][r_c.colName]['colgroupNum'] = 1;


            });

        }
        );



        mergeconfig.colConfig && mergeconfig.colConfig.length > 0 && listOfData.forEach(
            row => {
                // this.mapd[row.id]={}; // 初始化

                mergeconfig.colConfig.forEach(col_c => {

                    col_c.mergeItems.forEach(item => {


                        let regularflag = true;
                        if (item.caseValue && item.type === "condition") {
                            const reg1 = new RegExp(item.caseValue.regular);
                            let regularData;
                            if (item.caseValue.type) {
                                if (item.caseValue.type === 'value') {
                                    regularData = item.caseValue['value'];
                                }
                                if (item.caseValue['type'] === 'rowValue') {
                                    // 选中行对象数据
                                    if (row) {
                                        regularData = row[item.caseValue['valueName']];
                                    }
                                }

                            } else {
                                regularData = null;
                            }
                            regularflag = reg1.test(regularData);
                        }
                        if (regularflag) {

                            let group_num = item.mergeCols.length;
                            item.mergeCols.forEach(merge_col => {
                                if (!this.mapOfDataState[row[this.KEY_ID]]['mergeData'][merge_col['mergeColName']]) {
                                    this.mapOfDataState[row[this.KEY_ID]]['mergeData'][merge_col['mergeColName']] = {};
                                }
                                let group_index = item.mergeCols.findIndex(d => d['mergeColName'] === merge_col['mergeColName']);
                                this.mapOfDataState[row[this.KEY_ID]]['mergeData'][merge_col['mergeColName']]['colgroupIndex'] = group_index + 1;
                                this.mapOfDataState[row[this.KEY_ID]]['mergeData'][merge_col['mergeColName']]['colgroupNum'] = group_num;
                            });





                        }


                    });


                });



            }
        );


        console.log('new生成分组信息', this.mapOfDataState);

    }





    /**
     * 
     * @param new_data  范围数组
     * @param feildName 分组字段
     * @param row       当前行
     * @param isSingleEdit 分组字段是否启用单独编辑
     */
    public _createMapd_array(new_data?, feildName?, row?, isSingleEdit?) {

        // 总方法，将数据集合 拷贝 可补充解析字段在当前结构下是否计算
        // 数组构建 
        // 将原数据对比编辑状态数据，计算出当前数据的状态
        // 1.判断是否启用独立编辑
        // 1.1 启用独立编辑 计算出当前行所在位置
        // 按当前行开始，向下找，满足分组标识一致，并且行不能是edit 若有一个不满足循环结束
        // 当前行向上找, 满足分组条件，并且不能是edit（逆序查找，查找结束后，反转）
        // 将上下两部分数据加上本身行合并，生成满足条件的新数据 
        // 返回当前数组
        // 2.当前列未启用编辑，则按照原始处理

        //1 将当前数组集合的edit状态写入
        // state: 'new' 'edit',
        console.log('xxxxxxxxx====>', feildName, new_data);
        new_data.forEach(row => {
            row['__state__'] = this.mapOfDataState[row[this.KEY_ID]]['state'];
        });

        //2 数组分割
        //2.1 计算出当前行所在
        let row_index = new_data.findIndex(d => d[this.KEY_ID] === row[this.KEY_ID]);
        //2.2 计算出前数组
        let BeforeArr = new_data.slice(0, row_index).reverse();
        let OwnArr = new_data.slice(row_index, row_index + 1);
        let AftertArr = new_data.slice(row_index + 1);

        console.log('xxxxxxxxx分割====>', row_index, BeforeArr, OwnArr, AftertArr);
        //2.2 计算出后数组
        // reverse() 反转

        let new_BeforeArr = [];
        let Before_index = 0;
        for (let i = 0; i < BeforeArr.length; i++) {
            // 序号不能断，状态不能断 
            if (Before_index === i && BeforeArr[i][feildName] === row[feildName]) {
                if (isSingleEdit) {
                    if (BeforeArr[i]['__state__'] === 'new' || BeforeArr[i]['__state__'] === 'edit') {
                        Before_index = -1;
                    } else {
                        new_BeforeArr.push(BeforeArr[i]);
                        Before_index++;
                    }

                } else {
                    new_BeforeArr.push(BeforeArr[i]);
                    Before_index++;
                }
            } else {
                break;
            }

        }

        let new_AftertArr = [];
        let Aftert_index = 0;
        for (let i = 0; i < AftertArr.length; i++) {
            // 序号不能断，状态不能断 
            if (Aftert_index === i && AftertArr[i][feildName] === row[feildName]) {
                if (isSingleEdit) {
                    if (AftertArr[i]['__state__'] === 'new' || AftertArr[i]['__state__'] === 'edit') {
                        Aftert_index = -1;
                    } else {
                        new_AftertArr.push(AftertArr[i]);
                        Aftert_index++;
                    }

                } else {
                    new_AftertArr.push(AftertArr[i]);
                    Aftert_index++;
                }
            } else {
                break;
            }

        }

        if (isSingleEdit) {
            if (OwnArr[0]['__state__'] === 'new' || OwnArr[0]['__state__'] === 'edit') {
                new_BeforeArr = [];
                new_AftertArr = [];
            }

        }

        //3 合并数组，返回

        let back_data = [];
        back_data = [...new_BeforeArr.reverse(), ...OwnArr, ...new_AftertArr];

        return back_data;

    }


    public transferValue(option?) {
        console.log('将接受传递的值', this.tempValue);
    }


    is_hidden=false;
    hiddentrue(){
        this.is_hidden =!this.is_hidden;
    }

    public downFile(option?){

        if(!option || !option.ajaxConfig){
            return true;
        }

        const url = option.ajaxConfig.url;
        let params;
        const ajaxParams = option.ajaxConfig.params ? option.ajaxConfig.params : []
        params = this.buildParameters(ajaxParams, option.data.originData ? option.data.originData : option.data);

        let url_content ='';

        for(let _params in params){
            url_content=url_content+  _params+'='+params[_params]+'&&';
        }
        if(url_content.length>0){
            url_content =url_content.substr(0, url_content.length - 2);
        }

        let downUrl=`${this._url}${url}?${url_content}`
        window.open(`${downUrl}`);
       

    }


    //=========================测试解析页面结构============================
    nodes=[];
    public executeAnalysisLayout(option?){

        let pageJson:any;
        let page_id:any;
        // PAGE_JSON
        if(this.ROW_SELECTED){
            if(this.ROW_SELECTED['PAGE_JSON']){
                pageJson=JSON.parse(this.ROW_SELECTED['PAGE_JSON']);
                page_id = this.ROW_SELECTED['ID']
            }
        }
    
        console.log('当前选中行',this.ROW_SELECTED);
        if(pageJson){
            let f = new PageStructure();
            f.page_id=page_id;
            f.page_config = pageJson;
            f.getPageStructure();
            this.nodes = f.nodes;
            this.ROW_SELECTED['analysisLayout'] = JSON.stringify (f.ts_new);
        } else {
            this.nodes=[];
        }

        if(option){
            this.executeCurrentRow(option);
        }
        return true;

    }



  



}