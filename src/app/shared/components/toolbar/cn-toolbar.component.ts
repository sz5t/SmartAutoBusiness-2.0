import { IToolbarTrigger } from './../../../core/relations/bsn-trigger/toolbar.trigger.interface';
import { CN_TOOLBAR_METHOD } from './../../../core/relations/bsn-methods';
import { ButtonOperationResolver } from './../../resolver/buttonOperation/buttonOperation.resolver';
import { BSN_TRIGGER_TYPE } from './../../../core/relations/bsn-status';
import { BsnRelativesMessageModel } from '@core/relations/bsn-relatives';
import { BSN_COMPONENT_SERVICES } from './../../../core/relations/bsn-relatives';
import { CnComponentBase } from './../cn-component.base';
import {
    Component,
    OnInit,
    Input,
    OnDestroy,
    Type,
    Inject,
    ViewEncapsulation
} from '@angular/core';
import { ComponentServiceProvider } from '@core/services/component/component-service.provider';
import { from, Subject, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { RelationResolver } from '@shared/resolver/relation/relation.resolver';
import { environment } from '@env/environment';
import { ParameterResolver } from '@shared/resolver/parameter/parameter.resolver';

@Component({
    // tslint:disable-next-line: component-selector
    selector: 'cn-toolbar',
    // encapsulation: ViewEncapsulation.None,
    templateUrl: './cn-toolbar.component.html',
    styles: [
        `
            .table-operations {
               padding-top: 3px;
               padding-bottom: 3px;
            }

            .table-operations .ant-btn-group {
                margin-right: 4px;
                margin-bottom: 2px;
                font-weight: 600;
            }

            .toolbarGroup {
                margin-right:8px;
            }
            
        `
    ]
})
export class CnToolbarComponent extends CnComponentBase implements OnInit, OnDestroy {
    @Input()
    public config;
    @Input()
    public size;
    @Input()
    public permissions = [];
    @Input()
    public viewId;
    public toolbarConfig = [];
    public model;
    public _cascadeState;
    public toolbars;
    public toolbarsIsLoading = [];


    private _sender_source$: Subject<any>;
    private _receiver_source$: Subject<any>;
    private _trigger_source$: Subject<any>;

    private _receiver_subscription$: Subscription;
    private _sender_subscription$: Subscription;
    private _trigger_receiver_subscription$: Subscription;

    public COMPONENT_METHODS = CN_TOOLBAR_METHOD;
    // public COMPONENT_PROPERTIES =

    public OPREATION_DATA: any | any[];

    constructor(
        @Inject(BSN_COMPONENT_SERVICES)
        public componentService: ComponentServiceProvider
    ) {
        super(componentService);
    }

    public ngOnInit() {

        this.toolbarConfig = this.config.toolbar;
        // 权限计算后，将操作按钮组，赋值给this.toolbarConfig 

        this._initInnerValue();

        if (this.config.cascade && this.config.cascade.messageReceiver) {
            // 解析消息接受配置,并注册消息接收对象
            // this._receiver_source$ = new RelationResolver(this).resolveReceiver(this.config);
            // this._receiver_source$.subscribe();
            new RelationResolver(this).resolveReceiver(this.config);
        }
        // this.getBttonList();
        this.getPermissions();

        // const componentPermission =  this.getMenuComponentPermissionConfigById(this.config.id);
        // console.log('当前权限',componentPermission);

        // 解析
        // componentPermission['permission']
        // id: "qbh1yxWLSP0BpJ3BLFBrMMDKQMeCJLeBGDP3"
        // type: " toolbar"
        this.initLog();

    }

    private _initInnerValue() {
        this.tempValue = {};
        this.initValue = {};
    }


    public getPermissions() {
        let componentPermission: any;
        if (this.config.id) {
            componentPermission = this.getMenuComponentPermissionConfigById(this.config.id);
        }
        let enableToolbarPermission = false;
        if (environment['systemSettings'] && environment['systemSettings']['systemMode'] === 'work') {

            if (environment['systemSettings'] && environment['systemSettings']['permissionInfo']) {
                if (environment['systemSettings']['enablePermission']) {
                    enableToolbarPermission = environment['systemSettings']['permissionInfo']['enableToolbarPermission'];
                }
            }
        }
        if (this.config['exceptionPermission']) {
            enableToolbarPermission = false;
        }

        console.log('当前权限', componentPermission);
        const permissionMap = new Map();
        if (componentPermission && componentPermission['permission']) {
            componentPermission && componentPermission['permission'].forEach(item => {
                permissionMap.set(item.id, item);
            });
        }


        // try {

        //     throw new Error()
        // } catch (e) {
        //     // console.log(e)
        // }
        // "targetViewId": "tree_page",
        let _button_list = [];
        if (this.toolbarConfig && Array.isArray(this.toolbarConfig)) {
            this.toolbarConfig.forEach(item => {
                if (item.group) {
                    if (!enableToolbarPermission || (!item.hasOwnProperty('id')) || (enableToolbarPermission && item.id && permissionMap.has(item.id))) {
                        item['permission'] = true;
                    }
                    let targetViewId = item['targetViewId'];
                    item.group.forEach(g => {
                        if (g.dropdown) {
                            g.dropdown.forEach(b => {
                                b['targetViewId'] = targetViewId;
                                if (!enableToolbarPermission || (!b.hasOwnProperty('id')) || (enableToolbarPermission && b.id && permissionMap.has(b.id))) {
                                    b['permission'] = true;
                                }
                                _button_list.push(b);
                            });
                        } else {
                            g['targetViewId'] = targetViewId;
                            if (!enableToolbarPermission || ((!g.hasOwnProperty('id')) || enableToolbarPermission && g.id && permissionMap.has(g.id))) {
                                g['permission'] = true;
                            }
                            _button_list.push(g);
                        }
                    });
                } else if (item.dropdown) {
                    if (!enableToolbarPermission || (!item.hasOwnProperty('id')) || (enableToolbarPermission && item.id && permissionMap.has(item.id))) {
                        item['permission'] = true;
                    }
                    let targetViewId = item['targetViewId'];
                    item.dropdown.forEach(b => {
                        b['targetViewId'] = targetViewId;
                        if (!enableToolbarPermission || (!b.hasOwnProperty('id')) || (enableToolbarPermission && b.id && permissionMap.has(b.id))) {
                            b['permission'] = true;
                        }
                        _button_list.push(b);
                    });
                }
            });
        }
        this.button_list = _button_list;
        // console.log('按钮统计', _button_list);
    }



    private checkComponentProperty(btn) {
        const checkResult = [];
        const allCheckResult = [];
        for (const exps of btn.beforeExecute) {
            const valueName = exps.valueName;
            for (const exp of exps.expression) {
                switch (exp.type) {
                    case 'property':
                        const valueCompareObj = this.buildMatchObject(this.OPREATION_DATA[valueName], exp);
                        const valueMatchResult = this.matchResolve(valueCompareObj, exp.match);
                        allCheckResult.push(valueMatchResult);
                        break;
                    case 'element':
                        const elementResult = [];
                        for (const element of this.OPREATION_DATA[valueName]) {
                            const elementCompareObj = this.buildMatchObject(element, exp);
                            elementResult.push(this.matchResolve(elementCompareObj, exp.match));
                        }
                        const elementMatchResult = elementResult.findIndex(res => !res) < 0;
                        allCheckResult.push(elementMatchResult);
                }
            }
            checkResult.push(allCheckResult.findIndex(res => !res) < 0);
        }
        return checkResult.findIndex(res => !res) < 0;

    }

    public action(btn, targetViewId) {
        // console.log('点击按钮',btn);
        setTimeout(_ => {
            this.toolbarsIsLoading[btn.id] = false;
        }, 150);
        if (Array.isArray(btn.beforeExecute) && btn.beforeExecute.length > 0) {
            const res = this.checkComponentProperty(btn);
            if (!res) {
                return false;
            }
        }
        // 判断当前按钮操作,是否需要提前准备操作数据
        // isHandleData属性标识当前按钮是否协同数据一起操作
        // if (btn.isHandleData && Array.isArray(btn.execute.params) && btn.execute.params.length > 0) {

        //     // 获取initValue或者tempValue内的数据,判断是否存在可编辑的数据对象或者集合
        //     // 如果存在则可继续执行,如果不存在则无法继续执行
        //     btn.execute.params.forEach(param => {
        //         const paramObj = this.tempValue[param['name']];
        //         if (paramObj && Array.isArray(paramObj) && paramObj.length === 0) {
        //             isContinue = false;
        //         } else if (!paramObj) {
        //             isContinue = false;
        //         }
        //     });
        //     if (!isContinue) {
        //         return false;
        //     }
        // }

        if (!this.toolbarsIsLoading[btn.id]) {
            // 根据触发类型发送不同类型的具体消息内容
            // const btn_source$ = from(btn.execute);
            // btn_source$.pipe(map(exeCfg => this.sendBtnMessage(exeCfg, targetViewId))).subscribe().unsubscribe();
            const actions = this.toolbarConfig.find(t => t.targetViewId === targetViewId);
            const dataOfState = { 'state': btn.state, 'actions': actions.group }
            let _toggleType = true;
            if (btn.toggle && btn.toggle.toggleType) {
                if (btn.toggle.toggleType === 'relation') {
                    _toggleType = false;
                }
            }
            if (btn.toggle && btn.toggle.type && _toggleType) {
                switch (btn.toggle.type) {
                    case 'state':
                        const stateValue = dataOfState[btn.toggle.type];
                        if (btn.toggle.values) {
                            const valueObj = btn.toggle.values.find(val => val.name === stateValue);
                            valueObj && (btn[btn.toggle.toggleProperty] = valueObj.value);
                        }
                        if (actions) {
                            if (actions.group) {
                                actions.group.forEach(element => {
                                    if (element.toggle && element.toggle.values) {
                                        const _valueObj = element.toggle.values.find(val => val.name === stateValue);
                                        _valueObj && (element[element.toggle.toggleProperty] = _valueObj.value);
                                    }
                                });
                            }
                            if (actions.dropdown) {
                                actions.dropdown.forEach(element => {
                                    if (element.toggle && element.toggle.values) {
                                        const _valueObj = element.toggle.values.find(val => val.name === stateValue);
                                        _valueObj && (element[element.toggle.toggleProperty] = _valueObj.value);
                                    }
                                });
                            }

                        }

                        break;
                    case '...':
                        break;
                }
            }
            const state = '';
            if (!_toggleType) {
                dataOfState['state'] = "";
            }
            const btnResolver = new ButtonOperationResolver(this.componentService, this.config, dataOfState);
            btnResolver.toolbarAction(btn, targetViewId);
            this.toolbarsIsLoading[btn.id] = true;
        }
    }

    public setOperationData(option) {
        console.log("toolbar -setOperation tempValue", this.tempValue, option);
        this.OPREATION_DATA = option;
    }

    public stateToText(option) {
        const actions = this.toolbarConfig.find(t => t.targetViewId === option.targetViewId);
        const dataOfState = { 'state': 'text', 'actions': actions.group }
        const btnResolver = new ButtonOperationResolver(this.componentService, this.config, dataOfState);
        const btn = { execute: [{ trigger: 'EXECUTE_NONE', triggerType: 'STATE' }] }
        btnResolver.toolbarAction(btn, option.targetViewId);


    }

    public stateToEdit(option) {
        const actions = this.toolbarConfig.find(t => t.targetViewId === option.targetViewId);
        const dataOfState = { 'state': 'edit', 'actions': actions.group }
        const btnResolver = new ButtonOperationResolver(this.componentService, this.config, dataOfState);
        const btn = { execute: [{ trigger: 'EXECUTE_NONE_EDIT', triggerType: 'STATE' }] }
        btnResolver.toolbarAction(btn, option.targetViewId);
    }

    public executeNone() {

    }

    public executeNoneEdit() {

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

    private buildMatchObject(componentValue, expCfg) {
        let value;
        if (expCfg.name) {
            value = componentValue[expCfg.name];
        } else {  // 读取自身数据
            value = componentValue;
        }
        const matchValue = expCfg.matchValue;
        const matchValueFrom = expCfg.matchValueFrom;
        const matchValueTo = expCfg.matchValueTo;
        return {
            'value': value,
            'matchValue': matchValue,
            'matchValueFrom': matchValueFrom,
            'matchValueTo': matchValueTo
        }
    }


    private matchResolve(compareValue, expression) {
        switch (expression) {
            case 'eq': // =
                return compareValue.value === compareValue.matchValue;
            case 'neq': // !=
                return compareValue.value !== compareValue.matchValue;
            case 'ctn': // like
                return compareValue.matchValue.indexOf(compareValue.value) > 0;
            case 'nctn': // not like
                return compareValue.matchValue.indexOf(compareValue.value) <= 0;
            case 'in': // in  如果是input 是这样取值，其他则是多选取值
                let in_result = true;
                if (Array.isArray(compareValue.matchValue) && compareValue.matchValue.length > 0) {
                    in_result = compareValue.matchValue.findIndex(compareValue.value) > 0;
                }
                return in_result;
            case 'nin': // not in  如果是input 是这样取值，其他则是多选取值
                let nin_result = true;
                if (Array.isArray(compareValue.matchValue) && compareValue.matchValue.length > 0) {
                    nin_result = compareValue.matchValue.findIndex(compareValue.value) <= 0;
                }
                return nin_result;
            case 'btn': // between
                return (compareValue.matchValueFrom <= compareValue.value)
                    && (compareValue.matchValueTo >= compareValue.value);
            case 'ge': // >=
                return compareValue.value >= compareValue.matchValue;
            case 'gt': // >
                return compareValue.value > compareValue.matchValue;
            case 'le': // <=
                return compareValue.value <= compareValue.matchValue;
            case 'lt': // <
                return compareValue.value < compareValue.matchValue;
            case 'notNull': // 是否为null
                return !!compareValue.value;
            default:
            case 'regexp': // 正在表达式匹配
                const regexp = new RegExp(compareValue.matchValue);
                return regexp.test(compareValue.value);

        }
    }


    /**
     * 模拟执行按钮操作 EXECUTE_ACTION
     * 从操作配置中读取 当前btn 相应的tagViewId
     * @param option 
     */
    private executeAction(option?) {

        let id = option['toolbarId'];
        console.log('executeAction', option);
        let btn = this.getBtn(id);
        if (btn) {
            this.action(btn, btn['targetViewId']);
            return true;
        } else {
            return false;
        }

        // 消息操作id ，获取btn配置 执行

    }

    public getBtn(id?) {

        let _button = this.button_list.filter(item => item['id'] === id);
        if (_button && _button.length > 0) {
            return _button[0];
        } else {
            return null;
        }

    }

    button_list = [];
    public getBttonList() {

        // "targetViewId": "tree_page",
        let _button_list = [];
        if (this.toolbarConfig && Array.isArray(this.toolbarConfig)) {
            this.toolbarConfig.forEach(item => {
                if (item.group) {

                    let targetViewId = item['targetViewId'];
                    item.group.forEach(g => {
                        if (g.dropdown) {
                            g.dropdown.forEach(b => {
                                b['targetViewId'] = targetViewId;
                                _button_list.push(b);
                            });
                        } else {
                            g['targetViewId'] = targetViewId;
                            _button_list.push(g);
                        }
                    });
                } else if (item.dropdown) {
                    let targetViewId = item['targetViewId'];
                    item.dropdown.forEach(b => {
                        b['targetViewId'] = targetViewId;
                        _button_list.push(b);
                    });
                }
            });
        }
        this.button_list = _button_list;
        // console.log('按钮统计', _button_list);
    }


    // 权限 合并计算
    public permissionsMerge(SourceData?, Permissions?): any {

        let _toolBar = [];




    }


    // 操作按钮状态切换【执行成功后切换，消息通知】
    public buttonStateSwitch(option?): any {
        let id = option['toolbarId'];
        console.log('buttonStateSwitch', option);
        let btn = this.getBtn(id);
        if (btn) {
            // 固定参数【toolbarId,targetViewId】
            const targetViewId = btn['targetViewId'];
            const actions = this.toolbarConfig.find(t => t.targetViewId === targetViewId);
            const dataOfState = { 'state': btn.state, 'actions': actions.group }
            let _toggleType = false;
            if (btn.toggle && btn.toggle.toggleType) {
                if (btn.toggle.toggleType === 'relation') {
                    _toggleType = true;
                }
            }
            if (btn.toggle && btn.toggle.type && _toggleType) {
                switch (btn.toggle.type) {
                    case 'state':
                        const stateValue = dataOfState[btn.toggle.type];
                        if (btn.toggle.values) {
                            const valueObj = btn.toggle.values.find(val => val.name === stateValue);
                            valueObj && (btn[btn.toggle.toggleProperty] = valueObj.value);
                        }
                        if (actions) {
                            actions.group.forEach(element => {
                                if (element.toggle && element.toggle.values) {
                                    const _valueObj = element.toggle.values.find(val => val.name === stateValue);
                                    _valueObj && (element[element.toggle.toggleProperty] = _valueObj.value);
                                }
                            });
                        }

                        break;
                    case '...':
                        break;
                }
            }
            return true;
        } else {
            return false;
        }

    }



    public buildParameters(paramsCfg, returnData?, itemData?) {
        return ParameterResolver.resolve({
            params: paramsCfg,
            tempValue: this.tempValue,
            initValue: this.initValue,
            cacheValue: this.cacheValue,
            router: this.routerValue,
            returnValue: returnData ? returnData : {},
            item: itemData ? itemData : {},
            userValue: this.userValue,
            menuValue: this.componentService.cacheService.getNone('activeMenu') ?
                this.componentService.cacheService.getNone('activeMenu') : {}
        });
    }

    /**
     * 写日志
     * @param Description 操作描述
     * @param itemData 操作涉及数据
     */
    public async writeLog(Description?, itemData?, btnOption?) {

        const text = btnOption['btnCfg']['text'];
        let componentId;
        if (btnOption['btnCfg']['targetViewId']) {
            componentId = btnOption['btnCfg']['targetViewId'];
        } else {
            componentId = this.config['id'];
        }
        console.log('操作按钮', text, '操作组件', componentId);
        // 所属组件 targetViewId ，无 targetViewId 则是当前组件行内操作
        console.log('记录操作日志', Description, itemData, btnOption);
        // 构建参数
        // 根据执行情况，写入日志信息

        //【菜单】【主页】【页】【组件】【按钮标识】【按钮名称】【业务描述】【业务数据】【执行结果】【执行人】【执行时间】
        // 通过toolbar 基本描述清楚当前按钮上面时候点击，子表描述，点击按钮后执行什么内容（可以将一个按钮下的多个执行记录）
        // 日志，可以记录 谁，在什么时间，打开什么页面，操作什么数据，执行结果如何
        // 当前结构，不太满足aop 
        // 逻辑执行的取值，在参数传递的时候未知，需要公用方法解析后，调用统一的执行
    }




    async writeLogInfo(that?, arguments1?) {

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
            description:'[按钮 ]：'+ (btnOption['description'] ? btnOption['description'] : btnOption['text'])
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
            const params = that.buildParameters(logConfig['params'], null, btnData);
            const response = await that.componentService.apiService[method](url, params).toPromise();
            console.log('写日志返回', response);
        }

        return true;

    }

    public initLog() {
        if (environment['systemSettings']['enableLog']) {
            this.beforeLog(this, 'action', this.writeLogInfo);
        }
         //this.before(this, 'action', this.writeLogInfo);

    }



}
