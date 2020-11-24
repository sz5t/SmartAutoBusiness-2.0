import { API_SERVICE_METHOD } from './../../../core/relations/bsn-status';
import { mergeMap, scan, filter, toArray } from 'rxjs/operators';
import { NzModalService, NzMessageComponent, NzMessageService } from 'ng-zorro-antd';
import { CommonUtils } from './../../../core/utils/common-utils';
import { ApiService } from '@core/services/api/api-service';
import { InnerValue } from '@shared/components/cn-component.base';
import { ParameterResolver } from '../parameter/parameter.resolver';
import { Observable, from, of, forkJoin } from 'rxjs';
import { fromPromise } from 'rxjs/internal/observable/fromPromise';
import { every } from 'rxjs/internal/operators/every';
import { concatMap } from 'rxjs/internal/operators/concatMap';
import { concat } from 'rxjs/internal/operators/concat';
import { CacheService } from '@delon/cache';

export class BeforeOperationResolver implements InnerValue {
    tempValue: any;
    initValue: any;
    cacheValue: any;
    beforeOperationCfg: any;
    private _cacheService: CacheService;
    constructor(
        private _config: any,
        private _initValue: any,
        private _cacheValue: any,
        private _tempValue: any,
        private _apiService?: ApiService,
        private _modal?: NzModalService,
        private _message?: NzMessageService,
    ) {
        this.tempValue = _tempValue;
        this.initValue = _initValue;
        this.cacheValue = _cacheValue;
        this.beforeOperationCfg = _config;
        this.resolverBeforeOperation();
    }
    private _beforeOperationMap: Map<string, any>;
    public get beforeOperationMap() {
        return this._beforeOperationMap;
    }
    public set beforeOperationMap(value) {
        this._beforeOperationMap = value;
    }
    private _operationItemData;
    public get operationItemData() {
        return this._operationItemData;
    }
    public set operationItemData(value) {
        this._operationItemData = value;
    }

    private _operationItemsData;
    public get operationItemsData() {
        return this._operationItemsData;
    }
    public set operationItemsData(value) {
        this._operationItemsData = value;
    }

    private buildParameter(paramsCfg, value) {
        const params = ParameterResolver.resolve({
            params: paramsCfg,
            item: value,
            componentValue: value,
            tempValue: this.tempValue,
            initValue: this.initValue,
            cacheValue: this.cacheValue,
            userValue:this._cacheService.getNone('userInfo')
            ? this._cacheService.getNone('userInfo'): {}
        });
        return params;
    }

    public buildUrl(urlConfig) {
        let url;
        if (CommonUtils.isString(urlConfig)) {
            url = urlConfig;
        } else {
            const pc = ParameterResolver.resolve({
                params: urlConfig.params,
                tempValue: this.tempValue,
                initValue: this.initValue,
                cacheValue: this.cacheValue,
                userValue:this._cacheService.getNone('userInfo')
                ? this._cacheService.getNone('userInfo'): {}
            });
            url = `${urlConfig.url.parent}/${pc}/${urlConfig.url.child}`;
        }
        return url;
    }

    /**
     * 1、根据解析生成对应的验证observe方法
     * 2、注册observe的消费者与消费行为,使用every条件判断结果
     * 3、处理observe的结果 
     */

    public buildStatusObservableByStatusCfg(option): Observable<any> {
        let status_subscribe$: Observable<any>;
        if (this.beforeOperationMap.has(option.name)) {
            const op_status = this.beforeOperationMap.get(option.name);
            const status_source$ = from(op_status);
            status_subscribe$ = status_source$.pipe(
                concatMap(val => this.buildConditionsObservableByConditionCfg(val))
            );

        }
        return status_subscribe$;
    }

    private buildConditionsObservableByConditionCfg(conditionsCfg) {
        const conditions_source$ = from(conditionsCfg.conditions);
        const conditions_subscribe$ = conditions_source$.pipe(
            concatMap(
                val => {
                    // 区分批量和单条数据处理
                    return this.buildOperation(val);
                }
            )
        );
        const that = this;
        conditions_subscribe$.subscribe(val => {
            if (val === true) {
                that.beforeOperationMessage(conditionsCfg.action, val);
                // tslint:disable-next-line: no-string-literal
            }
        });
        return conditions_subscribe$;
    }

