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
     * @param messageSenderCfg 
     */
    public resolveSender(messageSenderCfg) {
        // tslint:disable-next-line: no-use-before-declare
        return new SenderResolver(this._componentInstance).resolve(messageSenderCfg);
    }

    /**
     * 解析消息接受器
     * @param messageReceiverCfg 
     */
    public resolveReceiver(messageReceiverCfg) {
        // tslint:disable-next-line: no-use-before-declare
        return new ReceiverResolver(this._componentInstance).resolve(messageReceiverCfg);
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
        // this.sendMessage(cfg);
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
                    console.log('relative message', data);
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

