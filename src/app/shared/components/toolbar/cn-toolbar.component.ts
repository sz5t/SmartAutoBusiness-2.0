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
        this.getBttonList();

    }

    private _initInnerValue() {
        this.tempValue = {};
        this.initValue = {};
    }

    public getPermissions() {
        const permissionMap = new Map();
        this.permissions.forEach(item => {
            permissionMap.set(item.code, item);
        });
        if (this.toolbars && Array.isArray(this.toolbars)) {
            this.toolbars.forEach(item => {
                if (item.group) {
                    const groups = [];
                    item.group.forEach(g => {
                        const Loading = {};
                        Loading[g.name] = false;
                        this.toolbarsIsLoading.push(Loading);
                        if (permissionMap.has(g.name)) {
                            groups.push({ ...g });
                        } else if (g.cancelPermission) {
                            groups.push({ ...g });
                        }
                    });

                    this.toolbarConfig.push({ group: groups });
                } else if (item.dropdown) {
                    const dropdown = [];
                    item.dropdown.forEach(b => {
                        let is_dropdown = true;
                        if (permissionMap.has(b.name)) {
                            is_dropdown = false;
                        } else if (b.cancelPermission) {
                            is_dropdown = false;
                        }
                        if (is_dropdown) {
                            return true;
                        }
                        const down: any = {};
                        const { name, text, icon } = b;
                        down.name = name;
                        down.text = text;
                        down.icon = icon;
                        down.buttons = [];
                        b.buttons.forEach(btn => {
                            //  const Loading = {};
                            //  Loading[btn.name] = false;
                            //  this.toolbarsisLoading.push(Loading);
                            if (permissionMap.has(btn.name)) {
                                down.buttons.push({ ...btn });
                            } else if (btn.cancelPermission) {
                                down.buttons.push({ ...btn });
                            }
                        });
                        dropdown.push(down);
                    });
                    this.toolbarConfig.push({ dropdown });
                }
            });
        }
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
        // debugger;
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
            const state = '';
            if(!_toggleType){
                dataOfState['state']="";
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
        console.log('按钮统计', _button_list);
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

}
