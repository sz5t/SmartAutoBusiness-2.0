import { CacheService } from '@delon/cache';
import { Injectable, Inject } from '@angular/core';
import { TokenService, DA_SERVICE_TOKEN, ITokenService } from '@delon/auth';
import { _HttpClient, AlainThemeConfig } from '@delon/theme';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpEvent, HttpResponse } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { BeforeOperationResolver } from '@shared/resolver/beforeOperation/before-operation.resolver';
// import { Http, XHRBackend, Headers, Request, RequestMethod, RequestOptionsArgs, ResponseOptionsArgs, ConnectionBackend, RequestOptions } from '@angular/common/http';
@Injectable()
export class ApiServiceConfiguration {
  constructor(@Inject(DA_SERVICE_TOKEN) private _tokenService: TokenService) { }

  // tslint:disable-next-line: no-object-literal-type-assertion
  private defaultError500 = {
    message: '',
    code: 'system.http.status.500',
    data: {},
  } as IErrorInfo;

  // tslint:disable-next-line: no-object-literal-type-assertion
  private defaultError401 = {
    message: '',
    code: 'system.http.status.401',
    data: {},
  } as IErrorInfo;

  // tslint:disable-next-line: no-object-literal-type-assertion
  private defaultError403 = {
    message: '',
    code: 'system.http.status.403',
    data: {},
  } as IErrorInfo;

  // tslint:disable-next-line: no-object-literal-type-assertion
  private defaultError404 = {
    message: '',
    code: 'system.http.status.404',
    data: {},
  } as IErrorInfo;

  private logError(error: IErrorInfo): void { }

  private showError(error: IErrorInfo): any {
    if (error.code) {
      // 根究code获取消息内容,并进行提示
    } else if (error.message) {
      // 根据消息内容进行提示
    }
  }

  private handleTargetUrl(targetUrl: string): void {
    // 统一进行路由跳转
    if (!targetUrl) {
    } else {
    }
  }

  private handleUnAuthorizedRequest(messagePromise: any, targetUrl?: string) {
    const self = this;
    if (messagePromise) {
      messagePromise.done(() => {
        this.handleTargetUrl(targetUrl || '/');
      });
    } else {
      self.handleTargetUrl(targetUrl || '/');
    }
  }

  public handleErrorResponse(response: ApiResponse) {
    const self = this;
    switch (response.status) {
      case 401:
        self.handleTargetUrl(this._tokenService.login_url);
        break;
      case 403:
        self.showError(self.defaultError403);
        break;
      case 404:
        self.showError(self.defaultError404);
        break;
      default:
        self.showError(self.defaultError500);
        break;
    }
  }

  private handleAbpResponse(ajaxResponse: ApiResponse) {
    // 重写跑出异常
    if (ajaxResponse.success) {
      if (ajaxResponse.targetUrl) {
        this.handleTargetUrl(ajaxResponse.targetUrl);
      } else {
        if (!ajaxResponse.error) {
          ajaxResponse.error = this.defaultError500;
        }
        // 日志记录
        // 显示消息
        if (ajaxResponse.status === 401) {
          this.handleUnAuthorizedRequest(null, ajaxResponse.targetUrl);
        }
      }
    }

    return ajaxResponse;
  }

  private getResponseOrNull(response: ApiResponse): ApiResponse | null {
    // if (!response || !response.headers) {
    //   return null;
    // }
    // const contentType = response.headers.get('content-Type');
    // if (!contentType) {
    //   // 记录日志 content-type is not sent
    //   return null;
    // }

    // if (contentType.indexOf('application/json') < 0) {
    //   // content-type is not application/json
    //   return null;
    // }

    return response;
    // tslint:disable-next-line: no-object-literal-type-assertion
    // return {
    //   status: response.status,
    //   targetUrl: response.url,
    //   message: response.body
    // } as ApiResponse
  }

  public handleResponse(response: ApiResponse | any) {
    const ajaxResponse = this.getResponseOrNull(response);
    if (ajaxResponse === null) {
      return response;
    }

    return this.handleAbpResponse(response);
  }

  public handleError(error: ApiResponse): Observable<ApiResponse> {
    const response = this.getResponseOrNull(error);
    if (response != null) {
      this.handleAbpResponse(response);
      // tslint:disable-next-line: deprecation
      // 重写抛出异常
      return throwError(JSON.stringify(response.error));
    } else {
      this.handleErrorResponse(response);
      // tslint:disable-next-line: deprecation
      // 重写抛出异常
      return throwError(`HTTP error ${error.status} , ${JSON.stringify(response.error)}`);
    }
  }
}

@Injectable()
export class ApiService extends _HttpClient {
  protected configuration: ApiServiceConfiguration;
  constructor(
    @Inject(DA_SERVICE_TOKEN) private _tokenService: TokenService,
    private clientHttp: HttpClient,
    private cacheService: CacheService,
    _configuration: ApiServiceConfiguration
  ) {
    super(clientHttp, new AlainThemeConfig());
    this.configuration = _configuration;
  }

  /**
   * 资源请求
   * @param _url 资源地址 
   * @param _method 资源方法
   * @param _options 资源选项
   */
  public getRequest(_url: string, _method: string, _options?: ApiOptions) {
    this.normalizeRequestOptions(_options);
    return super.request<any>(_method, _url, _options as any)
      .pipe(
        map(response => this.configuration.handleResponse(response)),
        catchError(error => this.configuration.handleError(error)));
  }