    private async buildOperation(items) {
        const operationResult = [];
        for (const item of items) {
            switch (item.checkType) {
                case 'value':
                    const valueResult = await this.asyncMatchValueCondition(item);
                    operationResult.push(valueResult);
                    break;
                case 'regexp':
                    const regexpResult = await this.asyncMatchRegexpCondition(item);
                    operationResult.push(regexpResult);
                    break;
                case 'tempValue':
                    const tempValueResult = await this.asnycMatchTempValueCondition(item);
                    operationResult.push(tempValueResult);
                    break;
                case 'initValue':
                    const initValueResult = await this.asyncMatchInitValueCondition(item);
                    operationResult.push(initValueResult);
                    break;
                case 'cacheValue':
                    const cacheValueResult = await this.asyncMatchCacheValueCondition(item);
                    operationResult.push(cacheValueResult);
                    break;
                case 'innerValue':
                    const innerResult = await this.asyncInnerValueCondition(item);
                    operationResult.push(innerResult);
                    break;
                case 'executeAjax':
                    // 预留前置异步操作
                    const executeAjaxValue = await this.executeAjaxCondition(item);
                    operationResult.push(executeAjaxValue);
                    break;
                case 'ajaxValue':
                    // 预留前置异步校验
                    const ajaxValue = await this.matchAjaxValueCondition(item);
                    operationResult.push(ajaxValue);
                    break;
            }
        }

        return operationResult.every(r => r === true);

    }

    private async asyncMatchValueCondition(item) {
        let result = false;
        if (this.operationItemData) {
            if (this.operationItemData.hasOwnProperty(item.name)) {
                result =
                    await this.operationItemData[item.name] ===
                    item.value;
            } else {
                result = await false;
            }

        }
        return result;
    }

    private async asyncInnerValueCondition(item) {
        let result = false;
        let tmpValue;
        let cchValue;
        let iniValue;
        if (item.tempValue) {
            tmpValue = this.tempValue[item.tempValue];
        }
        if (item.cacheValue) {
            cchValue = this.cacheValue[item.cacheValue];
        }
        if (item.initValue) {
            iniValue = this.initValue[item.initValue];
        }

        if (tmpValue && cchValue) {
            result = tmpValue !== cchValue;
        } else if (tmpValue && iniValue) {
            result = tmpValue !== iniValue;
        } else if (cchValue && iniValue) {
            result = cchValue !== iniValue;
        }

        return result;
    }

    /**
     * 正则表达匹配验证
     * @param dataItem 待比较数据
     * @param statusItem 匹配条件对象
     */
    private async asyncMatchRegexpCondition(statusItem) {
        let result = false;
        if (this.operationItemData) {
            const reg = new RegExp(
                statusItem.value ? statusItem.value : ''
            );
            result = reg.test(this.operationItemData[statusItem.name]);
        }
        return result;
    }


    private async asnycMatchTempValueCondition(statusItem) {
        // 判断与固定值做验证还是与当前行数据验证
        let result = false;
        if (statusItem.name) {
            result =
                this.operationItemData[statusItem.name] !==
                this.tempValue[statusItem.valueName];
        } else {
            const reg = new RegExp(statusItem.value);
            result = reg.test(this.tempValue[statusItem.valueName]);
            //   if (this.tempValue[statusItem['valueName']] === statusItem['value']) {
            //     result = true;
            //   }
        }
        return result;
    }

    private async asyncMatchInitValueCondition(statusItem) {
        let result = false;
        if (statusItem.name) {
            result =
                this.operationItemData[statusItem.name] !==
                this.initValue[statusItem.valueName];
        } else {
            const reg = new RegExp(statusItem.value);
            result = reg.test(this.initValue[statusItem.valueName]);
        }
        return result;
    }

    private async  asyncMatchCacheValueCondition(statusItem) {
        let result = false;
        if (statusItem.name) {
            result =
                this.operationItemData[statusItem.name] !==
                this.cacheValue[statusItem.valueName];
        } else {
            const reg = new RegExp(statusItem.value);
            result = reg.test(this.cacheValue[statusItem.valueName]);
        }
        return result;
    }

