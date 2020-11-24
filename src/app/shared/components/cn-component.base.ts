import { BSN_RELATIVE_MESSAGE_SENDER, BSN_RELATIVE_MESSAGE_RECEIVER, BSN_RELATIVE_MESSAGE_BEHAVIOR_SENDER, BSN_RELATIVE_MESSAGE_BEHAVIOR_RECEIVER } from './../../core/relations/bsn-relatives';
import { ActivatedRoute } from '@angular/router';
import { CacheService } from '@delon/cache';
import { BsnRelativesMessageModel } from '@core/relations/bsn-relatives';
import { Subject, BehaviorSubject, Observable, Subscription, config } from 'rxjs';
import { ApiService } from '@core/services/api/api-service';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { Inject, Optional, Type } from '@angular/core';
import { ComponentServiceProvider } from '@core/services/component/component-service.provider';
import { pageConfigCache } from '@env/page-config-cache';
import { CommonUtils } from '@core/utils/common-utils';
import { environment } from '@env/environment';

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

    private _userValue: any;
    public get userValue(): any {
        return this._userValue ? this._userValue : {};
    }
    public set userValue(value: any) {
        this._userValue = value;
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

    constructor(private _componentService: ComponentServiceProvider) { 

        this.userValue= _componentService.cacheService.getNone('userInfo')
        ? _componentService.cacheService.getNone('userInfo')
        : {};

    }

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


    // 获取配置
    public  async getCustomConfig(customConfigId?){

          if (environment['systemSettings'] && environment['systemSettings']['systemMode'] === 'work') {
            const response = await  this._componentService.apiService.post('resource/B_P_C_CONFIG_PAGE_ALL_NEW/operate', { "PageId": customConfigId }).toPromise();
      
            if(response && response['data']){
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
                   // liu 20.11.12
                   this.setCache(key, 'mainPage', pageJson[key]['config'], pageJson[key]['permission']);
                     
                   } else {
                     // 将子页面的配置加入缓存, 后期使用子页面数据时直接从缓存中获取
    
                     this.setCache(key, 'childPage', pageJson[key]['config'], pageJson[key]['permission']);

       
                   }
                 }
               }
             }
           
            }
          }
          else{
            const response = await  this._componentService.apiService.post('resource/B_P_C_CONFIG_PAGE_ALL/operate', { "PageId": customConfigId }).toPromise();
      
            if(response && response['data']){
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
                   // liu 20.11.12
                     this.setCache(key,'childPage',pageJson[customConfigId],null);
                     
                   } else {
                     // 将子页面的配置加入缓存, 后期使用子页面数据时直接从缓存中获取
    
                     this.setCache(key,'childPage', pageJson[key],null);

       
                   }
                 }
               }
             }
           
            }
          }

     }


     // 写入缓存
     public setCache(layoutId?,type?,configData?,permissionData?):any{

        let page_config_data={};
        let page_permission_data={};
      
        if(configData['layoutJson']){
            page_config_data[layoutId] = configData['layoutJson'];
        } else {
            page_config_data[layoutId] = configData;
        }

        const componentJson = configData['componentsJson']
        if (Array.isArray(componentJson) && componentJson.length > 0) {
          componentJson.forEach(json => {
            // 组件信息
            page_config_data[json['id']]= json;
          });
        }

        const componentsPermissionJson = permissionData;
        if (Array.isArray(componentsPermissionJson) && componentsPermissionJson.length > 0) {
          componentsPermissionJson.forEach(json => {
            // 组件信息
            page_permission_data[json['id']] = json;
          });
        }
        
        const activeMenu = this._componentService.cacheService.getNone('activeMenu');
        // 2.从当前缓存下查找当前menu的配置集合
        let menuId = activeMenu['id'];
        let activeConfig = this._componentService.cacheService.getNone('menuId');
        // 3.层级是否控制在布局页面结构
        if(!activeConfig){
          activeConfig= {pageConfig:{},permissionConfig:{}};
        }
        if(!activeConfig['pageConfig']){
          activeConfig['pageConfig']={};
        }
        if(!activeConfig['permissionConfig']){
          activeConfig['permissionConfig']={};
        }
      
        if(activeConfig['pageConfig']){
          activeConfig['pageConfig']={...activeConfig['pageConfig'],...page_config_data}
        }
        if(activeConfig['permissionConfig']){
          activeConfig['permissionConfig']={...activeConfig['permissionConfig'],...page_permission_data}
        }
      
        // 将缓存数据写入
        pageConfigCache[menuId]['pageConfig'] = {...pageConfigCache[menuId]['pageConfig'], ...page_config_data};
       // this._componentService.cacheService.set(menuId,activeConfig);
        return true;
      
     }

     // 获取当前组件配置（从缓存读取组件信息）
    public getMenuComponentConfigById(id):any {
        // 1.加载当前menu下的缓存信息
        const activeMenu = this._componentService.cacheService.getNone('activeMenu');
        // 2.从当前缓存下查找当前menu的配置集合
        let menuId = activeMenu['id'];
       // const activeConfig = this._componentService.cacheService.getNone(menuId);
        // 3.层级是否控制在布局页面结构
        // this.layoutId  布局页面id 也就是子页标识
        // activeConfig= {pageConfig:{},permissionConfig:{}};
        // 4.从当前menu配置集合中查找相应组件的详细配置信息
        let componentConfig =null;
        if( pageConfigCache[menuId]['pageConfig'][id]) {
            componentConfig = CommonUtils.deepCopy(pageConfigCache[menuId]['pageConfig'][id]);
        }
        return componentConfig;
    }

         // 获取当前组件权限配置（从缓存读取组件权限信息）
         public getMenuComponentPermissionConfigById(id):any {
            // 1.加载当前menu下的缓存信息
            const activeMenu = this._componentService.cacheService.getNone('activeMenu');
            // 2.从当前缓存下查找当前menu的配置集合
            let menuId = activeMenu['id'];
           // const activeConfig = this._componentService.cacheService.getNone(menuId);
            // 3.层级是否控制在布局页面结构
            // this.layoutId  布局页面id 也就是子页标识
            // activeConfig= {pageConfig:{},permissionConfig:{}};
            // 4.从当前menu配置集合中查找相应组件的详细配置信息
            let componentConfig =null;
            if( pageConfigCache[menuId]['permissionConfig'][id]) {
                componentConfig = CommonUtils.deepCopy(pageConfigCache[menuId]['permissionConfig'][id]);
            }
            return componentConfig;
        }


    


}