  /**
   * 获取数据
   * @param _url 资源地址
   * @param param 资源参数
   * @param _options 资源选项
   */
  public doGet(_url: string, param: any, _options?: ApiOptions) {
    this.normalizeRequestOptions(_options);
    return super.get<ApiResponse>(_url, param, _options as any)
      .pipe(
        map(response => this.configuration.handleResponse(response)),
        catchError(error => this.configuration.handleError(error)));
  }

  /**
   * 提交数据
   * @param _url 资源地址 
   * @param body 提交数据
   * @param param 资源参数
   * @param _options 资源选项
   */
  public doPost(_url: string, body?: any, param?: any, _options?: ApiOptions) {
    this.normalizeRequestOptions(_options);
    return super.post<ApiResponse>(_url, body, param, _options as any)
      .pipe(
        map(response => this.configuration.handleResponse(response)),
        catchError(error => this.configuration.handleError(error)));
  }

  /**
   * 更新数据
   * @param _url 资源地址
   * @param body 提交数据
   * @param param 资源参数
   * @param _options 资源选项
   */
  public doPut(_url: string, body?: any | any[], param?: any, _options?: ApiOptions) {
    this.normalizeRequestOptions(_options);
    return super.put<ApiResponse>(_url, body, param, _options as any)
      .pipe(
        map(response => this.configuration.handleResponse(response)),
        catchError(error => this.configuration.handleError(error)));
  }

  /**
   * 删除操作
   * @param _url 资源地址 
   * @param param 资源参数
   * @param _options 资源选项
   */
  public doDelete(_url: string, param: any, _options?: ApiOptions) {
    this.normalizeRequestOptions(_options);
    return super.delete<ApiResponse>(_url, param, _options as any)
      .pipe(
        map(response => this.configuration.handleResponse(response)),
        catchError(error => this.configuration.handleError(error)));
  }

  /**
   * 组装Headers参数
   * @param options 资源选项
   */
  private normalizeRequestOptions(options: any): ApiOptions {
    if (!options) {
      options = { headers: HttpHeaders };
      options.headers = new HttpHeaders()
        .set("_log", '{"clientType":"PC","type":"test"}')
        // .set("Pragma", "no-cache")
        // .set("Cache-Control", "no-cache")
        // .set("Expires", "Sat, 01 Jan 2000 00:00:00 GMT")
        .set("x-Requested-With", "XMLHttpRequest")
      // .set();
    }
    if (!options.headers) {
      options.headers = new HttpHeaders()
        .set("_log", '{"clientType":"PC","type":"test"}')
        // .set("Pragma", "no-cache")
        // .set("Cache-Control", "no-cache")
        // .set("Expires", "Sat, 01 Jan 2000 00:00:00 GMT")
        .set("x-Requested-With", "XMLHttpRequest");
    }

    // options.headers.append();
    // options.headers.append("_log", '{"clientType":"PC","type":"test"}');
    // options.headers.append("Pragma", "no-cache");
    // options.headers.append("Cache-Control", "no-cache");
    // options.headers.append("Expires", "Sat, 01 Jan 2000 00:00:00 GMT");
    // this.addAcceptLanguageHeader(options);
    // // this.addAuthorizationHeader(options);
    // this.addXRequestWithHeader(options);
    // // 目前限定json格式,如需扩展则需要重新设计
    // this.addJsonResponseType(options);
    return options;
  }

  private addJsonResponseType(options: ApiOptions) {
    options.responseType = 'json';
  }

  private addXRequestWithHeader(options: ApiOptions) {
    if (options.headers) {
      options.headers.append("x-Requested-With", "XMLHttpRequest");
    }
  }

  private addAcceptLanguageHeader(options: ApiOptions) {

  }

  private addAuthorizationHeader(options: ApiOptions) {
    let authorizationHeaders = options.headers ? options.headers.getAll('_token') : null;
    if (!authorizationHeaders) {
      authorizationHeaders = [];
    }

    if (!this.itemExists(authorizationHeaders, (item: string) => item.indexOf('_token') === 0)) {
      const token = this._tokenService.get();
      if (options.headers && token) {
        options.headers.append('_token', token);
      }
    }
  }

  private itemExists<T>(items: T[], predicate: (item: T) => boolean): boolean {
    for (const item of items) {
      if (predicate(item)) {
        return true;
      }
    }
    return false;
  }
}

export class ApiOptions {
  body?: any;
  headers?: HttpHeaders;
  params?: any;
  observe?: 'response';
  reportProgress?: boolean;
  responseType?: 'json';
  withCredentials?: boolean;
  // 模块id
  // 模块名称
  // 组件id
  // 组件名称
  // 操作id
  // 操作名称
}

export class IErrorInfo {
  message: string;
  code: string;
  data: any;
}

export class IValidationInfo extends IErrorInfo { }

export class IMessageInfo extends IErrorInfo { }

export class ApiResponse {
  private _success: number;
  private _data: any | any[];
  private _status: number;
  private _targetUrl?: string;
  private _validation?: IValidationInfo | IValidationInfo[];
  private _error?: IMessageInfo | IMessageInfo[];

  public get success() {
    return this._success;
  }

  public set success(value) {
    this._success = value;
  }

  public get data() {
    return this._data;
  }

  public set data(value) {
    this._data = value;
  }

  public get status() {
    return this._status;
  }

  public set status(value) {
    this._status = value;
  }

  public set targetUrl(value) {
    this._targetUrl = value
  }
  public get targetUrl() {
    return this._targetUrl;
  }

  public get validation() {
    return this._validation;
  }

  public set validation(value) {
    this._validation = value;
  }

  public get error() {
    return this._error;
  }

  public set error(value) {
    this._error = value;
  }

}