    /**
     * (未完成)
     * 根据异步获取数据的结果与需要验证的数据进行比较,返回是否验证通过
     * 需要根据具体业务规则定义如何进行结果的判断,目前只针对于返回结果数据的等值匹配
     * @param statusItem 
     */
    private async matchAjaxValueCondition(statusItem) {
        let result = false;
        const url = this.buildUrl(statusItem.ajaxConfig.url);
        const params = this.buildParameter(statusItem.ajaxConfig.params, this.operationItemData);
        const response = await this._apiService[statusItem.ajaxConfig.ajaxType](url, params).toPromise();
        if (response.success) {
            if (statusItem.name) {
                if (Array.isArray(response.data)) {
                    result = response.data.every(s => this.operationItemData[statusItem.name] === s[statusItem.valueName]);
                } else {
                    result = this.operationItemData[statusItem.name] ===
                        response.data[statusItem.valueName];
                }
            } else {
                const reg = new RegExp(statusItem.value);
                if (Array.isArray(response.data)) {
                    result = response.data.every(s => reg.test(s[statusItem.name]));
                } else {
                    result = reg.test(response.data[statusItem.valueName]);
                }
            }
        }
        return result;
    }

    /**
     * (未完成)
     * 执行用户自定义的API,并根据API的返回结果,返回是否通过验证
     * @returns boolean
     */
    private async executeAjaxCondition(statusItem) {
        const url = this.buildUrl(statusItem.ajaxConfig.url);
        const params = this.buildParameter(statusItem.ajaxConfig.params, this.operationItemData);
        // 需要处理异步调用之后的返回结果
        // 需要根据后期API执行完成的返回结构,进行统一的处理
        const result = await this._apiService[API_SERVICE_METHOD[statusItem.ajaxConfig.ajaxType]](url, params).toPromise();
        return result.success;
    }


    private innerValueCondition(statusItem) {
        // 判断与固定值做验证还是与当前行数据验证
        let result = false;
        let tmpValue;
        let cchValue;
        let iniValue;
        if (statusItem.tempValue) {
            tmpValue = this.tempValue[statusItem.tempValue];
        }
        if (statusItem.cacheValue) {
            cchValue = this.cacheValue[statusItem.cacheValue];
        }
        if (statusItem.initValue) {
            iniValue = this.initValue[statusItem.initValue];
        }

        if (tmpValue && cchValue) {
            result = tmpValue !== cchValue;
        } else if (tmpValue && iniValue) {
            result = tmpValue !== iniValue;
        } else if (cchValue && iniValue) {
            result = cchValue !== iniValue;
        } else if (iniValue && tmpValue) {
            result = iniValue !== tmpValue;
        }

        return result;

    }

    /**
     * 处理勾选前置操作条件
     * @param conditions
     */
    private async handleCheckedRowsOperationConditions(conditions) {
        const orResult = [];
        conditions.forEach(async elements => {
            // 解析‘与’的关系条件
            const andResults = [];
            elements.forEach(async item => {
                // 选中行的解析处理
                switch (item.checkType) {
                    case 'value':
                        const checkedValueResult = await this.matchCheckedValueCondition(item);
                        andResults.push(checkedValueResult);
                        break;
                    case 'regexp':
                        const matchCheckedRegexpResult = await this.matchCheckedRegexpCondition(item);
                        andResults.push(matchCheckedRegexpResult);
                        break;
                    case 'tempValue':
                        const matchCheckedTempValueResult = await this.matchCheckedTempValueCondition(item);
                        andResults.push(matchCheckedTempValueResult);
                        break;
                    case 'initValue':
                        const matchCheckedInitValueResult = await this.matchCheckedInitValueCondition(item);
                        andResults.push(matchCheckedInitValueResult);
                        break;
                    case 'cacheValue':
                        const matchCheckedCacheValueResult = await this.matchCheckedCacheValueCondition(item);
                        andResults.push(matchCheckedCacheValueResult);
                        break;
                    case 'innerValue':
                        const innerValueResult = await this.innerValueCondition(item);
                        andResults.push(innerValueResult);
                        break;
                }
            });
            // 解析’或‘的关系条件
            const and = await andResults.every(s => s === true);
            orResult.push(and);
        });
        return orResult.some(s => s === true);
    }

