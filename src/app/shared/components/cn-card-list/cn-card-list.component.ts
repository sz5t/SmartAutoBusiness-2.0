import { IDataListProperty, CN_DATA_List_PROPERTY } from './../../../core/relations/bsn-property/data-list.property.interface';
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
    ChangeDetectorRef
} from '@angular/core';
import { CnComponentBase } from '../cn-component.base';
import { ParameterResolver } from '@shared/resolver/parameter/parameter.resolver';
import { RelationResolver } from '@shared/resolver/relation/relation.resolver';
import { filter, concatMap, mergeMap } from 'rxjs/operators';
import { Subscription, Subject, BehaviorSubject, merge, Observable } from 'rxjs';
import { CommonUtils } from '@core/utils/common-utils';
import { BSN_COMPONENT_SERVICES } from '@core/relations/bsn-relatives';
import { ComponentServiceProvider } from '@core/services/component/component-service.provider';
import { CN_DATA_LIST_METHOD } from '@core/relations/bsn-methods/bsn-data-list-method';
import { CnPageComponent } from '../cn-page/cn-page.component';
import { CnDataFormComponent } from '../data-form/cn-data-form.component';
import { ButtonOperationResolver } from '@shared/resolver/buttonOperation/buttonOperation.resolver';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'cn-card-list,[cn-card-list]',
    templateUrl: './cn-card-list.component.html',
    styleUrls: ['./cn-card-list.component.less']
})

export class CnCardListComponent extends CnComponentBase implements OnInit, OnDestroy, IDataListProperty {

    @Input()
    public config: any;
    @Input() initData;
    @Input() tempData;

    public CURRENT_DATA;
    public COMPONENT_METHODS = CN_DATA_LIST_METHOD;
    public COMPONENT_PROPERTY = CN_DATA_List_PROPERTY;


    public loading = false;
    public list: any[] = [null];

    public outerToolbars: any;
    public innerToolbars: any



    public pageIndex = 1;
    public pageSize = 5;
    public total = 0;

    public _sortName;
    public _sortValue;

    private KEY_ID;

    public ITEM_ADDED: any;
    public ITEM_EDITED: any;
    public ITEMS_CHECKED: any[];
    public ITEM_SELECTED: any;
    public COMPONENT_VALUE: any;
    public BUTTON_SELECTED: any;

    public descriptionItems: {
        title: string,
        text: string,
        icon: string,
        span: number
    }[];

    private _sender_source$: Subject<any>;
    private _trigger_source$: Subject<any>;

    private _receiver_subscription$: Subscription;
    private _sender_subscription$: Subscription;
    private _trigger_receiver_subscription$: Subscription;
    constructor(
        @Inject(BSN_COMPONENT_SERVICES)
        public componentService: ComponentServiceProvider,
        private cdr: ChangeDetectorRef
    ) {
        super(componentService);
        this.cacheValue = this.componentService.cacheService;
    }

    ngOnInit(): void {
        this.KEY_ID = this.config.keyId;
        this._initInnerValue();
        this.resolveRelations();
        this._createToolbars();

        // 初始化默认分页大小
        this.config.pageSize && (this.pageSize = this.config.pageSize);

        this._initInnerValue();
        if (this.config.loadingOnInit) {
            this.load();
        }
    }


