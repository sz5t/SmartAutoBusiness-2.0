import { CN_STEPS_METHOD } from './../../../core/relations/bsn-methods/bsn-steps-method';
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
    selector: 'cn-steps,[cn-steps]',
    templateUrl: './cn-steps.component.html',
    styles: [
        `
        .steps-content {
            margin-top: 16px;
            border: 1px dashed #e9e9e9;
            border-radius: 6px;
            background-color: #fafafa;
            min-height: 200px;
            
            padding: 8px;

          }
          .steps-content-grid {
            margin-top: 16px;
            border: 1px dashed #e9e9e9;
            border-radius: 6px;
            background-color: #fafafa;
            min-height: 200px;
            
            padding: 8px;
            display:grid;
          }

          .alert {
            margin-top:10px;
          }
          .alert-grid {
            margin-top: 10px;
            display: grid;
          }
    
          .steps-action {
            margin-top: 24px;
          }
    
          button {
            margin-right: 8px;
          }
          .float_left {
              float:left;
              padding-left: 20px;padding-right: 20px;
          }
          .float_none {
            padding-left: 20px;padding-right: 20px;
          }
        `
    ]
})

export class CnStepsComponent extends CnComponentBase implements OnInit, OnDestroy {

    @Input()
    public config: any;
    @Input() initData;
    @Input() tempData;

    public CURRENT_DATA;
    public CURRENT_DATA_SET;
    public COMPONENT_METHODS = CN_STEPS_METHOD;
    public showAlert = false;
    public stepItems: {
        title?: string,
        desc?: string,
        icon?: string,
        subTitle?: string,
        status?: string
    }[];

    public current = 0;
    public currentViews;