    /**
     * 匹配勾选的缓存数据
     * @param statusItem
     */
    private async matchCheckedCacheValueCondition(statusItem) {
        let result = false;
        if (this.operationItemsData) {
            if (statusItem.name) {
                result = await this.operationItemsData.some(
                    row =>
                        row[statusItem.name] !==
                        this.cacheValue[statusItem.valueName]
                );
            } else {
                const reg = new RegExp(statusItem.value);
                result = await reg.test(this.cacheValue[statusItem.valueName]);
            }
        }
        return result;
    }

    /**
     * 匹配勾选的缓存数据
     * @param statusItem
     */
    private async matchCheckedTempValueCondition(statusItem) {
        let result = false;
        if (this.operationItemsData) {
            if (statusItem.name) {
                result = await this.operationItemsData.some(
                    row =>
                        row[statusItem.name] !==
                        this.tempValue[statusItem.valueName]
                );
            } else {
                const reg = new RegExp(statusItem.value);
                result = await reg.test(this.tempValue[statusItem.valueName]);
            }
        }
        return result;
    }

    /**
     * 匹配勾选的缓存数据
     * @param statusItem
     */
    private async matchCheckedInitValueCondition(statusItem) {
        let result = false;
        if (this.operationItemsData) {
            if (statusItem.name) {
                result = await this.operationItemsData.some(
                    row =>
                        row[statusItem.name] !==
                        this.initValue[statusItem.valueName]
                );
            } else {
                const reg = new RegExp(statusItem.value);
                result = await reg.test(this.initValue[statusItem.valueName]);
            }
        }
        return result;
    }

    /**
     * 匹配勾选行值条件
     * @param checkedRows
     * @param statusItem
     */
    private async matchCheckedValueCondition(statusItem) {
        let result = false;
        if (this.operationItemsData.length > 0) {
            result = await this.operationItemsData.some(
                row => row[statusItem.name] === statusItem.value
            );
        }
        return result;
    }

    /**
     * 匹配勾选行的正则条件
     * @param checkedRows
     * @param statusItem
     */
    private async matchCheckedRegexpCondition(statusItem) {
        let result = false;
        if (this.operationItemsData.length > 0) {
            const reg = new RegExp(statusItem.value ? statusItem.value : '');
            const txt = await reg.test(
                this.operationItemsData[0][statusItem.name]
            );
            result = await this.operationItemsData.some(row =>
                reg.test(row[statusItem.name])
            );
        }
        return result;
    }

    /**
     * 处理验证结果
     * @param actionResult
     * @param action
     */
    private handleOperationAction(actionResult, action) {
        let result = true;
        if (action) {
            switch (action.execute) {
                case 'prevent':
                    if (actionResult) {
                        this.beforeOperationMessage(action, result);
                    } else {
                        result = false;
                    }
                    break;
                case 'continue':
                    if (actionResult) {
                        result = false;
                    } else {
                        this.beforeOperationMessage(action, result);
                        // result = true;
                    }
                    break;
            }
        }

        return result;
    }

    /**
     * 构建验证消息
     * @param action
     */
    private beforeOperationMessage(action, result) {
        if (action.type === 'confirm') {
            this._modal.confirm({
                nzTitle: action.title,
                nzContent: action.message,
                nzOnOk: () => {
                    result = false;
                    // 调用后续操作
                },
                nzOnCancel() {
                    result = true;
                }
            });
        } else {
            this._message[action.type](action.message);
            result = action.execute === 'prevent' ? true : false;
        }
    }

    /**
     * 解析前作动作配置条件
     */
    private resolverBeforeOperation() {
        this._beforeOperationMap = new Map();
        if (
            this.beforeOperationCfg &&
            Array.isArray(this.beforeOperationCfg) &&
            this.beforeOperationCfg.length > 0
        ) {
            this.beforeOperationCfg.forEach(element => {
                this._beforeOperationMap.set(element.name, element.status);
            });
        }
    }
}