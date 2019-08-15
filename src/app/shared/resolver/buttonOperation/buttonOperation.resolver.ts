import { BSN_TOOLBAR_TRIGGER } from './../../../core/relations/bsn-trigger/toolbar.trigger.interface';
import { BSN_DATAGRID_TRIGGER } from './../../../core/relations/bsn-trigger/data-grid.trigger.interface';
import { ComponentServiceProvider } from '@core/services/component/component-service.provider';
import { from } from 'rxjs';

import { map } from 'rxjs/operators';

import { BSN_TRIGGER_TYPE } from '@core/relations/bsn-status';

import { BsnRelativesMessageModel } from '@core/relations/bsn-relatives';

export class ButtonOperationResolver {
    private _beforeTriggerCfg;
    public get beforeTriggerCfg() {
        return this._beforeTriggerCfg;
    }
    public set beforeTriggerCfg(value) {
        this._beforeTriggerCfg = value;
    }
    private _afterTriggerCfg;
    public get afterTriggerCfg() {
        return this._afterTriggerCfg;
    }
    public set afterTriggerCfg(value) {
        this._afterTriggerCfg = value;
    }
    private _conditionCfg;
    public get conditionCfg() {
        return this._conditionCfg;
    }
    public set conditionCfg(value) {
        this._conditionCfg = value;
    }
    private _ajaxCfg;
    public get ajaxCfg() {
        return this._ajaxCfg;
    }
    public set ajaxCfg(value) {
        this._ajaxCfg = value;
    }
    private _cascade;
    public get cascade() {
        return this._cascade;
    }
    public set cascade(value) {
        this._cascade = value;
    }

    private _currentData;
    public get currentData() {
        return this._currentData;
    }
    public set currentData(value) {
        this._currentData = value;
    }
    private _builtinCfg;
    public get builtinCfg() {
        return this._builtinCfg;
    }
    public set builtinCfg(value) {
        this._builtinCfg = value;
    }
    
    constructor(private componentService: ComponentServiceProvider, private config, private data?) {
        config.ajaxConfig && (this.ajaxCfg = config.ajaxConfig);
        config.beforeTrigger && (this.beforeTriggerCfg = config.beforeTrigger);
        config.afterTrigger && (this.afterTriggerCfg = config.afterTrigger);
        config.condition && (this.conditionCfg = config.condition);
        config.cascade && (this.cascade = config.cascade);
        data && (this.currentData = data);
        config.builtinConfig && (this.builtinCfg = config.builtinConfig);
    }
    public toolbarAction(btn, targetViewId) {
        // 按钮区分具体的,状态(STATE)、行为(BEHAVIOR)、动作(ACTION)、操作(OPERATION),跳转(LINK)
        // 状态: 新增(NEW)、编辑(EDIT)、只读(READ_ONLY)
        // 行为: 弹出框(DIALOG)、刷新(REFRESH)、显示、隐藏(SHOW)
        // 操作: 新增保存、更新保存、删除、行选中、行勾选...
        // 动作: 
        // 跳转: 判断跳转(LINK_TO)、直接跳转(LINK)

        // 根据触发类型发送不同类型的具体消息内容
        const btn_source$ = from(btn.execute);
        btn_source$.pipe(map(exeCfg => this.sendBtnMessage(btn, exeCfg, targetViewId))).subscribe().unsubscribe();
    }

    public sendBtnMessage(btn, cfg, targetViewId) {
        const triggerObj = {
            triggerType: cfg.triggerType,
            trigger: cfg.trigger
        }
        switch (cfg.triggerType) {
            // 状态触发
            case BSN_TRIGGER_TYPE.STATE:
                if (this.currentData) {
                    this.setDataState(cfg.trigger, this.currentData);
                    this.setToggle(this.currentData);
                }
                const state_options = {};
                state_options['beforeOperation'] = this.findBeforeOperationConfig(cfg.stateId);
                state_options['condition'] = this.findConditionConfig(cfg.conditionId);
                state_options['btnCfg'] = btn;
                state_options['data'] = this.currentData;
                if(cfg.builtinId){
                    const _builtinConfig = this.findbuiltinConfig(cfg.builtinId);
                    _builtinConfig && (state_options['builtinConfig'] =_builtinConfig);
                }
                const stateMsg = new BsnRelativesMessageModel(
                    triggerObj,
                    targetViewId,
                    state_options
                );
                this.componentService.commonRelationTrigger.next(stateMsg);
                break;
            // 行为触发
            case BSN_TRIGGER_TYPE.BEHAVIOR:
                if (this.currentData) {
                    this.setDataState(cfg.trigger, this.currentData);
                    this.setToggle(this.currentData);
                }
                const behaviorMsg = new BsnRelativesMessageModel(
                    triggerObj,
                    targetViewId
                )
                this.componentService.commonRelationTrigger.next(behaviorMsg);
                break;
            // 动作触发
            case BSN_TRIGGER_TYPE.ACTION:
                const actionMsg = new BsnRelativesMessageModel(
                    triggerObj,
                    targetViewId,
                    {}
                );
                this.componentService.commonRelationTrigger.next(actionMsg);
                break;
            // 操作触发
            case BSN_TRIGGER_TYPE.OPERATION:
                // 获取ajax操作配置
                // 获取条件状配置
                // 获取前置条件配置
                const options = {};
                options['ajaxConfig'] = this.findAjaxConfig(cfg.ajaxId);
                options['beforeOperation'] = this.findBeforeOperationConfig(cfg.stateId);
                options['condition'] = this.findConditionConfig(cfg.conditionId);
                options['data'] = this.currentData;
                const operationMsg = new BsnRelativesMessageModel(
                    triggerObj,
                    targetViewId,
                    options // 异步操作配置
                )
                this.componentService.commonRelationTrigger.next(operationMsg);
                break;
            // 链接跳转触发
            case BSN_TRIGGER_TYPE.LINK:
                const linkOptions = {};
                linkOptions['ajaxConfig'] = this.findAjaxConfig(cfg.ajaxId);
                linkOptions['beforeOperation'] = this.findBeforeOperationConfig(cfg.stateId);
                linkOptions['condition'] = this.findConditionConfig(cfg.conditionId);
                const linkMsg = new BsnRelativesMessageModel(
                    triggerObj,
                    targetViewId,
                    linkOptions // 页面跳转配置
                )
                this.componentService.commonRelationTrigger.next(linkMsg);
                break;
        }
    }