    public CLICKABLE_STEP:{
        index?: number,
        status?: string
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
        this.currentViews = this.config.stepViews.filter(v => v.id === this.config.stepViews[this.current].id);
        this._initInnerValue();
        this.resolveRelations();
        this._initSteps();
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

                this._stepsDataMappingResolve(response.data);
                if (response.data.length > 0) {
                    this.CURRENT_DATA_SET = response.data;
                    this.CURRENT_DATA = response.data[0];
                    this.innerParamsResolve(this.config.innerParams);
                }
            } else {
                this._initSteps();
            }
        })
    }



    public changeIndexAsRefresh() {

    }

    public changeIndexAsReplace() {

    }

    public onIndexChange(index) {
        this.current = index;
        if (!this.config.loadingOnInit) {
            this.CURRENT_DATA_SET = this.stepItems;
        }
        this.CURRENT_DATA = this.CURRENT_DATA_SET[index];
        if (this.config.stepMapping) {

            this._stepMappingResolve();
        } else {
            if (!this.currentViews || this.currentViews.length > 0) {
                const step = this.config.stepViews[index] ? this.config.stepViews[index] : this.config.stepViews[0];

                // this.showAlert = !this.showAlert;
                this.currentViews = this.config.stepViews.filter(v => v.id === step.id);
            }
        }
        this.innerParamsResolve(this.config.innerParams);
    }

    public nextStep() {
        if(this.current + 1 < this.config.stepViews.length) {
            const nextStep = this.current + 1;
            this.onIndexChange (nextStep);
        }
    }

    public getCurrentComponentId() {
        return this.config.id;
    }

    private innerParamsResolve(innerParams) {
        if (innerParams && innerParams.length > 0) {
            for (const p of innerParams) {
                switch (p.valueTo) {
                    case 'tempValue':
                        this.tempValue[p.name] = this.CURRENT_DATA[p.valueName];
                        break;
                    case 'initValue':
                        this.initValue[p.name] = this.CURRENT_DATA[p.valueName];
                        break;
                }
            }
        }
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

    private _initSteps() {
        // this.stepItems = [];
        // if (this.config.dataMapping && this.config.dataMapping.length > 0) {
        //     this.config.dataMapping.forEach(d => {
        //         const item: {
        //             title: string,
        //             desc?: string,
        //             icon?: string,
        //             subTitle?: string,
        //             status?: string
        //         } = {
        //             title: d['title'],
        //             subTitle: d['subTitle'],
        //             desc: d['desc'],
        //             icon: d['icon'] ? d['icon'] : null
        //         };

        //         this.stepItems.push(item);
        //     })
        // }
        this.stepItems = this.config.stepItems ? this.config.stepItems : [];
    }

    private _stepsDataMappingResolve(data) {
        this.stepItems = [];
        data.forEach(res => {
            const dataItem = {};
            if (this.config.dataMapping && this.config.dataMapping.length > 0) {
                this.config.dataMapping.forEach((d, index) => {
                    if (res[d['field']]) {
                        dataItem[d['name']] = res[d['field']];
                        this._stepStatusMappingResolve(dataItem, res)

                    }
                })
            }


            this.stepItems.push(dataItem);
        });
    }

    private _stepMappingResolve() {
        if (this.config.stepMapping && this.config.stepMapping.length > 0) {
            this.config.stepMapping.forEach(m => {
                if (this.CURRENT_DATA[m.field] && this.CURRENT_DATA[m.field] === m.value) {
                    this.currentViews = this.config.stepViews.filter(v => v.id === m.targetId);
                }
            })
        }
    }

    private _stepStatusMappingResolve(dataItem, data) {
        if (this.config.stepStatusMapping) {
            for (const s in this.config.stepStatusMapping) {
                if (this.config.stepStatusMapping.hasOwnProperty(s)) {
                    const status = this._getStatus(this.config.stepStatusMapping[s], data);
                    if (s === 'await' && status) {
                        dataItem['status'] = 'await';
                    }
                    if (s === 'process' && status) {
                        dataItem['status'] = 'process';
                    }
                    if (s === 'finish' && status) {
                        dataItem['status'] = 'finish';
                    }
                    if (s === 'error' && status) {
                        dataItem['status'] = 'error';
                    }
                    // switch (s) {
                    //     case 'await':
                    //         if (status) {
                    //             dataItem['status'] = 'await';
                    //             return;
                    //         }
                    //         break;
                    //     case 'process':
                    //         if (status) {
                    //             dataItem['status'] = 'await';
                    //             return;
                    //         }
                    //         break;
                    //     case 'finish':
                    //         if (status) {
                    //             dataItem['status'] = 'await';
                    //             return;
                    //         }
                    //         break;
                    //     case 'error':
                    //         if (status) {
                    //             dataItem['status'] = 'await';
                    //             return;
                    //         }
                    //         break;
                    //     default:
                    //         dataItem['status'] = 'await';
                    // }
                }
            }
            console.log(dataItem);
        }
    }

    private _getStatus(awaitCfg, data) {
        let status: boolean;
        awaitCfg.forEach(s => {
            if (data[s['field']] && data[s['field']] === s['value']) {
                status = true;
            } else if (data[s['field']] && data[s['field']] !== s['value']) {
                status = false;
            }
        })
        return status;
    }


    private _processStatus() {

    }

    /**
     * onlyStepOnIndexChange 只有step步骤条的点击事件
     */
    public onlyStepOnIndexChange(index) {
        this.pushClickedStep(this.current);
        if (this.config.disorder) {
            this.current = index;
            this.tempValue['CURRENT_STEP'] = this.current
            this.assignCurrentStepStatus(this.current);
            return true;
        } else if (!this.config.disorder) {
            if (this.CLICKABLE_STEP.findIndex(e => e['index'] === index) > -1) {
                this.current = index;
                this.tempValue['CURRENT_STEP'] = this.current
                this.assignCurrentStepStatus(this.current);
                return true;
            }
        }
    }

    /**
     * onlyNextStep
     */
    public onlyNextStep() {
        if (!this.current) {
            this.current = 0;
        }
        this.pushClickedStep(this.current);
        if(this.current + 1 < this.config.stepItems.length) {
            const nextStep = this.current + 1;
            this.onlyStepOnIndexChange (nextStep);
        }
    }

    /**
     * pushClickedStep 记录已经点击过的节点序号
     */
    public pushClickedStep(index) {
        if (this.CLICKABLE_STEP) {
            if (this.CLICKABLE_STEP.findIndex(e => e['index'] === index) === -1) {
                this.CLICKABLE_STEP.push({'index': index, 'status': 'edit'})
            }
        } else {
            this.CLICKABLE_STEP = [];
            this.CLICKABLE_STEP.push({'index': index, 'status': 'edit'})
        }
    }

    /**
     * assignCurrentStepStatus 给当前步骤赋状态值 new第一次编辑和edit修改状态
     */
    public assignCurrentStepStatus(index) {
        if (this.CLICKABLE_STEP) {
            if (this.CLICKABLE_STEP.findIndex(e => e['index'] === index) === -1) {
                this.tempValue['CURRENT_STEP_STATUS'] = 'new'
            } else {
                this.tempValue['CURRENT_STEP_STATUS'] = 'edit'
            }
        }
    }

    /**
     * buildParameters 构建参数
     */
    public buildParameters(paramsCfg, data?, isArray = false) {
        let parameterResult: any | any[];
        if (!isArray && !data) {
            parameterResult = ParameterResolver.resolve({
                params: paramsCfg,
                tempValue: this.tempValue,
                initValue: this.initValue,
                cacheValue: this.cacheValue,
                router: this.routerValue,
                outputValue: data,
                returnValue: data

            });
        } else if (!isArray && data) {
            if (data['_procedure_resultset_1']) {
                data ={...data['_procedure_resultset_1'][0],...data};
            }
            parameterResult = ParameterResolver.resolve({
                params: paramsCfg,
                tempValue: this.tempValue,
                item: data,
                initValue: this.initValue,
                cacheValue: this.cacheValue,
                router: this.routerValue,
                addedRows: data,
                editedRows: data,
                validation: data,
                returnValue: data,
                outputValue: data,
            });
        } else if (isArray && data && Array.isArray(data)) {
            parameterResult = [];
            data.map(d => {
                const param = ParameterResolver.resolve({
                    params: paramsCfg,
                    tempValue: this.tempValue,
                    componentValue: d,
                    item: d,
                    initValue: this.initValue,
                    cacheValue: this.cacheValue,
                    router: this.routerValue,
                    addedRows: d,
                    editedRows: d,
                    validation: d,
                    returnValue: d,
                    outputValue: data
                });
                parameterResult.push(param);
            })
        }
        return parameterResult;
    }
}
