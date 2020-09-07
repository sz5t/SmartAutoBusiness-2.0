import { BSN_RELATIVE_MESSAGE_SENDER, BSN_RELATIVE_MESSAGE_RECEIVER, BSN_RELATIVE_MESSAGE_BEHAVIOR_SENDER, BSN_RELATIVE_MESSAGE_BEHAVIOR_RECEIVER } from './../../core/relations/bsn-relatives';
import { ActivatedRoute } from '@angular/router';
import { CacheService } from '@delon/cache';
import { BsnRelativesMessageModel } from '@core/relations/bsn-relatives';
import { Subject, BehaviorSubject, Observable, Subscription, config } from 'rxjs';
import { ApiService } from '@core/services/api/api-service';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { Inject, Optional, Type } from '@angular/core';
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

    private _staticComponentValue: any;
    public get staticComponentValue(): any {
        return this._staticComponentValue ? this._staticComponentValue : {};
    }
    public set staticComponentValue(value: any) {
        this._staticComponentValue = value;
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

    public asyncBefore(target, method, advice) {
        const original = target[method];
        target[method] = (async (...args) => {
            const result = await advice(args);
            if (result) {
                original.apply(target, args);
            }
        });
        return target;
    }

    public asyncAfter(target, method, advice) {
        const original = target[method];
        target[method] = (async (...args) => {
            const result = await original.apply(target, args);
            if (result) {
                advice(args);
            }
        })
    }

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
            nzCancelText: confirmCfg.cancelText ? confirmCfg.cancelText : 'cancel',
            nzOkText: confirmCfg.okText ? confirmCfg.okText : 'OK',
            nzOnOk: () => {
                if (callback) {
                    callback();
                }
            }

        }
        this._componentService.modalService.confirm(confirmOptional);
    }

    public dialog(option) {
        console.log(option);

    }

    public createMessage() {
        const messageOptional = {}
        this._componentService.modalService.create(messageOptional);
    }


    public  async getCustomConfig(customConfigId?){
        const response = await  this._componentService.apiService.post('resource/B_P_C_CONFIG_PAGE_ALL/operate', { "PageId": customConfigId }).toPromise();
      
        if(response['data']){
         if (response['data']._procedure_resultset_1[0]['W'] === "") {
          // this.config = null;
         }
         else {
           const pageJson = JSON.parse(response['data']._procedure_resultset_1[0]['W']);
           for (const key in pageJson) {
             if (pageJson.hasOwnProperty(key)) {
               // 判断是否时主页面配置,如果是主页面配置,则直接进行页面解析
               if (key === customConfigId) {
               //  this.config = pageJson[customConfigId]['layoutJson'];
                 const componentJson = pageJson[customConfigId]['componentsJson']
                 if (Array.isArray(componentJson) && componentJson.length > 0) {
                   componentJson.forEach(json => {
                     this._componentService.cacheService.set(json['id'], json);
                   });
                 }
   
                 this._componentService.cacheService.set(key, pageJson[customConfigId]);
                 
               } else {
                 // 将子页面的配置加入缓存, 后期使用子页面数据时直接从缓存中获取
                 this._componentService.cacheService.set(key, pageJson[key]);
                 const componentJson = pageJson[key]['componentsJson']
                 if (Array.isArray(componentJson) && componentJson.length > 0) {
                   componentJson.forEach(json => {
                     this._componentService.cacheService.set(json['id'], json);
                   });
                 }
   
               }
             }
           }
         }
       
        }
     }


}