    private setDataState(state, dataOfState) {
        switch (state) {
            case BSN_DATAGRID_TRIGGER.EDIT_ROW:
                dataOfState.state = 'edit';
                // sendMsg.isSend = false;
                break;
            case BSN_DATAGRID_TRIGGER.EDIT_ROWS:
                dataOfState.state = 'edit';
                // sendMsg.isSend = false;
                break;
            case BSN_DATAGRID_TRIGGER.CANCEL_EDIT_ROW:
                dataOfState.state = 'text';
                // sendMsg.isSend = true
                break;
            case BSN_DATAGRID_TRIGGER.CANCEL_EDIT_ROWS:
                dataOfState.state = 'text';
                // sendMsg.isSend = true
                break;
            case BSN_DATAGRID_TRIGGER.ADD_ROW:
                dataOfState.state = 'new';
                // sendMsg.isSend = true
                break;
            case BSN_DATAGRID_TRIGGER.CANCEL_NEW_ROW:
                dataOfState.state = 'deleted';
                // sendMsg.isSend = true;
                break;
            case BSN_DATAGRID_TRIGGER.CANCEL_NEW_ROWS:
                dataOfState.state = 'text';
                break;
            case BSN_TOOLBAR_TRIGGER.STATE_TO_TEXT:
                dataOfState.state = 'text';
                break;
            case BSN_TOOLBAR_TRIGGER.EXECUTE_NONE:
                dataOfState.state = 'text';
                break;
            case BSN_DATAGRID_TRIGGER.REFRESH:
                dataOfState.state = 'text';
                break;
        }
    }

    // 
    private setToggle(dataOfState) {
        if (Array.isArray(dataOfState.actions) && dataOfState.actions.length > 0) {
            // 状态切换
            // 查找当前数据对应的操作状态
            dataOfState.actions.map(action => {
                this.setToggleByState(action, dataOfState);
            })

        }
        // 根据data中的action数组,来判断如何如何显示按钮
        // 可用于结合数据状态判定按钮显示
        // 可用于结合切换类型判定按钮显示
    }

    private setToggleByState(action, dataOfState) {
        if (action.toggle && action.toggle.type) {
            switch (action.toggle.type) {
                case 'state':
                    const stateValue = dataOfState[action.toggle.type];
                    if (action.toggle.values) {
                        const valueObj = action.toggle.values.find(val => val.name === stateValue);
                        valueObj && (action[action.toggle.toggleProperty] = valueObj.value);
                    }

                    break;
                case '...':
                    break;
            }
        }
    }

    private setTogglePropertyValue() {

    }


    private findAjaxConfig(ajaxId) {
        let ajaxConfig;
        if (this.ajaxCfg && Array(this.ajaxCfg) && this.ajaxCfg.length > 0) {
            const c = this.ajaxCfg.find(cfg => cfg.id === ajaxId);
            if (c) {
                ajaxConfig = c;
                if (ajaxConfig.result) {
                    for (const r of ajaxConfig.result) {
                        // 查找结果对应的消息配置
                        if (this.cascade.messageSender) {
                            const senderConfig = this.cascade.messageSender.find(sender => sender.id === r.senderId);
                            if (senderConfig) {
                                r['senderCfg'] = senderConfig;
                            }
                        }
                    }
                }
            }
        }
        return ajaxConfig;
    }

    private findbuiltinConfig(builtinId) {
        let builtinConfig;
        if (this.builtinCfg && Array(this.builtinCfg) && this.builtinCfg.length > 0) {
            const c = this.builtinCfg.filter(cfg => cfg.id === builtinId);
            if (c && c.length > 0) {
                builtinConfig =c[0];
            }
        }
        return builtinConfig;
    }


    private findBeforeOperationConfig(stateId) {
        let beforeConfig;
        if (this.beforeTriggerCfg && Array(this.beforeTriggerCfg) && this.beforeTriggerCfg.length > 0) {
            const b = this.beforeTriggerCfg.filter(cfg => cfg.id === stateId);
            if (b && b.length > 0) {
                beforeConfig = b[0];
            }

        }
        return beforeConfig;
    }

    public findConditionConfig(conditionId) {
        let conditionConfig;
        if (this.conditionCfg && Array(this.conditionCfg) && this.conditionCfg.length > 0) {
            const c = this.conditionCfg.filter(cfg => cfg.id === conditionId);
            if (c && c.length > 0) {
                conditionConfig = c[0];
            }
        }
        return conditionConfig;
    }
}