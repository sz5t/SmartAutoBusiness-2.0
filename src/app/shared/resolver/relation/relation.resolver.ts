import { TriggerResolver } from './../trigger/trigger.resolver';
import { from } from 'rxjs/internal/observable/from';
import { map } from 'rxjs/operators';
import { BsnRelativesMessageModel } from '@core/relations/bsn-relatives';
import { BSN_TRIGGER_TYPE } from '@core/relations/bsn-status';
/**
 * 关系消息解析器类
 * 所有组件关系解析的统一入口
 */
export class RelationResolver {
    constructor(private _componentInstance) { }
    public resolve(cascadeCfg?: any) {
        let source$;
        if (cascadeCfg && cascadeCfg.messageSender) {
            source$ = this.resolveSender(cascadeCfg.messageSender);
        } else if (cascadeCfg && cascadeCfg.messageReceiver) {
            source$ = this.resolveReceiver(cascadeCfg.messageReceiver);
        } else {
            source$ = this.resolveTrigger();
        }
        return source$;
    }

    /**
     * 组件内部消息发送
     */
    public resolveInnerSender(senderCfg: any) {
        // tslint:disable-next-line: no-use-before-declare
        new ComponentSenderResolver(this._componentInstance).sendMessage(senderCfg);
    }

    /**
     * 解析消息发送器
     * @param config 
     */
    public resolveSender(config): any {
        // 组装操作判断条件
        config.cascade.messageSender.map(sender => {
            sender.sendData.map(sendData => {
                // 操作判断
                if (sendData.conditionId) {
                    const condition = config.condition.find(c => c.id === sendData.conditionId);
                    if (condition) {
                        sendData['condition'] = condition;
                    }
                }
                // 前置条件
                if (sendData.beforeTriggerId) {
                    const beforeOperation = config.beforeTrigger.find(b => b.id === sendData.beforeTriggerId);
                    if (beforeOperation) {
                        sendData['beforeOperation'] = beforeOperation;
                    }
                }
            });
        });
        // tslint:disable-next-line: no-use-before-declare
        return new SenderResolver(this._componentInstance).resolve(config.cascade.messageSender);
    }

    /**
     * 解析消息接受器
     * @param messageReceiverCfg 
     */
    public resolveReceiver(config): any {
        // 查找前置条件
        // tslint:disable-next-line: no-use-before-declare
        return new ReceiverResolver(this._componentInstance).resolve(config.cascade.messageReceiver);
    }

    /**
     * 解析触发器
     */
    public resolveTrigger() {
        // tslint:disable-next-line: no-use-before-declare
        return new TriggerReceiverResolver(this._componentInstance).resolve();
    }
}

/**
 * 接收触发器发出的消息
 */
export class TriggerReceiverResolver {
    constructor(private _componentInstance) { }
    public resolve() {
        const currentId = this._componentInstance.getCurrentComponentId();
        this._componentInstance.trigger_subscription$ = this._componentInstance.componentService.commonRelationTrigger.subscribe(
            data => {
              //  debugger;
                if (data.viewId === currentId) {
                    new TriggerResolver(
                        data,
                        this._componentInstance
                    ).resolve();
                }
            }
        )
    }
}

/**
 * 消息发送器类
 */
export class SenderResolver {

    constructor(private _componentInstance: any) { }
    public resolve(senderCfg) {
        const that = this;
        const sender_source$ = from(senderCfg);
        const sender_subscribe$ = sender_source$.pipe(map(cfg => {
            // 根据当前表格实例的类型,进行相应消息的注册
            // console.log('single sender cfg', cfg);
            // tslint:disable-next-line: no-use-before-declare
            new ComponentSenderResolver(this._componentInstance).resolve(cfg);
        }));
        return sender_subscribe$;
    }
}

/**
 * 组件消息发送解析器
 */
export class ComponentSenderResolver {
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
    constructor(private _componentInstance: any) { }
    resolve(cfg: any) {
        switch (cfg.triggerType) {
            case BSN_TRIGGER_TYPE.STATE:
                this.handleStateType(cfg);
                break;
            case BSN_TRIGGER_TYPE.BEHAVIOR:
                this.handleBehaviorType(cfg);
                break;
            case BSN_TRIGGER_TYPE.ACTION:
                this.handleActionType(cfg);
                break;
            case BSN_TRIGGER_TYPE.OPERATION:
                this.handleOperationType(cfg);
                break;
            case BSN_TRIGGER_TYPE.LINK:
                this.handleLinkType(cfg);
                break;
        }
    }

    handleStateType(cfg: any) {
        // 前置条件判断
        this._componentInstance[cfg.triggerMoment](
            this._componentInstance,
            this._componentInstance.COMPONENT_METHODS[cfg.trigger],
            () => {
                this.sendMessage(cfg);
            }
        )
    }

    handleBehaviorType(cfg: any) {
        // 前置条件判断
        // this.sendMessage(cfg);
        this._componentInstance[cfg.triggerMoment](
            this._componentInstance,
            this._componentInstance.COMPONENT_METHODS[cfg.trigger],
            () => {
                this.sendMessage(cfg);
            }
        )
    }

    handleOperationType(cfg: any) {
        // 前置条件判断

        // 执行操作, 该功能不由组件实现
        // this.sendMessage(cfg);        
        if (!this.conditionValidator(cfg.condition)) {
            return false;
        }
        this._componentInstance[cfg.triggerMoment](
            this._componentInstance,
            this._componentInstance.COMPONENT_METHODS[cfg.trigger],
            () => {
                this.sendMessage(cfg);
            }
        )
    }