    ngOnDestroy(): void {
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

    private _createToolbars() {
        if (this.config.actions) {
            this.outerToolbars = this.config.actions.filter(s => s.type === 'outer');
            this.innerToolbars = this.config.actions.filter(s => s.type === 'inner');
        }
    }

    public btnClick(btn, item) {
        this.ITEM_SELECTED = item ? item : null;
        this.BUTTON_SELECTED = btn['execute'][0];
        const btnResolver = new ButtonOperationResolver(this.componentService, this.config);
        btnResolver.toolbarAction(btn, this.config.id);
    }

    public load() {
        this.loading = true;
        const ajaxObj = this._findAjaxById(this.config.loadingConfig.id);
        const params = {
            ...this.buildParameters(ajaxObj.params),
            ...this._buildPaging(),
            ...this._buildSort()
        };
        // this.list = [null];
        this.componentService.apiService.getRequest(ajaxObj.url, ajaxObj.method, { params }).subscribe(response => {
            if (response.data && response.data && response.data.resultDatas) {
                const innerList: any[] = [null];
                response.data.resultDatas.forEach(d => {
                    const itm = this._listMappingResolve(d);
                    itm[this.KEY_ID] = d[this.KEY_ID];
                    itm && innerList.push(itm);
                });
                this.list = innerList;
                this.total = response.data.count;

            } else {
                // this._initDescription();
            }
            this.loading = false;
            this.cdr.detectChanges();
        })
    }

    public loadByFilter() {
        this.loading = true;
        const ajaxObj = this._findAjaxById(this.config.loadingConfig.id);
        const params = {
            ...this.buildParameters(ajaxObj.filter),
            ...this._buildPaging(),
            ...this._buildSort()
        };
        // this.list = [null];
        this.componentService.apiService.getRequest(ajaxObj.url, ajaxObj.method, { params }).subscribe(response => {
            if (response.data && response.data && response.data.resultDatas) {
                const innerList: any[] = [null];
                response.data.resultDatas.forEach(d => {
                    const itm = this._listMappingResolve(d);
                    itm[this.KEY_ID] = d[this.KEY_ID];
                    itm && innerList.push(itm);
                });
                this.list = innerList;
                this.total = response.data.count;

            } else {
                // this._initDescription();
            }
            this.loading = false;
            this.cdr.detectChanges();
        })
    }

    public getCurrentComponentId() {
        return this.config.id;
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

    private _findAjaxById(id) {
        return this.config.ajaxConfig.find(f => f.id === id);
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

    public buildParameters(paramsCfg, data?, isArray = false) {
        let parameterResult: any | any[];
        if (!isArray && !data) {
            parameterResult = ParameterResolver.resolve({
                params: paramsCfg,
                tempValue: this.tempValue,
                initValue: this.initValue,
                cacheValue: this.cacheValue,
                item: this.CURRENT_DATA,
                userValue:this.userValue
            });
        } else if (!isArray && data) {
            parameterResult = ParameterResolver.resolve({
                params: paramsCfg,
                tempValue: this.tempValue,
                initValue: this.initValue,
                cacheValue: this.cacheValue,
                item: this.CURRENT_DATA,
                returnValue: data,
                userValue:this.userValue
            });
        } else if (isArray && data && Array.isArray(data)) {
            parameterResult = [];
            data.map(d => {
                const param = ParameterResolver.resolve({
                    params: paramsCfg,
                    tempValue: this.tempValue,
                    componentValue: d,
                    item: this.ITEM_SELECTED,
                    initValue: this.initValue,
                    cacheValue: this.cacheValue,
                    router: this.routerValue,
                    validation: d,
                    returnValue: d,
                    userValue:this.userValue
                });
                parameterResult.push(param);
            })
        }
        return parameterResult;
    }

    searchData(reset: boolean = false) {
        if (reset) {
            this.pageIndex = 1;
        }
        // this.isAllChecked = false;
        // this.indeterminate = false;
        this.load();
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
        // if (this.focusIds) {
        //     focusParams['_focusedId'] = this.focusIds;
        // }
        return focusParams;
    }
    /**
     * 构建查询字段
     * @returns {{}}
     * @private
     */
    private _buildColumnFilter() {
        const filterParams = {};
        // if (this._columnFilterList && this._columnFilterList.length > 0) {
        //     this._columnFilterList.map(filter => {
        //         const valueStr = [];
        //         filter.value.map(value => {
        //             valueStr.push(`'${value}'`);
        //         });
        //         filterParams[filter.field] = `in(${valueStr.join(',')})`;
        //     });
        // }
        return filterParams;
    }
    /**
     * 构建查询参数
     */
    public _buildSearch() {
        const search = {};
        // if (this._search_row) {
        //     const searchData = JSON.parse(JSON.stringify(this._search_row)); 4
        //     delete searchData.key;
        //     delete searchData.checked;
        //     delete searchData.row_status;
        //     delete searchData.selected;

        //     search = searchData;
        // }
        return search;
    }
    // #endregion

    // private _initDescription() {
    //     this.list = [];
    //     if (this.config.dataMapping && this.config.dataMapping.length > 0) {
    //         this.config.dataMapping.forEach(d => {
    //             const item: { title: string, text: string, icon: string, span: number } = {
    //                 title: d['title'],
    //                 text: '',
    //                 icon: d['icon'],
    //                 span: d['span']
    //             };

    //             this.list.push(item);
    //         })
    //     }
    // }

    private _listMappingResolve(data) {
        let item;
        if (this.config.dataMapping && this.config.dataMapping.length > 0) {
            item = {};
            item['extra'] = [];

            this.config.dataMapping.forEach(d => {

                if (d['name'] !== 'extra' && data[d['field']]) {
                    item[d['name']] = data[d['field']];
                }
                else if (d['name'] === 'extra') {
                    d['fields'].forEach(f => {
                        if (data[f['field']]) {
                            f['value'] = data[f['field']];
                        }
                        item['extra'].push({ ...f });
                    });
                }
            })
        }
        data[this.KEY_ID] && (item[this.KEY_ID] = data[this.KEY_ID]);
        return item;
    }

    public createNewComponent(formName) {
        const formCfg = this.config.dialog.find(d => d.id === formName);
        if (formCfg) {
            this.showDialog({ dialog: formCfg, btnCfg: { state: 'new' } });
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

    public loadRefreshData(option) {
        const ajax = this._findAjaxById(this.config.loadingConfig.id);
        const url = ajax.url;
        const method = ajax.method;
        const param: any = {};
        if (option && Array.isArray(option)) {
            const rids = [];
            option.map(opt => {
                rids.push(opt[this.KEY_ID]);
            });
            param[this.KEY_ID] = `in(${rids.join(',')})`;
            const params = {
                ...this.buildParameters(ajax.params),
                ...param
            }

            this.componentService.apiService.getRequest(url, method, { params }).subscribe(response => {
                if (response && response.data && response.data) {
                    this.refreshData(response.data)
                    // this.isLoading = false;
                } else {
                    // this.isLoading = false;
                }
            }, error => {
                console.log(error);
            });
        } else if (option && !Array.isArray(option)) {
            const refreshParam = {[this.KEY_ID]: option[this.KEY_ID]}
            this.componentService.apiService.getRequest(url, method, refreshParam ).subscribe(response => {
                if (response && response.data && response.data) {
                    this.refreshData(response.data)
                    // this.isLoading = false;
                } else {
                    // this.isLoading = false;
                }
            }, error => {
                console.log(error);
            });
        }
    }

    public refreshData(loadNewData) {
        if (loadNewData && Array.isArray(loadNewData)) {
            loadNewData.map((newData, ind) => {
                const index = this.list
                    .filter(d => d !== null)
                    .findIndex(d => d[this.KEY_ID] === newData[this.KEY_ID]);

                if (index > -1) {
                    const nd = this._listMappingResolve(newData);
                    nd['state'] = 'edit';
                    this.list.splice(index + 1, 1, nd);
                    this.list = [...this.list];
                } else {
                    const ld = this._listMappingResolve(loadNewData[ind]);
                    ld['state'] = 'new';
                    const notNullList = this.list.filter(d => d !== null);
                    this.list = [null, ld, ...notNullList];
                }
            })
        }
    }



    public showLayoutDialog(option: any) {
        let dialog;
        // 根据按钮类型初始化表单状态
        const dialogCfg = option.dialog;
        // dialogCfg.form.state = option.btnCfg.state ? option.btnCfg.state : 'text';

        // const isEditForm = dialogCfg.form.state === 'edit' ? true : false;
        // if(isEditForm) {

        // }
        if (option.changeValue) {
            const d = ParameterResolver.resolve({
                params: option.changeValue.params,
                tempValue: this.tempValue,
                // componentValue: cmptValue,
                item: this.ITEM_SELECTED,
                initValue: this.initValue,
                cacheValue: this.cacheValue,
                router: this.routerValue,
                userValue:this.userValue
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

        // 20.11.21
        const subPageConfig =this.getMenuComponentConfigById(dialogCfg.layoutName);
        //const subPageConfig = this.componentService.cacheService.getNone(dialogCfg.layoutName);

        const dialogOptional = {
            nzTitle: dialogCfg.title ? dialogCfg.title : '',
            nzContent: CnPageComponent,
            nzWidth: dialogCfg.width ? dialogCfg.width : '600px',
            nzStyle: dialogCfg.style ? dialogCfg.style : null, // style{top:'1px'},
            nzComponentParams: {
                config: subPageConfig,
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
                    type: "primary",
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
        // this.componentService.cacheService.get(dialogCfg.layoutName).subscribe(res => {

        // });


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
                item: this.ITEM_SELECTED,
                initValue: this.initValue,
                cacheValue: this.cacheValue,
                router: this.routerValue,
                userValue:this.userValue
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
            nzWidth: dialogCfg.width ? dialogCfg.width : '600px',
            nzStyle: dialogCfg.style ? dialogCfg.style : null, // style{top:'1px'},
            nzMaskClosable: dialogCfg.hasOwnProperty('maskClosable')?dialogCfg.maskClosable : false,
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
        // const ajaxParams_1 = [{ name: this.KEY_ID, type: "item", valueName: this.KEY_ID }];
        // const paramDataids = this._createCheckedRowsIdParameter(ajaxParams_1);
   
        if (option.changeValue) {
            const d = ParameterResolver.resolve({
                params: option.changeValue.params,
                tempValue: this.tempValue,
                // componentValue: cmptValue,
                item: this.ITEM_SELECTED,
                initValue: this.initValue,
                cacheValue: this.cacheValue,
                router: this.routerValue,
                userValue:this.userValue
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
                                const customActionList = dialogCfg.customAction.filter(item => item.id === _button.customActionId);
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
        if (msgObj.code) {
            message.message = msgObj.code;
        } else if (msgObj.message) {
            message.message = msgObj.message;
        }
        // message.message = option.code ? option.code : '';
        msgObj.field && (message.field = msgObj.field ? msgObj.field : '');
        message.type = msgObj.type;
        return message
    }


    public showConfirm(option) {
        const InnerOperateParams = {};
        InnerOperateParams['ajaxConfig'] = this.config.ajaxConfig.find(e =>e['id'] === this.BUTTON_SELECTED['ajaxId']);
        InnerOperateParams['data'] = {'data':{}};
        InnerOperateParams['data']['data'] = this.ITEM_SELECTED
        this.confirm(option.dialog, () => { this.execute(InnerOperateParams) });
    }

    public async execute(option) {
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
                cacheValue: this.cacheValue,
                userValue:this.userValue
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

    public async executeHttpRequest(url, method, paramData) {
        return this.componentService.apiService[method](url, paramData).toPromise();
    }

}