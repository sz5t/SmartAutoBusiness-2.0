import { CN_PROGRESS_METHOD } from './../../../core/relations/bsn-methods/bsn-progress-method';
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
    selector: 'cn-progress,[cn-progress]',
    templateUrl: './cn-progress.component.html',
    styles: [
        `
        // nz-progress {
        //     margin-right: 8px;
        //     margin-bottom: 8px;
        //     display: inline-block;
        //   }
        `
    ]
})

export class CnProgressComponent extends CnComponentBase implements OnInit, OnDestroy {

    @Input()
    public config: any;
    @Input() initData;
    @Input() tempData;
    /**
     * 作为行内显示传递的初始化数据
     */
    @Input() valueConfig;

    public CURRENT_DATA;
    public COMPONENT_METHODS = CN_PROGRESS_METHOD;

    public progressItems: {
        title?: string
        type?: string,
        percent?: number,
        showInfo?: boolean,
        status?: string,
        strokeColor?: string,
        strokeLinecap?: string,
        successPercent?: number,
        width?: number,
        strokeWidth?: number,
        gapDegree?: number,
        gapPosition?: string
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
        if (this.config.loadingOnInit) {
            this.load();
        } else {
            this._initProgress();
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
                this._progressMappingResolve(response.data);
            } else {
                this._initProgress();
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

    private _initProgress() {
        if (this.valueConfig) {
            this._progressMappingResolve([this.valueConfig.value]);
            // if (this.config.dataMapping && this.config.dataMapping.length > 0) {
            //     this.config.dataMapping.forEach((d, index) => {

            //     })
            // }
        }

    }

    /**
     * 
     * @param data 
     * [
     *  {"name": "percent","field": ""},{"name": "successPercent","field": ""},{"name": "status","field": ""}
     * }
     * ]
     */
    private _progressMappingResolve(data) {
        this.progressItems = [];
        if (data && data.length > 0) {
            data.forEach(d => {
                const dataItem = {};
                // 获取远程数据设置的进度类型字段,如果没有设置则使用默认设置的进度类型
                const type = d[this.config.typeNameKey] ? d[this.config.typeKeyName] : this.config.defaultType;
                switch (type) {
                    case 'line':
                        this._createLineProgress(d, dataItem);
                        break;
                    case 'circle':
                        this._createCircleProgress(d, dataItem);
                        break;
                    case 'dashborad':
                        this._createDashbordProgress(d, dataItem);
                        break;
                    default:
                        this._createLineProgress(d, dataItem);
                }

                this.progressItems.push(dataItem);
            })
        }
    }

    private _createLineProgress(d, dataItem) {
        this._fillProgress(d, dataItem);
        dataItem['type'] = 'line';
    }

    private _createCircleProgress(d, dataItem) {
        this._fillProgress(d, dataItem);
        dataItem['type'] = 'circle';
        dataItem['width'] = this.config.width;
    }

    private _createDashbordProgress(d, dataItem) {
        this._fillProgress(d, dataItem);
        dataItem['type'] = 'dashborad';
        dataItem['gapDegree'] = this.config.gapDegree;
        dataItem['gapPosition'] = this.config.gapPosition;
    }

    private _fillProgress(d, dataItem) {
        dataItem['showInfo'] = true;
        dataItem['strokeLinecap'] = this.config.strokeLinecap ? this.config.strokeLinecap : 'round';
        dataItem['strokeColor'] = this.config.strokeColor ? this.config.strokeColor : 'blue';
        this.config.formatProgress && (dataItem['format'] = (percent) => {
            percent + this.config.formatProgress;
        });

        this.config.dataMapping.forEach(p => {
            if (d[p['field']]) {
                dataItem[p['name']] = d[p['field']];
            }
        });
    }
}