    handleActionType(cfg) {
        // 前置条件判断

        // 该功能不由组件实现
        // this.sendMessage(cfg);
        this._componentInstance[cfg.triggerMoment](
            this._componentInstance,
            this._componentInstance.COMPONENT_METHODS[cfg.trigger],
            () => {
                this.sendMessage(cfg);
            }
        )
    }

    handleLinkType(cfg) {
        // 前置条件判断

        // 执行跳转功能, 该功能不由组件实现
        // this.sendMessage(cfg);
        this._componentInstance[cfg.triggerMoment](
            this._componentInstance,
            this._componentInstance.COMPONENT_METHODS[cfg.trigger],
            () => {
                this.sendMessage(cfg);
            }
        )
    }

    /**
     * 发送消息
     * @param cfg 消息配置 
     */
    sendMessage(cfg) {
        for (const c of cfg.sendData) {
            // 根据前置条件判断,是否能够发送消息
            if (!this.conditionValidator(c.condition)) {
                return false;
            }
            const options = this.getOptionParamsObj(c.params);
            this._componentInstance.componentService.commonRelationSubject.next(
                new BsnRelativesMessageModel(
                    {
                        triggerType: c.receiverTriggerType,
                        trigger: c.receiverTrigger
                    },
                    cfg.senderId,
                    options
                )
            )
        }
    }

    /**
     * 获取组件当前状态下的所有参数
     * @param paramsCfg 消息参数配置
     */
    getOptionParamsObj(paramsCfg) {
        return this._componentInstance.buildParameters(paramsCfg);
    }

    private conditionValidator(condCfg): boolean {
        if (!condCfg) {
            return true;
        }
        const result = [];
        for (const cfg of condCfg.state) {
            switch (cfg.type) {
                case 'component':
                    const componentResult = this.checkComponentProperty(cfg);
                    result.push(componentResult);
                    break;
            }
        }
        return result.findIndex(res => !res) < 0;
    }

    private checkComponentProperty(expCfg) {
        // 判断取值的类型
        const allCheckResult = [];
        switch (expCfg.type) {
            case 'component':
                const componentValue = this._componentInstance[this._componentInstance.COMPONENT_PROPERTY[expCfg.valueName]];
                for (const exp of expCfg.expression) {
                    switch (exp.type) {
                        case 'property':
                            const valueCompareObj = this.buildMatchObject(componentValue, exp);
                            const valueMatchResult = this.matchResolve(valueCompareObj, exp.match);
                            allCheckResult.push(valueMatchResult);
                            break;
                        case 'element':
                            const elementResult = [];
                            for (const element of componentValue) {
                                const elementCompareObj = this.buildMatchObject(element, exp);
                                elementResult.push(this.matchResolve(elementCompareObj, exp.match));
                            }
                            const elementMatchResult = elementResult.findIndex(res => !res) < 0;
                            allCheckResult.push(elementMatchResult);
                    }
                }
                break;
        }
        return allCheckResult.findIndex(res => !res) < 0;
    }

    private buildMatchObject(componentValue, expCfg) {
        const value = componentValue[expCfg.name];
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
            default:
            case 'regexp': // 正在表达式匹配
                const regexp = new RegExp(compareValue.matchValue);
                return regexp.test(compareValue.value);

        }
    }
}

/**
 * 消息接收器类
 */
export class ReceiverResolver {
    constructor(private _componentInstance: any) { }
    public resolve(receiverCfg) {
        const receiver_source$ = from(receiverCfg);
        const receiver_subscribe$ = receiver_source$.pipe(map(cfg => {
            // tslint:disable-next-line: no-use-before-declare
            new ComponentReceiverResolver(this._componentInstance).resolve(cfg);
        }));
        return receiver_subscribe$;
    }
}

export class ComponentReceiverResolver {
    constructor(private _componentInstance: any) { }
    public resolve(cfg: any) {
        this._componentInstance.subscription$ = this._componentInstance.componentService.commonRelationSubject.subscribe(
            data => {
                // 判断发送组件与接受组件是否一致
                if (data.viewId === cfg.senderId) {
                    // 判断发送触发器与接受触发起是否一致
                    // new TriggerResolver(
                    //     data,
                    //     this._componentInstance
                    // ).resolve();
                    this.chooseTrigger(data, cfg);
                }
            }
        )
    }

    private chooseTrigger(data, cfg) {
        if (cfg.receiveData && Array.isArray(cfg.receiveData) && cfg.receiveData.length > 0) {
            for (const c of cfg.receiveData) {
                // 解析并保存传递参数值当前组件
                // 触发组件相关的事件或者方法 
                if (data.trigger.triggerType === c.triggerType && data.trigger.trigger === c.trigger) {
                    if (Array.isArray(c.params) && c.params.length > 0) {
                        for (const p of c.params) {
                            switch (p.valueTo) {
                                case 'tempValue':
                                    this._componentInstance.tempValue[p.cname] = data.options[p.pname];
                                    break;
                                case 'initValue':
                                    this._componentInstance.initValue[p.cname] = data.options[p.pname];
                                    break;
                            }
                        }
                    }

                    new TriggerResolver(data, this._componentInstance).resolve();
                }
            }
        }
    }


}

