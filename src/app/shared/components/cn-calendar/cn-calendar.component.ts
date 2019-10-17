import { CN_CALENDAR_METHOD } from './../../../core/relations/bsn-methods/bsn-calendar-method';
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
import { Subscription, Subject, BehaviorSubject, merge, Observable, from, of } from 'rxjs';
import { CommonUtils } from '@core/utils/common-utils';
import { BSN_COMPONENT_SERVICES } from '@core/relations/bsn-relatives';
import { ComponentServiceProvider } from '@core/services/component/component-service.provider';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'cn-calendar,[cn-calendar]',
    templateUrl: './cn-calendar.component.html',
    styles: [
        `
           ul {
               padding: 0;
           }
           ul li {
            //padding-bottom:3px;
           }
           ul li .calendar_list {
                list-style: none;
                
            }
        
        `
    ]
})

export class CnCalendarComponent extends CnComponentBase implements OnInit, OnDestroy {

    @Input()
    public config: any;
    @Input() initData;
    @Input() tempData;

    public CURRENT_DATA;
    public COMPONENT_METHODS = CN_CALENDAR_METHOD;

    public date = new Date();
    public mode = 'month';

    public listOfData: Observable<any>;
    public listData = {};

    public itemData: {
        title?: string,
        value?: string,
        icon?: string,
        style?: any,
        prefix?: string,
        suffix?: string
    }[];

    private _dateCount;
    private colors = ['blue', 'orange', 'red', 'geekblue', '#2db7f5', 'gold', 'green', 'cyan', 'purple', '#f50', 'lightgreen', '#87d068', '#108ee9']

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
        this._dateCount = this._getCountDays();
        this._initInnerValue();
        this.resolveRelations();
        if (this.config.loadingOnInit) {
            this.load();
        }
    }






    // public async listOfData(date) {
    //     console.log(date);
    //     return [{ type: 'success', content: date }];
    // }

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
        this._dateCount = this._getCountDays();
        const ajaxObj = this._findAjaxById(this.config.loadingConfig.id);
        const params = {
            ...this._setDateParamter(),
            ...this._buildParameters(ajaxObj.params)
        };
        this.componentService.apiService.getRequest(ajaxObj.url, ajaxObj.method, { params }).subscribe(response => {
            if (response.data && response.data.length > 0) {
                this._dateResolve(response.data);
                // this._stepsDataMappingResolve(response.data);
            } else {
                // this._initStatistic();
            }
        })
    }

    public getCurrentComponentId() {
        return this.config.id;
    }

    private _dateResolve(result) {
        const curMonth = this.date.getMonth() + 1;
        const curYear = this.date.getFullYear();
        for (let i = 1, len = this._dateCount; i <= len; i++) {
            const cellStartDate = new Date(`${curYear}-${curMonth}-${i}`); // new Date(curYear, curMonth, s);
            // const cellEndDate = new Date(`${curYear}-${curMonth}-${this._dateCount}`)// new Date(curYear, curMonth, dateSet);
            this.listData['s' + curYear + curMonth + i] = [];
            result.forEach((d, index) => {

                const itemData = {};
                if (this.config.dataMapping && this.config.dataMapping.length > 0) {
                    this.config.dataMapping.forEach(m => {
                        itemData[m['name']] = d[m['field']];
                    });
                }

                const sd = new Date(itemData['start']);
                const ed = new Date(itemData['end'])
                if ((sd <= cellStartDate) && (ed >= cellStartDate)) {
                    itemData['color'] = this.colors[index];
                    this._descMappingResolve(d, itemData);
                    this.listData['s' + curYear + curMonth + i].push(itemData);
                }

            })
        }
    }

    private _descMappingResolve(data, itemData) {
        if (this.config.descMapping && this.config.descMapping.length > 0) {
            itemData['itemDescriptions'] = []
            this.config.descMapping.forEach(s => {
                const desc = {};
                desc['descText'] = data[s['field']];
                desc['descTitle'] = s['title'];
                desc['span'] = s['span'];
                itemData['itemDescriptions'].push(desc);
            })
        }
    }



    // public listOfData(date): any[] {
    //     console.log(date);
    //     return [{ type: 'success', content: '1-2-3' }];
    // }

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

    public panelChange(change: { date: Date; mode: string }): void {
        console.log('panel change');
    }

    public selectedChange(select: Date): void {
        this.date = select;
        this.load();
    }

    private _getCountDays() {
        const curDate = this.date;
        const curMonth = curDate.getMonth();
        curDate.setMonth(curMonth + 1);
        curDate.setDate(0);
        return curDate.getDate();
    }


    private _setDateParamter() {
        const year = this.date.getFullYear();
        const month = this.date.getMonth() + 1 < 10 ? `0${this.date.getMonth() + 1}` : this.date.getMonth() + 1;
        const params = {};
        params[this.config.startField] = `ge(${year}-${month}-01)`;
        params[this.config.endField] = `le(${year}-${month}-${this._dateCount})`;
        return params;
    }

    // private _initStatistic() {
    //     this.itemData = [{
    //         title: '未加载数据',
    //         value: '0'
    //     }];
    // }

    // private _stepsDataMappingResolve(data) {
    //     this.itemData = [];
    //     data.forEach(res => {
    //         const dataItem = {};
    //         if (this.config.dataMapping && this.config.dataMapping.length > 0) {
    //             this.config.dataMapping.forEach((d, index) => {
    //                 if (res[d['field']]) {
    //                     this._itemPerfixResolve(res, dataItem);
    //                     this._itemSuffixResolve(res, dataItem);
    //                     dataItem[d['name']] = res[d['field']];

    //                 }
    //             })
    //         }
    //         this.itemData.push(dataItem);
    //     });
    // }

    // private _itemStyleResolve() {

    // }

    // private _itemSuffixResolve(data, dataItem) {
    //     let suffix;
    //     if (this.config.suffixMapping) {
    //         this.config.suffixMapping.forEach(p => {
    //             if (data[p['field']] === p['fieldValue']) {
    //                 suffix = p['suffix'];
    //             }
    //         })
    //     }
    //     if (suffix) {
    //         dataItem['suffix'] = suffix;
    //     }
    // }

    // private _itemPerfixResolve(data, dataItem) {
    //     let prefix;
    //     if (this.config.prefixMapping) {
    //         this.config.prefixMapping.forEach(p => {
    //             if (data[p['field']] === p['fieldValue']) {
    //                 prefix = p['prefix'];
    //             }
    //         })
    //     }
    //     if (prefix) {
    //         dataItem['prefix'] = prefix;
    //     }
    // }

}