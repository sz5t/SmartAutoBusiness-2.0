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

export class BeforeOperationResolver implements InnerValue {
    tempValue: any;
    initValue: any;
    cacheValue: any;
    beforeOperationCfg: any;
    constructor(
        private _config: any,
        private _initValue: any,
        private _cacheValue: any,
        private _tempValue: any,
        private _apiService?: ApiService,
        private _modal?: NzModalService,
        private _message?: NzMessageService
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
            cacheValue: this.cacheValue
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
                cacheValue: this.cacheValue
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

    private buildConditionObservable(conditions, action) {
        const condition_source$ = from(conditions)
        const condition_subscribe$ = condition_source$.pipe(
            mergeMap(val => this.buildOperation(val))
        )
        const that = this;
        condition_subscribe$.subscribe(val => {
            // val.then(result => {
            //     if (result) {
            //         console.log('value: ' + result);
            //         that.beforeOperationMessage(action, result);
            //     }
            // })
        });
        return condition_subscribe$;
    }

    private buildObservables(items) {
        const items_sources$ = from(items);
        const items_subscribe$ = items_sources$.pipe(
            mergeMap(val => this.buildOperation(val))
        )
        items_subscribe$.subscribe(val => console.log('value: ' + val));
        return items_sources$;
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

    private async matchAjaxValueCondition(statusItem) {
        let result = false;
        const url = this.buildUrl(statusItem.ajaxConfig.url);
        const params = this.buildParameter(statusItem.ajaxConfig.params, this.operationItemData);
        const response = await this._apiService[statusItem.ajaxConfig.ajaxType](url, params);
        if (response.isSuccess) {
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

    private async executeAjaxCondition(statusItem) {
        const url = this.buildUrl(statusItem.ajaxConfig.url);
        const params = this.buildParameter(statusItem.ajaxConfig.params, this.operationItemData);
        // 需要处理异步调用之后的返回结果
        const result = await this._apiService[API_SERVICE_METHOD[statusItem.ajaxConfig.ajaxType]](url, params);

        return result;
    }
















    /**
     * 创建具体的检查单元
     * @param conditions 
     */
    private buildObservable(conditions, action) {
        const checkConditionItems = [];


        for (const item of conditions) {
            // 选中行的解析处理
            let promiseFunc;
            switch (item.checkType) {
                case 'value':
                    checkConditionItems.push(this.asyncMatchValueCondition(item));
                    break;
                case 'regexp':
                    promiseFunc = of(this.matchRegexpCondition(item));
                    break;
                case 'tempValue':
                    promiseFunc = of(this.matchTempValueCondition(item));
                    break;
                case 'initValue':
                    promiseFunc = of(this.matchInitValueCondition(item));
                    break;
                case 'cacheValue':
                    promiseFunc = of(this.matchCacheValueCondition(item));
                    break;
                case 'innerValue':
                    checkConditionItems.push(this.asyncInnerValueCondition(item))
                    break;
                case 'executeAjax':
                    // 预留前置异步操作
                    promiseFunc = fromPromise(this.executeAjaxCondition(item));
                    break;
                case 'ajaxValue':
                    // 预留前置异步校验
                    promiseFunc = fromPromise(this.matchAjaxValueCondition(item));
                    break;
            }
        }

        forkJoin(checkConditionItems).subscribe(results => {
            results.forEach(r => console.log('result', r));
        })

        // const that = this;
        // const promiseResult$ = from(checkConditionItems);
        // const ts = promiseResult$.pipe(
        //     every(res => {
        //         that.handleOperationAction(res, action);
        //         return res === true;
        //     })
        // );
        // ts.subscribe(val => console.log('inner subscribe:' + val));
        // return ts;
    }



    /**
     * 操作选中行前置判断
     * @option  {type, name, actionName, ajaxConfig}
     */
    public beforeItemDataOperation(option) {
        let result = false;
        if (this._beforeOperationMap.has(option.name)) {
            const op_status = this._beforeOperationMap.get(option.name);
            for (let i = 0, len = op_status.length; i < len; i++) {
                const conditionResult = this.handleOperationConditions(
                    op_status[i].conditions
                );
                const actionResult = this.handleOperationAction(
                    conditionResult,
                    op_status[i].action
                );
                if (actionResult) {
                    result = true;
                    break;
                }
                result = actionResult;
            }
        }
        return result;
    }

    /**
     * 操作勾选行前置判断
     * @param option
     */
    public beforeItemsDataOperation(option) {
        let result = false;
        if (this._beforeOperationMap.has(option.name)) {
            const op_status = this._beforeOperationMap.get(option.name);
            for (let i = 0, len = op_status.length; i < len; i++) {
                const conditionResult = this.handleCheckedRowsOperationConditions(
                    op_status[i].conditions
                );
                const actionResult = this.handleOperationAction(
                    conditionResult,
                    op_status[i].action
                );
                if (actionResult) {
                    result = true;
                    // 跳出循环
                    break;
                }
                result = actionResult;
            }
        }
        return result;
    }

    /**
     * 处理选中前置操作条件
     * @param conditions
     */
    private handleOperationConditions(conditions) {
        const orResult = [];
        conditions.forEach(elements => {
            // 解析‘与’的关系条件
            const andResults = [];
            elements.forEach(item => {
                let andResult = true;
                // 选中行的解析处理
                switch (item.checkType) {
                    case 'value':
                        andResult = this.matchValueCondition(item);
                        break;
                    case 'regexp':
                        andResult = this.matchRegexpCondition(item);
                        break;
                    case 'tempValue':
                        andResult = this.matchTempValueCondition(item);
                        break;
                    case 'initValue':
                        andResult = this.matchInitValueCondition(item);
                        break;
                    case 'cacheValue':
                        andResult = this.matchCacheValueCondition(item);
                        break;
                    case 'innerValue':
                        andResult = this.innerValueCondition(item);
                        break;
                    case 'executeAjax':
                        // 预留前置异步操作
                        // andResult = this.executeAjaxCondition(item);
                        break;
                    case 'ajaxValue':
                        // 预留前置异步校验
                        // andResult = this.matchAjaxValueCondition(item);
                        break;
                }
                andResults.push(andResult);
            });
            const and = andResults.every(s => s === true);
            orResult.push(and);
            // 解析’或‘的关系条件
        });

        return orResult.some(s => s === true);
    }

    /**
     * 值匹配验证
     * @param dataItem 待比较数据
     * @param statusItem 匹配条件对象
     */
    private matchValueCondition(statusItem) {
        let result = false;
        if (this.operationItemData) {
            if (this.operationItemData.hasOwnProperty(statusItem.name)) {
                result =
                    this.operationItemData[statusItem.name] ===
                    statusItem.value;
            } else {
                result = true;
            }

        }
        console.log('value Check:', result);
        return result;
    }

    /**
     * 正则表达匹配验证
     * @param dataItem 待比较数据
     * @param statusItem 匹配条件对象
     */
    private matchRegexpCondition(statusItem) {
        let result = false;
        if (this.operationItemData) {
            const reg = new RegExp(
                statusItem.value ? statusItem.value : ''
            );
            result = reg.test(this.operationItemData[statusItem.name]);
        }
        return result;
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

        console.log('inner value:', result)
        return result;

    }

    private matchTempValueCondition(statusItem) {
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

    private matchInitValueCondition(statusItem) {
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

    private matchCacheValueCondition(statusItem) {
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
     * 处理勾选前置操作条件
     * @param conditions
     */
    private handleCheckedRowsOperationConditions(conditions) {
        const orResult = [];
        conditions.forEach(elements => {
            // 解析‘与’的关系条件
            const andResults = [];
            elements.forEach(item => {
                let andResult = true;
                // 选中行的解析处理
                switch (item.checkType) {
                    case 'value':
                        andResult = this.matchCheckedValueCondition(item);
                        break;
                    case 'regexp':
                        andResult = this.matchCheckedRegexpCondition(item);
                        break;
                    case 'tempValue':
                        andResult = this.matchCheckedTempValueCondition(item);
                        break;
                    case 'initValue':
                        andResult = this.matchCheckedInitValueCondition(item);
                        break;
                    case 'cacheValue':
                        andResult = this.matchCheckedCacheValueCondition(item);
                        break;
                    case 'innerValue':
                        andResult = this.innerValueCondition(item);
                        break;
                }
                andResults.push(andResult);
            });
            // 解析’或‘的关系条件
            const and = andResults.every(s => s === true);
            orResult.push(and);
        });
        return orResult.some(s => s === true);
    }

    /**
     * 匹配勾选的缓存数据
     * @param statusItem
     */
    private matchCheckedCacheValueCondition(statusItem) {
        let result = false;
        if (this.operationItemsData) {
            if (statusItem.name) {
                result = this.operationItemsData.some(
                    row =>
                        row[statusItem.name] !==
                        this.cacheValue[statusItem.valueName]
                );
            } else {
                const reg = new RegExp(statusItem.value);
                result = reg.test(this.cacheValue[statusItem.valueName]);
            }
        }
        return result;
    }

    /**
     * 匹配勾选的缓存数据
     * @param statusItem
     */
    private matchCheckedTempValueCondition(statusItem) {
        let result = false;
        if (this.operationItemsData) {
            if (statusItem.name) {
                result = this.operationItemsData.some(
                    row =>
                        row[statusItem.name] !==
                        this.tempValue[statusItem.valueName]
                );
            } else {
                const reg = new RegExp(statusItem.value);
                result = reg.test(this.tempValue[statusItem.valueName]);
            }
        }
        return result;
    }

    /**
     * 匹配勾选的缓存数据
     * @param statusItem
     */
    private matchCheckedInitValueCondition(statusItem) {
        let result = false;
        if (this.operationItemsData) {
            if (statusItem.name) {
                result = this.operationItemsData.some(
                    row =>
                        row[statusItem.name] !==
                        this.initValue[statusItem.valueName]
                );
            } else {
                const reg = new RegExp(statusItem.value);
                result = reg.test(this.initValue[statusItem.valueName]);
            }
        }
        return result;
    }

    /**
     * 匹配勾选行值条件
     * @param checkedRows
     * @param statusItem
     */
    private matchCheckedValueCondition(statusItem) {
        let result = false;
        if (this.operationItemsData.length > 0) {
            result = this.operationItemsData.some(
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
    private matchCheckedRegexpCondition(statusItem) {
        let result = false;
        if (this.operationItemsData.length > 0) {
            const reg = new RegExp(statusItem.value ? statusItem.value : '');
            const txt = reg.test(
                this.operationItemsData[0][statusItem.name]
            );
            result = this.operationItemsData.some(row =>
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