import { InjectionToken, Inject } from '@angular/core';

/**
 * 消息发送者标识(通用)
 */
export const BSN_RELATIVE_MESSAGE_SENDER = new InjectionToken<string>('BSN_RELATIVE_MESSAGE_SENDER');

/**
 * 消息接收者标识(通用)
 */
export const BSN_RELATIVE_MESSAGE_RECEIVER = new InjectionToken<string>('BSN_RELATIVE_MESSAGE_RECEIVER');

/**
 * 消息发送者标识(发现)
 */
export const BSN_RELATIVE_MESSAGE_BEHAVIOR_SENDER = new InjectionToken<string>('BSN_RELATIVE_MESSAGE_BEHAVIOR_SENDER');
/**
 * 消息接收者标识(发现)
 */
export const BSN_RELATIVE_MESSAGE_BEHAVIOR_RECEIVER = new InjectionToken<string>('BSN_RELATIVE_MESSAGE_BEHAVIOR_RECEIVER');

/**
 * 组件通用全服务
 */
export const BSN_COMPONENT_SERVICES = new InjectionToken<string>('BSN_COMPONENT_SERVICES');


export const BSN_RELATION_SUBJECT = new InjectionToken<string>('BSN_RELATION_SUBJECT');

export const BSN_RELATION_TRIGGER = new InjectionToken<string>('BSN_RELATION_TRIGGER');
/**
 * 业务消息模型
 */
export class BsnRelativesMessageModel {
    constructor(
        public trigger: { triggerType: string, trigger: string },
        public viewId: string,
        public options?: any
    ) { }
}