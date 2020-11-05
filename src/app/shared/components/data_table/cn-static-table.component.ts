import { CfgLayoutPageComponent } from '../../config-components/config-layout-page/cfg-layout-page/cfg-layout-page.component';
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
import { group } from 'console';
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
    selector: 'cn-static-table,[cn-static-table]',
    templateUrl: './cn-static-table.component.html',
    styleUrls: [`cn-static-table.component.less`]
})
export class CnStaticTableComponent extends CnComponentBase
    implements OnInit, AfterViewInit, OnDestroy {

    @Input()
    public config: any;
    @Input() initData;
    @Input() tempData;
    @Input() changeValue: any;
    @Input()
    public permissions = [];
    @Input()
    public dataList = [];
    @Output() public updateValue = new EventEmitter();
    /**
     * 组件名称
     * 所有组件实现此属性 
     */
    public COMPONENT_NAME = "CnStaticTable";
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


    public readonly = false;

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
    public _dataList = [];

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
    public staticTableSummary = {};

    private _ajaxConfigObj: any = {};
    constructor(
        @Inject(BSN_COMPONENT_SERVICES)
        public componentService: ComponentServiceProvider
    ) {
        super(componentService);
        this.cacheValue = this.componentService.cacheService;

        // init cacheValue
    }

    public ngOnInit() {
        console.log('-----------stattic_table------------', this.config);
        this.setChangeValue(this.changeValue);
        // 设置数据操作主键
        this.KEY_ID = this.config.keyId ? this.config.keyId : 'id';

        // 初始化默认分页大小
        this.config.pageSize && (this.pageSize = this.config.pageSize);

        this.config.ajaxConfig.forEach(ajax => {
            this._ajaxConfigObj[ajax.id] = ajax;
        });

        // 构建表格列及列标题
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



    public addBtnClick(event?) {
        console.log('addBtnClick', event);
        if (event) {
            if (event.code === 'Enter') {
                return false;
            }
        }
        this.addRow();
        this.updateValue.emit(this.getAddedNewRowsData());
    }

    public getAddedNewRowsData() {
        //  return this.ROWS_ADDED;
        return [...this.ROWS_ADDED, ...this.ROWS_EDITED];

    }

    public loadStaticData(data) {
        this._initComponentData();
        let _index = 0;
        if (this.pageIndex === 1) {
            _index = _index;
        } else {
            _index = (this.pageIndex - 1) * this.pageSize;
        }
        if (data && Array.isArray(data) && data.length > 0) {
            data.map((d, index) => {
                _index = _index + 1;
                d['_index'] = _index;
                if (d['$state$'] === 'insert') {
                    this.mapOfDataState[d[this.KEY_ID]] = {
                        disabled: false,
                        checked: false, // index === 0 ? true : false,
                        selected: false, // index === 0 ? true : false,
                        state: 'new',
                        data: d,
                        originData: { ...d },
                        validation: true,
                        actions: this.getRowActions('new'),
                        mergeData: {}
                    };
                } else if (d['$state$'] === 'text') {
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

                } else {
                    d['$state$'] = "update";
                    this.mapOfDataState[d[this.KEY_ID]] = {
                        disabled: false,
                        checked: false, // index === 0 ? true : false,
                        selected: false, // index === 0 ? true : false,
                        state: 'edit',
                        data: d,
                        originData: { ...d },
                        validation: true,
                        actions: this.getRowActions('edit'),
                        mergeData: {}
                    };
                }

                if (!this.config.isSelected) {
                    index === 0 && (this.ROW_SELECTED = d);
                } else {
                    if (d[this.KEY_ID] === this.selectedRowValue) {
                        this.ROW_SELECTED = d
                    }
                }

                // formCascade
                this.formCascade[d[this.KEY_ID]] = {};

                for (const v in d) {
                    if (d.hasOwnProperty(v)) {
                        const rItem = { id: d[this.KEY_ID], name: v, value: d[v] };
                        this.columnSummary(rItem);
                    }

                }

            });
            setTimeout(() => {
                this._dataList = data;
                this.dataList = this._dataList.filter(item => item['state'] !== 'delete');
            })
            this.ROWS_EDITED = [...data];
            this.total = data.length;


            // 更新
            // this.dataCheckedStatusChange();
            // 默认设置选中第一行, 初始数据的选中状态和选中数据,均通过setSelectRow方法内实现
            // this.dataList.length > 0 && this.setSelectRow(this.ROW_SELECTED);

            this.setSelectRow(this.ROW_SELECTED);
            this.isLoading = false;
        }
        this.dataList = data;
        this.L_columnSummary();
        // console.log('计算统计值',this.tempValue,this.dataList);

    }




    // #region state Liu 扫码的后续响应
    //  liu 判断数据存在不
    //  数据列值计算
    //  选中数据（注意页的切换） locateRow
    //  静态数据的添加 构成（当前只以传入为主，位置自定义，前后）定位到数据所在的页
    // liu 扫码加载
    public scanCodeLoad() {
        // const index = this.dataList.findIndex(item => item[code] === codeValue);
        const index = this.dataList.length - 1;
        if (index !== -1) {
            // const rowValue = this.loadData.rows[index]['key'];
            this.pageIndex = Math.ceil((index + 1) / this.pageSize);
            //  this.load();
            //  this.scanCodeSetSelectRow(rowValue);
            // 如果有操作，再选中行后执行
        } else {
            console.log('当前扫码未能匹配到数据！');
        }

    }

    // 是否存在当前行数据
    public custom_exist(option?, structureConfig?) {

        const newconfig = {
            custom: [   // 组件自定义行为，只进一组参数【】，然后根据参数做业务处理，参数里需要【响应方法名称】
                {
                    "id": "001",
                    "name": "addRow",
                    "content": [  // 内容，来决定执行步骤顺序
                        {
                            type: "条件、执行",
                            children: [
                                {
                                    type: 'exec',
                                    content: [

                                    ]
                                }

                            ]
                        }
                    ],
                    "addRow": {  // 行为内容

                    }
                }
            ]
        };

        let addRowMapping;

        let row_data = {};
        if (structureConfig && structureConfig.hasOwnProperty('structure') && structureConfig['structure']) {
            addRowMapping = structureConfig['structure'];
        }

        if (addRowMapping) {
            addRowMapping.forEach(add_row => {

                let value;
                if (add_row['type'] === 'tempValue') {
                    value = this.tempValue[add_row['valueName']];
                } else if (add_row['type'] === 'tempValue') {
                    value = this.initValue[add_row['valueName']];
                } else if (add_row['type'] === 'value') {
                    value = add_row['value'];
                } else if (add_row['type'] === 'item') {
                    value = option[add_row['valueName']];
                }
                row_data[add_row['name']] = value;
            })
        } else {
            row_data = {};
        }

        let back_dataList = this.dataList.filter(item => {
            let back = true;
            for (let key in row_data) {
                // console.log(key + '---' + row_data[key]);
                if (row_data[key] !== item[key]) {
                    back = false;
                }
            }
            return back;
        });

        if (back_dataList && back_dataList.length > 0) {
            // return true;
            return { result: true, data: back_dataList[0] };
        } else {
            //return false;
            return { result: false, data: null };
        }
    }

    // 前置条件成组出现，当满足某条件后有响应

    /**
     * 行定位 , 定位只当前页面，当前数据选中状态，后续操作，执行事件，或者运算
     */
    public scanCode_locateRow() {
        // 定义映射字段，哪些字段相等则条件满足
        // 条件定义  A > B  结构如下 取名：  regular  rule
        const rule =
        {
            condition: [
                {
                    type: "symbol",
                    valueName: ">",  // 目前支持  && 、||、  >、 <、 >=、 <=、  ===、  !==、  isnull    /
                    children: [
                        {
                            type: "value",
                            valueName: "A"
                        },
                        {
                            type: "value",
                            valueName: "B"
                        }
                    ]
                }
            ],
            data: {                                    // 设置级联参数
                option: [
                    {
                        "name": "A",
                        "type": "rowValue",  // 表格行内 多一个类型 rowValue 当前行数据，表单内是当前表单数据
                        "valueName": "name"
                    },
                    {
                        "name": "B",
                        "type": "rowValue",  // 表格行内 多一个类型 rowValue
                        "valueName": "name"
                    }
                ]
            }
        };


        // 根据条件计算出是否有记录满足

        // 根据记录定位到当前行
        this.setSelectRow(this.ROW_SELECTED);

    }


    public custom_add(option?, structureConfig?) {

        let addRowMapping;

        let row_data = {};
        if (structureConfig && structureConfig.hasOwnProperty('structure') && structureConfig['structure']) {
            addRowMapping = structureConfig['structure'];
        }

        if (addRowMapping) {
            addRowMapping.forEach(add_row => {

                let value;
                if (add_row['type'] === 'tempValue') {
                    value = this.tempValue[add_row['valueName']];
                } else if (add_row['type'] === 'tempValue') {
                    value = this.initValue[add_row['valueName']];
                } else if (add_row['type'] === 'value') {
                    value = add_row['value'];
                } else if (add_row['type'] === 'item') {
                    value = option[add_row['valueName']];
                }
                row_data[add_row['name']] = value;
            })
        } else {
            row_data = option;
        }


        // 将数据处理合并为当前新增行数据,并选中当前数据

        // 创建空数据对象
        let newId = CommonUtils.uuID(32);

        // 存在主键，则
        if (row_data[this.KEY_ID]) {
            newId = row_data[this.KEY_ID];
        }
        let newData = this.createNewRowData();
        newData[this.KEY_ID] = newId;
        // 数据合并
        newData = { ...newData, ...row_data };

        // 新增数据加入原始列表,才能够动态新增一行编辑数据
        this.dataList = [...this.dataList, newData];
        this.total = this.dataList.length;

        // 组装状态数据
        this.mapOfDataState[newId] = {
            data: newData,
            originData: { ...newData },
            disabled: false,
            checked: true, // index === 0 ? true : false,
            selected: false, // index === 0 ? true : false,
            state: 'new',
            actions: this.getRowActions('new'),
            validation: true,
            mergeData: {}
        }


        // formCascade
        setTimeout(() => {
            this.formCascade[newId] = {};
        });



        this.ROWS_ADDED = [newData, ...this.ROWS_ADDED];
        this.scanCodeLoad();
        this.L_columnSummary();
        this.updateValue_dataList('custom_add'); // 将数据回写
        // return true;

        return { result: true, data: newData };

        console.log('+++++++++++新增行后的数据+++++++++++', this.dataList, this.mapOfDataState);
        // 更新状态
    }
    public custom_update(option?, structureConfig?, backData?) {

        let addRowMapping;

        let row_data = {};
        if (structureConfig && structureConfig.hasOwnProperty('structure') && structureConfig['structure']) {
            addRowMapping = structureConfig['structure'];
        }

        if (addRowMapping) {
            addRowMapping.forEach(add_row => {

                let value;
                if (add_row['type'] === 'tempValue') {
                    value = this.tempValue[add_row['valueName']];
                } else if (add_row['type'] === 'tempValue') {
                    value = this.initValue[add_row['valueName']];
                } else if (add_row['type'] === 'value') {
                    value = add_row['value'];
                } else if (add_row['type'] === 'item') {
                    value = option[add_row['valueName']];
                }
                row_data[add_row['name']] = value;
            })
        } else {
            row_data = option;
        }


        // 将数据处理合并为当前新增行数据,并选中当前数据

        // 创建空数据对象
        let newId = CommonUtils.uuID(32);
        let newData = {};

        if (backData && addRowMapping) {

            newId = backData[this.KEY_ID];

            addRowMapping.forEach(add_row => {

                let value;
                if (add_row['type'] === 'tempValue') {
                    value = this.tempValue[add_row['valueName']];
                } else if (add_row['type'] === 'tempValue') {
                    value = this.initValue[add_row['valueName']];
                } else if (add_row['type'] === 'value') {
                    value = add_row['value'];
                } else if (add_row['type'] === 'item') {
                    value = option[add_row['valueName']];
                }

                // "symbol":"plus", // plus\reduce\ride\except\cover 计算类型
                if (add_row['symbol'] === 'plus') {

                    this.mapOfDataState[newId]['data'][add_row['name']] = parseFloat((this.mapOfDataState[newId]['data'][add_row['name']] + value).toFixed(10));
                    // this.mapOfDataState[newId]['originData'][add_row['name']] = parseFloat(( this.mapOfDataState[newId]['data'][add_row['name']] + value).toFixed(10));
                    // this.mapOfDataState[newId]['data'][add_row['name']] + value;
                    if (!this.formCascade[newId][add_row['name']]) {
                        this.formCascade[newId][add_row['name']] = {};
                    }
                    //  this.formCascade[newId][add_row['name']]['setValue'] = { value:  this.mapOfDataState[newId]['data'][add_row['name']] };
                    //  this.formCascade[newId][add_row['name']]['exec']= 'setValue';
                    //  this.formCascade[newId][add_row['name']] = JSON.parse(JSON.stringify(this.formCascade[newId][add_row['name']]));

                }
                if (add_row['symbol'] === 'reduce') {
                    this.mapOfDataState[newId]['data'][add_row['name']] = this.mapOfDataState[newId]['data'][add_row['name']] - value;
                }
                if (add_row['symbol'] === 'cover') {
                    this.mapOfDataState[newId]['data'][add_row['name']] = value;
                }

            })

            if (newId) {
                if (!this.formCascade[newId]) {
                    this.formCascade[newId] = {};
                }
            }
            newData = this.mapOfDataState[newId]['data'];
            //const dd = JSON.parse(JSON.stringify(this.dataList));

            let new_index = this.dataList.findIndex(item => item[this.KEY_ID] === newData[this.KEY_ID]);
            if (new_index > -1) {
                this.dataList[new_index] = newData;
            }
            this.dataList = JSON.parse(JSON.stringify(this.dataList));
            this.L_columnSummary();
            // this.dataList = this.dataList.filter(d => d[this.KEY_ID] !== '');
            // setTimeout(() => {
            //     this.dataList = dd;
            // });

            console.log('+++++++++++修改行后的数据+++++++++++', this.dataList, this.mapOfDataState);

            return { result: true, data: newData };
        } else {
            return { result: false, data: newData };
        }

        // return true;

        console.log('+++++++++++修改行后的数据+++++++++++', this.dataList, this.mapOfDataState);
        // 更新状态
    }

    // 组件内自定义操作
    public component_customAction(option?) {

        let customAction_Id = option['customActionId'];
        let customAction_data = option;

        let _customAction_list;
        _customAction_list = this.config['customAction'].filter(item => item['id'] === customAction_Id);
        if (_customAction_list && _customAction_list.length > 0) {
            let _customAction = _customAction_list[0];
            this.execute_component_customAction(_customAction, _customAction['defineStructure'], customAction_data);
        }

        return true;

    }

    public execute_component_customAction(customAction?, defineStructure?, data?, backData?) {

        console.log('execute_component_customAction', customAction, data);
        customAction.execute.forEach(item => {
            if (item.type === 'relation') {
                new RelationResolver(this)
                    .resolveInnerSender(
                        item.sender,
                        {},
                        Array.isArray({})
                    );
            } else if (item.type === 'action') {
                let result = false;
                let resultObj;
                let resultData;
                let actionType = item['content']['actionType'];
                let structureId = item['content']['structureId'];
                let structure;
                if (structureId && defineStructure && defineStructure.length > 0) {
                    let structureList = defineStructure.filter(structureItem => structureItem['id'] === structureId);
                    if (structureList && structureList.length > 0) {
                        structure = structureList[0];
                    }
                }
                switch (actionType) {
                    case 'custom_exist':
                        resultObj = this.custom_exist(data, structure);
                        break;
                    case 'custom_add':
                        resultObj = this.custom_add(data, structure);
                        break;
                    case 'custom_locate':
                        break;
                    case 'custom_update':
                        resultObj = this.custom_update(data, structure, backData);
                        break;

                }

                if (resultObj) {
                    result = resultObj['result'];
                    resultData = resultObj['data'];
                }


                if (item['result']) {
                    let resultAction;
                    let resultActionList;

                    if (result) {
                        resultActionList = item['result'].filter(resultItem => resultItem['resultName'] === 'success');
                    } else {
                        resultActionList = item['result'].filter(resultItem => resultItem['resultName'] === 'failed');
                    }
                    if (resultActionList && resultActionList.length > 0) {
                        resultAction = resultActionList[0];
                        this.execute_component_customAction(resultAction, defineStructure, data, resultData);
                    }
                }


            }

        });

        return true;


    }






    // #endregion

    public load() {
        this.isLoading = true;
        const url = this.config.loadingConfig.url;
        const method = this.config.loadingConfig.method;
        const params = {
            ...this.buildParameters(this.config.loadingConfig.params),
            ...this._buildPaging(),
            // ...this._buildFilter(this.config.ajaxConfig.filter),
            ...this._buildSort(),
            // ...this._buildColumnFilter(),
            // ...this._buildFocusId(),
            // ...this._buildSearch()
        };

        this.componentService.apiService.getRequest(url, method, { params }).subscribe(response => {
            if (response && response.data && response.data.resultDatas) {
                this._initComponentData();
                response.data.resultDatas.map((d, index) => {
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

    public loadRefreshData(Option) {
        this.isLoading = true;
        const url = this.config.loadingConfig.url;
        const method = this.config.loadingConfig.method;
        // 返回结果解析id参数,构建ids
        const param1: any = {};
        if (Option && Array.isArray(Option)) {
            const rids = [];
            Option.map(opt => {
                rids.push(opt[this.KEY_ID]);
            })
            param1['id'] = `in(${rids.join(',')})`;
        } else if (Option) {
            param1['id'] = `in(${Option[this.KEY_ID]})`
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
        // 创建数据原型,并且初始化对象状态为 new;
        const newData = { "$state$": "insert" };
        this.config.columns.filter(c => c.type !== 'action').map(col => {
            if (col.type === 'index') {
                newData[col.field] = this.dataList.length + 1;
            } else {
                newData[col.field] = null
            }

        });
        return newData;
    }

    public addRow() {
        // 创建空数据对象
        const newId = CommonUtils.uuID(32);
        const newData = this.createNewRowData();
        newData[this.KEY_ID] = newId;

        // 新增数据加入原始列表,才能够动态新增一行编辑数据
        this.dataList = [...this.dataList, newData];
        this.total = this.dataList.length;

        // 组装状态数据
        this.mapOfDataState[newId] = {
            data: newData,
            originData: { ...newData },
            disabled: false,
            checked: true, // index === 0 ? true : false,
            selected: false, // index === 0 ? true : false,
            state: 'new',
            actions: this.getRowActions('new'),
            validation: true,
            mergeData: {}
        }


        // formCascade
        setTimeout(() => {
            this.formCascade[newId] = {};
        });



        this.ROWS_ADDED = [newData, ...this.ROWS_ADDED];
        this.scanCodeLoad();

        console.log('+++++++++++新增行后的数据+++++++++++', this.dataList, this.mapOfDataState);
        // 更新状态
    }

    private removeEditRow(item) {

        this.dataList.find(d => d[this.KEY_ID] === item[this.KEY_ID])['$state$'] = "delete";
        const rItem: any = this.ROWS_EDITED.find(r => r[this.KEY_ID] === item[this.KEY_ID]);
        if (rItem) {
            rItem.data['$state$'] = "delete";
            rItem['state'] = "delete";
        }
        // this.dataList = this.dataList.filter(r => r[this.KEY_ID] !== item[this.KEY_ID]);
        // this.ROWS_EDITED = this.ROWS_EDITED.filter(r => r[this.KEY_ID] !== item[this.KEY_ID]);
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

        for (const v in item) {
            if (item.hasOwnProperty(v)) {
                const rItem = { id: item[this.KEY_ID], name: v, value: item[v] };
                this.columnSummary(rItem);
            }

        }

        // 200512 重新计算数据总数
        // 
        if (this.mapOfDataState.hasOwnProperty(item[this.KEY_ID])) {
            delete this.mapOfDataState[item[this.KEY_ID]];
        }

        this.total = this.dataList.length;
        this.L_columnSummary();
        this.updateValue_dataList('removeNewRow');
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
                // this.ROWS_EDITED = this.ROWS_EDITED.filter(r => r[this.KEY_ID] !== itemId);

                // // 静态数据,取消编辑时,同时删除列表数据
                // this.dataList = this.dataList.filter(r => r[this.KEY_ID] !== itemId);

                const dl = this.dataList.find(d => d[this.KEY_ID] === itemId);
                if (dl) {
                    dl['$state$'] = "delete";
                }
                const rItem: any = this.ROWS_EDITED.find(r => r[this.KEY_ID] === itemId);
                if (rItem) {
                    rItem['$state$'] = "delete";
                    // rItem['state'] = "delete";
                }

                // liu 200512 删除数据
                this.dataList = this.dataList.filter(r => r[this.KEY_ID] !== itemId);
                this.total = this.dataList.length;
            }
        }

        this.L_columnSummary();
        this.updateValue_dataList('cancelEditRow');
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
                    this.mapOfDataState[opt[this.KEY_ID]]['actions'] = [...this.config.rowActions.filter(action => action.state === 'text')];
                    const trigger = new ButtonOperationResolver(this.componentService, this.config, this.mapOfDataState[opt[this.KEY_ID]]);
                    trigger.sendBtnMessage({}, { triggerType: BSN_TRIGGER_TYPE.STATE, trigger: BSN_DATAGRID_TRIGGER.CANCEL_EDIT_ROW }, this.config.id);
                }
            })
        } else if (option) {
            // this.mapOfDataState[option[this.KEY_ID]].state = 'text';
            this.ROWS_ADDED = this.ROWS_ADDED.filter(r => r[this.KEY_ID] !== option[this.KEY_ID]);
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
        if (this.dataList.length > 0) {
            this.dataList.map(row => {
                this.mapOfDataState[row[this.KEY_ID]]['selected'] = false;
            });

            if (rowData[this.KEY_ID] && rowData[this.KEY_ID].length > 0) {
                this.mapOfDataState[rowData[this.KEY_ID]]['selected'] = true;
            }


            // 勾选/取消当前行勾选状态
            this.mapOfDataState[rowData[this.KEY_ID]]['checked'] = !this.mapOfDataState[rowData[this.KEY_ID]]['checked'];
            this.dataCheckedStatusChange();
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
                currentRow:this.ROW_CURRENT

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
                returnValue: data,
                currentRow:this.ROW_CURRENT

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
                    returnValue: d,
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
            cacheValue: this.cacheValue
        });
    }



    public executeCheckedRows() {
        console.log(this.config.id + '-------------executeCheckedRows');
    }

    public async executeCheckedRowsIds(option) {
        console.log(this.config.id + '-------------executeCheckedRowsIds', option);
        const ajaxParams = option.ajaxConfig.params ? option.ajaxConfig.params : []
        const paramData = this._createCheckedRowsIdParameter(ajaxParams);
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
        this.confirm(option.dialog, () => { this.executeCheckedRows() })
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
            nzWidth: dialogCfg.width ? dialogCfg.width : '600px',
            nzStyle: dialogCfg.style ? dialogCfg.style : null, // style{top:'1px'},
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


    //#endregion

    /**
     * 
     * @param actionCfg 当前操作按钮的配置
     * @param rowData 当前数据行
     * @param $event 
     */
    rowAction(actionCfg, rowData, $event?) {
        const dataOfState = this.mapOfDataState[rowData[this.KEY_ID]];
        this.ROW_CURRENT = dataOfState;
        $event && $event.stopPropagation();
        const trigger = new ButtonOperationResolver(this.componentService, this.config, dataOfState);
        trigger.toolbarAction(actionCfg, this.config.id);
        $event && $event.preventDefault();
    }

    getRowActions(state): any[] {
        const orginAction = this.tableColumns.find(c => c.type === 'action');
        const copyAction = [];
        if (orginAction) {
            const actions = JSON.parse(JSON.stringify(this.tableColumns.find(c => c.type === 'action').action.filter(c => {

                const isHideen = this.Actions_toggle(c, state);
                return isHideen;
            })));
            copyAction.push(...actions);
        }
        return copyAction;
    }

    Actions_toggle(btn?, state?) {
        if (btn.toggle && btn.toggle.type) {
            switch (btn.toggle.type) {
                case 'state':
                    if (btn.toggle.values) {
                        const valueObj = btn.toggle.values.find(val => val.name === state);
                        if (valueObj)
                            return !valueObj.value
                    }

                    break;
                case '...':
                    break;
            }
        }
        return false;
    }


    formCascade = {};
    /**
     * 
     * @param v {id, name, value, count}
     */
    public valueChange(v?) {
        console.log('行返回', v, this._dataList, this.mapOfDataState);
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
                                if (item.caseValue.type === 'value') {
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
                                this.mapOfDataState[v.id]['data'][cascadeObj.cascadeName] = __setValue;
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
        this.columnSummary(v);

        this.updateValue_dataList('feild');
    }

    // liu 200512 计算出反馈数据（以及序号变化后更改序号）
    public updateValue_dataList(type?) {
        if (type !== 'feild') {
            this.dataList.forEach((item, index) => {
                // item['_index'] = index+1;
                this.mapOfDataState[item[this.KEY_ID]]['data']['_index'] = index + 1;
                this.mapOfDataState[item[this.KEY_ID]]['originData']['_index'] = index + 1;
            });
            this.dataList = this.dataList.filter(item => item['state'] !== 'delete');
        }
        const list = [];
        // tslint:disable-next-line:forin
        for (const mv in this.mapOfDataState) {
            list.push(this.mapOfDataState[mv]['data']);
        }
        this._dataList = list;
        console.log('序号变化', this.dataList, this.mapOfDataState);
        this.updateValue.emit(list);
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


    public L_columnSummary() {
        this.tableColumns.forEach(col => {
            if (col.field && col.summary) {
                switch (col.summary.type) {
                    case 'sum':
                        this.tempValue[col.summary.name] = this.colSum(col.field);
                        this.staticTableSummary[col.summary.name] = this.tempValue[col.summary.name];
                        break;
                    case 'avg':
                        this.tempValue[col.summary.name] = this.colAvg(col.field).toFixed(col.summary.fixed ? col.summary.fixed : 2);
                        this.staticTableSummary[col.summary.name] = this.tempValue[col.summary.name];
                        break;
                    case 'max':
                        this.tempValue[col.summary.name] = this.colMax(col.field);
                        this.staticTableSummary[col.summary.name] = this.tempValue[col.summary.name];
                        break;
                    case 'min':
                        this.tempValue[col.summary.name] = this.colMin(col.field);
                        this.staticTableSummary[col.summary.name] = this.tempValue[col.summary.name];
                        break;
                }
            }
        });
    }


    public columnSummary(value) {
        this.tableColumns.forEach(col => {
            if (value.name === col.field && col.summary) {
                switch (col.summary.type) {
                    case 'sum':
                        this.tempValue[col.summary.name] = this.colSum(value.name);
                        this.staticTableSummary[col.summary.name] = this.tempValue[col.summary.name];
                        break;
                    case 'join':
                        this.tempValue[col.summary.name] = this.colJoin(value.name);
                        this.staticTableSummary[col.summary.name] = this.tempValue[col.summary.name];
                        break;
                    case 'avg':
                        this.tempValue[col.summary.name] = this.colAvg(value.name).toFixed(col.summary.fixed ? col.summary.fixed : 2);
                        this.staticTableSummary[col.summary.name] = this.tempValue[col.summary.name];
                        break;
                    case 'max':
                        this.tempValue[col.summary.name] = this.colMax(value.name);
                        this.staticTableSummary[col.summary.name] = this.tempValue[col.summary.name];
                        break;
                    case 'min':
                        this.tempValue[col.summary.name] = this.colMin(value.name);
                        this.staticTableSummary[col.summary.name] = this.tempValue[col.summary.name];
                        break;
                }
            }
        });
    }

    private colSum(colName) {
        let sum = 0;
        this.dataList.forEach(d => {
            if (d['$state$'] !== "delete")
                if (d[colName]) {
                    const val = d[colName];
                    //  sum = sum + Number(val);
                    sum = parseFloat((sum + Number(val)).toFixed(10));
                }
        })
        return sum;
    }

    private colJoin(colName) {
        let sum = "";
        // this.dataList.forEach(d => {
        //     if (d['$state$'] !== "delete")
        //         if (d[colName]) {
        //             const val = d[colName];
        //             //  sum = sum + Number(val);
        //             sum = sum + val + ',';
        //         }
        // })
        let n = 0;
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < this.dataList.length; i++) {
            if (this.dataList[i]['$state$'] !== "delete")
                if (this.dataList[i][colName]) {
                    const val = this.dataList[i][colName];
                    //  sum = sum + Number(val);
                    sum = sum + val + ',';
                    n++;
                }
        }
        if (n > 0 && sum.length > 0) {
            sum = sum.substring(0, sum.length - 1);
        }

        return sum;
    }

    private colAvg(colName) {
        let sum = 0;
        if (this.dataList.length > 0) {
            this.dataList.forEach(d => {
                if (d[colName]) {
                    const val = d[colName];
                    // sum = sum + Number(val);
                    sum = parseFloat((sum + Number(val)).toFixed(10));
                }
            });
            return Number(parseFloat((sum / this.dataList.length).toFixed(10)));
        } else {
            sum = 0;
            return sum;
        }
    }

    private colMax(colName) {

    }

    private colMin(colName) {

    }

    /**
     * setChangeValue 接受 初始变量值
     */
    public setChangeValue(ChangeValues?) {
        console.log('statictable____changeValue', ChangeValues);
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
     * 可定义多组行合并，关键信息：合并列名称、合并规则、合并数据、合并数据序列
     * 列头的扩展列，和内容列的隐藏显示，不能是相同字段
     * 考虑多组合并
     */

    rowConfig = [
        {
            colName: 'tel',
            groupName: 'groupid',  // 分组标识
            groupOrder: 1, //  按照数据计算出的当前分组信息 ？
            showValue: '', // 固定字段值，其他  暂时先不处理 默认按照第一列处理
            groupCols: [   // 当前合并条件， 可多条件分组
                {
                    groupColName: 'groupid',  // 被合并列
                }
            ]

        }
    ];

    colConfig = [
        {
            colName: 'tel',
            // 在特定条件下合并 例如 类型= 1 
            mergeItems: [  // 满足当前条件下的合并
                {
                    "type": "condition",              //    -- 数据是否条件级联, 默认default 、condition（启用条件级联）
                    "caseValue": {                     // -- 级联数据取值设置
                        "type": "rowValue", //--设置取值类型
                        "valueName": "id",   // --取值属性名称
                        "regular": "^003$",
                        "value": ""
                    },
                    condition: [

                    ],  //条件
                    mergeCols: [
                        {
                            mergeColName: 'tel',  // 被合并列
                        },
                        {
                            mergeColName: 'phone',  // 被合并列
                        }
                    ]

                }
            ]
        }
    ];



    listOfData = [
        {
            id: '001',
            name: '001',
            age: '18',
            tel: '3kg',
            phone: '1.6kg',
            groupid: '001',
            groupNum: 2,
            groupIndex: 1,  // 通过计算得出
            colgroupIndex: 1,
            colgroupNum: 1
        },
        {
            id: '002',
            name: '002',
            age: '20',
            tel: '3333',
            phone: '1.4kg',
            groupid: '001',
            groupNum: 2,
            groupIndex: 2,  // 通过计算得出
            colgroupIndex: 1,
            colgroupNum: 1
        },
        {
            id: '003',
            name: '003',
            age: '20',
            tel: '5kg',
            phone: '187000',
            groupid: '002',
            groupNum: 1,
            groupIndex: 1,  // 通过计算得出
            colgroupIndex: 1,
            colgroupNum: 2
        },
        {
            id: '004',
            name: '004',
            age: '20',
            tel: '2kg',
            phone: '1kg',
            groupid: '003',
            groupNum: 1,
            groupIndex: 1,  // 通过计算得出
            colgroupIndex: 1,
            colgroupNum: 1
        }
    ];


    // groupIndex 是当前数据排序，groupNum 是当前数据分组数量，主要是为处理分页后 分组断开数据处理
    mapd = {
        '001': {
            id: {

            },
            tel: {
                groupNum: 2,
                groupIndex: 1,  // 通过计算得出
                colgroupIndex: 1,
                colgroupNum: 1
            },
            phone: {
                groupNum: 1,
                groupIndex: 1,  // 通过计算得出
                colgroupIndex: 1,
                colgroupNum: 1
            },
        },
        '002': {
            id: {

            },
            tel: {
                groupNum: 2,
                groupIndex: 2,  // 通过计算得出
                colgroupIndex: 1,
                colgroupNum: 1
            },
            phone: {
                groupNum: 1,
                groupIndex: 1,  // 通过计算得出
                colgroupIndex: 1,
                colgroupNum: 1
            },
        },
        '003': {
            id: {

            },
            tel: {
                groupNum: 1,
                groupIndex: 1,  // 通过计算得出
                colgroupIndex: 1,
                colgroupNum: 2
            },
            phone: {
                groupNum: 1,
                groupIndex: 1,  // 通过计算得出
                colgroupIndex: 2,
                colgroupNum: 1
            },
        },
        '004': {
            id: {

            },
            tel: {
                groupNum: 1,
                groupIndex: 1,  // 通过计算得出
                colgroupIndex: 1,
                colgroupNum: 1
            },
            phone: {
                groupNum: 1,
                groupIndex: 1,  // 通过计算得出
                colgroupIndex: 1,
                colgroupNum: 1
            },
        }
    }

    mapd1 = {
        '001': {
            id: {

            },
            tel: {
                groupNum: 1,
                groupIndex: 1,  // 通过计算得出
                colgroupIndex: 1,
                colgroupNum: 1
            },
            phone: {
                groupNum: 1,
                groupIndex: 1,  // 通过计算得出
                colgroupIndex: 1,
                colgroupNum: 1
            },
        },
        '002': {
            id: {

            },
            tel: {
                groupNum: 1,
                groupIndex: 1,  // 通过计算得出
                colgroupIndex: 1,
                colgroupNum: 1
            },
            phone: {
                groupNum: 1,
                groupIndex: 1,  // 通过计算得出
                colgroupIndex: 1,
                colgroupNum: 1
            },
        },
        '003': {
            id: {

            },
            tel: {
                groupNum: 1,
                groupIndex: 1,  // 通过计算得出
                colgroupIndex: 1,
                colgroupNum: 1
            },
            phone: {
                groupNum: 1,
                groupIndex: 1,  // 通过计算得出
                colgroupIndex: 1,
                colgroupNum: 1
            },
        },
        '004': {
            id: {

            },
            tel: {
                groupNum: 1,
                groupIndex: 1,  // 通过计算得出
                colgroupIndex: 1,
                colgroupNum: 1
            },
            phone: {
                groupNum: 1,
                groupIndex: 1,  // 通过计算得出
                colgroupIndex: 1,
                colgroupNum: 1
            },
        }
    }



    public createMapd() {

        // 生成group字段

        var grouparry = {};
        // 生成行信息
        this.rowConfig.forEach(r_c => {
            if (r_c.colName) {
                if (!grouparry[r_c.colName]) {
                    grouparry[r_c.colName] = [];
                }

                this.listOfData.forEach(
                    row => {
                        this.mapd[row.id] = {}; // 初始化
                        const groupObj = grouparry[r_c.colName].find(groupvalue => row[r_c.groupName] === groupvalue);
                        if (!groupObj) {
                            grouparry[r_c.colName].push(row[r_c.groupName]);
                        }
                    }
                );

            }

        });


        // 按照 group 分组顺序进行  merge


        this.rowConfig.forEach(r_c => {


            this.listOfData.forEach(row => {

                if (!this.mapd[row.id][r_c.colName]) {
                    this.mapd[row.id][r_c.colName] = {};
                }
                let new_data = [...this.listOfData];
                r_c.groupCols.forEach(group_col => {

                    new_data = new_data.filter(d => d[group_col.groupColName] === row[group_col.groupColName]);
                });

                new_data = new_data.filter(d => d[r_c.groupName] === row[r_c.groupName]);
                let group_num = new_data.length;
                let group_index = new_data.findIndex(d => d['id'] === row['id']);
                this.mapd[row.id][r_c.colName]['groupNum'] = group_num;
                this.mapd[row.id][r_c.colName]['groupIndex'] = group_index + 1;
                this.mapd[row.id][r_c.colName]['colgroupIndex'] = 1;
                this.mapd[row.id][r_c.colName]['colgroupNum'] = 1;


            });

        }
        );



        this.listOfData.forEach(
            row => {
                // this.mapd[row.id]={}; // 初始化

                this.colConfig.forEach(col_c => {

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
                                if (!this.mapd[row.id][merge_col['mergeColName']]) {
                                    this.mapd[row.id][merge_col['mergeColName']] = {};
                                }
                                let group_index = item.mergeCols.findIndex(d => d['mergeColName'] === merge_col['mergeColName']);
                                this.mapd[row.id][merge_col['mergeColName']]['colgroupIndex'] = group_index + 1;
                                this.mapd[row.id][merge_col['mergeColName']]['colgroupNum'] = group_num;
                            });





                        }


                    });


                });



            }
        );


        console.log('生成分组信息', grouparry, this.mapd);

    }

    public createMapd1() {
        this.mapd = { ...this.mapd1 };
        console.log('恢复', this.mapd);
    }



    listOfData2 = [
        {
            id: '001',
            companyname: '博道1',
            type: 'a',
            shopname: 'mes',
            price: '12'
        },
        {
            id: '002',
            companyname: '博道',
            type: 'a',
            shopname: 'Imes',
            price: '13'
        },
        {
            id: '003',
            companyname: '博道',
            type: 'b',
            shopname: 'mes',
            price: '22'
        },
        {
            id: '004',
            companyname: '博道',
            type: 'b',
            shopname: 'Imes',
            price: '42'
        },
        {
            id: '005',
            companyname: '文博',
            type: 'a',
            shopname: 'mes',
            price: '17'
        },
        {
            id: '006',
            companyname: '文博',
            type: 'a',
            shopname: 'Imes',
            price: '18'
        },
        {
            id: '007',
            companyname: '文博',
            type: 'b',
            shopname: 'mes',
            price: '19'
        },
        {
            id: '008',
            companyname: '文博',
            type: 'b',
            shopname: 'Imes',
            price: '21'
        },
    ];




    mergeconfig = {
        rowConfig: [
            {
                colName: 'companyname',
                isEdit: '', // 是否编辑启用（编辑启用则不计算当前条件下的分组信息）   数据集合需要标识
                groupName: 'companyname',  // 分组标识
                groupOrder: 1, //  按照数据计算出的当前分组信息 ？
                showValue: '', // 固定字段值，其他  暂时先不处理 默认按照第一列处理
                groupCols: [   // 当前合并条件， 可多条件分组
                    {
                        groupColName: 'companyname',  // 被合并列
                    }
                ]

            },
            {
                colName: 'type',
                groupName: 'type',  // 分组标识
                groupOrder: 1, //  按照数据计算出的当前分组信息 ？
                showValue: '', // 固定字段值，其他  暂时先不处理 默认按照第一列处理
                groupCols: [   // 当前合并条件， 可多条件分组
                    {
                        groupColName: 'companyname',  // 被合并列
                    },
                    {
                        groupColName: 'type',  // 被合并列
                    }
                ]

            }
        ]
    };

    //  行内编辑下的行列合并
    // 行合并下当前数据是否启用编辑  难度？不好计算出当前合并数据的值 不能使用fitter

    // 当当前状态变为编辑状态时，计算行列合并等信息均从当前跨过（涉及列不启用编辑除外）


    mergetableEditor = {
        id: {   // 描述当前列的状态  ，要不要区分新增、编辑 状态下的区别

        }

    }


    mergetableColumns = [
        {
            field: 'id',
            title: '主键'
        },
        {
            field: 'companyname',
            title: '公司名称'
        },
        {
            field: 'type',
            title: '分类'
        },
        {
            field: 'shopname',
            title: '名称'
        },
        {
            field: 'price',
            title: '价格'
        }

    ];

    mergeData = {};
    mergeData1 = {
        '001': {},
        '002': {},
        '003': {},
        '004': {},
        '005': {},
        '006': {},
        '007': {},
        '008': {}
    };

    public _createMapd_new(mergeconfig?, listOfData?) {

        // 生成group字段

        const mergeData = {};

        listOfData.forEach(
            row => {
                mergeData[row.id] = {}; // 初始化
            }
        );


        // 按照 group 分组顺序进行  merge


        mergeconfig.rowConfig && mergeconfig.rowConfig.forEach(r_c => {


            listOfData.forEach(row => {

                if (!mergeData[row.id][r_c.colName]) {
                    mergeData[row.id][r_c.colName] = {};
                }
                let new_data = [...listOfData];
                r_c.groupCols.forEach(group_col => {

                    new_data = new_data.filter(d => d[group_col.groupColName] === row[group_col.groupColName]);
                });

                new_data = new_data.filter(d => d[r_c.groupName] === row[r_c.groupName]);
                let group_num = new_data.length;
                let group_index = new_data.findIndex(d => d['id'] === row['id']);
                mergeData[row.id][r_c.colName]['groupNum'] = group_num;
                mergeData[row.id][r_c.colName]['groupIndex'] = group_index + 1;
                mergeData[row.id][r_c.colName]['colgroupIndex'] = 1;
                mergeData[row.id][r_c.colName]['colgroupNum'] = 1;


            });

        }
        );



        mergeconfig.colConfig && this.listOfData.forEach(
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
                                if (!mergeData[row.id][merge_col['mergeColName']]) {
                                    mergeData[row.id][merge_col['mergeColName']] = {};
                                }
                                let group_index = item.mergeCols.findIndex(d => d['mergeColName'] === merge_col['mergeColName']);
                                mergeData[row.id][merge_col['mergeColName']]['colgroupIndex'] = group_index + 1;
                                mergeData[row.id][merge_col['mergeColName']]['colgroupNum'] = group_num;
                            });





                        }


                    });


                });



            }
        );


        console.log('new生成分组信息', mergeData);

        return mergeData;

    }

    createMapd_new() {
        this.mergeData = null;
        let new_data = this._createMapd_new(this.mergeconfig, this.listOfData2);
        this.mergeData = new_data;
    }
    createMapd1_new() {
        this.mergeData = { ...this.mergeData1 };
    }
    public transferValue(option?) {
        console.log('将接受传递的值');
    }


}