import {
    Component,
    OnInit,
    Input,
    OnDestroy,
    Type,
    Inject,
    AfterViewInit,
    Output,
    EventEmitter,
    TemplateRef
} from '@angular/core';
import { CnComponentBase } from '../cn-component.base';
import { ParameterResolver } from '@shared/resolver/parameter/parameter.resolver';
import { RelationResolver } from '@shared/resolver/relation/relation.resolver';
import { filter, concatMap, mergeMap } from 'rxjs/operators';
import { Subscription, Subject, BehaviorSubject, merge, Observable } from 'rxjs';
import { CommonUtils } from '@core/utils/common-utils';
import { BSN_COMPONENT_SERVICES } from '@core/relations/bsn-relatives';
import { ComponentServiceProvider } from '@core/services/component/component-service.provider';
import { IDescriptionTrigger } from '@core/relations/bsn-trigger/description.trigger.interface';
import { CN_DESCRIPTION_METHOD } from '@core/relations/bsn-methods/bsn-description-method';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'cn-descriptions,[cn-descriptions]',
    templateUrl: './cn-descriptions.component.html'
})

export class CnDescriptionsComponent extends CnComponentBase implements OnInit, OnDestroy {

    @Input()
    public config: any;
    @Input() initData;
    @Input() tempData;

    public CURRENT_DATA;
    public COMPONENT_METHODS = CN_DESCRIPTION_METHOD;

    public descriptionItems: {
        title: string,
        text: string,
        icon: string,
        span: number
    }[];

    private _sender_source$: Subject<any>;
    private _trigger_source$: Subject<any>;

    private _receiver_subscription$: Subscription;
    private _sender_subscription$: Subscription;
    private _trigger_receiver_subscription$: Subscription;
    constructor(
        @Inject(BSN_COMPONENT_SERVICES)
        public componentService: ComponentServiceProvider
    ) {
        super(componentService);
        this.cacheValue = this.componentService.cacheService;
    }

    ngOnInit(): void {
        this._initInnerValue();
        this.resolveRelations();
        this._initDescription();
        if (this.config.loadingOnInit) {
            this.load();
        }
    }

    ngOnDestroy(): void {
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

        if (this._trigger_source$) {
            this._trigger_source$.unsubscribe();
        }

        if (this.subscription$) {
            this.subscription$.unsubscribe();
        }
    }

    public load() {
        const ajaxObj = this._findAjaxById(this.config.loadingConfig.id);
        const params = {
            ...this._buildParameters(ajaxObj.params)
        };
        this.componentService.apiService.getRequest(ajaxObj.url, ajaxObj.method, { params }).subscribe(response => {
            if (response.data) {
                this._descriptionsMappingResolve(response.data);
            } else {
                this._initDescription();
            }
        })
    }

    public getCurrentComponentId() {
        return this.config.id;
    }

    /**
     * 解析级联消息
     */
    private resolveRelations() {
        if (this.config.cascade && this.config.cascade.messageSender) {
            if (!this._sender_source$) {
                // 解析组件发送消息配置,并注册消息发送对象
                this._sender_source$ = new RelationResolver(this).resolveSender(this.config);
                this._sender_subscription$ = this._sender_source$.subscribe();
            }

        }
        if (this.config.cascade && this.config.cascade.messageReceiver) {
            // 解析消息接受配置,并注册消息接收对象
            // this._receiver_source$ = new RelationResolver(this).resolveReceiver(this.config);
            // this._receiver_subscription$ = this._receiver_source$.subscribe();
            new RelationResolver(this).resolveReceiver(this.config);
        }

        this._trigger_source$ = new RelationResolver(this).resolve();
    }

    private _findAjaxById(id) {
        return this.config.ajaxConfig.find(f => f.id === id);
    }

    private _initInnerValue() {
        if (this.tempData) {
            this.tempValue = this.tempData;
        } else {
            this.tempValue = {};
        }
        if (this.initData) {
            this.initValue = this.initData;
        } else {
            this.initValue = {};
        }
    }

    private _buildParameters(paramsCfg) {
        return ParameterResolver.resolve({
            params: paramsCfg,
            tempValue: this.tempValue,
            initValue: this.initValue,
            cacheValue: this.cacheValue,
            item: this.CURRENT_DATA
        })
    }

    private _initDescription() {
        this.descriptionItems = [];
        if (this.config.dataMapping && this.config.dataMapping.length > 0) {
            this.config.dataMapping.forEach(d => {
                const item: { title: string, text: string, icon: string, span: number } = {
                    title: d['title'],
                    text: '',
                    icon: d['icon'],
                    span: d['span']
                };

                this.descriptionItems.push(item);
            })
        }
    }

    private _descriptionsMappingResolve(data) {
        this.descriptionItems = [];
        if (this.config.dataMapping && this.config.dataMapping.length > 0) {
            this.config.dataMapping.forEach(d => {
                const item: { title: string, text: string, icon: string, span: number } = {
                    title: d['title'],
                    text: data[d['field']],
                    icon: d['icon'],
                    span: d['span']
                };

                this.descriptionItems.push(item);
            })
        }
    }
}