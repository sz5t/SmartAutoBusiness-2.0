import { BSN_RELATIVE_MESSAGE_SENDER, BSN_RELATIVE_MESSAGE_RECEIVER, BSN_RELATIVE_MESSAGE_BEHAVIOR_SENDER, BSN_RELATIVE_MESSAGE_BEHAVIOR_RECEIVER } from './../../core/relations/bsn-relatives';
import { ActivatedRoute } from '@angular/router';
import { CacheService } from '@delon/cache';
import { BsnRelativesMessageModel } from '@core/relations/bsn-relatives';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
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
        if (this._componentService.commonRelationReceiver) {
            this._componentService.commonRelationReceiver.unsubscribe();
        }
        if (this._componentService.commonRelationSender) {
            this._componentService.commonRelationSender.unsubscribe();
        }
        if (this._componentService.behavoirRelationReceiver) {
            this._componentService.behavoirRelationReceiver.unsubscribe();
        }
        if (this._componentService.behavoirRelationSender) {
            this._componentService.behavoirRelationSender.unsubscribe();
        }
    }

    // #endregion


}