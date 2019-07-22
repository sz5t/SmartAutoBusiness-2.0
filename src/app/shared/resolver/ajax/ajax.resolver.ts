
import { fromPromise } from 'rxjs/internal/observable/fromPromise';
import { of } from 'rxjs';
import { ApiService } from '@core/services/api/api-service';
import { NzModalService, NzMessageService } from 'ng-zorro-antd';
export class AjaxResolver {
    private _apiService: ApiService;
    private _modal: NzModalService;
    private _message: NzMessageService;

    constructor(private _componentInstance: any) {
        this._apiService = this._componentInstance.componentService.apiService;
        this._modal = this._componentInstance.componentService.modalService;
        this._message = this._componentInstance.componentService.modalService;
    }
    public resolve(ajax, ajaxData?, params?) {
        // const $source = of(ajax);
        // const $source_subscription = $source.pipe()

    }

    private async resolveAjax(ajax, ajaxData, params) {
        const result = await this[ajax.ajaxType](ajax, ajaxData, params);
        if (result.success) {
            // 全部执行正确, 返回对应的操作结果
            // 需要国际化
            this._message.success('ajax.message.success');
            // 解析并发送消息

        } else {
            // 部分正确或者部分错误、或者全部错误
            // 返回错误集合、验证集合、正确集合

            // 并发送消息
        }
    }

    private async post(ajax, ajaxData, params) {
        return this._apiService.doPost(
            ajax.url,
            ajaxData,
            params
        ).toPromise();
    }

    private async put(ajax, ajaxData, params) {
        return this._apiService.doPut(
            ajax.url,
            ajaxData,
            params
        ).toPromise()
    }

    private async delete(ajax, params) {
        return this._apiService.doDelete(ajax.url, params).toPromise();
    }
}