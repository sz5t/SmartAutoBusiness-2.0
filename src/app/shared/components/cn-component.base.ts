import { BSN_RELATIVE_MESSAGE_SENDER, BSN_RELATIVE_MESSAGE_RECEIVER, BSN_RELATIVE_MESSAGE_BEHAVIOR_SENDER, BSN_RELATIVE_MESSAGE_BEHAVIOR_RECEIVER } from './../../core/relations/bsn-relatives';
import { ActivatedRoute } from '@angular/router';
import { CacheService } from '@delon/cache';
import { BsnRelativesMessageModel } from '@core/relations/bsn-relatives';
import { Subject, BehaviorSubject, Observable, Subscription, config } from 'rxjs';
import { ApiService } from '@core/services/api/api-service';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { Inject } from '@angular/core';
import { ComponentServiceProvider } from '@core/services/component/component-service.provider';

export interface InnerValue {
    tempValue: any;
    initValue: any;
    cacheValue: any;
}

export interface ICommonOperations {
    beforeOperations(config: any): Observable<any>;
    operations(config: any): Observable<any>;
    afterOperations(config: any): Observable<any>;
}

export class CnComponentBase {
    private _initValue: any;
    public get initValue(): any {
        return this._initValue ? this._initValue : {};
    }
    public set initValue(value: any) {
        this._initValue = value;
    }
    private _tempValue: any;
    public get tempValue(): any {
        return this._tempValue ? this._tempValue : {};
    }
    public set tempValue(value: any) {
        this._tempValue = value;
    }
    private _cacheValue: any;
    public get cacheValue(): any {
        return this._cacheValue ? this._cacheValue : {};
    }
    public set cacheValue(value: any) {
        this._cacheValue = value;
    }
    private _routerValue: any;
    public get routerValue(): any {
        return this._routerValue ? this._routerValue : {};
    }
    public set routerValue(value: any) {
        this._routerValue = value;
    }

    private _cascadeValue: any;
    public get cascadeValue(): any {
        return this._cascadeValue ? this._cascadeValue : {};
    }
    public set cascadeValue(value: any) {
        this._cascadeValue = value;
    }



    private _subscription$: Subscription;
    public get subscription$(): Subscription {
        return this._subscription$;
    }
    public set subscription$(value: Subscription) {
        this._subscription$ = value;
    }

    private _trigger_subscription$: Subscription;
    public get trigger_subscription$(): Subscription {
        return this._trigger_subscription$;
    }
    public set trigger_subscription$(value: Subscription) {
        this._trigger_subscription$ = value;
    }

    constructor(private _componentService: ComponentServiceProvider) { }

    // #region 消息定义
    // private _commonRelationSender: Subject<BsnRelativesMessageModel>;
    // /**
    //  * 通用消息发送者
    //  */
    // public get commonRelationSender(): Subject<BsnRelativesMessageModel> {
    //     return this._commonRelationSender;
    // }
    // public set commonRelationSender(value: Subject<BsnRelativesMessageModel>) {
    //     this._commonRelationSender = value;
    // }
    // private _commonRelationReceiver: Subject<BsnRelativesMessageModel>;
    // /**
    //  * 通用消息接收者
    //  */
    // public get commonRelationReceiver(): Subject<BsnRelativesMessageModel> {
    //     return this._commonRelationReceiver;
    // }
    // public set commonRelationReceiver(value: Subject<BsnRelativesMessageModel>) {
    //     this._commonRelationReceiver = value;
    // }
    // private _behavoirRelationSender: BehaviorSubject<BsnRelativesMessageModel>;
    // /**
    //  * 延迟消息发送者
    //  */
    // public get behavoirRelationSender(): BehaviorSubject<BsnRelativesMessageModel> {
    //     return this._behavoirRelationSender;
    // }
    // public set behavoirRelationSender(value: BehaviorSubject<BsnRelativesMessageModel>) {
    //     this._behavoirRelationSender = value;
    // }
    // private _behavoirRelationReceiver: BehaviorSubject<BsnRelativesMessageModel>;
    // /**
    //  * 延迟消息接收者
    //  */
    // public get behavoirRelationReceiver(): BehaviorSubject<BsnRelativesMessageModel> {
    //     return this._behavoirRelationReceiver;
    // }
    // public set behavoirRelationReceiver(value: BehaviorSubject<BsnRelativesMessageModel>) {
    //     this._behavoirRelationReceiver = value;
    // }

    /**
     * 注销接收者与发送者
     */
    public unsubscribeRelation() {
        if (this.subscription$) {
            this.subscription$.unsubscribe();
        }
        if (this.trigger_subscription$) {
            this.trigger_subscription$.unsubscribe();
        }
    }

    // #endregion


    public before(target, method, advice) {
        const original = target[method];
        target[method] = (...args) => {
            const result = advice(args);
            if (result) {
                original.apply(target, args);
            }
        };
        return target;
    }

    public after(target, method, advice) {
        const original = target[method];
        target[method] = (...args) => {
            original.apply(target, args) && advice(args);

        };
        return target;
    }

    public around(target, method, advice) {
        const original = target[method];
        target[method] = (...args) => {
            advice(args);
            original.apply(target, args);
            advice(args);
        };
        return target;
    }

    public confirm(confirmCfg, callback) {
        const confirmOptional = {
            nzTitle: confirmCfg.title ? confirmCfg.title : '',
            nzContent: confirmCfg.content ? confirmCfg.content : '',
            nzOnOK: () => {
                if (callback) {
                    callback();
                }
            }
        }
        this._componentService.modalService.confirm(confirmOptional);
    }

    public createMessage() {
        const messageOptional = {}
        this._componentService.modalService.create(messageOptional);
    }


}