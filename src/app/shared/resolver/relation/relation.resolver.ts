import { TriggerResolver } from './../trigger/trigger.resolver';
import { from } from 'rxjs/internal/observable/from';
import { map } from 'rxjs/operators';
import { BsnRelativesMessageModel } from '@core/relations/bsn-relatives';
import { BSN_TRIGGER_TYPE } from '@core/relations/bsn-status';
import { CommonUtils } from '@core/utils/common-utils';
import { deepCopy } from '@delon/util';
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
    public resolveInnerSender(resultCfg: any, successData, isArrayResult = false) {
        // 查找消息配置
        if (resultCfg['senderId']) {
            // const senderCfg = this._componentInstance
            //     .config
            //     .cascade
            //     .messageSender
            //     .find(sender => sender.id === resultCfg['senderId']);

            const componentInstance_senderCfg = CommonUtils.deepCopy(this._componentInstance.config.cascade.messageSender);
            const senderCfg = componentInstance_senderCfg
                .find(sender => {

                    if (sender.id === resultCfg['senderId']) {

                        if (sender.hasOwnProperty('preCondition')) {
                            if (sender['preCondition'].hasOwnProperty('caseValue')) {
                                let item = sender['preCondition'];
                                let regularflag = true;
                                if (item.caseValue) {
                                    const reg1 = new RegExp(item.caseValue.regular);
                                    let regularData;
                                    if (item.caseValue.type) {
                                        if (item.caseValue.regularType === 'value') {
                                            regularData = item.caseValue['value'];
                                        }
                                        if (item.caseValue.type === 'successData') {
                                            // 选中行数据[这个是单值]
                                            regularData = successData[item.caseValue['valueName']];
                                        }
                                        if (item.caseValue['type'] === 'temValue') {
                                            regularData = this._componentInstance.tempValue[item.caseValue['valueName']];
                                        }
                                        if (item.caseValue['type'] === 'initValue') {
                                            regularData = this._componentInstance.initValue[item.caseValue['valueName']];
                                        }

                                    }
                                    regularflag = reg1.test(regularData);
                                }

                                // 正则校验
                                if (regularflag) {
                                    return true;
                                } else {
                                    return false;
                                }
                            } else {
                                return true;
                            }

                        } else {
                            let _sendData = [];
                            sender.sendData.forEach(sender_element => {
                                if (sender_element.hasOwnProperty('preCondition')) {
                                    if (sender_element['preCondition'].hasOwnProperty('caseValue')) {
                                        let item = sender_element['preCondition'];
                                        if (item.caseValue.hasOwnProperty('regular')) {
                                            let regularflag = true;
                                            if (item.caseValue) {
                                                const reg1 = new RegExp(item.caseValue.regular);
                                                let regularData;
                                                if (item.caseValue.type) {
                                                    if (item.caseValue.regularType === 'value') {
                                                        regularData = item.caseValue['value'];
                                                    }
                                                    if (item.caseValue.type === 'successData') {
                                                        // 选中行数据[这个是单值]
                                                        regularData = successData[item.caseValue['valueName']];
                                                    }
                                                    if (item.caseValue['type'] === 'temValue') {
                                                        regularData = this._componentInstance.tempValue[item.caseValue['valueName']];
                                                    }
                                                    if (item.caseValue['type'] === 'initValue') {
                                                        regularData = this._componentInstance.initValue[item.caseValue['valueName']];
                                                    }

                                                }
                                                regularflag = reg1.test(regularData);
                                            }

                                            // 正则校验
                                            if (regularflag) {
                                                _sendData.push(sender_element);
                                                return true;
                                            } else {
                                                return false;
                                            }
                                        } else if (item.caseValue.hasOwnProperty('hasProperty')) {
                                            if (item.caseValue) {
                                                let regularData;
                                                if (item.caseValue.type) {
                                                    if (item.caseValue.regularType === 'value') {
                                                        regularData = item.caseValue['value'];
                                                    }
                                                    if (item.caseValue.type === 'successData') {
                                                        // 选中行数据[这个是单值]
                                                        regularData = successData[item.caseValue['valueName']];
                                                    }
                                                    if (item.caseValue['type'] === 'temValue') {
                                                        regularData = this._componentInstance.tempValue[item.caseValue['valueName']];
                                                    }
                                                    if (item.caseValue['type'] === 'initValue') {
                                                        regularData = this._componentInstance.initValue[item.caseValue['valueName']];
                                                    }

                                                }
                                                if (regularData === undefined) {
                                                    regularData = null;
                                                }
                                                // 存在校验
                                                if (item.caseValue['hasProperty'] === false) {
                                                    if (regularData) {
                                                        return false;
                                                    } else {
                                                        _sendData.push(sender_element);
                                                        return true;
                                                    }
                                                } else if (item.caseValue['hasProperty'] === true) {
                                                    if (item.caseValue.hasOwnProperty('matchValue')) {
                                                        const condition = item.caseValue['condition']
                                                        if (condition === 'eq') {
                                                            if (regularData === item.caseValue['matchValue']) {
                                                                _sendData.push(sender_element);
                                                                return true;
                                                            } else {
                                                                return false;
                                                            }
                                                        } else if (condition === 'neq'){
                                                            if (regularData !== item.caseValue['matchValue']) {
                                                                _sendData.push(sender_element);
                                                                return true;
                                                            } else {
                                                                return false;
                                                            }
                                                        }
                                                    } else {
                                                        if (regularData) {
                                                            _sendData.push(sender_element);
                                                            return true;
                                                        } else {
                                                            return false;
                                                        }
                                                    }
                                                }
                                            }
                                        }


                                    } else {
                                        _sendData.push(sender_element);
                                        return true;
                                    }

                                } else {
                                    _sendData.push(sender_element);
                                }
                            });
                            sender.sendData = _sendData;
                            return true;
                        }
                    } else {
                        return false;
                    }


                });

            // tslint:disable-next-line: no-use-before-declare
            console.log('===>>37===senderCfg', senderCfg);
            senderCfg && new ComponentSenderResolver(this._componentInstance)
                .sendMessage(senderCfg, isArrayResult, successData);
        }
    }

    /**
     * 组件验证消息
     * @param validationCfg 
     * @param validationData 
     */
    public resolverDataValidationSender(validationCfg, validationData) {
        if (validationCfg['senderId']) {
            const senderCfg = this._componentInstance
                .config
                .cascade
                .messageSender
                .find(sender => sender.id === validationCfg['senderId']);
            // tslint:disable-next-line: no-use-before-declare
            senderCfg && new ComponentSenderResolver(this._componentInstance)
                .sendValidationMessage(senderCfg, validationData);
        }
    }

    /**
     * 组件数据提交错误消息
     * @param errorCfg 错误处理配置
     * @param errorData 错误数据
     */
    public resolverDataErrorSender(errorCfg, errorData) {
        if (errorCfg['senderId']) {
            const senderCfg = this._componentInstance
                .config
                .cascade
                .messageSender
                .find(sender => sender.id === errorCfg['senderId']);
            // tslint:disable-next-line: no-use-before-declare
            senderCfg && new ComponentSenderResolver(this._componentInstance)
                .sendErrorMessage(senderCfg, errorData);
        }
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
        const trigger_subscribe$ = this._componentInstance.componentService.commonRelationTrigger.subscribe(
            data => {
                if (data.viewId === currentId) {
                    new TriggerResolver(
                        data,
                        this._componentInstance
                    ).resolve();
                }
            }
        )
        return trigger_subscribe$;
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

    handleLinkType(cfg) {

        // 前置条件判断
        if (!this.conditionValidator(cfg.condition)) {
            return false;
        }
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
     * 发送验证消息
     */
    sendValidationMessage(cfg, validationData) {
        let options = {}
        for (const c of cfg.sendData) {
            // 根据前置条件判断,是否能够发送消息
            if (!this.conditionValidator(c.condition)) {
                return false;
            }

            options = this.getOptionParamsObj(c.params, validationData, false);

            this._componentInstance.componentService.commonRelationSubject.next(
                new BsnRelativesMessageModel(
                    {
                        triggerType: c.receiverTriggerType,
                        trigger: c.receiverTrigger
                    },
                    cfg.senderId,
                    { ...validationData, ...options }
                )
            )
        }
    }

    /**
     * 发送错误消息
     */
    sendErrorMessage(cfg, errorData) {
        for (const c of cfg.sendData) {
            // 根据前置条件判断,是否能够发送消息
            if (!this.conditionValidator(c.condition)) {
                return false;
            }
            this._componentInstance.componentService.commonRelationSubject.next(
                new BsnRelativesMessageModel(
                    {
                        triggerType: c.receiverTriggerType,
                        trigger: c.receiverTrigger
                    },
                    cfg.senderId,
                    errorData
                )
            )
        }
    }

    /**
     * 发送通用消息
     * @param cfg 消息配置 
     */
    sendMessage(cfg, isArray = false, data?) {
        debugger;
        for (const c of cfg.sendData) {
            // 根据前置条件判断,是否能够发送消息
            if (!this.conditionValidator(c.condition)) {
                return false;
            }
            const options = this.getOptionParamsObj(c.params, data, isArray);
            // 前置发消息判断
            let _sendData = [];
            let sendNewData = deepCopy( cfg.sendData);
            sendNewData.forEach(sender_element => {
                if (sender_element.hasOwnProperty('preCondition')) {
                    if (sender_element['preCondition'].hasOwnProperty('caseValue')) {

                        let item = sender_element['preCondition'];
                        let regularflag = true;
                        if (item.caseValue) {
                            const reg1 = new RegExp(item.caseValue.regular);
                            let regularData;
                            if (item.caseValue.type) {
                                
                                if (item.caseValue.regularType === 'value') {
                                    regularData = item.caseValue['value'];
                                }
                                if (item.caseValue.type === 'item') {
                                    // 构建消息参数
                                    console.log('111111111111111111', options);
                                    regularData = options[item.caseValue['valueName']];
                                }
                                if (item.caseValue.type === 'successData') {
                                    // 选中行数据[这个是单值]
                                    console.log('111111111111111111', data);
                                    regularData = data[item.caseValue['valueName']];
                                }
                                if (item.caseValue['type'] === 'tempValue') {
                                    regularData = this._componentInstance.tempValue[item.caseValue['valueName']];
                                }
                                if (item.caseValue['type'] === 'initValue') {
                                    regularData = this._componentInstance.initValue[item.caseValue['valueName']];
                                }

                            }
                            regularflag = reg1.test(regularData);
                        }

                        // 正则校验
                        if (regularflag) {
                            _sendData.push(sender_element);
                            return true;
                        } else {
                            return false;
                        }

                    } else {
                        _sendData.push(sender_element);
                        return true;
                    }

                } else {
                    _sendData.push(sender_element);
                }
            });
            sendNewData = _sendData;

            
            if (c.builtinId) {
                const _builtinConfig = this.findbuiltinConfig(c.builtinId);
                _builtinConfig && (options['builtinConfig'] = _builtinConfig);
            }
            console.log('send message', cfg.senderId, options, "_sendData:", sendNewData);
            if(sendNewData && sendNewData.length > 0) {
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
    }

    private findbuiltinConfig(builtinId) {
        let builtinConfig;
        if (this._componentInstance.config.builtinConfig && Array.isArray(this._componentInstance.config.builtinConfig) && this._componentInstance.config.builtinConfig.length > 0) {
            const c = this._componentInstance.config.builtinConfig.filter(cfg => cfg.id === builtinId);
            if (c && c.length > 0) {
                builtinConfig = c[0];
            }
        }
        return builtinConfig;
    }

    /**
     * 获取组件当前状态下的所有参数
     * @param paramsCfg 消息参数配置
     */
    getOptionParamsObj(paramsCfg, data?, isArray = false) {
        return this._componentInstance.buildParameters(paramsCfg, data, isArray);
    }

    /**
     * 条件验证器
     * 判断当前的操作是否能够被执行
     * @param condCfg 条件配置
     */
    private conditionValidator(condCfg): boolean {
        if (!condCfg) {
            return true;
        }
        const result = [];
        // 根据状态配置进行判断
        for (const cfg of condCfg.state) {
            switch (cfg.type) {
                case 'component':  // 根据组件属性判断
                    const componentResult = this.checkComponentProperty(cfg);
                    // 将判断后的结果加入到数组当中
                    result.push(componentResult);
                    break;
            }
        }
        // 根据数组中所有的返回结果,判断最终是否能够继续执行操作
        const _r = result.findIndex(res => !res) < 0;
        if (condCfg.result) {
            condCfg.result.forEach(element => {

                if (_r) {
                    if (element.name === 'yes') {
                        this._componentInstance[this._componentInstance.COMPONENT_METHODS[element.trigger]](element);
                    }
                } else {
                    if (element.name === 'no') {
                        this._componentInstance[this._componentInstance.COMPONENT_METHODS[element.trigger]](element);
                    }
                }
            });

        }

        return result.findIndex(res => !res) < 0;
    }

    /**
     * 验证组件属性
     * @param expCfg
     * 
     * 目前组件属性的验证属于一个大类别的验证范畴,该验证模式还可以继续进行扩展,以方便后续系统对于数据验证方面的各种要求 
     */
    private checkComponentProperty(expCfg) {
        // 判断取值的类型
        const allCheckResult = [];
        switch (expCfg.type) {
            case 'component': // 进行组件内部属性的判断
                const componentValue = this._componentInstance[this._componentInstance.COMPONENT_PROPERTY[expCfg.valueName]];
                for (const exp of expCfg.expression) {
                    switch (exp.type) {
                        case 'property': // 属性判断,通过获取当前组件中的属性和属性值,与配置条件相比较进行验证
                            // 构建比较对象
                            const valueCompareObj = this.buildMatchObject(componentValue, exp);
                            // 验证数据
                            const valueMatchResult = this.matchResolve(valueCompareObj, exp.match);
                            allCheckResult.push(valueMatchResult);
                            break;
                        case 'element':
                            const elementResult = [];
                            for (const element of componentValue) {
                                // console.log('liu______',element);
                                let new_element = element;
                                if (exp.hasOwnProperty('dataFrom')) {
                                    if (exp['dataFrom'] === 'own') { }
                                    else {
                                        new_element = element[exp['dataFrom']];
                                    }
                                }
                                const elementCompareObj = this.buildMatchObject(new_element, exp);
                                elementResult.push(this.matchResolve(elementCompareObj, exp.match));
                            }
                            const elementMatchResult = elementResult.findIndex(res => !res) < 0;
                            allCheckResult.push(elementMatchResult);
                            break;
                    }
                }
                break;
        }
        return allCheckResult.findIndex(res => !res) < 0;
    }

    /**
     * 构建验证对象
     * @param componentValue 组件数据
     * @param expCfg 配置数据
     */
    private buildMatchObject(componentValue, expCfg) {
        // 
        let value;
        if (expCfg.name) {
            value = componentValue[expCfg.name];
        } else {  // 读取自身数据
            value = componentValue;
        }
        // const value = componentValue[expCfg.name];
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


    /**
     * 表单式验证
     * 通过表达式的方式能够形成一系列的验证规则,有效的快速尽力验证逻辑
     * 目前表达式给予基本的数学逻辑验证,业务规则等其他方面的验证,有待进一步研发
     * @param compareValue 
     * @param expression 
     */
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
            case 'isNull': // 是否为null
                return !compareValue.value;
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
    // public resolve(receiverCfg) {
    //     const receiver_source$ = from(receiverCfg);
    //     const receiver_subscribe$ = receiver_source$.pipe(map(cfg => {
    //         // tslint:disable-next-line: no-use-before-declare
    //         new ComponentReceiverResolver(this._componentInstance).resolve(cfg);
    //     }));
    //     return receiver_subscribe$;
    // }
    public resolve(receiverCfg) {

        if (!this._componentInstance.subscription$) {
            this._componentInstance.subscription$ = this._componentInstance.componentService.commonRelationSubject.subscribe(
                data => {
                    receiverCfg.map(cfg => {
                        // 判断发送组件与接受组件是否一致
                        if (data.viewId === cfg.senderId) {
                            // 判断发送触发器与接受触发起是否一致
                            // new TriggerResolver(
                            //     data,
                            //     this._componentInstance
                            // ).resolve();
                            this.chooseTrigger(data, cfg);
                        }
                    });

                }
            );
        }
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
                                case 'staticComponentValue':
                                    this._componentInstance.staticComponentValue[p.cname] = data.options[p.pname];
                                    break;
                            }
                        }
                    }
                    console.log('receiver data:', data, this._componentInstance['config']['id']);
                    console.log('receiver component===================');
                    new TriggerResolver(data, this._componentInstance).resolve();
                }
            }
        }
    }
}

export class ComponentReceiverResolver {
    constructor(private _componentInstance: any) { }
    public resolve(cfg: any) {


    }




}

